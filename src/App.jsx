import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Text, Stars, useScroll, Image } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import viteLogo from '../public/vite.svg';
import RocketScene from './components/RocketScene'
import Rocket from './components/RocketScene'
export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Stars   
        radius={100} // Adjust the radius for more or less stars  
        depth={50} // Depth of the star field  
        count={5000} // Number of stars  
        factor={4} // Scale factor for the star size  
        saturation={0} // Saturation of the stars  
        fade // Optional: enables fading effect  
      /> 
      <ScrollControls pages={5} damping={0.1}>
        <PortfolioContent />
      </ScrollControls>
    </Canvas>
  )
}

function PortfolioContent() {
  const scroll = useScroll()
  const groupRef = useRef()
  const [showAbout, setShowAbout] = useState(false)
  const viewport = useRef({ height: 10 })

  useFrame((state) => {
    viewport.current = state.viewport
    if (groupRef.current) {
      groupRef.current.position.y = -scroll.offset * (viewport.current.height * 2.8)
    }
  })

  return (
    
    <group ref={groupRef}>
      {/* صفحه 1: لودر */}
      {!showAbout && (
        <LoaderAnimation 
          position={[0, 0, 0]} 
          onComplete={() => setShowAbout(true)}
        />
      )}
      
      {/* صفحه 2: درباره من */}
      {showAbout && <AboutSection position={[0, 1, 0]} />}
      
      {/* صفحه 3: مهارت‌ها */}
      <SkillsGalaxy position={[0, 8, 0]} />
      
      {/* صفحه 4: تجربیات */}
      <ExperienceSection position={[0, 22, 0]} />
      
      {/* صفحه 5: ویزا */}
      <VisaSection position={[0, 30, 0]} />
      {/* <Rocket position={[0, 0, 0]}  /> */}
    </group>
  )
}

function LoaderAnimation({ position, onComplete }) {
  const [visible, setVisible] = useState(true)
  const textRef = useRef()
  const imgRef = useRef()

  useGSAP(() => {
    if (textRef.current?.material && imgRef.current?.material) {
      gsap.to(textRef.current.material, {
        opacity: 0,
        duration: 4,
        delay: 1,
        onComplete: () => {
          setVisible(false)
          onComplete() // اجرای callback پس از اتمام انیمیشن
        }
      })
      gsap.to(imgRef.current.material, {
        opacity: 0,
        duration: 4,
        delay: 1,
        onComplete: () => {
          setVisible(false)
          onComplete() // اجرای callback پس از اتمام انیمیشن
        }
      })
    }
  })

  return visible ? (<>
  
    <Text ref={textRef} fontSize={1.5} position={[0,-2,0]} color="gold">
      Sobhan Alizadeh
    </Text>
    <Image
    ref={imgRef}
    url={viteLogo} // مسیر عکس
    position={[0, 1, 0]} // موقعیت عکس در صحنه
    scale={[5, 5, 1]} // اندازه عکس (عرض، ارتفاع، عمق)
    transparent // اگر می‌خواهید عکس شفاف باشد
    opacity={1} // میزان شفافیت (بین 0 تا 1)
  /></>
  ) : null
}

function AboutSection({ position }) {
  const [displayText, setDisplayText] = useState('')
  const fullText = `Senior Full Stack Developer (Laravel & React)
📍 Tehran, Iran
📧 sobhan2alizadeh@gmail.com
☎ +98 921 233 7582`

  useEffect(() => {
    let charIndex = 0
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, charIndex))
      charIndex++
      if (charIndex > fullText.length) clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (

    <Text
      fontSize={0.4}
      color="white"
      position={position}
      maxWidth={10}
      textAlign="left"
      anchorX="center"
      lineHeight={3}
    >
      {displayText}
    </Text>
    
  )
}


