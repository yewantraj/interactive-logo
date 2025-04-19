import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AnimationContext = createContext();

// Animation default settings
const defaultSettings = {
  hoverDuration: 0.5,
  expandDuration: 1.2,
  collapseDuration: 0.8,
  easing: {
    hover: [0.43, 0.13, 0.23, 0.96], // Custom cubic-bezier
    expand: [0.34, 1.56, 0.64, 1],    // Spring-like
    collapse: [0.43, 0.13, 0.23, 0.96]
  },
  enableSound: false,
  reducedMotion: false
};

// Provider component
export const AnimationProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    if (prefersReducedMotion) {
      setSettings(prev => ({
        ...prev,
        reducedMotion: true,
        hoverDuration: prev.hoverDuration * 1.5, // Slower animations
        expandDuration: prev.expandDuration * 1.5,
        collapseDuration: prev.collapseDuration * 1.5
      }));
    }
  }, []);
  
  // Update individual settings
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Reset to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
  };
  
  const value = {
    settings,
    updateSetting,
    resetSettings
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hook for using the animation context
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export default AnimationContext;