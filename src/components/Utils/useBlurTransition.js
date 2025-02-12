import { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const useBlurTransition = (isLoaded, container, selector) => {

    useGSAP((context, contextSafe) => {

        if (!isLoaded || !container.current) return;


        const elements = context.selector(selector);
        if (elements.length === 0) {
            return;
        }

        const handleMouseEnter = (event) => {
            console.log("item");
            elements.forEach((item) => {

                if (item !== event.target) {
                    gsap.to(item, { filter: "blur(50px)", duration: 1, ease: "power1.inOut" });
                }
            });
        };

        const handleMouseLeave = (event) => {
            elements.forEach((item) => {
                if (item !== event.target) {
                    gsap.to(item, { filter: "blur(0px)", duration: 1, ease: "power1.inOut" });
                }
            });
        };

        elements.forEach((item) => {


            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);
        });
        /// disable pointer events on the container
        gsap.set(container.current, { pointerEvents: "none" });

        gsap.fromTo(elements, { filter: "blur(100px)" }, {
            filter: "blur(0px)", duration: 1, ease: "power1.inOut", stagger: 0.1,
            onComplete: () => {
                container.current.style.pointerEvents = "auto";
            }
        });

        return () => {
            elements.forEach((item) => {
                item.removeEventListener("mouseenter", handleMouseEnter);
                item.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, { scope: container, dependencies: [isLoaded, container] }); // Ajout de container dans les dépendances
};