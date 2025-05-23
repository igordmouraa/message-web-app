"use client";

import Navbar from "@/components/Navbar";
import Chat from "@/components/Chat";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <Chat />
                </div>
            </main>

            <footer className="bg-white border-t py-4 mt-8">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} RealTime Chat - Todos os direitos reservados
                </div>
            </footer>
        </div>
    );
}