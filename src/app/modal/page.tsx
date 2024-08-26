 "use client"

import ClientDetails from "@/components/client-details";
import JobDetails from "@/components/job-details";
import Scheduled from "@/components/scheduled";
import ServiceDetails from "@/components/service-details";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk"
import { FormEvent, useEffect, useState } from "react"
import { createDeal } from "./createDeal";
import { FormData } from "@/types/formTypes";


export default function Page() {
    useEffect(()=> {
        if (window === undefined) return;
        new AppExtensionsSDK().initialize({size: { height: 1000, width: 1000 }})
    })
    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        area: '',
        jobType: '',
        jobSource: '',
        jobDescription: '',
        startDate: '',
        startTime: '08:00',
        endTime: '08:00',
      });
      
      const handleChange = (name : string, value : string) => {
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createDeal(formData)
      };
    

    return (
        <form className="grid grid-cols-[1fr_1fr] gap-5 p-10" method="POST" onSubmit={handleSubmit}>
            <ClientDetails formData={formData} onChange={handleChange}/>
            <JobDetails formData={formData} onChange={handleChange}/>
            <ServiceDetails formData={formData} onChange={handleChange}/>
            <Scheduled formData={formData} onChange={handleChange}/>
            <button type="submit" className="bg-yellow-500 text-black p-2 rounded-full shadow">
                Create Job
            </button>
            <button className="bg-gray-300 text-black p-2 rounded-full shadow">
                Save Info
            </button>
        </form>
    );
}