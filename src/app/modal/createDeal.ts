'use server'

import { ApiClient, DealsAPI } from "@/shared/pipedriveAPI";
import { FormData } from "@/types/formTypes";
import { cookies } from "next/headers";


export async function createDeal(dataForm : FormData, apiClient: ApiClient) {
    console.log(cookies().getAll())
    
    const dealsApi = new DealsAPI(apiClient);

    try {
        const res = await dealsApi.addDeal('hi', {custom_field: {'Firstname': 'loshped'}})
        console.log(res)
    } catch {
 
    }
}