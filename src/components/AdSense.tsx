interface AdSenseProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
}

export default function AdSense({ slot = 'demo', format = 'auto', className = '' }: AdSenseProps) {
  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`}>
      <div className="text-gray-400 text-sm mb-2">Advertisement</div>
      <div className="text-gray-500 text-xs">
        Google AdSense Slot: {slot}
      </div>
      <div className="text-gray-400 text-xs mt-1">
        Format: {format}
      </div>
    </div>
  );
}
