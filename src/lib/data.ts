import type { FAQ, Package, PortfolioImage, Testimonial } from "./types";

export const PORTFOLIO_IMAGES: PortfolioImage[] = [
  {
    id: "personal-1",
    src: "https://picsum.photos/seed/graduation-personal-1/800/1200",
    alt: "Foto Wisuda Personal Studio - Portrait Kelulusan Tunggal",
    width: 800,
    height: 1200,
    category: "personal",
    featured: true,
  },
  {
    id: "couple-1",
    src: "https://picsum.photos/seed/graduation-couple-1/800/1200",
    alt: "Foto Wisuda Couple - Dokumentasi Wisuda Pasangan Romantis",
    width: 800,
    height: 1200,
    category: "couple",
    featured: true,
  },
  {
    id: "wedding-1",
    src: "https://picsum.photos/seed/wedding-moment-1/1200/800",
    alt: "Foto Wedding - Dokumentasi Momen Pernikahan Sinematik",
    width: 1200,
    height: 800,
    category: "wedding",
    featured: true,
  },
  {
    id: "family-1",
    src: "https://picsum.photos/seed/graduation-family-1/1200/800",
    alt: "Foto Wisuda Keluarga - Momen Hangat Bersama Orang Tua",
    width: 1200,
    height: 800,
    category: "family",
    featured: true,
  },
  {
    id: "personal-2",
    src: "https://picsum.photos/seed/graduation-personal-2/800/1200",
    alt: "Foto Wisuda Personal Outdoor - Pose Membawa Ijazah",
    width: 800,
    height: 1200,
    category: "personal",
  },
  {
    id: "group-1",
    src: "https://picsum.photos/seed/graduation-group-1/1200/800",
    alt: "Foto Wisuda Group - Kelompok Kelas Kelulusan Besar",
    width: 1200,
    height: 800,
    category: "group",
  },
  {
    id: "couple-2",
    src: "https://picsum.photos/seed/graduation-couple-2/800/1200",
    alt: "Foto Wisuda Couple Outdoor - Pose Bersanding Bahagia",
    width: 800,
    height: 1200,
    category: "couple",
  },
  {
    id: "wedding-2",
    src: "https://picsum.photos/seed/wedding-moment-2/800/1200",
    alt: "Foto Wedding Outdoor - Sesi Pemotretan Pasangan Pengantin",
    width: 800,
    height: 1200,
    category: "wedding",
  },
  {
    id: "personal-3",
    src: "https://picsum.photos/seed/graduation-personal-3/800/1200",
    alt: "Foto Wisuda Personal Studio - Ekspresi Kelulusan Ceria",
    width: 800,
    height: 1200,
    category: "personal",
  },
];

export const PACKAGES: Package[] = [
  {
    id: "pkg-bronze",
    name: "Omegraduation Bronze",
    slug: "omegraduation-bronze",
    description:
      "Paket hemat untuk mengabadikan momen wisuda bersama keluarga dan sahabat.",
    people: "1 Wisudawan + Family & Friends",
    duration: "1 Jam Sesi Foto",
    photos: "35 Foto Editing",
    includes: [
      "1 hour session",
      "1 graduation",
      "Family & friends",
      "Multiple spots",
      "35 editing",
      "All soft file edit di Google Drive (disimpan 1 bulan)",
    ],
  },
  {
    id: "pkg-silver",
    name: "Omegraduation Silver",
    slug: "omegraduation-silver",
    description:
      "Semua keunggulan Bronze ditambah sameday edit untuk kebutuhan posting di hari yang sama.",
    people: "1 Wisudawan + Family & Friends",
    duration: "1 Jam Sesi Foto",
    photos: "35 Foto Editing",
    includes: [
      "1 hour session",
      "1 graduation",
      "Family & friends",
      "Multiple spots",
      "35 editing",
      "Sameday edit 15 file (max dikirim jam 23.50)",
      "All soft file edit di Google Drive (disimpan 1 bulan)",
    ],
  },
  {
    id: "pkg-couple",
    name: "Omegraduation Couple",
    slug: "omegraduation-couple",
    description:
      "Rayakan kelulusan berdua bersama pasangan dalam satu sesi foto romantis.",
    people: "1-2 Wisudawan (Berpasangan)",
    duration: "1 Jam Sesi Foto",
    photos: "35 Foto Editing",
    includes: [
      "1 hour session",
      "1-2 graduation",
      "Berpasangan",
      "Multiple spots",
      "35 editing",
      "All soft file edit di Google Drive (disimpan 1 bulan)",
    ],
  },
  {
    id: "pkg-luxury-1",
    name: "Omegraduation Luxury 1",
    slug: "omegraduation-luxury-1",
    description:
      "Sesi lebih panjang dengan 2 lokasi untuk hasil foto yang lebih variatif.",
    people: "1 Wisudawan + Family & Friends",
    duration: "1,5 Jam Sesi Foto",
    photos: "65 Foto Editing",
    includes: [
      "1,5 hour session",
      "1 graduation",
      "Family & friends",
      "2 lokasi",
      "Multiple spots",
      "65 editing",
      "All soft file edit di Google Drive (disimpan 1 bulan)",
    ],
  },
  {
    id: "pkg-luxury-2",
    name: "Omegraduation Luxury 2",
    slug: "omegraduation-luxury-2",
    description:
      "Durasi 2 jam, 2 lokasi, plus sameday edit dan penyimpanan Google Drive lebih lama.",
    people: "1 Wisudawan + Family & Friends",
    duration: "2 Jam Sesi Foto",
    photos: "85 Foto Editing",
    includes: [
      "2 hour session",
      "1 graduation",
      "Family & friends",
      "2 lokasi",
      "Multiple spots",
      "85 editing",
      "Sameday edit 15 file (max dikirim jam 23.50)",
      "All soft file edit di Google Drive (disimpan 2 bulan)",
    ],
  },
  {
    id: "pkg-luxury-3",
    name: "Omegraduation Luxury 3",
    slug: "omegraduation-luxury-3",
    description:
      "Paket paling lengkap: 2,5 jam, 3 lokasi, 100 foto editing, dan sameday edit.",
    people: "1 Wisudawan + Family & Friends",
    duration: "2,5 Jam Sesi Foto",
    photos: "100 Foto Editing",
    includes: [
      "2,5 hour session",
      "1 graduation",
      "Family & friends",
      "3 lokasi",
      "Multiple spots",
      "100 editing",
      "Sameday edit 15 file (max dikirim jam 23.50)",
      "All soft file edit di Google Drive (disimpan 2 bulan)",
    ],
  },
  {
    id: "pkg-grub-1",
    name: "Omegraduation Grub 1",
    slug: "omegraduation-grub-1",
    description: "Sesi foto grup untuk 2 sampai 5 wisudawan bersama-sama.",
    people: "2-5 Wisudawan",
    duration: "1 Jam Sesi Foto",
    photos: "50 Foto Editing",
    includes: [
      "1 hour session",
      "2-5 graduation",
      "Multiple spots",
      "50 editing",
      "All soft file edit di Google Drive (disimpan 1 bulan)",
    ],
  },
  {
    id: "pkg-grub-2",
    name: "Omegraduation Grub 2",
    slug: "omegraduation-grub-2",
    description: "Sesi foto grup untuk 3 sampai 7 wisudawan bersama-sama.",
    people: "3-7 Wisudawan",
    duration: "1 Jam Sesi Foto",
    photos: "60 Foto Editing",
    includes: [
      "1 hour session",
      "3-7 graduation",
      "Multiple spots",
      "60 editing",
      "All soft file edit di Google Drive (disimpan 1 bulan)",
    ],
  },
  {
    id: "pkg-grub-3",
    name: "Omegraduation Grub 3",
    slug: "omegraduation-grub-3",
    description:
      "Sesi foto grup terbesar untuk 3 sampai 9 wisudawan dengan durasi 2 jam.",
    people: "3-9 Wisudawan",
    duration: "2 Jam Sesi Foto",
    photos: "80 Foto Editing",
    includes: [
      "2 hour session",
      "3-9 graduation",
      "Multiple spots",
      "80 editing",
      "All soft file edit di Google Drive (disimpan 1 bulan)",
    ],
  },
];

