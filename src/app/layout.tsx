import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Message Web App',
    description: 'Aplicativo de mensagens em tempo real',
    openGraph: {
        url: 'https://message-web-app-ten.vercel.app/',
        siteName: 'Message Web App',
        images: [
            {
                url: '/website.png',
                width: 1200,
                height: 630,
                alt: 'Imagem de preview do app',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Message Web App',
        description: 'Converse em tempo real com seus amigos!',
        images: ['/website.png'],
    },
    icons: {
        icon: '/message-square.svg',
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    )
}