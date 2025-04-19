import React, { useRef, useState } from 'react';
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
  const [imgError, setImgError] = useState(false);

  const animationConfig = {
    duration: settings.hoverDuration,
    ease: settings.easing.hover,
  };

  const imageVariants = {
    initial: {
      scale: 1,
      filter: 'grayscale(80%)',
      transition: animationConfig
    },
    hover: {
      scale: settings.reducedMotion ? 1.02 : 1.05,
      filter: 'grayscale(0%)',
      transition: animationConfig
    }
  };

  const handleClick = () => {
    if (settings.enableSound) {
      const sound = new Audio('/click-sound.mp3');
      sound.volume = 0.2;
      sound.play().catch(e => console.error("Sound playback failed:", e));
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
      {imgError ? (
        <div className="image-fallback">
          <span>{alt}</span>
        </div>
      ) : (
        <motion.img
          ref={imageRef}
          variants={imageVariants}
          src={imageUrl}
          alt={alt}
          className="profile-image"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}

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