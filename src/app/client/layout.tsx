"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import {
  HamburgerIcon,
  LogoIcon,
  UserIcon,
  LogoutIcon,
} from "@/components/utilis/Icons";
import { removeFromLocalStorage } from "@/api/storage";
import { Auth } from "@/api/auth";
import userLoader from "@/hooks/useLoader";
import Footer from "@/components/UI/Footer";
import { useNotification } from "@/hooks/useNotification";

const ClientDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isSidebar, setIsSidebar] = useState(false);
  const sidebarItems = [
    {
      icon: "DashboardIcon",
      title: "Compte",
      permission: null,
      route: "/client/dashboard",
    },
    {
      icon: "MessageIcon",
      title: "Message",
      permission: null,
      route: "/client/messages",
    },
    {
      icon: "StarGreyIcon",
      title: "Favoris",
      permission: null,
      route: "/client/favorites",
    },
    {
      icon: "PortraitIcon",
      title: "Portrait",
      permission: null,
      route: "/client/portrait",
    },
    {
      icon: "CabineIcon",
      title: "Cabine d'essayage",
      permission: null,
      route: "/client/processed",
    },
    {
      icon: "FilterIcon",
      title: "Filtres",
      permission: null,
      route: "/client/filters",
    },
    {
      icon: "ReservationIcon",
      title: "Réservations en cours",
      permission: null,
      route: "/client/currentreservation",
    },
    {
      icon: "HistoryIcon",
      title: "Historique",
      permission: null,
      route: "/client/history",
    },
    {
      icon: "HelpIcon",
      title: "Aide",
      permission: null,
      route: "/client/help",
    },
    {
      icon: "ContactIcon_Client",
      permission: null,
      title: "Contactez-nous",
      route: "/client/contactUs",
    },
  ];
  const SidebarHandler = (state: boolean) => {
    setIsSidebar(state);
  };

  const { loadingView } = userLoader();

  // FOr the dropdown menu on userIcon
  const [isUserDropDwn, setIsUserDropDwn] = useState(false);

  const dropdownItems = [
    {
      name: "Déconnexion",
      icon: <LogoutIcon width="25" height="25" />,
      route: "/client/dashboard",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const onLogout = () => {
    setIsLoading(true);
    Auth.logout()
      .then(() => {
        removeFromLocalStorage("auth-token");
        removeFromLocalStorage("user");
        router.push("/");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // for Icon size change:
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      if (window.innerWidth > 1024) {
        setIsSidebar(false);
      }
    };

    // Initial screen size check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { notifications, refetchUserNotifications, refetchSalonNotifications } =
    useNotification();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/client/currentreservation") refetchUserNotifications();
    else refetchSalonNotifications();
  }, [pathname]);

  return (
    <div>
      <div>
        {/* {isLoading && loadingView()} */}
        <Sidebar
          notifications={notifications}
          sidebarItems={sidebarItems}
          isSidebar={isSidebar}
          SidebarHandler={SidebarHandler}
          isClientDashboard={true}
        />
        <div className="ml-0 lg:ml-72">
          {/* topbar */}
          <div className="px-8 py-2 lg:py-5 border-b border-[#EBF0F2]">
            <div className="flex items-center justify-between">
              <div className="w-full flex items-center gap-3">
                {!isSidebar && (
                  <div
                    className={`${isSidebar ? "hidden" : "lg:hidden"}`}
                    onClick={() => SidebarHandler(!isSidebar)}
                  >
                    <HamburgerIcon />
                  </div>
                )}
                <div className="w-full hidden lg:block">
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => router.push("/")}
                  >
                    <LogoIcon className={""} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-4">
                <div
                  id="profil_menu_icon"
                  className="w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer transform hover:scale-110 transition-transform"
                  onClick={() => setIsUserDropDwn(!isUserDropDwn)}
                >
                  <UserIcon size={screenSize} />
                </div>
              </div>
            </div>
            {isUserDropDwn && (
              <div
                className={`absolute top-[58px] right-0 z-20 pt-3 pb-2 flex flex-col items-center justify-center text-black bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)] rounded-lg`}
              >
                <div className="flex flex-col">
                  {dropdownItems.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => onLogout()}
                        id="Deconnexion"
                        className="flex flex-row gap-x-5 px-6 py-3 w-full hover:bg-[#F5F5F5] cursor-pointer"
                      >
                        {item.icon}
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboardLayout;
