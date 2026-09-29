import { useEffect, useState } from 'react'
import { careersHref } from './careers'
import { CareersPage } from './CareersPage'
import { divisionContent, divisions, officeContacts, pageContext, siteHref, sites, type Division, type Locale } from './site'
import './styles.css'

type SharedProps = { site: Division; locale: Locale; hostname: string; careers?: boolean }

const labels = {
  en: {
    divisions: 'Divisions', contact: 'Contact', about: 'About', careers: 'Careers', explore: 'Explore our divisions', discover: 'Discover more',
    services: 'What we do', offices: 'Our offices', connect: 'Let’s talk', next: 'Something great starts with a conversation.',
    intro: 'Different perspectives. One shared vision.', copyright: 'A creative group for what comes next.',
  },
  it: {
    divisions: 'Offerta', contact: 'Contatti', about: 'Chi siamo', careers: 'Lavora con noi', explore: 'Le nostre divisioni', discover: 'Scopri di più',
    services: 'Cosa facciamo', offices: 'Le nostre sedi', connect: 'Parliamone', next: 'Ogni grande idea inizia con una conversazione.',
    intro: 'Prospettive diverse. Una visione condivisa.', copyright: 'Un gruppo creativo per ciò che verrà.',
  },
} as const

export function Navigation({ site, locale, hostname, careers = false }: SharedProps) {
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = labels[locale]
  const otherLocale: Locale = locale === 'en' ? 'it' : 'en'
  const localeHref = careers ? careersHref(otherLocale, hostname) : siteHref(site, otherLocale, hostname)

  return (
    <header className="site-header">
      <a className="wordmark" href={siteHref('corporate', locale, hostname)} aria-label="Figmenta home">
        <span>FIGMENTA</span>{site !== 'corporate' && <small>{site.toUpperCase()}</small>}
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href={careers ? siteHref('corporate', locale, hostname) : '#about'}>{t.about}</a>
        {!careers && <a href="#services">{t.services}</a>}
        <a href={careersHref(locale, hostname)} aria-current={careers ? 'page' : undefined}>{t.careers}</a>
        <div className="nav-menu">
          <button type="button" className="nav-button" aria-expanded={open} aria-controls="division-menu" onClick={() => setOpen(!open)}>
            <span className="grid-icon" aria-hidden="true">▦</span> {t.divisions} <span aria-hidden="true">⌄</span>
          </button>
          {open && <div id="division-menu" className="division-menu">
            {sites.map((item) => <a key={item} href={siteHref(item, locale, hostname)} aria-label={`Visit ${divisionContent[item].name} page`}>
              <span className="menu-mark" style={{ backgroundColor: divisionContent[item].color }} />
              <span>{divisionContent[item].name}</span>
              <span aria-hidden="true">↗</span>
            </a>)}
          </div>}
        </div>
        <a href="#contact">{t.contact}</a>
        <a className="locale-link" href={localeHref} aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Italian'}`}>
          {locale.toUpperCase()} <span aria-hidden="true">⌄</span>
        </a>
      </nav>
      <button type="button" className="mobile-toggle" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? '✕' : '☰'}
      </button>
      {mobileOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href={careers ? siteHref('corporate', locale, hostname) : '#about'} onClick={() => setMobileOpen(false)}>{t.about}</a>
        {!careers && <a href="#services" onClick={() => setMobileOpen(false)}>{t.services}</a>}
        <a href={careersHref(locale, hostname)} aria-current={careers ? 'page' : undefined}>{t.careers}</a>
        <span className="mobile-section-label">{t.divisions}</span>
        {sites.map((item) => <a key={item} href={siteHref(item, locale, hostname)} aria-label={`Visit ${divisionContent[item].name} page`}>{divisionContent[item].name} <span aria-hidden="true">↗</span></a>)}
        <a href="#contact" onClick={() => setMobileOpen(false)}>{t.contact}</a>
        <a href={localeHref}>{otherLocale.toUpperCase()}</a>
      </nav>}
    </header>
  )
}

