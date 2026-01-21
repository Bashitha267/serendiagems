"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { totalItems, toggleCart } = useCart();

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0b0f19]/80 backdrop-blur-md border-b border-[#232f48]">
                <div className="flex items-center justify-between px-6 lg:px-20 py-4 max-w-[1440px] mx-auto w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4 text-white">
                        <div className="size-6 text-[#1152d4]">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_6_319)">
                                    <path
                                        d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                                        fill="currentColor"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_6_319">
                                        <rect fill="white" height="48" width="48" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h2 className="text-white text-xl font-serif font-bold tracking-tight">
                            Ceylon Gems
                        </h2>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <Link
                            href="/collections"
                            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
                        >
                            Shop
                        </Link>
                        <Link
                            href="/about"
                            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/collections"
                            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
                        >
                            Artworks
                        </Link>
                    </div>

                    {/* Right Icons */}
                    <div className="flex gap-4 items-center">
                        <button className="text-white hover:text-[#1152d4] transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="text-white hover:text-[#1152d4] transition-colors">
                            <span className="material-symbols-outlined">person</span>
                        </button>
                        <button
                            onClick={toggleCart}
                            className="text-white hover:text-[#1152d4] transition-colors relative"
                        >
                            <span className="material-symbols-outlined">shopping_bag</span>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-[#1152d4] text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white hover:text-[#1152d4] transition-colors"
                        >
                            <span className="material-symbols-outlined">
                                {mobileMenuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[#0b0f19] border-t border-[#232f48]"
                        >
                            <div className="flex flex-col gap-4 px-6 py-6">
                                <Link
                                    href="/collections"
                                    className="text-white/80 hover:text-white text-base font-medium transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Shop
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-white/80 hover:text-white text-base font-medium transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/collections"
                                    className="text-white/80 hover:text-white text-base font-medium transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Artworks
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Cart Drawer */}
            <CartDrawer />
        </>
    );
}
