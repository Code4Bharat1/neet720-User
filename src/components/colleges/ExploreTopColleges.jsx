"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ExternalLink, GraduationCap, ArrowRight } from "lucide-react";

// College Data
const colleges = [
  { 
    id: 1, 
    name: "Anjuman Islam", 
    location: "Mumbai", 
    image: "/anjuman.png", 
    link: "https://aiaessk.org/" 
  },
  { 
    id: 2, 
    name: "Bunts", 
    location: "Kurla, Mumbai", 
    image: "/bunts.png", 
    link: "https://www.buntscollege.org" 
  },
  { 
    id: 3, 
    name: "Diamond Jubilee", 
    location: "Mumbai", 
    image: "/anjuman.png", 
    link: "https://www.agakhanschools.org/india/djhsm/index" 
  },
  { 
    id: 4, 
    name: "St. Mary", 
    location: "Mumbai", 
    image: "/bunts.png", 
    link: "https://stmarysssc.org/" 
  },
  { 
    id: 5, 
    name: "Don Bosco", 
    location: "Kurla, Mumbai", 
    image: "/donbosco.png", 
    link: "https://donboscomatunga.com/" 
  },
  { 
    id: 6, 
    name: "SNDT College", 
    location: "Mumbai", 
    image: "/sndt.png", 
    link: "https://sndt.ac.in/" 
  },
  { 
    id: 7, 
    name: "Kalsekar College", 
    location: "Mumbra", 
    image: "/donbosco.png", 
    link: "https://aiktc.ac.in/" 
  },
  { 
    id: 8, 
    name: "Saboo Siddik College", 
    location: "Mumbai", 
    image: "/sndt.png", 
    link: "https://www.mhssce.ac.in/" 
  },
];

const ExploreTopCollegeCards = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Explore Top Colleges
            </h2>
          </div>
          <p className="text-gray-600">Discover the best medical colleges across Mumbai</p>
        </div>
        
        <Link 
          href="/explorecolleges" 
          className="group flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <span>See All Colleges</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* College Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {colleges.map((college) => (
          <Link
            href={college.link}
            target="_blank"
            rel="noopener noreferrer"
            key={college.id}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-teal-300 transform hover:-translate-y-2"
          >
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-500/0 via-teal-500/0 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            
            {/* View More Badge */}
            <div className="absolute top-3 right-3 z-20 bg-teal-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-lg">
              <span>View</span>
              <ExternalLink className="w-3 h-3" />
            </div>

            {/* Image Container */}
            <div className="relative bg-gradient-to-br from-teal-50 to-cyan-50 p-6 h-48 flex items-center justify-center overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-cyan-400 rounded-full translate-y-10 -translate-x-10"></div>
              </div>
              
              <Image
                src={college.image}
                alt={college.name}
                width={180}
                height={150}
                className="relative z-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Content Section */}
            <div className="relative z-20 p-5 space-y-3 bg-white">
              {/* College Name */}
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2">
                {college.name}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <p className="text-sm">{college.location}</p>
              </div>

              {/* Visit Link */}
              <div className="pt-2 flex items-center gap-2 text-teal-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                <span>Visit Website</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom Border Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-12 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-teal-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900">
              Cannot find your college?
            </h3>
            <p className="text-gray-600">
              Explore our complete database of 500+ medical colleges across India
            </p>
          </div>
          
          <Link
            href="/explorecolleges"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            Browse All Colleges
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreTopCollegeCards;
