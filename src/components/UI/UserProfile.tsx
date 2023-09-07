import React, { useState, useEffect } from "react";
import { HeartIcon, HelpIcon, MessageIcon, UserIcon } from "../utilis/Icons";
import { useRouter } from "next/navigation";
import { Auth } from "@/api/auth";
import { removeFromLocalStorage } from "@/api/storage";

const UserProfile = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef =
      React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const dropdownItems = [
    {
      name: "Messages",
      icon: <MessageIcon width="25" height="25" />,
      route: "/client/messages",
    },
    {
      name: "Favoris",
      icon: <HeartIcon width="25" height="25" />,
      route: "/client/favorites",
    },
    { name: "Aide", icon: <HelpIcon width="25" height="25" />, route: "" },
  ];
  const onDropdownItemClick = (route: string) => {
    if (route) {
      router.push(route);
    }
  };
  const onLogout = () => {
    Auth.logout()
      .then((response) => {
        removeFromLocalStorage("salon-auth-token");
        removeFromLocalStorage("User");
        router.push("/login");
      })
      .catch((error) => console.log(error));
  };
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
      setIsDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", closeSelectBox);

    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
  }, []);
  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="w-12 h-12 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer"
        onClick={() => setIsDropdown(!isDropdown)}
      >
        <UserIcon />
      </div>
      {isDropdown && (
        <div className={`absolute top-14 right-0 z-20 pt-3 pb-2 flex flex-col items-center justify-center text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]`}>
          <div className="flex flex-col gap-x-4 border-b w-44 border-[#D4CBCB] pb-3">
            {dropdownItems.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => onDropdownItemClick(item.route)}
                  className="flex gap-x-5 px-6 py-3 hover:bg-[#F5F5F5] cursor-pointer"
                >
                  {item.icon}
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>
          <div
            onClick={onLogout}
            className="w-full flex flex-col items-center justify-center mt-2 px-6 py-3 hover:bg-[#F5F5F5] cursor-pointer"
          >
            <p>Logout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
