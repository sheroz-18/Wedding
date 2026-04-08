import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="relative w-full max-w-[450px] md:max-w-[600px] aspect-[1/1.4] md:aspect-[1.4/1] perspective-2000 cursor-pointer group" onClick={handleOpen}>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              transition: { duration: 1, ease: "easeOut" }
            }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            exit={{ scale: 1.05, opacity: 0, y: -20 }}
            className="relative w-full h-full"
          >
            {/* Envelope Body */}
            <div className="absolute inset-0 bg-[#f8f8f8] rounded-sm shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15),0_18px_36px_-18px_rgba(0,0,0,0.2)] border border-stone-200/60 overflow-hidden">
              {/* Subtle Paper Texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              
              {/* Top Text */}
              <div className="absolute top-10 md:top-12 left-0 right-0 text-center z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h2 className="text-stone-800 font-serif text-2xl md:text-3xl tracking-[0.25em] uppercase leading-relaxed drop-shadow-sm">
                    Приглашение<br />
                    <span className="text-lg md:text-xl tracking-[0.2em] text-stone-500 font-light mt-1 md:mt-2 block">на свадьбу</span>
                  </h2>
                </motion.div>
              </div>

              {/* Bottom Flap */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[55%] bg-[#f0f0f0] z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]" 
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
              />
              {/* Side Flaps */}
              <div 
                className="absolute inset-0 bg-[#f4f4f4]" 
                style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%, 100% 100%, 100% 0)' }}
              />
            </div>

            {/* Top Flap */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-[55%] bg-[#ffffff] origin-top z-20 shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-b border-stone-200/40"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              animate={isOpen ? { rotateX: -160 } : { rotateX: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
               {/* Flap Texture */}
               <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            </motion.div>

            {/* Wax Seal Container */}
            <motion.div 
              className="absolute top-[62%] md:top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30"
              animate={isOpen ? { opacity: 0, scale: 0.8, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Wax Seal */}
              <motion.div 
                className="w-24 h-24 md:w-28 md:h-28 bg-[#ececec] rounded-full flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_10px_25px_-5px_rgba(0,0,0,0.15),0_8px_10px_-6px_rgba(0,0,0,0.1)] border border-stone-300/50 relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                {/* Subtle Wax Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />
                
                {/* Crest/Initials */}
                <div className="relative flex flex-col items-center justify-center opacity-50">
                  <div className="text-stone-700 font-serif text-3xl md:text-4xl italic select-none tracking-tighter">
                    A&M
                  </div>
                  <div className="w-10 h-[1px] bg-stone-400/60 mt-1" />
                </div>
                
                {/* Seal Texture */}
                <div className="absolute inset-0 opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              </motion.div>
              
              {/* Subtle Pulse Effect */}
              <div className="absolute inset-[-8px] rounded-full border border-stone-200/30 animate-[ping_3s_infinite] opacity-50" />
            </motion.div>

            {/* Hint Text */}
            <motion.div 
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-400 tracking-[0.15em] text-[12px] font-light text-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 5, 0] }}
              transition={{ 
                opacity: { delay: 1.2 },
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              нажмите,<br />чтобы открыть
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content that "slides out" */}
      {isOpen && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: -20, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
           <div className="text-center">
              <Sparkles className="text-wedding-gold w-12 h-12 mx-auto mb-4 animate-pulse" />
              <p className="text-wedding-gold font-display text-2xl italic">Открываем...</p>
           </div>
        </motion.div>
      )}
    </div>
  );
};
