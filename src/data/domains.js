// Muted, lower-saturation palette — softer on the eyes than raw primary
// colors while staying distinct enough per domain and dark enough for the
// same hex to double as legible text color on a white card body.
export const DOMAINS = [
  { name: 'Finance', icon: '\u{1F4B0}', color: '#3E6489' },
  { name: 'eCommerce', icon: '\u{1F6D2}', color: '#B0713E' },
  { name: 'Legal', icon: '⚖️', color: '#6C5B99' },
  { name: 'Transportation', icon: '\u{1F69A}', color: '#3F7D85' },
  { name: 'Public Service', icon: '\u{1F3DB}️', color: '#4F8F6B' },
  { name: 'Marketing', icon: '\u{1F4E3}', color: '#AD5A79' },
  { name: 'Healthcare', icon: '\u{1FA7A}', color: '#B0564F' },
  { name: 'Education', icon: '\u{1F393}', color: '#4E5D96' },
  { name: 'Climate & Sustainability', icon: '\u{1F331}', color: '#6E8F52' },
  { name: 'Media & Entertainment', icon: '\u{1F3AC}', color: '#7C5F9E' },
]

export const domainMeta = (name) => DOMAINS.find((d) => d.name === name) ?? DOMAINS[0]
