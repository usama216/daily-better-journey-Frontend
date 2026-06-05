export type HeroSlide = {
  badge: string
  title: string
  highlight: string
  description: string
  image: string
  stats: Array<{ number: string; label: string; sublabel: string }>
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    badge: 'Boost Daily Productivity',
    title: 'Create Focus That',
    highlight: 'Carries You Forward',
    description:
      'Try simple productivity methods that simplify your day, clear mental clutter, and guide your progress with calm.',
    image:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=800&fit=crop',
    stats: [
      { number: '500+', label: 'Readers', sublabel: 'Growing daily' },
      { number: '50+', label: 'Articles', sublabel: 'Expert insights' },
    ],
  },
  {
    badge: 'Build Better Habits',
    title: 'Shape Days That',
    highlight: ' Feel Truly Yours',
    description:
      'Discover small, simple habits that turn everyday moments into tiny wins and gradually build real, lasting momentum in your life.',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=800&fit=crop',
    stats: [
      { number: '100+', label: 'Tips', sublabel: 'Practical advice' },
      { number: '24/7', label: 'Access', sublabel: 'Anytime learning' },
    ],
  },
  {
    badge: 'Grow Your Mindset',
    title: 'Train Your Mind',
    highlight: 'To Support You',
    description:
      'Learn gentle mindset tools that quiet fear, spark clarity, and help you show up with gradual confidence.',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=800&fit=crop',
    stats: [
      { number: '10K+', label: 'Members', sublabel: 'Community strong' },
      { number: '95%', label: 'Success', sublabel: 'Goal achievement' },
    ],
  },
]
