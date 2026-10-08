---
title: Tutorial - Migrate from Twilio Conversations Chat to Azure Communication Services
titleSuffix: An Azure Communication Services tutorial
description: Learn how to migrate a chat product from Twilio Conversations to Azure Communication Services.
author: kperla97
services: azure-communication-services

ms.author: kaperla
ms.date: 08/28/2024
ms.topic: how-to
ms.service: azure-communication-services
ms.subservice: chat
ms.custom: template-how-to
zone_pivot_groups: acs-migrate-twilio
---

# Migrate from Twilio Conversations Chat to Azure Communication Services


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to migrate an existing Twilio Conversations implementation to the [Azure Communication Services Chat SDK](../concepts/chat/sdk-features.md). Both Twilio Conversations s and Azure Communication Services Chat SDK are cloud-based platforms that enable developers to add chat features to their web applications.

However, there are some key differences between them that might affect your choice of platform or require some changes to your existing code if you decide to migrate. In Twilio, chat is embedded into a conversation which is a multichannel instance. Azure Communication Services Chat SDK is a single channel for chat. In this article, we compare the main features and functions of both platforms and provide some guidance on how to migrate an existing Twilio Conversations chat implementation to Azure Communication Services Chat SDK.

This article doesn't cover creating a service tier to manage tokens for your chat application. For more information about chat architecture, see [chat concepts](../concepts/chat/concepts.md). For more information about access tokens, see [user access tokens](../quickstarts/identity/access-tokens.md).
 
## Key considerations
### Authentication and Security
Azure Communication Services integrates deeply with Microsoft Entra ID for identity management. Twilio uses its own identity system. You might need to rework how you handle user authentication.

### Event Handling
Twilio’s webhook-based approach might require a different architecture compared to ACS’s event-driven model.

### Other Services
If your application relies on other Twilio services (like SMS, Voice, and so on.), you need to find equivalent Azure services or maintain hybrid solutions.

Migrating might involve not just replacing API calls but also rethinking how your application interacts with these communication services within the broader context of your application's architecture.

## Key features available in Azure Communication Services Chat SDK

| **Feature** | **JavaScript SDK** | **iOS SDK** | **Android SDK** | **.NET SDK** | **Java SDK** | **Python SDK** |
| --- | --- | --- | --- | --- | --- | --- |
| **Install** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Import** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Auth** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Real-time messaging** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Update sent message** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Group conversations** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Direct (one-to-one) conversations** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Update topic of a chat thread** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Add or remove participant** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **List of participants in a chat thread** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Delete chat thread** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Share chat history** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Media support (images, files, etc.)** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Message delivery receipts** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Typing indicators** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Read receipts** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Push notifications** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Multi-device support** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Message search** | \- | \- | \- | \- | \- | \- |
| **Message editing** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Message deletion** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **User roles and permissions** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Conversation moderation** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Participant management** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Integration with other Azure services** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Client-side encryption** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Server-side message storage** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Bot integration** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Custom message metadata** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **User presence status** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Localized and multi-language support** | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |


