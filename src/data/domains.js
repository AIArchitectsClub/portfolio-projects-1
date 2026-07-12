export const DOMAINS = [
  { name: 'Finance', icon: '\u{1F4B0}', color: '#2563eb' },
  { name: 'eCommerce', icon: '\u{1F6D2}', color: '#ea580c' },
  { name: 'Legal', icon: '⚖️', color: '#7c3aed' },
  { name: 'Transportation', icon: '\u{1F69A}', color: '#0891b2' },
  { name: 'Public Service', icon: '\u{1F3DB}️', color: '#059669' },
  { name: 'Marketing', icon: '\u{1F4E3}', color: '#db2777' },
  { name: 'Healthcare', icon: '\u{1FA7A}', color: '#dc2626' },
  { name: 'Education', icon: '\u{1F393}', color: '#4338ca' },
  { name: 'Climate & Sustainability', icon: '\u{1F331}', color: '#16a34a' },
  { name: 'Media & Entertainment', icon: '\u{1F3AC}', color: '#9333ea' },
]

export const domainMeta = (name) => DOMAINS.find((d) => d.name === name) ?? DOMAINS[0]
