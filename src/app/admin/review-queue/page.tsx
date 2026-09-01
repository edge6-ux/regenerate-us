import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default async function AdminReviewQueuePage() {
  const supabase = await createClient();

  const [{ data: restaurants }, { data: farms }] = await Promise.all([
    supabase
      .from('restaurants')
      .select('id, name, city, state, created_at, contact_email')
      .eq('status', 'pending')
      .order('created_at', { ascending: true }),
    supabase
      .from('farms')
      .select('id, name, city, state, created_at, cert_type, cert_other, contact_email')
      .eq('status', 'pending')
      .order('created_at', { ascending: true }),
  ]);

  const pendingRestaurants = restaurants ?? [];
  const pendingFarms = farms ?? [];

  const total = pendingRestaurants.length + pendingFarms.length;
  const firstFarmId = pendingFarms[0]?.id;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Review queue</h1>
        <p className="text-sm text-stone-500 max-w-2xl">
          Your open reviews, in one list. Click a restaurant or farm to approve or reject their listing.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <div className="col-span-2 sm:col-span-1 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-stone-500 mb-1">Needs attention</div>
          <div className="text-3xl font-bold text-stone-900 tabular-nums">{total}</div>
          <div className="text-xs text-stone-500 mt-1">Pending review</div>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50/80 p-5">
          <div className="text-sm font-medium text-amber-900/80 mb-1">Restaurant applications</div>
          <div className="text-2xl font-bold text-amber-950 tabular-nums">{pendingRestaurants.length}</div>
          <div className="text-xs text-amber-700/70 mt-1">Restaurants awaiting review</div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
          <div className="text-sm font-medium text-slate-900/80 mb-1">Farm applications</div>
          <div className="text-2xl font-bold text-slate-950 tabular-nums">{pendingFarms.length}</div>
        </div>
      </div>

      {firstFarmId && pendingFarms.length > 0 && (
        <div className="mb-8">
          <Link
            href={`/admin/farms/${firstFarmId}/review`}
            className="inline-flex items-center gap-2 bg-[#1e293b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0f172a] transition-colors"
          >
            Start farm queue
            <span className="opacity-90 font-normal">(oldest first · {pendingFarms.length} pending)</span>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-10">
        {/* Restaurants */}
        <section className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-stone-900">Restaurant applications</h2>
            <Link
              href="/admin/restaurants/pending"
              className="text-sm text-[#1e293b] font-medium hover:underline"
            >
              Table view →
            </Link>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            {pendingRestaurants.length === 0 ? (
              <div className="p-8 text-center text-stone-500 text-sm">No restaurant applications waiting.</div>
            ) : (
              <ul className="divide-y divide-stone-100">
                {pendingRestaurants.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/admin/restaurants/${r.id}/review`}
                      className="flex items-center justify-between gap-3 p-4 hover:bg-stone-50 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="font-medium text-stone-900 text-sm truncate">{r.name}</div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {r.city}, {r.state} ·{' '}
                          {new Date(r.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                      <StatusBadge status="pending" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Farms */}
        <section className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-stone-900">Farm applications</h2>
            {pendingFarms.length > 0 && (
              <Link
                href="/admin/farms/pending"
                className="text-sm text-[#1e293b] font-medium hover:underline"
              >
                Table view →
              </Link>
            )}
          </div>
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            {pendingFarms.length === 0 ? (
              <div className="p-8 text-center text-stone-500 text-sm">No farm applications waiting.</div>
            ) : (
              <ul className="divide-y divide-stone-100">
                {pendingFarms.map((farm) => (
                  <li key={farm.id}>
                    <Link
                      href={`/admin/farms/${farm.id}/review`}
                      className="flex items-center justify-between gap-3 p-4 hover:bg-stone-50 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="font-medium text-stone-900 text-sm truncate">{farm.name}</div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {farm.city}, {farm.state} ·{' '}
                          {new Date(farm.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                      <StatusBadge status="pending" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
