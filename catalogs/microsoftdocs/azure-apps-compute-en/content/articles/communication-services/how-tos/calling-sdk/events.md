---
title: Subscribe to SDK events
titleSuffix: An Azure Communication Services article
description: Use Azure Communication Services SDKs to subscribe to SDK events.
author: sundiraman
ms.author: sundraman
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 06/15/2025
ms.custom: template-how-to
zone_pivot_groups: acs-plat-web-ios-android

#Customer intent: As a developer, I want to subscribe to SDK events so that I know when things change.
---

# Subscribe to SDK events


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


We recommend subscribing to Calling SDK Events. Azure Communication Services SDKs are dynamic and contain properties that might change over time. You can subscribe to these events to be notified in advance of any changes. Follow the instructions in this article to subscribe to Azure Communication Services SDK events.

**Applies to: platform-web**


## Events on the Azure Communication Calling SDK

This section describes the events and property changes your app can subscribe to. Subscribing to those events enables your app to be informed about state change in the calling SDK and react accordingly.

Tracking events is crucial because it enables your application's state to stay synchronized with the Azure Communication Services Calling framework's state. Tracking events helps you tack changes without implementing a pull mechanism on the SDK objects.

This section assumes you went through the QuickStart or that you implemented an application that is able to make and receive calls. If you didn't complete the getting starting guide, see [Add voice calling to your app](../../quickstarts/voice-video-calling/getting-started-with-calling.md).

Each object in the JavaScript Calling SDK has `properties` and `collections`. Their values change throughout the lifetime of the object.

Use the `on()` method to subscribe to object events. Use the `off()` method to unsubscribe from object events.

### Properties

You can subscribe to the `'<property>Changed'` event to listen to value changes on the property.

### Example of subscription on a property

In this example, we subscribe to changes in the value of the `isLocalVideoStarted` property.

```javascript
call.on('isLocalVideoStartedChanged', () => {
    // At that point the value call.isLocalVideoStarted is updated
    console.log(`isLocalVideoStarted changed: ${call.isLocalVideoStarted}`);
});
```

## Collections

You can subscribe to the `\<collection>Updated` event to receive notifications about changes in an object collection. The `\<collection>Updated` event is triggered whenever elements are added to or removed from the collection you're monitoring.

- The `'<collection>Updated'` event's payload, has an `added` array that contains values that were added to the collection.
- The `'<collection>Updated'` event's payload also has a `removed` array that contains values that were removed from the collection.

### Example subscription on a collection

In this example, we subscribe to changes in values of the Call object `LocalVideoStream`.

```javascript
call.on('localVideoStreamsUpdated', updateEvent => {
    updateEvent.added.forEach(async (localVideoStream) => {
        // Contains an array of LocalVideoStream that were added to the call
        // Add a preview and start any processing if needed
        handleAddedLocalVideoStream(localVideoStream )
    });
    updateEvent.removed.forEach(localVideoStream => {
        // Contains an array of LocalVideoStream that were removed from the call
        // Remove the preview and stop any processing if needed
        handleRemovedLocalVideoStream(localVideoStream ) 
    });
});
```

<!---------- CallAgent  object ---------->
## Events on the `CallAgent` object

### Event Name: `incomingCall`

The `incomingCall` event fires when the client receives an incoming call.

**How does your application react to the event?**

Your application must notify the recipient of the incoming call. The notification prompt needs to enable the recipient to accept or refuse the call.

**Code sample:**
```javascript
callClient.on('incomingCall', (async (incomingCallEvent) => {
    try {
        // Store a reference to the call object
        incomingCall = incomingCallEvent.incomingCall; 
        // Update your UI to allow
        acceptCallButton.disabled = false; 
        callButton.disabled = true;
    } catch (error) {
        console.error(error);
    }
});
```

### Event Name: `callsUpdated`

The `callsUpdated` updated event fires when a call is removed or added to the call agent. This event happens when the user makes, receives, or terminates a call.

**How does your application react to the event?**

Your application must update its UI based on the number of active calls for the CallAgent instance.

### Event Name: `connectionStateChanged`

The `connectionStateChanged` event fired when the signaling state of the `CallAgent` is updated.

**How does your application react to the event?**

Your application must update its UI based on the new state. The possible connection state values are `Connected` and `Disconnected`.

**Code sample:**
```javascript
callClient.on('connectionStateChanged', (async (connectionStateChangedEvent) => {
    if (connectionStateChangedEvent.newState === "Connected") {
        enableCallControls() // Enable all UI element that allow user to make a call
    }

    if (connectionStateChangedEvent.newState === 'Disconnected') {
        if (typeof connectionStateChangedEvent.reason !== 'undefined') {
            alert(`Disconnected reason: ${connectionStateChangedEvent.reason}`)
        } 
        disableCallControls() // Disable all the UI element that allows the user to make a call
    }
});
```

