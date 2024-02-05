import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
import { ThemeProvider } from "@material-ui/core";
import ComponentTheme from "@/components/UI/ComponentTheme";
import BaseModal from "@/components/UI/BaseModal";
import { user_api } from "@/api/clientSide";
import TourModal, { Steps } from "@/components/UI/TourModal";
import { salonApi } from "@/api/salonSide";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import userLoader from "@/hooks/useLoader";
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
        16: false,
        17: false,
    });
    const [otherSwitches, setOtherSwitches] = useState([]);
    const [settingSwitches, setSettingSwitches] = useState([]);


    const rolePermissions: RolePermissions = {
        admin: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17],
        staff: [1, 2, 3, 6, 7, 8],
    };


    const rolePermissionsModal: RolePermissions = {
        admin: [11, 12, 13, 14, 15],
        staff: [],
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
            16: false,
            17: false,
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
            16: false,
            17: false,
        },
    });

    //Reglage switches
    const [modalSwitchesByRole, setModalSwitchesByRole] = useState<{ [key: string]: { [key: number]: boolean } }>({
        admin: {
            11: false, 12: false, 13: false, 14: false, 15: false
        },
        staff: {
            11: false, 12: false, 13: false, 14: false, 15: false
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
        const updatedModalRoleSwitches = { ...modalSwitchesByRole[selectedRole] };
        updatedRoleSwitches[id] = !updatedRoleSwitches[id];

        // Prepare an array of permissions to update
        const permissionsToUpdate: any = [];

        // Loop through updatedRoleSwitches to find permissions with the updated state
        for (const permissionId in updatedRoleSwitches) {
            if (updatedRoleSwitches[permissionId]) {
                permissionsToUpdate.push(Number(permissionId));
            }
        }

        for (const permissionId in updatedModalRoleSwitches) {
            if (updatedModalRoleSwitches[permissionId]) {
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
    const handleModalSwitch = async (id: number) => {
        const updatedRoleSwitches = { ...roleSwitches[selectedRole] };
        const updatedModalRoleSwitches = { ...modalSwitchesByRole[selectedRole] };
        updatedModalRoleSwitches[id] = !updatedModalRoleSwitches[id];
        // Prepare an array of permissions to update
        const permissionsToUpdate: any = [];

        // Loop through updatedRoleSwitches to find permissions with the updated state
        for (const permissionId in updatedRoleSwitches) {
            if (updatedRoleSwitches[permissionId]) {
                permissionsToUpdate.push(Number(permissionId));
            }
        }

        for (const permissionId in updatedModalRoleSwitches) {
            if (updatedModalRoleSwitches[permissionId]) {
                permissionsToUpdate.push(Number(permissionId));
            }
        }

        // Make the API call to update permissions
        const requestData = {
            permissions: permissionsToUpdate,
            role_name: selectedRole.toLowerCase(),
        };
        const response = await user_api.updatePermission(requestData);

        setModalSwitchesByRole((prevRoleSwitches) => ({
            ...prevRoleSwitches,
            [selectedRole]: updatedModalRoleSwitches,
        }));

        return {
            previous: modalSwitchesByRole[selectedRole],
            updated: updatedModalRoleSwitches,
        };
    };

    // Function to make the API call with updated permissions
    const updatePermissions = async () => {
        const updatedRoleSwitches = { ...roleSwitches[selectedRole] };
        const updatedPermissions = modalSwitchesByRole[selectedRole];
        const permissionsToUpdate: any = [];

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
            //console.log("Permissions updated successfully:", response);
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
        // //console.log(id, label, checked, onChange);
        const handleChange = () => {
            onChange(!checked);
        };
        return (
            <div className="mt-4 flex items-center justify-between" key={id}>
                <div className="flex items-center">
                    <Switch
                        color="secondary"
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
                        className="text-sm ml-6 shadow-sm text-white p-1 bg-stone-700  border-stone-300 rounded-lg cursor-pointer hover:scale-105 hover:shadow-md transition duration-300 button_edit_access_settings"
                        onClick={openModal} // Ouvrir le modal lorsque le bouton "Edit" est cliqué
                    >
                        Éditer
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
    };

    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);
    const [pageDone, setPageDone] = useState<String[]>([]);
    // Function to fetch permissions based on the role
    const fetchPermissions = async (role: string) => {
        try {
            const permissions = await user_api.getAllPermission();
            setOtherSwitches(permissions.data.data.other);
            setSettingSwitches(permissions.data.data.setting_permissions);
            const response = await user_api.getPermission(role);

            const permissionsForRole = rolePermissions[role];
            const modalPermissionsForRole = rolePermissionsModal[role];
            const roleSwitchesCopy = { ...roleSwitches };
            const modalRoleSwitchesCopy = { ...modalSwitchesByRole }
            const updatedSwitches = { ...switches };

            permissionsForRole.forEach((id) => {
                updatedSwitches[id] = response.data.data.other.some((e: any) => e.id === id);
                roleSwitchesCopy[role][id] = updatedSwitches[id];
                modalRoleSwitchesCopy[role][id] = response.data.data.setting_permissions.some((e: any) => e.id === id);
            });

            modalPermissionsForRole.forEach((id) => {
                modalRoleSwitchesCopy[role][id] = response.data.data.setting_permissions.some((e: any) => e.id === id);
            });

            setSwitches(updatedSwitches);
            setRoleSwitches(roleSwitchesCopy);
            setModalSwitchesByRole(modalRoleSwitchesCopy);
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    };

    // Use the useEffect hook to fetch permissions when the component mounts or when the role changes
    useEffect(() => {
        fetchPermissions(selectedRole);
    }, [selectedRole]);
    useEffect(() => {
        const pages_done = getLocalStorage('pages_done')
        setPageDone(pages_done!.split(',').map((item) => item.trim()))
        console.log(pages_done)
    }, [])
    const renderRoleContent = () => {
        return (
            // TO GET CUSTOMS COLORS ACCORDING TO COMPONENT THEM
            <ThemeProvider theme={ComponentTheme}>
                <div className="relative flex flex-col items-start rounded-[20px] w-max-content max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 p-5 pb-8 transition duration-200 linear toggleSwitch_access">

                    <p className="text-stone-400 italic font-normal text-md text-center my-1 px-1 md:px-14">
                        Le bouton sur la droite donne l'accès.
                    </p>
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


    // ------------------------------------------------------------------
    // For Tour
    const tourSteps: Steps[] = [
        {
            selector: '.button_admin_access',
            content: 'Dans la partie admin, vous pouvez paramétrer les accès de l\'administrateur aux différentes pages du site.',
        },
        {
            selector: '.toggleSwitch_access',
            content: 'Un bouton sur la droite donne l\'accès à la page correspondante.',
        },
        {
            selector: '.button_staff_access',
            content: 'La même chose peut être fait pour les autres coiffeurs.',
        },
        {
            selector: '.button_edit_access_settings',
            content: 'Pour un paramétrage plus fin, vous pouvez cliquer ici.',
        },
    ];

    const closeTour = async () => {
        // You may want to store in local storage or state that the user has completed the tour
        setIsLoading(true)
        if (!pageDone.includes('salon_roles')) {
            let resp = await salonApi.assignStepDone({ page: 'salon_roles' });
            removeFromLocalStorage('pages_done');
            setLocalStorage('pages_done', resp.data.pages_done);
            setPageDone((prevArray) => [...prevArray, 'salon_roles'])
        }
        setIsLoading(false);
    };
    // ------------------------------------------------------------------

    /************************************************************************************************************************** */

    return (


        <div className={`w-[500px] h-max bg-white rounded-2xl py-4 shadow-lg mb-4`}>
            {isLoading && loadingView()}
            {/* For explaining the website */}
            {!pageDone.includes('salon_roles') &&
                <TourModal steps={tourSteps} onRequestClose={closeTour} />}

            {/* ADMIN / STAFF TITRE  */}
            <div className="flex justify-center items-center">
                <button
                    className={`text-xl font-semibold focus:outline-none mr-32 p-2 rounded-md button_admin_access ${selectedRole === "admin"
                        ? "bg-stone-700 text-white "
                        : "bg-white text-stone-800 hover:bg-stone-200"
                        }`}
                    onClick={() => handleRoleClick("admin")} // Passer "Admin" en tant que chaîne de caractères
                >
                    Admin
                </button>
                <button
                    className={`text-xl font-semibold focus:outline-none p-2 rounded-md button_staff_access ${selectedRole === "staff"
                        ? "bg-stone-700 text-white "
                        : "bg-white text-stone-800 hover:bg-stone-200"
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
