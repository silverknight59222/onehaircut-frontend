import 'tailwindcss/tailwind.css';
import { Theme_A } from '@/components/utilis/Themes';
import { LinearProgress } from '@mui/material';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import { useState } from 'react';
import { LogoIcon } from '../utilis/Icons';



// Définissez des types pour les paramètres
type CustomCardProps = {
  title: string;
  imageUrl: string;
  haircutUrl: string;
  initialProgress: number;
  passed_interval: number,
  deleteCB: Function,
  selectCB: Function,
};



// Utilisez les types dans la fonction du composant
const CustomCard: React.FC<CustomCardProps> = ({
  title,
  imageUrl,
  initialProgress,
  haircutUrl,
  passed_interval,
  deleteCB,
  selectCB
}) => {
  // État local pour stocker la valeur de la progression de la barre
  const [progress, setProgress] = useState(0);
  const [isHaircutShow, setIsHaircutShow] = useState(false);

  const getProgress = async () => {
    let progress = (passed_interval / 5) * 100;
    setProgress(progress)
  }

  const changeCardImage = () => {
    setIsHaircutShow(!isHaircutShow)
  }

  React.useEffect(() => {
    setIsHaircutShow(false)
  },[])

  // Effet secondaire qui met à jour la progression de la barre

  //TODO METTRE A JOUR AVEC LA VALEUR REELLE DE PROGRESSION
  React.useEffect(() => {
    // Crée un intervalle qui met à jour la progression toutes les 500 millisecondes
    getProgress()
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          // Réinitialise la progression à 0 une fois qu'elle atteint 100
          if (oldProgress === 100) {
            return 100.00;
          }
          // Incrémente la progression d'une valeur aléatoire entre 0 et 10
          const diff = Math.random() * 10;
          return Math.min((oldProgress + diff / 600), 100);
        });
      }, 500);

      // Nettoie l'intervalle lorsque le composant est démonté
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  // Formate le taux de progression pour qu'il n'y ait pas de chiffres après la virgule
  const formattedProgress = Math.round(progress + 0.1);

  return (
    <div className="flex justify-center items-center">
      <div className="shadow-sm shadow-stone-600 p-2 border-2 border-stone-300 rounded-xl bg-white">
        {/* TITRE */}
        <p className="text-lg sm:text-lg font-semibold mb-2 ml-2">
          <small>{title}</small>
        </p>

        {/* IMAGE */}
        <div 
          className="mb-2 justify-center items-center border-2 border-stone-200 rounded-xl min-h-[16rem] min-w-[8rem] max-w-[16rem] max-h-[16rem]"
          onClick={changeCardImage}    
        >
          {imageUrl ? (
            <div className=" flex items-center justify-center overflow-hidden rounded-xl m-1 ">
              <img
                src={(isHaircutShow) ? haircutUrl.includes('http') ? haircutUrl : `https://api.onehaircut.com${haircutUrl}` : imageUrl}
                alt=""
                className="h-auto w-full object-contain" // Assurez-vous que cette classe est présente
              />
            </div>
          ) : (
            <div className="p-4 max-w-sm w-full mx-auto justify-center items-center">
              <div className={`${isHaircutShow ? 'animate-pulse' : ''} flex space-x-4`}>
                {
                  isHaircutShow ? 
                  <LogoIcon />
                  :
                  <img
                    src={haircutUrl.includes('http') ? haircutUrl : `https://api.onehaircut.com${haircutUrl}`}
                    alt=""
                    className="h-auto w-full object-contain" // Assurez-vous que cette classe est présente
                  />
                }
              </div>
            </div>
          )}

        </div>



        {/*PROGRESS BAR*/}
        <div className="p-1 w-62"> {/* Ajustez la largeur en conséquence */}
          <div className="flex justify-center">
            {/* Appliquez une condition pour changer la couleur en fonction de la progression */}
            <LinearProgress
              variant="determinate"
              value={progress}
              color={progress >= 100 ? 'success' : 'warning'} // Changez 'warning' par 'success' lorsque progress est >= 100
              className={`rounded-full h-1 w-full mr-4 ml-4 ${progress >= 100 ? 'bg-green-300' : ''}`} // Vous pouvez également appliquer des classes conditionnelles pour le style
            />
          </div>
          {/* Label affichant le taux de progression sans chiffres après la virgule et centré */}
          <Typography
            variant="body2"
            sx={{ mt: 1, textAlign: 'center', fontSize: '0.7rem' }} // Vous pouvez ajuster la taille de la police ici
          >{`${formattedProgress}%`}</Typography>
        </div>

        {/* BOUTONS */}
        <div className="flex justify-center space-x-4 p-1"> {/* Ajoutez la classe "justify-center" ici */}
          {/* Bouton de suppression */}
          <button className={`${Theme_A.button.medBlackColoredButton}`} onClick={(index) => deleteCB(index)}>
            Supprimer
          </button>
          {/* Bouton de sélection */}
          <button className={`${Theme_A.button.mediumGradientButton}`} onClick={(index) => selectCB(index)}>
            Sélectionner
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
