import {CustomIcon} from "@/components/atoms/CustomImage";
import {AppDispatch} from "@/state/store";
import FrameButton from "@/components/atoms/FrameButton";
import {connectorTypes} from "@/constants/game.constants";
import {setCompletionTime, setGameActive} from "@/state/gameBoardSlice";
import StatusIndicator from "@/components/atoms/StatusIndicator";
import React from "react";
import {ConnectorTypes} from "@/utils/types/cable.type";

interface ConnectorTypeSelectionProps {
    selectedConnector: ConnectorTypes | null;
    setSelectedConnector: (connector: ConnectorTypes) => void;
    dispatch: AppDispatch;
}

const ConnectorTypeSelection: React.FC<ConnectorTypeSelectionProps> = ({selectedConnector, setSelectedConnector, dispatch}) => {

    const handleSelectorClick = (type: ConnectorTypes) => {
        dispatch(setGameActive(false))
        dispatch(setCompletionTime(0))
        setSelectedConnector(type)
    }

    return (
        <div className="flex flex-col items-center space-y-4 bg-colouryellow-100 border-2 rounded-xl p-2">
            <CustomIcon
                imagePath="/img/charge.svg"
                width={36}
                height={36}
            />
            <div className="text-center font-body text-xl mb-4">
                {!!selectedConnector ? "Press Start your session to proceed..." : "Select your connector type..."}
            </div>
            <div className="flex flex-row space-x-1 justify-center">
                {connectorTypes.map((type) => (
                    <FrameButton
                        key={type.label}
                        iconsPath={type.iconPath}
                        label={type.label}
                        onClick={() => handleSelectorClick(type)}
                        isSelected={type.label === selectedConnector?.label}
                    />
                ))}
            </div>
            <StatusIndicator isSelected={!!selectedConnector}
                             message={selectedConnector ? `Connector ${selectedConnector.label} selected` : 'No connector selected'}/>
        </div>
    );
};
export default ConnectorTypeSelection
