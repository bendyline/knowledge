---
author: cnwankwo
ms.service: azure-communication-services
ms.topic: include
ms.date: 06/15/2025
ms.author: cnwankwo
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




## Implement spotlight

Spotlight is an extended feature of the core `Call` API. You first need to import calling features from the Calling SDK.

```js
import { Features} from "@azure/communication-calling";
```

Then you can get the feature API object from the call instance.

```js
const spotLightFeature = call.feature(Features.Spotlight);
```

### Start spotlight for current participant

To pin the video of the current/local participant, use the following code. This action is idempotent, trying to start spotlight on a pinned participant does nothing.

```js
spotLightFeature.startSpotlight();
```

### Spotlight specific participants

Any participant in the call or meeting can be pinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can start spotlight for other participants. This action is idempotent, trying to start spotlight on a pinned participant does nothing.

```js
// Specify list of participants to be spotlighted
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>)
spotLightFeature.startSpotlight([acsUser, teamsUser]);
```

### Stop spotlight for current participant

To unpin the video of the current/local participant, use the following code. This action is idempotent, trying to stop spotlight on an unpinned participant does nothing.

```js
spotLightFeature.stopSpotlight();
```

### Remove spotlight from participants

Any pinned participant in the call or meeting can be unpinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can unpin other participants. This action is idempotent, trying to stop spotlight on an unpinned participant does nothing.

You need a list of participants identifiers to use this feature.

```js
// Specify list of participants to be spotlighted
CommunicationUserIdentifier acsUser = new CommunicationUserIdentifier(<USER_ID>);
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(<USER_ID>)
spotLightFeature.stopSpotlight([acsUser, teamsUser]);
```

### Remove all spotlights

All pinned participants can be unpinned using this operation. Only `MicrosoftTeamsUserIdentifier` users who have an organizer, co-organizer, or presenter role can unpin all participants.

```js
spotLightFeature.stopAllSpotLight();
```

### Handle changed states

Spotlight mode enables you to subscribe to `SpotlightChanged` events. A `SpotlightChanged` event comes from a call instance and contains information about newly spotlighted participants and participants whose spotlight stopped. The returned array `SpotlightedParticipant` is sorted by the order the participants were spotlighted.

To get information about all participants with spotlight state changes on the current call, use the following code.

```js
// event : { added: SpotlightedParticipant[]; removed: SpotlightedParticipant[] }
// SpotlightedParticipant = { identifier: CommunicationIdentifier, order?: number }
// where: 
//  identifier: ID of participant whose spotlight state is changed
//  order: sequence of the event

const spotlightChangedHandler = (event) => {
    console.log(`Newly added spotlight state ${JSON.stringify(event.added)}`);
    console.log(`Newly removed spotlight state ${JSON.stringify(event.removed)}`);
};
spotLightFeature.on('spotlightChanged', spotlightChangedHandler);
```

Use the following to stop receiving `spotlightUpdated` events.

```js
spotLightFeature.off('spotlightChanged', spotlightChangedHandler);
```

### Get List of all participants currently spotlighted

To get information about all participants that have spotlight state on current call, use the following operation. The returned array `SpotlightedParticipant` is sorted by the order the participants were spotlighted.

```js
let spotlightedParticipants = spotLightFeature.getSpotlightedParticipants();
```

### Get the maximum supported spotlight participants

Use the following operation to get the maximum number of participants that can be spotlighted using the Calling SDK.

```js
spotLightFeature.maxParticipantsToSpotlight;
```
