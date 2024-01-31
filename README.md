# Atomic WebSDK Boilerplate App
## About
This boilerplate app can be used as a template to quickly integrate the AtomicSDK into existing React apps. The main branch is a demo using the single card view, however, there are demos using runtime variables and other views in the other branches.

## Getting Started
After forking the repository, you must install the dependencies using:
```bash
npm install
```

### Authentication
This app uses JWT for authentication to communicate with the Atomic Platform. To do this, you must generate a private/public key pair and store them in the `public` directory. They must use PKCS8 encoding.

Navigate to the `public` directory and run the following commands one-by-one in your terminal:
```bash
ssh-keygen -t rsa -P "" -b 4096 -E SHA512 -m PKCS8 -f jwtRS512.key
ssh-keygen -e -m PKCS8 -f jwtRS512.key > jwtRS512.key.pub
```
Open the `jwtRS512.key.pub` file and copy the generated public key. This key can be used to create a new API key in the Workbench.

You can read about this more in depth at [SDK Authentication](https://documentation.atomic.io/sdks/auth-SDK), however, keep in mind this documentation generates PEM format keys rather than the PKCS8 required for this app.

### Configuration
You will also need to add your own values to the configuration constants found in `src/config/configAtomicSDK.ts`. These can be retrieved from the Atomic Workbench. You will also need to include a user ID in `src/util/jwt.ts` to target a specific user for authentication.

Run the app using:
```bash
npm  start
```

## Troubleshooting
If you are not seeing any cards displayed, ensure the stream you sent your card to is linked to the stream container ID configured in the app.


For more information, read the [Atomic Web SDK Documentation](https://documentation.atomic.io/sdks/web).