import React from "react";
import { configAtomicSDK } from "./config/configAtomicSDK";
import { SingleCard } from "./components/singleCard";
import "./App.css";

const CONTAINER_ID = configAtomicSDK();

const App = () => {
    return (
        <SingleCard containerId={ CONTAINER_ID } />
    );
};

export default App;