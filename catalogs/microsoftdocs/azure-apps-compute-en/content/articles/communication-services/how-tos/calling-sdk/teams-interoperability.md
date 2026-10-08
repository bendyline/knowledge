---
title: Join a Teams meeting
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services SDKs to join a Teams meeting.
author: sundiraman
ms.author: sundraman
ms.service: azure-communication-services
ms.subservice: teams-interop
ms.topic: how-to 
ms.date: 08/10/2021
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android-windows

#Customer intent: As a developer, I want to join a Teams meeting.
---

# Join a teams meeting


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Azure Communication Services SDKs can allow your users to join regular Microsoft Teams meetings. Here's how!

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md)

**Applies to: platform-web**

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




## Meeting join methods
To join a Teams meeting, use the `join` method and pass a meeting link or a meeting's coordinates.

Join by using a meeting link:

```js
const locator = { meetingLink: '<MEETING_LINK>'}
const call = callAgent.join(locator);
```

Join by using meeting coordinates (this is currently in limited preview):

```js
const locator = {
    threadId: <thread id>,
    organizerId: <organizer id>,
    tenantId: <tenant id>,
    messageId: <message id>
}
const call = callAgent.join(locator);
```


**Applies to: platform-android**

## Set up your system

Follow these steps to set up your system.

### Create the Visual Studio project

For a Universal Windows Platform app, in Visual Studio 2022, create a new **Blank App (Universal Windows)** project. After you enter the project name, feel free to choose any Windows SDK later than 10.0.17763.0.

