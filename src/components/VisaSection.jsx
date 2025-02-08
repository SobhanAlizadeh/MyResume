import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function VisaSection({ position }) {
    const materialRef = useRef();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.emissiveIntensity = Math.sin(clock.elapsedTime * 2) * 0.5 + 0.5;
        }
    });

    return (
        <group position={position}>
            <Text
                fontSize={isMobile ? 0.6 : 0.8}
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
                fontSize={isMobile ? 0.25 : 0.3}
                color="white"
                anchorX="center"
                position={[0, -1.2, 0]}
                maxWidth={isMobile ? 6 : 8}
                textAlign="center"
            >
                Available for relocation within 4-6 weeks
            </Text>
            <Text
                fontSize={isMobile ? 0.25 : 0.3}
                color="white"
                anchorX="center"
                position={[0, -1.7, 0]}
                maxWidth={isMobile ? 6 : 8}
                textAlign="center"
            >
                Documents: Passport, Degrees, Employment Letters
            </Text>
        </group>
    );
}
export default VisaSection;