import { SITE } from '../config/site';
import type { SiteContent } from './types';

const address = [
  SITE.address.streetAddress,
  `${SITE.address.postalCode} ${SITE.address.addressLocality}`,
  SITE.address.addressRegion,
  'Malaysia',
].join(', ');

export const msContent = {
  nav: {
    primaryLabel: 'Navigasi utama',
    breadcrumbLabel: 'Jejak navigasi',
    skipToContent: 'Langkau ke kandungan utama',
    openMenuLabel: 'Buka menu navigasi',
    closeMenuLabel: 'Tutup menu navigasi',
    languageSelectionLabel: 'Pilihan bahasa',
    home: 'Laman utama',
    about: 'Tentang',
    services: 'Perkhidmatan',
    perfume: 'Perfume & Aroma',
    it: 'Penyelenggaraan IT',
    downloads: 'Muat turun',
    contact: 'Hubungi',
  },
  home: {
    eyebrow: SITE.legalName,
    title: 'Penyelesaian aroma dan penyelenggaraan teknologi untuk kesinambungan operasi.',
    introduction:
      'MS Monster Global membantu organisasi membentuk ruang yang terancang melalui Perfume & Aroma dan menyelenggara teknologi yang menyokong operasi harian.',
    perfumeLink: { label: 'Teroka Perfume & Aroma' },
    itLink: { label: 'Teroka penyelenggaraan IT' },
    overviewEyebrow: 'Dua bahagian khusus',
    overviewTitle: 'Sokongan praktikal untuk ruang dan sistem.',
    overviewDescription:
      'Pilih bahagian yang sepadan dengan keperluan anda. Setiap laluan menerangkan skop yang tersedia dan menyediakan cara terus untuk membincangkan langkah seterusnya.',
    divisions: [
      {
        key: 'perfume',
        title: 'Perfume & Aroma',
        description:
          'Rancang arah haruman, pilih diffuser yang sesuai, dan kekalkan pengalaman aroma yang konsisten untuk persekitaran komersial.',
        items: [
          'Penilaian ruang dan aroma',
          'Pemilihan diffuser komersial',
          'Pembangunan wangian tersuai',
        ],
        link: { label: 'Lihat Perfume & Aroma' },
        imageAlt: 'Diffuser aroma komersial dan minyak wangian di ruang dalaman terancang',
      },
      {
        key: 'it',
        title: 'Servis penyelenggaraan IT & AI',
        description:
          'Sokong teknologi perniagaan melalui penyelenggaraan, penyelesaian masalah, pemantauan rangkaian, kesiapsiagaan sandaran, dan bantuan infrastruktur.',
        items: [
          'Sokongan perkakasan dan perisian',
          'Pemantauan rangkaian dan penyelesaian masalah',
          'Kesiapsiagaan sandaran dan pemulihan data',
        ],
        link: { label: 'Lihat penyelenggaraan IT' },
        imageAlt: 'Juruteknik bekerja dengan infrastruktur pelayan perusahaan',
      },
    ],
    operationsEyebrow: 'Asas korporat yang jelas',
    operationsTitle: 'Dibina mengikut keperluan operasi praktikal.',
    operationsDescription:
      'Syarikat ini menggabungkan dua bidang perkhidmatan khusus dengan skop yang jelas, saluran hubungan terus, dan maklumat produk yang boleh dimuat turun.',
    operationsItems: [
      `${SITE.legalName}, berdaftar sebagai ${SITE.registrationNumber}`,
      `Berpangkalan di ${SITE.address.addressLocality}, ${SITE.address.addressRegion}`,
      'Laluan khusus untuk keperluan teknologi dan Perfume & Aroma',
      'Maklumat produk diffuser terdokumen tersedia sebagai brosur PDF',
    ],
    contactCta: {
      eyebrow: 'Mulakan dengan keperluan anda',
      title: 'Terangkan sistem atau ruang yang sedang anda rancang.',
      description:
        'Kongsikan persekitaran, keutamaan operasi, atau arah aroma yang anda fikirkan supaya pasukan kami boleh membimbing anda kepada perkhidmatan berkaitan.',
      link: { label: 'Hubungi MS Monster Global' },
    },
  },
  about: {
    breadcrumb: 'Tentang',
    eyebrow: SITE.legalName,
    title: 'Tentang MS Monster Global',
    introduction:
      `${SITE.legalName} ialah syarikat berpangkalan di Malaysia dengan dua bahagian perniagaan: servis penyelenggaraan IT dan AI yang praktikal, serta Perfume & Aroma untuk persekitaran perniagaan.`,
    incorporation:
      `${SITE.legalName} diperbadankan pada 16 November 2022. Aktiviti terdahulu merupakan akar perniagaan sebelum penubuhan Sdn Bhd.`,
    incorporationEyebrow: 'Entiti undang-undang semasa',
    incorporationTitle: 'Diperbadankan pada November 2022',
    companyEyebrow: 'Syarikat berdaftar',
    companyTitle: 'Maklumat syarikat',
    registrationLabel: 'Nombor pendaftaran SSM',
    addressLabel: 'Alamat perniagaan berdaftar',
    principlesEyebrow: 'Cara kami bekerja',
    principlesTitle: 'Pendekatan perkhidmatan yang jelas dan praktikal.',
    principles: [
      {
        title: 'Visi',
        description:
          'Menjadikan Perfume & Aroma lebih mudah dicapai dan menjadi rakan penyelenggaraan teknologi yang dipercayai untuk kesinambungan serta pertumbuhan perniagaan.',
      },
      {
        title: 'Misi',
        description:
          'Menyampaikan perkhidmatan yang cekap dan fleksibel melalui pengetahuan teknikal, inovasi praktikal, dan sokongan yang mengutamakan pelanggan.',
      },
      {
        title: 'Objektif',
        description:
          'Meningkatkan kebolehpercayaan sistem dan kualiti perkhidmatan melalui penyampaian yang konsisten dengan skop yang jelas.',
      },
    ],
    historyEyebrow: 'Garis masa syarikat',
    historyTitle: 'Akar perniagaan dan pemerbadanan',
    history: [
      {
        year: '2016',
        text: 'Pada 2016, akar perniagaan MS Monster bermula dengan aktiviti pembuatan dan penyesuaian detergen serta wangian.',
      },
      {
        year: '2019',
        text: 'Aktiviti terdahulu tersebut berkembang kepada import dan jualan minyak aromatik serta minyak pati.',
      },
      {
        year: '2022',
        text: `${SITE.legalName} diperbadankan pada 16 November 2022.`,
      },
    ],
    valuesEyebrow: 'Prinsip kerja',
    valuesTitle: 'Nilai yang membimbing kerja kami',
    values: ['Kebolehpercayaan', 'Proaktif', 'Fokus pelanggan', 'Integriti', 'Kecemerlangan'],
    divisionsEyebrow: 'Bidang kami',
    divisionsTitle: 'Dua bahagian perkhidmatan khusus',
    divisions: [
      {
        key: 'perfume',
        title: 'Perfume & Aroma',
        description:
          'Konsultasi aroma, pemadanan diffuser, bekalan wangian, pembangunan haruman tersuai, isian semula, pelarasan, dan sokongan penyelenggaraan.',
        items: ['Perancangan aroma', 'Sistem diffuser', 'Wangian tersuai'],
        link: { label: 'Teroka Perfume & Aroma' },
        imageAlt: 'Diffuser aroma komersial dan minyak wangian di ruang dalaman',
      },
      {
        key: 'it',
        title: 'Servis penyelenggaraan IT & AI',
        description:
          'Sokongan penyelenggaraan untuk perkakasan, perisian, rangkaian, kesiapsiagaan sandaran, infrastruktur awan, dan penyelesaian masalah operasi.',
        items: ['Penyelenggaraan pencegahan', 'Sokongan rangkaian', 'Kesiapsiagaan sandaran'],
        link: { label: 'Teroka perkhidmatan IT' },
        imageAlt: 'Juruteknik memeriksa peralatan pelayan perusahaan',
      },
    ],
    contactCta: {
      eyebrow: 'Bincangkan keperluan anda',
      title: 'Pilih bahagian yang sepadan dengan projek anda.',
      description:
        'Hubungi pasukan di Nilai tentang penyelenggaraan IT, Perfume & Aroma, dokumen syarikat, atau maklumat produk.',
      link: { label: 'Hubungi pasukan kami' },
    },
  },
  it: {
    breadcrumb: 'Penyelenggaraan IT',
    eyebrow: SITE.name,
    title: 'Servis Penyelenggaraan IT & AI',
    introduction:
      'Sokongan penyelenggaraan praktikal untuk teknologi perniagaan, daripada penyelesaian masalah harian hingga keperluan rangkaian, sandaran, awan, dan infrastruktur.',
    primaryLink: { label: 'Bincangkan keperluan sokongan' },
    infrastructureEyebrow: 'Persekitaran yang disokong',
    infrastructureTitle: 'Penyelenggaraan teknologi mengikut operasi anda.',
    infrastructureDescription:
      'Skop boleh merangkumi infrastruktur AI, perkakasan dan perisian perniagaan, persekitaran awan, LAN, Wi-Fi, dan rangkaian 5G.',
    servicesEyebrow: 'Skop perkhidmatan',
    servicesTitle: 'Sokongan merentasi persekitaran teknologi',
    services: [
      {
        title: 'Penyelenggaraan ramalan',
        description:
          'Rancang penyelenggaraan ramalan dan pencegahan mengikut keadaan serta keperluan operasi aset teknologi.',
      },
      {
        title: 'Sokongan perkakasan dan perisian',
        description:
          'Penyelenggaraan dan penyelesaian masalah untuk peralatan, aplikasi, dan stesen kerja perniagaan.',
      },
      {
        title: 'Pemantauan rangkaian',
        description: 'Sokongan untuk penyelenggaraan dan sambungan rangkaian LAN, Wi-Fi, dan 5G.',
      },
      {
        title: 'Penyelesaian masalah dan pembaikan sistem',
        description: 'Kenal pasti isu teknikal dan usahakan pemulihan operasi biasa.',
      },
      {
        title: 'Kesiapsiagaan sandaran dan pemulihan data',
        description:
          'Sokongan perancangan perlindungan maklumat perniagaan dan persediaan pemulihan praktikal.',
      },
      {
        title: 'Sokongan infrastruktur awan',
        description:
          'Bantuan penyelenggaraan untuk persekitaran awan yang digunakan oleh perniagaan.',
      },
      {
        title: 'Pilihan sokongan di lokasi dan jarak jauh',
        description:
          'Bincangkan bentuk sokongan berdasarkan persekitaran, lokasi, dan keutamaan operasi.',
      },
    ],
    contactCta: {
      eyebrow: 'Rancang skop sokongan',
      title: 'Terangkan persekitaran teknologi dan keutamaan operasi anda.',
      description:
        'Kongsikan sistem, lokasi, dan keperluan penyelenggaraan supaya pasukan kami boleh mencadangkan pendekatan yang sesuai.',
      link: { label: 'Tanya tentang penyelenggaraan IT' },
    },
    heroImageAlt: 'Juruteknik bekerja di antara rak pelayan perusahaan dalam pusat data',
  },
  perfume: {
    breadcrumb: 'Perfume & Aroma',
    eyebrow: 'Monster Perfume',
    title: 'Perfume & Aroma',
    introduction:
      'Rancang pengalaman aroma mengikut sifat sesuatu ruang, kemudian padankannya dengan pendekatan diffuser, isian semula, pelarasan, dan penyelenggaraan yang praktikal.',
    primaryLink: { label: 'Minta cadangan' },
    secondaryLink: { label: 'Lihat semua model diffuser' },
    assessmentEyebrow: 'Penilaian ruang',
    assessmentTitle: 'Mulakan dengan persekitaran dan pengalaman yang diingini.',
    assessmentDescription:
      'Konsultasi bermula dengan jenis ruang, aliran pelanggan, keperluan liputan, pengudaraan, dan suasana yang anda mahu diingati.',
    spaces: [
      {
        title: 'Persekitaran lebih kecil',
        range: '10–200 m²',
        description: 'Bilik persendirian, salon, kafe, dan ruang runcit yang lebih kecil.',
        actionLabel: 'Lihat sistem yang sesuai',
        imageAlt: 'Ruang butik dengan diffuser aroma terpasang pada dinding',
      },
      {
        title: 'Persekitaran komersial',
        range: '200–600 m²',
        description: 'Butik, bilik pameran, restoran, pejabat, dan studio kecergasan.',
        actionLabel: 'Lihat sistem yang sesuai',
        imageAlt: 'Ruang sambut tetamu pejabat dengan diffuser aroma komersial',
      },
      {
        title: 'Persekitaran berkongsi dan hospitaliti',
        range: '500–2800 m²',
        description: 'Hotel, ruang legar, tempat acara, dan persekitaran yang disambungkan kepada HVAC.',
        actionLabel: 'Lihat sistem yang sesuai',
        imageAlt: 'Ruang legar hotel dengan diffuser aroma yang disepadukan dalam ruang dalaman',
      },
    ],
    experience: {
      systemEyebrow: 'Minyak wangian + sistem',
      systemTitle: 'Pilih wangian. Padankan sistem.',
      systemDescription:
        'Laluan praktikal daripada arah wangian kepada diffuser, liputan, dan sokongan isian semula yang sesuai untuk ruang anda.',
      selectorEyebrow: 'Cari sistem wangian anda',
      selectorTitle: 'Mulakan dengan persekitaran. Kami akan bantu seterusnya.',
      selectorDescription:
        'Pilih jenis ruang yang anda usahakan. Setiap pilihan membuka kumpulan model diffuser yang sesuai sebelum cadangan diperhalus bersama pasukan kami.',
      featureEyebrow: 'Sistem pilihan',
      featureTitle: 'Haruman yang kelihatan terancang dan berfungsi di sebalik tabir.',
      featureDescription:
        'Sistem dipilih mengikut suasana yang diingini, keluasan liputan, dan cara peralatan perlu disepadukan secara kemas dalam ruang.',
      featurePoints: [
        'Minyak wangian dan peralatan dipertimbangkan sebagai satu sistem',
        'Format mudah alih, atas meja, dinding, berdiri, gantung, dan sedia HVAC',
        'Sokongan praktikal untuk isian semula, pelarasan, dan konsistensi',
      ],
      aboutEyebrow: 'Tentang Monster Perfume',
      aboutTitle: 'Haruman yang dibentuk untuk cara sesuatu ruang digunakan.',
      aboutDescription:
        'Mulakan dengan suasana yang patut diingati, kemudian bentuk arah wangian dan sistem diffuser mengikut persekitaran sebenar.',
    },
    processEyebrow: 'Program aroma',
    processTitle: 'Proses lengkap daripada ringkasan hingga penjagaan.',
    processDescription:
      'Setiap peringkat membantu menyelaraskan arah wangian dan sistem diffuser dengan persekitaran operasi.',
    process: [
      {
        title: 'Nilai ruang',
        description: 'Semak persekitaran, aliran, pengudaraan, dan keutamaan operasi.',
      },
      {
        title: 'Tetapkan arah wangian',
        description: 'Pilih keluarga wangian atau bangunkan arah tersuai mengikut ringkasan.',
      },
      {
        title: 'Padankan diffuser',
        description: 'Bandingkan liputan, kaedah pemasangan, kapasiti, dan ciri kawalan terdokumen.',
      },
      {
        title: 'Kekalkan pengalaman',
        description: 'Rancang isian semula, pelarasan keamatan, penjagaan diffuser, dan sokongan berterusan.',
      },
    ],
    programmeEyebrow: 'Program perkhidmatan',
    programmeTitle: 'Kekalkan pengalaman aroma yang konsisten.',
    programmeItems: [
      'Panduan pemilihan dan pemasangan diffuser',
      'Isian semula wangian dan pelarasan keamatan',
      'Sokongan penyelenggaraan untuk persekitaran operasi',
    ],
    contactCta: {
      eyebrow: 'Rancang persekitaran aroma',
      title: 'Terangkan suasana yang anda mahukan untuk ruang tersebut.',
      description:
        'Kongsikan persekitaran dan suasana yang diingini supaya pasukan kami boleh membantu membentuk arah wangian serta cadangan diffuser.',
      link: { label: 'Minta cadangan aroma' },
    },
    heroImageAlt: 'Diffuser aroma dan minyak wangian disusun di ruang dalaman komersial',
    programmeImageAlt: 'Pakar wangian menyediakan isian semula diffuser',
    closingImageAlt: 'Ruang legar hospitaliti dengan diffuser aroma',
  },
  diffusers: {
    breadcrumb: 'Diffuser aroma',
    eyebrow: 'Sistem aroma komersial',
    title: 'Diffuser aroma untuk persekitaran berbeza',
    introduction:
      'Bandingkan model terdokumen mengikut liputan, kapasiti yang diketahui, kaedah pemasangan, ciri, dan persekitaran penggunaan.',
    featuredEyebrow: 'Bentuk pilihan',
    featuredTitle: 'Permulaan praktikal untuk membuat perbandingan.',
    catalogueEyebrow: 'Katalog diffuser',
    catalogueTitle: 'Semak setiap model terdokumen',
    modelsLabel: 'model',
    coverageLabel: 'Liputan',
    capacityLabel: 'Kapasiti',
    mountingLabel: 'Format katalog utama',
    suitableForLabel: 'Sesuai untuk',
    confirmLink: { label: 'Sahkan kesesuaian' },
    facebookLink: { label: 'Ikuti Monster Perfume di Facebook' },
  },
  fragrance: {
    breadcrumb: 'Wangian tersuai',
    eyebrow: 'Pembangunan wangian tersuai',
    title: 'Bentuk identiti haruman mengikut pengalaman',
    introduction:
      'Teroka arah wangian, pilihan bahan, pembangunan sampel, dan pemurnian hasil untuk produk atau persekitaran yang dimaksudkan.',
    primaryLink: { label: 'Bincangkan ringkasan wangian' },
    directionsEyebrow: 'Arah wangian',
    directionsTitle: 'Mulakan dengan perasaan yang harus diingati.',
    directions: [
      {
        title: 'Segar dan cerah',
        description: 'Arah yang bersih dan menyegarkan untuk persekitaran terbuka serta bertenaga.',
        idealForLabel: 'Pertimbangkan untuk',
        idealFor: 'Ruang masuk, kafe, dan runcit waktu siang',
        imageAlt: 'Limau gedang, kulit lemon, pudina, dan botol minyak wangian',
      },
      {
        title: 'Bunga dan lembut',
        description: 'Arah lembut yang memberikan kemesraan dan perwatakan peribadi.',
        idealForLabel: 'Pertimbangkan untuk',
        idealFor: 'Butik, salon, dan ruang berhadapan tetamu',
        imageAlt: 'Melur, mawar, ranting botani, dan botol minyak wangian',
      },
      {
        title: 'Kayuan dan membumi',
        description: 'Arah tenang dengan kedalaman untuk persekitaran yang lebih terancang.',
        idealForLabel: 'Pertimbangkan untuk',
        idealFor: 'Ruang legar, bilik pameran, dan ruang eksekutif',
        imageAlt: 'Kayu cedar, sipres, kayu cendana, dan botol minyak wangian',
      },
    ],
    processEyebrow: 'Proses pembangunan',
    processTitle: 'Daripada ringkasan kepada arah akhir',
    process: [
      'Tentukan suasana, khalayak, produk, atau persekitaran yang dimaksudkan.',
      'Teroka arah wangian dan pilih cerita bahan.',
      'Bangunkan sampel dan perhalus wangian mengikut tujuan penggunaannya.',
      'Sediakan arah terpilih untuk aplikasi persekitaran, produk, atau OEM/ODM.',
    ],
    laboratoryEyebrow: 'Makmal wangian',
    laboratoryTitle: 'Penerokaan bahan',
    laboratoryDescription:
      'Minyak pati dan ekstrak botani menyediakan pustaka permulaan untuk perbincangan dan pensampelan wangian.',
    essentialOilsTitle: 'Minyak pati',
    extractsTitle: 'Ekstrak',
    showAllLabel: 'Lihat pustaka bahan penuh',
    showLessLabel: 'Tunjukkan ringkasan bahan',
    scopeEyebrow: 'Skop OEM/ODM',
    scopeTitle: 'Pembangunan wangian untuk jenama, produk, dan ruang',
    scopeDescription:
      'Skop terdokumen merangkumi wangian tersuai, pengalaman produk, persekitaran ambien, pembungkusan, pelabelan, dan sokongan penyimpanan.',
    scopeLink: { label: 'Mulakan ringkasan pembangunan' },
    heroImageAlt: 'Pakar wangian mengadun minyak aromatik dan bahan botani',
  },
  downloads: {
    breadcrumb: 'Muat turun',
    eyebrow: SITE.legalName,
    title: 'Brosur produk dan muat turun',
    introduction:
      'Buka atau muat turun brosur produk yang diterbitkan untuk model diffuser, spesifikasi, dan maklumat minyak wangian terdokumen.',
    documentsEyebrow: 'Dokumen diterbitkan',
    documentsTitle: 'Semak rangkaian produk diffuser terdokumen.',
    documents: [
      {
        title: 'Brosur Produk MS Monster Global',
        description:
          'Model diffuser terdokumen, ciri produk, liputan, kapasiti, dan maklumat minyak wangian.',
        href: '/downloads/ms-monster-product-brochure.pdf',
        meta: 'PDF 15 halaman',
      },
    ],
    openLabel: 'Buka PDF',
    downloadLabel: 'Muat turun PDF',
    guidanceEyebrow: 'Perlukan dokumen khusus?',
    guidanceTitle: 'Berikan konteks untuk permintaan anda.',
    guidanceDescription:
      'Untuk sebut harga, perbincangan produk, atau skop penyelenggaraan, nyatakan bahagian dan maklumat yang anda perlukan.',
    guidanceItems: [
      'Skop penyelenggaraan IT',
      'Ringkasan projek aroma',
      'Maklumat produk diffuser',
      'Maklumat pendaftaran syarikat',
    ],
    contactCta: {
      eyebrow: 'Pertanyaan dokumen',
      title: 'Perlukan bantuan dengan brosur produk?',
      description:
        'Hubungi pasukan kami dengan maklumat perkhidmatan, produk, atau syarikat yang anda cari.',
      link: { label: 'Tanya tentang dokumen syarikat' },
    },
  },
  contact: {
    breadcrumb: 'Hubungi',
    eyebrow: SITE.legalName,
    title: 'Hubungi MS Monster Global',
    introduction:
      'Hubungi pasukan di Nilai tentang penyelenggaraan teknologi, Perfume & Aroma, produk diffuser, wangian tersuai, atau maklumat syarikat.',
    channelsEyebrow: 'Hubungan terus',
    channelsTitle: 'Pilih saluran yang sesuai dengan pertanyaan anda.',
    address: {
      title: 'Pejabat Nilai',
      description: address,
      action: 'Buka dalam Google Maps',
    },
    phone: {
      title: 'Telefon',
      description: SITE.displayTelephone,
      action: 'Hubungi pasukan kami',
    },
    email: {
      title: 'E-mel',
      description: SITE.email,
      action: 'Hantar e-mel',
    },
    whatsapp: {
      title: 'WhatsApp',
      description: 'Mulakan perbualan terus dengan pasukan kami.',
      action: 'Buka WhatsApp',
    },
    facebook: {
      title: 'Facebook rasmi',
      description: 'Lihat berita dan kemas kini produk Monster Perfume.',
      action: 'Lawati Facebook',
    },
    enquiriesEyebrow: 'Pertanyaan perkhidmatan',
    enquiriesTitle: 'Mulakan dengan bahagian yang berkaitan.',
    enquiriesDescription:
      'Semak skop perkhidmatan terlebih dahulu, kemudian kongsikan keperluan persekitaran, produk, atau operasi dengan pasukan kami.',
    perfumeLink: { label: 'Semak Perfume & Aroma' },
    itLink: { label: 'Semak penyelenggaraan IT' },
  },
  footer: {
    summary:
      'Penyelenggaraan IT dan Perfume & Aroma yang praktikal untuk persekitaran perniagaan.',
    companyTitle: 'Syarikat',
    servicesTitle: 'Perkhidmatan',
    contactTitle: 'Hubungi',
    copyright: `© 2026 ${SITE.legalName}.`,
    registrationLabel: 'Nombor pendaftaran SSM',
    facebookLabel: 'Facebook rasmi',
  },
  notFound: {
    eyebrow: 'Halaman tidak ditemukan',
    title: 'Halaman ini tidak tersedia',
    description:
      'Alamat mungkin telah berubah atau halaman tersebut tidak lagi wujud. Teruskan dari laman utama atau hubungi pasukan kami.',
    homeLink: { label: 'Kembali ke laman utama' },
    contactLink: { label: 'Hubungi pasukan kami' },
  },
} satisfies SiteContent;
