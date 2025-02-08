import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import LoaderAnimation from "./LoaderAnimation";
import AboutSection from "./AboutSection";
import SkillsGalaxy from "./SkillsGalaxy";
import ExperienceSection from "./ExperienceSection";
import VisaSection from "./VisaSection";

function PortfolioContent() {
    const scroll = useScroll();
    const groupRef = useRef();
    const [showAbout, setShowAbout] = useState(false);
    const viewport = useRef({ height: 10 });
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const scaleFactor = isMobile ? 1.5 : 2.5;

    useFrame((state) => {
        viewport.current = state.viewport;
        if (groupRef.current) {
            groupRef.current.position.y = -scroll.offset * (viewport.current.height * scaleFactor);
        }
    });

    return (
        <group ref={groupRef}>
            {!showAbout && (
                <LoaderAnimation
                    position={[0, 0, 0]}
                    onComplete={() => setShowAbout(true)}
                />
            )}
            {showAbout && <AboutSection position={[0, 1, 0]} />}
            <SkillsGalaxy position={[0, isMobile ? 10 : 8, 0]} />
            <ExperienceSection position={[0, isMobile ? 18 : 22, 0]} />
            <VisaSection position={[0, isMobile ? 26 : 30, 0]} />
        </group>
    );
}

export default PortfolioContent;