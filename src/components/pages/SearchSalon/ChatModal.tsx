import React, { FC } from "react";
import BaseModal from "@/components/UI/BaseModal";
import { ChatSendIcon } from "@/components/utilis/Icons";
import { Theme_A } from '@/components/utilis/Themes';
import { useRouter } from "next/navigation";

interface Message {
    content: string;
    sent: boolean;
}

interface ChatModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    messages: Message[];
    message: string;
    setMessage: (val: string) => void;
    sendMessage: () => void;
}

const ChatModal: FC<ChatModalProps> = ({
    isModalOpen,
    closeModal,
    messages,
    message,
    setMessage,
    sendMessage,
}) => {
    const router = useRouter();

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
                            {messages.map((msg, index) => (
                                <div key={`msg-${index}`} className={`${msg.sent ? 'text-right' : 'text-left'} mb-2`}>
                                    <div
                                        className={`inline-block p-2 text-xs outline-1 ${msg.sent ? 'rounded-l-lg rounded-b-lg outline outline-orange-500 bg-stone-100' : 'rounded-r-lg rounded-b-lg outline outline-stone-400 bg-white'}`}
                                    >
                                        <strong>{msg.sent ? 'Vous:' : 'Client:'}</strong> {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-1">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Écrire un message"
                                className="flex-grow border border-gray-300 rounded-xl p-2 min-w-0 focus:outline-none focus:border-red-500 shadow-inner"
                            />
                            <button type="button" onClick={sendMessage} className="transform hover:scale-105 ">
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
