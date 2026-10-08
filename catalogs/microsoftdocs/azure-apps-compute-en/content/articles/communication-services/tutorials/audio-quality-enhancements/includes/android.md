---
title: Enable audio noise suppression improvements
titleSuffix: An Azure Communication Services article
description: This article describes how to add audio effects in your calls using Azure Communication Services.
author: zehangzheng

ms.date: 06/27/2025
ms.author: zehangzheng
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


## Install the SDK

Locate your project-level `build.gradle` file and add `mavenCentral()` to the list of repositories under `buildscript` and `allprojects`:

```groovy
buildscript {
    repositories {
    ...
        mavenCentral()
    ...
    }
}
```

```groovy
allprojects {
    repositories {
    ...
        mavenCentral()
    ...
    }
}
```

Then, in your module-level `build.gradle` file, add the following lines to the `dependencies` section:

```groovy
dependencies {
    ...
    implementation 'com.azure.android:azure-communication-calling:1.0.0'
    ...
}
```

## Initialize the required objects

To create a `CallAgent` instance, you have to call the `createCallAgent` method on a `CallClient` instance. This call asynchronously returns a `CallAgent` instance object.

The `createCallAgent` method takes `CommunicationUserCredential` as an argument, which encapsulates an [access token](../../../quickstarts/identity/access-tokens.md).

To access `DeviceManager`, you must create a `callAgent` instance first. Then you can use the `CallClient.getDeviceManager` method to get `DeviceManager`.

```java
String userToken = '<user token>';
CallClient callClient = new CallClient();
CommunicationTokenCredential tokenCredential = new CommunicationTokenCredential(userToken);
android.content.Context appContext = this.getApplicationContext(); // From within an activity, for instance
CallAgent callAgent = callClient.createCallAgent(appContext, tokenCredential).get();
DeviceManager deviceManager = callClient.getDeviceManager(appContext).get();
```

To set a display name for the caller, use this alternative method:

```java
String userToken = '<user token>';
CallClient callClient = new CallClient();
CommunicationTokenCredential tokenCredential = new CommunicationTokenCredential(userToken);
android.content.Context appContext = this.getApplicationContext(); // From within an activity, for instance
CallAgentOptions callAgentOptions = new CallAgentOptions();
callAgentOptions.setDisplayName("Alice Bob");
DeviceManager deviceManager = callClient.getDeviceManager(appContext).get();
CallAgent callAgent = callClient.createCallAgent(appContext, tokenCredential, callAgentOptions).get();
```


You can use the audio filter feature to apply different audio preprocessing options to outgoing audio. The two types of audio filters are `OutgoingAudioFilters` and `LiveOutgoingAudioFilters`. Use `OutgoingAudioFilters` to change settings before the call starts. Use `LiveOutgoingAudioFilters` to change settings while a call is in progress.

You first need to import the Calling SDK and the associated classes:

```csharp
import com.azure.android.communication.calling.OutgoingAudioOptions;
import com.azure.android.communication.calling.OutgoingAudioFilters;
import com.azure.android.communication.calling.LiveOutgoingAudioFilters;
```

## Before a call starts

You can apply `OutgoingAudioFilters` when a call starts.

Begin by creating an `OutgoingAudioFilters` property and passing it into `OutgoingAudioOptions`, as shown in the following code:

```java
OutgoingAudioOptions outgoingAudioOptions = new OutgoingAudioOptions();
OutgoingAudioFilters filters = new OutgoingAudioFilters();
filters.setNoiseSuppressionMode(NoiseSuppressionMode.HIGH);
filters.setAnalogAutomaticGainControlEnabled(true);
filters.setDigitalAutomaticGainControlEnabled(true);
filters.setMusicModeEnabled(true);
filters.setAcousticEchoCancellationEnabled(true); 
outgoingAudioOptions.setAudioFilters(filters);
```

## During the call

You can apply `LiveOutgoingAudioFilters` after a call begins. You can retrieve this object from the call object during the call. To change the setting in `LiveOutgoingAudioFilters`, set the members inside the class to a valid value and they're applied.

Only a subset of the filters available from `OutgoingAudioFilters` are available during an active call. They're music mode, echo cancellation, and noise suppression mode.

```java
LiveOutgoingAudioFilters filters = call.getLiveOutgoingAudioFilters();
filters.setMusicModeEnabled(false);
filters.setAcousticEchoCancellationEnabled(false);
filters.setNoiseSuppressionMode(NoiseSuppressionMode.HIGH);
```
