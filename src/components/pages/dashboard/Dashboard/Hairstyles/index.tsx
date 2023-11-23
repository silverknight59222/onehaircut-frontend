import React, { useEffect, useState } from "react";
import Footer from "@/components/UI/Footer";
import HairStyleList from "./HairStyleList";
import HairStylesModal from "./HairStylesModal";
import HairStyleListHeader from "./HairStyleListHeader";

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

const params = {
  ethnicityFilters: [] as string[],
  genderFilters: "",
  lengthFilters: [] as string[],
  search: "",
}

const Hairstyles = () => {
  const [activeMenu, setActiveMenu] = useState<string>("new");

  return (
    <div>
      <HairStyleListHeader selectAllEvent={selectAll} params={params} onFilterSelect={onFilterSelect} setActiveMenu={setActiveMenu} activeMenu={activeMenu} ></HairStyleListHeader>
      <div className="flex flex-col md:flex-row gap-8">
        <HairStylesModal params={params} reloadListEvent={reloadList} onResetStyleForm={resetStyleForm} hairStyleSelectEvent={hairStyleSelectEvent} activeMenu={activeMenu}></HairStylesModal>
        <HairStyleList selectAllListener={selectAll} onReloadListener={reloadList} resetStyleForm={resetStyleForm} onFilterSelect={onFilterSelect} hairStyleSelectEvent={hairStyleSelectEvent} activeMenu={activeMenu}></HairStyleList>
      </div>
      <Footer />
    </div>
  );
};

export default Hairstyles;
