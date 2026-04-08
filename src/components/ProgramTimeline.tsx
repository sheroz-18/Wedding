import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface TimelineItem {
  time: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
}

interface ProgramTimelineProps {
  timeline: TimelineItem[];
  fadeInUp: any;
}

export const ProgramTimeline = ({ timeline, fadeInUp }: ProgramTimelineProps) => {
  const timelineRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  // Smooth snake path transforms
  const heartY = useTransform(timelineScrollProgress, [0.1, 0.9], ["0%", "100%"]);
  const heartX = useTransform(timelineScrollProgress, 
    [0.1, 0.3, 0.5, 0.7, 0.9], 
    ["50%", "30%", "70%", "30%", "50%"]
  );
  const heartRotate = useTransform(timelineScrollProgress, 
    [0.1, 0.3, 0.5, 0.7, 0.9], 
    [0, -15, 15, -15, 0]
  );
  const heartScale = useTransform(timelineScrollProgress, [0.1, 0.5, 0.9], [1, 1.2, 1]);

  return (
    <section ref={timelineRef} className="py-32 px-4 bg-[#FFFAF0] overflow-hidden relative">
      {/* Decorative Botanical Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-wedding-gold fill-current">
          <path d="M40,100 Q60,40 100,40 T160,100 T100,160 T40,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M100,40 Q120,80 100,120 Q80,80 100,40" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full text-wedding-gold fill-current">
          <path d="M40,100 Q60,40 100,40 T160,100 T100,160 T40,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M100,40 Q120,80 100,120 Q80,80 100,40" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div {...fadeInUp} className="text-center mb-32">
          <div className="inline-block mb-6">
            <span className="text-wedding-gold text-xs uppercase tracking-[0.6em] font-bold">Наш Тайминг</span>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-wedding-gold/40 to-transparent mt-2" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-stone-800 leading-tight">
            Программа <br />
            <span className="text-wedding-gold italic font-serif lowercase tracking-wide">торжества</span>
          </h2>
        </motion.div>

        <div className="relative min-h-[800px] px-4">
          {/* Snake Path SVG - Solid thin elegant line */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none" 
            viewBox="0 0 100 800" 
            preserveAspectRatio="none"
          >
            <path 
              d="M 50 0 C 10 150, 90 300, 50 400 S 10 650, 50 800" 
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="0.5" 
              className="opacity-30"
            />
          </svg>

          {/* Animated Heart - Delicate gold charm */}
          <motion.div 
            style={{ 
              top: heartY, 
              left: heartX,
              rotate: heartRotate,
              scale: heartScale,
              x: "-50%",
              y: "-50%"
            }}
            className="absolute z-20 text-wedding-gold"
          >
            <div className="relative flex items-center justify-center">
              <Heart className="w-6 h-6 fill-wedding-gold shadow-sm" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-10 h-10 border border-wedding-gold/30 rounded-full"
              />
            </div>
          </motion.div>
          
          <div className="space-y-32 relative">
            {timeline.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "flex w-full relative z-10",
                    isLeft ? "justify-start pr-[55%]" : "justify-end pl-[55%]"
                  )}
                >
                  <div className={cn(
                    "group relative py-6 px-2 transition-all duration-700",
                    isLeft ? "text-left" : "text-left"
                  )}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-wedding-gold font-display text-4xl md:text-5xl opacity-80">
                          {item.time}
                        </span>
                        <div className="h-[1px] flex-1 bg-wedding-gold/20 min-w-[40px]" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-2xl md:text-3xl font-display text-stone-800 tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-stone-500 font-serif italic text-base md:text-lg leading-relaxed max-w-[280px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Subtle Icon Accent */}
                    <div className="absolute -top-4 -left-4 text-wedding-gold/20 group-hover:text-wedding-gold/40 transition-colors duration-500">
                      {item.icon}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
