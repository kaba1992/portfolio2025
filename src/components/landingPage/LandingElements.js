import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Gravity, { MatterBody } from '../Utils/Gravity.js';
import ProjectsCategories from '../../pages/ProjectsCategories.js';
import Projects from './../../pages/Projects';
import ProjectsData from '../Utils/Data.js';

export default function LandingElements() {
    const [projects, setProjects] = useState([]);
    const skills = [
        "WEB/WEB-AR",
        "CREATIVE",
        "FRONT-END",
        "DEVELOPER"
    ];
    
    return (
        <>
            <div className=' w-full h-full absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 flex items-center justify-around '
            >
                <Gravity gravity={{ x: 0, y: 1 }} grabCursor={true} className="w-full h-full ">

                    <div className="text-white  ">
                        {skills.map((skill, index) => (
                            <MatterBody
                                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                                x={`${30 + index * 10}%`}
                                y={`${20 + index * 10}%`}
                                key={index + skill}
                            >
                                <div className="px-12 md:px-24 text-sm text-white bg-black rounded-full text-2xl md:text-3xl hover:cursor-pointer  h-[45px] md:h-[90px] flex items-center justify-center shadow-categorieBox "
                                    key={index + skill}>{skill}</div>
                            </MatterBody>
                        ))}
                    </div>


                </Gravity>
            </div>
            <div className=' absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 flex flex-col items-center justify-around '>
                <ProjectsCategories />
            </div>


        </>
    )
}