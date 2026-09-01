import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ATMOSPHERE_BG, AtmosphereLayers } from '@/components/AtmosphereBanner';

// ─── CONTENT ────────────────────────────────────────────────────────────────
// Edit the sections below to update page copy without touching layout code.

const REQUIRED_PRACTICES = [
  'No added hormones or routine antibiotics (for animal products)',
  'No chemical preservatives in raw or minimally processed meat',
  'No synthetic dyes or artificial additives',
  'No seed oils used in on-farm processing',
];

const ENCOURAGED_PRACTICES = [
  'Pasture-raised or free-range animal systems',
  'Rotational or managed grazing',
  'Cover cropping and soil-first growing practices',
  'Crop diversity and heritage breed use',
  'Traceable, verifiable sourcing relationships',
  'Low-input or reduced-chemical growing methods',
];

const BONUS_PRACTICES = [
  'Family farm story and multi-generational stewardship',
  'Community relationships and direct-to-restaurant sales',
  'Animal care philosophy and living-condition descriptions',
  'Soil health commitment and carbon sequestration efforts',
  'Growing method transparency',
  'Conservation and habitat restoration practices',
];

const THIRD_PARTY_CERTS = [
  'USDA Organic',
  'Certified Humane',
  'Animal Welfare Approved (AWA)',
  'Non-GMO Project Verified',
  'American Grassfed Association (AGA) Certified',
  'Regenerative Organic Certified (ROC)',
];

