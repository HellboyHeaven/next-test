'use server'

import { getAPIClient } from "@/shared/oauth";
import { FormData } from "@/types/formTypes";
import { cookies } from "next/headers";
import {NewDeal, DealsApi} from "pipedrive"

export async function createDeal(dataForm) {
    const apiClient = getAPIClient(cookies)
    const dealsApi = new DealsApi(apiClient);
    let opts = NewDeal.constructFromObject({
        title: 'job',
        '261c3108ceb5fc8c86cf3095bfbe260aac904d7c': 'yersaaaa'
      });

    try {
        const res = await dealsApi.addDeal(opts)
        console.log(res)
    } catch {
 
    }
}