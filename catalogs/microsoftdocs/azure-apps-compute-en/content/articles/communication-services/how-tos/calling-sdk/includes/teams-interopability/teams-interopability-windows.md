---
author: jiyoonlee
ms.service: azure-communication-services
ms.topic: include
ms.date: 05/14/2024
ms.author: jiyoonlee
---
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
