import Link from 'next/link';
import { stateBodyFont, stateMonoFont } from '@/lib/stateFonts';

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
      className={`${stateBodyFont.className} sticky top-0 z-40 bg-white border-b border-[#DCE3CD] overflow-x-auto scrollbar-none`}
      aria-label={`${stateName} page sections`}
    >
      <div className="flex items-center gap-2 px-4 sm:px-6 lg:px-8 h-14 whitespace-nowrap min-w-max">
        <Link
          href="/"
          className={`${stateMonoFont.className} text-xs font-medium text-[#565F49] hover:text-[#1C2116] transition-colors pr-3 mr-1 border-r border-[#DCE3CD]`}
        >
          ← RegenUS
        </Link>
        {SECTIONS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="text-[13px] font-medium text-[#1C2116] px-3.5 py-1.5 rounded-full border border-[#DCE3CD] hover:border-[#565F49] hover:bg-[#F3F6ED] transition-colors"
          >
            {s.label}
          </a>
        ))}
        <Link
          href={`/directory?state=${stateSlug}`}
          className="text-[13px] font-semibold text-[#215F86] px-3.5 py-1.5 rounded-full border border-[#215F86] bg-[#215F86]/5 hover:bg-[#215F86]/10 transition-colors"
        >
          Directory ↗
        </Link>
      </div>
    </nav>
  );
}
