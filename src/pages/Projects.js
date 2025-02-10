
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
        setIsLoaded(true);

    }, [catId])
    useBlurTransition(isLoaded, container, '.category-item')

    return (
        <div className='flex flex-col items-start justify-center w-full h-full gap-10 font-bold text-white text-left   -z-1' ref={container}>
            {
                projects.map((project, index) => {
                    return <div className='flex justify-around items-center w-full category-item  blur-[100px] relative before:absolute before:h-1 before:w-full before:bg-white before:-bottom-5'>
                        <p onClick={() => navigateTo(index, catId)} key={index + project.name}
                            className=" text-3xl cursor-pointer hover:text-blue-400 md:text-5xl  w-[600px]
                    ">{project && project.name}</p>
                        <span className="text-3xl cursor-pointer hover:text-blue-400 md:text-5xl 
                    ">{index + 1}</span>

                    </div>
                })
            }
        </div>
    )
}