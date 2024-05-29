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

  const users = [
    "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNTE4YjQ0Yi1iMGU4LTVlOTEtYTM1ZS1lYmVmNGE1ZWNmYmEiLCJhcGlLZXkiOiJib2lsZXJwbGF0ZS10ZXN0IiwiaWF0IjoxNzE2ODQ5MzQ0LCJleHAiOjE3MTcxMDg1NDR9.y4lsJfGNIar6kfDsqhiTI0vxTYgMAnag4VQLY-pI_ZiA-p0pViH39PTK3U1pFlVVcP6vCt3pf1SJdt7zHPWsqIg5lpGOTU5dhRLZoLwKMxpZXw2Nc7fcDAJSZpUYRKX5gLnMj-t8Ng-baQ--bdTTezIfaaFnt73abVze-5yMVodR7kQ4Lx62Y0PRkavYLoSnx5JoOAbR9eT9O-A9-Kbxo_-a4T-WGIgsd-lY-BZsry2VwtpfTD0yD_Zkcp2sdsyS-D1W-j4W_ny23sdOxXVf0qb8-BcBCvqXvc_eceHeizeN8_tmDVSbGV6g7SqRHRSE9YdAXr2GVVRJcYuZEN14bmlVoyPqoAQiIj4eziQWBiS9v_Z3h9hH4R-xUr2ZWAeokcNHPsuM8jem1PHcHfob7vRUYPkHYVD2eKn1WXHBUtois1VGDCCq_0zzp1PPaWGSTTSFII4hi82_--ywksqIw2wuado0xYKrMXkeDXejE3UzBToDfuCQKhuFsj7euZaG2ConERvoIwrG9_G-7QSAKsb_Zf5H3pMPP_rgjOFMlWbDMsvbyp46dtKXM8hZUSpGOS43Ghen4H3riJiDIVdFIjhj7uZHD_vL1sOJy4vCWyvbZiF7Vl17UJ87mCUiPzJbAv4MGMexV_SAe-yZ3BqOaCF545QLIOd3EOZmGR-MmiU",
    "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkYzg5OC0yMGM0LTQ4NWYtOTUwYy0zMWFiMzliZmI3MTQiLCJhcGlLZXkiOiJib2lsZXJwbGF0ZS10ZXN0IiwiaWF0IjoxNzE2ODQ5NzQzLCJleHAiOjE3MTcxMDg5NDN9.CbnyOE3-1eavskoK371iFv2sZZSJW8ugvNwdyMPDvk4rnlxiT6CvMQm3tXfqAnyKxHUz4aNQCqhAdbbejJAWEJp6uDX8bysDW3CHmwH8pgKirlN74Fl_eaxvFMt2fCHs1xJngjNCJ2UL33LhJZetDVkV1n9PBsfjal-C5laKo4SQPMC6rQZc726GUCBiQd4mv3syusJmiaskgOEgC7CLGEwFYntbhoGHQCCzzuTpandqjIV0z34wZmhzyR1JN7jwfQt74pYCy_51mxqfgGOPgKLkizx-uHIwpublOeCxF_kQU6gWSx1uhsrqxftPEBW3J_gK5ckjPp7oTca6rm8EteS664C7scLif2Bi0tmTiy61zhcqiAoMrnUNsp4V1qw9yD3R9ES-Kt-QqA8NaL22lBe8sPy9opR1V4hDIz8AajS2-lxATUeA-ow5YCpZWjWGHAVhnsNMKp3N7b-XvGJVwW7Ez1CA0Cxw9p-hZfXf97R8qqAERmX5useJMVpl8b2BEEZtqr-pM4hpBlnFVOvvNmccd8WLeakeKUWvK_fPi4YQQsKA0gMnSQkr8rOo6AAUDnNsYPy7NQETMAuss8ZaVFwvOXG0x6hunl-VmASguvFPSrJuoKoejLshlZ118w45QekeKctz53aofiAQ5WGy1TyF1KYT1fQIigbZG_SsUFM",
  ];

  const sessionDelegate = () =>
    new Promise<string>((res) => {
      console.log(`requesting token for user ${userId}`);
      setTimeout(() => {
        console.log("resolving token");
        setBootstrap(true);
        res(users[userId]);
      }, 1500);
    });

  const mockFetchToken = new Promise((res) => {
    setTimeout(() => {
      console.log("fetched token");
      setBootstrap(true);
      res(users[userId]);
    }, 1000);
  });

  useEffect(() => {
    (async () => {
      mockFetchToken.then((token) => {
        AtomicSDK.initialise(apiHost, apiKey, environmentId).then(() => {
          console.log("~~~~~~~ initialising atomic");
          AtomicSDK.setSessionDelegate(sessionDelegate, 400);
        });
      });
    })();

    return () => {
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
