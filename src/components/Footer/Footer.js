import React, { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import emitter from '../Utils/EventEmitter';

export default function Footer() {
    return (
        <div className=" absolute w-full flex items-center justify-around mx-2 my-2 text-white flex-co z-5" >

            <NavLink to="/" className=""
                onClick={() => {
                    emitter.emit('landingPage')
                    emitter.all['landingPage'] = [];
                    console.log('landingPage');
                    
                }}
            >
                <p className="text-white footer-home hover:text-blue-400">Kaba Ibrahima</p>
            </NavLink>
            <NavLink to="/about" className="">
                <p className="text-white footer-home hover:text-blue-400">About</p>
            </NavLink>
            <NavLink to="#" className=""
             onClick={(e) => {
                window.location.href = "mailto:ibrahima.kaba@outlook.fr";
                e.preventDefault();
            }}
            >
           
                <p className="text-white footer-home hover:text-blue-400">Contact</p>
            </NavLink>

            <div className="">
                <ul className="flex gap-3">
                    <li>
                        <a href="https://www.linkedin.com/in/ibrahima-kaba-277041178/" target="_blank" rel="noopener noreferrer hover:text-blue-400">
                            <FaLinkedin size={30} className = "hoverIcon" />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/kaba1992" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={30} className = "hoverIcon"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/ibrahima__kaba/?hl=fr" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} className = "hoverIcon"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}