export function ContactSection({ locale }: { locale: Locale }) {
  const t = labels[locale]
  return <section className="contact-section" id="contact" aria-labelledby="contact-heading">
    <div className="contact-heading-row">
      <div>
        <p className="eyebrow">{t.connect}</p>
        <h2 id="contact-heading">{t.next}</h2>
      </div>
      <a className="primary-contact" href="mailto:info@figmenta.com">info@figmenta.com <span aria-hidden="true">↗</span></a>
    </div>
    <p className="eyebrow offices-label">{t.offices}</p>
    <div className="offices-grid">
      {officeContacts.map((office) => <article className="office-card" key={office.city}>
        <span className="office-index">0{officeContacts.indexOf(office) + 1}</span>
        <h3>{office.city}</h3>
        <p>{office.country}</p>
        <a href={`mailto:${office.email}`} aria-label={`Email ${office.city} office at ${office.email}`}>
          {office.email} <span aria-hidden="true">↗</span>
        </a>
      </article>)}
    </div>
  </section>
}

function DivisionCard({ division, locale, hostname }: { division: Division; locale: Locale; hostname: string }) {
  const content = divisionContent[division]
  return <a className="division-card" href={siteHref(division, locale, hostname)} aria-label={`Visit ${content.name} page`}>
    <span className="division-card-number">0{divisions.indexOf(division as typeof divisions[number]) + 1}</span>
    <span className="division-card-art" style={{ '--accent': content.color } as React.CSSProperties} aria-hidden="true"><span /></span>
    <span className="division-card-text"><strong>FIGMENTA <em>{content.name.toUpperCase()}</em></strong><span>{content.tagline[locale]}</span></span>
    <span className="card-arrow" aria-hidden="true">↗</span>
  </a>
}

function App() {
  const hostname = window.location.hostname
  const { site, locale } = pageContext(hostname, window.location.pathname)
  const content = divisionContent[site]
  const t = labels[locale]
  const isCorporate = site === 'corporate'
  const isCareers = isCorporate && window.location.pathname.split('/').filter(Boolean)[1] === 'careers'
  const otherDivisions = divisions.filter((division) => division !== site)

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = isCareers ? 'Careers | Figmenta' : site === 'corporate' ? 'Figmenta | Digital Agency' : `Figmenta ${content.name}`
    if (window.location.pathname === '/') window.history.replaceState({}, '', siteHref(site, 'en', hostname))
  }, [content.name, hostname, isCareers, locale, site])

  return <div className={`app site-${site}`} style={{ '--accent': content.color } as React.CSSProperties}>
    <Navigation site={site} locale={locale} hostname={hostname} careers={isCareers} />
    <main>
      {isCareers ? <CareersPage locale={locale} /> : <>
      <section className={`hero ${isCorporate ? 'hero-corporate' : 'hero-division'}`}>
        <div className="aurora aurora-one" /><div className="aurora aurora-two" /><div className="aurora aurora-three" />
        <div className="hero-content">
          {!isCorporate && <p className="hero-kicker">FIGMENTA / {content.name.toUpperCase()}</p>}
          <h1>{content.tagline[locale]}</h1>
          <p className="hero-subtitle">{isCorporate ? t.intro : content.description[locale]}</p>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span>↓</span></a>
      </section>

      <section className="intro-section section-shell" id="about">
        <p className="eyebrow">{isCorporate ? 'FIGMENTA / 01' : `FIGMENTA ${content.name.toUpperCase()} / 01`}</p>
        <div className="intro-layout">
          <h2>{isCorporate ? t.intro : content.tagline[locale]}</h2>
          <p>{content.description[locale]}</p>
        </div>
      </section>

      <section className="services-section section-shell" id="services">
        <div className="section-top"><p className="eyebrow">{t.services}</p><span>02 / 03</span></div>
        <div className="service-list">
          {content.services[locale].map((service, index) => <div className="service-row" key={service}>
            <span>0{index + 1}</span><h3>{service}</h3><span aria-hidden="true">↗</span>
          </div>)}
        </div>
      </section>

      <section className="divisions-section section-shell" id="divisions">
        <div className="section-top"><p className="eyebrow">{t.explore}</p><span>03 / 03</span></div>
        <h2>{t.explore}</h2>
        <div className="division-grid">{otherDivisions.map((division) => <DivisionCard key={division} division={division} locale={locale} hostname={hostname} />)}</div>
      </section>
      </>}

      <ContactSection locale={locale} />
    </main>
    <footer className="site-footer"><a className="footer-logo" href={siteHref('corporate', locale, hostname)}>FIGMENTA</a><p>{t.copyright}</p><span>© {new Date().getFullYear()} Figmenta</span></footer>
  </div>
}

export default App
