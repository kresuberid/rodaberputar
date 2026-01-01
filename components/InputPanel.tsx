
import React, { useState, useEffect, useRef } from 'react';
import { Translation, WheelEntry, ThemeConfig } from '../types';

interface InputPanelProps {
  entries: WheelEntry[];
  onEntriesChange: (entries: WheelEntry[]) => void;
  t: Translation;
  theme: ThemeConfig;
}

const InputPanel: React.FC<InputPanelProps> = ({ entries, onEntriesChange, t, theme }) => {
  // Initialize state once based on props
  const [textInput, setTextInput] = useState(() => entries.map(e => e.text).join('\n'));
  
  // LOCK MECHANISM:
  // Tracks whether the latest change came from the User (typing) or the System (Shuffle/Sort).
  // If User is typing, we block the useEffect from overwriting their text.
  const isInternalChange = useRef(false);

  // --- ONE-WAY SYNC (Props -> State) ---
  // Only update the text box if the change came from OUTSIDE (Shuffle, Sort, Load),
  // NOT if the user is currently typing.
  useEffect(() => {
    if (isInternalChange.current) {
        // Reset the lock and do nothing. 
        // We trust the local textInput state matches what the user just typed.
        isInternalChange.current = false;
        return;
    }

    // Reconstruct text from entries (e.g. after Shuffle)
    const newText = entries.map(e => e.text).join('\n');
    
    // Only update if actually different to avoid cursor resets on identical re-renders
    setTextInput(prev => {
        if (prev !== newText) return newText;
        return prev;
    });
  }, [entries]); 

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 1. Lock the sync mechanism
    isInternalChange.current = true;
    
    const val = e.target.value;
    setTextInput(val); 
    
    // 2. Process data for the Wheel
    // We maintain the ID if the text looks similar to avoid full re-renders of the wheel segments
    const lines = val.split(/\r?\n/);
    
    const newEntries: WheelEntry[] = lines
      .map((line, idx) => {
          const trimmed = line; // Don't trim too aggressively here, let the wheel handle display
          if (!trimmed.trim()) return null; // Filter empty ONLY for the wheel logic
          
          return {
            id: `item-${idx}-${trimmed.substring(0, 5)}`, 
            text: trimmed,
            visible: true
          };
      })
      .filter((item): item is WheelEntry => item !== null);
      
    onEntriesChange(newEntries);
  };

  const shuffle = () => {
    // We do NOT set isInternalChange here.
    // We want the useEffect to trigger and re-order the text box.
    const shuffled = [...entries];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    onEntriesChange(shuffled);
  };

  const sort = () => {
    // Allow useEffect to sync the new sorted order to text box
    const sorted = [...entries].sort((a, b) => a.text.localeCompare(b.text));
    onEntriesChange(sorted);
  };

  // --- COLOR HARMONY LOGIC ---
  const boardBg = theme.wheelSegments[0];
  const boardTextColor = '#FFFFFF';
  const placeholderColor = 'rgba(255,255,255,0.4)';
  const editModeColor = 'rgba(255,255,255,0.6)';

  // Action Button - Horizontal Layout
  const ActionButton = ({ onClick, icon, label }: { onClick: () => void, icon: string, label: string }) => (
    <button 
        onClick={onClick} 
        className={`
            group relative flex items-center justify-center 
            w-full h-12 rounded-xl overflow-hidden
            transition-all duration-300 ease-out
            shadow-lg active:scale-95
        `}
        style={{ backgroundColor: theme.accent }}
        title={label}
    >
        <div className="flex items-center gap-2 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300">
             <i className={`fi ${icon} text-base drop-shadow-sm`} style={{ color: theme.buttonText }}></i>
             <span className="text-[10px] font-bold uppercase tracking-widest pt-0.5" style={{ color: theme.buttonText }}>
                {label}
             </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </button>
  );

  return (
    <div className="flex flex-col h-full gap-4 text-white">
        {/* Grid Toolbar - 2 Columns */}
        <div className="grid grid-cols-2 gap-3">
             <ActionButton 
                onClick={shuffle} 
                icon="fi-rr-shuffle" 
                label={t.buttons.shuffle} 
             />
             <ActionButton 
                onClick={sort} 
                icon="fi-rr-sort-alpha-down" 
                label={t.buttons.sort} 
             />
        </div>

        {/* Text Area - "Paper/Board" Style */}
        <div 
            className="relative flex-grow group rounded-3xl overflow-hidden transition-all duration-300 border" 
            style={{ 
                backgroundColor: boardBg, // Dynamic Board Color
                borderColor: 'rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.1)' 
            }}
        >
            <textarea
                className="relative z-10 w-full h-full p-5 bg-transparent border-none resize-none outline-none font-bold text-base leading-relaxed custom-scrollbar font-mono transition-colors"
                placeholder={t.inputPlaceholder}
                value={textInput}
                onChange={handleTextChange}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="sentences"
                rows={100}
                // REMOVED inputMode="text" -> caused issues on some androids treating it as single line
                // REMOVED enterKeyHint="enter" -> caused enter to submit instead of newline
                style={{ 
                    paddingBottom: '3rem',
                    color: boardTextColor,
                    whiteSpace: 'pre-wrap', // Crucial for responsiveness
                    touchAction: 'manipulation' // Prevents double-tap zoom
                }} 
            />
            {/* CSS Hack for Placeholder color */}
            <style>{`
                textarea::placeholder {
                    color: ${placeholderColor} !important;
                    font-weight: normal;
                }
            `}</style>
            
            {/* Status Bar inside screen */}
            <div 
                className="absolute bottom-0 inset-x-0 h-9 backdrop-blur-md flex items-center justify-between px-5 z-20 border-t"
                style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.1)'
                }}
            >
                <div 
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: editModeColor }}
                >
                    <i className="fi fi-rr-edit"></i> {t.ui.editMode}
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span 
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: editModeColor }}
                    >
                        {entries.length} {t.ui.items}
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default InputPanel;
