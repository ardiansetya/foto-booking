# PROMPT PERENCANAAN PROYEK — REDESIGN WEBSITE FOTOGRAFI WISUDA

## PERAN DAN TUJUAN UTAMA

Kamu adalah AI Agent yang bertindak sebagai:

* Senior Product Designer
* UI/UX Designer
* UX Strategist
* Creative Web Designer
* Senior Frontend Engineer
* Senior Next.js Engineer
* Web Performance Engineer

Tugasmu adalah melakukan ANALISIS dan PERENCANAAN lengkap untuk redesign serta redevelopment website fotografi wisuda yang terinspirasi dari website berikut:

Website referensi:

https://www.gradspixel.com/

PENTING:

Jangan menyalin desain visual, layout, struktur komponen, warna, tipografi, animasi, atau implementasi teknis dari website referensi.

Gunakan website tersebut hanya untuk memahami:

* jenis bisnis
* layanan yang ditawarkan
* target pengguna
* jenis konten
* alur pengguna
* struktur informasi yang sudah tersedia
* kelebihan dan kekurangan website saat ini

Website baru harus memiliki kualitas desain, pengalaman pengguna, performa, struktur konten, dan tingkat profesionalitas yang jauh lebih baik dibandingkan website saat ini.

Pada tahap ini:

JANGAN langsung membuat kode implementasi.

Tugas pertama adalah melakukan analisis, eksplorasi, dan perencanaan secara menyeluruh sebelum proses development dimulai.

---

# 1. KONTEKS PROYEK

Website ini merupakan website untuk bisnis jasa fotografi wisuda.

Website saat ini secara umum memiliki konten:

* Home
* Gallery
* SOP
* Tentang
* Informasi harga
* Media sosial
* Informasi kontak

Website baru harus dikembangkan menjadi sebuah digital experience yang berfungsi sebagai:

1. Portfolio fotografi profesional
2. Showcase kualitas fotografi
3. Media untuk membangun kepercayaan calon pelanggan
4. Media untuk menjelaskan layanan
5. Media untuk menjelaskan proses booking
6. Media untuk menghasilkan leads
7. Media untuk mendorong calon pelanggan melakukan booking

Tujuan utama website:

PENGUNJUNG DATANG
→ MELIHAT KUALITAS FOTO
→ MEMAHAMI GAYA FOTOGRAFI
→ MEMAHAMI LAYANAN
→ MEMILIH PAKET
→ MEMAHAMI PROSES BOOKING
→ MENGECEK KETERSEDIAAN
→ MENGHUBUNGI FOTOGRAFER
→ MELAKUKAN BOOKING

Website tidak boleh hanya menjadi galeri foto.

Website harus mampu membantu calon pelanggan mengambil keputusan.

---

# 2. TARGET PENGGUNA

Target utama:

* Mahasiswa Indonesia
* Mahasiswa tingkat akhir
* Mahasiswa yang sedang mempersiapkan wisuda
* Fresh graduate
* Individu yang membutuhkan sesi foto wisuda
* Pasangan
* Kelompok teman
* Keluarga yang ingin mendokumentasikan momen wisuda

Karakteristik pengguna:

* Mayoritas menggunakan smartphone
* Sangat mempertimbangkan kualitas visual
* Sering menemukan fotografer melalui Instagram dan TikTok
* Membandingkan gaya fotografi sebelum membandingkan harga
* Membutuhkan bukti kualitas melalui portfolio
* Membutuhkan informasi harga yang jelas
* Membutuhkan informasi proses booking yang mudah dipahami
* Lebih nyaman berkomunikasi melalui WhatsApp
* Cenderung mengambil keputusan berdasarkan visual, kepercayaan, dan kemudahan booking

Website harus mampu membuat pengguna berpikir:

“Fotografer ini terlihat profesional.”

“Hasil fotonya sesuai dengan yang saya inginkan.”

“Informasi layanan dan harganya jelas.”

“Proses booking-nya mudah.”

“Saya yakin untuk menghubungi fotografer ini.”

---

# 3. PRINSIP DESAIN

Jangan langsung menggunakan gaya desain tertentu.

Sebelum menentukan desain:

1. Analisis karakter bisnis.
2. Analisis target pengguna.
3. Analisis jenis fotografi.
4. Analisis konten yang tersedia.
5. Analisis tujuan bisnis.
6. Analisis pengalaman pengguna yang ingin dibangun.
7. Analisis website kompetitor dan referensi relevan jika diperlukan.

