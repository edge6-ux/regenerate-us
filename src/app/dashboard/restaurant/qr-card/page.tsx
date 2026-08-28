import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { Fraunces } from 'next/font/google';
import { headers } from 'next/headers';
import QRCode from 'qrcode';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';

const wordmark = Fraunces({ subsets: ['latin'], weight: ['600'] });

export default async function QRCardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, restaurant_id')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'restaurant' || !profile.restaurant_id) {
    redirect('/login');
  }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id, name, city, state, participation_level')
    .eq('id', profile.restaurant_id)
    .single();

  if (!restaurant) notFound();

  // Build absolute URL for the QR code
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const restaurantUrl = `${protocol}://${host}/restaurants/${restaurant.id}`;

  const qrDataUrl = await QRCode.toDataURL(restaurantUrl, {
    width: 400,
    margin: 1,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  const isCertified = restaurant.participation_level === 'certified';

  return (
    <>
      <style>{`
        @media print {
          @page { size: 3.5in 5in; margin: 0; }
          html, body { margin: 0; padding: 0; background: white; }
          .no-print { display: none !important; }
          .card-wrapper { padding: 0; min-height: unset; }
          .card { box-shadow: none !important; border: 2px solid #1e293b !important; }
        }
      `}</style>

      {/* Screen nav — hidden when printing */}
      <div className="no-print mb-6 flex items-center justify-between">
        <Link
          href="/dashboard/restaurant"
          className="text-sm text-[#1e293b] hover:underline font-medium"
        >
          ← Back to dashboard
        </Link>
        <PrintButton />
      </div>

      <div className="no-print mb-4 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-600 max-w-md">
        This card is formatted for a <strong>3.5 × 5 inch</strong> print. Set your printer to that paper size, or print to PDF for digital use.
      </div>

      {/* Card */}
      <div className="card-wrapper flex justify-center py-6">
        <div
          className="card bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
          style={{ width: '3.5in', minHeight: '5in' }}
        >
          {/* Header band */}
          <div className="bg-[#1e293b] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`${wordmark.className} text-white text-xl font-semibold tracking-tight`}
              >
                Regenerate US
              </span>
            </div>
            {isCertified && (
              <span className="text-xs font-semibold text-slate-200 border border-slate-400/50 rounded-full px-2 py-0.5">
                Certified
              </span>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-col items-center flex-1 px-6 py-6 gap-5">
            {/* Restaurant name */}
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                {isCertified ? 'Regenerate US Certified Restaurant' : 'From the Farm Participant'}
              </p>
              <h1 className="text-xl font-bold text-stone-900 leading-tight">
                {restaurant.name}
              </h1>
              <p className="text-sm text-stone-500 mt-0.5">
                {restaurant.city}, {restaurant.state}
              </p>
            </div>

            {/* QR code */}
            <div className="p-3 rounded-xl border-2 border-[#1e293b]/20 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt={`QR code for ${restaurant.name}`}
                width={160}
                height={160}
                style={{ display: 'block' }}
              />
            </div>

            {/* Tagline */}
            <div className="text-center">
              <p className="text-sm font-semibold text-stone-800">
                Scan to see our certified dishes
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Sourced with integrity, verified by Regenerate US.
              </p>
            </div>

            {/* Divider + standards note */}
            <div className="w-full border-t border-stone-100 pt-4">
              <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                All certified dishes meet Regenerate US standards for sourcing and ingredient integrity.
                Scan to view verified dishes and supplier information.
              </p>
            </div>
          </div>

          {/* Footer band */}
          <div className="bg-stone-50 border-t border-stone-100 px-6 py-3 text-center">
            <p className="text-[11px] text-stone-400 font-medium tracking-wide">
              Regenerate US · Restaurant Certification Program
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
