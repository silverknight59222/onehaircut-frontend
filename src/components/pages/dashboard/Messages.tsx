"use client";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import {
  LogoCircleFixRight,
  ChatSendIcon,
} from "@/components/utilis/Icons";
import DashboardLayout from "@/layout/DashboardLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import { Chat, ClientChat } from "@/types";
import { Theme_A } from "@/components/utilis/Themes";

const Messages = () => {
  const [clients, setClients] = useState<ClientChat[]>([])
  const user = getLocalStorage("user");
  const userId = user ? Number(JSON.parse(user).id) : null;
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState({ client_id: 0, client: { name: '' } })
  const [chats, setChats] = useState<Chat[]>([])
  const [message, setMessage] = useState('')

  const getClientsByProfessional = async () => {
    if (userId) {
      setIsLoading(true)
      await dashboard.getClientsBySalon(userId)
        .then(resp => {
          setClients(resp.data.data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const getChat = async (client: ClientChat) => {
    if (userId && client.client_id) {
      setSelectedChat({ client_id: client.client_id, client: { name: client.client.name } })
      setIsLoading(true)
      await dashboard.getChat(client.client_id, userId)
        .then(resp => {
          setChats(resp.data.data)
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const onSendMessage = async () => {
    if (userId) {
      setIsLoading(true)
      const data = {
        client_id: selectedChat.client_id,
        professional_id: userId,
        message: message,
        by: 'professional',
      }
      await dashboard.sendMessage(data)
        .then(resp => {
          getChat(selectedChat)
          setMessage('')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return {
      day: `${d.getUTCDate()}/${d.getUTCMonth() + 1}`,
      time: `${d.getUTCHours()}:${String(d.getUTCMinutes()).padStart(2, '0')}`
    };
  }



  useEffect(() => {
    getClientsByProfessional()
  }, [])
  useEffect(() => {
    if (clients.length) {
      getChat(clients[0])
    }
  }, [clients])

  return (
    <div>
      {isLoading && loadingView()}
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <LogoCircleFixRight />
      </div>
      <DashboardLayout>
        <div className="mt-10 mb-5 px-8 sm:px-14 2xl:px-36">

          {/* Titre du centre de messagerie */}
          <p className="text-black font-medium text-3xl text-center mb-10">
            Centre de messagerie
          </p>


          {/* Section de gauche : Liste des Clients */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-10 2xl:gap-20 h-screen md:h-auto">
            {/* Section de gauche */}
            <div className={`w-full md:max-w-sm xl:max-w-sm min-h-[500px] md:min-h-[300px] overflow-y-auto flex-shrink-0 rounded-3xl bg-white py-4 px-8 shadow-md`}>

              {/* Titre */}
              <h2 className="text-xl font-semibold mb-4">
                Messages
              </h2>
              {clients.map((client, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => getChat(client)}
                    className={`flex items-center justify-between py-4 px-5 hover:bg-[#F5F5F5] mb-5 rounded-3xl cursor-pointer ${selectedChat.client_id === client.client_id && 'bg-[#F5F5F5] outline outline-1 outline-stone-300'}`}
                  >
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center justify-center gap-2 sm:gap-4">

                      {/* <p className="text-xs text-[#666] w-32 md:w-24">{message.time}</p> */}
                      <p className="text-black">{client.client.name}</p>
                    </div>
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

            {/* Section de droite */}
            <div className="relative z-10 w-full md:w-8/12 xl:w-9/12 min-h-[500px] md:min-h-[300px] overflow-y-auto flex flex-col justify-between rounded-3xl bg-white py-4 px-8 shadow-xl">

              {/* Zone de Chat */}
              <div className="flex-grow overflow-auto mb-4 p-2 border border-gray-300 rounded-xl bg-stone-100 shadow-inner flex flex-col max-h-[700px] min-w-[200px]">
                {chats.length === 0 ? (
                  <p className="text-gray-500 text-center">Commencez à discuter maintenant</p>
                ) : (
                  chats.map((chat, index) => (
                    <div
                      className={`mb-2 flex flex-col ${chat.by === 'professional' ? 'items-start' : 'items-end'}`}
                      key={index}
                    >
                      <p className="text-xs text-[#666] mb-1">
                        {/* Formatage de la date */}
                        <strong>{formatDate(chat.created_at).day}</strong> - {formatDate(chat.created_at).time}
                      </p>
                      <div
                        className={`max-w-2/3 inline-block p-2 text-base ${chat.by === 'professional' ? 'rounded-r-lg rounded-b-lg outline outline-2 outline-orange-500 bg-stone-100' : 'rounded-l-lg rounded-b-lg outline outline-2 outline-stone-400 bg-white'}`}
                      >
                        <strong>{chat.by === 'professional' ? 'Vous:' : `${selectedChat.client.name}:`}</strong> {chat.message}
                      </div>
                    </div>
                  ))
                )}
              </div>



              {/* Input et Bouton d'Envoi */}
              <div className="w-full flex items-center justify-center mt-auto mb-6">
                <div className="relative w-9/12">
                  {/* Champ de texte pour entrer un message */}
                  <input onChange={(e) => setMessage(e.target.value)} value={message} className={`w-full shadow-inner border border:bg-stone-300 ${Theme_A.behaviour.fieldFocused_C} rounded-xl h-12 outline-none px-3`} />
                </div>

                {/* Bouton d'envoi de message */}
                <div className="ml-4 hover:scale-110" onClick={onSendMessage}>
                  <ChatSendIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Messages;