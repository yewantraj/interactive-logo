import React from 'react';
import { motion } from 'framer-motion';
import '../styles/CloseButton.css';

const CloseButton = ({ onClose }) => {
  return (
    <motion.button
      className="close-button"
      onClick={onClose}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { delay: 0.5, duration: 0.3 }
      }}
      whileHover={{ 
        scale: 1.1,
        rotate: 90,
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Close profile"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </motion.button>
  );
};

export default CloseButton;