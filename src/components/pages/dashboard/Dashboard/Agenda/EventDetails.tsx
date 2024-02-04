import React, { useEffect, useState, useRef } from "react";
import { CrossIcon } from "@/components/utilis/Icons";
import { ColorsThemeA } from "@/components/utilis/Themes";
import { ChatSendIcon } from "@/components/utilis/Icons";
import './style.css';
import { Theme_A } from "@/components/utilis/Themes";
import Image from "next/image";
import { Booking, Coiffeur } from "./types";
import { getLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import { salonApi } from "@/api/salonSide";
import { Chat, Hairdresser } from "@/types";
import BaseModal from '@/components/UI/BaseModal';
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import CustomInput from "@/components/UI/CustomInput";

// Ajout de toutes les propriétes qu'on veut reprendre dans le modal
interface EventDetailsModalProps {
  event: Booking;
  setModal: React.Dispatch<React.SetStateAction<Booking | undefined>>;
  coiffeurNom: string;
  coiffeurCouleur: string;
  refresh: any;
}


const EventDetailsModal = (props: EventDetailsModalProps) => {

  const [message, setMessage] = useState("");
  const user = getLocalStorage("user");
  const userData = user ? JSON.parse(user) : null
  const [chats, setChats] = useState<Chat[]>([])
  const [isModal, setIsModal] = useState(false)
  const [hairDressers, setHairDressers] = useState<Hairdresser[]>([])
  const [hairDresser, setHairDresser] = useState<Hairdresser>({} as Hairdresser)
  // Reprise du nom du client et du coiffeur
  const [nomClient, nomCoiffeur] = props.event.title.split(" - ");

  {/* TODO Replace with the correction message function */ }
  const sendMessage = async () => {
    if (message) {
      const data = {
        client_id: props.event.clientId,
        professional_id: userData.id,
        message: message,
        by: userData.role === 'salon_professional' ? 'professional' : 'client',
      }
      await dashboard.sendMessage(data)
        .then(resp => {
          getChat()
          setMessage("");
        })
        .catch(err => {
          //console.log(err)
        })
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const getAvailableHairDresser = async () => {
    await salonApi.getAvailableHairDresser(props.event.booking.id)
      .then(({ data }) => {
        setHairDressers(data)
        setIsModal(true)
      })
      .catch(err => {
        //console.log(err)
      })
  }

  const changeHairDresser = async () => {
    await salonApi.updateBookingHairDresser(props.event.booking.id, hairDresser.id)
      .then(({ data }) => {
        setIsModal(false)
        props.refresh()
      })
      .catch(err => {
        //console.log(err)
      })
  }

  const getChat = async () => {
    if (userData) {
      await dashboard.getChat(props.event.clientId, userData.id)
        .then(resp => {
          setChats(resp.data.data)
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    getChat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // for autoscroll down : 
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]); // Ce useEffect est déclenché à chaque mise à jour de `chats`


  return (
    <div className="relative bg-white rounded-xl px-5 pb-5 shadow-lg mt-10 bg- modal " >

      {isModal &&
        <BaseModal close={() => setIsModal(false)} width="w-100">
          <div className="text-center">
            <div className="h-auto w-full overflow-auto flex flex-col items-center justify-start gap-8 bg-lightGrey rounded-3xl p-4 md:p-12">
              <div className={`${Theme_A.textFont.headerH2} underline`}>
                Coiffeur(s)/-euse(s) disponible(s)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full md:w-96">
                {hairDressers.map((item, index) => {
                  return (
                    <div key={index} className="w-full flex justify-center">
                      <div
                        onClick={() => setHairDresser(item)}
                        className={`px-4 pt-4 shadow-lg flex flex-col justify-between cursor-pointer border-2 transition rounded-xl hover:border-secondary ${hairDresser && item.id === hairDresser.id && "border-secondary"
                          }`}
                      >
                        <div className="relative w-32 h-32">
                          <Image
                            fill={true}
                            src={
                              item.profile_image ? (item.profile_image.includes('http') ? item.profile_image : `https://api.onehaircut.com/${item.profile_image}`) : `https://api.onehaircut.com/${item.avatar ? item.avatar.image : ''}`
                            }
                            alt="image"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-center">{item.name}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {hairDresser.id > 0 && <button onClick={changeHairDresser} className={`${Theme_A.button.mediumGradientButton} mt-5`}>
              Remplacer
            </button>}
          </div>
        </BaseModal>
      }
      {/* Icône de fermeture */}
      <div
        className={`absolute -right-3 -top-7 cursor-pointer my-3 rounded-lg ${ColorsThemeA.ohcVerticalGradient_A} shadow-md flex items-center justify-center hover:scale-90 transition duration-300`}
        onClick={() => props.setModal(undefined)}
        style={{ width: '35px', height: '35px' }} // Augmentez ces valeurs pour agrandir le carré
      >
        <CrossIcon width="16" />
      </div>




      {/* Contenu */}
      <div className="flex flex-col gap-4 mt-6">
        {/* Nom du client */}
        {/* Cercle de couleur du coiffeur */}
        <div
          className="coiffeur-color shadow-inner shadow-stone-300"
          style={{ backgroundColor: props.coiffeurCouleur }}
        ></div>
        <div className="text-xl font-semibold text-center bg-rounded-lg " >
          Client: {nomClient}
        </div>


        {/* Vignette */}
        <div className="self-center border border-gray-300 rounded-md p-2 w-52 h-52 shadow-inner">
          {!props.event.booking.haircut &&
            <img
              style={{ height: 'inherit', "max-height": "100%" } as CSSProperties}
              src={props.event.booking.user.front_profile || "/assets/user_img.png"}
              alt="profile"
            />
          }
          {props.event.booking.haircut &&
            <img src={`https://api.onehaircut.com${props.event.booking.haircut.image}`} alt='' />
          }
        </div>

        {/* Date */}
        <div className="text-center mb-[-4px]">
          <strong>Date du rdv :</strong> {props.event.start.split('T')[0]}
        </div>
        <div className="text-center mb-[-4px] flex items-center justify-center">
          <div>
            <strong>Coiffeur : </strong>{props.event.hair_dresser_name}
          </div>
          <div className="flex items-center justify-between gap-3 ml-3 ">
            <button onClick={getAvailableHairDresser} className={`${Theme_A.button.medBlackColoredButton}`}>
              changement
            </button>
          </div>
        </div>
        {props.event.booking.haircut && <div className="text-center mb-[-4px]">
          <strong>coiffures:</strong> {props.event.booking.haircut.name}
        </div>}
        {props.event.booking.salon_haircut && <div className="text-center mb-[-4px]">
          <strong>coiffures Durée éstimée :</strong> {props.event.booking.salon_haircut.base_duration}&nbsp;Mins
        </div>}
        <div className="text-center mb-[-4px]">
          <strong>Préstation :</strong>
          {props.event.booking.items.filter((item) => item.type == 'service').length != 0 &&
            <ul>
              {props.event.booking.items.filter((item) => item.type == 'service').map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          }
          {props.event.booking.items.filter((item) => item.type == 'service').length == 0 && <span> none</span>}
        </div>
        <div className="text-center mb-[-4px]">
          <strong>Durée totale éstimée :</strong> {props.event.total_duration} Mins
        </div>


        {/* Zone de messagerie */}
        <div className="modalChat flex flex-col gap-2 mt-4  ">
          {/* Conversation */}
          <div className=" border border-gray-300 rounded-xl p-2 rounded-bl-lg overflow-auto h-40 bg-stone-100 shadow-inner mb-2 ">
            {chats.map((msg, index) => (
              <div key={`msg-${index}`} className={`${msg.by === 'professional' ? 'text-left ' : 'text-right'} mb-2 `}>
                <div
                  className={`inline-block p-2 outline-1 text-xs  ${msg.by === 'professional' ? `rounded-r-lg rounded-b-lg  ${ColorsThemeA.OhcGradient_D} font-light text-white shadow-md shadow-stone-300` : ' font-medium rounded-l-lg rounded-b-lg bg-stone-300 shadow-sm shadow-stone-300'}`}
                >
                  <strong>{msg.by === 'professional' ? 'Vous:' : 'Client:'}</strong> {msg.message}
                </div>
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Zone d'écriture et envoi - ajouter nKeyDown={handleKeyPress} pour valider le message avec Enter */}
          <div className="flex">
            <div className="flex-grow  min-w-0 p-2">
              <CustomInput
                id="sendMessageInput"
                label="Écrire un message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onEnterPress={() => sendMessage()} // Modifiez ceci
              />
            </div>

            <button type="button" onClick={sendMessage} id="ChatSendIcon" className="hover:scale-125 transition duration-300 " > <ChatSendIcon /> </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default EventDetailsModal;
