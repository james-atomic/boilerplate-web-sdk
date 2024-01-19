import React, { useEffect } from "react";
import { generateToken } from "./util/jwt";
import AtomicSDK, { SDKConfiguration } from '@atomic.io/action-cards-web-sdk';

// AtomicSDK configuration values - found in the Atomic Workbench
const ATOMIC_API_HOST : string = "";
const ATOMIC_API_KEY: string = "";
const ATOMIC_ENVIRONMENT_ID : string = "";
const ATOMIC_STREAM_CONTAINER_ID : string = "";
const token = generateToken();

// Request Authentication using a JWT.
const getAtomicToken = async () => {
    return Promise.resolve(token)
};

// "Log in" with the configuration values to initialise the AtomicSDK
AtomicSDK.login(ATOMIC_API_HOST, ATOMIC_API_KEY, ATOMIC_ENVIRONMENT_ID, getAtomicToken)

const App = () => {
    useEffect(() => {

        const config: SDKConfiguration = {
            streamContainerId: ATOMIC_STREAM_CONTAINER_ID,
        };

        const instance = AtomicSDK.launch(config);

        return () => instance.stop();
    }, []);

    return (
        <></>
    );
};

export default App;