
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Sub-components for identifying icons/graphics ---
const Barcode = () => (
  <div className="flex justify-center items-center h-12 w-full max-w-[400px] overflow-hidden gap-[2px]">
    {Array.from({ length: 60 }).map((_, i) => (
      <div
        key={i}
        className="bg-black h-full"
        style={{ width: Math.random() > 0.5 ? '2px' : '4px', opacity: Math.random() > 0.1 ? 1 : 0 }}
      />
    ))}
  </div>
);

// --- Guest View (Login/Register Split Layout) ---
const GuestView = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full max-w-[1200px] px-6 md:px-10 flex flex-col items-center">
      <motion.h2 variants={itemVariants} className="text-[11px] font-medium tracking-[0.4em] uppercase mb-16 md:mb-24 opacity-80 mt-10">
        MY ACCOUNT
      </motion.h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 lg:gap-32">
        {/* Returning Customer */}
        <motion.section variants={itemVariants} className="w-full flex flex-col">
          <h3 className="text-[11px] font-medium tracking-[0.1em] uppercase mb-8 md:mb-12">RETURNING CUSTOMER</h3>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">EMAIL*</label>
              <input type="email" placeholder="Email address" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none placeholder:opacity-40 bg-white rounded-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">PASSWORD*</label>
              <div className="relative">
                <input type="password" placeholder="Password" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none placeholder:opacity-40 bg-white rounded-none" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-widest uppercase underline decoration-1 hover:opacity-50">SHOW</button>
              </div>
            </div>
            <button className="text-[10px] font-bold underline decoration-1 text-left hover:opacity-50 mt-1 uppercase tracking-wide">Did you forget your password?</button>
            <button className="w-full border border-black py-4 mt-6 text-[11px] font-bold tracking-[0.3em] uppercase bg-white text-black hover:bg-black hover:text-white transition-all duration-300">LOGIN</button>
          </div>
        </motion.section>

        {/* Create Account */}
        <motion.section variants={itemVariants} className="w-full flex flex-col">
          <h3 className="text-[11px] font-medium tracking-[0.1em] uppercase mb-8 md:mb-12">CREATE AN ACCOUNT</h3>
          <p className="text-[11px] leading-[1.8] mb-10 opacity-90">Create an account to make purchases easier and faster, and in addition enjoy privileged access to exclusive offers!</p>
          <button className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-[0.3em] uppercase border border-black hover:bg-white hover:text-black transition-all duration-300">REGISTER</button>
        </motion.section>
      </div>
    </div>
  );
};

// --- Dashboard View (Account Details) ---
const DashboardView = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const menuItems = [
    "ACCOUNT DETAILS",
    "ORDER HISTORY",
    "ADDRESSES",
    "PAYMENT CARDS",
    "CHANGE PASSWORD",
    "WISHLIST",
    "LOGOUT"
  ];

  return (
    <div className="w-full max-w-[1280px] px-6 md:px-10 flex flex-col items-center">
      {/* Dashboard Header */}
      <div className="flex flex-col items-center mb-16 md:mb-24 mt-4 w-full">
        <h2 className="text-[11px] font-medium tracking-[0.4em] uppercase mb-6 opacity-80">MY ACCOUNT</h2>
        <Barcode />
        <span className="text-[10px] font-bold tracking-[0.2em] mt-3 uppercase">MEMBER ID 5U86MTZ6D3A3NL3G</span>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        {/* Sidebar */}
        <motion.aside variants={itemVariants} className="w-full lg:w-48 flex-shrink-0">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
              <li key={idx} className={`text-[11px] font-bold tracking-[0.1em] uppercase cursor-pointer hover:opacity-50 transition-opacity ${idx === 0 ? 'mode-active decoration-1 underline underline-offset-4' : 'opacity-60'}`}>
                {item}
              </li>
            ))}
          </ul>
        </motion.aside>

        {/* Main Content Form */}
        <motion.div variants={itemVariants} className="flex-grow w-full max-w-3xl">
          <h3 className="text-[11px] font-medium tracking-wide uppercase mb-2">Your client (member) details.</h3>
          <p className="text-[10px] opacity-60 mb-8">*Required fields</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 w-full mb-10">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">FIRST NAME*</label>
              <input type="text" defaultValue="JIWON" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-white rounded-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">LAST NAME*</label>
              <input type="text" defaultValue="JEONG" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-white rounded-none" />
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">ADDRESS LINE 1*</label>
              <input type="text" defaultValue="ssdfsdf sdfs sdf" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-white rounded-none" />
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">ADDRESS LINE 2</label>
              <input type="text" defaultValue="302ho" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-white rounded-none" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">CITY*</label>
              <input type="text" defaultValue="wyodfosjf" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-white rounded-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">POSTCODE</label>
              <input type="text" defaultValue="16954" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-white rounded-none" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">COUNTRY*</label>
              <select className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-white rounded-none appearance-none">
                <option>Korea, Republic of</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">STATE*</label>
              <input type="text" defaultValue="13213" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-white rounded-none" />
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">PHONE*</label>
              <input type="tel" defaultValue="821082048235" className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-white rounded-none" />
              <p className="text-[10px] opacity-50 mt-1">Example: 09012345678 (No hyphens. Single-byte)<br />※Please do not enter Country code</p>
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col gap-2 mt-4">
              <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">EMAIL ADDRESS*</label>
              <input type="email" defaultValue="jskjw157@gmail.com" readOnly className="w-full border border-black px-4 py-3 text-[13px] focus:outline-none bg-gray-50 text-gray-500 rounded-none cursor-not-allowed" />
            </div>
          </div>

          <div className="flex items-start gap-3 mb-12">
            <div className="min-w-[14px] h-[14px] border border-black flex items-center justify-center cursor-pointer mt-0.5">
              <div className="w-[8px] h-[8px] bg-black"></div>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wide leading-tight">
              If you would prefer not to receive news and special promotion by email from AMBUSHDESIGN.COM, please untick the box
            </p>
          </div>

          <button className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all duration-300">
            SAVE CHANGES
          </button>
        </motion.div>
      </div>
    </div>
  );
}

const AccountView: React.FC = () => {
  // Demo State: Toggle this to false to see the Login Layout
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full pb-20 flex flex-col items-center bg-white text-black mx-auto"
    >
      {isLoggedIn ? <DashboardView /> : <GuestView />}

      {/* Newsletter Section (Global Footer like) */}
      <motion.section variants={itemVariants} className="w-full flex flex-col items-center text-center pt-24 md:pt-32 border-t border-gray-100 mt-20 md:mt-32 px-6">
        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-12">SUBSCRIBE TO THE NEWSLETTER</h3>
        <p className="text-[11px] leading-relaxed mb-4 max-w-[440px] opacity-80">
          To get exclusive access to our private promotion and to stay up to date on latest drops, limited edition collabs, and special offers.
        </p>

        <div className="w-full max-w-[480px] relative mb-4">
          <input
            type="email"
            placeholder="jskjw157@gmail.com"
            className="w-full border border-black px-4 py-3 text-[12px] focus:outline-none placeholder:opacity-40 bg-white rounded-none"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-[0.2em] uppercase hover:opacity-50">SIGN UP</button>
        </div>

        <p className="text-[10px] leading-relaxed opacity-60 max-w-[480px]">
          I have read the privacy policy and I consent to the processing of my personal data for marketing purposes. If you wish to unsubscribe from our newsletter, you may do so at any time by <button className="underline font-bold decoration-1">clicking here.</button>
        </p>
      </motion.section>
    </motion.div>
  );
};

export default AccountView;
