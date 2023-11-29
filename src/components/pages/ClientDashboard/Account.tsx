import { CheckedIcon, LogoCircleFixRight } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import React, { useEffect, useState } from "react";
import BaseModal from "@/components/UI/BaseModal";
import Footer from "@/components/UI/Footer";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import useSnackbar from "@/hooks/useSnackbar";
import { client } from "@/api/clientSide";
// import PhoneInput from 'react-phone-input-2'
import PhoneInput from 'react-phone-number-input'
import { Value } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import PaymentForm from "@/components/shared/Payement";
import { TextField } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from "react-google-autocomplete";

interface infoInterface {
    name: string;
    desc: string;
    modif: boolean;
    popup: React.JSX.Element
}

const emptyPopup: React.JSX.Element = <div></div>; // Define an empty JSX element

const infoInterfaceIni: infoInterface =
    { name: "", desc: "", modif: false, popup: emptyPopup }

// design choices:
const inputFieldsDesign = `w-full p-3 placeholder:text-[#959595] placeholder:text-base ${ColorsThemeA.ohcBorder} ${Theme_A.behaviour.fieldFocused_B}${Theme_A.fields.inputField}`
const inputFieldsDesignNoW = `border-2 border-red-500 p-3 placeholder:text-[#959595] placeholder:text-base ${Theme_A.behaviour.fieldFocused_B}${Theme_A.fields.inputField}`

