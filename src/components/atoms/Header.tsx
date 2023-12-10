import React from 'react';
import {NextRouter} from "next/router";
import {CustomIcon} from "@/components/atoms/CustomImage";

interface HeaderProps {
    router: NextRouter;

}

const Header: React.FC<HeaderProps> = ({router}) => {
    return (
        <div className="flex justify-between items-center w-full">
            <CustomIcon
                className='cursor-pointer'
                imagePath="/img/profile.svg"
                width={36}
                onClick={()=>router.push('/leaderBoard')}

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

export default Header;
