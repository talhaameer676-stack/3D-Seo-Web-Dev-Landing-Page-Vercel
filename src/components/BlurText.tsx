import React from 'react';
import { motion } from 'motion/react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.1,
            ease: [0.16, 1, 0.3, 1] // Apple-style premium easeOutExpo
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
