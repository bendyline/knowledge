---
title: Display name changed
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services SDK to subscript events that participants' display name change
author: fuyan
ms.author: fuyan
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 05/06/2025
ms.custom: template-how-to

#Customer intent: As a developer, I want to learn how to subscribe events that participants' display name change using SDK.
---

# Display name changed


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how you can subscribe the Teams participants' display name changed events showing the old, new values, and the reason of the name change.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the article [Add voice calling to your app](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

## Support

The following tables define support for display name change during Teams interop call/meeting in Azure Communication Services.

### Identities and call types

The following table shows display name change support for specific call types and identities. 

| Identities | Teams meeting | Room | 1:1 call | Group call | 1:1 Teams interop call | Group Teams interop call |
| --- | --- | --- | --- | --- | --- | --- |
| Communication Services user | ✔️ |  |  |  |  |  |
| Microsoft 365 user | ✔️ |  |  |  |  |  |

### Operations

The following table shows support for individual APIs in the Calling SDK related to individual identity types. The display name change feature only supports these operations in Teams meetings.

| Operations | Communication Services user | Microsoft 365 user |
| --- | --- | --- |
| Check if Teams participant has display name changed | ✔️ | ✔️ |
| Get notification that Teams participant display name changed | ✔️ | ✔️ |


### SDK

The following tables show support for the display name change in individual Azure Communication Services SDK.

| Support status | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Is Supported | ✔️ |  |  |  |  |  |  |


## Install the SDK

Use the `npm install` command to install the Azure Communication Services Common and Calling SDK for JavaScript:

```console
npm install @azure/communication-common --save
npm install @azure/communication-calling --save
```

## Initialize required objects

A `CallClient` instance is required for most call operations. When you create a new `CallClient` instance, you can configure it with custom options like a `Logger` instance.

With the `CallClient` instance, you can create a `CallAgent` instance by calling the `createCallAgent`. This method asynchronously returns a `CallAgent` instance object.

The `createCallAgent` method uses `CommunicationTokenCredential` as an argument. It accepts a [user access token](../../quickstarts/identity/access-tokens.md).

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




## Implement display name change

`DisplayNameChanged` is an `event` and `hasDisplayNameChanged` is a property of the class `RemoteParticipant`. You can get remote participants on `Call` object `remoteParticipants` property from the Calling SDK:

```js
const remoteParticipants = call.remoteParticipants;
```

### Check if remote participant has display name change

To check if display name changed, use the `hasDisplayNameChanged` property of the class `RemoteParticipant` . 

```js
// check if remoteParticipant has display name changed
const hasDisplayNameChanged = remoteParticipant.hasDisplayNameChanged;
```

### Get notification that displays name changed

Use the `PropertyChangedEventWithArgs` listener to subscribe the display name change event

```js
// get notification of a remote participant display name changed
remoteParticipant.on('displayNameChanged', (args: {newValue?: string, oldValue?: string, reason?: DisplayNameChangedReason}) => {
    console.log(`Display name changed from ${oldValue} to ${newValue} due to ${reason}`);
});
```

## SDK compatibility

The following table shows the minimum version of SDK that supports individual APIs.

| Operations | Web | Web UI | iOS | iOS UI | Android | Android UI | Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| hasDisplayNameChanged property | 1.34.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| DisplayNameChanged event | 1.34.1 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |





## Next steps
- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)

## Related articles

To do, add Teams client doc here.
