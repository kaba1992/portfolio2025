
import { UseCanvas } from "./UseCanvas";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import axios from "axios";
import * as THREE from 'three';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import emitter from "../Utils/EventEmitter";

export default function Discard() {

    const [landingFragment, setLandingFragment] = useState('');
    const [landingVertex, setLandingVertex] = useState('');
 
    const canvas = UseCanvas();
    const canvasTexture = new THREE.CanvasTexture(canvas);
    const revealtexture = useTexture("/images/reveal.jpg");
    const revealMesh = useRef();

    const uniforms = useMemo(() => ({
        uTexture: { value: revealtexture },
        uCanvasTexture: { value: canvasTexture },
        uOpacity: { value: 1 }
    }), [canvasTexture, revealtexture]);

    useEffect(() => {
        axios.get("/shaders/landingPage/landingFragment.glsl").then((response) => setLandingFragment(response.data));
        axios.get("/shaders/landingPage/landingVertex.glsl").then((response) => setLandingVertex(response.data));
    }, []);

    useFrame((state, delta) => {
        canvasTexture.needsUpdate = true;
        console.log(uniforms.uOpacity.value);


    });

    emitter.on('revealCompleat', (data) => {
        if (revealMesh.current ) {
            gsap.to(revealMesh.current.material.uniforms.uOpacity, { value: 0, duration: 1.5 });
        }
    });






    if (landingFragment === '' || landingVertex === '') return null;


    return (

        <mesh ref={revealMesh} >
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={landingVertex}
                fragmentShader={landingFragment}
                transparent={true}

            />
        </mesh>

    );

}