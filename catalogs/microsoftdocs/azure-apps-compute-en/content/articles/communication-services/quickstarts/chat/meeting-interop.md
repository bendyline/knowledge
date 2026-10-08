---
title: Add Teams meeting chat to your app
titleSuffix: An Azure Communication Services article
description: This article describes how to Add Teams meeting chat to your app with the Azure Communication Chat SDK
author: askaur
ms.author: askaur
ms.date: 06/30/2021
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: teams-interop
zone_pivot_groups: acs-plat-web-ios-android-windows
ms.custom: mode-other, devx-track-js
---

# Quickstart: Join your chat app to a Teams meeting


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with Azure Communication Services by connecting your chat solution to Microsoft Teams. 

**Applies to: platform-web**


This article describes how to chat in a Teams meeting using the Azure Communication Services Chat SDK for JavaScript.

## Sample Code

Download this code at GitHub Azure Samples [Join your chat app to a Teams meeting](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/join-chat-to-teams-meeting).

## Prerequisites 

* A [Teams deployment](https://learn.microsoft.com/deployoffice/teams-install). 
* A working [chat app](get-started.md). 

## Joining the meeting chat 

A Communication Services user can join a Teams meeting as an anonymous user via the Calling SDK. Joining the meeting also adds them as a participant to the meeting chat, where they can send and receive messages with other users in the meeting. The user doesn't have access to chat messages that were sent before they joined the meeting and they can't send or receive messages after the meeting ends. To join the meeting and start chatting, you can follow the next steps.

## Create a new Node.js application

Open your terminal or command window, create a new directory for your app, and navigate to it.

```console
mkdir chat-interop-quickstart && cd chat-interop-quickstart
```

Run `npm init -y` to create a **package.json** file with default settings.

```console
npm init -y
```

## Install the chat packages

Use the `npm install` command to install the necessary Communication Services SDKs for JavaScript.

```console
npm install @azure/communication-common --save

npm install @azure/communication-identity --save

npm install @azure/communication-chat --save

npm install @azure/communication-calling --save
```

The `--save` option lists the library as a dependency in your **package.json** file.

## Set up the app framework

This sample uses webpack to bundle the application assets. Run the following command to install the webpack, webpack-cli, and webpack-dev-server npm packages and list them as development dependencies in your **package.json**:

```console
npm install webpack@5.89.0 webpack-cli@5.1.4 webpack-dev-server@4.15.1 --save-dev
```

Create an **index.html** file in the root directory of your project. We use this file to configure a basic layout that enables the user to join a meeting and start chatting.

## Add the Teams UI controls

Replace the code in index.html with the following snippet.

Use the text box at the top of the page to enter the Teams meeting context. End users can join the specified meeting by clicking the **Join Teams Meeting** button.

A chat pop-up appears at the bottom of the page. End users can use it to send messages on the meeting thread. It displays in real time any messages sent on the thread while the Communication Services user is a member.

```html
<!DOCTYPE html>
<html>
   <head>
      <title>Communication Client - Calling and Chat Sample</title>
      <style>
         body {box-sizing: border-box;}
         /* The popup chat - hidden by default */
         .chat-popup {
         display: none;
         position: fixed;
         bottom: 0;
         left: 15px;
         border: 3px solid #f1f1f1;
         z-index: 9;
         }
         .message-box {
         display: none;
         position: fixed;
         bottom: 0;
         left: 15px;
         border: 3px solid #FFFACD;
         z-index: 9;
         }
         .form-container {
         max-width: 300px;
         padding: 10px;
         background-color: white;
         }
         .form-container textarea {
         width: 90%;
         padding: 15px;
         margin: 5px 0 22px 0;
         border: none;
         background: #e1e1e1;
         resize: none;
         min-height: 50px;
         }
         .form-container .btn {
         background-color: #4CAF40;
         color: white;
         padding: 14px 18px;
         margin-bottom:10px;
         opacity: 0.6;
         border: none;
         cursor: pointer;
         width: 100%;
         }
         .container {
         border: 1px solid #dedede;
         background-color: #F1F1F1;
         border-radius: 3px;
         padding: 8px;
         margin: 8px 0;
         }
         .darker {
         border-color: #ccc;
         background-color: #ffdab9;
         margin-left: 25px;
         margin-right: 3px;
         }
         .lighter {
         margin-right: 20px;
         margin-left: 3px;
         }
         .container::after {
         content: "";
         clear: both;
         display: table;
         }
      </style>
   </head>
   <body>
      <h4>Azure Communication Services</h4>
      <h1>Calling and Chat Quickstart</h1>
          <input id="teams-link-input" type="text" placeholder="Teams meeting link"
        style="margin-bottom:1em; width: 400px;" />
        <p>Call state <span style="font-weight: bold" id="call-state">-</span></p>
      <div>
        <button id="join-meeting-button" type="button">
            Join Teams Meeting
        </button>
        <button id="hang-up-button" type="button" disabled="true">
            Hang Up
        </button>
      </div>
      <div class="chat-popup" id="chat-box">
         <div id="messages-container"></div>
         <form class="form-container">
            <textarea placeholder="Type message.." name="msg" id="message-box" required></textarea>
            <button type="button" class="btn" id="send-message">Send</button>
         </form>
      </div>
      <script src="./bundle.js"></script>
   </body>
</html>
```

## Enable the Teams UI controls

Replace the content of the client.js file with the following snippet.

Within the snippet, replace 
- `SECRET_CONNECTION_STRING` with your Communication Service's connection string 

```javascript
import { CallClient } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import { ChatClient } from "@azure/communication-chat";

let call;
let callAgent;
let chatClient;
let chatThreadClient;

const meetingLinkInput = document.getElementById("teams-link-input");
const callButton = document.getElementById("join-meeting-button");
const hangUpButton = document.getElementById("hang-up-button");
const callStateElement = document.getElementById("call-state");

const messagesContainer = document.getElementById("messages-container");
const chatBox = document.getElementById("chat-box");
const sendMessageButton = document.getElementById("send-message");
const messageBox = document.getElementById("message-box");

var userId = "";
var messages = "";
var chatThreadId = "";

async function init() {
  const connectionString = "<SECRET_CONNECTION_STRING>";
  const endpointUrl = connectionString.split(";")[0].replace("endpoint=", "");

  const identityClient = new CommunicationIdentityClient(connectionString);

  let identityResponse = await identityClient.createUser();
  userId = identityResponse.communicationUserId;
  console.log(`\nCreated an identity with ID: ${identityResponse.communicationUserId}`);

  let tokenResponse = await identityClient.getToken(identityResponse, ["voip", "chat"]);

  const { token, expiresOn } = tokenResponse;
  console.log(`\nIssued an access token that expires at: ${expiresOn}`);
  console.log(token);

  const callClient = new CallClient();
  const tokenCredential = new AzureCommunicationTokenCredential(token);

  callAgent = await callClient.createCallAgent(tokenCredential);
  callButton.disabled = false;
  chatClient = new ChatClient(endpointUrl, new AzureCommunicationTokenCredential(token));

  console.log("Azure Communication Chat client created!");
}

init();

const joinCall = (urlString, callAgent) => {
  const url = new URL(urlString);
  console.log(url);
  if (url.pathname.startsWith("/meet")) {
    // Short teams URL, so for now call meetingID and pass code API
    return callAgent.join({
      meetingId: url.pathname.split("/").pop(),
      passcode: url.searchParams.get("p"),
    });
  } else {
    return callAgent.join({ meetingLink: urlString }, {});
  }
};

callButton.addEventListener("click", async () => {
  // join with meeting link
  try {
    call = joinCall(meetingLinkInput.value, callAgent);
  } catch {
    throw new Error("Could not join meeting - have you set your connection string?");
  }

  // Chat thread ID is provided from the call info, after connection.
  call.on("stateChanged", async () => {
    callStateElement.innerText = call.state;

    if (call.state === "Connected" && !chatThreadClient) {
      chatThreadId = call.info?.threadId;
      chatThreadClient = chatClient.getChatThreadClient(chatThreadId);

      chatBox.style.display = "block";
      messagesContainer.innerHTML = messages;

      // open notifications channel
      await chatClient.startRealtimeNotifications();

      // subscribe to new message notifications
      chatClient.on("chatMessageReceived", (e) => {
        console.log("Notification chatMessageReceived!");

        // check whether the notification is intended for the current thread
        if (chatThreadId != e.threadId) {
          return;
        }

        if (e.sender.communicationUserId != userId) {
          renderReceivedMessage(e.message);
        } else {
          renderSentMessage(e.message);
        }
      });
    }
  });

  // toggle button and chat box states
  hangUpButton.disabled = false;
  callButton.disabled = true;

  console.log(call);
});

async function renderReceivedMessage(message) {
  messages += '<div class="container lighter">' + message + "</div>";
  messagesContainer.innerHTML = messages;
}

async function renderSentMessage(message) {
  messages += '<div class="container darker">' + message + "</div>";
  messagesContainer.innerHTML = messages;
}

hangUpButton.addEventListener("click", async () => {
  // end the current call
  await call.hangUp();
  // Stop notifications
  chatClient.stopRealtimeNotifications();

  // toggle button states
  hangUpButton.disabled = true;
  callButton.disabled = false;
  callStateElement.innerText = "-";

  // toggle chat states
  chatBox.style.display = "none";
  messages = "";
  // Remove local ref
  chatThreadClient = undefined;
});

sendMessageButton.addEventListener("click", async () => {
  let message = messageBox.value;

  let sendMessageRequest = { content: message };
  let sendMessageOptions = { senderDisplayName: "Jack" };
  let sendChatMessageResult = await chatThreadClient.sendMessage(
    sendMessageRequest,
    sendMessageOptions
  );
  let messageId = sendChatMessageResult.id;

  messageBox.value = "";
  console.log(`Message sent!, message id:${messageId}`);
});

```

The Teams client doesn't set the display names of the chat thread participants. The names are returned as null in the API for listing participants, in the `participantsAdded` event and in the `participantsRemoved` event. The display names of the chat participants can be retrieved from the `remoteParticipants` field of the `call` object. On receiving a notification about a roster change, you can use this code to retrieve the name of the user that was added or removed:

```
var displayName = call.remoteParticipants.find(p => p.identifier.communicationUserId == '<REMOTE_USER_ID>').displayName;
```

## Run the code

Use the `webpack-dev-server` to build and run your app. Run the following command to bundle your application host on a local webserver:

```console
npx webpack-dev-server --entry ./client.js --output bundle.js --debug --devtool inline-source-map
```

Open your browser and navigate to `http://localhost:8080/`. You should see app launched as shown in the following screenshot:

Screenshot of the completed JavaScript Application.

Insert the Teams meeting link into the text box. Users can click **Join Teams Meeting** to join the Teams meeting. After the Communication Services user is admitted into the meeting, you can chat from within your Communication Services application. Navigate to the box at the bottom of the page to start chatting. For simplicity, the application only shows the last two messages in the chat.

> **Note:** 
> Certain features are currently not supported for interoperability scenarios with Teams. For more information about supported features, see [Teams meeting capabilities for Teams external users](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/concepts/interop/guest/capabilities.md).



**Applies to: platform-ios**


This article describes how to chat in a Teams meeting using the Azure Communication Services Chat SDK for iOS.

## Sample Code

Download this code at GitHub Azure Samples [Join your chat app to a Teams meeting](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/join-chat-to-teams-meeting).

## Prerequisites 

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- A Mac running [Xcode](https://developer.apple.com/xcode/), along with a valid developer certificate installed into your Keychain.
- A [Teams deployment](https://learn.microsoft.com/deployoffice/teams-install). 
- A [User Access Token](../identity/access-tokens.md) for your Azure Communication Service. You can also use the Azure CLI and run the command with your connection string to create a user and an access token.

```azurecli-interactive
az communication user-identity token issue --scope voip chat --connection-string "yourConnectionString"
```
For details, see [Use Azure CLI to Create and Manage Access Tokens](../identity/access-tokens.md?pivots=platform-azcli).

## Setting up

### Creating the Xcode project

In Xcode, create a new iOS project and select the Single View App template. This tutorial uses the [SwiftUI framework](https://developer.apple.com/xcode/swiftui/), so you should set the Language to Swift and the User Interface to SwiftUI. You're not going to create tests during this quick start. Feel free to uncheck Include Tests.

Screenshot showing the New Project window within Xcode.

### Installing CocoaPods

Use this guide to [install CocoaPods](https://guides.cocoapods.org/using/getting-started.html) on your Mac.

### Install the package and dependencies with CocoaPods

1. To create a `Podfile` for your application, open the terminal and navigate to the project folder and run pod init.

1. Add the following code to the `Podfile` under the target, and save.

```ruby
target 'Chat Teams Interop' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for Chat Teams Interop
  pod 'AzureCommunicationCalling'
  pod 'AzureCommunicationChat'
  
end
```
1. Run `pod install`.

1. Open the `.xcworkspace` file with Xcode.

### Request access to the microphone

To access the device microphone, you need to update your app's Information Property List with an `NSMicrophoneUsageDescription`. You set the associated value to a `string` that was included in the dialog the system uses to request access from the user.

Under the target, select the `Info` tab and add a string for `Privacy -  Microphone Usage Description`.

Screenshot showing adding microphone usage within Xcode.

### Disable User Script Sandboxing

Some of the scripts within the linked libraries write files during the build process. To enable file writing, disable the User Script Sandboxing in Xcode.

Under the build settings, search for `sandbox` and set `User Script Sandboxing` to `No`.

Screenshot showing disabling user script sandboxing within Xcode.

## Joining the meeting chat 

A Communication Services user can join a Teams meeting as an anonymous user using the Calling SDK. Once a user joins the Teams meeting, they can send and receive messages with other meeting attendees. The user doesn't have access to chat messages sent before joining, nor can they send or receive messages when they aren't in the meeting.

To join the meeting and start chatting, follow the next steps.

## Set up the app framework

Import the Azure Communication packages in `ContentView.swift` by adding the following snippet:

``` swift
import AVFoundation
import SwiftUI

import AzureCommunicationCalling
import AzureCommunicationChat
```

In `ContentView.swift` add the following snippet, just above the `struct ContentView: View` declaration:

```swift 
let endpoint = "<ADD_YOUR_ENDPOINT_URL_HERE>"
let token = "<ADD_YOUR_USER_TOKEN_HERE>"
let displayName: String = "Quickstart User"
```

Replace `<ADD_YOUR_ENDPOINT_URL_HERE>` with the endpoint for your Communication Services resource.
Replace `<ADD_YOUR_USER_TOKEN_HERE>` with the previously generated token, via the Azure client command line.

For more information, see [User Access Token](../identity/access-tokens.md)

Replace `Quickstart User` with the display name you'd like to use in the Chat.

To hold the state, add the following variables to the `ContentView` struct:

```swift
  @State var message: String = ""
  @State var meetingLink: String = ""
  @State var chatThreadId: String = ""

  // Calling state
  @State var callClient: CallClient?
  @State var callObserver: CallDelegate?
  @State var callAgent: CallAgent?
  @State var call: Call?

  // Chat state
  @State var chatClient: ChatClient?
  @State var chatThreadClient: ChatThreadClient?
  @State var chatMessage: String = ""
  @State var meetingMessages: [MeetingMessage] = []

```

Now add the main body var to hold the UI elements. We attach business logic to these controls. Add the following code to the `ContentView` struct:

```swift
var body: some View {
    NavigationView {
      Form {
        Section {
          TextField("Teams Meeting URL", text: $meetingLink)
            .onChange(of: self.meetingLink, perform: { value in
              if let threadIdFromMeetingLink = getThreadId(from: value) {
                self.chatThreadId = threadIdFromMeetingLink
              }
            })
          TextField("Chat thread ID", text: $chatThreadId)
        }
        Section {
          HStack {
            Button(action: joinMeeting) {
              Text("Join Meeting")
            }.disabled(
              chatThreadId.isEmpty || callAgent == nil || call != nil
            )
            Spacer()
            Button(action: leaveMeeting) {
              Text("Leave Meeting")
            }.disabled(call == nil)
          }
          Text(message)
        }
        Section {
          ForEach(meetingMessages, id: \.id) { message in
            let currentUser: Bool = (message.displayName == displayName)
            let foregroundColor = currentUser ? Color.white : Color.black
            let background = currentUser ? Color.blue : Color(.systemGray6)
            let alignment = currentUser ? HorizontalAlignment.trailing : .leading
            
            HStack {
              if currentUser {
                Spacer()
              }
              VStack(alignment: alignment) {
                Text(message.displayName).font(Font.system(size: 10))
                Text(message.content)
                  .frame(maxWidth: 200)
              }

              .padding(8)
              .foregroundColor(foregroundColor)
              .background(background)
              .cornerRadius(8)

              if !currentUser {
                Spacer()
              }
            }
          }
          .frame(maxWidth: .infinity)
        }

        TextField("Enter your message...", text: $chatMessage)
        Button(action: sendMessage) {
          Text("Send Message")
        }.disabled(chatThreadClient == nil)
      }

      .navigationBarTitle("Teams Chat Interop")
    }

    .onAppear {
      // Handle initialization of the call and chat clients
    }
  }
```

### Initialize the ChatClient

Instantiate the `ChatClient` and enable message notifications. We're using real-time notifications for receiving chat messages. 

With the main body set up, let's add the functions to handle the setup of the call and chat clients.

In the `onAppear` function, add the following code to initialize the `CallClient` and `ChatClient`:

```swift
  if let threadIdFromMeetingLink = getThreadId(from: self.meetingLink) {
    self.chatThreadId = threadIdFromMeetingLink
  }
  // Authenticate
  do {
    let credentials = try CommunicationTokenCredential(token: token)
    self.callClient = CallClient()
    self.callClient?.createCallAgent(
      userCredential: credentials
    ) { agent, error in
      if let e = error {
        self.message = "ERROR: It was not possible to create a call agent."
        print(e)
        return
      } else {
        self.callAgent = agent
      }
    }
  
    // Start the chat client
    self.chatClient = try ChatClient(
      endpoint: endpoint,
      credential: credentials,
      withOptions: AzureCommunicationChatClientOptions()
    )
    // Register for real-time notifications
    self.chatClient?.startRealTimeNotifications { result in
      switch result {
      case .success:
        self.chatClient?.register(
          event: .chatMessageReceived,
          handler: receiveMessage
      )
      case let .failure(error):
        self.message = "Could not register for message notifications: " + error.localizedDescription
        print(error)
      }
    }
  } catch {
    print(error)
    self.message = error.localizedDescription
  }
```

### Add meeting join function

Add the following function to the `ContentView` struct to handle joining the meeting.

```swift
  func joinMeeting() {
    // Ask permissions
    AVAudioSession.sharedInstance().requestRecordPermission { (granted) in
      if granted {
        let teamsMeetingLink = TeamsMeetingLinkLocator(
          meetingLink: self.meetingLink
        )
        self.callAgent?.join(
          with: teamsMeetingLink,
          joinCallOptions: JoinCallOptions()
        ) {(call, error) in
          if let e = error {
            self.message = "Failed to join call: " + e.localizedDescription
            print(e.localizedDescription)
            return
          }

          self.call = call
          self.callObserver = CallObserver(self)
          self.call?.delegate = self.callObserver
          self.message = "Teams meeting joined successfully"
        }
      } else {
        self.message = "Not authorized to use mic"
      }
    }
  }

```

### Initialize the ChatThreadClient

We initialize the `ChatThreadClient` after the user joins the meeting. Then we need to check the meeting status from the delegate and then initialize `ChatThreadClient` with the `threadId` when joined to the meeting.

Create the `connectChat()` function with the following code:

```swift
  func connectChat() {
    do {
      self.chatThreadClient = try chatClient?.createClient(
        forThread: self.chatThreadId
      )
      self.message = "Joined meeting chat successfully"
    } catch {
      self.message = "Failed to join the chat thread: " + error.localizedDescription
    }
  }
```

Add the following helper function to the `ContentView`, used to parse the Chat thread ID from the Team's meeting link, if possible. In the case that this extraction fails, the user needs to manually enter the Chat thread ID using Graph APIs to retrieve the thread ID.

```swift
 func getThreadId(from teamsMeetingLink: String) -> String? {
  if let range = teamsMeetingLink.range(of: "meetup-join/") {
    let thread = teamsMeetingLink[range.upperBound...]
    if let endRange = thread.range(of: "/")?.lowerBound {
      return String(thread.prefix(upTo: endRange))
    }
  }
  return nil
}
```

### Enable sending messages

Add the `sendMessage()` function to `ContentView`. This function uses the `ChatThreadClient` to send messages from the user.

```swift
func sendMessage() {
  let message = SendChatMessageRequest(
    content: self.chatMessage,
    senderDisplayName: displayName,
    type: .text
  )

  self.chatThreadClient?.send(message: message) { result, _ in
    switch result {
    case .success:
    print("Chat message sent")
    self.chatMessage = ""

    case let .failure(error):
    self.message = "Failed to send message: " + error.localizedDescription + "\n Has your token expired?"
    }
  }
}
```

### Enable receiving messages

To receive messages, we implement the handler for `ChatMessageReceived` events. When new messages are sent to the thread, this handler adds the messages to the `meetingMessages` variable so they can be displayed in the UI.

First add the following struct to `ContentView.swift`. The UI uses the data in the struct to display our Chat messages.

```swift
struct MeetingMessage: Identifiable {
  let id: String
  let date: Date
  let content: String
  let displayName: String

  static func fromTrouter(event: ChatMessageReceivedEvent) -> MeetingMessage {
    let displayName: String = event.senderDisplayName ?? "Unknown User"
    let content: String = event.message.replacingOccurrences(
      of: "<[^>]+>", with: "",
      options: String.CompareOptions.regularExpression
    )
    return MeetingMessage(
      id: event.id,
      date: event.createdOn?.value ?? Date(),
      content: content,
      displayName: displayName
    )
  }
}
```

Next add the `receiveMessage()` function to `ContentView`. When a messaging event occurs, it calls this function. You need to register for all events that you want to handle in the `switch` statement via the `chatClient?.register()` method.

```swift
  func receiveMessage(event: TrouterEvent) -> Void {
    switch event {
    case let .chatMessageReceivedEvent(messageEvent):
      let message = MeetingMessage.fromTrouter(event: messageEvent)
      self.meetingMessages.append(message)

      /// OTHER EVENTS
      //    case .realTimeNotificationConnected:
      //    case .realTimeNotificationDisconnected:
      //    case .typingIndicatorReceived(_):
      //    case .readReceiptReceived(_):
      //    case .chatMessageEdited(_):
      //    case .chatMessageDeleted(_):
      //    case .chatThreadCreated(_):
      //    case .chatThreadPropertiesUpdated(_):
      //    case .chatThreadDeleted(_):
      //    case .participantsAdded(_):
      //    case .participantsRemoved(_):

    default:
      break
    }
  }
```

Finally, we need to implement the delegate handler for the call client. Use this handler to check the call status and initialize the chat client when the user joins the meeting.

```swift
class CallObserver : NSObject, CallDelegate {
  private var owner: ContentView

  init(_ view: ContentView) {
    owner = view
  }

  func call(
    _ call: Call,
    didChangeState args: PropertyChangedEventArgs
  ) {
    owner.message = CallObserver.callStateToString(state: call.state)
    if call.state == .disconnected {
      owner.call = nil
      owner.message = "Left Meeting"
    } else if call.state == .inLobby {
      owner.message = "Waiting in lobby (go let them in!)"
    } else if call.state == .connected {
      owner.message = "Connected"
      owner.connectChat()
    }
  }

  private static func callStateToString(state: CallState) -> String {
    switch state {
    case .connected: return "Connected"
    case .connecting: return "Connecting"
    case .disconnected: return "Disconnected"
    case .disconnecting: return "Disconnecting"
    case .earlyMedia: return "EarlyMedia"
    case .none: return "None"
    case .ringing: return "Ringing"
    case .inLobby: return "InLobby"
    default: return "Unknown"
    }
  }
}
```

### Leave the chat

When the user leaves the Teams meeting, we clear the Chat messages from the UI and hang up the call. See the following full code example.

```swift
  func leaveMeeting() {
    if let call = self.call {
      self.chatClient?.unregister(event: .chatMessageReceived)
      self.chatClient?.stopRealTimeNotifications()

      call.hangUp(options: nil) { (error) in
        if let e = error {
          self.message = "Leaving Teams meeting failed: " + e.localizedDescription
        } else {
          self.message = "Leaving Teams meeting was successful"
        }
      }
      self.meetingMessages.removeAll()
    } else {
      self.message = "No active call to hangup"
    }
  }
```

## Get a Teams meeting chat thread for a Communication Services user

The Teams meeting details can be retrieved using Graph APIs, detailed in [Graph documentation](https://learn.microsoft.com/graph/api/onlinemeeting-createorget?tabs=http\&view=graph-rest-beta\&preserve-view=true). The Communication Services Calling SDK accepts a full Teams meeting link or a meeting ID. They're returned as part of the `onlineMeeting` resource, accessible under the [`joinWebUrl` property](https://learn.microsoft.com/graph/api/resources/onlinemeeting?view=graph-rest-beta\&preserve-view=true)

With the [Graph APIs](https://learn.microsoft.com/graph/api/onlinemeeting-createorget?tabs=http\&view=graph-rest-beta\&preserve-view=true), you can also obtain the `threadID`. The response has a `chatInfo` object that contains the `threadID`.

## Run the code

Run the application. 

To join the Teams meeting, enter your Team's meeting link in the UI.

After you join the Team's meeting, you need to admit the user to the meeting in your Team's client. Once the user is admitted and joins the chat, they can send and receive messages.

Screenshot of the completed iOS Application.

> **Note:** 
> Certain features are currently not supported for interoperability scenarios with Teams. For more information about supported features, see [Teams meeting capabilities for Teams external users](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/concepts/interop/guest/capabilities.md).



**Applies to: platform-android**


This article describes how to add Teams meeting chat to your app using the Azure Communication Services Chat SDK for Android.

## Sample Code

Download this code at GitHub Azure Samples [Join your chat app to a Teams meeting](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/join-chat-to-teams-meeting).

## Prerequisites 

- A [Teams deployment](https://learn.microsoft.com/deployoffice/teams-install). 
- A working [calling app](../voice-video-calling/get-started-teams-interop.md). 

## Enable Teams interoperability 

A Communication Services user that joins a Teams meeting as a guest user can access the meeting chat only after they join the Teams meeting call. For more information about how to add a Communication Services user to a Teams meeting call, see [Teams interop](../voice-video-calling/get-started-teams-interop.md).

You must be a member of the owning organization of both entities to use this feature.

## Joining the meeting chat 

Once you enable Teams interoperability, a Communication Services user can join the Teams call as an external user using the Calling SDK. Joining the call also adds them as a participant to the meeting chat. From chat they can send and receive messages with other users on the call. The user doesn't have access to chat messages that were sent before they joined the call. To enable your end-users to join the Teams meetings and start chatting, complete the following steps.

## Add Chat to the Teams calling app

In your module level `build.gradle`, add the dependency on the chat SDK.

> **Important:**
> Known issue: When you're using Android Chat and Calling SDK together in the same application, the Chat SDK's real-time notifications feature don't work. You generate a dependency resolution issue. While we're working on a solution, you can turn off the real-time notifications feature by adding the following exclusions to the Chat SDK dependency in the app's `build.gradle` file:
> 
> ```groovy
> implementation ("com.azure.android:azure-communication-chat:2.0.3") {
>     exclude group: 'com.microsoft', module: 'trouter-client-android'
> }
> ```

## Add the Teams UI layout

Replace the code in activity_main.xml with the following snippet. It adds inputs for the thread ID and for sending messages, a button for sending the typed message and a basic chat layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/teams_meeting_thread_id"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginHorizontal="20dp"
        android:layout_marginTop="128dp"
        android:ems="10"
        android:hint="Meeting Thread Id"
        android:inputType="textUri"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:id="@+id/teams_meeting_link"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginHorizontal="20dp"
        android:layout_marginTop="64dp"
        android:ems="10"
        android:hint="Teams meeting link"
        android:inputType="textUri"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <LinearLayout
        android:id="@+id/button_layout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="30dp"
        android:gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/teams_meeting_thread_id">

        <Button
            android:id="@+id/join_meeting_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Join Meeting" />

        <Button
            android:id="@+id/hangup_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hangup" />

    </LinearLayout>

    <TextView
        android:id="@+id/call_status_bar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="40dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/recording_status_bar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="20dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <ScrollView
        android:id="@+id/chat_box"
        android:layout_width="374dp"
        android:layout_height="294dp"
        android:layout_marginTop="40dp"
        android:layout_marginBottom="20dp"
        app:layout_constraintBottom_toTopOf="@+id/send_message_button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button_layout"
        android:orientation="vertical"
        android:gravity="bottom"
        android:layout_gravity="bottom"
        android:fillViewport="true">

        <LinearLayout
            android:id="@+id/chat_box_layout"
            android:orientation="vertical"
            android:layout_width="fill_parent"
            android:layout_height="fill_parent"
            android:gravity="bottom"
            android:layout_gravity="top"
            android:layout_alignParentBottom="true"/>
    </ScrollView>

    <EditText
        android:id="@+id/message_body"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginHorizontal="20dp"
        android:layout_marginTop="588dp"
        android:ems="10"
        android:inputType="textUri"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:text="Type your message here..."
        tools:visibility="invisible" />

    <Button
        android:id="@+id/send_message_button"
        android:layout_width="138dp"
        android:layout_height="45dp"
        android:layout_marginStart="133dp"
        android:layout_marginTop="48dp"
        android:layout_marginEnd="133dp"
        android:text="Send Message"
        android:visibility="invisible"
        app:layout_constraintBottom_toTopOf="@+id/recording_status_bar"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.428"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/chat_box" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## Enable the Teams UI controls

### Import packages and define state variables

To the content of `MainActivity.java`, add the following imports:

```
import android.graphics.Typeface;
import android.graphics.Color;
import android.text.Html;
import android.os.Handler;
import android.view.Gravity;
import android.view.View;
import android.widget.LinearLayout;
import java.util.Collections;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.List;
import com.azure.android.communication.chat.ChatThreadAsyncClient;
import com.azure.android.communication.chat.ChatThreadClientBuilder;
import com.azure.android.communication.chat.models.ChatMessage;
import com.azure.android.communication.chat.models.ChatMessageType;
import com.azure.android.communication.chat.models.ChatParticipant;
import com.azure.android.communication.chat.models.ListChatMessagesOptions;
import com.azure.android.communication.chat.models.SendChatMessageOptions;
import com.azure.android.communication.common.CommunicationIdentifier;
import com.azure.android.communication.common.CommunicationUserIdentifier;
import com.azure.android.core.rest.util.paging.PagedAsyncStream;
import com.azure.android.core.util.AsyncStreamHandler;
```

To the `MainActivity` class, add the following variables:

```
    // InitiatorId is used to differentiate incoming messages from outgoing messages
    private static final String InitiatorId = "<USER_ID>";
    private static final String ResourceUrl = "<COMMUNICATION_SERVICES_RESOURCE_ENDPOINT>";
    private String threadId;
    private ChatThreadAsyncClient chatThreadAsyncClient;
    
    // The list of ids corresponding to messages which have already been processed
    ArrayList<String> chatMessages = new ArrayList<>();
```

Replace `<USER_ID>` with the ID of the user initiating the chat.
Replace `<COMMUNICATION_SERVICES_RESOURCE_ENDPOINT>` with the endpoint for your Communication Services resource. 

### Initialize the ChatThreadClient

After joining the meeting, instantiate the `ChatThreadClient` and make the chat components visible.

Update the end of the `MainActivity.joinTeamsMeeting()` method with the following code:

```
    private void joinTeamsMeeting() {
        ...
        EditText threadIdView = findViewById(R.id.teams_meeting_thread_id);
        threadId = threadIdView.getText().toString();
        // Initialize Chat Thread Client
        chatThreadAsyncClient = new ChatThreadClientBuilder()
                .endpoint(ResourceUrl)
                .credential(new CommunicationTokenCredential(UserToken))
                .chatThreadId(threadId)
                .buildAsyncClient();
        Button sendMessageButton = findViewById(R.id.send_message_button);
        EditText messageBody = findViewById(R.id.message_body);
        // Register the method for sending messages and toggle the visibility of chat components
        sendMessageButton.setOnClickListener(l -> sendMessage());
        sendMessageButton.setVisibility(View.VISIBLE);
        messageBody.setVisibility(View.VISIBLE);
        
        // Start the polling for chat messages immediately
        handler.post(runnable);
    }
```

### Enable sending messages

Add the `sendMessage()` method to `MainActivity`. It uses the `ChatThreadClient` to send messages on behalf of the user.

```
    private void sendMessage() {
        // Retrieve the typed message content
        EditText messageBody = findViewById(R.id.message_body);
        // Set request options and send message
        SendChatMessageOptions options = new SendChatMessageOptions();
        options.setContent(messageBody.getText().toString());
        options.setSenderDisplayName("Test User");
        chatThreadAsyncClient.sendMessage(options);
        // Clear the text box
        messageBody.setText("");
    }
```

### Enable polling for messages and rendering them in the application

> **Important:**
> Known issue: Since the Chat SDK's real-time notifications feature doesn't work together with the Calling SDKs, you need to poll the `GetMessages` API at predefined intervals. In this sample, we use 3-second intervals.

We can obtain the following data from the message list returned by the `GetMessages` API: 
 - The `text` and `html` messages on the thread since joining
 - Changes to the thread roster
 - Updates to the thread topic


To the `MainActivity` class, add a handler and a runnable task that runs at 3-second intervals:

```
    private Handler handler = new Handler();
    private Runnable runnable = new Runnable() {
        @Override
        public void run() {
            try {
                retrieveMessages();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            // Repeat every 3 seconds
            handler.postDelayed(runnable, 3000);
        }
    };
```

The task already started at the end of the `MainActivity.joinTeamsMeeting()` method updated in the initialization step.

Finally, we add the method for querying all accessible messages on the thread, parsing them by message type and displaying the `html` and `text` ones:

```
    private void retrieveMessages() throws InterruptedException {
        // Initialize the list of messages not yet processed
        ArrayList<ChatMessage> newChatMessages = new ArrayList<>();
        
        // Retrieve all messages accessible to the user
        PagedAsyncStream<ChatMessage> messagePagedAsyncStream
                = this.chatThreadAsyncClient.listMessages(new ListChatMessagesOptions(), null);
        // Set up a lock to wait until all returned messages have been inspected
        CountDownLatch latch = new CountDownLatch(1);
        // Traverse the returned messages
        messagePagedAsyncStream.forEach(new AsyncStreamHandler<ChatMessage>() {
            @Override
            public void onNext(ChatMessage message) {
                // Messages that should be displayed in the chat
                if ((message.getType().equals(ChatMessageType.TEXT)
                    || message.getType().equals(ChatMessageType.HTML))
                    && !chatMessages.contains(message.getId())) {
                    newChatMessages.add(message);
                    chatMessages.add(message.getId());
                }
                if (message.getType().equals(ChatMessageType.PARTICIPANT_ADDED)) {
                    // Handle participants added to chat operation
                    List<ChatParticipant> participantsAdded = message.getContent().getParticipants();
                    CommunicationIdentifier participantsAddedBy = message.getContent().getInitiatorCommunicationIdentifier();
                }
                if (message.getType().equals(ChatMessageType.PARTICIPANT_REMOVED)) {
                    // Handle participants removed from chat operation
                    List<ChatParticipant> participantsRemoved = message.getContent().getParticipants();
                    CommunicationIdentifier participantsRemovedBy = message.getContent().getInitiatorCommunicationIdentifier();
                }
                if (message.getType().equals(ChatMessageType.TOPIC_UPDATED)) {
                    // Handle topic updated
                    String newTopic = message.getContent().getTopic();
                    CommunicationIdentifier topicUpdatedBy = message.getContent().getInitiatorCommunicationIdentifier();
                }
            }
            @Override
            public void onError(Throwable throwable) {
                latch.countDown();
            }
            @Override
            public void onComplete() {
                latch.countDown();
            }
        });
        // Wait until the operation completes
        latch.await(1, TimeUnit.MINUTES);
        // Returned messages should be ordered by the createdOn field to be guaranteed a proper chronological order
        // For the purpose of this demo we just reverse the list of returned messages
        Collections.reverse(newChatMessages);
        for (ChatMessage chatMessage : newChatMessages)
        {
            LinearLayout chatBoxLayout = findViewById(R.id.chat_box_layout);
            // For the purpose of this demo UI, we don't need to use HTML formatting for displaying messages
            // The Teams client always sends html messages in meeting chats 
            String message = Html.fromHtml(chatMessage.getContent().getMessage(), Html.FROM_HTML_MODE_LEGACY).toString().trim();
            TextView messageView = new TextView(this);
            messageView.setText(message);
            // Compare with sender identifier and align LEFT/RIGHT accordingly
            // Azure Communication Services users are of type CommunicationUserIdentifier
            CommunicationIdentifier senderId = chatMessage.getSenderCommunicationIdentifier();
            if (senderId instanceof CommunicationUserIdentifier
                && InitiatorId.equals(((CommunicationUserIdentifier) senderId).getId())) {
                messageView.setTextColor(Color.GREEN);
                messageView.setGravity(Gravity.RIGHT);
            } else {
                messageView.setTextColor(Color.BLUE);
                messageView.setGravity(Gravity.LEFT);
            }
            // Note: messages with the deletedOn property set to a timestamp, should be marked as deleted
            // Note: messages with the editedOn property set to a timestamp, should be marked as edited
            messageView.setTypeface(Typeface.SANS_SERIF, Typeface.BOLD);
            chatBoxLayout.addView(messageView);
        }
    }
```

The Teams client doesn't set the display names of the chat thread participants. The names are returned as null in the API for listing participants, in the `participantsAdded` event and in the `participantsRemoved` event. The display names of the chat participants can be retrieved from the `remoteParticipants` field of the `call` object.

## Get a Teams meeting chat thread for a Communication Services user

The Teams meeting details can be retrieved using Graph APIs, detailed in [Graph documentation](https://learn.microsoft.com/graph/api/onlinemeeting-createorget?tabs=http\&view=graph-rest-beta\&preserve-view=true). The Communication Services Calling SDK accepts a full Teams meeting link or a meeting ID. They're returned as part of the `onlineMeeting` resource, accessible under the [`joinWebUrl` property](https://learn.microsoft.com/graph/api/resources/onlinemeeting?view=graph-rest-beta\&preserve-view=true)

With the [Graph APIs](https://learn.microsoft.com/graph/api/onlinemeeting-createorget?tabs=http\&view=graph-rest-beta\&preserve-view=true), you can also obtain the `threadID`. The response has a `chatInfo` object that contains the `threadID`.

## Run the code

You can now launch the app from the **Run App** button on the toolbar (Shift+F10).

To join the Teams meeting and chat, enter your Team's meeting link and the thread ID in the UI.

After joining the Team's meeting, you need to admit the user to the meeting in your Team's client. Once the user is admitted and joins the chat, they can send and receive messages.

Screenshot of the completed Android Application.

> **Note:** 
> Certain features are currently not supported for interoperability scenarios with Teams. For more information about supported features, see [Teams meeting capabilities for Teams external users](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/concepts/interop/guest/capabilities.md)




**Applies to: platform-windows**


This article describes how to chat in a Teams meeting using the Azure Communication Services Chat SDK for C#.

## Sample code

Download this code at GitHub Azure Samples [Join your chat app to a Teams meeting](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/ChatTeamsInteropQuickStart).

## Prerequisites 

* A [Teams deployment](https://learn.microsoft.com/deployoffice/teams-install). 
* An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).  
* Install [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/) with Universal Windows Platform development workload.  
* A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md). 
* A Teams Meeting Link.

## Joining the meeting chat 

A Communication Services user can join a Teams meeting anonymously using the Calling SDK. Joining the meeting also adds them as a participant to the meeting chat. In chat they can send and receive messages with other users in the meeting. The user doesn't have access to chat messages that were sent before they joined the meeting. They can't send or receive messages after the meeting ends. To enable users to join the Teams meetings and start chatting, complete the following steps.

## Run the code

You can build and run the code on Visual Studio. The supported solution platforms are: `x64`,`x86`, and `ARM64`. 

1. Open an instance of PowerShell, Windows Terminal, Command Prompt, or equivalent and navigate to the directory that you'd like to clone the sample to.
2. `git clone https://github.com/Azure-Samples/Communication-Services-dotnet-quickstarts.git`
3. Open the project `ChatTeamsInteropQuickStart/ChatTeamsInteropQuickStart.csproj` in Visual Studio.
4. Install the following NuGet packages versions (or higher):

   ``` csharp
   Install-Package Azure.Communication.Calling -Version 1.0.0-beta.29
   Install-Package Azure.Communication.Chat -Version 1.1.0
   Install-Package Azure.Communication.Common -Version 1.0.1
   Install-Package Azure.Communication.Identity -Version 1.0.1

   ```

5. With the Communication Services resource procured in prerequisites, add the connectionstring to the **ChatTeamsInteropQuickStart/MainPage.xaml.cs** file. 

   ``` csharp
   //Azure Communication Services resource connection string, i.e., = "endpoint=https://your-resource.communication.azure.net/;accesskey=your-access-key";
   private const string connectionString_ = "";
   ```

   > **Important:**
   > * Select the proper platform from the **Solution Platforms** dropdown list in Visual Studio <b>before</b> running the code, such as `x64`
   > * Make sure you enable *Developer Mode* in Windows [(Developer Settings)](https://learn.microsoft.com/windows/apps/get-started/enable-your-device-for-development)
   >  
   >  *The next steps don't work if the platform isn't configured correctly.*

6. Press **F5** to start the project in debugging mode.
7. Paste a valid teams meeting link on the **Teams Meeting Link** box (see the next section).
8. End users click **Join Teams meeting** to start chatting.

> **Important:**
> Once the calling SDK establishes a connection with the teams meeting [See Communication Services calling Windows app](../voice-video-calling/getting-started-with-calling.md), the key functions to handle chat operations are: `StartPollingForChatMessages` and `SendMessageButton_Click`. Both code snippets are in the `ChatTeamsInteropQuickStart\MainPage.xaml.cs` file 

```csharp
        /// <summary>
        /// Background task that keeps polling for chat messages while the call connection is established
        /// </summary>
        private async Task StartPollingForChatMessages()
        {
            CommunicationTokenCredential communicationTokenCredential = new(user_token_);
            chatClient_ = new ChatClient(EndPointFromConnectionString(), communicationTokenCredential);
            await Task.Run(async () =>
            {
                keepPolling_ = true;

                ChatThreadClient chatThreadClient = chatClient_.GetChatThreadClient(thread_Id_);
                int previousTextMessages = 0;
                while (keepPolling_)
                {
                    try
                    {
                        CommunicationUserIdentifier currentUser = new(user_Id_);
                        AsyncPageable<ChatMessage> allMessages = chatThreadClient.GetMessagesAsync();
                        SortedDictionary<long, string> messageList = new();
                        int textMessages = 0;
                        string userPrefix;
                        await foreach (ChatMessage message in allMessages)
                        {
                            if (message.Type == ChatMessageType.Html || message.Type == ChatMessageType.Text)
                            {
                                textMessages++;
                                userPrefix = message.Sender.Equals(currentUser) ? "[you]:" : "";
                                messageList.Add(long.Parse(message.SequenceId), $"{userPrefix}{StripHtml(message.Content.Message)}");
                            }
                        }

                        //Update UI just when there are new messages
                        if (textMessages > previousTextMessages)
                        {
                            previousTextMessages = textMessages;
                            await Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () =>
                            {
                                TxtChat.Text = string.Join(Environment.NewLine, messageList.Values.ToList());
                            });

                        }
                        if (!keepPolling_)
                        {
                            return;
                        }

                        await SetInCallState(true);
                        await Task.Delay(3000);
                    }
                    catch (Exception e)
                    {
                        await Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () =>
                        {
                            _ = new MessageDialog($"An error occurred while fetching messages in PollingChatMessagesAsync(). The application will shutdown. Details : {e.Message}").ShowAsync();
                            throw e;
                        });
                        await SetInCallState(false);
                    }
                }
            });
        }
        private async void SendMessageButton_Click(object sender, RoutedEventArgs e)
        {
            SendMessageButton.IsEnabled = false;
            ChatThreadClient chatThreadClient = chatClient_.GetChatThreadClient(thread_Id_);
            _ = await chatThreadClient.SendMessageAsync(TxtMessage.Text);
            
            TxtMessage.Text = "";
            SendMessageButton.IsEnabled = true;
        }
```

## Get a Teams meeting link

Retrieve the Teams meeting link using Graph APIs, as described in [Graph documentation](https://learn.microsoft.com/graph/api/onlinemeeting-createorget?tabs=http\&view=graph-rest-beta\&preserve-view=true). This link is returned as part of the `onlineMeeting` resource, accessible under the [`joinWebUrl` property](https://learn.microsoft.com/graph/api/resources/onlinemeeting?view=graph-rest-beta\&preserve-view=true). 

You can also get the required meeting link from the **Join Meeting** URL in the Teams meeting invite itself.

A Teams meeting link looks like the following URL:

   ```html
   https://teams.microsoft.com/l/meetup-join/meeting_chat_thread_id/1606337455313?context=some_context_here`.
   ```

If your Teams link has a different format, you need to retrieve the thread ID using the Graph API.

Screenshot of the completed csharp Application.

> **Note:** 
> Certain features are currently not supported for interoperability scenarios with Teams. For more information about supported features, see [Teams meeting capabilities for Teams external users](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/concepts/interop/guest/capabilities.md).




## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../create-communication-resource.md#clean-up-resources).

## Related articles

- Check out our [chat hero sample](../../samples/chat-hero-sample.md)
- Learn more about [how chat works](../../concepts/chat/concepts.md)
