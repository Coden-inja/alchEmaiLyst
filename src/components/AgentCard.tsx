import React from 'react';
import { Agent } from '../types';
import { 
  Mail, 
  PenTool, 
  Shield, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle,
  Clock
} from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onActivate: (agentId: string) => void;
  isActive: boolean;
}

const iconMap = {
  Mail,
  PenTool,
  Shield,
};

const statusColors = {
  idle: 'bg-gray-100 text-gray-600',
  processing: 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
  error: 'bg-red-100 text-red-600',
};

const statusIcons = {
  idle: Clock,
  processing: Play,
  completed: CheckCircle,
  error: XCircle,
};

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onActivate, isActive }) => {
  const IconComponent = iconMap[agent.icon as keyof typeof iconMap];
  const StatusIcon = statusIcons[agent.status];

  return (
    <div className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
      isActive 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${agent.color}`}>
          <IconComponent className="text-white" size={24} />
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[agent.status]}`}>
          <div className="flex items-center gap-1">
            <StatusIcon size={14} />
            {agent.status}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{agent.name}</h3>
      <p className="text-gray-600 mb-4">{agent.description}</p>

      {agent.lastActivity && (
        <p className="text-xs text-gray-500 mb-4">
          Last active: {agent.lastActivity}
        </p>
      )}

      <button
        onClick={() => onActivate(agent.id)}
        disabled={agent.status === 'processing'}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
          agent.status === 'processing'
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02]'
        }`}
      >
        {agent.status === 'processing' ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          `Activate ${agent.name}`
        )}
      </button>
    </div>
  );
};