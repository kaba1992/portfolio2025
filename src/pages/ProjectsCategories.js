import React, { useState, useEffect, useRef } from 'react';
import Gravity, { MatterBody } from '../components/Utils/Gravity.js';
import LandingPage from '../components/landingPage/LandingPage.js';
import { NavLink, useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function ProjectsCategories() {
    const container = useRef();

    
    const categories = [
        "WEB",
        "WEB-AR",
        "AR",
        "UNITY",
        "LABO"
    ]
    const navigate = useNavigate();
    useGSAP((context, contextSafe) => {
        const containerWidth = container.current.offsetWidth;
        const containerHeight = container.current.offsetHeight;
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const totalElements = container.current.children.length;
        const angleStep = (Math.PI * 2) / totalElements;
        for (let i = 0; i < container.current.children.length; i++) {

            const handleClick = contextSafe(() => {
               console.log(typeof Array.from(container.current.children));
               
            });
            container.current.children[i].addEventListener('click', handleClick);
            gsap.fromTo(container.current.children[i],
                { x: i % 2 === 0 ? -100 : 100 },
                {
                    x: i % 2 === 0 ? 100 : -100, duration: 0.2, delay: i * 0.1, yoyo: true, ease: "power1.inOut", repeat: 6,
                    onComplete: () => {
                        const angle = i * angleStep;
                        const radius = 100 + Math.min(containerWidth, containerHeight) / 3;
                        const finalX = centerX + Math.cos(angle) * radius;
                        const finalY = centerY + Math.sin(angle) * radius;

                        gsap.to(container.current.children[i], {
                            x: finalX - centerX,
                            y: finalY - centerY,
                            duration: 0.5,
                            ease: "elastic.out(0.5, 0.8)"

                        });
                        gsap.fromTo(container.current.children[i],
                            { rotation: 0, scale: 1.5 },
                            { rotation: 360, scale: 1, duration: 2, ease: "elastic.out(1, 0.8)", stagger: 0.1 }
                        );

                        gsap.to(container.current, {
                            rotation: 360,
                            duration: 2,
                            ease: "elastic.out(1, 0.8)"
                        });

                    }
                }
            );

      
        }

    }, { scope: container });


    return (
        <>
            <LandingPage showElements={false} />
            <div className="" style={{ width: '90%', height: '85%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <ul className="flex flex-col items-center justify-center w-full h-full gap-6 text-4xl font-bold text-white" ref={container}>
                    {categories.map((categorie, index) => {
                        return <NavLink to={`/projects/${index}`} key={index + categorie} className="hover:text-blue-400 categories">{categorie && categorie}</NavLink>
                    })}
                </ul>

            </div>
        </>




    )
}