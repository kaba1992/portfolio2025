import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router';
import ProjectsData from '../components/Utils/Data';

export default function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => {
        setProject(
            ProjectsData.filter((element) => element.Id === parseInt(id))
        )
    }, [id])
   
    return (
        <div className='text-white flex flex-col justify-center gap-6 text-4xl font-bold  text-white  h-full w-full'>
            {project[0] && project[0].Nom}
        </div>
    )
}