For a WinUI 3 app, create a new project with the **Blank App, Packaged (WinUI 3 in Desktop)** template to set up a single-page WinUI 3 app. [Windows App SDK version 1.3](https://learn.microsoft.com/windows/apps/windows-app-sdk/stable-channel#version-13) or later is required.

### Install the package and dependencies by using NuGet Package Manager

The Calling SDK APIs and libraries are publicly available via a NuGet package.

To find, download, and install the Calling SDK NuGet package:

1. Open NuGet Package Manager by selecting **Tools** > **NuGet Package Manager** > **Manage NuGet Packages for Solution**.
1. Select **Browse**, and then enter **Azure.Communication.Calling.WindowsClient** in the search box.
1. Make sure that the **Include prerelease** checkbox is selected.
1. Select the **Azure.Communication.Calling.WindowsClient** package, and then select **Azure.Communication.Calling.WindowsClient** [1.4.0-beta.1](https://www.nuget.org/packages/Azure.Communication.Calling.WindowsClient/1.4.0-beta.1) or a newer version.
1. Select the checkbox that corresponds to the Azure Communication Services project on the right pane.
1. Select **Install**.


## Meeting join methods
To join a Teams meeting, use the `CallAgent.join` method and pass application context, `JoinMeetingLocator`, and `JoinCallOptions`.

### Meeting ID and passcode
The `TeamsMeetingIdLocator` locates a meeting using a meeting ID and passcode. These can be found under a Teams meeting's join info.
A Teams meeting ID will be 12 characters long and will consist of numeric digits grouped in threes (i.e. `000 000 000 000`).
A passcode will consist of 6 alphabet characters (i.e. `aBcDeF`). The passcode is case sensitive.

```java
String meetingId, passcode; 
TeamsMeetingIdLocator locator = new TeamsMeetingIdLocator(meetingId, passcode);
```

### Meeting link
The `TeamsMeetingLinkLocator` locates a meeting using a link to a Teams meeting. This can found under a Teams meeting's join info. 
```java
String meetingLink; 
TeamsMeetingLinkLocator locator = new TeamsMeetingLinkLocator(meetingLink);
```

### Meeting coordinates 
The `TeamsMeetingCoordinatesLocator` locates meetings using an organizer ID, tenant ID, thread ID, and a message ID. This information can be found using Microsoft Graph.
```java
Guid organizerId, tenantId;
String threadId, messageId;
TeamsMeetingCoordinatesLocator locator = new TeamsMeetingCoordinatesLocator(threadId, organizerId, tenantId, messageId);
```

## Join meeting using locators
After creating these Teams meeting locators, you can use it to join a Teams meeting using `CallAgent.join` as shown below.

```java
JoinCallOptions options = new JoinCallOptions();
call = agent.join(
        getApplicationContext(),
        locator,
        options);
```


**Applies to: platform-ios**

## Set up your system

Follow these steps to set up your system.

### Create the Visual Studio project

For a Universal Windows Platform app, in Visual Studio 2022, create a new **Blank App (Universal Windows)** project. After you enter the project name, feel free to choose any Windows SDK later than 10.0.17763.0.

For a WinUI 3 app, create a new project with the **Blank App, Packaged (WinUI 3 in Desktop)** template to set up a single-page WinUI 3 app. [Windows App SDK version 1.3](https://learn.microsoft.com/windows/apps/windows-app-sdk/stable-channel#version-13) or later is required.

### Install the package and dependencies by using NuGet Package Manager

The Calling SDK APIs and libraries are publicly available via a NuGet package.

To find, download, and install the Calling SDK NuGet package:

1. Open NuGet Package Manager by selecting **Tools** > **NuGet Package Manager** > **Manage NuGet Packages for Solution**.
1. Select **Browse**, and then enter **Azure.Communication.Calling.WindowsClient** in the search box.
1. Make sure that the **Include prerelease** checkbox is selected.
1. Select the **Azure.Communication.Calling.WindowsClient** package, and then select **Azure.Communication.Calling.WindowsClient** [1.4.0-beta.1](https://www.nuget.org/packages/Azure.Communication.Calling.WindowsClient/1.4.0-beta.1) or a newer version.
1. Select the checkbox that corresponds to the Azure Communication Services project on the right pane.
1. Select **Install**.


## Meeting join methods
To join a Teams meeting, use the `CallAgent.join` method and pass a `JoinMeetingLocator` and a `JoinCallOptions`.

### Meeting ID and passcode
The `TeamsMeetingIdLocator` locates a meeting using a meeting ID and passcode. These can be found under a Teams meeting's join info.
A Teams meeting ID will be 12 characters long and will consist of numeric digits grouped in threes (i.e. `000 000 000 000`).
A passcode will consist of 6 alphabet characters (i.e. `aBcDeF`). The passcode is case sensitive.

```swift
String meetingId, passcode
let locator = TeamsMeetingIdLocator(meetingId: meetingId, passcode: passcode)
```

### Meeting link
The `TeamsMeetingLinkLocator` locates a meeting using a link to a Teams meeting. This can found under a Teams meeting's join info. 
```swift
String meetingLink
let locator = TeamsMeetingLinkLocator(meetingLink: meetingLink)
```

## Join meeting using locators
After creating these Teams meeting locators, you can use it to join a Teams meeting using `CallAgent.join` as shown below.

```swift
func joinTeamsMeeting() {
    // Ask permissions
    AVAudioSession.sharedInstance().requestRecordPermission { (granted) in
        if granted {
            let joinCallOptions = JoinCallOptions()
            
            // Insert meeting locator code for specific join methods here

            // for CallAgent callAgent
            self.callAgent?.join(with: teamsMeetingLinkLocator, joinCallOptions: joinCallOptions) 
        }
    }
}
```


**Applies to: platform-windows**

## Set up your system

Follow these steps to set up your system.

### Create the Visual Studio project

For a Universal Windows Platform app, in Visual Studio 2022, create a new **Blank App (Universal Windows)** project. After you enter the project name, feel free to choose any Windows SDK later than 10.0.17763.0.

For a WinUI 3 app, create a new project with the **Blank App, Packaged (WinUI 3 in Desktop)** template to set up a single-page WinUI 3 app. [Windows App SDK version 1.3](https://learn.microsoft.com/windows/apps/windows-app-sdk/stable-channel#version-13) or later is required.

### Install the package and dependencies by using NuGet Package Manager

The Calling SDK APIs and libraries are publicly available via a NuGet package.

To find, download, and install the Calling SDK NuGet package:

1. Open NuGet Package Manager by selecting **Tools** > **NuGet Package Manager** > **Manage NuGet Packages for Solution**.
1. Select **Browse**, and then enter **Azure.Communication.Calling.WindowsClient** in the search box.
1. Make sure that the **Include prerelease** checkbox is selected.
1. Select the **Azure.Communication.Calling.WindowsClient** package, and then select **Azure.Communication.Calling.WindowsClient** [1.4.0-beta.1](https://www.nuget.org/packages/Azure.Communication.Calling.WindowsClient/1.4.0-beta.1) or a newer version.
1. Select the checkbox that corresponds to the Azure Communication Services project on the right pane.
1. Select **Install**.


## Meeting join methods
To join a Teams meeting, use the `CallAgent.JoinAsync` method and pass a `JoinMeetingLocator` and a `JoinCallOptions`.

### Meeting ID and passcode
The `TeamsMeetingIdLocator` locates a meeting using a meeting ID and passcode. These can be found under a Teams meeting's join info.
A Teams meeting ID will be 12 characters long and will consist of numeric digits grouped in threes (i.e. `000 000 000 000`).
A passcode will consist of 6 alphabet characters (i.e. `aBcDeF`). The passcode is case sensitive.

```cs
string meetingId, passcode; 
TeamsMeetingIdLocator locator = new TeamsMeetingIdLocator(meetingId, passcode);
```

### Meeting link
The `TeamsMeetingLinkLocator` locates a meeting using a link to a Teams meeting. This can found under a Teams meeting's join info. 
```cs
string meetingLink; 
TeamsMeetingLinkLocator locator = new TeamsMeetingLinkLocator(meetingLink);
```

### Meeting coordinates 
The `TeamsMeetingCoordinatesLocator` locates meetings using an organizer ID, tenant ID, thread ID, and a message ID. This information can be found using Microsoft Graph.
```cs
Guid organizerId, tenantId;
string threadId, messageId;
TeamsMeetingCoordinatesLocator locator = new TeamsMeetingCoordinatesLocator(threadId, organizerId, tenantId, messageId);
```

## Join meeting using locators
After creating these Teams meeting locators, you can use it to join a Teams meeting using `CallAgent.JoinAsync` as shown below.
```cs
var joinCallOptions = new JoinCallOptions() {
        OutgoingAudioOptions = new OutgoingAudioOptions() { IsMuted = true },
        OutgoingVideoOptions = new OutgoingVideoOptions() { Streams = new OutgoingVideoStream[] { cameraStream } }
    };
var call = await callAgent.JoinAsync(locator, joinCallOptions);
```


## Next steps
- [Learn how to manage calls](manage-calls.md)
- [Learn how to manage video](manage-video.md)
- [Learn how to transfer calls](transfer-calls.md)
