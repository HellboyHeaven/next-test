import { FormSectionProps, FormData } from '@/types/formTypes';
import React from 'react';

export default function ServiceDetails({ formData, onChange }: FormSectionProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange(name as keyof FormData, value);
    };
    return (
        <div className="p-4 bg-white shadow rounded-lg space-y-4">
            <h2 className="text-lg font-semibold">Service location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                type="text"
                name="address"
                placeholder="Address"
                className="border rounded-lg p-2"
                value={formData.address}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                className="border rounded-lg p-2"
                value={formData.city}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="state"
                placeholder="State"
                className="border rounded-lg p-2"
                value={formData.state}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="zipCode"
                placeholder="Zip code"
                className="border rounded-lg p-2"
                value={formData.zipCode}
                onChange={handleInputChange}
            />
            <select
                name="area"
                className="border rounded-lg p-2"
                value={formData.area}
                onChange={handleInputChange}
            >
                <option value={0}>Area</option>
                <option value={1}>Area 1</option>
                <option value={2}>Area 2</option>
            </select>
            </div>
        </div>
    );
}
