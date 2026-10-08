---
author: tinaharter
ms.service: azure-communication-services
ms.topic: include
ms.date: 09/26/2023
ms.author: tinaharter
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


Object `CallLobby` on `Call` or `TeamsCall` class allow users to access Teams meeting lobby information. It includes the APIs, `admit`, `reject` and `admitAll`, which allows user to admit and reject participants from Teams meeting lobby. User could also get the `participants` collection and subscribe the event listener to receive notification.

### Get CallLobby object
The first thing is to get the `CallLobby` object from the call instance: 
```swift
@State var callLobby: CallLobby?
callLobby = self.call!.callLobby
```

### Get lobby participants properties
To know who is in the lobby, you could get the `participants` collection from `CallLobby` object. It's a collection of `RemoteParticipant` object with `InLobby` state. To get the `participants` collection:

```swift
let lobbyParticipants = callLobby.participants
```

### Get identifier for a remote participant
Before admit or reject participant from CallLobby, you need to get the identifier for a remote participant:
```swift
//You could get the identifier from the lobby participants collection
//You could also get the identifier from the addOnLobbyParticipantsUpdatedListener event
let identifiers = (call?.callLobby.participants.map {$0.identifier})!;
```

### Admit participant from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to admit participants from Teams CallLobby. Method `admit` accepts identifiers collection as input, and it returns `AdmitParticipantsResult` object as result.

```swift
callLobby.admit(identifiers: identifiers, completionHandler: { result, error in
    if error != nil {
        print ("Admit participant is failed %@", error! as Error)
    } else{
        print ("Admit result. success count: %s , failure count: %s, failure participants: %s", result.successCount, result.failureCount, result.failureParticipants)
    }
})
```

### Reject participant from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to reject participant from Teams CallLobby. Method `reject` accepts identifier.

```swift
//To reject participant from CallLobby:
callLobby.reject(identifiers.first!, completionHandler: { error in
    if error != nil {
        print ("Reject all participants is failed %@", error! as Error)
    }
})
```

### Admit all participants from CallLobby
CallLobby object allows user with the Organizer, Co-organizer and Presenter roles to admit all participants from Teams CallLobby. Method `admitAll` returns `AdmitAllParticipantsResult` object as result.

```swift
callLobby.admitAll(completionHandler: { result, error in
    if error != nil {
        print ("Admit all participants is failed %@", error! as Error)
    } else{
        print ("AdmitAll result. success count: %s , failure count: %s", result.successCount, result.failureCount)
    }
})
```

### Handle CallLobby updated event
You could subscribe to the event listener to handle the changes in the `participants` collection. This event is triggered when the participants are added or removed from the CallLobby and it provides the added or removed participants list.

```swift
//To register listener:
self.callObserver = CallObserver(view:self)

callLobby = self.call!.callLobby
callLobby!.delegate = self.callObserver

public class CallObserver : NSObject, CallLobbyDelegate
{
    public func callLobby(_ callLobby: CallLobby, didUpdateLobbyParticipants args: ParticipantsUpdatedEventArgs) {
        args.removedParticipants.forEach { p in
            let mri = Utilities.toMri(p.identifier)
            os_log("==>Participants %d is removed from the lobby.", log:log, mri)
        }

        args.addedParticipants.forEach { p in
            let mri = Utilities.toMri(p.identifier)
            os_log("==>Participants %d is added to the lobby.", log:log, mri)
        }
    }
}    

//To unregister listener, you can use the `off` method.
self.callLobby?.delegate = nil
```
[Learn more about events and subscription ](../../events.md)
