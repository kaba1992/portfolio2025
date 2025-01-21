"use client";

import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { calculatePosition } from "./CalculatePosition.js";
import { parsePathToVertices } from "./ParsePathToVertices.js";
import { debounce } from "lodash";
import Matter, {
    Bodies,
    Common,
    Engine,
    Events,
    Mouse,
    MouseConstraint,
    Query,
    Render,
    Runner,
    World,
} from "matter-js";

import { cn } from "./Cn.js";


const GravityContext = createContext(null);

export const MatterBody = ({
    children,
    className,
    matterBodyOptions = {
        friction: 0.1,
        restitution: 0.1,
        density: 0.001,
        isStatic: false,
    },
    bodyType = "rectangle",
    isDraggable = true,
    sampleLength = 15,
    x = 0,
    y = 0,
    angle = 0,
    ...props
}) => {
    const elementRef = useRef(null);
    const idRef = useRef(Math.random().toString(36).substring(7));
    const context = useContext(GravityContext);

    useEffect(() => {
        if (!elementRef.current || !context) return;
      
        context.registerElement(idRef.current, elementRef.current, {
            children,
            matterBodyOptions,
            bodyType,
            sampleLength,
            isDraggable,
            x,
            y,
            angle,
            ...props,
        });


        return () => context.unregisterElement(idRef.current);
    }, [props, children, matterBodyOptions, isDraggable]);

    return (
        <div
            ref={elementRef}
            className={cn(
                "absolute",
                className,
                isDraggable && "pointer-events-none"
            )}
        >
            {children}
        </div>
    );
};

