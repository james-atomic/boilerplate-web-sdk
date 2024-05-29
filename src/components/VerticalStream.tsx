import React from "react";
import styles from "./VerticalStream.module.css";
import { useAtomicStream, useAtomicStreamElement } from "../AtomicClient";

const VerticalStream = ({ userId }: any) => {
  const { bootstrap, embedRef } = useAtomicStream(userId);
  const { initAtomicEmbed } = useAtomicStreamElement(embedRef);

  return (
    <div className={styles.stream_wrapper}>
      {bootstrap && <div ref={initAtomicEmbed} id={"atomic-stream-embed"} />}
    </div>
  );
};

export default VerticalStream;
