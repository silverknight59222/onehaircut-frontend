import React from 'react';
import { Theme_A } from '../utilis/Themes';

interface CustomInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
    placeholder?: string;
    type?: 'text' | 'password'; // Ajoutez le type ici
}

const CustomInput: React.FC<CustomInputProps> = ({
    id,
    label,
    value,
    onChange,
    error,
    placeholder,
    type = 'text', // Par défaut, le type est 'text'
}) => {
    return (
        <div className="flex flex-col">
            <div className="relative group">
                <input
                    id={id}
                    required
                    type={type}
                    className={`w-full h-[50px] mr-2 ${Theme_A.fields.configurationField2} text-sm peer`}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                <label
                    htmlFor={id}
                    className={`transform transition-all absolute top-0 left-0 h-full flex items-center pl-4 text-sm text-gray-400 font-semibold group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-2 peer-valid:pl-2 ${value ? 'text-gray-500' : 'text-gray-300'
                        }`}
                >
                    {label}
                </label>
            </div>
            {error && (
                <p className="text-xs text-red-700 ml-4 mt-2" role="alert">
                    {error}*
                </p>
            )}
        </div>
    );
};

export default CustomInput;
