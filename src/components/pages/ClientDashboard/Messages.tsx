"use client";
import { LogoCircleFixRight, EmojiIcon, PlusIcon, SendIcon } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Footer from "@/components/UI/Footer";
import { getLocalStorage } from "@/api/storage";
import { clientDashboard } from "@/api/clientDashboard";
import { SalonDetails, Chat } from "@/types";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";

const Messages = () => {
    const [selectedChat,setSelectedChat]=useState({user_id: 0, name:''})
    const [message,setMessage]=useState('')
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const [salons,setSalons]=useState<SalonDetails[]>([])
    const [chats,setChats]=useState<Chat[]>([])
    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);

    const getSalonsByUser = async () => {
        if (userId) {
            await clientDashboard.getSalonsByUser(userId)
                .then(resp => {
                    setSalons(resp.data.data)
                    console.log(resp.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const getChat = async (salon: { user_id: number, name: string }) => {
        setSelectedChat({ user_id: salon.user_id, name: salon.name })
        if (userId) {
            setIsLoading(true)
            await dashboard.getChat(userId, salon.user_id)
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
                client_id: userId,
                professional_id: selectedChat.user_id,
                message: message,
                by: 'client',
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

    useEffect(()=>{
        getSalonsByUser()
    },[])

    useEffect(()=>{
        if(salons.length){
            getChat(salons[0])
        }
    },[salons])
    return (
        <div>
            {isLoading && loadingView()}
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-10 mb-5 px-8 sm:px-14 2xl:px-36">
                    <p className="text-black font-medium text-3xl text-center mb-10">
                        Messagerie
                    </p>
                    <div className="flex flex-col md:flex-row items-start justify-center gap-10 2xl:gap-20">
                        <div className="w-full md:w-6/12 xl:w-5/12 h-[700px] rounded-3xl bg-white py-4 px-8 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
                            {salons.map((salon, index) => {
                                return (
                                    salon &&
                                    <div
                                        key={index}
                                        onClick={()=>getChat(salon)}
                                        className={`flex items-center justify-between py-4 px-5 hover:bg-[#F5F5F5] mb-5 rounded-3xl cursor-pointer ${ selectedChat.user_id===salon.id && 'bg-[#F5F5F5]'}`}
                                    >
                                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center justify-center gap-2 sm:gap-4">
                                            {/* <p className="text-xs text-[#666] w-32 md:w-24">{message.time}</p> */}
                                            <p className="text-black">{salon.name}</p>
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
                        <div className="relative z-10 w-full sm:w-8/12 xl:w-8/12 rounded-3xl bg-white py-4 px-8 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
                            <div className="overflow-auto h-[350px] sm:h-[515px]">
                                {chats.map((chat,index)=>{
                                    return <div className="mt-6" key={index}>
                                    <p className="text-black">
                                        {chat.by==='client' ? 'You': selectedChat.name}: <span className="text-xs text-[#666]">{formatDate(chat.created_at)}</span>
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
                </div>
            </ClientDashboardLayout>
            <Footer />
        </div>
    );
};

export default Messages;