export const PACKAGES_NOTE = "Add wisudawan 100K per orang.";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-1",
    name: "Sarah Amanda",
    university: "Universitas Indonesia",
    quote:
      "Hasil fotonya sangat sinematik dan tajam. Arahan gayanya santai sehingga tidak canggung.",
    package: "Omegraduation Bronze",
  },
  {
    id: "testi-2",
    name: "Dimas & Aurelia",
    university: "Institut Teknologi Bandung",
    quote:
      "Sangat sabar mengarahkan pose wisuda couple kami. Pengiriman file cepat lewat Google Drive.",
    package: "Omegraduation Couple",
  },
  {
    id: "testi-3",
    name: "Rian & Geng Toga",
    university: "Universitas Gadjah Mada",
    quote:
      "Momen seru lempar toga tertangkap dengan sempurna. Kualitas foto di luar ekspektasi kami.",
    package: "Omegraduation Grub 1",
  },
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "Kapan saya harus melakukan booking?",
    answer:
      "Kami menyarankan Anda melakukan booking minimal 2-4 minggu sebelum tanggal pemotretan untuk mengamankan slot waktu.",
  },
  {
    id: "faq-2",
    question: "Apakah harga paket sudah termasuk biaya transport?",
    answer:
      "Sudah. Semua paket sudah include transport untuk area Solo, Semarang, Jogja, Salatiga, dan Kudus.",
  },
  {
    id: "faq-3",
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "DP Rp 150.000 untuk paket selain Luxury dan Grub, DP Rp 250.000 untuk paket Luxury. Pelunasan dilakukan H-1 sebelum jam 21.00. Pembayaran hangus apabila ada pembatalan atau reschedule dari client.",
  },
  {
    id: "faq-4",
    question: "Kapan file foto saya dikirim?",
    answer:
      "Semua file foto diproses maksimal H+1 jam 12.00 dan link foto akan dikirim oleh admin. Paket Silver, Luxury 2, dan Luxury 3 mendapat sameday edit 15 file (maksimal dikirim jam 23.50). Semua soft file edit disimpan di Google Drive selama 1 bulan (Luxury 2 dan Luxury 3 selama 2 bulan).",
  },
  {
    id: "faq-5",
    question: "Bagaimana jika durasi sesi foto kurang?",
    answer:
      "Bisa extra time 30 menit Rp 175.000 (paket Grub Rp 250.000) apabila fotografer tidak ada jadwal di jam berikutnya. Durasi dihitung sesuai jam booking, termasuk saat pindah lokasi.",
  },
  {
    id: "faq-6",
    question: "Bolehkah menambah jumlah wisudawan dalam satu sesi?",
    answer:
      "Boleh. Tambahan wisudawan dikenakan biaya Rp 100.000 per orang. Konfirmasikan jumlah peserta ke admin saat booking.",
  },
  {
    id: "faq-7",
    question: "Apakah bisa foto sesi malam?",
    answer:
      "Bisa. Silakan konfirmasi jadwal sesi malam ke admin saat booking. Anda juga boleh menginfokan kebaya atau outfit ke admin agar bisa diarahkan sesuai tone foto kami.",
  },
];
