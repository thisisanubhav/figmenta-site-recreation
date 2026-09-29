import type { Division, Locale } from './site'

type Localized = Record<Locale, string>
type VisualCard = { title: Localized; image: string; alt: string }
type CaseCard = { title: string; image: string }

export type Showcase = {
  hero: Localized
  overview: Localized
  features: readonly VisualCard[]
  cases: readonly CaseCard[]
  menu: readonly { title: string; items: readonly string[] }[]
  capabilities?: readonly string[]
}

export const showcases: Record<Exclude<Division, 'corporate'>, Showcase> = {
  studio: {
    hero: { en: 'Brands, products and everything in between', it: 'Progettazione di Brand e prodotti Digitali' },
    overview: {
      en: 'We help brands take shape and evolve across every touchpoint, balancing creativity and a strong strategic vision. Whether we’re defining a brand’s voice or prototyping its next digital product, our studio crafts everything with a clear understanding of what makes it truly meaningful.',
      it: 'Che si tratti di definire la voce di un brand o prototipare il suo prossimo prodotto digitale, il nostro studio progetta quello che è necessario nel giusto ordine. Aiutiamo i brand a prendere forma e a evolversi in ogni touchpoint, bilanciando creatività e forte visione strategica.',
    },
    features: [
      { title: { en: 'Branding', it: 'Branding' }, image: 'https://studio.figmenta.com/branding-page-cover.webp', alt: 'Branding services' },
      { title: { en: 'Digital Products', it: 'Digital Products' }, image: 'https://studio.figmenta.com/digital-products-page-cover.webp', alt: 'Digital product services' },
    ],
    capabilities: ['BRAND STRATEGY', 'GRAPHIC DESIGN', 'MOTION GRAPHIC', 'UX DESIGN'],
    cases: [
      { title: 'Veuve Clicquot', image: 'https://cdn.sanity.io/images/gm701ez7/production/d6b061b9d113a29cb30975e7d0da1f5b0635c9f3-894x851.webp?fm=webp' },
      { title: 'Icoone', image: 'https://cdn.sanity.io/images/gm701ez7/production/a76aeb22537a74431d238bdb23616d8feabd66b0-800x445.gif?fm=webp' },
      { title: 'Laura Biagiotti ROMA Uomo', image: 'https://cdn.sanity.io/images/gm701ez7/production/0a526fb860793cc3016d190dff69b5492eea3862-1080x1350.jpg?fm=webp' },
      { title: 'Frolickers', image: 'https://cdn.sanity.io/images/gm701ez7/production/a29802d033a6e371a306ce797c63484b414acc99-1080x1350.jpg?fm=webp' },
    ],
    menu: [
      { title: 'Branding', items: ['Brand strategy', 'Brand Identity'] },
      { title: 'Digital products', items: ['Product strategy', 'Product design', 'Product development'] },
    ],
  },
  live: {
    hero: { en: 'Telling stories to create live lasting connections', it: 'Raccontare storie per creare connessioni durature e vive' },
    overview: {
      en: 'We build relationships between brands and people through impactful storytelling, creator and community engagement, and targeted digital PR actions. We don’t just follow trends—we anticipate them, interpret them, and turn them into lasting connections.',
      it: 'Costruiamo relazioni tra brand e persone attraverso uno storytelling efficace, il coinvolgimento di creator e community e azioni mirate di digital PR. Non ci limitiamo a seguire i trend: li anticipiamo, li interpretiamo e li trasformiamo in connessioni durature.',
    },
    features: [
      { title: { en: 'Social Media', it: 'Social Media' }, image: 'https://cdn.sanity.io/images/gm701ez7/production/8001ff717fb2fdb0b429d376e50f1c21d8179bfc-1158x1920.webp', alt: 'Social media' },
      { title: { en: 'Influencer Media', it: 'Influencer Media' }, image: 'https://cdn.sanity.io/images/gm701ez7/production/c0cdab898d5efeffc1fd135333396047de813ff1-2688x1792.webp', alt: 'Influencer media' },
    ],
    cases: [
      { title: 'Moët & Chandon', image: 'https://cdn.sanity.io/images/gm701ez7/production/8a1d12c5e53d6035143bb33a5e1dc9d47fb9dd91-1638x2048.webp?fm=webp' },
      { title: 'System Professional', image: 'https://cdn.sanity.io/images/gm701ez7/production/d898cdf6ec912ae3ad5276aa5bb3f44a53b5fa3d-480x270.gif?fm=webp' },
      { title: 'Lovrén', image: 'https://cdn.sanity.io/images/gm701ez7/production/6cd7310d7cdaa17171b4972f631b910475cb5dbd-1300x868.webp?fm=webp' },
      { title: 'Terra di Cuma', image: 'https://cdn.sanity.io/images/gm701ez7/production/d9ef12426ed0e2db4a842b846b37b03e3fd2e7c0-1080x1080.jpg?fm=webp' },
    ],
    menu: [
      { title: 'Social media', items: ['Social media management', 'Community management'] },
      { title: 'Influencer media', items: ['Influencer marketing', 'User generated content (UGC)'] },
    ],
  },
  productions: {
    hero: { en: 'Visual contents that leave a mark', it: 'Produzione di foto e video che lasciano il segno' },
    overview: {
      en: 'For over 10 years, we’ve been producing photo and video content for startups and leading brands in the Beauty, Fashion, Design, Helthcare and Lifestyle sectors.',
      it: "Da oltre 10 anni realizziamo produzioni foto e video per startup e brand leader in settori come il beauty, il fashion, il design, l'healthcare e il luxury lifestyle.",
    },
    features: [
      { title: { en: 'Synthetic Media Productions', it: 'Synthetic Media Productions' }, image: 'https://cdn.sanity.io/images/gm701ez7/production/05548ebae0b9bbcd0055b9e1aedfa790ef7eee5f-1024x1024.jpg', alt: 'Synthetic media production' },
      { title: { en: 'Physical Media Productions', it: 'Physical Media Productions' }, image: 'https://cdn.sanity.io/images/gm701ez7/production/48c3bac1372f54693859d538b2ee4e13cafbbc8b-1015x798.jpg', alt: 'Physical media production' },
    ],
    cases: [
      { title: 'D’yavol', image: 'https://cdn.sanity.io/images/gm701ez7/production/16af2dae0ae3903f68b8005ded93df70368f06e8-2182x2727.jpg?fm=webp' },
      { title: 'Davines', image: 'https://cdn.sanity.io/images/gm701ez7/production/3005142a8bd814c5c295f3896a02d5260cc498d7-1054x534.jpg?fm=webp' },
      { title: 'Veuve Clicquot', image: 'https://cdn.sanity.io/images/gm701ez7/production/d6b061b9d113a29cb30975e7d0da1f5b0635c9f3-894x851.webp?fm=webp' },
      { title: 'Moët & Chandon', image: 'https://cdn.sanity.io/images/gm701ez7/production/8a1d12c5e53d6035143bb33a5e1dc9d47fb9dd91-1638x2048.webp?fm=webp' },
    ],
    menu: [
      { title: 'Synthetic media productions', items: ['AI-Still Life Production', 'AI-Model Production'] },
      { title: 'Physical Media Productions', items: ['Still Life Product Shooting', 'Lifestyle Photo & Video Shooting'] },
    ],
  },
  media: {
    hero: { en: 'The media operating system behind our clients’ growth', it: 'Il sistema operativo per i media alla base della crescita dei nostri clienti' },
    overview: {
      en: 'We design, activate, and optimize performance-driven media systems that connect paid advertising and search into a single, measurable growth engine.',
      it: 'Progettiamo, attiviamo e ottimizziamo sistemi media orientati alla performance, integrando Paid Advertising e Search in un’unica strategia di crescita misurabile.',
    },
    features: [
      { title: { en: 'Paid Advertising', it: 'Paid Advertising' }, image: 'https://cdn.sanity.io/images/j2rpqh8d/production/d81c70666f1c08a4c73ca1fae166a48b096fbd32-2250x1500.png', alt: 'Paid advertising' },
      { title: { en: 'SEO & GEO', it: 'SEO & GEO' }, image: 'https://cdn.sanity.io/images/j2rpqh8d/production/0bebdce8eccc6a961cb7bfb5de55e77a7910b419-2250x1500.png', alt: 'SEO and GEO' },
    ],
    cases: [
      { title: 'Integrated Launch of a Healthcare Product', image: 'https://cdn.sanity.io/images/j2rpqh8d/production/8e9b6f7914e8e86e2e37a83c224f6e7db26298c5-736x713.jpg?fm=webp' },
      { title: 'TikTok Ads Revenue Growth', image: 'https://cdn.sanity.io/images/j2rpqh8d/production/52ecf99e2a0521fc959b7bee54e2ff9789669534-736x1104.webp?fm=webp' },
      { title: '+37% sales in Skincare', image: 'https://cdn.sanity.io/images/j2rpqh8d/production/2f32741c3033a19f2729c4cc5569283d90d9867d-736x1104.webp?fm=webp' },
      { title: 'Luxury Jewelry Brand', image: 'https://cdn.sanity.io/images/j2rpqh8d/production/e2817e7a32c020024077484f908f3ba140c85ad8-564x437.webp?fm=webp' },
    ],
    menu: [
      { title: 'Paid Advertising', items: ['Meta Ads', 'Tiktok Ads', 'LinkedIn Ads'] },
      { title: 'SEO & GEO', items: ['Search & AI Visibility Strategy', 'Technical SEO', 'GEO', 'Digital PR & off-page SEO'] },
    ],
  },
}
