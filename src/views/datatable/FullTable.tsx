import SummaryComponent from "@/views/datatable/TableSummaryHeader";
import TableComponent from "@/views/datatable/TableComponent";
import BaseDropdown from "@/components/UI/BaseDropdown";
import DropdownMenu from "@/components/UI/DropDownMenu";
import React from "react";
import {ColorsThemeA} from "@/components/utilis/Themes";
const FullTable: React.FC = () => {
    // sample headers and data for TableComponent
    const headers = [
        "Date",
        "Client",
        "Produits",
        "Prix",
        "Facture",
        "Moyen de paiement",
        "Status"
    ];

    const Month = [
        "January",
        "February",]
    const handleNewMonth = (item: string) => {
        // TODO: add backend to save the new preference
    }


    const data = [
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
        <div className="p-4">
            <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                          fctToCallOnClick={handleNewMonth} />
            {/*<SummaryComponent*/}
            {/*    totalAmount={13257}*/}
            {/*    vat={2598.50}*/}
            {/*    ongoingPayment={275}*/}
            {/*    refund={365}*/}
            {/*    cancellationRate={12}*/}
            {/*    refundRate={5}*/}
            {/*    ongoingTransaction={2}*/}
            {/*    totalTransactions={480}*/}
            {/*/>*/}
            <TableComponent headers={headers} data={data} />
        </div>
    );
};

export default FullTable
