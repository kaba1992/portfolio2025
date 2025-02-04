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
            <div className='items-center justify-center text-white md:mx-20 gap- md:flex xs:flex-col'>
                <video width={width} height={height} autoPlay muted loop className='border-2 border-white ' ref={videoRef}>
                    <source src={`/videos/${catId}/${projects[currentIndex]?.name.replace(/\s/g, '')}.mp4`} type="video/mp4" />
                </video>
                <div className='flex flex-col items-center justify-center gap-6 mt-4 font-bold text-left text-white'>
                    <h1 >{projects[currentIndex]?.year}</h1>
                    <p className='text-sm'>{projects[currentIndex]?.stacks}</p>
                    <p className='text-sm text-center'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable</p>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center w-full md:justify-around md:flex-row '>
                <h1 className='w-[400px]'>{projects[currentIndex]?.name}</h1>
                <div className='flex items-center justify-center gap-6 w-[60px]'>
                    <img onClick={handleGoPrevious} className="h-auto hover:text-blue-400 w-xs" src='/images/arrowsProject/fleche-gauche.png' />
                    <span>{currentIndex + 1}/{projects.length}</span>
                    <img onClick={handleGoNext} className="h-auto hover:text-blue-400 w-xs" src='/images/arrowsProject/fleche-droite.png' />
                </div>
            </div>
        </div>
    );
}