import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default async function AdminRestaurantsPendingPage() {
  const supabase = await createClient();
  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('id, name, city, state, created_at, contact_email')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  const pending = restaurants ?? [];
  const firstId = pending[0]?.id;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Pending restaurant applications</h1>
        <p className="text-sm text-stone-500 max-w-2xl">
          Review restaurant listings in the focused workspace, then move through the queue with Previous / Next.
          Full profile editing stays on the restaurant profile page.
        </p>
      </div>

      {firstId && (
        <div className="mb-8">
          <Link
            href={`/admin/restaurants/${firstId}/review`}
            className="inline-flex items-center gap-2 bg-[#1e293b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0f172a] transition-colors"
          >
            Start reviewing
            <span className="opacity-90">({pending.length} pending)</span>
          </Link>
        </div>
      )}

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        {pending.length === 0 ? (
          <div className="p-10 text-center text-stone-500 text-sm">No pending restaurant applications.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-left px-6 py-3 font-medium text-stone-600">Restaurant</th>
                  <th className="text-left px-6 py-3 font-medium text-stone-600 hidden md:table-cell">Location</th>
                  <th className="text-left px-6 py-3 font-medium text-stone-600 hidden sm:table-cell">Applied</th>
                  <th className="text-left px-6 py-3 font-medium text-stone-600">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pending.map((restaurant, i) => (
                  <tr key={restaurant.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900">{restaurant.name}</div>
                      <div className="text-xs text-stone-500 md:hidden mt-0.5">
                        {restaurant.city}, {restaurant.state}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-500 hidden md:table-cell">
                      {restaurant.city}, {restaurant.state}
                    </td>
                    <td className="px-6 py-4 text-stone-500 hidden sm:table-cell">
                      {new Date(restaurant.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status="pending" />
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/restaurants/${restaurant.id}/review`}
                        className="text-[#1e293b] hover:underline font-medium"
                      >
                        Review {i + 1} →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-stone-500">
        Tip: The <Link href="/admin/review-queue" className="text-[#1e293b] hover:underline">Review queue</Link> shows pending restaurants alongside farm applications.
      </p>
    </div>
  );
}
