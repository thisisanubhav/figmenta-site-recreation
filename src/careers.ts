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
      en: 'We’re looking for a highly creative and strategic thinker with strong experience in branding, digital campaigns, and visual storytelling. A background in agency work and a portfolio showcasing high-level design concepts are essential. Leadership skills and the ability to guide teams are a plus.',
      it: 'We’re looking for a highly creative and strategic thinker with strong experience in branding, digital campaigns, and visual storytelling. A background in agency work and a portfolio showcasing high-level design concepts are essential. Leadership skills and the ability to guide teams are a plus.',
    },
  },
  {
    slug: 'sales-specialist-asia-team',
    title: 'Sales Specialist – Asia team',
    description: {
      en: 'We’re looking for a results-driven sales professional with experience in digital marketing and agency environments. Strong communication, lead generation, and negotiation skills are key. A proactive approach and a network in the industry are highly valued.',
      it: 'We’re looking for a results-driven sales professional with experience in digital marketing and agency environments. Strong communication, lead generation, and negotiation skills are key. A proactive approach and a network in the industry are highly valued.',
    },
  },
  {
    slug: 'outbound-marketing-lead-asia-team',
    title: 'Outbound Marketing Lead- Asia team',
    description: {
      en: 'We’re looking for a marketing expert who thrives on outreach and lead generation. Experience with outbound strategies, automation tools, and CRM system is a must. A data-driven mindset and creativity in engaging prospects make the difference.',
      it: 'We’re looking for a marketing expert who thrives on outreach and lead generation. Experience with outbound strategies, automation tools, and CRM system is a must. A data-driven mindset and creativity in engaging prospects make the difference.',
    },
  },
  {
    slug: 'ux-designer-junior',
    title: 'UX Designer Junior',
    description: {
      en: 'We’re looking for a junior UX designer with strong Figma prototyping skills. If you are passionate about crafting seamless user experience and love bringing ideas to life through interactive prototypes, we’d love to hear from you.',
      it: 'We’re looking for a junior UX designer with strong Figma prototyping skills. If you are passionate about crafting seamless user experience and love bringing ideas to life through interactive prototypes, we’d love to hear from you.',
    },
  },
  {
    slug: 'client-relation-specialist',
    title: 'Client Relation Specialist',
    description: {
      en: 'We’re looking for a relationship builder with excellent communication and problem-solving skills. Experience in managing clients in digital marketing or creative industries is essential. A customer-first approach and the ability to foster long-term partnerships are key.',
      it: 'We’re looking for a relationship builder with excellent communication and problem-solving skills. Experience in managing clients in digital marketing or creative industries is essential. A customer-first approach and the ability to foster long-term partnerships are key.',
    },
  },
  {
    slug: 'digital-account-manager',
    title: 'Digital Account Manager',
    description: {
      en: 'We’re looking for an experienced account manager with a strong understanding of digital projects, from social media to web development. Ability to co-ordinate teams, manage budgets, and ensure seamless client communication is a must. Strategic thinking and attention to detail make the difference.',
      it: 'We’re looking for an experienced account manager with a strong understanding of digital projects, from social media to web development. Ability to co-ordinate teams, manage budgets, and ensure seamless client communication is a must. Strategic thinking and attention to detail make the difference.',
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
