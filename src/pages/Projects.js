
import React, { useState, useEffect, useRef } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router';
import ProjectsData from '../components/Utils/Data';
import Project from './Project';
import emitter from '../components/Utils/EventEmitter';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { useBlurTransition } from '../components/Utils/useBlurTransition';

export default function Projects() {

    const { catId } = useParams();
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [canClick, setCanClick] = useState(true);
    const container = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false);


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
        const filteredProjects = ProjectsData.filter((element) => element.categorie === parseInt(catId));
        setProjects(filteredProjects);
        setTimeout(() => {
            setIsLoaded(true);

        }, 700)
    }, [catId])

    useBlurTransition(isLoaded, container, '.category-item')

    return (
        <div className='flex flex-col items-center md:justify-center mt-10 md:mt-0 md:w-[1300px] w-[300px] h-full gap-6 md:gap-10 font-bold text-left text-white -z-1' ref={container}>
            {
                projects.map((project, index) => {
                    return <div key={index + project.name} className='flex justify-between items-center w-full  category-item  blur-[100px] relative before:absolute before:h-0.5 before:w-full before:bg-white before:-bottom-5'>
                        <p onClick={() => navigateTo(index, catId)}
                            className=" text-2xl cursor-pointer hover:text-blue-400 md:text-5xl w-3/4  md:w-[600px]
                    ">{project && project.name.toUpperCase()}</p>
                        <span className="text-2xl cursor-pointer hover:text-blue-400 md:text-5xl " >{index + 1}</span>

                    </div>
                })
            }
        </div>
    )
}