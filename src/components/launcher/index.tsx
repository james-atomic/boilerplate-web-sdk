import React, { useEffect } from "react";
import AtomicSDK, { SDKConfiguration } from "@atomic.io/action-cards-web-sdk";
import styles from './Launcher.module.css'
interface LauncherProps {
  config: SDKConfiguration;
  visible: boolean;
}

export const Launcher = (props: LauncherProps) => {
  useEffect(() => {
    if (props.visible) {
      const instance = AtomicSDK.launch(props.config);
      return () => instance.stop();
    }
  }, [props.visible]);

  return <>
    <div className={props.visible ? styles.launcher_wrapper : styles.none}>
      <div className={styles.info_wrapper}>
        <div className={styles.title}>Launcher</div>
        <p>The launcher is a method of displaying your cards that implements a trigger button to open and close the stream container. Once opened, the stream container automatically resizes itself to fit its content.
        Usually, the trigger button is located in the bottom right of the screen, however, as shown in this example, you can reposition the trigger button and container using CSS selectors.
        <br /><br />You can read more about it here in the <a href="https://documentation.atomic.io/sdks/web#displaying-a-launcher" target="_blank">launcher documentation.</a></p>
      </div>
    </div>
  </>;
};
