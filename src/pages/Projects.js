
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import ProjectsData from '../components/Utils/Data';
import emitter from '../components/Utils/EventEmitter';
import { useBlurTransition } from '../components/Utils/useBlurTransition';

export default function Projects() {

    const { catId } = useParams();
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [canClick, setCanClick] = useState(true);
    const container = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false);


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
        const filteredProjects = ProjectsData.filter((element) => element.categorie === parseInt(catId));
        setProjects(filteredProjects);
        setTimeout(() => {
            setIsLoaded(true);

        }, 700)
    }, [catId])

    useBlurTransition(isLoaded, container, '.category-item')

    return (
        <div className='flex flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide pt-40 pb-20 md:py-0 md:justify-center'>
            <div className='flex flex-col items-center w-[90%] md:w-[85%] lg:w-[1100px] xl:w-[1300px] max-w-[1400px] gap-6 md:gap-10 font-bold text-left text-white -z-1 px-4 md:px-0 pb-20' ref={container}>
                {
                    projects.map((project, index) => {
                        return <div key={index + project.name} className='flex justify-between items-center w-full category-item blur-[100px] relative before:absolute before:h-0.5 before:w-full before:bg-white before:-bottom-5'>
                            <p onClick={() => navigateTo(index, catId)}
                                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl cursor-pointer hover:text-blue-400 flex-1 pr-4 break-words"
                            >{project && project.name.toUpperCase()}</p>
                            <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl cursor-pointer hover:text-blue-400 flex-shrink-0">{index + 1}</span>

                        </div>
                    })
                }
            </div>
        </div>
    )
}