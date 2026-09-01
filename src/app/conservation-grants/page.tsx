import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'Conservation Easements & Grants — Regen USA',
};

export default function ConservationGrantsPage() {
  return (
    <ComingSoonPage
      title="Conservation Easements & Grants"
      description="A guide to conservation easement programs and grant opportunities available to regenerative farms. This section is in development."
    />
  );
}
