import { SITE } from '../config/site';
import type { SiteContent } from './types';

const address = [
  SITE.address.streetAddress,
  `${SITE.address.postalCode} ${SITE.address.addressLocality}`,
  SITE.address.addressRegion,
  'Malaysia',
].join(', ');

export const enContent = {
  nav: {
    primaryLabel: 'Primary navigation',
    breadcrumbLabel: 'Breadcrumb',
    home: 'Home',
    about: 'About',
    services: 'Services',
    aroma: 'Commercial aroma solutions',
    diffusers: 'Aroma diffusers',
    fragrance: 'Custom fragrance',
    it: 'IT maintenance',
    downloads: 'Downloads',
    contact: 'Contact',
  },
  home: {
    eyebrow: SITE.legalName,
    title: 'Scent solutions and technology maintenance for business continuity.',
    introduction:
      'MS Monster Global helps organisations shape considered spaces through commercial aroma solutions and maintain the technology that supports daily operations.',
    aromaLink: { label: 'Explore aroma solutions' },
    itLink: { label: 'Explore IT maintenance' },
    overviewEyebrow: 'Two focused divisions',
    overviewTitle: 'Practical support for environments and systems.',
    overviewDescription:
      'Choose the division that matches your requirement. Each path explains the available scope and gives you a direct way to discuss the next step.',
    divisions: [
      {
        key: 'aroma',
        title: 'Commercial aroma solutions',
        description:
          'Plan a scent direction, select an appropriate diffuser, and maintain a consistent aroma experience for a commercial environment.',
        items: [
          'Space and scent assessment',
          'Commercial diffuser selection',
          'Custom fragrance development',
        ],
        link: { label: 'View aroma solutions' },
        imageAlt: 'Commercial aroma diffuser and fragrance oils in a refined interior',
      },
      {
        key: 'it',
        title: 'IT & AI maintenance services',
        description:
          'Support business technology with maintenance, troubleshooting, network monitoring, backup readiness, and infrastructure assistance.',
        items: [
          'Hardware and software support',
          'Network monitoring and troubleshooting',
          'Data backup and recovery readiness',
        ],
        link: { label: 'View IT maintenance' },
        imageAlt: 'Technician working with enterprise server infrastructure',
      },
    ],
    operationsEyebrow: 'Clear corporate foundation',
    operationsTitle: 'Built around practical operating needs.',
    operationsDescription:
      'The company brings two specialist service areas together with clear scopes, direct contact paths, and downloadable source profiles.',
    operationsItems: [
      `${SITE.legalName}, registered as ${SITE.registrationNumber}`,
      `Based in ${SITE.address.addressLocality}, ${SITE.address.addressRegion}`,
      'Dedicated paths for technology and commercial aroma requirements',
      'Company profiles and product information available as PDF downloads',
    ],
    contactCta: {
      eyebrow: 'Start with your requirement',
      title: 'Tell us about the system or space you are planning for.',
      description:
        'Share the environment, operating priorities, or aroma direction you have in mind so the team can guide you to the relevant service.',
      link: { label: 'Contact MS Monster Global' },
    },
  },
  about: {
    breadcrumb: 'About',
    eyebrow: SITE.legalName,
    title: 'About MS Monster Global',
    introduction:
      `${SITE.legalName} is a Malaysia-based company with two business divisions: practical IT and AI maintenance services, and commercial aroma solutions for business environments.`,
    incorporation:
      `${SITE.legalName} was incorporated on 16 November 2022. Earlier activity belongs to the business roots that preceded the Sdn Bhd.`,
    companyEyebrow: 'Registered company',
    companyTitle: 'Company information',
    registrationLabel: 'SSM registration number',
    addressLabel: 'Registered business address',
    principlesEyebrow: 'How we work',
    principlesTitle: 'A clear, practical approach to service.',
    principles: [
      {
        title: 'Vision',
        description:
          'To make commercial aroma solutions accessible and to be a trusted technology maintenance partner for business continuity and growth.',
      },
      {
        title: 'Mission',
        description:
          'To deliver capable and flexible service through technical knowledge, practical innovation, and customer-focused support.',
      },
      {
        title: 'Objective',
        description:
          'To improve system reliability and service quality through consistent, well-scoped delivery.',
      },
    ],
    historyEyebrow: 'Company timeline',
    historyTitle: 'Business roots and incorporation',
    history: [
      {
        year: '2016',
        text: 'The business roots of MS Monster began with detergent and fragrance manufacturing and customisation activity.',
      },
      {
        year: '2019',
        text: 'Those earlier activities expanded into the import and sale of aromatic oils and essential oils.',
      },
      {
        year: '2022',
        text: `${SITE.legalName} was incorporated on 16 November 2022.`,
      },
    ],
    valuesEyebrow: 'Working principles',
    valuesTitle: 'Values that guide the work',
    values: ['Reliability', 'Proactivity', 'Customer focus', 'Integrity', 'Excellence'],
    divisionsEyebrow: 'What we do',
    divisionsTitle: 'Two specialist service divisions',
    divisions: [
      {
        key: 'aroma',
        title: 'Commercial aroma solutions',
        description:
          'Aroma consultation, diffuser matching, fragrance supply, custom scent development, refill, tuning, and maintenance support.',
        items: ['Aroma planning', 'Diffuser systems', 'Custom fragrance'],
        link: { label: 'Explore aroma services' },
        imageAlt: 'Commercial aroma diffuser and fragrance oils in an interior',
      },
      {
        key: 'it',
        title: 'IT & AI maintenance services',
        description:
          'Maintenance support for hardware, software, networks, backup readiness, cloud infrastructure, and operational troubleshooting.',
        items: ['Preventive maintenance', 'Network support', 'Backup readiness'],
        link: { label: 'Explore IT services' },
        imageAlt: 'Technician inspecting enterprise server equipment',
      },
    ],
    contactCta: {
      eyebrow: 'Discuss your requirement',
      title: 'Choose the division that fits your next project.',
      description:
        'Contact the Nilai team about IT maintenance, commercial aroma solutions, company documents, or product information.',
      link: { label: 'Contact the team' },
    },
  },
  it: {
    breadcrumb: 'IT maintenance',
    eyebrow: SITE.name,
    title: 'IT & AI Maintenance Services',
    introduction:
      'Practical maintenance support for business technology, from day-to-day troubleshooting to network, backup, cloud, and infrastructure needs.',
    primaryLink: { label: 'Discuss your support needs' },
    infrastructureEyebrow: 'Supported environment',
    infrastructureTitle: 'Technology maintenance shaped around your operations.',
    infrastructureDescription:
      'The scope can cover AI infrastructure, business hardware and software, cloud environments, LAN, Wi-Fi, and 5G networks.',
    servicesEyebrow: 'Service scope',
    servicesTitle: 'Support across the technology environment',
    services: [
      {
        title: 'Predictive maintenance',
        description:
          'Plan predictive and preventive attention around the condition and operating needs of technology assets.',
      },
      {
        title: 'Hardware and software support',
        description:
          'Maintenance and troubleshooting for business equipment, applications, and workstations.',
      },
      {
        title: 'Network monitoring',
        description: 'Support for LAN, Wi-Fi, and 5G network maintenance and connectivity.',
      },
      {
        title: 'System troubleshooting and repair',
        description: 'Identify technical issues and work toward restoring normal operations.',
      },
      {
        title: 'Data backup and recovery readiness',
        description:
          'Support protection planning for business information and practical recovery preparation.',
      },
      {
        title: 'Cloud infrastructure support',
        description: 'Maintenance assistance for cloud environments used by the business.',
      },
      {
        title: 'On-site and remote support options',
        description:
          'Discuss a support format based on the environment, locations, and operating priorities.',
      },
    ],
    contactCta: {
      eyebrow: 'Plan the support scope',
      title: 'Describe your technology environment and operating priorities.',
      description:
        'Share the systems, locations, and maintenance needs involved so the team can recommend a suitable approach.',
      link: { label: 'Enquire about IT maintenance' },
    },
    heroImageAlt: 'Technician working among enterprise server racks in a data centre',
  },
  aroma: {
    breadcrumb: 'Commercial aroma solutions',
    eyebrow: 'Monster Perfume',
    title: 'Commercial Aroma Solutions',
    introduction:
      'Plan an aroma experience around the character of a space, then match it with a practical diffuser, refill, tuning, and maintenance approach.',
    primaryLink: { label: 'Request a recommendation' },
    secondaryLink: { label: 'Explore diffuser systems' },
    assessmentEyebrow: 'Space assessment',
    assessmentTitle: 'Start with the setting and the intended experience.',
    assessmentDescription:
      'Consultation begins with the space type, customer flow, coverage needs, ventilation, and the atmosphere you want people to remember.',
    spaces: [
      {
        title: 'Smaller environments',
        description: 'Private rooms, salons, cafés, and smaller retail settings.',
        imageAlt: 'Boutique interior with a discreet wall-mounted aroma diffuser',
      },
      {
        title: 'Commercial environments',
        description: 'Boutiques, showrooms, restaurants, offices, and fitness studios.',
        imageAlt: 'Office reception with a commercial aroma diffuser',
      },
      {
        title: 'Shared and hospitality environments',
        description: 'Hotels, lobbies, event venues, and HVAC-connected environments.',
        imageAlt: 'Hotel lobby with an aroma diffuser integrated into the interior',
      },
    ],
    processEyebrow: 'Aroma programme',
    processTitle: 'A complete process from brief to upkeep.',
    processDescription:
      'Each stage helps align the fragrance direction and diffuser system with the operating environment.',
    process: [
      {
        title: 'Assess the space',
        description: 'Review the environment, flow, ventilation, and operating priorities.',
      },
      {
        title: 'Set the scent direction',
        description: 'Select a fragrance family or develop a custom direction for the brief.',
      },
      {
        title: 'Match the diffuser',
        description: 'Compare documented coverage, mounting, capacity, and control features.',
      },
      {
        title: 'Maintain the experience',
        description: 'Plan refill, intensity tuning, diffuser care, and ongoing support.',
      },
    ],
    programmeEyebrow: 'Service programme',
    programmeTitle: 'Keep the aroma experience consistent.',
    programmeItems: [
      'Diffuser selection and installation guidance',
      'Fragrance refill and intensity tuning',
      'Maintenance support for the operating environment',
    ],
    contactCta: {
      eyebrow: 'Plan an aroma environment',
      title: 'Tell us what the space should feel like.',
      description:
        'Share the setting and intended atmosphere so the team can help shape a fragrance direction and diffuser recommendation.',
      link: { label: 'Request an aroma recommendation' },
    },
    heroImageAlt: 'Aroma diffuser and fragrance oils arranged in a commercial interior',
    programmeImageAlt: 'Fragrance specialist preparing a diffuser refill',
    closingImageAlt: 'Hospitality lobby with a discreet aroma diffuser',
  },
  diffusers: {
    breadcrumb: 'Aroma diffusers',
    eyebrow: 'Commercial aroma systems',
    title: 'Aroma diffusers for different environments',
    introduction:
      'Compare documented models by coverage, known capacity, mounting format, features, and intended setting.',
    featuredEyebrow: 'Featured formats',
    featuredTitle: 'A practical place to begin the comparison.',
    catalogueEyebrow: 'Diffuser catalogue',
    catalogueTitle: 'Review every documented model',
    modelsLabel: 'models',
    coverageLabel: 'Coverage',
    capacityLabel: 'Capacity',
    mountingLabel: 'Primary catalogue format',
    suitableForLabel: 'Suitable for',
    confirmLink: { label: 'Confirm suitability' },
    facebookLink: { label: 'Follow Monster Perfume on Facebook' },
  },
  fragrance: {
    breadcrumb: 'Custom fragrance',
    eyebrow: 'Custom fragrance development',
    title: 'Shape a scent identity around the experience',
    introduction:
      'Explore a fragrance direction, ingredient possibilities, sample development, and refinement for the intended product or environment.',
    primaryLink: { label: 'Discuss a fragrance brief' },
    directionsEyebrow: 'Scent directions',
    directionsTitle: 'Start with the feeling people should remember.',
    directions: [
      {
        title: 'Fresh and bright',
        description: 'A clean, uplifting direction for open and energised settings.',
        idealForLabel: 'Consider for',
        idealFor: 'Entrances, cafés, and daytime retail',
        imageAlt: 'Grapefruit, lemon peel, peppermint, and a fragrance oil bottle',
      },
      {
        title: 'Floral and soft',
        description: 'A gentle direction that brings warmth and personal character.',
        idealForLabel: 'Consider for',
        idealFor: 'Boutiques, salons, and guest-facing spaces',
        imageAlt: 'Jasmine, rose, botanical branches, and a fragrance oil bottle',
      },
      {
        title: 'Woody and grounded',
        description: 'A calm direction with depth for more considered environments.',
        idealForLabel: 'Consider for',
        idealFor: 'Lobbies, showrooms, and executive spaces',
        imageAlt: 'Cedarwood, cypress, sandalwood, and a fragrance oil bottle',
      },
    ],
    processEyebrow: 'Development process',
    processTitle: 'From brief to finished direction',
    process: [
      'Define the intended mood, audience, product, or environment.',
      'Explore scent directions and select an ingredient story.',
      'Develop samples and refine the fragrance with its intended use in mind.',
      'Prepare the selected direction for ambient, product, or OEM/ODM application.',
    ],
    laboratoryEyebrow: 'Fragrance laboratory',
    laboratoryTitle: 'Ingredient exploration',
    laboratoryDescription:
      'Essential oils and botanical extracts provide a starting library for fragrance discussion and sampling.',
    essentialOilsTitle: 'Essential oils',
    extractsTitle: 'Extracts',
    showAllLabel: 'View full ingredient library',
    showLessLabel: 'Show ingredient overview',
    scopeEyebrow: 'OEM/ODM scope',
    scopeTitle: 'Fragrance development for brands, products, and spaces',
    scopeDescription:
      'The documented scope includes custom fragrance, product experience, ambient environments, packaging, labelling, and storage support.',
    scopeLink: { label: 'Start a development brief' },
    heroImageAlt: 'Fragrance specialist blending aromatic oils and botanicals',
  },
  downloads: {
    breadcrumb: 'Downloads',
    eyebrow: SITE.legalName,
    title: 'Company profiles and brochures',
    introduction:
      'Open or download the source PDFs for an overview of the company, IT maintenance services, aroma work, and documented diffuser products.',
    documentsEyebrow: 'Source documents',
    documentsTitle: 'Choose the profile that matches your requirement.',
    documents: [
      {
        title: 'IT Maintenance Service Company Profile',
        description:
          'An overview of the IT and AI maintenance scope, company values, and service context.',
        href: '/downloads/ms-monster-it-maintenance-profile.pdf',
        meta: '8-page PDF',
      },
      {
        title: 'Perfume & Aroma Company Profile',
        description:
          'Company background and information about aroma work, fragrance ingredients, products, and projects.',
        href: '/downloads/ms-monster-perfume-profile.pdf',
        meta: '17-page PDF',
      },
      {
        title: 'MS Monster Global Product Brochure',
        description:
          'Documented diffuser models, product features, coverage, capacity, and fragrance oil information.',
        href: '/downloads/ms-monster-product-brochure.pdf',
        meta: '15-page PDF',
      },
    ],
    openLabel: 'Open PDF',
    downloadLabel: 'Download PDF',
    guidanceEyebrow: 'Need a specific document?',
    guidanceTitle: 'Give the team the context for your request.',
    guidanceDescription:
      'For a quotation, product discussion, or maintenance scope, identify the division and the information you need.',
    guidanceItems: [
      'IT maintenance scope',
      'Aroma project brief',
      'Diffuser product information',
      'Company registration details',
    ],
    contactCta: {
      eyebrow: 'Document enquiry',
      title: 'Need help choosing the right profile?',
      description:
        'Contact the team with the service, product, or company information you are looking for.',
      link: { label: 'Ask about company documents' },
    },
  },
  contact: {
    breadcrumb: 'Contact',
    eyebrow: SITE.legalName,
    title: 'Contact MS Monster Global',
    introduction:
      'Contact the team in Nilai about technology maintenance, commercial aroma solutions, diffuser products, custom fragrance, or company information.',
    channelsEyebrow: 'Direct contact',
    channelsTitle: 'Choose the channel that suits your enquiry.',
    address: {
      title: 'Nilai office',
      description: address,
      action: 'Open in Google Maps',
    },
    phone: {
      title: 'Phone',
      description: SITE.displayTelephone,
      action: 'Call the team',
    },
    email: {
      title: 'Email',
      description: SITE.email,
      action: 'Send an email',
    },
    whatsapp: {
      title: 'WhatsApp',
      description: 'Start a direct chat with the team.',
      action: 'Open WhatsApp',
    },
    facebook: {
      title: 'Official Facebook',
      description: 'View Monster Perfume product news and updates.',
      action: 'Visit Facebook',
    },
    enquiriesEyebrow: 'Service enquiries',
    enquiriesTitle: 'Start with the relevant division.',
    enquiriesDescription:
      'Review the service scope first, then share the environment, product, or operating requirement with the team.',
    aromaLink: { label: 'Review aroma solutions' },
    itLink: { label: 'Review IT maintenance' },
  },
  footer: {
    summary:
      'Practical IT maintenance and commercial aroma solutions for business environments.',
    companyTitle: 'Company',
    servicesTitle: 'Services',
    contactTitle: 'Contact',
    copyright: `© 2026 ${SITE.legalName}.`,
    registrationLabel: 'SSM registration number',
    facebookLabel: 'Official Facebook',
  },
  notFound: {
    eyebrow: 'Page not found',
    title: 'This page is not available',
    description:
      'The address may have changed or the page may no longer exist. Continue from the home page or contact the team.',
    homeLink: { label: 'Return home' },
    contactLink: { label: 'Contact the team' },
  },
} satisfies SiteContent;
