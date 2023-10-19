"use client";
import BaseDropdown from "@/components/UI/BaseDropdown";
import ProgressBar from "@/components/UI/ProgressBar";
import DashboardLayout from "@/layout/DashboardLayout";
import Image from "next/image";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const Revenue = () => {
  const transactions = [
    {
      date: "12/07/2023",
      client: "Amanda louis",
      products: "Carré plongeant",
      price: 80,
      payment_method: "Visa",
      status: "En vérification",
    },
    {
      date: "12/07/2023",
      client: "Angelina vitale",
      products: "Shampoing",
      price: 35,
      payment_method: "Visa",
      status: "En vérification",
    },
    {
      date: "12/07/2023",
      client: "Amanda louis",
      products: "Tresse longue",
      price: 180,
      payment_method: "Paypal",
      status: "Encaissé",
    },
    {
      date: "12/07/2023",
      client: "Angelina vitale",
      products: "Coloration",
      price: 50,
      payment_method: "Paypal",
      status: "Encaissé",
    },
  ];
  const items = [
    { title: 'Jason', color: '#329DF3', value: 20, reveal: 20 },
    { title: 'Melinda', color: '#FF4A4A', value: 17 },
    { title: 'Karim', color: '#7ABF50', value: 13 },
    { title: 'Dyone', color: '#FFC107', value: 9, },
    { title: 'Deborah', color: '#FF8737', value: 23 },
    { title: 'Daniel', color: '#2A5782', value: 18 },
  ]
  const defaultLabelStyle = {
    fontSize: '5px',
    fontWeight: 600,
    fill: '#656565'
  };
  return (
    <div>
      <DashboardLayout>
        <div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl text-[#727272] font-semibold">
                Transactions
              </p>
              <BaseDropdown
                dropdownItems={["Juillet"]}
                width="w-36"
                height="h-11"
                rounded="rounded-[48px]"
                borderClr="border-[rgba(254,49,100,0.56)]"
                backgroundClr="bg-gradient-to-b from-[rgba(254,49,100,0.08)] via-transparent to-[rgba(254,49,100,0.00)]"
              />
            </div>
            <div className="pt-7 pb-4 px-6 bg-white rounded-lg shadow-[0px_4px_33px_0px_rgba(176,176,176,0.25)]">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-[#727272] whitespace-nowrap text-center uppercase bg-[rgba(217,217,217,0.47)] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-x border-[#E4E7EB]"
                      >
                        Client
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-r border-[#E4E7EB]"
                      >
                        Produits
                      </th>
                      <th scope="col" className="px-10 py-3">
                        Prix
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-x border-[#E4E7EB]"
                      >
                        Moyen de paiement
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => {
                      return (
                        <tr
                          key={index}
                          className="text-[#636363] bg-white border-b dark:bg-gray-800 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td scope="row" className="px-6 py-4">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 border-x border-[#E4E7EB]">
                            {transaction.client}
                          </td>
                          <td className="px-6 py-4 border-r border-[#E4E7EB]">
                            {transaction.products}
                          </td>
                          <td className="px-10 py-4">{transaction.price}</td>
                          <td className="px-6 py-4 border-x border-[#E4E7EB]">
                            {transaction.payment_method}
                          </td>
                          <td className="px-6 py-4">{transaction.status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Image
                  src="/assets/downloadIcon.png"
                  alt=""
                  width={32}
                  height={25}
                  className="cursor-pointer"
                />
                <Image
                  src="/assets/printerIcon.png"
                  alt=""
                  width={32}
                  height={25}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col 2xl:flex-row items-start justify-center gap-10 mt-10">
            <div className="w-full">
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="text-xl sm:text-2xl text-[#727272] font-semibold">
                  Objectifs
                </p>
                <BaseDropdown
                  dropdownItems={["Ce mois"]}
                  width="w-36"
                  height="h-10 sm:h-11"
                  rounded="rounded-[48px]"
                  borderClr="border-[rgba(254,49,100,0.56)]"
                  backgroundClr="bg-gradient-to-b from-[rgba(254,49,100,0.08)] via-transparent to-[rgba(254,49,100,0.00)]"
                />
              </div>
              <div className="pt-7 pb-4 px-6 bg-white rounded-lg shadow-[0px_4px_33px_0px_rgba(176,176,176,0.25)]">
                <div className="flex flex-wrap items-center justify-center gap-10">
                  <ProgressBar
                    value={60}
                    name="Nouveaux Clients"
                    number={61}
                    rotation={0.2}
                    color="#7ABF50"
                  />
                  <ProgressBar name="Ajouter un objectif" rotation={0.25} />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-10 mt-7">
                  <ProgressBar
                    value={65}
                    name="Client"
                    number={100}
                    rotation={0.25}
                    color="rgb(254, 57, 95)"
                  />
                  <ProgressBar
                    value={50}
                    name="Commandes"
                    number={31}
                    rotation={0.25}
                    color="#15BAF2"
                  />
                  <ProgressBar name="Ajouter un objectif" rotation={0.25} />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between gap-5 mb-4">
                <p className="text-xl sm:text-2xl text-[#727272] font-semibold">
                  Occupation du personnel
                </p>
                <BaseDropdown
                  dropdownItems={["Ce mois"]}
                  width="w-36"
                  height="h-10 sm:h-11"
                  rounded="rounded-[48px]"
                  borderClr="border-[rgba(254,49,100,0.56)]"
                  backgroundClr="bg-gradient-to-b from-[rgba(254,49,100,0.08)] via-transparent to-[rgba(254,49,100,0.00)]"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20 md:gap-36 2xl:gap-24 pt-7 pb-4 px-6 bg-white rounded-lg shadow-[0px_4px_33px_0px_rgba(176,176,176,0.25)]">
                <div className="w-80">
                  <PieChart
                    data={items}
                    label={({ dataEntry }) => dataEntry.value + '%'}
                    labelStyle={{
                      ...defaultLabelStyle,
                    }}
                    radius={35}
                    labelPosition={115}
                  />
                </div>
                <div className="flex sm:block flex-wrap items-center justify-center gap-x-8 gap-y-4">
                  {items.map((item, index) => {
                    return <div key={index} className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-4 rounded-xl bg-[${item.color}]`} />
                      <p className="font-semibold text-[#ABABAB]">{item.title}</p>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Revenue;
