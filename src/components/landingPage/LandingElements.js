import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import Gravity, { MatterBody } from '../Utils/Gravity.js';
import ProjectsCategories from '../../pages/ProjectsCategories.js';
import Projects from './../../pages/Projects';
import ProjectsData from '../Utils/Data.js';
import emitter from '../Utils/EventEmitter.js';

export default function LandingElements() {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const [projects, setProjects] = useState([]);
    const matterRef = useRef(null);
    const [canShow, setCanShow] = useState(false);
    const skills = [
        "Ibrahima Kaba",
        "CREATIVE",
        "FRONT-END",
        "DEVELOPER"
    ];
    useEffect(() => {
  
        emitter.on('revealCompleat', (data) => {
            setCanShow(true);
        });
        emitter.on('loadingComplete', (data) => {
          isMobile && setCanShow(true);
        });

    }, [canShow]);

    const titleElements = <div className='absolute flex items-center justify-around w-full h-full transform top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 '
    >
        <Gravity gravity={{ x: 0, y: 1 }} grabCursor={true} className="w-full h-full" ref={matterRef}>

            <div className="text-white pointer-events-auto ">
                {skills.map((skill, index) => (
                    <MatterBody

                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x={`${80 + index * 3}%`}
                        y={`${20 + index * 10}%`}
                        key={index + skill}
                    >
                        <div className="px-12 md:px-24 text-sm text-white bg-blue-400 font-bold
                         rounded-full text-2xl md:text-3xl hover:cursor-pointer
                          h-[45px] md:h-[90px] flex items-center justify-center shadow-categorieBox  "
                            key={index + skill}>{skill}</div>
                    </MatterBody>
                ))}
            </div>


        </Gravity>
    </div>


    return (
        <>
            {canShow && titleElements}
            <div className='absolute  top-2/4 md:left-1/4 left-2/4 -translate-x-2/4 -translate-y-2/4 md:text-left '>
                <ProjectsCategories />
            </div>


        </>
    )
}