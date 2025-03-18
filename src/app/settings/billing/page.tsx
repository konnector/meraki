'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { CreditCard, Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 10,
    interval: 'month',
    features: [
      'Up to 10 spreadsheets',
      'Basic analytics',
      'Email support',
      '5GB storage'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 25,
    interval: 'month',
    features: [
      'Unlimited spreadsheets',
      'Advanced analytics',
      'Priority support',
      '50GB storage',
      'Team collaboration'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 50,
    interval: 'month',
    features: [
      'Everything in Pro',
      'Custom branding',
      'Dedicated support',
      'Unlimited storage',
      'Advanced security'
    ]
  }
];

export default function BillingPage() {
  const supabase = createClientComponentClient();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  return (
    <div className="max-w-4xl">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Billing & Subscription</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and payment methods.
        </p>
      </div>

      {/* Billing interval toggle */}
      <div className="mt-6 flex items-center justify-center">
        <div className="join">
          <button
            className={`join-item btn ${billingInterval === 'month' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setBillingInterval('month')}
          >
            Monthly
          </button>
          <button
            className={`join-item btn ${billingInterval === 'year' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setBillingInterval('year')}
          >
            Yearly
            <span className="ml-1.5 text-xs">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing plans */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg border p-6 ${
              selectedPlan === plan.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-white">
                  Popular
                </span>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${billingInterval === 'year' ? plan.price * 0.8 : plan.price}
                </span>
                <span className="text-sm text-gray-500">/{billingInterval}</span>
              </div>
              <ul className="mt-6 space-y-4 text-sm text-gray-500">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`mt-8 w-full btn ${
                  selectedPlan === plan.id ? 'btn-primary' : 'btn-outline'
                }`}
              >
                {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment method */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  •••• •••• •••• 4242
                </div>
                <div className="text-sm text-gray-500">Expires 12/24</div>
              </div>
            </div>
          </div>
          <button className="btn btn-outline">
            Update
          </button>
        </div>
      </div>

      {/* Billing history */}
      <div className="mt-12">
        <h3 className="text-lg font-medium text-gray-900">Billing History</h3>
        <div className="mt-4 rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-500">Mar 1, 2024</td>
                <td className="px-6 py-4 text-sm text-gray-900">$25.00</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm text-primary hover:text-primary/80">
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 