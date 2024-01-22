import React, {useCallback, useRef} from 'react';
import AtomicSDK, {AACStreamContainer, SDKConfiguration} from "@atomic.io/action-cards-web-sdk";
import styles from "../styles/VerticalStream.module.css"
interface VerticalStreamProps {
    config: SDKConfiguration
}

const VerticalStream: React.FC<VerticalStreamProps> = ({ config }) => {
    // Create a reference to the stream container and clean up any existing instances before
    // creating a new one to render the single card view.
    const embedRef = useRef<AACStreamContainer>();
    // Remove any potentially existing instances
    const initAtomicEmbed = useCallback((element: HTMLDivElement) => {
        if (embedRef.current) {
            embedRef.current.stop();
        }

        if (element) {
            // If 'element' exists, initialise the embedded container
            embedRef.current = AtomicSDK.embed(element, config);
        }
    }, []);

    return (
        <div ref={ initAtomicEmbed } className={ styles.card_container_wrapper }/>
    );
}

export { VerticalStream };