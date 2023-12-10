import React from 'react';
import {CustomIcon} from "@/components/atoms/CustomImage";

interface SelectorButtonProps {
    label: string;
    isSelected: boolean;
    onClick: () => void;
    iconsPath:string
}

const FrameButton: React.FC<SelectorButtonProps> = ({label,isSelected,onClick,iconsPath}:SelectorButtonProps) => {
    return (
        <div className='frame-button flex flex-col items-center bg-colourgrey-300 rounded-8 border-solid border-2 border-white p-2 pt-1 rounded-xl ' onClick={onClick}>
         <div className='text-xs font-bold text-gray-950 w-20  pb-2 truncate text-center'>
             <span className="text-xs font-bold text-gray-950 w-20 truncate text-center ">{label}</span>
         </div>
            <div className='flex h-full justify-center flex-col items-center '>
                <CustomIcon
                    className={`${isSelected ? 'fill-colourgreybackground' :''} `}
                    imagePath={iconsPath}
                    width={36}
                    height={36}
                />
                {isSelected && <div className="bg-colourgreybackground p-1 text-white rounded text-xs">Selected</div>}
            </div>


        </div>
    );
};

export default FrameButton;
