 "use client"

import AppExtensionsSDK from "@pipedrive/app-extensions-sdk"
import { useEffect } from "react"




export default function Page() {
    useEffect(()=> {
        if (window === undefined) return;
        new AppExtensionsSDK().initialize()
    })
    return <h1>MODAL!</h1>
}