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

function CreditPoint({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className={`${stateDisplayFont.className} uppercase text-base font-black text-[#1C2116] mb-1`}>{label}</p>
      <p className="text-sm text-[#565F49] leading-relaxed">{body}</p>
    </div>
  );
}

function SoilProfileDiagram() {
  return (
    <figure className="bg-white border border-[#DCE3CD] rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 520 420"
        role="img"
        aria-label="Soil profile diagram showing surface grass, topsoil, subsoil, and parent rock, with sampling depths marked"
        className="block w-full h-auto"
      >
        {/* grass surface */}
        <rect y="0" width="520" height="70" fill="#2E7A3E" />
        <g stroke="#1C2116" strokeWidth="3" strokeLinecap="round">
          <path d="M40 70 L36 44" /><path d="M52 70 L54 40" /><path d="M120 70 L114 48" />
          <path d="M190 70 L194 42" /><path d="M260 70 L256 46" /><path d="M330 70 L336 44" />
          <path d="M400 70 L396 48" /><path d="M470 70 L474 42" />
        </g>
        {/* O/A horizon: topsoil */}
        <rect y="70" width="520" height="130" fill="#4A3826" />
        <g fill="#1C2116" opacity=".5">
          <circle cx="80" cy="110" r="4" /><circle cx="210" cy="140" r="3" /><circle cx="340" cy="105" r="4" />
          <circle cx="440" cy="150" r="3" /><circle cx="150" cy="175" r="3" /><circle cx="390" cy="180" r="4" />
        </g>
        {/* roots reaching down */}
        <g stroke="#1C2116" strokeWidth="2" fill="none" opacity=".8">
          <path d="M60 70 C64 120 52 160 60 200" />
          <path d="M200 70 C196 130 210 170 202 210" />
          <path d="M350 70 C356 125 344 175 352 215" />
          <path d="M460 70 C456 120 468 160 462 195" />
        </g>
        {/* B horizon: subsoil */}
        <rect y="200" width="520" height="120" fill="#7A5636" />
        {/* parent rock */}
        <rect y="320" width="520" height="100" fill="#8A5A3C" />
        <g stroke="#6E4630" strokeWidth="2">
          <path d="M0 350 L520 344" /><path d="M0 385 L520 380" />
        </g>
        {/* depth ruler */}
        <g fontSize="14" fill="#F2EFE3">
          <line x1="26" y1="70" x2="26" y2="410" stroke="#F2EFE3" strokeWidth="1.5" />
          <line x1="20" y1="70" x2="32" y2="70" stroke="#F2EFE3" strokeWidth="1.5" />
          <line x1="20" y1="200" x2="32" y2="200" stroke="#F2EFE3" strokeWidth="1.5" />
          <line x1="20" y1="320" x2="32" y2="320" stroke="#F2EFE3" strokeWidth="1.5" />
          <text x="40" y="96">0–12 in · topsoil, sampled at baseline</text>
          <text x="40" y="226">12–24 in · subsoil, resampled over time</text>
          <text x="40" y="346" fill="#E9E0D2">parent material</text>
        </g>
      </svg>
    </figure>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div>
            <h1 className={`${stateDisplayFont.className} uppercase text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C2116] leading-[0.92] mb-3`}>
              {config.heroHeadline}
            </h1>
            <p className="text-sm sm:text-base text-[#565F49] max-w-lg leading-relaxed">{config.heroBody}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/apply?type=farm"
                className="bg-[#E3A93F] text-[#1C2116] text-sm font-semibold px-5 py-2.5 rounded-lg hover:brightness-95 transition"
              >
                Enroll Your Farm
              </Link>
              <Link
                href={directoryHref}
                className="bg-[#1C2116] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-black transition"
              >
                Browse Directory →
              </Link>
            </div>
            <div className={`${stateMonoFont.className} text-xs text-[#565F49] mt-8`}>
              <p>
                <strong className="text-[#1C2116] font-semibold">{config.statHeadline}</strong> {config.statRest}
              </p>
              <p className="mt-1">{config.statSub}</p>
            </div>
          </div>

          {/* Hero photo, filling the column beside the copy */}
          <div className="relative rounded-xl overflow-hidden border border-[#DCE3CD] aspect-[4/3]">
            <Image
              src={config.heroImage.src}
              alt={config.heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-3 left-3 text-white text-xs font-medium drop-shadow">
              {config.heroImage.credit}
            </div>
          </div>
        </div>

        {/* Three-card teaser strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-center">
          <SoilProfileDiagram />
          <div className="flex flex-col gap-6">
            <CreditPoint
              label="Measured, Not Modeled"
              body="Credits start from real soil samples taken on the ranch at certification, then tracked over time — improvement you can dig up, not an estimate from a satellite."
            />
            <CreditPoint
              label="Stacked With the Beef Premium"
              body="Certification earns the market premium; soil credits earn on top of it — two income streams from the same grazing management."
            />
            <CreditPoint
              label="Your Data Stays Yours"
              body="Farm data collected for the credit program belongs to the operation. We use it to verify credits — nothing else."
            />
          </div>
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
