"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Hero slides with gem imagery
const heroSlides = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1769443011/Gemini_Generated_Image_xfo2qpxfo2qpxfo2_cn9dvc.png",
    title: "QUALITY",
    subtitle: "Since 1996",
    description: "The Finest Ceylon Gemstones",
  },
  {
    id: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUn8VfJHfHXKAo3TaWOXLrYt9LYpgBdBJ-h9-6aVXLf8RrQuBcyXUp63ComqtsddUokM0FklZWKcXv3yOlOVjuxUv7rY2EtNA2zHsyVFKHZPQRy8es-hkXHY5R4AqitLF-XappCsoYorKhctO4FJI7-r0hb8amysR78FUz8mZQheRNI_KyigfJ1rJEyLGZ2QVGWud4_gL3mDZ7qsmfxGOobo89FnrQScgpDfyal_TvIpQAtVK1T0Y1B31bi_PWfVYRju7Yndaf3W2n",
    title: "ELEGANCE",
    subtitle: "Ethically Sourced",
    description: "From Ratnapura Mines",
  },
];

// Gem categories for bento grid
const categories = [
  {
    id: 1,
    name: "Blue Sapphire",
    description: "The Royal Standard of Ceylon",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTCaY_EkGXz6lrrsqyXZ1rnopMkwq_kPEKnFC3lh_tP68XLmhSUdN5k_KVNCLVC29M4AEhAc4XkxAx6IRDx-746tndvLvYnkGgwr-ffUuZAtUL_rRPk3wOLzGA7x7vOja76c1S2arJyEnEeI9OovOhcocNXwbrruxWGwz_23xfI50BMoyxr86t7qIGx_CqZ-XZDSfFmxEEgAlwCuyBm4jYW1VKFXAwHFtjsZW8SWWeXLSewl8C2FkIVZ7BVA5NME8rjHKweaWRwfWs",
    href: "/collections?category=blue-sapphire",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    name: "Ruby",
    description: "King of Gems",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUn8VfJHfHXKAo3TaWOXLrYt9LYpgBdBJ-h9-6aVXLf8RrQuBcyXUp63ComqtsddUokM0FklZWKcXv3yOlOVjuxUv7rY2EtNA2zHsyVFKHZPQRy8es-hkXHY5R4AqitLF-XappCsoYorKhctO4FJI7-r0hb8amysR78FUz8mZQheRNI_KyigfJ1rJEyLGZ2QVGWud4_gL3mDZ7qsmfxGOobo89FnrQScgpDfyal_TvIpQAtVK1T0Y1B31bi_PWfVYRju7Yndaf3W2n",
    href: "/collections?category=ruby",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    name: "Padparadscha",
    description: "Lotus Blossom Rarity",
    image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1769443002/green_2_k1mesl.jpg",
    href: "/collections?category=padparadscha",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    name: "Spinel",
    description: "Vibrant Fire & Brilliance",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5wk3QPV2qt77ih5cO3P8TmIrRXH_EMLcy3Pi5HPlt3toMtlNzpMomJMxeiqLtEqgHCjmR9ampeWkxHyCV8Mk_T-8bvuH4_C7ETKuVH66LpHz_kkaBXHmUKirYM0z-qu1h69avDPQX94JiB6GigzAHkkDnB-7alAW1ODWg_HRCIUJVRhT1U-Cv-1gCcuAndXkDwh1Vtg75D7bCDZ5-_UOSFFUBZatpUf-YKUcs6BZQkg_dj8zWsnkdQN9kU04rYRg6EZSp8Zm79D44",
    href: "/collections?category=spinel",
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    id: 5,
    name: "Cat's Eye",
    description: "Mystical Chatoyancy",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4U-xog-erq81W9nJpIGKUEndwg2BYbqGQWbFjsz27kOGgB4op6jlnPlzk4YzXLqMt8gQZJ1r7PcpBT6CZRN9nb5xSXlXFIm4hgLbvoTZdHfEqJ-K9QSBg-WkYMGnK4aEih5TQgiKChErFDelOr8B-l5ar6USsOa9U4d4rulZMYfwqKfV8EV0g4-B2skwnYej0NG4OBfOJSfHGqKSFtJix-mGrun3oyC_JijSWXrKj8aflnFwpPLy76DSpajj0RbP4k2_DUzuRUQAq",
    href: "/collections?category=cats-eye",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    name: "Yellow Sapphire",
    description: "Golden Radiance",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsBmLFoNu-QM-jHx4OIxxjfVtYIzSuxR883UdMEaFYtQL8UJeahT3OmYiIHwc4MncDE72uZXeFrwCyzBk3KwTnGD2zFa9TIuj81vmYKNjK1QRg4RWkfGzJmWhqwfEqb-79SJxTHSHTqL9zN-YWO65vE0o890OpB8QJyx36dCgb6oMZQFuNg3m2on937pMI4YqMKL2advb3o9FZDTT2faUgqjFHwnSm02OK07XIxLXnj9eFhDUFpgjEFny2IVUkL9C5808Gj6kfQnlX",
    href: "/collections?category=yellow-sapphire",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 7,
    name: "Pink Sapphire",
    description: "Romantic Elegance",
    image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1769443001/purple_li2pgx.jpg",
    href: "/collections?category=pink-sapphire",
    gridClass: "md:col-span-2 md:row-span-1",
  },
];

