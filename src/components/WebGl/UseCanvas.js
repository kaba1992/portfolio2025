import React from "react";

export const UseCanvas = () => {
    let x = null;
    let y = null;
    let prevX = null;
    let prevY = null;
    const spacing = 3;
    let drawing = false;
    const size = 40;
    const canvas = document.createElement('canvas');;
    const context = canvas.getContext('2d');

    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.zIndex = 5;
    canvas.style.opacity = 0;
    document.body.appendChild(context.canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    function createFlow(x1, y1, x2, y2, callback) {
        let dx = x2 - x1;
        let sx = 1;
        let dy = y2 - y1;
        let sy = 1;
        let space = 0;

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

        if (dy < dx) {
            let fraction = dy - (dx >> 1);

            while (x1 != x2) {
                if (fraction >= 0) {
                    y1 += sy;
                    fraction -= dx;
                }

                fraction += dy;
                x1 += sx;

                if (space == spacing) {
                    callback(x1, y1);
                    space = 0;
                } else {
                    space += 1;
                }
            }
        } else {
            let fraction = dx - (dy >> 1);

            while (y1 != y2) {
                if (fraction >= 0) {
                    x1 += sx;
                    fraction -= dy;
                }

                fraction += dx;
                y1 += sy;

                if (space == spacing) {
                    callback(x1, y1);
                    space = 0;
                } else {
                    space += 1;
                }
            }
        }

        callback(x1, y1);
    }
    window.onmousemove = function (event) {
        console.log('mouse move');
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


        if (drawing == true) {

            if (((x - prevX) >= spacing || (y - prevY) >= spacing) || (prevX - x) >= spacing || (prevY - y) >= spacing) {
                createFlow(x, y, prevX, prevY, function (x, y) {
                    console.log(x, y, prevX, prevY);
                    context.beginPath();
                    context.fillStyle = 'rgba(0, 0, 0, 1)';
                    context.arc(x, y, size, 0, 2 * Math.PI, false);
                    context.fill();
                });

                prevX = x;
                prevY = y;
            }
        } else {
            prevX = x;
            prevY = y;
        }
    };

    window.onmousedown = function () {
        drawing = true;
    };

    window.onmouseup = function () {
        drawing = false;
    };


    return canvas;
}; 