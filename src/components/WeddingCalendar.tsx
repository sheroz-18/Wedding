import React from 'react';
import { motion } from 'motion/react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, getDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Heart } from 'lucide-react';
import { cn } from '../lib/utils';

// --- CONFIGURATION ---
// Change these values to update the calendar
const WEDDING_YEAR = 2026;
const WEDDING_MONTH = 7; // 0-indexed (7 is August)
const WEDDING_DAY = 15;
// ---------------------

export const WeddingCalendar = ({ fadeInUp }: { fadeInUp: any }) => {
  const weddingDate = new Date(WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY);
  
  const monthStart = startOfMonth(weddingDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Week starts on Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display mb-4">Сохраните дату</h2>
          <p className="text-stone-500 italic font-serif text-lg">Ждем вас в этот особенный день</p>
        </motion.div>

        <motion.div 
          {...fadeInUp}
          className="relative max-w-md mx-auto bg-wedding-ivory/30 p-8 md:p-12 rounded-[40px] border border-wedding-gold/10 shadow-sm"
        >
          {/* Month Header */}
          <div className="text-center mb-10">
            <h3 className="text-3xl font-display text-stone-800 capitalize">
              {format(monthStart, 'LLLL yyyy', { locale: ru })}
            </h3>
            <div className="h-px w-24 bg-wedding-gold/30 mx-auto mt-4" />
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-4 text-center">
            {/* Weekdays */}
            {weekDays.map((day) => (
              <div key={day} className="text-xs uppercase tracking-widest text-wedding-gold font-bold mb-4">
                {day}
              </div>
            ))}

            {/* Days */}
            {calendarDays.map((day, idx) => {
              const isWeddingDay = isSameDay(day, weddingDate);
              const isCurrentMonth = isSameMonth(day, monthStart);

              return (
                <div 
                  key={idx} 
                  className={cn(
                    "relative h-10 flex items-center justify-center text-lg font-serif transition-all duration-300",
                    !isCurrentMonth && "opacity-20",
                    isCurrentMonth && !isWeddingDay && "text-stone-600",
                    isWeddingDay && "text-white z-10"
                  )}
                >
                  {isWeddingDay && (
                    <motion.div 
                      layoutId="wedding-mark"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-10 h-10 bg-wedding-gold rounded-full shadow-lg shadow-wedding-gold/30" />
                      <Heart className="absolute w-4 h-4 text-white fill-white" />
                    </motion.div>
                  )}
                  <span className="relative">{format(day, 'd')}</span>
                </div>
              );
            })}
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-wedding-gold/5 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-wedding-rose/5 rounded-full blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};
