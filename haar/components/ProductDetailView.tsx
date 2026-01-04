
import React, { useState } from 'react';

interface ProductDetailProps {
  productId?: number;
  onBack?: () => void;
  onAddToCart?: (product: Product, size: number) => void;
}

interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  material: string;
  images: string[];
  sizes: number[];
  color: string;
}

// Sample product data - In production, this would come from an API
const sampleProduct: Product = {
  id: 1,
  name: "TEXTURED A CHAIN BRACELET",
  price: "¥99,000",
  priceValue: 99000,
  description: "Textured chain bracelet with a refined, understated presence",
  material: "Crafted from Sterling Silver 925",
  images: [
    "https://images.unsplash.com/photo-1611085583191-a3b1a60d6c81?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
  ],
  sizes: [1, 2, 3],
  color: "SILVER"
};

const ProductDetailView: React.FC<ProductDetailProps> = ({
  onBack,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [product] = useState<Product>(sampleProduct);

  const handleAddToCart = () => {
    if (selectedSize && onAddToCart) {
      onAddToCart(product, selectedSize);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Left: Product Images */}
        <div className="lg:w-1/2 flex flex-col">
          {product.images.map((img, idx) => (
            <div
              key={idx}
              className="aspect-square bg-[#f5f5f5] flex items-center justify-center overflow-hidden"
            >
              <img
                src={img}
                alt={`${product.name} view ${idx + 1}`}
                className="w-3/4 h-3/4 object-contain grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              />
            </div>
          ))}
        </div>

        {/* Right: Product Info - AMBUSH Style */}
        <div className="lg:w-1/2 px-6 lg:px-12 py-10 lg:sticky lg:top-24 lg:h-fit">
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="text-[11px] font-semibold tracking-[0.08em] uppercase mb-6 hover:opacity-50 transition-opacity opacity-80"
            >
              ← BACK TO COLLECTION
            </button>
          )}

          {/* Product Name & Price */}
          <h1 className="text-sm font-bold tracking-[0.12em] uppercase mb-1.5 leading-tight">
            {product.name}
          </h1>
          <p className="text-[13px] font-semibold tracking-wide mb-6 opacity-80">
            {product.price}
          </p>

          {/* Tabs */}
          <div className="flex gap-5 mb-6 border-b border-gray-100 pb-3">
            <button className="text-xs font-bold tracking-[0.1em] uppercase border-b border-black pb-1">
              DETAILS
            </button>
            <button className="text-xs font-semibold tracking-[0.1em] uppercase opacity-50 hover:opacity-100 transition-opacity">
              MATERIAL
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-xs leading-[1.6] mb-1.5 opacity-80">
              · {product.description}
            </p>
            <p className="text-xs leading-[1.6] opacity-80">
              · {product.material}
            </p>
          </div>

          {/* Color */}
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-[0.08em] uppercase mb-2.5 opacity-90">
              {product.color}
            </p>
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-200"></div>
          </div>

          {/* Size Selection */}
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-[0.08em] uppercase mb-2.5 opacity-90">
              SIZE
            </p>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-7 h-7 text-xs font-bold border transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="text-[11px] font-semibold tracking-[0.06em] uppercase mt-2.5 underline hover:no-underline opacity-80">
              View the size guide
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full py-3.5 text-xs font-bold tracking-[0.15em] uppercase transition-all ${
              selectedSize
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            ADD TO CART
          </button>

          {/* Additional Info */}
          <div className="mt-5 text-[11px] leading-[1.6] opacity-60">
            <p>Price includes consumption tax levied in Japan.</p>
            <p>International orders may be subject to additional customs duties or import taxes.</p>
          </div>

          {/* Store Links */}
          <div className="mt-6 flex flex-col gap-1.5">
            <button className="text-xs font-semibold tracking-[0.06em] uppercase hover:opacity-50 text-left underline opacity-80">
              FIND IN STORE
            </button>
            <button className="text-xs font-semibold tracking-[0.06em] uppercase hover:opacity-50 text-left underline opacity-80">
              ADD TO WISHLIST
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section - AMBUSH Style */}
      <section className="w-full flex flex-col items-center text-center py-20 bg-white border-t border-gray-100 mt-16">
        <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-10 opacity-95">
          SUBSCRIBE TO THE NEWSLETTER
        </h3>
        <p className="text-xs leading-[1.7] mb-8 max-w-[420px] font-medium opacity-70 tracking-[0.03em] px-6">
          To get exclusive access to our private promotion and to stay up to date on latest drops, limited edition collabs, and special offers.
        </p>

        <div className="w-full max-w-[480px] relative mb-6 px-6">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-black p-3 text-[13px] focus:outline-none placeholder:opacity-40 placeholder:text-[13px]"
          />
          <button className="absolute right-10 top-1/2 -translate-y-1/2 text-xs font-bold tracking-[0.1em] uppercase hover:opacity-50 transition-opacity">
            SIGN UP
          </button>
        </div>

        <p className="text-[11px] leading-[1.6] opacity-70 max-w-[520px] px-6 font-medium">
          I have read the privacy policy and I consent to the processing of my personal data for marketing purposes. If you wish to unsubscribe from our newsletter, you may do so at any time by{' '}
          <button className="underline font-semibold">clicking here.</button>
        </p>
      </section>
    </div>
  );
};

export default ProductDetailView;
