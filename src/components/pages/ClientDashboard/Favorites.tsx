"use client";
import { RegistrationCheckedIcon } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React from "react";

const Favorites = () => {
    const items = [
        { image: "/assets/img1.png", name: "Coiffure1" },
        { image: "/assets/img2.png", name: "Coiffure2" },
        { image: "/assets/img3.png", name: "Coiffure3" },
    ];
    return (
        <div>
            <ClientDashboardLayout>
                <div className="flex flex-col items-center justify-center mt-10 mb-5 px-8">
                    <p className="text-black font-medium text-3xl text-center mb-10 static">
                        Gestion des favoris
                    </p>
                    <div className="relative flex flex-col items-center justify-center my-28">
                        <div>
                            <p className="text-black text-3xl mb-3">Coiffures</p>
                            <div className="w-[750px] xl:w-[900px] 2xl:w-[1090px] h-7 flex items-center rounded-xl text-white px-5 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-200">
                                3 / 10
                            </div>
                        </div>
                        <div className="absolute -top-10 right-10 xl:right-auto flex items-center justify-center gap-8">
                            {items.map((item, index) => {
                                return (
                                    <div key={index} className="flex flex-col items-center justify-center">
                                        <div

                                            className="shadow-md rounded-xl my-2"
                                        >
                                            <div className="relative w-max px-4 pt-4 bg-[#F5F5F5] rounded-t-xl">
                                                <div className="relative w-32 h-32">
                                                    <Image src={item.image} fill={true} alt="" />
                                                </div>
                                            </div>
                                            <div className="w-32 rounded-b-xl bg-gradient-to-r from-pinkGradientFrom via-pinkGradientVia to-pinkGradientTo">
                                                <p className="rounded-b-xl flex items-center justify-center py-2 text-sm text-black font-medium">
                                                    {item.name}
                                                </p>
                                            </div>
                                        </div>
                                        <RegistrationCheckedIcon />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-16 overflow-x-auto">
                        <p className="text-black text-3xl mb-3">Salons</p>
                        <div className="relative">
                            <table className="w-full md:w-[750px] xl:w-[900px] 2xl:w-[1090px]">
                                <thead className="text-white h-7 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-200">
                                    <tr>
                                        <td scope="col" className="px-6">
                                            4/10
                                        </td>
                                        <td scope="col" className="text-center font-bold px-6">
                                            Geneve
                                        </td>
                                        <td scope="col" className="text-center font-bold px-6">
                                            Los&nbsp;Angeles
                                        </td>
                                        <td scope="col" className="text-center font-bold px-6">
                                            Paris
                                        </td>
                                        <td scope="col" className="text-center font-bold px-6">
                                            San Diego
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-black">
                                        <td></td>
                                        <td className="px-3 py-4">
                                            <div className="flex flex-col items-center justify-center">
                                                <Image src='/assets/salon1.png' width={120} height={120} alt="" />
                                                <p className="mb-2 mt-1 text-center">Christophe dom</p>
                                                <RegistrationCheckedIcon />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center justify-center">
                                                <Image src='/assets/salon2.png' width={120} height={120} alt="" />
                                                <p className="mb-2 mt-1 text-center">Golden Barber</p>
                                                <RegistrationCheckedIcon />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center justify-center">
                                                <Image src='/assets/salon3.png' width={120} height={120} alt="" />
                                                <p className="mb-2 mt-1 text-center">Bore Cutstyle</p>
                                                <RegistrationCheckedIcon />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center justify-center">
                                                <Image src='/assets/salon4.png' width={120} height={120} alt="" />
                                                <p className="mb-2 mt-1 text-center">DinoBloCut</p>
                                                <RegistrationCheckedIcon />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </ClientDashboardLayout>
        </div>
    );
};

export default Favorites;
