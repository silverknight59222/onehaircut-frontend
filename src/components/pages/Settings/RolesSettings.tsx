import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
import { ThemeProvider } from "@material-ui/core";
import ComponentTheme from "@/components/UI/ComponentTheme";
import BaseModal from "@/components/UI/BaseModal";
import { user_api } from "@/api/clientSide";
interface RolePermissions {
    [role: string]: number[]; // Définir une signature d'index
}


const RolesSettings = () => {
    const [selectedRole, setSelectedRole] = useState("admin");
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
    const [otherSwitches, setOtherSwitches] = useState([]);
    const [settingSwitches, setSettingSwitches] = useState([]);


    const rolePermissions: RolePermissions = {
        admin: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        staff: [1, 2, 3, 6, 7, 8],
    };

    //stocker les états des commutateurs pour chaque rôle. 
    //TODO : REPLACE STATE WITH SAVED VALUES
    const [roleSwitches, setRoleSwitches] = useState<{ [key: string]: { [key: number]: boolean } }>({
        admin: {
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
        staff: {
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
        admin: {

        },
        staff: {

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
    const toggleSwitch = async (id: number) => {
        const updatedRoleSwitches = { ...roleSwitches[selectedRole] };
        updatedRoleSwitches[id] = !updatedRoleSwitches[id];

        // Prepare an array of permissions to update
        const permissionsToUpdate = [];

        // Loop through updatedRoleSwitches to find permissions with the updated state
        for (const permissionId in updatedRoleSwitches) {
            if (updatedRoleSwitches[permissionId]) {
                permissionsToUpdate.push(Number(permissionId));
            }
        }

        // Make the API call to update permissions
        const requestData = {
            permissions: permissionsToUpdate,
            role_name: selectedRole.toLowerCase(),
        };
        const response = await user_api.updatePermission(requestData);

        setRoleSwitches((prevRoleSwitches) => ({
            ...prevRoleSwitches,
            [selectedRole]: updatedRoleSwitches,
        }));

        return {
            previous: roleSwitches[selectedRole],
            updated: updatedRoleSwitches,
        };
    };

    // Update the state when you interact with the switches in the modal
    const handleModalSwitch = (id: number) => {
        setModalSwitchesByRole((prevModalSwitchesByRole) => ({
            ...prevModalSwitchesByRole,
            [selectedRole]: {
                ...prevModalSwitchesByRole[selectedRole],
                [id]: !prevModalSwitchesByRole[selectedRole][id],
            },
        }));


    };

    // Function to make the API call with updated permissions
    const updatePermissions = async () => {
        const updatedRoleSwitches = { ...roleSwitches[selectedRole] };
        const updatedPermissions = modalSwitchesByRole[selectedRole];
        const permissionsToUpdate = [];

        // Combine the original roleSwitches with the updatedPermissions
        const combinedPermissions = { ...updatedRoleSwitches, ...updatedPermissions };

        for (const permissionId in combinedPermissions) {
            if (combinedPermissions[permissionId]) {
                permissionsToUpdate.push(Number(permissionId));
            }
        }

        const requestData = {
            permissions: permissionsToUpdate,
            role_name: selectedRole.toLowerCase(),
        };

        try {
            const response = await user_api.updatePermission(requestData);
            console.log("Permissions updated successfully:", response);
        } catch (error) {
            console.error("Error updating permissions:", error);
        }
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
    };

    const closeModal = () => {
        setIsModal(false);
        updatePermissions();
    };

    // Function to fetch permissions based on the role
    const fetchPermissions = async (role: string) => {
        try {
            const permissions = await user_api.getAllPermission();
            setOtherSwitches(permissions.data.data.other);
            setSettingSwitches(permissions.data.data.setting_permissions);
            const response = await user_api.getPermission(role);

            const permissionsForRole = rolePermissions[role];
            const roleSwitchesCopy = { ...roleSwitches };
            const updatedSwitches = { ...switches };

            permissionsForRole.forEach((id) => {
                updatedSwitches[id] = response.data.data.other.some((e: any) => e.id === id);
                roleSwitchesCopy[role][id] = updatedSwitches[id];
            });

            setSwitches(updatedSwitches);
            setRoleSwitches(roleSwitchesCopy);
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    };

    // Use the useEffect hook to fetch permissions when the component mounts or when the role changes
    useEffect(() => {
        fetchPermissions(selectedRole);
    }, [selectedRole]);

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
                    {otherSwitches.map((item: any) =>
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
                                {settingSwitches.map((item: any) =>
                                    renderCheckboxWithLabel(
                                        item.id,
                                        item.label,
                                        modalSwitchesByRole[selectedRole][item.id], // Use modal switches state
                                        () => handleModalSwitch(item.id) // Handle the modal switch
                                    )
                                )}


                            </div>
                        </BaseModal>
                    )}

                    {/* <button
                        className="text-sm ml-6 shadow-sm text-white p-1 bg-stone-700 border-stone-300 rounded-lg cursor-pointer hover:scale-105 hover:shadow-md transition duration-300"
                        onClick={updatePermissions} // Call updatePermissions to save the changes
                    >
                        Save
                    </button> */}
                </div>
            </ThemeProvider>

        );
    };


    return (


        <div className={`w-[500px] h-max bg-white rounded-2xl py-4 shadow-lg`}>

            {/* ADMIN / STAFF TITRE  */}
            <div className="flex justify-center items-center">
                <button
                    className={`text-xl font-semibold focus:outline-none mr-32 p-2 ${selectedRole === "admin"
                        ? "bg-stone-700 text-white rounded-md"
                        : "bg-white text-stone-800"
                        }`}
                    onClick={() => handleRoleClick("admin")} // Passer "Admin" en tant que chaîne de caractères
                >
                    Admin
                </button>
                <button
                    className={`text-xl font-semibold focus:outline-none p-2 ${selectedRole === "staff"
                        ? "bg-stone-700 text-white rounded-md"
                        : "bg-white text-stone-800"
                        }`}
                    onClick={() => handleRoleClick("staff")} // Passer "Staff" en tant que chaîne de caractères
                >
                    Staff
                </button>

            </div>

            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4 mt-4" />

            {renderRoleContent()}
        </div>
    );
};

export default RolesSettings;
