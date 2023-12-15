"use client";
import { dashboard } from "@/api/dashboard";
import { GiftIcon } from "@/components/utilis/Icons";
import DashboardLayout from "@/layout/DashboardLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ClientActivity = () => {
  const activity = [
    {
      user: "Angelina vitale",
      visities: "287",
      order: 30,
      last_order: 54,
      status: "En cours",
      paid: 5946,
      date: "12/07/2023",
      discount: 10,
    },
    {
      user: "Amanda louis",
      visities: "189",
      order: 40,
      last_order: 144,
      status: "Effectuée",
      paid: 4456,
      date: "12/07/2023",
      discount: 10,
    },
    {
      user: "Angelina vitale",
      visities: "287",
      order: 34,
      last_order: 70,
      status: "Demande de remboursement",
      paid: 4456,
      date: "12/07/2023",
      discount: null,
    },
    {
      user: "Amanda louis",
      visities: "189",
      order: 32,
      last_order: 80,
      status: "Remboursé(e)",
      paid: 4456,
      date: "12/07/2023",
      discount: null,
    },
    {
      user: "Angelina vitale",
      visities: "287",
      order: 34,
      last_order: 150,
      status: "Effectuée",
      paid: 5946,
      date: "12/07/2023",
      discount: null,
    },
  ];
  const [notifications, setNotifications] = useState({} as any);
  const fetchSalonNotifications = async () => {
    const { data } = await dashboard.salonNotification()
    setNotifications(data)
  }

  useEffect(()=>{fetchSalonNotifications();})
return (
    <div>
      <DashboardLayout notifications={notifications}>
        <div>
          <p className="text-primary text-2xl font-semibold">Client Activity</p>
          <div className="relative overflow-auto h-[calc(100vh-100px)] w-full px-6 pt-4 bg-[rgba(255,255,255,0.69)] rounded-[20px] mt-5 shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
            <table className="w-full text-sm">
              <thead className="text-grey text-sm font-semibold uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    User
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    <p className="w-28 -mb-4">Date dernière commande</p>
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Visites
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Commandes
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    <p className="w-28 -mb-4">Dernière commande</p>
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    <p className="w-36 -mb-4">Details dernière commande</p>
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    <p className="w-36 -mb-4">Status dernière commande</p>
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Total&nbsp;payé
                  </th>
                </tr>
              </thead>
              <tbody>
                {activity.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-[#636363] font-semibold border-b-2 border-[#F4F4F6] pb-2 last:border-b-0"
                    >
                      <td className="relative px-4 py-4 flex items-center gap-7">
                        <Image
                          src="/assets/user_img.png"
                          alt=""
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        {item.discount &&
                        <div className="absolute top-11 left-[60px]">
                        <GiftIcon/>
                        </div>}
                        <div>
                          <p className="font-semibold w-40 text-black">
                            {item.user}
                          </p>
                          {item.discount && (
                            <p className="text-sm text-[#ED4847] font-semibold mt-1">
                              -{item.discount}%
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center w-28">{item.date}</td>
                      <td className="px-4 py-4 text-center">{item.visities}</td>
                      <td className="px-4 py-4 text-center">{item.order}</td>
                      <td className={`px-4 py-4 text-center w-28 ${index < 2 && 'text-[#ED4847]'}`}>
                        {item.last_order}
                      </td>
                      <td className="px-4 py-4 text-center underline cursor-pointer w-36">Detail</td>
                      <td className={`px-4 py-4 text-center w-36 ${item.status === 'Effectuée' ? 'text-[#7ABF50]' : item.status === 'Demande de remboursement'? 'text-[#FEA463]' : item.status === 'Remboursé(e)'? 'text-[#ED4847]' : '' } `}>
                        {item.status}
                      </td>
                      <td className="px-4 py-4 text-center">{item.paid}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ClientActivity;
