import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface Color {
  name: string;
  hex: string;
}

interface DressCodeProps {
  colors: Color[];
  fadeInUp: any;
}

export const DressCode = ({ colors, fadeInUp }: DressCodeProps) => {
  return (
    <section className="py-32 px-4 bg-wedding-ivory relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display text-stone-200/20 whitespace-nowrap pointer-events-none select-none">
        Dress Code
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          {...fadeInUp} 
          className="bg-white/60 backdrop-blur-xl p-12 md:p-24 rounded-[60px] border border-white shadow-2xl text-center"
        >
          <div className="inline-block mb-8">
            <span className="text-wedding-gold text-xs uppercase tracking-[0.5em] font-bold">Дресс-код</span>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-wedding-gold to-transparent mt-2" />
          </div>

          <h2 className="text-4xl md:text-6xl font-display text-stone-800 mb-8">Цветовая палитра</h2>
          
          <p className="text-stone-600 text-lg md:text-xl font-serif italic mb-16 max-w-2xl mx-auto leading-relaxed">
            Мы будем очень признательны, если вы поддержите атмосферу нашего праздника, 
            выбрав наряды в следующих оттенках:
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {colors.map((color, idx) => (
              <motion.div 
                key={color.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="relative">
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-xl border-4 border-white cursor-pointer relative z-10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div 
                    className="absolute inset-0 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"
                    style={{ backgroundColor: color.hex }}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold group-hover:text-wedding-gold transition-colors">
                  {color.name}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-stone-100">
            <p className="text-stone-400 text-xs uppercase tracking-[0.4em] mb-4">Предпочтительный стиль</p>
            <p className="text-2xl md:text-3xl font-display text-stone-700">Black Tie Optional</p>
            <p className="mt-4 text-stone-500 font-serif italic">Элегантные вечерние платья и костюмы</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
