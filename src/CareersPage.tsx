import { useEffect, useState } from 'react'
import { generalApplicationHref, vacancies, vacancyApplicationHref } from './careers'
import type { Locale } from './site'

const benefits = [
  {
    title: { en: 'Remote Pioneers 🌍✈️', it: 'Pioneri del remote working 🌍✈️' },
    text: {
      en: 'We’ve been rocking remote work for a long time! We live in our favorite cities, travel the world, and collaborate with the best minds: no commuting, no wasted hours in traffic. And when we do meet in person? It’s always incredible!',
      it: 'Lavoriamo in remoto da tanto tempo! Viviamo nelle nostre città preferite, viaggiamo per il mondo e collaboriamo con le migliori menti: niente pendolarismo, niente ore sprecate nel traffico. E quando ci incontriamo di persona? È sempre fantastico!',
    },
    image: 'https://cdn.sanity.io/images/gm701ez7/production/65a1753d6c787ee059df49e1a263305a194018da-564x846.jpg',
  },
  {
    title: { en: 'Global Playground 🌎🤝', it: 'Global Playground 🌎🤝' },
    text: {
      en: 'We work with talent from all over the world. One day you’re brainstorming with a strategist in UK, the next you’re refining a campaign with a designer in Singapore. Every project is a chance to connect with incredible people across different time zones.',
      it: "Lavoriamo con talenti da tutto il mondo. Un giorno c'è un brainstorming con uno Strategist in UK, il giorno dopo si perfeziona una campagna con un designer a Singapore. Ogni progetto è un'occasione per entrare in contatto con persone incredibili che vivono in fusi orari diversi.",
    },
    image: 'https://cdn.sanity.io/images/gm701ez7/production/7abda3ad969c83d0c821b3ab1e794678f3857f77-256x300.jpg',
  },
  {
    title: { en: 'Inclusivity as Our Guiding Light 🌈', it: 'Inclusività come punto di riferimento 🌈' },
    text: {
      en: 'We believe that the best ideas come from diverse perspectives. Different cultures, backgrounds, and ways of thinking make our work richer, bolder, and smarter. Be yourself, and let’s create something amazing together.',
      it: 'Le idee migliori nascono da prospettive diverse. Culture, background e modi di pensare diversi rendono il nostro lavoro più ricco, interessante e intelligente. Sii te stesso e creiamo insieme qualcosa di straordinario.',
    },
    image: 'https://cdn.sanity.io/images/gm701ez7/production/21ef17d956ae3266b6b656081d2e4c62c5572784-736x552.jpg',
  },
  {
    title: { en: 'Work That Matters 💡✨', it: 'Il lavoro che conta 💡✨' },
    text: {
      en: 'We choose projects that excite us, challenge us, and actually make a difference. If it’s not meaningful, we say no (and we’re pretty good at saying no!).',
      it: 'Scegliamo progetti che ci entusiasmano, ci mettono alla prova e fanno davvero la differenza. Se non possiamo portare valore, diciamo di no (e siamo piuttosto bravi a farlo!).',
    },
    image: 'https://cdn.sanity.io/images/gm701ez7/production/a93c0c17ed293c57d4f3c34fa7cbe9e6a6bb2e2b-736x867.jpg',
  },
  {
    title: { en: 'Work Smart, Not Hard 🚀', it: 'Work Smart, Not Hard 🚀' },
    text: {
      en: 'We keep it simple. No unnecessary meetings, no rigid hierarchies—just smart automations that let people focus on what they do best.',
      it: 'La facciamo semplice. Pochissime riunioni inutili, zero gerarchie rigide e tanta efficienza per permettere alle persone di concentrarsi su ciò che sanno fare meglio.',
    },
    image: 'https://cdn.sanity.io/images/gm701ez7/production/74f2e9b2c6fa23c2231e6fbf86a739b42ddc1693-240x240.gif',
  },
  {
    title: { en: 'Freedom to Experiment 🔬', it: 'Libertà di sperimentare 🔬' },
    text: {
      en: 'We don’t do boring. If you have a wild idea, a new tool you want to test, or a strategy no one has tried before, go for it! We embrace curiosity and love pushing boundaries.',
      it: "Non ci annoiamo. Se hai un'idea folle, un nuovo strumento che vuoi testare o una strategia che nessuno ha mai provato prima, proponilo! Accogliamo la curiosità e amiamo superare i limiti.",
    },
    image: 'https://cdn.sanity.io/images/gm701ez7/production/51e46da45422f3985661a74aa5f3a54a5d22349a-360x640.gif',
  },
  {
    title: { en: 'Art, Culture & Inspiration Boosts 🎭', it: 'Arte, cultura e ispirazione 🎭' },
    text: {
      en: 'Creativity Needs Fuel! That’s why we’re always open to supporting incentives for attending exhibitions, art installations, and cultural events, wherever there’s something beautiful to experience. Get inspired, bring fresh ideas, and keep your creativity flowing.',
      it: "La creatività ha bisogno di carburante! Ecco perché siamo sempre disponibili a sostenere incentivi per la partecipazione a mostre, installazioni d'arte ed eventi culturali, ovunque ci sia qualcosa di bello. Lasciati ispirare, porta nuove idee e fai fluire la tua creatività.",
    },
    image: 'https://cdn.sanity.io/images/gm701ez7/production/076bc50421c89eaba30019938be93216eb33c69c-720x1280.jpg',
  },
  {
    title: { en: 'Flexible Contracts, Tailored to Fit', it: 'Contratti flessibili e cuciti su misura' },
    text: {
      en: 'One-size-fits-all contracts? Not here. We craft contracts that fit real needs, not the other way around. We get that schedules can be tricky, so we offer flexibility, whether it’s full-time, part-time, a 4-day workweek, or 3 weeks per month.',
      it: 'Lo stesso contratto per tutti? Non qui. Ci basiamo su accordi che si adattano alle esigenze reali delle persone, non il contrario. Sappiamo che gli orari possono essere un problema, quindi offriamo flessibilità, sia che si tratti di tempo pieno, part-time, di una settimana lavorativa di 4 giorni o di 3 settimane al mese.',
    },
    image: 'https://cdn.sanity.io/images/gm701ez7/production/f0612b3f72d150aa7b3e950ee790c0d9ac6d894c-736x1236.jpg',
  },
] as const

