import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';

export default function Loading() {
    const [dotLoffie, setDotLottie] = useState(null);
    const loadingContainer = useRef(null);
    useEffect(() => {
        if (dotLoffie) {
            dotLoffie.addEventListener('complete', () => {
                gsap.to(loadingContainer.current, { autoAlpha: 0, duration: 1, ease: 'power2.inOut' });
            })
        }

        //clean
        return () => {
            if (dotLoffie) {
                dotLoffie.removeEventListener('complete', () => {

                });
            }
        };
    }, [dotLoffie]);
    return (
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black loader z-999' ref={loadingContainer}>
            <DotLottieReact
                src="https://lottie.host/cc3ee0fc-c017-4470-bfb6-c8712c0048d7/QBTpVIcl9a.lottie"
                autoplay
                className='absolute w-1/4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-1/4'
                dotLottieRefCallback={setDotLottie}
            />
        </div>
    );
};
