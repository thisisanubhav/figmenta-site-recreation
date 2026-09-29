export type Locale = 'en' | 'it'
export type Division = 'corporate' | 'studio' | 'live' | 'productions' | 'media'

export const divisions = ['studio', 'live', 'productions', 'media'] as const satisfies readonly Division[]
export const sites = ['corporate', ...divisions] as const satisfies readonly Division[]

export const officeContacts = [
  { city: 'Milan', country: 'Italy', email: 'info@figmenta.it' },
  { city: 'London', country: 'UK', email: 'info@figmenta.co.uk' },
  { city: 'San José', country: 'Costa Rica', email: 'contact@figmenta.co.uk' },
] as const

export const divisionContent: Record<Division, {
  name: string
  tagline: Record<Locale, string>
  description: Record<Locale, string>
  services: Record<Locale, string[]>
  color: string
}> = {
  corporate: {
    name: 'Figmenta',
    tagline: { en: 'Figmenta company website', it: 'Il sito web corporate del gruppo Figmenta' },
    description: {
      en: 'One group. Different minds. Endless possibilities. We bring strategy, creativity and technology together to make ambitious ideas real.',
      it: 'Un gruppo. Diverse prospettive. Infinite possibilità. Uniamo strategia, creatività e tecnologia per dare forma alle idee più ambiziose.',
    },
    services: { en: ['Strategy', 'Creativity', 'Technology', 'Growth'], it: ['Strategia', 'Creatività', 'Tecnologia', 'Crescita'] },
    color: '#b000ff',
  },
  studio: {
    name: 'Studio',
    tagline: { en: 'Where we design brands and digital properties', it: 'Dove progettiamo e realizziamo brand, siti web e digital properties' },
    description: {
      en: 'We help brands take shape and evolve across every touchpoint, balancing creativity and a strong strategic vision.',
      it: 'Aiutiamo i brand a prendere forma e a evolversi in ogni punto di contatto, unendo creatività e visione strategica.',
    },
    services: { en: ['Brand strategy', 'Brand identity', 'Digital products', 'Web design'], it: ['Strategia di brand', 'Identità di brand', 'Prodotti digitali', 'Web design'] },
    color: '#803bff',
  },
  live: {
    name: 'Live',
    tagline: { en: 'Where we keep brand communication alive and flowing', it: 'Dove gestiamo 24/7 la digital communication di un brand, dai social alle Digital PR' },
    description: {
      en: 'We keep brand communication moving every day, from social media and community to digital PR and creator partnerships.',
      it: 'Manteniamo viva la comunicazione dei brand ogni giorno, dai social e le community alle digital PR e alle collaborazioni con i creator.',
    },
    services: { en: ['Social media', 'Community', 'Digital PR', 'Influencer marketing'], it: ['Social media', 'Community', 'Digital PR', 'Influencer marketing'] },
    color: '#ff5c9b',
  },
  productions: {
    name: 'Productions',
    tagline: { en: 'Where we produce visual content that leaves a mark', it: 'Dove realizziamo produzioni che lasciano il segno' },
    description: {
      en: 'We turn ideas into vivid imagery, films and digital content made to be remembered.',
      it: 'Trasformiamo le idee in immagini, video e contenuti digitali capaci di farsi ricordare.',
    },
    services: { en: ['Photography', 'Video production', 'Creative direction', 'Digital content'], it: ['Fotografia', 'Produzione video', 'Direzione creativa', 'Contenuti digitali'] },
    color: '#f48c45',
  },
  media: {
    name: 'Media',
    tagline: { en: 'Where we amplify a brand’s impact in its market', it: 'Dove amplifichiamo l’impatto di un brand con il Paid Advertising e il Growth Marketing' },
    description: {
      en: 'We amplify a brand’s impact with paid media, data and growth strategies that connect with the right people.',
      it: 'Amplifichiamo l’impatto dei brand con media, dati e strategie di crescita che raggiungono le persone giuste.',
    },
    services: { en: ['Paid advertising', 'Growth marketing', 'Lead generation', 'Analytics'], it: ['Advertising', 'Growth marketing', 'Lead generation', 'Analisi dei dati'] },
    color: '#5f77ff',
  },
}

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'it'
}

export function isDivision(value: string): value is Division {
  return sites.some((site) => site === value)
}

export function isLocalPreview(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || !hostname.endsWith('figmenta.com')
}

export function siteHref(site: Division, locale: Locale, hostname: string): string {
  if (isLocalPreview(hostname)) return site === 'corporate' ? `/${locale}` : `/${site}/${locale}`
  const domain = site === 'corporate' ? 'figmenta.com' : `${site}.figmenta.com`
  return `https://${domain}/${locale}`
}

export function pageContext(hostname: string, pathname: string): { site: Division; locale: Locale } {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0] ?? ''
  if (isLocalPreview(hostname) && isDivision(firstSegment) && firstSegment !== 'corporate') {
    return { site: firstSegment, locale: isLocale(segments[1] ?? '') ? segments[1] as Locale : 'en' }
  }
  const subdomain = hostname.split('.')[0]
  const site = !isLocalPreview(hostname) && isDivision(subdomain) ? subdomain : 'corporate'
  return { site, locale: isLocale(segments[0] ?? '') ? segments[0] as Locale : 'en' }
}
