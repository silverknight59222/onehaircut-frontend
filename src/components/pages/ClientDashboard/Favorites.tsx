"use client";
import { dashboard } from "@/api/dashboard";
import {
  CrossIcon,
  EyeIcon,
  LogoCircleFixRight,
} from "@/components/utilis/Icons";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import { SalonWishlist, WishlistHaircuts } from "@/types";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import useSnackbar from "@/hooks/useSnackbar";
import BaseModal from "@/components/UI/BaseModal";
import InfoButton from "@/components/UI/InfoButton";
import { user_api } from "@/api/clientSide";
import { useRouter } from "next/navigation";
import {
  InfoContent_3,
  InfoContent_4,
  InfoTitle_3,
  InfoTitle_4,
} from "@/utils/constants";
import { TbZoomInArea } from "react-icons/tb";

const Favorites = () => {
  const router = useRouter(); // Next.js Router for navigation

  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [haircuts, setHaircuts] = useState<WishlistHaircuts[]>([]);
  const [salons, setSalons] = useState<SalonWishlist[]>([]);

  // Modal Info
  const [isModal, setIsModal] = useState(false); // State to control the visibility of the modal
  const [isPreview, setIsPreview] = useState(false); // Initialiser à false pour afficher la coiffure par défaut
  const [isOnPreview, setIsOnPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [hasPreview, setHasPreview] = useState<string[]>([]);
  const [selectedHaircut, setSelectedHaircut] = useState({
    id: 0,
    name: "",
    image: "",
  }); // Store the selected haircut
  const [isOnProgress, setIsOnProgress] = useState("");

  const user = getLocalStorage("user");
  const userId = user ? Number(JSON.parse(user).id) : null;
  const showSnackbar = useSnackbar(); // Custom hook to show snackbars

  useEffect(() => {
    getWishlistHaircuts();
    getSalonsWishlist();
    getHasPreviewList();
  }, []);

  useEffect(() => {
    if (isModal) {
      setIsPreview(false);
    }
  }, [isModal]);

  const getHasPreviewList = () => {
    // Fetch the user’s wishlist of haircuts
    if (userId) {
      setIsLoading(true);
      dashboard
        .getHasPreviewHaircuts(userId)
        .then((res) => {
          if (res.data.data.length > 0) {
            if (haircuts.length) {
              const arr: string[] = [];
              res.data.data.forEach((item: any) => {
                haircuts.forEach((haircut: any) => {
                  if (item.haircut.id === haircut.id) {
                    arr.push(String(haircut.id));
                  }
                });
              });
              setHasPreview(arr);
            }
          }
        })
        .catch((_error) => { })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const getWishlistHaircuts = () => {
    if (userId) {
      setIsLoading(true);
      dashboard
        .getWishlistHaircuts(userId)
        .then((res) => {
          if (res.data.data) {
            setHaircuts(res.data.data);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const getSalonsWishlist = () => {
    if (userId) {
      setIsLoading(true);
      dashboard
        .getSalonsWishlist(userId)
        .then((res) => {
          if (res.data.data) {
            setSalons(res.data.data);
          }
        })
        .catch((_error) => { })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const RemoveHaircutWishlist = async (e: any, haircutId: number) => {
    // Handle adding/removing haircuts to/from the wishlist
    e.stopPropagation();
    if (userId) {
      let data = {
        user_id: userId,
        haircut_id: haircutId,
      };

      await dashboard
        .removeFromWishList(haircutId, userId)
        .then((response) => {
          getWishlistHaircuts();
          showSnackbar("success", "Removed From Wishlist Successfully!");
        })
        .catch(() => {
          showSnackbar("error", "Error Occured!");
        });
    }
  };

  const RemoveSalonFromFavorites = async (e: any, hairsalonId: number) => {
    // Handle adding/removing haircuts to/from the wishlist
    e.stopPropagation();
    if (userId) {
      await dashboard
        .removeFromSalonWishList(hairsalonId, userId)
        .then((response) => {
          getSalonsWishlist();
          showSnackbar("success", "Salon supprimé des préférences");
        })
        .catch(() => {
          showSnackbar("erreur", "Salon non supprimé");
        });
    }
  };

  // TODO Delete picture in S3
  const DeleteS3Picture = async () => {
    let resp = await user_api.deletePreviewImageByHaircutUser(
      selectedHaircut.id,
      userId!
    );
    if (resp.status == 200) {
      showSnackbar("success", "Generated Image Deleted");
    } else {
      showSnackbar("error", "There is problem when deleting image");
    }
    hasPreview.filter((preview_image) => {
      if (preview_image === String(selectedHaircut.id)) {
        console.log("ID PREVIEW : " + preview_image);
        console.log("ID SELECTED : " + selectedHaircut.id);
      }
      preview_image !== String(selectedHaircut.id);
    });
    // getHasPreviewList()
  };

  // Modal Function

  const onClickHaircut = (id: number, name: string, image?: string) => {
    if (user) {
      setSelectedHaircut({ id: id, name: name, image: image ? image : "" });
      setIsPreview(false); // Initialisez isPreview à false avant d'ouvrir le modal
      setIsModal(true);
    } else {
      showSnackbar("warning", "Veuillez vous connecter.");
    }
  };

  const onContinue = () => {
    setLocalStorage(
      "haircut",
      JSON.stringify({
        id: selectedHaircut.id,
        name: selectedHaircut.name,
        image: selectedHaircut.image,
      })
    );
    router.push(`/services`);
  };

  const checkPreview = async () => {
    if (isPreview == false) {
      setIsPreview(!isPreview);
      setIsOnPreview(true);
      console.log("Fetching Image");
      let resp = await user_api.getPreviewImage(selectedHaircut.id);
      setIsOnProgress(resp.data.data.status);
      if (resp.data.data.message == "There is problem on fetching data") {
        showSnackbar(
          "error",
          "Error on fetching data, please make sure it's open times"
        );
      } else {
        if (resp.data.message == "Haircuts has been fetched before") {
          if (resp.data.data.status == "Done") {
            setPreviewImage(resp.data.data.url);
          } else {
            setPreviewImage("");
          }
        } else {
          setPreviewImage("");
          if (resp.data.status == 200) {
            showSnackbar("success", resp.data.message);
          } else {
            showSnackbar("error", resp.data.message);
          }
        }
        console.log("Preview Image");
      }
    } else {
      setIsOnPreview(false);
      setIsPreview(!isPreview);
    }
  };

  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <div className="flex flex-col items-center justify-center mt-10 mb-5 px-8 relative">
        {isLoading && loadingView()}
        <p
          className={`text-black ${Theme_A.fonts.header} ${Theme_A.textFont.headerH1} mb-10 static`}
        >
          Favoris
        </p>
        {/* Haircuts part */}
        <div className="w-full relative flex flex-col items-center justify-center my-10">
          <div className="w-full">
            <p className="text-black text-3xl mb-3">Coiffures</p>
            <div
              className={`h-7 flex items-center rounded-xl text-white px-5 bg-gradient-to-r  from-zinc-800 via-zinc-400 to-zinc-100`}
            >
              {haircuts.length} favorites
            </div>
          </div>
          <div className="lg:absolute -top-10 md:ml-72  w-9/12 overflow-auto mt-3 md:mr-48">
            <table>
              <tbody className="flex items-center md:flex-nowrap justify-center  gap-8 pb-2">
                {haircuts.map((item: any, index) => {
                  return (
                    <tr
                      key={index}
                      className="flex flex-col items-center justify-center"
                    >
                      <div
                        onClick={() =>
                          onClickHaircut(
                            item.haircut.id,
                            item.haircut.name,
                            item.haircut.image
                          )
                        }
                        className={`${Theme_A.hairstyleCards.cardgradientTop} rounded-xl relative group`}
                      >
                        <div className="relative w-max  bg-[#F5F5F5] ">
                          <div className="relative w-32 h-32">
                            <Image
                              src={
                                item.haircut.image.includes("http")
                                  ? item.haircut.image
                                  : `https://api.onehaircut.com${item.haircut.image}`
                              }
                              fill={true}
                              alt=""
                              className="rounded-t-xl"
                            />
                          </div>
                        </div>
                        <div className="rounded-xl ">
                          <p className={`${Theme_A.hairstyleCards.cardText}`}>
                            {item.haircut.name}
                          </p>
                        </div>
                        <div
                          onClick={(e) =>
                            RemoveHaircutWishlist(e, item.haircut.id)
                          }
                          className={`absolute top-1 right-1 flex items-center justify-center w-6 h-6 cursor-pointer rounded-md ${Theme_A.button.crossButtonSmall}`}
                        >
                          <CrossIcon width="18" height="18" />
                        </div>
                        <div className="group-hover:opacity-100 rounded-xl bg-black bg-opacity-40 opacity-0 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center transition-opacity duration-300 cursor-pointer">
                          <TbZoomInArea
                            size={48}
                            strokeWidth={2}
                            color={'white'}
                          />
                        </div>
                      </div>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Salons' part */}
        <div className="w-full relative flex flex-col items-center justify-center md:mt-40">
          <div className="w-full">
            <p className="text-black text-3xl mb-3">Salons</p>
            <div
              className={`h-7 flex items-center rounded-xl text-white px-5 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-100`}
            >
              {salons.length} favorites
            </div>
          </div>
          <div className="lg:absolute -top-10 md:ml-72  w-9/12 overflow-auto mt-3 md:mr-48">
            <table>
              <tbody className="flex items-center justify-center  gap-8 pb-2">
                {salons.map((item: any, index) => {
                  return (
                    <tr
                      key={index}
                      className="flex flex-col items-center justify-center"
                    >
                      <div
                        className={`relative w-52 px-4 pt-4 rounded-xl ${ColorsThemeA.pageBgColorLight}`}
                      >
                        <div className="relative w-max px-4 pt-4  rounded-xl">
                          <div className="relative w-36 h-36">
                            <Image
                              src={
                                item.hairsalon.logo.includes("http")
                                  ? item.hairsalon.logo
                                  : `https://api.onehaircut.com${item.hairsalon.logo}`
                              }
                              fill={true}
                              alt=""
                              className="rounded-t-xl"
                            />
                          </div>
                        </div>
                        <div className="rounded-b-xl">
                          <p
                            className={`rounded-b-xl flex items-center justify-center py-2 text-lg text-black font-bold `}
                          >
                            {item.hairsalon.name}
                          </p>
                        </div>
                        <div className="rounded-b-xl">
                          <p
                            className={`rounded-b-xl flex items-center text-center justify-center py-2 text-lg ${ColorsThemeA.textSecondary} font-normal overflow-clip`}
                          >
                            {item.hairsalon.address.city +
                              " " +
                              item.hairsalon.address.state +
                              " " +
                              item.hairsalon.address.country}
                            {/* 63a rue Dietwiller 68440 Schlierbach  comment */}
                          </p>
                        </div>
                        <div
                          onClick={(e) =>
                            RemoveSalonFromFavorites(e, item.hairsalon.id)
                          }
                          className={`absolute top-1 right-1 flex items-center justify-center w-6 h-6 cursor-pointer rounded-md ${Theme_A.button.crossButtonSmall}`}
                        >
                          <CrossIcon width="9" height="9" />
                        </div>
                      </div>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="w-full relativ mt-14">
                        <p className="text-black text-3xl mb-3 ">Salons</p>
                        <div className="w-full relativ  overflow-auto absolute">
                            <table className="w-full ">
                                <thead className={`w-full h-7 flex items-center rounded-xl text-white px-5 ${ColorsThemeA.OhcGradient_A}`}>
                                    <tr>
                                        <td className="">
                                            {salons.length} favoris
                                        </td>
                                        {salons.map((item, index) => {
                                            return <td key={index} scope="col" className="text-center font-bold px-6">
                                                {item.hairsalon.address}
                                            </td>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-black">
                                        <td className="px-6"></td>
                                        {salons.map((salon, index) => {
                                            return <td key={index} className="px-3 py-4 ">
                                                <div className="flex flex-col items-center justify-center relative w-32 h-32">
                                                    <Image src={salon.hairsalon.logo.includes('https://api.onehaircut.com') ? salon.hairsalon.logo : `https://api.onehaircut.com${salon.hairsalon.logo}`} fill={true} alt="" className="rounded-t-xl" />
                                                    <p className="mb-2 mt-1 text-black text-center">{salon.hairsalon.name}</p>
                                                </div>
                                            </td>
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div> */}
        {isModal && (
          <BaseModal close={() => setIsModal(false)}>
            <div className="flex flex-col items-center justify-center my-4 relative">
              <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-96 md:h-96 mb-5">
                {isPreview ? (
                  isOnPreview == true && previewImage.length == 0 ? (
                    <>
                      <div className="flex space-x-2 justify-center items-center text-xl text-black font-semibold">
                        Chargement
                        <InfoButton
                          title_1={InfoTitle_3}
                          content_1={InfoContent_3}
                          title_2={InfoTitle_4}
                          content_2={InfoContent_4}
                          onOpenModal={openInfoModal}
                        />
                      </div>

                      <p className="flex space-x-2 justify-center items-center bg-white h-96 mb-8">
                        <p className="h-5 w-5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.9s]"></p>
                        <p className="h-5 w-5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.75s]"></p>
                        <p className="h-5 w-5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.6s]"></p>
                        <p className="h-5 w-5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.35s]"></p>
                        <p className="h-5 w-5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></p>
                        <p className="h-5 w-5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></p>
                        <p className="h-5 w-5 bg-orange-400 rounded-full animate-bounce"></p>
                      </p>
                    </>
                  ) : (
                    previewImage && (
                      <Image
                        loader={() => previewImage}
                        src={
                          previewImage !== ""
                            ? previewImage
                            : `https://api.onehaircut.com/base_null_img.jpg`
                        }
                        fill={true}
                        alt=""
                        className="rounded-xl w-full h-full object-cover"
                      />
                    )
                  )
                ) : (
                  <Image
                    src={
                      selectedHaircut.image.includes("http")
                        ? selectedHaircut.image
                        : `https://api.onehaircut.com${selectedHaircut.image}`
                    }
                    fill={true}
                    alt=""
                    className="rounded-xl w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={onContinue}
                  className={`flex items-center justify-center font-medium w-full md:w-52 h-14 mb-4 ${Theme_A.button.smallGradientButton}`}
                >
                  Choisir cette coiffure
                </button>
                <button
                  onClick={checkPreview}
                  className={`flex items-center justify-center font-medium w-full md:w-52 h-14 mb-4 ${isPreview
                    ? Theme_A.button.medGreydButton
                    : Theme_A.button.medWhiteColoredButton
                    }`}
                >
                  {isPreview ? "Image de référence" : "Prévisualiser sur moi"}
                </button>
                {/* Affichez le bouton "Supprimer" uniquement lorsque isPreview est vrai */}
                {isPreview && (
                  <button
                    onClick={DeleteS3Picture}
                    className={`flex items-center justify-center font-medium w-full md:w-52 h-14 mb-4 ${Theme_A.button.medBlackColoredButton} text-sm`}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </BaseModal>
        )}
      </div>
    </div>
  );
};

export default Favorites;
