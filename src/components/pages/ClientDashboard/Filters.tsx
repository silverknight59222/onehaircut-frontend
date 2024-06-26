"use client";
import { LogoCircleFixRight, CheckedIcon } from "@/components/utilis/Icons";
import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import DropdownMenu from "@/components/UI/DropDownMenu";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";
import EUCountriesList from "@/components/shared/Navbar/EUCountries";
import ComponentTheme from "@/components/UI/ComponentTheme";
import CustomSlider from "@/components/UI/OHC_Slider";
import { client, user_api } from "@/api/clientSide";
import useSnackbar from "@/hooks/useSnackbar";
import CustomInput from "@/components/UI/CustomInput";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import BaseModal from "@/components/UI/BaseModal";
import InfoButton from "@/components/UI/InfoButton";

const Filters = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedItems, SetAtHome] = useState<String[]>([]);
  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const [modalLengthErr, SetmodalLengthErr] = useState(false);
  const user = getLocalStorage("user");
  const userData = user ? JSON.parse(user) : null;
  const items = ["Recherche Coiffure", "Recherche Salon "];
  const onSelectTab = (index: number) => {
    setSelectedTab(index);
  };

  const checkboxClickHandler = (value: string) => {
    if (selectedItems.includes(value)) {
      const tempArray = [...selectedItems];
      const index = tempArray.indexOf(value);
      tempArray.splice(index, 1);
      SetAtHome(() => tempArray);
    } else {
      SetAtHome((prevState) => [...prevState, value]);
    }
  };

  const handleBudgetSliderChange = (event: any, newValue: any) => {
    setBudgetSliderRange(newValue);
  };
  const handleZoneSliderChange = (event: any, newValue: any) => {
    setZoneSliderRange(newValue);
  };

  //For Dropdown lists
  const WishGender = ["Feminine", "Masculine", "Mixte"];
  const WishLength = ["Court", "Moyen", "Long"];
  const showSnackbar = useSnackbar();

  // handling the change of Gender
  const handleWishGender = (item: string) => {
    setHairstyleTrend(item);
  };
  // handling the change of wishes length
  const handleCurrentLength = (item: string) => {
    setCurrentLength(item);
  };
  // handling the change of length
  const handleLengthSought = (item: string) => {
    setDesiredLength(item);
  };
  // handling the change of length
  const handleNewSetCountry = (item: string) => {
    setCountry(item);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [currentLength, setCurrentLength] = useState("");
  const [desiredLength, setDesiredLength] = useState("");
  const [hairstyleTrend, setHairstyleTrend] = useState("");
  const [CountryDefault, setCountry] = useState("");
  const [budgetSliderRange, setBudgetSliderRange] = useState([0, 200]);
  const [zoneSliderRange, setZoneSliderRange] = useState([0, 15]);
  const [HairdressingAtHome, setHairdressingAtHome] = useState(false);
  const [ZipCodeValue, setZipCodeValue] = useState("");
  const [MinRating, setMinRating] = useState(1); // Initialize with the default rating value
  const [MaxRating, setMaxRating] = useState(5); // Initialize with the default rating value
  const [areHaircutFiltersActive, setAreHaircutFiltersActive] = useState(false); // État pour contrôler si les filtres sont actifs
  const [areSalonFiltersActive, setAreSalonFiltersActive] = useState(false); // État pour contrôler si les filtres sont actifs

  const handleMinRatingChange = (newRating: number) => {
    if (newRating <= MaxRating) {
      setMinRating(newRating); // Update the MinRating state with the new rating value
    }
  };

  const handleMaxRatingChange = (newRating: number) => {
    if (newRating >= MinRating) {
      setMaxRating(newRating); // Update the MaxRating state with the new rating value
    }
  };

  // Update the selectedItem when the CountryDefault prop changes
  useEffect(() => {
    fetchFilterPrefrences();
  }, []);

  const resetAllValues_1 = async () => {
    setIsLoading(true);
    await client
      .resetFilterPreferences({
        tab: "hairstyle-search",
        current_hair: "",
        length_sought: "",
        hairstyle_trend: "",
        budget: [0, 500],
      })
      .then((resp) => {
        showSnackbar(
          "succès",
          "Les préférences ont été réinitialisées avec succès"
        );
      })
      .catch((err) => {
        //console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      });
    fetchFilterPrefrences();
  };

  const resetAllValues_2 = async () => {
    setIsLoading(true);
    await client
      .resetFilterPreferences({
        tab: "salon-search",
        country: CountryDefault,
        hairdressing_at_home: false,
        postal_code: "",
        search_area: [0, 15],
        ratings: 1,
        availability: "",
      })
      .then((resp) => {
        //console.log(resp.data);
        showSnackbar(
          "success",
          "Les préférences ont été réinitialisées avec succès"
        );
      })
      .catch((err) => {
        //console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      });

    fetchFilterPrefrences();
  };

  const updateHairStyleSearch = async () => {
    // check the current hair length
    if (
      (currentLength == "Court" && desiredLength == "Court") ||
      (currentLength == "Moyen" &&
        (desiredLength == "Court" || desiredLength == "Moyen")) ||
      currentLength == "Long"
    ) {
      // hair length is fitting desired length
      setIsLoading(true);
      await client
        .storeHairstylePreferences({
          current_hair: currentLength,
          length_sought: desiredLength,
          hairstyle_trend: hairstyleTrend,
          budget: budgetSliderRange,
        })
        .then((resp) => {
          //console.log(resp.data);
          showSnackbar(
            "success",
            "Les préférences ont été actualisées avec succès"
          );
          /* Update user preference in local storage */
          const user = JSON.parse(getLocalStorage("user") as string);
          user.user_preferences.current_hair = currentLength;
          user.user_preferences.length_sought = desiredLength;
          user.user_preferences.hairstyle_trend = hairstyleTrend;
          user.user_preferences.budget = budgetSliderRange;
          setLocalStorage("user", JSON.stringify(user));
        })
        .catch((err) => {
          //console.log(err)
        })
        .finally(() => {
          setIsLoading(false);
        });
      fetchFilterPrefrences();
    } else
      [
        // show modal for explanation
        SetmodalLengthErr(true),
      ];
  };

  const updateSearchSalon = async () => {
    setIsLoading(true);
    await client
      .storeSalonPreferences({
        country: CountryDefault,
        hairdressing_at_home: HairdressingAtHome,
        postal_code: ZipCodeValue,
        search_area: zoneSliderRange,
        ratings: MinRating,
        max_ratings: MaxRating,
        availability: selectedItems,
      })
      .then((resp) => {
        showSnackbar("success", "Préférences mises à jour avec succès");
        /* Update user preference in local storage */
        const user = JSON.parse(getLocalStorage("user") as string);
        user.user_preferences.country = CountryDefault;
        user.user_preferences.hairdressing_at_home = HairdressingAtHome;
        user.user_preferences.postal_code = ZipCodeValue;
        user.user_preferences.search_area = zoneSliderRange;
        user.user_preferences.ratings = MinRating;
        user.user_preferences.max_ratings = MaxRating;
        user.user_preferences.availability = selectedItems;
        setLocalStorage("user", JSON.stringify(user));
      })
      .catch((err) => {
        //console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      });
    fetchFilterPrefrences();
  };

  const fetchFilterPrefrences = async () => {
    const resp = await client.getUserFilterPrefrences();

    if (resp && resp.data) {
      if (resp.data.current_hair) setCurrentLength(resp.data.current_hair);
      if (resp.data.length_sought) setDesiredLength(resp.data.length_sought);
      if (resp.data.hairstyle_trend)
        setHairstyleTrend(resp.data.hairstyle_trend);
      if (resp.data.budget)
        setBudgetSliderRange([resp.data.budget[0], resp.data.budget[1]]);
      if (resp.data.country) setCountry(resp.data.country);
      if (resp.data.hairdressing_at_home)
        setHairdressingAtHome(resp.data.hairdressing_at_home);
      if (resp.data.postal_code) setZipCodeValue(resp.data.postal_code);
      if (resp.data.search_area)
        setZoneSliderRange([
          resp.data.search_area[0],
          resp.data.search_area[1],
        ]);
      if (resp.data.ratings) setMinRating(resp.data.ratings);
      if (resp.data.max_ratings) setMaxRating(resp.data.max_ratings);
      if (resp.data.current_hair) SetAtHome(resp.data.availability || []);
      if (resp.data.haircut_filter == 1) setAreHaircutFiltersActive(true);
      if (resp.data.salon_filter == 1) setAreSalonFiltersActive(true);
    }
  };

  // Gère le clic sur l'icône pour activer/désactiver les filtres
  const toggleHaircutFilters = async () => {
    setIsLoading(true);
    await user_api.setHairStyleFilter({ is_enable: !areHaircutFiltersActive });
    let tempUserData = userData;
    tempUserData.user_preferences.haircut_filter =
      !areHaircutFiltersActive == true ? 1 : 0;
    setLocalStorage("user", JSON.stringify(tempUserData));
    setAreHaircutFiltersActive(!areHaircutFiltersActive);
    setIsLoading(false);
    // Ajoutez ici la logique pour activer/désactiver les filtres
  };
  // Gère le clic sur l'icône pour activer/désactiver les filtres
  const toggleSalonFilters = async () => {
    setIsLoading(true);
    await user_api.setSalonFilter({ is_enable: !areSalonFiltersActive });
    let tempUserData = userData;
    tempUserData.user_preferences.salon_filter =
      !areSalonFiltersActive == true ? 1 : 0;
    setLocalStorage("user", JSON.stringify(tempUserData));
    setAreSalonFiltersActive(!areSalonFiltersActive);
    setIsLoading(false);
    // Ajoutez ici la logique pour activer/désactiver les filtres
  };

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <LogoCircleFixRight />
      </div>
      {modalLengthErr && (
        <BaseModal
          close={() => {
            SetmodalLengthErr(false);
          }}
        >
          <div className="text-center">
            <div className="text-xl py-10">
              <strong className="pb-10">
                La longueur de vos cheveux et la longueur recherchée ne sont pas
                compatibles
              </strong>
            </div>
            <p className="text-xl">
              Veuillez re-paramétrer vos filtres correctement.
            </p>
            <p className="text-xl">
              {" "}
              Exemple: si vous avez des cheveux courts, vous ne pouvez qu'entrer
              une longueur recherchée courtes
            </p>
          </div>
        </BaseModal>
      )}
      <div className="mt-14 mb-15 px-5 sm:px-10 ">
        <div className="flex flex-row items-center justify-center">
          {/* Info icon  */}
          <div className="pr-4">
            <p className="text-black font-medium text-3xl text-center">
              Paramétrage des filtres
            </p>
          </div>
          <InfoButton
            title_1={"Filtres"}
            content_1={
              "Cette page contient vos filtres, qui seront utilisés lors de vos recherches de coiffure."
            }
            onOpenModal={undefined}
          />
        </div>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-10 2xl:gap-20 mt-10">
          <div className="w-full lg:w-auto flex flex-col items-center justify-center gap-6">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => onSelectTab(index)}
                  className={`flex items-center justify-center w-full lg:w-80 xl:w-96 h-16 bg-white rounded-2xl text-black shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] border cursor-pointer ${
                    selectedTab === index && "border-secondary"
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {selectedTab === 0 ? (
            <div className="relative z-10 w-full lg:w-[630px] mt-5 md:mt-0 rounded-3xl bg-white py-6 px-2 lg:px-10 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)] h-auto min-height-[500px]">
              {/* Header with title and toggle icon */}
              <div className="flex items-center justify-between ml-6 mb-8 pl-2 pr-2 ">
                <p className="text-black text-xl font-semibold mr-4">
                  Coiffure
                </p>
                <div
                  onClick={toggleHaircutFilters}
                  className="flex items-center cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${
                      areHaircutFiltersActive
                        ? ColorsThemeA.ohcVerticalGradient_A
                        : "border-[#767676]"
                    }`}
                  >
                    {areHaircutFiltersActive && <CheckedIcon />}
                  </div>
                  <p className="text-sm font-semibold ml-2">
                    Activer les filtres de coiffure
                  </p>
                </div>
              </div>

              {/* Content below is only visible if areHaircutFiltersActive is true */}
              {areHaircutFiltersActive && (
                <div>
                  {/* Line separator */}
                  <hr className="border-t border-gray-300 my-4 mb-12" />

                  {/* Column organization */}
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 lg:gap-6 justify-around">
                    {/* First Column */}
                    <div className="flex flex-col items-center">
                      {/* Dropdown for "cheveux actuelle" */}
                      <div className="flex items-center justify-center mb-2 mr-10 w-full">
                        {" "}
                        {/* Increased horizontal spacing */}
                        <p className="text-black text-sm mb-2 mr-10"></p>
                        <DropdownMenu
                          dropdownItems={WishLength.map((item) => item)}
                          fctToCallOnClick={handleCurrentLength}
                          selectId={currentLength}
                          menuName="cheveux actuelle"
                          parentClass="w-full"
                          backgroundColor="w-full"
                        />
                      </div>

                      {/* Dropdown for "Longueur recherchée" */}
                      <div className="flex items-center justify-center mb-2 mr-10 w-full">
                        {" "}
                        {/* Increased horizontal spacing */}
                        <p className="text-black text-sm mb-2 mr-10"></p>
                        <DropdownMenu
                          parentClass="w-full"
                          backgroundColor="w-full"
                          dropdownItems={WishLength.map((item) => item)}
                          fctToCallOnClick={handleLengthSought}
                          selectId={desiredLength}
                          menuName="Longueur recherchée"
                        />
                      </div>
                    </div>

                    {/* Second Column */}
                    <div className="flex flex-col items-center">
                      {/* Dropdown for "Tendance de la coiffure" */}
                      <div className="flex items-center justify-center mb-2 mr-10 w-full">
                        {" "}
                        {/* Increased horizontal spacing */}
                        <p className="text-black text-sm mb-2 mr-10"></p>
                        <DropdownMenu
                          parentClass="w-full"
                          backgroundColor="w-full"
                          dropdownItems={WishGender.map((item) => item)}
                          fctToCallOnClick={handleWishGender}
                          selectId={hairstyleTrend}
                          menuName="Tendance de la coiffure"
                        />
                      </div>

                      {/* Slider for budget */}
                      <div className="relative z-20 w-full pl-4 pr-3">
                        <CustomSlider
                          theme={ComponentTheme}
                          value={budgetSliderRange}
                          onChange={handleBudgetSliderChange}
                          min={0}
                          max={1000}
                          unit="€"
                          label="Budget" // Provide a label prop if your CustomSlider component expects it
                          valueLabelDisplay="auto"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Centered "Réinitialiser" button */}
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={resetAllValues_1}
                      className={`${Theme_A.button.medBlackColoredButton}`}
                    >
                      Réinitialiser
                    </button>
                    <button
                      onClick={updateHairStyleSearch}
                      className={`${Theme_A.button.mediumGradientButton} ml-3`}
                    >
                      Mise à jour
                    </button>
                  </div>

                  {/* TODO ADD POPULARITY FOR NEXT RELEASE 
                                    <p className='text-black text-lg mb-4 font-semibold mt-4'>Popularit&eacute;</p>
                                    <div className='flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center justify-between'>
                                        <div>
                                            <p className='text-black text-sm'>Minimum</p>
                                            <div className='flex items-center gap-4'>
                                                <StarRatings
                                                    rating={3.5}
                                                    starRatedColor="#FEDF10"
                                                    starSpacing="4px"
                                                    starDimension="15px"
                                                    numberOfStars={5}
                                                    name="rating"
                                                />
                                                <p className='text-black text-sm'>3.5 / 5</p>
                                            </div>
                                        </div>
                                        <div className='mt-5 sm:mt-0 lg:mt-5 xl:mt-0'>
                                            <p className='text-black text-sm'>Maximum</p>
                                            <div className='flex items-center gap-4'>
                                                <StarRatings
                                                    rating={4.5}
                                                    starRatedColor="#FEDF10"
                                                    starSpacing="4px"
                                                    starDimension="15px"
                                                    numberOfStars={5}
                                                    name="rating"
                                                />
                                                <p className='text-black text-sm'>4.5 / 5</p>
                                            </div>
                                        </div>
                                    </div>
                                    */}
                </div>
              )}
            </div>
          ) : (
            /* ********************************************************************************************************************************************************************************** */

            /* SECOND PART - RECHERCHE SALON FILTER */
            <div className="relative z-10 w-full lg:w-[630px] mt-5 md:mt-0 rounded-3xl bg-white py-6 px- sm:px-10 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)] h-auto min-height-[500px]">
              {/* Header with title and toggle icon */}
              <div className="flex items-center justify-between ml-6 mb-8 pl-2 pr-2 ">
                <p className="text-black text-xl font-semibold mr-4">
                  Recherche de Salon
                </p>
                <div
                  onClick={toggleSalonFilters}
                  className="flex items-center cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${
                      areSalonFiltersActive
                        ? ColorsThemeA.ohcVerticalGradient_A
                        : "border-[#767676]"
                    }`}
                  >
                    {areSalonFiltersActive && <CheckedIcon />}
                  </div>
                  <p className="text-sm font-semibold ml-2">
                    Activer les filtres de salon
                  </p>
                </div>
              </div>

              {/* Content below is only visible if areHaircutFiltersActive is true */}
              {areSalonFiltersActive && (
                <div>
                  {/* Line separator */}
                  <hr className="border-t border-gray-300 my-4 mb-8" />

                  {/* Title of the Section "Localisation" */}
                  <p className="text-black text-lg mb-8 font-semibold pl-2 pr-2">
                    Localisation
                  </p>

                  {/* Column organization */}
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-6 md:gap-10 lg:gap-6 xl:gap-10">
                    {/* Dropdown for "Country */}
                    <div className="flex items-center justify-center md:mb-2 md:mr-12 pl-2 pr-2 ">
                      <p className="text-black text-sm"></p>
                      <DropdownMenu
                        parentClass="w-full text-center"
                        backgroundColor="w-full"
                        dropdownItems={EUCountriesList()}
                        menuName="Pays"
                        fctToCallOnClick={handleNewSetCountry}
                        labelId="Pays top-2"
                        selectId={CountryDefault}
                        defaultSelected={CountryDefault} // Pass the default value as a prop
                      />
                    </div>
                    <div>
                      <p className="text-black text-sm mb-2 pl-2 pr-2">
                        Coiffure à domicile{" "}
                      </p>
                      <div
                        onClick={() =>
                          setHairdressingAtHome(!HairdressingAtHome)
                        }
                        className="flex items-center justify-center gap-3 mt-4 cursor-pointer"
                      >
                        <div
                          className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${
                            HairdressingAtHome
                              ? ColorsThemeA.ohcVerticalGradient_A
                              : "border-[#767676]"
                          }`}
                        >
                          {HairdressingAtHome && (
                            <CheckedIcon width="15" height="10" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-24 lg:flex-col xl:flex-row lg:items-start xl:items-center lg:gap-5 xl:gap-24 mt-6 sm:mt-3">
                    <div className="w-46 pl-2 pr-2">
                      <CustomInput
                        id="PostCode"
                        label="Code postal"
                        value={ZipCodeValue}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Use regular expression to allow only up to 5 numeric characters
                          const numericValue = inputValue
                            .replace(/[^0-9]/g, "")
                            .slice(0, 5);
                          setZipCodeValue(numericValue);
                        }}
                        type="number"
                        isZipCode={true}
                      />
                    </div>

                    {/* Slider for Around Address Searching circle */}
                    <div className="relative z-20 w-full pl-4 pr-2">
                      <CustomSlider
                        theme={ComponentTheme}
                        value={zoneSliderRange}
                        onChange={handleZoneSliderChange}
                        min={0}
                        max={30}
                        unit="km"
                        label="Zone de recherche" // Provide a label prop if your CustomSlider component expects it
                        valueLabelDisplay="auto"
                      />
                    </div>
                  </div>

                  {/* TODO ADD GEOLOCALISATION FUNCTIONALITY
                                    <div>
                                        <p className="text-black text-sm mb-2">Utiliser la Geolocalisation</p>
                                        <div onClick={() => checkboxClickHandler('Geolocalisation')} className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded ${selectedItems.includes('Geolocalisation')
                                            ? ColorsThemeA.ohcVerticalGradient_A
                                            : "bg-[#D6D6D6]"
                                            }`}>
                                            <CheckedIcon />
                                        </div>
                                    </div>
                                        */}

                  <div className="border-y border-[#D8D8D8] py-4 mt-6">
                    {/* Title of the Section "Classement" */}
                    <div>
                      <p className="text-black text-lg mt-4 mb-8 font-semibold pr-2 pl-2">
                        Note du salon
                      </p>
                      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center justify-between">
                        <div>
                          <p className="text-black text-sm pl-2 pr-2">
                            Minimum
                          </p>
                          <div className="flex items-center gap-4 pl-2 pr-2">
                            <StarRatings
                              rating={MinRating}
                              starRatedColor="#FEDF10"
                              starSpacing="4px"
                              starDimension="15px"
                              numberOfStars={5}
                              name="MinRating"
                              changeRating={handleMinRatingChange} // Pass the function to update the rating value
                            />
                            <p className="text-black text-sm">
                              {MinRating} / 5
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-0 lg:mt-5 xl:mt-0">
                          <p className="text-black text-sm pl-2 pr-2">
                            Maximum
                          </p>
                          <div className="flex items-center gap-4 pl-2 pr-2">
                            <StarRatings
                              rating={MaxRating}
                              starRatedColor="#FEDF10"
                              starSpacing="4px"
                              starDimension="15px"
                              numberOfStars={5}
                              name="MinRating"
                              changeRating={handleMaxRatingChange} // Pass the function to update the rating value
                            />
                            <p className="text-black text-sm">
                              {MaxRating} / 5
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title of the Section "Disponibilite" */}
                  <div>
                    <p className="text-black text-lg mb-8 mt-6 font-semibold pl-2 pr-2">
                      Disponibilit&eacute;
                    </p>

                    {/* Check box pour choisir les jours de préférences */}
                    <div className="flex justify-between pl-2 pr-2">
                      {daysOfWeek.map((day) => (
                        <div
                          key={day}
                          className="flex flex-col items-center justify-center"
                        >
                          <p className="text-black text-sm mb-2">{day}</p>
                          <div
                            onClick={() => checkboxClickHandler(day)}
                            className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded hover:scale-125 transition duration-300 ${
                              selectedItems && selectedItems.includes(day)
                                ? ColorsThemeA.ohcVerticalGradient_A
                                : "bg-[#D6D6D6]"
                            }`}
                          >
                            <CheckedIcon />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* TODO ADD PRODUIT WHEN SHOP FUNCTIONALITY IS RELEASED
                                <div>  
                                    <p className='text-black text-lg mb-4 border-t mt-5 border-[#D8D8D8] pt-4'>Produits</p>
                                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-24 lg:flex-col xl:flex-row lg:items-start xl:items-center lg:gap-5 xl:gap-24'>
                                        <div>
                                            <p className="text-black text-sm mb-2">Utilisation de produits particuliers</p>
                                            <div onClick={() => checkboxClickHandler('Utilisation de produits particuliers')} className={`w-6 h-6 flex items-center justify-center cursor-pointer border border-black rounded ${selectedItems.includes('Utilisation de produits particuliers') ? 'bg-black' : 'bg-white'}`}>
                                                <TickIcon />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-black text-sm mb-2">Particularité du produit</p>
                                            <BaseDropdown dropdownItems={['Choix multiples']} width='w-52' borderClr='border-secondary' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-24 lg:flex-col xl:flex-row lg:items-start xl:items-center lg:gap-5 xl:gap-24 mt-3'>
                                        <div className='w-52' />
                                        <div>
                                            <p className="text-black text-sm mb-2">Marques</p>
                                            <BaseDropdown dropdownItems={['Choix multiples']} width='w-52' borderClr='border-secondary' />
                                        </div>
                                    </div>
                                </div>
                                */}
                  </div>
                  <div>
                    <div className="flex justify-center mt-12">
                      <button
                        onClick={resetAllValues_2}
                        className={`${Theme_A.button.medBlackColoredButton}`}
                      >
                        Réinitialiser
                      </button>
                      <button
                        onClick={updateSearchSalon}
                        className={`${Theme_A.button.mediumGradientButton} ml-3`}
                      >
                        Mise à jour
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Filters;
