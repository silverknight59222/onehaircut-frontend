"use client";
import React, { useState, useEffect } from "react";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import CustomCard from "@/components/UI/CustomCard";
import InfoButton from "@/components/UI/InfoButton";
import { user_api } from "@/api/clientSide";
import useSnackbar from "@/hooks/useSnackbar";
import { setLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";

// IMAGE PAR DEFAUT SI PAS DE COIFFURE SELECTIONNEE
const DefaultProfilFace = "/assets/DefaultPictures/Profil.png"; // L'URL de l'image
const DefaultName = "Cabine vide";

const ProcessedPictures = () => {
  const [fetchedImages, setFetchedImages] = useState<any>([]);
  const [fetchToday, setFetchToday] = useState(0);
  const showSnackbar = useSnackbar();
  const router = useRouter(); // Next.js Router for navigation

  const fetchUserPortraits = async () => {
    let resp = await user_api.getLatestPreviewImage();
    // console.log(resp.data.today_fetched)
    setFetchToday(resp.data.today_fetched);
    setFetchedImages(resp.data.data);
  };
  const deleteFetchedImage = async (index) => {
    let resp = await user_api.deletePreviewImage(fetchedImages[index].id);
    if (resp.data.status == 200) {
      showSnackbar("success", "Generated Image Deleted");
    } else {
      showSnackbar("error", "There is problem when deleting image");
    }
    fetchUserPortraits();
  };
  const selectHairstyle = (index) => {
    let selectedHaircut = {
      id: fetchedImages[index].haircut_id,
      name: fetchedImages[index].name,
      image: fetchedImages[index].image,
    };
    setLocalStorage(
      "haircut",
      JSON.stringify({
        id: selectedHaircut.id,
        name: selectedHaircut.name,
        image: selectedHaircut.image,
      })
    );
    router.push(`/services`);
  };
  useEffect(() => {
    console.log(fetchToday);
  }, [fetchToday]);

  useEffect(() => {
    fetchUserPortraits();
  }, []);
  return (
    <div>
      <div className="fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <div className="mt-14 mb-5 px-6 w-full">
        <div className="flex flex-row items-center justify-center pb-10">
          <div className="pr-4">
            <p className="text-black font-medium text-3xl text-center">
              Cabines d'essayage
            </p>
          </div>
          {/* {Fetched Today / Limit} TODO */}
          <p className="text-black font-medium text-2xl mr-4">
            {fetchToday} / 5
          </p>

          {/* Info icon  */}
          <InfoButton
            title_1={"Cabine"}
            content_1={
              "Cette page contient les photos comportant votre portrait et une coiffure demandée. Une fois la génération finie, elle sera visible sur cette page. \n Un maximum de 5 photos peut être générer par jour."
            }
            content_2={
              "Il vous pouvez sélectionner ensuite cette coiffure directement. \n si l'image générée ne vous plaît pas ou bien que vous avez changé vos images de profil, \n vous pouvez supprimer et faire une nouvelle tentative."
            }
            onOpenModal={undefined}
          />
        </div>
        {/* Première ligne de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4  justify-center">
          {fetchedImages.map((fetched_image, index) => {
            return (
              <div key={index} className="flex-1">
                <CustomCard
                  title={fetched_image.name}
                  imageUrl={fetched_image.url} // Utilisez l'URL de l'image ici
                  initialProgress={50}
                  haircutUrl={fetched_image.image}
                  passed_interval={fetched_image.passed_interval}
                  deleteCB={() => deleteFetchedImage(index)}
                  selectCB={() => selectHairstyle(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessedPictures;
