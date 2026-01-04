
import React from 'react';

export const CrossIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M45 10h10v25h25v10H55v45H45V45H20V35h25V10z" />
    <circle cx="50" cy="40" r="2" fill="white" />
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

interface IconProps {
  className?: string;
  onClick?: () => void;
}

export const UserIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <svg viewBox="0 0 24 24" className={className} onClick={onClick} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <svg viewBox="0 0 24 24" className={className} onClick={onClick} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const BagIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <svg viewBox="0 0 24 24" className={className} onClick={onClick} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export const BannerLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <div className="relative group cursor-pointer">
      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
        <CrossIcon className="w-4 h-4" />
      </div>
      <div className="border-t-2 border-b-2 border-black py-1 px-10">
        <h1 className="gothic-font text-5xl tracking-[0.2em] leading-none">
          HAAR
        </h1>
      </div>
    </div>
  </div>
);

export const AmbushStyleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <h1 className={`text-2xl font-black tracking-widest uppercase ${className}`}>
    HAAR®
  </h1>
);

export const SmallLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center justify-center border border-black p-1 ${className}`}>
     <CrossIcon className="w-4 h-4" />
  </div>
);
