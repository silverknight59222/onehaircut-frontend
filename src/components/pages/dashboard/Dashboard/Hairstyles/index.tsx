import React, { useEffect, useState } from "react";
import Footer from "@/components/UI/Footer";
import HairStyleList from "./HairStyleList";
import HairStylesModal from "./HairStylesModal";
import HairStyleListHeader from "./HairStyleListHeader";
import { getLocalStorage } from "@/api/storage";
import TourModal, { Steps } from "@/components/UI/TourModal";
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

  useEffect(() => {
    params.genderFilters = "";
    if (salonData.type.includes("men") || salonData.type.includes("man")) {
      params.genderFilters = "Men";
    }
    if (salonData.type.includes("women") || salonData.type.includes("woman")) {
      params.genderFilters = "Women";
    }
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
      content: 'Dans cette page, vous pouvez indiquer les coiffures que vous souhaitez proposer à vos clients.',
    },
    {
      selector: '.hairStyles_list',
      content: 'Sélectionner une ou plusieurs coiffures à ajouter.',
    },
    {
      selector: '.hairStyles_modal',
      content: 'Entrer ensuite les détails qui seront liés à ces coiffures.',
    },
    {
      selector: '.hairStyles_filter',
      content: 'Aider vous des filtres. ',
    },
  ];

  const closeTour = () => {
    // You may want to store in local storage or state that the user has completed the tour
  };
  // ------------------------------------------------------------------

  return (
    <div>
      {/* For explaining the website */}
      <TourModal steps={tourSteps} onRequestClose={closeTour} />
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
