---
author: tinaharter
ms.service: azure-communication-services
ms.topic: include
ms.date: 06/15/2023
ms.author: tinaharter
---
>**Important:**
> The examples here are available in [1.15.1-beta.1](https://www.npmjs.com/package/@azure/communication-calling/v/1.15.1-beta.1) of the Calling SDK for JavaScript. Be sure to use that version or newer when you're trying this quickstart.

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




Object `Lobby` on `Call` or `TeamsCall` class allow users to access Teams meeting lobby information. It includes the APIs, `admit`, `reject` and `admitAll`, which allows user to admit and reject participants from Teams meeting lobby. User could also get the `participants` collection and subscribe the `lobbyParticipantsUpdated` event to receive notification.

### Get lobby object
The first thing is to get the `Call` or `TeamsCall` object of admitter: [Learn how to join Teams meeting](../../teams-interoperability.md). 
You can get the `Lobby` object from `Call` or `TeamsCall` object.
```js
const lobby = call.lobby;
```

### Get lobby participants properties
To know who is in the lobby, you could get the `participants` collection from `Lobby` object. It's a collection of `RemoteParticipant` object with `InLobby` state. To get the `participants` collection:

```js
let lobbyParticipants = lobby.participants; // [remoteParticipant, remoteParticipant....]
```

### Get identifier for a remote participant
Before admit or reject participant from lobby, you could get the identifier for a remote participant:
```js
if(lobbyParticipants.length !== 0){
    let remoteParticipant = lobbyParticipants[0];
}
//You could get the identifier from the Lobby.participants collection
//You could also get the identifier from the lobbyParticipantsUpdated event
const identifier = remoteParticipant.identifier;
```

The `identifier` can be one of the following `CommunicationIdentifier` types:

- `{ communicationUserId: '<COMMUNICATION_SERVICES_USER_ID'> }`: Object representing the Azure Communication Services user.
- `{ phoneNumber: '<PHONE_NUMBER>' }`: Object representing the phone number in E.164 format.
- `{ microsoftTeamsUserId: '<MICROSOFT_TEAMS_USER_ID>', isAnonymous?: boolean; cloud?: "public" | "dod" | "gcch" }`: Object representing the Teams user.
- `{ id: string }`: object representing identifier that doesn't fit any of the other identifier types

### Admit, reject and admitAll participant from lobby
To admit, reject or admit all users from the lobby, you can use the `admit`, `reject` and `admitAll` methods. 
They're the async APIs, to verify results can be used `lobbyParticipantsUpdated` listeners.

You can admit or reject from lobby by calling the method `admit` and `reject`. The method accepts identifiers `MicrosoftTeamsUserIdentifier`, `CommunicationUserIdentifier`, `PhoneNumberIdentifier` or `UnknownIdentifier` as input. You can also admit all users from the lobby by calling the method `admitAll`. 
```js
//admit
await lobby.admit(identifier);
//reject
await lobby.reject(identifier);
//admitAll
await lobby.admitAll();
```

### Handle lobby updated event
You could subscribe to the `lobbyParticipantsUpdated` event to handle the changes in the `participants` collection. This event will be triggered when the participants are added or removed from the lobby and it will provide the added or removed participants list.
```js
subscribeToCall = (call) => {
    try {
        //Subscribe to lobby's 'lobbyParticipantsUpdated' event for lobbyParticipants update.
        call.lobby.on('lobbyParticipantsUpdated', lobbyParticipantsUpdatedHandler);
    } catch (error) {
        console.error(error);
    }
}

const lobbyParticipantsUpdatedHandler = (event) => {
    event.added.forEach(remoteParticipant => {
        console.log(`${remoteParticipant._displayName} joins the lobby`);
    });
    event.removed.forEach(remoteParticipant => {
        console.log(`${remoteParticipant._displayName} leaves the lobby`);
    })
};
```
[Learn more about events and subscription ](../../events.md)
