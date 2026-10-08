---
title: Add data channel messaging to a calling app
titleSuffix: An Azure Communication Services article
description: This article describes how to add Data Channel to your existing calling app using Azure Communication Services.
author: sloanster
ms.author: enricohuang
services: azure-communication-services
ms.date: 6/27/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-plat-web-ios-android-windows
ms.custom: mode-other, devx-track-js
---

# Add data channel messaging to a calling app


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-web**


The Data Channel feature API enables real-time messaging during audio and video calls. This article describes how to integrate the Data Channel feature, enabling the exchange of text messages among participants within a group call. There are many different messaging solutions other than the Data Channel feature, and you should choose the suitable solution for your specific usage scenario.

>**Important:**
> The current implementation of the DataChannel feature API doesn't support direct messaging between a web browser and a native app in a peer-to-peer call scenario.


## Create a DataChannelSender object

First you need to create a DataChannelSender object to send messages. In this custom messaging application, we suggest assigning a number to `channelId`, which serves to distinguish different application use cases. For instance, you can assign `channelId` 1000 for custom messages.

```js
const dataChannel = call.feature(Features.DataChannel);
const messageSender = dataChannel.createDataChannelSender({
    channelId: 1000
});
```

There are several other options, such as reliability, bandwidth, and priority. You can ignore these options for now and use the default values.

While the sender object is created, you still need a receiver object to receive messages.

## Register a listener to obtain the DataChannelReceiver object

To acquire a receiver object, you need to register a listener that captures the `dataChannelReceiverCreated` event.
When a receiver object is created, the SDK emits the event along with the receiver object.

```js
dataChannel.on('dataChannelReceiverCreated', receiver => {
    // receiver.channelId
    // receiver.senderParticipantIdentifier, which shows the sender id
});
```

Within the listener callback function, you can access the receiver object and retrieve information such as `channelId` and the sender participant ID `senderParticipantIdentifier`.
It's your responsibility to maintain the receiver object reference, as the SDK emits the event once for each created receiver object.

## Handle messageReady and close event of DataChannelReceiver object

When a message arrives, the DataChannelReceiver object receives the message, stores it in its internal buffer, and emits a `messageReady` event.

It's not necessary to register `messageReady` event listener to receive messages, as you can always call the `readMessage` API at any time.

However, for best practice, we recommend reading message within the `messageReady` listener callback, if message processing takes a long time, you can
offload the work to a Web Worker to prevent blocking the message reception.

```js
dataChannel.on('dataChannelReceiverCreated', receiver => {
    if (receiver.channelId === 1000) {
        receiver.on('close', () => {
            console.log(`data channel id = ${receiver.channelId} from ${JSON.stringify(receiver.senderParticipantIdentifier)} is closed`);
        });
        receiver.on('messageReady', () => {
            const message = receiver.readMessage();
            // process the message
        });
    }
});
```

## Set participants

