"use client";
import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import "./index.css";
import {
  BoostIcon,
  BotIcon,
  ClientActivityIcon,
  DashboardIcon,
  StarGreyIcon,
  HelpIcon,
  HistoryIcon,
  MessageIcon,
  PersonalizationIcon,
  PortraitIcon,
  ProfileImageBorderIcon,
  RevenueIcon,
  SettingsIcon,
  StatsIcon,
  ReservationIcon,
  AddPlusIcon,
  CabineIcon,
  FilterIcon,
  ContactIcon,
} from "../utilis/Icons";
import { SalonDetails } from "@/types";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import { usePathname, useRouter } from "next/navigation";
import { ColorsThemeA, Theme_A } from "../utilis/Themes";
import BaseModal from "../UI/BaseModal";
import { client, user_api } from "@/api/clientSide";
import { salonApi } from '@/api/salonSide'
import { Auth } from "@/api/auth";
import useSnackbar from "@/hooks/useSnackbar";

interface SidebarItems {
  icon: string;
  title: string;
  route: string;

}
type SidebarType = {
  isSidebar: Boolean;
  sidebarItems: SidebarItems[];
  isClientDashboard?: boolean;
  SidebarHandler: () => void;
};

// Declare icon color
const colorIcon = "#FFFFFF"

