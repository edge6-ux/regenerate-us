import { Big_Shoulders, Work_Sans, IBM_Plex_Mono } from 'next/font/google';

/**
 * Distinct type system for state landing pages (the "Branded System" pilot
 * look) — separate from the main site's Fraunces/Public Sans branding.
 */
export const stateDisplayFont = Big_Shoulders({ subsets: ['latin'], weight: ['700', '900'] });
export const stateBodyFont = Work_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
export const stateMonoFont = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500', '600'] });
