import React, { useState, useEffect } from 'react';
import Gravity, { MatterBody } from '../components/Physics/Gravity.js';
import LandingPage from '../components/landingPage/LandingPage.js';

export default function Projects() {
    return (
        <>
            <LandingPage showElements={false} />
            <div className="" style={{
                width: '90%',
                height: '85%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '1px solid white',
            }}>

                <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="30%"
                        y="10%"
                    >
                        <div className="px-8 py-4 text-xl text-white bg-black rounded-full sm:text-2xl md:text-3xl hover:cursor-pointer">
                            WEB 
                        </div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="30%"
                        y="30%"
                    >
                        <div className="px-8 py-4 text-xl text-white bg-black rounded-full sm:text-2xl md:text-3xl hover:cursor-grab ">
                            AR
                        </div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="40%"
                        y="20%"
                        angle={10}
                    >
                        <div className="px-8 py-4 text-xl text-white bg-black rounded-full sm:text-2xl md:text-3xl hover:cursor-grab ">
                            WEB-AR
                        </div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="75%"
                        y="10%"
                    >
                        <div className="px-8 py-4 text-xl text-white bg-black rounded-full sm:text-2xl md:text-3xl hover:cursor-grab ">
                            LABO
                        </div>
                    </MatterBody>
                  
                </Gravity>
            </div>
        </>




    )
}