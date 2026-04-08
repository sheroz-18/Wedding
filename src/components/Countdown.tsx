import React, { useState, useEffect } from 'react';

export const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: 'Дней', value: timeLeft.days },
    { label: 'Часов', value: timeLeft.hours },
    { label: 'Минут', value: timeLeft.minutes },
    { label: 'Секунд', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-wedding-gold/30 flex items-center justify-center glass mb-2">
            <span className="text-xl md:text-3xl font-display text-wedding-gold">{item.value}</span>
          </div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-500 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
