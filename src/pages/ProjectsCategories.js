import React, { useState, useEffect } from 'react';
import Gravity, { MatterBody } from '../components/Utils/Gravity.js';
import LandingPage from '../components/landingPage/LandingPage.js';
import { NavLink } from "react-router-dom";

export default function ProjectsCategories() {

    const categories = [
        "WEB",
        "WEB-AR",
        "AR",
        "UNITY",
        "LABO"
    ]

    return (
        <>
            <LandingPage showElements={false} />
            <div className="" style={{ width: '90%', height: '85%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <ul className="flex flex-col justify-center gap-6 text-4xl font-bold  text-white  h-full w-full">
                    {categories.map((categorie, index) => {
                        return <NavLink to={`/projects/${index}`} key={index + categorie} className="hover:text-blue-400">{categorie && categorie}</NavLink>
                    })}
                </ul>

            </div>
        </>




    )
}