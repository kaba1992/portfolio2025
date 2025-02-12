import Spline from '@splinetool/react-spline';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import LandingElements from './LandingElements';
import gsap from 'gsap';

export default function LandingPage({ showElements }) {
  const sphere = useRef();
  const landingPage = useRef();
  function onLoad(spline) {
    const obj = spline.findObjectById('9C561A0B-FAC7-4780-9B32-CD85361D929E');
    sphere.current = obj;
  }

  useEffect(() => {


  }, []);


  return (


    <div className='relative bg-red' style={{
      width: '90%',
      height: '85%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid white',
      
    }}
      ref={landingPage}
    >
      {/* <Spline
        scene="https://prod.spline.design/n47SWpCNFv0OPbN6/scene.splinecode"
        onLoad={onLoad}
      /> */}
      {showElements && <LandingElements />}


    </div>
  );
}