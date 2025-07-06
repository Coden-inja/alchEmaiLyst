import React from 'react';
import { Shield, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { Email } from '../types';

interface SpamDetectorProps {
  spamEmails: Email[];
  onDeleteSpam: (emailId: string) => void;
  isLoading: boolean;
}

export const SpamDetector: React.FC<SpamDetectorProps> = ({ 
  spamEmails, 
  onDeleteSpam, 
  isLoading 
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="text-red-600" size={20} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Spam Detection</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
          <AlertTriangle size={16} />
          {spamEmails.length} spam emails detected
        </div>
      </div>

      <div className="space-y-3">
        {spamEmails.map((email) => (
          <div key={email.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate">{email.subject}</p>
                <p className="text-sm text-gray-600">From: {email.from}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(email.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDeleteSpam(email.id)}
              disabled={isLoading}
              className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
              title="Delete spam email"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {spamEmails.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <p className="text-lg font-medium text-gray-900">All Clear!</p>
          <p className="text-sm">No spam emails detected in your inbox</p>
          <p className="text-xs text-gray-400 mt-2">Your inbox is clean and secure</p>
        </div>
      )}
    </div>
  );
};