const values = [
  {
    title: { en: 'Be Inspired', it: 'Essere esploratori' },
    text: {
      en: 'You don’t need to be a designer or an artist to work at Figmenta, but you do need to be fascinated by creativity. Ideas fuel everything we do—so stay curious, explore, and let inspiration find you in unexpected places.',
      it: 'Non devi essere un designer o un artista per lavorare in Figmenta, ma devi essere affascinato dalla creatività. Le idee alimentano tutto ciò che facciamo, quindi sii curioso, esplora e lascia che l’ispirazione ti trovi dovunque tu sia ☺️',
    },
  },
  {
    title: { en: 'Be Updated', it: 'Essere aggiornati' },
    text: {
      en: 'No matter your field, expertise means staying ahead. Trends shift, technology evolves, and we don’t just follow—we anticipate. Whether it’s AI, design, marketing, we never stop learning.',
      it: 'Indipendentemente dal tuo campo, essere competenti significa rimanere al passo con i tempi. Le tendenze cambiano, la tecnologia si evolve e noi non ci limitiamo a seguire, ma essere sul pezzo. Che si tratti di AI, design, marketing, non possiamo mai smettere di imparare.',
    },
  },
  {
    title: { en: 'Be Kind', it: 'Essere gentili' },
    text: {
      en: 'There’s no room for ego, just respect. Especially in a remote-first world, where words carry ten times more weight, kindness is not optional—it’s essential. Support your team, lift each other up, and keep the energy positive.',
      it: 'Specialmente lavorando da remoto, dove le parole hanno un peso 10 volte maggiore, la gentilezza non è un optional, ma è essenziale. Supporta il tuo team, aiutatevi a vicenda e porta sempre un’energia positiva.',
    },
  },
  {
    title: { en: 'Be Respectful', it: 'Essere rispettosi' },
    text: {
      en: 'We work across cultures, time zones, and perspectives, and that’s what makes us stronger. Respect isn’t just about being polite—it’s about valuing different viewpoints and building a space where everyone thrives.',
      it: 'Lavoriamo tra culture, fusi orari e punti di vista diversi, ed è proprio questo che ci rende più forti. Il rispetto non è solo una questione di cortesia, ma di dare valore alle diverse prospettive e creare un ambiente in cui tutti possano crescere.',
    },
  },
  {
    title: { en: 'Be Open to Change', it: 'Essere aperti al cambiamento' },
    text: {
      en: 'Creativity is about breaking barriers, and so is our way of working. We don’t cling to the past—we adapt, evolve, and challenge the status quo. Understanding the world around us and being ready to pivot is what keeps us ahead.',
      it: 'La creatività consiste nel rompere le barriere, e lo stesso vale per il nostro modo di lavorare. Non restiamo ancorati al passato: ci adattiamo, evolviamo e mettiamo in discussione lo status quo. Capire il mondo che ci circonda ed essere pronti a cambiare rotta, quando è necessario.',
    },
  },
] as const