const FAQS = [
  {
    q: 'Is the whole farm reviewed, or just certain products?',
    a: 'The farm as a whole is reviewed — its practices, certifications, and the products it raises or grows. There is no product-by-product certification.',
  },
  {
    q: 'Do restaurants get certified too?',
    a: 'No. Restaurants apply for a free awareness listing in the directory as farm-to-table partners — there is no certification tier or review of individual dishes. Certification applies to farms.',
  },
  {
    q: 'Do farms need to be certified already?',
    a: 'No prior certification is required. Farms attest to their practices, and Regen USA reviews those claims. Existing third-party certifications (like USDA Organic or Certified Humane) can strengthen an application and may be required for certain harder-to-verify claims.',
  },
  {
    q: 'How does Regen USA verify claims?',
    a: 'Farms provide attestations and practice details at the time of application. Regen USA may follow up directly, request documentation or photos, and may conduct random spot-checks. No costly in-person inspections are required.',
  },
  {
    q: 'What happens if a farm’s practices change after approval?',
    a: 'Farms are responsible for notifying Regen USA if their practices or certifications change. Failure to update this information may result in removal from the directory.',
  },
  {
    q: 'Can approval be revoked?',
    a: 'Yes. If a claim is found to be inaccurate or practices change without notification, Regen USA may remove a farm or restaurant from the directory.',
  },
  {
    q: 'Will the standards evolve over time?',
    a: 'Yes. The current standards represent a practical starting point designed to be achievable, credible, and scalable. Regen USA expects to refine both the required and encouraged practice criteria — including a more detailed scoring model — as the program develops.',
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function AboutCertificationPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/regen-hero2.avif')" }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            How It Works
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Regen USA<br className="hidden sm:block" /> Farms &amp; Directory
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
            We verify farms using clean, regenerative practices, and connect them with the
            farm-to-table restaurants that source from them — with full transparency for consumers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/apply"
              className="bg-white text-[#0f172a] px-6 py-3 rounded-lg font-semibold hover:bg-stone-100 transition-colors text-center"
            >
              Apply Now
            </Link>
            <Link
              href="/directory"
              className="border border-white/40 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors text-center"
            >
              Browse the Directory
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <Reveal as="section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'For Farms',
              body: 'Get reviewed and listed as a verified Regen USA farm. Get discovered by restaurants looking for clean, traceable suppliers, and tell the story behind how you raise and grow.',
            },
            {
              title: 'For Restaurants',
              body: 'List your restaurant as a farm-to-table partner — a free directory listing, no dish-by-dish certification. Build credibility with guests who care where their food comes from.',
            },
            {
              title: 'For Consumers',
              body: 'Find farms and restaurants you can trust. See exactly which practices a farm follows and which restaurants source from the network.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <h3 className="font-semibold text-stone-900 mb-2">{title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="border-t border-stone-100" />

      {/* ── How It Works ── */}
      <Reveal as="section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionLabel>Process</SectionLabel>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">How It Works</h2>
        <p className="text-stone-600 mb-12 max-w-2xl">
          The process is lightweight by design — a quick review, then a public listing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">Farms</h3>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Apply', body: 'Share your practices, certifications, and what you raise or grow.' },
                { step: '2', title: 'Review', body: 'Regen USA reviews your application against our practice standards.' },
                { step: '3', title: 'Get listed', body: 'Approved farms appear in the public directory, searchable by restaurants and consumers.' },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#1e293b] text-white rounded-full flex items-center justify-center font-bold text-xs mt-0.5">
                    {step}
                  </div>
                  <div className="pb-4 border-b border-stone-100 flex-1 last:border-0">
                    <h4 className="font-semibold text-stone-900 text-sm mb-1">{title}</h4>
                    <p className="text-sm text-stone-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">Restaurants</h3>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Apply', body: 'Share your restaurant profile and story — no dish submissions required.' },
                { step: '2', title: 'Review', body: 'Regen USA does a light review to keep the directory accurate and spam-free.' },
                { step: '3', title: 'Get listed', body: 'Approved restaurants appear as farm-to-table partners in the public directory.' },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-stone-600 text-white rounded-full flex items-center justify-center font-bold text-xs mt-0.5">
                    {step}
                  </div>
                  <div className="pb-4 border-b border-stone-100 flex-1 last:border-0">
                    <h4 className="font-semibold text-stone-900 text-sm mb-1">{title}</h4>
                    <p className="text-sm text-stone-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-stone-100" />

      {/* ── Standards ── */}
      <Reveal as="section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionLabel>Standards</SectionLabel>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Farm Practice Standards</h2>
        <p className="text-stone-600 mb-12 max-w-2xl">
          The tiers below reflect what Regen USA requires of a farm, what strengthens an application,
          and what tells a deeper story. Encouraged and bonus practices may evolve as the program develops.
        </p>

        <div className="space-y-6">
          {/* Required */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-[#0f172a] px-6 py-4">
              <h3 className="text-white font-semibold">Required Practices</h3>
              <p className="text-white/70 text-sm mt-0.5">
                These are the non-negotiables. A farm must meet all of these to be approved.
              </p>
            </div>
            <ul className="divide-y divide-stone-100">
              {REQUIRED_PRACTICES.map((p) => (
                <li key={p} className="flex items-start gap-3 px-6 py-3.5 text-sm text-stone-700">
                  <svg className="w-4 h-4 text-[#1e293b] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Encouraged */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-700 px-6 py-4">
              <h3 className="text-white font-semibold">Encouraged Practices</h3>
              <p className="text-white/70 text-sm mt-0.5">
                These are strong signals that support and strengthen an application. They are not required but are
                given significant weight in review. This list may expand over time.
              </p>
            </div>
            <ul className="divide-y divide-stone-100">
              {ENCOURAGED_PRACTICES.map((p) => (
                <li key={p} className="flex items-start gap-3 px-6 py-3.5 text-sm text-stone-700">
                  <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Bonus */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-500 px-6 py-4">
              <h3 className="text-white font-semibold">Bonus / Narrative Practices</h3>
              <p className="text-white/70 text-sm mt-0.5">
                These are not approval requirements, but they help tell the farm's story and demonstrate
                stronger alignment with the Regen USA mission. These may be featured in public listings.
              </p>
            </div>
            <ul className="divide-y divide-stone-100">
              {BONUS_PRACTICES.map((p) => (
                <li key={p} className="flex items-start gap-3 px-6 py-3.5 text-sm text-stone-700">
                  <svg className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-stone-100" />

      {/* ── Verification ── */}
      <Reveal as="section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionLabel>Verification</SectionLabel>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">How We Verify</h2>
        <p className="text-stone-600 mb-10 max-w-2xl">
          Regen USA prioritizes practices that can be reasonably confirmed through remote or virtual methods,
          keeping the program accessible without sacrificing credibility.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            {
              title: 'Farm Attestation',
              body: 'Every applicant formally attests that the information provided is accurate. Misrepresentation may result in immediate removal and may be reported.',
            },
            {
              title: 'Practice Transparency',
              body: 'Farms provide details on livestock, produce, and practices. This information is displayed publicly on approved listings.',
            },
            {
              title: 'Image-Based Verification',
              body: 'Farms are encouraged to submit photos of operations, packaging, or documentation. Imagery may be requested as part of the review process.',
            },
            {
              title: 'Spot-Checks',
              body: 'Regen USA may conduct random verification checks on approved listings at any time. This may include reviewing updated documentation or on-site visits in limited cases.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="border border-stone-200 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-1.5 text-sm">{title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Third-party certs subsection */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
          <h3 className="font-semibold text-stone-900 mb-2">Third-Party Certifications</h3>
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            Some claims — particularly around organic status, animal welfare, or regenerative practices —
            may rely on existing third-party certifications for verification. While Regen USA does not require
            prior certification, holding a recognized credential can satisfy harder-to-verify claims
            and strengthen an application.
          </p>
          <p className="text-xs text-stone-500 mb-3 font-medium uppercase tracking-wide">Examples of accepted credentials</p>
          <div className="flex flex-wrap gap-2">
            {THIRD_PARTY_CERTS.map((c) => (
              <span key={c} className="text-xs px-3 py-1 rounded-full bg-white border border-stone-300 text-stone-700">
                {c}
              </span>
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-4">
            Third-party certifications are referenced as supporting evidence only. Regen USA makes no representations
            about the scope or coverage of any external certification body.
          </p>
        </div>
      </Reveal>

      <div className="border-t border-stone-100" />

      {/* ── Public Transparency ── */}
      <Reveal as="section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionLabel>Transparency</SectionLabel>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">What Gets Listed Publicly</h2>
        <p className="text-stone-600 mb-10 max-w-2xl">
          Approved farms and restaurants are displayed in the public Regen USA directory. Transparency is a
          core part of the program — consumers can see exactly what practices a farm follows.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 bg-stone-50 border-b border-stone-200">
              <p className="text-sm font-medium text-stone-700">Each approved farm listing includes:</p>
            </div>
            <ul className="divide-y divide-stone-100">
              {[
                'Farm name, city, and state',
                'Livestock, produce, and regenerative practices',
                'Certifications (if provided)',
                'Approval date',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 px-6 py-3.5 text-sm text-stone-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 bg-stone-50 border-b border-stone-200">
              <p className="text-sm font-medium text-stone-700">Each approved restaurant listing includes:</p>
            </div>
            <ul className="divide-y divide-stone-100">
              {[
                'Restaurant name, city, and state',
                'Description and website',
                'Better health practices (if provided)',
                'A link to browse Regen USA farms',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 px-6 py-3.5 text-sm text-stone-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-stone-100" />

      {/* ── FAQ ── */}
      <Reveal as="section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="text-3xl font-bold text-stone-900 mb-10">Common Questions</h2>
        <div className="space-y-4">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border border-stone-200 rounded-xl p-6">
              <h3 className="font-semibold text-stone-900 mb-2 text-sm">{q}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal as="section" className={`relative overflow-hidden ${ATMOSPHERE_BG}`}>
        <AtmosphereLayers />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to apply?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Farms and restaurants can both apply in a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/apply"
              className="bg-white text-[#1e3a8a] px-8 py-3 rounded-lg font-semibold hover:bg-stone-100 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/directory"
              className="border border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Browse the Directory
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#1e293b] mb-3">
      {children}
    </p>
  );
}
