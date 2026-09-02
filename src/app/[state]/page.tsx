import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import StateSubNav from '@/components/StateSubNav';
import { ATMOSPHERE_BG, AtmosphereLayers } from '@/components/AtmosphereBanner';
import { STATE_CONFIGS, getStateConfig } from '@/lib/stateContent';

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

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const config = getStateConfig(state);
  if (!config) notFound();

  return (
    <div className="bg-white">
      <StateSubNav stateSlug={config.slug} stateName={config.name} />

      {/* ── Hero (#why) ── */}
      <section id="why" className="relative bg-[#0f172a] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/hero.jpg')" /* placeholder — swap for Richard's cow photography */ }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#0f172a]/70 to-[#0f172a]" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            {config.hero.eyebrow}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{config.hero.headline}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-8">{config.hero.body}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#get-involved"
              className="bg-white text-[#0f172a] px-6 py-3 rounded-lg font-semibold hover:bg-stone-100 transition-colors text-center"
            >
              Get Involved
            </a>
            <Link
              href={`/directory?state=${config.slug}`}
              className="border border-white/40 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors text-center"
            >
              Browse the Directory
            </Link>
          </div>
        </div>
      </section>

      {/* ── Certification ── */}
      <Reveal as="section" id="certification" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#1e293b] mb-3">Certification</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">{config.certification.headline}</h2>
        <p className="text-stone-600 max-w-2xl leading-relaxed mb-8">{config.certification.body}</p>
        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl font-black text-[#9C6A16]">~8,000</span>
          <span className="text-sm text-stone-500 max-w-[26ch] leading-snug">
            beef farmers in {config.name} alone — the starting point, not the limit
          </span>
        </div>
        <Link href="/about-certification" className="text-sm font-medium text-[#1e293b] hover:underline">
          See full certification standards →
        </Link>
      </Reveal>

      <div className="border-t border-stone-100" />

      {/* ── Soil Credits ── */}
      <Reveal as="section" id="soil-credits" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#1e293b] mb-3">Soil Credits</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">{config.soilCredits.headline}</h2>
        <p className="text-stone-600 max-w-2xl leading-relaxed mb-8">{config.soilCredits.body}</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/soil-credits" className="text-sm font-medium text-[#1e293b] hover:underline">
            Soil credits explainer →
          </Link>
          <Link href="/oz-education" className="text-sm font-medium text-[#1e293b] hover:underline">
            Opportunity Zone education →
          </Link>
        </div>
      </Reveal>

      <div className="border-t border-stone-100" />

      {/* ── Impact ── */}
      <Reveal as="section" id="impact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#1e293b] mb-3">Impact</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Real farms, real soil data</h2>
        <p className="text-stone-600 max-w-2xl leading-relaxed mb-8">
          Nutrient density, water retention, and biodiversity — tracked by farm and region, with
          before-and-after stories from the practices behind the numbers.
        </p>
        <div className="border border-dashed border-stone-300 rounded-xl p-8 text-center">
          <p className="text-sm font-medium text-stone-700 mb-1">Featured {config.name} farms coming soon</p>
          <p className="text-xs text-stone-500">This section goes live once the first enrolled farms are confirmed.</p>
        </div>
      </Reveal>

      <div className="border-t border-stone-100" />

      {/* ── Resources ── */}
      <Reveal as="section" id="resources" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#1e293b] mb-3">Resources</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">{config.resources.headline}</h2>
        <p className="text-stone-600 max-w-2xl leading-relaxed mb-6">{config.resources.body}</p>
        <div className="border border-dashed border-stone-300 rounded-xl p-6 text-sm text-stone-500">
          Specific financing and grant programs for {config.name} producers are being added here.
        </div>
      </Reveal>

      {/* ── Get Involved ── */}
      <section id="get-involved" className={`relative py-16 md:py-24 overflow-hidden ${ATMOSPHERE_BG}`}>
        <AtmosphereLayers />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Get Involved</h2>
            <p className="text-slate-200/80 max-w-xl mx-auto">
              Two ways in — get your farm certified, or find {config.name} producers you can trust.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Reveal delay={0}>
              <div className="bg-white/10 border border-white/15 rounded-xl p-8 h-full flex flex-col">
                <div className="inline-flex items-center gap-2 bg-white text-[#0f172a] text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit">
                  Farmers &amp; Producers
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Get Certified</h3>
                <p className="text-sm text-slate-200/80 leading-relaxed mb-6 flex-1">
                  Share your practices and certifications, and get discovered by buyers looking for
                  verified, regenerative {config.name} producers.
                </p>
                <Link
                  href="/apply?type=farm"
                  className="inline-block bg-white text-[#0f172a] px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-100 transition-colors text-sm text-center"
                >
                  Apply as a Farm
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white/5 border border-white/15 rounded-xl p-8 h-full flex flex-col">
                <div className="inline-flex items-center gap-2 bg-white/10 text-slate-200 text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit">
                  Consumers &amp; Businesses
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Find {config.name} Producers</h3>
                <p className="text-sm text-slate-200/80 leading-relaxed mb-6 flex-1">
                  Browse the RegenUS directory, pre-filtered to {config.name}, to find certified farms
                  and the restaurants that source from them.
                </p>
                <Link
                  href={`/directory?state=${config.slug}`}
                  className="inline-block border-2 border-white text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white/10 transition-colors text-sm text-center"
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
