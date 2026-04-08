import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, GlassWater } from 'lucide-react';

const ELEMENT_COUNT = 18;

const RingIcon = ({ size, color }: { size: number, color: string }) => (
  <div style={{ width: size, height: size, position: 'relative' }}>
    <div 
      className="absolute inset-0 rounded-full border-2" 
      style={{ borderColor: color, opacity: 0.8 }} 
    />
    <div 
      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white border border-wedding-gold rounded-sm rotate-45 shadow-sm"
    />
  </div>
);

export const FloatingElements = () => {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const types = ['heart', 'ring', 'sparkle', 'glass'];
    const newElements = Array.from({ length: ELEMENT_COUNT }).map((_, i) => ({
      id: i,
      type: types[i % types.length],
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 90 + 5}%`,
      delay: Math.random() * 5,
      duration: 25 + Math.random() * 20,
      size: 25 + Math.random() * 35,
      xOffset: (Math.random() - 0.5) * 300,
      yOffset: (Math.random() - 0.5) * 300,
      rotate: Math.random() * 360,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ 
            x: 0, 
            y: 0, 
            rotate: el.rotate, 
            opacity: 0 
          }}
          animate={{
            x: [0, el.xOffset, -el.xOffset, 0],
            y: [0, el.yOffset, -el.yOffset, 0],
            rotate: el.rotate + 360,
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear",
          }}
          className="absolute"
          style={{
            left: el.left,
            top: el.top,
          }}
        >
          {el.type === 'heart' && (
            <Heart 
              size={el.size} 
              className="text-wedding-rose fill-wedding-rose/30" 
              strokeWidth={1}
            />
          )}
          {el.type === 'ring' && (
            <RingIcon 
              size={el.size} 
              color="#c5a059" 
            />
          )}
          {el.type === 'sparkle' && (
            <Sparkles 
              size={el.size} 
              className="text-wedding-gold/40" 
              strokeWidth={1}
            />
          )}
          {el.type === 'glass' && (
            <GlassWater 
              size={el.size} 
              className="text-stone-300/40" 
              strokeWidth={1}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
