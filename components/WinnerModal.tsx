
import React, { useEffect, useState } from 'react';
import { WheelEntry, Translation, ThemeConfig } from '../types';
import Confetti from './Confetti';
import { audioService } from '../services/audioService';

interface WinnerModalProps {
  winner: WheelEntry | null;
  onClose: () => void;
  onRemove: () => void;
  t: Translation;
  theme: ThemeConfig;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose, onRemove, t, theme }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (winner) {
      // Trigger Fanfare SFX when modal is about to show
      audioService.playWin();
      const timer = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 min-h-screen">
      <Confetti />
      
      {/* 1. Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      {/* 2. Main Card */}
      <div 
        className={`
            relative z-10 w-full max-w-sm md:max-w-md mx-auto
            flex flex-col items-center justify-center text-center
            rounded-[2.5rem] overflow-hidden
            transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
            shadow-2xl
            ${visible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-20'}
        `}
        style={{
            // STRICT THEME COLOR: Using the wheel's body color (Inner Ring) 
            background: theme.wheelInnerRing, 
            boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`
        }}
      >
        {/* Decorative Glow based on Accent */}
        <div 
            className="absolute -top-24 inset-x-0 h-48 opacity-40 blur-3xl pointer-events-none"
            style={{ background: theme.accent }}
        ></div>

        <div className="relative p-8 w-full flex flex-col items-center">
            
            {/* --- 3D ANIMATED CHARACTER --- */}
            <div className="mb-6 relative perspective-500 group cursor-pointer">
                <div className="relative w-32 h-32 rounded-full animate-float transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    
                    {/* 3D Sphere Body (Glossy Gradient) */}
                    <div 
                        className="absolute inset-0 rounded-full"
                        style={{ 
                            // Complex gradient to create 3D ball effect
                            background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${theme.accent} 45%, ${theme.wheelInnerRing} 100%)`,
                            // Inner shadows for depth and Outer shadow for floating effect
                            boxShadow: `inset -5px -5px 20px rgba(0,0,0,0.5), inset 5px 5px 20px rgba(255,255,255,0.5), 0 20px 35px -10px rgba(0,0,0,0.4)`
                        }}
                    ></div>

                    {/* Face Container */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                         <div className="flex gap-4 mb-1">
                             {/* Left Eye */}
                             <div className="w-3.5 h-5 bg-[#1e293b] rounded-full shadow-sm relative">
                                 <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"></div>
                             </div>
                             {/* Right Eye */}
                             <div className="w-3.5 h-5 bg-[#1e293b] rounded-full shadow-sm relative">
                                 <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"></div>
                             </div>
                         </div>
                         {/* Mouth (Happy Curve) */}
                         <div className="w-10 h-5 border-b-[3px] border-[#1e293b] rounded-b-full opacity-80"></div>
                         
                         {/* Cheeks */}
                         <div className="absolute top-[52%] left-[18%] w-4 h-2 bg-pink-500 rounded-full blur-[2px] opacity-40"></div>
                         <div className="absolute top-[52%] right-[18%] w-4 h-2 bg-pink-500 rounded-full blur-[2px] opacity-40"></div>
                    </div>

                    {/* Shine Reflection (Gloss) */}
                    <div className="absolute top-4 left-6 w-8 h-5 bg-white rounded-full opacity-40 blur-[1px] rotate-[-45deg]"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>✨</div>
                <div className="absolute bottom-0 -left-2 text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎉</div>
            </div>

            {/* Title */}
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-70 text-white">
                {t.winner.congrats}
            </h2>

            {/* Winner Text */}
            <div className="w-full mb-8">
                <h1 
                    className="text-3xl md:text-4xl font-black break-words leading-tight tracking-tight text-white drop-shadow-md"
                >
                    {winner.text}
                </h1>
            </div>

            {/* Action Buttons - Theme Coordinated */}
            <div className="flex flex-col gap-3 w-full px-4">
                
                {/* Remove Button - Uses Accent Color */}
                <button 
                    onClick={() => {
                        onRemove();
                        onClose();
                    }}
                    className="
                        w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest
                        transition-all duration-200 active:scale-[0.98] 
                        shadow-lg flex items-center justify-center gap-2
                        group
                    "
                    style={{
                        background: theme.accent, 
                        color: theme.buttonText, 
                        boxShadow: `0 4px 15px -3px ${theme.accent}60`
                    }}
                >
                    <i className="fi fi-rr-trash transition-transform group-hover:scale-110"></i>
                    {t.buttons.remove}
                </button>
                
                {/* Keep Button - Soft Transparent */}
                <button 
                    onClick={onClose}
                    className="
                        w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest
                        transition-colors border border-white/5 bg-black/20 hover:bg-black/30
                        flex items-center justify-center gap-2 group text-white
                    "
                >
                    <i className="fi fi-rr-check-circle transition-transform group-hover:scale-110"></i>
                    {t.buttons.keep}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
