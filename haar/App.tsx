
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
import { ViewState } from './types';
import AccountView from './components/AccountView';
import CollectionView from './components/CollectionView';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>(['JEWELRY']);

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

  const isLightView = view === ViewState.ACCOUNT || view === ViewState.COLLECTION;

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

      {/* Header Navigation */}
      <header className={`fixed top-0 left-0 w-full z-[100] px-8 pt-6 flex justify-between items-center transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isLightView ? 'bg-white/95 border-b border-gray-100 pb-4' : ''}`}>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="hover:opacity-50 transition-opacity"
          >
            {isLightView ? (
              <div className="flex flex-col gap-[3px] w-5">
                <div className="h-[1.5px] w-full bg-black"></div>
                <div className="h-[1.5px] w-full bg-black"></div>
              </div>
            ) : (
              <CrossIcon className="w-6 h-6" />
            )}
          </button>
          {isLightView && <SearchIcon className="w-5 h-5 cursor-pointer" />}
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 top-4">
          {isLightView ? (
            <button onClick={() => navigateTo(ViewState.HOME)} className="text-2xl font-black tracking-tight uppercase mt-2">HAAR®</button>
          ) : (
            <button onClick={() => navigateTo(ViewState.HOME)}><BannerLogo /></button>
          )}
        </div>

        <div className="flex gap-4 text-[11px] font-bold tracking-widest uppercase items-center">
          <div className="flex gap-5 items-center">
            {isLightView ? (
              <>
                <UserIcon onClick={() => navigateTo(ViewState.ACCOUNT)} className="w-5 h-5 cursor-pointer" />
                <HeartIcon className="w-5 h-5 cursor-pointer" />
                <BagIcon className="w-5 h-5 cursor-pointer" />
              </>
            ) : (
              <>
                <button onClick={() => navigateTo(ViewState.ACCOUNT)} className="hover:line-through">Login</button>
                <span>/</span>
                <button className="hover:line-through">Bag 0</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Side Menu Overlay */}
      <div className={`fixed inset-0 z-[200] bg-white transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-full px-6 pt-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsMenuOpen(false)}>
              <CloseIcon className="w-6 h-6" />
            </button>
            <button><SearchIcon className="w-6 h-6" /></button>
          </div>
          <AmbushStyleLogo className="absolute left-1/2 -translate-x-1/2" />
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo(ViewState.ACCOUNT)}><UserIcon className="w-6 h-6" /></button>
            <button><HeartIcon className="w-6 h-6" /></button>
            <button><BagIcon className="w-6 h-6" /></button>
          </div>
        </div>

        <div className="px-6 pt-16 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {menuData.map((item) => (
              <div key={item.id} className="flex flex-col">
                <button 
                  onClick={() => {
                    if (item.subItems.length > 0) toggleCategory(item.id);
                    else if (item.id === 'JEWELRY' || item.id === 'COLLECTIONS') navigateTo(ViewState.COLLECTION);
                  }}
                  className="flex items-center text-[13px] font-bold tracking-widest uppercase hover:opacity-50 transition-opacity"
                >
                  {item.subItems.length > 0 ? (
                    openCategories.includes(item.id) ? (
                      <ChevronUpIcon className="w-3 h-3 mr-4" />
                    ) : (
                      <ChevronDownIcon className="w-3 h-3 mr-4" />
                    )
                  ) : (
                    <ChevronDownIcon className="w-3 h-3 mr-4 opacity-0" />
                  )}
                  {item.label}
                </button>
                {item.subItems.length > 0 && openCategories.includes(item.id) && (
                  <div className="flex flex-col gap-4 mt-4 ml-7">
                    {item.subItems.map((sub, sIdx) => (
                      <button 
                        key={sIdx} 
                        onClick={() => navigateTo(ViewState.COLLECTION)}
                        className="flex items-center text-[12px] font-bold tracking-widest uppercase hover:opacity-50 text-left"
                      >
                        <ChevronDownIcon className="w-3 h-3 mr-4" />
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-6 mt-10">
              <button className="text-[13px] font-bold tracking-widest uppercase hover:opacity-50 text-left">WISHLIST</button>
              <button onClick={() => navigateTo(ViewState.ACCOUNT)} className="text-[13px] font-bold tracking-widest uppercase hover:opacity-50 text-left">MY ACCOUNT</button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className={`relative z-10 w-full flex-grow flex flex-col items-center ${isLightView ? 'pt-24' : 'justify-center'}`}>
        {view === ViewState.HOME && <div className="flex-grow"></div>}
        {view === ViewState.ACCOUNT && <AccountView />}
        {view === ViewState.COLLECTION && <CollectionView />}
      </main>

      {/* Footer */}
      <footer className={`w-full p-8 flex flex-col items-center ${isLightView ? 'bg-white mt-0' : 'fixed bottom-0 left-0 z-40 pointer-events-none'}`}>
        <div className={`w-full flex justify-between items-end mb-6 ${isLightView ? 'flex-wrap gap-y-6 pt-10 border-t border-gray-100' : 'pointer-events-auto'}`}>
          <div className={`flex gap-6 text-[9px] font-bold tracking-widest uppercase ${isLightView ? 'opacity-100' : 'opacity-70'}`}>
            <button className="hover:line-through">TERMS & CONDITIONS</button>
            {isLightView && <button className="hover:line-through">LEGAL</button>}
            <button className="hover:line-through">PRIVACY POLICY</button>
            {isLightView && (
              <>
                <button className="hover:line-through">COOKIE</button>
                <button className="hover:line-through">FAQS</button>
              </>
            )}
            {!isLightView && <button className="hover:line-through">CA SUPPLY CHAIN ACT</button>}
          </div>

          <div className={`flex gap-6 text-[9px] font-bold tracking-widest uppercase items-center ${isLightView ? 'opacity-100' : 'opacity-70'}`}>
            {isLightView ? (
              <>
                <span className="opacity-40">HAAR © 2025</span>
                <button className="hover:line-through">ABOUT US</button>
                <button className="hover:line-through">COLLECTION</button>
                <button className="hover:line-through">NEWS</button>
                <button className="hover:line-through">CONTACT US</button>
                <button className="hover:line-through">STORE LOCATOR</button>
                <div className="flex gap-4 ml-6">
                  <button className="hover:opacity-50">INSTAGRAM</button>
                  <button className="hover:opacity-50">X</button>
                  <button className="hover:opacity-50">SPOTIFY</button>
                  <button className="hover:opacity-50">LINE</button>
                </div>
              </>
            ) : (
              <>
                <button className="hover:line-through">General</button>
                <button className="hover:line-through">Contact</button>
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
            <SmallLogoIcon className="mb-4" />
            <div className="text-[9px] font-bold tracking-widest uppercase opacity-40">
              © 2025 HAAR LLC. ALL RIGHTS RESERVED
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;
