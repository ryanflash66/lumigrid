const BASE_URL = 'https://lumigrid.ai'

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Lumigrid AI',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/images/hero/hero-image.jpg`,
    description:
      'We build custom AI automations that save your business time and money.',
    email: 'hello@lumigrid.ai',
    sameAs: [],
    areaServed: 'Worldwide',
    serviceType: [
      'AI Automation',
      'Custom AI Workflows',
      'Business Automation',
      'AI Integration',
    ],
    priceRange: '$$',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lumigrid AI',
    url: BASE_URL,
    description:
      'We build custom AI automations that save your business time and money.',
    publisher: {
      '@type': 'Organization',
      name: 'Lumigrid AI',
      url: BASE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ServiceJsonLd({
  name,
  description,
  price,
}: {
  name: string
  description: string
  price: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Lumigrid AI',
      url: BASE_URL,
    },
    description,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FAQJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