// Trust bar features
const trustFeatures = [
  {
    icon: "public",
    title: "Worldwide Delivery",
    description: "Free shipping on orders over LKR 150,000. Insured & tracked.",
  },
  {
    icon: "verified",
    title: "100% Money Back",
    description: "30-day satisfaction guarantee. No questions asked.",
  },
  {
    icon: "lock",
    title: "Secure Payment",
    description: "SSL encrypted transactions. Your data is safe.",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Hero Section with Slider */}
      <header className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-start pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${heroSlides[currentSlide].image}")`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-20">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg"
          >
            {/* Crown Icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-white/60" />
              <span className="material-symbols-outlined text-white text-2xl">
                diamond
              </span>
              <div className="w-8 h-[1px] bg-white/60" />
            </div>



            {/* Main Title */}
            <h1 className="text-white text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight mb-4">
              {heroSlides[currentSlide].title}
            </h1>

            {/* Description */}
            <p className="text-white/70 text-lg font-light italic mb-8">
              {heroSlides[currentSlide].description}
            </p>

            {/* CTA Button */}
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-[#1152d4] hover:bg-[#0d3fa8] text-white px-8 py-3 text-sm font-medium tracking-wide transition-colors"
            >
              EXPLORE COLLECTION
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/40"
                }`}
            />
          ))}
        </div>
      </header>

      {/* Trust Bar Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-white border-y border-gray-200 py-10 md:py-14"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-full mb-4">
                  <span className="material-symbols-outlined text-[#1152d4] text-3xl">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-black text-lg font-medium mb-2">
                  {feature.title}
                </h3>
                <p className="text-black/50 text-sm max-w-xs">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Bento Grid */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16 md:py-20"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="text-[#1152d4] font-bold tracking-widest uppercase text-xs">
              Our Collection
            </span>
            <h2 className="text-black text-4xl md:text-5xl font-serif font-bold mt-3">
              Explore Gemstones
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[220px]"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden cursor-pointer ${category.gridClass}`}
              >
                <Link href={category.href} className="block w-full h-full">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url("${category.image}")` }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-xl md:text-2xl font-serif font-medium">
                      {category.name}
                    </h3>

                    {/* Shop Here Button */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 bg-[#1152d4] text-white text-xs font-medium px-4 py-2 tracking-wide">
                        SHOP HERE
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Heritage Story Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="bg-gray-50 py-16 md:py-20"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div variants={fadeInUp} className="flex flex-col gap-6 flex-1">
              <span className="text-[#1152d4] font-bold tracking-widest uppercase text-xs">
                Our Heritage
              </span>
              <h2 className="text-black font-serif text-4xl md:text-5xl font-bold leading-tight">
                From the Earth to Elegance
              </h2>
              <p className="text-black/70 text-lg font-light leading-relaxed">
                Witness the journey of our gemstones, from the rich soils of
                Ratnapura to the hands of master cutters. We preserve the
                natural soul of every stone while revealing its inner brilliance
                through generations of craftsmanship.
              </p>
              <Link
                href="/about"
                className="flex items-center gap-2 text-[#1152d4] font-bold hover:text-[#0d3fa8] transition-colors mt-2 w-fit group"
              >
                <span>Read Our Story</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex-1 grid grid-cols-2 gap-4 w-full"
            >
              <div className="flex flex-col gap-3 group">
                <div
                  className="w-full aspect-[4/5] bg-cover bg-center rounded-lg overflow-hidden relative shadow-lg"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDO4hlOoy4ecrdHUi31zyf4TqkucPNoR7EmMHhSZP9lu3f7VFww9qdIcp9e_DnzIwNSnoUQGk0Nhg9nRqWuq7-EoPhIMDKjpgdfMIhzkykKnQ6g3jAbcAyAMyaz7LUjL92WIGGGYRXqyczelDfF-tGPkLs80pj9CJwStlIhpjlobTJrMMnZr3I6DMETsHzw7gdDiD8bhP2V-LmBTjOLaseRrFG4i5qFj3XbTkHprknviMK2J2uYDiZPEsFvXFXnUEWoruo023cQupnZ")`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <div>
                  <p className="text-black text-lg font-serif font-medium">
                    Ethically Sourced Raw
                  </p>
                  <p className="text-black/50 text-sm">
                    Direct from Ratnapura mines.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 group mt-12">
                <div
                  className="w-full aspect-[4/5] bg-cover bg-center rounded-lg overflow-hidden relative shadow-lg border border-gray-200"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8Ml4K9lCp7GNcEvhCKDwTma4WKlpCs8qQxPysEYTEf3R6frWl9JulXIKVikaERzki3yWByL7aQtk5ZjP2QQEX-LLWgkCBpnjMtE6r4aTVzSTrmOc6Xe6_OuIX0Nn0QG5toB1dPw4Byrm2qwgAy37kBInNl_xZ59CNjn27IYExiFcZ2THCArkyf6WhUCWCmly_ORJe55w4GQFyjmzG6u2S7XZlD3UDZpUUTcA7NJHffi2oLsrGDdtnzBISNesmWpBd-GhYQT2q_X6N")`,
                  }}
                >
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-black/10 transition-colors duration-500 mix-blend-overlay" />
                </div>
                <div>
                  <p className="text-black text-lg font-serif font-medium">
                    Masterfully Polished
                  </p>
                  <p className="text-black/50 text-sm">
                    Cut by heritage artisans.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-20"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="bg-gray-50 p-10 md:p-16 rounded-2xl border border-gray-200 relative max-w-4xl mx-auto text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full border border-gray-200 text-[#1152d4]">
              <span className="material-symbols-outlined text-4xl">
                format_quote
              </span>
            </div>
            <div className="flex justify-center gap-1 mb-6 text-[#FFD700]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined fill-current">
                  star
                </span>
              ))}
            </div>
            <blockquote className="text-black text-xl md:text-2xl font-serif italic leading-relaxed mb-8">
              &quot;The sapphire I purchased from Serendia Gems is unlike anything
              I&apos;ve seen in European boutiques. The depth of color and the
              ethical provenance make it truly priceless.&quot;
            </blockquote>
            <div className="flex flex-col items-center gap-1">
              <cite className="text-black font-bold not-italic">
                Eleanor Sterling
              </cite>
              <span className="text-black/40 text-sm uppercase tracking-wider">
                London, UK
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* View All Collection CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pb-20"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 border-2 border-[#1152d4] text-[#1152d4] hover:bg-[#1152d4] hover:text-white px-10 py-4 text-sm font-medium tracking-wide transition-colors"
          >
            VIEW ALL COLLECTIONS
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
