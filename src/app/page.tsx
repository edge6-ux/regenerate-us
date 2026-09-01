import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { createClient } from '@/lib/supabase/server';
import { fetchApprovedFarmsForDirectory } from '@/lib/supabase/directory-farms';
import { ATMOSPHERE_BG, AtmosphereLayers } from '@/components/AtmosphereBanner';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const showApplyCtas = !user;
  const approvedFarms = await fetchApprovedFarmsForDirectory();
  const farmCount = approvedFarms.length;

  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden -mt-16 min-h-[calc(100dvh+4rem)]">
        <Image
          src="/hero.jpg"
          alt="Farm hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/85 to-[#1e293b]/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 md:pt-48 md:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-6">
              <span>Regenerative Farms &amp; Farm-to-Table Directory</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Know Where Your Food{' '}
              <span className="text-slate-300">Really</span> Comes From
            </h1>
            <p className="text-lg md:text-xl text-slate-100 mb-10 leading-relaxed">
              Regen USA verifies farms committed to regenerative, transparent practices, and
              connects them with the farm-to-table restaurants that source from them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {showApplyCtas && (
                <Link
                  href="/apply"
                  className="bg-white text-[#0f172a] px-8 py-3.5 rounded-xl font-semibold text-center hover:bg-slate-50 transition-colors"
                >
                  Apply Now
                </Link>
              )}
              <Link
                href="/directory"
                className="border-2 border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold text-center hover:bg-white/10 transition-colors"
              >
                Browse the Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-[#f5f4f1]">
        <div
          className="absolute inset-x-0 top-0 h-[140px] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(100deg, rgba(20,36,92,0.05) 0px, rgba(20,36,92,0.05) 2px, transparent 2px, transparent 26px)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: -40,
            right: '8%',
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(200,113,15,0.14) 0%, rgba(200,113,15,0) 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">How It Works</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Farms apply with their practices and certifications; restaurants apply to be listed as
              farm-to-table partners. Both go through a quick review before appearing publicly.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 'Step 01',
                title: 'Apply',
                description:
                  'Farms submit their practices and certifications; restaurants submit their profile and story.',
              },
              {
                step: 'Step 02',
                title: 'Verify',
                description:
                  'Our team reviews the application — practices, certifications, and sourcing claims.',
              },
              {
                step: 'Step 03',
                title: 'Get Listed',
                description:
                  'Approved farms and restaurants appear in our public directory with full transparency.',
              },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white border border-stone-200 border-t-[3px] border-t-[#1e293b] rounded-lg p-7">
                  <div className="text-xs font-extrabold text-[#1e293b] tracking-wider mb-3">
                    {step.step.toUpperCase()}
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-3">{step.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className={`relative py-16 md:py-24 text-white overflow-hidden ${ATMOSPHERE_BG}`}>
        <AtmosphereLayers />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Local Sourcing Matters</h2>
              <p className="text-slate-200/80 max-w-md mb-8">
                Every purchasing decision a restaurant makes is a vote for the kind of food system we want.
                Regen USA makes those decisions visible.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-[#f0a23e]">100%</span>
                <span className="text-sm text-slate-300 max-w-[22ch] leading-snug">
                  of listed farms are reviewed before appearing in the directory
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col gap-6">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                      </svg>
                    ),
                    title: 'Supports Local Economies',
                    description: 'Dollars spent on local farms stay in the community, supporting livelihoods and building regional food resilience.',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                    ),
                    title: 'Verified Transparency',
                    description: 'Every listed farm names its actual practices and certifications — no vague claims, no greenwashing.',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    ),
                    title: 'Better for Your Health',
                    description: 'Locally sourced, regeneratively raised ingredients mean food that\'s fresher, more nutrient-dense, and free from the industrial additives common in long supply chains.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-200/70 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Restaurants: Get Listed */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mx-auto text-center border border-stone-200 rounded-xl p-8 md:p-10">
            <div className="inline-flex items-center gap-2 bg-[#1e293b]/10 text-[#1e293b] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              For Restaurants
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">Get Listed as a Farm-to-Table Partner</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              A free directory listing for restaurants that source from regenerative farms — no dish-by-dish
              certification, no tiers. Apply, pass a quick review, and get discovered.
            </p>
            {showApplyCtas && (
              <Link
                href="/apply"
                className="inline-block bg-[#1e293b] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0f172a] transition-colors text-sm"
              >
                Apply Now
              </Link>
            )}
          </Reveal>
        </div>
      </section>

      {/* For Farms */}
      <section className={`relative py-16 md:py-24 overflow-hidden ${ATMOSPHERE_BG}`}>
        <AtmosphereLayers />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-slate-200 text-xs font-semibold px-3 py-1 rounded-full mb-5">
                  For Farms & Producers
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Restaurants Are Looking for You
                </h2>
                <p className="text-slate-100 leading-relaxed mb-4">
                  Every farm in our directory is reviewed and verified for its practices.
                  Restaurants in our network are actively searching for local suppliers who meet
                  the program&apos;s standards — get in front of them by registering your farm.
                </p>
                <p className="text-slate-200 leading-relaxed mb-6">
                  We verify your certifications and practices so restaurants can source from you
                  with confidence. Your profile, products, and contact info are searchable by
                  buyers in the directory.
                </p>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl font-black text-[#f0a23e]">{farmCount}</span>
                  <span className="text-sm text-slate-300 max-w-[24ch] leading-snug">
                    farms already listed and searchable in the directory
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  {showApplyCtas && (
                    <Link
                      href="/apply?type=farm"
                      className="inline-block bg-white text-[#1e3a8a] px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-sm"
                    >
                      Register Your Farm
                    </Link>
                  )}
                  <Link
                    href="/directory"
                    className="text-sm text-slate-300 hover:text-white font-medium transition-colors"
                  >
                    View the Directory →
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Reach Buyers', desc: 'Restaurants using our directory are actively sourcing — your farm gets found' },
                  { label: 'Build Credibility', desc: 'Regen USA-verified practices carry weight with health-conscious restaurants' },
                  { label: 'Showcase Standards', desc: 'Display your certifications, welfare practices, and production methods' },
                  { label: 'Grow Your Network', desc: 'Every restaurant that lists you as a source builds your reputation' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 border border-white/10 rounded-xl p-5">
                    <h4 className="text-sm font-semibold text-white mb-1">{item.label}</h4>
                    <p className="text-xs text-slate-200 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-8 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">What We Look For</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Every farm application is reviewed against a consistent set of practice standards.
              Here&apos;s what matters most.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                ),
                title: 'Identified Producer',
                desc: 'The farm behind the food must be named and locatable — no anonymous distributors.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 5.4-5 7.8-5 11a5 5 0 0 0 10 0c0-3.2-3.8-5.6-5-11Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v4" />
                  </svg>
                ),
                title: 'Local & Regional',
                desc: 'We prioritize producers within the region, supporting shorter supply chains and fresher food.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
                title: 'Verifiable Practices',
                desc: 'Farms should be able to back up sourcing and production claims with documentation or certifications when asked.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                ),
                title: 'Honest Representation',
                desc: 'Farms must accurately represent their practices, and restaurants must accurately represent who they source from.',
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-stone-50 border border-stone-100 rounded-xl p-6 h-full">
                  <div className="w-11 h-11 bg-[#1e293b]/10 rounded-xl flex items-center justify-center text-[#1e293b] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Join the Directory?
            </h2>
            <p className="text-slate-200/80 mb-10 max-w-xl mx-auto">
              Join the growing network of regenerative farms and the restaurants that source from them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {showApplyCtas && (
                <Link
                  href="/apply"
                  className="inline-block bg-white text-[#0f172a] px-8 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Start Your Application
                </Link>
              )}
              <Link
                href="/directory"
                className="inline-block border-2 border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Browse the Directory
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
