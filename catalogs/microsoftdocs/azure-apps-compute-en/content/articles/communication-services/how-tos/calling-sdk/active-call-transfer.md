---
title: Active Call Transfer
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services SDKs to transfer active calls between clients.
author: probableprime
ms.author: dmceachern
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 10/03/2025
ms.custom: template-how-to

#Customer intent: As a developer, I want to learn how to transfer calls between devices so that users have the option to transfer calls to their other devices while in a call.
---

# Active Call Transfer


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> Preview APIs and SDKs are provided without a service-level agreement. We recommend that you don't use them for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


During an active call, you may want to transfer the call to device that you are signed in on. Let's learn how. 

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md)


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




## Active Call Management
Active Call Transfer is a feature of the `CallAgent` on its `feature` API. This guide talks about how you can manage and track any ongoing calls for your users and how to transfer their client to that active call.

> **Note:** 
> This feature is also enabled for the `TeamsCallAgent` as this feature is supported for Teams users as well. This feature is not supported for [Teams Phone Extensibility](../../quickstarts/tpe/teams-phone-extensibility-quickstart.md) users.

This guide assumes you went through the QuickStart or that you implemented an application that is able to make and receive calls. If you didn't complete the getting starting guide, refer to our [Quickstart](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

### Create CallAgentFeature for Active Call Transfer

The first thing you need to do when setting up Active Call Transfer is you need to create the `CallAgentFeature` for it. Creating this feature does the setup needed to start using the underlying APIs for the functionality of Active Call Transfer. It also holds all the functions and events for Active Call Transfer. 

```js
const activeCallTransferFeature = callAgent.feature(ActiveCallTransfer);
```

### Fetch your Active Calls

After you create the feature API, there is a method that you can use to fetch the ongoing calls `getActiveCallDetails`. The response returns the active calls, or active meetings that your users are in.

```js
const activeCallTransferFeature = callAgent.feature(ActiveCallTransfer);
const activeCallDetails = await activeCallTransferFeature.getActiveCallDetails();
```

The function `getActiveCallDetails` is a way that you can manually query for this data. Once you have the active call details, you can use it to switch the client to any of the calls that were found. If there are ongoing calls this returns an array of `ActiveCallDetails` and `ActiveMeetingDetails`. To be considered in an active call the user can also be in a call that is on hold. This function returns `undefined` if there is no active call ongoing for your user. Best practice is to use `getActiveCallDetails` to fetch any ongoing calls when you first sign into the `CallAgent` to pick up on any calls that are already ongoing.

### Switch your Active Call

Once you have your active call data, you can switch the client over to the new call. This call switching behavior can be done with the `activeCallTransfer` function. Here you can also pass in your `joinCallOptions` to choose the [device configuration](manage-video.md) of the joining client.

> **Note:** 
> When transferring a client that is already in a call to a different call it is important to make sure you put the ongoing call for the client on hold before initiating the transfer.

```js
const joinCallOptions = {
    audioOptions: { isMuted: false },
    videoOptions: { localVideoStreams: [yourLocalVideoStream]}
}
const activeCallTransferFeature = callAgent.feature(ActiveCallTransfer);
const activeCallDetails = await activeCallTransferFeature.getActiveCallDetails();
const call = await activeCallTransferFeature.activeCallTransfer(activeCallDetails[0], {isTransfer: true, joinCallOptions});
```

This function returns the call object for your applications state.

### Companion mode

When transferring the active call to your client, you can just bring the client into the call without hanging up on the device that initiated the call the user is in.

```js
const activeCallTransferFeature = callAgent.feature(ActiveCallTransfer);
const activeCallDetails = await activeCallTransferFeature.getActiveCallDetails();
const call = await activeCallTransferFeature.activeCallTransfer(activeCallDetails[0], { isTransfer: false }); // <-- isTransfer: false - does not remove the original client. 
```

### Subscribe to Active Call Notification events

There are two new events that you can subscribe to so you can receive events notifying you of your user joining a call on another client. The first event `"activeCallsUpdated"` notifies the application that the user is in a call on another device. Since the feature needs to be initialized to get these events best practice is to manually fetch the active calls after creating the `CallAgent` with `getActiveCallDetails`. The third case where this event fires is when a call ends for the user but they are still in another call. In all of the cases the event fires it returns an array of `ActiveCallDetails` and `ActiveMeetingDetails` representing the calls that the user is in. 

```js
const activeCallTransferFeature = callAgent.feature(ActiveCallTransfer);
activeCallTransferFeature.on("activeCallsUpdated", (args) => {
    // show UI indicating that the user is in another call on another device
    await activeCallTransferFeature.activeCallTransfer(args.activeCallDetails[0], { isTransfer: true });
});
```
The second event `"NoActiveCalls"` notifies the application that the user is no longer in an active call anywhere else. This event is to be used to hide any UI indicating that they are in a call elsewhere, and any controls to manually transfer the call over.

```js
const activeCallTransferFeature = callAgent.feature(ActiveCallTransfer);
activeCallTransferFeature.on("NoActiveCalls", () => {
    // hide UI indicating that the user is in a call elsewhere
});
```








## Next steps
- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
- [Learn how to record calls](record-calls.md)
- [Learn how to transcribe calls](call-transcription.md)
