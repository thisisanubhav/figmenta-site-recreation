import { siteHref, type Locale } from './site'

export type Vacancy = {
  slug: string
  title: string
  description: Record<Locale, string>
}

// The public Careers page exposes titles and descriptions, but no job IDs or application URLs.
// These slugs are local references for unambiguous email applications.
export const vacancies: readonly Vacancy[] = [
  {
    slug: 'senior-art-director-latin-america',
    title: 'Senior Art Director- Latin America',
    description: {
      en: 'Shape brand identities, digital campaigns and visual stories. This role calls for an agency portfolio, strong creative direction and the ability to guide a team.',
      it: 'Dai forma a identità di brand, campagne digitali e racconti visivi. Cerchiamo un portfolio di agenzia, forte direzione creativa e capacità di guidare un team.',
    },
  },
  {
    slug: 'sales-specialist-asia-team',
    title: 'Sales Specialist – Asia team',
    description: {
      en: 'Grow relationships and new business for our Asia team. Experience in digital marketing, lead generation and negotiation will help you succeed.',
      it: 'Sviluppa relazioni e nuove opportunità per il team Asia. Sono utili esperienza nel marketing digitale, nella lead generation e nella negoziazione.',
    },
  },
  {
    slug: 'outbound-marketing-lead-asia-team',
    title: 'Outbound Marketing Lead- Asia team',
    description: {
      en: 'Lead outreach and demand generation with thoughtful campaigns, automation and a strong command of CRM tools.',
      it: 'Guida outreach e lead generation con campagne mirate, automazioni e un uso solido degli strumenti CRM.',
    },
  },
  {
    slug: 'ux-designer-junior',
    title: 'UX Designer Junior',
    description: {
      en: 'Design clear digital experiences and interactive prototypes. Bring curiosity, sound UX thinking and hands-on Figma skills.',
      it: 'Progetta esperienze digitali chiare e prototipi interattivi. Porta curiosità, sensibilità UX e padronanza di Figma.',
    },
  },
  {
    slug: 'client-relation-specialist',
    title: 'Client Relation Specialist',
    description: {
      en: 'Build long-term client partnerships through clear communication, careful problem solving and a strong understanding of creative work.',
      it: 'Costruisci relazioni durature con i clienti grazie a comunicazione chiara, problem solving e comprensione del lavoro creativo.',
    },
  },
  {
    slug: 'digital-account-manager',
    title: 'Digital Account Manager',
    description: {
      en: 'Coordinate digital projects, teams, budgets and client communication across social, web and creative work.',
      it: 'Coordina progetti digitali, team, budget e comunicazione con i clienti tra social, web e attività creative.',
    },
  },
]

export const generalApplicationHref = 'mailto:hr@figmenta.com'

export function vacancyApplicationHref(vacancy: Vacancy, locale: Locale): string {
  const subject = `${locale === 'it' ? 'Candidatura' : 'Application'} – ${vacancy.title}`
  const body = locale === 'it'
    ? `Ruolo: ${vacancy.title}\nRiferimento ruolo: ${vacancy.slug}\n\nAllega il CV e, se pertinente, il portfolio.`
    : `Role: ${vacancy.title}\nRole reference: ${vacancy.slug}\n\nPlease attach your CV and portfolio, if relevant.`
  return `${generalApplicationHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function careersHref(locale: Locale, hostname: string): string {
  return `${siteHref('corporate', locale, hostname)}/careers`
}
