import React from 'react';

// Define the types for your table data and props
interface UserData {
    discount: React.JSX.Element;
    image: string;
    name: string;
}

type TableDataRowValue = UserData | string | number | any;

interface StyleObject {
    [key: string]: React.CSSProperties; // Mapping header name to its styles
}

// This interface separates known properties from the rest of the keys
interface TableDataRow {
    user: UserData;
    styles?: StyleObject; // Optional styles object
    // Separate out the specific known keys that your data will always have.
    Date?: string;
    Visites?: number;
    Commandes?: number;
    Dernière?: string;
    Details?: string;
    Status?: string;
    Total?: string;
    // Add other known properties here...
    // The rest of the keys are of type TableDataRowValue
    [key: string]: TableDataRowValue | StyleObject | undefined;
}

interface DynamicTableProps {
    headers: string[];
    data: TableDataRow[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ headers, data }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full">
                <thead>
                <tr>
                    {headers.map((header, idx) => (
                        <th key={idx} className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                        {Object.entries(row).map(([key, value], cellIndex) => {
                            if (key === 'styles') {
                                // Skip the styles property
                                return null;
                            }

                            const style = row.styles?.[key];
                            if (key === 'user') {
                                const userValue = value as UserData;

                                return (
                                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-center" style={style}>
                                        <div className="flex items-center">
                                            <img src={userValue.image} alt="User" className="h-10 w-10 rounded-full mr-4" />
                                            <div>
                                                <span>{userValue.name}</span>
                                                {userValue.discount && (
                                                    <div className="text-red-500 text-sm text-left">{userValue.discount}</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                );
                            }

                            // Render other values
                            return (
                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-center" style={style}>
                                    <div>{value}</div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;
