import React from 'react';
import { X } from 'lucide-react';

interface CtaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CtaModal: React.FC<CtaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl animate-fade-in z-[110] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-stone-100 bg-white">
          <h3 className="font-serif text-lg font-medium text-stone-900">Connect with AMVS</h3>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 w-full bg-white relative overflow-hidden">
             <iframe 
                src="https://api.leadconnectorhq.com/widget/form/DMKJtaqaFuUJrrDpU4N6" 
                className="w-full h-full border-0 absolute inset-0"
                title="Lead Form"
                allow="camera; microphone; autoplay; encrypted-media;"
            />
        </div>
      </div>
    </div>
  );
};