import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'Regenerative Resources — RegenUS',
};

export default function RegenerativeResourcesPage() {
  return (
    <ComingSoonPage
      title="Regenerative Resources"
      description="Guides, tools, and reference material for farms practicing regenerative agriculture. This section is in development."
    />
  );
}
