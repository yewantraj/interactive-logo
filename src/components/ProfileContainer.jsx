import React, { useState } from 'react';
import useAnimationState from '../hooks/useAnimationState';
import useResponsive from '../hooks/useResponsive';
import { useAnimation } from '../context/AnimationContext';
import ProfileImage from './ProfileImage';
import ExpandedProfile from './ExpandedProfile';
import '../styles/ProfileContainer.css';

const ProfileContainer = () => {
  const { settings } = useAnimation();
  const { isDesktop } = useResponsive();
  
  const animation = useAnimationState({
    hoverDuration: settings.hoverDuration,
    expandDuration: settings.expandDuration,
    collapseDuration: settings.collapseDuration
  });
  
  const [profileData] = useState({
    name: "Yewantraj Karki",
    title: "Software Engineer",
    image: process.env.PUBLIC_URL + "/images/profile-image.jpg",
    bio: "Software\u00A0engineer\u00A0 specializing\u00A0 in\u00A0 modern\u00A0 web\u00A0 development,\u00A0 with\u00A0 expertise\u00A0 in\u00A0 JavaScript,\u00A0 React,\u00A0 and Node.js.\u00A0 Passionate\u00A0 about\u00A0 crafting\u00A0 efficient,\u00A0 user-centric\u00A0 applications\u00A0 through \u00A0clean\u00A0 code\u00A0 and \u00A0scalable \u00A0architecture.\u00A0 Committed\u00A0 to \u00A0continuous\u00A0 learning\u00A0 and \u00A0collaborative\u00A0 problem-solving.\u00A0 Outside\u00A0 of\u00A0 development,\u00A0 I\u00A0 contribute\u00A0 to\u00A0 open-source \u00A0projects\u00A0 and\u00A0 explore\u00A0 emerging\u00A0 technologies.",
    email: "yewantkarki18@gmail.com",
    phone: "(437) 607-1314",
    portfolio: "https://yewantraj.github.io/desn3036-portfolio/",
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/yewantraj-karki-36879a17b/", icon: "linkedin" },
      { name: "GitHub", url: "https://github.com/yewantraj", icon: "github" },
    ]
  });

  return (
    <div className="profile-container">
      <div 
        className={`profile-image-wrapper ${animation.isExpanded ? 'hidden' : ''}`}
        style={{ transform: `scale(${isDesktop ? 1 : 0.8})` }}
      >
        <ProfileImage 
          imageUrl={profileData.image}
          alt={profileData.name}
          onHoverStart={animation.handleHoverStart}
          onHoverEnd={animation.handleHoverEnd}
          onExpand={animation.handleExpand}
          isHovered={animation.isHovered}
          settings={settings}
        />
      </div>
      
      <ExpandedProfile 
        isVisible={animation.isExpanded}
        onClose={animation.handleCollapse}
        profileData={profileData}
        settings={settings}
      />
    </div>
  );
};

export default ProfileContainer;