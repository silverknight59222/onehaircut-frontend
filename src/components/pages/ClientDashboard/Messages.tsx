"use client";
import { LogoCircleFixRight, ChatSendIcon } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Footer from "@/components/UI/Footer";
import { getLocalStorage } from "@/api/storage";
import { clientDashboard } from "@/api/clientDashboard";
import { SalonDetails, Chat } from "@/types";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";
import CustomInput from "@/components/UI/CustomInput";


const Messages = () => {
    const [selectedChat, setSelectedChat] = useState({ user_id: 0, name: '' })
    const [message, setMessage] = useState('')
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const [salons, setSalons] = useState<SalonDetails[]>([])
    const [chats, setChats] = useState<Chat[]>([])
    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);

    // Récupère les salons liés à l'utilisateur
    const getSalonsByUser = async () => {
        if (userId) {
            await clientDashboard.getSalonsByUser(userId)
                .then(resp => {
                    setSalons(resp.data.data)
                    //console.log(resp.data.data)
                })
                .catch(err => {
                    //console.log(err)
                })
        }
    }

    // Récupère les messages du chat pour un salon donné
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

    // Envoie un message et recharge le chat
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
                    //console.log(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    };


    // Formatte une date en heures et minutes
    const formatDate = (date: string) => {
        const d = new Date(date);
        return {
            day: `${d.getUTCDate()}/${d.getUTCMonth() + 1}`,
            time: `${d.getUTCHours()}:${String(d.getUTCMinutes()).padStart(2, '0')}`
        };
    }


    // Appelle `getSalonsByUser` au chargement du composant    // Appelle `getSalonsByUser` au chargement du composant
    useEffect(() => {
        getSalonsByUser()
    }, [])

    // Appelle `getChat` lorsque les `salons` sont mis à jour
    useEffect(() => {
        if (salons.length) {
            getChat(salons[0])
        }
    }, [salons])

    // Rendu du composant
    return (
        <div>
            {isLoading && loadingView()}
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-10 mb-5 px-8 sm:px-14 2xl:px-36">

                    {/* Titre du centre de messagerie */}
                    <p className="text-black font-medium text-3xl text-center mb-10">
                        Centre de messagerie
                    </p>


                    <div className="flex flex-col md:flex-row items-start justify-center gap-10 2xl:gap-20 h-screen md:h-auto">

                        {/* Section de gauche : Liste des salons */}
                        <div className="w-full md:max-w-sm xl:max-w-sm min-h-[500px] md:min-h-[300px] overflow-y-auto flex-shrink-0 rounded-3xl bg-white py-4 px-8 shadow-md">

                            {/* Titre */}
                            <h2 className="text-xl font-semibold mb-4">
                                Messages
                            </h2>
                            {salons.map((salon, index) => {
                                return (
                                    salon &&
                                    <div
                                        key={index}
                                        onClick={() => getChat(salon)}
                                        className={`flex items-center justify-between py-4 px-5 hover:bg-[#F5F5F5] mb-5 rounded-3xl cursor-pointer ${selectedChat.user_id === salon.id && 'bg-[#F5F5F5] outline outline-1 outline-red-200'}`}
                                    >
                                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center justify-center gap-2 sm:gap-4">
                                            {/* Image du Salon */}
                                            <img
                                                src={`https://api.onehaircut.com${salon.logo}`}
                                                alt={salon.name}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    border: '1px solid #AAA8A7',  // Ajout d'une bordure pour le débogage
                                                }}
                                            />

                                            {/* Nom du Salon */}
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

                        {/* Section de droite : Fenêtre de chat */}
                        <div className="relative z-10 w-full md:w-8/12 xl:w-9/12 min-h-[500px] md:min-h-[300px] overflow-y-auto flex flex-col justify-between rounded-3xl bg-white py-4 px-8 shadow-xl">

                            {/* Zone de Chat */}
                            <div className="flex-grow overflow-auto mb-4 p-2 border border-gray-300 rounded-xl bg-stone-100 shadow-inner flex flex-col max-h-[700px] min-w-[200px]">
                                {chats.length === 0 ? (
                                    <p className="text-gray-500 text-center">Commencez à discuter maintenant</p>
                                ) : (
                                    chats.map((chat, index) => (
                                        <div
                                            className={`mb-2 flex flex-col ${chat.by === 'professional' ? 'items-end' : 'items-start'}`}
                                            key={index}
                                        >

                                            <p className="text-xs text-[#666] mb-1 italic">
                                                {/* Formatage de la date */}
                                                <strong>{formatDate(chat.created_at).day}</strong> - {formatDate(chat.created_at).time}
                                            </p>
                                            <div
                                                className={`max-w-2/3 inline-block p-2 text-base shadow-md ${chat.by === 'professional' ? `rounded-l-lg rounded-b-lg bg-stone-100 ` : `rounded-r-lg rounded-b-lg text-white ${ColorsThemeA.OhcGradient_D} `}`}
                                            >
                                                <strong>{chat.by === 'professional' ? selectedChat.name + ':' : 'Vous:'}</strong> {chat.message}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>





                            {/* Input et Bouton d'Envoi */}
                            <div className="w-full flex items-center justify-center mt-auto mb-6">
                                <div className="relative w-9/12 mt-4">
                                    {/* Champ de texte pour entrer un message */}
                                    <CustomInput
                                        id="sendMessageInput"
                                        label="Ecrire un message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    {/*
                                    <input onChange={(e) => setMessage(e.target.value)} 
                                    value={message} 
                                    className={`w-full shadow-inner border border:bg-stone-300 ${Theme_A.behaviour.fieldFocused_C} rounded-xl h-12 outline-none px-3`} 
                                    />
                                    */}
                                </div>

                                {/* Bouton d'envoi de message */}
                                <div className="ml-4 mt-4 hover:scale-125 transform transition-transform duration-300" onClick={onSendMessage}>
                                    <ChatSendIcon />
                                </div>
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
