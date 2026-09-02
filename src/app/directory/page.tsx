import { createClient } from '@/lib/supabase/server';
import { fetchApprovedFarmsForDirectory } from '@/lib/supabase/directory-farms';
import { getStateConfig } from '@/lib/stateContent';
import DirectoryClient from './DirectoryClient';

/** Always fetch fresh directory data (avoid stale empty cache after new approvals). */
export const dynamic = 'force-dynamic';

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const { state } = await searchParams;
  const stateConfig = state ? getStateConfig(state) : null;

  const supabase = await createClient();

  // Fetch approved restaurants
  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('*')
    .eq('status', 'approved');

  // Approved farms only (service role when configured so RLS cannot hide public listings)
  const farms = await fetchApprovedFarmsForDirectory();

  return (
    <DirectoryClient
      restaurants={restaurants || []}
      farms={farms}
      initialCenter={stateConfig?.centroid}
      initialStateName={stateConfig?.name}
    />
  );
}
