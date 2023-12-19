"use client";
import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { client } from "@/api/clientSide";

const PasswordSettings = () => {

    // design choices:
    const inputFieldsDesign = `w-full p-3 placeholder:text-[#959595] placeholder:text-base ${ColorsThemeA.ohcBorder} ${Theme_A.behaviour.fieldFocused_B}${Theme_A.fields.inputField}`
    const inputFieldsDesignNoW = `border-2 border-red-500 p-3 placeholder:text-[#959595] placeholder:text-base ${Theme_A.behaviour.fieldFocused_B}${Theme_A.fields.inputField}`

    const showSnackbar = useSnackbar();

    const [isLoading, setIsLoading] = useState(false);

    const [passwordField, renewPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // TODO EMAIL ADDRESS VERIFICATION DONE : 
    const [isEmailVerified, setIsEmailVerified] = useState(true);


    const [oldPasswordVisiblity, setOldPasswordVisiblity] = useState(false);
    const [newPasswordVisiblity, setNewPasswordVisiblity] = useState(false);
    const [confirmPasswordVisiblity, setConfirmPasswordVisiblity] = useState(false);
    const togglePasswordVisibility = (field: string) => {
        switch (field) {
            case 'oldPassword':
                setOldPasswordVisiblity((prev) => !prev);
                break;
            case 'newPassword':
                setNewPasswordVisiblity((prev) => !prev);
                break;
            case 'confirmPassword':
                setConfirmPasswordVisiblity((prev) => !prev);
                break;
            default:
                setNewPasswordVisiblity((prev) => !prev);
                setOldPasswordVisiblity((prev) => !prev);
                setConfirmPasswordVisiblity((prev) => !prev);
                break;
        }
    };
    const setOldPassword = (value: string) => {
        renewPassword((prev) => {
            return { ...prev, oldPassword: value };
        });
    };
    const setNewPassword = (value: string) => {
        renewPassword((prev) => {
            return { ...prev, newPassword: value };
        });
    };
    const setConfirmPassword = (value: string) => {
        renewPassword((prev) => {
            return { ...prev, confirmPassword: value };
        });
    };

    const onSubmitPassword = async () => {
        // TODO: link with BE
        try {
            let resp = await client.resetPassword({
                old_password: passwordField.oldPassword,
                new_password: passwordField.newPassword,
                repeat_password: passwordField.confirmPassword,
            })
            if (resp.data.status == 200) {
                showSnackbar("success", resp.data.message)
            }
            else {
                showSnackbar("error", resp.data.message)
            }
            showSnackbar("success", resp.data.message);
        } catch (error: any) {
            if (error.response.data.errors.old_password) {
                showSnackbar("error", error.response.data.errors.old_password[0]);
            }
            if (error.response.data.errors.new_password) {
                showSnackbar("error", error.response.data.errors.new_password[0]);
            }
            if (error.response.data.errors.repeat_password) {
                showSnackbar("error", error.response.data.errors.repeat_password[0]);
            }
            return;
        } finally {
            setIsLoading(false);
        }
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    const [error, setError] = useState({
        text: "",
    })
    let [errorPop, setErrorPop] = useState("")

    return (
        <div className={`w-[400px] h-max bg-white rounded-2xl py-4 shadow-lg mb-4`}>
            <div>
                <div className="flex flex-col items-center justify-center mx-1 md:mx-12 gap-4">
                    <p className="text-xl font-semibold text-black text-center">Modification du mot de passe</p>

                    {error && (
                        <p className={`${Theme_A.checkers.errorText}`}>
                            {error.text}
                        </p>
                    )}
                    <TextField className={`${inputFieldsDesign}`}
                        id="oldPswrd"
                        label="Ancien mot de passe"
                        type={oldPasswordVisiblity ? 'text' : 'password'}
                        variant="outlined"
                        value={passwordField.oldPassword}
                        onChange={(e) => {
                            setOldPassword(e.target.value)
                        }}
                        InputProps={{
                            style: {
                                borderRadius: '12px',
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => togglePasswordVisibility('oldPassword')}>
                                        {oldPasswordVisiblity ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField className={`${inputFieldsDesign}`}
                        id="NewPswrd1"
                        label="Nouveau mot de passe"
                        variant="outlined"
                        type={newPasswordVisiblity ? 'text' : 'password'}
                        value={passwordField.newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                            style: {
                                borderRadius: '12px',
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => togglePasswordVisibility('newPassword')}>
                                        {newPasswordVisiblity ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField className={`${inputFieldsDesign}`}
                        id="NewPswrd2"
                        label="Répéter nouveau mot de passe"
                        variant="outlined"
                        type={confirmPasswordVisiblity ? 'text' : 'password'}
                        value={passwordField.confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            style: {
                                borderRadius: '12px',
                            },

                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => togglePasswordVisibility('confirmPassword')}>
                                        {confirmPasswordVisiblity ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),

                        }
                        }
                    />
                </div>
                <div className="mt-4 flex gap-4 items-center justify-center w-full">
                    {/* <button
                        className={`${Theme_A.button.medWhiteColoredButton}`}
                        onClick={() => setIsModalPswrd(!isModalPswrd)}
                    >
                        Annuler
                    </button> */}
                    <button
                        className={`${Theme_A.button.mediumGradientButton}`}
                        onClick={() => onSubmitPassword()}
                    >
                        Actualiser
                    </button>
                </div>
            </div>
        </div >
    );
};

export default PasswordSettings;