| Group of features | Capability | Azure CLI | JavaScript | Java | .NET | Python | iOS | Android |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Core Capabilities | Create a chat thread between 2 or more users | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Update the topic of a chat thread | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Add or remove participants from a chat thread | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Choose whether to share chat message history with the participant being added | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Get a list of participants in a chat thread | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Delete a chat thread | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Given a communication user, get the list of chat threads the user is part of | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Get info for a particular chat thread | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Send and receive messages in a chat thread | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Update the content of your sent message | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Delete a message you previously sent | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Read receipts for messages that have been read by other participants in a chat | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Get notified when participants are actively typing a message in a chat thread | ❌ | ✔️ | ❌ | ❌ | ❌ | ✔️ | ✔️ |
|  | Get all messages in a chat thread | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Send Unicode emojis as part of message content | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Add metadata to chat messages | ❌ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Add display name to typing indicator notification | ❌ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| Real-time notifications (enabled by proprietary signaling package**) | Chat clients can subscribe to get real-time updates for incoming messages and other operations occurring in a chat thread. To see a list of supported updates for real-time notifications, see [Chat concepts](../concepts/chat/concepts.md#real-time-notifications) | ❌ | ✔️ | ❌ | ❌ | ❌ | ✔️ | ✔️ |
| Mobile push notifications with Notification Hub | The Chat SDK provides APIs allowing clients to be notified for incoming messages and other operations occurring in a chat thread by connecting an Azure Notification Hub to your Communication Services resource. In situations where your mobile app is not running in the foreground, patterns are available to [fire pop-up notifications](../concepts/notifications.md) ("toasts") to inform end-users, see [Chat concepts](../concepts/chat/concepts.md#push-notifications). | ❌ | ❌ | ❌ | ❌ | ❌ | ✔️ | ✔️ |
| Reporting </br>(This info is available under Monitoring tab for your Communication Services resource on Azure portal) | Understand API traffic from your chat app by monitoring the published metrics in Azure Metrics Explorer and set alerts to detect abnormalities | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
|  | Monitor and debug your Communication Services solution by enabling diagnostic logging for your resource | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

**Applies to: programming-language-javascript**


## Prerequisites

- **Azure Account:** Make sure that your Azure account is active. New users can create a free account at [Microsoft Azure](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- **Node.js 18:** Ensure Node.js 18 is installed on your system. Download from [Node.js](https://nodejs.org/en).
- **Communication Services Resource:** Set up a [Communication Services Resource](../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp) via your Azure portal and note your connection string.
- **Azure CLI:** Follow the instructions to [Install Azure CLI on Windows](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).
- **User Access Token:** Generate a user access token to instantiate the chat client. You can create one using the Azure CLI as follows:

```console
az communication identity token issue --scope voip --connection-string "yourConnectionString"
```

For more information, see [Use Azure CLI to Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md?pivots=platform-azcli).


## Installation

### Install the Azure Communication Services Chat SDK

Use the `npm install` command to install the Azure Communication Services SDK for JavaScript.

```console
npm install @azure/communication-chat --save
```

The `--save` option adds the library as a dependency in your **package.json** file.


### Remove the Twilio SDK from the project

You can remove the Twilio SDK from your project by uninstalling the package.

```console
npm uninstall twilio-conversations
```

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Chat SDK for JavaScript.

| Name | Description |
| --- | --- |
| `ChatClient` | This class is needed for the Chat function. Instantiate it with your subscription information, and use it to create, get, delete threads, and subscribe to chat events. |
| `ChatThreadClient` | This class is needed for the Chat Thread function. Get an instance via the `ChatClient`, and use it to send/receive/update/delete messages, add/remove/get users, send typing notifications, and read receipts. |

### Initialize the Chat Client

#### Twilio

```JavaScript
/* Initialization */
import { Client } from '@twilio/conversations';

const token = await fetch(token_url);
const client = new Client(token);
client.on('stateChanged', (state) => {
  if (state === 'failed') {
    // The client failed to initialize
    return;
  }

  if (state === 'initialized') {
    // Use the client
  }
});
```
#### Azure Communication Services

Similar to Twilio, the first step is to get an **access token** and the Communication Service **endpoint** that was generated as part of the prerequisite steps. Replace the placeholders in the code.

```JavaScript
import { ChatClient } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';

// Your unique Azure Communication service endpoint
let endpointUrl = '<replace with your resource endpoint>';
// The user access token generated as part of the pre-requisites
let userAccessToken = '<USER_ACCESS_TOKEN>';

let chatClient = new ChatClient(endpointUrl, new AzureCommunicationTokenCredential(userAccessToken));
console.log('Azure Communication Chat client created!');
```

### Start a chat thread

#### Twilio

Start a chat thread in Twilio Conversations. Use `FriendlyName` to give a human-readable name to this conversation.

```JavaScript
let conversation = await client.createConversation({
    friendlyName: "Testing Chat"
});
await conversation.join();
```

#### Azure Communication Services

Use the `createThread` method to create a chat thread.

Use `createThreadRequest` to describe the thread request:

- Use `topic` to give a topic to this chat. update `topic` after you create the chat thread using the `UpdateThread` function.
- Use `participants` to list the participants to be added to the chat thread.

When resolved, `createChatThread` method returns a `CreateChatThreadResult`. This model contains a `chatThread` property where you can access the `id` of the newly created thread. Then use the `id` to get an instance of a `ChatThreadClient`. Then use the `ChatThreadClient` to perform operation within the thread such as sending messages or listing participants.

```JavaScript
async function createChatThread() {
  const createChatThreadRequest = {
    topic: "Hello, World!"
  };
  const createChatThreadOptions = {
    participants: [
      {
        id: { communicationUserId: '<USER_ID>' },
        displayName: '<USER_DISPLAY_NAME>'
      }
    ]
  };
  const createChatThreadResult = await chatClient.createChatThread(
    createChatThreadRequest,
    createChatThreadOptions
  );
  const threadId = createChatThreadResult.chatThread.id;
  return threadId;
}
```

### Get a chat thread client

#### Twilio

Get a chat thread (conversation) in Twilio.

```JavaScript
if (selectedConversation) {
      conversationContent = (
        <Conversation
          conversationProxy={selectedConversation}
          myIdentity={this.state.name}
        />
      );
    } else if (status !== "success") {
      conversationContent = "Loading your conversation!";
    } else {
      conversationContent = "";
    }
```

#### Azure Communication Services

The `getChatThreadClient` method returns a `chatThreadClient` for a thread that already exists. Use it to perform operations on the created thread: add participants, send message, and so on. The `threadId` is the unique ID of the existing chat thread.

```JavaScript
let chatThreadClient = chatClient.getChatThreadClient(threadId);
console.log(`Chat Thread client for threadId:${threadId}`);
```

Add this code in place of the `<CREATE CHAT THREAD CLIENT>` comment in **client.js**, refresh your browser tab, and check the console. You should see:

```console
Chat Thread client for threadId: <threadId>
```

### Add a user as a participant to the chat thread

Once you create a chat thread, you can then add and remove users from it. By adding users, you give them access to send messages to the chat thread and add/remove other participants.

#### Twilio

Add a participant to a chat thread.

```JavaScript
// add chat participant to the conversation by its identity
await conversation.add('identity');

// adds yourself as a conversations sdk user to this conversation
// use after creating the conversation from the SDK
await conversation.join();

conversation.on('participantJoined', (participant) => {
  // fired when a participant has joined the conversation
});
```

#### Azure Communication Services

Before calling the `addParticipants` method, be sure to acquire a new access token and identity for that user. The user needs that access token to initialize their chat client.

`addParticipantsRequest` describes the request object wherein `participants` lists the participants to be added to the chat thread:
- `id`, required, is the communication identifier to be added to the chat thread.
- `displayName`, optional, is the display name for the thread participant.
- `shareHistoryTime`, optional, is the time from which the chat history is shared with the participant. To share history since the inception of the chat thread, set this property to any date equal to, or less than the thread creation time. To share no history previous to when the participant was added, set it to the current date. To share partial history, set it to the date of your choice.

```JavaScript

const addParticipantsRequest =
{
  participants: [
    {
      id: { communicationUserId: '<NEW_PARTICIPANT_USER_ID>' },
      displayName: 'Jane'
    }
  ]
};

await chatThreadClient.addParticipants(addParticipantsRequest);

```
Replace **NEW_PARTICIPANT_USER_ID** with a [new user ID](../quickstarts/identity/access-tokens.md)

### Send a message to a chat thread

Unlike Twilio, Azure Communication Services doesn't have separate functions for sending text messages or media.

#### Twilio

To send a text message in Twilio.

```JavaScript
// Send Text Message
await conversation
  .prepareMessage()
  .setBody('Hello!')
  .setAttributes({foo: 'bar'})
  .build()
  .send();

```

To send media in Twilio.

```JavaScript
 const file =
  await fetch("https://v.fastcdn.co/u/ed1a9b17/52533501-0-logo.svg");
const fileBlob = await file.blob();
// Send a media message
const sendMediaOptions = {
    contentType: file.headers.get("Content-Type"),
    filename: "twilio-logo.svg",
    media: fileBlob
};

await conversation
  .prepareMessage()
  .setBody('Here is some media!')
  .addMedia(sendMediaOptions);

```

#### Azure Communication Services

Use `sendMessage` method to send a message to a thread identified by threadId.

`sendMessageRequest` is used to describe the message request:

- Use `content` to provide the chat message content.

Use `sendMessageOptions` to describe the operation optional params:

- Use `senderDisplayName` to specify the display name of the sender.
- Use `type` to specify the message type, such as `text` or `html`.

To recreate the "Media" property in Twilio.
- Use `metadata` optionally to include any other data you want to send along with the message. This field enables developers to extend the chat message function and add custom information for your use case. For example, when sharing a file link in the message, you might want to add `hasAttachment: true` in metadata so that recipient's application can parse that and display accordingly. For more information, see [File sharing](file-sharing-tutorial-acs-chat.md).

`SendChatMessageResult` is the response returned from sending a message. It contains an ID, which is the unique ID of the message.

```JavaScript
const sendMessageRequest =
{
  content: 'Please take a look at the attachment'
};
let sendMessageOptions =
{
  senderDisplayName : 'Jack',
  type: 'text',
  metadata: {
    'hasAttachment': 'true',
    'attachmentUrl': 'https://contoso.com/files/attachment.docx'
  }
};
const sendChatMessageResult = await chatThreadClient.sendMessage(sendMessageRequest, sendMessageOptions);
const messageId = sendChatMessageResult.id;
console.log(`Message sent!, message id:${messageId}`);
```

### Receive chat messages from a chat thread

Unlike Twilio, Azure Communication Services doesn't have separate functions to receive text messages or media. Azure Communication Services uses Azure Event Grid to handle events. For more information, see [Event Handling](https://learn.microsoft.com/azure/event-grid/event-schema-communication-services).

#### Twilio

To receive a text message in Twilio.

```JavaScript
// Receive text message
 let paginator =
  await conversation.getMessages(
    30,0,"backwards"
  );

const messages = paginator.items;
```

To receive media in Twilio.

```JavaScript
// Receive media
// Return all media attachments (possibly empty array), without temporary urls
const media = message.attachedMedia;

// Get a temporary URL for the first media returned by the previous method
const mediaUrl = await media[0].getContentTemporaryUrl();
```

#### Azure Communication Services

With real-time signaling, you can subscribe to listen for new incoming messages and update the current messages in memory accordingly. Azure Communication Services supports a [list of events that you can subscribe to](../concepts/chat/concepts.md#real-time-notifications).

```JavaScript
// open notifications channel
await chatClient.startRealtimeNotifications();
// subscribe to new notification
chatClient.on("chatMessageReceived", (e) => {
  console.log("Notification chatMessageReceived!");
  // your code here
});

```

Alternatively you can retrieve chat messages by polling the `listMessages` method at specified intervals.

```JavaScript

const messages = chatThreadClient.listMessages();
for await (const message of messages) {
   // your code here
}

```

`listMessages` returns different types of messages that you can identify by `chatMessage.type`. 

For more information, see [Message Types](../concepts/chat/concepts.md#message-types).

#### Subscribe to connection status of real time notifications

Similar to Twilio, Azure Communication Services enables you to subscribe to event notifications.

Subscribing to events `realTimeNotificationConnected` and `realTimeNotificationDisconnected` lets you know when the connection to the call server is active.

```JavaScript
// subscribe to realTimeNotificationConnected event
chatClient.on('realTimeNotificationConnected', () => {
  console.log("Real time notification is now connected!");
  // your code here
});
// subscribe to realTimeNotificationDisconnected event
chatClient.on('realTimeNotificationDisconnected', () => {
  console.log("Real time notification is now disconnected!");
  // your code here
});
```



**Applies to: programming-language-android**


## Prerequisites

- Create an Azure account with an active subscription. For more information, see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Visual Studio](https://visualstudio.microsoft.com/downloads/).
- Create an Azure Communication Services resource. For more information, see [Create an Azure Communication Services resource](../quickstarts/create-communication-resource.md). Record your resource **endpoint and connection string**.
- A [User Access Token](../quickstarts/identity/access-tokens.md). Be sure to set the scope to **chat**, and **note the token string and user_id string**. You can also use the Azure CLI and run the following command with your connection string to create a user and an access token.

  ```azurecli-interactive
  az communication identity token issue --scope chat --connection-string "yourConnectionString"
  ```

  For more information, see [Use Azure CLI to Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md?pivots=platform-azcli).

## Conceptual Difference

Both Twilio Conversations and Azure Communication Services Chat offer similar functions, but their implementation differs due to the surrounding ecosystems and underlying platform philosophies. Twilio Conversations provide a multi-channel communication API. Azure Communication Services Chat is focused primarily on chat within the Azure ecosystem. This migration guide provides a basic mapping between common operations in Twilio and their equivalents in Azure Communication Services Chat, helping you transition your .NET code.

### Identities

#### Twilio

Twilio Conversations uses identity strings directly.

#### Azure Communication Services 

Azure Communication Services requires creating users through the `CommunicationIdentityClient`.

## Setting up

### Install the package

To start the migration from Twilio Conversations chat, the first step is to install the Azure Communication Services Chat SDK for .NET to your project.

```PowerShell
dotnet add package Azure.Communication.Chat
```

## Object model

The following classes handle some of the major features of the Azure Communication Services Chat SDK for C#.

| Name | Description |
| --- | --- |
| `ChatClient` | This class is needed for the Chat functionality. You instantiate it with your subscription information, and use it to create, get, and delete threads. |
| `ChatThreadClient` | This class is needed for the Chat Thread functionality. You obtain an instance via the ChatClient, and use it to send/receive/update/delete messages, add/remove/get participants, send typing notifications and read receipts. |

## Create a chat client

#### Twilio 

Twilio requires you to set up the Twilio client using your account credentials:

```csharp
var twilio = new TwilioRestClient(accountSid, authToken);
```

#### Azure Communication Services 

To create a chat client in Azure Communication Services, use your Communication Services endpoint and the access token that was generated as part of the prerequisite steps. You need to use the `CommunicationIdentityClient` class from the Identity SDK to create a user and issue a token to pass to your chat client.

Learn more about [User Access Tokens](../quickstarts/identity/access-tokens.md).

```csharp
// Your unique Azure Communication service endpoint
Uri endpoint = new Uri("<replace with your resource endpoint>");
CommunicationTokenCredential communicationTokenCredential = new CommunicationTokenCredential(<Access_Token>);
ChatClient chatClient = new ChatClient(endpoint, communicationTokenCredential);
```

### Start a chat thread

#### Twilio Conversations

```csharp
var conversation = ConversationResource.Create(
    friendlyName: "My Conversation",
    messagingServiceSid: "<MessagingServiceSid>"
);
```

#### Azure Communication Services 

In Azure Communication Services, you create a thread, which is equivalent to a conversation in Twilio.

To create a chat thread, use the `createChatThread` method on the chatClient:
- Use `topic` to give a topic to this chat; you can update the `topic` after the chat thread is created using the `UpdateTopic` function.
- Use `participants` property to pass a  list of `ChatParticipant` objects to be added to the chat thread. Initialize the `ChatParticipant` object with a `CommunicationIdentifier` object. `CommunicationIdentifier` could be of type `CommunicationUserIdentifier`, `MicrosoftTeamsUserIdentifier`, or `PhoneNumberIdentifier`. For example, to get a `CommunicationIdentifier` object, you need to pass an Access ID created following the instructions to [Create a user](../quickstarts/identity/access-tokens.md#create-an-identity).

The response object from the `createChatThread` method contains the `chatThread` details. To interact with the chat thread operations such as adding participants, sending a message, deleting a message, and so on, instantiate a `chatThreadClient` client instance using the `GetChatThreadClient` method on the `ChatClient` client.

```csharp
var chatParticipant = new ChatParticipant(identifier: new CommunicationUserIdentifier(id: "<Access_ID>"))
{
    DisplayName = "UserDisplayName"
};
CreateChatThreadResult createChatThreadResult = await chatClient.CreateChatThreadAsync(topic: "Hello world!", participants: new[] { chatParticipant });
ChatThreadClient chatThreadClient = chatClient.GetChatThreadClient(threadId: createChatThreadResult.ChatThread.Id);
string threadId = chatThreadClient.Id;
```

### Get a chat thread client

##### Twilio

In Twilio Conversations, you interact directly with a conversation using the conversation's SID (unique identifier). Here's how to typically get a conversation and interact with it:

```csharp
var conversationSid = "<CONVERSATION_SID>";
var conversation = ConversationResource.Fetch(pathSid: conversationSid);

// Example: Fetching all messages in the conversation
var messages = MessageResource.Read(pathConversationSid: conversationSid);
foreach (var message in messages)
{
    Console.WriteLine(message.Body);
}
```

#### Azure Communication Services 

The `GetChatThreadClient` method returns a thread client for a thread that already exists. You can use it to perform operations on the created thread: add members, send message, and so on. `threadId` is the unique ID of the existing chat thread.

```csharp
string threadId = "<THREAD_ID>";
ChatThreadClient chatThreadClient = chatClient.GetChatThreadClient(threadId: threadId);
```

### List all chat threads

##### Twilio

In Twilio Conversations, you can retrieve all conversations that a user is a participant in by querying the `UserConversations` resource. This resource provides a list of conversations for a specific user.

```csharp
/ Initialize Twilio Client
string accountSid = "<YOUR_ACCOUNT_SID>";
string authToken = "<YOUR_AUTH_TOKEN>";
TwilioClient.Init(accountSid, authToken);

// The identity of the user you're querying
string userIdentity = "user@example.com";

// Retrieve all conversations the user is part of
var userConversations = UserConversationResource.Read(pathUserSid: userIdentity);

foreach (var userConversation in userConversations)
{
    Console.WriteLine($"Conversation SID: {userConversation.ConversationSid}");
    // You can fetch more details about the conversation if needed
    var conversation = Twilio.Rest.Conversations.V1.ConversationResource.Fetch(pathSid: userConversation.ConversationSid);
    Console.WriteLine($"Conversation Friendly Name: {conversation.FriendlyName}");
}
```

#### Azure Communication Services 

Use `GetChatThreads` to retrieve all the chat threads that the user is part of.

```csharp
AsyncPageable<ChatThreadItem> chatThreadItems = chatClient.GetChatThreadsAsync();
await foreach (ChatThreadItem chatThreadItem in chatThreadItems)
{
    Console.WriteLine($"{ chatThreadItem.Id}");
}
```

### Send a message to a chat thread

##### Twilio

The following code snippet shows how to send a text message.

```csharp
var message = MessageResource.Create(
    body: "Hello, world!",
    from: "user@example.com",
    pathConversationSid: conversation.Sid
);
```

The following code snippet shows how to send a media file.

```csharp
// The SID of the conversation you want to send the media message to
string conversationSid = "<CONVERSATION_SID>";

// The URL of the media file you want to send
var mediaUrl = new List<Uri>
{
    new Uri("https://example.com/path/to/media/file.jpg") // Replace with your actual media URL
};

// Send the media message
var message = MessageResource.Create(
    body: "Here is an image for you!",
    from: "user@example.com", // Sender's identity (optional)
    mediaUrl: mediaUrl,
    pathConversationSid: conversationSid
);
```

#### Azure Communication Services

Unlike Twilio, Azure Communication Services doesn't have a separate function to send text messages or media.

Use `SendMessage` to send a message to a thread.
- Use `content`, required, to provide the content for the message.
- Use `type` for the content type of the message such as `Text` or `Html`. If not specified, `Text` is the default.
- Use `senderDisplayName` to specify the display name of the sender. If not specified, empty string is the default.
- Use `metadata` optionally to include other data you want to send along with the message. This field provides a mechanism for developers to extend chat message function and add custom information for your use case. For example, when sharing a file link in the message, you might want to add `hasAttachment:true` in the metadata so that recipient's application can parse that and display accordingly.

```csharp
SendChatMessageOptions sendChatMessageOptions = new SendChatMessageOptions()
{
    Content = "Please take a look at the attachment",
    MessageType = ChatMessageType.Text
};
sendChatMessageOptions.Metadata["hasAttachment"] = "true";
sendChatMessageOptions.Metadata["attachmentUrl"] = "https://contoso.com/files/attachment.docx";

SendChatMessageResult sendChatMessageResult = await chatThreadClient.SendMessageAsync(sendChatMessageOptions);

string messageId = sendChatMessageResult.Id;
```

### Receive chat messages from a chat thread

##### Twilio

Twilio typically uses webhooks to notify your server of incoming messages:

The following code snippet shows how to receive a text message.

```csharp
public IActionResult ReceiveMessage()
{
    var incomingMessage = Request.Form["Body"];
    // Process the incoming message
    return Ok();
}
```

The following code snippet shows how to receive a media file.
```csharp
 for (var i = 0; i < numMedia; i++)
            {
                var mediaUrl = Request.Form[$"MediaUrl{i}"];
                Trace.WriteLine(mediaUrl);
                var contentType = Request.Form[$"MediaContentType{i}"];

                var filePath = GetMediaFileName(mediaUrl, contentType);
                await DownloadUrlToFileAsync(mediaUrl, filePath);
            }
```

#### Azure Communication Services

Unlike Twilio, Azure Communication Services doesn't have a separate function to receive text messages or media.

Azure Communication Services Chat enables you to subscribe to events directly within the application.

You can retrieve chat messages by polling the `GetMessages` method on the chat thread client at specified intervals.

```csharp
AsyncPageable<ChatMessage> allMessages = chatThreadClient.GetMessagesAsync();
await foreach (ChatMessage message in allMessages)
{
    Console.WriteLine($"{message.Id}:{message.Content.Message}");
}
```

`GetMessages` takes an optional `DateTimeOffset` parameter. If that offset is specified, you receive messages that were received, updated, or deleted after it. Messages received before the offset time but edited or removed after it are also returned.

`GetMessages` returns the latest version of the message, including any edits or deletes that happened to the message using `UpdateMessage` and `DeleteMessage`. For deleted messages, `chatMessage.DeletedOn` returns a datetime value indicating when that message was deleted. For edited messages, `chatMessage.EditedOn` returns a datetime indicating when the message was edited. You can access the original time of message creation using `chatMessage.CreatedOn`, and use it for ordering the messages.

`GetMessages` returns different types of messages, which you can identify by `chatMessage.Type`. These types are:

- `Text`: Regular chat message sent by a thread member.

- `Html`:  A formatted text message. Note that Communication Services users currently can't send `RichText` messages. This message type is supported by messages sent from Teams users to Communication Services users in Teams Interop scenarios.

- `TopicUpdated`: System message that indicates the topic has been updated. (readonly)

- `ParticipantAdded`: System message that indicates one or more participants have been added to the chat thread. (readonly)

- `ParticipantRemoved`: System message that indicates a participant has been removed from the chat thread.

For more information, see [Message Types](../concepts/chat/concepts.md#message-types).

### Add a user as a participant to the chat thread

#### Twilio 

```csharp
var participant = ParticipantResource.Create(
    pathConversationSid: conversation.Sid,
    identity: "user@example.com"
);
```

#### Azure Communication Services 

In Azure Communication Services, you add participants when creating the chat thread or afterwards:

Once you create a thread, you can add and remove users. Adding users gives them access to send messages to the thread, and add/remove other participants. Before calling `AddParticipants`, ensure that you acquire a new access token and identity for that user. The user needs the access token to initialize their chat client.

Use `AddParticipants` to add one or more participants to the chat thread. The following are the supported attributes for each thread participant(s):
- `communicationUser`, required, is the identity of the thread participant.
- `displayName`, optional, is the display name for the thread participant.
- `shareHistoryTime`, optional, time from which the chat history is shared with the participant.

```csharp
var josh = new CommunicationUserIdentifier(id: "<Access_ID_For_Josh>");
var gloria = new CommunicationUserIdentifier(id: "<Access_ID_For_Gloria>");
var amy = new CommunicationUserIdentifier(id: "<Access_ID_For_Amy>");

var participants = new[]
{
    new ChatParticipant(josh) { DisplayName = "Josh" },
    new ChatParticipant(gloria) { DisplayName = "Gloria" },
    new ChatParticipant(amy) { DisplayName = "Amy" }
};

await chatThreadClient.AddParticipantsAsync(participants: participants);
```

### Get thread participants

##### Twilio

In Twilio Conversations, you use the `ConversationResource` to retrieve the participants of a specific conversation. You can then list all participants associated with that conversation.

```csharp
// The SID of the conversation you want to retrieve participants from
string conversationSid = "<CONVERSATION_SID>";

// Retrieve all participants in the conversation
var participants = ParticipantResource.Read(pathConversationSid: conversationSid);

// Output details of each participant
foreach (var participant in participants)
{
    Console.WriteLine($"Participant SID: {participant.Sid}");
            
}
```

#### Azure Communication Services 

Use `GetParticipants` to retrieve the participants of the chat thread.

```csharp
AsyncPageable<ChatParticipant> allParticipants = chatThreadClient.GetParticipantsAsync();
await foreach (ChatParticipant participant in allParticipants)
{
    Console.WriteLine($"{((CommunicationUserIdentifier)participant.User).Id}:{participant.DisplayName}:{participant.ShareHistoryTime}");
}
```

### Send read receipt

##### Twilio
```csharp
// Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.FetchAsync(
            pathConversationSid: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(message.Delivery);
    }
```

#### Azure Communication Services 
Use `SendReadReceipt` to notify other participants that the user read the message.

```csharp
await chatThreadClient.SendReadReceiptAsync(messageId: messageId);
```



**Applies to: programming-language-swift**


## Prerequisites

- **Azure Account:** Make sure that your Azure account is active. New users can create a free account at [Microsoft Azure](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- **Communication Services Resource:** Set up a [Communication Services Resource](../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp) via your Azure portal and note your connection string.
- **Azure CLI:** Follow the instructions to [Install Azure CLI on Windows](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).
- **User Access Token:** Generate a user access token to instantiate the call client. You can create one using the Azure CLI as follows:

```console
az communication identity token issue --scope voip --connection-string "yourConnectionString"
```

For more information, see [Use Azure CLI to Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md?pivots=platform-azcli).

## Installation

### Install the libraries

To start the migration from Twilio Conversations Chat, the first step is to install the Azure Communication Services Chat SDK for iOS to your project. You can configure these parameters using `CocoaPods`.

1. Create a Podfile for your application. Open the terminal, navigate to the project folder, and run:

 `pod init`

2. Add the following code to the Podfile and save (make sure that "target" matches the name of your project):

```
pod 'AzureCommunicationChat', '~> 1.3.5'
```

3. Set up the `.xcworkspace` project:

```shell
pod install
```

4. Open the `.xcworkspace` created by the pod install with Xcode.

### Authenticating to the SDK

To use the Azure Communication Services Chat SDK, you need to authenticate using an access token.

#### Twilio

The following code snippets presume the availability of a valid access token for Twilio Services.


```swift
static func getTokenUrlFromDefaults(identity: String, password: String) -> URL? {
        // Get token service absolute URL from settings
        guard let tokenServiceUrl = UserDefaults.standard.string(forKey: "ACCESS_TOKEN_SERVICE_URL"), !tokenServiceUrl.isEmpty else {
            return nil
        }
        return constructLoginUrl(tokenServiceUrl, identity: identity, password: password)
    }
```

#### Azure Communication Services

The following code snippets require a valid access token to initiate a `CallClient`.

You need a valid token. For more information, see [Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md).

```swift
// Create an instance of CallClient 
let callClient = CallClient() 
 
// A reference to the call agent, it will be initialized later 
var callAgent: CallAgent? 
 
// Embed the token in a CommunicationTokenCredential object 
let userCredential = try? CommunicationTokenCredential(token: "<USER_TOKEN>") 
 
// Create a CallAgent that will be used later to initiate or receive calls 
callClient.createCallAgent(userCredential: userCredential) { callAgent, error in 
 if error != nil { 
        // Raise the error to the user and return 
 } 
 self.callAgent = callAgent         
} 
```

### Initialize Chat Client

#### Twilio

The following code snippet initializes the chat client in Twilio.

```swift
func fetchAccessTokenAndInitializeClient() {
        let identity = "user_identity" // Replace with actual user identity
        let urlString = "http://localhost:3000/token?identity=\(identity)"
        
        guard let url = URL(string: urlString) else { return }
        
        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else {
                print("Error fetching token: \(String(describing: error))")
                return
            }
            
            do {
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
                   let token = json["token"] as? String {
                    self.initializeConversationsClient(withToken: token)
                }
            } catch {
                print("Error parsing token JSON: \(error)")
            }
        }
        
        task.resume()
    }
```m = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
```

#### Azure Communication Services

To create a chat client, use your Communication Services endpoint and the access token generated as part of the prerequisite steps.

Replace `<ACS_RESOURCE_ENDPOINT>` with the endpoint of your Azure Communication Services resource. Replace `<ACCESS_TOKEN>` with a valid Communication Services access token.

```swift
let endpoint = "<ACS_RESOURCE_ENDPOINT>"
let credential =
try CommunicationTokenCredential(
    token: "<ACCESS_TOKEN>"
)
let options = AzureCommunicationChatClientOptions()

let chatClient = try ChatClient(
    endpoint: endpoint,
    credential: credential,
    withOptions: options
)
```

## Object model 

The following classes and interfaces handle some of the major features of the Azure Communication Services Chat SDK for iOS.

| Name | Description |
| --- | --- |
| `ChatClient` | This class is needed for the chat function. You instantiate it with your subscription information, and use it to create, get, delete threads, and subscribe to chat events. |
| `ChatThreadClient` | This class is needed for the chat thread function. You get an instance via `ChatClient`, and use it to send, receive, update, and delete messages. You can also use it to add, remove, get users, and send typing notifications and read receipts. |


### Start a chat thread

#### Twilio

The following code snippet enables you to create a new chat thread.

```swift
    // the unique name of the conversation you create
    private let uniqueConversationName = "general"

    // For the quickstart, this will be the view controller
    weak var delegate: QuickstartConversationsManagerDelegate?

    // MARK: Conversations variables
    private var client: TwilioConversationsClient?
    private var conversation: TCHConversation?
    private(set) var messages: [TCHMessage] = []
    private var identity: String?

    func conversationsClient(_ client: TwilioConversationsClient, synchronizationStatusUpdated status: TCHClientSynchronizationStatus) {
        guard status == .completed else {
            return
        }

        checkConversationCreation { (_, conversation) in
           if let conversation = conversation {
               self.joinConversation(conversation)
           } else {
               self.createConversation { (success, conversation) in
                   if success, let conversation = conversation {
                       self.joinConversation(conversation)
                   }
               }
           }
        }
```

#### Azure Communication Services

The response returned from creating a chat thread is `CreateChatThreadResult`.
It contains a `chatThread` property, which is the `ChatThreadProperties` object. This object contains the `threadId`, which you can use to get a `ChatThreadClient` for performing operations on the created thread: add participants, send message, and so on.

Replace the comment `<CREATE A CHAT THREAD>` with the following code snippet:

```swift
let request = CreateChatThreadRequest(
    topic: "Quickstart",
    participants: [
        ChatParticipant(
            id: CommunicationUserIdentifier("<USER_ID>"),
            displayName: "Jack"
        )
    ]
)

var threadId: String?
chatClient.create(thread: request) { result, _ in
    switch result {
    case let .success(result):
        threadId = result.chatThread?.id

    case .failure:
        fatalError("Failed to create thread.")
    }
    semaphore.signal()
}
semaphore.wait()
```

Replace `<USER_ID>` with a valid Communication Services user ID.

You're using a semaphore here to wait for the completion handler before continuing. In later steps, use the `threadId` from the response returned to the completion handler.


### Get a chat thread client

#### Twilio

The following code snippet shows how to get a chat thread client in Twilio.

```swift
func conversationsClient(_ client: TwilioConversationsClient, synchronizationStatusUpdated status: TCHClientSynchronizationStatus) {
        guard status == .completed else {
            return
        }

        checkConversationCreation { (_, conversation) in
           if let conversation = conversation {
               self.joinConversation(conversation)
           } else {
               self.createConversation { (success, conversation) in
                   if success, let conversation = conversation {
                       self.joinConversation(conversation)
                   }
               }
           }
        }
    }
```

#### Azure Communication Services

The `createClient` method returns a `ChatThreadClient` for a thread that already exists. You can use it to perform operations on the created thread: add participants, send message, and so on.

The `threadId` is the unique ID of the existing chat thread.

Replace the comment `<GET A CHAT THREAD CLIENT>` with the following code:

```swift
let chatThreadClient = try chatClient.createClient(forThread: threadId!)
```

### Send a message to a chat thread

Unlike Twilio, Azure Communication Services doesn't have separate function to send text message or media.

#### Twilio

Send a regular text message in Twilio.

```swift
    func sendMessage(_ messageText: String,
                     completion: @escaping (TCHResult, TCHMessage?) -> Void) {

        let messageOptions = TCHMessageOptions().withBody(messageText)
        conversation?.sendMessage(with: messageOptions, completion: { (result, message) in
            completion(result, message)
        })

    }
```

Send media in Twilio:

```swift
/ The data for the image you would like to send
let data = Data()

// Prepare the message and send it
self.conversation.prepareMessage
    .addMedia(data: data, contentType: "image/jpeg", filename: "image.jpg", listener: .init(onStarted: {
        // Called when upload of media begins.
        print("Media upload started")
    }, onProgress: { bytes in
        // Called as upload progresses, with the current byte count.
        print("Media upload progress: \(bytes)")
    }, onCompleted: { sid in
        // Called when upload is completed, with the new mediaSid if successful.
        // Full failure details will be provided through sendMessage's completion.
        print("Media upload completed")
    }, onFailed: { error in
        // Called when upload is completed, with the new mediaSid if successful.
        // Full failure details will be provided through sendMessage's completion.
        print("Media upload failed with error: \(error)")
    }))
    .buildAndSend { result, message in
        if !result.isSuccessful {
            print("Creation failed: \(String(describing: result.error))")
        } else {
            print("Creation successful")
        }
    }
```

#### Azure Communication Services

Use the `send` method to send a message to a thread identified by `threadId`.

Use `SendChatMessageRequest` to describe the message request:

- Use `content` to provide the chat message content.
- Use `senderDisplayName` to specify the display name of the sender.
- Use `type` to specify the message type, such as `text` or `html`.
- Use `metadata` optionally to include any information you want to send along with the message. This field provides a mechanism for developers to extend chat message functionality and add custom information for your use case. For example, when sharing a file link in the message, you might want to add `hasAttachment:true` in metadata so that recipient's application can parse that and display accordingly.

The response returned from sending a message is`SendChatMessageResult`. It contains an ID, which is the unique ID of the message.

Replace the comment `<SEND A MESSAGE>` with the following code snippet:

```swift
let message = SendChatMessageRequest(
                        content: "Hello!",
                        senderDisplayName: "Jack",
                        type: .text,
                        metadata: [
                            "hasAttachment": "true",
                            "attachmentUrl": "https://contoso.com/files/attachment.docx"
                        ]
                    )

var messageId: String?

chatThreadClient.send(message: message) { result, _ in
    switch result {
    case let .success(result):
        print("Message sent, message id: \(result.id)")
        messageId = result.id
    case .failure:
        print("Failed to send message")
    }
    semaphore.signal()
}
semaphore.wait()
```

### Receive chat messages from a chat thread

Unlike Twilio, Azure Communication Services doesn't have a separate function to receive text message or media.

#### Twilio

The following code snippet shows how to receive a text message in Twilio.

```swift
// Called whenever a conversation we've joined receives a new message
    func conversationsClient(_ client: TwilioConversationsClient, conversation: TCHConversation,
                    messageAdded message: TCHMessage) {
        messages.append(message)

        // Changes to the delegate should occur on the UI thread
        DispatchQueue.main.async {
            if let delegate = self.delegate {
                delegate.reloadMessages()
                delegate.receivedNewMessage()
            }
        }
    }
```

Receive media in Twilio:

```swift
conversationsClient.getTemporaryContentUrlsForMedia(message.attachedMedia) { result, mediaSidToUrlMap in
    guard result.isSuccessful else {
        print("Couldn't get temporary urls with error: \(String(describing: result.error))")
        return
    }

    for (sid, url) in sidToUrlMap {
        print("\(sid) -> \(url)")
    }
}
```

#### Azure Communication Services

With real-time signaling, you can subscribe to listen for new incoming messages and update the current messages in memory accordingly. Azure Communication Services supports a [list of events that you can subscribe to](../concepts/chat/concepts.md#real-time-notifications).

Replace the comment `<RECEIVE MESSAGES>` with the following code. After enabling notifications, try sending new messages to see the `ChatMessageReceivedEvents`.

```swift
chatClient.startRealTimeNotifications { result in
    switch result {
    case .success:
        print("Real-time notifications started.")
    case .failure:
        print("Failed to start real-time notifications.")
    }
    semaphore.signal()
}
semaphore.wait()

chatClient.register(event: .chatMessageReceived, handler: { response in
    switch response {
    case let .chatMessageReceivedEvent(event):
        print("Received a message: \(event.message)")
    default:
        return
    }
})
```

Alternatively you can retrieve chat messages by polling the `listMessages` method at specified intervals. See the following code snippet for `listMessages`.

```swift
chatThreadClient.listMessages { result, _ in
    switch result {
    case let .success(messagesResult):
        guard let messages = messagesResult.pageItems else {
            print("No messages returned.")
            return
        }

        for message in messages {
            print("Received message with id: \(message.id)")
        }

    case .failure:
        print("Failed to receive messages")
    }
    semaphore.signal()
}
semaphore.wait()
```

### Push notifications

Similar to Twilio, Azure Communication Services support push notifications. Push notifications notify clients of incoming messages in a chat thread if the mobile app isn't running in the foreground.

Currently sending chat push notifications with Notification Hub is supported for iOS SDK in version 1.3.0.

For more information, see [Enable Push Notification in your chat app](add-chat-push-notifications.md).




**Applies to: programming-language-csharp**


## Prerequisites

- Create an Azure account with an active subscription. For details, see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Visual Studio](https://visualstudio.microsoft.com/downloads/).
- Create an Azure Communication Services resource. For details, see [Create an Azure Communication Services resource](../quickstarts/create-communication-resource.md). Record your resource **endpoint and connection string**.
- A [User Access Token](../quickstarts/identity/access-tokens.md). Be sure to set the scope to **chat**, and **note the token string and user_id string**. You can also use the Azure CLI and run the following command with your connection string to create a user and an access token.

  ```azurecli-interactive
  az communication identity token issue --scope chat --connection-string "yourConnectionString"
  ```

  For more information, see [Use Azure CLI to Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md?pivots=platform-azcli).

## Conceptual Difference

Both Twilio Conversations and Azure Communication Services Chat offer similar functions, but their implementation differs due to the surrounding ecosystems and underlying platform philosophies. Twilio Conversations provide a multi-channel communication API. Azure Communication Services Chat is focused primarily on chat within the Azure ecosystem. This migration guide provides a basic mapping between common operations in Twilio and their equivalents in Azure Communication Services Chat, helping you transition your .NET code.

### Identities

#### Twilio

Twilio Conversations uses identity strings directly.

#### Azure Communication Services 

Azure Communication Services requires creating users through the `CommunicationIdentityClient`.

## Setting up

### Install the package

To start the migration from Twilio Conversations chat, the first step is to install the Azure Communication Services Chat SDK for .NET to your project.

```PowerShell
dotnet add package Azure.Communication.Chat
```

## Object model

The following classes handle some of the major features of the Azure Communication Services Chat SDK for C#.

| Name | Description |
| --- | --- |
| `ChatClient` | This class is needed for the Chat functionality. You instantiate it with your subscription information, and use it to create, get, and delete threads. |
| `ChatThreadClient` | This class is needed for the Chat Thread functionality. You obtain an instance via the ChatClient, and use it to send/receive/update/delete messages, add/remove/get participants, send typing notifications and read receipts. |

## Create a chat client

#### Twilio 

Twilio requires you to set up the Twilio client using your account credentials:

```csharp
var twilio = new TwilioRestClient(accountSid, authToken);
```

#### Azure Communication Services 

To create a chat client in Azure Communication Services, use your Communication Services endpoint and the access token that was generated as part of the prerequisite steps. You need to use the `CommunicationIdentityClient` class from the Identity SDK to create a user and issue a token to pass to your chat client.

Learn more about [User Access Tokens](../quickstarts/identity/access-tokens.md).

```csharp
// Your unique Azure Communication service endpoint
Uri endpoint = new Uri("<replace with your resource endpoint>");
CommunicationTokenCredential communicationTokenCredential = new CommunicationTokenCredential(<Access_Token>);
ChatClient chatClient = new ChatClient(endpoint, communicationTokenCredential);
```

### Start a chat thread

#### Twilio Conversations

```csharp
var conversation = ConversationResource.Create(
    friendlyName: "My Conversation",
    messagingServiceSid: "<MessagingServiceSid>"
);
```

#### Azure Communication Services 

In Azure Communication Services, you create a thread, which is equivalent to a conversation in Twilio.

To create a chat thread, use the `createChatThread` method on the `chatClient`:
- Use `topic` to give a topic to this chat; you can update the `topic` after the chat thread is created using the `UpdateTopic` function.
- Use `participants` property to pass a  list of `ChatParticipant` objects to be added to the chat thread. Initialize the `ChatParticipant` object with a `CommunicationIdentifier` object. `CommunicationIdentifier` could be of type `CommunicationUserIdentifier`, `MicrosoftTeamsUserIdentifier`, or `PhoneNumberIdentifier`. For example, to get a `CommunicationIdentifier` object, you need to pass an Access ID created following the instructions to [Create a user](../quickstarts/identity/access-tokens.md#create-an-identity).

The response object from the `createChatThread` method contains the `chatThread` details. To interact with the chat thread operations such as adding participants, sending a message, deleting a message, and so on, instantiate a `chatThreadClient` client instance using the `GetChatThreadClient` method on the `ChatClient` client.

```csharp
var chatParticipant = new ChatParticipant(identifier: new CommunicationUserIdentifier(id: "<Access_ID>"))
{
    DisplayName = "UserDisplayName"
};
CreateChatThreadResult createChatThreadResult = await chatClient.CreateChatThreadAsync(topic: "Hello world!", participants: new[] { chatParticipant });
ChatThreadClient chatThreadClient = chatClient.GetChatThreadClient(threadId: createChatThreadResult.ChatThread.Id);
string threadId = chatThreadClient.Id;
```

### Get a chat thread client

##### Twilio

In Twilio Conversations, you interact directly with a conversation using the conversation's SID (unique identifier). Here's how to typically get a conversation and interact with it:

```csharp
var conversationSid = "<CONVERSATION_SID>";
var conversation = ConversationResource.Fetch(pathSid: conversationSid);

// Example: Fetching all messages in the conversation
var messages = MessageResource.Read(pathConversationSid: conversationSid);
foreach (var message in messages)
{
    Console.WriteLine(message.Body);
}
```

#### Azure Communication Services 

The `GetChatThreadClient` method returns a thread client for a thread that already exists. You can use it to perform operations on the created thread: add members, send message, and so on. `threadId` is the unique ID of the existing chat thread.

```csharp
string threadId = "<THREAD_ID>";
ChatThreadClient chatThreadClient = chatClient.GetChatThreadClient(threadId: threadId);
```

### List all chat threads

##### Twilio

In Twilio Conversations, you can retrieve all conversations that a user is a participant in by querying the `UserConversations` resource. This resource provides a list of conversations for a specific user.

```csharp
/ Initialize Twilio Client
string accountSid = "<YOUR_ACCOUNT_SID>";
string authToken = "<YOUR_AUTH_TOKEN>";
TwilioClient.Init(accountSid, authToken);

// The identity of the user you're querying
string userIdentity = "user@example.com";

// Retrieve all conversations the user is part of
var userConversations = UserConversationResource.Read(pathUserSid: userIdentity);

foreach (var userConversation in userConversations)
{
    Console.WriteLine($"Conversation SID: {userConversation.ConversationSid}");
    // You can fetch more details about the conversation if needed
    var conversation = Twilio.Rest.Conversations.V1.ConversationResource.Fetch(pathSid: userConversation.ConversationSid);
    Console.WriteLine($"Conversation Friendly Name: {conversation.FriendlyName}");
}
```

#### Azure Communication Services 

Use `GetChatThreads` to retrieve all the chat threads that the user is part of.

```csharp
AsyncPageable<ChatThreadItem> chatThreadItems = chatClient.GetChatThreadsAsync();
await foreach (ChatThreadItem chatThreadItem in chatThreadItems)
{
    Console.WriteLine($"{ chatThreadItem.Id}");
}
```

### Send a message to a chat thread

##### Twilio

The following code snippet shows how to send a text message.

```csharp
var message = MessageResource.Create(
    body: "Hello, world!",
    from: "user@example.com",
    pathConversationSid: conversation.Sid
);
```

The following code snippet shows how to send a media file.

```csharp
// The SID of the conversation you want to send the media message to
string conversationSid = "<CONVERSATION_SID>";

// The URL of the media file you want to send
var mediaUrl = new List<Uri>
{
    new Uri("https://example.com/path/to/media/file.jpg") // Replace with your actual media URL
};

// Send the media message
var message = MessageResource.Create(
    body: "Here is an image for you!",
    from: "user@example.com", // Sender's identity (optional)
    mediaUrl: mediaUrl,
    pathConversationSid: conversationSid
);
```

#### Azure Communication Services

Unlike Twilio, Azure Communication Services doesn't have a separate function to send text messages or media.

Use `SendMessage` to send a message to a thread.
- Use `content` to provide the content for the message, it's required.
- Use `type` for the content type of the message such as `Text` or `Html`. If not specified, `Text` is the default.
- Use `senderDisplayName` to specify the display name of the sender. If not specified, empty string is the default.
- Use `metadata` optionally to include any other data you want to send along with the message. This field provides a mechanism for developers to extend chat message function and add custom information for your use case. For example, when sharing a file link in the message, you might want to add `hasAttachment:true` in the metadata so that recipient's application can parse that and display accordingly.

```csharp
SendChatMessageOptions sendChatMessageOptions = new SendChatMessageOptions()
{
    Content = "Please take a look at the attachment",
    MessageType = ChatMessageType.Text
};
sendChatMessageOptions.Metadata["hasAttachment"] = "true";
sendChatMessageOptions.Metadata["attachmentUrl"] = "https://contoso.com/files/attachment.docx";

SendChatMessageResult sendChatMessageResult = await chatThreadClient.SendMessageAsync(sendChatMessageOptions);

string messageId = sendChatMessageResult.Id;
```

### Receive chat messages from a chat thread

##### Twilio

Twilio typically uses webhooks to notify your server of incoming messages:

The following code snippet shows how to receive a text message.

```csharp
public IActionResult ReceiveMessage()
{
    var incomingMessage = Request.Form["Body"];
    // Process the incoming message
    return Ok();
}
```

The following code snippet shows how to receive a media file.
```csharp
 for (var i = 0; i < numMedia; i++)
            {
                var mediaUrl = Request.Form[$"MediaUrl{i}"];
                Trace.WriteLine(mediaUrl);
                var contentType = Request.Form[$"MediaContentType{i}"];

                var filePath = GetMediaFileName(mediaUrl, contentType);
                await DownloadUrlToFileAsync(mediaUrl, filePath);
            }
```

#### Azure Communication Services

Unlike Twilio, Azure Communication Services doesn't have a separate function to receive text messages or media.

Azure Communication Services Chat enables you to subscribe to events directly within the application.

You can retrieve chat messages by polling the `GetMessages` method on the chat thread client at specified intervals.

```csharp
AsyncPageable<ChatMessage> allMessages = chatThreadClient.GetMessagesAsync();
await foreach (ChatMessage message in allMessages)
{
    Console.WriteLine($"{message.Id}:{message.Content.Message}");
}
```

`GetMessages` takes an optional `DateTimeOffset` parameter. If that offset is specified, you receive messages that were received, updated, or deleted after it. Messages received before the offset time but edited or removed after it are also returned.

`GetMessages` returns the latest version of the message, including any edits or deletes that happened to the message using `UpdateMessage` and `DeleteMessage`. For deleted messages, `chatMessage.DeletedOn` returns a datetime value indicating when that message was deleted. For edited messages, `chatMessage.EditedOn` returns a datetime indicating when the message was edited. You can access the original time of message creation using `chatMessage.CreatedOn`, and use it for ordering the messages.

`GetMessages` returns different types of messages, which can be identified by `chatMessage.Type`. These types are:

- `Text`: Regular chat message sent by a thread member.

- `Html`:  A formatted text message. Communication Services users currently can't send `RichText` messages. This message type is supported by messages sent from Teams users to Communication Services users in Teams Interop scenarios.

- `TopicUpdated`: System message that indicates the topic has been updated. (readonly)

- `ParticipantAdded`: System message that indicates one or more participants have been added to the chat thread. (readonly)

- `ParticipantRemoved`: System message that indicates a participant has been removed from the chat thread.

For more information, see [Message Types](../concepts/chat/concepts.md#message-types).

### Add a user as a participant to the chat thread

#### Twilio 

```csharp
var participant = ParticipantResource.Create(
    pathConversationSid: conversation.Sid,
    identity: "user@example.com"
);
```

#### Azure Communication Services 

In Azure Communication Services, you add participants when creating the chat thread or afterwards:

Once you create a thread, you can add and remove users. Adding users gives them access to send messages to the thread, and add/remove other participants. Before calling `AddParticipants`, ensure that you acquire a new access token and identity for that user. The user needs the access token to initialize their chat client.

Use `AddParticipants` to add one or more participants to the chat thread. The following are the supported attributes for each thread participant(s):
- `communicationUser`, required, is the identity of the thread participant.
- `displayName`, optional, is the display name for the thread participant.
- `shareHistoryTime`, optional, time from which the chat history is shared with the participant.

```csharp
var josh = new CommunicationUserIdentifier(id: "<Access_ID_For_Josh>");
var gloria = new CommunicationUserIdentifier(id: "<Access_ID_For_Gloria>");
var amy = new CommunicationUserIdentifier(id: "<Access_ID_For_Amy>");

var participants = new[]
{
    new ChatParticipant(josh) { DisplayName = "Josh" },
    new ChatParticipant(gloria) { DisplayName = "Gloria" },
    new ChatParticipant(amy) { DisplayName = "Amy" }
};

await chatThreadClient.AddParticipantsAsync(participants: participants);
```

### Get thread participants

##### Twilio

In Twilio Conversations, you use the `ConversationResource` to retrieve the participants of a specific conversation. You can then list all participants associated with that conversation.

```csharp
// The SID of the conversation you want to retrieve participants from
string conversationSid = "<CONVERSATION_SID>";

// Retrieve all participants in the conversation
var participants = ParticipantResource.Read(pathConversationSid: conversationSid);

// Output details of each participant
foreach (var participant in participants)
{
    Console.WriteLine($"Participant SID: {participant.Sid}");
            
}
```

#### Azure Communication Services 

Use `GetParticipants` to retrieve the participants of the chat thread.

```csharp
AsyncPageable<ChatParticipant> allParticipants = chatThreadClient.GetParticipantsAsync();
await foreach (ChatParticipant participant in allParticipants)
{
    Console.WriteLine($"{((CommunicationUserIdentifier)participant.User).Id}:{participant.DisplayName}:{participant.ShareHistoryTime}");
}
```

### Send read receipt

##### Twilio
```csharp
// Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.FetchAsync(
            pathConversationSid: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(message.Delivery);
    }
```

#### Azure Communication Services 
Use `SendReadReceipt` to notify other participants that the user read the message.

```csharp
await chatThreadClient.SendReadReceiptAsync(messageId: messageId);
```



**Applies to: programming-language-java**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Java Development Kit (JDK)](https://learn.microsoft.com/azure/developer/java/fundamentals/java-jdk-install) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).
- Create an Azure Communication Services resource. For details, see [Create an Azure Communication Services resource](../quickstarts/create-communication-resource.md). You need to record your resource **endpoint and connection string**.
- A [User Access Token](../quickstarts/identity/access-tokens.md). Be sure to set the scope to **chat**, and **note the token string and the user_id string**. You can also use the Azure CLI and run the following command with your connection string to create a user and an access token.

  ```azurecli-interactive
  az communication identity token issue --scope chat --connection-string "yourConnectionString"
  ```

  For details, see [Use Azure CLI to Create and Manage Access Tokens](../quickstarts/identity/access-tokens.md?pivots=platform-azcli).

## Setting up

### Add the package references for the Chat SDK

#### Twilio

To use Twilio Conversations Chat APIs in your Java application, add the following dependency in your pom.xml:

```xml
<dependencies>
    <!-- Twilio Java SDK -->
    <dependency>
        <groupId>com.twilio.sdk</groupId>
        <artifactId>twilio</artifactId>
        <version>8.31.1</version>
    </dependency>
</dependencies>
```

#### Azure Communication Services

In your POM file, reference the `azure-communication-chat` package with the Chat APIs:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-chat</artifactId>
    <version><!-- Please refer to https://search.maven.org/artifact/com.azure/azure-communication-chat for the latest version --></version>
</dependency>
```

For authentication, your client needs to reference the `azure-communication-common` package:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-common</artifactId>
    <version><!-- Please refer to https://search.maven.org/artifact/com.azure/azure-communication-common for the latest version --></version>
</dependency>
```

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Chat SDK for Java.

| Name | Description |
| --- | --- |
| `ChatClient` | This class is needed for the Chat function. Instantiate it with your subscription information, and use it to create, get, and delete threads. |
| `ChatAsyncClient` | This class is needed for the asynchronous Chat function. Instantiate it with your subscription information, and use it to create, get, and delete threads. |
| `ChatThreadClient` | This class is needed for the Chat Thread function. You get an instance via the `ChatClient`, and use it to send/receive/update/delete messages, add/remove/get users, send typing notifications, and read receipts. |
| `ChatThreadAsyncClient` | This class is needed for the asynchronous Chat Thread function. You get an instance via the `ChatAsyncClient`, and use it to send/receive/update/delete messages, add/remove/get users, send typing notifications, and read receipts. |

### Import

#### Twilio

```Java
import com.twilio.Twilio;
import com.twilio.rest.conversations.v1.Conversation;
```

#### Azure Communication Services

```Java
package com.communication.quickstart;

import com.azure.communication.chat.*;
import com.azure.communication.chat.models.*;
import com.azure.communication.common.*;
import com.azure.core.http.rest.PagedIterable;

import java.io.*;
import java.util.*;
```

### Create a chat client

#### Twilio

In Twilio, you initialize the client using the Account SID and Auth Token. Here's how you typically initialize a client.

```Java
String accountSid = "<YOUR_ACCOUNT_SID>";
String authToken = "<YOUR_AUTH_TOKEN>";
        
// Initialize Twilio client
Twilio.init(accountSid, authToken);
```

#### Azure Communication Services

To create a chat client, use the Communications Service endpoint and the access token that was generated as part of prerequisite steps. User access tokens enable you to build client applications that directly authenticate to Azure Communication Services. Once you generate these tokens on your server, pass them back to a client device. You need to use the        `CommunicationTokenCredential` class from the Common SDK to pass the token to your chat client.

Learn more about [Chat Architecture](../concepts/chat/concepts.md)

When adding the import statements, be sure to only add imports from the `com.azure.communication.chat` and `com.azure.communication.chat.models` namespaces, and not from the `com.azure.communication.chat.implementation` namespace. In the `App.java` file that was generated via Maven, you can use the following code to start:

```Java
// Your unique Azure Communication service endpoint
String endpoint = "<replace with your resource endpoint>";

// User access token fetched from your trusted service
String userAccessToken = "<USER_ACCESS_TOKEN>";

// Create a CommunicationTokenCredential with the given access token, which is only valid until the token is valid
CommunicationTokenCredential userCredential = new CommunicationTokenCredential(userAccessToken);

// Initialize the chat client
final ChatClientBuilder builder = new ChatClientBuilder();
    builder.endpoint(endpoint)
        .credential(userCredential);
    ChatClient chatClient = builder.buildClient();

```

### Start a chat thread

#### Twilio

Creating a conversation in Twilio is straightforward using the `Conversation.creator()` method.

Use the `setFriendlyName` to give a topic to this chat.

```Java
// Create a new conversation
        Conversation conversation = Conversation.creator().setFriendlyName("New Conversation").create();
        System.out.println(conversation.getSid());
```

#### Azure Communication Services

Use the `createChatThread` method to create a chat thread.
- Use`createChatThreadOptions` to describe the thread request.
- Use the `topic` parameter of the constructor to give a topic to this chat; update 'topic' after the chat thread is created using the `UpdateThread` function.
- Use `participants` to list the thread participants to be added to the thread. `ChatParticipant` takes the user you created in the [User Access Token](../quickstarts/identity/access-tokens.md) quickstart.

`CreateChatThreadResult` is the response returned from creating a chat thread.
It contains a `getChatThread()` method, which returns the `ChatThread` object that can be used to get the thread client from which you can get the `ChatThreadClient` for performing operations on the created thread: add participants, send message, and so on.

The `ChatThread` object also contains the `getId()` method, which retrieves the unique ID of the thread.

```Java
CommunicationUserIdentifier identity1 = new CommunicationUserIdentifier("<USER_1_ID>");
CommunicationUserIdentifier identity2 = new CommunicationUserIdentifier("<USER_2_ID>");

ChatParticipant firstThreadParticipant = new ChatParticipant()
    .setCommunicationIdentifier(identity1)
    .setDisplayName("Participant Display Name 1");

ChatParticipant secondThreadParticipant = new ChatParticipant()
    .setCommunicationIdentifier(identity2)
    .setDisplayName("Participant Display Name 2");

CreateChatThreadOptions createChatThreadOptions = new CreateChatThreadOptions("Topic")
    .addParticipant(firstThreadParticipant)
    .addParticipant(secondThreadParticipant);

CreateChatThreadResult result = chatClient.createChatThread(createChatThreadOptions);
String chatThreadId = result.getChatThread().getId();
```

### List chat threads

#### Twilio

To list all conversations in Twilio using Java:

```Java
public static void main(String[] args) {
        // List all conversations
        ResourceSet<Conversation> conversations = Conversation.reader().read();

        for (Conversation conversation : conversations) {
            System.out.println("Conversation SID: " + conversation.getSid());
            System.out.println("Friendly Name: " + conversation.getFriendlyName());
            System.out.println("Date Created: " + conversation.getDateCreated());
        }
    }
```

#### Azure Communication Services

Use the `listChatThreads` method to retrieve a list of existing chat threads.

```java
PagedIterable<ChatThreadItem> chatThreads = chatClient.listChatThreads();

chatThreads.forEach(chatThread -> {
    System.out.printf("ChatThread id is %s.\n", chatThread.getId());
});
```

### Get a chat thread client

#### Twilio

Here’s how you can retrieve and interact with a specific conversation in Twilio using Java:

```Java
// Retrieve a specific conversation by its SID
Conversation conversation = Conversation.fetcher(conversationSid).fetch();
System.out.println("Retrieved Conversation SID: " + conversation.getSid());
System.out.println("Friendly Name: " + conversation.getFriendlyName())
```

#### Azure Communication Services

The `getChatThreadClient` method returns a thread client for a thread that already exists. Use it to perform operations on the created thread: add participants, send message, and so on.
`chatThreadId` is the unique ID of the existing chat thread.

```Java
ChatThreadClient chatThreadClient = chatClient.getChatThreadClient(chatThreadId);
```

### Send a message to a chat thread

#### Twilio

Sending a message in Twilio uses the `Message.creator()` method.

```Java
import com.twilio.rest.conversations.v1.conversation.Message;

Message message = Message.creator(conversationSid)
    .setBody("Hello, World!")
    .create();
System.out.println("Message SID: " + message.getSid());
```

Twilio enables you to send media files by providing a media URL when sending a message.

```Java
List<URI> mediaUrls = Arrays.asList(URI.create("https://example.com/image.jpg"));
Message message = Message.creator(conversationSid)
    .setBody("Check out this image!")
    .setMediaUrl(mediaUrls)
    .create();
System.out.println("Message SID: " + message.getSid());
```

#### Azure Communication Services

Unlike Twilio, Azure Communication Services doesn't have separate functions to send media.
Use the `sendMessage` method to send a message to the thread you created, identified by `chatThreadId`.

Use `sendChatMessageOptions` to describe the chat message request.
- Use `content` to provide the chat message content.
- Use `type` to specify the chat message content type: `TEXT` or `HTML`.
- Use `senderDisplayName` to specify the display name of the sender.
- Use `metadata` optionally to include any data you want to send with the message. This field enables developers to extend chat message function and add custom information for your use case. For example, when sharing a file link in the message, you might want to add `hasAttachment:true` in metadata so that recipient's application can parse that and display accordingly.

The response `sendChatMessageResult` contains an `id`, which is the unique ID of the message.

```Java
Map<String, String> metadata = new HashMap<String, String>();
metadata.put("hasAttachment", "true");
metadata.put("attachmentUrl", "https://contoso.com/files/attachment.docx");

SendChatMessageOptions sendChatMessageOptions = new SendChatMessageOptions()
    .setContent("Please take a look at the attachment")
    .setType(ChatMessageType.TEXT)
    .setSenderDisplayName("Sender Display Name")
    .setMetadata(metadata);

SendChatMessageResult sendChatMessageResult = chatThreadClient.sendMessage(sendChatMessageOptions);
String chatMessageId = sendChatMessageResult.getId();
```

### Receive chat messages from a chat thread

#### Twilio

Twilio Conversations uses webhooks to receive messages. You typically set up a webhook URL in the Twilio console.

```Java
// This would be handled by a servlet or similar in a Java web application
public void handleIncomingMessage(HttpServletRequest request, HttpServletResponse response) {
    String body = request.getParameter("Body");
    System.out.println("Received message: " + body);
}
```

To receive media file in Twilio.

```Java
private static final Logger logger = Logger.getLogger(TwilioWebhookServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get the number of media items attached to the message
        String numMedia = request.getParameter("NumMedia");

        int mediaCount = Integer.parseInt(numMedia);

        if (mediaCount > 0) {
            // Loop through each media file received
            for (int i = 0; i < mediaCount; i++) {
                // Get the media URL from the request
                String mediaUrl = request.getParameter("MediaUrl" + i);
                String mediaContentType = request.getParameter("MediaContentType" + i);

                logger.info("Received media file: " + mediaUrl + " with content type: " + mediaContentType);

                // Process the media file (e.g., download, store, etc.)
                // Example: Download and save the file, or send it to another service
            }
        } else {
            // Handle a message with no media
            String messageBody = request.getParameter("Body");
            logger.info("Received text message: " + messageBody);
        }
```

#### Azure Communication Services

You can retrieve chat messages by polling the `listMessages` method on the chat thread client at specified intervals.

```Java
chatThreadClient.listMessages().forEach(message -> {
    System.out.printf("Message id is %s.\n", message.getId());
});
```

`listMessages` returns the latest version of the message, including any edits or deletes that happened to the message using `.editMessage()` and `.deleteMessage()`. For deleted messages, `chatMessage.getDeletedOn()` returns a `datetime` value indicating when that message was deleted. For edited messages, `chatMessage.getEditedOn()` returns a datetime indicating when the message was edited. The original time of message creation can be accessed using `chatMessage.getCreatedOn()`, and it can be used for ordering the messages.

Read more about message types here: [Message Types](../concepts/chat/concepts.md#message-types).

### Send read receipt

#### Twilio

Twilio Conversations doesn't have a direct API for sending read receipts. Twilio Conversations manages read receipts automatically.

#### Azure Communication Services

Use the `sendReadReceipt` method to post a read receipt event to a chat thread, on behalf of a user.

`chatMessageId` is the unique ID of the chat message that was read.

```Java
String chatMessageId = message.getId();
chatThreadClient.sendReadReceipt(chatMessageId);
```

### List chat participants

#### Twilio
To retrieve participants in a Twilio conversation:
```Java
ResourceSet<Participant> participants = Participant.reader(conversationSid).read();

for (Participant participant : participants) {
    System.out.println("Participant SID: " + participant.getSid());
}
```

#### Azure Communication Services

Use `listParticipants` to retrieve a paged collection containing the participants of the chat thread identified by chatThreadId.

```Java
PagedIterable<ChatParticipant> chatParticipantsResponse = chatThreadClient.listParticipants();
chatParticipantsResponse.forEach(chatParticipant -> {
    System.out.printf("Participant id is %s.\n", ((CommunicationUserIdentifier) chatParticipant.getCommunicationIdentifier()).getId());
});
```

### Add a user as participant to the chat thread

#### Twilio

Add participants to a conversation using the Participant.creator() method.

```Java
import com.twilio.rest.conversations.v1.conversation.Participant;

Participant participant = Participant.creator(conversationSid)
    .setIdentity("user@example.com")
    .create();
System.out.println("Participant SID: " + participant.getSid());
```

#### Azure Communication Services

Once a chat thread is created, you can then add and remove users from it. By adding users, you give them access to send messages to the chat thread, and add/remove other participants. Start by getting a new access token and identity for that user. Before calling the `addParticipants` method, ensure that you acquired a new access token and identity for that user. The user needs that access token to initialize their chat client.

Use the `addParticipants` method to add participants to the thread.

- `communicationIdentifier`, required, is the `CommunicationIdentifier` you created using `CommunicationIdentityClient` in the [User Access Token](../quickstarts/identity/access-tokens.md) quickstart.
- `displayName`, optional, is the display name for the thread participant.
- `shareHistoryTime`, optional, is the time from which the chat history is shared with the participant. To share history since the inception of the chat thread, set this property to any date equal to, or less than the thread creation time. To share no history previous to when the participant was added, set it to the current date. To share partial history, set it to the required date.

```Java
List<ChatParticipant> participants = new ArrayList<ChatParticipant>();

CommunicationUserIdentifier identity3 = new CommunicationUserIdentifier("<USER_3_ID>");
CommunicationUserIdentifier identity4 = new CommunicationUserIdentifier("<USER_4_ID>");

ChatParticipant thirdThreadParticipant = new ChatParticipant()
    .setCommunicationIdentifier(identity3)
    .setDisplayName("Display Name 3");

ChatParticipant fourthThreadParticipant = new ChatParticipant()
    .setCommunicationIdentifier(identity4)
    .setDisplayName("Display Name 4");

participants.add(thirdThreadParticipant);
participants.add(fourthThreadParticipant);

chatThreadClient.addParticipants(participants);
```
