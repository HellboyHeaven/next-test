'use server'

import { ApiClient, DealsAPI } from "@/shared/pipedriveAPI";
import { FormData } from "@/types/formTypes";
import { cookies } from "next/headers";


export async function createDeal(dataForm : FormData) {
    const cookie = cookies().get('apiClient')?.value as string
   
    try {
        const apiClient = JSON.parse(cookie) as ApiClient
        const dealsApi = new DealsAPI(apiClient);
        const res = await dealsApi.addDeal('job', {custom_fields: dataForm})
    } catch (error : any) {
        console.log(error.message)
    }
}