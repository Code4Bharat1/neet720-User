"use client";
import React, { useState, useEffect } from 'react';
import { Check, Star, ChevronDown, ChevronUp, BookOpen, Brain, Target, Users, Award, Clock, Zap, BarChart3, MessageCircle, Phone, Mail, Menu, X, ArrowUp, Play, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { motion } from "framer-motion";

// Scroll to Top Button
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  
  if (!visible) return null;
  
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 hover:scale-110 transition-all duration-300 flex items-center justify-center"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

// Hero Section
const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Crack NEET with Confidence Using AI';
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Target, text: 'Practice until perfect' },
    { icon: Brain, text: 'GPT-4o AI Integration' },
    { icon: BarChart3, text: 'Deep Analytics' },
    { icon: Award, text: 'College Predictor' }
  ];

  const dashboardStats = [
    { label: 'Questions', value: '65,240', icon: BookOpen },
    { label: 'Accuracy', value: '87%', icon: Target },
    { label: 'Rank', value: '#156', icon: Award }
  ];

  return (
    <section id="hero" className="bg-gradient-to-br from-slate-50 via-teal-50/30 to-white py-16 md:py-24 overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> NEET 2025 Ready
              </span>
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-lg">
                #1 Rated Platform
              </span>
            </div>
            
            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Best NEET Preparation Platform – 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Master NEET with focused resources, flexible revision plans, and personalized insights to ace 720 with clarity and confidence.
            </p>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {features.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-200 transition-all duration-300 cursor-pointer group">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/signup">
                <button className="group bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  Get Started Free
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </Link>
              <button className="flex items-center gap-2 px-6 py-4 rounded-xl font-medium text-gray-700 bg-white border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-300">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-teal-600 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D'].map((letter, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-500">Trusted by 10,000+ students</p>
              </div>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />
              
              {/* Window Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Live Dashboard</span>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {dashboardStats.map((stat, i) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={i} className="text-center p-4 bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 hover:scale-105 transition-transform cursor-pointer">
                      <StatIcon className="w-5 h-5 text-teal-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-teal-600">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
              
              {/* Chart */}
              {/* <div className="h-40 bg-gradient-to-br from-slate-50 to-teal-50 rounded-2xl p-4 relative overflow-hidden">
                <div className="text-xs text-gray-500 mb-2 font-medium">Weekly Progress</div>
                <div className="flex items-end justify-around h-24 gap-2">
                  {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-gradient-to-t from-teal-500 to-teal-300 rounded-t-lg transition-all duration-500 hover:from-teal-600 hover:to-teal-400" 
                        style={{ height: `${h}%` }} 
                      />
                      <span className="text-xs text-gray-400">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section
const Stats = () => {
  const stats = [
    { value: '100k+', label: 'Questions', icon: BookOpen },
    { value: '20+', label: 'Years PYQs', icon: Clock },
    { value: '10k+', label: 'Active Learners', icon: Users },
    { value: '24/7', label: 'AI Support', icon: MessageCircle }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <div key={i} className="text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <StatIcon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Features Section
const Features = () => {
  const features = [
    { 
      icon: BookOpen, 
      title: 'Smart Exam Plan', 
      desc: 'AI-powered study plans that adapt to your progress', 
      items: ['Auto-generate schedules', 'Smart reminders', 'Progress tracking'] 
    },
    { 
      icon: MessageCircle, 
      title: '24×7 AI Chatbot', 
      desc: 'Instant doubt resolution powered by GPT-4o', 
      items: ['Upload questions', 'Step-by-step solutions', 'Available anytime'] 
    },
    { 
      icon: BarChart3, 
      title: 'Deep Analytics', 
      desc: 'Comprehensive performance insights', 
      items: ['Chapter-wise reports', 'Weakness detection', 'Peer comparison'] 
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-slate-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
             Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to score 720
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Train your exam strategy, clear doubts expertly, and track every mark with intelligent insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const FeatureIcon = feature.icon;
            return (
              <div key={i} className="group bg-white p-8 rounded-3xl border border-gray-100 hover:border-teal-200 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-teal-100 rounded-full -translate-y-20 translate-x-20 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <FeatureIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.desc}</p>
                <ul className="space-y-3">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-teal-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Practice Section
const Practice = () => {
  const practiceItems = [
    { icon: Clock, title: 'Full Test Series', desc: 'Simulate actual NEET with full-length mock tests.' },
    { icon: Zap, title: 'Subject-wise Analysis', desc: 'Drill down into Physics, Chemistry, and Biology.' },
    { icon: Target, title: 'College Predictor', desc: 'Estimate your chances at top medical colleges.' },
    { icon: Users, title: 'Create Your Own Test', desc: 'Build custom tests from PYQs or topics.' },
    { icon: Brain, title: 'Fast Quiz Mode', desc: 'Quick revision with time-bound quizzes.' },
    { icon: BookOpen, title: 'Result & Ranks', desc: 'Access previous tests with detailed solutions.' }
  ];

  return (
    <section id="practice" className="py-16 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            Test Practice & Deep Care AI
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Master NEET pattern with exam-like practice
          </h2>
          <p className="text-gray-600 mt-2">
            Every test designed exactly like actual NEET 720.
          </p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {practiceItems.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div key={i} className="p-5 bg-gray-50 rounded-xl hover:bg-teal-50 transition cursor-pointer group">
                <ItemIcon className="w-8 h-8 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  
  const plans = [
    { 
      name: 'Pro', 
      price: annual ? '₹1825' : '₹349', 
      period: annual ? '/year' : '/month', 
      desc: 'Everything you need', 
      popular: true, 
      features: ['Unlimited PYQs', 'Full test library', 'AI analytics', '24/7 chatbot', 'College predictor'] 
    },
    { 
      name: 'Institute', 
      price: 'Custom', 
      period: '',
      desc: 'For coaching centers', 
      popular: false,
      features: ['All Pro features', 'Multi-student access', 'Admin dashboard', 'Dedicated support', 'Custom branding'] 
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
             Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose your plan
          </h2>
          
          {/* Toggle */}
          <div className="inline-flex items-center gap-4 bg-white p-2 rounded-full shadow-lg border">
            <button 
              onClick={() => setAnnual(false)} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!annual ? 'bg-teal-600 text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setAnnual(true)} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${annual ? 'bg-teal-600 text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Yearly
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-8 rounded-3xl transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-teal-600 to-teal-500 text-white shadow-2xl scale-105' 
                  : 'bg-white border-2 border-gray-100 hover:border-teal-200 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                   MOST POPULAR
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.popular ? 'text-teal-100' : 'text-gray-500'}`}>
                {plan.desc}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`text-sm ${plan.popular ? 'text-teal-100' : 'text-gray-500'}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-white/20' : 'bg-teal-100'}`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-teal-600'}`} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-semibold transition-all ${
                plan.popular 
                  ? 'bg-white text-teal-600 hover:bg-gray-100 shadow-lg' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}>
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const Testimonials = () => {
  const testimonials = [
    { name: 'Aditi Sharma', score: 'NEET 2024', review: 'The analytics are detailed and have been a game changer for me.', rating: 5 },
    { name: 'Rahul Verma', score: 'Aspiring MBBS', review: 'Love the AI chatbot feature! Every doubt gets resolved in seconds.', rating: 5 },
    { name: 'Sneha Iyer', score: 'Medical Aspirant', review: 'Finally a platform that fits into my busy prep schedule perfectly.', rating: 5 }
  ];

  return (
    <section id="testimonials" className="py-16 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
            Student Stories
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Trusted by focused NEET aspirants across India
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">&quot;{t.review}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const [open, setOpen] = useState(0);
  
  const faqs = [
    { q: 'How is NEET 720 different from other platforms?', a: 'We combine AI-powered analytics, adaptive learning, and comprehensive question banks for a personalized experience.' },
    { q: 'Can I upgrade or downgrade my plan?', a: 'Yes! Upgrades are immediate, downgrades take effect at the next billing cycle.' },
    { q: 'Is there a free trial?', a: 'Yes, we offer a 7-day free trial with full access to all Pro features.' },
    { q: 'Do you support coaching institutes?', a: 'Absolutely! Our Institute plan includes multi-student management and dedicated support.' }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
             FAQ
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Common Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`bg-slate-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                open === i ? 'shadow-lg ring-2 ring-teal-200' : 'hover:bg-slate-100'
              }`}
            >
              <button 
                onClick={() => setOpen(open === i ? -1 : i)} 
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  open === i ? 'bg-teal-600 rotate-180' : 'bg-gray-200'
                }`}>
                  <ChevronDown className={`w-4 h-4 ${open === i ? 'text-white' : 'text-gray-600'}`} />
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => (
  <section className="py-16 bg-gradient-to-r from-slate-900 via-teal-800 to-teal-600 relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-4 text-center relative">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to ace NEET 2025?
      </h2>
      <p className="text-teal-100 mb-8 text-lg">
        Join 10,000+ students already preparing smarter with NEET 720
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/signup">
          <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Start Free Trial →
          </button>
        </Link>
        <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
          Schedule Demo
        </button>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Schedule Demo', href: '/signup' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Refund Policy', href: '/refund' },
    { name: 'Cancellation Policy', href: '/cancellation' }
  ];

  const socialLinks = [
    { icon: FaWhatsapp, href: 'https://wa.me/919321625553', gradient: 'from-green-400 to-green-600' },
    { icon: FaInstagram, href: '#', gradient: 'from-pink-500 to-purple-600' },
    { icon: FaFacebookF, href: '#', gradient: 'from-blue-500 to-blue-700' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="NEET 720 Logo"
                width={160}
                height={80}
                className="mx-auto md:mx-0"
              />
            </div>
            <p className="text-sm text-gray-500">
              Your all-in-one AI-powered NEET preparation partner.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4 text-gray-900">Contact & Support</h4>
            <ul className="space-y-3 text-sm text-gray-600 mb-6">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-teal-600" />
                <span>+91-98676-07406</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-teal-600" />
                <span>support@neet720.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Target className="w-4 h-4 text-teal-600" />
                <span>India - Online platform</span>
              </li>
            </ul>

            {/* Social Links */}
            <h4 className="font-bold text-lg mb-4 text-gray-900">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-3">
              {socialLinks.map((social, i) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${social.gradient} flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-white`}
                  >
                    <SocialIcon className="text-xl" />
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Support available all 7 days - 10 AM - 7 PM IST
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>© 2025 NEET 720. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      <Hero />
      <Stats />
      <Features />
      <Practice />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
}