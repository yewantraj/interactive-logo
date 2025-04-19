import { useReducer, useCallback } from 'react';

// Define animation states and transitions
const ANIMATION_STATES = {
  IDLE: 'idle',
  HOVER: 'hover',
  EXPANDING: 'expanding',
  EXPANDED: 'expanded',
  COLLAPSING: 'collapsing'
};

// Animation reducer
const animationReducer = (state, action) => {
  switch (action.type) {
    case 'HOVER_START':
      // Only transition to hover if we're in idle state
      if (state.current === ANIMATION_STATES.IDLE) {
        return {
          ...state,
          current: ANIMATION_STATES.HOVER,
          previous: state.current
        };
      }
      return state;
      
    case 'HOVER_END':
      // Only transition back to idle if we're in hover state
      if (state.current === ANIMATION_STATES.HOVER) {
        return {
          ...state,
          current: ANIMATION_STATES.IDLE,
          previous: state.current
        };
      }
      return state;
      
    case 'EXPAND_START':
      // Can expand from either idle or hover states
      if ([ANIMATION_STATES.IDLE, ANIMATION_STATES.HOVER].includes(state.current)) {
        return {
          ...state,
          current: ANIMATION_STATES.EXPANDING,
          previous: state.current
        };
      }
      return state;
      
    case 'EXPAND_COMPLETE':
      if (state.current === ANIMATION_STATES.EXPANDING) {
        return {
          ...state,
          current: ANIMATION_STATES.EXPANDED,
          previous: state.current
        };
      }
      return state;
      
    case 'COLLAPSE_START':
      if (state.current === ANIMATION_STATES.EXPANDED) {
        return {
          ...state,
          current: ANIMATION_STATES.COLLAPSING,
          previous: state.current
        };
      }
      return state;
      
    case 'COLLAPSE_COMPLETE':
      if (state.current === ANIMATION_STATES.COLLAPSING) {
        return {
          ...state,
          current: ANIMATION_STATES.IDLE,
          previous: state.current
        };
      }
      return state;
      
    case 'CANCEL_ANIMATION':
      // Revert to previous state if animation is interrupted
      return {
        ...state,
        current: state.previous,
        previous: state.current
      };
      
    default:
      return state;
  }
};

const useAnimationState = (config = {}) => {
    const {
      hoverDuration = 0.5,
      expandDuration = 1.2,
      collapseDuration = 0.8
    } = config;
    
    const initialState = {
      current: ANIMATION_STATES.IDLE,
      previous: null,
      config: {
        hoverDuration,
        expandDuration,
        collapseDuration
      }
    };
  
  const [state, dispatch] = useReducer(animationReducer, initialState);
  
  // Helper functions to check current state
  const isIdle = state.current === ANIMATION_STATES.IDLE;
  const isHovered = state.current === ANIMATION_STATES.HOVER;
  const isExpanding = state.current === ANIMATION_STATES.EXPANDING;
  const isExpanded = state.current === ANIMATION_STATES.EXPANDED;
  const isCollapsing = state.current === ANIMATION_STATES.COLLAPSING;
  
  // Event handlers with timeouts for animation completion
  const handleHoverStart = useCallback(() => {
    dispatch({ type: 'HOVER_START' });
  }, []);
  
  const handleHoverEnd = useCallback(() => {
    dispatch({ type: 'HOVER_END' });
  }, []);
  
  const handleExpand = useCallback(() => {
    dispatch({ type: 'EXPAND_START' });
    
    // Schedule completion after animation duration
    const timer = setTimeout(() => {
      dispatch({ type: 'EXPAND_COMPLETE' });
    }, expandDuration * 1000);
    
    return () => clearTimeout(timer);
  }, [expandDuration]);
  
  const handleCollapse = useCallback(() => {
    dispatch({ type: 'COLLAPSE_START' });
    
    // Schedule completion after animation duration
    const timer = setTimeout(() => {
      dispatch({ type: 'COLLAPSE_COMPLETE' });
    }, collapseDuration * 1000);
    
    return () => clearTimeout(timer);
  }, [collapseDuration]);
  
  const cancelAnimation = useCallback(() => {
    dispatch({ type: 'CANCEL_ANIMATION' });
  }, []);
  
  return {
    state: state.current,
    isIdle,
    isHovered,
    isExpanding,
    isExpanded,
    isCollapsing,
    handleHoverStart,
    handleHoverEnd,
    handleExpand,
    handleCollapse,
    cancelAnimation,
    config: state.config
  };
};

export default useAnimationState;