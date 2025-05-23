import clsx from "clsx";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from "next/image";

type MessageProps = {
    text: string;
    user: string;
    photoURL?: string;
    timestamp?: Date;
    isOwnMessage: boolean;
};

export default function Message({
                                    text,
                                    user,
                                    photoURL,
                                    timestamp,
                                    isOwnMessage,
                                }: MessageProps) {
    return (
        <div className={clsx("flex mb-3", isOwnMessage ? "justify-end" : "justify-start")}>
            <div className={clsx(
                "flex items-start gap-2 max-w-xs p-3 rounded-lg shadow",
                isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
            )}>
                {!isOwnMessage && photoURL && (
                    <Image
                        width={100}
                        height={100}
                        src={photoURL}
                        alt={user}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                )}
                <div>
                    {!isOwnMessage && <p className="text-sm font-semibold">{user}</p>}
                    <p className="text-sm">{text}</p>
                    {timestamp && (
                        <p className="text-xs mt-1 opacity-80">
                            {format(timestamp, "HH:mm", { locale: ptBR })}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}