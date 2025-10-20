import type {Metadata} from "next";
import {Provider} from "@/components/ui/provider"
import Header from "@/components/ui/header";
import React from "react";
import {
    Amatic_SC,
    Caveat,
    Comfortaa,
    Dancing_Script,
    Fira_Code, Nunito,
    Pacifico,
    Poppins,
    Quicksand,
    Roboto, Varela_Round
} from 'next/font/google'

// Configuration de Roboto
const roboto = Roboto({
    weight: ['300', '400', '500', '700'], // Poids de police disponibles
    subsets: ['latin'],
    variable: '--font-roboto'
})

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins'
})

export const metadata: Metadata = {
    title: "Codecrafting",
    description: "Codecrafting website",
};

const firaCode = Fira_Code({
    subsets: ['latin'],
    variable: '--font-firacode'
})

const varela = Varela_Round({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-varela'
})

export default function RootLayout(props: { children: React.ReactNode }) {
    const {children} = props
    return (
        <html
            suppressHydrationWarning
            className={firaCode.className}
        >
            <body>
            <Provider>
                <header>
                    <Header/>
                </header>
                {children}
            </Provider>
            </body>

        </html>
    )
}