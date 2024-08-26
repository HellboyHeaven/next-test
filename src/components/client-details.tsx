import { FormSectionProps, FormData } from '@/types/formTypes';
import React from 'react';


export default function ClientDetails({ formData, onChange }: FormSectionProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof FormData, value);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-lg font-semibold">Client details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          className="border rounded-lg p-2"
          value={formData.firstname}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          className="border rounded-lg p-2"
          value={formData.lastname}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="border rounded-lg p-2"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          className="border rounded-lg p-2"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
