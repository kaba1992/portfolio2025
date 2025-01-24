import React from 'react';
import { NavLink } from "react-router-dom";
import Gravity, { MatterBody } from '../Utils/Gravity.js';

export default function LandingElements() {
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

                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="30%"
                        y="40%"

                    >
                        <h1 className="text-6xl font-bold text-white cursor-grab">Ibrahima Kaba</h1>
                    </MatterBody>
                    <div className="text-white  ">
                        {skills.map((skill, index) => (
                            <MatterBody
                                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                                x={`${30 + index * 10}%`}
                                y={`${20 + index * 10}%`}
                                key={index + skill}
                            >
                                <div className="px-24 text-sm text-white bg-black rounded-full sm:text-2xl md:text-3xl hover:cursor-pointer  h-[90px] flex items-center justify-center shadow-categorieBox "
                                    key={index + skill}>{skill}</div>
                            </MatterBody>
                        ))}
                    </div>


                </Gravity>
            </div>
            <div className=' absolute top-2/4 left-3/4 transform -translate-x-2/4 -translate-y-2/4 flex items-center justify-around '>
                <ul className="flex flex-col gap-6 text-4xl font-bold text-left text-white pointer-events-auto mx-16 ">
                    <li>
                        <NavLink to="/about" className="hover:text-blue-400">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/projectsCategories" className="hover:text-blue-400">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="hover:text-blue-400">Contact</NavLink>
                    </li>
                </ul>
            </div>


        </>
    )
}