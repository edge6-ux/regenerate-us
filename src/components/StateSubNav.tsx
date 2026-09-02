import Link from 'next/link';

const SECTIONS = [
  { href: '#why', label: 'Why' },
  { href: '#certification', label: 'Certification' },
  { href: '#soil-credits', label: 'Soil Credits' },
  { href: '#impact', label: 'Impact' },
  { href: '#resources', label: 'Resources' },
  { href: '#get-involved', label: 'Get Involved' },
] as const;

export default function StateSubNav({ stateSlug, stateName }: { stateSlug: string; stateName: string }) {
  return (
    <nav
      className="sticky top-0 z-40 bg-[#0f172a] border-b border-white/10 overflow-x-auto scrollbar-none"
      aria-label={`${stateName} page sections`}
    >
      <div className="flex items-center gap-1 px-4 sm:px-6 lg:px-8 h-12 whitespace-nowrap min-w-max">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-300 hover:text-white transition-colors pr-3 mr-2 border-r border-white/10"
        >
          ← RegenUS
        </Link>
        {SECTIONS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
          >
            {s.label}
          </a>
        ))}
        <Link
          href={`/directory?state=${stateSlug}`}
          className="ml-2 text-xs font-semibold bg-white text-[#0f172a] px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          Directory ↗
        </Link>
      </div>
    </nav>
  );
}
