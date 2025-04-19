import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ExpandedProfile.css';

import Bio from './Bio';
import SocialLinks from './SocialLinks';
import CloseButton from './CloseButton';

const ExpandedProfile = ({ 
  isVisible, 
  isCollapsing, 
  onClose, 
  profileData,
  settings
}) => {
  const profileRef = useRef(null);
  
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    
    if (isVisible && !isCollapsing) {
      document.addEventListener('keydown', handleEsc);
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      // Restore scrolling when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [isVisible, isCollapsing, onClose]);

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: { when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 }
    },
    visible: { 
      opacity: 1,
      transition: { 
        duration: settings.expandDuration * 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        duration: settings.collapseDuration * 0.5,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: settings.expandDuration * 0.4,
        ease: settings.easing.expand
      } 
    },
    exit: { 
      y: -20, 
      opacity: 0, 
      transition: { 
        duration: settings.collapseDuration * 0.3,
        ease: settings.easing.collapse
      } 
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: settings.expandDuration * 0.6,
        ease: settings.easing.expand
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { 
        duration: settings.collapseDuration * 0.4,
        ease: settings.easing.collapse
      }
    }
  };

  // Apply simpler animations if reduced motion is enabled
  if (settings.reducedMotion) {
    itemVariants.hidden = { opacity: 0 };
    itemVariants.visible = { 
      opacity: 1, 
      transition: { duration: settings.expandDuration * 0.6 } 
    };
    itemVariants.exit = { 
      opacity: 0, 
      transition: { duration: settings.collapseDuration * 0.4 } 
    };
    
    imageVariants.hidden = { opacity: 0 };
    imageVariants.visible = { 
      opacity: 1, 
      transition: { duration: settings.expandDuration * 0.6 } 
    };
    imageVariants.exit = { 
      opacity: 0, 
      transition: { duration: settings.collapseDuration * 0.4 } 
    };
  }

  // Typewriter animation for name
  const nameChars = profileData.name.split('');
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="expanded-profile-overlay"
          ref={profileRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="expanded-profile-container"
            variants={itemVariants}
          >
            <motion.div 
              className="profile-header"
            >
              <motion.div 
                className="profile-image-large-container"
                variants={imageVariants}
              >
                <img 
                  src={profileData.image} 
                  alt={profileData.name}
                  className="profile-image-large"
                />
              </motion.div>
              
              <motion.div 
                className="profile-title-container"
                variants={itemVariants}
              >
                <motion.h1 className="profile-name">
                  {nameChars.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        delay: 0.3 + (index * 0.04),
                        duration: 0.2
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
                
                <motion.h2 
                  className="profile-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {profileData.title}
                </motion.h2>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="profile-content"
              variants={itemVariants}
            >
              <Bio text={profileData.bio} />
              
              <motion.div 
                className="contact-info"
                variants={itemVariants}
              >
                <h3>Contact</h3>
                <p>
                  <strong>Email:</strong> {profileData.email}
                </p>
                {profileData.phone && (
                  <p>
                    <strong>Phone:</strong> {profileData.phone}
                  </p>
                )}
                {profileData.portfolio && (
                  <p>
                    <strong>Portfolio:</strong>{' '}
                    <a 
                      href={profileData.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {profileData.portfolio.replace(/^https?:\/\//, '')}
                    </a>
                  </p>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <SocialLinks links={profileData.socialLinks} />
              </motion.div>
            </motion.div>
            
            <CloseButton onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpandedProfile;