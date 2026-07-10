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
    id: "bestfriend-1",
    src: "https://picsum.photos/seed/graduation-bestfriend-1/1200/800",
    alt: "Foto Wisuda Sahabat Outdoor - Momen Lempar Toga Bersama",
    width: 1200,
    height: 800,
    category: "bestfriend",
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
    id: "pkg-personal",
    name: "Wisuda Personal",
    slug: "wisuda-personal",
    description:
      "Sesi foto individu berfokus sepenuhnya pada potret kelulusan Anda secara eksklusif.",
    people: "1 Orang",
    duration: "1 Jam Sesi Foto",
    photos: "20 Foto Terpilih (Edited)",
    price: 350000,
    includes: [
      "1 Jam durasi pemotretan",
      "Unlimited shoots dalam durasi",
      "20 Foto retouch/edit resolusi tinggi",
      "Semua raw files diberikan via Google Drive",
      "1 Lokasi (area kampus/sekitar studio)",
    ],
  },
  {
    id: "pkg-couple",
    name: "Wisuda Couple",
    slug: "wisuda-couple",
    description:
      "Abadikan pencapaian kelulusan bersama pasangan atau partner tercinta Anda.",
    people: "2 Orang",
    duration: "1.5 Jam Sesi Foto",
    photos: "25 Foto Terpilih (Edited)",
    price: 500000,
    includes: [
      "1.5 Jam durasi pemotretan",
      "Unlimited shoots dalam durasi",
      "25 Foto retouch/edit resolusi tinggi",
      "Semua raw files diberikan via Google Drive",
      "Foto individu masing-masing + foto couple",
    ],
  },
  {
    id: "pkg-bestfriend",
    name: "Wisuda Best Friend",
    slug: "wisuda-best-friend",
    description:
      "Sesi foto grup sahabat dekat untuk merayakan kelulusan bersama-sama.",
    people: "3-5 Orang",
    duration: "2 Jam Sesi Foto",
    photos: "35 Foto Terpilih (Edited)",
    price: 750000,
    includes: [
      "2 Jam durasi pemotretan",
      "Unlimited shoots dalam durasi",
      "35 Foto retouch/edit resolusi tinggi",
      "Semua raw files diberikan via Google Drive",
      "Foto grup + foto individu masing-masing",
    ],
  },
  {
    id: "pkg-group",
    name: "Wisuda Group",
    slug: "wisuda-group",
    description: "Pilihan terbaik untuk kelompok besar atau satu kelas kecil.",
    people: "6-10 Orang",
    duration: "2.5 Jam Sesi Foto",
    photos: "50 Foto Terpilih (Edited)",
    price: 1200000,
    includes: [
      "2.5 Jam durasi pemotretan",
      "Unlimited shoots dalam durasi",
      "50 Foto retouch/edit resolusi tinggi",
      "Semua raw files diberikan via Google Drive",
      "Group posing & fun dynamic group shots",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-1",
    name: "Sarah Amanda",
    university: "Universitas Indonesia",
    quote:
      "Hasil fotonya sangat sinematik dan tajam. Arahan gayanya santai sehingga tidak canggung.",
    package: "Wisuda Personal",
  },
  {
    id: "testi-2",
    name: "Dimas & Aurelia",
    university: "Institut Teknologi Bandung",
    quote:
      "Sangat sabar mengarahkan pose wisuda couple kami. Pengiriman file cepat lewat Google Drive.",
    package: "Wisuda Couple",
  },
  {
    id: "testi-3",
    name: "Rian & Geng Toga",
    university: "Universitas Gadjah Mada",
    quote:
      "Momen seru lempar toga tertangkap dengan sempurna. Kualitas foto di luar ekspektasi kami.",
    package: "Wisuda Best Friend",
  },
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "Kapan saya harus melakukan booking?",
    answer:
      "Kami menyarankan Anda melakukan booking minimal 2-4 minggu sebelum tanggal wisuda untuk mengamankan slot waktu.",
  },
  {
    id: "faq-2",
    question:
      "Apakah biaya di atas sudah termasuk biaya sewa lokasi atau studio?",
    answer:
      "Belum. Harga paket belum termasuk tiket masuk lokasi outdoor atau sewa studio jika pemotretan dilakukan di studio berbayar.",
  },
  {
    id: "faq-3",
    question: "Berapa lama proses edit dan penyerahan file foto?",
    answer:
      "Proses edit foto membutuhkan waktu 7-14 hari kerja. Semua raw file akan dikirimkan maksimal 3 hari setelah pemotretan selesai.",
  },
  {
    id: "faq-4",
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Pembayaran dilakukan dengan membayar Down Payment (DP) sebesar 50% saat konfirmasi booking, dan pelunasan sisanya dilakukan pada hari H sesi foto.",
  },
];