To specify the recipients for your messages, you can use `DataChannelSender.setParticipants` API. The sender object maintains the most recent participant list you provide.
The participant type is `CommunicationIdentifier`, which you can obtain from `remoteParticipant.identifier`. For more information, please refer to [Access remote participant properties](../../how-tos/calling-sdk/manage-calls.md?pivots=platform-web#access-remote-participant-properties).

```js
const user = call.remoteParticipants[0]; // assume the user wants to send a message to the first participant in the remoteParticipants list
messageSender.setParticipants([user.identifier]);
```

The participant list is limited to 64 participants. If the participant list is an empty array, the SDK broadcasts the message to all participants in the call.

## Send and receive messages

DataChannel feature API requires you to pass data as `Uint8Array` type. You can't directly send a JavaScript string using `sendMessage` API.

For example, if you want to send a string `abc`, you can't use `sender.sendMessage('abc')`. Instead, you need to serialize the data to a byte buffer first.

```js
const data = (new TextEncoder()).encode('abc');
sender.sendMessage(data);
```
Here's another example for sending a JSON object.
```js
const obj = {...}; // some object
const data = (new TextEncoder()).encode(JSON.stringify(obj));
sender.sendMessage(data);
```

Receive and decode the message.

```js
dataChannel.on('dataChannelReceiverCreated', receiver => {
    if (receiver.channelId === 1000) {
        const textDecoder = new TextDecoder();
        receiver.on('close', () => {
            console.log(`data channel id = ${receiver.channelId} from ${JSON.stringify(receiver.senderParticipantIdentifier)} is closed`);
        });
        receiver.on('messageReady', () => {
            const message = receiver.readMessage();
            const text = textDecoder.decode(message.data);
            console.log(`from ${JSON.stringify(receiver.senderParticipantIdentifier)}:${text}`);
        });
    }
});
```

Use the sample code on GitHub at [Web Calling](https://github.com/Azure-Samples/communication-services-web-calling-tutorial).



**Applies to: platform-android**


>**Important:**
> The current Data Channel feature API doesn't support direct messaging between a web browser and a native app in a peer-to-peer call scenario.

## Overview

The Data Channel feature API enables real-time data messaging during audio and video calls. In this quickstart guide, we illustrate how to integrate Data Channel feature to your call and use the Data Channel APIs to send and receive data messages through a data channel.

### Prerequisites

Refer to the [Voice Calling Quickstart](getting-started-with-calling.md?pivots=platform-android) to set up a sample app with voice calling.

### Classes

| Name | Description |
| --- | --- |
| DataChannelCallFeature | Used to start and manage data channel feature. |
| DataChannelSender | Used to manage a data channel as a sender and send data. |
| DataChannelReceiver | Used to manage a data channel as a receiver and receive data. |
| DataChannelSenderOptions | Used for representing options to create a data channel sender. |

### Enums

| Name | Description |
| --- | --- |
| DataChannelPriority | Describes the priority options of data channel. Values: { `NORMAL`, `HIGH` }. |
| DataChannelReliability | Describes the reliability options of data channel. Values: { `LOSSY`, `DURABLE` }. |

### Error Code

| Name | Description |
| --- | --- |
| _DATA_CHANNEL_FAILED_TO_START_ | `getDataChannelSender()` can fail with this error code, indicating underlying Data Channel isn't ready to be used. |
| _DATA_CHANNEL_RANDOM_ID_NOT_AVAILABLE_ | `getDataChannelSender()` can fail with this error code, indicating each available random channel ID is in use. |
| _DATA_CHANNEL_SENDER_CLOSED_ | `sendMessage()` can fail with this error code, indicating the sender data channel is already closed. |
| _DATA_CHANNEL_MESSAGE_SIZE_OVER_LIMIT_ | `sendMessage()` can fail with this error code, indicating the message data size exceeds the limit. You can get the message size limit using `getMaxMessageSizeInBytes()` in `DataChannelSender`. |
| _DATA_CHANNEL_MESSAGE_FAILURE_FOR_BANDWIDTH_ | `sendMessage()` can fail with this error code, indicating a failure in sending the message due to not enough bandwidth. |
| _DATA_CHANNEL_MESSAGE_FAILURE_FOR_TRAFFIC_LIMIT_ | `sendMessage()` can fail with this error code, indicating a failure in sending the message due to the overall usage of Data Channel not in compliance with the traffic limit rules. Refer to [Data Channel Concept Document](../../concepts/voice-video-calling/data-channel.md) for details of the traffic limit. |

### Methods

#### Enable Data Channel feature

1. Get the ongoing call object established during the prerequisite steps.

2. Get the Data Channel Feature object.

```java
DataChannelCallFeature dataChannelCallFeature = call.feature(Features.DATA_CHANNEL);
```

#### Receiving data message

1. Define the DataChannelReceiverCreatedListener.

```java
DataChannelReceiverCreatedListener receiverCreatedListener = new DataChannelReceiverCreatedListener() {
    @Override
    public void onReceiverCreated(DataChannelReceiverCreatedEvent e) {
        DataChannelReceiver receiver = e.getReceiver(); // get the new data channel receiver
        int channelId = receiver.getChannelId(); // get the channel id
        CommunicationIdentifier senderId = receiver.getSenderIdentifier(); // get the message sender id
        // listen to the message received event and closed event from this receiver
        // receiver.addOnMessageReceivedListener(messageReceivedlistener);
        // receiver.addOnClosedListener(receiverClosedListener);
    }
};
```

2. Register the `receiverCreatedListener`.

```java
dataChannelCallFeature.addOnReceiverCreatedListener(receiverCreatedListener);
 ```

3. Define the MessageReceivedListener.

```java
MessageReceivedListener messageReceivedListener = new MessageReceivedListener() {
    @Override
    public void onMessageReceived(PropertyChangedEvent e) {
        DataChannelMessage message = e.getReceiver().receiveMessage(); // read the data message from the receiver
        int sequence = message.getSequenceNumber(); // get the message sequence number
        byte[] data = message.getData(); // get the data content
    }
};
```

4. Define the `ReceiverClosedListener`.

```java
ReceiverClosedListener receiverClosedListener = new ReceiverClosedListener() {
    @Override
    public void onReceiverClosed(PropertyChangedEvent e) {
        DataChannelReceiver receiver = e.getReceiver(); // get the data channel receiver to be closed
    }
};
```

5. Register the `messageReceivedListener` and `receiverClosedListener`.

```java
receiver.addOnMessageReceivedListener(messageReceivedlistener);
receiver.addOnClosedListener(receiverClosedListener);
```

#### Sending data message

1. Configure the `DataChannelSenderOptions`.

```java
DataChannelSenderOptions options = new DataChannelSenderOptions();
options.setChannelId(1000);
options.setBitrateInKbps(32);
options.setPriority(DataChannelPriority.NORMAL);
options.setReliability(DataChannelReliability.LOSSY);

List<CommunicationIdentifier> participants = Arrays.asList( /* identifier1, identifier2, ... */ );
options.setParticipants(participants);
```

2. Get the `DataChannelSender` and send data message.

```java
DataChannelSender dataChannelSender = dataChannelCallFeature.getDataChannelSender(options);

// msgData contains the byte[] data to be sent
dataChannelSender.sendMessage(msgData);

// change participants in the channel if needed
dataChannelSender.setParticipants(new ArrayList<CommunicationIdentifier>()); 
```


**Applies to: platform-ios**


>**Important:**
> The current Data Channel feature API doesn't support direct messaging between a web browser and a native app in a peer-to-peer call scenario.

## Overview

The Data Channel feature API enables real-time data messaging during audio and video calls. In this quickstart guide, we illustrate how to integrate Data Channel feature to your call and use the Data Channel APIs to send and receive data messages through a data channel.

### Prerequisites

Refer to the [Voice Calling Quickstart](getting-started-with-calling.md?pivots=platform-ios) to set up a sample app with voice calling.

### Classes

| Name | Description |
| --- | --- |
| DataChannelCallFeature | Used to start and manage data channel feature. |
| DataChannelSender | Used to manage a data channel as a sender and send data. |
| DataChannelReceiver | Used to manage a data channel as a receiver and receive data. |
| DataChannelSenderOptions | Used for representing options to create a data channel sender. |

### Enums

| Name | Description |
| --- | --- |
| DataChannelPriority | Describes the priority options of data channel. Values: { `normal`, `high` }. |
| DataChannelReliability | Describes the reliability options of data channel. Values: { `lossy`, `durable` }. |

### Error Code

| Name | Description |
| --- | --- |
| _dataChannelFailedToStart_ | `getDataChannelSender()` can fail with this error code, indicating underlying Data Channel isn't ready to be used. |
| _dataChannelRandomIdNotAvailable_ | `getDataChannelSender()` can fail with this error code, indicating each available random channel ID is in use. |
| _dataChannelSenderClosed_ | `sendMessage()` can fail with this error code, indicating the sender already closed. |
| _dataChannelMessageSizeOverLimit_ | `sendMessage()` can fail with this error code, indicating the message data size exceeds the limit. You can get the message size limit using `maxMessageSizeInBytes` in `DataChannelSender`. |
| _dataChannelMessageFailureForBandwidth_ | `sendMessage()` can fail with this error code, indicating a failure in sending the message due to not enough bandwidth. |
| _dataChannelMessageFailureForTrafficLimit_ | `sendMessage()` can fail with this error code, indicating a failure in sending the message due to the overall usage of Data Channel not in compliance with the traffic limit rules. Refer to [Data Channel Concept Document](../../concepts/voice-video-calling/data-channel.md) for details of the traffic limit. |

### Methods

#### Enable Data Channel feature

1. Get the ongoing call object established during the prerequisite steps.
2. Get the Data Channel Feature object.

```swift
var dataChannelCallFeature = self.call!.feature(Features.dataChannel)
```

#### Receiving data message

```swift
let featureDelegate = new FeatureDelegate()
let receiverDelegate = new ReceiverDelegate()
dataChannelCallFeature!.delegate = featureDelegate

class FeatureDelegate: NSObject, DataChannelCallFeatureDelegate {
    public func dataChannelCallFeature(_ dataChannelCallFeature: DataChannelCallFeature, didCreateReceiver args: DataChannelReceiverCreatedEventArgs) {
        let receiver = args.receiver // get the new data channel receiver
        let channelId = receiver.channelId // get the channel id
        let senderId = receiver.senderIdentifier // get the message sender id

        receiver.delegate = receiverDelegate
    }
}

class ReceiverDelegate: NSObject, DataChannelReceiverDelegate {
    public func dataChannelReceiver(_ dataChannelReceiver: DataChannelReceiver, didReceiveMessage args: PropertyChangedEventArgs) {
        let message = dataChannelReceiver.receiveMessage() // read the data message from the receiver
        let sequence = message?.sequenceNumber // get the message sequence number
        let data = message?.data // get the data content
    }
    
    public func dataChannelReceiver(_ dataChannelReceiver: DataChannelReceiver, didClose args: PropertyChangedEventArgs) {
       let channelId = dataChannelReceiver.channelId // get the data channel id to be closed
    }
}
```

#### Sending data message

1. Configure the DataChannelSenderOptions.

```swift
let options = new DataChannelSenderOptions()
options.channelId = 1000
options.bitrateInKbps = 32
options.priority = DataChannelPriority.normal
options.reliability = DataChannelReliability.lossy

let communicationIdentifiers: [CommunicationIdentifier] = [ /* identifier1, identifier2, ... */ ]
options.participants = communicationIdentifiers
```

2. Define the DataChannelSender and send data message

```swift
DataChannelSender sender = dataChannelCallFeature.getDataChannelSender(options)

// msgData contains the data to be sent
sender.sendMessage(msgData)

// change participants in the channel if needed
let participants: [CommunicationIdentifier] = []
dataChannelSender.setParticipants(participants: participants)
```


**Applies to: platform-windows**


>**Important:**
> The current Data Channel feature API doesn't support direct messaging between a web browser and a native app in a peer-to-peer call scenario.

## Overview

The Data Channel feature API enables real-time data messaging during audio and video calls. In this quickstart guide, we illustrate how to integrate Data Channel feature to your call and use the Data Channel APIs to send and receive data messages through a data channel.

### Prerequisites

Refer to the [Voice Calling Quickstart](getting-started-with-calling.md?pivots=platform-windows) to set up a sample app with voice calling.

### Classes

| Name | Description |
| --- | --- |
| DataChannelCallFeature | Used to start and manage data channel feature. |
| DataChannelSender | Used to manage a data channel as a sender and send data. |
| DataChannelReceiver | Used to manage a data channel as a receiver and receive data. |
| DataChannelSenderOptions | Used for representing options to create a data channel sender. |

### Enums

| Name | Description |
| --- | --- |
| DataChannelPriority | Describes the priority options of data channel. Values: { `Normal`, `High` }. |
| DataChannelReliability | Describes the reliability options of data channel. Values: { `Lossy`, `Durable` }. |

### Error Code

| Name | Description |
| --- | --- |
| _DataChannelFailedToStart_ | `GetDataChannelSender()` can fail with this error code, indicating underlying Data Channel isn't ready to be used. |
| _DataChannelRandomIdNotAvailable_ | `GetDataChannelSender()` can fail with this error code, indicating each available random channel ID is in use. |
| _DataChannelSenderClosed_ | `SendMessage()` can fail with this error code, indicating the sender data channel is closed. |
| _DataChannelMessageSizeOverLimit_ | `SendMessage()` can fail with this error code, indicating the message data size exceeds the limit. You can get the message size limit using `MaxMessageSizeInBytes` in `DataChannelSender`. |
| _DataChannelMessageFailureForBandwidth_ | `SendMessage()` can fail with this error code, indicating a failure in sending the message due to not enough bandwidth. |
| _DataChannelMessageFailureForTrafficLimit_ | `SendMessage()` can fail with this error code, indicating a failure in sending the message due to the overall usage of Data Channel not in compliance with the traffic limit rules. Refer to [Data Channel Concept Document](../../concepts/voice-video-calling/data-channel.md) for details of the traffic limit. |

### Methods

#### Enable Data Channel feature

1. Get the ongoing call object established during the prerequisite steps.
2. Get the Data Channel Feature object.

```csharp
DataChannelCallFeature dataChannelCallFeature = call.Features.DataChannel;
```

#### Receiving data message

1. Define the DataChannelReceiverCreated event handler.

```csharp
void DataChannelReceiverCreatedHandler(object sender, DataChannelReceiverCreatedEventArgs args) 
{
    DataChannelReceiver receiver = args.Receiver; // get the new data channel receiver
    int channelId = receiver.ChannelId; // get the channel id
    CallIdentifier senderId = receiver.SenderIdentifier; // get the message sender id
    
    // add event handlers for the message received event and closed event from this receiver
    // receiver.MessageReceived += MessageReceivedHandler;
    // receiver.Closed += ReceiverClosedHandler;
}
```

2. Attach the `DataChannelReceiverCreatedHandler`.

```csharp
dataChannelCallFeature.ReceiverCreated += DataChannelReceiverCreatedHandler;
 ```

3. Define the MessageReceived event handler.

```csharp
void MessageReceivedHandler(object sender, PropertyChangedEventArgs args) 
{
    DataChannelMessage message = (sender as DataChannelReceiver).ReceiveMessage(); // read the data message from the receiver
    long sequence = message.SequenceNumber; // get the message sequence number
    byte[] data = message.Data; // get the data content
}
```

4. Define the Closed event handler.

```csharp
void ReceiverClosedHandler(object sender, PropertyChangedEventArgs args) 
{
    DataChannelReceiver receiver = sender as DataChannelReceiver; // get the data channel receiver to be closed
};
```

5. Attach the `MessageReceivedHandler` and `ReceiverClosedHandler`.

```csharp
receiver.MessageReceived += MessageReceivedHandler;
receiver.Closed += ReceiverClosedHandler;
```

#### Sending data message

1. Configure the DataChannelSenderOptions.

```csharp
DataChannelSenderOptions options = new DataChannelSenderOptions();
options.ChannelId = 1000;
options.BitrateInKbps = 32;
options.Priority = DataChannelPriority.Normal;
options.Reliability = DataChannelReliability.Lossy;
var participants = new List<CallIdentifier> { /* identifier1, identifier2, ... */ };
options.Participants = participants.AsReadOnly();
```

2. Define the DataChannelSender and send data message

```csharp
DataChannelSender sender = dataChannelCallFeature.GetDataChannelSender(options);
// msgData contains the byte[] data to be sent
sender.SendMessage(msgData);
// change participants in the channel if needed
sender.SetParticipants(new List<CallIdentifier>().AsReadOnly()); 
```


## Next steps

For more information, see:

- [Data Channel feature concept document](../../concepts/voice-video-calling/data-channel.md)
- [Calling SDK capabilities](getting-started-with-calling.md)
