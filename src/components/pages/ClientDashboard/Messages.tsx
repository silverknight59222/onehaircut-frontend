"use client";
import { CircleRight, EmojiIcon, PlusIcon, SendIcon } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React from "react";

const Messages = () => {
    const messages = [
        { name: "Golden Barber", time: "12/03/2023", num: 2 },
        { name: "Safra haircut", time: "05/03/2023", num: 1 },
        { name: "Bore Cutstyle", time: "27/02/2023", num: null },
        { name: "DinoBloCut", time: "11/02/2023", num: null },
        { name: "Christophe dom", time: "14/01/2022", num: null },
    ];
    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
                <CircleRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-10 mb-5 px-8 sm:px-14 2xl:px-36">
                    <p className="text-black font-medium text-3xl text-center mb-10">
                        Messagerie
                    </p>
                    <div className="flex flex-col md:flex-row items-start justify-center gap-10 2xl:gap-20">
                        <div className="w-full md:w-6/12 xl:w-5/12 h-[700px] rounded-3xl bg-white py-4 px-8 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
                            {messages.map((message, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-5"
                                    >
                                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center justify-center gap-2 sm:gap-4">
                                            <p className="text-xs text-[#666] w-32 md:w-24">{message.time}</p>
                                            <p className="text-black">{message.name}</p>
                                        </div>
                                        {message.num ? (
                                            <p className="w-5 h-5 rounded-full text-xs flex items-center justify-center text-white bg-gradient-to-tr from-red-500 to-yellow-400">
                                                {message.num}
                                            </p>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative z-10 w-full md:w-6/12 xl:w-7/12 h-[700px] overflow-auto rounded-3xl bg-white py-4 px-8 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
                            <Image
                                src="/assets/messages1.png"
                                alt=""
                                width={50}
                                height={50}
                            />
                            <Image src='/assets/messages2.png' alt='' width={50} height={50} className="absolute bottom-6 right-9" />
                            <div className="mt-6">
                                <p className="text-black">
                                    You: <span className="text-xs text-[#666]">15:33</span>
                                </p>
                                <p className="text-sm text-[#2F2F2F] mt-2">
                                    Merci pour les informations XD
                                </p>
                            </div>
                            <div className="mt-6">
                                <p className="text-black">
                                    Safra haircut:{" "}
                                    <span className="text-xs text-[#666]">15:25</span>
                                </p>
                                <p className="text-sm text-[#2F2F2F] mt-2">
                                    Oui, je peux le faire, regardez sur mes photos de
                                    présentation.{" "}
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-center gap-3 mt-10">
                                <PlusIcon />
                                <div className="relative w-9/12">
                                    <input className="w-full border border-[#A3A3A3] rounded-xl h-9" />
                                    <div className="absolute top-1.5 right-1.5">
                                        <EmojiIcon />
                                    </div>
                                </div>
                                <SendIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </ClientDashboardLayout>
        </div>
    );
};

export default Messages;