function SkillsGalaxy({ position }) {  
  const materialRef = useRef()

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = Math.sin(clock.elapsedTime * 2) * 0.9 + 0.5
    }
  })

  const skills = [  
    'React', 'Laravel', 'AWS', 'Docker',  
    'PostgreSQL', 'Redis', 'Python', 'Nginx'  
  ];  

  const skillRefs = useRef(skills.map(() => React.createRef()));  

  useFrame(({ clock }) => {  
    const radius = 5; // شعاع مدار سیاره‌ها
    const speed = 0.5; // سرعت چرخش

    skillRefs.current.forEach((ref, index) => {  
      if (ref.current) {  
        // محاسبه موقعیت دایره‌ای برای هر سیاره
        const angle = (clock.elapsedTime * speed) + (index * (Math.PI * 2 / skills.length));
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        // به‌روزرسانی موقعیت سیاره
        ref.current.position.set(x, 0, z);

        // تغییر شدت نور برای ایجاد افکت روشن و خاموش شدن  
        const intensity = Math.sin(clock.elapsedTime + index) * 0.5 + 0.5; // امواج سینوسی برای افکت روشن و خاموش  
        ref.current.scale.set(intensity, intensity, intensity); // مقیاس را تغییر می‌دهیم تا حالت روشن و خاموش شود  
        ref.current.material.opacity = intensity; // تغییر شفافیت برای افکت  
        ref.current.material.transparent = true; // فعال کردن شفافیت  
      }  
    });  
  });  

  return (  
    <group position={position}>  
      {/* خورشید (کلمه "Skills") */}
      <Text
        fontSize={0.8}
        position={[0, 0, 0]} 
        color="rgba(255, 255, 0, 0.1)"
      > 
        Skills
        <meshStandardMaterial
          ref={materialRef}
          emissive="gold"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </Text>

      {/* سیاره‌ها (مهارت‌ها) */}
      {skills.map((skill, i) => (  
        <Text  
          key={skill}  
          ref={skillRefs.current[i]} // ارجاع به هر مهارت  
          fontSize={0.5}  
          color="#ff7d00"  
          position={[0, 0, 0]}  // موقعیت اولیه (مرکز)
          anchorX="center"  
          anchorY="middle"  
        >  
          {skill}  
        </Text>  
      ))}  
    </group>  
  );  
}

function ExperienceSection({ position }) {
  const materialRef = useRef()

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = Math.sin(clock.elapsedTime * 2) * 0.5 + 0.5
    }
  })
  const experiences = [
    {
      title: 'Freelancer (2023–Present)',
      details: `• Migrated 15+ projects to microservices
• Optimized performance by 40%
• Modernized frontend with React
• Automated CI/CD pipelines`
    },
    {
      title: 'Virtual Hospital Hexa (2022–2023)',
      details: `• Built SaaS platform for 1M+ users
• Reduced API response time by 30%
• Achieved 95% code coverage
• Led architecture migration`
    }
  ]

  return (
    <group position={position}>
       <Text
        fontSize={0.6}
        color="#ffbb00"
        anchorX="center"
        position={[0, 2, 0]}
      >
        Professional Experience
        <meshStandardMaterial
          ref={materialRef}
          emissive="gold"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </Text>
      {experiences.map((exp, i) => (
        <group key={i} position={[0, -i * 4, 0]}>
          <Text
            fontSize={0.5}
            color="#ffg700"
            anchorX="center"
            position={[0, 0, 0]}
          >
            {exp.title}
          </Text>
          
          <Text
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            position={[0, -1.5, 0]}
            maxWidth={8}
            textAlign="left"
            lineHeight={1.2}
          >
            {exp.details}
          </Text>
        </group>
      ))}
    </group>
  )
}

function VisaSection({ position }) {
  const materialRef = useRef()

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = Math.sin(clock.elapsedTime * 2) * 0.5 + 0.5
    }
  })

  return (
    <group position={position}>
      <Text
        fontSize={0.8}
        color="gold"
        anchorX="center"
      >
        🔍 Visa Readiness
        <meshStandardMaterial
          ref={materialRef}
          emissive="gold"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </Text>
      
      <Text
        fontSize={0.3}
        color="white"
        anchorX="center"
        position={[0, -1.2, 0]}
        maxWidth={8}
        textAlign="center"
      >
        Available for relocation within 4-6 weeks
      </Text>
      <Text
        fontSize={0.3}
        color="white"
        anchorX="center"
        position={[0, -1.7, 0]}
        maxWidth={8}
        textAlign="center"
      >
        Documents: Passport, Degrees, Employment Letters
      </Text>

    </group>
  )
}