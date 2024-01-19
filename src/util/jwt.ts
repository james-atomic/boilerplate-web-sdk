import * as jose from 'jose'

// Read and return the private key from it's generated file
const getPrivateKey = async (): Promise<string> => {
    try {
        const response = await fetch("/jwtRS512.key");
        const keyResult = await response.text();
        console.log(keyResult);
        return keyResult;
    } catch (error) {
        console.error("There was an issue reading the private key.", error);
        throw error;
    }
};

const generateToken = async (): Promise<string> => {
    const alg : string = 'RS512';
    const id : string = ''; // User's unique identifier. Do not include sensitive information.

    // Read private key and convert to KeyLike format for signing.
    const privateKeyString : string = await getPrivateKey();
    const privateKey : jose.KeyLike = await jose.importPKCS8(privateKeyString, alg);

    return await new jose.SignJWT({sub: id})
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(privateKey);
};

export { generateToken };