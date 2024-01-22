import { SignJWT, KeyLike, importPKCS8 } from 'jose';

// Read and return the private key from its generated .key file
const getPrivateKey = async (): Promise<string> => {
    try {
        const response = await fetch("/jwtRS512.key");
        return await response.text();
    } catch (error) {
        console.error("There was an issue reading the private key.", error);
        throw error;
    }
};

const generateToken = async (): Promise<string> => {
    const alg : string = 'RS512'; // JWT signing algorithm
    const id : string = ''; // User's unique identifier. Do not include sensitive information - it is encoded but not encrypted.

    // Read private key and convert to KeyLike format for signing.
    const privateKeyString : string = await getPrivateKey();
    const privateKey : KeyLike = await importPKCS8(privateKeyString, alg);

    // Return signed json web token to send to AtomicSDK for authentication
    return await new SignJWT({sub: id})
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(privateKey);
};

export { generateToken };