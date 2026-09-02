import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default async function RestaurantDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, restaurant_id')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'restaurant' || !profile.restaurant_id) {
    redirect('/login');
  }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', profile.restaurant_id)
    .single();

  if (!restaurant) redirect('/login');

  const isApproved = restaurant.status === 'approved';

  const statusCopy: Record<string, string> = {
    pending: 'Your listing is awaiting review. We’ll email you once a decision is made.',
    approved: 'Your restaurant is live in the RegenUS public directory.',
    rejected: 'Your listing was not approved.',
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-sm text-stone-500 mb-1">Restaurant Dashboard</p>
          <h1 className="text-2xl font-bold text-stone-900">{restaurant.name}</h1>
          <p className="text-stone-500 text-sm mt-0.5">{restaurant.city}, {restaurant.state}</p>
        </div>
        {isApproved && (
          <div className="flex items-center gap-3">
            <Link
              href={`/restaurants/${restaurant.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#1e293b] hover:underline font-medium"
            >
              View Public Listing →
            </Link>
            <Link
              href="/dashboard/restaurant/qr-card"
              className="text-sm border border-[#1e293b] text-[#1e293b] px-3 py-1.5 rounded-lg font-medium hover:bg-[#1e293b]/5 transition-colors"
            >
              Get QR Card
            </Link>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Listing status */}
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h2 className="font-semibold text-stone-900">Listing status</h2>
            <StatusBadge status={restaurant.status} />
          </div>
          <p className="text-sm text-stone-500 mt-2">{statusCopy[restaurant.status] ?? ''}</p>
          {restaurant.status === 'rejected' && restaurant.admin_notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 mt-3">
              <span className="font-semibold">Note from RegenUS:</span> {restaurant.admin_notes}
            </div>
          )}
        </div>

        {/* Sourcing CTA */}
        <div className="bg-[#1e293b]/5 border border-[#1e293b]/20 rounded-xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-semibold text-stone-900">Sources from RegenUS farms?</h2>
            <p className="text-sm text-stone-500 mt-1">
              Browse the directory to find and promote the farms behind your menu.
            </p>
          </div>
          <Link
            href="/directory"
            className="bg-[#1e293b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0f172a] transition-colors whitespace-nowrap"
          >
            Browse RegenUS Farms →
          </Link>
        </div>

        {/* Health Practices */}
        {restaurant.health_practices && restaurant.health_practices.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-xl p-6">
            <h2 className="font-semibold text-stone-900 mb-3">Better Health Practices</h2>
            <div className="flex flex-wrap gap-2">
              {restaurant.health_practices.map((p: string) => (
                <span key={p} className="inline-flex items-center gap-1.5 bg-[#1e293b]/8 text-[#1e293b] text-xs font-medium px-3 py-1.5 rounded-full border border-[#1e293b]/20">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </span>
              ))}
            </div>
            <p className="text-xs text-stone-400 mt-3">To update your practices, contact RegenUS directly.</p>
          </div>
        )}

        {/* Restaurant info */}
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h2 className="font-semibold text-stone-900 mb-4">Your Info on File</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-stone-500">Contact:</span>{' '}
              <span className="text-stone-900">{restaurant.contact_name}</span>
            </div>
            <div>
              <span className="text-stone-500">Email:</span>{' '}
              <span className="text-stone-900">{restaurant.contact_email}</span>
            </div>
            <div>
              <span className="text-stone-500">Phone:</span>{' '}
              <span className="text-stone-900">{restaurant.contact_phone}</span>
            </div>
            <div>
              <span className="text-stone-500">Address:</span>{' '}
              <span className="text-stone-900">
                {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zip}
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-4">
            To update your info, contact RegenUS directly.
          </p>
        </div>
      </div>
    </div>
  );
}
