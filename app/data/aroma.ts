import { diffusers } from './products';

export const aromaSystem = [
  {
    number: '01',
    title: 'Read the space',
    description:
      'We start with your space type, customer flow, coverage area, ventilation, and the atmosphere you want people to remember.',
  },
  {
    number: '02',
    title: 'Build the scent profile',
    description:
      'Select essential oils, fragrance oils, and botanical extracts, or develop a signature scent that fits your brand.',
  },
  {
    number: '03',
    title: 'Match the diffuser system',
    description:
      'Choose desktop, wall-mounted, freestanding, hanging, or HVAC-ready equipment for reliable, waterless diffusion.',
  },
  {
    number: '04',
    title: 'Maintain the experience',
    description:
      'Keep the scent consistent with practical refill, tuning, and support options for your operating environment.',
  },
] as const;

export const spaceSolutions = [
  {
    group: 'Small and personal spaces',
    range: '10–200m²',
    spaces: 'Homes, cars, private rooms, salons, cafés, and smaller retail settings.',
    image: '/assets/perfume-space-boutique.jpg',
    mobileImage: '/assets/perfume-space-boutique-mobile.jpg',
    imageAlt: 'Boutique interior with a discreet wall-mounted aroma diffuser',
  },
  {
    group: 'Medium commercial spaces',
    range: '200–600m²',
    spaces: 'Boutiques, showrooms, restaurants, offices, fitness studios, and customer-facing spaces.',
    image: '/assets/perfume-space-office.jpg',
    mobileImage: '/assets/perfume-space-office-mobile.jpg',
    imageAlt: 'Modern office reception with a commercial aroma diffuser',
  },
  {
    group: 'Large spaces and HVAC',
    range: '500–2800m²',
    spaces: 'Hotels, lobbies, malls, event venues, shared facilities, and HVAC-connected environments.',
    image: '/assets/perfume-space-hospitality.jpg',
    mobileImage: '/assets/perfume-space-hospitality-mobile.jpg',
    imageAlt: 'Hotel lobby with a discreet aroma diffuser integrated into the interior',
  },
] as const;

export const featuredDiffusers = [
  {
    model: 'MF120A',
    name: 'Personal & compact',
    image: '/assets/diffuser-small-collection.jpg',
    imageAlt: 'MF120A desktop aroma diffuser in silver, rose gold, and black finishes',
    detail: 'A practical starting point for guest rooms, salons, cafés, and smaller spaces.',
  },
  {
    model: 'MF300R',
    name: 'Commercial & discreet',
    image: '/assets/diffuser-medium-collection.jpg',
    imageAlt: 'MF300R commercial aroma diffuser product photograph',
    detail: 'A compact commercial option for customer-facing environments and workspaces.',
  },
  {
    model: 'MS3000R',
    name: 'Large-space & standing',
    image: '/assets/diffuser-large-collection.jpg',
    imageAlt: 'MS3000R standing aroma diffuser in multiple finishes',
    detail: 'A freestanding option for hotel lobbies, malls, and larger shared environments.',
  },
].map((featured) => ({
  ...featured,
  product: diffusers.find((product) => product.model === featured.model)!,
}));

export const catalogGroups = [
  {
    title: 'Small and personal spaces',
    range: '10–200m²',
    models: diffusers.filter((item) =>
      ['MF120A', 'MF130R', 'MC50L', 'MF50L', 'MF140A', 'MS105', 'MS600'].includes(item.model),
    ),
  },
  {
    title: 'Medium commercial spaces',
    range: '200–600m²',
    models: diffusers.filter((item) =>
      ['MF300R', 'MS1300A', 'MS1400A', 'MF1200A', 'MS3800R'].includes(item.model),
    ),
  },
  {
    title: 'Large spaces and HVAC',
    range: '500–2800m²',
    models: diffusers.filter((item) =>
      [
        'MF1500A',
        'MF3000A',
        'MS3000R',
        'MS1500A',
        'MS3500A',
        'MS3600A',
        'MS6000A',
        'MS500',
        'MS501F',
        'MS-18',
        'MS-43',
      ].includes(item.model),
    ),
  },
] as const;

export const scentPalette = [
  {
    direction: 'Fresh & bright',
    description:
      'A clean, uplifting direction for entrances, daytime spaces, and moments that should feel open and energised.',
    idealFor: 'Entrances, cafés, daytime retail',
    ingredients: ['Grapefruit', 'Lemon', 'Peppermint Oil'],
    image: '/assets/scent-fresh.jpg',
    mobileImage: '/assets/scent-fresh-mobile.jpg',
    imageAlt: 'Grapefruit, lemon peel, peppermint, and a fragrance oil bottle',
  },
  {
    direction: 'Floral & soft',
    description:
      'A gentle, expressive direction that brings warmth and a more personal character to a space.',
    idealFor: 'Boutiques, salons, guest-facing spaces',
    ingredients: ['Jasmine Absolute Oil', 'Rose Absolute Oil', 'Bois De Rose Oil'],
    image: '/assets/scent-floral.jpg',
    mobileImage: '/assets/scent-floral-mobile.jpg',
    imageAlt: 'Jasmine, rose, botanical branches, and a fragrance oil bottle',
  },
  {
    direction: 'Woody & grounded',
    description:
      'A calm, refined direction with depth, suited to longer stays and more considered environments.',
    idealFor: 'Lobbies, showrooms, executive spaces',
    ingredients: ['Cedarwood Virginian Oil', 'Cypress Oil', 'Sandalwood Oil'],
    image: '/assets/scent-woody.jpg',
    mobileImage: '/assets/scent-woody-mobile.jpg',
    imageAlt: 'Cedarwood, cypress, sandalwood, and a fragrance oil bottle',
  },
] as const;

export const fragranceProcess = [
  'Define the intended mood, audience, product, or environment.',
  'Explore scent directions and select an ingredient story.',
  'Develop and refine the fragrance with the intended use in mind.',
  'Prepare the finished direction for ambient, product, or OEM/ODM application.',
] as const;
