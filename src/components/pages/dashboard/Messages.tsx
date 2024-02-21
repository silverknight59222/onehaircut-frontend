"use client";
import { dashboard } from "@/api/dashboard";
import {
  getLocalStorage,
  setLocalStorage,
} from "@/api/storage";
import {
  LogoCircleFixRight,
  ChatSendIcon,
  DeleteIcon,
} from "@/components/utilis/Icons";
import React, { useEffect, useState, useRef } from "react";
import userLoader from "@/hooks/useLoader";
import { Chat, ClientChat } from "@/types";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";
import CustomInput from "@/components/UI/CustomInput";
import TourModal, { Steps } from "@/components/UI/TourModal";
import { salonApi } from "@/api/salonSide";
import BaseModal from "@/components/UI/BaseModal";
import { toast } from "react-toastify";
import AudioPlayerForTour from "@/components/UI/PlayerForTour";
import { useNotification } from "@/hooks/useNotification";

const Messages = () => {
  const [clients, setClients] = useState<ClientChat[]>([]);
  const user = getLocalStorage("user");
  const userId = user ? Number(JSON.parse(user).id) : null;
  const salonId = user ? Number(JSON.parse(user).id) : null;
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState({
    client_id: 0,
    client: { name: "", front_profile: "" },
  });
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const [pageDone, setPageDone] = useState<String[]>(["salon_message"]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const {refetchSalonNotifications} = useNotification();

  const getClientsByProfessional = async () => {
    if (salonId) {
      setIsLoading(true);
      await dashboard
        .getClientsBySalon(salonId)
        .then((resp) => {
          setClients(resp.data.data);
        })
        .catch((err) => {
          //console.log(err)
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const getChat = async (client: ClientChat) => {
    if (salonId && client.client_id) {
      setSelectedChat({
        client_id: client.client_id,
        client: {
          name: client.client.name,
          front_profile: client.client.front_profile,
        },
      });
      setIsLoading(true);
      await dashboard
        .getChat(client.client_id, salonId)
        .then((resp) => {
          let data = {
            client_id: client.client_id,
            professional_id: salonId,
          };
          setChats(resp.data.data);
          dashboard.setChatRead(data);
          client.is_read = 1;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onSendMessage = async () => {
    if (salonId && selectedChat.client_id && message) {
      setIsLoading(true);
      const data = {
        client_id: selectedChat.client_id,
        professional_id: salonId,
        message: message,
        by: "professional",
      };
      await dashboard
        .sendMessage(data)
        .then(async (resp) => {
          setMessage("");

          await dashboard
            .getChat(selectedChat.client_id, salonId)
            .then((resp) => {
              setChats(resp.data.data);
            });
        })
        .catch((err) => {
          //console.log(err)
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Formatte une date en heures et minutes
  const formatDate = (date: string) => {
    const d = new Date(date);
    return {
      day: d.toLocaleDateString(),
      time: d.toLocaleTimeString(),
    };
  };

  useEffect(() => {
    getClientsByProfessional();
    const pages_done = getLocalStorage("pages_done");
    setPageDone(pages_done ? JSON.parse(pages_done) : []);
  }, []);

  // Pour envoyer un message en appuyant sur enter :
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSendMessage();
    }
  };

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    refetchSalonNotifications();
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const deleteChat = async () => {
    setIsLoading(true);
    try {
      await dashboard.deleteChat(selectedChat.client_id);
      setIsDeleteModal(false);
      setSelectedChat({
        client_id: 0,
        client: { name: "", front_profile: "" },
      });
      setChats([]);
      getClientsByProfessional();
    } catch (e) {
      toast.error("Error delete messaging!");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------------------------------
  // For Tour
  const tourContent_1 = (
    <div key="/assets/audio/tour/salon/Messages_men_1.mp3">
      <AudioPlayerForTour src="/assets/audio/tour/salon/Messages_men_1.mp3" />
      <p>Dans la partie de gauche, vous pouvez sélectionner un client.</p>
    </div>
  );

  const tourContent_2 = (
    <div key="/assets/audio/tour/salon/Messages_men_2.mp3">
      <AudioPlayerForTour src="/assets/audio/tour/salon/Messages_men_2.mp3" />
      <p>Vous trouverez ici la discussion avec le client.</p>
    </div>
  );

  const tourContent_3 = (
    <div key="/assets/audio/tour/salon/Messages_men_3.mp3">
      <AudioPlayerForTour src="/assets/audio/tour/salon/Messages_men_3.mp3" />
      <p>Entrer ici votre message.</p>
    </div>
  );

  const tourContent_4 = (
    <div key="/assets/audio/tour/salon/Messages_men_4.mp3">
      <AudioPlayerForTour src="/assets/audio/tour/salon/Messages_men_4.mp3" />
      <p>Puis cliquer ici pour envoyer votre message.</p>
    </div>
  );

  const tourSteps: Steps[] = [
    {
      selector: ".zone_contact",
      content: tourContent_1,
    },
    {
      selector: ".champs_discussion",
      content: tourContent_2,
    },
    {
      selector: ".champs_envoi",
      content: tourContent_3,
    },
    {
      selector: ".bouton_envoi",
      content: tourContent_4,
    },
  ];

  const closeTour = async () => {
    // You may want to store in local storage or state that the user has completed the tour
    setIsLoading(true);
    if (!pageDone.includes("salon_message")) {
      let resp = await salonApi.assignStepDone({ page: "salon_message" });

      if (resp.data?.pages_done) {
        setLocalStorage("pages_done", JSON.stringify(resp.data.pages_done));
      }
      setPageDone((prevArray) => [...prevArray, "salon_message"]);
    }
    setIsLoading(false);
  };
  // ------------------------------------------------------------------

  return (
    <div className="">
      {isLoading && loadingView()}

      {/* For explaining the website */}
      <TourModal
        steps={tourSteps}
        onRequestClose={closeTour}
        doneTour={pageDone.includes("salon_message")}
      />

      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <LogoCircleFixRight />
      </div>
      <div className="sm:px-0 2xl:px-5">
        {/* Titre du centre de messagerie */}
        <p className="text-black font-medium text-3xl text-center mb-10">
          Centre de messagerie
        </p>

        <div className="flex flex-col md:flex-row items-start justify-center gap-10 2xl:gap-20 h-screen md:h-auto">
          {/* Section de gauche : Liste des salons */}
          <div className="w-full md:max-w-sm xl:max-w-sm min-h-[500px] md:min-h-[300px] overflow-y-auto flex-shrink-0 rounded-3xl bg-white py-4 px-8 shadow-md zone_contact">
            {/* Titre */}
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            {clients.map((client, index) => {
              return (
                <div
                  key={index}
                  onClick={() => getChat(client)}
                  className={`flex items-center justify-between py-2 px-5 hover:bg-[#F5F5F5] mb-2 rounded-3xl cursor-pointer ${
                    selectedChat.client_id === client.client_id &&
                    "bg-[#F5F5F5] outline outline-1 outline-stone-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center justify-center gap-2 sm:gap-4">
                    {/* Icône du client (décommentez si nécessaire) */}
                    <div className="flex items-center">
                      {/* Cercle ajouté */}

                      {client &&
                      client.client &&
                      client.client.front_profile ? (
                        <img
                          src={client.client.front_profile}
                          alt="profile"
                          className="rounded-full inset-0 m-auto shadow-md transform transition-transform duration-300 group-hover:scale-90 hover:shadow-inner border-2 border-stone-200 h-12 w-12"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full border border-stone-200 bg-stone-50 mr-2"></div>
                      )}

                      <p className="ml-4 text-black">{client.client.name}</p>
                    </div>
                  </div>
                  {client.is_read === 0 ? (
                    <div className="ml-auto w-4 h-4 rounded-full bg-red-500"></div>
                  ) : (
                    <div></div>
                  )}

                  {/* Vous pouvez décommenter ce bloc si vous avez besoin d'afficher un message ou une notification */}
                  {/* {message.num ? (
                        <p className="w-5 h-5 rounded-full text-xs flex items-center justify-center text-white bg-gradient-to-tr from-red-500 to-yellow-400">
                            {message.num}
                        </p>
                    ) : (
                        <p></p>
                    )} */}
                </div>
              );
            })}
          </div>

          {/* Section de droite : Fenêtre de chat */}
          <div className="relative z-10 w-full md:w-8/12 xl:w-9/12 min-h-[500px] md:min-h-[300px] overflow-y-auto flex flex-col justify-between rounded-3xl bg-white py-4 px-8 shadow-xl">
            {/* Zone de Chat */}
            <div className="flex-grow overflow-auto mb-4 p-2 border border-gray-300 rounded-xl bg-stone-100 shadow-inner flex flex-col max-h-[700px] min-w-[200px] champs_discussion">
              {chats.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Commencez à discuter maintenant
                </p>
              ) : (
                chats.map((chat, index) => (
                  <div
                    className={`mb-2 flex flex-col ${
                      chat.by === "professional" ? "items-end" : "items-start"
                    }`}
                    key={index}
                  >
                    <p className="text-xs text-[#666] mb-1 italic">
                      {/* Formatage de la date */}
                      <strong>{formatDate(chat.created_at).day}</strong> -{" "}
                      {formatDate(chat.created_at).time}
                    </p>
                    <div
                      className={`max-w-2/3 inline-block p-2 text-base shadow-md ${
                        chat.by === "professional"
                          ? `rounded-l-lg rounded-b-lg bg-stone-100 `
                          : `rounded-r-lg rounded-b-lg text-white ${ColorsThemeA.OhcGradient_D} `
                      }`}
                    >
                      <strong>
                        {chat.by === "professional"
                          ? selectedChat.client.name + ":"
                          : "Vous:"}
                      </strong>{" "}
                      {chat.message}
                    </div>
                  </div>
                ))
              )}
              {/* Élément utilisé pour le défilement automatique en bas */}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input et Bouton d'Envoi */}
            <div className="w-full flex items-center justify-center mt-auto mb-6">
              <div className="relative w-9/12 mt-4 champs_envoi">
                {/* Champ de texte pour entrer un message */}
                <CustomInput
                  id="sendMessageInput"
                  label="Ecrire un message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onEnterPress={onSendMessage}
                  disable={!selectedChat.client_id}
                />
                {/*
                                    <input onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    className={`w-full shadow-inner border border:bg-stone-300 ${Theme_A.behaviour.fieldFocused_C} rounded-xl h-12 outline-none px-3`}
                                    />
                                    */}
              </div>

              {/* Bouton d'envoi de message */}
              <div
                id="ChatSendIcon"
                className="ml-4 mt-4 hover:scale-125 transform transition-transform duration-300 bouton_envoi"
                onClick={onSendMessage}
              >
                <ChatSendIcon />
              </div>
              <button
                onClick={() => {
                  if (selectedChat.client_id) {
                    setIsDeleteModal(true);
                  }
                }}
                className={`rounded-md ml-4 mt-4 hover:scale-110 duration-300  ${Theme_A.button.mediumGradientButton} shadow-md `}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isDeleteModal && (
        <BaseModal close={() => setIsDeleteModal(false)}>
          <div>
            <h1 className="items-center justify-center text-center font-semibold text-lg mb-6">
              Suppression de la discussion
            </h1>
            <p className="items-center justify-center text-center">
              Êtes-vous certain de vouloir supprimer la discussion ?{" "}
            </p>
            <p className="items-center justify-center text-center">
              Ce processus est irreversible.{" "}
            </p>

            <div className={"flex justify-center gap-5 mt-8"}>
              <button
                className={`${Theme_A.button.smallBlackColoredButton}`}
                onClick={() => setIsDeleteModal(false)}
              >
                Annuler
              </button>
              <button
                className={`${Theme_A.button.smallGradientButton}`}
                onClick={deleteChat}
              >
                Confirmer
              </button>
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default Messages;
