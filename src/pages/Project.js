import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import ProjectsData from '../components/Utils/Data';
import Projects from './Projects';

export default function Project() {
    const { index, catId } = useParams();
    const [projects, setProjects] = useState([]);
    const currentIndex = parseInt(index);
    

    useEffect(() => {

        setProjects(
            ProjectsData.filter((element) => element.Categorie === parseInt(catId))
        )

    }, [catId])

    if (!projects.length || isNaN(currentIndex) || currentIndex < 0 || currentIndex >= projects.length) {
        return <div className='text-2xl text-white'>Projet introuvable</div>;
    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-6 text-4xl font-bold text-white'>
            <div className='flex flex-col justify-center w-full h-full gap-6 text-4xl font-bold text-white'>
                <div className='flex flex-col items-center justify-center w-full h-full gap-6 text-4xl font-bold text-white'>
                    {projects[currentIndex]?.Nom}
                </div>
            </div>

            <div className='flex justify-between w-full'>
                <NavLink 
                    to={`/project/${(currentIndex - 1 + projects.length) % projects.length}/${catId}`} 
                    className="hover:text-blue-400"
                >
                    Précédent
                </NavLink>

                <NavLink 
                    to={`/project/${(currentIndex + 1) % projects.length}/${catId}`} 
                    className="hover:text-blue-400"
                >
                    Suivant
                </NavLink>
            </div>
        </div>
    );
}