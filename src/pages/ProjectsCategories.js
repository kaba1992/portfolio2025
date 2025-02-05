import React, { useState, useEffect, useRef } from 'react';
import Gravity, { MatterBody } from '../components/Utils/Gravity.js';
import LandingPage from '../components/landingPage/LandingPage.js';
import { NavLink, useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';



export default function ProjectsCategories() {
    const container = useRef();


    const categories = [
        "WEB",
        "WEB-AR",
        "AR",
        "UNITY",
        "LABO"
    ]

    return (
        <>

           
                <h1 className="text-6xl font-bold text-white mb-8">Projects</h1>
                <ul className="flex flex-col items-center justify-center w-full h-full gap-6 text-4xl font-bold text-white" ref={container}>
                    {categories.map((categorie, index) => {
                        return <NavLink to={`/projects/${index}`} key={index + categorie} className="hover:text-blue-400 categories ">{categorie && categorie}</NavLink>
                    })}
                </ul>

           
        </>




    )
}