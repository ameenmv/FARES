export interface Project {
  id: number
  slug: string
  title: string
  category: 'branding' | 'campaigns'
  industry: string
  description: string
  services: string[]
  pages: [number, number] // [start, end] pages in PDF
  featured: boolean
  color: string // accent color for the project
}

const projects: Project[] = [
  // ============ BRANDING ============
  {
    id: 1,
    slug: 'oku',
    title: 'Oku',
    category: 'branding',
    industry: 'Food & Beverage',
    description: 'A brand specializing in high-quality matcha tea, with a modern, bold style that reflects the spirit of youth and modern life. We draw on the authenticity of Japanese matcha and present it in an innovative style that appeals to the Saudi market, transforming every cup into an experience filled with vitality, energy, and positivity.',
    services: ['Brand Identity', 'Packaging', 'Visual System'],
    pages: [5, 8],
    featured: true,
    color: '#1B7A44',
  },
  {
    id: 2,
    slug: 'garnish',
    title: 'Garnish',
    category: 'branding',
    industry: 'Food & Beverage',
    description: 'A spice and seasoning brand with botanical illustrations that capture the essence of fresh, natural ingredients. The design pairs earthy tones with detailed botanical drawings to create a refined, artisanal feel.',
    services: ['Brand Identity', 'Packaging', 'Illustration'],
    pages: [9, 13],
    featured: false,
    color: '#8B6D3F',
  },
  {
    id: 3,
    slug: 'palmo',
    title: 'Palmo',
    category: 'branding',
    industry: 'Food & Beverage',
    description: 'A palm-based products brand celebrating the richness of Saudi dates culture. The design bridges traditional heritage with contemporary aesthetics, creating a premium brand experience.',
    services: ['Brand Identity', 'Packaging', 'Visual System'],
    pages: [14, 17],
    featured: false,
    color: '#2D5016',
  },
  {
    id: 4,
    slug: 'vlt',
    title: 'VLT',
    category: 'branding',
    industry: 'Food & Beverage',
    description: 'A specialty coffee brand based in Riyadh and Khobar. The identity captures the precision and passion of specialty coffee culture through bold typography and refined visual elements.',
    services: ['Brand Identity', 'Packaging', 'Menu Design'],
    pages: [18, 22],
    featured: true,
    color: '#1A1A1A',
  },
  {
    id: 5,
    slug: 'qatfah-almadinah',
    title: 'Qatfah Almadinah',
    category: 'branding',
    industry: 'Food & Beverage',
    description: 'A premium tea brand from Madinah, combining traditional Saudi tea culture with modern design sensibility. The brand identity reflects the warmth and hospitality of Arabian tea traditions.',
    services: ['Brand Identity', 'Packaging', 'Visual System'],
    pages: [23, 27],
    featured: true,
    color: '#C4A265',
  },
  {
    id: 6,
    slug: 'wekad',
    title: 'Wekad',
    category: 'branding',
    industry: 'Food & Beverage',
    description: 'A Saudi specialty coffee brand featuring beautiful Arabic calligraphy as its centerpiece. The branding celebrates Saudi coffee heritage while maintaining a contemporary, premium aesthetic.',
    services: ['Brand Identity', 'Packaging', 'Arabic Calligraphy'],
    pages: [28, 31],
    featured: false,
    color: '#2D4A2A',
  },
  {
    id: 7,
    slug: 'after',
    title: 'After',
    category: 'branding',
    industry: 'Food & Beverage',
    description: 'A lifestyle coffee brand designed for the modern consumer. The identity balances minimalism with warmth, creating an inviting and sophisticated brand presence.',
    services: ['Brand Identity', 'Packaging', 'Social Media'],
    pages: [32, 35],
    featured: false,
    color: '#4A3728',
  },
  {
    id: 8,
    slug: 'irth-alnakheel',
    title: 'Irth AlNakheel',
    category: 'branding',
    industry: 'Food & Beverage',
    description: 'A heritage dates brand from Al-Ahsa celebrating the rich palm cultivation traditions of the region. The packaging design honors traditional craftsmanship while appealing to modern consumers.',
    services: ['Brand Identity', 'Packaging', 'Heritage Design'],
    pages: [36, 40],
    featured: true,
    color: '#8B4513',
  },
  {
    id: 9,
    slug: 'flp-burger',
    title: 'FLP Burger',
    category: 'branding',
    industry: 'Food & Beverage',
    description: 'A bold and energetic burger restaurant brand. The identity uses strong typography and vibrant colors to create a fun, youthful dining experience.',
    services: ['Brand Identity', 'Packaging', 'Environmental Design'],
    pages: [41, 45],
    featured: false,
    color: '#D32F2F',
  },
  {
    id: 10,
    slug: 'palm-rise',
    title: 'Palm Rise',
    category: 'branding',
    industry: 'Hospitality',
    description: 'The name Palm Rise evokes the elegant stature of Marrakesh\'s iconic palm groves reaching toward the North African sky, symbolizing growth, sanctuary, and elevated hospitality. The brand identity is built around a "modern organic" concept — capturing the raw textures of Moroccan craftsmanship and reimagining them through a sophisticated, clean lens.',
    services: ['Brand Identity', 'Packaging', 'Hospitality Design'],
    pages: [46, 49],
    featured: true,
    color: '#A0522D',
  },

  // ============ CAMPAIGNS ============
  {
    id: 11,
    slug: 'toucan',
    title: 'Toucan',
    category: 'campaigns',
    industry: 'Food & Beverage',
    description: 'A cohesive brand identity and packaging system for Toucan Coffee. The design pairs bold, tropical illustrations with a vivid, warm color palette (deep blue, bright orange, and yellow) to create a lively and approachable aesthetic. The project encompasses everything from retail bean pouches to takeaway cups, delivering a joyful and premium coffee experience.',
    services: ['Brand Identity', 'Packaging', 'Illustration'],
    pages: [50, 53],
    featured: true,
    color: '#E67E22',
  },
  {
    id: 12,
    slug: 'safeeha',
    title: 'Safeeha',
    category: 'campaigns',
    industry: 'Food & Beverage',
    description: 'A traditional pastry brand celebrating the art of Arabic baking. The campaign design brings heritage flavors to life with modern visual storytelling.',
    services: ['Campaign Design', 'Social Media', 'Packaging'],
    pages: [54, 57],
    featured: false,
    color: '#C9A96E',
  },
  {
    id: 13,
    slug: 'yalla-khobar',
    title: 'Yalla Khobar',
    category: 'campaigns',
    industry: 'Entertainment',
    description: 'A vibrant festival and event campaign for Khobar, featuring bold typography, colorful gate installations, and dynamic visual elements that capture the energy and excitement of the city\'s entertainment scene.',
    services: ['Campaign Design', 'Environmental Design', 'Social Media'],
    pages: [58, 63],
    featured: true,
    color: '#FF6B35',
  },
  {
    id: 14,
    slug: 'eventi',
    title: 'Eventi',
    category: 'campaigns',
    industry: 'Entertainment',
    description: 'An event production brand with a sophisticated identity system. The design captures the energy and professionalism of event management with elegant typography and bold visual elements.',
    services: ['Brand Identity', 'Campaign Design', 'Social Media'],
    pages: [64, 67],
    featured: false,
    color: '#2C3E50',
  },
  {
    id: 15,
    slug: 'durma',
    title: 'Durma',
    category: 'campaigns',
    industry: 'Food & Beverage',
    description: 'A playful ice cream brand campaign with retro-inspired illustrations. The design uses bold lines, vintage typography, and a vibrant color palette of blues, pinks, and yellows to create an irresistible, nostalgic feel.',
    services: ['Campaign Design', 'Illustration', 'Packaging'],
    pages: [68, 72],
    featured: true,
    color: '#3A5BA0',
  },
  {
    id: 16,
    slug: 'al-sharqiyah-race',
    title: 'Al Sharqiyah Race',
    category: 'campaigns',
    industry: 'Sports',
    description: 'A motorsport race event campaign bringing the thrill of competitive racing to life. Bold graphics and dynamic compositions capture the speed, adrenaline, and excitement of the event.',
    services: ['Campaign Design', 'Event Branding', 'Print Design'],
    pages: [73, 76],
    featured: false,
    color: '#1A237E',
  },
  {
    id: 17,
    slug: 'race-of-emotions',
    title: 'Race of Emotions',
    category: 'campaigns',
    industry: 'Sports',
    description: 'An emotional motorsport campaign that goes beyond the race itself, capturing the human stories and feelings behind competitive racing.',
    services: ['Campaign Design', 'Print Design', 'Social Media'],
    pages: [77, 79],
    featured: false,
    color: '#B71C1C',
  },
  {
    id: 18,
    slug: 'loca-opinion',
    title: 'Loca / Opinion',
    category: 'campaigns',
    industry: 'Food & Beverage',
    description: 'A colorful, youth-focused coffee brand campaign featuring playful illustrations and sticker designs. The "Back to Uni" theme captures the energy and fun of student life with vibrant teal, pink, and green palette.',
    services: ['Campaign Design', 'Illustration', 'Social Media'],
    pages: [80, 84],
    featured: false,
    color: '#1ABC9C',
  },
  {
    id: 19,
    slug: 'olabs-anniversary',
    title: 'OLabs Anniversary',
    category: 'campaigns',
    industry: 'Tech',
    description: 'A 7th anniversary campaign for OLabs featuring heritage-inspired design elements. The campaign celebrates the company\'s milestone with a sophisticated red and gold palette and cultural motifs.',
    services: ['Campaign Design', 'Print Design', 'Merchandise'],
    pages: [85, 89],
    featured: false,
    color: '#B71C1C',
  },
  {
    id: 20,
    slug: 'befine-ramadan',
    title: 'BeFine Ramadan',
    category: 'campaigns',
    industry: 'Food & Beverage',
    description: 'BeFine embraces the spirit of Ramadan through a visual journey inspired by the everyday details that make the month so special across Saudi Arabia. Every illustrated element was thoughtfully created to reflect the warmth, traditions, and visual character of Ramadan in Saudi culture, giving the campaign a nostalgic yet contemporary feel.',
    services: ['Campaign Design', 'Illustration', 'Packaging'],
    pages: [90, 94],
    featured: false,
    color: '#4A148C',
  },
  {
    id: 21,
    slug: 'opinion-eid',
    title: 'Opinion Eid Campaign',
    category: 'campaigns',
    industry: 'Food & Beverage',
    description: 'Opinion celebrates the spirit of Eid through a playful illustrated campaign inspired by the traditions, symbols, and joyful atmosphere of Eid in Saudi Arabia. The campaign brings familiar Eid moments to life through custom illustrations featuring the Eid sheep, palm trees, festive decorations, and other visual elements inspired by Saudi celebrations.',
    services: ['Campaign Design', 'Illustration', 'Packaging'],
    pages: [95, 100],
    featured: false,
    color: '#880E4F',
  },
]

export function useProjects() {
  const allProjects = computed(() => projects)

  const featuredProjects = computed(() =>
    projects.filter((p) => p.featured)
  )

  const brandingProjects = computed(() =>
    projects.filter((p) => p.category === 'branding')
  )

  const campaignProjects = computed(() =>
    projects.filter((p) => p.category === 'campaigns')
  )

  const getProject = (slug: string) =>
    projects.find((p) => p.slug === slug)

  const getNextProject = (slug: string) => {
    const index = projects.findIndex((p) => p.slug === slug)
    return index < projects.length - 1 ? projects[index + 1] : projects[0]
  }

  const getPreviousProject = (slug: string) => {
    const index = projects.findIndex((p) => p.slug === slug)
    return index > 0 ? projects[index - 1] : projects[projects.length - 1]
  }

  return {
    allProjects,
    featuredProjects,
    brandingProjects,
    campaignProjects,
    getProject,
    getNextProject,
    getPreviousProject,
  }
}
