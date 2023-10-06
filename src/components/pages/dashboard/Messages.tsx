"use client";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import {
  CircleRight,
  EmojiIcon,
  PlusIcon,
  SendIcon,
} from "@/components/utilis/Icons";
import DashboardLayout from "@/layout/DashboardLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import { Chat, ClientChat } from "@/types";

const Messages = () => {
  const [clients,setClients]=useState<ClientChat[]>([])
  const user = getLocalStorage("user");
  const userId = user ? Number(JSON.parse(user).id) : null;
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat,setSelectedChat]=useState({client_id: 0, client:{name: ''}})
  const [chats,setChats]=useState<Chat[]>([])
  const [message,setMessage]=useState('')

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
        .finally(()=>{
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
            .finally(()=>{
                setIsLoading(false)
            })
    }
  };

  const formatDate=(date: string)=>{
    return `${new Date(date).getUTCHours()}:${new Date(date).getUTCMinutes()}`
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
      <div className="hidden sm:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <CircleRight />
      </div>
      <DashboardLayout>
        <div className="flex flex-col sm:flex-row items-start justify-center gap-10 2xl:gap-20">
          <div className="w-full sm:w-4/12 xl:w-4/12 h-[360px] sm:h-[680px] overflow-auto rounded-3xl bg-white py-4 px-8 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
            {clients.map((client, index) => {
              return (
                <div
                  key={index}
                  onClick={()=>getChat(client)}
                  className={`flex items-center justify-between py-4 px-5 cursor-pointer mb-5 rounded-3xl ${ selectedChat.client_id===client.client_id && 'bg-[#F5F5F5]'}`}
                >
                  <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                    <p className="text-black">{client.client.name}</p>
                  </div>
                  {/* <p
                    className={`w-5 h-5 rounded-full text-xs flex items-center justify-center text-white ${
                      message.num &&
                      "bg-gradient-to-tr from-red-500 to-yellow-400"
                    }`}
                  >
                    {message.num && message.num}
                  </p> */}
                </div>
              );
            })}
          </div>
          <div className="relative z-10 w-full sm:w-8/12 xl:w-8/12 rounded-3xl bg-white py-4 px-8 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
            <div className="overflow-auto h-[350px] sm:h-[490px]">
              {chats.map((chat,index)=>{
                return <div className="mt-6" key={index}>
                <p className="text-black">
                  {chat.by==='client' ? selectedChat.client.name : 'You'}: <span className="text-xs text-[#666]">{formatDate(chat.created_at)}</span>
                </p>
                <p className="text-sm text-[#2F2F2F] mt-2">
                  {chat.message}
                </p>
              </div> 
              })}
                     
            </div>
            <div className="w-full flex items-center justify-center mt-10">
                <div className="relative w-9/12">
                  <input onChange={(e)=>setMessage(e.target.value)} value={message} className="w-full border border-[#A3A3A3] rounded-xl h-9 outline-none px-3" />
                </div>
                <div onClick={onSendMessage}>
                <SendIcon />
                </div>
              </div>
            <div className="relative w-full bg-white h-20">
              <Image
                src="/assets/messages2.png"
                alt=""
                width={50}
                height={50}
                className="absolute top-8 right-0"
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Messages;
