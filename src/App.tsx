import { useEffect, useState } from 'react'
import { careersHref } from './careers'
import { CareersPage } from './CareersPage'
import { ShowcasePage } from './ShowcasePage'
import { showcases } from './showcase'
import { divisionContent, officeContacts, pageContext, siteHref, sites, type Division, type Locale } from './site'
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
  const [contactOpen, setContactOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const t = labels[locale]
  const otherLocale: Locale = locale === 'en' ? 'it' : 'en'
  const localeHref = careers ? careersHref(otherLocale, hostname) : siteHref(site, otherLocale, hostname)
  const referencePage = (path: string) => `https://figmenta.com/${locale}/${path}`

  useEffect(() => {
    if (!contactOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContactOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [contactOpen])

  if (!careers) return <>
    <header className={`site-header reference-header ${site === 'corporate' ? 'corporate-header' : 'division-header'}`}>
      <a className="reference-logo" href={siteHref('corporate', locale, hostname)} aria-label="Figmenta home">
        {site === 'corporate' ? <img src="https://figmenta.com/logos/figmenta.svg" alt="" /> : <img src={`https://figmenta.com/logos/${site}.svg`} alt="" />}
      </a>
      <nav className="reference-nav" aria-label="Main navigation">
        {site === 'corporate' ? <div className="reference-primary">
          <a href={referencePage('our-expertise')}>Expertise</a><a href={referencePage('works')}>Portfolio</a><a href={referencePage('about')}>{t.about}</a>
          <a href={careersHref(locale, hostname)}>{t.careers}</a><a href={referencePage('updates')}>{locale === 'en' ? 'Updates' : 'Aggiornamenti'}</a>
        </div> : <div className="reference-primary division-primary">
          <div className="nav-menu"><button type="button" className="nav-button" aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)}>
            Figmenta {divisionContent[site].name} services <span aria-hidden="true">⌄</span>
          </button>{servicesOpen && <div className="reference-service-menu">{showcases[site].menu.map((group) => <div key={group.title}><strong>{group.title}</strong>{group.items.map((item) => <span key={item}>{item}</span>)}</div>)}</div>}</div>
          {(site === 'studio' || site === 'live') && <a href={referencePage('updates')}>Insights</a>}
        </div>}
        <div className="reference-utilities"><div className="nav-menu">
          <button type="button" className="nav-button" aria-expanded={open} aria-controls="division-menu" onClick={() => setOpen(!open)}>
            <span className="grid-icon" aria-hidden="true"><i /><i /><i /><i /></span> {t.divisions} <span aria-hidden="true">⌄</span>
          </button>
          {open && <div id="division-menu" className="reference-division-menu">{sites.map((item) => <a key={item} href={siteHref(item, locale, hostname)} aria-label={`Visit ${divisionContent[item].name} page`}>
            <img src={`https://figmenta.com/logos/${item === 'corporate' ? 'figmenta' : item}.svg`} alt="" /><span>{divisionContent[item].tagline[locale]}</span>
          </a>)}</div>}
        </div>
        <button type="button" className="nav-button" onClick={() => setContactOpen(true)}>{t.contact}</button>
        <a className="locale-link" href={localeHref} aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Italian'}`}>{locale.toUpperCase()} <span aria-hidden="true">⌄</span></a>
        {site !== 'corporate' && <a className="back-to-group" href={siteHref('corporate', locale, hostname)} aria-label="Back to Figmenta group">◀</a>}
        </div>
      </nav>
      <button type="button" className="mobile-toggle" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? '✕' : '☰'}</button>
      {mobileOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        {site === 'corporate' && <><a href={referencePage('our-expertise')}>Expertise</a><a href={referencePage('works')}>Portfolio</a><a href={referencePage('about')}>{t.about}</a><a href={careersHref(locale, hostname)}>{t.careers}</a></>}
        {site !== 'corporate' && showcases[site].menu.map((group) => <div key={group.title}><span className="mobile-section-label">{group.title}</span>{group.items.map((item) => <span className="mobile-menu-item" key={item}>{item}</span>)}</div>)}
        <span className="mobile-section-label">{t.divisions}</span>
        {sites.map((item) => <a key={item} href={siteHref(item, locale, hostname)} aria-label={`Visit ${divisionContent[item].name} page`}>{divisionContent[item].name} <span aria-hidden="true">↗</span></a>)}
        <button type="button" className="mobile-contact-button" onClick={() => { setMobileOpen(false); setContactOpen(true) }}>{t.contact}</button><a href={localeHref}>{otherLocale.toUpperCase()}</a>
      </nav>}
    </header>
    {contactOpen && <div className="contact-overlay" role="dialog" aria-modal="true" aria-label={locale === 'en' ? 'Contact Figmenta' : 'Contatta Figmenta'}>
      <button className="contact-close" type="button" onClick={() => setContactOpen(false)} aria-label={locale === 'en' ? 'Close contact' : 'Chiudi contatti'}><span aria-hidden="true" /></button>
      <ContactSection locale={locale} />
    </div>}
  </>

  return (
    <header className={`site-header${careers ? ' careers-header' : ''}`}>
      <a className="wordmark" href={siteHref('corporate', locale, hostname)} aria-label="Figmenta home">
        {careers ? <img src="https://figmenta.com/logos/figmenta.svg" alt="" /> : <><span>FIGMENTA</span>{site !== 'corporate' && <small>{site.toUpperCase()}</small>}</>}
      </a>
      <nav className={`desktop-nav${careers ? ' careers-desktop-nav' : ''}`} aria-label="Main navigation">
        {careers ? <div className="careers-primary-links">
          <a href={referencePage('our-expertise')}>Expertise</a>
          <a href={referencePage('works')}>Portfolio</a>
          <a href={referencePage('about')}>{t.about}</a>
          <a href={careersHref(locale, hostname)} aria-current="page">{t.careers}</a>
          <a href={referencePage('updates')}>{locale === 'en' ? 'Updates' : 'Aggiornamenti'}</a>
        </div> : <>
          <a href="#about">{t.about}</a>
          <a href="#services">{t.services}</a>
          <a href={careersHref(locale, hostname)}>{t.careers}</a>
        </>}
        <div className="nav-utilities">
        <div className="nav-menu">
          <button type="button" className="nav-button" aria-expanded={open} aria-controls="division-menu" onClick={() => setOpen(!open)}>
            <span className="grid-icon" aria-hidden="true"><i /><i /><i /><i /></span> {t.divisions} <span aria-hidden="true">⌄</span>
          </button>
          {open && <div id="division-menu" className="division-menu">
            {sites.map((item) => <a key={item} href={siteHref(item, locale, hostname)} aria-label={`Visit ${divisionContent[item].name} page`}>
              {careers && <img src={`https://figmenta.com/logos/${item === 'corporate' ? 'figmenta' : item}.svg`} alt="" />}
              <span className="menu-mark" style={{ backgroundColor: divisionContent[item].color }} />
              <span>{careers ? divisionContent[item].tagline[locale] : divisionContent[item].name}</span>
              <span aria-hidden="true">↗</span>
            </a>)}
          </div>}
        </div>
        <a href={careers ? referencePage('contact-us') : '#contact'}>{t.contact}</a>
        <a className="locale-link" href={localeHref} aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Italian'}`}>
          {locale.toUpperCase()} <span aria-hidden="true">⌄</span>
        </a>
        </div>
      </nav>
      <button type="button" className="mobile-toggle" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? '✕' : '☰'}
      </button>
      {mobileOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        {careers && <><a href={referencePage('our-expertise')}>Expertise</a><a href={referencePage('works')}>Portfolio</a></>}
        <a href={careers ? referencePage('about') : '#about'} onClick={() => setMobileOpen(false)}>{t.about}</a>
        {!careers && <a href="#services" onClick={() => setMobileOpen(false)}>{t.services}</a>}
        <a href={careersHref(locale, hostname)} aria-current={careers ? 'page' : undefined}>{t.careers}</a>
        {careers && <a href={referencePage('updates')}>{locale === 'en' ? 'Updates' : 'Aggiornamenti'}</a>}
        <span className="mobile-section-label">{t.divisions}</span>
        {sites.map((item) => <a key={item} href={siteHref(item, locale, hostname)} aria-label={`Visit ${divisionContent[item].name} page`}>{divisionContent[item].name} <span aria-hidden="true">↗</span></a>)}
        <a href={careers ? referencePage('contact-us') : '#contact'} onClick={() => setMobileOpen(false)}>{t.contact}</a>
        <a href={localeHref}>{otherLocale.toUpperCase()}</a>
      </nav>}
    </header>
  )
}

