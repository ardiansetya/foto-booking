import type { StaticImageData } from "next/image";
import type { FAQ, Package, PortfolioImage, Testimonial } from "./types";

// Personal (solo)
import solo1 from "@/assets/images/solo/IMG_8156.webp";
import solo2 from "@/assets/images/solo/ERC00884.webp";
import solo3 from "@/assets/images/solo/ERC00594.webp";
import solo4 from "@/assets/images/solo/ACP08747.webp";
import solo5 from "@/assets/images/solo/ERC02862.webp";
import solo6 from "@/assets/images/solo/ISA04185.webp";
import solo7 from "@/assets/images/solo/IMG_8121.webp";
import solo8 from "@/assets/images/solo/IMG_8114.webp";
import solo9 from "@/assets/images/solo/ERC00239.webp";
import solo10 from "@/assets/images/solo/ERC00112.webp";
import solo11 from "@/assets/images/solo/IMG_1405.webp";
import solo12 from "@/assets/images/solo/RYN00342.webp";
// Couple
import couple1 from "@/assets/images/couple/IMG_3868.webp";
import couple2 from "@/assets/images/couple/DSN03443.webp";
import couple3 from "@/assets/images/couple/ERC00416.webp";
import couple4 from "@/assets/images/couple/ERC00418.webp";
import couple5 from "@/assets/images/couple/ERC00420.webp";
import couple6 from "@/assets/images/couple/ERC02904.webp";
import couple7 from "@/assets/images/couple/ERC02908.webp";
// Family (fam)
import fam1 from "@/assets/images/fam/ACP00161.webp";
import fam2 from "@/assets/images/fam/ACP00222.webp";
import fam3 from "@/assets/images/fam/ACP00256.webp";
import fam5 from "@/assets/images/fam/ERC00004.webp";
import fam6 from "@/assets/images/fam/ERC00161.webp";
import fam7 from "@/assets/images/fam/ERC00456.webp";
import fam8 from "@/assets/images/fam/ERC02957.webp";
import fam9 from "@/assets/images/fam/ERC07612.webp";
import fam10 from "@/assets/images/fam/ERC07695.webp";
import fam11 from "@/assets/images/fam/IMG_1260.webp";
import fam12 from "@/assets/images/fam/ktm.webp";
import fam13 from "@/assets/images/fam/RYN00101.webp";
import fam14 from "@/assets/images/fam/ZYDN4107.webp";
// Group (grub)
import grub1 from "@/assets/images/grub/ERC07921.webp";
import grub2 from "@/assets/images/grub/ERC00191.webp";
// Wedding
import wedding1 from "@/assets/images/wedding/ERC00486.webp";
import wedding2 from "@/assets/images/wedding/ERC00459.webp";
import wedding3 from "@/assets/images/wedding/ERC00471.webp";
import wedding4 from "@/assets/images/wedding/ERC00505.webp";
import wedding5 from "@/assets/images/wedding/ERC00508.webp";

// Hero landscape 16:9 (object-cover crops to fit)
export const HERO_IMAGE: StaticImageData = grub1;

const personal: StaticImageData[] = [
  solo1,
  solo2,
  solo3,
  solo4,
  solo5,
  solo6,
  solo7,
  solo8,
  solo9,
  solo10,
  solo11,
  solo12,
];
const couple: StaticImageData[] = [
  couple1,
  couple2,
  couple3,
  couple4,
  couple5,
  couple6,
  couple7,
];
const family: StaticImageData[] = [
  fam1,
  fam2,
  fam3,
  fam5,
  fam6,
  fam7,
  fam8,
  fam9,
  fam10,
  fam11,
  fam12,
  fam13,
  fam14,
];
const group: StaticImageData[] = [grub1, grub2];
const wedding: StaticImageData[] = [
  wedding1,
  wedding2,
  wedding3,
  wedding4,
  wedding5,
];

const CATEGORY_META: Record<
  PortfolioImage["category"],
  { images: StaticImageData[]; alt: string }
> = {
  personal: { images: personal, alt: "Foto Wisuda Personal" },
  couple: { images: couple, alt: "Foto Wisuda Couple" },
  family: { images: family, alt: "Foto Wisuda Bersama Keluarga" },
  group: { images: group, alt: "Foto Wisuda Group" },
  wedding: { images: wedding, alt: "Foto Wedding" },
};

// One featured photo per category for the home "Momen Pilihan" section.
const FEATURED_INDEX: Partial<Record<PortfolioImage["category"], number>> = {
  personal: 0,
  couple: 0,
  family: 0,
  group: 0,
  wedding: 0,
};

export const PORTFOLIO_IMAGES: PortfolioImage[] = (
  Object.keys(CATEGORY_META) as PortfolioImage["category"][]
).flatMap((category) => {
  const { images, alt } = CATEGORY_META[category];
  return images.map((src, i) => ({
    id: `${category}-${i + 1}`,
    src,
    alt: `${alt} ${i + 1}`,
    category,
    featured: FEATURED_INDEX[category] === i,
  }));
});

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
