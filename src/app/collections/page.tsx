"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { getAllProducts } from "@/data/productsData";

const products = getAllProducts();

function FilterContent() {
    return (
        <>
            {/* Sort By */}
            <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Sort By
                </h3>
                <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-sm text-black focus:border-[#1152d4] focus:ring-[#1152d4]">
                        <option>Popularity</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <span className="material-symbols-outlined">expand_more</span>
                    </div>
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Price Range
                </h3>
                <div className="flex items-center gap-3">
                    <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                        </span>
                        <input
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-6 pr-2 text-sm text-black focus:border-[#1152d4] focus:ring-[#1152d4]"
                            placeholder="Min"
                            type="number"
                        />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                        </span>
                        <input
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-6 pr-2 text-sm text-black focus:border-[#1152d4] focus:ring-[#1152d4]"
                            placeholder="Max"
                            type="number"
                        />
                    </div>
                </div>
            </div>

            {/* Gem Type */}
            <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Gem Type
                </h3>
                <div className="flex flex-col gap-2.5">
                    {[
                        { name: "Blue Sapphire", count: 124 },
                        { name: "Pink Sapphire", count: 45 },
                        { name: "Ruby", count: 32 },
                        { name: "Yellow Sapphire", count: 18 },
                        { name: "Spinel", count: 12 },
                    ].map((gem) => (
                        <label
                            key={gem.name}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                className="size-4 rounded border-gray-300 bg-white text-[#1152d4] focus:ring-[#1152d4]"
                                type="checkbox"
                                defaultChecked={gem.name === "Blue Sapphire"}
                            />
                            <span className="text-sm text-gray-700 group-hover:text-[#1152d4] transition-colors">
                                {gem.name}
                            </span>
                            <span className="ml-auto text-xs text-gray-500">
                                {gem.count}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Treatment */}
            <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Treatment
                </h3>
                <div className="flex flex-col gap-2.5">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            className="size-4 rounded border-gray-300 bg-white text-[#1152d4] focus:ring-[#1152d4]"
                            type="checkbox"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-[#1152d4] transition-colors">
                            Natural Unheated
                        </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            className="size-4 rounded border-gray-300 bg-white text-[#1152d4] focus:ring-[#1152d4]"
                            type="checkbox"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-[#1152d4] transition-colors">
                            Heat Treated
                        </span>
                    </label>
                </div>
            </div>
        </>
    );
}

export default function CollectionsPage() {
    const { addItem, openCart } = useCart();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    const handleAddToCart = (product: (typeof products)[0]) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            weight: product.weight,
            cut: product.cut,
        });
        openCart();
    };

    return (
        <main className="flex-1 bg-heritage-pattern pt-20">
            <div className="mx-auto flex max-w-[1440px] flex-col px-4 py-6 md:px-8 lg:px-12">
                {/* Breadcrumbs & Mobile Filter */}
                <div className="flex items-center justify-between pb-6">
                    <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#1152d4] transition-colors">
                            Home
                        </Link>
                        <span className="material-symbols-outlined text-[16px]">
                            chevron_right
                        </span>
                        <span className="font-medium text-black">Collections</span>
                    </nav>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsMobileFiltersOpen(true)}
                        className="lg:hidden flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-bold text-black shadow-sm transition-all hover:bg-gray-50 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">tune</span>
                        Filters
                    </button>
                </div>

                {/* Page Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
                >
                    <div className="flex max-w-2xl flex-col gap-3">
                        <h1 className="text-4xl font-black leading-tight tracking-tight text-black lg:text-5xl">
                            The Ceylon Collection
                        </h1>
                        <p className="text-lg text-gray-600">
                            Discover our ethically sourced, hand-selected sapphires and rubies
                            from the heart of Sri Lanka. Each stone tells a story of heritage
                            and brilliance.
                        </p>
                    </div>
                </motion.div>

                {/* Layout: Sidebar + Grid */}
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar Filters (Desktop) */}
                    <aside className="hidden lg:block w-72 shrink-0 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-8 rounded-xl bg-gray-50 border border-gray-200 p-6 shadow-sm"
                        >
                            <FilterContent />
                        </motion.div>
                    </aside>

                    {/* Mobile Filter Drawer */}
                    <motion.div
                        initial={false}
                        animate={isMobileFiltersOpen ? "open" : "closed"}
                        className={`fixed inset-0 z-50 lg:hidden ${isMobileFiltersOpen ? "pointer-events-auto" : "pointer-events-none"}`}
                    >
                        {/* Overlay */}
                        <motion.div
                            variants={{
                                open: { opacity: 1 },
                                closed: { opacity: 0 },
                            }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Drawer Content */}
                        <motion.div
                            variants={{
                                open: { x: 0 },
                                closed: { x: "-100%" },
                            }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-black">Filters</h2>
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors text-black"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                                <FilterContent />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#1152d4]/30"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {product.badge && (
                                            <div className="absolute left-2 top-2 z-20">
                                                <span
                                                    className={`inline-flex items-center rounded ${product.badgeColor} px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold text-white backdrop-blur-sm`}
                                                >
                                                    {product.badge}
                                                </span>
                                            </div>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleFavorite(product.id);
                                            }}
                                            className="absolute right-2 top-2 z-30 flex size-7 sm:size-8 items-center justify-center rounded-full bg-white/80 text-black backdrop-blur-sm transition-colors hover:bg-[#1152d4] hover:text-white"
                                        >
                                            <span className="material-symbols-outlined text-base sm:text-lg">
                                                {favorites.includes(product.id)
                                                    ? "favorite"
                                                    : "favorite_border"}
                                            </span>
                                        </button>
                                        {/* Quick Add Button */}
                                        <motion.button
                                            initial={{ y: 20, opacity: 0 }}
                                            whileHover={{ scale: 1.02 }}
                                            className="absolute bottom-2 left-2 right-2 z-30 translate-y-full rounded-lg bg-[#1152d4] text-white font-semibold py-2 text-xs sm:py-3 sm:text-sm opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-blue-600"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToCart(product);
                                            }}
                                        >
                                            Add to Cart
                                        </motion.button>
                                    </div>
                                    <div className="flex flex-col gap-1 p-3 sm:gap-2 sm:p-5">
                                        <Link href={`/product/${product.id}`} className="after:absolute after:inset-0 after:z-10">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-sm sm:text-lg font-bold text-black group-hover:text-[#1152d4] transition-colors line-clamp-1">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-[10px] sm:text-sm text-gray-500">
                                                        {product.weight} • {product.cut}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-1 sm:mt-2 flex items-center justify-between">
                                                <span className="text-sm sm:text-xl font-bold text-black">
                                                    LKR {product.price.toLocaleString()}
                                                </span>
                                                <span
                                                    className={`hidden sm:inline-block text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded ${product.treatment === "Natural"
                                                        ? "text-green-600 bg-green-100"
                                                        : "text-orange-600 bg-orange-100"
                                                        }`}
                                                >
                                                    {product.treatment}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 flex justify-center"
                        >
                            <button className="rounded-lg bg-[#1152d4] px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-blue-600 focus:ring-4 focus:ring-[#1152d4]/20">
                                Load More Gems
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
