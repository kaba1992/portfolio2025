import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import ProjectsData from '../components/Utils/Data';

export default function Project() {
    const { id, catId } = useParams();
    const [project, setProject] = useState([]);
    const [projects, setProjects] = useState([]);
    const { previous, setPrevious } = useState(null);
    const { next, setNext } = useState(null);

    useEffect(() => {
        setProject(
            ProjectsData.filter((element) => element.Id === parseInt(id))
        )
        setProjects(
            ProjectsData.filter((element) => element.Categorie === parseInt(catId))
        )




    }, [id, catId])

    if (projects.length > 0) {
    }
    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-6 text-4xl font-bold text-white'>
            <div className='text-white flex flex-col justify-center gap-6 text-4xl font-bold  text-white  h-full w-full'>
                {project[0] && project[0].Nom}
            </div>

            <div className='flex justify-between w-full'>
                <NavLink to={`/project/${(parseInt(id) - 1 + projects.length) % projects.length}`} className="hover:text-blue-400">Previous</NavLink>
                <NavLink to={`/project/${(parseInt(id ) + 1 )  % projects.length }`} className="hover:text-blue-400">Next</NavLink>
            </div>
        </div>
    )
}