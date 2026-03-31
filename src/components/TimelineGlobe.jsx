import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useRef, Suspense, useState } from "react"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"
import globeUrl from "../assets/wireframe_sphere.glb"

useGLTF.preload(globeUrl)

function GlobeModel() {
    const ref = useRef()
    const { scene } = useGLTF(globeUrl)

    scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({
                color: "#FDFCF8",
                wireframe: true,
                transparent: true,
                opacity: 0.8
            })
        }
    })

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.003
        }
    })

    return <primitive ref={ref} object={scene} scale={1.4} position={[0, 0, 0]} />
}

export default function TimelineGlobe() {
    const [isReady, setIsReady] = useState(false);

    return (
        <div className="mt-[30px] h-[70px] w-[80px] -mr-[10px]">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isReady ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full w-full"
                >
                    <Canvas
                        camera={{ position: [0, 0, 5] }}
                        gl={{
                            alpha: true,
                            antialias: true,
                            stencil: false,
                            depth: true,
                            powerPreference: 'high-performance',
                            preserveDrawingBuffer: false
                        }}
                        dpr={[1, 2]}
                        style={{ background: 'transparent', pointerEvents: 'none' }}
                        onCreated={({ gl }) => {
                            gl.setClearColor(0x000000, 0)
                            // Short delay to ensure the first frame is rendered transparent
                            requestAnimationFrame(() => {
                                setIsReady(true);
                            });
                        }}
                    >
                        <ambientLight intensity={1} />
                        <Suspense fallback={null}>
                            <GlobeModel />
                        </Suspense>
                    </Canvas>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}