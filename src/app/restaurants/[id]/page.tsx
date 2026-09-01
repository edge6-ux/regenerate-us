import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Fraunces, Great_Vibes } from 'next/font/google';
import { ATMOSPHERE_BG } from '@/components/AtmosphereBanner';
import UsFlag from '@/components/UsFlag';

export const revalidate = 60;

const wordmark = Fraunces({ subsets: ['latin'], weight: ['600', '700'] });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });

export default async function RestaurantProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .single();

  if (!restaurant) notFound();

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="bg-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">

          <div className="flex items-center gap-2 mb-8">
            <span className={`${wordmark.className} text-white text-lg font-semibold tracking-tight`}>
              Regen USA
            </span>
            <UsFlag />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-semibold text-slate-200 mb-4">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                Farm-to-Table Partner
              </div>

              <h1 className={`${wordmark.className} text-4xl sm:text-5xl font-bold text-white leading-tight`}>
                {restaurant.name}
              </h1>
              <p className="text-slate-300 mt-2 text-lg">
                {restaurant.city}, {restaurant.state}
              </p>
            </div>
          </div>

          {restaurant.description && (
            <p className="text-slate-100/80 mt-6 text-sm max-w-2xl leading-relaxed">
              {restaurant.description}
            </p>
          )}

          {restaurant.website && (
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-slate-300 hover:text-white text-sm transition-colors"
            >
              Visit restaurant website
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* ── Sourcing ──────────────────────────────────────────────────────── */}
        <section className="bg-white border border-stone-200 rounded-xl p-8 text-center">
          <h2 className={`${wordmark.className} text-2xl font-bold text-stone-900 mb-2`}>
            Sourced from Regen USA Farms
          </h2>
          <p className="text-stone-500 text-sm max-w-lg mx-auto mb-6">
            {restaurant.name} is a farm-to-table partner in the Regen USA directory. Browse the farms
            in the network to see who supplies restaurants like this one.
          </p>
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 bg-[#1e293b] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#0f172a] transition-colors"
          >
            Browse Regen USA Farms
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </section>

        {/* ── Health Practices ──────────────────────────────────────────────── */}
        {restaurant.health_practices && restaurant.health_practices.length > 0 && (
          <section>
            <h2 className={`${wordmark.className} text-2xl font-bold text-stone-900 mb-4`}>
              Better Health Practices
            </h2>
            <div className="bg-white border border-stone-200 rounded-xl p-6">
              <div className="flex flex-wrap gap-2">
                {restaurant.health_practices.map((p: string) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1.5 bg-[#1e293b]/8 text-[#1e293b] text-sm font-medium px-3 py-1.5 rounded-full border border-[#1e293b]/20"
                  >
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className={`${ATMOSPHERE_BG} rounded-2xl p-8 text-center`}>
          <span className={`${greatVibes.className} text-slate-300 text-3xl`}>
            Regen USA
          </span>
          <h3 className={`${wordmark.className} text-xl font-bold text-white mt-1 mb-3`}>
            Find more restaurants like this one
          </h3>
          <p className="text-slate-200/80 text-sm mb-6 max-w-md mx-auto">
            Regen USA is building a directory of farm-to-table restaurants and the regenerative farms behind them.
          </p>
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 bg-white text-[#1e3a8a] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors"
          >
            Explore the directory
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </section>

        <div className="text-center pb-4">
          <Link href="/directory" className="inline-block text-xs text-[#1e293b] hover:underline">
            ← Back to directory
          </Link>
        </div>

      </div>
    </div>
  );
}
