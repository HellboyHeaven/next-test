// types.ts
export interface FormData {
    firstname: string;
    lastname: string;
    phone: string;
    email?: string; // Optional
    address: string;
    city: string;
    state: string;
    zipCode: string;
    area: number;
    jobType: number;
    jobSource: number;
    jobDescription?: string; // Optional
    startDate: string;
    startTime: string;
    endTime: string;
  }
  
  export interface FormSectionProps {
    formData: FormData;
    onChange: (name: keyof FormData, value: string) => void;
  }
