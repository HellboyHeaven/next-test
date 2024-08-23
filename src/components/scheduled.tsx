import { FormSectionProps, FormData } from '@/types/formTypes';
import React from 'react';

export default function Scheduled({ formData, onChange }: FormSectionProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange(name as keyof FormData, value);
    };
    return (
        <div className="p-4 bg-white shadow rounded-lg space-y-4">
          <h2 className="text-lg font-semibold">Scheduled</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <input
              type="date"
              name="startDate"
              className="border rounded-lg p-2"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="time"
                name="startTime"
                className="border rounded-lg p-2"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />
              <input
                type="time"
                name="endTime"
                className="border rounded-lg p-2"
                value={formData.endTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
    );
}