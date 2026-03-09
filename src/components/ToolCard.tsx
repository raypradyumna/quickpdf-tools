import * as Icons from 'lucide-react';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <a
      href={tool.path}
      className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500 hover:-translate-y-1"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-blue-50 group-hover:bg-blue-100 p-3 rounded-lg transition-colors">
          <IconComponent className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
        </div>
        <Icons.ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
      </div>
    </a>
  );
}
