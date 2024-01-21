import { generateToken } from "../util/jwt";
import AtomicSDK from '@atomic.io/action-cards-web-sdk';

const configAtomicSDK = () => {
// AtomicSDK configuration values - found in the Atomic Workbench
    const ATOMIC_API_HOST: string = "https://01.client-api.staging.atomic.io";
    const ATOMIC_API_KEY: string = "react-key";
    const ATOMIC_ENVIRONMENT_ID: string = "37VnjRVo";
    const ATOMIC_STREAM_CONTAINER_ID: string = "RbWlyOX9";
    const token: Promise<string> = generateToken();

// Request Authentication using a JWT.
    const getAtomicToken = async () => {
        return Promise.resolve(token)
    };

// "Log in" with the configuration values to initialise the AtomicSDK
    AtomicSDK.login(ATOMIC_API_HOST, ATOMIC_API_KEY, ATOMIC_ENVIRONMENT_ID, getAtomicToken)

    return ATOMIC_STREAM_CONTAINER_ID;
}

export { configAtomicSDK }