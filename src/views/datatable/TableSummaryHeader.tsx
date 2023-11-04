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
        <div className="p-4 bg-white shadow-md">
            <div className="grid grid-cols-4 gap-4 mb-2">
                <div>
                    <span className="block text-sm font-medium text-gray-700">Compte enregistrée</span>
                    <span className="text-lg font-bold">FR **** **** **** 1985</span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-gray-700">Sommes totale encaissée</span>
                    <span className="text-lg font-bold">{totalAmount} $</span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-gray-700">TVA à déclarer</span>
                    <span className="text-lg font-bold">{vat} $</span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-gray-700">Encaissement en court</span>
                    <span className="text-lg font-bold">{ongoingPayment} $</span>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-2">
                <div>
                    <span className="block text-sm font-medium text-gray-700">Remboursement effectués</span>
                    <span className="text-lg font-bold">{refund} $</span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-gray-700">Taux d'annulation</span>
                    <span className="text-lg font-bold">{cancellationRate}%</span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-gray-700">Taux de remboursement</span>
                    <span className="text-lg font-bold">{refundRate}%</span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-gray-700">Transaction en cours</span>
                    <span className="text-lg font-bold">{ongoingTransaction}</span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-gray-700">Nombre de transaction</span>
                    <span className="text-lg font-bold">{totalTransactions}</span>
                </div>
            </div>
        </div>
    );
};


export default SummaryComponent
