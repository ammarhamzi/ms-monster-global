export interface Diffuser {
  model: string;
  capacity: string | null;
  coverage: string;
  mounting: 'desktop' | 'wall' | 'freestanding' | 'hanging' | 'hvac' | 'portable';
  features: string[];
  suitableFor: string;
}

export interface CatalogGroup {
  mounting: Diffuser['mounting'];
  modelIds: string[];
}

export interface DiffuserLocalizedCopy {
  features: string[];
  suitableFor: string;
}

export const diffusers: Diffuser[] = [
  {
    model: 'MF120A',
    capacity: '200 ml',
    coverage: '40–200 m²',
    mounting: 'desktop',
    features: [
      'Sensitive touch screen',
      'Silent and stable operation',
      'Imported air pump',
      'Corrosion-resistant aluminium alloy body',
      'Visual panel',
    ],
    suitableFor: 'Small bedrooms, hotels, guest rooms, beauty salons, cafés, and similar settings.',
  },
  {
    model: 'MF130R',
    capacity: null,
    coverage: '40–200 m²',
    mounting: 'wall',
    features: [
      'Magnetic surface cover',
      'Rotary plug',
      'Customisable PC panel for a logo or pattern',
      'Seven-colour gradient atmosphere light',
    ],
    suitableFor: 'Small bedrooms, hotels, guest rooms, beauty salons, cafés, and similar settings.',
  },
  {
    model: 'MC50L',
    capacity: '20 ml',
    coverage: '10–20 m²',
    mounting: 'portable',
    features: [
      'One-click operation',
      'Quiet operation',
      'Three-level adjustment',
      'Air-pump atomisation',
      'Starts and stops with the car',
      'Aerospace-grade aluminium alloy shell',
    ],
    suitableFor: 'Cars.',
  },
  {
    model: 'MF50L',
    capacity: '20 ml',
    coverage: '10–20 m²',
    mounting: 'portable',
    features: [
      'One-click operation',
      'Quiet operation',
      'Three-level adjustment',
      'Air-pump atomisation',
      'Aerospace-grade aluminium alloy shell',
    ],
    suitableFor: 'Cars, homes, offices, and similar settings.',
  },
  {
    model: 'MF140A',
    capacity: '150 ml',
    coverage: '40–150 m²',
    mounting: 'wall',
    features: [
      'Compact format',
      'Intelligent segment setting',
      'Anti-theft lock',
      'Customisable PC panel for a logo or pattern',
      'Energy-saving technology',
    ],
    suitableFor: 'Small bedrooms, hotels, guest rooms, beauty salons, cafés, and similar settings.',
  },
  {
    model: 'MF300R',
    capacity: '175 ml',
    coverage: '260–490 m²',
    mounting: 'wall',
    features: [
      'One-click operation',
      'Quiet operation',
      'Three-level adjustment',
      'Air-pump atomisation',
    ],
    suitableFor: 'Small bedrooms, hotels, guest rooms, beauty salons, cafés, and similar settings.',
  },
  {
    model: 'MS1300A',
    capacity: '150 ml',
    coverage: '390–530 m²',
    mounting: 'wall',
    features: [
      'Compact format',
      'Internal quiet fan',
      'Tube connection',
      'Anti-theft lock',
      'Customisable PC panel for a logo or pattern',
    ],
    suitableFor: 'Canteens, automotive showrooms, stores, hotels, and similar settings.',
  },
  {
    model: 'MS1400A',
    capacity: '200 ml',
    coverage: '430–600 m²',
    mounting: 'hvac',
    features: [
      'Aluminium alloy body',
      'Aluminium alloy atomising nozzle',
      'Tube connection',
      'Customisable PC panel for a logo or pattern',
      'Replaceable oil bottle',
    ],
    suitableFor: 'Canteens, automotive showrooms, stores, hotels, and similar settings.',
  },
  {
    model: 'MF1200A',
    capacity: '200 ml',
    coverage: '350–500 m²',
    mounting: 'hvac',
    features: [
      'Customisable PC panel',
      'Sensitive touch screen',
      'Wi-Fi and Bluetooth control',
      'Nano atomisation technology',
      'HVAC system connectors',
    ],
    suitableFor: 'Canteens, automotive showrooms, stores, hotels, and similar settings.',
  },
  {
    model: 'MF1500A',
    capacity: '500 ml',
    coverage: '50–930 m²',
    mounting: 'hvac',
    features: [
      'Sensitive touch screen',
      'Wi-Fi and Bluetooth control',
      'Nano atomisation technology',
      'Built-in fan',
      'HVAC system connectors',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MF3000A',
    capacity: '1000 ml',
    coverage: '900–1100 m²',
    mounting: 'hvac',
    features: [
      'Sensitive touch screen',
      'Wi-Fi and Bluetooth control',
      'Nano atomisation technology',
      'Built-in fan',
      'HVAC system connectors',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS3000R',
    capacity: '500 ml / 1000 ml',
    coverage: '670–1200 m²',
    mounting: 'freestanding',
    features: [
      'Internal quiet fan',
      'Aluminium alloy body',
      'High atomisation output',
      'Freestanding design',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS1500A',
    capacity: '1000 ml',
    coverage: '300–600 m²',
    mounting: 'hvac',
    features: [
      'Metal body',
      'Internal quiet fan',
      'Plug-in atomiser head',
      'HVAC adapter',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS3500A',
    capacity: '1000 ml',
    coverage: '500–930 m²',
    mounting: 'hvac',
    features: [
      'Metal body',
      'Plug-in atomiser head',
      'Built-in fan',
      'HVAC system connectors',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS3600A',
    capacity: '1 L / 5 L',
    coverage: '500–1100 m²',
    mounting: 'hvac',
    features: [
      'Compact format',
      'Wall-mounting panels',
      'Screw-thread atomising core',
      'Fresh-air conditioning system connection',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS6000A',
    capacity: '1 L + 1 L / 5 L + 5 L',
    coverage: '1700–2800 m²',
    mounting: 'hvac',
    features: [
      'Compact format',
      'Aluminium alloy atomising nozzle',
      'Screw-thread atomising core',
      'Fresh-air conditioning system connection',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS3800R',
    capacity: '500 ml',
    coverage: '300–600 m²',
    mounting: 'hanging',
    features: [
      'Hanging design',
      'Nano atomisation',
      'Smart circulation',
      'Built-in fan',
      'Hook and safety rope',
      'Safety lock',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS105',
    capacity: '140 ml',
    coverage: '80–200 m²',
    mounting: 'wall',
    features: [
      'Smart control',
      'Long-lasting fragrance',
      'Versatile placement',
      'Durable build',
    ],
    suitableFor: 'Canteens, automotive showrooms, stores, hotels, and similar settings.',
  },
  {
    model: 'MS500',
    capacity: '500 ml',
    coverage: '200–765 m²',
    mounting: 'wall',
    features: [
      'Ultrasonic technology',
      'Mist settings',
      'Quiet operation',
      'Automatic shut-off',
      'Air humidification',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS501F',
    capacity: '400 ml',
    coverage: '170–430 m²',
    mounting: 'wall',
    features: [
      'Cold-air dual-fluid atomisation',
      'Smart connectivity',
      'Versatile installation',
      'Waterless operation',
      'Quiet operation',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS-18',
    capacity: '600 ml',
    coverage: '165–350 m²',
    mounting: 'wall',
    features: [
      'Diffuser and 18.5-inch LED screen',
      'App control',
      'Custom logo and graphics options',
      'Waterless atomiser technology',
      'Timing and intensity control',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS-43',
    capacity: '2 × 800 ml PET bottles',
    coverage: '1200–2100 m²',
    mounting: 'freestanding',
    features: [
      'Diffuser and 43-inch LCD touch screen',
      'Waterless and heatless technology',
      'Dual oil bottles',
      'Programmable timer',
      'Security lock',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
  {
    model: 'MS600',
    capacity: '750 ml',
    coverage: '50–200 m²',
    mounting: 'wall',
    features: [
      'Touch control and digital display',
      'Flip-top design',
      'Fine atomisation',
      'Quiet operation',
      'Plug-and-play power',
    ],
    suitableFor: 'Hotel lobbies, shopping malls, large hotels, and similar settings.',
  },
];

export const catalogGroups: CatalogGroup[] = [
  {
    mounting: 'portable',
    modelIds: ['MC50L', 'MF50L'],
  },
  {
    mounting: 'desktop',
    modelIds: ['MF120A'],
  },
  {
    mounting: 'wall',
    modelIds: [
      'MF130R',
      'MF140A',
      'MF300R',
      'MS1300A',
      'MS105',
      'MS500',
      'MS501F',
      'MS-18',
      'MS600',
    ],
  },
  {
    mounting: 'hvac',
    modelIds: [
      'MS1400A',
      'MF1200A',
      'MF1500A',
      'MF3000A',
      'MS1500A',
      'MS3500A',
      'MS3600A',
      'MS6000A',
    ],
  },
  {
    mounting: 'freestanding',
    modelIds: ['MS3000R', 'MS-43'],
  },
  {
    mounting: 'hanging',
    modelIds: ['MS3800R'],
  },
];

export const diffuserMsCopy: Record<string, DiffuserLocalizedCopy> = {
  MF120A: {
    features: [
      'Skrin sentuh sensitif',
      'Operasi senyap dan stabil',
      'Pam udara import',
      'Badan aloi aluminium tahan kakisan',
      'Panel paparan',
    ],
    suitableFor: 'Bilik tidur kecil, hotel, bilik tetamu, salon kecantikan, kafe, dan persekitaran serupa.',
  },
  MF130R: {
    features: [
      'Penutup permukaan magnet',
      'Palam berputar',
      'Panel PC boleh disesuaikan untuk logo atau corak',
      'Lampu suasana kecerunan tujuh warna',
    ],
    suitableFor: 'Bilik tidur kecil, hotel, bilik tetamu, salon kecantikan, kafe, dan persekitaran serupa.',
  },
  MC50L: {
    features: [
      'Operasi satu klik',
      'Operasi senyap',
      'Pelarasan tiga tahap',
      'Pengatoman pam udara',
      'Bermula dan berhenti bersama kereta',
      'Cangkerang aloi aluminium gred aeroangkasa',
    ],
    suitableFor: 'Kereta.',
  },
  MF50L: {
    features: [
      'Operasi satu klik',
      'Operasi senyap',
      'Pelarasan tiga tahap',
      'Pengatoman pam udara',
      'Cangkerang aloi aluminium gred aeroangkasa',
    ],
    suitableFor: 'Kereta, rumah, pejabat, dan persekitaran serupa.',
  },
  MF140A: {
    features: [
      'Bentuk kompak',
      'Tetapan segmen pintar',
      'Kunci antikecurian',
      'Panel PC boleh disesuaikan untuk logo atau corak',
      'Teknologi penjimatan tenaga',
    ],
    suitableFor: 'Bilik tidur kecil, hotel, bilik tetamu, salon kecantikan, kafe, dan persekitaran serupa.',
  },
  MF300R: {
    features: [
      'Operasi satu klik',
      'Operasi senyap',
      'Pelarasan tiga tahap',
      'Pengatoman pam udara',
    ],
    suitableFor: 'Bilik tidur kecil, hotel, bilik tetamu, salon kecantikan, kafe, dan persekitaran serupa.',
  },
  MS1300A: {
    features: [
      'Bentuk kompak',
      'Kipas dalaman senyap',
      'Sambungan tiub',
      'Kunci antikecurian',
      'Panel PC boleh disesuaikan untuk logo atau corak',
    ],
    suitableFor: 'Kantin, bilik pameran automotif, kedai, hotel, dan persekitaran serupa.',
  },
  MS1400A: {
    features: [
      'Badan aloi aluminium',
      'Muncung pengatoman aloi aluminium',
      'Sambungan tiub',
      'Panel PC boleh disesuaikan untuk logo atau corak',
      'Botol minyak boleh diganti',
    ],
    suitableFor: 'Kantin, bilik pameran automotif, kedai, hotel, dan persekitaran serupa.',
  },
  MF1200A: {
    features: [
      'Panel PC boleh disesuaikan',
      'Skrin sentuh sensitif',
      'Kawalan Wi-Fi dan Bluetooth',
      'Teknologi pengatoman nano',
      'Penyambung sistem HVAC',
    ],
    suitableFor: 'Kantin, bilik pameran automotif, kedai, hotel, dan persekitaran serupa.',
  },
  MF1500A: {
    features: [
      'Skrin sentuh sensitif',
      'Kawalan Wi-Fi dan Bluetooth',
      'Teknologi pengatoman nano',
      'Kipas terbina dalam',
      'Penyambung sistem HVAC',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MF3000A: {
    features: [
      'Skrin sentuh sensitif',
      'Kawalan Wi-Fi dan Bluetooth',
      'Teknologi pengatoman nano',
      'Kipas terbina dalam',
      'Penyambung sistem HVAC',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MS3000R: {
    features: [
      'Kipas dalaman senyap',
      'Badan aloi aluminium',
      'Output pengatoman tinggi',
      'Reka bentuk berdiri bebas',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MS1500A: {
    features: [
      'Badan logam',
      'Kipas dalaman senyap',
      'Kepala pengatom pasang masuk',
      'Penyesuai HVAC',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MS3500A: {
    features: [
      'Badan logam',
      'Kepala pengatom pasang masuk',
      'Kipas terbina dalam',
      'Penyambung sistem HVAC',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MS3600A: {
    features: [
      'Bentuk kompak',
      'Panel pemasangan dinding',
      'Teras pengatoman berulir',
      'Sambungan sistem penyaman udara segar',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MS6000A: {
    features: [
      'Bentuk kompak',
      'Muncung pengatoman aloi aluminium',
      'Teras pengatoman berulir',
      'Sambungan sistem penyaman udara segar',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MS3800R: {
    features: [
      'Reka bentuk gantung',
      'Pengatoman nano',
      'Peredaran pintar',
      'Kipas terbina dalam',
      'Cangkuk dan tali keselamatan',
      'Kunci keselamatan',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MS105: {
    features: [
      'Kawalan pintar',
      'Wangian tahan lama',
      'Penempatan serba guna',
      'Binaan tahan lasak',
    ],
    suitableFor: 'Kantin, bilik pameran automotif, kedai, hotel, dan persekitaran serupa.',
  },
  MS500: {
    features: [
      'Teknologi ultrasonik',
      'Tetapan kabus',
      'Operasi senyap',
      'Penutupan automatik',
      'Pelembapan udara',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MS501F: {
    features: [
      'Pengatoman dwibendalir udara sejuk',
      'Kesalinghubungan pintar',
      'Pemasangan serba guna',
      'Operasi tanpa air',
      'Operasi senyap',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  'MS-18': {
    features: [
      'Diffuser dan skrin LED 18.5 inci',
      'Kawalan aplikasi',
      'Pilihan logo dan grafik tersuai',
      'Teknologi pengatom tanpa air',
      'Kawalan masa dan keamatan',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  'MS-43': {
    features: [
      'Diffuser dan skrin sentuh LCD 43 inci',
      'Teknologi tanpa air dan tanpa haba',
      'Dua botol minyak',
      'Pemasa boleh atur cara',
      'Kunci keselamatan',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
  MS600: {
    features: [
      'Kawalan sentuh dan paparan digital',
      'Reka bentuk penutup atas',
      'Pengatoman halus',
      'Operasi senyap',
      'Kuasa pasang dan guna',
    ],
    suitableFor: 'Ruang legar hotel, pusat beli-belah, hotel besar, dan persekitaran serupa.',
  },
};

export const essentialOils = [
  'Aniseed Oil',
  'Bois De Rose Oil',
  'Black Pepper Oil',
  'Citronella Oil',
  'Cypress Oil',
  'Cinnamon Leaf Oil',
  'Cedarwood Virginian Oil',
  'Jasmine Absolute Oil',
  'Lemongrass Oil',
  'Sandalwood Oil',
  'Tea Tree Oil',
  'Peppermint Oil',
  'Rose Absolute Oil',
  'Rosemary Oil',
  'Ginger Oil',
  'Apricot Kernel Oil',
  'Avocado Pear Oil',
  'Calendula Oil',
  'Evening Primrose Oil',
  'Frac Coconut Oil',
  'Grapeseed Oil',
  'Jojoba Oil',
  'Macadamia Oil',
  'Peach Kernel Oil',
  'Sweet Almond Oil',
  'Walnut Oil',
  'Wheat Germ Oil',
];

export const extracts = [
  'Aloe vera',
  'Avocado',
  'Carrot',
  'Coffee',
  'Cotton seed',
  'Cucumber',
  'Green Tea',
  'Grapefruit',
  'Hoodia',
  'Honey',
  'Lemon',
  'Pandan Leaf',
  'Papaya',
  'Peach',
  'Rose',
  'Seaweed',
  'Tomato',
];
