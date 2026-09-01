import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default async function AdminRestaurantsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const filterStatus = params.status || 'all';
  const supabase = await createClient();

  let query = supabase
    .from('restaurants')
    .select('id, name, city, state, status, contact_email, created_at')
    .order('created_at', { ascending: false });

  if (filterStatus !== 'all') {
    query = query.eq('status', filterStatus);
  }

  const { data: restaurants } = await query;
  const rows = restaurants ?? [];

  const statuses = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Restaurants</h1>
      <p className="text-sm text-stone-500 mb-8 max-w-2xl">
        Manage restaurant listings — profile edits, approval status, and map coordinates.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map((s) => (
          <Link
            key={s.key}
            href={s.key === 'all' ? '/admin/restaurants' : `/admin/restaurants?status=${s.key}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === s.key
                ? 'bg-[#1e293b] text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        {rows.length === 0 ? (
          <div className="p-8 text-center text-stone-500 text-sm">No restaurants found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-left px-6 py-3 font-medium text-stone-600">Name</th>
                  <th className="text-left px-6 py-3 font-medium text-stone-600 hidden md:table-cell">Location</th>
                  <th className="text-left px-6 py-3 font-medium text-stone-600">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-stone-600 hidden sm:table-cell">Contact</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-stone-900">
                      <Link
                        href={r.status === 'pending' ? `/admin/restaurants/${r.id}/review` : `/admin/restaurants/${r.id}`}
                        className="hover:underline"
                      >
                        {r.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-stone-500 hidden md:table-cell">
                      {r.city}, {r.state}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-6 py-4 text-stone-500 text-xs hidden sm:table-cell truncate max-w-[200px]">
                      {r.contact_email}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={r.status === 'pending' ? `/admin/restaurants/${r.id}/review` : `/admin/restaurants/${r.id}`}
                        className="text-[#1e293b] hover:underline font-medium whitespace-nowrap"
                      >
                        {r.status === 'pending' ? 'Review →' : 'Manage →'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
