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
            ProjectsData.filter((element) => element.Categorie === parseInt(catId))
        )
        
        setWidth(
            catId === '1' || catId === '2'  ? '350' : '750'
        )
        setHeight(
            catId === '1' || catId === '2'  ? '250' : '500'
        )

    }, [catId,currentIndex])

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
        <div className='flex flex-col items-center justify-center w-full h-full gap-6 text-4xl font-bold text-white'>
            <div className='flex flex-col items-center justify-center w-full h-full gap-6 text-4xl font-bold text-white'>
                <div className='text-4xl font-bold text-white '>
                    {projects[currentIndex]?.Nom}
                </div>
                <video width={width} height={height} autoPlay muted loop className='border-2 border-white' ref={videoRef}>
                    <source src={`/videos/${catId}/${projects[currentIndex]?.Nom.replace(/\s/g, '')}.mp4`} type="video/mp4" />
                </video>
            </div>

            <div className='flex justify-between w-full'>
                <button onClick={handleGoPrevious} className="hover:text-blue-400" tabIndex="0">Précédent</button>

                <button onClick={handleGoNext} className="hover:text-blue-400" tabIndex="0">Suivant</button>
            </div>
        </div>
    );
}