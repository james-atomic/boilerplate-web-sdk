import * as jose from 'jose'

// Read and return the private key from it's generated file
const getPrivateKey = async (): Promise<string> => {
    try {
        const response = await fetch('/jwtRS512.key');
        return await response.text();
    } catch (error) {
        console.error("There was an issue reading the private key.", error);
        throw error;
    }
};

const generateToken = async (): Promise<string> => {
    const alg = 'RS512';
    const id = 'ABC'; // User's unique identifier. Do not include sensitive information.

    const privateKeyString = await getPrivateKey(); // Read private key
    const privateKey = await jose.importPKCS8(privateKeyString, alg); // Incorrect because mine is PEM not PKCS8?

    return await new jose.SignJWT({sub: id})
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setIssuer('urn:example:issuer') // ??
        .setAudience('urn:example:audience') // ??
        .setExpirationTime('7d')
        .sign(privateKey);
};

export { generateToken };