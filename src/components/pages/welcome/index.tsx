'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Like, LogoIcon, StarIcon } from "@/components/utilis/Icons";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import { Haircut } from "@/types";
import Navbar from "@/components/shared/Navbar";
import { getLocalStorage, setLocalStorage, removeFromLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
import useSnackbar from "@/hooks/useSnackbar";
import ScrollToTopButton from "@/components/utilis/Helper";
import Footer from "@/components/UI/Footer";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import BaseModal from "@/components/UI/BaseModal";
//import StarRatings from "react-star-ratings";


const Welcome = () => {
  // Define state variables
  const { loadingView } = userLoader(); // Using a custom hook to load user data
  const [salonHaircut, setSalonHaircut] = useState<Haircut[]>([]); // Store haircut data fetched from the API
  const [isLoading, setIsLoading] = useState(false); // Loading state for asynchronous operations
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User login state
  const router = useRouter() // Next.js Router for navigation
  // Retrieve user and haircut information from local storage
  const user = getLocalStorage("user");
  const userId = user ? Number(JSON.parse(user).id) : null;
  const haircutRaw = getLocalStorage("haircut");
  const haircut = haircutRaw ? JSON.parse(haircutRaw) : null;

  // Define filters state variables
  const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
  const [lengthFilters, setLengthFilters] = useState<string[]>([]);
  const [genderFilters, setGenderFilters] = useState<string>("");
  // Store filtered haircuts based on user’s filters
  const [filteredHaircuts, setFilteredHaircuts] = useState<Haircut[]>([]);
  // Search state variable for filtering haircuts by name
  const [search, setSearch] = useState<string>('');
  const showSnackbar = useSnackbar(); // Custom hook to show snackbars
  const [isModal, setIsModal] = useState(false) // State to control the visibility of the modal
  const [isPreview, setIsPreview] = useState(false); // Initialiser à false pour afficher la coiffure par défaut
  const [selectedHaircut, setSelectedHaircut] = useState({ id: 0, name: '', image: '' }) // Store the selected haircut
  const [wishlist, setWishlist] = useState<string[]>([]) // Store user’s wishlist of haircuts
  const [page, setPage] = useState(1);


  const getAllHaircuts = async () => {
    // Fetch all available haircuts from the API
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await dashboard.getAllHaircuts(page)
      .then((res) => {
        setSalonHaircut([...salonHaircut, ...res.data.data]);
        setPage(prevPage => prevPage + 1);
        setIsLoading(false)
      })
      .catch(error => setIsLoading(false))
  }

  const handleScroll = () => {
    if (isLoading) return;

    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 30) {
      getAllHaircuts();
    }
  };

  const getHaircutsWishlist = () => {
    // Fetch the user’s wishlist of haircuts
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
    // Handle adding/removing haircuts to/from the wishlist
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
    // Filter haircuts based on user-selected filters
    const haircuts: Haircut[] = [];
    let list = salonHaircut


    // Apply filters
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
    setIsPreview(false); // Initialisez isPreview à false avant d'ouvrir le modal
    setIsModal(true);
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
    removeFromLocalStorage('ServiceIds')
    removeFromLocalStorage('haircut') // reset hair cut when user land on welcome page every time
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

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

  // Control et regle l'image par defaut affiché lors de l'ouverture du modal
  useEffect(() => {
    if (isModal) {
      setIsPreview(false);
    }
  }, [isModal]);



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
            className={`${Theme_A.button.bigWhiteGreyButton} shadow-sm hover:shadow-md cursor-pointer `}
            onClick={() => {
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
                  <Image src={item.image.includes('https://api.onehaircut.com') ? item.image : `https://api.onehaircut.com${item.image}`} fill={true} alt="" className="rounded-t-xl" />
                  {!isLoggedIn &&
                    <div onClick={(e) => onWishlist(e, item.id)} className="absolute right-2 top-2 cursor-pointer">
                      <StarIcon
                        color={wishlist.includes(String(item.id)) ? "#FF5B5B" : ""}
                        stroke={wishlist.includes(String(item.id)) ? "#FFFFFF" : ""}
                      />
                    </div>
                  }
                  
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
          <div className="flex py-4 mx-3 gap-3 sm:gap-12 md:gap-20 items-center justify-center bg-white w-full fixed bottom-8">
            <div className={`p-2 sm:p-4 md:p-5 text-center ${Theme_A.button.medLargeBlackButton}`}>
              Démonstration d’utilisation
            </div>
            <div onClick={() => router.push('/login')} className={`p-2 sm:p-4 md:p-5 text-center ${Theme_A.button.medLargeGradientButton}`}>
              Connexion / Inscription
            </div>
            {/*
            <div className="p-2 sm:p-4 md:p-5 text-center border-[#FE3462] border-2 rounded-2xl cursor-pointer mr-3">
              Envie d’offrir un cadeau ?
            </div>
            */}
          </div>

        )}

        <ScrollToTopButton />
        <Footer />
        {isModal &&
          <BaseModal close={() => setIsModal(false)}>
            <div className="flex flex-col items-center justify-center my-4 relative">
              <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-96 md:h-96 mb-5">
                {isPreview ? (
                  <div className="flex items-center justify-center rounded-xl w-full h-full object-cover">
                    <LogoIcon />
                  </div>
                ) : (
                  <Image
                    src={selectedHaircut.image.includes('https://api.onehaircut.com') ? selectedHaircut.image : `https://api.onehaircut.com${selectedHaircut.image}`}
                    fill={true}
                    alt=""
                    className="rounded-xl w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                <button onClick={onContinue} className={`flex items-center justify-center font-medium w-full md:w-52 h-14 mb-4 ${Theme_A.button.medLargeGradientButton}`}>Choisir cette coiffure</button>
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className={`flex items-center justify-center font-medium w-full md:w-52 h-14 ${isPreview ? Theme_A.button.medGreydButton : Theme_A.button.medWhiteColoredButton}`}
                >
                  {isPreview ? 'Image de référence' : 'Prévisualiser sur moi'}
                </button>
              </div>
            </div>
          </BaseModal>
        }



      </div >

    </>
  );
};

export default Welcome;
