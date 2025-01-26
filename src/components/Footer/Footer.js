import React, { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <div className="flex items-center justify-around mx-2 my-2 text-white flex-co z-5" >

            <NavLink to="/" className="hover:text-blue-400">
                <p className="text-white footer-home">Accueil</p>
            </NavLink>
            <p className="text-white">&copy; kaba ibrahima </p>

            <div className="">
                <ul className="flex gap-3">
                    <li>
                        <a href="https://www.linkedin.com/in/ibrahima-kaba-277041178/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={30} />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/kaba1992" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={30} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/ibrahima__kaba/?hl=fr" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}