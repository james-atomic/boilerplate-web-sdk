import React, { useCallback, useRef } from "react";
import AtomicSDK, {
  AACStreamContainer,
  SDKConfiguration,
} from "@atomic.io/action-cards-web-sdk";
import styles from "./SingleCard.module.css";

interface SingleCardProps {
  config: SDKConfiguration;
}

export const SingleCard = ({ config }: SingleCardProps) => {
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
      embedRef.current = AtomicSDK.singleCard(element, config);
    }
  }, []);

  return (
    <div ref={initAtomicEmbed} className={styles.card_container_wrapper} />
  );
};
