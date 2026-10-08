---
author: cnwankwo
ms.service: azure-communication-services
ms.topic: include
ms.date: 07/17/2024
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




## Implement Together Mode

Together Mode is an extended feature of the core `Call` API. You first need to import calling Features from the Calling SDK:

```js
import { Features} from "@azure/communication-calling";
```

Then you can get the Together Mode API object from the call instance:

```js
const togetherModeFeature = call.feature(Features.TogetherMode);
```

### Receive events when Together Mode stream starts or updates

You can subscribe to the event `togetherModeStreamsUpdated` to receive notifications when Together Mode starts or updates. The event contains information about rendering the added video stream. 

```js
// event : { added: TogetherModeVideoStream[]; removed: TogetherModeVideoStream[] }
togetherModeFeature.on('togetherModeStreamsUpdated', (event) => {
    event.added.forEach(async stream => {
        // stream can be rendered as a remote video stream
    });
});
```

### Get Together Mode stream

You can access Together Mode streams through the property `togetherModeStream`.

```js
const togetherModeStreams = togetherModeFeature.togetherModeStream;
```

| Together Mode Stream Properties | Description |
| --- | --- |
| `id` | Unique number used to identify the stream. |
| `mediaStreamType` | Returns the Together Mode stream type. The value of `mediaStreamType` is always `video`. |
| `isReceiving` | Returns a Boolean value indicating if video packets are received. |
| `size` | Returns the Together Mode `StreamSize` with information about the width and height of the stream in pixels. |

### Start Together Mode for all participants

Microsoft 365 users with role organizer, co-organizer, or presenter can start Together Mode for everyone in the meeting. When Together Mode starts, all subscribers to the `togetherModeStreamsUpdated` event receive notification that enables participants to render Together Mode.

```js
togetherModeFeature.start();
```
### End Together Mode

Together Mode automatically terminates for all participants if no video stream is detected from any participant for a duration of one minute. There's no API to end Together Mode.

### Get coordinates of participants in Together Mode

The property `togetherModeSeatingMap` provides coordinates for individual participants in the stream. Developers can use these coordinates to overlay participant info such as display name or visual features like spotlight, hand raised, and reactions on the stream. 

```js
// returns Map<string, TogetherModeSeatingPosition>
// where the  key is the participant ID
// and value of type TogetherModeSeatingPosition is the position relative to the sceneSize
// TogetherModeSeatingPosition {
//   top: number;
//   left: number;
//   width: number;
//   height: number;
// }
const seatingMap = togetherModeFeature.togetherModeSeatingMap;
```

### Manage scene size

The `sceneSize` property specifies the dimensions (width and height) of the HTML container that houses the `togetherMode` video stream. The seating positions of participants are calculated based on the dimensions of the scene size. If scene size isn't provided, the calculation defaults to a width of 1,280 pixels and a height of 720 pixels.

```js
const togetherModeContainerSize = { width: 500, height: 500 };

// To set the scene size
togetherModeFeature.sceneSize = togetherModeContainerSize;

// To get the scene size
console.log(`Current scene has the following size: ${JSON.stringify(togetherModeFeature.sceneSize )}`)
```

### Receive events when scene or seatings updates
> **Note:**
> Only Microsoft 365 users with role organizer, co-organizer, or presenter can change scene or assignment of participants in Together Mode. These changes can only be made from the Teams Client. 

If there's a scene change or seating change, the `togetherModeSceneUpdated` or `togetherModeSeatingUpdated` events are raised respectively, providing an updated calculation of the participant seating positions.

```js
const seatUpdate = (participantSeatingMap) => {
    participantSeatingMap.forEach((participantID, seatingCoordinates) => {
        console.log(`User with ID: ${participantID} has new coordinates ${JSON.stringify(seatingCoordinates)} `)
    })
}

togetherModeFeature.on('togetherModeSceneUpdated', seatUpdate);
togetherModeFeature.on('togetherModeSeatingUpdated', seatUpdate);
```

## Troubleshooting
| Code | Subcode | Result Category | Reason | Resolution |
| --- | --- | --- | --- | --- |
| 403 | 46303 | ExpectedError | The participant’s role doesn’t have the necessary permissions to call the `togetherMode` start API. | Only Microsoft 365 users with role organizer, co-organizer, or presenter can start Together Mode. You can check the role of a user via `role` property on instance of `Call` class. |
| 403 | 46304 | ExpectedError | Together Mode started in an unsupported calling scenario. | Ensure Together Mode is started only in group call or meeting scenarios. |
| 403 | 46306 | ExpectedError | Together Mode `start` API called by an Azure Communication Services user. | Only Microsoft 365 users with role organizer, co-organizer, or presenter can start Together Mode. |
