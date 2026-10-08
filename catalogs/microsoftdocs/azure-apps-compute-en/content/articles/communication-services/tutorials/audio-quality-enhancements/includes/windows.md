---
title: Enable audio noise suppression improvements
titleSuffix: An Azure Communication Services article
description: This article describes how to add audio effects in your calls using Azure Communication Services.
author: t-leejiyoon
ms.date: 06/27/2025
ms.author: t-leejiyoon
services: azure-communication-services
ms.topic: include
ms.service: azure-communication-services
ms.subservice: calling
---


## Configure audio filters with the Native Calling SDKs 

The Azure Communication Services audio effects offer filters that can improve your audio call. For native platforms (Android, iOS, and Windows), you can configure the following filters.

### Echo cancellation

You can eliminate acoustic echo caused by the caller's voice echoing back into the microphone after being emitted from the speaker. Echo cancellation ensures clear communication.

You can configure the filter before and during a call. You can toggle echo cancellation only if music mode is enabled. By default, this filter is enabled.

### Noise suppression

You can improve audio quality by filtering out unwanted background noises such as typing, air conditioning, or street sounds. This technology ensures that the voice is crisp and clear to facilitate more effective communication.

You can configure the filter before and during a call. The currently available modes are **Off**, **Auto**, **Low**, and **High**. By default, this feature is set to **High**.

### Automatic gain control

You can automatically adjust the microphone's volume to ensure consistent audio levels throughout the call.

- Analog automatic gain control is a filter that's available only before a call. By default, this filter is enabled.
- Digital automatic gain control is a filter that's available only before a call. By default, this filter is enabled.

### Music mode

Music mode is a filter that's available before and during a call. To learn more about music mode, see [Music mode on Native Calling SDK](../../../concepts/voice-video-calling/music-mode.md). Music mode works only on native platforms over one-on-one or group calls. It doesn't work in one-to-one calls between native platforms and the web. By default, music mode is disabled.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Azure Communication Services resource. [Create an Azure Communication Services resource](../../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../../quickstarts/voice-video-calling/getting-started-with-calling.md).

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


You can use the audio filter feature to apply different audio preprocessing to outgoing audio. The two types of audio filters are `OutgoingAudioFilters` and `LiveOutgoingAudioFilters`. Use `OutgoingAudioFilters` to change settings before the call starts. Use `LiveOutgoingAudioFilters` to change settings while a call is in progress.

You first need to import the Calling SDK:

```csharp
using Azure.Communication;
using Azure.Communication.Calling.WindowsClient;
```

## Before a call starts

You can apply `OutgoingAudioFilters` when a call starts.

Begin by creating a `OutgoingAudioFilters` property and passing it into `OutgoingAudioOptions`, as shown in the following code:

```csharp
var outgoingAudioOptions = new OutgoingAudioOptions();
var filters = new OutgoingAudioFilters()
{
    AnalogAutomaticGainControlEnabled = true,
    DigitalAutomaticGainControlEnabled = true,
    MusicModeEnabled = true,
    AcousticEchoCancellationEnabled = true,
    NoiseSuppressionMode = NoiseSuppressionMode.High
};
outgoingAudioOptions.Filters = filters;
```

## During the call

You can apply `LiveOutgoingAudioFilters` after a call begins. You can retrieve this object from the call object after the call begins. To change the setting in `LiveOutgoingAudioFilters`, set the members inside the class to a valid value and they're applied.

Only a subset of the filters available from `OutgoingAudioFilters` are available during an active call. They're music mode, echo cancellation, and noise suppression mode.

```csharp
LiveOutgoingAudioFilters filter = call.LiveOutgoingAudioFilters;
filter.MusicModeEnabled = true;
filter.AcousticEchoCancellationEnabled = true;
filter.NoiseSuppressionMode = NoiseSuppressionMode.Auto;
```
