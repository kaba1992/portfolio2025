import React from 'react';
import { NavLink } from "react-router-dom";

export default function LandingElements() {
    return (
        <div className='absolute flex items-center justify-around w-full h-full gap-12 transform pointer-events-none top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
            <div className="text-left z-2">
                <h1 className="text-4xl font-bold text-white">Ibrahima Kaba</h1>
                <div className="text-2xl text-white">
                    <p>Front-end</p>
                    <p>Creative</p>
                    <p>Web/Web-Ar</p>
                    <p>Developer</p>
                </div>
            </div>
            <div>
                <ul className="flex flex-col gap-6 text-4xl font-bold text-left text-white pointer-events-auto z-2">
                    <li>
                        <NavLink to="/about" className="hover:text-blue-400">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" className="hover:text-blue-400">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="hover:text-blue-400">Contact</NavLink>
                    </li>
                </ul>
            </div>
        </div>


    )
}