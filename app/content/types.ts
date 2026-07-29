export interface NavContent {
  primaryLabel: string;
  breadcrumbLabel: string;
  skipToContent: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  languageSelectionLabel: string;
  home: string;
  about: string;
  services: string;
  perfume: string;
  it: string;
  downloads: string;
  contact: string;
}

export interface LinkContent {
  label: string;
}

export interface ContactCtaContent {
  eyebrow: string;
  title: string;
  description: string;
  link: LinkContent;
}

export interface DivisionContent {
  key: 'perfume' | 'it';
  title: string;
  description: string;
  items: string[];
  link: LinkContent;
  imageAlt: string;
}

export interface HomeContent {
  eyebrow: string;
  title: string;
  introduction: string;
  perfumeLink: LinkContent;
  itLink: LinkContent;
  overviewEyebrow: string;
  overviewTitle: string;
  overviewDescription: string;
  divisions: DivisionContent[];
  operationsEyebrow: string;
  operationsTitle: string;
  operationsDescription: string;
  operationsItems: string[];
  contactCta: ContactCtaContent;
}

export interface PrincipleContent {
  title: string;
  description: string;
}

export interface HistoryItemContent {
  year: string;
  text: string;
}

export interface AboutContent {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  introduction: string;
  incorporation: string;
  incorporationEyebrow: string;
  incorporationTitle: string;
  companyEyebrow: string;
  companyTitle: string;
  registrationLabel: string;
  addressLabel: string;
  principlesEyebrow: string;
  principlesTitle: string;
  principles: PrincipleContent[];
  historyEyebrow: string;
  historyTitle: string;
  history: HistoryItemContent[];
  valuesEyebrow: string;
  valuesTitle: string;
  values: string[];
  divisionsEyebrow: string;
  divisionsTitle: string;
  divisions: DivisionContent[];
  contactCta: ContactCtaContent;
}

export interface ServiceContent {
  title: string;
  description: string;
}

export interface ItContent {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  introduction: string;
  primaryLink: LinkContent;
  infrastructureEyebrow: string;
  infrastructureTitle: string;
  infrastructureDescription: string;
  servicesEyebrow: string;
  servicesTitle: string;
  services: ServiceContent[];
  contactCta: ContactCtaContent;
  heroImageAlt: string;
}

export interface ProcessStepContent {
  title: string;
  description: string;
}

export interface SpaceContent {
  title: string;
  description: string;
  imageAlt: string;
}

export interface PerfumeContent {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  introduction: string;
  primaryLink: LinkContent;
  secondaryLink: LinkContent;
  assessmentEyebrow: string;
  assessmentTitle: string;
  assessmentDescription: string;
  spaces: SpaceContent[];
  processEyebrow: string;
  processTitle: string;
  processDescription: string;
  process: ProcessStepContent[];
  programmeEyebrow: string;
  programmeTitle: string;
  programmeItems: string[];
  contactCta: ContactCtaContent;
  heroImageAlt: string;
  programmeImageAlt: string;
  closingImageAlt: string;
}

export interface DiffusersContent {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  introduction: string;
  featuredEyebrow: string;
  featuredTitle: string;
  catalogueEyebrow: string;
  catalogueTitle: string;
  modelsLabel: string;
  coverageLabel: string;
  capacityLabel: string;
  mountingLabel: string;
  suitableForLabel: string;
  confirmLink: LinkContent;
  facebookLink: LinkContent;
}

export interface ScentDirectionContent {
  title: string;
  description: string;
  idealForLabel: string;
  idealFor: string;
  imageAlt: string;
}

export interface FragranceContent {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  introduction: string;
  primaryLink: LinkContent;
  directionsEyebrow: string;
  directionsTitle: string;
  directions: ScentDirectionContent[];
  processEyebrow: string;
  processTitle: string;
  process: string[];
  laboratoryEyebrow: string;
  laboratoryTitle: string;
  laboratoryDescription: string;
  essentialOilsTitle: string;
  extractsTitle: string;
  showAllLabel: string;
  showLessLabel: string;
  scopeEyebrow: string;
  scopeTitle: string;
  scopeDescription: string;
  scopeLink: LinkContent;
  heroImageAlt: string;
}

export interface DownloadDocumentContent {
  title: string;
  description: string;
  href: string;
  meta: string;
}

export interface DownloadsContent {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  introduction: string;
  documentsEyebrow: string;
  documentsTitle: string;
  documents: DownloadDocumentContent[];
  openLabel: string;
  downloadLabel: string;
  guidanceEyebrow: string;
  guidanceTitle: string;
  guidanceDescription: string;
  guidanceItems: string[];
  contactCta: ContactCtaContent;
}

export interface ContactChannelContent {
  title: string;
  description: string;
  action: string;
}

export interface ContactContent {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  introduction: string;
  channelsEyebrow: string;
  channelsTitle: string;
  address: ContactChannelContent;
  phone: ContactChannelContent;
  email: ContactChannelContent;
  whatsapp: ContactChannelContent;
  facebook: ContactChannelContent;
  enquiriesEyebrow: string;
  enquiriesTitle: string;
  enquiriesDescription: string;
  perfumeLink: LinkContent;
  itLink: LinkContent;
}

export interface FooterContent {
  summary: string;
  companyTitle: string;
  servicesTitle: string;
  contactTitle: string;
  copyright: string;
  registrationLabel: string;
  facebookLabel: string;
}

export interface NotFoundContent {
  eyebrow: string;
  title: string;
  description: string;
  homeLink: LinkContent;
  contactLink: LinkContent;
}

export interface SiteContent {
  nav: NavContent;
  home: HomeContent;
  about: AboutContent;
  it: ItContent;
  perfume: PerfumeContent;
  diffusers: DiffusersContent;
  fragrance: FragranceContent;
  downloads: DownloadsContent;
  contact: ContactContent;
  footer: FooterContent;
  notFound: NotFoundContent;
}
