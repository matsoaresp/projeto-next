import "./globals.css";
import { AuthProvider } from "./shared/auth/AuthProvider";
import localFont from "next/font/local";
import { Lexend_Deca } from "next/font/google";
import { LoginProvider } from "./contexts/userContext";


const tommy = localFont({
  src: [
    {
      path: "./../public/fonts/made_tommy/MADE TOMMY Bold_PERSONAL USE.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-tommy",
});

const minhaFonte = localFont({
  src: [
    {
      path: "./../public/fonts/market_deco/Market_Deco.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-minha-fonte",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={minhaFonte.variable}>
      <body>
        <LoginProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
