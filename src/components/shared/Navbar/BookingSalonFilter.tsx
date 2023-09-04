import React, { useState } from "react";

const BooksalonFilter = () => {
  const [showDesktopVille, setShowDesktopVille] = useState(false);
  const [showDesktopMobile, setShowDesktopMobile] = useState(false);
  const [showDesktopBudget, setShowDesktopBudget] = useState(false);
  const [showDesktopName, setShowDesktopName] = useState(false);
  return (
    <>
      <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
        <p
          className={
            showDesktopVille ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"
          }
        >
          Tendances
        </p>
      </div>
      <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
        <p
          className={
            showDesktopMobile ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"
          }
        >
          Mixte
        </p>
      </div>
      <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
        <p
          className={
            showDesktopBudget ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"
          }
        >
          Toutes couleurs
        </p>
      </div>
      <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
        <p
          className={
            showDesktopName ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"
          }
        >
          Nom coiffure
        </p>
      </div>
    </>
  );
};

export default BooksalonFilter;
