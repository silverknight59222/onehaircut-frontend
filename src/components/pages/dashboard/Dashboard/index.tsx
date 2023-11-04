import { CompletedHairStyleIcon, DashboardHeartIcon, DashboardUsersIcon, ProjectIncomeIcon } from "@/components/utilis/Icons";
import React, { useMemo, useState } from "react";
import Card from '@mui/material/Card'
import "chart.js/auto";
import ChartjsLineChart from '@/views/charts/chartjs/ChartjsLineChart'
import DynamicClientTable from '@/views/datatable/DynamicClientTable'
import ReactApexChart from 'react-apexcharts';
import DialogShareProject from '@/views/pages/dialog-examples/DialogShareProject'
import Grid from '@mui/material/Grid'
import Footer from "@/components/UI/Footer";
import RateModal from "@/components/pages/dashboard/Dashboard/ModalComponent/RateModal";
import StaffModal from "@/components/pages/dashboard/Dashboard/ModalComponent/StaffModal";
import GoalsModal from "@/components/pages/dashboard/Dashboard/ModalComponent/GoalsModal";
import TransactionList from "@/components/pages/dashboard/Dashboard/MainDashboardComponents/TransactionList";
import ProgressBar from "@/components/UI/ProgressBar";
import {
    overviewData,
    messagesData,
    activityData,
    activityClientData,
    clientTableData,
    TopClientData, topClientTableData
} from "@/data/dashboardData";
import DropdownMenu from "@/components/UI/DropDownMenu";
import {ColorsThemeA} from "@/components/utilis/Themes";
import FullTable from "@/views/datatable/FullTable";
import BaseDropdown from "@/components/UI/BaseDropdown";
import Image from "next/image";
import TopClientList from "@/components/pages/dashboard/Dashboard/MainDashboardComponents/TopClientList";
import RechartSingleBarChart from "@/views/charts/chartjs/RechartSingleBarChart";
import RechartsLineChart from "@/views/charts/chartjs/RechartsLineChart";

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
    type ModalName = 'fullTable' | 'rate' | 'clientActivity' | 'staff' | 'topClient' | 'goals'; // Add more modal keys as needed

    const [modals, setModals] = useState<{ [key in ModalName]?: boolean }>({
        fullTable: false,
        rate: false,
        clientActivity: false,
        staff: false,
        topClient: false,
        goals: false,
        // ... initialize other modals as needed
    });

