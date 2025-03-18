'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Upload } from 'lucide-react';

export default function ProfilePage() {
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState({
    companyName: '',
    tagline: '',
    logo: null as File | null,
    showLogoInReports: true,
    showLogoInEmails: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-lg font-medium text-black">Company Profile</h2>
      <p className="mt-1 text-sm text-gray-500">
        Update your company photo and details here.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-black">
            Company logo
          </label>
          <div className="mt-1 flex items-center space-x-5">
            <div className="relative flex items-center justify-center w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
              {formData.logo ? (
                <img
                  src={URL.createObjectURL(formData.logo)}
                  alt="Company logo preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <span className="mt-2 block text-xs font-medium text-gray-600">Upload</span>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleLogoUpload}
                accept="image/*"
              />
            </div>
            <div className="text-sm text-gray-500">
              <p>Click to upload or drag and drop</p>
              <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-black">
            Company name
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 input input-bordered w-full bg-white focus:ring-2 focus:ring-black"
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-black">
            Tagline
          </label>
          <textarea
            name="tagline"
            id="tagline"
            rows={3}
            value={formData.tagline}
            onChange={handleChange}
            className="mt-1 textarea textarea-bordered w-full bg-white focus:ring-2 focus:ring-black"
            placeholder="A quick snapshot of your company"
          />
          <p className="mt-2 text-sm text-gray-500">
            Brief description for your profile.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-black">Branding</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="showLogoInReports"
              id="showLogoInReports"
              checked={formData.showLogoInReports}
              onChange={handleChange}
              className="checkbox checkbox-black"
            />
            <label htmlFor="showLogoInReports" className="ml-3 text-sm text-gray-700">
              Show logo in reports
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="showLogoInEmails"
              id="showLogoInEmails"
              checked={formData.showLogoInEmails}
              onChange={handleChange}
              className="checkbox checkbox-black"
            />
            <label htmlFor="showLogoInEmails" className="ml-3 text-sm text-gray-700">
              Show logo in emails
            </label>
          </div>
        </div>
      </form>
    </div>
  );
} 