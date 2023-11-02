import React, { useState } from 'react';
import { Theme_A } from '../utilis/Themes';

interface CustomInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
    placeholder?: string;
    type?: 'text' | 'password';
    isEmail?: boolean;
    onBlur?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
    id,
    label,
    value,
    onChange,
    error,
    placeholder,
    type = 'text',
    isEmail = false,
    onBlur,
}) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (isEmail) {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailRegex.test(inputValue)) {
                setIsEmailError(true);
            } else {
                setIsEmailError(false);
            }
        }

        onChange(e);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);

        if (isEmail && isEmailError) {
            onChange({
                target: {
                    name: id,
                    value: value,
                },
            } as React.ChangeEvent<HTMLInputElement>);
        }

        if (onBlur) {
            onBlur();
        }
    };

    return (
        <div className="flex flex-col">
            <div className="relative group">
                <input
                    id={id}
                    required
                    type={type}
                    className={`w-full h-[50px] mr-2 ${Theme_A.fields.configurationField2} text-sm peer`}
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onFocus={() => setIsInputFocused(true)}
                    placeholder={placeholder}
                />
                <label
                    htmlFor={id}
                    className={`transform transition-all absolute top-0 left-0 h-full flex items-center pl-4 text-sm text-gray-400 font-semibold group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-2 peer-valid:pl-2 ${(value || isInputFocused) ? 'text-gray-500' : 'text-gray-300'}`}
                >
                    {label}
                </label>
            </div>
            {(!value && error === 'Un e-mail est requis') && (
                <p className="text-xs text-red-700 ml-4 mt-2" role="alert">
                    Un e-mail est requis*
                </p>
            )}
            {isEmailError && value && (
                <p className="text-xs text-red-700 ml-4 mt-2" role="alert">
                    E-mail invalide*
                </p>
            )}
        </div>
    );
};

export default CustomInput;
