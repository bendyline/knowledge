---
author: DaybreakQuip
ms.service: azure-communication-services
ms.topic: include
ms.date: 06/20/2025
ms.author: zehangzheng
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


The ability to view capabilities is an extended feature of the core `Call` API. It enables you to obtain the capabilities of the local participant in the current call.

The feature enables you to register for an event listener to listen for capability changes.

To use the Capabilities call feature for Windows, the first step is to obtain the Capabilities feature API object:

## Get the capabilities feature

```C#
private CapabilitiesCallFeature capabilitiesCallFeature;
capabilitiesCallFeature = call.Features.Capabilities;
```

## Get the capabilities of the local participant

The capabilities object has the capabilities of the local participants and is of type `ParticipantCapability`. Properties of capabilities include:

- *isAllowed* indicates if a capability can be used.
- *reason* indicates capability resolution reason.

```C#
var capabilities = capabilitiesCallFeature.Capabilities;
```

## Subscribe to `capabilitiesChanged` event

```C#
capabilitiesCallFeature.CapabilitiesChanged += Call__OnCapabilitiesChangedAsync;

private async void Call__OnCapabilitiesChangedAsync(object sender, CapabilitiesChangedEventArgs args)
{
    Trace.WriteLine(args.Reason.ToString());
    foreach (var capability in args.ChangedCapabilities)
    {
        //Prints out capability kind and resolution reason in console
        Trace.WriteLine(capability.Kind.ToString() + " is " + capability.Reason.ToString());
    }
}
```

## Capabilities Exposed

- *TurnVideoOn*: Ability to turn on video
- *UnmuteMicrophone*: Ability to unmute microphone
- *ShareScreen*: Ability to share screen
- *RemoveParticipant*: Ability to remove a participant
- *HangUpForEveryone*: Ability to hang up for everyone
- *AddCommunicationUser*: Ability to add a communication user
- *AddTeamsUser*: Ability to add Teams User
- *AddPhoneNumber*: Ability to add phone number
- *ManageLobby*: Ability to manage lobby
- *SpotlightParticipant*: Ability to spotlight Participant
- *RemoveParticipantSpotlight*: Ability to remove Participant spotlight
- *BlurBackground*: Ability to blur background
- *CustomBackground*: Ability to apply a custom background
- *StartLiveCaptions*: Ability to start live captions
- *RaiseHand*: Ability to raise hand
- *MuteOthers*: Ability to soft mute remote participants in the meeting