// Define the Sidebar component
const Sidebar = ({ isSidebar, SidebarHandler, sidebarItems, isClientDashboard }: SidebarType) => {

  const showSnackbar = useSnackbar();
  // State to store salon details
  const [salonDetail, setSalonDetails] = useState<SalonDetails[]>();
  const [notifications, setNotifications] = useState({} as any);
  // State to store active salon info
  const [activeSalon, setActiveSalon] = useState<SalonDetails>();
  // State to store sidebar items
  const [sidebarItem, setSidebarItem] = useState<SidebarItems[]>([])
  // Get routing functions and current path
  const router = useRouter()
  const path = usePathname()
  // Define routes that require a pro subscription
  const proRoutes = ['/dashboard/client-activity', '/dashboard/visites']


  // Function to determine which icon to display on the sidebar
  const setIcon = (SidebarIcon: string, activeIcon: string) => {
    // ... (icon displaying logic is defined here)
    let Icon;
    switch (SidebarIcon) {
      case "DashboardIcon":
        Icon = (
          <DashboardIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "ClientActivityIcon":
        Icon = (
          <ClientActivityIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "StatsIcon":
        Icon = (
          <StatsIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "RevenueIcon":
        Icon = (
          <RevenueIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "MessageIcon":
        Icon = (
          <MessageIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "SettingsIcon":
        Icon = (
          <SettingsIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "PersonalizationIcon":
        Icon = (
          <PersonalizationIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
        // case "BoostIcon":
        //   Icon = (
        //     <BoostIcon
        //       color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
        //       width="24"
        //       height="24"
        //     />
        //   );
        break;
      case "Reservation":
        Icon = (
          <ReservationIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "BotIcon":
        Icon = (
          <BotIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="28" height="28" />
        );
        break;
      case "StarGreyIcon":
        Icon = (
          <StarGreyIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="28" height="28" />
        );
        break;
      case "PortraitIcon":
        Icon = (
          <PortraitIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="24" height="24" />
        );
        break;
      case "HistoryIcon":
        Icon = (
          <HistoryIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="24" height="24" />
        );
        break;
      case "HelpIcon":
        Icon = (
          <HelpIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="24" height="24" />
        );
        break;
      case "ReservationIcon":
        Icon = (
          <ReservationIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="30" height="28" />
        );
        break;
      case "CabineIcon":
        Icon = (
          <CabineIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="28" height="28" />
        );
        break;
      case "FilterIcon":
        Icon = (
          <FilterIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="28" height="28" />
        );
        break;
      case "ContactIcon":
        Icon = (
          <ContactIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="32" height="32" />
        );
        break;
    }

    return Icon;
  };

  // Function to set the active salon
  const setSalon = (salonList: SalonDetails[]) => {
    salonList.forEach(salon => {
      if (salon.is_primary) {
        setActiveSalon(salon);
        setLocalStorage('salon_id', salon.id);
      }
    });
  };

  // Function to handle click on a sidebar item
  const onSelectItem = (route: string, index: number) => {
    if (route) {
      router.push(route)
    }
  }
  const applyPermissions = (menus: any) => {
    const temp = getLocalStorage("user");
    const user = temp ? JSON.parse(temp) : null;
    if (user.role != 'salon_professional' && user.permissions.length > 0) {
      menus.forEach((m: any, k: number) => {
        if (user.permissions.indexOf(m.permission || m.title) == -1) {
          delete menus[k];
        }
      });
    }
  }

  const fetchSalonNotifications = async () => {
    const { data } = await dashboard.salonNotification()
    setNotifications(data)
  }

  const fetchUserNotifications = async () => {
    const { data } = await dashboard.userNotification()
    setNotifications(data)
  }
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  // Use effect to fetch data on component mount
  useEffect(() => {

    const temp = getLocalStorage("user");
    const user = temp ? JSON.parse(temp) : null;

    const tempSalon = getLocalStorage('hair_salon');

    const salonInfo = tempSalon ? JSON.parse(tempSalon) : null;

    // Utilisation de l'opérateur chaînage optionnel pour éviter l'erreur
    if (!user?.subscription) {
      const filteredRoutes = sidebarItems.filter(route => {
        return !proRoutes.includes(route.route);
      });
      setSidebarItem(filteredRoutes)
      applyPermissions(filteredRoutes);

    } else {
      setSidebarItem(sidebarItems)
    }
    if (user.role == 'client') {
      fetchUserNotifications()
      setImageUrl(user.front_profile);
    } else {
      fetchSalonNotifications()
      if (salonInfo) {
        setSalon([salonInfo])
        setSalonDetails(salonInfo)
        setImageUrl(salonInfo.logo);
        setTextLength(salonInfo.description);
        setTextDescription(salonInfo.description);
      }
    }
    if (user.email_verified_at) {
      setIsEmailVerified(true)
    } else {
      setIsEmailVerified(false)
    }

  }, []);


  /* For the modal */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (!isClientDashboard) {
      setIsModalOpen(true);
    } else {
      router.push("/client/portrait")
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const initialText = ""; // Ajoutez votre texte initial ici si nécessaire
  const [textDescription, setTextDescription] = useState<string>('');
  const [textLength, setTextLength] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextDescription(e.target.value);
    setTextLength(e.target.value.length);
  };

  const MaxChar = 300;


  /* For The Logo */

  {/* Importation du logo  */ }
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPath, setLogoPath] = useState(""); // pour conserver le chemin du logo une fois chargé
  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [image, setImage] = useState<string | null>(null);
  const [localImageFile, setLocalImageFile] = useState<File | null>(null);
  // Gestionnaire d'événements pour traiter le changement de fichier.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Vérification pour s'assurer qu'un fichier a été sélectionné.
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Use FileReader to convert image to base64 string.
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      //Start playing the file.
      reader.readAsDataURL(file);
      setLocalImageFile(file);
    }
  };
  const SetCurrentLogo = () => {

  }
  const resendVerification = async () => {
    let resp = await Auth.resendVerifyEmailNotification()
    if (resp.data.success) {
      showSnackbar("succès", "Verification Email Sent Successfully");
    } else {
      showSnackbar("succès", "Cannot send Verification Email");
    }
  }
  const SetCurrentDescription = () => {

  }
  const handleClick = async () => {
    closeModal();
    SetCurrentLogo();
    SetCurrentDescription();
    const formData = new FormData();
    formData.set("description", textDescription);
    if (localImageFile) {
      formData.set("logo", localImageFile);
    }
    const response = await salonApi.updateLogoAndDescription(formData);
    setImageUrl(response.data.data.salon.logo);
    setLocalStorage('hair_salon', JSON.stringify(response.data.data.salon))
  };

  return (
    <>
      {isSidebar && (
        <div className="fixed z-20">
          <div
            className="lg:hidden fixed top-0 left-0 h-full w-screen bg-[#2E465C] bg-opacity-90 cursor-pointer"
            onClick={SidebarHandler}
          />
          <div className="w-72 h-screen fixed bg-white shadow-[0_1px_30px_0px_rgba(0,0,0,0.3)] pt-4 overflow-auto no-scrollbar">
            <div
              className="lg:hidden absolute top-2 right-3 text-2xl cursor-pointer"
              onClick={SidebarHandler}
            >
              &#10005;
            </div>

            {/* Section Salon LOGO On top of the Sidebar */}
            <div className="relative w-full flex flex-col items-center justify-center lg:mt-0 mt-10 group">
              {!isClientDashboard && <p className="text-xl font-bold mb-5">{activeSalon?.name ? activeSalon.name : '-'}</p>}


              {/* Conteneur de l'image et de l'icône */}
              <div
                className="relative cursor-pointer group"
                onClick={openModal}
                style={{ width: '160px', height: '160px' }}
              >
                {/* Icôn around the logo*/}
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:rotate-90"
                  style={{
                    left: '-15px',
                    transition: 'transform 500ms',
                    transformOrigin: '54% center', // ajustez selon vos besoins
                  }}> {/* Ajustement ici */}
                  <ProfileImageBorderIcon />
                </div>

                {/* Salon Logo*/}
                {/* TODO Add and save Logo fron salon there */}
                <img
                  src={imageUrl}
                  alt="profile"
                  className="rounded-full absolute inset-0 m-auto shadow-md transform transition-transform duration-300 group-hover:scale-90 hover:shadow-inner border-2 border-stone-200 h-24 w-24"
                />
              </div>


              {/* Popup  to change the LOGO an DESCRIPTION*/}
              {isModalOpen && (
                <BaseModal close={closeModal} width="md:min-w-[470px] lg:min-w-[550px] xl:min-w-[600px]">
                  <div className="flex flex-col h-full p-4 justify-between">
                    {/* Section du contenu */}
                    <div>
                      <h2 className="text-center text-lg font-bold mb-4">
                        Modifiez votre logo
                      </h2>
                      {/*TODO save Logo */}
                      {/* Zone de chargement d'image */}
                      <div className="flex justify-center item-center mb-4 ">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          accept="image/*"
                        />
                        {image || imageUrl ? (
                          <img
                            src={image || imageUrl}
                            alt="Logo"
                            className="w-48 h-48 rounded-full shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                            onClick={handleLogoClick}
                          />
                        ) : (
                          <div
                            className="w-48 h-48 rounded-full shadow-md flex items-center justify-center border-2 border-stone-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                            onClick={handleLogoClick}
                          >
                            <div className="flex items-center justify-center w-24 h- transition-transform duration-500 hover:rotate-90">
                              <AddPlusIcon />
                            </div>
                          </div>
                        )}

                      </div>
                      <h2 className="text-center text-lg font-bold mb-4 mt-12">
                        Modifiez votre description
                      </h2>
                      {/*TODO save Description */}
                      <div className="relative ">
                        <textarea
                          className="focus:outline-red-400 text-stone-700 w-full p-2 mb-2 rounded-xl border shadow-inner min-h-[120px]"
                          id="description"
                          value={textDescription}
                          onChange={handleTextChange}
                          maxLength={MaxChar}
                          placeholder="Décrivez votre salon ou vos services ici. Soyez attractif !"
                        />

                        <div className="absolute bottom-6 right-2 text-sm text-gray-300 mt-2">
                          {textLength}/{MaxChar}
                        </div>
                      </div>
                    </div>
                    {/* Bouton Enregistrer */}
                    <div className="flex justify-center pb-2">
                      <button className={`${Theme_A.button.smallGradientButton}`}
                        /* TODO Save the logo and set it on the Sidebar zone */
                        onClick={handleClick}
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </BaseModal>

              )}
            </div>


            {/* Button to go directly to the order page */}
            {isClientDashboard && <div
              onClick={() => router.push('/')}
              className={`flex items-center justify-center w-auto h-14 px-1 py-6 mx-6 my-6 ${Theme_A.button.smallGradientButton} cursor-pointer `}
            >
              Rechercher une coiffure
            </div>}
            {!isEmailVerified && (
              <p className="text-red-600 text-center mt-2">
                Adresse email non vérifiée <button className={'underline'} onClick={() => resendVerification()}> Resend Verification</button>
              </p>
            )}
            {/* Sidebar items display - mb-8 added to be able to see the last element due to the bottom-bar */}
            <div className="mt-8 mb-8">
              {sidebarItem.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      onClick={() => onSelectItem(item.route, index)}
                      className={
                        `flex items-center my-2 pl-8 py-4 gap-2 cursor-pointer transition ease-in-out duration-100 border-l-4 
                        ${path === item.route && "border-rose-600 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-400 font-bold"}`}
                    >
                      <div className="relative flex justify-content-right q">
                        {setIcon(
                          item.icon,
                          path === item.route ? item.icon : ""
                        )}
                        {/* TODO make the message notification number dynamic */}
                        {/* {item.title === 'Message' && <p className="absolute top-3 -right-2.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#F44336]  text-white text-[10px] font-semibold">2</p>} */}
                        {(item.title === 'Message') && < p className="left-56 top-[2.6px]	absolute flex items-center justify-center w-5 h-5 rounded-full bg-[#F44336]  text-white text-[10px] font-semibold"> {notifications.chat_count} </p>}
                        {(item.title === 'Réservations en cours') && < p className="left-56 top-[2.6px]	absolute  flex items-center justify-center w-5 h-5 rounded-full bg-[#F44336]  text-white text-[10px] font-semibold"> {notifications.reservation_count} </p>}


                      </div>
                      <p
                        className={`text-base ${path === item.route && "text-white"
                          }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
