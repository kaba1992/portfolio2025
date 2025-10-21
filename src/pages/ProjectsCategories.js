import React, { useState, useEffect, useRef } from 'react';
import Gravity, { MatterBody } from '../components/Utils/Gravity.js';
import LandingPage from '../components/landingPage/LandingPage.js';
import { NavLink, useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import emitter from '../components/Utils/EventEmitter.js';
import { useBlurTransition } from '../components/Utils/useBlurTransition.js';


export default function ProjectsCategories() {
    const container = useRef();
    const navigate = useNavigate();
    const [canClick, setCanClick] = useState(true);
    // Vérifier si le reveal a déjà été complété dans cette session
    const [canNavigate, setCanNavigate] = useState(() => {
        return sessionStorage.getItem('revealCompleted') === 'true';
    });
    const [isLoaded, setIsLoaded] = useState(false);


    const categories = [
        "WEB",
        "WEB-AR",
        "SOCIAL AR",
        "UNITY",
        "LABO"
    ]

    useEffect(() => {
        setIsLoaded(true);

        // Si le reveal a déjà été complété, activer immédiatement la navigation
        if (sessionStorage.getItem('revealCompleted') === 'true') {
            setCanNavigate(true);
        }
    }, [])

    useEffect(() => {
        const handleLoadingComplete = (data) => {
            setIsLoaded(true);
        };

        const handleRevealComplete = (data) => {
            setCanNavigate(true);
            // Sauvegarder dans sessionStorage pour les prochaines visites de la page
            sessionStorage.setItem('revealCompleted', 'true');
        };

        emitter.on('loadingComplete', handleLoadingComplete);
        emitter.on('revealCompleat', handleRevealComplete);

        // Cleanup des écouteurs quand le composant est démonté
        return () => {
            emitter.off('loadingComplete', handleLoadingComplete);
            emitter.off('revealCompleat', handleRevealComplete);
        };
    }, []);

    const navigateTo = async (index) => {
        if (!canClick || !canNavigate) return;
        setCanClick(false);
        emitter.emit('transitionCalled');
        emitter.all['transitionCalled'] = [];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(`/projects/${index}`)
        await new Promise((resolve) => setTimeout(resolve, 1300));
        setCanClick(true);
    }
    useBlurTransition(isLoaded, container, '.category')
    return (

        <>

            <div className=''>
                <h1 className="mb-8 md:text-6xl text-4xl font-bold text-white font-titre">Projects</h1>
                <ul className="flex flex-col md:items-start items-center justify-start w-full h-full gap-6 text-4xl font-bold text-white cursor-pointer pointer-events-auto" ref={container}>
                    {categories.map((categorie, index) => {
                        return <li onClick={() => navigateTo(index)} key={index + categorie && categorie} className="category hover:text-blue-400 user-select-none categories blur-[100px] ">{categorie && categorie}</li>
                    })}
                </ul>
            </div>

        </>




    )
}