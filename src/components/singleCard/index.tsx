import React, { useCallback, useRef } from "react";
import AtomicSDK, {
  AACStreamContainer,
  SDKConfiguration,
} from "@atomic.io/action-cards-web-sdk";
import styles from "./SingleCard.module.css";

interface SingleCardProps {
  config: SDKConfiguration;
}

export const SingleCard = (props: SingleCardProps) => {
  // Create a reference to the stream container and clean up any existing instances before
  // creating a new one to render the single card view.
  const embedRef = useRef<AACStreamContainer>();
  const initAtomicEmbed = useCallback((element: HTMLDivElement) => {
    // Remove any potentially existing instances
    if (embedRef.current) {
      embedRef.current.stop();
    }

    if (element) {
      // If 'element' exists, initialise the embedded container
      embedRef.current = AtomicSDK.singleCard(element, props.config);
    }
  }, []);

  return (
    <div className={styles.single_wrapper}>
      <div ref={initAtomicEmbed} className={styles.card_container_wrapper} />
      <div className={styles.info_wrapper}>
        <div className={styles.title}>Single Card View</div>
        <p>
          The single card view embeds a single card without any surrounding UI
          into a specified element. It will display the most recently sent card
          with the highest priority. The dimensions of the embedded iframe will
          adjust to fit the size of whichever card is currently being displayed.
          <br />
          <br />
          You can read more about it here in the{" "}
          <a
            href="https://documentation.atomic.io/sdks/web#displaying-a-single-card"
            target="_blank"
          >
            single card documentation.
          </a>
        </p>
      </div>
    </div>
  );
};
