'use server'

import { getAPIClient } from "@/shared/oauth";
import { DealsAPI } from "@/shared/pipedriveAPI";
import { FormData } from "@/types/formTypes";
import { cookies } from "next/headers";


export async function createDeal(dataForm : FormData) {
    const apiClient = getAPIClient(cookies())
    const dealsApi = new DealsAPI(apiClient);

    try {
        const res = await dealsApi.addDeal('hi', {custom_field: {'Firstname': 'loshped'}})
        console.log(res)
    } catch {
 
    }
}