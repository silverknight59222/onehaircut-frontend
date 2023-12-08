import React, { useState } from 'react';
import { Theme_A } from '../utilis/Themes';

interface CustomInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
    placeholder?: string;
    type?: 'text' | 'password' | 'number';
    isEmail?: boolean;
    isStreetNumber?: boolean; // Ajoutez une nouvelle prop pour spécifier que c'est un streetNumber
    isZipCode?: boolean; // Ajoutez une nouvelle prop pour spécifier que c'est un streetNumber
    onBlur?: () => void;
    isPasswordMismatch?: boolean; // Nouvelle prop pour la vérification de mot de passe non identique
    disable?: boolean;
    onEnterPress?: () => void;
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
    isStreetNumber = false,
    isZipCode = false,
    onBlur,
    disable = false,
    onEnterPress,
}) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        if (isStreetNumber) {
            // Supprimez tous les caractères non numériques (sauf les chiffres)
            inputValue = inputValue.replace(/[^0-9]/g, '');

            // Limitez la longueur à 5 chiffres
            if (inputValue.length > 5) {
                inputValue = inputValue.slice(0, 5);
            }
        }

        if (isZipCode) {
            // Supprimez tous les caractères non numériques (sauf les chiffres)
            inputValue = inputValue.replace(/[^0-9]/g, '');

            // Limitez la longueur à 5 chiffres
            if (inputValue.length > 5) {
                inputValue = inputValue.slice(0, 5);
            }
        }

        if (isEmail) {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailRegex.test(inputValue)) {
                setIsEmailError(true);
            } else {
                setIsEmailError(false);
            }
        }

        onChange({
            target: {
                name: id,
                value: inputValue,
            },
        } as React.ChangeEvent<HTMLInputElement>);
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnterPress) {
            onEnterPress();
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
                    disabled={disable}
                    onKeyDown={handleKeyDown}
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
            {error === 'Les mots de passe ne correspondent pas' && (
                <p className="text-xs text-red-700 ml-4 mt-2" role="alert">
                    Les mots de passe ne correspondent pas*
                </p>
            )}

        </div>
    );
};

export default CustomInput;
