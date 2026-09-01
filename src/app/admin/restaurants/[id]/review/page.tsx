import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import RestaurantReviewClient from '@/components/RestaurantReviewClient';
import type { Restaurant } from '@/lib/types';

export default async function AdminRestaurantReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('admin_tier, role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/login');

  const { data: restaurant, error } = await supabase.from('restaurants').select('*').eq('id', id).single();
  if (error || !restaurant) notFound();

  const { data: pendingRows } = await supabase
    .from('restaurants')
    .select('id')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  const pendingQueueIds = (pendingRows ?? []).map((r) => r.id as string);

  return (
    <RestaurantReviewClient
      restaurant={restaurant as Restaurant}
      pendingQueueIds={pendingQueueIds}
      adminTier={profile?.admin_tier ?? 1}
    />
  );
}
