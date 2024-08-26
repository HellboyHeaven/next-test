'use server'

import { DealsAPI } from "@/shared/pipedriveAPI";
import { FormData } from "@/types/formTypes";
import { cookies } from "next/headers";


export async function createDeal(dataForm : FormData) {
    const apiClient = JSON.parse(cookies().get('apiClient')?.value as string)
    const dealsApi = new DealsAPI(apiClient);
    
    try {
        const res = await dealsApi.addDeal('job', {custom_fields: dataForm})
        console.log(res)
    } catch (error : any) {
        console.log(error.message)
    }
}