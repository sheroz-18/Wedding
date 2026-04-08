import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Send,
  Sparkles,
  GlassWater,
  Utensils,
  Music as MusicIcon,
  Camera
} from 'lucide-react';
import { Countdown } from './components/Countdown';
import { Petals } from './components/Petals';
import { FloatingElements } from './components/FloatingElements';
import { MusicPlayer } from './components/MusicPlayer';
import { Preloader } from './components/Preloader';
import { Envelope } from './components/Envelope';
import { ProgramTimeline } from './components/ProgramTimeline';
import { WeddingCalendar } from './components/WeddingCalendar';
import { OurStory } from './components/OurStory';
import { DressCode } from './components/DressCode';
import { cn } from './lib/utils';
import { useScroll, useTransform, useSpring } from 'motion/react';

const WEDDING_DATE = '2026-08-15T15:00:00';

export default function App() {
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStatus('submitting');
    setTimeout(() => setRsvpStatus('success'), 1500);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const timeline = [
    { time: '15:20', title: 'Регистрация', icon: <Heart className="w-5 h-5" />, desc: 'Приготовьте платочки для трогательного момента' },
    { time: '17:00', title: 'Банкет', icon: <Utensils className="w-5 h-5" />, desc: 'Время вкусной еды, танцев и развлечений' },
    { time: '22:00', title: 'Торт', icon: <Sparkles className="w-5 h-5" />, desc: 'Сладкий финал нашего праздника' },
    { time: '00:00', title: 'Завершение', icon: <Sparkles className="w-5 h-5" />, desc: 'Мы благодарны, что вы провели с нами этот чудесный день' },
  ];

  const colors = [
    { name: 'Шампань', hex: '#F7E7CE' },
    { name: 'Пудровый', hex: '#FCE4EC' },
    { name: 'Золото', hex: '#D4AF37' },
    { name: 'Слоновая кость', hex: '#FFFFF0' },
  ];

  const { scrollYProgress } = useScroll();
  const heroBgY = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%']);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%']);
  const footerTextX = useTransform(scrollYProgress, [0.8, 1], ['-20%', '0%']);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-wedding-gold/20">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-wedding-gold z-[10001] origin-left"
        style={{ scaleX }}
      />
      <Preloader />
      
      {!isEnvelopeOpened ? (
        <div className="fixed inset-0 z-[5000] bg-wedding-ivory flex items-center justify-center px-4">
          <Petals />
          <FloatingElements />
          <Envelope onOpen={() => setIsEnvelopeOpened(true)} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Petals />
          <FloatingElements />
          <MusicPlayer autoPlay={true} />

          {/* Hero Section */}
          <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-wedding-ivory/20 via-transparent to-wedding-ivory z-10" />
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
                alt="Wedding Background"
                className="w-full h-full object-cover opacity-40 scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div 
              style={{ y: heroTextY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-20"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                {/* Groom Photo */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl"
                >
                  <img src="https://images.unsplash.com/photo-1550005816-09246d3c94a7?auto=format&fit=crop&q=80&w=400" alt="Groom" className="w-full h-full object-cover" />
                </motion.div>

                <div className="text-center">
                  <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-medium">
                    Приглашение на свадьбу
                  </span>
                  <h1 className="text-5xl md:text-8xl font-display text-stone-800 mb-4 leading-tight">
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                      className="block md:inline"
                    >
                      Александр
                    </motion.span>
                    <motion.span 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
                      className="text-wedding-gold font-serif italic text-3xl md:text-6xl mx-4"
                    >
                      &
                    </motion.span>
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 2 }}
                      className="block md:inline"
                    >
                      Мария
                    </motion.span>
                  </h1>
                </div>

                {/* Bride Photo */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl"
                >
                  <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400" alt="Bride" className="w-full h-full object-cover" />
                </motion.div>
              </div>

              <p className="max-w-md mx-auto text-stone-600 font-serif italic text-lg md:text-xl mb-12 px-4">
                «С любовью приглашаем вас разделить с нами самый важный день в нашей жизни»
              </p>
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl md:text-3xl font-display text-wedding-gold">15 Августа 2026</span>
                <div className="w-12 h-[1px] bg-wedding-gold/50" />
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-wedding-gold cursor-pointer"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </section>

      {/* Main Invitation */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp} className="mb-16">
            <Heart className="w-10 h-10 text-wedding-gold mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl md:text-5xl font-display mb-8">Дорогие родные и близкие!</h2>
            <div className="space-y-6 text-stone-600 text-lg md:text-xl font-serif leading-relaxed max-w-2xl mx-auto">
              <p>
                В нашей жизни произошло прекрасное событие — мы решили соединить наши сердца и судьбы.
              </p>
              <p>
                Ваше присутствие сделает этот праздник по-настоящему особенным. Мы будем очень рады видеть вас среди наших гостей!
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="mt-20">
            <h3 className="text-sm uppercase tracking-[0.3em] text-stone-400 mb-12">До торжества осталось:</h3>
            <Countdown targetDate={WEDDING_DATE} />
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-64 h-64 bg-wedding-rose/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" 
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-wedding-champagne/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" 
        />
      </section>

      {/* Save the Date Calendar */}
      <WeddingCalendar fadeInUp={fadeInUp} />

      {/* Our Story Section */}
      <OurStory fadeInUp={fadeInUp} />

      {/* Location & Time */}
      <section className="py-32 px-4 bg-wedding-ivory relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-wedding-rose/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-wedding-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              {...fadeInUp} 
              className="lg:col-span-5 space-y-10 relative z-10"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-wedding-gold/30 bg-white/40 backdrop-blur-sm text-wedding-gold text-xs uppercase tracking-[0.3em] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Локация</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-display leading-[1.1] text-stone-800">
                  Где всё <br /> 
                  <span className="text-wedding-gold italic font-serif lowercase">произойдет</span>
                </h2>
              </div>

              <div className="space-y-8">
                <div className="group flex items-start gap-6 p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-md transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-wedding-gold/10 flex items-center justify-center text-wedding-gold shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-display text-stone-800 mb-1">Вилла «Элеганс»</h4>
                    <p className="text-stone-500 font-serif italic text-lg">ул. Лазурная, д. 15, Сочи</p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-md transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-wedding-gold/10 flex items-center justify-center text-wedding-gold shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-display text-stone-800 mb-1">15 Августа 2026</h4>
                    <p className="text-stone-500 font-serif italic text-lg">Сбор гостей в 15:00</p>
                  </div>
                </div>
              </div>

              <motion.a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-4 px-10 py-5 bg-stone-800 text-white rounded-2xl hover:bg-stone-700 transition-all tracking-[0.2em] text-xs uppercase font-bold shadow-2xl shadow-stone-800/20 group"
              >
                <span>Построить маршрут</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Right Image with Artistic Frame */}
            <div className="lg:col-span-7 relative">
              <motion.div 
                {...fadeInUp}
                className="relative z-10"
              >
                <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]">
                  <img 
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" 
                    alt="Venue"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-4 rounded-2xl text-white">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1 opacity-80">Локация</p>
                      <p className="font-display text-xl">Black Sea Coast</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-wedding-gold/30 rounded-tr-[3rem] -z-10" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-wedding-gold/30 rounded-bl-[3rem] -z-10" />
              </motion.div>

              {/* Secondary Decorative Image/Shape */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1 }}
                className="absolute -bottom-12 -right-12 w-48 h-48 bg-wedding-gold/10 rounded-3xl -z-10 backdrop-blur-3xl border border-wedding-gold/20 rotate-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Timeline */}
      <ProgramTimeline timeline={timeline} fadeInUp={fadeInUp} />

      {/* Dress Code Section */}
      <DressCode colors={colors} fadeInUp={fadeInUp} />

      {/* RSVP Form */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-4">Подтверждение</h2>
            <p className="text-stone-500 italic font-serif text-lg">Пожалуйста, сообщите о вашем присутствии до 1 июля 2026</p>
          </motion.div>

          {rsvpStatus === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-3xl text-center"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-green-500 fill-green-500" />
              </div>
              <h3 className="text-2xl font-display mb-2">Спасибо!</h3>
              <p className="text-stone-600 font-serif italic">Ваш ответ успешно отправлен. Мы очень ждем встречи с вами!</p>
            </motion.div>
          ) : (
            <motion.form 
              {...fadeInUp}
              onSubmit={handleRSVP}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Ваше имя</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Имя и Фамилия"
                    className="w-full px-6 py-4 rounded-2xl bg-wedding-ivory border-none focus:ring-2 focus:ring-wedding-gold/30 outline-none transition-all font-serif"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Количество гостей</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-wedding-ivory border-none focus:ring-2 focus:ring-wedding-gold/30 outline-none transition-all font-serif appearance-none">
                    <option>1 гость</option>
                    <option>2 гостя</option>
                    <option>Семья</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Сможете ли вы присутствовать?</label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(197, 160, 89, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="px-6 py-4 rounded-2xl bg-wedding-ivory transition-colors font-serif italic text-stone-600 border-2 border-transparent focus:border-wedding-gold/30 outline-none"
                  >
                    Да, с удовольствием!
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="px-6 py-4 rounded-2xl bg-wedding-ivory transition-colors font-serif italic text-stone-600 border-2 border-transparent focus:border-red-200 outline-none"
                  >
                    К сожалению, нет
                  </motion.button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Ваша любимая песня</label>
                <input 
                  type="text"
                  placeholder="Какая песня заставит вас танцевать?"
                  className="w-full px-6 py-4 rounded-2xl bg-wedding-ivory border-none focus:ring-2 focus:ring-wedding-gold/30 outline-none transition-all font-serif"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Комментарий</label>
                <textarea 
                  rows={4}
                  placeholder="Ваши пожелания или предпочтения в еде..."
                  className="w-full px-6 py-4 rounded-2xl bg-wedding-ivory border-none focus:ring-2 focus:ring-wedding-gold/30 outline-none transition-all font-serif resize-none"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(197, 160, 89, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                disabled={rsvpStatus === 'submitting'}
                className="w-full py-5 bg-wedding-gold text-white rounded-2xl hover:bg-wedding-gold/90 transition-all shadow-xl shadow-wedding-gold/20 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] font-bold disabled:opacity-50"
              >
                {rsvpStatus === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Подтвердить участие
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>

      {/* Final Block */}
      <footer className="py-32 px-4 bg-wedding-ivory text-center relative overflow-hidden">
        <motion.div {...fadeInUp} className="relative z-10">
          <Heart className="w-12 h-12 text-wedding-gold mx-auto mb-12 fill-wedding-gold/10" />
          <h2 className="text-5xl md:text-7xl font-display mb-8">До встречи!</h2>
          <p className="text-stone-600 text-xl md:text-2xl font-serif italic max-w-lg mx-auto leading-relaxed">
            Будем счастливы разделить этот <br /> день вместе с вами
          </p>
          <div className="mt-20 flex flex-col items-center gap-4">
            <span className="text-wedding-gold font-display text-2xl">А & М</span>
            <div className="w-24 h-[1px] bg-wedding-gold/30" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400">2026</span>
          </div>
        </motion.div>

        {/* Decorative background text */}
        <motion.div 
          style={{ x: footerTextX }}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 text-[20vw] font-display text-wedding-gold/5 pointer-events-none select-none whitespace-nowrap"
        >
          Love & Happiness
        </motion.div>
      </footer>
        </motion.div>
      )}
    </div>
  );
}