<!---------- Call object ---------->
## Events on the `Call` object

### Event Name: `stateChanged`

The `stateChanged`  event fires when the call state changes. For example, when a call goes from `connected` to `disconnected`.

**How does your application react to the event?**

Your application must update its UI accordingly. Disabling or enabling appropriate buttons and other UI elements based on the new call state.

**Code Sample:**

```javascript
call.on('stateChanged', (async (connectionStateChangedEvent) => {
  if(call.state === 'Connected') {
      connectedLabel.hidden = false;
      acceptCallButton.disabled = true;
      startCallButton.disabled = true;
      startVideoButton.disabled = false;
      stopVideoButton.disabled = false
  } else if (call.state === 'Disconnected') {
      connectedLabel.hidden = true;
      startCallButton.disabled = false;
      console.log(`Call ended, call end reason={code=${call.callEndReason.code}, subCode=${call.callEndReason.subCode}}`);
  }
});
```

### Event: `idChanged`

The `idChanged`  event fires when the ID of a call changes. The ID of a call changes when the call moves from `connecting` state to `connected`. Once the call is connected, the ID of the call remains identical.

**How does your application react to the event?**

Your application can save the new call ID, or retrieve it from the call object later when needed.

**Code Sample:**

```javascript
let callId = "";
call.on('idChanged', (async (callIdChangedEvent) => {
  callId = call.id; // You can log it as the call ID is useful for debugging call issues
});
```

### Event: `isMutedChanged`

The `isMutedChanged` event fires when the local audio is muted or unmuted.

**How does your application react to the event?**

Your application must update the mute / unmute button to the proper state.

**Code Sample:**

```javascript
call.on('isMutedChanged', (async (isMutedChangedEvent) => {
    microphoneButton.disabled = call.isMuted;       
});
```

### Event: `isScreenSharingOnChanged`

The `isScreenSharingOnChanged` event fires when screen sharing for the local user is enabled or disabled.

**How does your application react to the event?**

Your application must show a preview and/or a warning to the user if the screen sharing is on.

If the screen sharing is off, the application must remove the preview and warning.

**Code Sample:**

```javascript
call.on('isScreenSharingOnChanged', () => {
  if (!this.call.isScreenSharing) {
      displayStartScreenSharingButton();
      hideScreenSharingWarning()
      removeScreenSharingPreview();    
  } else {
      displayScreenSharingWarning()
      displayStopScreenSharingButton();
      renderScreenSharingPreview(); 
  }
});
```

### Event: `isLocalVideoStartedChanged`

The `isLocalVideoStartedChanged` event fires when the user enabled our disabled its local video.

**How does your application react to the event?**

Your application must show a preview of the local video and enable or disable the camera activation button.

**Code Sample:**

```javascript
call.on('isLocalVideoStartedChanged', () => {
    showDisableCameraButton(call.isLocalVideoStarted);
});
```

### Event: `remoteParticipantsUpdated`

Your application must subscribe to events for each added `RemoteParticipants` and unsubscribe from events for participants that leave the call.

**How does your application react to the event?**

Your application must show a preview of the local video and enable or disable the camera activation button.

**Code Sample:**

```javascript
call.on('remoteParticipantsUpdated', (remoteParticipantsUpdatedEvent) => {
    remoteParticipantsUpdatedEvent.added.forEach(participant => {
        // handleParticipant should
        //   - subscribe to the remote participants events 
        //   - update the UI 
        handleParticipant(participant);
    });
    
    remoteParticipantsUpdatedEvent.removed.forEach(participant => {
        // removeParticipant should
        //   - unsubscribe from the remote participants events 
        //   - update the UI  
        removeParticipant(participant);
    });
});
```

### Event: `localVideoStreamsUpdated`

The `localVideoStreamsUpdated` event fires when the list of local video stream changes. These changes happen when the user starts or remove a video stream.

**How does your application react to the event?**

Your application must show previews for each of `LocalVideoStream` added. Your application must remove the preview and stop the processing for each `LocalVideoStream` removed.

**Code Sample:**

```javascript
call.on('localVideoStreamsUpdated', (localVideoStreamUpdatedEvent) => {
    localVideoStreamUpdatedEvent.added.forEach(addedLocalVideoStream => { 
        // Add a preview and start any processing if needed
        handleAddedLocalVideoStream(addedLocalVideoStream) 
    });

    localVideoStreamUpdatedEvent.removed.forEach(removedLocalVideoStream => {
         // Remove the preview and stop any processing if needed
        this.handleRemovedLocalVideoStream(removedLocalVideoStream) 
    });
});
```

