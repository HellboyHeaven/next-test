 "use client"

import ClientDetails from "@/components/client-details";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk"
import { useEffect } from "react"



export default function Page() {
    useEffect(()=> {
        if (window === undefined) return;
        // new AppExtensionsSDK().initialize()
    })

    return (
        <div className="form-container">
            <ClientDetails/>
        </div>
    );
}