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
    .select('id, name, city, state, status')
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
                Regen USA
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col items-center flex-1 px-6 py-6 gap-5">
            {/* Restaurant name */}
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                Farm-to-Table Partner
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
                Scan to see our story
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Ask us about the farms we source from.
              </p>
            </div>

            {/* Divider + note */}
            <div className="w-full border-t border-stone-100 pt-4">
              <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                Scan to view our profile and the Regen USA farms behind our menu.
              </p>
            </div>
          </div>

          {/* Footer band */}
          <div className="bg-stone-50 border-t border-stone-100 px-6 py-3 text-center">
            <p className="text-[11px] text-stone-400 font-medium tracking-wide">
              Regen USA · Farms &amp; Farm-to-Table Directory
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
