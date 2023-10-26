import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
import { ThemeProvider } from "@material-ui/core";
import ComponentTheme from "@/components/UI/ComponentTheme";
import BaseModal from "@/components/UI/BaseModal";

interface RolePermissions {
    [role: string]: number[]; // Définir une signature d'index
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
        10: false,
        11: false,
        12: false,
    });


    const rolePermissions: RolePermissions = {
        Admin: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        Staff: [1, 2, 3, 6, 7, 8],
    };

    //stocker les états des commutateurs pour chaque rôle. 
    //TODO : REPLACE STATE WITH SAVED VALUES
    const [roleSwitches, setRoleSwitches] = useState<{ [key: string]: { [key: number]: boolean } }>({
        Admin: {
            // ... Définir les états initiaux pour les commutateurs d'Admin
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true, // Définir le switch de "Agenda" sur true pour le rendre coché
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
        },
        Staff: {
            // ... Définir les états initiaux pour les commutateurs d'Admin
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: true, // Définir le switch de "Agenda" sur true pour le rendre coché
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
        },
    });

    //Reglage switches
    const [modalSwitchesByRole, setModalSwitchesByRole] = useState<{ [key: string]: { [key: number]: boolean } }>({
        Admin: {
            13: false,
            14: false,
            15: false,
            16: false,
            17: false,
            18: false,
            19: false,
        },
        Staff: {
            13: false,
            14: false,
            15: false,
            16: false,
            17: false,
            18: false,
            19: false,
        },
    });


    const handleRoleClick = (role: string) => {
        setSelectedRole(role);
        // Mettre à jour l'état des commutateurs en fonction du rôle
        setSwitches((prevSwitches) => {
            const permissionsForRole = rolePermissions[role];
            const updatedSwitches = { ...prevSwitches };

            for (const key of Object.keys(updatedSwitches)) {
                const id = Number(key);
                updatedSwitches[id] = permissionsForRole.includes(id);
            }

            return updatedSwitches;
        });
    };


    // Mise à jour les états des commutateurs en fonction du rôle sélectionné
    const toggleSwitch = (id: number) => {
        setRoleSwitches((prevRoleSwitches) => ({
            ...prevRoleSwitches,
            [selectedRole]: {
                ...prevRoleSwitches[selectedRole],
                [id]: !prevRoleSwitches[selectedRole][id],
            },
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
            <div className="mt-4 flex items-center justify-between" key={id}>
                <div className="flex items-center">
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
                {label === "Reglages" && checked && (
                    <button
                        className="text-sm ml-6 shadow-sm text-white p-1 bg-stone-700  border-stone-300 rounded-lg cursor-pointer hover:scale-105 hover:shadow-md transition duration-300"
                        onClick={openModal} // Ouvrir le modal lorsque le bouton "Edit" est cliqué
                    >
                        Edit
                    </button>
                )}
            </div>
        );
    };


    // To open the modal when clic on EDIT 
    const [isModal, setIsModal] = useState(false);

    const openModal = () => {
        setIsModal(true);
        if (!modalSwitchesByRole[selectedRole]) {
            setModalSwitchesByRole({
                ...modalSwitchesByRole,
                [selectedRole]: {
                    13: false,
                    14: false,
                    15: false,
                    16: false,
                    17: false,
                    18: false,
                    19: false,
                },
            });
        }
    };

    const closeModal = () => {
        setIsModal(false);
    };
    const [modalSwitches, setModalSwitches] = useState<{ [key: number]: boolean }>({
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
    });



    const renderRoleContent = () => {
        return (
            // TO GET CUSTOMS COLORS ACCORDING TO COMPONENT THEM
            <ThemeProvider theme={ComponentTheme}>
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
                        /* ***************************** */

                    ].map((item) =>
                        renderCheckboxWithLabel(
                            item.id,
                            item.label,
                            roleSwitches[selectedRole][item.id], // Utilisez les états des commutateurs du rôle actuel
                            () => toggleSwitch(item.id)
                        )
                    )}
                    {isModal && (
                        <BaseModal close={closeModal} width="auto">
                            {/* Contenu du modal */}
                            <div className="relative z-100">
                                {/* Vous pouvez ajouter ici le contenu que vous souhaitez afficher dans le modal */}

                                {/* Commutateurs du modal pour les nouveaux droits */}
                                {/* TODO : MAKE THIS LIST DYNAMIC TO HAVE ALL SETTING PAGES ? */}
                                {[
                                    { id: 13, label: "Générales" },
                                    { id: 14, label: "Horaires" },
                                    { id: 15, label: "Réglage des roles" },
                                    { id: 16, label: "Paiements" },
                                    { id: 17, label: "Notifications" },
                                    { id: 18, label: "Promotions" },
                                    { id: 19, label: "Onehairbot" },
                                ].map((item) =>
                                    renderCheckboxWithLabel(
                                        item.id,
                                        item.label,
                                        modalSwitchesByRole[selectedRole][item.id], // Utilisez les états du modal spécifiques au rôle actuel
                                        (checked) => {
                                            setModalSwitchesByRole((prevModalSwitchesByRole) => ({
                                                ...prevModalSwitchesByRole,
                                                [selectedRole]: {
                                                    ...prevModalSwitchesByRole[selectedRole],
                                                    [item.id]: checked,
                                                },
                                            }));
                                        }
                                    )
                                )}


                            </div>
                        </BaseModal>
                    )}
                </div>
            </ThemeProvider>

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
                    onClick={() => handleRoleClick("Admin")} // Passer "Admin" en tant que chaîne de caractères
                >
                    Admin
                </button>
                <button
                    className={`text-xl font-semibold focus:outline-none p-2 ${selectedRole === "Staff"
                        ? "bg-stone-700 text-white rounded-md"
                        : "bg-white text-stone-800"
                        }`}
                    onClick={() => handleRoleClick("Staff")} // Passer "Staff" en tant que chaîne de caractères
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
