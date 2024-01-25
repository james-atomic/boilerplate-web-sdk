import React, { useEffect } from "react";
import AtomicSDK, { SDKConfiguration } from "@atomic.io/action-cards-web-sdk";

interface LauncherProps {
  config: SDKConfiguration;
}

export const Launcher = ({ config }: LauncherProps) => {
  useEffect(() => {
    const instance = AtomicSDK.launch(config);

    return () => instance.stop();
  }, []);

  return <></>;
};
