
import { UseCanvas } from "./UseCanvas";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import axios from "axios";
import * as THREE from 'three';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import emitter from "../Utils/EventEmitter";
import landingFragment from "../../assets/shaders/LandingPage/landingFragment.glsl";
import landingVertex from "../../assets/shaders/LandingPage/landingVertex.glsl";

export default function Discard() {

    const canvas = UseCanvas();
    const canvasTexture = new THREE.CanvasTexture(canvas);
    const revealtexture = useTexture("/images/reveal.png");
    const revealMesh = useRef();

    const uniforms = useMemo(() => ({
        uTexture: { value: revealtexture },
        uCanvasTexture: { value: canvasTexture },
        uOpacity: { value: 1 }
    }), [canvasTexture, revealtexture]);



    useFrame((state, delta) => {
        canvasTexture.needsUpdate = true;

    });

    emitter.on('revealCompleat', (data) => {
        if (revealMesh.current ) {
            gsap.to(revealMesh.current.material.uniforms.uOpacity, { value: 0, duration: 1.5 ,onComplete:()=>{
                canvas.style.display = 'none';
            }});
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