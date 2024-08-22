import AppExtensionsSDK from "@pipedrive/app-extensions-sdk"

export default function Page() {
    new AppExtensionsSDK().initialize()
    return <h1>Hello, Home page!</h1>
}