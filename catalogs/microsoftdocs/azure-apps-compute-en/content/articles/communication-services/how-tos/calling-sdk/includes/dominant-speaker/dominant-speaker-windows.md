---
author: jsaurezlee-msft
ms.service: azure-communication-services
ms.topic: article
ms.date: 06/15/2025
ms.author: jsaurezlee
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


Dominant Speakers is an extended feature of the core Call object that enables the user to monitor the most dominant speakers in the current call. Participants can join and leave the list based on how they're performing in the call.

When joined to a group call consisting of multiple participants, the calling SDKs identify which meeting participants are currently speaking. Active speakers identify which participants are being heard in each received audio frame. Dominant speakers identify which participants are currently most active or dominant in the group conversation, though their voice isn't necessarily heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking, video subscription requests based on dominant speaker logic can be implemented. 

As participants join, leave, climb up or down in this list of participants, the client application can take this information and customize the call experience accordingly. For example, the client application can show the most dominant speakers in the call in a different UI to separate from the ones that aren't participating actively in the call.

Developers can receive updates and obtain information about the most Dominant Speakers in a call.

This information is being a represented as:
- An ordered list of the Remote Participants that represents the Dominant Speakers in the call.
- A timestamp marking the date when this list was last modified.


To use the Dominant Speakers call feature for Windows, the first step is to obtain the Dominant Speakers object:

```csharp
DominantSpeakersCallFeature dominantSpeakersFeature = call.Features.DominantSpeakers;
```

The Dominant Speakers feature object has the following structure:

- `OnDominantSpeakersChanged`: Event for listening for changes in the dominant speakers list.
- `DominantSpeakersInfo`: Gets the `DominantSpeakersInfo` object. This object has:
    - `Speakers`: A list of participant identifiers representing the dominant speakers list.
    - `LastUpdatedAt`: The date when the dominant speakers list was updated. 

To subscribe to changes in the dominant speakers list:

```csharp
// Obtain the extended feature object from the call object.
DominantSpeakersFeature dominantSpeakersFeature = call.Features.DominantSpeakers;
// Subscribe to the OnDominantSpeakersChanged event.
dominantSpeakersFeature.OnDominantSpeakersChanged += DominantSpeakersFeature__OnDominantSpeakersChanged;

private void DominantSpeakersFeature__OnDominantSpeakersChanged(object sender, PropertyChangedEventArgs args) {
  // When the list changes, get the timestamp of the last change and the current list of Dominant Speakers
  DominantSpeakersInfo dominantSpeakersInfo = dominantSpeakersFeature.DominantSpeakersInfo;
  DateTimeOffset date = dominantSpeakersInfo.LastUpdatedAt;
  IReadOnlyList<ICommunicationIdentifier> speakersList = dominantSpeakersInfo.Speakers;
}
```
