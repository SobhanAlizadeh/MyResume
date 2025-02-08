import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function ExperienceSection({ position }) {
    const materialRef = useRef();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.emissiveIntensity = Math.sin(clock.elapsedTime * 2) * 0.5 + 0.5;
        }
    });

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
    ];

    return (
        <group position={position}>
            <Text
                fontSize={isMobile ? 0.5 : 0.6}
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
                <group key={i} position={[0, -i * (isMobile ? 3 : 4), 0]}>
                    <Text
                        fontSize={isMobile ? 0.4 : 0.5}
                        color="#ffg700"
                        anchorX="center"
                        position={[0, 0, 0]}
                    >
                        {exp.title}
                    </Text>

                    <Text
                        fontSize={isMobile ? 0.25 : 0.3}
                        color="#ffffff"
                        anchorX="center"
                        position={[0, -1.5, 0]}
                        maxWidth={isMobile ? 6 : 8}
                        textAlign="left"
                        lineHeight={1.2}
                    >
                        {exp.details}
                    </Text>
                </group>
            ))}
        </group>
    );
}

export default ExperienceSection;