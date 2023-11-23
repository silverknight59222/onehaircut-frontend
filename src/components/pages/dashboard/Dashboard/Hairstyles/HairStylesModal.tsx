import React, { useState } from 'react';
import { Theme_A } from "@/components/utilis/Themes";
import Image from "next/image";
import { getLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import {
    CheckedIcon,
    SearcIcon,
    SelectedIcon,
} from "@/components/utilis/Icons";
import { Haircut, SalonHaircut } from "@/types";

export interface HaircutDetails {
    id: number;
    base_price: string;
    base_duration: string;
    court_price_length: string;
    court_duration_length: string;
    moyen_price_length: string;
    moyen_duration_length: string;
    long_price_length: string;
    long_duration_length: string;
    fin_price_type: string;
    fin_duration_type: string;
    moyen_price_type: string;
    moyen_duration_type: string;
    epais_price_type: string;
    epais_duration_type: string;
}

const HairStylesModal = React.memo(({ activeMenu, hairStyleSelectEvent, onResetStyleForm, reloadListEvent }: any) => {
    // console.log("in HairStylesModal")

    const showSnackbar = useSnackbar();

    const defaultHaircut = {
        id: -1,
        image: "",
        name: "",
        type: "",
        length: "",
        is_added_to_wishlist: false,
    };

    const defaultFormDetails = {
        id: -1,
        base_price: "",
        base_duration: "",
        court_price_length: "0",
        court_duration_length: "0",
        moyen_price_length: "0",
        moyen_duration_length: "0",
        long_price_length: "0",
        long_duration_length: "0",
        fin_price_type: "0",
        fin_duration_type: "0",
        moyen_price_type: "0",
        moyen_duration_type: "0",
        epais_price_type: "0",
        epais_duration_type: "0",
    };

    const [error, setError] = useState({
        base_price: "",
        base_duration: "",
        select_haircut: "",
    });

    const [form, setForm] = useState<HaircutDetails>(defaultFormDetails);
    const [selectedHaircut, setSelectedHaircut] = useState<Haircut>();

    const [selectedHaircutsMapping, setSelectedHaircutsMapping] = useState<Haircut[]>([]);

    const onHairStyleSelect = async ({item, type}) => {
        console.log(item)
        if (type == "add") {
            setSelectedHaircutsMapping((prevData) => {
                if (!prevData.filter(pre => pre.id == item.id).length) {
                    prevData.push(item)
                    return [...prevData]
                }
                return [...prevData]
            });
        } else {
            setSelectedHaircutsMapping((prevData) => {
                prevData = prevData.filter(pre => pre.id != item.id)
                return [...prevData]
            });
        }
    }

    const reset = () => {
        setSelectedHaircutsMapping([]);
        setForm(defaultFormDetails);
    }
    // register event
    hairStyleSelectEvent.on = onHairStyleSelect
    onResetStyleForm.on = reset

    const getSelectedImage = () => {
        let url = "";
        if (selectedHaircutsMapping[selectedHaircutsMapping.length - 1]) {
            url = `https://api.onehaircut.com${selectedHaircutsMapping[selectedHaircutsMapping.length - 1].image}`;
        }
        return url;
    };

    const onChangeInput = (value: string, input: string) => {
        switch (input) {
            case "base_price":
                setForm((prev) => ({
                    ...prev,
                    base_price: value,
                }));
                break;
            case "base_duration":
                setForm((prev) => ({
                    ...prev,
                    base_duration: value,
                }));
                break;
            case "court_price_length":
                setForm((prev) => ({
                    ...prev,
                    court_price_length: value,
                }));
                break;
            case "court_duration_length":
                setForm((prev) => ({
                    ...prev,
                    court_duration_length: value,
                }));
                break;
            case "moyen_price_length":
                setForm((prev) => ({
                    ...prev,
                    moyen_price_length: value,
                }));
                break;
            case "moyen_duration_length":
                setForm((prev) => ({
                    ...prev,
                    moyen_duration_length: value,
                }));
                break;
            case "long_price_length":
                setForm((prev) => ({
                    ...prev,
                    long_price_length: value,
                }));
                break;
            case "long_duration_length":
                setForm((prev) => ({
                    ...prev,
                    long_duration_length: value,
                }));
                break;
            case "fin_price_type":
                setForm((prev) => ({
                    ...prev,
                    fin_price_type: value,
                }));
                break;
            case "fin_duration_type":
                setForm((prev) => ({
                    ...prev,
                    fin_duration_type: value,
                }));
                break;
            case "moyen_price_type":
                setForm((prev) => ({
                    ...prev,
                    moyen_price_type: value,
                }));
                break;
            case "moyen_duration_type":
                setForm((prev) => ({
                    ...prev,
                    moyen_duration_type: value,
                }));
                break;
            case "epais_price_type":
                setForm((prev) => ({
                    ...prev,
                    epais_price_type: value,
                }));
                break;
            case "epais_duration_type":
                setForm((prev) => ({
                    ...prev,
                    epais_duration_type: value,
                }));
                break;
            default:
                break;
        }
    };

    const updateSalonHaircuts = async () => {
        if (!form.base_price) {
            setError((prev) => {
                return { ...prev, base_price: "Price is required" };
            });
            return;
        } else {
            setError((prev) => {
                return { ...prev, base_price: "" };
            });
        }
        if (!form.base_duration) {
            setError((prev) => {
                return { ...prev, base_duration: "Duration is required" };
            });
            return;
        } else {
            setError((prev) => {
                return { ...prev, base_duration: "" };
            });
        }
        let data: any = form;
        data.hair_salon_id = Number(getLocalStorage("salon_id"));
        data.haircut_id = selectedSalonHaircut.id;
        await dashboard
            .updateSalonHaircut(form.id, data)
            .then((res) => {
                setForm(defaultFormDetails);
                showSnackbar("success", "Haircut updated successfully");
                // refresh modal list
                setSelectedSalonHaircut(defaultHaircut);
            })
            .catch((err) => {
                showSnackbar("error", "Failed to update haircut");
            });
    };

    const addSalonHaircuts = async () => {
        if (!form.base_price) {
            setError((prev) => {
                return { ...prev, base_price: "Price is required" };
            });
            return;
        } else {
            setError((prev) => {
                return { ...prev, base_price: "" };
            });
        }
        if (!form.base_duration) {
            setError((prev) => {
                return { ...prev, base_duration: "Duration is required" };
            });
            return;
        } else {
            setError((prev) => {
                return { ...prev, base_duration: "" };
            });
        }
        if (selectedHaircutsMapping.length == 0) {
            setError((prev) => {
                return {
                    ...prev,
                    select_haircut: "Selection of atleast one haircut is required",
                };
            });
            return;
        } else {
            setError((prev) => {
                return { ...prev, select_haircut: "" };
            });
        }
        let data: any = form;
        const selectedHaircuts: number[] = [];
        selectedHaircutsMapping.map((item) => {
            selectedHaircuts.push(item.id);
        });
        data.hair_salon_id = Number(getLocalStorage("salon_id"));
        data.haircut_ids = selectedHaircuts;
        await dashboard
            .addSalonHaircut(data)
            .then((res) => {
                setSelectedHaircutsMapping([]);
                setForm(defaultFormDetails);
                reloadListEvent.on()
                showSnackbar("success", "Haircuts added successfully");
                // TODO refresh list
            })
            .catch((err) => {
                showSnackbar("error", "Failed to add new haircuts");
            });
    };

    // This component will re-render only if the `data` prop changes
    return (
        <div className="bg-stone-50 shadow-md border-2 border-stone-200 rounded-3xl p-4 md:sticky md:top-0 h-max">
            <div className="flex items-center justify-center gap-2">
                <h2 className={`${Theme_A.textFont.headerH3}`}>
                    Configurations des coiffures
                </h2>
                {(selectedHaircutsMapping.length > 0) && <div className={`${Theme_A.indicators.counterIndicator}`}>{selectedHaircutsMapping.length}</div>}
            </div>
            <div className="flex items-center justify-center">
                {getSelectedImage() ? (
                    <div className={`${Theme_A.hairstyleCards.cardSize.big}`}>
                        <Image
                            src={getSelectedImage()}
                            fill={true}
                            alt=""
                            className="rounded-2xl mt-2"
                        />
                    </div>
                ) : (
                    <div className={`${Theme_A.thumbnails.selectHaircutThumbnail}`}>
                        Select Haircut
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center w-max gap-y-2 mt-4">
                <div className="flex gap-3 flex-col md:flex-row items-baseline justify-begin">
                    <div className="flex flex-col items-start gap-2 w-max">
                        <label htmlFor="prix" className="text-sm font-medium">
                            Prix de base
                        </label>
                        <input
                            type="number"
                            name="prix"
                            placeholder="40"
                            className={`${Theme_A.fields.configurationField2}`}
                            value={form.base_price}
                            onChange={(e) => onChangeInput(e.target.value, "base_price")}
                        />
                        {error.base_price && (
                            <p className="text-xs text-red-700 ml-3 mt-1">
                                {error.base_price}*
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col items-start gap-2 w-max mt-2  space-x-11 ">
                        <label htmlFor="duration" className="text-sm font-medium">
                            Durée d’exécution de base
                        </label>
                        <input
                            type="number"
                            placeholder="35 min"
                            className={`${Theme_A.fields.configurationField2}`}
                            value={form.base_duration}
                            onChange={(e) =>
                                onChangeInput(e.target.value, "base_duration")
                            }
                        />
                        {error.base_duration && (
                            <p className="text-xs text-red-700 ml-3 mt-1">
                                {error.base_duration}*
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-2">
                    <div>
                        <p className="text-medium text-sm text-grey italic text-center">
                            Ajustement selon la longueur initiale de cheveux
                        </p>
                    </div>
                    <div className="flex items-center gap-x-4 mt-4">
                        <p className="text-sm min-w-[50px]">Court</p>
                        <div>
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.court_price_length}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "court_price_length")
                                }
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.court_duration_length}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "court_duration_length")
                                }
                            />
                            <p className="text-xs">min</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4 mt-2">
                        <p className="text-sm min-w-[50px]">Moyen</p>
                        <div>
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.moyen_price_length}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "moyen_price_length")
                                }
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.moyen_duration_length}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "moyen_duration_length")
                                }
                            />
                            <p className="text-xs">min</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4 mt-2">
                        <p className="text-sm min-w-[50px]">Long</p>
                        <div>
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.long_price_length}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "long_price_length")
                                }
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.long_duration_length}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "long_duration_length")
                                }
                            />
                            <p className="text-xs">min</p>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <div>
                        <p className="text-medium text-sm text-grey italic text-center">
                            {"Ajustement selon l'épaisseur initiale de cheveux"}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-4 mt-4">
                        <p className="text-sm min-w-[50px]">Fin</p>
                        <div>
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.fin_price_type}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "fin_price_type")
                                }
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.fin_duration_type}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "fin_duration_type")
                                }
                            />
                            <p className="text-xs">min</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4 mt-2">
                        <p className="text-sm min-w-[50px]">Moyen</p>
                        <div>
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.moyen_price_type}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "moyen_price_type")
                                }
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.moyen_duration_type}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "moyen_duration_type")
                                }
                            />
                            <p className="text-xs">min</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4 mt-2">
                        <p className="text-sm min-w-[50px]">Epais</p>
                        <div>
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.epais_price_type}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "epais_price_type")
                                }
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                className={`${Theme_A.fields.configurationField2}`}
                                value={form.epais_duration_type}
                                onChange={(e) =>
                                    onChangeInput(e.target.value, "epais_duration_type")
                                }
                            />
                            <p className="text-xs">min</p>
                        </div>
                    </div>
                </div>
                {!(activeMenu === "added" && selectedSalonHaircut.id >= 0) ? (
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <button onClick={addSalonHaircuts} className={`${Theme_A.button.mediumGradientButton}`}>
                            Ajouter
                        </button>
                    </div>

                ) : (
                    <div className="flex items-center justify-center gap-4 mt-4 w-full">
                        <button
                            className={`${Theme_A.button.medWhiteColoredButton}`}
                            onClick={() => {
                                setForm(defaultFormDetails);
                                setSelectedSalonHaircut(defaultHaircut);
                            }}>
                            Annuler
                        </button>
                        <button
                            onClick={updateSalonHaircuts}
                            className={`${Theme_A.button.mediumGradientButton}`}>
                            Mettre &agrave; jour
                        </button>
                    </div>
                )}
                {error.select_haircut && (
                    <p className={`${Theme_A.checkers.errorText}`}>
                        {error.select_haircut}*
                    </p>
                )}
            </div>
        </div>
    );
});

export default HairStylesModal;