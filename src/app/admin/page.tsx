import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: farms } = await supabase
    .from('farms')
    .select('*')
    .order('created_at', { ascending: false });

  const allRestaurants = restaurants || [];
  const allFarms = farms || [];

  const restTotal = allRestaurants.length;
  const restPending = allRestaurants.filter((r) => r.status === 'pending').length;
  const restApproved = allRestaurants.filter((r) => r.status === 'approved').length;
  const restRejected = allRestaurants.filter((r) => r.status === 'rejected').length;

  const farmTotal = allFarms.length;
  const farmPending = allFarms.filter((f) => f.status === 'pending').length;
  const farmApproved = allFarms.filter((f) => f.status === 'approved').length;
  const reviewQueueTotal = restPending + farmPending;

  const recentRestaurants = allRestaurants.slice(0, 5);
  const recentFarms = allFarms.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-4">Dashboard</h1>

      <Link
        href="/admin/review-queue"
        className="mb-8 block rounded-xl border border-[#1e293b]/25 bg-[#1e293b]/5 px-5 py-4 transition-colors hover:bg-[#1e293b]/10"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-[#0f172a]">Review queue</div>
            <p className="text-sm text-stone-600 mt-0.5">
              {reviewQueueTotal === 0
                ? 'Nothing waiting — you’re all caught up.'
                : `${reviewQueueTotal} item${reviewQueueTotal === 1 ? '' : 's'} ${reviewQueueTotal === 1 ? 'needs' : 'need'} a decision.`}
            </p>
          </div>
          <span className="text-sm font-semibold text-[#1e293b] shrink-0">
            Open queue →
          </span>
        </div>
      </Link>

      {/* Restaurant Stats */}
      <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: restTotal, color: 'bg-stone-100 text-stone-800' },
          { label: 'Pending', value: restPending, color: 'bg-yellow-50 text-yellow-800' },
          { label: 'Approved', value: restApproved, color: 'bg-slate-50 text-slate-800' },
          { label: 'Rejected', value: restRejected, color: 'bg-red-50 text-red-800' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-5 border border-stone-200`}>
            <div className="text-2xl font-bold mb-0.5">{stat.value}</div>
            <div className="text-sm opacity-75">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Farm Stats */}
      <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Farms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total', value: farmTotal, color: 'bg-stone-100 text-stone-800' },
          { label: 'Pending', value: farmPending, color: 'bg-yellow-50 text-yellow-800' },
          { label: 'Approved', value: farmApproved, color: 'bg-slate-50 text-slate-800' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-5 border border-stone-200`}>
            <div className="text-2xl font-bold mb-0.5">{stat.value}</div>
            <div className="text-sm opacity-75">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Two-column recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Restaurants */}
        <div className="bg-white border border-stone-200 rounded-xl">
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900">Recent Restaurants</h2>
            <Link href="/admin/restaurants" className="text-sm text-[#1e293b] hover:underline font-medium">
              View all →
            </Link>
          </div>
          {recentRestaurants.length === 0 ? (
            <div className="p-6 text-center text-stone-500 text-sm">No restaurant applications yet.</div>
          ) : (
            <div className="divide-y divide-stone-100">
              {recentRestaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  href={
                    restaurant.status === 'pending'
                      ? `/admin/restaurants/${restaurant.id}/review`
                      : `/admin/restaurants/${restaurant.id}`
                  }
                  className="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors"
                >
                  <div>
                    <div className="font-medium text-stone-900 text-sm">{restaurant.name}</div>
                    <div className="text-xs text-stone-500">{restaurant.city}, {restaurant.state}</div>
                  </div>
                  <StatusBadge status={restaurant.status} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Farms */}
        <div className="bg-white border border-stone-200 rounded-xl">
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900">Recent Farms</h2>
            <div className="flex items-center gap-4">
              <Link href="/admin/review-queue" className="text-sm text-[#1e293b] hover:underline font-medium">
                Review queue
              </Link>
              <Link href="/admin/farmers" className="text-sm text-[#1e293b] hover:underline font-medium">
                View all →
              </Link>
            </div>
          </div>
          {recentFarms.length === 0 ? (
            <div className="p-6 text-center text-stone-500 text-sm">No farm applications yet.</div>
          ) : (
            <div className="divide-y divide-stone-100">
              {recentFarms.map((farm) => (
                <Link
                  key={farm.id}
                  href={
                    farm.status === 'pending'
                      ? `/admin/farms/${farm.id}/review`
                      : `/admin/farms/${farm.id}`
                  }
                  className="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors"
                >
                  <div>
                    <div className="font-medium text-stone-900 text-sm">{farm.name}</div>
                    <div className="text-xs text-stone-500">{farm.city}, {farm.state}</div>
                  </div>
                  <StatusBadge status={farm.status} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
