import { useState, useEffect, use } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from 'gsap';
import emitter from "../Utils/EventEmitter";

export default function MobileNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if (isNavOpen) {
      gsap.to('.showMenuNav', { xPercent: 0, duration: 0.5 });
    } else {
      gsap.to('.showMenuNav', { xPercent: -100, duration: 0.5 });
    }
  }, [isNavOpen]);
  const handleClick = () => {
    setIsNavOpen((prev) => !prev);
  };

  const handleGoTo = async (path) => {
    emitter.emit('transitionCalled');
    emitter.all['transitionCalled'] = [];
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsNavOpen(false);
    gsap.to('.showMenuNav', { xPercent: -100, duration: 0.5 });
    navigate(path);
  };

  return (
    <div className="flex items-center justify-end mx-5 py-4 self-end">

      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={handleClick}
          >
            <span className="block h-0.5 w-8 bg-white"></span>
            <span className="block h-0.5 w-8 bg-white"></span>
            <span className="block h-0.5 w-8 bg-white"></span>
          </div>

          <div className="showMenuNav" >
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <button onClick={() => handleGoTo("/")} className="hover:text-blue-400">
                <p className="text-white footer-home">Projects</p>
              </button>
              <button onClick={() => handleGoTo("/about")} className="hover:text-blue-400">
                <p className="text-white footer-home">About</p>
              </button>
              <button onClick={() => handleGoTo("/contact")} className="hover:text-blue-400">
                <p className="text-white footer-home">Contact</p>
              </button>
            </ul>
          </div>
        </section>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: black;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}