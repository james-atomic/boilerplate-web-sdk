import React, { useCallback, useRef } from "react";
import AtomicSDK, {
  AACStreamContainer,
  SDKConfiguration,
} from "@atomic.io/action-cards-web-sdk";
import styles from "./VerticalStream.module.css";
interface VerticalStreamProps {
  config: SDKConfiguration;
}

export const VerticalStream = (props: VerticalStreamProps) => {
  // Create a reference to the stream container and clean up any existing instances before
  // creating a new one to render the single card view.
  const embedRef = useRef<AACStreamContainer>();
  // Remove any potentially existing instances
  const initAtomicEmbed = useCallback((element: HTMLDivElement) => {
    if (embedRef.current) {
      embedRef.current.stop();
    }

    if (element) {
      // If 'element' exists, initialise the embedded container
      embedRef.current = AtomicSDK.embed(element, props.config);
    }
  }, []);

  return (
    <div className={styles.stream_wrapper}>
      <div className={styles.info_wrapper}>
        <div className={styles.title}>Vertical Stream View</div>
        <p>
          The vertical stream view allows you to display your cards in a
          vertical flow with your most recently sent cards at the top.
          Similarly, there is also a horizontal stream presentation. The
          standalone containers have various customisation parameters available
          such as changing the card list title or toast message configuration.
          <br />
          <br />
          You can read more about it here in the{" "}
          <a
            href="https://documentation.atomic.io/sdks/web#displaying-a-vertical-stream-container"
            target="_blank"
          >
            vertical stream container documentation.
          </a>
        </p>
      </div>
      <div ref={initAtomicEmbed} className={styles.card_container_wrapper} />
    </div>
  );
};
