import { divisionContent, divisions, siteHref, type Division, type Locale } from './site'
import { showcases } from './showcase'

const corporateCopy = {
  en: {
    headline: <>Figmenta means<br /><em>Imaginary</em> things</>,
    intro: 'Figmenta is an independent boutique agency rooted in Italy, powered in UK and globally operating through a diverse range of talent.',
    divisions: 'Our divisions',
    why: 'WHY FIGMENTA',
  },
  it: {
    headline: <>Figmenta significa<br />cose <em>immaginarie</em></>,
    intro: 'Figmenta è una boutique Digital agency indipendente, fondata in Italia, potenziata nel Regno Unito e operante a livello globale con team distribuiti su tre continenti.',
    divisions: 'Le nostre divisioni',
    why: 'PERCHÉ FIGMENTA',
  },
} as const

const corporateCases = [
  { title: { en: 'Different', it: 'Differente' }, detail: { en: 'Four markets, one sustainability story — how Figmenta helped Davines maintain a consistent and compelling social presence across Italy, the UK, Spain, and France.', it: 'Quando è il momento di mettere in risalto I’unicità di un brand iconico in quattro diversi paesi.' }, video: 'https://cdn.sanity.io/files/gm701ez7/production/c33201acbe179cde622d971fc3e3318d20308fc6.mp4' },
  { title: { en: 'Classy', it: 'Classy' }, detail: { en: 'Hitting hard creatively without overshadowing a heritage that speaks for itself.', it: 'Quando la creatività deve colpire nel segno senza mai tradire l’eredità del brand.' }, video: 'https://cdn.sanity.io/files/gm701ez7/production/69e2f78cdca3eda49d7904e46c15af603f3a079f.mp4' },
  { title: { en: 'Sophisticated', it: 'Sofisticato' }, detail: { en: "How Figmenta built The Corner's social media presence from zero — brand voice, channel strategy, and content that turned a new audience into a loyal community.", it: 'Quando un brand vuole fare un ingresso deciso nel mercato.' }, video: 'https://cdn.sanity.io/files/gm701ez7/production/7e90f7f3388e5dfc59dcb3a5f545a6f65b310b5e.mp4' },
  { title: { en: 'Brave', it: 'Potente' }, detail: { en: 'MA True Cannabis dares to be different in an industry full of preconceptions. We helped them own that identity online — with content that converts and a 3D website that turns heads.', it: 'Quando è il momento di osare con ironia, superando ogni preconcetto, noi ci siamo.' }, video: 'https://cdn.sanity.io/files/gm701ez7/production/0927f31320fae6a4e91c5f2230fee4b067b51b32.mp4' },
] as const

const reasons = [
  { en: 'Industry driven', it: 'Competenza di settore' },
  { en: 'Made in Italy, done right', it: 'Made in Italy, fatto bene' },
  { en: 'Future proof choices', it: 'Scelte a prova di futuro' },
  { en: 'The right value of your budget', it: 'Il giusto valore del tuo budget' },
] as const

function GlowField() {
  return <div className="showcase-glow" aria-hidden="true"><i /><i /><i /><i /></div>
}

function Outro({ locale }: { locale: Locale }) {
  return <section className="showcase-outro">
    <h2>{locale === 'en' ? 'UNLEASH YOUR' : 'SCATENA LA TUA'}<br /><em>{locale === 'en' ? 'Imagination' : 'Imaginazione'}</em></h2>
    <a href="mailto:info@figmenta.com">{locale === 'en' ? 'Let’s start' : 'Inizia'} <span aria-hidden="true">↗</span></a>
  </section>
}

function CorporatePage({ locale, hostname }: { locale: Locale; hostname: string }) {
  const t = corporateCopy[locale]
  return <div className="showcase-page corporate-showcase">
    <section className="showcase-hero corporate-hero"><GlowField /><h1>{t.headline}</h1></section>
    <section className="corporate-intro"><p>{t.intro}</p></section>
    <section className="corporate-cases" aria-label={locale === 'en' ? 'Featured work' : 'Lavori in evidenza'}>
      {corporateCases.map((item, index) => <article className={`corporate-case case-${index + 1}`} key={item.title.en}>
        <h2>{item.title[locale]}</h2><p>{item.detail[locale]}</p><video src={item.video} muted loop autoPlay playsInline preload="metadata" aria-label={item.title[locale]} />
      </article>)}
    </section>
    <section className="corporate-divisions" id="divisions">
      <h2>{t.divisions}</h2>
      {divisions.map((division, index) => <a key={division} href={siteHref(division, locale, hostname)} className="corporate-division-row" aria-label={`Visit ${divisionContent[division].name} page`}>
        <span>0{index + 1}</span><strong>FIGMENTA <em>{division.toUpperCase()}</em></strong><span>{divisionContent[division].tagline[locale]}</span><span aria-hidden="true">↗</span>
      </a>)}
    </section>
    <section className="corporate-why"><h2>{t.why}</h2><div>{reasons.map((reason, index) => <p key={reason.en}><span>{index + 1}.</span> {reason[locale]}</p>)}</div></section>
    <Outro locale={locale} />
  </div>
}

function DivisionPage({ site, locale }: { site: Exclude<Division, 'corporate'>; locale: Locale }) {
  const content = showcases[site]
  return <div className={`showcase-page division-showcase showcase-${site}`}>
    <section className="showcase-hero division-hero"><GlowField /><h1>{site === 'media' && locale === 'en' ? <>The media operating system<br /> behind our clients’ <em>growth</em></> : content.hero[locale]}</h1></section>
    <section className="feature-pair" id="services" aria-label={locale === 'en' ? 'Services' : 'Servizi'}>
      {content.features.map((feature) => <article className="feature-card" key={feature.title.en}>
        <img src={feature.image} alt={feature.alt} /><h2>{feature.title[locale]}</h2>
      </article>)}
    </section>
    <section className="division-overview"><p>{content.overview[locale]}</p></section>
    {content.capabilities && <section className="division-capabilities"><h2>CAPABILITIES</h2><div>{content.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div></section>}
    {site === 'media' && <section className="division-tools"><h2>TOOLS</h2><div><span>Google Ads</span><span>Meta</span><span>TikTok</span><span>LinkedIn</span><span>Analytics</span></div></section>}
    <section className="showcase-cases" aria-labelledby="cases-heading"><h2 id="cases-heading">SOME CASES</h2><div className="case-grid">{content.cases.map((item) => <article className="showcase-case" key={item.title}>
      <img src={item.image} alt="" loading="lazy" /><h3>{item.title}</h3>
    </article>)}</div></section>
    <Outro locale={locale} />
  </div>
}

export function ShowcasePage({ site, locale, hostname }: { site: Division; locale: Locale; hostname: string }) {
  return site === 'corporate' ? <CorporatePage locale={locale} hostname={hostname} /> : <DivisionPage site={site} locale={locale} />
}
