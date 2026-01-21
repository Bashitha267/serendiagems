import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#080b12] border-t border-white/5 mt-auto">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 text-white">
                            <div className="size-6 text-[#1152d4]">
                                <svg
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M24 2L8 18L24 46L40 18L24 2Z"
                                        stroke="currentColor"
                                        strokeLinejoin="round"
                                        strokeWidth="4"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-serif font-bold">Ceylon Gems</h2>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Exporting the finest Sri Lankan gemstones to the world with
                            integrity, transparency, and a commitment to our heritage.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a
                                href="#"
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined">public</span>
                            </a>
                            <a
                                href="#"
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined">
                                    alternate_email
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Links - Collections */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-bold text-sm tracking-widest uppercase">
                            Collections
                        </h3>
                        <Link
                            href="/collections"
                            className="text-white/60 hover:text-[#1152d4] transition-colors text-sm"
                        >
                            Blue Sapphires
                        </Link>
                        <Link
                            href="/collections"
                            className="text-white/60 hover:text-[#1152d4] transition-colors text-sm"
                        >
                            Rubies
                        </Link>
                        <Link
                            href="/collections"
                            className="text-white/60 hover:text-[#1152d4] transition-colors text-sm"
                        >
                            Padparadscha
                        </Link>
                        <Link
                            href="/collections"
                            className="text-white/60 hover:text-[#1152d4] transition-colors text-sm"
                        >
                            Engagement Rings
                        </Link>
                    </div>

                    {/* Links - Company */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-bold text-sm tracking-widest uppercase">
                            Company
                        </h3>
                        <Link
                            href="/about"
                            className="text-white/60 hover:text-[#1152d4] transition-colors text-sm"
                        >
                            Our Story
                        </Link>
                        <Link
                            href="/about"
                            className="text-white/60 hover:text-[#1152d4] transition-colors text-sm"
                        >
                            Ethical Mining
                        </Link>
                        <Link
                            href="/about"
                            className="text-white/60 hover:text-[#1152d4] transition-colors text-sm"
                        >
                            Certification (GIA/GRS)
                        </Link>
                        <Link
                            href="/about"
                            className="text-white/60 hover:text-[#1152d4] transition-colors text-sm"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-bold text-sm tracking-widest uppercase">
                            Stay Updated
                        </h3>
                        <p className="text-white/60 text-sm">
                            Subscribe to receive exclusive offers and gemological insights.
                        </p>
                        <div className="flex gap-2">
                            <input
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm w-full focus:outline-none focus:border-[#1152d4] transition-colors"
                                placeholder="Email address"
                                type="email"
                            />
                            <button className="bg-[#1152d4] hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-bold transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-xs">
                        © 2024 Ceylon Gems. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-white/30 text-xs hover:text-white cursor-pointer transition-colors">
                            Privacy Policy
                        </span>
                        <span className="text-white/30 text-xs hover:text-white cursor-pointer transition-colors">
                            Terms of Service
                        </span>
                        <span className="text-white/30 text-xs hover:text-white cursor-pointer transition-colors">
                            Shipping &amp; Returns
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
