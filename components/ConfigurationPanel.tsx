
import React from 'react';
import { AspectRatio, DesignConfig } from '../types';

interface Props {
  config: DesignConfig;
  onChange: (config: DesignConfig) => void;
}

export const ConfigurationPanel: React.FC<Props> = ({ config, onChange }) => {
  const setAspectRatio = (ratio: AspectRatio) => {
    onChange({ ...config, aspectRatio: ratio });
  };

  const toggleLayout = () => {
    onChange({ ...config, showProductRight: !config.showProductRight });
  };

  const setPrompt = (prompt: string) => {
    onChange({ ...config, prompt });
  };

  return (
    <div className="space-y-8">
      {/* Aspect Ratio */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Canvas Dimension</label>
        <div className="flex gap-4">
          <button
            onClick={() => setAspectRatio('16:9')}
            className={`flex-1 py-3 px-4 rounded text-xs transition-all border ${
              config.aspectRatio === '16:9'
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'
            }`}
          >
            LANDSCAPE (16:9)
          </button>
          <button
            onClick={() => setAspectRatio('9:16')}
            className={`flex-1 py-3 px-4 rounded text-xs transition-all border ${
              config.aspectRatio === '9:16'
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'
            }`}
          >
            PORTRAIT (9:16)
          </button>
        </div>
      </div>

      {/* Composition Toggle */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Composition Strategy</label>
        <button
          onClick={toggleLayout}
          className={`w-full flex items-center justify-between p-4 rounded border transition-all ${
            config.showProductRight ? 'border-black' : 'border-gray-100'
          }`}
        >
          <div className="text-left">
            <span className="text-sm font-medium block">
              {config.showProductRight ? 'Lookbook + Detail' : 'Full Figure Portrait'}
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-tight">
              {config.showProductRight ? 'Model on left, product on right' : 'Centered model focus'}
            </span>
          </div>
          <div className={`w-10 h-6 rounded-full relative transition-colors ${config.showProductRight ? 'bg-black' : 'bg-gray-200'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.showProductRight ? 'left-5' : 'left-1'}`} />
          </div>
        </button>
      </div>

      {/* User Prompt */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Design Direction</label>
        <textarea
          value={config.prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A minimalist silk draped evening gown in charcoal grey, high contrast lighting, neutral concrete floor..."
          className="w-full h-32 p-4 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none resize-none placeholder:text-gray-300 placeholder:italic"
        />
      </div>
    </div>
  );
};
