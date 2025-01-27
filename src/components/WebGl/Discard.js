
import { UseCanvas } from "./UseCanvas";
import { useEffect, useState, useMemo } from 'react';
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import axios from "axios";
import * as THREE from 'three';

export default function Discard() {

    const [landingFragment, setLandingFragment] = useState('');
    const [landingVertex, setLandingVertex] = useState('');

    const canvas = UseCanvas();
    const canvasTexture = new THREE.CanvasTexture(canvas);
    const revealtexture = useTexture("/images/reveal.jpg");

    const uniforms = useMemo(() => ({
        uTexture: { value: revealtexture },
        uCanvasTexture: { value: canvasTexture },
    }), [canvasTexture, revealtexture]);

    useEffect(() => {
        axios.get("/shaders/landingPage/landingFragment.glsl").then((response) => setLandingFragment(response.data));
        axios.get("/shaders/landingPage/landingVertex.glsl").then((response) => setLandingVertex(response.data));
    }, []);

    useFrame((state, delta) => {
        canvasTexture.needsUpdate = true;

    });


    if (landingFragment === '' || landingVertex === '') return null;


    return (
        <mesh>
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