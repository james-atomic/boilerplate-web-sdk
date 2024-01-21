import React, { useRef, useCallback } from "react";
import { generateToken } from "./util/jwt";
import AtomicSDK, { SDKConfiguration, AACStreamContainer } from '@atomic.io/action-cards-web-sdk';
import "./App.css";

// AtomicSDK configuration values - found in the Atomic Workbench
const ATOMIC_API_HOST : string = "";
const ATOMIC_API_KEY: string = "";
const ATOMIC_ENVIRONMENT_ID : string = "";
const ATOMIC_STREAM_CONTAINER_ID : string = "";
const token : Promise<string> = generateToken();

// Request Authentication using a JWT.
const getAtomicToken = async () => {
    return Promise.resolve(token)
};

// "Log in" with the configuration values to initialise the AtomicSDK
AtomicSDK.login(ATOMIC_API_HOST, ATOMIC_API_KEY, ATOMIC_ENVIRONMENT_ID, getAtomicToken)

const App = () => {

    const embedRef = useRef<AACStreamContainer>();

    const initAtomicEmbed = useCallback((element: HTMLDivElement) => {
        if (embedRef.current) {
            embedRef.current.stop();
        }

        if (element) {
            const config: SDKConfiguration = {
                streamContainerId: ATOMIC_STREAM_CONTAINER_ID,
                onRuntimeVariablesRequested: (cards, callback) : void => {
                    cards.forEach(function(card) : void {
                        // Replace the name of the runtime variable with your own set in the Workbench and modify what you want the value to be.
                        card.runtimeVariables.set('test_variable', 'If you see this, then it works! Yay!');
                    })

                    callback(cards);
                }
            };

            embedRef.current = AtomicSDK.singleCard(element, config);
        }
    }, []);

    return (
        <>
            <div ref={ initAtomicEmbed } className="card-container-wrapper"/>
        </>
    );
};

export default App;