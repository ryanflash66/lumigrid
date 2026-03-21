export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  author: {
    name: string
    role: string
    avatar: string
  }
  heroImage: string
  readingTime: string
  content: Array<{ type: 'paragraph' | 'quote' | 'list'; value: string | string[] }>
}

export const posts: BlogPost[] = [
  {
    slug: 'scaling-mission-driven-products',
    title: 'Scaling Mission-Driven Products Without Losing the Human Story',
    excerpt:
      'How we helped an NGO relaunch their entire digital ecosystem—modern design system, new CMS, and performance budgets—in under eight weeks.',
    date: '2025-10-12',
    category: 'Strategy',
    readingTime: '7 min read',
    heroImage: '/assets/images/blog/blog-01.jpg',
    author: {
      name: 'Isabella Boone',
      role: 'Lead Experience Strategist',
      avatar: '/assets/images/blog/article-author-01.png'
    },
    content: [
      {
        type: 'paragraph',
        value:
          'Mission-driven teams often juggle limited engineering bandwidth, legacy tooling, and ambitious storytelling goals. Lumigrid’s approach pairs qualitative research with measurable, technical guardrails so redesigns never compromise performance.'
      },
      {
        type: 'paragraph',
        value:
          'In this engagement we introduced a component library powered by shadcn/ui, mapped every key flow to Core Web Vitals targets, and coached the client team through adopting Formspree for zero-backend lead capture.'
      },
      {
        type: 'quote',
        value:
          '“The shader hero immediately clarified our value prop. It feels futuristic and still perfectly on-brand.”'
      },
      {
        type: 'list',
        value: [
          'Discovery sprint clarified audience and analytics goals in five working days.',
          'App Router migration unlocked streaming + progressive enhancement for longform storytelling.',
          'Performance budget enforced LCP < 2.5s on 4G by shipping only the sections that matter.'
        ]
      },
      {
        type: 'paragraph',
        value:
          'If you’re planning a similar overhaul, start with the governance side. Define who approves components, who monitors performance, and how you will keep copy fresh after launch.'
      }
    ]
  },
  {
    slug: 'bridging-product-and-marketing',
    title: 'Bridging Product and Marketing Sites With a Shared Design System',
    excerpt:
      'A look at the workflow we use to keep marketing launches, product documentation, and sales demos visually aligned.',
    date: '2025-09-01',
    category: 'Design Ops',
    readingTime: '5 min read',
    heroImage: '/assets/images/blog/blog-02.jpg',
    author: {
      name: 'Marcus Lee',
      role: 'Design Systems Lead',
      avatar: '/assets/images/blog/article-author-02.png'
    },
    content: [
      {
        type: 'paragraph',
        value:
          'Marketing, documentation, and product UI rarely share the same foundation. We map shared brand tokens in Figma, export them to Tailwind CSS, and rely on Storybook snapshots to keep everything aligned.'
      },
      {
        type: 'paragraph',
        value:
          'When a component graduates from marketing to product, we port the shadcn primitive and wire telemetry so we can see how often it appears across the ecosystem.'
      }
    ]
  },
  {
    slug: 'form-experiences-that-convert',
    title: 'Designing Form Experiences That Convert on Every Device',
    excerpt:
      'Advanced validation patterns, honeypots, and microcopy techniques that keep conversion rates high without sacrificing trust.',
    date: '2025-08-18',
    category: 'UX Writing',
    readingTime: '6 min read',
    heroImage: '/assets/images/blog/blog-03.jpg',
    author: {
      name: 'Priya Raman',
      role: 'Principal UX Writer',
      avatar: '/assets/images/blog/article-author-03.png'
    },
    content: [
      {
        type: 'paragraph',
        value:
          'Little moments—inline validation, polite microcopy, progress indicators—do most of the heavy lifting when it comes to forms. We ship the same contact form across every page to keep analytics clean.'
      },
      {
        type: 'list',
        value: [
          'Use real-time validation but delay errors until the user finishes typing.',
          'Give mobile users the right keyboard for phone, email, and numeric fields.',
          'Always provide a fallback when your Formspree endpoint is missing.'
        ]
      }
    ]
  }
]
