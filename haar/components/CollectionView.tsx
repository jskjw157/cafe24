
import React from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  colors?: string[];
  showInfo?: boolean;
}

interface CollectionViewProps {
  onProductClick?: (productId: number) => void;
}

const products: Product[] = [
  { id: 1, name: "CURB CHAIN BRACELET", price: "¥85,000", image: "https://images.unsplash.com/photo-1611085583191-a3b1a60d6c81?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "OVAL LINK CHAIN", price: "¥120,000", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "HEART PENDANT NECKLACE", price: "¥45,000", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "SCREW RING", price: "¥32,000", image: "https://images.unsplash.com/photo-1605100804763-247f67b3f416?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "HEART RING", price: "¥28,000", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "TEXTURED KEY CHAIN", price: "¥99,000", image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=600", showInfo: true },
  { id: 7, name: "LOGO ENGRAVED RING", price: "¥25,000", image: "https://images.unsplash.com/photo-1515562141207-7a18b5ce3377?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "CASSETTE RING", price: "¥38,000", image: "https://images.unsplash.com/photo-1630019011930-c62624ee7706?auto=format&fit=crop&q=80&w=600" },
  { id: 9, name: "LETTER-BLOCK BRACELET", price: "¥27,500", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600", colors: ['#ccc', '#ffd700'], showInfo: true },
  { id: 10, name: "CHAIN LINK NECKLACE", price: "¥78,000", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600" },
  { id: 11, name: "SPIKE EARRING", price: "¥42,000", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=600" },
  { id: 12, name: "POW PENDANT", price: "¥55,000", image: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&q=80&w=600" },
  { id: 13, name: "CRYSTAL RING", price: "¥35,000", image: "https://images.unsplash.com/photo-1605100804763-247f67b3f416?auto=format&fit=crop&q=80&w=600" },
  { id: 14, name: "CLASP BRACELET", price: "¥68,000", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=600" },
  { id: 15, name: "MINI HOOP EARRINGS", price: "¥38,000", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600" },
  { id: 16, name: "DOUBLE CHAIN NECKLACE", price: "¥145,000", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" },
];

// AMBUSH-style checkerboard pattern: alternating grey and white backgrounds
const getBackgroundColor = (index: number, columns: number = 4): string => {
  const row = Math.floor(index / columns);
  const col = index % columns;
  // Checkerboard: (row + col) % 2 determines color
  return (row + col) % 2 === 0 ? 'bg-[#f5f5f5]' : 'bg-white';
};

const CollectionView: React.FC<CollectionViewProps> = ({ onProductClick }) => {
  return (
    <div className="w-full bg-white text-black">
      {/* Top Header Section with White Background */}
      <div className="bg-white w-full pt-6 border-b border-gray-100">
        {/* Breadcrumb */}
        <div className="flex justify-center text-xs font-bold tracking-[0.15em] uppercase mb-10 opacity-70">
          <span>ALL ITEM / JEWELRY / FASHION JEWELRY / NEW IN</span>
        </div>

        {/* Brand Description */}
        <div className="max-w-5xl mx-auto px-8 mb-16 grid grid-cols-1 md:grid-cols-2 gap-16 text-xs font-medium leading-[1.7] tracking-[0.05em] opacity-80">
          <p>
            HAAR® began as an experimental line of jewelry — innovative pop art inspired designs capturing a distinct Tokyo aesthetic. The iconic trademarked POW® motif in particular received
          </p>
          <p>
            media coverage around the world. With apparel created as a canvas to complete the story, HAAR® evolved into designing unisex collections.
          </p>
        </div>

        {/* Filter / Sort Bar - Stays at edges */}
        <div className="w-full px-6 flex justify-between text-xs font-bold tracking-[0.15em] pb-3 opacity-90">
          <button className="hover:opacity-50 transition-opacity">FILTER</button>
          <button className="hover:opacity-50 transition-opacity">SORT</button>
        </div>
      </div>

      {/* Product Grid Area - AMBUSH-style: Clean White Background with Generous Spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-100">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            onClick={() => onProductClick?.(product.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group relative aspect-square overflow-hidden cursor-pointer bg-white"
          >
            {/* Product Image */}
            <div className="w-full h-full flex items-center justify-center p-12 lg:p-16">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>

            {/* Color Options - Minimal */}
            {product.colors && (
              <div className="absolute top-3 right-3 flex gap-1">
                {product.colors.map((c, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full border border-gray-200"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            )}

            {/* Product Info - AMBUSH Style: No Gradient, Just Text */}
            <div className={`absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-300 ${product.showInfo ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold tracking-[0.08em] uppercase leading-tight">
                  {product.name}
                </span>
                <span className="text-[11px] font-semibold tracking-wide opacity-70">
                  {product.price}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Placeholder cells to complete the grid */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square bg-white"
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-5 mt-12 mb-20 text-xs font-bold tracking-[0.15em]">
        <button className="opacity-100">01</button>
        <button className="opacity-40 hover:opacity-100 transition-opacity">02</button>
        <span className="opacity-40">...</span>
        <button className="opacity-40 hover:opacity-100 transition-opacity">08</button>
        <button className="ml-2 hover:opacity-50 transition-opacity">{'>'}</button>
      </div>

      {/* Newsletter Section - AMBUSH Style */}
      <section className="w-full flex flex-col items-center text-center py-20 bg-white border-t border-gray-100">
        <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-10 opacity-95">SUBSCRIBE TO THE NEWSLETTER</h3>
        <p className="text-xs leading-[1.7] mb-8 max-w-[420px] font-medium opacity-70 tracking-[0.03em]">
          To get exclusive access to our private promotion and to stay up to date on latest drops, limited edition collabs, and special offers.
        </p>

        <div className="w-full max-w-[480px] relative mb-6 px-6">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-black p-3 text-[13px] focus:outline-none placeholder:opacity-40 placeholder:text-[13px]"
          />
          <button className="absolute right-10 top-1/2 -translate-y-1/2 text-xs font-bold tracking-[0.1em] uppercase hover:opacity-50 transition-opacity">SIGN UP</button>
        </div>

        <p className="text-[11px] leading-[1.6] opacity-70 max-w-[520px] px-6 font-medium">
          I have read the privacy policy and I consent to the processing of my personal data for marketing purposes. If you wish to unsubscribe from our newsletter, you may do so at any time by <button className="underline font-semibold">clicking here.</button>
        </p>
      </section>
    </div>
  );
};

export default CollectionView;
