'use client';

import { useState } from 'react';
import { submitRestaurantReviewDecision } from '@/lib/actions';

export type RestaurantReviewDecision = 'approved' | 'rejected' | 'pending';

export default function RestaurantReviewActions({
  restaurantId,
  adminTier,
  onCompleted,
}: {
  restaurantId: string;
  adminTier: number;
  onCompleted?: (decision: RestaurantReviewDecision) => void;
}) {
  const [loading, setLoading] = useState<RestaurantReviewDecision | null>(null);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');

  async function submit(decision: RestaurantReviewDecision) {
    setError('');
    setLoading(decision);
    const result = await submitRestaurantReviewDecision(restaurantId, decision, notes.trim() || undefined);
    setLoading(null);
    if (result.error) {
      setError(result.error);
      return;
    }
    onCompleted?.(decision);
  }

  if (adminTier < 2) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Approving or rejecting restaurants requires <strong>Reviewer</strong> (Tier 2) or higher.
      </div>
    );
  }

  const btnBase =
    'inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[7rem]';

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Note (optional, visible to the restaurant if rejected)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => submit('approved')}
          className={`${btnBase} bg-slate-600 text-white hover:bg-slate-700`}
        >
          {loading === 'approved' ? 'Saving…' : 'Approve'}
        </button>
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => submit('rejected')}
          className={`${btnBase} bg-red-600 text-white hover:bg-red-700`}
        >
          {loading === 'rejected' ? 'Saving…' : 'Reject'}
        </button>
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => submit('pending')}
          className={`${btnBase} bg-white border border-stone-300 text-stone-800 hover:bg-stone-50`}
        >
          {loading === 'pending' ? 'Saving…' : 'Pending'}
        </button>
      </div>
      <p className="text-xs text-stone-500">
        <strong>Pending</strong> keeps the application in the review queue without approving or rejecting.
      </p>
    </div>
  );
}
