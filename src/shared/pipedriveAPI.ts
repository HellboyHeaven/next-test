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

    InitializeToken(authData : AuthData) {
        this.token = {
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            expireIn: authData.expireIn
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
        if ('custom_fields' in data) {
            const dealFieldsApi = new DealFieldsdAPI(this.apiClient)
            const fieldData = (await dealFieldsApi.getDealFields())
            const fields = fieldData.data as any[]
            console.log(fieldData)
            const customFields = data.custom_fields as any
            const dealFields : any = {}
            for (var fieldKey in customFields)  {
                const field = fields.find((f) => f.name == fieldKey)
                dealFields[field.key] = customFields[fieldKey]
            }
            data.custom_fields = dealFields
        }

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
        if (token === undefined || companyDomain === undefined) return
        const res = await executePromiseV1('POST', `/deals/${id}`, data, token.accessToken, companyDomain)
        if (res.data.code == 'UNAUTHORIZED') {
            const res = await refreshTokenPromise(token.refreshToken, this.apiClient.clientId, this.apiClient.clientSecret)
            this.apiClient.InitializeToken(res)
        }
        return res
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







