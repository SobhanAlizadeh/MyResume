import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

function SkillsGalaxy({ position }) {
    const materialRef = useRef();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.emissiveIntensity = Math.sin(clock.elapsedTime * 2) * 0.9 + 0.5;
        }
    });

    const skills = [
        'React', 'Laravel', 'AWS', 'Docker',
        'PostgreSQL', 'Redis', 'Python', 'Nginx'
    ];

    const skillRefs = useRef(skills.map(() => React.createRef()));

    useFrame(({ clock }) => {
        const radius = isMobile ? 3 : 5; // شعاع مدار سیاره‌ها
        const speed = 0.5; // سرعت چرخش

        skillRefs.current.forEach((ref, index) => {
            if (ref.current) {
                const angle = (clock.elapsedTime * speed) + (index * (Math.PI * 2 / skills.length));
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                ref.current.position.set(x, 0, z);

                const intensity = Math.sin(clock.elapsedTime + index) * 0.5 + 0.5;
                ref.current.scale.set(intensity, intensity, intensity);
                ref.current.material.opacity = intensity;
                ref.current.material.transparent = true;
            }
        });
    });

    return (
        <group position={position}>
            <Text
                fontSize={isMobile ? 0.6 : 0.8}
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

            {skills.map((skill, i) => (
                <Text
                    key={skill}
                    ref={skillRefs.current[i]}
                    fontSize={isMobile ? 0.4 : 0.5}
                    color="#ff7d00"
                    position={[0, 0, 0]}
                    anchorX="center"
                    anchorY="middle"
                >
                    {skill}
                </Text>
            ))}
        </group>
    );
}
export default SkillsGalaxy;