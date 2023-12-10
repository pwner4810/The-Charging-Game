import React from "react";
import {CustomIcon} from "@/components/atoms/CustomImage";

export const Car = () => {
    return (
        <div className="absolute top-0 left-0 transform  -translate-x-10">
            <CustomIcon
                imagePath="/img/charger.svg"
                width={36}
            />
        </div>

    );
};
