import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const PETAL_COUNT = 15;
const PARTICLE_COUNT = 20;

export const Petals = () => {
  const [elements, setElements] = useState<{ petals: any[], particles: any[] }>({ petals: [], particles: [] });

  useEffect(() => {
    const newPetals = Array.from({ length: PETAL_COUNT }).map((_, i) => ({
      id: `petal-${i}`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      size: 15 + Math.random() * 20,
      rotate: Math.random() * 360,
    }));

    const newParticles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: `particle-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: 2 + Math.random() * 4,
    }));

    setElements({ petals: newPetals, particles: newParticles });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Light Particles / Sparkles */}
      {elements.particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            y: [0, -100],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-wedding-gold/40 blur-[1px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      {/* Falling Petals */}
      {elements.petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -100, opacity: 0, rotate: petal.rotate }}
          animate={{
            y: '110vh',
            opacity: [0, 0.6, 0.6, 0],
            rotate: petal.rotate + 360,
            x: [0, 50, -50, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 0C50 0 100 30 100 60C100 90 70 100 50 100C30 100 0 90 0 60C0 30 50 0 50 0Z"
              fill="#fce4ec"
              fillOpacity="0.4"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
