export interface StateConfig {
  slug: string;
  name: string;
  /** USPS abbreviation, matches farms.state / restaurants.state. */
  abbr: string;
  /** Approximate geographic center, used to pre-zoom the directory map. */
  centroid: [number, number];

  heroImage: {
    src: string;
    alt: string;
    /** Short caption shown over the photo — describe what's shown, not a specific real place, since the photo is generated. */
    credit: string;
  };
  heroHeadline: string;
  heroBody: string;
  /** Optional wordmark/badge logo shown in place of the plain-text headline. */
  heroLogo?: { src: string; alt: string };

  /** Three-card teaser strip directly under the hero photo. */
  cards: {
    certification: { label: string; headline: string; body: string };
    soilCredits: { label: string; headline: string; body: string };
    directory: { label: string; headline: string; body: string };
  };

  certification: { headline: string; body: string };
  soilCredits: { headline: string; body: string };
  resources: { headline: string; body: string };
}

/**
 * One entry per state landing page. Utah is the master copy — cloning a new
 * state should only mean adding a config entry here, not touching the page
 * template or the directory filter logic.
 */
export const STATE_CONFIGS: Record<string, StateConfig> = {
  utah: {
    slug: 'utah',
    name: 'Utah',
    abbr: 'UT',
    centroid: [39.321, -111.0937],

    heroImage: {
      src: '/utah-hero.jpg',
      alt: 'Silhouettes of cattle grazing in a grassy field at dusk',
      credit: 'Cattle at dusk on grazing land',
    },
    heroHeadline: 'Regen Utah',
    heroBody: "Regen Utah is a certification and soil credit program for producers across Utah who grow and raise regeneratively. Operations are assessed on the ranch or farm against a standard tuned for Utah's land and conditions, with soil sampled at the same visit to set a baseline for credits.",
    heroLogo: { src: '/utah-logo.png', alt: 'Regen Utah logo' },

    cards: {
      certification: {
        label: 'Certification',
        headline: 'A pasture-based standard for every producer',
        body: 'A rigorous, pasture-based standard, open to every Utah producer.',
      },
      soilCredits: {
        label: 'Soil Credits',
        headline: 'Get paid for good ground',
        body: 'Income for stewardship, plus funding for the testing behind it.',
      },
      directory: {
        label: 'Directory',
        headline: 'Find certified Utah product',
        body: 'National reach, zoomed straight to Utah listings.',
      },
    },

    certification: {
      headline: 'Built on a rigorous, pasture-based standard',
      body: "Certification is open to every Utah producer, grounded in a rigorous, pasture-based standard. Utah is home to roughly 8,000 beef farmers, with alfalfa feeding much of that cattle, alongside the state's other producers.",
    },
    soilCredits: {
      headline: 'Income and stewardship, together',
      body: 'Soil credits reward the practices that rebuild soil health. Opportunity Zones are one way to access that value — one vehicle among several, not the only one.',
    },
    resources: {
      headline: 'Financing and grants for Utah producers',
      body: 'Funding and grant options for Utah producers.',
    },
  },
};

export function getStateConfig(slug: string): StateConfig | null {
  return STATE_CONFIGS[slug.toLowerCase()] ?? null;
}

export function getStateConfigByAbbr(abbr: string): StateConfig | null {
  const match = Object.values(STATE_CONFIGS).find(
    (s) => s.abbr.toLowerCase() === abbr.toLowerCase()
  );
  return match ?? null;
}