const Account = () => {
    const showSnackbar = useSnackbar();

    const [selectedTab, setSelectedTab] = useState(0);
    const items = [
        "Informations personnelles",
        "Mot de passe",
        "Moyens de paiements",
        "Notifications",
        "Confidentialité et règles d’utilisation",
        "Langue",
    ];

    // Modal for addresses
    const [isModalAdd, setIsModalAdd] = useState(false);
    // Modal for phone number
    const [isModalPhone, setIsModalPhone] = useState(false);
    // Modal for password
    const [isModalPswrd, setIsModalPswrd] = useState(false);
    // Modal for credit card
    const [isModalCreditCard, setIsModalCreditCard] = useState(false);
    // Modal for Reminders notification
    const [isModalNotifReminders, setIsModalNotifReminders] = useState(false);
    // Modal for messages notification
    const [isModalNotifMsg, setIsModalNotifMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    //Variables for address
    const [isModal, setIsModal] = useState(false);
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [addressResponse, setAddressResponse] = useState("");
    const [locationLatitude, setLocationLatitude] = useState(0.0);
    const [locationLongitude, setLocationLongitude] = useState(0.0);
    const openModal = () => {
        setIsModal(true);
    };
    const closeModal = () => {
        setIsModal(false);
    };
    // Utilisez useEffect pour déclencher la recherche de la ville lorsque le code postal change
    const setAddressData = async (place: any,) => {
        setStreet("")
        setCity("")
        setState("")
        setCountry("")
        setPostalCode("")

        let address = {} as any
        place.address_components.map((item, index) => {
            setAddressFields(address, item.types[0], item.long_name);
        });

        setCity(address.city || "")
        setState(address.administrative_area_level_1 || "")
        setCountry(address.country || "")
        setPostalCode(address.postal_code || "")


        setStreet(address.route || "")
        if (address.street_number && address.street_number != address.route) {
            setStreet((pre) => address.street_number + " " + pre)
        }

        setLocationLatitude(place.geometry.location.lat());
        setLocationLongitude(place.geometry.location.lng());
    }

    const setAddressFields = (address: any, arg: string, value: string) => {
        switch (arg) {
            case 'sublocality_level_1':
            case 'locality':
                address['city'] = value
                break;
            case 'administrative_area_level_1':
                address['administrative_area_level_1'] = value
                break;
            case 'country':
                address['country'] = value
                break;
            case 'postal_code':
                address['postal_code'] = value
                break;
            case 'route':
                address['route'] = value
                break;
            case 'street_number':
                address['street_number'] = value
                break;
        }
        return address
    }
    // function to hadnle the click on the modify 
    const handleModifierClick = (item: infoInterface) => {
        if (item.name == "Adresse") {
            setIsModalAdd(true); // Show the modal to modify add
        }
        else if (item.name == "Numéro de téléphone") {
            setIsModalPhone(true) // Show the modal to modify phone number
        }
        else if (item.name == "Mot de passe") {
            setIsModalPswrd(true) // Show the modal to modify password
        }
        else if (item.name == "Moyen de payement préféré") {
            setIsModalCreditCard(true) // Show the modal to modify credit card
        }
        else if (item.name == "Rappels") {
            setIsModalNotifReminders(true) // Show the modal to modify reminders
        }
        else if (item.name == "Messages") {
            setIsModalNotifMsg(true) // Show the modal to modify messages
        }
        else {
            // do nothing
        }
        setSelectedParam(item);
    };


    ////////////////////////////////////////////////////
    ///////////////////// PASSWORD 
    ////////////////////////////////////////////////////
    const [passwordField, renewPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // TODO EMAIL ADDRESS VEIRIFICATION DONE : 
    const [isEmailVerified, setIsEmailVerified] = useState(false);


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
        try {
            let resp = await client.resetPassword({
                old_password: passwordField.oldPassword,
                new_password: passwordField.newPassword,
                repeat_password: passwordField.confirmPassword,
            })
            setIsModalPswrd(false);
            showSnackbar("success", resp.data.message);
            passwordField.oldPassword = "";
            passwordField.newPassword = "";
            passwordField.confirmPassword = "";
        } catch (error: any) {
            setError((prev) => {
                return { ...prev, text: error.response.data.message };
            });
            if (error.response.data.errors.old_password) {
                showSnackbar("error", error.response.data.errors.old_password[0]);
            }
            if (error.response.data.errors.new_password) {
                showSnackbar("error", error.response.data.errors.new_password[0]);
            }
            if (error.response.data.errors.repeat_password) {
                showSnackbar("error", error.response.data.errors.repeat_password[0]);
            }
            return
        } finally {
            setIsLoading(false);
        }
        setError((prev) => {
            return { ...prev, text: "" };
        });
    }
    const handleChange = (e: any) => {
        setStreet(e.target.value);
    };

    const [error, setError] = useState({
        text: "",
    })
    let [errorPop, setErrorPop] = useState("")

    const modifPassWord: React.JSX.Element =
        <div>
            <div className="flex flex-col items-center justify-center gap-4">
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
                <button
                    className={`${Theme_A.button.medWhiteColoredButton}`}
                    onClick={() => setIsModalPswrd(!isModalPswrd)}
                >
                    Annuler
                </button>
                <button
                    className={`${Theme_A.button.mediumGradientButton}`}
                    onClick={() => onSubmitPassword()}
                >
                    Actualiser
                </button>
            </div>
        </div>
    ////////////////////////////////////////////////////
    ///////////////////// ADDRESS 
    ////////////////////////////////////////////////////
    const onSubmitAddress = async () => {
        setIsLoading(true)
        await client.updateUserProfile({
            type: 'address',
            street_number: streetNumber,
            street: street,
            zipcode: postalCode,
            city: city,
            state: state,
            country: country,
            lat: locationLatitude,
            long: locationLongitude
        })
            .then(resp => {
                //console.log(resp.data)
                setUserInfo(resp.data);
            })
            .catch(err => {
                //console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })

        setError((prev) => {
            return { ...prev, text: "" };
        });
        showSnackbar("success", "Adresse mise à jour avec succès.");
        setIsModalAdd(false);
        fetchUserInfo();
        // setShowItem(informations);

    }


    const modifAddress: React.JSX.Element =
        <div>
            <BaseModal close={() => setIsModalAdd(false)} width="w-[600px]">
                <div>
                    <p className="text-xl font-semibold text-black text-center mb-4">Modification de l'adresse</p>

                    <div className="flex flex-col items-start justify-start gap-4">

                        <div>
                            <Autocomplete
                                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                apiKey='AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E'
                                onPlaceSelected={(place) => {
                                    setAddressData(place)
                                }}
                                options={{
                                    types: ["geocode"],
                                    fields: [
                                        'address_components',
                                        'geometry.location'
                                    ]
                                }}
                                placeholder="Address"
                                defaultValue={street}
                            />
                            <div className="flex">
                                <div className="flex-grow w-1/4 pr-2">
                                    <input
                                        placeholder="Code Postal"
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        maxLength={50}
                                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    />
                                    <input
                                        placeholder="État"
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        maxLength={50}
                                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <input
                                        placeholder="Ville"
                                        type="text"
                                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                    <input
                                        placeholder="Pays"
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        maxLength={50}
                                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center justify-center w-full">
                            <button
                                className={`${Theme_A.button.medWhiteColoredButton}`}
                                onClick={() => setIsModalAdd(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className={`${Theme_A.button.mediumGradientButton}`}
                                onClick={() => onSubmitAddress()}
                            >
                                Actualiser
                            </button>
                        </div>
                    </div>
                </div>
            </BaseModal>




        </div>
        ;

    ////////////////////////////////////////////////////
    ///////////////////// PHONE 
    ////////////////////////////////////////////////////
    const [phoneField, setPhoneField] = useState("");
    const setNewPhone = (value?: Value) => {
        if (value != undefined) {
            setPhoneField(value);
        }
    };

    const onSubmitPhone = async () => {
        if (phoneField.length < 6) { // TODO check condition
            // setError((prev) => {
            //     return { ...prev, text: "Entrez un numero de téléphone correct" };
            // });
            setErrorPop("Entrez un numero de téléphone correct");
            return;
        }
        else {
            setIsLoading(true)
            await client.updateUserProfile({
                type: 'phone',
                phone_number: phoneField,
            })
                .then(resp => {
                    //console.log(resp.data)
                    setUserInfo(resp.data)
                })
                .catch(err => {
                    //console.log(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
            setError((prev) => {
                return { ...prev, text: "" };
            });
            showSnackbar("success", "Téléphone actualisé");
            setIsModalPhone(false)
            // setShowItem(informations);
        }
    }

    const modifPhone: React.JSX.Element =
        <div >
            <div className="flex-col items-center justify-center gap-4 ">
                <p className="text-xl font-semibold text-black text-center mb-8">
                    Modification du numéro</p>
                {errorPop && (
                    <p className={`${Theme_A.checkers.errorText}`}>
                        {errorPop}
                    </p>
                )}
                <div className={`w-60 ml-20 ${inputFieldsDesignNoW}`}>
                    <PhoneInput
                        style={{ height: 8 }}
                        // className={`${inputFieldsDesign}`}
                        // inputComponent={{ phoneInput }}
                        // containerClass={containerClass}
                        defaultCountry={'FR'}
                        value={phoneField}
                        placeholder={"Nouveau numéro"}
                        onChange={phone => setNewPhone(phone)}
                    />
                </div>
            </div>
            <div className="mt-8 flex gap-4 items-center justify-center w-full">
                <button
                    className={`${Theme_A.button.medWhiteColoredButton}`}
                    onClick={() => setIsModalPhone(false)}
                >
                    Annuler
                </button>
                <button
                    className={`${Theme_A.button.mediumGradientButton}`}
                    onClick={() => onSubmitPhone()}
                >
                    Actualiser
                </button>
            </div>
        </div>;

    ////////////////////////////////////////////////////
    ///////////////////// Bank card 
    ////////////////////////////////////////////////////
    const [BankCardExpMonth, setBankCardExpMonth] = useState("");
    const [BankCardExpYear, setBankCardExpYear] = useState("");
    const [BankeCardNumb, newBankeCardNumb] = useState("");
    const setNewBankCard = (value: string) => {
        newBankeCardNumb(value);
    };

    const onSubmitBankCard = async () => {
        if (false) { // TODO check
            setError((prev) => {
                return { ...prev, text: "Entrez un numero de carte correct" };
            });
            return;
        }
        else {
            setError((prev) => {
                return { ...prev, text: "" };
            });
            // TODO: save the card for the future
            setIsModalCreditCard(false);
        }
    }

    const modifBankCard: React.JSX.Element =
        <div>
            <PaymentForm />
        </div >;

    ////////////////////////////////////////////////////
    //NOTIFICATIONS

    // function to display the preferences
    const displayNotif = (email: boolean, whatsapp: boolean, index: any) => {
        let text = ""
        if (email) {
            text = "Email"
        }
        if (whatsapp) {
            if (text != "") {
                text = text + " + "
            }
            text = text + "Whatsapp"
        }
        if (text == "") {
            text = "Aucun"
        }

        // set the text to be displayed
        notifications[index].desc = text
    }


    ////////////////////////////////////////////////////
    ///////////////////// Reminder Notification  
    ////////////////////////////////////////////////////

    const [NotifReminderEmail, setPNotifReminderEmail] = useState(false);
    const [NotifReminderWhatsapp, setPNotifReminderWhatsapp] = useState(false);
    const [NotifReminder, setNotifReminder] = useState("");

    const onSubmitReminderNotif = async () => {
        // saved reminders notifications prefrences
        setIsLoading(true)
        await client.saveNotificationsPreferences({
            type: "reminders",
            email: NotifReminderEmail,
            whatsapp: NotifReminderWhatsapp
        })
            .then(resp => {
                if (resp.data.reminders) {
                    displayNotif(resp.data.reminders.emails, resp.data.reminders.whatsapp, 0) // update text to be displayed
                }
                if (resp.data.messages) {
                    displayNotif(resp.data.messages.emails, resp.data.messages.whatsapp, 1) // update text to be displayed
                }
                setShowItem(notifications);
            })
            .catch(err => {
                //console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
        // setShowItem(informations);
        setSelectedTab(3);
        showSnackbar("succès", "Préférence actualisée");
        setIsModalNotifReminders(false)

    }

    // display the field for the account modifications
    const modifReminderNotif: React.JSX.Element =
        <div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-semibold text-black text-center">
                    Préférences de notifications de rappels</p>
                <div className="flex flex-row items-start gap-3">
                    <div
                        onClick={() => setPNotifReminderEmail(!NotifReminderEmail)}
                        className="flex items-center justify-start gap-3 mt-4 cursor-pointer"
                    >
                        <div className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${NotifReminderEmail
                            ? ColorsThemeA.ohcVerticalGradient_A
                            : "border-[#767676]"
                            }`}
                        >
                            {NotifReminderEmail && (
                                <CheckedIcon width="15" height="10" />)}
                        </div>
                        <p>Emails</p>
                    </div>
                    <div
                        onClick={() => setPNotifReminderWhatsapp(!NotifReminderWhatsapp)}
                        className="flex items-center justify-start gap-3 mt-4 cursor-pointer"
                    >
                        <div className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${NotifReminderWhatsapp
                            ? ColorsThemeA.ohcVerticalGradient_A
                            : "border-[#767676]"
                            }`}
                        >
                            {NotifReminderWhatsapp && (
                                <CheckedIcon width="15" height="10" />)}
                        </div>
                        <p>Whatsapp</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex gap-4 items-center justify-center w-full">
                <button
                    className={`${Theme_A.button.medWhiteColoredButton}`}
                    onClick={() => setIsModalNotifReminders(false)}    >
                    Annuler
                </button>
                <button
                    className={`${Theme_A.button.mediumGradientButton}`}
                    onClick={() => onSubmitReminderNotif()}  >
                    Actualiser
                </button>
            </div>
        </div>;

    ////////////////////////////////////////////////////
    ///////////////////// Reminder Notification  
    ////////////////////////////////////////////////////

    const [NotifMsgEmail, setPNotifMsgEmail] = useState(false);
    const [NotifMsgWhatsapp, setPNotifMsgWhatsapp] = useState(false);
    const [NotifMsg, setNotifMsg] = useState("");

    const onSubmitMsgNotif = async () => {
        // saved messages notifications prefrences
        setIsLoading(true)
        await client.saveNotificationsPreferences({
            type: "messages",
            email: NotifMsgEmail,
            whatsapp: NotifMsgWhatsapp
        })
            .then(resp => {
                if (resp.data.reminders) {
                    displayNotif(resp.data.reminders.emails, resp.data.reminders.whatsapp, 0) // update text to be displayed
                }
                if (resp.data.messages) {
                    displayNotif(resp.data.messages.emails, resp.data.messages.whatsapp, 1) // update text to be displayed
                }
                setShowItem(notifications);
            })
            .catch(err => {
                //console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })

        // setShowItem(informations);
        setSelectedTab(3);
        showSnackbar("succès", "Préférence actualisée");
        setIsModalNotifMsg(false)

    }

    // display the field for the account modifications
    const modifMsgNotif: React.JSX.Element =
        <div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-semibold text-black text-center">
                    Notifications concernants votre compte sont émises par</p>
                <div className="flex flex-row items-start gap-3">
                    <div
                        onClick={() => setPNotifMsgEmail(!NotifMsgEmail)}
                        className="flex items-center justify-start gap-3 mt-4 cursor-pointer"
                    >
                        <div className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${NotifMsgEmail
                            ? ColorsThemeA.ohcVerticalGradient_A
                            : "border-[#767676]"
                            }`}
                        >
                            {NotifMsgEmail && (
                                <CheckedIcon width="15" height="10" />)}
                        </div>
                        <p>Emails</p>
                    </div>
                    <div
                        onClick={() => setPNotifMsgWhatsapp(!NotifMsgWhatsapp)}
                        className="flex items-center justify-start gap-3 mt-4 cursor-pointer"
                    >
                        <div className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${NotifMsgWhatsapp
                            ? ColorsThemeA.ohcVerticalGradient_A
                            : "border-[#767676]"
                            }`}
                        >
                            {NotifMsgWhatsapp && (
                                <CheckedIcon width="15" height="10" />)}
                        </div>
                        <p>Whatsapp</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex gap-8 items-center justify-center w-full">
                <button
                    className={`${Theme_A.button.medWhiteColoredButton}`}
                    onClick={() => setIsModalNotifMsg(false)}    >
                    Annuler
                </button>
                <button
                    className={`${Theme_A.button.mediumGradientButton}`}
                    onClick={() => onSubmitMsgNotif()}  >
                    Actualiser
                </button>
            </div>
        </div>;



    // TODO: add information about the client coming from backend in "desc".
    let informations: infoInterface[] = [
        { name: "Nom légal", desc: "", modif: false, popup: emptyPopup },
        { name: "Adresse", desc: "", modif: true, popup: modifAddress },
        { name: "Numéro de téléphone", desc: "", modif: true, popup: modifPhone },
        { name: "Adresse e-mail", desc: "", modif: false, popup: emptyPopup },
        // { name: "Pièce d'identité officielle", desc: "Information non fournie", modif: false, popup: emptyPopup },
        // { name: "Statut", desc: "Etudiant - vérifié", modif: false, popup: emptyPopup },
    ];

    const password: infoInterface[] = [
        { name: "Mot de passe", desc: "", modif: true, popup: modifPassWord },
    ];

    let notifications: infoInterface[] = [
        { name: "Rappels", desc: "Notification de rappel avant une réservation", modif: true, popup: modifReminderNotif },
        { name: "Messages", desc: "Notification en cas de message sur le chat Onehaircut", modif: true, popup: modifMsgNotif },
    ];

    const payments: infoInterface[] = [
        { name: 'Moyen de payement préféré', desc: "4212 **** **** ****", modif: true, popup: modifBankCard },
    ];

    const confidentiality: infoInterface[] = [
        { name: "Rendez-vous sur:", desc: "www.onehaircut.com/confidentiality", modif: false, popup: emptyPopup },
    ];

    const languages: infoInterface[] = [
        { name: "Langue actuelle", desc: "Francais", modif: false, popup: emptyPopup },
    ];


    const [showItem, setShowItem] = useState(informations);
    const [selectedParam, setSelectedParam] = useState(infoInterfaceIni);

    const onSelectTab = (item: string, index: number) => {
        setSelectedTab(index);
        if (item === "Notifications") {
            fetchPrefrences() //fetching notifications prefrences on tab access
        }
        else if (item === "Moyens de paiements") {
            setShowItem(payments);
        }
        else if (item === "Langue") {
            setShowItem(languages);
        }
        else if (item === "Mot de passe") {
            setShowItem(password);
        }
        else if (item === "Confidentialité et règles d’utilisation") {
            setShowItem(confidentiality);
            const urlToOpen = '/confidentiality'; // Replace with your URL or component path
            // Open the URL in a new tab
            window.open(urlToOpen);
        }
        else {
            fetchUserInfo(); //fetching user info on tab access
        }
    };

    const fetchPrefrences = async () => {
        const resp = await client.getNotificationsPreferences()

        if (resp.data.reminders) {
            setPNotifReminderEmail(resp.data.reminders.emails)
            setPNotifReminderWhatsapp(resp.data.reminders.whatsapp)
            displayNotif(resp.data.reminders.emails, resp.data.reminders.whatsapp, 0) // update text to be displayed
        }
        if (resp.data.messages) {
            setPNotifMsgEmail(resp.data.messages.emails)
            setPNotifMsgWhatsapp(resp.data.messages.whatsapp)
            displayNotif(resp.data.messages.emails, resp.data.messages.whatsapp, 1) // update text to be displayed
        }
        setShowItem(notifications);
    }

    const fetchUserInfo = async () => {
        const resp = await client.getUserProfile()
        //console.log(resp.data);
        // to update informations description which is displayed
        informations[0].desc = resp.data.name;
        let name = resp.data.name;
        let street_number = resp.data.street_number ?? "";
        let street = resp.data.street ?? "";
        let zipcode = resp.data.zipcode ?? "";
        let city = resp.data.city ?? "";
        let state = resp.data.state ?? "";
        let country = resp.data.country;
        if (street_number || street || zipcode || city) {
            informations[1].desc = [street, city, zipcode].filter((item) => item != null).join(" ");
        } else {
            informations[1].desc = "Aucun";
        }
        informations[2].desc = resp.data.phone;
        informations[3].desc = resp.data.email;
        // to set value of fields in model
        setPhoneField(resp.data.phone);
        setName(name);
        setStreetNumber(street_number);
        setStreet(street);
        setCity(city);
        setPostalCode(zipcode);
        setCountry(country);
        setState(state);
        setShowItem(informations);
    }

    const setUserInfo = async (data: any) => {

        // to update informations description which is displayed
        informations[0].desc = data.name;
        let street_number = data.street_number ?? "";
        let street = data.street ?? "";
        let zipcode = data.zipcode ?? "";
        let city = data.city ?? "";
        if (street_number || street || zipcode || city) {
            informations[1].desc = [street_number, street, city, zipcode].filter((item) => item != null).join(" ");
        } else {
            informations[1].desc = "Aucun";
        }
        informations[2].desc = data.phone;
        informations[3].desc = data.email;

        // to set value of fields in model
        // newStreetNbField(street_number);
        // newStreetField(street);
        // newPostCodeField(zipcode);
        // newCityField(city);
        setPhoneField(data.phone);

        setShowItem(informations);
    }

    // Use useEffect to update informations when state variables change
    useEffect(() => {
        fetchUserInfo();
    }, [])

    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-14 mb-5 px-6">

                    {/* PLACE FOR ALL MODALS */}
                    {/*  Address */}
                    {isModalAdd && (
                        <BaseModal close={() => setIsModalAdd(false)}>
                            <div>
                                {modifAddress}
                            </div>
                        </BaseModal>)}

                    {/*  Phone */}
                    {isModalPhone && (
                        <BaseModal close={() => setIsModalPhone(false)}>
                            <div>
                                {modifPhone}
                            </div>
                        </BaseModal>)}

                    {/*  Password */}
                    {isModalPswrd && (
                        <BaseModal close={() => setIsModalPswrd(false)}>
                            <div>
                                {modifPassWord}
                            </div>
                        </BaseModal>)}

                    {/*  Credit card */}
                    {isModalCreditCard && (
                        <BaseModal close={() => setIsModalCreditCard(false)}>
                            <div>
                                {modifBankCard}
                            </div>
                        </BaseModal>)}

                    {/*  Notification Reminders */}
                    {isModalNotifReminders && (
                        <BaseModal close={() => setIsModalNotifReminders(false)}>
                            <div>
                                {modifReminderNotif}
                            </div>
                        </BaseModal>)}

                    {/*  Notification Messages */}
                    {isModalNotifMsg && (
                        <BaseModal close={() => setIsModalNotifMsg(false)}>
                            <div>
                                {modifMsgNotif}
                            </div>
                        </BaseModal>)}

                    {/* NORMAL VIEW */}
                    <p className="text-black font-medium text-3xl text-center">
                        Gestion du compte
                    </p>
                    {!isEmailVerified && (
                        <p className="text-red-600 text-center mt-2">
                            Adresse email non vérifiée
                        </p>
                    )}
                    <div className="flex flex-col md:flex-row items-start justify-center gap-10 xl:gap-20 mt-10">
                        <div className="w-full md:w-auto flex flex-col items-center justify-center gap-6">
                            {items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => onSelectTab(item, index)}
                                        className={`flex items-center justify-center w-full md:w-80 xl:w-96 h-16 bg-white rounded-2xl text-black shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] border cursor-pointer ${selectedTab === index && "border-secondary"
                                            }`}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                        <div className=" w-full md:w-6/12 md:h-max mt-5 md:mt-0 rounded-3xl bg-white py-8 px-14 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)] h-screen">
                            {showItem.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start justify-between my-6"
                                    >
                                        <div>
                                            <p className="text-black">{item.name}</p>
                                            <p className="text-[#666] text-sm">{item.desc}</p>
                                        </div>
                                        {item.modif === true ?
                                            <div className="cursor-pointer text-black underline text-xs"
                                                onClick={() => handleModifierClick(item)}
                                            >modifier
                                            </div>
                                            :
                                            <div></div>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ClientDashboardLayout >
            <Footer />
        </div >
    )
}

export default Account