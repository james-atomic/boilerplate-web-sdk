import React from "react";
import { SingleCard } from "./components/singleCard";
import { Launcher } from "./components/launcher";
import { VerticalStream } from "./components/verticalStream";
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

      // call the supplied callback with your modified cards
      callback(cards);
    },
    // Customisation of the containers' UI. Other options can be found in the WebSDK documentation https://documentation.atomic.io/sdks/web#style-and-presentation
    enabledUiElements: {
      launcherButton: {
        disabled: false,
        backgroundColor: "#43b611",
      },
    },
    // See the WebSDK documentation on available custom strings https://documentation.atomic.io/sdks/web#custom-strings
    customStrings: {
      cardListTitle: "Custom List Title",
    },
  };

  return (
    <>
      <Launcher config={config} />
      <VerticalStream config={config} />
      <SingleCard config={config} />
    </>
  );
};

export default App;
