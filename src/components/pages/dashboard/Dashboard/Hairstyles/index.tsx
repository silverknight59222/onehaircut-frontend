import React, { useEffect, useState } from "react";
import Footer from "@/components/UI/Footer";
import HairStyleList from "./HairStyleList";
import HairStylesModal from "./HairStylesModal";
import HairStyleListHeader from "./HairStyleListHeader";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import TourModal, { Steps } from "@/components/UI/TourModal";
import { salonApi } from "@/api/salonSide";
import userLoader from "@/hooks/useLoader";
import AudioPlayerForTour from "@/components/UI/PlayerForTour";
// For update commit
const hairStyleSelectEvent = {
  on: () => { }
}

const onFilterSelect = {
  on: () => { }
}

const resetStyleForm = {
  on: () => { }
}

const reloadList = {
  on: () => { }
}

const selectAll = {
  on: () => { }
}

const listCountShow = {
  on: () => { }
}

const params = {
  ethnicityFilters: [] as string[],
  genderFilters: "",
  lengthFilters: [] as string[],
  search: "",
}

const Hairstyles = () => {
  const [activeMenu, setActiveMenu] = useState<string>("new");
  const [finalSelectedItems, setFinalSelectedItems] = useState([]);
  const [isSelectedDelete, setIsSelectedDelete] = useState(false);
  const [baseGender, setBaseGender] = useState("");
  const salon = getLocalStorage("hair_salon")
  const salonData = salon ? JSON.parse(salon) : null;
  const [pageDone, setPageDone] = useState<String[]>(['salon_hairstyles']);
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    params.genderFilters = "";
    if (salonData.type.includes("men") || salonData.type.includes("man")) {
      params.genderFilters = "Men";
    }
    if (salonData.type.includes("women") || salonData.type.includes("woman")) {
      params.genderFilters = "Women";
    }
    const pages_done = getLocalStorage('pages_done')
    setPageDone(pages_done ? JSON.parse(pages_done) : [])
  }, [])

  useEffect(() => {
    console.log(activeMenu)
    console.log("Final Selected Items : " + finalSelectedItems)
    setFinalSelectedItems([])
  }, [activeMenu])

  // ------------------------------------------------------------------
  // For Tour
  const tourSteps: Steps[] = [
    {
      selector: '',
      content:
        <div key="/assets/audio/tour/salon/Coiffures_men_1.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/salon/Coiffures_men_1.mp3" />
          <p>Dans cette page, vous pouvez indiquer les coiffures que vous souhaitez proposer à vos clients.</p>
        </div>,
    },
    {
      selector: '.hairStyles_list',
      content:
        <div key="/assets/audio/tour/salon/Coiffures_men_2.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/salon/Coiffures_men_2.mp3" />
          <p>Sélectionner une ou plusieurs coiffures à ajouter.</p>
        </div>,
    },
    {
      selector: '.hairStyles_modal',
      content:
        <div key="/assets/audio/tour/salon/Coiffures_men_3.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/salon/Coiffures_men_3.mp3" />
          <p>Entrer ensuite les détails qui seront liés à ces coiffures.</p>
        </div>,
    },
    {
      selector: '.hairStyles_filter',
      content:
        <div key="/assets/audio/tour/salon/Coiffures_men_4.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/salon/Coiffures_men_4.mp3" />
          <p>Aider vous des filtres.</p>
        </div>,
    },
  ];


  const closeTour = async () => {
    // You may want to store in local storage or state that the user has completed the tour
    setIsLoading(true)
    if (!pageDone.includes('salon_hairstyles')) {
      let resp = await salonApi.assignStepDone({ page: 'salon_hairstyles' });

      if (resp.data?.pages_done) {
        setLocalStorage('pages_done', JSON.stringify(resp.data.pages_done));
      }
      setPageDone((prevArray) => [...prevArray, 'salon_hairstyles'])
    }
    setIsLoading(false);
  };
  // ------------------------------------------------------------------

  return (
    <div>
      {isLoading && loadingView()}
      {/* For explaining the website */}
      <TourModal steps={tourSteps} onRequestClose={closeTour} doneTour={pageDone.includes('salon_hairstyles')} />
      <div className="hairStyles_filter">
        <HairStyleListHeader onListCountShow={listCountShow} isd={isSelectedDelete} selectAllEvent={selectAll} params={params} onFilterSelect={onFilterSelect} setActiveMenu={setActiveMenu} activeMenu={activeMenu} setFinalItems={setFinalSelectedItems}></HairStyleListHeader>
      </div>
      <div className="flex flex-col md:flex-row gap-8">

        <div className="hairStyles_modal">
          <HairStylesModal hairStyleSelectEvent={hairStyleSelectEvent} setISD={setIsSelectedDelete} selectAllListener={selectAll} setFinalItems={setFinalSelectedItems} finalItems={finalSelectedItems} params={params} reloadListEvent={reloadList} onResetStyleForm={resetStyleForm} activeMenu={activeMenu}></HairStylesModal>
        </div>

        <div className="hairStyles_list">
          <HairStyleList listCountShowEvent={listCountShow} setISD={setIsSelectedDelete} selectAllListener={selectAll} onReloadListener={reloadList} resetStyleForm={resetStyleForm} onFilterSelect={onFilterSelect} hairStyleSelectEvent={hairStyleSelectEvent} activeMenu={activeMenu} setFinal={setFinalSelectedItems}></HairStyleList>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hairstyles;
