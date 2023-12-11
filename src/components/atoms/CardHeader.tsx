import React from 'react';
import {NextRouter} from "next/router";
import {CustomIcon} from "@/components/atoms/CustomImage";

interface HeaderProps {
    router: NextRouter;
    navigatePage:()=>void

}

const CardHeader: React.FC<HeaderProps> = ({router,navigatePage}) => {
    return (
        <div className="flex justify-between items-center w-full p-2">
            <CustomIcon
                className='cursor-pointer'
                imagePath="/img/profile.svg"
                width={32}
                onClick={navigatePage}

            />

            <div className="flex-1 flex justify-center mr-10">
                <CustomIcon
                    imagePath="/img/brand-logo.svg"
                    width={185}
                />
            </div>
        </div>
    );
};

export default CardHeader;
