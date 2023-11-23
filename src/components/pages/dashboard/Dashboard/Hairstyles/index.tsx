import React, { useEffect, useState } from "react";
import Footer from "@/components/UI/Footer";
import HairStyleList from "./HairStyleList";
import HairStylesModal from "./HairStylesModal";
import HairStyleListHeader from "./HairStyleListHeader";

const hairStyleSelectEvent = {
  on: null
}

const onFilterSelect = {
  on: null
}

const resetStyleForm = {
  on: null
}

const reloadList = {
  on: null
}

const Hairstyles = () => {
  const [activeMenu, setActiveMenu] = useState<string>("new");

  return (
    <div>
      <HairStyleListHeader onFilterSelect={onFilterSelect} setActiveMenu={setActiveMenu} activeMenu={activeMenu} ></HairStyleListHeader>
      <div className="flex flex-col md:flex-row gap-8">
        <HairStylesModal reloadListEvent={reloadList} onResetStyleForm={resetStyleForm} hairStyleSelectEvent={hairStyleSelectEvent} activeMenu={activeMenu}></HairStylesModal>
        <HairStyleList onReloadListener={reloadList} resetStyleForm={resetStyleForm} onFilterSelect={onFilterSelect} hairStyleSelectEvent={hairStyleSelectEvent} activeMenu={activeMenu}></HairStyleList>
      </div>
      <Footer />
    </div>
  );
};

export default Hairstyles;
