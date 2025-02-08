import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";

function AboutSection({ position }) {
    const [displayText, setDisplayText] = useState('');
    const fullText = `Senior Full Stack Developer (Laravel & React)
  📍 Tehran, Iran
  📧 sobhan2alizadeh@gmail.com
  ☎ +98 921 233 7582`;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
    useEffect(() => {
      let charIndex = 0;
      const interval = setInterval(() => {
        setDisplayText(fullText.slice(0, charIndex));
        charIndex++;
        if (charIndex > fullText.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <Text
        fontSize={isMobile ? 0.3 : 0.4}
        color="white"
        position={position}
        maxWidth={isMobile ? 8 : 10}
        textAlign="left"
        anchorX="center"
        lineHeight={3}
      >
        {displayText}
      </Text>
    );
  }
  export default AboutSection