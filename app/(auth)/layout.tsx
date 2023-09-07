
import {ClerkProvider} from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import '../globals.css';

export const metadata = {
    title:'Threads Web App',
    description:'A Next.js 13 meta Thread Application'
}

const inter = Inter({subsets:['latin']});


type Props = {
  children:React.ReactNode;
}


export default function RootLayout({children}:Props) {

    return(
        <ClerkProvider>
            <html>
             <body className={`${inter.className} bg-dark-1`}>
                 {children}
             </body>
            </html>
        </ClerkProvider>
    )

}