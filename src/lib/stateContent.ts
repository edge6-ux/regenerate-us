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
    heroBody: 'Certification for regenerative Utah beef, and soil credits that pay producers for the practices behind it.',
    heroLogo: { src: '/utah-logo.png', alt: 'Regen Utah logo' },

    cards: {
      certification: {
        label: 'Certification',
        headline: 'Beef first, built on grass fed',
        body: 'American Grass Fed baseline, open to every Utah producer after.',
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
      headline: 'Built on the American Grass Fed baseline',
      body: "Utah is home to roughly 8,000 beef farmers, with alfalfa feeding much of that cattle — so certification leads with beef, built on the American Grass Fed standard. It's open to every Utah producer, not just beef and eggs.",
    },
    soilCredits: {
      headline: 'Income and stewardship, together',
      body: 'Soil credits reward the practices that rebuild soil health. Opportunity Zones are one way to access that value — one vehicle among several, not the only one.',
    },
    resources: {
      headline: 'Financing and grants for Utah producers',
      body: 'Funding and grant options specific to Utah beef producers.',
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
