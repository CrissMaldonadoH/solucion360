'use client'
import { ReactNode, useEffect, useState } from "react"
import { MsalProvider } from "@azure/msal-react"
import { Provider } from "react-redux"
import msalInstance from "@/app/auth/msalConfig"
import store from "@/app/redux/store"
import logoBlanco from '../../public/img/logo-blanco.png'
import Image from "next/image"

export default function ClientProviders({ children }: { children: ReactNode }) {
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    //const [animate, setAnimate] = useState<boolean>(false);

    useEffect(() => {
        //setAnimate(true)
       const initializeMsal = async () => {
            await msalInstance.initialize();
            setIsInitialized(true);
        };
        initializeMsal();
    }, [])
  return (
    <>
        {
            isInitialized ? 
                <MsalProvider instance={msalInstance}>
                    <Provider
                        store={store}
                    >
                        {children}
                    </Provider>
                </MsalProvider>
            :
            <div className="absolute w-full top-0 bottom-0 bg-main z-50 flex items-center justify-center">
                <Image
                    src={logoBlanco}
                    alt="logo"
                    width={150}
                />
            </div>

        }
    </>
  )
}
