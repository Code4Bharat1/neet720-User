"use client";

import { useState } from "react";
import { ArrowRight, Users, Target, TrendingUp, Award, School } from "lucide-react";

const PredictionCard = () => {
  const handleNavigate = (path) => {
    console.log(`Navigating to ${path}`);
    // router.push(path);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Boost Your Career</h1>
        <p className="text-lg text-gray-600">
          Access AI-powered tools to predict your rank and find your dream medical college.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <Users className="w-6 h-6" />,
            stat: "50k+",
            label: "Students Helped",
            color: "bg-teal-500"
          },
          {
            icon: <Target className="w-6 h-6" />,
            stat: "98%",
            label: "Prediction Accuracy",
            color: "bg-teal-500"
          },
          {
            icon: <School className="w-6 h-6" />,
            stat: "Top 10",
            label: "Colleges Covered",
            color: "bg-teal-500"
          }
        ].map((item, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`${item.color} text-white p-3 rounded-lg`}>
                {item.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{item.stat}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prediction Tools Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 uppercase tracking-wide text-sm">
          Prediction Tools
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rank Predictor Card */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-lg transition-all hover:border-teal-300">
            <div className="space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-teal-600" />
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">Rank Predictor</h3>
                <p className="text-gray-600 leading-relaxed">
                  Input your mock scores and let AI analyze historical trends to predict your All India Rank instantly.
                </p>
              </div>
              
              {/* CTA Button */}
              <button
                onClick={() => handleNavigate('/rank-predictor')}
                className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors group"
              >
                <span>Start Prediction</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* College Predictor Card */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-lg transition-all hover:border-teal-300">
            <div className="space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                <School className="w-8 h-8 text-teal-600" />
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">College Predictor</h3>
                <p className="text-gray-600 leading-relaxed">
                  Find out your chances of getting into top government medical colleges based on your category.
                </p>
              </div>
              
              {/* CTA Button */}
              <button
                onClick={() => handleNavigate('/college-predictor')}
                className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors group"
              >
                <span>Explore Colleges</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default PredictionCard;