import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resources — RegenUS',
};

const RESOURCES = [
  {
    href: '/soil-credits',
    title: 'Soil Credits',
    description:
      "How farms can participate in our soil-credit program, how credits are calculated, and program terms.",
  },
  {
    href: '/oz-education',
    title: 'Opportunity Zone Education',
    description:
      'Educational resources on Opportunity Zones and how they intersect with regenerative land investment.',
  },
  {
    href: '/conservation-grants',
    title: 'Conservation Easements & Grants',
    description:
      'A guide to conservation easement programs and grant opportunities available to regenerative farms.',
  },
  {
    href: '/regenerative-resources',
    title: 'Regenerative Resources',
    description:
      'Guides, tools, and reference material for farms practicing regenerative agriculture.',
  },
  {
    href: '/general-resources',
    title: 'General Resources',
    description: 'General resources for farms and restaurants in the RegenUS network.',
  },
] as const;

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Resources</h1>
        <p className="text-stone-600 leading-relaxed">
          Guides, education, and program details for farms and restaurants in the RegenUS
          network. These sections are being built out — check back as they go live.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {RESOURCES.map(({ href, title, description }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white border border-stone-200 rounded-xl p-6 hover:border-[#1e293b]/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="text-lg font-semibold text-stone-900 group-hover:text-[#1e293b] transition-colors">
                {title}
              </h2>
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider bg-stone-100 text-stone-500 px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
