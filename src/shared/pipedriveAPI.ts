import { Token } from "@/types/tokenType";
import { AuthData, authrizePromise, refreshTokenPromise, executePromiseV1, executePromiseV2 } from "./pipedrivePromise";



export class ApiClient {
    clientId : string
    clientSecret : string
    redirectURL : string

    
    companyDomain?: string
    token?: Token

    constructor(clientId: string, clientSecret: string, redirectURL: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectURL = redirectURL
    }
    async authrize(code: string) {
        const auth = await authrizePromise(code, this.clientId, this.clientSecret, this.redirectURL);
        this.companyDomain = auth.apiDomain
        this.InitializeToken(auth)

    }

    async updateToken() {
        const auth = await refreshTokenPromise(this.token!.refreshToken, this.clientId, this.clientSecret)
        this.InitializeToken(auth)
    }

    async refreshToken(refreshToken : string) {
        const auth = await refreshTokenPromise(refreshToken, this.clientId, this.clientSecret)
        this.InitializeToken(auth)
    }

    buildAuthURL = () => `https://oauth.pipedrive.com/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectURL}`

    InitializeToken(authData : AuthData) {
        this.token = {
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            expireAt: authData.expireAt
        }
       
    }

   
    
}

abstract class PipeAPI {
    apiClient: ApiClient
    constructor(apiClient : ApiClient) {
        this.apiClient = apiClient
    }
}

export class DealsAPI extends PipeAPI {

    async addDeal(title: string, data = {} ) {
        Object.assign(data, {title: title})
        const token = this.apiClient.token;
        const companyDomain = this.apiClient.companyDomain

        data = await this.UpdatedCustomFields(data);

        if (token === undefined || companyDomain === undefined) return
        const res = await executePromiseV1('POST', `/deals`, data, token.accessToken, companyDomain)
        if (res.data.code == 'UNAUTHORIZED') {
            const res = await refreshTokenPromise(token.refreshToken, this.apiClient.clientId, this.apiClient.clientSecret)
            this.apiClient.InitializeToken(res)
        }
        return res.data
    }

    async updateDeal(id: number, data = {}) {
        const token = this.apiClient.token;
        const companyDomain = this.apiClient.companyDomain

        data = await this.UpdatedCustomFields(data);

        if (token === undefined || companyDomain === undefined) return
        const res = await executePromiseV1('POST', `/deals/${id}`, data, token.accessToken, companyDomain)
        if (res.data.code == 'UNAUTHORIZED') {
            const res = await refreshTokenPromise(token.refreshToken, this.apiClient.clientId, this.apiClient.clientSecret)
            this.apiClient.InitializeToken(res)
        }
        return res
    }

    async UpdatedCustomFields(data : any) {
        if ('custom_fields' in data) {
            const dealFieldsApi = new DealFieldsdAPI(this.apiClient)
            const fieldData = (await dealFieldsApi.getDealFields())
            const fields = fieldData.data as any[]
            console.log(fieldData)
            const customFields = data.custom_fields as any
            const dealFields : any = {}
            for (var fieldKey in customFields)  {
                const field = fields.find((f) =>  comapreStringIgnoreCaseAndWhitespaces(f.name as string, fieldKey))
                if (field === undefined) continue
                
                dealFields[field.key] = customFields[fieldKey]
                if ('options' in field) {
                    const options = data.options as any[]
                    console.log('options: ', options)
                    console.log("option: ", customFields[fieldKey])
                    const option = options[customFields[fieldKey] - 1].id
                    dealFields[field.key] = option
                }
            }
            
            data.custom_fields = dealFields
        }
        console.log(JSON.stringify(data))
        return data;
    }
}

export class DealFieldsdAPI extends PipeAPI {
    async getDealFields() {
        const token = this.apiClient.token;
        const companyDomain = this.apiClient.companyDomain
        if (token === undefined || companyDomain === undefined) return
        const res = await executePromiseV2('GET', `/dealFields`, {}, token.accessToken, companyDomain)
        if (res.data.code == 'UNAUTHORIZED') {
            const res = await refreshTokenPromise(token.refreshToken, this.apiClient.clientId, this.apiClient.clientSecret)
            this.apiClient.InitializeToken(res)
        }
        return res.data
    }
}

function comapreStringIgnoreCaseAndWhitespaces(a: string, b: string) {
    return a.trim().toLowerCase() == b.trim().toLowerCase()
}





