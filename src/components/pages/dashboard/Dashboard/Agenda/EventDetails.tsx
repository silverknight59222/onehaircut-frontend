import React, { useState } from "react";
import { CrossIcon } from "@/components/utilis/Icons";
import { ColorsThemeA } from "@/components/utilis/Themes";

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

  const sendMessage = () => {
    if (message) {
      setMessages([...messages, { content: message, sent: true }]);
      setMessage("");
      // Pour simuler la réception d'un message
      setMessages(prev => [...prev, { content: "Réponse automatique", sent: false }]);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-visible max-w-full lg:max-w-2xl mx-auto p-5">
      {/* Icône de fermeture */}
      <div
        className={`absolute -right-3 -top-7 cursor-pointer my-3 rounded-lg ${ColorsThemeA.ohcVerticalGradient_A} shadow-md flex items-center justify-center`}
        onClick={() => props.setModal(defaultBooking)}
        style={{ width: '35px', height: '35px' }} // Augmentez ces valeurs pour agrandir le carré
      >
        <CrossIcon width="16" />
      </div>




      {/* Contenu */}
      <div className="flex flex-col gap-4">
        {/* Nom */}
        <div className="text-xl font-semibold text-center">
          Name: {props.event.title}
        </div>

        {/* Vignette */}
        <div className="self-center border border-gray-300 rounded-md p-2 w-52 h-52">
          {/* Insérez ici la vignette */}
        </div>

        {/* Date */}
        <div className="text-center">
          Date: {props.event.start.split('T')[0]}
        </div>

        {/* Zone de messagerie */}
        <div className="flex flex-col gap-2 mt-4">
          {/* Conversation */}
          <div className="border border-gray-300 rounded-md p-2 overflow-auto h-40 bg-stone-100 shadow-inner">
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.sent ? 'text-right' : 'text-left'} mb-2`}>
                <div
                  className={`inline-block p-2 rounded-md text-xs outline-1 ${msg.sent ? 'outline outline-orange-500 bg-stone-100' : 'outline outline-stone-400 bg-white'}`}
                >
                  <strong>{msg.sent ? 'Vous:' : 'Client:'}</strong> {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Zone d'écriture et envoi */}
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrire un message"
              className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:border-red-500 shadow-inner"
            />
            <button onClick={sendMessage} className="p-2 rounded-md bg-blue-500 text-white">Envoyer</button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AddServiceModal;
