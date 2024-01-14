import React, { FC, useEffect, useState } from "react";
import BaseModal from "@/components/UI/BaseModal";
import { ChatSendIcon } from "@/components/utilis/Icons";
import { Theme_A, ColorsThemeA } from '@/components/utilis/Themes';
import { useRouter } from "next/navigation";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import { Chat } from "@/types";
import CustomInput from "@/components/UI/CustomInput";

interface Message {
    content: string;
    sent: boolean;
}

interface ChatModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    className?: string; // Ajouter ceci
    professionalData: any
}

const ChatModal: FC<ChatModalProps> = ({
    isModalOpen,
    closeModal,
    professionalData
}) => {
    const router = useRouter();
    const user = getLocalStorage("user");
    const userData = user ? JSON.parse(user) : null
    const [chats, setChats] = useState<Chat[]>([])
    const [message, setMessage] = useState("");

    const getChat = async () => {
        if (userData) {
            await dashboard.getChat(userData.id, professionalData.user_id)
                .then(resp => {
                    setChats(resp.data.data)
                })
                .catch(err => console.log(err))
        }
    }

    const onSendMessage = async () => {
        if (message) {
            const data = {
                client_id: userData.id,
                professional_id: professionalData.user_id,
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

    useEffect(() => {
        getChat()
    }, [])
    return (
        <>
            {isModalOpen && (
                <BaseModal close={closeModal}>
                    <div className="flex flex-col gap-2">
                        <div className="text-center text-xl">
                            <strong>Posez votre question</strong>
                        </div>
                        <button
                            onClick={() => router.push('/client/messages')}
                            className={`mt-4 mb-2 ${Theme_A.button.medBlackColoredButton}`}
                        >
                            Vers la messagerie
                        </button>
                        <div className="border border-gray-300 rounded-xl p-2 rounded-bl-lg overflow-auto h-40 bg-stone-100 shadow-inner mb-2">
                            {chats.map((msg, index) => (
                                <div key={`msg-${index}`} className={`${msg.by === 'client' ? 'text-left' : 'text-right'} mb-2`}>
                                    <div
                                        className={`inline-block p-2 text-xs outline-1 ${msg.by === 'client' ? `rounded-r-lg rounded-b-lg text-white text-xs font-light  ${ColorsThemeA.OhcGradient_D}  shadow-md shadow-stone-300 ` : 'rounded-l-lg rounded-b-lg bg-stone-200 shadow-md shadow-stone-300 '}`}
                                    >
                                        <strong>{msg.by === 'client' ? 'Vous' : professionalData.name}:</strong> {msg.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 w-auto mt-4">
                            <div className="flex-grow">
                                <CustomInput
                                    id="sendMessageInput"
                                    label="Écrire un message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onEnterPress={onSendMessage}
                                />
                                {/*
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Écrire un message"
                                className="flex-grow border border-gray-300 rounded-xl p-2 min-w-0 focus:outline-none focus:border-red-500 shadow-inner"
                            />
                             */}
                            </div>
                            <button type="button" onClick={onSendMessage} id="ChatSendIcon" className="transform hover:scale-105">
                                <ChatSendIcon />
                            </button>
                        </div>
                    </div>
                </BaseModal>
            )}
        </>
    );
};

export default ChatModal;
