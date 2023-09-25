import React from "react";

const calculateBoundingElement = (children: any) => {
    const boundingBoxes: any = {};

    React.Children.forEach(children, (child: any) => {
        const domNode = child.ref.current;
        const nodeBoundingBox = domNode.getBoundingClientRect();

        boundingBoxes[child.key] = nodeBoundingBox;
    });

    return boundingBoxes;
};

export default calculateBoundingElement;
