import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Bio.css';

const Bio = ({ text }) => {

  const words = text.split(' ');
  
  return (
    <div className="bio-container">
      <h3>About</h3>
      <p className="bio-text">
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="bio-word"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + index * 0.01,
              duration: 0.2,
            }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </p>
    </div>
  );
};

export default Bio;