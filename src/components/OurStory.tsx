import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../lib/utils';

const photos = [
  {
    url: 'https://picsum.photos/seed/wedding1/800/1000',
    caption: 'Наше первое свидание',
    size: 'large'
  },
  {
    url: 'https://picsum.photos/seed/wedding2/600/800',
    caption: 'Тот самый момент',
    size: 'small'
  },
  {
    url: 'https://picsum.photos/seed/wedding3/600/800',
    caption: 'Путешествие вдвоем',
    size: 'small'
  },
  {
    url: 'https://picsum.photos/seed/wedding4/800/600',
    caption: 'Счастливы вместе',
    size: 'medium'
  }
];

export const OurStory = ({ fadeInUp }: { fadeInUp: any }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="py-32 px-4 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div {...fadeInUp} className="space-y-8">
            <div className="inline-block">
              <span className="text-wedding-gold text-xs uppercase tracking-[0.4em] font-bold">Наша история</span>
              <div className="h-px w-12 bg-wedding-gold mt-2" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display text-stone-800 leading-tight">
              Как всё <br />
              <span className="text-wedding-gold italic font-serif lowercase">начиналось</span>
            </h2>
            <div className="space-y-6 text-stone-600 font-serif italic text-lg leading-relaxed">
              <p>
                Наша история началась не с громких слов, а с одного взгляда, который изменил всё. 
                Это были обычные будни, которые внезапно наполнились смыслом и светом.
              </p>
              <p>
                С тех пор мы прошли через сотни закатов, тысячи улыбок и бесконечное количество 
                поддержки друг друга. Каждый день мы открываем друг в друге что-то новое, 
                и это путешествие — самое прекрасное в нашей жизни.
              </p>
              <p>
                Сегодня мы стоим на пороге новой главы, и нам не терпится разделить 
                этот момент с вами.
              </p>
            </div>
          </motion.div>

          {/* Photo Grid with Parallax */}
          <div className="grid grid-cols-2 gap-4 relative">
            <motion.div style={{ y: y1 }} className="space-y-4">
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={photos[0].url} 
                  alt={photos[0].caption}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white font-serif italic">{photos[0].caption}</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={photos[1].url} 
                  alt={photos[1].caption}
                  className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white font-serif italic">{photos[1].caption}</p>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="space-y-4 pt-12">
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={photos[2].url} 
                  alt={photos[2].caption}
                  className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white font-serif italic">{photos[2].caption}</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={photos[3].url} 
                  alt={photos[3].caption}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white font-serif italic">{photos[3].caption}</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative background shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-wedding-gold/5 -rotate-6 -z-10 rounded-[3rem] blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
