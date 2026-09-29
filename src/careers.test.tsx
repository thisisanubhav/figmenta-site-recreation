import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { careersHref, generalApplicationHref, vacancies, vacancyApplicationHref } from './careers'
import { CareersPage } from './CareersPage'

function applicationDetails(href: string) {
  const url = new URL(href)
  return { recipient: url.pathname, subject: url.searchParams.get('subject'), body: url.searchParams.get('body') }
}

describe('vacancy applications', () => {
  for (const locale of ['en', 'it'] as const) {
    it(`offers a contextual Apply action for every active vacancy in ${locale}`, () => {
      render(<CareersPage locale={locale} />)
      for (const vacancy of vacancies) {
        fireEvent.click(screen.getByRole('button', { name: vacancy.title }))
        const article = screen.getByRole('button', { name: vacancy.title }).closest('article')!
        const action = within(article).getByRole('link', { name: new RegExp(vacancy.title) })
        const details = applicationDetails(action.getAttribute('href')!)
        expect(details.recipient).toBe('hr@figmenta.com')
        expect(details.subject).toBe(`${locale === 'it' ? 'Candidatura' : 'Application'} – ${vacancy.title}`)
        expect(details.body).toContain(`${locale === 'it' ? 'Ruolo' : 'Role'}: ${vacancy.title}`)
        expect(details.body).toContain(`${locale === 'it' ? 'Riferimento ruolo' : 'Role reference'}: ${vacancy.slug}`)
      }
    })
  }

  it('never carries Vacancy A context into Vacancy B or a reopened Vacancy A', () => {
    render(<CareersPage locale="en" />)
    const first = screen.getByRole('button', { name: 'Senior Art Director- Latin America' })
    const second = screen.getByRole('button', { name: 'Sales Specialist – Asia team' })
    fireEvent.click(first)
    const firstHref = screen.getByRole('link', { name: 'Apply for this role: Senior Art Director- Latin America' }).getAttribute('href')!
    fireEvent.click(second)
    expect(first).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('link', { name: 'Apply for this role: Senior Art Director- Latin America' })).not.toBeInTheDocument()
    const secondHref = screen.getByRole('link', { name: 'Apply for this role: Sales Specialist – Asia team' }).getAttribute('href')!
    expect(applicationDetails(secondHref).subject).toBe('Application – Sales Specialist – Asia team')
    expect(applicationDetails(secondHref).body).not.toContain('Senior Art Director')
    expect(secondHref).not.toBe(firstHref)
    fireEvent.click(second)
    expect(screen.queryByRole('link', { name: 'Apply for this role: Sales Specialist – Asia team' })).not.toBeInTheDocument()
    fireEvent.click(first)
    expect(screen.getByRole('link', { name: 'Apply for this role: Senior Art Director- Latin America' })).toHaveAttribute('href', firstHref)
  })

  it('keeps general applications separate from vacancy applications', () => {
    render(<CareersPage locale="en" />)
    const general = screen.getByRole('link', { name: /Apply to Figmenta/ })
    expect(general).toHaveAttribute('href', 'mailto:hr@figmenta.com')
    fireEvent.click(screen.getByRole('button', { name: 'UX Designer Junior' }))
    expect(general).toHaveAttribute('href', 'mailto:hr@figmenta.com')
    expect(screen.getByRole('link', { name: 'Apply for this role: UX Designer Junior' })).toHaveAttribute('href', vacancyApplicationHref(vacancies[3], 'en'))
    expect(generalApplicationHref).toBe('mailto:hr@figmenta.com')
  })
})

describe('Careers routes', () => {
  it('has corresponding English and Italian URLs', () => {
    expect(careersHref('en', 'figmenta.com')).toBe('https://figmenta.com/en/careers')
    expect(careersHref('it', 'figmenta.com')).toBe('https://figmenta.com/it/careers')
    expect(careersHref('it', 'localhost')).toBe('/it/careers')
  })

  for (const locale of ['en', 'it'] as const) {
    it(`renders the ${locale} Careers route with a locale-preserving language switch`, () => {
      window.history.replaceState({}, '', `/${locale}/careers`)
      render(<App />)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: locale === 'en' ? 'Switch to Italian' : 'Switch to English' }))
        .toHaveAttribute('href', locale === 'en' ? '/it/careers' : '/en/careers')
      expect(screen.getAllByRole('button', { name: 'Senior Art Director- Latin America' })).toHaveLength(1)
    })
  }
})
