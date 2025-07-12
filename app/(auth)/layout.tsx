import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";


//used for google fonts
const inter = Inter({ subsets: ["latin"] });

//used for SEO search engime optimization 
export const metadata: Metadata = {
  title: "Developer Hub",
  description: "A next.js application specially for Developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //used clerk for authentication of users and make communities
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        {/* used inter.classname to apply same font on all classes that is inter */}
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
          </body>
      </html>
    </ClerkProvider>
  );
}