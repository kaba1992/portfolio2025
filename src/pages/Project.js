import React, { useState, useEffect, useRef } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import ProjectsData from '../components/Utils/Data';
import Projects from './Projects';
import emitter from '../components/Utils/EventEmitter';

export default function Project() {
    const { index, catId } = useParams();
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(parseInt(index));
    const [width, setWidth] = useState('');
    const [canClick, setCanClick] = useState(true);
    const navigate = useNavigate();
    const videoRef = useRef(null);
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;





    useEffect(() => {

        setProjects(
            ProjectsData.filter((element) => element.categorie === parseInt(catId))
        )
        if (isMobile) {
            setWidth(
                catId === '1' || catId === '2' ? '145px' : '348px'
            )
        } else {
            setWidth(
                catId === '1' || catId === '2' ? '300px' : '837px'
            )

        }


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

    if (!projects.length || isNaN(currentIndex) || currentIndex < 0 || currentIndex >= projects.length) {
        return <div className='text-2xl text-white'>Projet introuvable</div>;
    }

    let projectHref = projects[currentIndex]?.link
    const link = <a href={projectHref} target="_blank" className='text-xs text-left underline md:text-xl'>Visit</a>

    return (
        <div className='flex flex-col items-center  md:mt-0 md:justify-center justify-start w-full h-full gap-6 text-4xl text-white '>
            <div className='items-center md:items-start justify-center text-white  gap-5 md:gap-10 flex flex-col 
            md:flex-row md:mt-20  w-[calc(100%-30px)] mx-[30px] md:w-[calc(100%-60px)] md:mx-[0px] md:h-[500px] '>
                <div style={{ width: width, height: 'auto' }} className=''>
                    <video autoPlay muted loop className='border-2 border-white ' ref={videoRef}>
                        <source src={`/videos/${catId}/${projects[currentIndex]?.name.replace(/\s/g, '')}.mp4`} type="video/mp4" />
                    </video>

                </div>
                <div className='flex flex-col items-center justify-center gap-3 md:gap-6 text-left text-white md:items-start md:self-start md:w-2/6'>
                    <h1 className='md:text-6xl' >{projects[currentIndex]?.year}</h1>
                    <p className='text-base font-bold md:text-2xl'>{projects[currentIndex]?.stacks}</p>
                    <p className='text-xs text-left md:text-xl'>{projects[currentIndex]?.description}</p>
                    {projects[currentIndex]?.link === "" ? null : link}
                </div>
            </div>

            <div className='flex flex-col items-center justify-center md:justify-around md:flex-row w-[calc(100%-30px)] mx-[30px] md:w-[calc(100%-60px)] md:mx-[0px] md:mt-20'>
                <h1 className='w-[700px] text-2xl md:text-5xl font-bold md:text-left'>{projects[currentIndex]?.name}</h1>
                <div className='flex items-center justify-between gap-6 '>
                    <img onClick={handleGoPrevious} className="h-auto hover:text-blue-400 w-[40px] md:w-[80px]" src='/images/arrowsProject/arrowLeft.png' />
                    <span className='text-xl font-bold md:text-4xl'>{currentIndex + 1}/{projects.length}</span>
                    <img onClick={handleGoNext} className="h-auto hover:text-blue-400 w-[40px]  md:w-[80px]" src='/images/arrowsProject/arrowRight.png' />
                </div>
            </div>
        </div>
    );
}