import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import StateSubNav from '@/components/StateSubNav';
import { STATE_CONFIGS, getStateConfig, type StateConfig } from '@/lib/stateContent';
import { stateDisplayFont, stateBodyFont, stateMonoFont } from '@/lib/stateFonts';

export function generateStaticParams() {
  return Object.keys(STATE_CONFIGS).map((slug) => ({ state: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const config = getStateConfig(state);
  if (!config) return {};
  return { title: `${config.name} — RegenUS` };
}

function TeaserCard({
  accent,
  href,
  label,
  headline,
  body,
}: {
  accent: string;
  href: string;
  label: string;
  headline: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white border border-[#DCE3CD] rounded-lg p-4 border-t-[3px] hover:shadow-md transition-shadow"
      style={{ borderTopColor: accent }}
    >
      <p className={`${stateMonoFont.className} text-[10px] font-semibold uppercase tracking-wider mb-1.5`} style={{ color: accent }}>
        {label}
      </p>
      <p className={`${stateDisplayFont.className} uppercase text-sm font-bold text-[#1C2116] leading-tight mb-1`}>
        {headline}
      </p>
      <p className="text-xs text-[#565F49] leading-snug">{body}</p>
    </a>
  );
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p
      className={`${stateMonoFont.className} text-[11px] font-semibold uppercase tracking-widest mb-3`}
      style={{ color }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className={`${stateDisplayFont.className} uppercase text-3xl sm:text-4xl font-black text-[#1C2116] mb-4 leading-[1.02]`}>
      {children}
    </h2>
  );
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const config: StateConfig | null = getStateConfig(state);
  if (!config) notFound();

  const directoryHref = `/directory?state=${config.slug}`;

  return (
    <div className={`${stateBodyFont.className} bg-[#F3F6ED]`}>
      <StateSubNav stateSlug={config.slug} stateName={config.name} />

      {/* ── Hero (#why) ── */}
      <section id="why" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        <p className={`${stateMonoFont.className} text-[11px] font-semibold uppercase tracking-widest text-[#2E7A3E] mb-2`}>
          Platform · {config.platformLabel}
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-5">
          <div>
            <h1 className={`${stateDisplayFont.className} uppercase text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C2116] leading-[0.92] mb-3`}>
              {config.heroHeadline}
            </h1>
            <p className="text-sm sm:text-base text-[#565F49] max-w-lg leading-relaxed">{config.heroBody}</p>
          </div>
          <div className={`${stateMonoFont.className} text-left lg:text-right text-xs text-[#565F49] shrink-0`}>
            <p>
              <strong className="text-[#1C2116] font-semibold">{config.statHeadline}</strong> {config.statRest}
            </p>
            <p className="mt-1">{config.statSub}</p>
          </div>
        </div>

        {/* Hero photo with overlay caption + CTAs */}
        <div className="relative rounded-xl overflow-hidden border border-[#DCE3CD] h-[220px] sm:h-[300px] md:h-[380px]">
          <Image
            src={config.heroImage.src}
            alt={config.heroImage.alt}
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-4 left-4 text-white text-xs font-medium drop-shadow">
            {config.heroImage.credit}
          </div>
          <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 justify-end">
            <Link
              href="/apply?type=farm"
              className="bg-[#E3A93F] text-[#1C2116] text-sm font-semibold px-4 py-2 rounded-lg hover:brightness-95 transition"
            >
              Enroll Your Farm
            </Link>
            <Link
              href={directoryHref}
              className="bg-[#1C2116] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black transition"
            >
              Browse Directory →
            </Link>
          </div>
        </div>

        {/* Three-card teaser strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <TeaserCard accent="#9C6A16" href="#certification" {...config.cards.certification} />
          <TeaserCard accent="#2E7A3E" href="#soil-credits" {...config.cards.soilCredits} />
          <TeaserCard accent="#215F86" href={directoryHref} {...config.cards.directory} />
        </div>
      </section>

      {/* ── Certification ── */}
      <Reveal as="section" id="certification" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#DCE3CD]">
        <SectionLabel color="#9C6A16">Certification</SectionLabel>
        <SectionHeading>{config.certification.headline}</SectionHeading>
        <p className="text-[#565F49] max-w-2xl leading-relaxed mb-6">{config.certification.body}</p>
        <Link href="/about-certification" className="text-sm font-semibold text-[#9C6A16] hover:underline">
          See full certification standards →
        </Link>
      </Reveal>

      {/* ── Soil Credits ── */}
      <Reveal as="section" id="soil-credits" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#DCE3CD]">
        <SectionLabel color="#2E7A3E">Soil Credits</SectionLabel>
        <SectionHeading>{config.soilCredits.headline}</SectionHeading>
        <p className="text-[#565F49] max-w-2xl leading-relaxed mb-6">{config.soilCredits.body}</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/soil-credits" className="text-sm font-semibold text-[#2E7A3E] hover:underline">
            Soil credits explainer →
          </Link>
          <Link href="/oz-education" className="text-sm font-semibold text-[#2E7A3E] hover:underline">
            Opportunity Zone education →
          </Link>
        </div>
      </Reveal>

      {/* ── Impact ── */}
      <Reveal as="section" id="impact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#DCE3CD]">
        <SectionLabel color="#157163">Impact</SectionLabel>
        <SectionHeading>Real farms, real soil data</SectionHeading>
        <p className="text-[#565F49] max-w-2xl leading-relaxed mb-6">
          Nutrient density, water retention, and biodiversity — tracked by farm and region, with
          before-and-after stories from the practices behind the numbers.
        </p>
        <div className="border border-dashed border-[#DCE3CD] rounded-xl p-8 text-center bg-white">
          <p className="text-sm font-medium text-[#1C2116] mb-1">Featured {config.name} farms coming soon</p>
          <p className="text-xs text-[#565F49]">This section goes live once the first enrolled farms are confirmed.</p>
        </div>
      </Reveal>

      {/* ── Resources ── */}
      <Reveal as="section" id="resources" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#DCE3CD]">
        <SectionLabel color="#7A4A26">Resources</SectionLabel>
        <SectionHeading>{config.resources.headline}</SectionHeading>
        <p className="text-[#565F49] max-w-2xl leading-relaxed mb-6">{config.resources.body}</p>
        <div className="border border-dashed border-[#DCE3CD] rounded-xl p-6 text-sm text-[#565F49] bg-white">
          Specific financing and grant programs for {config.name} producers are being added here.
        </div>
      </Reveal>

      {/* ── Get Involved ── */}
      <section id="get-involved" className="bg-[#1C2116] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className={`${stateMonoFont.className} text-[11px] font-semibold uppercase tracking-widest text-[#E3A93F] mb-3`}>
              Get Involved
            </p>
            <h2 className={`${stateDisplayFont.className} uppercase text-3xl md:text-4xl font-black text-white mb-3`}>
              Two ways in
            </h2>
            <p className="text-[#A9AF9A] max-w-xl mx-auto">
              Get your farm certified, or find {config.name} producers you can trust.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Reveal delay={0}>
              <div className="bg-white/5 border border-white/15 rounded-xl p-8 h-full flex flex-col">
                <p className={`${stateMonoFont.className} text-[10px] font-semibold uppercase tracking-wider text-[#E3A93F] mb-3`}>
                  Farmers &amp; Producers
                </p>
                <h3 className={`${stateDisplayFont.className} uppercase text-xl font-black text-white mb-3`}>Get Certified</h3>
                <p className="text-sm text-[#A9AF9A] leading-relaxed mb-6 flex-1">
                  Share your practices and certifications, and get discovered by buyers looking for
                  verified, regenerative {config.name} producers.
                </p>
                <Link
                  href="/apply?type=farm"
                  className="inline-block bg-[#E3A93F] text-[#1C2116] px-5 py-2.5 rounded-lg font-semibold hover:brightness-95 transition text-sm text-center"
                >
                  Apply as a Farm
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white/5 border border-white/15 rounded-xl p-8 h-full flex flex-col">
                <p className={`${stateMonoFont.className} text-[10px] font-semibold uppercase tracking-wider text-[#A9AF9A] mb-3`}>
                  Consumers &amp; Businesses
                </p>
                <h3 className={`${stateDisplayFont.className} uppercase text-xl font-black text-white mb-3`}>
                  Find {config.name} Producers
                </h3>
                <p className="text-sm text-[#A9AF9A] leading-relaxed mb-6 flex-1">
                  Browse the RegenUS directory, pre-filtered to {config.name}, to find certified farms
                  and the restaurants that source from them.
                </p>
                <Link
                  href={directoryHref}
                  className="inline-block border-2 border-white text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-white/10 transition text-sm text-center"
                >
                  Browse the Directory
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