### Event: `remoteAudioStreamsUpdated`

The `remoteAudioStreamsUpdated` event fires when the list of remote audio stream changes. These changes happen when remote participants add or remove audio streams to the call.

**How does your application react to the event?**

If a stream was being processed and is now removed, the processing must be stopped. On the other hand, if a stream is added then the event reception is a good place to start the processing of the new audio stream.


### Event: `totalParticipantCountChanged`

The `totalParticipantCountChanged` fires when the number of totalParticipant changed in a call.

**How does your application react to the event?**

If your application is displaying a participant counter, your application can update its participant counter when the event is received.

**Code Sample:**

```javascript
call.on('totalParticipantCountChanged', () => {
    participantCounterElement.innerText = call.totalParticipantCount;
});
```

</details>

### Event: `roleChanged`

The `roleChanged` participant fires when the localParticipant roles changes in the call. An example would be when the local participant become presenter `ACSCallParticipantRolePresenter` in a call.

**How does your application react to the event?**

Your application must enable or disable the button based on the user new role.

**Code Sample:**

```javascript
call.on('roleChanged', () => {
    this.roleElement = call.role;
});
```

### Event: `mutedByOthers`

The `mutedByOthers` event happens when the local participant mutes other participants in the call.


**How does your application react to the event?**

Your application must display a message to the user notifying that they're muted.

**Code Sample:**

```javascript
call.on('mutedByOthers', () => {
    messageBanner.innerText = "You have been muted by other participant in this call";
});
```

### Event: `callerInfoChanged`

The `callerInfoChanged` event happens when caller information was updated. This occurs when a caller changes their display name.

**How does your application react to the event?**
Application can update caller information.

**Code Sample:**

```javascript
call.on('callerInfoChanged', () => {
    showCallerInfo(call.callerInfo)
});
```

### Event: `transferorInfoChanged`

The `transferorInfoChanged` event happens when transferor information was updated. This occurs when a transferor changes their display name.

**How does your application react to the event?**
Application can update transferor information.

**Code Sample:**

```javascript
call.on('transferorInfoChanged', () => {
    showTransferorInfo(call.transferorInfo)
});
```


<!---- RemoteParticipant  ---->
## Events on the `RemoteParticipant` object

### Event: `roleChanged`

The `roleChanged` event fires when the `RemoteParticipant` role changes in the call. An example would be when the RemoteParticipant become presenter `ACSCallParticipantRolePresenter` in a call.

**How does your application react to the event?**

Your application must update its UI based on the `RemoteParticipant` new role.

**Code Sample:**

```javascript
remoteParticipant.on('roleChanged', () => {
    updateRole(remoteParticipant);
});
```

### Event: `isMutedChanged`

The `isMutedChanged` event fires when one of the `RemoteParticipant` mutes or unmute its microphone.

**How does your application react to the event?**

Your application can display an icon near by the view that displays the participant.

**Code Sample:**

```javascript
remoteParticipant.on('isMutedChanged', () => {
    updateMuteStatus(remoteParticipant); // Update the UI based on the mute state of the participant
});
```

### Event: `displayNameChanged`

The `displayNameChanged` when the name of the `RemoteParticipant` is updated.

**How does your application react to the event?**

Your application must update the name of the participant if it's being displayed in the UI.

**Code Sample:**

```javascript
remoteParticipant.on('displayNameChanged', () => {
    remoteParticipant.nameLabel.innerText = remoteParticipant.displayName;
});
```

```javascript
remoteParticipant.on('displayNameChanged', (args: {newValue?: string, oldValue?: string, reason?: DisplayNameChangedReason}) => {
    remoteParticipant.nameLabel.innerText = remoteParticipant.displayName;
    console.log(`Display name changed from ${oldValue} to ${newValue} due to ${reason}`);
});
```

### Event: `isSpeakingChanged`

The `isSpeakingChanged` when the dominant speaker in a call changes.

**How does your application react to the event?**

Your application UI must give priority to display the `RemoteParticipant` who became dominant speaker.

**Code Sample:**

```javascript
remoteParticipant.on('isSpeakingChanged', () => {
    showAsRemoteSpeaker(remoteParticipant) // Display a speaking icon near the participant
});
```

### Event: `videoStreamsUpdated`

The `videoStreamsUpdated` when a remote participant adds or removes a VideoStream to/from the call.

**How does your application react to the event?**

If your application was processing a stream that is removed, your application must stop the processing. When a new stream is added, we recommend that your application start to render or process it.

**Code Sample:**

