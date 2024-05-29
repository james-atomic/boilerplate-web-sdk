import React, { useState } from "react";
import { Button } from "./components/button";
import { Colours } from "./Colours";
import "./App.css";
import AtomicSDK from "@atomic.io/action-cards-web-sdk";
import Home from "./components/Home";
import VerticalStream from "./components/VerticalStream";

AtomicSDK.enableDebugMode(3);

export enum Views {
  StreamContainer = "stream",
  Home = "home",
}

const App = () => {
  const [view, setView] = useState(Views.Home);
  const [userId, setUserId] = useState<number>(0);

  return (
    <>
      <div className="header">
        <h1>WebSDK React Boilerplate App</h1>
      </div>
      <div className="content">
        {view === Views.Home && <Home userId={userId} setUserId={setUserId} />}
        {view === Views.StreamContainer && <VerticalStream userId={userId} />}
      </div>
      <div className="button_container">
        <Button
          onClick={() => setView(Views.Home)}
          text={"Home"}
          color={Colours.lightBlue}
          backgroundColor={Colours.midBlue}
        />
        <Button
          onClick={() => setView(Views.StreamContainer)}
          text={"Vertical Stream"}
          color={Colours.lighterPink}
          backgroundColor={Colours.hotPink}
        />
      </div>
    </>
  );
};

export default App;
