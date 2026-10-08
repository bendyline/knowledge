---
author: jsaurezlee-msft
ms.service: azure-communication-services
ms.topic: article
ms.date: 06/15/2025
ms.author: jsaurezlee
---

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

The `createCallAgent` method takes `CommunicationUserCredential` as an argument, which encapsulates an [access token](../../../../quickstarts/identity/access-tokens.md).

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


Dominant Speakers is an extended feature of the core Call object that enables the user to monitor the most dominant speakers in the current call. Participants can join and leave the list based on how they're performing in the call.

When joined to a group call consisting of multiple participants, the calling SDKs identify which meeting participants are currently speaking. Active speakers identify which participants are being heard in each received audio frame. Dominant speakers identify which participants are currently most active or dominant in the group conversation, though their voice isn't necessarily heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking, video subscription requests based on dominant speaker logic can be implemented. 

As participants join, leave, climb up or down in this list of participants, the client application can take this information and customize the call experience accordingly. For example, the client application can show the most dominant speakers in the call in a different UI to separate from the ones that aren't participating actively in the call.

Developers can receive updates and obtain information about the most Dominant Speakers in a call.

This information is being a represented as:
- An ordered list of the Remote Participants that represents the Dominant Speakers in the call.
- A timestamp marking the date when this list was last modified.


To use the Dominant Speakers call feature for Android, the first step is to obtain the Dominant Speakers object:

```java
DominantSpeakersFeature dominantSpeakersFeature = call.feature(Features.DOMINANT_SPEAKERS);
```
The Dominant Speakers feature object has the following structure:

- `OnDominantSpeakersChanged`: Event for listening for changes in the dominant speakers list.
- `getDominantSpeakersInfo()`: Gets the `DominantSpeakersInfo` object. This object has:
    - `getSpeakers()`: A list of participant identifiers representing the dominant speakers list.
    - `getLastUpdatedAt()`: The date when the dominant speakers list was updated. 

To subscribe to changes in the Dominant Speakers list:

```java

// Obtain the extended feature object from the call object.
DominantSpeakersFeature dominantSpeakersFeature = call.feature(Features.DOMINANT_SPEAKERS);
// Subscribe to the OnDominantSpeakersChanged event.
dominantSpeakersFeature.addOnDominantSpeakersChangedListener(handleDominantSpeakersChangedlistener);

private void handleCallOnDominantSpeakersChanged(PropertyChangedEvent args) {
    // When the list changes, get the timestamp of the last change and the current list of Dominant Speakers
    DominantSpeakersInfo dominantSpeakersInfo = dominantSpeakersFeature.getDominantSpeakersInfo();
    Date timestamp = dominantSpeakersInfo.getLastUpdatedAt();
    List<CommunicationIdentifier> dominantSpeakers = dominantSpeakersInfo.getSpeakers();
}
```
