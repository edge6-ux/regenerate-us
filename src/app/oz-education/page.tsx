import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'Opportunity Zone Education — Regen USA',
};

export default function OzEducationPage() {
  return (
    <ComingSoonPage
      title="Opportunity Zone Education"
      description="Educational resources on Opportunity Zones and how they intersect with regenerative land investment. This section is in development."
    />
  );
}
