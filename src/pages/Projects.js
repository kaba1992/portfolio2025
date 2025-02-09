
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
        <div className='flex flex-col items-center justify-center w-full h-full gap-6 font-bold text-white -z-1' ref={container}>
            {
                projects.map((project, index) => {
                    return <div onClick={() => navigateTo(index, catId)} key={index + project.name}
                        className="category-item text-3xl cursor-pointer hover:text-blue-400 md:6xl blur-[100px]
                    ">{project && project.name}</div>
                })
            }
        </div>
    )
}