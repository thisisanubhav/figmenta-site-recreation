import { useState } from 'react'
import { generalApplicationHref, vacancies, vacancyApplicationHref } from './careers'
import type { Locale } from './site'

const copy = {
  en: {
    label: 'Careers at Figmenta',
    headline: 'We’re looking for bold, passionate minds to build something extraordinary with us.',
    positions: 'Open positions',
    open: 'Explore role',
    close: 'Close role',
    apply: 'Apply for this role',
    generalHeading: 'Want to join Figmenta?',
    generalDescription: 'If you do not see the right opening, send us a general application.',
    generalApply: 'Apply to Figmenta',
  },
  it: {
    label: 'Lavora con Figmenta',
    headline: 'Cerchiamo menti audaci e appassionate per costruire qualcosa di straordinario insieme.',
    positions: 'Posizioni aperte',
    open: 'Scopri il ruolo',
    close: 'Chiudi il ruolo',
    apply: 'Candidati per questo ruolo',
    generalHeading: 'Vuoi unirti a Figmenta?',
    generalDescription: 'Se non trovi una posizione adatta, inviaci una candidatura spontanea.',
    generalApply: 'Candidati in Figmenta',
  },
} as const

export function CareersPage({ locale }: { locale: Locale }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const t = copy[locale]

  return <div className="careers-page">
    <section className="careers-hero">
      <p className="eyebrow">{t.label}</p>
      <h1>{t.headline}</h1>
    </section>
    <section className="careers-openings section-shell" aria-labelledby="open-positions-heading">
      <p className="eyebrow" id="open-positions-heading">{t.positions}</p>
      <div className="careers-layout">
        <div className="vacancy-list">
          {vacancies.map((vacancy) => {
            const isOpen = openSlug === vacancy.slug
            const panelId = `vacancy-${vacancy.slug}`
            return <article className="vacancy" key={vacancy.slug}>
              <h2>
                <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenSlug(isOpen ? null : vacancy.slug)}>
                  <span>{vacancy.title}</span><span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
              </h2>
              {isOpen && <div className="vacancy-detail" id={panelId}>
                <p>{vacancy.description[locale]}</p>
                <a className="vacancy-apply" href={vacancyApplicationHref(vacancy, locale)} aria-label={`${t.apply}: ${vacancy.title}`}>
                  {t.apply} <span aria-hidden="true">↗</span>
                </a>
              </div>}
            </article>
          })}
        </div>
        <aside className="general-application">
          <h2>{t.generalHeading}</h2>
          <p>{t.generalDescription}</p>
          <a href={generalApplicationHref}>{t.generalApply} <span aria-hidden="true">↗</span></a>
        </aside>
      </div>
    </section>
  </div>
}
