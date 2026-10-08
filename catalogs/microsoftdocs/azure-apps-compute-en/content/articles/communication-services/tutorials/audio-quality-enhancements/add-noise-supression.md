---
title: Enable audio noise suppression improvements
titleSuffix: An Azure Communication Services article
description: This article describes how to add audio effects in your calls using Azure Communication Services.
author: sloanster

ms.author: micahvivion
ms.date: 06/27/2025
ms.topic: tutorial
ms.service: azure-communication-services
ms.subservice: calling
ms.custom: mode-other
zone_pivot_groups: acs-plat-web-ios-android-windows
---

# Enable audio noise suppression improvements


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to add audio effects in your calls using Azure Communication Services.

**Applies to: platform-web**


The Azure Communication Services audio effects features can significantly enhance your audio calls by filtering out unwanted background noise and removing echo. Noise suppression works by identifying and eliminating distracting sounds like traffic, typing, or chatter, making conversations clearer and easier to follow. At the same time, echo removal ensures your voice doesn’t bounce back during the call, reducing feedback and preventing interruptions. These technologies not only improve speech clarity but also reduce listener fatigue—especially in noisy environments. For instance, if you're on an Azure Communication Services WebJS call in a busy coffee shop, enabling these audio effects can create a smoother, more focused communication experience.

## 🎧 What Are Audio Effects?
Audio effects in ACS are real-time enhancements applied to microphone input during a call. The Azure Communications Services audio effects package has multiple abilities to remove unwanted sounds from a call (from a client perspective).

**Noise suppression** (sometimes called noise reduction) focuses on eliminating unwanted background sounds. Think typing sounds, fan hums, distant conversations, or street noise. Its job is to isolate your voice so that whoever is listening hears you more clearly, and reduce or remove the distracting background sounds. It uses algorithms trained to recognize the difference between your speech and ambient noise, then reduces or removes that noise in real time. These noises can  be considered a sound that isn't human voice.
Key traits that noise suppression enables:
- Removes continuous or predictable background noises.
- Enhance speech clarity.
- Typically works on the speaker’s end before sending out the audio.

**Echo cancellation** removes echo caused when your microphone picks up audio from your speakers. For example, when someone is on speakerphone and their microphone picks up your voice from their speaker, it can loop back to you as an echo. Echo cancellation predicts and subtracts this returning sound so you don’t hear yourself talking back a fraction of a second later.
Key traits for echo cancellation:
- Reduces acoustic feedback.
- Essential in open microphone and desktop setups where the microphone picks up audio output from a local speaker.
- Reduces listener fatigue and confusion caused by hearing your own voice returned.

## Use audio effects: Install the calling effects npm package

> **Important:**
> **Noise Suppression** features are available in GA WebJS SDK version `1.28.4` or later, alongside the Azure Communication Services Calling Effects SDK version GA `1.1.2` or later. Alternatively, if you opt to use the public preview version, Calling SDK versions `1.24.2-beta.1` and later also support noise suppression.

