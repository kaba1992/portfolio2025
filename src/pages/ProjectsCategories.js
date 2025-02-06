import React, { useState, useEffect, useRef } from 'react';
import Gravity, { MatterBody } from '../components/Utils/Gravity.js';
import LandingPage from '../components/landingPage/LandingPage.js';
import { NavLink, useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import emitter from '../components/Utils/EventEmitter.js';


export default function ProjectsCategories() {
    const container = useRef();
    const navigate = useNavigate();
    const [canClick, setCanClick] = useState(true);

    const categories = [
        "WEB",
        "WEB-AR",
        "AR",
        "UNITY",
        "LABO"
    ]

    const navigateTo = async (index) => {
        if (!canClick) return;
        setCanClick(false);
        emitter.emit('transitionCalled');
        emitter.all['transitionCalled'] = [];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(`/projects/${index}`)
        await new Promise((resolve) => setTimeout(resolve, 1300));
        setCanClick(true);
    }



    return (
        <>

            <div>
                <h1 className="mb-8 text-6xl font-bold text-white">Projects</h1>
                <ul className="flex flex-col items-center justify-center w-full h-full gap-6 text-4xl font-bold text-white cursor-pointer pointer-events-auto" ref={container}>
                    {categories.map((categorie, index) => {
                        return <div onClick={() => navigateTo(index)} className=" hover:text-blue-400 categories">{categorie && categorie}</div>
                    })}
                </ul>
            </div>

        </>




    )
}