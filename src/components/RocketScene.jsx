import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Rocket=()=> {
    const rocketRef = useRef();
    const fireRef = useRef();

    // ایجاد ذرات برای آتش
    const fireParticles = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 1] = Math.random() * -1;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    fireParticles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const fireMaterial = new THREE.PointsMaterial({
        color: 'orange',
        size: 0.1,
        transparent: true,
        opacity: 0.8,
    });

    // انیمیشن آتش
    useFrame((state, delta) => {
        if (fireRef.current) {
            const positions = fireRef.current.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3 + 1] -= delta * 2; // حرکت ذرات به سمت پایین
                if (positions[i * 3 + 1] < -1) {
                    positions[i * 3] = (Math.random() - 0.5) * 0.5;
                    positions[i * 3 + 1] = 0;
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
                }
            }
            fireRef.current.geometry.attributes.position.needsUpdate = true;
        }
        
    });

    return (
        <group position={[0, 0, 0]}>
            {/* بدنه موشک */}
            <mesh ref={rocketRef} position={[0, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
                <meshStandardMaterial color="gray" />
            </mesh>
            {/* نوک موشک */}
            <mesh position={[0, 1, 0]}>
                <coneGeometry args={[0.6, 1, 32]} />
                <meshStandardMaterial color="red" />
            </mesh>
            {/* آتش */}
            <points ref={fireRef} position={[0, -1, 0]}>
                <bufferGeometry attach="geometry" {...fireParticles} />
                <pointsMaterial attach="material" {...fireMaterial} />
            </points>
        </group>
    );
}

export default Rocket
