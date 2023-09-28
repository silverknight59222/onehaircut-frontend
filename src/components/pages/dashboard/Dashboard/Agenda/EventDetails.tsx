import React, { useState } from "react";
import { CrossIcon } from "@/components/utilis/Icons";
import { ColorsThemeA } from "@/components/utilis/Themes";
import { ChatSendIcon } from "@/components/utilis/Icons";
import './index.css';

// Le reste de votre code JSX...


interface Booking {
  id: string;
  title: string;
  start: string;
}

interface BookingDetail {
  event: Booking;
  setModal: (value: Booking) => void;
}

const AddServiceModal = (props: BookingDetail) => {
  const defaultBooking = {
    id: "",
    title: "",
    start: "",
  };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ content: string, sent: boolean }[]>([]);

  {/* TODO Replace with the correction message function */ }
  const sendMessage = () => {
    if (message) {
      setMessages([...messages, { content: message, sent: true }]);
      setMessage("");
      // Pour simuler la réception d'un message
      setMessages(prev => [...prev, { content: "Réponse automatique", sent: false }]);
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


  return (
    <div className="relative bg-white rounded-xl px-5 pb-5 shadow-lg mt-10 modal">
      {/* Icône de fermeture */}
      <div
        className={`absolute -right-3 -top-7 cursor-pointer my-3 rounded-lg ${ColorsThemeA.ohcVerticalGradient_A} shadow-md flex items-center justify-center`}
        onClick={() => props.setModal(defaultBooking)}
        style={{ width: '35px', height: '35px' }} // Augmentez ces valeurs pour agrandir le carré
      >
        <CrossIcon width="16" />
      </div>




      {/* Contenu */}
      <div className="flex flex-col gap-4 mt-6">
        {/* Nom du client */}
        <div className="text-xl font-semibold text-center">
          Client: {props.event.title}
        </div>

        {/* Vignette */}
        <div className="self-center border border-gray-300 rounded-md p-2 w-52 h-52 shadow-inner">
          {/* Insérez ici la vignette */}
        </div>

        {/* Date */}
        <div className="text-center mb-[-4px]">
          <strong>Date du rdv :</strong> {props.event.start.split('T')[0]}
        </div>
        <div className="text-center mb-[-4px]">
          <strong>Coiffeur :</strong> {/* Ici, vous pouvez insérer le nom du coiffeur */}
        </div>
        <div className="text-center mb-[-4px]">
          <strong>Dur&eacute;e &eacute;stim&eacute;e :</strong> {/* Ici, vous pouvez insérer la durée de la coiffure */}
        </div>
        <div className="text-center mb-[-4px]">
          <strong>Pr&eacute;station :</strong> {/* Ici, vous pouvez insérer le nom des prestations */}
        </div>
        <div className="text-center mb-[-4px]">
          <strong>Dur&eacute;e de la Pr&eacute;station &eacute;stim&eacute;e :</strong> {/* Ici, vous pouvez insérer la durée totale des prestaion */}
        </div>
        <div className="text-center mb-[-4px]">
          <strong>Dur&eacute;e totale &eacute;stim&eacute;e :</strong> {/* Ici, vous pouvez insérer la durée totale*/}
        </div>


        {/* Zone de messagerie */}
        <div className="modalChat flex flex-col gap-2 mt-4  ">
          {/* Conversation */}
          <div className=" border border-gray-300 rounded-xl p-2 rounded-bl-lg overflow-auto h-40 bg-stone-100 shadow-inner mb-2 ">
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.sent ? 'text-right' : 'text-left '} mb-2`}>
                <div
                  className={`inline-block p-2 text-xs outline-1 ${msg.sent ? 'rounded-l-lg rounded-b-lg outline outline-orange-500 bg-stone-100 ' : 'rounded-r-lg rounded-b-lg outline outline-stone-400 bg-white'}`}
                >
                  <strong>{msg.sent ? 'Vous:' : 'Client:'}</strong> {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Zone d'écriture et envoi - ajouter nKeyDown={handleKeyPress} pour valider le message avec Enter */}
          <div className="flex gap-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrire un message"
              className="flex-grow border border-gray-300 rounded-xl p-2 min-w-0 focus:outline-none focus:border-red-500 shadow-inner"

            />
            <button type="button" onClick={sendMessage} className="transform hover:scale-105 " > <ChatSendIcon /> </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AddServiceModal;
