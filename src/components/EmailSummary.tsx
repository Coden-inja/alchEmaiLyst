import React from 'react';
import { Email } from '../types';
import { Mail, Clock, User, RefreshCw } from 'lucide-react';

interface EmailSummaryProps {
  emails: Email[];
  onRefresh: () => void;
  isLoading: boolean;
}

export const EmailSummary: React.FC<EmailSummaryProps> = ({ 
  emails, 
  onRefresh, 
  isLoading 
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Recent Email Summaries</h3>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="space-y-4">
        {emails.map((email) => (
          <div key={email.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <span className="font-medium text-gray-900">{email.from}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={14} />
                {new Date(email.timestamp).toLocaleDateString()}
              </div>
            </div>
            
            <h4 className="font-medium text-gray-900 mb-3">{email.subject}</h4>
            
            {email.summary ? (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">AI Summary:</p>
                <p className="text-sm text-blue-700 mt-1">{email.summary}</p>
              </div>
            ) : (
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">Click "Activate Email Summarizer" to generate AI summary</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {emails.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Mail size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No emails available</p>
          <p className="text-sm">Connect your email account to get started</p>
        </div>
      )}
    </div>
  );
};