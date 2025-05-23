"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Navbar() {
    const [user] = useAuthState(auth);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <Link href="/" className="flex items-center space-x-1">
                        <span className="text-blue-500 text-2xl">💬</span>
                        <span className="font-bold text-gray-800">RealTime Chat</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <Image
                                    width={100}
                                    height={100}
                                    src={user.photoURL || "/default-avatar.png"}
                                    alt={user.displayName || "User"}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <button
                                    onClick={() => signOut(auth)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition duration-200"
                                >
                                    Sair
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signInWithPopup(auth, googleProvider)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition duration-200 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.685-6.735-2.685-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.61-0.056-1.229-0.158-1.849h-9.842z"/>
                                </svg>
                                Entrar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}