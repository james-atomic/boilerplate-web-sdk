import AtomicSDK, {
  AACStreamContainer,
  SDKConfiguration,
} from "@atomic.io/action-cards-web-sdk";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

AtomicSDK.enableDebugMode(3);
// AtomicSDK.setApiProtocol("http");
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

export function useAtomicStream(userId: number) {
  const embedRef = useRef<AACStreamContainer>();
  const [bootstrap, setBootstrap] = useState(false);

  useEffect(() => {
    console.log("in effect");
    let ft: ReturnType<typeof setTimeout>;
    const mockFetchToken = new Promise<void>((res) => {
      ft = setTimeout(() => {
        console.log("fetched token");
        setBootstrap(true);
        res();
      }, 1000);
    });

    let sd: ReturnType<typeof setTimeout>;
    const sessionDelegate = () =>
      new Promise<string>((res) => {
        console.log(`requesting token for user ${userId}`);
        sd = setTimeout(() => {
          console.log("resolving token");
          setBootstrap(true);
          res(jwt);
        }, 1500);
      });

    (async () => {
      mockFetchToken.then((token) => {
        AtomicSDK.initialise(apiHost, apiKey, environmentId).then(() => {
          console.log("~~~~~~~ initialising atomic");
          AtomicSDK.setSessionDelegate(sessionDelegate, 400);
        });
      });
    })();

    return () => {
      console.log("logging out");
      if (sd) clearTimeout(sd);
      if (ft) clearTimeout(ft);
      AtomicSDK.logout().then(() => {
        if (embedRef.current) {
          embedRef.current.stop();
        }
      });
    };
  }, []);

  return {
    bootstrap,
    embedRef,
  };
}

export function useAtomicStreamElement(
  embedRef: MutableRefObject<AACStreamContainer | undefined>
) {
  const config: SDKConfiguration = {
    streamContainerId: streamContainerId,
  };
  const initAtomicEmbed = useCallback((el: HTMLDivElement) => {
    if (embedRef.current) {
      embedRef.current.stop();
    }
    if (el) {
      // Intiate the atomic stream in the HTML element 'el'
      embedRef.current = AtomicSDK.embed(el, config);
    }
  }, []);
  return {
    initAtomicEmbed,
  };
}