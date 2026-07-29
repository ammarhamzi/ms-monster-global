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
    home: 'Laman utama',
    about: 'Tentang',
    services: 'Perkhidmatan',
    aroma: 'Penyelesaian aroma komersial',
    diffusers: 'Diffuser aroma',
    fragrance: 'Wangian tersuai',
    it: 'Penyelenggaraan IT',
    downloads: 'Muat turun',
    contact: 'Hubungi',
  },
  home: {
    eyebrow: SITE.legalName,
    title: 'Penyelesaian aroma dan penyelenggaraan teknologi untuk kesinambungan operasi.',
    introduction:
      'MS Monster Global membantu organisasi membentuk ruang yang terancang melalui penyelesaian aroma komersial dan menyelenggara teknologi yang menyokong operasi harian.',
    aromaLink: { label: 'Teroka penyelesaian aroma' },
    itLink: { label: 'Teroka penyelenggaraan IT' },
    overviewEyebrow: 'Dua bahagian khusus',
    overviewTitle: 'Sokongan praktikal untuk ruang dan sistem.',
    overviewDescription:
      'Pilih bahagian yang sepadan dengan keperluan anda. Setiap laluan menerangkan skop yang tersedia dan menyediakan cara terus untuk membincangkan langkah seterusnya.',
    divisions: [
      {
        key: 'aroma',
        title: 'Penyelesaian aroma komersial',
        description:
          'Rancang arah haruman, pilih diffuser yang sesuai, dan kekalkan pengalaman aroma yang konsisten untuk persekitaran komersial.',
        items: [
          'Penilaian ruang dan aroma',
          'Pemilihan diffuser komersial',
          'Pembangunan wangian tersuai',
        ],
        link: { label: 'Lihat penyelesaian aroma' },
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
      'Syarikat ini menggabungkan dua bidang perkhidmatan khusus dengan skop yang jelas, saluran hubungan terus, dan profil sumber yang boleh dimuat turun.',
    operationsItems: [
      `${SITE.legalName}, berdaftar sebagai ${SITE.registrationNumber}`,
      `Berpangkalan di ${SITE.address.addressLocality}, ${SITE.address.addressRegion}`,
      'Laluan khusus untuk keperluan teknologi dan aroma komersial',
      'Profil syarikat dan maklumat produk tersedia sebagai muat turun PDF',
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
      'MS Monster Global Sdn Bhd ialah syarikat berpangkalan di Malaysia dengan dua bahagian perniagaan: servis penyelenggaraan IT dan AI yang praktikal, serta penyelesaian aroma komersial untuk persekitaran perniagaan.',
    incorporation:
      `${SITE.legalName} diperbadankan pada 16 November 2022. Aktiviti terdahulu merupakan akar perniagaan sebelum penubuhan Sdn Bhd.`,
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
          'Menjadikan penyelesaian aroma komersial lebih mudah dicapai dan menjadi rakan penyelenggaraan teknologi yang dipercayai untuk kesinambungan serta pertumbuhan perniagaan.',
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
        key: 'aroma',
        title: 'Penyelesaian aroma komersial',
        description:
          'Konsultasi aroma, pemadanan diffuser, bekalan wangian, pembangunan haruman tersuai, isian semula, pelarasan, dan sokongan penyelenggaraan.',
        items: ['Perancangan aroma', 'Sistem diffuser', 'Wangian tersuai'],
        link: { label: 'Teroka perkhidmatan aroma' },
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
        'Hubungi pasukan di Nilai tentang penyelenggaraan IT, penyelesaian aroma komersial, dokumen syarikat, atau maklumat produk.',
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
  aroma: {
    breadcrumb: 'Penyelesaian aroma komersial',
    eyebrow: 'Monster Perfume',
    title: 'Penyelesaian Aroma Komersial',
    introduction:
      'Rancang pengalaman aroma mengikut sifat sesuatu ruang, kemudian padankannya dengan pendekatan diffuser, isian semula, pelarasan, dan penyelenggaraan yang praktikal.',
    primaryLink: { label: 'Minta cadangan' },
    secondaryLink: { label: 'Teroka sistem diffuser' },
    assessmentEyebrow: 'Penilaian ruang',
    assessmentTitle: 'Mulakan dengan persekitaran dan pengalaman yang diingini.',
    assessmentDescription:
      'Pertimbangkan jenis ruang, aliran pelanggan, keperluan liputan, pengudaraan, dan suasana yang anda mahu diingati.',
    spaces: [
      {
        title: 'Persekitaran lebih kecil',
        description: 'Bilik persendirian, salon, kafe, dan ruang runcit yang lebih kecil.',
        imageAlt: 'Ruang butik dengan diffuser aroma terpasang pada dinding',
      },
      {
        title: 'Persekitaran komersial',
        description: 'Butik, bilik pameran, restoran, pejabat, dan studio kecergasan.',
        imageAlt: 'Ruang sambut tetamu pejabat dengan diffuser aroma komersial',
      },
      {
        title: 'Persekitaran berkongsi dan hospitaliti',
        description: 'Hotel, ruang legar, tempat acara, dan persekitaran yang disambungkan kepada HVAC.',
        imageAlt: 'Ruang legar hotel dengan diffuser aroma yang disepadukan dalam ruang dalaman',
      },
    ],
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
    mountingLabel: 'Kaedah pemasangan',
    suitableForLabel: 'Sesuai untuk',
    confirmLink: { label: 'Sahkan kesesuaian' },
    facebookLink: { label: 'Ikuti Monster Perfume di Facebook' },
  },
  fragrance: {
    breadcrumb: 'Wangian tersuai',
    eyebrow: 'Pembangunan wangian tersuai',
    title: 'Bentuk identiti haruman mengikut pengalaman',
    introduction:
      'Teroka arah wangian, semak pilihan bahan, bangunkan sampel, dan perhalus hasil untuk produk atau persekitaran yang dimaksudkan.',
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
    title: 'Profil syarikat dan brosur',
    introduction:
      'Buka atau muat turun PDF sumber untuk gambaran syarikat, servis penyelenggaraan IT, kerja aroma, dan produk diffuser terdokumen.',
    documentsEyebrow: 'Dokumen sumber',
    documentsTitle: 'Pilih profil yang sepadan dengan keperluan anda.',
    documents: [
      {
        title: 'Profil Syarikat Servis Penyelenggaraan IT',
        description:
          'Gambaran skop penyelenggaraan IT dan AI, nilai syarikat, dan konteks perkhidmatan.',
        href: '/downloads/ms-monster-it-maintenance-profile.pdf',
        meta: 'PDF 8 halaman',
      },
      {
        title: 'Profil Syarikat Minyak Wangi & Aroma',
        description:
          'Latar syarikat dan maklumat tentang kerja aroma, bahan wangian, produk, dan projek.',
        href: '/downloads/ms-monster-perfume-profile.pdf',
        meta: 'PDF 17 halaman',
      },
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
      title: 'Perlukan bantuan memilih profil yang sesuai?',
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
      'Hubungi pasukan di Nilai tentang penyelenggaraan teknologi, penyelesaian aroma komersial, produk diffuser, wangian tersuai, atau maklumat syarikat.',
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
    aromaLink: { label: 'Semak penyelesaian aroma' },
    itLink: { label: 'Semak penyelenggaraan IT' },
  },
  footer: {
    summary:
      'Penyelenggaraan IT dan penyelesaian aroma komersial yang praktikal untuk persekitaran perniagaan.',
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
