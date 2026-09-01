import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'Soil Credits — Regen USA',
};

export default function SoilCreditsPage() {
  return (
    <ComingSoonPage
      title="Soil Credits"
      description="We're finalizing details on our soil-credit program — how farms can participate, how credits are calculated, and program terms. Check back soon for the full breakdown."
    />
  );
}
