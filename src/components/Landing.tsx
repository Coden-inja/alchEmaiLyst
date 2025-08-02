import React from 'react';
import {  Mail, PenTool, Shield, Zap, Users, Lock } from 'lucide-react';
import Hero from './Hero';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <Hero />
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Three Intelligent Agents</h2>
            <p className="text-lg text-gray-600">Powered by advanced AI to revolutionize your email workflow</p>
          </div>
          
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div className="text-center group transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
    <div className="p-6 bg-blue-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
      <Mail className="text-blue-600" size={32} />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Summarizer</h3>
    <p className="text-gray-600">
      Automatically extracts key insights from your emails and provides concise summaries, saving you hours of reading time.
    </p>
  </div>

  <div className="text-center group transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
    <div className="p-6 bg-green-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
      <PenTool className="text-green-600" size={32} />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Composer</h3>
    <p className="text-gray-600">
      Crafts professional emails based on your writing style and persona, ensuring every message hits the right tone.
    </p>
  </div>

  <div className="text-center group transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
    <div className="p-6 bg-red-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors">
      <Shield className="text-red-600" size={32} />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Spam Detector</h3>
    <p className="text-gray-600">
      Intelligently identifies and manages spam emails, keeping your inbox clean and your data secure.
    </p>
  </div>
</div>

        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our AI Email Platform?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                    <p className="text-gray-600">Process hundreds of emails in seconds with our optimized AI algorithms.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Personalized</h3>
                    <p className="text-gray-600">Learns your communication style and preferences for better results.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Lock className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
                    <p className="text-gray-600">Enterprise-grade security with end-to-end encryption for all your data.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded flex-1"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded flex-1"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Email Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have already revolutionized their email workflow with AI.
          </p>
          <button
          id="getstarted"
            onClick={onGetStarted}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};