// Update the toggleModal function to use the ModalName type for its parameter
    const toggleModal = (modal: ModalName) => {
        setModals(prev => ({ ...prev, [modal]: !prev[modal] }));
    };
  const messages = useMemo(() => messagesData, []);
  const activity = useMemo(() => activityData, []);
  const data = useMemo(() => clientTableData, []);
    const Month = [
        "ce mois",
        ]
    const handleNewMonth = (item: string) => {
        // TODO: add backend to save the new preference
    }

  const headers = ["Utilisateur", "Date dernière commande", "Visites", "Commandes",
    "Dernière commande", "Details dernière commande", "Status dernière commande", "Total payé"];

    const topClientheaders = ["Utilisateur", "Date dernière commande", "Visites", "Commandes",
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

    const staffData = [
        { name: 'Staff 1', value: 800 },
        { name: 'Staff 2', value: 750 },
        { name: 'Staff 3', value: 600 },
        { name: 'Staff 4', value: 400 },
        { name: 'Staff 5', value: 700 },
    ];

    const fillColor = '#3C8A41'; // Example fill color
    const barSize = 80; // Example barSize

  return (
    <div className="px-4 lg:px-6">
      <Footer />
      <div>
        <p className="text-primary text-2xl font-semibold mb-3">
          Analytical Overview
        </p>

        <Grid container spacing={6} className='match-height'>
        <Grid item md={4} sm={6} xs={12}>
            <DialogShareProject show={modals.fullTable} setShow={() => toggleModal('fullTable')}>
                <FullTable headers={headersValue} data={dataValue} />
            </DialogShareProject>
            <DialogShareProject show={modals.rate} setShow={() => toggleModal('rate')}>
                <RateModal/>
            </DialogShareProject>
            <DialogShareProject show={modals.clientActivity} setShow={() => toggleModal('clientActivity')}>
                <p className="text-2xl text-[#727272] font-semibold text-left cursor-pointer">
                    Activités des clients
                </p>
                <DynamicClientTable headers={headers} data={data} />
            </DialogShareProject>

            <DialogShareProject show={modals.topClient} setShow={() => toggleModal('topClient')}>
                <p className="text-2xl text-[#727272] font-semibold text-left cursor-pointer">
                    Top clients
                </p>
                <DynamicClientTable headers={topClientheaders} data={topClientTableData} />
            </DialogShareProject>

            <DialogShareProject show={modals.staff} setShow={() => toggleModal('staff')}>
                <StaffModal/>
            </DialogShareProject>
            <DialogShareProject show={modals.goals} setShow={() => toggleModal('goals')}>
                <GoalsModal/>
            </DialogShareProject>
        </Grid>
        </Grid>
        {/*<DialogShareProject />*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-4">
          {overview.map((item, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div onClick={() => toggleModal('fullTable')} className="cursor-pointer flex p-8 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
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

        <TransactionList/>
        <div className="mt-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                {/* Revenue Card */}
                <Card className="h-full">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <p onClick={() => toggleModal('rate')} className="text-xl cursor-pointer sm:text-2xl text-[#727272] font-semibold pl-10 mt-6">
                            Revenu journalier
                        </p>
                      <span className="mr-4 mt-4">
                     <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                                   fctToCallOnClick={handleNewMonth} showDefaultMessage={false} />
                </span>
                    </div>
                    <div>
                        <RechartsLineChart direction="ltr" />
                    </div>
                </Card>

                {/* Visits Card */}
              <Card className="h-full flex flex-col">
                {/* Top content for 'Visits' and dropdown */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <p onClick={() => toggleModal('goals')}  className="text-xl sm:text-2xl text-[#727272] font-semibold pl-10 mt-6">
                      Objectifs
                  </p>
                  <span className="mr-4 mt-4">
                <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                              fctToCallOnClick={handleNewMonth} showDefaultMessage={false} />
        </span>
                </div>
                <p className="text-xl sm:text-2xl text-[#727272] font-semibold text-center">
                  Conversion: <span className='text-red-500'>31%</span>
                </p>

                {/* Wrapper for ProgressBar components with flex-grow */}
                <div className="flex flex-wrap items-center justify-center gap-10 flex-grow">
                  <ProgressBar
                      value={61}
                      name="Nouveaux Clients"
                      number={27}
                      rotation={0.25}
                      color="#FE2569, #FD4C55, #FF8636"
                  />
                  <ProgressBar
                      value={73}
                      name="Ajouter un objectif"
                      number={47}
                      rotation={0.25}
                      color="#0FBFF1, #4487F1"
                  />
                    <ProgressBar
                        value={50}
                        name="Revenu Mensuel"
                        number={31}
                        rotation={0.25}
                        color="#7ABF50, #418419"
                    />
                    <ProgressBar
                        value={0}
                        name="Revenu Mensuel"
                        number={0}
                        rotation={0.25}
                        color="#15BAF2"
                    />
                </div>
              </Card>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3">
            {/* Client Activity */}
            <div className="px-3 md:w-4/12 h-[400px] overflow-auto w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
                <p onClick={() => toggleModal('clientActivity')} className="text-primary text-center text-2xl font-semibold cursor-pointer">Activité clients</p>
                <div className="relative overflow-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-grey text-sm font-semibold mb-9">
                        <tr>
                            <th scope="col" className="pr-4 py-3">
                                User
                            </th>
                            <th scope="col" className="pr-4 pl-20 py-3 text-center">
                                Date
                            </th>
                            <th scope="col" className="px-4 py-3 text-center">
                                Status
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {activityClientData.map((item, index) => {
                            let statusClass ='';
                            switch (item.Status) {
                                case 'En cours':
                                    statusClass = 'text-blue-600'; // Blue color for "In progress"
                                    break;
                                case 'Effectuée':
                                    statusClass = 'text-green-600'; // Green color for "Completed"
                                    break;
                                case 'Demande de remboursement':
                                    statusClass = 'text-yellow-600'; // Yellow color for "Refund requested"
                                    break;
                                case 'Remboursé(e)':
                                    statusClass = 'text-purple-600'; // Purple color for "Refunded"
                                    break;
                                default:
                                    statusClass = 'text-gray-600'; // Default color for any other status
                                    break;
                            }

                            return <tr key={index} className="text-black border-b-2 border-[#F4F4F6] pb-2">
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
                                <th className="px-4 py-4 text-center">{item.Date} </th>
                                <th className={`px-4 py-4 text-center ${statusClass}`}>{item.Status}</th>

                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="px-3 md:w-4/12 h-[400px] overflow-auto w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
                <p onClick={() => toggleModal('rate')} className="text-primary cursor-pointer text-center text-2xl font-semibold">Fidélité clients</p>
                <p className="text-xl sm:text-2xl text-[#727272] font-semibold text-center mt-6">
                    Conversion: <span className='text-red-500'>31%</span>
                </p>
                {/* Wrapper for ProgressBar components */}
                <div className="flex flex-wrap items-center justify-center gap-10">
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
            </div>

            {/* Top Client List */}
            <div className="px-3 md:w-4/12 h-[400px] overflow-auto w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
                <p onClick={() => toggleModal('topClient')} className="text-primary cursor-pointer text-center text-2xl font-semibold">Top Client List</p>
                {/* You can either copy the entire table structure from the Client Activity section or create a new one if the data differs. */}
                <div className="relative overflow-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-grey text-sm font-semibold mb-9">
                        <tr>
                            <th scope="col" className="pr-4 py-3 text-center">
                                User
                            </th>
                            <th scope="col" className="pr-4  py-3 text-center">
                                coiffure préférée
                            </th>
                            <th scope="col" className="px-4 py-3 text-center">
                                Commandes
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {TopClientData.map((item, index) => {

                            return <tr key={index} className="text-black border-b-2 border-[#F4F4F6] pb-2">
                                <th scope="row" className="pr-6 py-4 flex items-center gap-4">
                                    <img
                                        src="/assets/user_img.png"
                                        alt=""
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                    />
                                    {item.Utilisateur}
                                </th>
                                <th className="px-4 py-4 text-center">{item.Date} </th>
                                <th className="px-4 py-4 text-center">{item.Status}</th>

                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        <div className="flex items-center justify-between gap-3 mb-4">
            <p onClick={() => toggleModal('staff')}  className="text-xl sm:text-2xl text-[#727272] font-semibold pl-10 mt-6 cursor-pointer">
                Occupation du personnel
            </p>
            <span className="mr-4 mt-4">
                   <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                                 fctToCallOnClick={handleNewMonth} showDefaultMessage={false} />
        </span>
        </div>

        <RechartSingleBarChart direction="ltr" staffData={staffData} fill={fillColor} barSize={barSize} />

    </div>

      );
};

export default Dashboard;
