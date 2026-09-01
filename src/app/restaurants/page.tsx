import { redirect } from 'next/navigation';

/** The restaurant directory lives at /directory now; this URL stays valid as a redirect. */
export default function RestaurantsIndexRedirect() {
  redirect('/directory');
}
