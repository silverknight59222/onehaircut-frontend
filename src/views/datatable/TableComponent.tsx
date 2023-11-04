interface TableProps {
    headers: string[];
    data: { [key: string]: string }[];
}

const TableComponent: React.FC<TableProps> = ({ headers, data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead>
                <tr className="bg-gray-200">
                    {headers.map(header => (
                        <th key={header} className="py-2 px-4 border border-gray-300 text-center text-sm font-medium text-gray-700">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {headers.map(header => (
                            <td key={header} className="py-2 px-4 border border-gray-300 text-center text-xs text-gray-600">
                                {row[header]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
