---
author: ruslanzdor
ms.service: azure-communication-services
ms.topic: include
ms.date: 06/15/2025
ms.author: sundraman
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


The Raise Hand feature enables participants in a call to indicate that they have a question, comment, or concern without interrupting the speaker or other participants. You can use this feature in any call type, including 1:1 calls and calls with many participants, in Azure Communication Service and in Teams calls.

First you need to import calling Features from the Calling SDK:

```csharp
using Azure.Communication.Calling.WindowsClient;
```

Then you can get the feature API object from the call instance:

```csharp
private RaiseHandCallFeature raiseHandCallFeature;

raiseHandCallFeature = (RaiseHandCallFeature)call.GetCallFeatureExtension(CallFeatureType.RaiseHand);
```

### Raise and lower hand for current participant

To change the Raise Hand state for the current participant, you can use the `raiseHand()` and `lowerHand()` methods.

These methods are async. To verify results, use `RaisedHandReceived` and `LoweredhandReceived` listeners.

```csharp
//publish raise hand state for local participant
raiseHandCallFeature.RaiseHandAsync();

//remove raise hand state for local participant
raiseHandCallFeature.LowerHandAsync();

```

### Lower hands for other participants

The lower hand for other participants feature enables users with the Organizer and Presenter roles to lower all hands for other participants on Teams calls. In Azure Communication calls, you can't change the state of other participants unless you add their roles first.

To use this feature, implement the following code:

```csharp

// remove raise hand states for all participants on the call
raiseHandCallFeature.LowerAllHandsAsync();

// remove raise hand states for all remote participants on the call
var participants = call.RemoteParticipants;
var identifiers = participants.Select(p => p.Identifier).ToList().AsReadOnly();
raiseHandCallFeature.LowerHandsAsync(identifiers);

// remove raise hand state of specific user
var identifiers = new List<CallIdentifier>();
identifiers.Add(new UserCallIdentifier("USER_ID"));
raiseHandCallFeature.LowerHandsAsync(identifiers);
```

### Handle changed states

With the Raise Hand API, you can subscribe to the `RaisedHandReceived` and `LoweredHandReceived` events to handle changes in the state of participants on a call. The call instance triggers these events and provides information about the participant whose state changed.

To subscribe to these events, use the following code:

```swift
raiseHandCallFeature = (RaiseHandCallFeature)call.GetCallFeatureExtension(CallFeatureType.RaiseHand);
raiseHandCallFeature.RaisedHandReceived += OnRaisedHandChange;
raiseHandCallFeature.LoweredHandReceived += OnLoweredHandChange;

private async void OnRaisedHandChange(object sender, RaisedHandChangedEventArgs args)
{
    Trace.WriteLine("RaiseHandEvent: participant " + args.Identifier + " is raised hand");
}

private async void OnLoweredHandChange(object sender, RaisedHandChangedEventArgs args)
{
    Trace.WriteLine("RaiseHandEvent: participant " + args.Identifier + " is lowered hand");
}
```

The `RaisedHandReceived` and `LoweredHandReceived` events contain an object with the `identifier` property, which represents the participant's communication identifier. In the preceding example, we log a message to the console indicating that a participant raised their hand.

To unsubscribe from the events, you can use the `off` method.


### List of all participants with active state

To get information about all participants with raised hand state on current call, you can use `getRaisedHands`. The returned array is sorted by the order field.

Here's an example of how to use `RaisedHands`:

```swift
raiseHandCallFeature = (RaiseHandCallFeature)call.GetCallFeatureExtension(CallFeatureType.RaiseHand);
foreach (RaiseHand rh in raiseHandCallFeature.RaisedHands.ToList())
{
    Trace.WriteLine("Participant " + rh.Identifier.RawId + " has raised hand ");
}
```

### Order of raised Hands

The `RaisedHands` variable contains an array of participant objects, where each object has the following properties:

- `identifier`: the communication identifier of the participant.
- `order`: the order in which the participant raised their hand.

You can use this information to display a list of participants with the Raise Hand state and their order in the queue.
