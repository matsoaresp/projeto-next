'use client'
import { createContext } from "react";
import { useState } from "react";


interface IUsuarioLogadoContext {

    nome: string;
    email: string;
    setNome: (value: string) => void;
    setEmail: (value: string) => void;

}

export const LoginContext = createContext<IUsuarioLogadoContext>({

    nome: "",
    email: "",
    setNome: () => { },
    setEmail: () => { },

});

export function LoginProvider({ children }: { children: React.ReactNode }) {


    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")

    return (
        <LoginContext.Provider value={{ nome, email, setNome, setEmail }}>
            {children}
        </LoginContext.Provider>
    );
}