import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import emitter from '../Utils/EventEmitter';


export default function Loading() {
    const [dotLoffie, setDotLottie] = useState(null);
    const loadingContainer = useRef(null);
    useEffect(() => {
        if (dotLoffie) {
            dotLoffie.addEventListener('complete', () => {
                gsap.to(loadingContainer.current, {
                    autoAlpha: 0, duration: 1, ease: 'power2.inOut', onComplete: () => {
                        emitter.emit('loadingComplete', { loading: false })
                        emitter.all['loadingComplete'] = [];
                    }
                });
            })
        }

        //clean
        return () => {
            if (dotLoffie) {
                dotLoffie.removeEventListener('complete', () => { });
            }
        };
    }, [dotLoffie]);


    return (

        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 500,
            pointerEvents: 'none',
            backgroundColor: "#000000"
        }} ref={loadingContainer}>
            <DotLottieReact
                src="https://lottie.host/cc3ee0fc-c017-4470-bfb6-c8712c0048d7/QBTpVIcl9a.lottie"
                autoplay
                className='absolute w-1/4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-1/4'
                dotLottieRefCallback={setDotLottie}
            />
        </div>
    );
};
