import { FormSectionProps, FormData } from '@/types/formTypes';
import React from 'react';

export default function JobDetails({ formData, onChange }: FormSectionProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange(name as keyof FormData, value);
    };
  
    return (
        <div className="p-4 bg-white shadow rounded-lg space-y-4">
          <h2 className="text-lg font-semibold">Job details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="jobType"
              className="border rounded-lg p-2"
              value={formData.jobType}
              onChange={handleInputChange}
              required
            >
              <option value={0}>Job type</option>
              <option value={1}>Type 1</option>
              <option value={2}>Type 2</option>
            </select>
            <select
              name="jobSource"
              className="border rounded-lg p-2"
              value={formData.jobSource}
              onChange={handleInputChange}
              required
            >
              <option value={0}>Job source</option>
              <option value={1}>Source 1</option>
              <option value={2}>Source 2</option>
            </select>
          </div>
          <textarea
            name="jobDescription"
            placeholder="Job description (optional)"
            className="border rounded-lg p-2 w-full"
            value={formData.jobDescription}
            onChange={handleInputChange}
          />
        </div>
      );
    }