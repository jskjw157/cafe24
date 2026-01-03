
import React from 'react';

const AccountView: React.FC = () => {
  return (
    <div className="w-full max-w-[540px] px-6 pb-20 flex flex-col items-center bg-white text-black">
      <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase mb-16 opacity-80">MY ACCOUNT</h2>

      {/* Returning Customer Section */}
      <section className="w-full flex flex-col mb-20">
        <h3 className="text-[11px] font-bold tracking-[0.1em] uppercase mb-10">RETURNING CUSTOMER</h3>
        
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">EMAIL*</label>
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full border border-black p-4 text-[13px] focus:outline-none placeholder:opacity-40"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest uppercase opacity-80">PASSWORD*</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Password"
                className="w-full border border-black p-4 text-[13px] focus:outline-none placeholder:opacity-40"
              />
              <button className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-widest uppercase underline decoration-1">SHOW</button>
            </div>
          </div>

          <button className="text-[10px] font-bold underline decoration-1 text-left hover:opacity-50 mt-1">Did you forget your password?</button>

          <div className="flex items-center gap-3 mt-4">
            <div className="w-4 h-4 border border-black flex items-center justify-center cursor-pointer">
              <div className="w-2.5 h-2.5 bg-black"></div>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wide">Remember me</span>
          </div>

          <button className="w-full border border-black py-4 mt-8 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-300">
            LOGIN
          </button>
        </div>
      </section>

      {/* Create Account Section */}
      <section className="w-full flex flex-col mb-24">
        <h3 className="text-[11px] font-bold tracking-[0.1em] uppercase mb-10">CREATE AN ACCOUNT</h3>
        <p className="text-[11px] leading-relaxed mb-10 opacity-90 max-w-lg">
          Create an account to make purchases easier and faster, and in addition enjoy privileged access to exclusive offers!
        </p>
        <button className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-zinc-900 transition-all duration-300">
          REGISTER
        </button>
      </section>

      {/* Newsletter Section */}
      <section className="w-full flex flex-col items-center text-center pt-24 border-t border-gray-100">
        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-12">SUBSCRIBE TO THE NEWSLETTER</h3>
        <p className="text-[11px] leading-relaxed mb-10 max-w-[440px] opacity-80">
          To get exclusive access to our private promotion and to stay up to date on latest drops, limited edition collabs, and special offers.
        </p>
        
        <div className="w-full relative mb-8">
          <input 
            type="email" 
            placeholder="Email address"
            className="w-full border border-black p-4 text-[12px] focus:outline-none placeholder:opacity-40"
          />
          <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-[0.2em] uppercase hover:opacity-50">SIGN UP</button>
        </div>

        <p className="text-[10px] leading-relaxed opacity-80 max-w-[480px]">
          I have read the privacy policy and I consent to the processing of my personal data for marketing purposes. If you wish to unsubscribe from our newsletter, you may do so at any time by <button className="underline font-bold decoration-1">clicking here.</button>
        </p>
      </section>
    </div>
  );
};

export default AccountView;
