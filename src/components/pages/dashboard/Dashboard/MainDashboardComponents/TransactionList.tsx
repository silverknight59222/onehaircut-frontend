import DropdownMenu from "@/components/UI/DropDownMenu";
import {ColorsThemeA} from "@/components/utilis/Themes";
import Image from "next/image";
import React from "react";

const TransactionList = () => {
    const Month = [
        "Juliet",]
    const handleNewMonth = (item: string) => {
        // TODO: add backend to save the new preference
    }

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

return (
        <div>
            {/*<div className="flex items-center justify-between mb-4 mt-10">*/}
            {/*    <p className="text-2xl text-[#727272] font-semibold">*/}
            {/*        Transactions*/}
            {/*    </p>*/}
            {/*    <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}*/}
            {/*                  fctToCallOnClick={handleNewMonth} showDefaultMessage={false} />*/}
            {/*</div>*/}
            <div className="pt-7 pb-4 px-6 bg-white rounded-lg shadow-[0px_4px_33px_0px_rgba(176,176,176,0.25)]">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-[#727272] whitespace-nowrap text-center uppercase bg-[rgba(255, 190, 148, 0.49)]" style={{background: "rgba(255, 190, 148, 0.49)"}}>
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
                          let statusClass ='';
                          switch (transaction.status) {
                            case 'En vérification':
                              statusClass = 'text-yellow-400';
                              break;
                            default:
                              statusClass = 'text-gray-600'; // Default color for any other status
                              break;
                          }

return (
                                <tr
                                    key={index}
                                    className="text-[#636363] bg-white border-b text-center hover:bg-gray-100"
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
                                    <td className={`px-6 py-4 ${statusClass}`}>{transaction.status}</td>
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
    )
}

export default TransactionList

