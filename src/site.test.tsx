import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App, { ContactSection, Navigation } from './App'
import { showcases } from './showcase'
import { divisions, officeContacts, pageContext, siteHref, type Locale } from './site'

describe('regional office contact links', () => {
  for (const locale of ['en', 'it'] as const) {
    it(`matches every visible office email to its mailto target in ${locale}`, () => {
      render(<ContactSection locale={locale} />)
      expect(screen.getByRole('link', { name: locale === 'en' ? 'Message us on WhatsApp' : 'Scrivici su WhatsApp' }))
        .toHaveAttribute('href', 'https://wa.me/393758293603')
      for (const office of officeContacts) {
        const card = screen.getByRole('heading', { name: `${office.city}, ${office.country}` }).closest('article')!
        const link = within(card).getByRole('link', { name: `Email ${office.city} office at ${office.email}` })
        expect(link).toHaveAttribute('href', `mailto:${office.email}`)
        expect(link).toHaveTextContent(office.email)
      }
    })
  }

  for (const locale of ['en', 'it'] as const) {
    for (const site of ['corporate', ...divisions] as const) {
      it(`renders all three correct office links on the ${site} ${locale} page`, () => {
        window.history.replaceState({}, '', site === 'corporate' ? `/${locale}` : `/${site}/${locale}`)
        render(<App />)
        fireEvent.click(screen.getByRole('button', { name: locale === 'en' ? 'Contact' : 'Contatti' }))
        expect(screen.getByRole('dialog', { name: locale === 'en' ? 'Contact Figmenta' : 'Contatta Figmenta' })).toBeInTheDocument()
        for (const office of officeContacts) {
          const link = screen.getByRole('link', { name: `Email ${office.city} office at ${office.email}` })
          expect(link).toHaveAttribute('href', `mailto:${office.email}`)
          expect(link).toHaveTextContent(office.email)
        }
      })
    }
  }
})

describe('division navigation', () => {
  for (const locale of ['en', 'it'] as const) {
    it(`links from corporate ${locale} to all four division ${locale} routes`, () => {
      render(<Navigation site="corporate" locale={locale} hostname="figmenta.com" />)
      fireEvent.click(screen.getByRole('button', { name: new RegExp(locale === 'en' ? 'Divisions' : 'Offerta') }))
      for (const division of divisions) {
        expect(screen.getByRole('link', { name: `Visit ${division[0].toUpperCase()}${division.slice(1)} page` }))
          .toHaveAttribute('href', `https://${division}.figmenta.com/${locale}`)
      }
    })

    it(`keeps all four division links inside the local preview in ${locale}`, () => {
      for (const division of divisions) expect(siteHref(division, locale, 'localhost')).toBe(`/${division}/${locale}`)
    })
  }

  it('preserves the locale when switching between divisions', () => {
    expect(siteHref('live', 'it', 'studio.figmenta.com')).toBe('https://live.figmenta.com/it')
    expect(siteHref('media', 'en', 'productions.figmenta.com')).toBe('https://media.figmenta.com/en')
  })

  it('uses the same locale aware links in the mobile menu', () => {
    render(<Navigation site="corporate" locale="it" hostname="figmenta.com" />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    const menu = screen.getByRole('navigation', { name: 'Mobile navigation' })
    for (const division of divisions) {
      expect(within(menu).getByRole('link', { name: `Visit ${division[0].toUpperCase()}${division.slice(1)} page` }))
        .toHaveAttribute('href', `https://${division}.figmenta.com/it`)
    }
  })

  it('resolves both custom subdomains and local preview paths', () => {
    expect(pageContext('studio.figmenta.com', '/it')).toEqual({ site: 'studio', locale: 'it' })
    expect(pageContext('localhost', '/studio/it')).toEqual({ site: 'studio', locale: 'it' })
    expect(pageContext('localhost', '/it')).toEqual({ site: 'corporate', locale: 'it' })
  })

  it('uses English as the default on a locale-free route', () => {
    for (const division of divisions) {
      expect(pageContext(`${division}.figmenta.com`, '/')).toEqual({ site: division, locale: 'en' satisfies Locale })
    }
  })
})

describe('showcase pages', () => {
  for (const locale of ['en', 'it'] as const) {
    it(`renders the corporate ${locale} work and locale-aware division links`, () => {
      window.history.replaceState({}, '', `/${locale}`)
      render(<App />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(locale === 'en' ? 'Figmenta means' : 'Figmenta significa')
      const featuredWork = screen.getByRole('region', { name: locale === 'en' ? 'Featured work' : 'Lavori in evidenza' })
      expect(within(featuredWork).getAllByRole('article')).toHaveLength(4)
      expect(featuredWork.querySelectorAll('video')).toHaveLength(4)
      for (const division of divisions) {
        expect(screen.getAllByRole('link', { name: `Visit ${division[0].toUpperCase()}${division.slice(1)} page` })
          .some((link) => link.getAttribute('href') === `/${division}/${locale}`)).toBe(true)
      }
    })
  }

  for (const locale of ['en', 'it'] as const) {
    for (const division of divisions) {
      it(`renders the ${division} ${locale} hero, service imagery, and locale switch`, () => {
        window.history.replaceState({}, '', `/${division}/${locale}`)
        render(<App />)
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(showcases[division].hero[locale])
        expect(screen.getAllByRole('img', { name: /services|social media|influencer media|media production|paid advertising|SEO and GEO/i })).toHaveLength(2)
        expect(screen.getByRole('link', { name: locale === 'en' ? 'Switch to Italian' : 'Switch to English' }))
          .toHaveAttribute('href', `/${division}/${locale === 'en' ? 'it' : 'en'}`)
      })
    }
  }

  it('opens and closes contact without losing the selected route', () => {
    window.history.replaceState({}, '', '/studio/it')
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Contatti' }))
    expect(screen.getByRole('dialog', { name: 'Contatta Figmenta' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Email Milan office at info@figmenta.it' })).toHaveAttribute('href', 'mailto:info@figmenta.it')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(window.location.pathname).toBe('/studio/it')
  })
})
