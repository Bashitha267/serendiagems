"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { use } from "react";
import { getProductById, getSimilarProducts } from "@/data/productsData";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const { addItem, openCart } = useCart();

    // Get product by ID
    const product = getProductById(id);

    // Get similar products
    const similarProducts = getSimilarProducts(id, 4);

    // If product not found, show 404 or redirect
    if (!product) {
        return (
            <main className="pt-20 bg-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
                    <Link
                        href="/collections"
                        className="bg-[#1152d4] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Browse Collections
                    </Link>
                </div>
            </main>
        );
    }

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
        <main className="mt:pt-20 pt-28  bg-white">
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
                                <span className="text-black font-medium">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
                    {/* Left Column: Image Gallery */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="aspect-[4/3] rounded-lg bg-gray-100 overflow-hidden relative group">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover cursor-zoom-in"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
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
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="mt-10 px-0 sm:mt-16 lg:mt-0 lg:sticky lg:top-24">
                        {/* Title & Price */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-4xl font-serif leading-tight">
                                {product.name}
                            </h1>
                            <div className="mt-4 flex items-end gap-4">
                                <p className="text-xl text-2xl font-semibold text-[#1152d4]">
                                    LKR {product.price.toLocaleString()}.00
                                </p>

                            </div>
                        </div>

                        {/* Short Description */}
                        <div className="mt-6 space-y-6 text-gray-600">
                            <p className="text-base leading-relaxed">{product.description}</p>
                        </div>

                        {/* Key Specs Grid */}
                        <div className="mt-8 grid grid-cols-2 gap-4 border-y border-gray-200 py-6">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400">
                                    scale
                                </span>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Weight
                                    </p>
                                    <p className="font-medium text-black">{product.weight}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400">
                                    public
                                </span>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Origin
                                    </p>
                                    <p className="font-medium text-black">{product.origin}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400">
                                    diamond
                                </span>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Shape
                                    </p>
                                    <p className="font-medium text-black">{product.shape}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400">
                                    science
                                </span>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Treatment
                                    </p>
                                    <p className="font-medium text-black">{product.treatment}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-[#1152d4] border border-transparent rounded-lg py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1152d4] shadow-lg shadow-[#1152d4]/30 transition-all"
                            >
                                <span className="material-symbols-outlined mr-2">
                                    shopping_bag
                                </span>
                                Add to Cart
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
                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <div className="space-y-4">
                                {/* Description Accordion */}
                                <details
                                    open={isDescriptionOpen}
                                    onToggle={(e) =>
                                        setIsDescriptionOpen((e.target as HTMLDetailsElement).open)
                                    }
                                    className="group"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between text-black font-medium list-none">
                                        <h2 className="text-base sm:text-lg">Detailed Description</h2>
                                        <span className="material-symbols-outlined transition group-open:rotate-180">
                                            expand_more
                                        </span>
                                    </summary>
                                    <div className="mt-4 text-sm leading-6 text-gray-600">
                                        <p>{product.description}</p>
                                        {product.clarity && (
                                            <p className="mt-2">
                                                <strong>Clarity:</strong> {product.clarity} - This gemstone exhibits
                                                exceptional transparency and minimal inclusions, ensuring maximum
                                                brilliance and value.
                                            </p>
                                        )}
                                        {product.color && (
                                            <p className="mt-2">
                                                <strong>Color:</strong> The {product.color} hue is consistent and
                                                vibrant, making this a standout piece in any collection.
                                            </p>
                                        )}
                                    </div>
                                </details>

                                <div className="border-t border-gray-200 my-4" />

                                {/* Shipping Accordion */}
                                <details
                                    open={isShippingOpen}
                                    onToggle={(e) =>
                                        setIsShippingOpen((e.target as HTMLDetailsElement).open)
                                    }
                                    className="group"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between text-black font-medium list-none">
                                        <h2 className="text-base sm:text-lg">Shipping & Returns</h2>
                                        <span className="material-symbols-outlined transition group-open:rotate-180">
                                            expand_more
                                        </span>
                                    </summary>
                                    <div className="mt-4 text-sm leading-6 text-gray-600">
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
                    </div>
                </div>

                {/* Similar Items Section */}
                <div className="mt-24 border-t border-gray-200 pt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-black font-serif">Similar Gemstones</h2>
                        <Link
                            href="/collections"
                            className="text-[#1152d4] hover:text-blue-600 font-medium text-xs sm:text-sm flex items-center"
                        >
                            View All
                            <span className="material-symbols-outlined text-sm ml-1">
                                arrow_forward
                            </span>
                        </Link>
                    </div>

                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={16}
                        slidesPerView={2.2}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        breakpoints={{
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="pb-12 similar-swiper"
                    >
                        {similarProducts.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div
                                    className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#1152d4]/30 transition-all duration-300 h-full flex flex-col"
                                >
                                    <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="text-sm font-bold text-black group-hover:text-[#1152d4] transition-colors line-clamp-1">
                                            {item.name}
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-500">{item.weight} • {item.cut || item.shape}</p>
                                        <p className="mt-3 text-base font-bold text-[#1152d4]">
                                            LKR {item.price.toLocaleString()}
                                        </p>
                                        <Link href={`/product/${item.id}`} className="absolute inset-0 z-10">
                                            <span className="sr-only">View {item.name}</span>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </main>
    );
}
