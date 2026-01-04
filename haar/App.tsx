
import React, { useState } from 'react';
import {
  CrossIcon,
  BannerLogo,
  SmallLogoIcon,
  CloseIcon,
  SearchIcon,
  UserIcon,
  HeartIcon,
  BagIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AmbushStyleLogo
} from './components/Icons';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewState } from './types';
import AccountView from './components/AccountView';
import CollectionView from './components/CollectionView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>(['JEWELRY']);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cartItemCount, setCartItemCount] = useState(2); // Demo: 2 items in cart

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const navigateTo = (newView: ViewState) => {
    setView(newView);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const menuData = [
    { id: 'ACCESSORIES', label: 'FASHION ACCESSORIES', subItems: [] },
    { id: 'JEWELRY', label: 'JEWELRY', subItems: ['FASHION JEWELRY', 'AMBUSH CLASSICS'] },
    { id: 'COLLECTIONS', label: 'COLLECTIONS', subItems: [] },
  ];

  const isLightView = view === ViewState.ACCOUNT || view === ViewState.COLLECTION || view === ViewState.PRODUCT_DETAIL || view === ViewState.CART;

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    navigateTo(ViewState.PRODUCT_DETAIL);
  };

  const handleAddToCart = () => {
    setCartItemCount(prev => prev + 1);
    // Optionally navigate to cart or show a toast
  };

  const handleGoToCart = () => {
    navigateTo(ViewState.CART);
  };

  return (
    <div className={`relative w-full flex flex-col items-center font-sans ${isLightView ? 'min-h-screen bg-white text-black' : 'h-screen overflow-hidden text-black'}`}>
      {/* Home Atmosphere Elements */}
      {view === ViewState.HOME && (
        <>
          <div className="grain-overlay" />
          <div className="abstract-center" />
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30">
            <img
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000"
              alt="Atmosphere"
              className="w-full h-full object-cover grayscale mix-blend-overlay"
            />
          </div>
        </>
      )}

      {/* Header Navigation - AMBUSH Style */}
      <header className={`fixed top-0 left-0 w-full z-[100] px-6 pt-4 flex justify-between items-center transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isLightView ? 'bg-white/98 border-b border-gray-100 pb-3' : ''}`}>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="hover:opacity-50 transition-opacity"
          >
            {isLightView ? (
              <div className="flex flex-col gap-[2.5px] w-4">
                <div className="h-[1px] w-full bg-black"></div>
                <div className="h-[1px] w-full bg-black"></div>
              </div>
            ) : (
              <CrossIcon className="w-5 h-5" />
            )}
          </button>
          {isLightView && <SearchIcon className="w-4 h-4 cursor-pointer opacity-80" />}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-3">
          {isLightView ? (
            <button onClick={() => navigateTo(ViewState.HOME)} className="text-xl font-black tracking-tight uppercase mt-1.5">HAAR®</button>
          ) : (
            <button onClick={() => navigateTo(ViewState.HOME)}><BannerLogo /></button>
          )}
        </div>

        <div className="flex gap-3 text-xs font-bold tracking-[0.1em] uppercase items-center">
          <div className="flex gap-4 items-center">
            {isLightView ? (
              <>
                <UserIcon onClick={() => navigateTo(ViewState.ACCOUNT)} className="w-4 h-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity" />
                <HeartIcon className="w-4 h-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <BagIcon onClick={handleGoToCart} className="w-4 h-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                <button onClick={() => navigateTo(ViewState.ACCOUNT)} className="hover:line-through">Login</button>
                <span>/</span>
                <button onClick={handleGoToCart} className="hover:line-through">Bag {cartItemCount}</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Side Menu Overlay - AMBUSH Style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[200] bg-white"
          >
            <div className="w-full px-5 pt-4 flex justify-between items-center">
              <div className="flex items-center gap-5">
                <button onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">
                  <CloseIcon className="w-5 h-5" />
                </button>
                <button className="hover:opacity-50 transition-opacity"><SearchIcon className="w-5 h-5" /></button>
              </div>
              <AmbushStyleLogo className="absolute left-1/2 -translate-x-1/2" />
              <div className="flex items-center gap-5">
                <button onClick={() => navigateTo(ViewState.ACCOUNT)} className="hover:opacity-50 transition-opacity"><UserIcon className="w-5 h-5" /></button>
                <button className="hover:opacity-50 transition-opacity"><HeartIcon className="w-5 h-5" /></button>
                <button className="hover:opacity-50 transition-opacity"><BagIcon className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="px-5 pt-14 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
              <nav className="flex flex-col gap-5">
                {menuData.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex flex-col"
                  >
                    <button
                      onClick={() => {
                        if (item.subItems.length > 0) toggleCategory(item.id);
                        else if (item.id === 'JEWELRY' || item.id === 'COLLECTIONS') navigateTo(ViewState.COLLECTION);
                      }}
                      className="flex items-center text-sm font-bold tracking-[0.12em] uppercase hover:opacity-50 transition-opacity"
                    >
                      {item.subItems.length > 0 ? (
                        openCategories.includes(item.id) ? (
                          <ChevronUpIcon className="w-2.5 h-2.5 mr-3" />
                        ) : (
                          <ChevronDownIcon className="w-2.5 h-2.5 mr-3" />
                        )
                      ) : (
                        <ChevronDownIcon className="w-2.5 h-2.5 mr-3 opacity-0" />
                      )}
                      {item.label}
                    </button>
                    <AnimatePresence>
                      {item.subItems.length > 0 && openCategories.includes(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-3 mt-3 ml-6 pb-2">
                            {item.subItems.map((sub, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => navigateTo(ViewState.COLLECTION)}
                                className="flex items-center text-[13px] font-semibold tracking-[0.1em] uppercase hover:opacity-50 text-left opacity-80"
                              >
                                <ChevronDownIcon className="w-2.5 h-2.5 mr-3" />
                                {sub}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
                <div className="flex flex-col gap-5 mt-8">
                  <button className="text-sm font-bold tracking-[0.12em] uppercase hover:opacity-50 text-left">WISHLIST</button>
                  <button onClick={() => navigateTo(ViewState.ACCOUNT)} className="text-sm font-bold tracking-[0.12em] uppercase hover:opacity-50 text-left">MY ACCOUNT</button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`relative z-10 w-full flex-grow flex flex-col items-center ${isLightView ? 'pt-24' : 'justify-center'}`}>
        <AnimatePresence mode="wait">
          {view === ViewState.HOME && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow w-full"
            />
          )}
          {view === ViewState.ACCOUNT && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <AccountView />
            </motion.div>
          )}
          {view === ViewState.COLLECTION && (
            <motion.div
              key="collection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <CollectionView onProductClick={handleProductClick} />
            </motion.div>
          )}
          {view === ViewState.PRODUCT_DETAIL && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <ProductDetailView
                productId={selectedProductId ?? undefined}
                onBack={() => navigateTo(ViewState.COLLECTION)}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}
          {view === ViewState.CART && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <CartView
                onContinueShopping={() => navigateTo(ViewState.COLLECTION)}
                onCheckout={() => alert('Checkout functionality coming soon!')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer - AMBUSH Style */}
      <footer className={`w-full p-6 flex flex-col items-center ${isLightView ? 'bg-white mt-0' : 'fixed bottom-0 left-0 z-40 pointer-events-none'}`}>
        <div className={`w-full flex justify-between items-end mb-5 ${isLightView ? 'flex-wrap gap-y-5 pt-8 border-t border-gray-100' : 'pointer-events-auto'}`}>
          <div className={`flex gap-5 text-[11px] font-semibold tracking-[0.08em] uppercase ${isLightView ? 'opacity-80' : 'opacity-70'}`}>
            <button className="hover:line-through transition-opacity hover:opacity-100">TERMS & CONDITIONS</button>
            {isLightView && <button className="hover:line-through transition-opacity hover:opacity-100">LEGAL</button>}
            <button className="hover:line-through transition-opacity hover:opacity-100">PRIVACY POLICY</button>
            {isLightView && (
              <>
                <button className="hover:line-through transition-opacity hover:opacity-100">COOKIE</button>
                <button className="hover:line-through transition-opacity hover:opacity-100">FAQS</button>
              </>
            )}
            {!isLightView && <button className="hover:line-through transition-opacity hover:opacity-100">CA SUPPLY CHAIN ACT</button>}
          </div>

          <div className={`flex gap-5 text-[11px] font-semibold tracking-[0.08em] uppercase items-center ${isLightView ? 'opacity-80' : 'opacity-70'}`}>
            {isLightView ? (
              <>
                <span className="opacity-60">HAAR © 2025</span>
                <button className="hover:line-through transition-opacity hover:opacity-100">ABOUT US</button>
                <button className="hover:line-through transition-opacity hover:opacity-100">COLLECTION</button>
                <button className="hover:line-through transition-opacity hover:opacity-100">NEWS</button>
                <button className="hover:line-through transition-opacity hover:opacity-100">CONTACT US</button>
                <button className="hover:line-through transition-opacity hover:opacity-100">STORE LOCATOR</button>
                <div className="flex gap-3.5 ml-5">
                  <button className="hover:opacity-100 transition-opacity">INSTAGRAM</button>
                  <button className="hover:opacity-100 transition-opacity">X</button>
                  <button className="hover:opacity-100 transition-opacity">SPOTIFY</button>
                  <button className="hover:opacity-100 transition-opacity">LINE</button>
                </div>
              </>
            ) : (
              <>
                <button className="hover:line-through transition-opacity hover:opacity-100">General</button>
                <button className="hover:line-through transition-opacity hover:opacity-100">Contact</button>
                <div className="flex items-center gap-2">
                  <span>KR</span>
                  <img src="https://flagcdn.com/w20/kr.png" alt="KR" className="w-4 grayscale" />
                </div>
              </>
            )}
          </div>
        </div>

        {!isLightView && (
          <div className="flex flex-col items-center pointer-events-auto">
            <SmallLogoIcon className="mb-3" />
            <div className="text-[11px] font-semibold tracking-[0.1em] uppercase opacity-50">
              © 2025 HAAR LLC. ALL RIGHTS RESERVED
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;