Setelah analisis selesai, tentukan sendiri arah desain yang paling tepat.

Desain harus:

* memiliki identitas visual yang kuat
* terasa dibuat khusus untuk bisnis ini
* menonjolkan hasil fotografi
* tidak terlihat seperti template
* tidak terlihat seperti website SaaS
* tidak terlihat seperti hasil AI generik
* memiliki hierarki visual yang jelas
* nyaman digunakan pada mobile
* mendukung tujuan conversion
* tetap memiliki performa yang baik

Hindari:

* desain template generik
* layout SaaS
* penggunaan card secara berlebihan
* semua elemen berada di dalam container rounded
* penggunaan gradient tanpa alasan
* efek visual hanya karena terlihat menarik
* animasi berlebihan
* terlalu banyak elemen dekoratif
* layout yang membuat foto kehilangan fokus
* desain yang mengikuti tren tanpa alasan UX yang jelas

Setiap keputusan desain harus memiliki alasan.

---

# 4. EKSPLORASI VISUAL

Pada tahap perencanaan, lakukan eksplorasi terhadap beberapa kemungkinan arah desain.

Jangan langsung memilih satu gaya.

Buat minimal 3 arah desain yang berbeda.

Untuk setiap arah desain, jelaskan:

* konsep utama
* karakter visual
* emosi yang ingin dibangun
* bagaimana fotografi ditampilkan
* pendekatan layout
* pendekatan tipografi
* pendekatan warna
* pendekatan spacing
* pendekatan motion
* kelebihan
* kekurangan
* kesesuaian dengan target pengguna
* dampaknya terhadap conversion

Setelah itu:

1. Bandingkan ketiga arah desain.
2. Pilih satu arah terbaik.
3. Jelaskan alasan pemilihannya.
4. Jelaskan mengapa arah tersebut lebih tepat dibandingkan alternatif lainnya.

Jangan menentukan warna sebelum analisis dilakukan.

Jangan menentukan font sebelum analisis dilakukan.

Jangan mengikuti warna website lama secara otomatis.

AI Agent memiliki kebebasan untuk menentukan:

* color system
* typography
* visual direction
* layout system
* image treatment
* motion direction

Namun semua keputusan harus didasarkan pada hasil analisis.

---

# 5. TEKNOLOGI

Gunakan:

* Next.js terbaru
* App Router
* TypeScript
* Tailwind CSS
* shadcn/ui hanya jika benar-benar dibutuhkan
* Motion for React jika animasi dibutuhkan
* Lucide React jika icon dibutuhkan
* Next.js Image untuk optimasi gambar

Prinsip implementasi:

* Server Components sebagai default
* Client Components hanya untuk interaksi
* Hindari penggunaan `"use client"` tanpa alasan
* Gunakan Static Generation untuk halaman konten jika memungkinkan
* Optimalkan pengiriman gambar
* Gunakan metadata yang baik
* Buat arsitektur komponen yang reusable
* Hindari over-engineering

Jangan menambahkan backend tanpa kebutuhan nyata.

Jangan menambahkan database tanpa kebutuhan nyata.

Jangan menambahkan CMS tanpa kebutuhan nyata.

Setiap dependency tambahan harus memiliki alasan.

---

# 6. ANALISIS WEBSITE SAAT INI

Analisis website referensi secara menyeluruh.

Evaluasi:

## Informasi

* Apakah informasi mudah ditemukan?
* Apakah struktur konten sudah logis?
* Apakah ada informasi penting yang hilang?
* Apakah pengguna memahami layanan?

## UX

* Apakah alur pengguna jelas?
* Apakah pengguna mengetahui langkah berikutnya?
* Apakah CTA efektif?
* Apakah proses booking mudah dipahami?

## Visual

* Apakah hasil fotografi menjadi fokus?
* Apakah website membangun persepsi profesional?
* Apakah desain memiliki identitas?

## Conversion

* Apakah website mendorong pengguna untuk menghubungi fotografer?
* Apakah terdapat hambatan sebelum booking?
* Apakah informasi harga cukup jelas?
* Apakah social proof cukup kuat?

## Mobile

* Apakah pengalaman mobile optimal?
* Apakah galeri nyaman digunakan?
* Apakah CTA mudah dijangkau?

## Performance

* Identifikasi kemungkinan masalah performa.
* Identifikasi risiko dari penggunaan gambar berukuran besar.

Buat daftar:

* masalah utama
* masalah sekunder
* peluang peningkatan
* prioritas redesign

