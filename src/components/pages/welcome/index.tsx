'use client';
import React, { useEffect, useState, CSSProperties } from "react";
import Image from "next/image";
import { Like, LogoIcon, StarIcon, InfoNodalIcon } from "@/components/utilis/Icons";
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
import InfoModal from "@/components/UI/InfoModal";
import InfoButton from "@/components/UI/InfoButton";
import { user_api } from "@/api/clientSide";
//import StarRatings from "react-star-ratings";

// to avoid modifying the theme
const DemoButton = `text-white font-normal md:font-medium text-md md:text-lg ml-2 mr-2 mb-3 rounded-md w-[278px] py-2 bg-black border border-x-red-500 border-y-orange-500 transform hover:scale-105 transition-transform hover:shadow-md cursor-pointer`
const LogInButton = `text-white font-normal md:font-medium text-md md:text-lg ml-2 mr-2 mb-3 rounded-md w-[278px] py-2 ${ColorsThemeA.OhcGradient_A} transform hover:scale-105 transition-transform hover:shadow-[0px_7px_12px_0px_rgba(255,125,60,0.25)]`
const ServicesOnly_Classname = `flex items-center justify-center min-w-56 h-14 rounded-lg shadow-sm text-black font-medium text-md md:text-xl px-8 py-2 mt-2 bg-white border border-x-stone-200 border-y-stone-100 hover:scale-105 transform transition-transform duration-300 hover:shadow-md`

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
  const [hairNameFilters, setHairNameFilters] = useState<string[]>([]);
  // Store filtered haircuts based on user’s filters
  const [filteredHaircuts, setFilteredHaircuts] = useState<Haircut[]>([]);
  // Search state variable for filtering haircuts by name
  const [search, setSearch] = useState<string>('');
  const showSnackbar = useSnackbar(); // Custom hook to show snackbars
  const [isModal, setIsModal] = useState(false) // State to control the visibility of the modal
  const [isPreview, setIsPreview] = useState(false); // Initialiser à false pour afficher la coiffure par défaut
  const [isOnProgress, setIsOnProgress] = useState('');
  const [isOnPreview, setIsOnPreview] = useState(false);
  const [selectedHaircut, setSelectedHaircut] = useState({ id: 0, name: '', image: '' }) // Store the selected haircut
  const [wishlist, setWishlist] = useState<string[]>([]) // Store user’s wishlist of haircuts
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5);
  const [previewImage, setPreviewImage] = useState<string>('');

  const getAllHaircuts = async () => {
    // Fetch all available haircuts from the API
    if (!(page >= maxPage)) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await dashboard.getAllHaircuts(page)
        .then((res) => {
          setSalonHaircut([...salonHaircut, ...res.data.data]);
          setPage(prevPage => prevPage + 1);
          setMaxPage(res.data.max_page)
          setIsLoading(false)
        })
        .catch(error => setIsLoading(false))
    }
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
          //console.log(error)
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
            //console.log(err)
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

  const getFilteredHaircuts = async () => {
    setIsLoading(true)
    let resp = await user_api.getHaircutFilteredByName(hairNameFilters);
    setFilteredHaircuts(resp.data.data)
    setSalonHaircut(resp.data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getFilteredHaircuts();
  }, [hairNameFilters])

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
    setLocalStorage("haircut", JSON.stringify({ id: selectedHaircut.id, name: selectedHaircut.name, image: selectedHaircut.image }))
    router.push(`/services`)
  }

  const checkPreview = async () => {
    if (isPreview == false) {
      setIsPreview(!isPreview)
      setIsOnPreview(true)
      console.log("Fetching Image")
      let resp = await user_api.getPreviewImage(selectedHaircut.id);
      setIsOnProgress(resp.data.data.status)
      if (resp.data.data.message == 'There is problem on fetching data') {
        showSnackbar("error", "Error on fetching data, please make sure it's open times")
      }
      else {
        setPreviewImage(resp.data.data.url)
        if (resp.data.message == "Haircuts has been fetched before") {
          if (resp.data.data.status == 'Done') {

          }
        }
        console.log("Preview Image")
      }
    }
    else {
      setIsOnPreview(false)
      setIsPreview(!isPreview)
    }
  }

  useEffect(() => {
    console.log('Is On Preview' + isOnPreview)
    console.log('is Preview' + isPreview)
  }, [isOnPreview, isPreview])

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
  }, [ethnicityFilters, genderFilters, lengthFilters, search, salonHaircut]);

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
      // setIsOnProgress(false);
    }
  }, [isModal]);


  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  };
  const InfoTitle_1 = "Selection d'une coiffure";
  const InfoContent_1 = "Vous trouverez tous type de coiffure, pour tous les goût <br /> Vous pouvez ajouter une coiffure à vos favoris, et aussi prévisualiser une coiffure sur vous,  <br />  si vous avez ajouté vos photos dans la section portrait";
  const InfoTitle_2 = "Utilisation";
  const InfoContent_2 = `● Le choix d'une coiffure n'est pas obligatoire,<br /> Vous pouvez continuer et sélectionner une prestation.<br /> ● Il n'est pas possible de réserver un coiffeur sans avoir sélection soit une coiffure, soit une prestation. <br /> ● Si vous ne trouvez pas la coiffure qu'il vous faut, vous pouvez toujours opter pour une coiffure générique <br /> et expliquer vos attente au salon de coiffure.`;
  const VideoUrl = "";

  return (
    <>
      <Navbar isWelcomePage={true} onSearch={(value: string) => setSearch(value)} onGenderFilter={(gender) => setGenderFilters(gender)} onEthnicityFilters={(groups) => setEthnicityFilters(groups)} onLengthFilters={(length) => setLengthFilters(length)} onHairNameFilters={(hairname) => setHairNameFilters(hairname)} />
      <div className="flex flex-col items-center justify-center w-full overflow-hidden">

        {isLoading && loadingView()}
        <p className="mt-10 sm:mt-14 mb-6 md:w-[700px] text-black text-center font-semibold text-3xl px-2 md:px-10">
          Des doutes sur la finition ? pr&eacute;visualisez{" "}
        </p>
        <p className="text-4xl font-medium text-center mb-12">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-30 to-yellow-300">votre style !</span>
        </p>

        <div className="flex items-center justify-center w-full mb-10 sm:mb-10 px-2">
          {/* Espace vide pour centrer le bouton */}
          <div style={{ width: '48px' }}></div>

          {/* Bouton Recherche un soin centré */}
          <div
            className={`${ServicesOnly_Classname} cursor-pointer mr-4`}
            onClick={() => router.push('/services')}
          >
            Rechercher un soin / service uniquement
          </div>


          {/* Icône Info à droite du bouton */}
          <div className="pr-4">
            <InfoButton title_1={InfoTitle_1} content_1={InfoContent_1} title_2={InfoTitle_2} content_2={InfoContent_2} onOpenModal={openInfoModal} videoUrl={VideoUrl} />
          </div>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 ">
          {haircuts().map((item, index) => {
            return <div key={index} onClick={() => onClickHaircut(item.id, item.name, item.image)} className={`shadow-md rounded-xl cursor-pointer border hover:outline outline-1 outline-stone-400 ${item.id === haircut?.id}`}>
              <div className="relative w-max px-4 pt-4 bg-gradient-to-r from-white via-stone-50 to-zinc-200 rounded-t-xl ">
                <div className={`relative w-32 h-32 md:w-52 md:h-52`}>
                  <Image src={item.image.includes('http') ? item.image : `https://api.onehaircut.com${item.image}`} fill={true} alt="" className="rounded-t-xl"
                  />
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
              <div className=" w-40 md:w-60 rounded-b-xl bg-gradient-to-r from-white via-stone-50 to-zinc-200">
                <p className="rounded-b-xl flex items-center justify-center py-2 text-black font-medium">
                  {item.name}
                </p>
              </div>
            </div>
          })}
        </div>

        {isLoggedIn && (
          <div className="flex text-sm pt-2 pb-2 sm:pb-2 mx-2 gap-3 sm:gap-12 md:gap-20 items-center justify-center bg-white w-full fixed bottom-8 border-2 border-t-slate-300">
            <div className={`p-2 sm:p-4 md:p-5 text-center ${DemoButton}`}>
              Démonstration d’utilisation
            </div>
            <div onClick={() => router.push('/login')}
              className={`p-2 sm:p-4 md:p-5 text-center cursor-pointer ${LogInButton}`}>
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
                {isPreview ? isOnPreview == true ? (
                  <>
                    <p>Picture is on progress</p>
                  </>
                ) :
                  previewImage && <Image
                    // loader={ () => previewImage }
                    src={previewImage !== '' ? previewImage : `https://api.onehaircut.com/base_null_img.jpg`}
                    fill={true}
                    alt=""
                    className="rounded-xl w-full h-full object-cover"
                  />
                  : (
                    <Image
                      src={selectedHaircut.image.includes('http') ? selectedHaircut.image : `https://api.onehaircut.com${selectedHaircut.image}`}
                      fill={true}
                      alt=""
                      className="rounded-xl w-full h-full object-cover"
                    />
                  )}
              </div>
              <div className="flex flex-col items-center">
                <button onClick={onContinue} className={`flex items-center justify-center font-medium w-full md:w-52 h-14 mb-4 ${Theme_A.button.smallGradientButton}`}>Choisir cette coiffure</button>
                <button
                  onClick={checkPreview}
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
