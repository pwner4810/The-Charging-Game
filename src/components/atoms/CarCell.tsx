import React from "react";
import {CustomIcon} from "@/components/atoms/CustomImage";

export const CarCell = () => {
    return (
        <div className="absolute bottom-0 right-0 transform  translate-x-10">
            <CustomIcon
                imagePath="/img/evcar.svg"
                width={36}
            />
        </div>

    );
};
