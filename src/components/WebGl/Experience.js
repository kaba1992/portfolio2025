import Discard from "./Discard";
import Transition from "./Transition";
import { Lightformer, Environment, OrbitControls, Stats } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export default function Experience() {
    console.log('Experience');


    return (


        <Canvas

            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 500,
                pointerEvents: 'none'
            }}
            shadows
            camera={{ position: [0, 0, -5], fov: 50 }}>
            {/* <Discard /> */}
            <Transition />
            {/* <Stats /> */}
        </Canvas>

    )

}