import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/ProfileImage.css';

const ProfileImage = ({
  imageUrl,
  alt,
  onHoverStart,
  onHoverEnd,
  onExpand,
  isHovered,
  settings
}) => {
  const imageRef = useRef(null);

  // Animation timing configuration based on context settings
  const animationConfig = {
    duration: settings.hoverDuration,
    ease: settings.easing.hover,
  };

  // Define hover animation variants
  const imageVariants = {
    initial: {
      scale: 1,
      filter: 'grayscale(80%)',
      transition: {
        duration: animationConfig.duration,
        ease: animationConfig.ease
      }
    },
    hover: {
      scale: 1.05,
      filter: 'grayscale(0%)',
      transition: {
        duration: animationConfig.duration,
        ease: animationConfig.ease
      }
    }
  };

  if (settings.reducedMotion) {
    imageVariants.hover.scale = 1.02;
  }

  const handleClick = () => {
    if (settings.enableSound) {
      const sound = new Audio('/click-sound.mp3');
      sound.volume = 0.2;
      sound.play();
    }
    onExpand();
  };

  return (
    <motion.div
      className="profile-image-container"
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={handleClick}
      role="button"
      aria-label={`View ${alt}'s profile`}
    >
      <motion.img
        ref={imageRef}
        variants={imageVariants}
        src={imageUrl}
        alt={alt}
        className="profile-image"
        loading="lazy"
      />

      {/* Text overlay that appears on hover */}
      <motion.div
        className="image-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="overlay-content"
          initial={{ y: 20 }}
          animate={{ y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.4 }}
        >
          <h3>View Profile</h3>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileImage;