---
author: jsaurezlee-msft
ms.service: azure-communication-services
ms.topic: include
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


Call transcription is an extended feature of the core `Call` object. You first need to obtain the transcription feature object:

```csharp
TranscriptionCallFeature transcriptionFeature = call.Features.Transcription;
```

Then, to check if the call is being transcribed, inspect the `IsTranscriptionActive` property of `transcriptionFeature`. It returns `boolean`.

```csharp
boolean isTranscriptionActive = transcriptionFeature.isTranscriptionActive;
```

You can also subscribe to changes in transcription:

```csharp
private async void Call__OnIsTranscriptionActiveChanged(object sender, PropertyChangedEventArgs args)
    boolean isTranscriptionActive = transcriptionFeature.IsTranscriptionActive();
}

transcriptionFeature.IsTranscriptionActiveChanged += Call__OnIsTranscriptionActiveChanged;
```
## Explicit Consent

> **Note:**
> This API is provided as a preview for developers and might change based on feedback that we receive. Don't use this API in a production environment. To use this API, use the beta release of the Azure Communication Services Calling Windows SDK.

When your Teams meeting or call is configured to require explicit consent for recording or transcription, you're required to gather explicit consent from your users to permit users to be transcribed or recorded. You can provide consent proactively when joining the meeting or reactively when the recording or transcription starts. Until explicit consent is given, participants' audio, video, and screen sharing is disabled during transcription.

You can check if the meeting transcription requires explicit consent by property `isTeamsConsentRequired`. If the value is set to `true`, then explicit consent is required for the `call`.

```csharp
boolean isTranscriptionConsentRequired = transcriptionFeature.isTeamsConsentRequired;
```

If you already obtained the user's consent for transcription, you can call the `grantTeamsConsent()` method to indicate explicit consent to the service. This consent is valid for one `call` session only and users need to provide consent again if they rejoin the meeting.

```csharp
transcriptionFeature.grantTeamsConsent();
```
Attempts to enable audio, video, or screen sharing fail when transcription is active, explicit consent is required but isn't yet given. You can recognize this situation by checking property `reason` of class `ParticipantCapabilities` for [capabilities](../../capabilities.md) `turnVideoOn`, `unmuteMic`, and `shareScreen`. You can find those [capabilities](../../capabilities.md) in the feature `call.feature(Features.Capabilities)`. Those [capabilities](../../capabilities.md) would return reason `ExplicitConsentRequired` as users need to provide explicit consent.
