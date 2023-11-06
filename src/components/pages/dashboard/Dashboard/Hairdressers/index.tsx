import React, { useEffect, useState } from "react";
import Image from "next/image";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import { FileDetails, Hairdresser, Avatar } from "@/types";
import {
  DeleteIcon,
  LeftArrowIcon,
  RightArrowIcon,
  SelectedIcon,
} from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import { EditIcon, LogoCircleFixLeft } from "@/components/utilis/Icons";
import Footer from "@/components/UI/Footer";
import { ColorsThemeA } from "@/components/utilis/Themes";
import CustomInput from "@/components/UI/CustomInput";


interface AllAvatars {
  man: Avatar[];
  woman: Avatar[];
}
const Hairdressers = () => {
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();

  const defaultImage: FileDetails = {
    lastModified: 0,
    lastModifiedDate: new Date(),
    name: "",
    size: 0,
    type: "",
    webkitRelativePath: "",
  };
  const defaultHairDresser = {
    id: 0,
    hair_salon_id: 0,
    name: "",
    email: "",
    profile_image: defaultImage,
    avatar: defaultImage,
    role: "admin",
  };
  const defaultAvatars = {
    man: [],
    woman: [],
  };
  const hiddenFileInput = React.useRef<any>(null);
  const [hairDressers, setHairDressers] = useState<Hairdresser[]>([]);
  const [hairDresser, setHairDresser] = useState(defaultHairDresser);
  const [avatarIndex, setAvatarIndex] = useState(1);
  const [showAvatar, setShowAvatars] = useState("men");
  const [avatars, setAvatars] = useState<AllAvatars>(defaultAvatars);
  const [profileImage, setProfileImage] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    text: "",
  });
  let [errorPop, setErrorPop] = useState("")


  const RoleList = [
    "Admin",
    "Staff",
  ];
  let totalAvatars: number;
  if (showAvatar === "women") {
    totalAvatars = avatars.woman.length;
  } else if (showAvatar === "men") {
    totalAvatars = avatars.man.length;
  }
  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current?.click();
    }
  };
  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }
    const fileUploaded = event.target?.files[0];
    setProfileImage(URL.createObjectURL(fileUploaded));
    setHairDresser((prevState) => ({
      ...prevState,
      profile_image: fileUploaded as unknown as FileDetails,
    }));
  };
  const onChangeName = (name: string) => {
    if (!name.length) {
      setError((prev) => {
        return { ...prev, name: "Le nom est requis" };
      });
    } else {
      setError((prev) => {
        return { ...prev, name: "" };
      });
    }
    setHairDresser((prevState) => ({
      ...prevState,
      name: name,
    }));
  };
  const onChangeEmail = (email: string) => {
    if (!email.length) {
      setError((prev) => {
        return { ...prev, email: "Un e-mail est requis" };
      });
    } else {
      setError((prev) => {
        return { ...prev, email: "" };
      });
    }
    setHairDresser((prevState) => ({
      ...prevState,
      email: email,
    }));
  };
  const onChangeRole = (role: string) => {
    if (!role.length) {
      setError((prev) => {
        return { ...prev, role: "Un role est requis" };
      });
    } else {
      setError((prev) => {
        return { ...prev, role: "" };
      });
    }
    setHairDresser((prevState) => ({
      ...prevState,
      role: role,
    }));
  };
  const onChangePassword = (password: string) => {
    if (!password.length) {
      setError((prev) => {
        return { ...prev, password: "Un password est requis" };
      });
    } else {
      setError((prev) => {
        return { ...prev, password: "" };
      });
    }
    setHairDresser((prevState) => ({
      ...prevState,
      password: password,
    }));
  };
  const handleAvatarPrevious = () => {
    const newIndex = avatarIndex - 1;
    if (showAvatar === "men") {
      setAvatarIndex(newIndex < 1 ? avatars.man.length - 1 : newIndex);
    } else if (showAvatar === "women") {
      setAvatarIndex(newIndex < avatars.woman.length - 1 ? avatars.woman[avatars.woman.length - 1].id : newIndex);
    }
  };
  const handleAvatarNext = () => {
    const newIndex = avatarIndex + 1;
    if (showAvatar === "men") {
      setAvatarIndex(
        newIndex > avatars.man.length - 1 ? avatars.man[0].id : newIndex
      );
    } else if (showAvatar === "women") {
      const totalLength = avatars.woman.length - 1 + avatars.woman.length - 1
      setAvatarIndex(
        newIndex > totalLength ? avatars.woman[0].id : newIndex
      );
    }
  };

  const validateForm = () => {
    let isValidated = true;
    if (!hairDresser.name) {
      setError((prev) => {
        return { ...prev, name: "Le nom est requis" };
      });
      isValidated = false;
    } else {
      setError((prev) => {
        return { ...prev, name: "" };
      });
    }
    if (!hairDresser.email) {
      setError((prev) => {
        return { ...prev, email: "Un e-mail est requis" };
      });
      isValidated = false;
    }
    else if (!regex.test(hairDresser.email)) {
      setError((prev) => {
        return { ...prev, email: "Invalid Email" };
      });
      isValidated = false;
    }
    else {
      setError((prev) => {
        return { ...prev, email: "" };
      });
    }
    return isValidated;
  };
  const addDresser = async (isUpdate?: boolean) => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const data = new FormData();
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const salonId = Number(getLocalStorage("salon_id"));
    data.append(
      "hair_salon_id",
      salonId as unknown as Blob
    );
    data.append("name", hairDresser.name);
    data.append("email", hairDresser.email);
    data.append("role", hairDresser.role);
    data.append("password", hairDresser.password);
    data.append("avatar_id", avatarIndex as unknown as Blob);
    if (hairDresser.profile_image.size > 0) {
      data.append(
        "profile_image",
        hairDresser.profile_image as unknown as Blob
      );
    }
    if (isUpdate) {
      await dashboard
        .updateHairDresser(hairDresser.id, data)
        .then((res) => {
          getAllHairDresser();
          setHairDresser(() => defaultHairDresser);
          setProfileImage(() => "");
          setIsEdit(false);
          setAvatarIndex(1);
          showSnackbar("success", res.data.message);
        })
        .catch((err) => {
          showSnackbar("error", "Error Occured!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      await dashboard
        .addHairDresser(data)
        .then((res) => {
          getAllHairDresser();
          setHairDresser(() => defaultHairDresser);
          setProfileImage(() => "");
          showSnackbar("success", res.data.message);
        })
        .catch((err) => {
          showSnackbar("error", "Error Occured!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const getAllHairDresser = async () => {
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const salonId = Number(getLocalStorage("salon_id"));
    if (userId) {
      setIsLoading(true);
      await dashboard
        .getAllHairDressers(salonId)
        .then((resp) => {
          if (resp.data.data.length) {
            setHairDressers(resp.data.data);
          }
          setIsLoading(false);
        });
    }
  };
  const getAllAvatars = async () => {
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const salonId = Number(getLocalStorage("salon_id"));
    if (userId) {
      setIsLoading(true);
      await dashboard
        .getAllAvatars(salonId)
        .then((resp) => {
          setAvatars(resp.data.data);
        })
        .catch((error) => console.log(error));
      setIsLoading(false);
    }
  };
  const onDeleteHairDresser = async () => {
    await dashboard.deleteHairDresser(hairDresser.id).then((res) => {
      getAllHairDresser();
      showSnackbar("success", res.data.message);
      setHairDresser(() => defaultHairDresser);
      setProfileImage(() => "");
      setAvatarIndex(1);
      setIsEdit(false);
    });
  };
  const selectHairDresser = (hairDresser: Hairdresser) => {
    setIsEdit(true);
    setHairDresser((prevState) => ({
      ...prevState,
      id: hairDresser.id,
      hair_salon_id: hairDresser.hair_salon_id,
      name: hairDresser.name,
      email: hairDresser.email,
      role: hairDresser.role,
      password: hairDresser.password,
    }));
    setProfileImage(hairDresser.profile_image);
    setAvatarIndex(hairDresser.avatar_id);
  };

  const onClear = () => {
    setHairDresser(defaultHairDresser);
    setProfileImage(() => "");
    setAvatarIndex(1);
    setIsEdit(false);
  };

  interface Avatar {
    image: string;
    id: number;
  }
  const Avatars = ({ image, id }: Avatar) => {
    if (id === avatarIndex) {
      return (
        <div className="relative shadow-[0px_6px_11px_0px_rgba(176,176,176,0.25)] rounded-xl bg-white w-32 h-32">
          <Image src={image.includes('api-server') ? image : `https://api.onehaircut.com${image}`} alt="avatar" fill={true} className="rounded-xl" />
        </div>
      );
    }
  };
  const getAvatars = () => {
    if (showAvatar === "men") {
      return avatars.man;
    } else {
      return avatars.woman;
    }
  };

  useEffect(() => {
    if (showAvatar === "women" && avatars.woman.length) {
      setAvatarIndex(avatars.woman[0].id);
    }
    if (showAvatar === "men" && avatars.man.length) {
      setAvatarIndex(avatars.man[0].id);
    }
  }, [showAvatar]);
  useEffect(() => {
    getAllHairDresser();
    getAllAvatars();
  }, []);


  // To open the modal when clic on EDIT 
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  // design choices:
  const inputFieldsDesign = `w-full p-3 placeholder:text-[#959595] placeholder:text-base ${ColorsThemeA.ohcBorder} ${Theme_A.behaviour.fieldFocused_B}${Theme_A.fields.inputField}`
  const inputFieldsDesignNoW = `border-2 border-red-500 p-3 placeholder:text-[#959595] placeholder:text-base ${Theme_A.behaviour.fieldFocused_B}${Theme_A.fields.inputField}`

  ////////////////////////////////////////////////////
  ///////////////////// PASSWORD 
  ////////////////////////////////////////////////////
  const [passwordField, renewPassword] = useState({
    old: "",
    new: "",
    new2: "",
  });
  const setOldPassword = (value: string) => {
    renewPassword((prev) => {
      return { ...prev, old: value };
    });
  };
  const setNewPassword = (value: string) => {
    renewPassword((prev) => {
      return { ...prev, new: value };
    });
  };
  const setNew2Password = (value: string) => {
    renewPassword((prev) => {
      return { ...prev, new2: value };
    });
  };


  const onSubmitPassword = async () => {
    if (passwordField.new != passwordField.new2) { // TODO modify
      setError((prev) => {
        return { ...prev, text: "Nouveaux mots de passe différents" };
      });
      return;
    }
    else if (passwordField.new.length < 8) {
      setError((prev) => {
        return { ...prev, text: "Nouveaux mots de passe trop petits" };
      });
      return;
    }
    else {
      setError((prev) => {
        return { ...prev, text: "" };
      });
    }
  }



  return (
    <>
      {isLoading && loadingView()}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 mt-8">
        <div className="bg-gradient-to-l  md:block fixed -left-32 md:-left-8 -bottom-32 md:-bottom-8 z-0 mix-blend-overlay ">
          <LogoCircleFixLeft />
        </div>
        <div className="h-[940px] w-full xl:w-2/5 overflow-auto flex flex-col items-center gap-8 bg-lightGrey rounded-3xl p-4 md:px-12 md:pt-12 md:pb-0 opacity-95">
          <div className={`${Theme_A.textFont.headerH2} underline`}>
            Ajouter un nouveau coiffeur
          </div>

          {/* NOM */}
          <div className="w-full max-w-[450px]">
            <CustomInput
              id="Name"
              label="Prénom"
              value={hairDresser.name}
              onChange={(e) => onChangeName(e.target.value)}
              error={error.name}
            />
          </div>

          {/* ADRESSE EMAIL */}
          <div className="w-full max-w-[450px]">
            <CustomInput
              id="email"
              label="Adresse mail"
              value={hairDresser.email}
              onChange={(e) => onChangeEmail(e.target.value)}
              error={error.email}
              isEmail={true}
            />
          </div>


          <div className="w-full max-w-[450px]">

            <CustomInput
              id="password"
              label="Mot de passe"
              value={hairDresser.email}
              onChange={(e) => onChangePassword(e.target.value)}
              error={error.password}
              isEmail={true}
              type="password"
            />
          </div>



          <div className="w-full max-w-[450px]">
            {/* <DropdownMenu
              dropdownItems={RoleList}
              menuName="Role"
              fctToCallOnClick={onChangeRole}
              labelId='role'
              selectId='admin'
              defaultSelected={'admin'} // Pass the default value as a prop
            /> */}
            {/* <DropdownMenu dropdownItems={WishLength} fctToCallOnClick={onChangeRole} menuName="Role" /> */}

            <select
              className={`w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md border border:stone-400 shadow-md  ${Theme_A.behaviour.fieldFocused_B}`}
              name="role" onChange={(e) => onChangeRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
            {error.email && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.role}*</p>
            )}
          </div>



          {/* CHARGEMENT IMAGE */}
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleProfileImageUpload}
            style={{ display: "none" }}
          />
          <div
            className={`${Theme_A.thumbnails.containerPicThumbnail}`}
          >
            <div className={`${Theme_A.thumbnails.profilPictureThumbnail}`}>
              {profileImage ? (
                <Image src={profileImage} fill={true} alt="Profile Image" />
              ) : (
                <div>
                  <p className={`${Theme_A.textFont.infoTextSmall}`}>
                    Ajouter une photo
                  </p>
                  <p className="text-[10px] font-medium text-[#959595] mt-2">
                    Recommended size is 128px x 128px
                  </p>
                </div>
              )}
            </div>
          </div>
          <button
            className={`${Theme_A.button.medWhiteColoredButton}`}
            onClick={handleClick}
          >
            Parcourir les fichiers
          </button>
          <p className={`${Theme_A.textFont.headerH3}`}>OU</p>
          <label className={`${Theme_A.textFont.headerH5}`} htmlFor="emailInput">Choisir un avatar</label>
          <div className="flex items-center justify-center gap-4">
            <div className="cursor-pointer" onClick={handleAvatarPrevious}>
              <LeftArrowIcon />
            </div>
            {getAvatars().map((avatar, index) => {
              return (
                <Avatars key={index} image={avatar.image} id={avatar.id} />
              );
            })}
            <div className="cursor-pointer" onClick={handleAvatarNext}>
              <RightArrowIcon />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div
              className="flex items-center justify-center gap-1 cursor-pointer"
              onClick={() => setShowAvatars("men")}
            >
              <div className="w-6 h-6 rounded-full bg-[#D9D9D9] ">
                {showAvatar === "men" && <SelectedIcon />}
              </div>
              <div>Homme</div>
            </div>
            <div
              className="flex items-center justify-center gap-1 cursor-pointer"
              onClick={() => setShowAvatars("women")}
            >
              <div className="w-6 h-6 rounded-full bg-[#D9D9D9] m-1">
                {showAvatar === "women" && <SelectedIcon />}
              </div>
              <div>Femme</div>
            </div>
          </div>
          {!isEdit ? (
            <button
              className={`${Theme_A.button.medLargeGradientButton}`}
              onClick={() => addDresser()}
            >
              Cr&eacute;er le profil
            </button>
          ) : (
            <div className="flex items-center justify-center gap-3 mb-2">
              <button
                className={`${Theme_A.button.mediumGradientButton} py-3`}
                onClick={() => addDresser(true)}
              >
                Mettre à jour
              </button>

              <button
                onClick={onClear}
                className={`${Theme_A.button.medWhiteColoredButton} py-3`}
              >
                Annuler
              </button>
              <button
                onClick={onDeleteHairDresser}
                className={`${Theme_A.button.deleteButtonSmall} px-4 py-3 gap-3`}
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>



        {/* SECTION DROITE */}

        {/* COIFFEUR DISPONIBLE */}
        <div className="h-[940px] w-full xl:w-2/5 overflow-auto flex flex-col items-center justify-start gap-8 bg-lightGrey rounded-3xl p-4 md:p-12">
          <div className={`${Theme_A.textFont.headerH2} underline`}>
            Coiffeur(s)/-euse(s) disponible(s)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full md:w-96">
            {hairDressers.map((item, index) => {
              return (
                <div key={index} className="w-full flex justify-center">
                  <div
                    onClick={() => selectHairDresser(item)}
                    className={`px-4 pt-4 shadow-lg flex flex-col justify-between cursor-pointer border-2 transition rounded-xl hover:border-secondary ${item.id === hairDresser.id && "border-secondary"
                      }`}
                  >
                    <div className="relative w-32 h-32">
                      <Image
                        fill={true}
                        src={
                          item.profile_image ? (item.profile_image.includes('https://api.onehaircut.com') ? item.profile_image : `https://api.onehaircut.com${item.profile_image}`) : `https://api.onehaircut.com${item.avatar.image}`
                        }
                        alt="image"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-center">{item.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hairdressers;
