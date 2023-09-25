import React, { useState, useLayoutEffect, useEffect, ReactElement } from "react";
import usePreviousValue from "hooks/usePrevious";
import calculateBoundingElement from "utils/calculateBoundingElement";

interface AnimationProps {
    children: JSX.Element[] | JSX.Element | React.ReactNode;
}

const AnimationSlide = ({ children }: any) => {
    const [boundingBox, setBoundingBox] = useState<any>({});
    const [prevBoundingBox, setPrevBoundingBox] = useState<any>({});
    const prevChildren = usePreviousValue(children);

    useLayoutEffect(() => {
        const newBoundingBox = calculateBoundingElement(children);
        setBoundingBox(newBoundingBox);
    }, [children]);

    useLayoutEffect(() => {
        const prevBoundingBox = calculateBoundingElement(prevChildren);
        setPrevBoundingBox(prevBoundingBox);
    }, [prevChildren]);

    useEffect(() => {
        const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

        if (hasPrevBoundingBox) {
            React.Children.forEach(children, (child: any) => {
                const domNode = child.ref.current;
                const firstBox = prevBoundingBox[child.key];
                const lastBox = boundingBox[child.key];
                const changeInX = firstBox.top - lastBox.top;

                if (changeInX) {
                    requestAnimationFrame(() => {
                        // Before the DOM paints, invert child to old position
                        domNode.style.transform = `translateY(${changeInX}px)`;
                        domNode.style.transition = "transform 0s";

                        requestAnimationFrame(() => {
                            // After the previous frame, remove
                            // the transistion to play the animation
                            domNode.style.transform = "";
                            domNode.style.transition = "transform 500ms";
                        });
                    });
                }
            });
        }
    }, [boundingBox, prevBoundingBox, children]);

    return children;
};

export default AnimationSlide;