const copy = {
  en: {
    headline: 'We’re looking for bold, passionate minds to push boundaries and build something extraordinary with us.',
    apply: 'Apply for this role',
    generalHeading: 'Want to join Figmenta?',
    generalDescription: 'Here’s what you need to do:',
    checklist: ['Align with our values', 'Show us where you fit', 'Got a portfolio? Share it!', 'Resume in PDF format'],
    generalApply: 'Apply to Figmenta',
  },
  it: {
    headline: 'Cerchiamo menti appassionate che vogliono superare i limiti e costruire qualcosa di straordinario con noi.',
    apply: 'Candidati per questo ruolo',
    generalHeading: 'Vuoi unirti a Figmenta?',
    generalDescription: 'Questo è ciò che devi fare:',
    checklist: ['Allineati con i nostri valori', 'Mostraci dove ti inseriresti', 'Hai un portfolio? Condividilo!', 'Curriculum in formato PDF'],
    generalApply: 'Candidati in Figmenta',
  },
} as const

export function CareersPage({ locale }: { locale: Locale }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [valuesOpen, setValuesOpen] = useState(false)
  const t = copy[locale]

  useEffect(() => {
    if (!valuesOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setValuesOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [valuesOpen])

  return <div className="careers-page">
    <section className="careers-hero">
      <h1>{t.headline}</h1>
    </section>
    <section className="careers-openings" aria-label={locale === 'en' ? 'Open positions' : 'Posizioni aperte'}>
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
              <div className="vacancy-detail" id={panelId} hidden={!isOpen}>
                <p>{vacancy.description[locale]}</p>
                <a className="vacancy-apply" href={vacancyApplicationHref(vacancy, locale)} aria-label={`${t.apply}: ${vacancy.title}`}>
                  {t.apply} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          })}
        </div>
        <aside className="general-application">
          <h2>{t.generalHeading}<br />{t.generalDescription}</h2>
          <ul>{t.checklist.map((item, index) => <li key={item}>
            <span className="checkmark" aria-hidden="true">✓</span>
            {index === 0 ? <button type="button" className="values-trigger" onClick={() => setValuesOpen(true)}>{item}</button> : item}
          </li>)}</ul>
          <a href={generalApplicationHref}>{t.generalApply} <img src="https://figmenta.com/icons/send.svg" alt="" /></a>
        </aside>
      </div>
    </section>
    <section className="why-work" aria-labelledby="why-work-heading">
      <h2 id="why-work-heading">{locale === 'en' ? <>WHY WORK<br />AT FIGMENTA</> : <>PERCHÈ<br />LAVORARE IN FIGMENTA</>}</h2>
      <div className="benefits-list">{benefits.map((benefit, index) => <article className="benefit" key={benefit.title.en}>
        <h3>{index + 1}. {benefit.title[locale]}</h3>
        <div className="benefit-body">
          <img src={benefit.image} alt="" loading="lazy" />
          <p>{benefit.text[locale]}</p>
        </div>
      </article>)}</div>
    </section>
    <section className="careers-outro">
      <h2>{locale === 'en' ? 'UNLEASH YOUR' : 'LIBERA LA TUA'}<br /><em>{locale === 'en' ? 'Imagination' : 'Immaginazione'}</em></h2>
      <a href="mailto:info@figmenta.com">{locale === 'en' ? 'Let’s start' : 'Iniziamo'} <span aria-hidden="true">↗</span></a>
    </section>
    {valuesOpen && <div className="values-overlay" role="dialog" aria-modal="true" aria-labelledby="values-heading">
      <button type="button" className="values-close" aria-label={locale === 'en' ? 'Close popup' : 'Chiudi popup'} onClick={() => setValuesOpen(false)}><span aria-hidden="true" /></button>
      <h2 id="values-heading">{locale === 'en' ? 'Our values' : 'I nostri valori'}</h2>
      <p className="values-intro">{locale === 'en' ? 'We’d rather stay small and independent than lose what makes us unique. For almost 20 years, these values have shaped who we are. Here’s what we stand for:' : 'Preferiamo rimanere piccoli e indipendenti piuttosto che perdere ciò che ci rende unici. Per quasi 20 anni, questi valori hanno dato forma a ciò che siamo. Ecco cosa ci rappresenta:'}</p>
      <div className="values-content">{values.map((value) => <section key={value.title.en}><h3>{value.title[locale]}</h3><p>{value.text[locale]}</p></section>)}</div>
    </div>}
  </div>
}
