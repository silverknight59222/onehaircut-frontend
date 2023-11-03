import { CompletedHairStyleIcon, DashboardHeartIcon, DashboardUsersIcon, ProjectIncomeIcon } from "@/components/utilis/Icons";
import React from "react";
import Footer from "@/components/UI/Footer";

const Dashboard = () => {
  const overview = [
    {
      numbers: "98,420",
      text: "Revenue projetés",
      gradient: "bg-gradient-to-t from-red-700 via-red-500 to-red-500",
      borderClr: "bg-[#FE5352]",
      icon: <ProjectIncomeIcon />,
    },
    {
      numbers: "325",
      text: "Nouveaux clients",
      gradient: "bg-gradient-to-b from-blue-400 to-blue-600",
      borderClr: "bg-[#15BAF2]",
      icon: <DashboardUsersIcon />,
    },
    {
      numbers: "3,567",
      text: "Coiffures effectuées",
      gradient: "bg-gradient-to-b from-[#7ABF50] to-[#629E3E]",
      borderClr: "bg-[#7ABF50]",
      icon: <CompletedHairStyleIcon />,
    },
    {
      numbers: "4,7/5",
      text: "",
      gradient: "bg-gradient-to-b from-[#FF266A] to-[#DE235E]",
      borderClr: "bg-[#FF266A]",
      icon: <DashboardHeartIcon />,
    },
  ];
  const messages = [
    {
      name: "Nina jones",
      time: "5 minutes ago",
      text: "Hey You! it’s me again :) I attached new (...)",
    },
    { name: "Robert", time: "5 minutes ago", text: "Hey You!" },
  ];
  const activity = [
    {
      user: "Angelina vitale",
      visities: "287",
      purchases: "34",
      calls: "52",
      profit: "5924",
    },
    {
      user: "Amanda louis",
      visities: "189",
      purchases: "32",
      calls: "30",
      profit: "4456",
    },
  ];

  return (
    <div className="px-4 lg:px-6">
      <Footer />
      <div>
        <p className="text-primary text-2xl font-semibold mb-3">
          Analytical Overview
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-4">
          {overview.map((item, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="flex p-8 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-full ${item.gradient}`}>
                    {item.icon}
                  </div>
                  <div className="ml-8 flex flex-col justify-center">
                    <p className="text-black text-3xl font-semibold">
                      {item.numbers}
                    </p>
                    <p className="text-black font-medium text-sm mt-2">{item.text}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className={`rounded-xl w-2/4 h-2 -mt-1 ${item.borderClr}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-12 flex md:flex-row flex-col items-start gap-12">
        <div className="md:w-6/12 h-[294px] overflow-auto w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
          <p className="text-primary text-2xl font-semibold">Client Activity</p>

          <div className="relative overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-grey text-sm font-semibold mb-9">
                <tr>
                  <th scope="col" className="pr-4 py-3">
                    User
                  </th>
                  <th scope="col" className="pr-4 pl-20 py-3 text-center">
                    Visites
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Purchases
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Calls
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Total&nbsp;Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                {activity.map((item, index) => {
                  return <tr key={index} className="text-black font-semibold border-b-2 border-[#F4F4F6] pb-2">
                    <th scope="row" className="pr-6 py-4 flex items-center gap-4">
                      <img
                        src="/assets/user_img.png"
                        alt=""
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      {item.user}
                    </th>
                    <th className="pr-4 pl-20 py-4 text-center">{item.visities} </th>
                    <th className="px-4 py-4 text-center">{item.purchases} </th>
                    <th className="px-4 py-4 text-center">{item.calls}</th>
                    <th className="px-4 py-4 text-center text-[#3EAF34]">
                      {item.profit}
                    </th>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-6/12 h-[294px] overflow-auto w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
          <div className="flex items-center justify-between">
            <p className="text-primary text-2xl font-semibold">Messages</p>
            <div className="bg-secondary w-6 h-6 text-white rounded-full flex items-center justify-center">
              2
            </div>
          </div>
          {messages.map((item, index) => {
            return <div key={index} className="flex items-center gap-7 border-t-2 border-[#F4F4F6] pt-2 pb-3 mt-4">
              <img
                src="/assets/user_img.png"
                alt=""
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="-mb-5">
                <div className="flex items-center gap-1.5">
                  <p className="text-black font-semibold">{item.name} </p>
                  <p className="text-grey text-xs">{item.time} </p>
                </div>
                <p className="text-black font-semibold">{item.text}</p>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
