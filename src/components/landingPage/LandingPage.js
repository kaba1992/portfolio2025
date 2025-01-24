import Spline from '@splinetool/react-spline';
import React, { useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useFrame } from '@react-three/fiber';
import LandingElements from './LandingElements';

export default function LandingPage({ showElements }) {
  const sphere = useRef();
  function onLoad(spline) {
    const obj = spline.findObjectById('9C561A0B-FAC7-4780-9B32-CD85361D929E');
    sphere.current = obj;
  }

  // useFrame((delta) => {

  //   if (sphere.current) {
  //     sphere.current.rotation.y += 0.01 * delta;
  //   }
  // });

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

    >
      <Spline
        scene="https://prod.spline.design/n47SWpCNFv0OPbN6/scene.splinecode"
        onLoad={onLoad}
      />
      {showElements && <LandingElements />}


    </div>
  );
}