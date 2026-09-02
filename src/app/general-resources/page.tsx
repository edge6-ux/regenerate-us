import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'General Resources — RegenUS',
};

export default function GeneralResourcesPage() {
  return (
    <ComingSoonPage
      title="General Resources"
      description="General resources for farms and restaurants in the RegenUS network. This section is in development."
    />
  );
}
