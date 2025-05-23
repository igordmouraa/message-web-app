"use client";

import {useEffect, useState, FormEvent, useRef} from "react";
import {db, auth, googleProvider} from "../lib/firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
    limit,
} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import Message from "./Message";
import {IoSend} from "react-icons/io5";
import {FiLoader} from "react-icons/fi";
import {signInWithPopup} from "firebase/auth";

type MessageType = {
    id: string;
    text: string;
    user: string;
    uid: string;
    photoURL?: string;
    timestamp?: Timestamp;
};

export default function Chat() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [input, setInput] = useState("");
    const [user, loading] = useAuthState(auth);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user) {
            setMessages([]);
            return;
        }

        const q = query(
            collection(db, "messages"),
            orderBy("timestamp", "asc"),
            limit(100)
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const msgs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as MessageType[];
                setMessages(msgs);

                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
                }, 100);
            },
            (error) => {
                console.error("Error fetching messages:", error);
            }
        );

        return () => unsubscribe();
    }, [user]);

    const sendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !user || isSending) return;

        setIsSending(true);
        try {
            await addDoc(collection(db, "messages"), {
                text: input,
                user: user.displayName || "Anônimo",
                photoURL: user.photoURL,
                uid: user.uid,
                timestamp: serverTimestamp(),
            });
            setInput("");
            messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsSending(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FiLoader className="animate-spin text-blue-500 text-2xl"/>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
             style={{minHeight: 'calc(100vh - 200px)'}}>
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Chat em Tempo Real</h2>
                <p className="text-sm text-gray-500">
                    {user ? `Conectado como ${user.displayName}` : "Faça login para ver as mensagens"}
                </p>
            </div>

            {user ? (
                <>
                    <div
                        className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                        id="messages-container"
                    >
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <p>Nenhuma mensagem ainda</p>
                                <p className="text-sm">Seja o primeiro a enviar uma mensagem!</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <Message
                                    key={msg.id}
                                    text={msg.text}
                                    user={msg.user}
                                    photoURL={msg.photoURL}
                                    timestamp={msg.timestamp?.toDate()}
                                    isOwnMessage={msg.uid === user?.uid}
                                />
                            ))
                        )}
                        <div ref={messagesEndRef}/>
                    </div>

                    <form onSubmit={sendMessage} className="p-4 border-t bg-white">
                        <div className="flex items-center gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500"
                                placeholder="Digite sua mensagem..."
                                disabled={isSending}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isSending}
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center disabled:bg-blue-300 transition duration-200"
                            >
                                {isSending ? (
                                    <FiLoader className="animate-spin"/>
                                ) : (
                                    <IoSend className="text-lg"/>
                                )}
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center p-6">
                        <p className="text-gray-600 mb-4">Você precisa estar logado para ver as mensagens</p>
                        <button
                            onClick={() => signInWithPopup(auth, googleProvider)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition duration-200"
                        >
                            Entrar com Google
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}