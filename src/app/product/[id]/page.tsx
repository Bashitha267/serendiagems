"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { use } from "react";

const productData: Record<string, {
    id: string;
    name: string;
    price: number;
    description: string;
    weight: string;
    origin: string;
    shape: string;
    treatment: string;
    images: string[];
}> = {
    "1": {
        id: "1",
        name: "Royal Blue Ceylon Sapphire",
        price: 4250,
        description:
            "An exceptional 2.14 carat oval cut sapphire featuring the coveted 'Royal Blue' hue. Sourced ethically from the mines of Ratnapura, Sri Lanka. This stone exhibits excellent clarity and brilliance, perfect for a custom engagement ring or investment piece.",
        weight: "2.14 Carats",
        origin: "Sri Lanka (Ceylon)",
        shape: "Oval Mixed Cut",
        treatment: "Heat Only",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA1sJnNhNtfLbXBhElgbgR17gaY_3_0-7DJ2p_fK8ws1QYJh4UoTEJECmQj_v0zTKF-pEMLGrisuXDapcH5yIyTWLethnxehIrp3inS-Z_zjeSkHDqLPCFwNTgaplcDq30J12aWfa8uLIqJx-o66ny9wWHF4lAxaAKyVQF0LEw3cIV7nQdhWEwUzOWgcmlO9IIfkjGHJGqElo9Q1aHBkpkSgX6scVfZiIif1hgiP78ccTOwQYuh1lfDrL3V1sc1bRLLvOCwU0T7pdhf",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAReCZfFTL2LhS4iRr9s1ms2j5zVq0wmarkAb_Tl90KMaufmN6s1RqNVnowfO7IFEfAwBPFpjc_AG-XnwXEtAjulRrphJsWMPM9-2AoklyM2FB2WndxiVhShxv5YPdwUN_QafCViT-24W6Hlv43JEsGB1aXn945xwFnSJMeh8r-4M6M60nQsljLLR8GY3Q-oBVuq5SPA4oH7N7uJHeoi1iciYkWuBnOhPrmPqLQZPAVLI99goCQlNGEUF_9cYrEy7-rL6PG-Rz_-ucV",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDEGUsWy2nWK546AK1RhkXq2KfjX4-y4MrumAkgdbD3ODV-Sx7jKLH4B0NK5TMgNVk6_W3gyoFvLPGsE7UHIExpUpbI0FQYXpEYf42gY82L-XjvLx0AwHZA0-cGjPJhwlLexCkhqTf1P73C-7H4yDbibEAi0ymLPfgTB_x9zmNigKqITJEM7dNWbPdM2Nm63QiryHcnv94cAeu66OQAQYNC1rplyIOQ98frSkMAovvWz6VhU9oLX0lUmo5ZVb0Ptpn5DqH_r4cSVc5e",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCOXlwSROq3tHlSoOQ16ixLTGzh2sXKqt5vuaKUsjEEwCr-YXc1rZMPShgFlicA933U_bQMwo-LmtOnIplAb-ERr8LGTaL-42SY7rHr8LMNnOdQw6SvSsOfP-z3kcXJL8vOIIWQGU-B3amMAA2Xu4zqe1ZhYGdNloXEK0XfEdOS7hI1nm3_cGNSWPja4251OowDDklCxWjrZccAYDj2813ILay9mYyaanPm9uyrGk6bmBdUTzGnGZMUh0h5YmpETGK7zzboL2Pf3sI4",
        ],
    },
};

