-- Phase 2 (Farm Pivot): restaurants become a flat status-gated listing, like farms.
-- Additive only — submissions/dishes tables and participation_level column are left
-- untouched (unused going forward, preserved for history).

ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
  CHECK (status IN ('pending', 'approved', 'rejected'));
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS approved_at timestamptz;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS reviewed_by text;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS admin_notes text;

-- Backfill existing rows from their historical submission outcome so currently-listed
-- restaurants don't disappear from the directory once the app switches to `status`.
UPDATE restaurants r SET status = 'approved', approved_at = COALESCE(r.approved_at, now())
WHERE EXISTS (
  SELECT 1 FROM submissions s WHERE s.restaurant_id = r.id AND s.status = 'approved'
);

UPDATE restaurants r SET status = 'rejected'
WHERE r.status = 'pending'
  AND EXISTS (SELECT 1 FROM submissions s WHERE s.restaurant_id = r.id AND s.status = 'rejected')
  AND NOT EXISTS (SELECT 1 FROM submissions s2 WHERE s2.restaurant_id = r.id AND s2.status = 'approved');

-- Everything else (no submissions, or only pending/needs_clarification ones) stays 'pending'.
