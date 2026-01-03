
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  colors?: string[];
}

const products: Product[] = [
  { id: 1, name: "CURB CHAIN BRACELET", price: "¥85,000", image: "https://images.unsplash.com/photo-1611085583191-a3b1a60d6c81?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "OVAL LINK CHAIN", price: "¥120,000", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "HEART PENDANT NECKLACE", price: "¥45,000", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "SCREW RING", price: "¥32,000", image: "https://images.unsplash.com/photo-1605100804763-247f67b3f416?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "HEART RING", price: "¥28,000", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "TEXTUERD KEY CHAIN", price: "¥99,000", image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=600" },
  { id: 7, name: "LOGO ENGRAVED RING", price: "¥25,000", image: "https://images.unsplash.com/photo-1515562141207-7a18b5ce3377?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "CASSETTE RING", price: "¥38,000", image: "https://images.unsplash.com/photo-1630019011930-c62624ee7706?auto=format&fit=crop&q=80&w=600" },
  { id: 9, name: "LETTER-BLOCK & BEADS BRACELET", price: "¥27,500", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600", colors: ['#ccc', '#ffd700'] },
];

const CollectionView: React.FC = () => {
  return (
    <div className="w-full bg-[#f2f2f2] text-black">
      {/* Top Header Section with White Background */}
      <div className="bg-white w-full pt-10 border-b border-gray-200">
        {/* Breadcrumb */}
        <div className="flex justify-center text-[10px] font-black tracking-[0.2em] uppercase mb-12">
          <span>ALL ITEM / JEWELRY / FASHION JEWELRY / NEW IN</span>
        </div>

        {/* Brand Description */}
        <div className="max-w-4xl mx-auto px-8 mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-[10px] font-bold leading-relaxed uppercase tracking-widest opacity-80">
          <p>
            HAAR® began as an experimental line of jewelry — innovative pop art inspired designs capturing a distinct Tokyo aesthetic. The iconic trademarked POW® motif in particular received
          </p>
          <p>
            media coverage around the world. With apparel created as a canvas to complete the story, HAAR® evolved into designing unisex collections.
          </p>
        </div>

        {/* Filter / Sort Bar - Stays at edges */}
        <div className="w-full px-8 flex justify-between text-[11px] font-black tracking-[0.2em] pb-4">
          <button className="hover:opacity-50">FILTER</button>
          <button className="hover:opacity-50">SORT</button>
        </div>
      </div>

      {/* Product Grid Area - Grey background */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 px-1 pt-1">
        {products.map((product) => (
          <div key={product.id} className="group relative bg-[#efefef] aspect-square overflow-hidden cursor-pointer">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            />
            {product.colors && (
              <div className="absolute top-4 right-4 flex gap-1">
                {product.colors.map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: c }}></div>
                ))}
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-black tracking-widest uppercase">{product.name}</span>
              <span className="text-[10px] font-black tracking-widest">{product.price}</span>
            </div>
            {product.id === 6 || product.id === 9 ? (
              <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-100">
                <span className="text-[10px] font-black tracking-widest uppercase">{product.name}</span>
                <span className="text-[10px] font-black tracking-widest">{product.price}</span>
              </div>
            ) : null}
          </div>
        ))}
        {/* Placeholder cells */}
        {[...Array(7)].map((_, i) => (
          <div key={`empty-${i}`} className="bg-[#efefef] aspect-square"></div>
        ))}
      </div>

      {/* Pagination - REVERTED TO GREY BACKGROUND */}
      <div className="flex justify-center items-center gap-6 mt-16 mb-24 text-[11px] font-black tracking-[0.2em]">
        <button className="opacity-100">01</button>
        <button className="opacity-40 hover:opacity-100">02</button>
        <span className="opacity-40">...</span>
        <button className="opacity-40 hover:opacity-100">08</button>
        <button className="ml-2 hover:opacity-50">></button>
      </div>

      {/* Newsletter Section - STAYS WHITE */}
      <section className="w-full flex flex-col items-center text-center py-24 bg-white border-t border-gray-200">
        <h3 className="text-[11px] font-black tracking-[0.2em] uppercase mb-12">SUBSCRIBE TO THE NEWSLETTER</h3>
        <p className="text-[11px] leading-relaxed mb-10 max-w-[420px] font-medium opacity-80 uppercase tracking-widest">
          To get exclusive access to our private promotion and to stay up to date on latest drops, limited edition collabs, and special offers.
        </p>
        
        <div className="w-full max-w-[500px] relative mb-8 px-6">
          <input 
            type="email" 
            placeholder="Email address"
            className="w-full border border-black p-4 text-[12px] focus:outline-none placeholder:opacity-40"
          />
          <button className="absolute right-10 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-[0.1em] uppercase hover:opacity-50">SIGN UP</button>
        </div>

        <p className="text-[10px] leading-relaxed opacity-100 max-w-[540px] px-6 font-medium">
          I have read the privacy policy and I consent to the processing of my personal data for marketing purposes. If you wish to unsubscribe from our newsletter, you may do so at any time by <button className="underline font-bold">clicking here.</button>
        </p>
      </section>
    </div>
  );
};

export default CollectionView;
