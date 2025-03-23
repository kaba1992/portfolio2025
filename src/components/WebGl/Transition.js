import React, { useRef, useEffect, useMemo, useState, use } from "react";
import { useTexture, useFBO, Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import emitter from "../Utils/EventEmitter";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import transitionFragment from "../../assets/shaders/transitionFragment.glsl";
import transitionVertex from "../../assets/shaders/transitionVertex.glsl";


const Transition = React.memo(() => {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const transitionMesh = useRef();
    const rendertargetTexture = useFBO();
    const transitionTexture = useTexture("/images/reveal.png");
    const transitiontexMobile = useTexture("/images/WavesMobile.png");
    const revealTexture = isMobile ? transitiontexMobile : transitionTexture;

    const uniforms = useMemo(() => ({
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTransitionTexture: { value: revealTexture },
        uRenderTargetTexture: { value: rendertargetTexture.texture, transitiontexMobile },
        uProgress: { value: 1. },
    }), [transitionTexture, rendertargetTexture.texture,]);

    useGSAP(() => {
        let loopTl;
        emitter.on('transitionCalled', (data) => {
            loopTl = gsap.timeline({ repeat: 1, yoyo: true });
            loopTl.to(uniforms.uProgress, { value: 0, duration: 1, ease: 'power2.inOut' });
         

        });
        return () => {
            loopTl.kill();
        }



    }, []);




    useFrame(({ gl, camera, scene }) => {
        // console.log(uniforms.uProgress.value);
        gl.setRenderTarget(rendertargetTexture);
        gl.render(scene, camera);
        gl.setRenderTarget(null);

    });


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
})

export default Transition; 