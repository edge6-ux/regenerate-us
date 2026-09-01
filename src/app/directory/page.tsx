import { createClient } from '@/lib/supabase/server';
import { fetchApprovedFarmsForDirectory } from '@/lib/supabase/directory-farms';
import DirectoryClient from './DirectoryClient';

/** Always fetch fresh directory data (avoid stale empty cache after new approvals). */
export const dynamic = 'force-dynamic';

export default async function DirectoryPage() {
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
    />
  );
}
