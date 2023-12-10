import React from "react";
import Image from "next/image";

interface Props {
    className?: any;
    imagePath: string;
    width?:number;
    height?:number;
    onClick?: ()=> void;
}

export const CustomIcon = ({className, imagePath,width=100,height=100 , onClick}: Props): JSX.Element => {
    return (
        <Image
            src={imagePath}
            alt="My SVG"
            width={width}
            height={height}
            onClick={onClick}
            className={className}
        />

    );
};
