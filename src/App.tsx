import React, {useEffect, useState} from "react";
import { SingleCard } from "./components/singleCard";
import { Launcher } from "./components/launcher";
import { VerticalStream } from "./components/verticalStream";
import { Button } from "./components/button";
import { Colours } from "./Colours";
import "./App.css";
import AtomicSDK, {
  AuthToken,
  SDKConfiguration,
} from "@atomic.io/action-cards-web-sdk";

declare global {
  interface Window {
    AtomicConfig: {
      apiHost: string;
      streamContainerId: string;
      apiKey: string;
      environmentId: string;
      jwt: string;
    };
  }
}
const { apiHost, streamContainerId, apiKey, environmentId, jwt } =
  window.AtomicConfig;

AtomicSDK.login(
  apiHost,
  apiKey,
  environmentId,
  async (): Promise<AuthToken> => {
    return Promise.resolve(jwt);
  }
);
AtomicSDK.enableDebugMode(3);

const App = () => {
  const [isVisible, setIsVisible] = useState({
    id: 'single',
  })

  const selectView = (e) => {
    setIsVisible({
      id: e.target.id,
    })
  }

  // Configure the containers
  const config: SDKConfiguration = {
    streamContainerId,
    // See the WebSDK documentation for more information on the implementation of this function https://documentation.atomic.io/sdks/web#runtime-variables
    onRuntimeVariablesRequested: (cards, callback): void => {
      cards.forEach(function (card): void {
        // Replace the name of the runtime variable with your own set in the Workbench and modify what you want the value to be.
        card.runtimeVariables.set(
          "test_variable",
          "If you see this, then it works! Yay!"
        );
      });

      // Call the supplied callback with your modified cards
      callback(cards);
    },
    // Customisation of the containers' UI. Other options can be found in the WebSDK documentation https://documentation.atomic.io/sdks/web#style-and-presentation
    enabledUiElements: {
      launcherButton: {
        disabled: false,
        backgroundColor: Colours.hotPink,
      },
    },
    // See the WebSDK documentation for available custom strings https://documentation.atomic.io/sdks/web#custom-strings
    customStrings: {
      cardListTitle: "Custom List Title",
    }
  };

  return (
    <>
      <div className="header">
        <h1>WebSDK React Boilerplate App</h1>
      </div>
        <div className="content">
          <VerticalStream config={config} visible={isVisible.id === 'stream'}/>
          <SingleCard config={config} visible={isVisible.id === 'single'}/>
          <Launcher config={config} visible={isVisible.id === 'launcher'}/>
        </div>
      <div className="button_container">
        <Button id={'single'} clicked={(e) => {
          selectView(e)
        }}/>
        <Button id={'stream'} clicked={(e) => {
          selectView(e)
        }}/>
        <Button id={'launcher'} clicked={(e) => {
          selectView(e)
        }}/>
      </div>
    </>
  );
};

export default App;
