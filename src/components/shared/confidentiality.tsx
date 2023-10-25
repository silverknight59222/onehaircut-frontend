"use client"
import React from 'react';
import { LogoIcon, UserIcon } from '../utilis/Icons';
import { useRouter } from "next/navigation";
import Footer from "@/components/UI/Footer";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import { Theme_A } from '../utilis/Themes';

const confidentialityPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <Footer />
      <div className="flex justify-between w-full p-5 border-b border-[#EBF0F2]">
        <div className='flex items-center justify-center cursor-pointer'
          onClick={() => router.push('/')}>
          <LogoIcon />
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer transform hover:scale-110 transition-transform"
            onClick={() => router.push('/login')}>
            <UserIcon />
          </div>
        </div>
      </div>
      <div>
        <h1 className={`my-6 ${Theme_A.textFont.headerH1}`}>Confidentialités</h1>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>Chapitres 1</h1>
        <p className='pb-6'>
          This is the standard text that will be displayed in the component.
          You can replace this text with your own content as needed.
        </p>
        <p className='pb-6'>
          This is paragraph number 2
        </p>
      </div>

    </div>
  );
};

export default confidentialityPage;
