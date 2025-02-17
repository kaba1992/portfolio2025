import React from "react";
import emitter from "../Utils/EventEmitter";
import gsap from "gsap";

export const UseCanvas = () => {
    let x = null;
    let y = null;
    let prevX = null;
    let prevY = null;
    const spacing = 6;
    let drawCount = 0;
    const canvas = document.createElement('canvas');;
    const context = canvas.getContext('2d');
    let canDraw = false;
    let isImageLoaded = false;

    const image = new Image();
    image.src = '/images/Brushs/brush2.png';

    image.onload = () => {
        
        isImageLoaded = true;
    };
    
    image.onerror = (err) => {
        console.error("Erreur de chargement de l'image :", err);
    };
              
 
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.zIndex = -1;
    canvas.style.opacity = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.body.appendChild(context.canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    emitter.on('loadingComplete', (data) => {
        canDraw = true;
        if (x !== null && y !== null) {
            prevX = x;
            prevY = y;
        }
    });


    function createFlow( x1, y1, x2, y2, callback) {
        let dx = x2 - x1;
        let sx = 1;
        let dy = y2 - y1;
        let sy = 1;


        if (dx < 0) {
            sx = -1;
            dx = -dx;
        }

        if (dy < 0) {
            sy = -1;
            dy = -dy;
        }

        dx = dx << 1;
        dy = dy << 1;

        let fraction, space = 0;
        const MAX_ITERATIONS = 10000; // Fail-safe to prevent potential infinite loops

        if (dy < dx) {
            fraction = dy - (dx >> 1);

            for (let i = 0; i < MAX_ITERATIONS && x1 !== x2; i++) {
                if (fraction >= 0) {
                    y1 += sy;
                    fraction -= dx;
                }
                fraction += dy;
                x1 += sx;

                if (space === spacing) {
                    callback( x1, y1);
                    space = 0;
                } else {
                    space++;
                }
            }
        } else {
            fraction = dx - (dy >> 1);

            for (let i = 0; i < MAX_ITERATIONS && y1 !== y2; i++) {
                if (fraction >= 0) {
                    x1 += sx;
                    fraction -= dy;
                }
                fraction += dx;
                y1 += sy;

                if (space === spacing) {
                    callback( x1, y1);
                    space = 0;
                } else {
                    space++;
                }
            }
        }

        callback( x1, y1);
    }
    window.onmousemove = function (event) {
        if (canDraw && isImageLoaded) {
            x = parseInt(canvas.offsetLeft);
            y = parseInt(canvas.offsetTop);

            if (canvas.offsetParent != null) {
                x += parseInt(canvas.offsetParent.offsetLeft);
                y += parseInt(canvas.offsetParent.offsetTop);
            }

            if (navigator.appVersion.indexOf('MSIE') != -1) {
                x = (event.clientX + document.body.scrollLeft) - x;
                y = (event.clientY + document.body.scrollTop) - y;
            } else {
                x = event.pageX - x;
                y = event.pageY - y;
            }


            if (prevX === null || prevY === null) {
                prevX = x;
                prevY = y;
            }

            if (((x - prevX) >= spacing || (y - prevY) >= spacing) || (prevX - x) >= spacing || (prevY - y) >= spacing) {
                createFlow( x, y, prevX, prevY, async  (x, y) => {
                    if (!canDraw && !isImageLoaded) return;
                    drawCount++;
                    
                    let newWidth =  image.width * 2.5;
                    let newHeight =  image.height * 2.5;
                    
                    context.globalAlpha = 0.06
                    
                    context.beginPath();
                    context.fillStyle = `rgba(0, 0, 0, 1)`;
                    
                    context.drawImage(image, x - newWidth / 2, y - newHeight / 2, newWidth, newHeight);
                
                    context.fill();


                    if (drawCount > 1000) {
                        console.log("drawCount", drawCount);

                        emitter.emit('revealCompleat', { loading: false });

                        emitter.all['revealCompleat'] = [];

                        window.onmousemove = null;

                    }
                });

                prevX = x;
                prevY = y;
            }

        }


    };

    return canvas;
}; 