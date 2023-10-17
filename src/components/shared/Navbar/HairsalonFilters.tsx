import { SearcIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
interface HairsalonFilterProps {
  isWelcomePage?: boolean,
  onSearch?: (arg0: string) => void,
  onServiceSearch?: (arg0: string) => void,
  isSaloonPage?: boolean,
}
const HairsalonFilter = ({ isWelcomePage, isSaloonPage, onSearch, onServiceSearch }: HairsalonFilterProps) => {
  const [showDesktopVille, setShowDesktopVille] = useState(false);
  const [showDesktopMobile, setShowDesktopMobile] = useState(false);
  const [showDesktopBudget, setShowDesktopBudget] = useState(false);
  const [showDesktopName, setShowDesktopName] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Use useEffect to watch for changes in searchQuery and trigger the search function
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  const handleSearch = () => {
    console.log(`--- ${searchQuery}`)
  };
  return (
    <>
      {/* <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
        <p
          className={
            showDesktopVille ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"
          }
        >
          Ville
        </p>
      </div> */}

      {/* <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
        <p
          className={
            showDesktopMobile ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"
          }
        >
          Mobile
        </p>
      </div> */}
      {/* <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
        <p
          className={
            showDesktopBudget ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"
          }
        >
          Budget
        </p>
      </div> */}
      {/* <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
        <p
          className={
            showDesktopName ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"
          }
        >
          Nom salon
        </p>
      </div> */}
    </>
  );
};

export default HairsalonFilter;
