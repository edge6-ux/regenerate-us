'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBadge from '@/components/StatusBadge';
import RestaurantReviewActions, { type RestaurantReviewDecision } from '@/components/RestaurantReviewActions';
import type { Restaurant } from '@/lib/types';

function getNextQueueId(queueIds: string[], currentId: string): string | null {
  const idx = queueIds.indexOf(currentId);
  if (idx === -1) return queueIds[0] ?? null;
  if (idx < queueIds.length - 1) return queueIds[idx + 1]!;
  return null;
}

export default function RestaurantReviewClient({
  restaurant,
  pendingQueueIds,
  adminTier,
}: {
  restaurant: Restaurant;
  pendingQueueIds: string[];
  adminTier: number;
}) {
  const router = useRouter();
  const inPendingQueue = restaurant.status === 'pending' && pendingQueueIds.includes(restaurant.id);
  const queueIndex = pendingQueueIds.indexOf(restaurant.id);
  const prevId = queueIndex > 0 ? pendingQueueIds[queueIndex - 1]! : null;
  const nextId =
    queueIndex >= 0 && queueIndex < pendingQueueIds.length - 1
      ? pendingQueueIds[queueIndex + 1]!
      : null;

  function afterDecision(decision: RestaurantReviewDecision) {
    if (decision === 'approved' || decision === 'rejected') {
      const next = getNextQueueId(pendingQueueIds, restaurant.id);
      if (next && next !== restaurant.id) {
        router.push(`/admin/restaurants/${next}/review`);
        router.refresh();
        return;
      }
    }
    router.push('/admin/review-queue');
    router.refresh();
  }

  const healthPractices = restaurant.health_practices ?? [];

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Link href="/admin/review-queue" className="text-sm text-[#1e293b] hover:underline">
          ← Review queue
        </Link>
        <span className="text-stone-300">|</span>
        <Link
          href={`/admin/restaurants/${restaurant.id}`}
          className="text-sm text-stone-500 hover:text-stone-800 hover:underline"
        >
          Open full restaurant profile (edit)
        </Link>
      </div>

      {inPendingQueue && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3">
          <p className="text-sm text-stone-600">
            <span className="font-semibold text-stone-900">Queue:</span>{' '}
            {queueIndex + 1} of {pendingQueueIds.length} pending
          </p>
          <div className="flex gap-2">
            {prevId ? (
              <Link
                href={`/admin/restaurants/${prevId}/review`}
                className="text-sm font-medium px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50"
              >
                ← Previous
              </Link>
            ) : (
              <span className="text-sm px-3 py-1.5 text-stone-400">← Previous</span>
            )}
            {nextId ? (
              <Link
                href={`/admin/restaurants/${nextId}/review`}
                className="text-sm font-medium px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50"
              >
                Next →
              </Link>
            ) : (
              <span className="text-sm px-3 py-1.5 text-stone-400">Next →</span>
            )}
          </div>
        </div>
      )}

      {!inPendingQueue && restaurant.status !== 'pending' && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          This restaurant is <strong>{restaurant.status}</strong> and is not in the pending queue. You can still
          update status below or{' '}
          <Link href={`/admin/restaurants/${restaurant.id}`} className="font-medium underline">
            manage the full profile
          </Link>
          .
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 mb-1">{restaurant.name}</h1>
          <p className="text-stone-500 text-sm">
            {restaurant.city}, {restaurant.state}
            {restaurant.contact_email && (
              <>
                {' · '}
                <a href={`mailto:${restaurant.contact_email}`} className="text-[#1e293b] hover:underline">
                  {restaurant.contact_email}
                </a>
              </>
            )}
          </p>
        </div>
        <StatusBadge status={restaurant.status} />
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Decision</h2>
        <RestaurantReviewActions restaurantId={restaurant.id} adminTier={adminTier} onCompleted={afterDecision} />
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Profile</h2>
          <div className="space-y-4 text-sm">
            {healthPractices.length > 0 && (
              <div>
                <p className="text-stone-500 font-medium mb-2">Better health practices</p>
                <ul className="flex flex-wrap gap-2">
                  {healthPractices.map((p) => (
                    <li
                      key={p}
                      className="inline-flex items-center rounded-full bg-[#1e293b]/10 text-[#1e293b] text-xs font-medium px-3 py-1 border border-[#1e293b]/20"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {restaurant.description && (
              <div>
                <p className="text-stone-500 font-medium mb-1">Description</p>
                <p className="text-stone-800 whitespace-pre-wrap">{restaurant.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Contact (reference)</h2>
          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-stone-500">Name</dt>
              <dd className="text-stone-900">{restaurant.contact_name}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Phone</dt>
              <dd className="text-stone-900">{restaurant.contact_phone}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Website</dt>
              <dd className="text-stone-900">{restaurant.website || '—'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-stone-500">Address</dt>
              <dd className="text-stone-900">
                {[restaurant.address, restaurant.city, restaurant.state, restaurant.zip].filter(Boolean).join(', ') || '—'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