> **Important:**
> **Echo Cancellation** features are available in GA WebJS SDK version [1.38.1](https://github.com/Azure/Communication/blob/master/releasenotes/acs-javascript-calling-library-release-notes.md#1381-2025-09-02) or later. Also note that to use echo cancellation you must use the audio effects SDK version GA version [1.31.1](https://www.npmjs.com/package/@azure/communication-calling-effects/v/1.3.1) or later. Alternatively, if you opt to use the public preview version, Calling SDK versions [1.38.1-beta.1](https://github.com/Azure/Communication/blob/master/releasenotes/acs-javascript-calling-library-release-notes.md#1381-beta1-2025-07-21) and later also support noise suppression.

> **Note:**
> - Utilizing audio effects is available only on Chrome and Edge desktop browsers.
> - The audio effects library isn't a standalone module and can't function independently. To utilize its capabilities the effects package must be integrated with the Azure Communication Services Calling client library for WebJS.
> - If you use the GA version of the Calling SDK, you must use the [GA version](https://www.npmjs.com/package/@azure/communication-calling-effects/v/latest) of the Calling audio effects package.
> - If you use the public preview version of the Calling SDK, you must use the [public preview version](https://www.npmjs.com/package/@azure/communication-calling-effects/v/latest) of the Calling audio effects package.

## Install the Audio Effects Package
Use the `npm install` command to install the Azure Communication Services Audio Effects SDK for JavaScript.

```console
@azure/communication-calling-effects/v/latest
```

If you use the **public preview** of the Calling SDK, you must use the [beta version](https://www.npmjs.com/package/@azure/communication-calling-effects/v/next) of the Calling Effects SDK. Use the `npm install` command to install the Azure Communication Services Audio Effects SDK for JavaScript.

```console 
@azure/communication-calling-effects/v/next
```

## Enable Audio Effects you wish to use
The following is a tree-structured representation of the AudioEffects interface:
```
AudioEffectsFeature
├── Properties
│   ├── activeEffects: ActiveAudioEffects (read-only)
│   └── name: string (inherited from AudioStreamFeature)
│
├── Methods
│   ├── isSupported(effect: "BrowserNoiseSuppression" | DeepNoiseSuppressionEffect): Promise<boolean>
│   ├── startEffects(config: AudioEffectsStartConfig): Promise<void>
│   ├── stopEffects(config: AudioEffectsStopConfig): Promise<void>
│   ├── on(event: "effectsStarted" | "effectsStopped" | "effectsError", listener: AudioEffectsFeatureListener): void
│   └── off(event: "effectsStarted" | "effectsStopped" | "effectsError", listener: AudioEffectsFeatureListener): void
│
└── Inherited Methods (from AudioStreamFeature)
    └── dispose(): void
```
Where
- `activeEffects` gives you the currently running audio effects.
- `isSupported` checks if a specific effect is available in the current environment.
- `startEffects` and `stopEffects` control the activation of effects (noise suppression, echo cancellation)
- `on`/`off` let you subscribe/unsubscribe to events

For more information on the interface that details audio effects properties and methods, see the [Audio Effects Feature interface](https://learn.microsoft.com/javascript/api/azure-communication-services/@azure/communication-calling/audioeffectsfeature?view=azure-communication-services-js\&preserve-view=true) API documentation page.


### Initialize the Audio Effects Feature
To use audio effects within the Azure Communication Services Calling SDK, you need the `LocalAudioStream` property that's currently in the call. You need access to the `AudioEffects` API of the `LocalAudioStream` property to start and stop audio effects.

### Enable Noise Suppression
The following code snippet shows an example on how to enable **noise suppression** from within the WebJS environment.
```js
import * as AzureCommunicationCallingSDK from '@azure/communication-calling'; 
import { DeepNoiseSuppressionEffect } from '@azure/communication-calling-effects'; 

// Get LocalAudioStream from the localAudioStream collection on the call object.
// 'call' here represents the call object.
const localAudioStreamInCall = call.localAudioStreams[0];

// Get the audio effects feature API from LocalAudioStream
const audioEffectsFeatureApi = localAudioStreamInCall.feature(AzureCommunicationCallingSDK.Features.AudioEffects);

// Subscribe to useful events that show audio effects status
audioEffectsFeatureApi.on('effectsStarted', (activeEffects: ActiveAudioEffects) => {
    console.log(`Current status audio effects: ${activeEffects}`);
});


audioEffectsFeatureApi.on('effectsStopped', (activeEffects: ActiveAudioEffects) => {
    console.log(`Current status audio effects: ${activeEffects}`);
});

audioEffectsFeatureApi.on('effectsError', (error: AudioEffectErrorPayload) => {
    console.log(`Error with audio effects: ${error.message}`);
});

// Start Communication Services Noise Suppression
await audioEffectsFeatureApi.startEffects({
    noiseSuppression: deepNoiseSuppression
});
```
### Enable Echo Cancellation
The following code snippet shows an example on how to enable **echo cancellation** from within the WebJS environment.
```js
import * as AzureCommunicationCallingSDK from '@azure/communication-calling'; 
import { EchoCancellationEffect } from '@azure/communication-calling-effects';

// Create the noise suppression instance 
const echoCancellationEffect = new EchoCancellationEffect();

// Get LocalAudioStream from the localAudioStream collection on the call object
// 'call' here represents the call object.
const localAudioStreamInCall = call.localAudioStreams[0];

// Get the audio effects feature API from LocalAudioStream
const audioEffectsFeatureApi = localAudioStreamInCall.feature(AzureCommunicationCallingSDK.Features.AudioEffects);

// Start Communication Services echo cancellation
await audioEffectsFeatureApi.startEffects({
    echoCancellation: echoCancellationEffect
}); 

```
### Validate that the current browser environment supports audio effects
We recommend that you check support for the effect in the current browser environment by using the `isSupported` method on the feature API. Remember that audio effects are only supported on desktop browsers for Chrome and Edge.
```js

const deepNoiseSuppression = new DeepNoiseSuppressionEffect();
const echoCancellationEffect = new EchoCancellationEffect();

const isEchoCancellationSupported = await audioEffectsFeatureApi.isSupported(echoCancellationEffect);
if (isEchoCancellationSupported) {
    console.log('Echo Cancellation is supported in the current browser environment');
}

const isNoiseSuppressionSupported = await audioEffectsFeatureApi.isSupported(deepNoiseSuppression);
if (isNoiseSuppressionSupported) {
    console.log('Noise Suppression is supported in the current browser environment');
}
```

## Bring it all together: Load and start noise suppression and echo cancellation  
To initiate a call with both **noise suppression** and **echo cancellation** enabled, create a new `LocalAudioStream` property using `AudioDeviceInfo`. Ensure that the `LocalAudioStream` source isn't set as a raw `MediaStream` property to support audio effects. Then, include this property within `CallStartOptions.audioOptions` when starting the call.

```js
import { EchoCancellationEffect, DeepNoiseSuppressionEffect } from '@azure/communication-calling-effects';

// Create the noise suppression instance 
const deepNoiseSuppression = new DeepNoiseSuppressionEffect();
// Create the noise suppression instance 
const echoCancellationEffect = new EchoCancellationEffect();

// Get LocalAudioStream from the localAudioStream collection on the call object
// 'call' here represents the call object.
const localAudioStreamInCall = call.localAudioStreams[0];

// Get the audio effects feature API from LocalAudioStream
const audioEffectsFeatureApi = localAudioStreamInCall.feature(AzureCommunicationCallingSDK.Features.AudioEffects);

// To start Communication Services Deep Noise Suppression
await audioEffectsFeatureApi.startEffects({
    echoCancellation: echoCancellationEffect,
    noiseSuppression: deepNoiseSuppression
}); 
```

## Turn on noise suppression during an ongoing call
You might start a call and not have noise suppression turned on. The end users room might get noisy so that they would need to turn on noise suppression. To turn on noise suppression, you can use the `audioEffectsFeatureApi.startEffects` interface.

```js
// Create the noise suppression instance 
const deepNoiseSuppression = new DeepNoiseSuppressionEffect();

// Get LocalAudioStream from the localAudioStream collection on the call object
// 'call' here represents the call object.
const localAudioStreamInCall = call.localAudioStreams[0];

// Get the audio effects feature API from LocalAudioStream
const audioEffectsFeatureApi = localAudioStreamInCall.feature(AzureCommunicationCallingSDK.Features.AudioEffects);

// We recommend that you check support for the effect in the current environment by using the isSupported method on the feature API. Remember that noise suppression is only supported on desktop browsers for Chrome and Edge.
const isDeepNoiseSuppressionSupported = await audioEffectsFeatureApi.isSupported(deepNoiseSuppression);
if (isDeepNoiseSuppressionSupported) {
    console.log('Noise suppression is supported in the current browser environment');
}

// To start Communication Services Deep Noise Suppression
await audioEffectsFeatureApi.startEffects({
    noiseSuppression: deepNoiseSuppression
});

// To stop Communication Services Deep Noise Suppression
await audioEffectsFeatureApi.stopEffects({
    noiseSuppression: true
});
```
### To start or stop audio effects packages during an active  call
You might start a call and not have noise suppression turned on. The end users room might get noisy so that they would need to turn on noise suppression. To turn on noise suppression, you can use the `audioEffectsFeatureApi.startEffects` API.

#### To start Azure Communication Services  Noise Suppression
```js
await audioEffectsFeatureApi.startEffects({
    noiseSuppression: deepNoiseSuppression
});
```

#### To stop Azure Communication Services Deep Noise Suppression
```js
await audioEffectsFeatureApi.stopEffects({
    noiseSuppression: true
});
```

#### To start Azure Communication Services echo cancellation
```js
await audioEffectsFeatureApi.startEffects({
    noiseSuppression: echoCancellation
});
```

#### To stop Azure Communication Services echo cancellation
```js
await audioEffectsFeatureApi.stopEffects({
    echoCancellation: true
});
```

## Check what audio effects are active
To check what noise suppression effects are currently active, you can use the `activeEffects` property. The `activeEffects` property returns an object with the names of the current active effects. See [here](https://learn.microsoft.com/javascript/api/azure-communication-services/@azure/communication-calling/activeaudioeffects?view=azure-communication-services-js\&preserve-view=true) for more details on the `activeEffects` interface.

```js
import { EchoCancellationEffect, DeepNoiseSuppressionEffect } from '@azure/communication-calling-effects';
// Get LocalAudioStream from the localAudioStream collection on the call object.
// 'call' here represents the call object.
const localAudioStreamInCall = call.localAudioStreams[0];

// Get the audio effects feature API from LocalAudioStream
const audioEffectsFeatureApi = localAudioStreamInCall.feature(AzureCommunicationCallingSDK.Features.AudioEffects);

// Get the current active effects
const activeAudioEffects = audioEffectsFeatureApi.activeEffects;

if (activeAudioEffects.noiseSuppression === 'DeepNoiseSuppression') {
    // Deep Noise Suppression is currently active
}
if (activeAudioEffects.echoCancellation === 'EchoCancellation') {
    // Echo Cancellation is currently active
}
;
```
## Best Practices
The Azure Communication Services WebJS audio effects package provides tools for reducing unwanted sounds. Other measures can be taken to improve audio quality, such as:
- Encouraging end users to consider using headphones to minimize the need for echo cancellation.
- Enabling noise suppression tin shared or open work environments.
- Setting noise suppression as the default option (i.e., having audio effects activated when a user initiates a call). If this feature is enabled automatically at the start of calls, users don't have to activate it manually. Enabling noise suppression and echo cancellation by default may help mitigate audio issues during calls.
- Test audio effects in different environments to optimize end user experience.

## Related content

See the [Audio Effects Feature interface](https://learn.microsoft.com/javascript/api/azure-communication-services/@azure/communication-calling/audioeffectsfeature?view=azure-communication-services-js\&preserve-view=true) documentation page for extended API feature details.



**Applies to: platform-android**



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

Music mode is a filter that's available before and during a call. To learn more about music mode, see [Music mode on Native Calling SDK](../../concepts/voice-video-calling/music-mode.md). Music mode works only on native platforms over one-on-one or group calls. It doesn't work in one-to-one calls between native platforms and the web. By default, music mode is disabled.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Azure Communication Services resource. [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).


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

The `createCallAgent` method takes `CommunicationUserCredential` as an argument, which encapsulates an [access token](../../quickstarts/identity/access-tokens.md).

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



**Applies to: platform-ios**



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

Music mode is a filter that's available before and during a call. To learn more about music mode, see [Music mode on Native Calling SDK](../../concepts/voice-video-calling/music-mode.md). Music mode works only on native platforms over one-on-one or group calls. It doesn't work in one-to-one calls between native platforms and the web. By default, music mode is disabled.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Azure Communication Services resource. [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).


## Set up your system

Follow these steps to set up your system.

### Create the Xcode project

In Xcode, create a new iOS project and select the **Single View App** template. This article uses the [SwiftUI framework](https://developer.apple.com/xcode/swiftui/), so you should set **Language** to **Swift** and set **Interface** to **SwiftUI**.

You're not going to create tests in this article. Feel free to clear the **Include Tests** checkbox.

Screenshot that shows the window for creating a project within Xcode.

### Install the package and dependencies by using CocoaPods

1. Create a Podfile for your application, like this example:

    ```
    platform :ios, '13.0'
    use_frameworks!
    target 'AzureCommunicationCallingSample' do
        pod 'AzureCommunicationCalling', '~> 1.0.0'
    end
    ```

1. Run `pod install`.

1. Open `.xcworkspace` by using Xcode.

### Request access to the microphone

To access the device's microphone, you need to update your app's information property list by using `NSMicrophoneUsageDescription`. Set the associated value to a string that's included in the dialog that the system uses to request access from the user.

Right-click the **Info.plist** entry of the project tree, and then select **Open As** > **Source Code**. Add the following lines in the top-level `<dict>` section, and then save the file.

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Need microphone access for VOIP calling.</string>
```

### Set up the app framework

Open your project's `ContentView.swift` file. Add an `import` declaration to the top of the file to import the `AzureCommunicationCalling` library. In addition, import `AVFoundation`. You need it for audio permission requests in the code.

```swift
import AzureCommunicationCalling
import AVFoundation
```

### Initialize CallAgent

To create a `CallAgent` instance from `CallClient`, you have to use a `callClient.createCallAgent` method that asynchronously returns a `CallAgent` object after it's initialized.

To create a call client, pass a `CommunicationTokenCredential` object:

```swift
import AzureCommunication

let tokenString = "token_string"
var userCredential: CommunicationTokenCredential?
do {
    let options = CommunicationTokenRefreshOptions(initialToken: token, refreshProactively: true, tokenRefresher: self.fetchTokenSync)
    userCredential = try CommunicationTokenCredential(withOptions: options)
} catch {
    updates("Couldn't created Credential object", false)
    initializationDispatchGroup!.leave()
    return
}

// tokenProvider needs to be implemented by Contoso, which fetches a new token
public func fetchTokenSync(then onCompletion: TokenRefreshOnCompletion) {
    let newToken = self.tokenProvider!.fetchNewToken()
    onCompletion(newToken, nil)
}
```

Pass the `CommunicationTokenCredential` object that you created to `CallClient`, and set the display name:

```swift
self.callClient = CallClient()
let callAgentOptions = CallAgentOptions()
options.displayName = " iOS Azure Communication Services User"

self.callClient!.createCallAgent(userCredential: userCredential!,
    options: callAgentOptions) { (callAgent, error) in
        if error == nil {
            print("Create agent succeeded")
            self.callAgent = callAgent
        } else {
            print("Create agent failed")
        }
})
```


You can use the audio filter feature to apply different audio preprocessing options to outgoing audio. The two types of audio filters are `OutgoingAudioFilters` and `LiveOutgoingAudioFilters`. Use `OutgoingAudioFilters` to change settings before the call starts. Use `LiveOutgoingAudioFilters` to change settings while a call is in progress.

You first need to import the Calling SDK:

```swift
import AzureCommunicationCalling
```

## Before the call starts

You can apply `OutgoingAudioFilters` when a call starts.

Begin by creating an `OutgoingAudioFilters` property and passing it into `OutgoingAudioOptions`, as shown here:

```swift
let outgoingAudioOptions = OutgoingAudioOptions()
let filters = OutgoingAudioFilters()
filters.NoiseSuppressionMode = NoiseSuppressionMode.high
filters.analogAutomaticGainControlEnabled = true
filters.digitalAutomaticGainControlEnabled = true
filters.musicModeEnabled = true
filters.acousticEchoCancellationEnabled = true
outgoingAudioOptions.audioFilters = filters
```

## During the call

You can apply `LiveOutgoingAudioFilters` after a call begins. You can retrieve this object from the call object during the call. To change the setting in `LiveOutgoingAudioFilters`, set the members inside the class to a valid value and they're applied.

Only a subset of the filters available from `OutgoingAudioFilters` are available during an active call. They're music mode, echo cancellation, and noise suppression mode.

```swift
LiveOutgoingAudioFilters filters = call.liveOutgoingAudioFilters
filters.musicModeEnabled = true
filters.acousticEchoCancellationEnabled = true
filters.NoiseSuppressionMode = NoiseSuppressionMode.high
```



**Applies to: platform-windows**



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

Music mode is a filter that's available before and during a call. To learn more about music mode, see [Music mode on Native Calling SDK](../../concepts/voice-video-calling/music-mode.md). Music mode works only on native platforms over one-on-one or group calls. It doesn't work in one-to-one calls between native platforms and the web. By default, music mode is disabled.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A deployed Azure Communication Services resource. [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md).
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

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
