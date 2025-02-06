
import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router';
import ProjectsData from '../components/Utils/Data';
import Project from './Project';
import emitter from '../components/Utils/EventEmitter';

export default function Projects() {

    const { catId } = useParams();
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [canClick, setCanClick] = useState(true);


    const navigateTo = async (index, catId) => {
        if (!canClick) return;
        setCanClick(false);
        emitter.emit('transitionCalled');
        emitter.all['transitionCalled'] = [];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(`/project/${index}/${catId}`)
        await new Promise((resolve) => setTimeout(resolve, 1300));
        setCanClick(true);

    }

    useEffect(() => {
        setProjects(
            ProjectsData.filter((element) => element.categorie === parseInt(catId))
        )

    }, [catId])

    //to={`/project/${index}/${catId}`} 
    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-6 font-bold text-white -z-1'>
            {
                projects.map((project, index) => {
                    return <div onClick={() => navigateTo(index, catId)} key={index + project.name} className="text-3xl cursor-pointer hover:text-blue-400 md:6xl">{project && project.name}</div>
                })
            }
        </div>
    )
}