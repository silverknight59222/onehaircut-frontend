import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";

interface PageVisibilityItemProps {
    id: number;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const RolesSettings = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState("Admin");
    const [switches, setSwitches] = useState<{ [key: number]: boolean }>({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: true, // Définir le switch de "Agenda" sur true pour le rendre coché
        7: false,
        8: false,
        9: false,
    });

    const handleRoleClick = (role: any) => {
        setSelectedRole(role);
    };

    const toggleSwitch = (id: number) => {
        setSwitches((prevSwitches) => ({
            ...prevSwitches,
            [id]: !prevSwitches[id],
        }));
    };

    // Fonction réutilisable pour générer des cases à cocher avec étiquette
    const renderCheckboxWithLabel = (
        id: number,
        label: string,
        checked: boolean,
        onChange: (checked: boolean) => void
    ) => {
        const handleChange = () => {
            onChange(!checked);
        };
        return (
            <div className="mt-4 flex items-center gap-3" key={id}>
                <Switch
                    color="primary"
                    checked={checked}
                    onChange={handleChange}
                    disabled={label === "Agenda"} // Désactiver le switch pour le label "Agenda"
                />
                <label
                    htmlFor={`checkbox${id}`}
                    className={`text-base font-medium text-navy-700 ${checked ? "text-success" : label === "Agenda" ? "text-disabled" : "text-danger"
                        }`}
                >
                    {label}
                </label>
            </div>
        );
    };

    const renderRoleContent = () => {
        return (
            <div className="relative flex flex-col items-start rounded-[20px] w-max-content max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 p-5 pb-8 transition duration-200 linear">
                <div className="relative mb-3 flex items-center justify-between pt-1 w-full">
                    <h4 className="text-xl font-bold text-navy-700 mt-4">
                        Accès au contenu
                    </h4>
                </div>

                {/* Utilisation de la fonction réutilisable pour générer des cases à cocher avec étiquette */}
                {[
                    { id: 1, label: "Dashboard" },
                    { id: 2, label: "Coiffeurs" },
                    { id: 3, label: "Image du Salon" },
                    { id: 4, label: "Coifures" },
                    { id: 5, label: "Prestation" },
                    { id: 6, label: "Agenda" },
                    { id: 7, label: "Ajouter un salon partenaire" },
                    { id: 8, label: "Revenue" },
                    { id: 9, label: "Message" },
                    { id: 10, label: "Reglages" },
                    { id: 11, label: "Abonnement" },
                    { id: 12, label: "Onehairbot" },
                ].map((item) =>
                    renderCheckboxWithLabel(
                        item.id,
                        item.label,
                        switches[item.id],
                        () => toggleSwitch(item.id)
                    )
                )}
            </div>
        );
    };

    return (

        <div className={`w-[500px] h-max bg-white rounded-2xl py-4 shadow-lg`}>

            {/* ADMIN / STAFF TITRE  */}
            <div className="flex justify-center items-center">
                <button
                    className={`text-xl font-semibold focus:outline-none mr-32 p-2 ${selectedRole === "Admin"
                        ? "bg-stone-700 text-white rounded-md"
                        : "bg-white text-stone-800"
                        }`}
                    onClick={() => handleRoleClick("Admin")}
                >
                    Admin
                </button>
                <button
                    className={`text-xl font-semibold focus:outline-none p-2 ${selectedRole === "Staff"
                        ? "bg-stone-700 text-white rounded-md"
                        : "bg-white text-stone-800"
                        }`}
                    onClick={() => handleRoleClick("Staff")}
                >
                    Staff
                </button>
            </div>

            {/* Separation */}
            <div className="flex flex-row-reverse p-3 bg-stone-200 mt-4"></div>

            {renderRoleContent()}
        </div>
    );
};

export default RolesSettings;
