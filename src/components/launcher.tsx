import React, { useEffect } from 'react';
import AtomicSDK, { SDKConfiguration } from "@atomic.io/action-cards-web-sdk";

interface LauncherProps {
    config: SDKConfiguration
}

const Launcher: React.FC<LauncherProps> = ({ config }) => {
    useEffect(() => {

        const instance = AtomicSDK.launch(config);

        return () => instance.stop();
    }, []);

    return (
        <></>
    );
}

export { Launcher };