import emitter from "../Utils/EventEmitter";

export const UseCanvas = () => {
    let x = null;
    let y = null;
    let prevX = null;
    let prevY = null;
    let totalDistance = 0; // Distance totale parcourue
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', {
        alpha: true,
        desynchronized: true // Améliore les performances
    });
    let canDraw = false;
    let isImageLoaded = false;
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    // Limite basée sur la distance parcourue en pixels (ajustable selon vos besoins)
    let drawlimit = isMobile ? 4000 : 8000;

    // Variables pré-calculées pour optimiser la boucle
    let brushWidth, brushHeight, brushAlpha;

    // Variables pour requestAnimationFrame
    let pendingPoints = [];
    let rafId = null;

    const image = new Image();
    image.src = isMobile ? '/images/Brushs/brush6.png' : '/images/Brushs/brush2.png';;

    image.onload = () => {
        isImageLoaded = true;

        // Pré-calcul des dimensions du brush (une seule fois)
        brushWidth = isMobile ? image.width / 4 : image.width * 1.5;
        brushHeight = isMobile ? image.height / 4 : image.height * 1.5;
        brushAlpha = isMobile ? 1 : 0.15;
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
    // disable touch actions
    canvas.style.touchAction = 'none';
    document.body.appendChild(context.canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Mode de blend pour un effet plus doux
    context.globalCompositeOperation = 'source-over';

    emitter.on('loadingComplete', (data) => {
        canDraw = true;
        handleEvents();
        if (x !== null && y !== null) {
            prevX = x;
            prevY = y;
        }
    });

    // Fonction optimisée pour dessiner les points en batch avec RAF
    function drawPendingPoints() {
        if (pendingPoints.length === 0) {
            rafId = null;
            return;
        }

        // Dessiner tous les points en attente en une seule frame
        context.globalAlpha = brushAlpha;

        for (let i = 0; i < pendingPoints.length; i++) {
            const point = pendingPoints[i];
            context.drawImage(
                image,
                point.x - brushWidth / 2,
                point.y - brushHeight / 2,
                brushWidth,
                brushHeight
            );
        }

        // Vider le buffer
        pendingPoints.length = 0;
        rafId = null;
    }



    function touchMoveHandler(event) {
        if (!canDraw || !isImageLoaded) return;

        // Calcul de la position de la souris
        x = event.pageX - canvas.offsetLeft;
        y = event.pageY - canvas.offsetTop;

        if (prevX === null || prevY === null) {
            prevX = x;
            prevY = y;
            return;
        }

        // Calcul de la distance depuis le dernier point
        const dx = x - prevX;
        const dy = y - prevY;
        const moveDistance = Math.sqrt(dx * dx + dy * dy);

        // On ne dessine que si on a bougé d'au moins 1 pixel
        if (moveDistance >= 1) {
            totalDistance += moveDistance;

            // Interpolation entre les deux points pour un trait fluide
            const steps = Math.ceil(moveDistance / 6);

            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                pendingPoints.push({
                    x: prevX + dx * t,
                    y: prevY + dy * t
                });
            }

            // Planifier le dessin avec RAF si pas déjà planifié
            if (!rafId) {
                rafId = requestAnimationFrame(drawPendingPoints);
            }

            // Vérifier si on a atteint la limite
            if (totalDistance > drawlimit) {
                emitter.emit('revealCompleat', { loading: false });
                emitter.all['revealCompleat'] = [];
                removeEvents();
                canDraw = false;

                // Annuler le RAF en cours si nécessaire
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            }

            prevX = x;
            prevY = y;
        }
    }


    function touchStartHandler(event) {
        // const rect = canvas.getBoundingClientRect();
        // prevX = event.touches[0].pageX - rect.left - 50;
        // prevY = event.touches[0].pageY - rect.top - 50;
    }

    function handleEvents() {
        window.addEventListener('touchmove', touchMoveHandler, false);
        window.addEventListener('pointermove', touchMoveHandler, false);
        window.addEventListener('pointerdown', touchStartHandler, false);
    }

    function removeEvents() {
        window.removeEventListener('touchmove', touchMoveHandler, false);
        window.removeEventListener('pointermove', touchMoveHandler, false);
        window.removeEventListener('pointerdown', touchStartHandler, false);

        // Nettoyer le RAF en cours
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        pendingPoints.length = 0;
    }


    return canvas;
}; 