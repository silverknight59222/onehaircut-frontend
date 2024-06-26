"use client";
import { Theme_A } from "@/components/utilis/Themes";
import React, { useEffect, useState } from "react";
import DropdownMenu from "@/components/UI/DropDownMenu";
import CustomInput from "@/components/UI/CustomInput";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import { client } from "@/api/clientSide";
import useSnackbar from "@/hooks/useSnackbar";

const ContactUs_Client = () => {
  // For Dropdown lists
  const contactType = [
    "Signaler un problème",
    "Feedback",
    "Suggestion d'amélioration",
    "Déclarer un litige",
  ];

  const issueReason = [
    "Je n'ai pas pu me rendre au rendez-vous",
    "Le salon était indisponible",
    "Le professionnel n'est pas venu à domicile",
    "Autre",
  ];

  const [SelectedContactType, setSelectedContactType] = useState<string>("");
  // For input text field
  const [multilineText, setMultilineText] = useState("");
  const [title, setTitle] = useState("");
  const [wordCount, setWordCount] = useState(0); // État pour suivre le nombre de mots
  const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { loadingView } = userLoader();

  const handleMultilineChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // Spécifiez le type de l'événement
    const text = event.target.value;
    setMultilineText(text);

    // Compter les mots dans le texte
    const words = text.trim().split(/\s+/);
    setWordCount(words.length);

    // Limiter le nombre de mots à 50
    if (words.length > 50) {
      const limitedText = words.slice(0, 50).join(" ");
      setMultilineText(limitedText);
    }
  };

  // Pour le second Dropdown
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const [secondDropdownOptions, setSeconDropdownOptions] = useState<string[]>(
    []
  );
  // const secondDropdownOptions = [
  //     "Booking number 1",
  //     "OHC25122024-0000001",
  //     // Ajoutez d'autres options selon les besoins
  // ];
  const [selectedSecondOption, setSelectedSecondOption] = useState("");

  const getBookingsList = async () => {
    let resp = await client.getBookingList();
    let list_booking = resp.data.map((item) => item.booking_number);
    console.log(list_booking);
    if (list_booking.length > 0) {
      setSeconDropdownOptions(list_booking);
    } else {
      setSeconDropdownOptions([""]);
    }
  };
  // Mettre à jour l'affichage du second dropdown en fonction de la sélection
  useEffect(() => {
    if (SelectedContactType === "Déclarer un litige") {
      setShowSecondDropdown(true);
      getBookingsList();
    } else {
      setShowSecondDropdown(false);
      setSelectedSecondOption(""); // Réinitialiser la sélection du second dropdown
    }
  }, [SelectedContactType]);

  const onSend = async () => {
    let data: any = {};
    data.title = "Client - " + title; //specify that it comes from client for email filtering
    data.message = multilineText;
    data.feedback_type = SelectedContactType;
    if (selectedSecondOption != "") {
      data.message += "\nBooking Number : " + selectedSecondOption;
    }
    setIsLoading(true);
    await dashboard.sendFeedback(data).then((res) => {
      if (res.data.status == 200) {
        showSnackbar("success", res.data.message);
      }
    });
    setTitle("");
    setMultilineText("");
    setSelectedContactType("");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && loadingView()}
      {/* Main card (la vignette) */}
      <div
        className="mt-14 mb-5 px-6 bg-white w-full lg:w-auto lg:max-w-4xl mx-auto p-6 rounded-xl shadow-lg relative"
        style={{ zIndex: 1 }}
      >
        <div className="flex flex-col items-center justify-center mt-10 mb-5 px-6 sm:px-10 md:px-20">
          {/* Title */}
          <p className="text-black font-medium text-3xl text-center mb-8">
            Formulaire de contact
          </p>

          <p className="text-stone-400 italic font-normal text-md text-center my-12">
            Vous voulez nous faire savoir quelque chose, rapporter un problème
            ou même nous encourager, c'est ici que ça se passe!
          </p>

          {/* Contact subject */}
          <DropdownMenu
            dropdownItems={contactType}
            fctToCallOnClick={setSelectedContactType}
            menuName="Sujet"
            selectId={SelectedContactType}
          />
          {/* Separation line with subject color */}
          {SelectedContactType !== "" && (
            <div className="separation justify-center items-center">
              <div
                style={{
                  width: "40%",
                  height: "4px",
                  backgroundColor:
                    SelectedContactType === "Signaler un problème"
                      ? "#e84f4a"
                      : SelectedContactType === "Feedback"
                        ? "#58bf54"
                        : SelectedContactType === "Suggestion d'amélioration"
                          ? "#4a91e8"
                          : "#ccc", // Separation line color
                  margin: "2px auto", // Margin above and below the line and horizontal centering
                  borderRadius: "5px", // Adds rounded border to round the line
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Ajoute une ombre
                }}
              ></div>

              <div className="flex flex-row items-center justify-center mt-8 space-x-4">
                {/* Second Dropdown displayed conditionally */}
                {showSecondDropdown && (
                  <DropdownMenu
                    dropdownItems={secondDropdownOptions}
                    fctToCallOnClick={(selectedItem) =>
                      setSelectedSecondOption(selectedItem)
                    }
                    menuName="Numéro de réservation"
                    selectId={selectedSecondOption}
                  />
                )}

                {showSecondDropdown && (
                  <DropdownMenu
                    dropdownItems={issueReason}
                    //fctToCallOnClick={}
                    menuName="Raison"
                  //selectId={}
                  />
                )}
              </div>


              <div className="flex-grow mb-2 mt-4">
                <CustomInput
                  id="Title"
                  label="Donnez un titre à votre message"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* ZONE DE TEXT */}
              <div className="flex flex-col items-center justify-center">
                <textarea
                  id="multilineInput"
                  value={multilineText}
                  onChange={handleMultilineChange}
                  className={`${Theme_A.fields.inputField2} shadow-inner shadow-stone-300`}
                  rows={8} // Specify the number of visible rows
                  cols={80} // Specify the number of visible columns
                />

                {/* Word count */}
                <p className="text-stone-400 font-normal text-sm text-center mt-2">
                  {wordCount} mot(s) saisi(s) sur un maximum de 50.
                </p>

                {/* Send button */}
                <button
                  onClick={() => onSend()}
                  disabled={multilineText === "" || title === ""} // Désactive le bouton si la zone de texte ou le titre sont vides
                  className={`rounded-xl mt-6 w-2/5 h-16 ${multilineText === "" || title === ""
                    ? Theme_A.button.medGreyColoredButton
                    : Theme_A.button.mediumGradientButton
                    }`}
                >
                  Envoyer
                </button>
              </div>

              {/* LogoCircleFixRight */}
              <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10 "></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContactUs_Client;
