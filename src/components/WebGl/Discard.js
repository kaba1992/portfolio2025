import landingFragment from "../../shaders/LandingPage/landingFragment.glsl";
import landingVertex from "../../shaders/LandingPage/landingVertex.glsl";

export default function Discard() {

    return (
        <mesh>
            <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <shaderMaterial
                fragmentShader={landingFragment}
                vertexShader={landingVertex}
            />
        </mesh>
    )
}