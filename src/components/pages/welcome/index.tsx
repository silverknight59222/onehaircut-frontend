'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Like, LogoCircleFixLeft } from "@/components/utilis/Icons";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import { Haircut } from "@/types";
import Navbar from "@/components/shared/Navbar";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
import useSnackbar from "@/hooks/useSnackbar";
import ScrollToTopButton from "@/components/utilis/Helper";
import Footer from "@/components/UI/Footer";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import BaseModal from "@/components/UI/BaseModal";


const Welcome = () => {
  const { loadingView } = userLoader();
  const [salonHaircut, setSalonHaircut] = useState<Haircut[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()
  const user = getLocalStorage("user");
  const userId = user ? Number(JSON.parse(user).id) : null;
  const haircut = JSON.parse(String(getLocalStorage("haircut")))
  const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
  const [lengthFilters, setLengthFilters] = useState<string[]>([]);
  const [genderFilters, setGenderFilters] = useState<string>("");
  const [filteredHaircuts, setFilteredHaircuts] = useState<Haircut[]>([]);
  const [search, setSearch] = useState<string>('');
  const showSnackbar = useSnackbar();
  const [isModal, setIsModal] = useState(false)
  const [selectedHaircut, setSelectedHaircut] = useState({ id: 0, name: '', image: '' })
  const [wishlist, setWishlist] = useState<string[]>([])

  const getAllHaircuts = () => {
    setIsLoading(true);
    dashboard.getAllHaircuts()
      .then((res) => {
        if (res.data.data.length > 0) {
          setSalonHaircut(res.data.data);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const getHaircutsWishlist = () => {
    if (userId) {
      setIsLoading(true);
      dashboard.getWishlistHaircuts(userId)
        .then((res) => {
          if (res.data.data.length > 0) {
            if (salonHaircut.length) {
              const arr: string[] = []
              res.data.data.forEach((item: any) => {
                salonHaircut.forEach((haircut) => {
                  if (item.haircut.id === haircut.id) {
                    arr.push(String(haircut.id))
                  }
                })
              });
              setWishlist(arr)
            }
          }
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          console.log(error)
        })
    }
  }

  const onWishlist = async (e: any, haircutId: number) => {
    e.stopPropagation()
    if (userId) {
      let data = {
        user_id: userId,
        haircut_id: haircutId
      }
      if (wishlist.includes(String(haircutId))) {
        await dashboard.removeFromWishList(haircutId, userId)
          .then(response => {
            getHaircutsWishlist()
            showSnackbar('success', 'Removed From Wishlist Successfully!')
          })
          .catch(error => {
            showSnackbar('error', 'Error Occured!')
          })
      }
      else {
        await dashboard.addWishList(data)
          .then(response => {
            getHaircutsWishlist()
            showSnackbar('success', 'Added To Wishlist Successfully!')
          })
          .catch(err => {
            console.log(err)
            showSnackbar('error', 'Error Occured!')
          })
      }
    }
  }


  const getFilteredCuts = () => {
    const haircuts: Haircut[] = [];
    let list = salonHaircut

    if (search) {
      list = list.filter((haircut) =>
        haircut.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (
      ethnicityFilters.length > 0 &&
      genderFilters &&
      lengthFilters.length > 0
    ) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            if (
              haircut.type === genderFilters.toLowerCase() ||
              genderFilters === "Mix"
            ) {
              lengthFilters.forEach((filter) => {
                if (haircut.length === filter.toLowerCase()) {
                  haircuts.push(haircut);
                }
              });
            }
          }
        });
      });
    } else if (ethnicityFilters.length > 0 && genderFilters) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            if (
              haircut.type === genderFilters.toLowerCase() ||
              genderFilters === "Mix"
            ) {
              haircuts.push(haircut);
            }
          }
        });
      });
    } else if (ethnicityFilters.length > 0 && lengthFilters.length > 0) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            lengthFilters.forEach((filter) => {
              if (haircut.length === filter.toLowerCase()) {
                haircuts.push(haircut);
              }
            });
          }
        });
      });
    } else if (lengthFilters.length > 0 && genderFilters) {
      list.forEach((haircut) => {
        lengthFilters.forEach((filter) => {
          if (haircut.length === filter.toLowerCase()) {
            if (
              haircut.type === genderFilters.toLowerCase() ||
              genderFilters === "Mix"
            ) {
              haircuts.push(haircut);
            }
          }
        });
      });
    } else if (ethnicityFilters.length > 0) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            haircuts.push(haircut);
          }
        });
      });
    } else if (lengthFilters.length > 0) {
      list.forEach((haircut) => {
        lengthFilters.forEach((filter) => {
          if (haircut.length === filter.toLowerCase()) {
            haircuts.push(haircut);
          }
        });
      });
    } else if (genderFilters) {
      list.forEach((haircut) => {
        if (
          haircut.type === genderFilters.toLowerCase() ||
          genderFilters === "Mix"
        ) {
          haircuts.push(haircut);
        }
      });
    }
    if (
      search &&
      !(ethnicityFilters.length > 0) &&
      !genderFilters &&
      !(lengthFilters.length > 0)
    ) {
      setFilteredHaircuts(list);
    } else {
      setFilteredHaircuts(haircuts);
    }

  };

  const haircuts = () => {
    if (
      ethnicityFilters.length > 0 ||
      lengthFilters.length > 0 ||
      genderFilters ||
      search !== ''
    ) {
      return filteredHaircuts;
    } else {
      return salonHaircut;
    }
  };
  const onClickHaircut = (id: number, name: string, image?: string) => {
    setIsModal(true)
    setSelectedHaircut({ id: id, name: name, image: image ? image : '' })
  }

  const onContinue = () => {
    setLocalStorage("haircut", JSON.stringify({ id: selectedHaircut.id, name: selectedHaircut.name }))
    router.push(`/services`)
  }

  const onServiceOnlyClick = () => {
    // Définir le nom de la coiffure à "aucune" et appeler onClickHaircut
    onClickHaircut(-1, "Aucune coiffure sélectionnée");
  }

  useEffect(() => {
    getFilteredCuts();
  }, [ethnicityFilters, genderFilters, lengthFilters, search]);

  useEffect(() => {
    getAllHaircuts();
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    if (!userId) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      getHaircutsWishlist()
    }
  }, [salonHaircut])

  return (
    <>
      <Navbar isWelcomePage={true} onSearch={(value: string) => setSearch(value)} onGenderFilter={(gender) => setGenderFilters(gender)} onEthnicityFilters={(groups) => setEthnicityFilters(groups)} onLengthFilters={(length) => setLengthFilters(length)} />
      <div className="flex flex-col items-center justify-center w-full overflow-hidden">

        {isLoading && loadingView()}
        <p className="mt-10 sm:mt-14 mb-6  md:w-[700px] text-black text-center font-semibold text-3xl px-2 md:px-10">
          Des doutes sur la finition ? pr&eacute;visualisez{" "}
        </p>
        <p className="text-4xl font-medium text-center mb-12">
          <span className=" font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-30 to-yellow-300">votre style !</span>
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-10 sm:mb-10 ">
          <div
            className={`${Theme_A.button.bigWhiteGreyButton} hover:shadow-lg cursor-pointer `}
            onClick={() => {
              onServiceOnlyClick();
              router.push('/services');
            }}
          >
            Rechercher un soin / service uniquement
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 ">
          {haircuts().map((item, index) => {
            return <div key={index} onClick={() => onClickHaircut(item.id, item.name, item.image)} className={`shadow-md rounded-xl my-2 cursor-pointer border hover:outline outline-1 outline-stone-400 ${item.id === haircut?.id}`}>
              <div className="relative w-max px-4 pt-4 bg-gradient-to-r from-white via-stone-50 to-zinc-200 rounded-t-xl ">
                <div className={`${Theme_A.hairstyleCards.cardSize.med}`}>
                  <Image src={item.image.includes('https://api-server.onehaircut.com/public') ? item.image : `https://api-server.onehaircut.com/public${item.image}`} fill={true} alt="" className="rounded-t-xl" />
                  {!isLoggedIn &&
                    <div onClick={(e) => onWishlist(e, item.id)} className="absolute right-2 top-2 cursor-pointer">
                      <Like color={wishlist.includes(String(item.id)) ? "#ef4444" : ""} />
                    </div>}
                </div>
              </div>
              <div className="rounded-b-xl bg-gradient-to-r from-white via-stone-50 to-zinc-200">
                <p className="rounded-b-xl flex items-center justify-center py-2 text-black font-medium">
                  {item.name}
                </p>
              </div>
            </div>
          })}
        </div>

        {isLoggedIn && (
          <div className="flex py-4 mx-3 gap-3 sm:gap-12 md:gap-20 items-center justify-center bg-white w-full fixed bottom-0">
            <div className="p-2 sm:p-4 md:p-5 text-center border-[#FE3462] border-2 rounded-2xl cursor-pointer ml-3">
              Démonstration d’utilisation
            </div>
            <div onClick={() => router.push('/login')} className="p-2 sm:p-4 md:p-5 text-white text-center rounded-2xl cursor-pointer bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo">
              Connexion / Inscription
            </div>
            <div className="p-2 sm:p-4 md:p-5 text-center border-[#FE3462] border-2 rounded-2xl cursor-pointer mr-3">
              Envie d’offrir un cadeau ?
            </div>
          </div>

        )}

        <ScrollToTopButton />
        <Footer />
        {isModal &&
          <BaseModal close={() => setIsModal(false)}>
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative w-52 h-52 mb-5">
                <Image src={selectedHaircut.image.includes('https://api-server.onehaircut.com/public') ? selectedHaircut.image : `https://api-server.onehaircut.com/public${selectedHaircut.image}`} fill={true} alt="" className="rounded-xl" />
              </div>
              <button onClick={onContinue} className={`flex items-center justify-center text-lg text-white font-medium w-full md:w-52 h-14 rounded-xl px-4 ${ColorsThemeA.OhcGradient_A}`}>Continue</button>
            </div>
          </BaseModal>}
      </div>

    </>
  );
};

export default Welcome;
