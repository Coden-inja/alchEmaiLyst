import React, { useState } from 'react';
import { Mail, PenTool, Shield, Zap, Users, Lock } from 'lucide-react';
import Hero from './Hero';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  // Add state for selected pricing card
  const [selectedPlan, setSelectedPlan] = useState<number | null>(1); // Default to Pro
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <Hero />
      </div>

      {/* About Us Section */}
      <div id="about-section" className="py-24 bg-gradient-to-b from-white to-blue-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-1000">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            <strong>alchEMaiLyst</strong> is an AI-powered platform designed to revolutionize your email workflow. Our mission is to help users save time, communicate more effectively, and keep their inboxes secure. With a unique three-agent system, we provide intelligent email summarization, professional email composition, and advanced spam detection—all in one seamless experience.<br /><br />
            Built by a passionate team of developers and AI enthusiasts, alchEMaiLyst leverages the latest advancements in artificial intelligence to deliver a smarter, safer, and more productive email experience for everyone.
          </p>
        </div>
      </div>


      {/* Features Section */}
      <div id="features-section" className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Three Intelligent Agents</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Powered by advanced AI to revolutionize your email workflow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="p-6 bg-blue-100 dark:bg-blue-900/50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors">
                <Mail className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:text-lg md:text-xl">Email Summarizer</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base px-4">
                Automatically extracts key insights from your emails and provides concise summaries, saving you hours of reading time.
              </p>
            </div>
            <div className="text-center group transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="p-6 bg-green-100 dark:bg-green-900/50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-800/70 transition-colors">
                <PenTool className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:text-lg md:text-xl">Email Composer</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base px-4">
                Crafts professional emails based on your writing style and persona, ensuring every message hits the right tone.
              </p>
            </div>
            <div className="text-center group transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="p-6 bg-red-100 dark:bg-red-900/50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 dark:group-hover:bg-red-800/70 transition-colors">
                <Shield className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:text-lg md:text-xl">Spam Detector</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base px-4">
                Intelligently identifies and manages spam emails, keeping your inbox clean and your data secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="howitworks-section" className="relative py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Top Gradient Bar for How It Works section (light mode only) */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-blue-50 to-white dark:hidden rounded-t-xl z-10" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Discover how alchEmaiLyst leverages AI to make your email workflow seamless and efficient.
          </p>
          <a
            href="https://x.com/Yoges_ai/status/1941754822501466365"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg mb-4"
          >
            Watch Demo
          </a>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing-section" className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Pricing</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
            Choose the plan that fits your needs. All plans come with our three-agent AI system: Summarizer, Composer, and Spam Detector.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center cursor-pointer transition-all duration-200 ${selectedPlan === 0 ? 'border-4 border-blue-500 dark:border-blue-400 scale-105' : 'border-2 border-transparent'}`}
              onClick={() => setSelectedPlan(0)}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Free</h3>
              <p className="text-3xl font-extrabold mb-2">$0</p>
              <ul className="text-gray-600 dark:text-gray-300 mb-6 space-y-2 text-center">
                <li>Basic AI Summarization</li>
                <li>Email Composer (limited)</li>
                <li>Spam Detection</li>
                <li>Up to 50 emails/month</li>
              </ul>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Get Started</button>
            </div>
            {/* Pro Plan */}
            <div
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center cursor-pointer transition-all duration-200 ${selectedPlan === 1 ? 'border-4 border-blue-500 dark:border-blue-400 scale-105' : 'border-2 border-transparent'}`}
              onClick={() => setSelectedPlan(1)}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Pro</h3>
              <p className="text-3xl font-extrabold mb-2">$9/mo</p>
              <ul className="text-gray-600 dark:text-gray-300 mb-6 space-y-2 text-center">
                <li>Unlimited AI Summarization</li>
                <li>Full Email Composer</li>
                <li>Advanced Spam Detection</li>
                <li>Priority Support</li>
              </ul>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Upgrade</button>
            </div>
            {/* Enterprise Plan */}
            <div
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center cursor-pointer transition-all duration-200 ${selectedPlan === 2 ? 'border-4 border-blue-500 dark:border-blue-400 scale-105' : 'border-2 border-transparent'}`}
              onClick={() => setSelectedPlan(2)}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Enterprise</h3>
              <p className="text-3xl font-extrabold mb-2">Custom</p>
              <ul className="text-gray-600 dark:text-gray-300 mb-6 space-y-2 text-center">
                <li>All Pro features</li>
                <li>Custom Integrations</li>
                <li>Team Management</li>
                <li>Dedicated Support</li>
              </ul>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Contact Us</button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our AI Email Platform?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                    <Zap className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                    <p className="text-gray-600 dark:text-gray-300">Process hundreds of emails in seconds with our optimized AI algorithms.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                    <Users className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personalized</h3>
                    <p className="text-gray-600 dark:text-gray-300">Learns your communication style and preferences for better results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                    <Lock className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure</h3>
                    <p className="text-gray-600 dark:text-gray-300">Enterprise-grade security with end-to-end encryption for all your data.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Email Experience?
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
            Join thousands of professionals who have already revolutionized their email workflow with AI.
          </p>
          <button
            id="getstarted"
            onClick={onGetStarted}
            className="px-8 py-4 bg-white dark:bg-gray-200 text-blue-600 dark:text-blue-800 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-300 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};