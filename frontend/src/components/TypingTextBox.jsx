import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingTextBox = ({ text, speed = 150, disappearAfter = null, size = '3rem' }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [flicker, setFlicker] = useState(false);
  const [visible, setVisible] = useState(true);  

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
        setFlicker(Math.random() > 1);  // Adjust for that line to bounce more. Less, the faster
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowCursor(false), 1200);

      // Trigger fade-out if disappearAfter is set
      if (disappearAfter) {
        const hideTimer = setTimeout(() => {
          setVisible(false);
        }, disappearAfter);
        return () => clearTimeout(hideTimer);
      }
    }
  }, [index, text, speed, disappearAfter]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}  // Smooth fade-out on exit
          transition={{ duration: 1 }}
          style={{
            flex: 3,
            height: '100%',
            display: 'flex',
            alignItems: 'top',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: size,
            fontWeight: 'bold',
            letterSpacing: '3px',
            color: 'rgba(255, 255, 255, 0.95)',
            textShadow: flicker
              ? '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(0, 162, 255, 0.8)'
              : '0 0 12px rgba(255, 255, 255, 0.85), 0 0 24px rgba(0, 162, 255, 1)',
            fontFamily: 'monospace',
            WebkitTextStroke: '1px rgba(0, 0, 0, 0.7)',  
          }}
        >
          <span>{displayText}</span>
          {showCursor && (
            <motion.span
              animate={{ opacity: [0, 1], scale: [0.9, 1.1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{
                marginLeft: '5px',
                fontSize: size,
                color: 'rgba(0, 255, 255, 0.9)',
                textShadow: '0 0 8px rgba(0, 255, 255, 0.8)',
                WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.7)',  
              }}
            >
              |
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypingTextBox;
