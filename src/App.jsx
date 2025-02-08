import { Canvas } from '@react-three/fiber'
import { ScrollControls,  Stars } from '@react-three/drei'

import PortfolioContent from './components/PortfolioContent'
export default function App() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const fov = isMobile ? 75 : 50;
  return (
    <Canvas camera={{ position: [0, 0, 10], fov }}>
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