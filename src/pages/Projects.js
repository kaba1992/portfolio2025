
import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router';
import ProjectsData from '../components/Utils/Data';


export default function Projects() {

    const { id } = useParams();
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        setProjects(
            ProjectsData.filter((element) => element.Categorie === parseInt(id))
        )

    }, [id])


    return (
        <div className='text-white flex flex-col justify-center gap-6 text-4xl font-bold  text-white  h-full w-full'>
            {
                projects.map((project, index) => {
                    return <NavLink to={`/project/${project.Id}`} key={index + project.Nom} className="hover:text-blue-400">{project && project.Nom}</NavLink>
                })
            }
        </div>
    )
}