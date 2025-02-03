import React, { useState, useEffect, useRef } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import ProjectsData from '../components/Utils/Data';
import Projects from './Projects';

export default function Project() {
    const { index, catId } = useParams();
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(parseInt(index));
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    let navigate = useNavigate();
    const videoRef = useRef(null);




    useEffect(() => {

        setProjects(
            ProjectsData.filter((element) => element.categorie === parseInt(catId))
        )
        setWidth(
            catId === '1' || catId === '2' ? '350' : '937'
        )
        setHeight(
            catId === '1' || catId === '2' ? '250' : '505'
        )
    }, [catId, currentIndex])

    const handleGoPrevious = () => {
        setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
        videoRef.current.load();
        navigate(`/project/${currentIndex}/${catId}`)

    };

    const handleGoNext = () => {
        setCurrentIndex((currentIndex + 1) % projects.length);
        videoRef.current.load();
        navigate(`/project/${currentIndex}/${catId}`)
    };

    if (!projects.length || isNaN(currentIndex) || currentIndex < 0 || currentIndex >= projects.length) {
        return <div className='text-2xl text-white'>Projet introuvable</div>;
    }


    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-6 text-4xl font-bold text-white '>
            <div className='md:flex xs:flex-col  items-center justify-center w-full h-full gap-6 text-white'>
                <video width={width} height={height} autoPlay muted loop className='border-2 border-white' ref={videoRef}>
                    <source src={`/videos/${catId}/${projects[currentIndex]?.name.replace(/\s/g, '')}.mp4`} type="video/mp4" />
                </video>
                <div className='text-4xl font-bold text-white text-left flex flex-col items-center justify-center gap-6'>
                    <h1>{projects[currentIndex]?.year}</h1>
                    <p>{projects[currentIndex]?.stacks}</p>
                    <p>{projects[currentIndex]?.description}</p>
                </div>
            </div>

            <div className='flex md:justify-around w-full xs:flex-col  items-center '>
                <h1 className='w-[400px]'>{projects[currentIndex]?.name}</h1>
                <div className='flex items-center justify-center gap-6 w-[60px]'>
                    <img onClick={handleGoPrevious} className="hover:text-blue-400 w-xs h-auto" src='/images/arrowsProject/fleche-gauche.png' />
                    <span>{currentIndex + 1}/{projects.length}</span>
                    <img onClick={handleGoNext} className="hover:text-blue-400 w-xs h-auto" src='/images/arrowsProject/fleche-droite.png'/>
                </div>
            </div>
        </div>
    );
}