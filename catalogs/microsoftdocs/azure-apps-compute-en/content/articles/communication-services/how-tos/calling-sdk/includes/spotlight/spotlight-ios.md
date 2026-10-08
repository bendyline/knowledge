---
author: cnwankwo
ms.service: azure-communication-services
ms.topic: include
ms.date: 06/15/2025
ms.author: cnwankwo
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


## Implement spotlight

Spotlight is an extended feature of the core `Call` API. You first need to import calling features from the Calling SDK.

```swift
import AzureCommunicationCalling
```

Then you can get the feature API object from the call instance:

```swift
@State var spotlightFeature: SpotlightCallFeature?

spotlightFeature = self.call!.feature(Features.spotlight)
```

### Start spotlight for participants

Any participant in the call or meeting can be pinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can start spotlight for other participants. This action is idempotent, trying to start spotlight on a pinned participant does nothing

You need a list of participant identifiers to use this feature.

```swift 
var identifiers : [CommunicationIdentifier] = []
identifiers.append(CommunicationUserIdentifier("<USER_ID>"))
identifiers.append(MicrosoftTeamsUserIdentifier("<USER_ID>"))
spotlightFeature.startSpotlight(participants: identifiers, completionHandler: { (error) in
    if let error = error {
        print ("startSpotlight failed %@", error as Error)
    }
})
```

### Remove spotlight from participants

Any pinned participant in the call or meeting can be unpinned. Only Microsoft 365 users who have an organizer, co-organizer, or presenter role can unpin other participants. This action is idempotent, trying to stop spotlight on an unpinned participant does nothing.

You need a list of participants identifiers to use this feature.

```swift
var identifiers : [CommunicationIdentifier] = []
identifiers.append(CommunicationUserIdentifier("<USER_ID>"))
identifiers.append(MicrosoftTeamsUserIdentifier("<USER_ID>"))
spotlightFeature.stopSpotlight(participants: identifiers, completionHandler: { (error) in
    if let error = error {
        print ("stopSpotlight failed %@", error as Error)
    }
})
```

### Remove all spotlights

All pinned participants can be unpinned using this operation. Only `MicrosoftTeamsUserIdentifier` users who have an organizer, co-organizer, or presenter role can unpin all participants.

```swift
spotlightFeature.stopAllSpotlight(completionHandler: { (error) in
    if let error = error {
        print ("stopAllSpotlight failed %@", error as Error)
    }
})
```

### Handle changed states

Spotlight mode enables you to subscribe to `SpotlightChanged` events. A `SpotlightChanged` event comes from a call instance and contains information about newly spotlighted participants and participants whose spotlight stopped. The returned array `SpotlightedParticipant` is sorted by the order the participants were spotlighted.

To get information about all participants with spotlight state changes on the current call, use the following code.

```swift
// event : { added: SpotlightedParticipant[]; removed: SpotlightedParticipant[] }
// SpotlightedParticipant = { identifier: CommunicationIdentifier }
// where: 
//  identifier: ID of participant whose spotlight state is changed

spotlightFeature = self.call!.feature(Features.spotlight)
spotlightFeature!.delegate = self.SpotlightDelegate

public class SpotlightDelegate: SpotlightCallFeatureDelegate {
    public func SpotlightCallFeature(_ spotlightCallFeature: SpotlightCallFeature, didChangeSpotlight args: SpotlightChangedEventArgs) {
        args.added.forEach { participant in
            print("Spotlight participant " + Utilities.toMri(participant.identifier) +  "is ON")
        }
        args.removed.forEach { participant in
            print("Spotlight participant " + Utilities.toMri(participant.identifier) +  "is OFF")
        }
    }
}
```

### Get all spotlighted participants

To get information about all participants that have spotlight state on the current call, use the following operation. The returned array is sorted by the order the participants were spotlighted.

``` swift
spotlightCallFeature.spotlightedParticipants.forEach { participant in
    print("Spotlight active for participant: " + Utilities.toMri(participant.identifier))
}
```

### Get the maximum supported spotlight participants

Use the following operation to get the maximum number of participants that can be spotlighted using the Calling SDK.

``` swift
spotlightCallFeature.maxSupported();
```
