export interface Restaurant {
  id: string;
  name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  website: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string | null;
  health_practices: string[] | null;
  latitude: number | null;
  longitude: number | null;
  approved_at: string | null;
  reviewed_by: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Farm {
  id: string;
  name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  website: string | null;
  address: string | null;
  city: string;
  state: string;
  zip: string | null;
  description: string | null;
  livestock_types: string | null;
  produce_types: string | null;
  regenerative_practices: string | null;
  /** Custom practices not covered by checkboxes; verify before highlighting publicly */
  farm_practices_other?: string | null;
  certifications: string | null;
  cert_type: 'usda' | 'aga' | 'raa' | 'other' | 'none' | null;
  cert_other: string | null;
  cert_file_url: string | null;
  health_practices: string[] | null;
  hero_image_url: string | null;
  photo_urls: string | null;
  latitude: number | null;
  longitude: number | null;
  status: 'pending' | 'approved' | 'rejected';
  approved_at: string | null;
  reviewed_by: string | null;
  /** Set when a reviewer confirms non-USDA certification was verified */
  cert_verified_at: string | null;
  cert_verified_by: string | null;
  created_at: string;
  updated_at: string;
}

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'
] as const;

export const US_STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia'
};
