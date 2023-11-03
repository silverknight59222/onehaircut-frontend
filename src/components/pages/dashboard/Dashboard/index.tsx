import { CompletedHairStyleIcon, DashboardHeartIcon, DashboardUsersIcon, ProjectIncomeIcon } from "@/components/utilis/Icons";
import React, { useMemo, useState } from "react";
import Card from '@mui/material/Card'
import "chart.js/auto";
import ChartjsLineChart from '@/views/charts/chartjs/ChartjsLineChart'
// import ApexDonutChart from '@/views/charts/chartjs/ApexDonutChart'
import DynamicClientTable from '@/views/datatable/DynamicClientTable'
import DialogShareProject from '@/views/pages/dialog-examples/DialogShareProject'
import Grid from '@mui/material/Grid'
import Footer from "@/components/UI/Footer";
import BaseDropdown from "@/components/UI/BaseDropdown";
import ProgressBar from "@/components/UI/ProgressBar";
import { overviewData, messagesData, activityData, clientTableData } from "@/data/dashboardData";
import DropdownMenu from "@/components/UI/DropDownMenu";
import {ColorsThemeA} from "@/components/utilis/Themes";
import FullTable from "@/views/datatable/FullTable";
import ChartjsBarChart from '@/views/charts/chartjs/ChartjsBarChart'
const Dashboard = () => {
    const overview = [
        {
            numbers: "98,420",
            text: "Revenue projetés",
            gradient: "bg-gradient-to-t from-red-700 via-red-500 to-red-500",
            borderClr: "bg-[#FE5352]",
            icon: <ProjectIncomeIcon/>,
        },
        {
            numbers: "325",
            text: "Nouveaux clients",
            gradient: "bg-gradient-to-b from-blue-400 to-blue-600",
            borderClr: "bg-[#15BAF2]",
            icon: <DashboardUsersIcon/>,
        },
        {
            numbers: "3,567",
            text: "Coiffures effectuées",
            gradient: "bg-gradient-to-b from-[#7ABF50] to-[#629E3E]",
            borderClr: "bg-[#7ABF50]",
            icon: <CompletedHairStyleIcon/>,
        },
        {
            numbers: "4,7/5",
            text: "",
            gradient: "bg-gradient-to-b from-[#FF266A] to-[#DE235E]",
            borderClr: "bg-[#FF266A]",
            icon: <DashboardHeartIcon/>,
        },
    ];
  const messages = useMemo(() => messagesData, []);
  const activity = useMemo(() => activityData, []);
  const data = useMemo(() => clientTableData, []);
    const Month = [
        "January",
        "February",]
    const handleNewMonth = (item: string) => {
        // TODO: add backend to save the new preference
    }

  const headers = ["User", "Date dernière commande", "Visites", "Commandes",
    "Dernière commande", "Details dernière commande", "Status dernière commande", "Total payé"];

    const headersValue:any = [
        "Date",
        "Client",
        "Produits",
        "Prix",
        "Facture",
        "Moyen de paiement",
        "Status"
    ];

    const dataValue = [
        {
            Date: "12/07/2023",
            Client: "Amanda louis",
            Produits: "Carré plongeant",
            Prix: "80 $",
            Facture: "non Disponible",
            "Moyen de paiement": "Visa",
            Status: "En vérification"
        },
        {
            Date: "12/07/2023",
            Client: "Amanda louis",
            Produits: "Carré plongeant",
            Prix: "80 $",
            Facture: "non Disponible",
            "Moyen de paiement": "Visa",
            Status: "En vérification"
        },
        {
            Date: "12/07/2023",
            Client: "Amanda louis",
            Produits: "Carré plongeant",
            Prix: "80 $",
            Facture: "non Disponible",
            "Moyen de paiement": "Visa",
            Status: "En vérification"
        },
        {
            Date: "12/07/2023",
            Client: "Amanda louis",
            Produits: "Carré plongeant",
            Prix: "80 $",
            Facture: "non Disponible",
            "Moyen de paiement": "Visa",
            Status: "En vérification"
        },
        {
            Date: "12/07/2023",
            Client: "Amanda louis",
            Produits: "Carré plongeant",
            Prix: "80 $",
            Facture: "non Disponible",
            "Moyen de paiement": "Visa",
            Status: "En vérification"
        },
        {
            Date: "12/07/2023",
            Client: "Amanda louis",
            Produits: "Carré plongeant",
            Prix: "80 $",
            Facture: "non Disponible",
            "Moyen de paiement": "Visa",
            Status: "En vérification"
        },
        {
            Date: "12/07/2023",
            Client: "Amanda louis",
            Produits: "Carré plongeant",
            Prix: "80 $",
            Facture: "non Disponible",
            "Moyen de paiement": "Visa",
            Status: "En vérification"
        },    {
            Date: "12/07/2023",
            Client: "Amanda louis",
            Produits: "Carré plongeant",
            Prix: "80 $",
            Facture: "non Disponible",
            "Moyen de paiement": "Visa",
            Status: "En vérification"
        },
        {
            Date: "12/07/2023",
            Client: "Amanda louis",
            Produits: "Carré plongeant",
            Prix: "80 $",
            Facture: "non Disponible",
            "Moyen de paiement": "Visa",
            Status: "En vérification"
        },

        // ... Add more rows as needed
    ];

  const [showDialog, setShowDialog] = useState(false);


  return (
    <div className="px-4 lg:px-6">
      <Footer />
            <ChartjsBarChart yellow='#358DF2' labelColor='' borderColor='#ccc' />
      <div>
        <p className="text-primary text-2xl font-semibold mb-3">
          Analytical Overview
        </p>
          {/*<ApexDonutChart />*/}
        <div className="p-4 bg-gray-200">
          <DynamicClientTable headers={headers} data={data} />
        </div>
        <Grid container spacing={6} className='match-height'>
        <Grid item md={4} sm={6} xs={12}>
            <DialogShareProject show={showDialog} setShow={setShowDialog}>
                <FullTable headers={headersValue} data={dataValue} />
            </DialogShareProject>
        </Grid>
        </Grid>
        {/*<DialogShareProject />*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-4">
          {overview.map((item, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div onClick={() => setShowDialog(true)} className="cursor-pointer flex p-8 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
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
        <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                {/* Revenue Card */}
                <Card className="h-full">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <p className="text-xl sm:text-2xl text-[#727272] font-semibold pl-10 mt-6">
                            Revenue
                        </p>
                      <span className="mr-4 mt-4">
                     <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                                   fctToCallOnClick={handleNewMonth} />
                    {/*<BaseDropdown*/}
                    {/*    dropdownItems={["This month"]}*/}
                    {/*    width="w-36"*/}
                    {/*    height="h-10 sm:h-11"*/}
                    {/*    rounded="rounded-[48px]"*/}
                    {/*    borderClr="border-[rgba(254,49,100,0.56)]"*/}
                    {/*    backgroundClr="bg-gradient-to-b from-[rgba(254,49,100,0.08)] via-transparent to-[rgba(254,49,100,0.00)]"*/}
                    {/*/>*/}
                </span>
                    </div>
                    <div>
                        <ChartjsLineChart
                            white="#ffffff"
                            primary="#3498db"
                            secondary="#2ecc71"
                            labelColor="#9b9b9b"
                            borderColor="#eaeaea"
                            legendColor="#606060"
                        />
                    </div>
                </Card>

                {/* Visits Card */}
              <Card className="h-full flex flex-col">
                {/* Top content for 'Visits' and dropdown */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <p className="text-xl sm:text-2xl text-[#727272] font-semibold pl-10 mt-6">
                    Visits
                  </p>
                  <span className="mr-4 mt-4">
                   <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                                 fctToCallOnClick={handleNewMonth} />
        </span>
                </div>
                <p className="text-xl sm:text-2xl text-[#727272] font-semibold text-center">
                  Conversion: <span className='text-red-500'>31%</span>
                </p>

                {/* Wrapper for ProgressBar components with flex-grow */}
                <div className="flex flex-wrap items-center justify-center gap-10 flex-grow">
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
                </div>
              </Card>


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