---

# 7. USER JOURNEY

Buat user journey utama.

Contoh awal:

DISCOVERY
→ FIRST IMPRESSION
→ PORTFOLIO EXPLORATION
→ SERVICE EVALUATION
→ PRICE CONSIDERATION
→ TRUST BUILDING
→ AVAILABILITY CHECK
→ CONTACT
→ BOOKING

Jangan langsung menggunakan alur tersebut.

Analisis dan perbaiki jika diperlukan.

Untuk setiap tahap jelaskan:

* tujuan pengguna
* pertanyaan pengguna
* informasi yang dibutuhkan
* kemungkinan hambatan
* solusi UX
* CTA yang tepat

---

# 8. INFORMATION ARCHITECTURE

Analisis struktur halaman yang paling tepat.

Kemungkinan halaman:

* Home
* Portfolio
* Detail Story
* Packages
* Booking Process / SOP
* About
* FAQ

Evaluasi apakah semua halaman tersebut dibutuhkan.

Pertimbangkan:

* apakah beberapa halaman sebaiknya digabung
* apakah halaman tertentu terlalu sedikit kontennya
* apakah informasi lebih efektif ditampilkan di homepage
* apakah navigasi terlalu kompleks

Buat sitemap final berdasarkan analisis.

Untuk setiap halaman jelaskan:

* tujuan
* target pengguna
* informasi utama
* CTA utama
* hubungan dengan halaman lain

---

# 9. HOMEPAGE

Homepage harus memiliki alur storytelling yang kuat.

Jangan langsung menggunakan urutan section standar.

Tentukan urutan berdasarkan:

* user journey
* kebutuhan informasi
* tingkat kepercayaan pengguna
* conversion funnel

Pertimbangkan section seperti:

* Navigation
* Hero
* Selected Works
* Brand Positioning
* Featured Stories
* Photography Categories
* Services
* Packages
* Booking Process
* Testimonials
* Social Proof
* FAQ
* Final CTA
* Footer

Tidak semua section harus digunakan.

Tentukan:

1. Section yang dibutuhkan.
2. Section yang tidak dibutuhkan.
3. Urutan section.
4. Tujuan setiap section.
5. Informasi yang ditampilkan.
6. Interaksi yang dibutuhkan.
7. CTA.
8. Perilaku mobile.

Hindari homepage yang terlalu panjang tanpa alasan.

---

# 10. HERO SECTION

Hero merupakan bagian paling penting.

Jangan menggunakan pola default:

JUDUL
SUBJUDUL
DUA TOMBOL
GAMBAR

Eksplorasi beberapa pendekatan hero.

Pertimbangkan:

* bagaimana kualitas fotografi langsung terlihat
* bagaimana brand diperkenalkan
* bagaimana CTA ditampilkan
* bagaimana layout bekerja di mobile
* bagaimana performa gambar tetap terjaga

Buat minimal 3 konsep hero.

Untuk setiap konsep jelaskan:

* layout
* visual hierarchy
* penggunaan gambar
* copywriting
* CTA
* motion
* mobile behavior
* kelebihan
* kekurangan

Pilih satu konsep terbaik berdasarkan analisis.

---

# 11. PORTFOLIO DAN GALLERY

Portfolio merupakan bagian utama website.

Jangan menggunakan grid card standar.

Eksplorasi cara terbaik untuk menampilkan fotografi.

Pertimbangkan:

* editorial layout
* masonry
* asymmetric grid
* curated sequence
* story-based gallery
* fullscreen presentation

Fitur yang dapat dipertimbangkan:

* category filtering
* image lightbox
* keyboard navigation
* swipe navigation
* lazy loading
* image transition
* related stories

Tentukan fitur yang benar-benar diperlukan.

Prioritas:

1. Kualitas visual.
2. Kecepatan loading.
3. Kemudahan eksplorasi.
4. Pengalaman mobile.
5. Accessibility.

---

# 12. PHOTOGRAPHY STORY

Analisis apakah website membutuhkan halaman seperti:

/stories/[slug]

Halaman dapat berisi:

* hero image
* judul sesi
* nama klien
* universitas
* lokasi
* kategori
* kumpulan foto
* cerita singkat
* related stories
* booking CTA

Evaluasi:

* manfaat terhadap SEO
* manfaat terhadap storytelling
* manfaat terhadap conversion
* kompleksitas pengelolaan konten

Jika manfaat tidak sebanding dengan kompleksitas, jangan implementasikan.

---

