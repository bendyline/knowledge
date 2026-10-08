---
author: jsaurezlee-msft
ms.service: azure-communication-services
ms.topic: article
ms.date: 06/15/2025
ms.author: jsaurezlee
---


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


Dominant Speakers is an extended feature of the core Call object that enables the user to monitor the most dominant speakers in the current call. Participants can join and leave the list based on how they're performing in the call.

When joined to a group call consisting of multiple participants, the calling SDKs identify which meeting participants are currently speaking. Active speakers identify which participants are being heard in each received audio frame. Dominant speakers identify which participants are currently most active or dominant in the group conversation, though their voice isn't necessarily heard in every audio frame. The set of dominant speakers can change as different participants take turns speaking, video subscription requests based on dominant speaker logic can be implemented. 

As participants join, leave, climb up or down in this list of participants, the client application can take this information and customize the call experience accordingly. For example, the client application can show the most dominant speakers in the call in a different UI to separate from the ones that aren't participating actively in the call.

Developers can receive updates and obtain information about the most Dominant Speakers in a call.

This information is being a represented as:
- An ordered list of the Remote Participants that represents the Dominant Speakers in the call.
- A timestamp marking the date when this list was last modified.


To use the Dominant Speakers call feature for iOS, the first step is to obtain the Dominant Speakers object:

```swift
let dominantSpeakersFeature = call.feature(Features.dominantSpeakers)
```
The Dominant Speakers feature object has the following structure:

- `didChangeDominantSpeakers`: Event for listening for changes in the dominant speakers list.
- `dominantSpeakersInfo`: Which gets the `DominantSpeakersInfo` object. This object has:
    - `speakers`: A list of participant identifiers representing the dominant speakers list.
    - `lastUpdatedAt`: The date when the dominant speakers list was updated.

To subscribe to changes in the dominant speakers list:

```swift
// Obtain the extended feature object from the call object.
let dominantSpeakersFeature = call.feature(Features.dominantSpeakers)
// Set the delegate object to obtain the event callback.
dominantSpeakersFeature.delegate = DominantSpeakersDelegate()

public class DominantSpeakersDelegate : DominantSpeakersCallFeatureDelegate
{
    public func dominantSpeakersCallFeature(_ dominantSpeakersCallFeature: DominantSpeakersCallFeature, didChangeDominantSpeakers args: PropertyChangedEventArgs) {
        // When the list changes, get the timestamp of the last change and the current list of Dominant Speakers
        let dominantSpeakersInfo = dominantSpeakersCallFeature.dominantSpeakersInfo
        let timestamp = dominantSpeakersInfo.lastUpdatedAt
        let dominantSpeakersList = dominantSpeakersInfo.speakers
    }
}
```
