---
author: elavarasidc
ms.service: azure-communication-services
ms.topic: include
ms.date: 06/20/2025
ms.author: elavarasid
---
## Install the SDK

Use the `npm install` command to install the Azure Communication Services Common and Calling SDK for JavaScript:

```console
npm install @azure/communication-common --save
npm install @azure/communication-calling --save
```

## Initialize required objects

A `CallClient` instance is required for most call operations. When you create a new `CallClient` instance, you can configure it with custom options like a `Logger` instance.

With the `CallClient` instance, you can create a `CallAgent` instance by calling the `createCallAgent`. This method asynchronously returns a `CallAgent` instance object.

The `createCallAgent` method uses `CommunicationTokenCredential` as an argument. It accepts a [user access token](../../../../quickstarts/identity/access-tokens.md).

You can use the `getDeviceManager` method on the `CallClient` instance to access `deviceManager`.

```js
const { CallClient } = require('@azure/communication-calling');
const { AzureCommunicationTokenCredential} = require('@azure/communication-common');
const { AzureLogger, setLogLevel } = require("@azure/logger");

// Set the logger's log level
setLogLevel('verbose');

// Redirect log output to console, file, buffer, REST API, or whatever location you want
AzureLogger.log = (...args) => {
    console.log(...args); // Redirect log output to console
};

const userToken = '<USER_TOKEN>';
callClient = new CallClient(options);
const tokenCredential = new AzureCommunicationTokenCredential(userToken);
const callAgent = await callClient.createCallAgent(tokenCredential, {displayName: 'optional Azure Communication Services user name'});
const deviceManager = await callClient.getDeviceManager()
```

### Manage SDK connectivity to Microsoft infrastructure

The `Call Agent` instance helps you manage calls (to join or start calls). In order to work your calling SDK needs to connect to Microsoft infrastructure to get notifications of incoming calls and coordinate other call details. Your `Call Agent` has two possible states:

**Connected** - A `Call Agent` connectionStatue value of `Connected` means the client SDK is connected and capable of receiving notifications from Microsoft infrastructure.

**Disconnected** - A `Call Agent` connectionStatue value of `Disconnected` states there's an issue that is preventing the SDK it from properly connecting. `Call Agent` should be re-created.
- `invalidToken`: If a token is expired or is invalid `Call Agent` instance disconnects with this error.
- `connectionIssue`:  If there's an issue with the client connecting to Microsoft infrastructure, after many retries `Call Agent` exposes the `connectionIssue` error.

You can check if your local `Call Agent` is connected to Microsoft infrastructure by inspecting the current value of `connectionState` property. During an active call you can listen to the `connectionStateChanged` event to determine if `Call Agent` changes from **Connected** to **Disconnected** state.

```js
const connectionState = callAgentInstance.connectionState;
console.log(connectionState); // it may return either of 'Connected' | 'Disconnected'

const connectionStateCallback = (args) => {
    console.log(args); // it will return an object with oldState and newState, each of having a value of either of 'Connected' | 'Disconnected'
    // it will also return reason, either of 'invalidToken' | 'connectionIssue'
}
callAgentInstance.on('connectionStateChanged', connectionStateCallback);
```




The ability to view capabilities is an extended feature of the core `Call` API. It enables you to obtain the capabilities of the local participant in the current call.

The feature enables you to register for an event listener to listen for capability changes.

## Get the capabilities feature

>```js
>const capabilitiesFeature = this.call.feature(Features.Capabilities);
>```

## Get the capabilities of the local participant

The capabilities object has the capabilities of the local participants and is of type `ParticipantCapabilities`. Properties of capabilities include:

- *isPresent* indicates if a capability is present.
- *reason* indicates capability resolution reason.

```js
const capabilities =  capabilitiesFeature.capabilities;
```

**Subscribe to `capabilitiesChanged` event:**

```js
capabilitiesFeature.on('capabilitiesChanged', (capabilitiesChangeInfo) => {
    for (const [key, value] of Object.entries(capabilitiesChangeInfo.newValue)) {
        if(key === 'turnVideoOn' && value.reason != 'FeatureNotSupported') {
             (value.isPresent) ? this.setState({ canOnVideo: true }) : this.setState({ canOnVideo: false });
             continue;
        }
        if(key === 'unmuteMic' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canUnMuteMic: true }) : this.setState({ canUnMuteMic: false });
            continue;
        }
        if(key === 'shareScreen' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canShareScreen: true }) : this.setState({ canShareScreen: false });
            continue;
        }
        if(key === 'spotlightParticipant' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canSpotlight: true }) : this.setState({ canSpotlight: false });
            continue;
        }
        if(key === 'raiseHand' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canRaiseHands: true }) : this.setState({ canRaiseHands: false });
            continue;
        }
        if(key === 'muteOthers' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canMuteOthers: true }) : this.setState({ canMuteOthers: false });
            continue;
        }
        if(key === 'reaction' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canReact: true }) : this.setState({ canReact: false });
            continue;
        }
        if(key === 'forbidOthersAudio' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canForbidOthersAudio: true }) : this.setState({ canForbidOthersAudio: false });
            continue;
        }
        if(key === 'forbidOthersVideo' && value.reason != 'FeatureNotSupported') {
            (value.isPresent) ? this.setState({ canForbidOthersVideo: true }) : this.setState({ canForbidOthersVideo: false });
            continue;
        }
    }
});
```

## Capabilities Exposed

- *turnVideoOn*: Ability to turn on video
- *unmuteMic*: Ability to send audio
- *shareScreen*: Ability to share screen
- *removeParticipant*: Ability to remove a participant
- *hangUpForEveryOne*: Ability to hang up for everyone
- *addCommunicationUser*: Ability to add a communication user
- *addTeamsUser*: Ability to add Teams User
- *addPhoneNumber*: Ability to add phone number
- *manageLobby*: Ability to manage lobby (beta only)
- *spotlightParticipant*: Ability to spotlight Participant (beta only)
- *removeParticipantsSpotlight*: Ability to remove Participant spotlight (beta only)
- *startLiveCaptions*: Ability to start live captions (beta only)
- *stopLiveCaptions*: Ability to stop live captions (beta only)
- *raiseHand*: Ability to raise hand (beta only)
- *muteOthers*: Ability to soft mute remote participants in the meeting 
- *reaction*: Ability to react in the meeting (beta only)
- *viewAttendeeNames*: Ability to view attendee names in the meeting
- *forbidOthersAudio*: Ability to forbid attendees' audio in the meeting or group call
- *forbidOthersVideo*: Ability to forbid attendees' video in the meeting or group call
