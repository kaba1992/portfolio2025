import React, { useState, useEffect, useRef } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import ProjectsData from '../components/Utils/Data';
import Projects from './Projects';
import emitter from '../components/Utils/EventEmitter';

export default function Project() {
    const { index, catId } = useParams();
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(parseInt(index));
    const [canClick, setCanClick] = useState(true);
    const navigate = useNavigate();
    const videoRef = useRef(null);





    useEffect(() => {
        setProjects(
            ProjectsData.filter((element) => element.categorie === parseInt(catId))
        )
    }, [catId])

    const handleGoPrevious = async () => {
        if (!canClick) return;
        setCanClick(false);
        emitter.emit('transitionCalled');
        emitter.all['transitionCalled'] = [];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
        videoRef.current.load();
        navigate(`/project/${currentIndex}/${catId}`)
        await new Promise((resolve) => setTimeout(resolve, 1300));
        setCanClick(true);
    };

    const handleGoNext = async () => {
        if (!canClick) return;
        setCanClick(false);
        emitter.emit('transitionCalled');
        emitter.all['transitionCalled'] = [];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCurrentIndex((currentIndex + 1) % projects.length);
        videoRef.current.load();
        navigate(`/project/${currentIndex}/${catId}`)
        await new Promise((resolve) => setTimeout(resolve, 1300));
        setCanClick(true);
    };

    const handleGoBack = () => {
        navigate(`/projects/${catId}`)
    }

    if (!projects.length || isNaN(currentIndex) || currentIndex < 0 || currentIndex >= projects.length) {
        return <div className='text-2xl text-white'>Projet introuvable</div>;
    }

    let projectHref = projects[currentIndex]?.link
    const link = <a href={projectHref} target="_blank" className='text-xs text-left underline md:text-xl'>Visit</a>
    const isVertical = catId === '1' || catId === '2'
    return (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex container flex-col items-center md:justify-center justify-start gap-2 ${isVertical ? 'md:gap-10' : 'md:gap-20 '} text-4xl text-white`}>
            <div className='flex items-center justify-start w-full mr-4'>
                <img onClick={handleGoBack} className="h-auto hover:text-blue-400 w-[40px] md:w-[80px]  cursor-pointer" src='/images/arrowsProject/prev.png' />
            </div>
            <div className='items-center md:items-start justify-center md:justify-start text-white  gap-5 md:gap-10 flex flex-col 
            xl:flex-row md:mt-2   md:mx-[0px] '>
                <div className={`flex justify-center items-center w-1/3 ${isVertical ? 'md:w-1/5' : 'md:w-1/2'}`}>
                    <video autoPlay muted loop className='border-2 border-white w-full h-auto' ref={videoRef} poster={`/videos/${catId}/posters/${projects[currentIndex]?.name.replace(/\s/g, '')}.png`}>
                        <source src={`/videos/${catId}/${projects[currentIndex]?.name.replace(/\s/g, '')}.mp4`} type="video/mp4" />
                    </video>

                </div>
                <div className='flex flex-col items-center justify-center gap-3 md:gap-3 text-left text-white md:items-start md:self-start md:w-2/3'>
                    <h1 className='md:text-4xl xl:text-6xl font-titre' >{projects[currentIndex]?.year}</h1>
                    <p className='text-base font-bold md:text-xl xl:text-2xl text-blue-400'>{projects[currentIndex]?.stacks}</p>
                    <p className='text-xs  xl:text-base'>{projects[currentIndex]?.description}</p>
                    {projects[currentIndex]?.link === "" ? null : link}
                </div>
            </div>

            <div className='flex flex-col items-center justify-center md:justify-between md:flex-row '>
                <h1 className='w-[700px] text-2xl md:text-5xl font-bold md:text-left font-titre '>{projects[currentIndex]?.name}</h1>
                <div className='flex items-center justify-between gap-6 '>
                    <img onClick={handleGoPrevious} className="h-auto hover:text-blue-400 w-[40px] md:w-[80px] cursor-pointer" src='/images/arrowsProject/prev.png' />
                    <span className='text-xl font-bold md:text-4xl font-titre '>{currentIndex + 1}/{projects.length}</span>
                    <img onClick={handleGoNext} className="h-auto hover:text-blue-400 w-[40px]  md:w-[80px] cursor-pointer" src='/images/arrowsProject/next.png' />
                </div>
            </div>
        </div>
    );
}