export type Project = {
  slug: string
  title: string
  client: string
  industry: string
  serviceType: string
  excerpt: string
  heroImage: string
  challenge: string
  solution: string
  results: Array<{ metric: string; value: string; description: string }>
  testimonial?: { quote: string; name: string; title: string; avatar: string }
  services: string[]
  duration: string
  year: string
  featured: boolean
  content: Array<{
    type: 'paragraph' | 'heading' | 'quote' | 'stats-row' | 'list'
    value: string | string[]
  }>
}

export const projects: Project[] = [
  {
    slug: 'futureaid-platform-rebuild',
    title: 'FutureAid Platform Rebuild',
    client: 'FutureAid',
    industry: 'Non-Profit',
    serviceType: 'Redesign',
    excerpt:
      'A full digital overhaul for a global non-profit: modern design system, new CMS, and performance budgets that cut page load by two-thirds.',
    heroImage: '/assets/images/blog/blog-01.jpg',
    challenge:
      'Legacy WordPress site with 6.1s LCP, inconsistent branding across 40+ pages, and a 2.3% conversion rate on their primary donation CTA. Their engineering team was stretched thin maintaining outdated plugins.',
    solution:
      'Full rebuild with Next.js App Router, a custom design system built on shadcn/ui primitives, headless CMS migration to Sanity, and strict performance budgets enforced in CI. We paired every design decision with a Core Web Vitals target.',
    results: [
      { metric: 'Conversion Rate', value: '+28%', description: 'Lift in donation CTA clicks' },
      { metric: 'LCP', value: '1.8s', description: 'Down from 6.1s' },
      { metric: 'Organic Traffic', value: '+120%', description: '6-month growth' }
    ],
    testimonial: {
      quote:
        'Lumigrid understood that our site is our largest fundraising channel. They treated every millisecond of load time like donor dollars on the table.',
      name: 'Mara Patel',
      title: 'Director of Digital, FutureAid',
      avatar: '/assets/images/blog/article-author-01.png'
    },
    services: ['Strategy', 'Design System', 'Next.js Development', 'Performance Optimization'],
    duration: '8 weeks',
    year: '2025',
    featured: true,
    content: [
      {
        type: 'paragraph',
        value:
          'Our discovery sprint revealed that FutureAid had accumulated 14 WordPress plugins, three conflicting analytics scripts, and no shared component library. Donors on mobile were abandoning the page before it even rendered. We mapped the entire donor journey against real performance data and identified three critical bottlenecks.'
      },
      {
        type: 'heading',
        value: 'Our Approach'
      },
      {
        type: 'paragraph',
        value:
          'We migrated FutureAid to Next.js with App Router, replacing WordPress with a headless Sanity CMS that gave their content team full autonomy. Every component was built from a shared design system with strict performance budgets: no page could exceed 200KB of JavaScript, and LCP had to stay under 2.5s on a 4G connection. We introduced streaming for longform storytelling pages and progressive enhancement for donation forms.'
      },
      {
        type: 'quote',
        value:
          '"The shader hero immediately clarified our value prop. It feels futuristic and still perfectly on-brand." \u2014 Mara Patel, FutureAid'
      }
    ]
  },
  {
    slug: 'northwind-labs-marketing-site',
    title: 'Northwind Labs Marketing Site',
    client: 'Northwind Labs',
    industry: 'SaaS',
    serviceType: 'Website',
    excerpt:
      'A Series A SaaS startup needed a marketing site that matched their product ambition. We delivered in five weeks.',
    heroImage: '/assets/images/blog/blog-02.jpg',
    challenge:
      'Series A SaaS startup needed a credible marketing presence to support their fundraising narrative. Their existing site was an off-the-shelf template that undermined product demos with inconsistent visuals and slow load times.',
    solution:
      'Custom marketing site with interactive product demos embedded inline, a blog powered by MDX, and deep CMS integration for their sales team to update messaging without engineering tickets.',
    results: [
      { metric: 'Lighthouse', value: '94', description: 'Performance score' },
      { metric: 'Demo Requests', value: '3x', description: 'Increase in qualified leads' },
      { metric: 'Time to Launch', value: '5 weeks', description: 'From kickoff to live' }
    ],
    services: ['Brand Strategy', 'Visual Design', 'Next.js Development', 'CMS Integration'],
    duration: '5 weeks',
    year: '2025',
    featured: false,
    content: [
      {
        type: 'paragraph',
        value:
          'Northwind Labs had a strong product but a weak front door. Prospects landing on their template site bounced before reaching the demo. We redesigned their entire marketing funnel from first impression to booking.'
      },
      {
        type: 'heading',
        value: 'Interactive Product Demos'
      },
      {
        type: 'paragraph',
        value:
          'Rather than gating demos behind a form, we built interactive product walkthroughs directly into the marketing pages. Visitors could explore core features without signing up, which tripled qualified demo requests by filtering out low-intent traffic early.'
      }
    ]
  },
  {
    slug: 'luminous-health-patient-portal',
    title: 'Luminous Health Patient Portal',
    client: 'Luminous Health',
    industry: 'Healthcare',
    serviceType: 'Web App',
    excerpt:
      'A HIPAA-compliant patient portal that cut support tickets by 40% and earned a 4.8-star patient satisfaction rating.',
    heroImage: '/assets/images/blog/blog-03.jpg',
    challenge:
      'HIPAA-compliant patient portal needed modernization. The existing system had a 40% drop-off at registration, frequent support calls about navigation, and failed WCAG 2.1 AA accessibility audits.',
    solution:
      'Accessible, mobile-first portal with a streamlined three-step onboarding flow, real-time appointment scheduling, and full WCAG 2.1 AA compliance. We worked closely with their compliance team to ensure every interaction met HIPAA requirements.',
    results: [
      { metric: 'Lighthouse', value: '96', description: 'Accessibility & performance' },
      { metric: 'Support Tickets', value: '-40%', description: 'Reduction in help requests' },
      { metric: 'App Rating', value: '4.8', description: 'Patient satisfaction' }
    ],
    services: ['UX Research', 'Accessible Design', 'React Development', 'HIPAA Compliance'],
    duration: '12 weeks',
    year: '2024',
    featured: false,
    content: [
      {
        type: 'paragraph',
        value:
          'Healthcare portals carry a unique burden: they must be simple enough for elderly patients yet robust enough for HIPAA compliance. Our UX research included in-person sessions with patients aged 25 to 82, revealing that the registration flow was the single biggest pain point.'
      },
      {
        type: 'heading',
        value: 'Streamlined Onboarding'
      },
      {
        type: 'paragraph',
        value:
          'We reduced registration from seven steps to three, introduced progressive disclosure for medical history, and added real-time validation with clear, non-technical error messages. The result was a 60% reduction in registration abandonment.'
      }
    ]
  },
  {
    slug: 'meridian-commerce',
    title: 'Meridian Commerce',
    client: 'Meridian',
    industry: 'E-Commerce',
    serviceType: 'E-Commerce',
    excerpt:
      'Headless commerce rebuild that lifted online revenue by 35% and made checkout 60% faster.',
    heroImage: '/assets/images/blog/blog-01.jpg',
    challenge:
      'DTC brand running on a legacy Shopify theme with a slow checkout flow, no design consistency between marketing pages and the store, and mounting customer complaints about mobile performance.',
    solution:
      'Headless commerce architecture with a custom Next.js storefront, optimized checkout flow with address autocomplete and one-tap payment, and a unified design system shared between marketing and commerce.',
    results: [
      { metric: 'Revenue', value: '+35%', description: 'Lift in online sales' },
      { metric: 'Page Load', value: '2.1s', description: 'Average across all pages' },
      { metric: 'Checkout Speed', value: '60%', description: 'Faster completion' }
    ],
    services: [
      'E-Commerce Strategy',
      'Headless Architecture',
      'Frontend Development',
      'Checkout Optimization'
    ],
    duration: '10 weeks',
    year: '2024',
    featured: false,
    content: [
      {
        type: 'paragraph',
        value:
          'Meridian was leaving revenue on the table with every slow page load. Their legacy Shopify theme added 4MB of JavaScript on the checkout page alone. We rebuilt the entire storefront as a headless Next.js application with Shopify as the backend.'
      },
      {
        type: 'heading',
        value: 'Checkout Reimagined'
      },
      {
        type: 'paragraph',
        value:
          'The new checkout flow reduced steps from five to two, introduced address autocomplete, and supported Apple Pay and Google Pay for one-tap purchases. Cart abandonment dropped by 28% in the first month.'
      }
    ]
  },
  {
    slug: 'cascade-finance-dashboard',
    title: 'Cascade Finance Dashboard',
    client: 'Cascade Finance',
    industry: 'FinTech',
    serviceType: 'Web App',
    excerpt:
      'A real-time data visualization dashboard rendering 10k+ data points in under 100ms.',
    heroImage: '/assets/images/blog/blog-02.jpg',
    challenge:
      'Real-time data visualization dashboard rendering 10k+ data points with unacceptable lag. The existing React app re-rendered the entire chart on every tick, causing frame drops and user frustration among power traders.',
    solution:
      'Custom WebGL-accelerated charts with canvas-based rendering, virtualized data tables for 100k+ rows, edge caching for historical data, and a streaming WebSocket architecture for real-time updates.',
    results: [
      { metric: 'Render Time', value: '<100ms', description: 'For 10k data points' },
      { metric: 'Onboarding', value: '-50%', description: 'Reduction in time-to-value' },
      { metric: 'Uptime', value: '99.99%', description: 'Since launch' }
    ],
    services: [
      'Data Visualization',
      'Performance Engineering',
      'React Development',
      'API Design'
    ],
    duration: '14 weeks',
    year: '2024',
    featured: false,
    content: [
      {
        type: 'paragraph',
        value:
          'Cascade Finance serves institutional traders who need sub-second updates on portfolio performance. Their existing dashboard choked on datasets larger than 2,000 rows, making it unusable for their highest-value clients.'
      },
      {
        type: 'heading',
        value: 'WebGL-Powered Rendering'
      },
      {
        type: 'paragraph',
        value:
          'We replaced DOM-based charting with a custom WebGL rendering pipeline that handles 10,000 data points at 60fps. Virtualized tables load only visible rows, and historical data is served from edge caches to eliminate redundant API calls.'
      }
    ]
  },
  {
    slug: 'eduspark-learning-platform',
    title: 'EduSpark Learning Platform',
    client: 'EduSpark',
    industry: 'Education',
    serviceType: 'Landing Page',
    excerpt:
      'A story-driven launch page that converted 12% of visitors to beta signups in the first week.',
    heroImage: '/assets/images/blog/blog-03.jpg',
    challenge:
      'Ed-tech startup needed a high-converting launch page for beta signups with zero existing brand recognition and a tight three-week deadline before their investor demo day.',
    solution:
      'Story-driven landing page with interactive product demos, animated social proof, an optimized multi-step signup flow, and deep analytics integration to track every micro-conversion.',
    results: [
      { metric: 'Signup Rate', value: '12%', description: 'Visitor-to-signup conversion' },
      { metric: 'Social Shares', value: '5x', description: 'Above industry average' },
      { metric: 'Launch Time', value: '3 weeks', description: 'From brief to live' }
    ],
    services: ['Launch Strategy', 'Landing Page Design', 'Next.js Development', 'Analytics Setup'],
    duration: '3 weeks',
    year: '2025',
    featured: false,
    content: [
      {
        type: 'paragraph',
        value:
          'EduSpark had three weeks to go from a pitch deck to a live product page. Their investor demo day was non-negotiable, and they needed a page that could sell a product that was still in beta.'
      },
      {
        type: 'heading',
        value: 'Story-First Design'
      },
      {
        type: 'paragraph',
        value:
          'Instead of a feature list, we designed the page around a narrative: a day in the life of a student using EduSpark. Interactive demos let visitors experience the product, and a three-step signup flow captured intent at peak engagement.'
      }
    ]
  }
]