# 13. PACKAGES DAN PRICING

Informasi harga harus:

* mudah ditemukan
* mudah dibandingkan
* transparan
* tidak membingungkan
* tetap sesuai dengan identitas visual website

Jangan otomatis menggunakan pricing card SaaS.

Analisis cara terbaik menampilkan:

* nama paket
* target pelanggan
* durasi
* jumlah peserta
* jumlah foto
* lokasi
* waktu delivery
* harga
* tambahan layanan

Pertimbangkan paket:

* Personal
* Couple
* Best Friend
* Group
* Family

Jangan gunakan semua jika tidak relevan.

---

# 14. BOOKING PROCESS / SOP

Transformasikan SOP menjadi pengalaman yang mudah dipahami.

Analisis proses booking sebenarnya.

Kemungkinan:

01 — Melihat Portfolio

02 — Memilih Layanan

03 — Mengecek Jadwal

04 — Menghubungi Fotografer

05 — Konfirmasi dan Pembayaran

06 — Persiapan Sesi

07 — Photo Session

08 — Delivery Foto

Sederhanakan jika terlalu panjang.

Untuk setiap langkah jelaskan:

* tindakan pengguna
* tindakan fotografer
* informasi yang dibutuhkan

---

# 15. MOBILE EXPERIENCE

Gunakan pendekatan mobile-first.

Analisis:

* navigation
* hero
* image cropping
* gallery
* pricing
* CTA
* lightbox
* booking flow

Pertimbangkan sticky booking CTA.

Namun evaluasi:

* apakah mengganggu konten
* kapan CTA muncul
* kapan CTA disembunyikan

Jangan hanya mengecilkan desktop layout.

Mobile harus dirancang sebagai pengalaman tersendiri.

---

# 16. MOTION DAN INTERACTION

Gunakan motion hanya jika meningkatkan pengalaman.

Pertimbangkan:

* image reveal
* text reveal
* hover interaction
* gallery transition
* navigation transition
* lightbox transition
* page transition

Untuk setiap animasi tentukan:

* tujuan
* trigger
* durasi
* easing
* perilaku mobile
* reduced motion behavior

Hindari:

* animation overload
* scroll hijacking
* animasi yang menghambat akses konten
* efek berat
* animasi tanpa fungsi

---

# 17. IMAGE ARCHITECTURE

Foto adalah aset paling penting.

Buat strategi pengelolaan gambar.

Analisis:

## Penyimpanan

Tentukan kapan menggunakan:

* /public
* image CDN
* cloud storage
* CMS

## Ukuran

Definisikan strategi untuk:

* thumbnail
* gallery preview
* hero
* fullscreen
* social sharing

## Optimasi

Gunakan:

* Next.js Image
* responsive sizes
* lazy loading
* priority hanya untuk gambar penting
* blur placeholder
* modern image format

Jangan mengirim gambar resolusi penuh jika tidak diperlukan.

Buat:

* struktur folder
* naming convention
* image metadata strategy
* alt text strategy

---

# 18. DESIGN SYSTEM

Setelah analisis dan eksplorasi visual selesai, buat design system.

Tentukan:

## Typography

* display
* heading
* body
* caption
* label

Jelaskan alasan pemilihan font.

## Color System

Tentukan:

* background
* foreground
* muted
* border
* accent
* interactive states

Jelaskan:

* alasan pemilihan
* hubungan dengan fotografi
* accessibility
* contrast

## Spacing

Tentukan:

* spacing scale
* section spacing
* container width
* content width

## Layout

Tentukan:

* grid
* column system
* breakpoints
* image proportions

## Components

Tentukan aturan untuk:

* buttons
* navigation
* links
* forms
* cards jika digunakan
* gallery
* lightbox

Jangan membuat design system sebelum eksplorasi selesai.

---

# 19. COMPONENT ARCHITECTURE

Rancang arsitektur komponen.

Kemungkinan:

components/

layout/

* Navbar
* MobileNavigation
* Footer

home/

* Hero
* SelectedWorks
* BrandStatement
* FeaturedStories
* Services
* BookingProcess
* Testimonials
* FinalCTA

portfolio/

* PortfolioGrid
* PortfolioFilter
* PortfolioItem
* ImageLightbox

shared/

* SectionHeading
* ResponsiveImage
* AnimatedText
* BookingCTA

Jangan langsung menggunakan struktur tersebut.

Analisis:

* component boundaries
* server vs client components
* reusable components
* page-specific components

Hindari abstraksi berlebihan.

