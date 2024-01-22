import React, { useCallback, useRef } from "react";
import AtomicSDK, { AACStreamContainer, SDKConfiguration } from "@atomic.io/action-cards-web-sdk";

interface SingleCardProps {
    containerId: string;
}

const SingleCard: React.FC<SingleCardProps> = ({ containerId }) => {
    // Create a reference to the stream container and clean up any existing instances before
    // creating a new one to render the single card view.
    const embedRef = useRef<AACStreamContainer>();
    const initAtomicEmbed = useCallback((element: HTMLDivElement) => {
        if (embedRef.current) {
            embedRef.current.stop();
        }

        // Configure the single card view element with the container ID and include support for runtime variables as a parameter
        if (element) {
            const config: SDKConfiguration = {
                streamContainerId: containerId,
            };

            // Initiate the stream in 'element'
            embedRef.current = AtomicSDK.singleCard(element, config);
        }
    }, []);

    return (
        <div ref={ initAtomicEmbed } className="card-container-wrapper"/>
    );
};

export { SingleCard };