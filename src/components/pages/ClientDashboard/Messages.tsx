"use client";
import { LogoCircleFixRight, ChatSendIcon, DeleteIcon } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Footer from "@/components/UI/Footer";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import { clientDashboard } from "@/api/clientDashboard";
import { SalonDetails, Chat } from "@/types";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";
import CustomInput from "@/components/UI/CustomInput";
import TourModal, { Steps } from "@/components/UI/TourModal";
import { user_api } from "@/api/clientSide";
import { toast } from "react-toastify";
import BaseModal from "@/components/UI/BaseModal";



const Messages = () => {
    const [selectedChat, setSelectedChat] = useState({ user_id: 0, name: '' })
    const [notifications, setNotifications] = useState({} as any);
    const [message, setMessage] = useState('')
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const [salons, setSalons] = useState<SalonDetails[]>([])
    const [chats, setChats] = useState<Chat[]>([])
    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);
    const [pageDone, setPageDone] = useState<String[]>(['message']);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

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
    const getChat = async (salon: SalonDetails) => {
        setSelectedChat({ user_id: salon.user_id, name: salon.name })
        if (userId) {
            setIsLoading(true)
            await dashboard.getChat(userId, salon.user_id)
                .then(resp => {
                    setChats(resp.data.data)
                    let data = {
                        client_id: userId,
                        professional_id: salon.user_id
                    }
                    clientDashboard.setChatRead(data);
                    salon.chat_status = 1;
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    // Envoie un message et recharge le chat
    const onSendMessage = async () => {
        if (userId && selectedChat.user_id && message) {
            setIsLoading(true)
            const data = {
                client_id: userId,
                professional_id: selectedChat.user_id,
                message: message,
                by: 'client',
            }
            await dashboard.sendMessage(data)
                .then(async resp => {
                    setMessage('')

                    await dashboard.getChat(userId, selectedChat.user_id).then(resp => {
                        setChats(resp.data.data);
                    });
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
            day: d.toLocaleDateString(),
            time: d.toLocaleTimeString()
        };
    }



    // Appelle `getSalonsByUser` au chargement du composant    // Appelle `getSalonsByUser` au chargement du composant
    useEffect(() => {
        getSalonsByUser()
        const pages_done = getLocalStorage('pages_done')
        setPageDone(pages_done ? JSON.parse(pages_done) : [])
        console.log(pages_done)
    }, [])


    const fetchUserNotifications = async () => {
        const { data } = await dashboard.userNotification()
        setNotifications(data)
    }


    // For automatic scrolling down
    // Créez la référence avec le type HTMLDivElement
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    // Défilement automatique vers le bas de la zone de chat
    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    // Appelle scrollToBottom chaque fois que les messages changent
    useEffect(() => {
        fetchUserNotifications();
        scrollToBottom();
    }, [chats]); // chats est le tableau des messages



    // ------------------------------------------------------------------
    // For Tour
    const tourSteps: Steps[] = [
        {
            selector: '.zone_contact',
            content: 'Dans la partie de gauche, vous trouverez les salons',
        },
        {
            selector: '.champs_discussion',
            content: 'Vous trouverez ici la discussion avec le salon selectionné.',
        },
        {
            selector: '.champs_envoi',
            content: 'Entrer ici votre message.',
        },
        {
            selector: '.bouton_envoi',
            content: 'Puis cliquer ici pour envoyer votre message.',
        },
    ];

    const deleteChat = async () => {
        setIsLoading(true)
        try {
            await dashboard.deleteChat(selectedChat.user_id)
            setIsDeleteModal(false);
            setSelectedChat({ user_id: 0, name: '' })
            setChats([]);
            getSalonsByUser()
        } catch (e) {
            toast.error('Error delete messaging!')
        } finally {
            setIsLoading(false)
        }
    }

    const closeTour = async () => {
        // You may want to store in local storage or state that the user has completed the tour
        setIsLoading(true)
        if (!pageDone.includes('message')) {
            let resp = await user_api.assignStepDone({ page: 'message' });

            if (resp.data?.pages_done) {
                setLocalStorage('pages_done', JSON.stringify(resp.data.pages_done));
            }
            setPageDone((prevArray) => [...prevArray, 'message'])
        }
        setIsLoading(false);
    };
    // ------------------------------------------------------------------


    // Rendu du composant
    return (
        <div>
            {isLoading && loadingView()}

            {/* For explaining the website */}
            <TourModal steps={tourSteps} onRequestClose={closeTour} doneTour={pageDone.includes('message')} />

            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout notifications={notifications}>
                <div className="mt-10 mb-5 px-8 sm:px-14 2xl:px-36">

                    {/* Titre du centre de messagerie */}
                    <p className="text-black font-medium text-3xl text-center mb-10">
                        Centre de messagerie
                    </p>


                    <div className="flex flex-col md:flex-row items-start justify-center gap-10 2xl:gap-20 h-screen md:h-auto">

                        {/* Section de gauche : Liste des salons */}
                        <div className="w-full md:max-w-sm xl:max-w-sm min-h-[500px] md:min-h-[300px] overflow-y-auto flex-shrink-0 rounded-3xl bg-white py-4 px-8 shadow-md zone_contact">

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
                                                id={`MessagerieSalon-${index}`}
                                                src={`${salon.logo}`}
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
                                        {salon.chat_status === 0 ?
                                            <div className="ml-auto w-4 h-4 rounded-full bg-red-500"></div>
                                            :
                                            <div></div>
                                        }
                                    </div>

                                );
                            })}
                        </div>

                        {/* Section de droite : Fenêtre de chat */}
                        <div className="relative z-10 w-full md:w-8/12 xl:w-9/12 min-h-[500px] md:min-h-[300px] overflow-y-auto flex flex-col justify-between rounded-3xl bg-white py-4 px-8 shadow-xl">

                            {/* Zone de Chat */}
                            <div className="flex-grow overflow-auto mb-4 p-2 border border-gray-300 rounded-xl bg-stone-100 shadow-inner flex flex-col max-h-[700px] min-w-[200px] champs_discussion">
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
                                        disable={!selectedChat.user_id}
                                    />
                                    {/*
                                    <input onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    className={`w-full shadow-inner border border:bg-stone-300 ${Theme_A.behaviour.fieldFocused_C} rounded-xl h-12 outline-none px-3`}
                                    />
                                    */}
                                </div>

                                {/* Bouton d'envoi de message */}
                                <div id="ChatSendIcon"
                                    className="ml-4 mt-4 hover:scale-125 transform transition-transform duration-300 bouton_envoi"
                                    onClick={onSendMessage}>
                                    <ChatSendIcon />
                                </div>
                                <button
                                    onClick={() => {
                                        if (selectedChat.user_id) {
                                            setIsDeleteModal(true)
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
            </ClientDashboardLayout>
            {isDeleteModal && (
                <BaseModal close={() => setIsDeleteModal(false)}>
                    <div>
                        <h1 className="items-center justify-center text-center font-semibold text-lg mb-6">Suppression de la discussion</h1>
                        <p className="items-center justify-center text-center">Êtes-vous certain de vouloir supprimer la discussion ? </p>
                        <p className="items-center justify-center text-center">Ce processus est irreversible. </p>

                        <div className={'flex justify-center gap-5 mt-8'}>
                            <button className={`${Theme_A.button.smallBlackColoredButton}`}
                                onClick={() => setIsDeleteModal(false)}>Annuler
                            </button>
                            <button className={`${Theme_A.button.smallGradientButton}`} onClick={deleteChat}>Confirmer</button>

                        </div>
                    </div>
                </BaseModal>
            )}
            <Footer />
        </div>
    );
};

export default Messages;
