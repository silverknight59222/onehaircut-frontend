import { CompletedHairStyleIcon, DashboardHeartIcon, DashboardUsersIcon, ProjectIncomeIcon } from "@/components/utilis/Icons";
import React, { useMemo, useState } from "react";
import Card from '@mui/material/Card'
import "chart.js/auto";
import ApexLineChart from '@/views/charts/chartjs/ApexLineChart'
import ApexAreaChart from '@/views/charts/chartjs/ApexAreaChart'
import DynamicClientTable from '@/views/datatable/DynamicClientTable'
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
import { ColorsThemeA } from "@/components/utilis/Themes";
import FullTable from "@/views/datatable/FullTable";
import RechartSingleBarChart from "@/views/charts/chartjs/RechartSingleBarChart";
import RechartsLineChart from "@/views/charts/chartjs/RechartsLineChart";
import { Theme_A } from "@/components/utilis/Themes";


const Dashboard = () => {
    const overview = [
        {
            numbers: "8,420",
            text: "Nombre de vistes",
            gradient: "bg-gradient-to-t from-red-700 via-red-500 to-red-500",
            borderClr: "bg-[#FE5352]",
            icon: <ProjectIncomeIcon />,
        },
        {
            numbers: "325",
            text: "Nouveaux clients",
            gradient: "bg-gradient-to-b from-blue-400 to-blue-600 ",
            borderClr: "bg-[#15BAF2]",
            icon: <DashboardUsersIcon />,
        },
        {
            numbers: "567",
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
    type ModalName = 'TransactionfullTable' | 'rate' | 'clientActivity' | 'staff' | 'topClient' | 'goals'; // Add more modal keys as needed

    const [modals, setModals] = useState<{ [key in ModalName]?: boolean }>({
        TransactionfullTable: false,
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

    const revenueMonth = [
        "Juliet",
    ]
    const handleNewMonth = (item: string) => {
        // TODO: add backend to save the new preference
    }

    const headers = ["Utilisateur", "Date dernière commande", "Visites", "Commandes",
        "Dernière commande", "Details dernière commande", "Status dernière commande", "Total payé"];

    const topClientheaders = ["Utilisateur", "Date dernière commande", "Visites", "Commandes",
        "Dernière commande", "Details dernière commande", "Status dernière commande", "Total payé"];

    const headersValue: any = [
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
        }, {
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
    const barSize = 40; // Example barSize

    return (
        <div className="px-4 lg:px-6">
            <Footer />
            <div>


                <Grid container spacing={6} className='match-height  '>
                    <Grid item md={4} sm={6} xs={12}>
                        <DialogShareProject show={modals.TransactionfullTable} setShow={() => toggleModal('TransactionfullTable')}>
                            <FullTable headers={headersValue} data={dataValue} />
                        </DialogShareProject>
                        <DialogShareProject show={modals.rate} setShow={() => toggleModal('rate')}>
                            <RateModal />
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
                            <StaffModal />
                        </DialogShareProject>
                        <DialogShareProject show={modals.goals} setShow={() => toggleModal('goals')}>
                            <GoalsModal />
                        </DialogShareProject>
                    </Grid>
                </Grid>


                {/* APPERçU ANALYTIQUE */}
                <p className="text-primary text-2xl font-semibold mb-3 ">
                    Aperçu analytique
                </p>

                {/*<DialogShareProject />*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-4 ">
                    {overview.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-col">

                                {/* VIGNETTES SUPERIEURS */}
                                <div className="flex p-8 bg-[rgba(255,255,255,0.69)] rounded-2xl shadow-sm shadow-stone-400">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mt-10">

                {/*REVENU JOURNALIER */}
                <div className="flex items-center justify-between gap-3">
                    <button onClick={() => toggleModal('rate')} className={`${Theme_A.button.medBlackColoredButton}`}>
                        Revenu journalier
                    </button>
                    {/* DROPDOWN AFFICHAGE REVENU JOURNALIER */}
                    <span className="mr-4 mt-4">
                        <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                            fctToCallOnClick={handleNewMonth} showDefaultMessage={false} />
                    </span>
                </div>


                {/*Objectifs */}
                <div className="flex items-center justify-between gap-3 mb-4">
                    <button onClick={() => toggleModal('goals')} className={`${Theme_A.button.medBlackColoredButton}`}>
                        Objectifs
                    </button>

                    <span className="mr-4 mt-4">
                        <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                            fctToCallOnClick={handleNewMonth} showDefaultMessage={false} />
                    </span>
                </div>
            </div>

            <div className="mt-2 mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* REVENU CHART */}
                    <Card className="h-full">
                        <div>
                            <ApexAreaChart />
                        </div>
                    </Card>

                    {/* OBJECTIFS CHART */}
                    <Card className="h-full flex flex-col">
                        {/* Top content for 'Visits' and dropdown */}
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={3}>
                                <ProgressBar
                                    value={61}
                                    name="Nouveaux Clients"
                                    number={27}
                                    rotation={0.25}
                                    color="#FE2569"
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <ProgressBar
                                    value={73}
                                    name="Ajouter un objectif"
                                    number={47}
                                    rotation={0.25}
                                    color="#0FBFF1"
                                />
                            </Grid>
                            <Grid item xs={2}></Grid>

                            <Grid item xs={1}></Grid>

                            <Grid item xs={3}>
                                <ProgressBar
                                    value={50}
                                    name="Revenu Mensuel"
                                    number={31}
                                    rotation={0.25}
                                    color="#7ABF50"
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <ProgressBar
                                    value={0}
                                    name="Revenu Mensuel"
                                    number={0}
                                    rotation={0.25}
                                    color="#15BAF2"
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </div>



            {/* TRANSACTIONS */}
            <div className="flex items-center justify-between mb-4 mt-10">
                <button onClick={() => toggleModal('TransactionfullTable')} className={`${Theme_A.button.medBlackColoredButton}`}>
                    Transactions
                </button>

                <DropdownMenu dropdownItems={revenueMonth} backgroundClr={ColorsThemeA.standardBorderGray}
                    fctToCallOnClick={handleNewMonth} showDefaultMessage={false} />
            </div>
            <TransactionList />



            <Grid container spacing={2} style={{ marginTop: "20px" }}>

                {/* TITRE ACTIVITE CLIENT */}
                <Grid item xs={4}>
                    <button onClick={() => toggleModal('clientActivity')} className={`${Theme_A.button.medBlackColoredButton}`}>
                        Activité clients
                    </button>
                </Grid>

                {/* TITRE FIDELITE CLIENTS */}
                <Grid item xs={4}>
                    <p className="text-primary cursor-pointer text-left text-2xl font-semibold">Fidélité clients</p>
                </Grid>

                {/* TITRE TOP CLIENT */}
                <Grid item xs={4}>
                    <button onClick={() => toggleModal('topClient')} className={`${Theme_A.button.medBlackColoredButton}`}>
                        Top Clients
                    </button>
                </Grid>
            </Grid>

            <div className="flex flex-wrap -mx-3 mt-5 gap-4">
                {/* Client Activity */}
                <div style={{ width: '32%' }} className="px-3 md:w-4/12 w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
                    <div className="relative">
                        <table className="w-full text-sm text-left">
                            <thead className="text-grey text-sm font-semibold">
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
                        </table>
                        <div className="h-[340px] overflow-auto">
                            <table className="w-full text-sm text-left">
                                <tbody>
                                    {activityClientData.map((item, index) => {
                                        let statusClass = '';
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
                </div>


                <div style={{ width: '32%' }} className="px-3 md:w-4/12 h-[460px] overflow-auto w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
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
                <div style={{ width: '32%' }} className="px-3 md:w-4/12 w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-[20px] shadow-[0px_26px_31px_0px_rgba(176, 176, 176, 0.10)]">
                    <div className="relative">
                        <table className="w-full text-sm text-left">
                            <thead className="text-grey text-sm font-semibold">
                                <tr>
                                    <th scope="col" className="pr-4 py-3">
                                        Utilisateur
                                    </th>
                                    <th scope="col" className="pr-4 pl-20 py-3 text-center">
                                        coiffure préférée
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center">
                                        Commandes
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <div className="h-[340px] overflow-auto">
                            <table className="w-full text-sm text-left">
                                <tbody>
                                    {TopClientData.map((item, index) => {
                                        let statusClass = '';
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
                                                {item.Utilisateur}
                                            </th>
                                            <th className="px-4 py-4 text-left">{item.Date} </th>
                                            <th className={`px-4 py-4 text-center ${statusClass}`}>{item.Status}</th>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>



            <div className="flex items-center justify-between gap-3 mb-4 mt-10">
                {/* TITRE OCCUPATION DU PERSONNEL */}
                <button onClick={() => toggleModal('topClient')} className={`${Theme_A.button.medBlackColoredButton}`}>
                    Occupation du personnel
                </button>

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
