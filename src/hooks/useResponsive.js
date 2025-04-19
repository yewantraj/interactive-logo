import { useState, useEffect } from 'react';

// Breakpoint definitions
const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  large: 1440
};

const useResponsive = () => {
  // Helper function to determine current breakpoint
  const getBreakpoint = (width) => {
    if (width < breakpoints.mobile) return 'xs';
    if (width < breakpoints.tablet) return 'mobile';
    if (width < breakpoints.desktop) return 'tablet';
    if (width < breakpoints.large) return 'desktop';
    return 'large';
  };

  const [state, setState] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : breakpoints.desktop,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    breakpoint: typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'desktop',
    orientation: typeof window !== 'undefined' ? 
      (window.innerWidth > window.innerHeight ? 'landscape' : 'portrait') : 'landscape'
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Handler for window resize events
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setState({
        width,
        height,
        breakpoint: getBreakpoint(width),
        orientation: width > height ? 'landscape' : 'portrait'
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call once immediately to set initial size
    handleResize();
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Additional helper methods
  const isMobile = state.breakpoint === 'mobile' || state.breakpoint === 'xs';
  const isTablet = state.breakpoint === 'tablet';
  const isDesktop = state.breakpoint === 'desktop' || state.breakpoint === 'large';
  const isPortrait = state.orientation === 'portrait';
  const isLandscape = state.orientation === 'landscape';

  return {
    ...state,
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    isLandscape
  };
};

export default useResponsive;