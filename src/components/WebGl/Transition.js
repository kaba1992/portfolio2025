import React, { useRef, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTexture, useFBO } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import emitter from "../Utils/EventEmitter";
import * as THREE from "three";


export default function Transition() {
    const transitionMesh = useRef();
    const [transitionFragment, setTransitionFragment] = useState('');
    const [transitionVertex, setTransitionVertex] = useState('');
    const rendertargetTexture = useFBO();
    const transitionTexture = useTexture("/images/reveal.jpg");
    const uniforms = useMemo(() => ({
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTransitionTexture: { value: transitionTexture },
        uRenderTargetTexture: { value: rendertargetTexture.texture },
        uProgress: { value: 1. },
    }), [transitionTexture, rendertargetTexture.texture]);

    gsap.to(uniforms.uProgress, { value: 0, duration: 1, ease: 'power2.inOut', yoyo: true, repeat: -1, });
    emitter.on('loadingComplete', (data) => {
console.log('transitionCalled');

    });

    useFrame(({ gl, camera, scene }) => {
        // console.log(uniforms.uProgress.value);

        gl.setRenderTarget(rendertargetTexture);
        gl.render(scene, camera);
        gl.setRenderTarget(null);

    });

    useEffect(() => {
        axios.get("/shaders/others/transitionFragment.glsl").then((response) => setTransitionFragment(response.data));
        axios.get("/shaders/others/transitionVertex.glsl").then((response) => setTransitionVertex(response.data));

    }, []);

    if (transitionFragment === '' || transitionVertex === '') return null;

    return (
        <mesh ref={transitionMesh} >
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={transitionVertex}
                fragmentShader={transitionFragment}
                transparent={true}
            />
        </mesh>
    )
}