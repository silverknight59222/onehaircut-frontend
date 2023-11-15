"use client";
import Footer from '@/components/UI/Footer';
import { LogoCircleFixRight } from '@/components/utilis/Icons';
import { Theme_A } from '@/components/utilis/Themes';
import DashboardLayout from '@/layout/DashboardLayout';
import React, { useState } from "react";
import DropdownMenu from "@/components/UI/DropDownMenu";

const ContactUs = () => {

  //For Dropdown lists 
  const contactType = [
    "Problème",
    "Information",
  ];

  const [SelectedContactType, setSelectedContactType] = useState<string>('');
  // for input text field
  const [multilineText, setMultilineText] = useState('');

  const handleMultilineChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMultilineText(event.target.value);
  };

  const onSend = () => {
    // TODO send per email to us
  };

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <DashboardLayout>
        <div className="mt-14 mb-5 px-6">

          <div className="flex flex-col items-center justify-center mt-10 mb-5 px-6 sm:px-10 md:px-20">
            <p className="text-black font-medium text-3xl text-center mb-8">
              Contact
            </p>
            <p className="text-stone-500 italic font-normal text-lg text-center my-8">
              Vous voulez nous faire savoir quelque chose, rapporter un problème ou même nous encourager, c'est ici que ca se passe!
            </p>
            <DropdownMenu
              dropdownItems={contactType}
              fctToCallOnClick={setSelectedContactType}
              menuName="Type de contact"
              selectId={SelectedContactType}
            />
            {SelectedContactType !== '' &&
              <div className="flex flex-col items-center justify-center ">
                <textarea
                  id="multilineInput"
                  value={multilineText}
                  onChange={handleMultilineChange}
                  className={`${Theme_A.fields.inputField2}`}
                  rows={8} // Specify the number of visible rows
                  cols={80} // Specify the number of visible columns
                />
                <button
                  onClick={() => onSend()}
                  disabled={multilineText == ''}
                  className={` rounded-xl mt-6 w-2/5 h-16 ${multilineText == '' ? Theme_A.button.bigWhiteGreyButton : Theme_A.button.bigGradientButton} `}>
                  Envoyer
                </button>
              </div>
            }
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </div>
  )
}
export default ContactUs;