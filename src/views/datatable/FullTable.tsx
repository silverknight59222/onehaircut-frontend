import SummaryComponent from "@/views/datatable/TableSummaryHeader";
import TableComponent from "@/views/datatable/TableComponent";
import BaseDropdown from "@/components/UI/BaseDropdown";
import DropdownMenu from "@/components/UI/DropDownMenu";
import React from "react";
import {ColorsThemeA} from "@/components/utilis/Themes";

const FullTable: React.FC = () => {
    // sample headers and data for TableComponent
    const headers:any = [
        "Date",
        "Client",
        "Produits",
        "Prix",
        "Facture",
        "Moyen de paiement",
        "Status"
    ];

    const Month = [
        "Ce mois",]
    const handleNewMonth = (item: string) => {
        // TODO: add backend to save the new preference
    }


    const data:any = [
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

    return (
        <div>
            <DropdownMenu
                dropdownItems={Month}
                backgroundClr={ColorsThemeA.standardBorderGray}
                fctToCallOnClick={handleNewMonth}
                showDefaultMessage={false}
            />
            <div className="flex justify-center items-center">
                {/* Absolute Positioning relative to the viewport for the Dropdown */}
                {/* Centered content container */}
                <div className="p-4">
                    <div className="flex items-center justify-center">
                        {/* Centered Card */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden flex justify-center w-full max-w-xl mx-auto">
                            <div className="p-4 border-r border-gray-300 bg-neutral-500" style={{background: "#2F2F2F4D"}}>
                                <p className="text-gray-600 text-lg font-bold text-black-500 ">Compte enregistrée</p>
                            </div>
                            <div className="p-4 bg-neutral-500" style={{background: "#2F2F2F4D"}} >
                                <p className="text-gray-600 text-lg font-bold text-black-500 ">FR **** **** **** 1985</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <SummaryComponent
                totalAmount={13257}
                vat={2598.50}
                ongoingPayment={275}
                refund={365}
                cancellationRate={12}
                refundRate={5}
                ongoingTransaction={2}
                totalTransactions={480}
            />
            <TableComponent headers={headers} data={data} />
        </div>
    );
};

export default FullTable