const similarProducts = [
    {
        id: "s1",
        name: "Cornflower Blue Cushion 1.8ct",
        clarity: "VVS1 Clarity",
        price: 1850,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBjM71fPbwcThWUMs7OnQRT9PUrftivKxr159v70e8fg2Ff1VbcObdGPOyv4iNjmWph1T5haN1z5NH6YVppUqnbV9BAPMKUTGqZAfILXDE4rSJMzte6m2n6peHRP_vfQjAiAz-eF7cyKhmvOtUWfkdkwk1iCeP64BM_XpSJpHb31z2xpxvkvNs_0YumfeA5k9jXt-TNXv5hu366DRQBd2MpXWQTJIrlDcGnN4kKS0Swji4kZO0PSb20Fgxqp1vbpJNJDUK9IjP7qCRS",
    },
    {
        id: "s2",
        name: "Deep Royal Oval 2.5ct",
        clarity: "Unheated",
        price: 3200,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDAO-beTVupb7SzWRFv6krf14JDFJY_0VQLkFZTtIvJK1i-5yNPMbOuCCCPuDWd_9qsQzy3xUPUCghM7Dr6IeRWU_GHI_sWMptyFRpRhlcZrNjEy7TWpIY851cQd6-pk--L538VPBkcDibK3bvUguTj6D2IPSAVTmH4Zixi2XHz_P4wgxkllo1eUAU_FbExBzscBD2Xky-KQ5nbcV97apbq-44QmAsPVz2V7g5lCzO8sAAX_NmJCjufIRLsxlLLgHnbyA4ubYUO1eoE",
    },
    {
        id: "s3",
        name: "Vivid Blue Pear 1.5ct",
        clarity: "Natural",
        price: 1600,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBOBdAfANP6pfgztb5k0N7GZTYXD9P0zks9IUXU_PwC3TW7z0i3dP00Ft_jHtdJbk3wGeTLcDQgy-13LSMzSWlhhNY9ZvWx-LnvVG4CUS5ZLcI6aIpReg6e1CrVrEdvfEFKYJO-bXzAsg1-OBzrqDL88T_uXQt_bDUJO3UDWBLvZFppbNgk8hOUKNXsX1cY9ho2LGT6UYZI71Rd9olLbxdzDeQNMfGkwigCCyoNbPoLGj3n-Y-U7IjTq-OzdBMroJQo9-WfZvdqJ6Ao",
    },
    {
        id: "s4",
        name: "Sky Blue Round 1.9ct",
        clarity: "Eye Clean",
        price: 2100,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBLGLTydNJAx1uBGPL67USa6f8cT3SXbVx7LqUgsxhJGOCFBT1H8ulkehRh4hAKGGjJeFxgKSusaJey0d6-RgyhuDbQdskfHJzAXUXHMmbxPDLjRNYMA3MXzReaO_yVveX2D1IXOBKdTM0mc0jpNVLbapNGk9SISylfRzBvYl0atiLEQQ7vM7bhpSb5otzyCtpLBArxt56n8sDvjx5SM04hTkyhDO2yuAyiKrVh6ZXCJW0lqS3wQXqORPO17UO47wxigJ0AnXLTCXfw",
    },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const { addItem, openCart } = useCart();

    // Default to product 1 if not found
    const product = productData[id] || productData["1"];

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            weight: product.weight,
            cut: product.shape,
        });
        openCart();
    };

    return (
        <main className="pt-20 bg-[#0b0f19]">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex text-sm text-gray-500">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li>
                            <Link href="/" className="hover:text-[#1152d4]">
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="material-symbols-outlined text-base mx-1">
                                    chevron_right
                                </span>
                                <Link href="/collections" className="hover:text-[#1152d4]">
                                    Gemstones
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="material-symbols-outlined text-base mx-1">
                                    chevron_right
                                </span>
                                <span className="text-white font-medium">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
                    {/* Left Column: Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Main Image */}
                        <div className="aspect-[4/3] rounded-lg bg-gray-800 overflow-hidden relative group">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                            />
                            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-xl">
                                    zoom_in
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square rounded-lg overflow-hidden ${selectedImage === index
                                            ? "border-2 border-[#1152d4] ring-2 ring-[#1152d4]/20"
                                            : "border border-transparent hover:border-[#1152d4]/50"
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                        fill
                                        className="object-cover hover:opacity-75 transition-opacity"
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-10 px-0 sm:mt-16 lg:mt-0 lg:sticky lg:top-24"
                    >
                        {/* Title & Price */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
                                {product.name}
                            </h1>
                            <div className="mt-4 flex items-end gap-4">
                                <p className="text-3xl font-semibold text-[#1152d4]">
                                    ${product.price.toLocaleString()}.00
                                </p>
                                <span className="text-sm text-gray-500 mb-1.5">
                                    Free insured shipping
                                </span>
                            </div>
                        </div>

                        {/* Short Description */}
                        <div className="mt-6 space-y-6 text-gray-400">
                            <p className="text-base leading-relaxed">{product.description}</p>
                        </div>

                        {/* Key Specs Grid */}
                        <div className="mt-8 grid grid-cols-2 gap-4 border-y border-gray-800 py-6">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-500">
                                    scale
                                </span>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Weight
                                    </p>
                                    <p className="font-medium text-white">{product.weight}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-500">
                                    public
                                </span>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Origin
                                    </p>
                                    <p className="font-medium text-white">{product.origin}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-500">
                                    diamond
                                </span>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Shape
                                    </p>
                                    <p className="font-medium text-white">{product.shape}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-500">
                                    science
                                </span>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Treatment
                                    </p>
                                    <p className="font-medium text-white">{product.treatment}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                className="flex-1 bg-[#1152d4] border border-transparent rounded-lg py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1152d4] shadow-lg shadow-[#1152d4]/30 transition-all"
                            >
                                <span className="material-symbols-outlined mr-2">
                                    shopping_bag
                                </span>
                                Add to Cart
                            </motion.button>
                            <button className="flex-none bg-gray-800 border border-gray-700 rounded-lg py-4 px-4 flex items-center justify-center text-gray-200 hover:bg-gray-700 transition-all">
                                <span className="material-symbols-outlined">favorite_border</span>
                            </button>
                            <button className="flex-none bg-gray-800 border border-gray-700 rounded-lg py-4 px-4 flex items-center justify-center text-gray-200 hover:bg-gray-700 transition-all">
                                <span className="material-symbols-outlined">chat</span>
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-500 text-lg">
                                    verified
                                </span>
                                <span>GIA Certified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-500 text-lg">
                                    local_shipping
                                </span>
                                <span>Free Global Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-500 text-lg">
                                    published_with_changes
                                </span>
                                <span>30-Day Returns</span>
                            </div>
                        </div>

                        {/* Accordion Details */}
                        <div className="mt-10 border-t border-gray-800 pt-6">
                            <div className="space-y-4">
                                {/* Description Accordion */}
                                <details
                                    open={isDescriptionOpen}
                                    onToggle={(e) =>
                                        setIsDescriptionOpen((e.target as HTMLDetailsElement).open)
                                    }
                                    className="group"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between text-white font-medium list-none">
                                        <h2 className="text-lg">Detailed Description</h2>
                                        <span className="material-symbols-outlined transition group-open:rotate-180">
                                            expand_more
                                        </span>
                                    </summary>
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-4 text-sm leading-6 text-gray-400"
                                    >
                                        <p>
                                            This magnificent 2.14 carat sapphire is a testament to the
                                            legendary mines of Ceylon. The stone possesses a rich,
                                            velvety royal blue color that remains consistent under
                                            various lighting conditions.
                                        </p>
                                        <p className="mt-2">
                                            The oval cut maximizes the stone&apos;s face-up size and
                                            brilliance, making it appear larger than its carat weight
                                            suggests. A perfect centerpiece for a timeless heirloom.
                                        </p>
                                    </motion.div>
                                </details>

                                <div className="border-t border-gray-800 my-4" />

                                {/* Shipping Accordion */}
                                <details
                                    open={isShippingOpen}
                                    onToggle={(e) =>
                                        setIsShippingOpen((e.target as HTMLDetailsElement).open)
                                    }
                                    className="group"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between text-white font-medium list-none">
                                        <h2 className="text-lg">Shipping & Returns</h2>
                                        <span className="material-symbols-outlined transition group-open:rotate-180">
                                            expand_more
                                        </span>
                                    </summary>
                                    <div className="mt-4 text-sm leading-6 text-gray-400">
                                        <p>
                                            We offer complimentary insured shipping worldwide via
                                            FedEx Priority. All shipments are fully insured until they
                                            reach your hands. If you are not completely satisfied with
                                            your purchase, you may return the item in its original
                                            condition within 30 days for a full refund.
                                        </p>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Similar Items Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-24 border-t border-gray-800 pt-16"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">Similar Gemstones</h2>
                        <Link
                            href="/collections"
                            className="text-[#1152d4] hover:text-blue-400 font-medium text-sm flex items-center"
                        >
                            View All Sapphires
                            <span className="material-symbols-outlined text-sm ml-1">
                                arrow_forward
                            </span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {similarProducts.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="aspect-square w-full overflow-hidden bg-gray-800 relative">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:opacity-75 transition-opacity"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-sm font-medium text-white">
                                        <Link href={`/product/${item.id}`}>
                                            <span className="absolute inset-0" />
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{item.clarity}</p>
                                    <p className="mt-2 text-lg font-medium text-[#1152d4]">
                                        ${item.price.toLocaleString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