---

# 20. NEXT.JS ARCHITECTURE

Buat struktur folder yang sesuai dengan App Router.

Jelaskan:

* route structure
* layout
* loading state
* error state
* metadata
* dynamic routes
* data layer
* components
* utilities

Tentukan komponen mana yang:

* Server Component
* Client Component

Setiap Client Component harus memiliki alasan.

---

# 21. CONTENT MODEL

Definisikan model data TypeScript untuk:

* PortfolioImage
* GalleryCategory
* PhotographyStory
* Package
* Testimonial
* FAQ
* SocialLink

Analisis tempat penyimpanan konten:

* TypeScript file
* JSON
* MDX
* CMS

Gunakan solusi paling sederhana yang memenuhi kebutuhan.

Jelaskan kapan website perlu bermigrasi ke CMS.

---

# 22. SEO

Buat strategi:

* metadata
* Open Graph
* sitemap
* robots.txt
* canonical URL
* semantic HTML
* image alt
* structured data

Analisis search intent calon pelanggan.

Contoh:

* fotografer wisuda
* jasa foto wisuda
* fotografer wisuda + kota
* foto wisuda profesional

Jangan melakukan keyword stuffing.

---

# 23. PERFORMANCE

Target:

* Lighthouse Performance ≥ 90
* Accessibility ≥ 95
* Best Practices ≥ 95
* SEO ≥ 95

Fokus:

* LCP
* CLS
* INP
* image loading
* font loading
* JavaScript bundle
* animation performance

Identifikasi risiko performa sejak tahap perencanaan.

---

# 24. ACCESSIBILITY

Implementasikan:

* semantic HTML
* keyboard navigation
* focus states
* accessible navigation
* alt text
* color contrast
* reduced motion
* accessible lightbox

Accessibility bukan tahap tambahan.

Accessibility harus direncanakan sejak awal.

---

# 25. OUTPUT PERTAMA YANG WAJIB DIHASILKAN

Sebelum menulis kode, buat dokumen perencanaan lengkap yang berisi:

1. Executive Summary
2. Analisis website saat ini
3. Masalah utama
4. Peluang redesign
5. Analisis target pengguna
6. User journey
7. Conversion funnel
8. Information architecture
9. Sitemap final
10. Struktur homepage
11. Struktur setiap halaman
12. Tiga arah eksplorasi desain
13. Perbandingan arah desain
14. Rekomendasi arah desain
15. Tiga konsep hero
16. Rekomendasi konsep hero
17. Strategi portfolio
18. Strategi pricing
19. Strategi booking
20. Mobile strategy
21. Motion strategy
22. Design system
23. Component architecture
24. Next.js architecture
25. Folder structure
26. Content model
27. Image architecture
28. SEO strategy
29. Performance strategy
30. Accessibility strategy
31. Tahapan implementasi
32. Risiko dan pertimbangan teknis

Untuk setiap keputusan besar:

* jelaskan alasan
* jelaskan keuntungan
* jelaskan kekurangan
* jelaskan trade-off
* hindari pernyataan generik

Setelah dokumen perencanaan selesai:

BERHENTI.

JANGAN membuat kode.

JANGAN membuat komponen.

JANGAN melakukan setup project.

Tunggu persetujuan sebelum melanjutkan.

---

# TAHAPAN PROYEK

## FASE 1 — Research dan Planning

Analisis dan perencanaan lengkap.

## FASE 2 — Visual Direction dan Design System

Finalisasi desain berdasarkan hasil analisis.

## FASE 3 — Wireframe dan Layout Specification

Menentukan struktur visual setiap halaman.

## FASE 4 — Project Setup dan Foundation

Setup Next.js dan arsitektur project.

## FASE 5 — Homepage Implementation

Implementasi homepage.

## FASE 6 — Portfolio dan Gallery

Implementasi pengalaman portfolio.

## FASE 7 — Supporting Pages

Implementasi pricing, SOP, about, dan FAQ.

## FASE 8 — SEO, Performance, dan Accessibility

Optimasi teknis.

## FASE 9 — Final Polish

Review visual, responsive behavior, motion, dan kualitas akhir.

Tujuan akhir:

Menghasilkan website fotografi yang memiliki identitas kuat, pengalaman pengguna yang baik, performa tinggi, dan mampu mengubah pengunjung menjadi calon pelanggan.

Website harus terasa seperti hasil karya designer dan engineer profesional.

Bukan template.

Bukan website SaaS.

Bukan hasil AI generik.
