import React, { useState, useEffect } from "react";
import { EditIcon, CheckedIcon, MinusIcon, AddIcon } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import BaseModal from "@/components/UI/BaseModal";
import DropdownMenu from "@/components/UI/DropDownMenu";
import { ColorsThemeA } from "@/components/utilis/Themes";
import CustomSlider from "@/components/UI/OHC_Slider";
import CustomInput from "@/components/UI/CustomInput";
import ComponentTheme from "@/components/UI/ComponentTheme";
import Autocomplete from "react-google-autocomplete";
import { client } from "@/api/clientSide";
import { salonApi } from '@/api/salonSide';
import useSnackbar from "@/hooks/useSnackbar";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import { ErrorBar } from "recharts";

const tempSalon = getLocalStorage('hair_salon');
const salonInfo = tempSalon ? JSON.parse(tempSalon) : null;

const SalonInfos = () => {
    const [isModal, setIsModal] = useState(false);
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [billingName, setBillingName] = useState("");
    const [billingStreet, setBillingStreet] = useState("");
    const [billingPostalCode, setBillingPostalCode] = useState("");
    const [billingCity, setBillingCity] = useState("");
    const [billingState, setBillingState] = useState("");
    const [billingCountry, setBillingCountry] = useState("");
    const [isBillingAddressSame, setIsBillingAddressSame] = useState(false);
    const [SelectedSalonType, setSelectedSalonType] = useState<string>('');
    const [SalonType, setSalonType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showSnackbar = useSnackbar();
    const [addressResponse, setAddressResponse] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
        name: "",
        zipcode: "",
        billing_name: "",
        billing_city: "",
        billing_zip_code: "",
        billing_country: "",
        billing_state: "",
        billing_street: ""
    });
    const [locationLatitude, setLocationLatitude] = useState(0.0);
    const [locationLongitude, setLocationLongitude] = useState(0.0);
    const openModal = () => {
        setIsModal(true);
    };
    const closeModal = () => {
        setIsModal(false);
    };

    // Error state
    const [error, setError] = useState({
        text: "",
    })
    const [errorBilling, setErrorBilling] = useState({
        text: "",
    })


    // Utilisez useEffect pour déclencher la recherche de la ville lorsque le code postal change
    useEffect(() => {
        fetchAdress();
        if (salonInfo) {
            if (salonInfo.type == 'barber_shop') {
                setSelectedSalonType('Barber-shop')
            } else {
                setSelectedSalonType(salonInfo.type)
            }
            setTypeImage(salonInfo.type)
            setIsMobilityAllowed(salonInfo.is_mobile)
        }
    }, []);

    const saveSalonType = async (item) => {
        await salonApi.saveSalonType({ type: item })
            .then((resp) => {
                setLocalStorage("hair_salon", JSON.stringify(resp.data));
                showSnackbar("success", "Salon Type Saved Successfully.");
            })
            .catch(err => {
                //console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const saveSalonMobility = async () => {
        await salonApi.saveSalonMobility({ is_mobile: !isMobilityAllowed, price: ZonePrice })
            .then((resp) => {
                showSnackbar("success", "Salon Mobility Saved Successfully.");
            })
            .catch(err => {
                //console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const saveZoneRadius = async (radius) => {
        await salonApi.saveZoneRadius({ zone_radius: radius })
            .then((resp) => {
                showSnackbar("success", "Salon Mobility Zone Saved Successfully.");
            })
            .catch(err => {
                //console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    // handling the change of Salon type change    

    //For mobility checkbox
    const [isMobilityAllowed, setIsMobilityAllowed] = useState(false); // État de la checkbox
    const handleCheckboxChange = (mobility: boolean) => {
        setIsMobilityAllowed(mobility);
        saveSalonMobility()
    };
    const [selectedWeekday, setSelectedWeekday] = useState<string>('');


    //For Dropdown lists Type of salon
    const SalonTypeList = [
        "Barber-shop",
        "Salon pour hommes",
        "Salon pour femmes",
        "Coiffeur/euse mobile homme",
        "Coiffeur/euse mobile femme",
        "Salon mixte",
    ];

    const [selectedImageUrl, setSelectedImageUrl] = useState('/assets/DefaultPictures/Profil.png');
    const HandleSelectedSalonType = (item: string) => {
        setSelectedSalonType(item);
        setTypeImage(item)
        saveSalonType(item)
    }

    const setTypeImage = (item) => {
        let imageUrl = '/assets/DefaultPictures/Profil.png';
        switch (item) {
            case 'Barber-shop':
                setSalonType("Barber-shop");
                imageUrl = "/assets/salon_types/BarberShop.png";
                break;
            case 'Salon pour hommes':
                setSalonType("Salon pour hommes");
                imageUrl = "/assets/salon_types/Salon de coiffure pour homme.png";
                break;
            case 'Salon pour femmes':
                setSalonType("Salon pour femmes");
                imageUrl = "/assets/salon_types/Salon de coiffure pour femme.png";
                break;
            case 'Coiffeur/euse mobile homme':
                setSalonType("Coiffeur/euse mobile homme");
                imageUrl = "/assets/salon_types/Coiffeur Independant.png";
                break;
            case 'Coiffeur/euse mobile femme':
                setSalonType("Coiffeur/euse mobile femme");
                imageUrl = "/assets/salon_types/Coiffeuse Indépendante.png";
                break;
            case 'Salon mixte':
                setSalonType("Salon mixte'");
                imageUrl = "/assets/salon_types/Salon de coiffure mixte.png";
                break;
            default:
                imageUrl = "/assets/salon_types/Salon de coiffure mixte.png";
                break;
        }
        setSelectedImageUrl(imageUrl);
    }

    //For the slider :
    // Reset the slider values
    const [zoneSliderRange, setZoneSliderRange] = useState([0, 15]);
    const handleZoneSliderChange = (event: any, newValue: any) => {
        setZoneSliderRange(newValue);
        //console.log(newValue)
        //saveZoneRadius(newValue)
    };
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
    const setAddressData = async (place: any,) => {
        setStreet("")
        setCity("")
        setState("")
        setCountry("")
        setPostalCode("")
        setError((prev) => {
            return { ...prev, text: "" };
        });


        // take actions only if there is a place
        if (place != undefined) {
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
            else if (!address.street_number) {
                console.log('pas de numero');
                setError((prev) => {
                    return { ...prev, text: 'Veuillez indiquer le numéro de rue' };
                })
            }
            setLocationLatitude(place.geometry.location.lat());
            setLocationLongitude(place.geometry.location.lng());
        }
    }

    // function to set the state variables based on the google input parameters
    const setAddressDataBilling = async (place: any,) => {
        setBillingStreet("")
        setBillingCity("")
        setBillingState("")
        setBillingCountry("")
        setBillingPostalCode("")
        setError((prev) => {
            return { ...prev, text: "" };
        });

        let address = {} as any
        place.address_components.map((item, index) => {
            setAddressFields(address, item.types[0], item.long_name);
        });

        setBillingCity(address.city || "")
        setBillingState(address.administrative_area_level_1 || "")
        setBillingCountry(address.country || "")
        setBillingPostalCode(address.postal_code || "")


        setBillingStreet(address.route || "")
        if (address.street_number && address.street_number != address.route) {
            setBillingStreet((pre) => address.street_number + " " + pre)
        }
        else if (!address.street_number) {
            console.log('pas de numero');
            setErrorBilling((prev) => {
                return { ...prev, text: 'Veuillez indiquer le numéro de rue' };
            })
        }
    }

    const billingAddressIsSame = () => {
        setBillingCity(city);
        setBillingCountry(country);
        setBillingName(name);
        setBillingPostalCode(postalCode);
        setBillingState(state);
        setBillingStreet(street);

    }
    const handleChange = (e: any) => {
        setStreet(e.target.value);
    };
    const handleChangeBilling = (e: any) => {
        setBillingStreet(e.target.value);
    };

    const SaveAddress = async () => {
        setIsLoading(true);
        isBillingAddressSame ? billingAddressIsSame() : ""
        await salonApi.storeAddresses({
            name: name,
            street: street,
            zipcode: postalCode,
            city: city,
            state: state,
            country: country,
            billing_name: billingName,
            billing_street: billingStreet,
            billing_zipcode: billingPostalCode,
            billing_city: billingCity,
            billing_state: billingState,
            billing_country: billingCountry,
            is_billing_address_same: isBillingAddressSame,
            latitude: locationLatitude,
            longitude: locationLongitude
        })
            .then((resp) => {
                showSnackbar("success", "Adresse mise à jour avec succès.");
                setIsModal(false);
            })
            .catch(err => {
                //console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
                fetchAdress();
            })
    }

    const fetchAdress = async () => {
        const resp = await salonApi.getAddresses()
        setAddressResponse(resp.data);
        setName(resp.data.name);
        setStreet(resp.data.street);
        setPostalCode(resp.data.zipcode);
        setCity(resp.data.city);
        setState(resp.data.state);
        setCountry(resp.data.country);
        setIsBillingAddressSame(resp.data.is_billing_address_same);
        setBillingName(resp.data.billing_name);
        setBillingStreet(resp.data.billing_street);
        setBillingPostalCode(resp.data.billing_zip_code);
        setBillingCity(resp.data.billing_city);
        setBillingState(resp.data.billing_state);
        setBillingCountry(resp.data.billing_country);
    }



    const [billingPerKm, setBillingPerKm] = useState('');
    const [ZonePrice, setZonePrice] = useState(0);
    const [maxFees, setMaxFees] = useState(0);

    // Supposons que vous utilisiez la deuxième valeur du slider pour numericZoneSliderRange
    const numericZoneSliderRange = zoneSliderRange[1];
    const numericBillingPerKm = Number(billingPerKm);

    const isInputValid = numericBillingPerKm > 0 && numericZoneSliderRange > 0;

    useEffect(() => {
        setMaxFees(ZonePrice * numericZoneSliderRange);
    }, [ZonePrice, numericZoneSliderRange]);

    const handleBillingPerKmChange = (e) => {
        setBillingPerKm(e.target.value);
    };

    const zonePriceHandler = (operation) => {
        if (isMobilityAllowed) {
            let newPrice = ZonePrice;
            if (operation === 'add' && ZonePrice < 30) {
                newPrice = parseFloat((ZonePrice + 0.1).toFixed(2));
            } else if (operation === 'minus' && ZonePrice > 0) {
                newPrice = parseFloat((ZonePrice - 0.1).toFixed(2));
            }
            setZonePrice(newPrice);
        }
    };

    /************************************************************************************************************************** */

    return (
        // ...
        <div className={`w-[500px] h-max bg-white rounded-2xl py-4 shadow-lg mb-8`}>
            {isModal && (
                <BaseModal close={() => setIsModal(false)} width="w-[600px]">
                    <div className="relative z-100">
                        {/* Contenu du Modal Adresse */}
                        <div className="flex">
                            {/* Adresse */}
                            <div className="flex-1 py-5 pl-5 overflow-hidden">
                                <h1 className="inline text-2xl font-semibold leading-none">Adresse</h1>
                            </div>
                        </div>
                        <div className="px-5 pb-5">
                            <input
                                placeholder="Nom"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={50}
                                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                            />
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
                                onChange={handleChange}
                                placeholder="Address"
                                defaultValue={street}
                            />
                            {error && (
                                <p className={`${Theme_A.checkers.errorText}`}>
                                    {error.text}
                                </p>
                            )}
                            <div className="flex">
                                <div className="flex-grow w-1/4 pr-2">
                                    <input
                                        placeholder="Code Postal"
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        maxLength={50}
                                        className={`${Theme_A.fields.inputFieldDisabled}`}
                                    />
                                    <input
                                        placeholder="État"
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        maxLength={50}
                                        className={`${Theme_A.fields.inputFieldDisabled}`}
                                    />
                                </div>
                                <div className="flex-grow">
                                    <input
                                        placeholder="Ville"
                                        type="text"
                                        className={`${Theme_A.fields.inputFieldDisabled}`}
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                    <input
                                        placeholder="Pays"
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        maxLength={50}
                                        className={`${Theme_A.fields.inputFieldDisabled}`}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center pt-3">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-black bg-gray-300 border-none rounded-xl focus:ring-transparent"
                                    checked={isBillingAddressSame} // Utilisation de l'état de la checkbox
                                    onChange={() => {
                                        setIsBillingAddressSame(!isBillingAddressSame)
                                        isBillingAddressSame ? billingAddressIsSame() : ""
                                    }} // Mettre à jour l'état de la checkbox
                                />
                                <label htmlFor="safeAdress" className="block ml-2 text-sm text-gray-900">
                                    Adresse de facturation
                                </label>
                            </div>
                        </div>

                        {/* Adresse de facturation */}
                        {!isBillingAddressSame && (
                            <div className="flex">
                                <div className="flex-1 py-5 pl-5 overflow-hidden">
                                    <h1 className="inline text-2xl font-semibold leading-none">Adresse de facturation</h1>
                                </div>
                                <div className="flex-none pt-2.5 pr-2.5 pl-1" />
                            </div>
                        )}
                        {!isBillingAddressSame && (
                            <div className="px-5 pb-5">
                                <input
                                    placeholder="Nom de Facturation"
                                    type="text"
                                    value={billingName}
                                    onChange={(e) => setBillingName(e.target.value)}
                                    maxLength={50}
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                />
                                <Autocomplete
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    apiKey='AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E'
                                    onPlaceSelected={(place) => {
                                        setAddressDataBilling(place)
                                    }}
                                    options={{
                                        types: ["geocode"],
                                        fields: [
                                            'address_components',
                                            'geometry.location'
                                        ]
                                    }}
                                    onChange={handleChangeBilling}
                                    placeholder="Address"
                                    defaultValue={billingStreet}
                                />

                                {errorBilling && (
                                    <p className={`${Theme_A.checkers.errorText}`}>
                                        {errorBilling.text}
                                    </p>
                                )}
                                <div className="flex">
                                    <div className="flex-grow w-1/4 pr-2">
                                        <input
                                            placeholder="Code postal de facturation"
                                            type="text"
                                            value={billingPostalCode}
                                            onChange={(e) => setBillingPostalCode(e.target.value)}
                                            maxLength={50}
                                            className={`${Theme_A.fields.inputFieldDisabled}`}
                                        />
                                        <input
                                            placeholder="État de facturation"
                                            type="text"
                                            value={billingState}
                                            onChange={(e) => setBillingState(e.target.value)}
                                            maxLength={50}
                                            className={`${Theme_A.fields.inputFieldDisabled}`}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <input
                                            placeholder="Ville de facturation"
                                            type="text"
                                            className={`${Theme_A.fields.inputFieldDisabled}`}
                                            value={billingCity}
                                            onChange={(e) => setBillingCity(e.target.value)}
                                            maxLength={50}
                                        />
                                        <input
                                            placeholder="Pays de facturation"
                                            type="text"
                                            value={billingCountry}
                                            onChange={(e) => setBillingCountry(e.target.value)}
                                            maxLength={50}
                                            className={`${Theme_A.fields.inputFieldDisabled}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <hr className="mt-4" />

                        {/* Séparation */}
                        <div className="flex flex-row-reverse p-3">
                            {/* Boutons */}
                            <div className="flex-initial pl-3">
                                <button
                                    disabled={(street == '') || (error.text != '') || (errorBilling.text != '')}
                                    type="button"
                                    onClick={() => SaveAddress()}
                                    className={`${(street == '') || (error.text != '') || (errorBilling.text != '') ? Theme_A.button.medGreyColoredButton : Theme_A.button.medBlackColoredButton} ease-in-out transition duration-300`}
                                >
                                    <span>Enregistrer</span>
                                </button>
                            </div>
                            <div className="flex-initial">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className={`${Theme_A.button.medWhiteColoredButton} ease-in-out transition duration-300`}
                                >
                                    <span>Annuler</span>
                                </button>
                            </div>
                        </div>
                        {/* Fin du contenu du Modal Adresse */}
                    </div>
                </BaseModal>
            )}
            {/* Affichage des adresses dans la vignette principale */}
            <div className="flex">
                <h4 className="flex items-center justify- ml-6 mb-2 font-semibold text-lg">
                    Adresses
                </h4>
            </div>


            <div className="flex">
                <div className="flex-1 py-5 pl-5 ml-8 ">

                    <ul>
                        <li className="text-sm mb-2 text-gray-400 uppercase font-semibold">
                            Adresse de l'établissement
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Nom : {addressResponse.name}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Adresse : {addressResponse.street}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Code postal : {addressResponse.zipcode}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Ville : {addressResponse.city}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            État : {addressResponse.state}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Pays : {addressResponse.country}
                        </li>
                    </ul>
                </div>
                <div className="flex-1 py-5 pl-1 overflow-hidden ml-4">
                    <ul>
                        <li className="text-sm mb-2 text-gray-400 uppercase font-semibold">
                            Adresse de <br /> facturation
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Nom : {addressResponse.billing_name}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Adresse : {addressResponse.billing_street}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Code postal : {addressResponse.billing_zip_code}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Ville : {addressResponse.billing_city}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            État : {addressResponse.billing_state}
                        </li>
                        <li className="text-sm text-gray-400 italic">
                            Pays : {addressResponse.billing_country}
                        </li>
                    </ul>
                </div>
                <div
                    className={`${Theme_A.servicesCards.modifyButton} mr-8 shadow-md  transition-transform duration-300 transform hover:scale-125`}
                    onClick={openModal}
                >
                    <EditIcon />
                </div>
            </div>

            {/* Séparation */}
            <hr className="mx-16 border-gray-300 h-4" />

            {/* TYPE D ETABLISSEMENT */}
            <h4 className="flex items-center justify- ml-6 mb-8 font-semibold text-lg">
                Type d'établissement
            </h4>
            <div className="flex items-center justify-center mb-2 "> {/* Increased horizontal spacing */}
                {/* DropDown + Vignette avec image */}
                <div className="flex items-center">
                    <DropdownMenu
                        dropdownItems={SalonTypeList}
                        fctToCallOnClick={HandleSelectedSalonType}
                        menuName="Type d'établissement"
                        selectId={SelectedSalonType}
                    />
                    <img
                        src={selectedImageUrl}
                        alt=""
                        className="w-32 h-24 mr-4 ml-8 bg-stone-300 rounded-lg mb-4 "
                    />
                </div>
            </div>
            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4" />


            {/* ZONE DE MOBILITE */}
            <div className="flex flex-col">
                {/* Titre "Zone de mobilité" */}
                <h4 className="flex ml-6 mb-2 font-semibold text-lg">
                    Zone de mobilité
                </h4>

                {/* Checkbox et label "Autoriser la mobilité" */}
                <div className="flex-1 py-5 pl-5 ml-8 flex items-center"> {/* Utilisez flex items-center ici */}
                    <div onClick={() => handleCheckboxChange(!isMobilityAllowed)} className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded ${isMobilityAllowed
                        ? ColorsThemeA.ohcVerticalGradient_A
                        : "bg-[#D6D6D6]"
                        }`}>
                        <CheckedIcon />
                    </div>
                    <label htmlFor="mobilityZone" className="ml-2 text-sm font-medium text-gray-900">
                        Coiffure à domicile
                    </label>
                </div>


                {/* TODO SAVE AND CHANGE THE PRICE FOR CUSTOMER*/}
                {/* Label supplémentaire qui apparaît si la checkbox est cochée */}
                {isMobilityAllowed && (
                    <div>
                        <div className="relative items-center justify-center w-64 mx-auto"> {/* Utilisez mx-auto pour centrer */}
                            <CustomSlider
                                theme={ComponentTheme}
                                value={zoneSliderRange}
                                onChange={handleZoneSliderChange}
                                min={0}
                                max={30}
                                unit="km"
                                label="Zone de mobilité" // Fournissez une prop label si votre composant CustomSlider l'attend
                                valueLabelDisplay="auto"
                            />
                        </div>

                        {/* KM COST*/}
                        <div className="md:mt-0 ml-14 mb-4">
                            <p className="text-stone-700 text-sm font-medium mt-8 mb-1 ">Facturation au km</p>
                            <div className="flex items-start justify-start gap-3">
                                <div className='w-[85px] h-9 flex items-center justify-center text-black border border-black rounded-lg shadow-lg cursor-not-allowed bg-white'>
                                    {ZonePrice} €
                                </div>
                                <div className={`flex items-center justify-center py-1 rounded-md ${isMobilityAllowed ? ColorsThemeA.OhcGradient_A : ColorsThemeA.inactivButtonColor} shadow-lg`}>
                                    <div onClick={() => zonePriceHandler('minus')} className="border-r border-white px-4 py-3 cursor-pointer transform hover:scale-110 transition-transform">
                                        <MinusIcon />
                                    </div>
                                    <div onClick={() => zonePriceHandler('add')} className="py-1 px-4 cursor-pointer transform hover:scale-110 transition-transform">
                                        <AddIcon />
                                    </div>
                                </div>

                                {/* Affichage des frais maximum */}
                                <div className="ml-4 bg-slate-200 text-stone-400 font-thin rounded-lg p-2 flex items-center cursor-not-allowed">
                                    <span className="text-sm font-medium">
                                        Frais maximum: {maxFees.toFixed(2)} €
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* TODO SAVE MOBILITY AND TYPE OF SALON DATA WITH THIS BUTTON */}
                        <div className="flex justify-center items-center">
                            <button className={`mt-6 flex gap-4 items-center justify-center w-22 ${Theme_A.button.medBlackColoredButton}`} onClick={() => ``}> Mettre à jour</button>
                        </div>
                    </div>
                )}
            </div>





            {/* fin Affichage des adresses dans la vignette principale */}
        </div>


    );
};

export default SalonInfos;