```javascript
remoteParticipant.on('videoStreamsUpdated', (videoStreamsUpdatedEvent) => {

     videoStreamsUpdatedEvent.added.forEach(addedRemoteVideoStream => { 
       // Remove a renderer and start processing the stream if any processing is needed
        handleAddedRemoteVideoStream(addedRemoteVideoStream) 
    });

    videoStreamsUpdatedEvent.removed.forEach(removedRemoteVideoStream => {
        // Remove the renderer and stop processing the stream if any processing is ongoing
        this.handleRemovedRemoteVideoStream(removedRemoteVideoStream) 
    });
});
```

<!-- AudioEffectsFeature -->

## Event on the `AudioEffectsFeature` object

### Event: `effectsStarted`

This event occurs when the audio effect selected is applied to the audio stream. For example, when someone turns on Noise Suppression the `effectsStarted` fires.

**How does your application react to the event?**

Your application can display or enable a button that allows the user to disable the audio effect.

**Code Sample:**

```javascript
audioEffectsFeature.on('effectsStarted', (effects) => {
    stopEffectButton.style.visibility = "visible"; 
});
```

### Event: `effectsStopped`

This event occurs when the audio effect selected is applied to the audio stream. For example, when someone turns off Noise Suppression the `effectsStopped` is fired.

**How does your application react to the event?**

Your application can display or enable a button that allows the user to enable the audio effect.

**Code Sample:**

```javascript
audioEffectsFeature.on('effectsStopped', (effects) => {
    startEffectButton.style.visibility = "visible"; 
});
```

### Event: `effectsError`

This event occurs when an error happens while an audio effect is started or applied.

**How does your application react to the event?**

Your application must display an alert or an error message that the audio effect isn't working as expected.

**Code Sample:**

```javascript
audioEffectsFeature.on('effectsError', (error) => {
    console.log(`Error with the audio effect ${error}`);
    alert(`Error with the audio effect`);
});
```



**Applies to: platform-android**


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


Now that you installed Android SDK, you can subscribe to most of the properties and collections to be notified when values change.

## Properties

To subscribe to `property changed` events:

```java
// subscribe
PropertyChangedListener callStateChangeListener = new PropertyChangedListener()
{
    @Override
    public void onPropertyChanged(PropertyChangedEvent args)
    {
        Log.d("The call state has changed.");
    }
}
call.addOnStateChangedListener(callStateChangeListener);

//unsubscribe
call.removeOnStateChangedListener(callStateChangeListener);
```

When you use event listeners that are defined within the same class, bind the listener to a variable. To add and remove listener methods, pass the variable in as an argument.

If you try to pass the listener in directly as an argument, you lose the reference to that listener. Java is creating new instances of these listeners and not referencing previously created ones. They still fire off properly but can’t be removed because you don’t have a reference to them anymore.

## Collections
To subscribe to `collection updated` events:

```java
LocalVideoStreamsChangedListener localVideoStreamsChangedListener = new LocalVideoStreamsChangedListener()
{
    @Override
    public void onLocalVideoStreamsUpdated(LocalVideoStreamsEvent localVideoStreamsEventArgs) {
        Log.d(localVideoStreamsEventArgs.getAddedStreams().size());
        Log.d(localVideoStreamsEventArgs.getRemovedStreams().size());
    }
}
call.addOnLocalVideoStreamsChangedListener(localVideoStreamsChangedListener);
// To unsubscribe
call.removeOnLocalVideoStreamsChangedListener(localVideoStreamsChangedListener);
```



**Applies to: platform-ios**


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


Now that you installed the iOS SDK, you can subscribe to most of the properties and collections to be notified when values change.

## Properties

To subscribe to `property changed` events, use the following code.

```swift
call.delegate = self
// Get the property of the call state by getting on the call's state member
public func call(_ call: Call, didChangeState args: PropertyChangedEventArgs) {
{
    print("Callback from SDK when the call state changes, current state: " + call.state.rawValue)
}

// to unsubscribe
self.call.delegate = nil
```

## Collections

To subscribe to `collection updated` events, use the following code.

```swift
call.delegate = self
// Collection contains the streams that were added or removed only
public func call(_ call: Call, didUpdateLocalVideoStreams args: LocalVideoStreamsUpdatedEventArgs) {
{
    print(args.addedStreams.count)
    print(args.removedStreams.count)
}
// to unsubscribe
self.call.delegate = nil
```


## Next steps

- [Try our calling quickstart](../../quickstarts/voice-video-calling/getting-started-with-calling.md)
- [Try our video calling quickstart](../../quickstarts/voice-video-calling/get-started-with-video-calling.md)
- [Learn how to enable push notifications](push-notifications.md)
