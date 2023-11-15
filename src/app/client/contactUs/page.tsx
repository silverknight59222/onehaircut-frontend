"use client";
import Footer from '@/components/UI/Footer';
import { LogoCircleFixRight } from '@/components/utilis/Icons';
import { Theme_A } from '@/components/utilis/Themes';
import ClientDashboardLayout from '@/layout/ClientDashboardLayout'
import React, { useState } from "react";

const ContactUs = () => {

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <ClientDashboardLayout>
        <div className="mt-14 mb-5 px-6">

          <div className="flex flex-col items-center justify-center mt-10 mb-5 px-6 sm:px-10 md:px-20">
            <p className="text-black font-medium text-3xl text-center mb-8">
              Contact
            </p>
            <p className="text-stone-500 italic font-normal text-lg text-center my-8">
              Vous voulez nous faire savoir quelque chose, rapporter un problème ou même nous encourager, c'est ici que ca se passe!
            </p>
          </div>
        </div>
      </ClientDashboardLayout>
      <Footer />
    </div>
  )
}
export default ContactUs;