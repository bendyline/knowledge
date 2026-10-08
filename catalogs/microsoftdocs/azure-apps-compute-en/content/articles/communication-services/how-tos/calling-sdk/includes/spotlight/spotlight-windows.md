---
author: cnwankwo
ms.service: azure-communication-services
ms.topic: include
ms.date: 06/15/2025
ms.author: cnwankwo
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


## Implement spotlight

Spotlight is an extended feature of the core `Call` API. You first need to import calling features from the Calling SDK.

```csharp
using Azure.Communication.Calling.WindowsClient;
```

Then you can get the feature API object from the call instance.

```csharp
private SpotlightCallFeature spotlightCallFeature;
spotlightCallFeature = call.Features.Spotlight;
```

### Start spotlight for participants

Any participant in the call or meeting can be pinned. Only Microsoft 365 users who have an organizer, co-organizer or presenter role can start spotlight for other participants. This action is idempotent, trying to start spotlight on a pinned participant does nothing

To use this feature, a list of participants identifiers is required

```csharp
List<CallIdentifier> spotlightIdentifiers= new List<CallIdentifier>();
spotlightIdentifiers.Add("USER_ID");
spotlightIdentifiers.Add("USER_ID");
spotlightCallFeature.StartSpotlightAsync(spotlightIdentifiers);
```

### Remove spotlight from participants

Any pinned participant in the call or meeting can be unpinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can unpin other participants. This action is idempotent, trying to stop spotlight on an unpinned participant does nothing.

You need a list of participants identifiers to use this feature.

```csharp
List<CallIdentifier> spotlightIdentifiers= new List<CallIdentifier>();
spotlightIdentifiers.Add("USER_ID");
spotlightIdentifiers.Add("USER_ID");
spotlightCallFeature.StopSpotlightAsync(spotlightIdentifiers);
```

### Remove all spotlights

All pinned participants can be unpinned using this operation. Only `MicrosoftTeamsUserIdentifier` users who have an organizer, co-organizer, or presenter role can unpin all participants.

```csharp
spotlightCallFeature.StopAllSpotlightAsync();
```

### Handle changed states

Spotlight mode enables you to subscribe to `SpotlightChanged` events. A `SpotlightChanged` event comes from a call instance and contains information about newly spotlighted participants and participants whose spotlight stopped. The returned array `SpotlightedParticipant` is sorted by the order the participants were spotlighted.

To get information about all participants with spotlight state changes on the current call, use the following code.

```csharp
// event : { added: SpotlightedParticipant[]; removed: SpotlightedParticipant[] }
// SpotlightedParticipant = { identifier: CommunicationIdentifier }
// where: 
//  identifier: ID of participant whose spotlight state is changed
private void OnSpotlightChange(object sender, SpotlightChangedEventArgs args)
{
    foreach (SpotlightedParticipant rh in args.added)
    {
        Trace.WriteLine("Added ===========> " + rh.Identifier.RawId);
    }
    foreach (SpotlightedParticipant rh in args.removed)
    {
        Trace.WriteLine("Removed =========> " + rh.Identifier.RawId);
    }
}
spotlightCallFeature.SpotlightChanged += OnSpotlightChange;
```

### Get all spotlighted participants

To get information about all participants that have spotlight state on the current call, use the following operation. The returned array is sorted by the order the participants were spotlighted.

``` csharp
List<SpotlightedParticipant> currentSpotlightedParticipants = spotlightCallFeature.SpotlightedParticipants();
foreach (SpotlightedParticipant participant in currentSpotlightedParticipants)
{
    Trace.WriteLine("Participant " + participant.Identifier.RawId + " has spotlight");
}
```

### Get the maximum supported spotlight participants

Use the following operation to get the maximum number of participants that can be spotlighted using the Calling SDK.

``` csharp
spotlightCallFeature.MaxSupported();
```
