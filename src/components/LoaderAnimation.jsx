import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from 'gsap'
import {  Text, Image } from '@react-three/drei'
import viteLogo from '../../public/vite.svg';

function LoaderAnimation({ position, onComplete }) {
    const [visible, setVisible] = useState(true);
    const textRef = useRef();
    const imgRef = useRef();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
    useGSAP(() => {
      if (textRef.current?.material && imgRef.current?.material) {
        gsap.to(textRef.current.material, {
          opacity: 0,
          duration: 4,
          delay: 1,
          onComplete: () => {
            setVisible(false);
            onComplete();
          }
        });
        gsap.to(imgRef.current.material, {
          opacity: 0,
          duration: 4,
          delay: 1,
          onComplete: () => {
            setVisible(false);
            onComplete();
          }
        });
      }
    });
  
    return visible ? (
      <>
        <Text ref={textRef} fontSize={isMobile ? 0.8 : 1.5} position={[0, -2, 0]} color="gold">
          Sobhan Alizadeh
        </Text>
        <Image
          ref={imgRef}
          url={viteLogo}
          position={[0, 1, 0]}
          scale={isMobile ? [3, 3, 1] : [5, 5, 1]}
          transparent
          opacity={1}
        />
      </>
    ) : null;
  }
export default LoaderAnimation