import React, { useRef, useEffect, useMemo, useState, use } from "react";
import axios from "axios";
import { useTexture, useFBO, Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import emitter from "../Utils/EventEmitter";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { Scale } from "lucide-react";



const Transition = React.memo(() => {
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

    useGSAP(() => {
        let loopTl;
        emitter.on('transitionCalled', (data) => {
            loopTl  = gsap.timeline({ repeat: 1, yoyo: true });
            loopTl.to(uniforms.uProgress, { value: 0, duration: 1, ease: 'power2.inOut' });
            console.log('transitionCalled');
            
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
})

export default Transition; 