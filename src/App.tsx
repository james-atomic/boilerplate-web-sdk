import React from "react";
import { configAtomicSDK } from "./config/configAtomicSDK";
import { SingleCard } from "./components/singleCard";
import { Launcher } from "./components/launcher";
import { VerticalStream } from "./components/verticalStream";
import "./App.css";
import { SDKConfiguration } from "@atomic.io/action-cards-web-sdk";

const CONTAINER_ID = configAtomicSDK();

const App = () => {
    // Configure the containers
    const config: SDKConfiguration = {
        streamContainerId: CONTAINER_ID,
        onRuntimeVariablesRequested: (cards, callback) : void => {
            cards.forEach(function(card) : void {
                // Replace the name of the runtime variable with your own set in the Workbench and modify what you want the value to be.
                card.runtimeVariables.set('test_variable', 'If you see this, then it works! Yay!');
            })

            callback(cards);
        },
        // Customisation of the containers' UI. Other options can be found in the WebSDK documentation
        enabledUiElements: {
            launcherButton: {
                disabled: false,
                backgroundColor: '#43b611'
            }
        },
        customStrings: {
            cardListTitle: "Custom List Title"
        }
    };

    return (
        <>
            <Launcher config={ config }/>
            <VerticalStream config={ config }/>
            <SingleCard config={ config }/>
        </>
    );
};

export default App;