export function ContactSection({ locale }: { locale: Locale }) {
  return <section className="contact-section" id="contact" aria-labelledby="contact-heading">
    <h2 id="contact-heading">{locale === 'en' ? 'We serve clients worldwide with teams spread across multiple cities and three continents.' : 'Lavoriamo con clienti in tutto il mondo, con team in diverse città e tre continenti.'}</h2>
    <div className="contact-quick-actions"><a href="tel:+390280897083">{locale === 'en' ? 'Call us +390280897083' : 'Chiamaci +390280897083'}</a><a href="https://wa.me/393758293603" target="_blank" rel="noopener noreferrer">{locale === 'en' ? 'Message us on WhatsApp' : 'Scrivici su WhatsApp'}</a></div>
    <div className="contact-offices">{officeContacts.map((office) => <article className="office-card" key={office.city}>
      <h3>{office.city}, {office.country}</h3>
      <a href={`mailto:${office.email}`} aria-label={`Email ${office.city} office at ${office.email}`}>{office.email}</a>
    </article>)}</div>
    <div className="contact-project"><h3>{locale === 'en' ? 'NEW PROJECT?' : 'NUOVO PROGETTO?'}</h3><p>{locale === 'en' ? 'Tell us what you’re making.' : 'Raccontaci il tuo progetto.'}</p><a href="mailto:info@figmenta.com?subject=New%20project">{locale === 'en' ? 'Send a message' : 'Invia un messaggio'} <span aria-hidden="true">↗</span></a></div>
  </section>
}

function App() {
  const hostname = window.location.hostname
  const { site, locale } = pageContext(hostname, window.location.pathname)
  const content = divisionContent[site]
  const isCareers = site === 'corporate' && window.location.pathname.split('/').filter(Boolean)[1] === 'careers'

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = isCareers ? 'Careers | Figmenta' : site === 'corporate' ? 'Figmenta | Digital Agency for Globally Minded Brands' : `Figmenta ${content.name}: ${divisionContent[site].tagline.en}`
    if (window.location.pathname === '/') window.history.replaceState({}, '', siteHref(site, 'en', hostname))
  }, [content.name, hostname, isCareers, locale, site])

  return <div className={`app site-${site}${isCareers ? ' page-careers' : ''}`} style={{ '--accent': content.color } as React.CSSProperties}>
    <Navigation site={site} locale={locale} hostname={hostname} careers={isCareers} />
    <main>
      {isCareers ? <CareersPage locale={locale} /> : <ShowcasePage site={site} locale={locale} hostname={hostname} />}
    </main>
    <footer className="careers-footer">
      <p>©Copyright Figmenta 2025</p>
      <a href="https://www.iubenda.com/privacy-policy/69360872" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
      <a href="mailto:info@figmenta.com">info@figmenta.com</a>
    </footer>
  </div>
}

export default App