const Gravity = forwardRef(
    (
        {
            children,
            debug = false,
            gravity = { x: 0, y: 1 },
            grabCursor = true,
            resetOnResize = true,
            addTopWall = true,
            autoStart = true,
            className,
            ...props
        },
        ref
    ) => {
        const canvas = useRef(null);
        const engine = useRef(Engine.create());
        const render = useRef();
        const runner = useRef();
        const bodiesMap = useRef(new Map());
        const frameId = useRef();
        const mouseConstraint = useRef();
        const mouseDown = useRef(false);
        const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

        const isRunning = useRef(false);

        const registerElement = useCallback((id, element, props) => {
            if (!canvas.current) return;
            const width = element.offsetWidth;
            const height = element.offsetHeight;
            const canvasRect = canvas.current.getBoundingClientRect();



            const angle = (props.angle || 0) * (Math.PI / 180);

            const x = calculatePosition(props.x, canvasRect.width, width);
            const y = calculatePosition(props.y, canvasRect.height, height);

            let body;
            if (props.bodyType === "circle") {
                const radius = Math.max(width, height) / 2;
                body = Bodies.circle(x, y, radius, {
                    ...props.matterBodyOptions,
                    angle: angle,
                    render: {
                        fillStyle: debug ? "#888888" : "#00000000",
                        strokeStyle: debug ? "#333333" : "#00000000",
                        lineWidth: debug ? 3 : 0,
                    },
                });
            } else if (props.bodyType === "svg") {
                const paths = element.querySelectorAll("path");
                const vertexSets = [];

                paths.forEach((path) => {
                    const d = path.getAttribute("d");
                    const vertices = parsePathToVertices(d, props.sampleLength);
                    vertexSets.push(vertices);
                });

                body = Bodies.fromVertices(x, y, vertexSets, {
                    ...props.matterBodyOptions,
                    angle: angle,
                    render: {
                        fillStyle: debug ? "#888888" : "#00000000",
                        strokeStyle: debug ? "#333333" : "#00000000",
                        lineWidth: debug ? 3 : 0,
                    },
                });
            } else {
                body = Bodies.rectangle(x, y, width, height, {
                    ...props.matterBodyOptions,
                    angle: angle,
                    render: {
                        fillStyle: debug ? "#888888" : "#00000000",
                        strokeStyle: debug ? "#333333" : "#00000000",
                        lineWidth: debug ? 3 : 0,
                    },
                });
            }

            World.add(engine.current.world, body);
            bodiesMap.current.set(id, { element, body, props });
        }, []);

        const unregisterElement = useCallback((id) => {
            const bodyInfo = bodiesMap.current.get(id);
            if (bodyInfo) {
                World.remove(engine.current.world, bodyInfo.body);
                bodiesMap.current.delete(id);
            }
        }, []);

        // Implémentez les fonctions `start`, `stop` et `reset` comme nécessaire

      
    // Keep react elements in sync with the physics world
    const updateElements = useCallback(() => {
        bodiesMap.current.forEach(({ element, body }) => {
          const { x, y } = body.position
          const rotation = body.angle * (180 / Math.PI)
  
          element.style.transform = `translate(${
            x - element.offsetWidth / 2
          }px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`
        })
  
        frameId.current = requestAnimationFrame(updateElements)
      }, [])
  
      const initializeRenderer = useCallback(() => {
        if (!canvas.current) return
  
        const height = canvas.current.offsetHeight
        const width = canvas.current.offsetWidth
  
        Common.setDecomp(require("poly-decomp"))
  
        engine.current.gravity.x = gravity.x
        engine.current.gravity.y = gravity.y
  
        render.current = Render.create({
          element: canvas.current,
          engine: engine.current,
          options: {
            width,
            height,
            wireframes: false,
            background: "#00000000",
          },
        })
  
        const mouse = Mouse.create(render.current.canvas)
        mouseConstraint.current = MouseConstraint.create(engine.current, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: debug,
            },
          },
        })
  
        // Add walls
        const walls = [
          // Floor
          Bodies.rectangle(width / 2, height + 10, width, 20, {
            isStatic: true,
            friction: 1,
            render: {
              visible: debug,
            },
          }),
  
          // Right wall
          Bodies.rectangle(width + 10, height / 2, 20, height, {
            isStatic: true,
            friction: 1,
            render: {
              visible: debug,
            },
          }),
  
          // Left wall
          Bodies.rectangle(-10, height / 2, 20, height, {
            isStatic: true,
            friction: 1,
            render: {
              visible: debug,
            },
          }),
        ]
  
        const topWall = addTopWall
          ? Bodies.rectangle(width / 2, -10, width, 20, {
              isStatic: true,
              friction: 1,
              render: {
                visible: debug,
              },
            })
          : null
  
        if (topWall) {
          walls.push(topWall)
        }
  
        const touchingMouse = () =>
          Query.point(
            engine.current.world.bodies,
            mouseConstraint.current?.mouse.position || { x: 0, y: 0 }
          ).length > 0
  
        if (grabCursor) {
          Events.on(engine.current, "beforeUpdate", (event) => {
            if (canvas.current) {
              if (!mouseDown.current && !touchingMouse()) {
                canvas.current.style.cursor = "default"
              } else if (touchingMouse()) {
                canvas.current.style.cursor = mouseDown.current
                  ? "grabbing"
                  : "grab"
              }
            }
          })
  
          canvas.current.addEventListener("mousedown", (event) => {
            mouseDown.current = true
  
            if (canvas.current) {
              if (touchingMouse()) {
                canvas.current.style.cursor = "grabbing"
              } else {
                canvas.current.style.cursor = "default"
              }
            }
          })
          canvas.current.addEventListener("mouseup", (event) => {
            mouseDown.current = false
  
            if (canvas.current) {
              if (touchingMouse()) {
                canvas.current.style.cursor = "grab"
              } else {
                canvas.current.style.cursor = "default"
              }
            }
          })
        }
  
        World.add(engine.current.world, [mouseConstraint.current, ...walls])
  
        render.current.mouse = mouse
  
        runner.current = Runner.create()
        Render.run(render.current)
        updateElements()
        runner.current.enabled = false
  
        if (autoStart) {
          runner.current.enabled = true
          startEngine()
        }
      }, [updateElements, debug, autoStart])
  
      // Clear the Matter.js world
      const clearRenderer = useCallback(() => {
        if (frameId.current) {
          cancelAnimationFrame(frameId.current)
        }
  
        if (mouseConstraint.current) {
          World.remove(engine.current.world, mouseConstraint.current)
        }
  
        if (render.current) {
          Mouse.clearSourceEvents(render.current.mouse)
          Render.stop(render.current)
          render.current.canvas.remove()
        }
  
        if (runner.current) {
          Runner.stop(runner.current)
        }
  
        if (engine.current) {
          World.clear(engine.current.world, false)
          Engine.clear(engine.current)
        }
  
        bodiesMap.current.clear()
      }, [])
  
      const handleResize = useCallback(() => {
        if (!canvas.current || !resetOnResize) return
  
        const newWidth = canvas.current.offsetWidth
        const newHeight = canvas.current.offsetHeight
  
        setCanvasSize({ width: newWidth, height: newHeight })
  
        // Clear and reinitialize
        clearRenderer()
        initializeRenderer()
      }, [clearRenderer, initializeRenderer, resetOnResize])
  
      const startEngine = useCallback(() => {
        if (runner.current) {
          runner.current.enabled = true
  
          Runner.run(runner.current, engine.current)
        }
        if (render.current) {
          Render.run(render.current)
        }
        frameId.current = requestAnimationFrame(updateElements)
        isRunning.current = true
      }, [updateElements, canvasSize])
  
      const stopEngine = useCallback(() => {
        if (!isRunning.current) return
  
        if (runner.current) {
          Runner.stop(runner.current)
        }
        if (render.current) {
          Render.stop(render.current)
        }
        if (frameId.current) {
          cancelAnimationFrame(frameId.current)
        }
        isRunning.current = false
      }, [])
  
      const reset = useCallback(() => {
        stopEngine()
        bodiesMap.current.forEach(({ element, body, props }) => {
          body.angle = props.angle || 0
  
          const x = calculatePosition(
            props.x,
            canvasSize.width,
            element.offsetWidth
          )
          const y = calculatePosition(
            props.y,
            canvasSize.height,
            element.offsetHeight
          )
          body.position.x = x
          body.position.y = y
        })
        updateElements()
        handleResize()
      }, [])
  
      useImperativeHandle(
        ref,
        () => ({
          start: startEngine,
          stop: stopEngine,
          reset,
        }),
        [startEngine, stopEngine]
      )
  
      useEffect(() => {
        if (!resetOnResize) return
  
        const debouncedResize = debounce(handleResize, 500)
        window.addEventListener("resize", debouncedResize)
  
        return () => {
          window.removeEventListener("resize", debouncedResize)
          debouncedResize.cancel()
        }
      }, [handleResize, resetOnResize])
  
      useEffect(() => {
        initializeRenderer()
        return clearRenderer
      }, [initializeRenderer, clearRenderer])
  

        return (
            <GravityContext.Provider
                value={{ registerElement, unregisterElement }}
            >
                <div ref={canvas} className={cn("relative", className)} {...props}>
                    {children}
                </div>
            </GravityContext.Provider>
        );
    }
);

Gravity.displayName = "Gravity";

export default Gravity;