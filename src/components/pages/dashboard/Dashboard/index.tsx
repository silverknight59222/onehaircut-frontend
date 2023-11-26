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
import IncomesModal from "@/components/pages/dashboard/Dashboard/ModalComponent/IncomesModal";
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
import ConversionChart from "@/views/charts/chartjs/ConversionChart";


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
            text: "Score générale",
            gradient: "bg-gradient-to-b from-[#FFB566] to-[#FA8E1B]",
            borderClr: "bg-[#FFB566]",
            icon: <DashboardHeartIcon />,
        },
    ];
    type ModalName = 'TransactionfullTable' | 'Incomes' | 'clientActivity' | 'staff' | 'topClient' | 'goals'; // Add more modal keys as needed

    const [modals, setModals] = useState<{ [key in ModalName]?: boolean }>({
        TransactionfullTable: false,
        Incomes: false,
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
    const DisplayedMonths = [
        "Ce mois",
        "3 derniers mois",
        "Cette année"
    ]
    const [selectedMonthRevenu, setSelectedMonthRevenu] = useState(DisplayedMonths[0]);
    const [selectedMonthTransactions, setSelectedMonthTransactions] = useState(DisplayedMonths[0]);
    const [selectedMonthPayload, setSelectedMonthPayload] = useState(DisplayedMonths[0]);

    const handleNewMonthRevenu = (item: string) => {
        // Mettez à jour l'état avec la nouvelle valeur sélectionnée
        setSelectedMonthRevenu(item);
        // TODO: Ajoutez la logique pour sauvegarder la nouvelle préférence
    }
    const handleNewMonthTransactions = (item: string) => {
        // Mettez à jour l'état avec la nouvelle valeur sélectionnée
        setSelectedMonthTransactions(item);
        // TODO: Ajoutez la logique pour sauvegarder la nouvelle préférence
    }
    const handleNewMonthPayload = (item: string) => {
        // Mettez à jour l'état avec la nouvelle valeur sélectionnée
        setSelectedMonthPayload(item);
        // TODO: Ajoutez la logique pour sauvegarder la nouvelle préférence
    }



    const headers = ["Utilisateur", "Date dernière commande", "Visites", "Commandes",
        "Dernière commande", "Details dernière commande", "Status dernière commande", "Total payé"];

    const topClientheaders = ["Utilisateur", "Date dernière commande", "Visites", "Commandes",
        "Dernière commande", "Details dernière commande", "Status dernière commande", "Total payé"];


    //  CLIENT ACTIVITY DATA
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


    // STAFF DATA
    const staffData = [
        { name: 'Staff 1', value: 15 },
        { name: 'Staff 2', value: 85 },
        { name: 'Staff 3', value: 60 },
        { name: 'Staff 4', value: 40 },
        { name: 'Staff 5', value: 70 },
    ];

    // CONVERSION DATA 

    //TODO IMPORT TRUE DATA AND REMOVE FAKE VALUES
    function genererValeurAleatoire() {
        return Math.floor(Math.random() * 76);
    }
    // Exemple d'utilisation
    const FakeConversionValue = genererValeurAleatoire();
    const FakeVisiteCount = 480; // TODO IMPORTE REAL ORDER COUNT


    // Calcul du pourcentage des commandes par rapport aux visites
    const tauxDeConversion = Math.round(FakeConversionValue / FakeVisiteCount * 100);
    let indiceTauxConversion;
    let couleurTaux;

    if (tauxDeConversion >= 0 && tauxDeConversion <= 5) {
        indiceTauxConversion = "Faible";
        couleurTaux = 'rgba(255, 70, 70, 1)';
    } else if (tauxDeConversion > 5 && tauxDeConversion <= 10) {
        indiceTauxConversion = "Intéressant";
        couleurTaux = 'rgba(255, 165, 0, 1)';
    } else if (tauxDeConversion > 10) {
        indiceTauxConversion = "Performant";
        couleurTaux = 'rgba(50, 151, 80, 1)';
    }

    const getColorForValue = (value: any) => {
        const seuilBas = 5;
        const seuilMoyen = 10;

        if (value < seuilBas) {
            return 'rgba(255, 70, 70, 1)'; // Rouge
        } else if (value >= seuilBas && value <= seuilMoyen) {
            return 'rgba(255, 165, 0, 1)'; // Jaune
        } else {
            return 'rgba(50, 120, 80, 1)'; // Vert
        }
    };


    const conversionData = [
        { name: 'Commandes', value: FakeConversionValue, color: getColorForValue(tauxDeConversion) },
        { name: 'Visites', value: FakeVisiteCount, color: "rgba(16, 161, 216, 1)" },
    ];







    return (
        <div className="px-4 lg:px-6">
            <Footer />
            <div>


                <Grid container spacing={6} className='match-height  '>
                    <Grid item md={4} sm={6} xs={12}>
                        <DialogShareProject show={modals.TransactionfullTable} setShow={() => toggleModal('TransactionfullTable')}>
                            <FullTable />
                        </DialogShareProject>
                        <DialogShareProject show={modals.Incomes} setShow={() => toggleModal('Incomes')}>
                            <IncomesModal />
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
                <div className="grid grid-cols-1 sm:grid-cols-2  2xl:grid-cols-4 gap-x-8 gap-y-4 ">
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



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-10">
                {/*REVENU JOURNALIER */}
                <div className="flex items-center justify-between gap-3">
                    <button onClick={() => toggleModal('Incomes')} className={`${Theme_A.button.medBlackColoredButton}`}>
                        Revenu journalier
                    </button>
                    {/* DROPDOWN AFFICHAGE REVENU JOURNALIER */}
                    <span className="mr-0 mt-4 ">
                        <DropdownMenu dropdownItems={DisplayedMonths} backgroundColor="bg-white" selectId={selectedMonthRevenu} menuName="Période d'observation"
                            fctToCallOnClick={handleNewMonthRevenu} />
                    </span>
                </div>


                {/*Objectifs */}
                <div className="flex items-center justify-between gap-3 ">
                    <button onClick={() => toggleModal('goals')} className={`${Theme_A.button.medBlackColoredButton}`}>
                        Objectifs du mois
                    </button>
                </div>
            </div>


            <div className="mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* REVENU CHART */}
                    <Card className="h-full rounded-xl">
                        <div>
                            <ApexAreaChart />
                        </div>
                    </Card>
                    {/* OBJECTIFS CHART */}
                    <Card className="h-full flex flex-col justify-start rounded-xl">
                        <div>
                            {/* Ligne du haut */}
                            <Grid container justifyContent="center" alignItems="start" spacing={2}>
                                <Grid item xs={false} sm={false} md={false} lg={2} /> {/* Espace vide pour le décalage IMPORTANT*/}
                                <Grid item xs={12} sm={4} md={5} lg={5} style={{ marginTop: '1rem' }}>
                                    {/* Contenu pour Nouveaux Clients */}
                                    <ProgressBar
                                        value={61}
                                        name="Nouveaux Clients"
                                        number={27}
                                        rotation={0.25}
                                        color='rgba(255, 70, 70, 1)'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={5} lg={3} style={{ marginTop: '1rem' }}>
                                    {/* Contenu pour Nombre de visite */}
                                    <ProgressBar
                                        value={73}
                                        name="Nombre de visite"
                                        number={47}
                                        rotation={0.25}
                                        color="rgba(16, 161, 216, 1)"
                                    />
                                </Grid>
                            </Grid>

                            {/* Ligne du bas */}
                            <Grid container justifyContent="center" alignItems="end" spacing={2}>
                                <Grid item xs={12} sm={4} md={5} lg={5} style={{ marginBottom: '1rem' }} >
                                    {/* Contenu pour Revenu mensuel */}
                                    < ProgressBar
                                        value={50}
                                        name="Revenus mensuel"
                                        number={50}
                                        rotation={0.25}
                                        color="rgba(122, 191, 80, 1)"
                                    />
                                </Grid>
                                {/* Supprimez cet espace vide si vous voulez rapprocher le dernier ProgressBar vers la gauche */}
                                {/* <Grid item xs={false} sm={1} lg={2} /> */}
                                <Grid item xs={12} sm={4} md={5} lg={6} style={{ marginBottom: '1rem' }}>
                                    {/* Contenu pour Commandes d'habitués */}
                                    <ProgressBar
                                        value={15}
                                        name="Commandes d'habitués"
                                        number={15}
                                        rotation={0.25}
                                        color="rgba(255, 200, 102, 1)"
                                    />
                                </Grid>
                            </Grid>

                        </div>
                    </Card>
                </div>
            </div >




            {/* TRANSACTIONS */}
            < div className="flex items-center justify-between mt-10" >
                <button onClick={() => toggleModal('TransactionfullTable')} className={`${Theme_A.button.medBlackColoredButton}`}>
                    Transactions
                </button>

                <DropdownMenu dropdownItems={DisplayedMonths} backgroundColor="bg-white" selectId={selectedMonthTransactions} menuName="Période d'observation"
                    fctToCallOnClick={setSelectedMonthTransactions} />
            </div >
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
                    <p className="text-primary cursor-pointer text-left text-2xl font-semibold">Conversion des visites</p>
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
                <div style={{ width: '32%' }} className="px-3 md:w-4/12 w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-xl shadow-sm shadow-stone-600">
                    <div className="relative ml-4">
                        <table className="w-full text-sm text-left">
                            <thead className="text-grey text-sm font-semibold">
                                <tr>
                                    <th scope="col" className="pr-4 py-3">
                                        User
                                    </th>
                                    <th scope="col" className="pr-4 pl-20 py-4 text-center">
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
                                                statusClass = 'text-red-600'; // Red color for "Refunded"
                                                break;
                                            default:
                                                statusClass = 'text-gray-600'; // Default color for any other status
                                                break;
                                        }

                                        return <tr key={index} className="text-black border-b-2 border-[#F4F4F6] pb-2 ">
                                            <th scope="row" className="pr-6 py-4 flex items-center gap-4">
                                                <img
                                                    src="/assets/user_img.png"
                                                    alt=""
                                                    width={40}
                                                    height={40}
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

                {/* CLIENT CONVERSION CHART */}
                <div style={{ width: '32%' }} className="px-3 md:w-4/12 h-[460px] overflow-auto w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-xl shadow-sm shadow-stone-600">
                    <p className="text-xl sm:text-2xl text-[#727272] font-semibold text-center mt-6 ">
                        Taux de Conversion: <span style={{ color: couleurTaux }}>{indiceTauxConversion}</span>
                    </p>
                    {/* Wrapper for ProgressBar components */}
                    <div className="flex flex-wrap items-center justify-center gap-4 ">
                        <ConversionChart data={conversionData}
                        />
                    </div>
                </div>

                {/* TOP CLIENTS TABS*/}
                <div style={{ width: '32%' }} className="px-3 md:w-4/12 w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-xl shadow-sm shadow-stone-600">
                    <div className="relative ml-4">
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
                                                    width={40}
                                                    height={40}
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



            <div className="flex items-center justify-between gap-3 mt-10 ">
                {/* TITRE OCCUPATION DU PERSONNEL */}
                <button onClick={() => toggleModal('staff')} className={`${Theme_A.button.medBlackColoredButton}`}>
                    Répartition de la charge du personnel
                </button>

                <span className="mr-4 mt-4">
                    <DropdownMenu dropdownItems={DisplayedMonths} backgroundColor="bg-white" selectId={selectedMonthPayload} menuName="Période d'observation"
                        fctToCallOnClick={handleNewMonthPayload} />
                </span>
            </div>

            {/* BAR CHART STAFF PAYLOAD */}
            <div className="rounded-xl shadow-sm shadow-stone-600 mb-20">
                <RechartSingleBarChart
                    direction="ltr"
                    staffData={staffData}
                    fill={''}
                    barSize={200}
                    chartTitle="Charge générale liées aux commandes"
                    chartTitleColor="rgba(150,150,150,1)"
                />
            </div>


        </div >

    );
};

export default Dashboard;
