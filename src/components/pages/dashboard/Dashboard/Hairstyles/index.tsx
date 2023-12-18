import React, { useEffect, useState } from "react";
import Footer from "@/components/UI/Footer";
import HairStyleList from "./HairStyleList";
import HairStylesModal from "./HairStylesModal";
import HairStyleListHeader from "./HairStyleListHeader";
import { getLocalStorage } from "@/api/storage";

const hairStyleSelectEvent = {
  on: () => {}
}

const onFilterSelect = {
  on: () => {}
}

const resetStyleForm = {
  on: () => {}
}

const reloadList = {
  on: () => {}
}

const selectAll = {
  on: () => {}
}

const listCountShow = {
  on: () => {}
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
    if(salonData.type.includes("men")){
      params.genderFilters = "Men";
    }
    if(salonData.type.includes("women")){
      params.genderFilters = "Women";
    }
  },[])
  
  return (
    <div>
      <HairStyleListHeader onListCountShow={listCountShow} isd={isSelectedDelete} selectAllEvent={selectAll} params={params} onFilterSelect={onFilterSelect} setActiveMenu={setActiveMenu} activeMenu={activeMenu} ></HairStyleListHeader>
      <div className="flex flex-col md:flex-row gap-8">
        <HairStylesModal hairStyleSelectEvent={hairStyleSelectEvent} setISD={setIsSelectedDelete} selectAllListener={selectAll} setFinalItems={setFinalSelectedItems} finalItems={finalSelectedItems} params={params} reloadListEvent={reloadList} onResetStyleForm={resetStyleForm} activeMenu={activeMenu}></HairStylesModal>
        <HairStyleList listCountShowEvent={listCountShow} setISD={setIsSelectedDelete} selectAllListener={selectAll} onReloadListener={reloadList} resetStyleForm={resetStyleForm} onFilterSelect={onFilterSelect} hairStyleSelectEvent={hairStyleSelectEvent} activeMenu={activeMenu}  setFinal={setFinalSelectedItems}></HairStyleList>
      </div>
      <Footer />
    </div>
  );
};

export default Hairstyles;
