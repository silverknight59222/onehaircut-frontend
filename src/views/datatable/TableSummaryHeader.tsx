import React from "react";

interface SummaryProps {
  totalAmount: number;
  vat: number;
  ongoingPayment: number;
  refund: number;
  cancellationRate: number;
  refundRate: number;
  ongoingTransaction: number;
  totalTransactions: number;
}

const SummaryComponent: React.FC<SummaryProps> = ({
              totalAmount,
              vat,
              ongoingPayment,
              refund,
              cancellationRate,
              refundRate,
              ongoingTransaction,
              totalTransactions,
          }) => {
    return (
        <div className="overflow-x-auto">
            <div className="px-28 pb-12">
            <div className="shadow-md sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-zinc-300">
                    <tr>
                        {/* These width classes need to be consistent across both tables */}
                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                            Sommes totale encaissée
                        </th>
                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                            TVA à déclarer
                        </th>
                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                            Encaissement en court
                        </th>
                        <th scope="col" className="ww-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                            Remboursement effectués
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    <tr>
                        {/* Apply the same width classes to the td elements */}
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                            13257 $
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                            2598,50 $
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                            275 $
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                            365 $
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="shadow-md sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        {/* Use the same width classes here for alignment */}
                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                            Taux d’annulation
                        </th>
                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                            Taux de remboursement
                        </th>
                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                            Transaction en cours
                        </th>
                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                            Nombre de transaction
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    <tr>
                        {/* And also here */}
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                            12%
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                            5%
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                            2
                        </td>
                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                            480
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};


export default SummaryComponent
