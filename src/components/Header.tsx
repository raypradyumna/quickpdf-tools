import { FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { checkUsageLimit } from '../lib/usageTracking';

export default function Header() {
  const [usageInfo, setUsageInfo] = useState<{ remaining: number; isPremium: boolean } | null>(null);

  useEffect(() => {
    checkUsageLimit().then(result => {
      setUsageInfo({ remaining: result.remaining, isPremium: result.isPremium });
    });
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">QuickPDF Tools</span>
          </a>

          <div className="flex items-center space-x-4">
            {usageInfo && !usageInfo.isPremium && (
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Conversions today:</span>
                <span className="font-semibold text-blue-600">{5 - usageInfo.remaining}/5</span>
              </div>
            )}
            {usageInfo?.isPremium && (
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Premium
              </span>
            )}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
