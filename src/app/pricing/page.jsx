"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const PricingPage = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    { 
      name: 'Pro', 
      price: annual ? '₹1825' : '₹349', 
      period: annual ? '/year' : '/month', 
      desc: 'Everything you need for NEET 2025 preparation', 
      popular: true, 
      features: [
        'Unlimited NEET PYQs',
        'Full mock test library',
        'Smart AI test analytics',
        '24/7 AI doubt-solving assistant',
        'Rank & College Predictor'
      ] 
    },
    { 
      name: 'Institute', 
      price: 'Custom', 
      period: '',
      desc: 'The perfect plan for coaching institutes', 
      popular: false,
      features: [
        'All Pro features',
        'Multi-student access',
        'Institute Admin Dashboard',
        'Dedicated Support Manager',
        'Custom Branding & Logo'
      ] 
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 min-h-screen scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            Simple Pricing For Everyone
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Choose the plan that fits your journey
          </h2>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Whether you’re preparing solo or managing a coaching institute, we have a plan tailored for your needs.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 bg-white p-2 rounded-full shadow-lg border mt-6">
            <button 
              onClick={() => setAnnual(false)} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !annual ? 'bg-teal-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>

            <button 
              onClick={() => setAnnual(true)} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                annual ? 'bg-teal-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* PLANS */}
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto place-items-center">

          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-10 rounded-3xl w-full transition-all duration-300 hover:-translate-y-1 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-teal-600 to-teal-500 text-white shadow-2xl scale-105' 
                  : 'bg-white border-2 border-gray-100 hover:border-teal-200 hover:shadow-xl shadow-sm'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <h3 className={`text-3xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>

              <p className={`text-sm mb-4 ${plan.popular ? 'text-teal-100' : 'text-gray-500'}`}>
                {plan.desc}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-5xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`text-lg ${plan.popular ? 'text-teal-100' : 'text-gray-500'}`}>
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 text-sm">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-white/20' : 'bg-teal-100'
                    }`}>
                      <Check className={`w-3 h-3 ${
                        plan.popular ? 'text-white' : 'text-teal-600'
                      }`} />
                    </div>
                    <span className={plan.popular ? 'text-teal-50' : 'text-gray-700'}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button 
                className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-white text-teal-600 hover:bg-gray-100 shadow-lg' 
                    : 'bg-teal-600 text-white hover:bg-teal-700 shadow'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </button>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
