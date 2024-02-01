# Atomic WebSDK Boilerplate App
## About
This boilerplate app can be used as a template to quickly integrate the AtomicSDK into existing React apps. It gives examples of three different ways to display your streams - the launcher, vertical standalone container, and a single card view. It also shows how to customise and style your stream containers, and add additional configuration like using runtime variables.

In this demo, each view is linked to the same stream so they will all display the same cards. For an example of how to render multiple containers with independent streams, please see the `multiple-containers` branch.

<img width="1728" alt="demo" src="https://github.com/atomic-app/boilerplate-web-sdk/assets/83641601/6d8472f2-6ac1-43a1-904a-91b1200b5444">

## Getting Started
After forking the repository, you must install the dependencies using:
```bash
npm install
```

### Authentication
This app uses JWT for authentication to communicate with the Atomic Platform. Run the following command to generate a public/private key pair for authentication:

```bash
npm generate-keys
```
The generated keys will be stored in the `src/keys` directory. Once this is done, open the `jwtRS512.key.pub` file and copy the generated public key. This key can be used to create a new API key in the Workbench.

You can read about this more in depth at [SDK Authentication](https://documentation.atomic.io/sdks/auth-SDK).

### Configuration
You will also need to add your own values to the configuration constants found in `src/config/configAtomicSDK.ts`. These can be retrieved from the Atomic Workbench.

<img width="620" alt="config-values" src="https://github.com/atomic-app/boilerplate-web-sdk/assets/83641601/117800e5-fc55-483e-8fa4-542edb9d8284">

Run the app using:
```bash
npm  start
```

### Runtime Variables
Runtime variables allow for more personalised messages in your cards and are resolved at runtime rather than when the card is created. After following the setup guide in the main branch, you can configure your runtime variables.

Navigate to `src/App.tsx` and modify the name of the given runtime variable in `SDKConfiguration` to match what is configured in your Workbench and the value to equal what you would like displayed.

If you do not want to include a runtime variable, you can remove the `onRunitimeVariablesRequested` parameter.

## Troubleshooting
If you are not seeing any cards displayed, ensure the stream you sent your card to is linked to the stream container ID configured in the app.


For more information, read the [Atomic Web SDK Documentation](https://documentation.atomic.io/sdks/web).
