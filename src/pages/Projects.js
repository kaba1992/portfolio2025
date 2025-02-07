
import React, { useState, useEffect, useRef } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router';
import ProjectsData from '../components/Utils/Data';
import Project from './Project';
import emitter from '../components/Utils/EventEmitter';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

export default function Projects() {

    const { catId } = useParams();
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [canClick, setCanClick] = useState(true);
    const container = useRef()
    const categorieItem = useRef()


    const navigateTo = async (index, catId) => {
        if (!canClick) return;
        setCanClick(false);
        emitter.emit('transitionCalled');
        emitter.all['transitionCalled'] = [];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(`/project/${index}/${catId}`)
        await new Promise((resolve) => setTimeout(resolve, 1300));
        setCanClick(true);

    }



    useEffect(() => {
        setProjects(
            ProjectsData.filter((element) => element.categorie === parseInt(catId))
        )

    }, [catId])

    useGSAP(async (context, contextSafe) => {
        // gsap.set(container.current.children, { filter: "blur(100px)"})
        const handleMouseEnter = contextSafe(() => {
            gsap.fromTo(categorieItem.current, { filter: "blur(100px)" }, { filter: "blur(0px)", duration: 1, ease: "power1.inOut", stagger: 0.1 })
        })
       
        categorieItem.current.addEventListener("mouseenter ", handleMouseEnter)

        await new Promise((resolve) => setTimeout(resolve, 500))
        gsap.fromTo(container.current.children, { filter: "blur(100px)" }, { filter: "blur(0px)", duration: 1, ease: "power1.inOut", stagger: 0.1 })

        return () => {
            // <-- cleanup
            categorieItem.current.removeEventListener('mouseenter', handleMouseEnter);
        };

    }, { scope: container })


    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-6 font-bold text-white -z-1' ref={container}>
            {
                projects.map((project, index) => {
                    return <div ref={categorieItem} onClick={() => navigateTo(index, catId)} key={index + project.name} className="text-3xl cursor-pointer hover:text-blue-400 md:6xl blur-[100px]

                    ">{project && project.name}</div>
                })
            }
        </div>
    )
}