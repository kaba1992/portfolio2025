
import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router';
import ProjectsData from '../components/Utils/Data';
import Project from './Project';


export default function Projects() {

    const { catId} = useParams();
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        setProjects(
            ProjectsData.filter((element) => element.categorie === parseInt(catId))
        )

    }, [catId])


    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-6  font-bold text-white'>
            {
                projects.map((project, index) => {
                    return <NavLink to={`/project/${index}/${catId}`} key={index + project.name} className="hover:text-blue-400 text-3xl md:6xl">{project && project.name}</NavLink>
                })
            }
        </div>
    )
}