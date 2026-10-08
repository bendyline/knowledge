---
title: Enable Real Time Text
titleSuffix: An Azure Communication Services article
description: This article describes how to enable Real Time Text in your application.
author: ahammer
ms.author: adamhammer
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to
ms.date: 06/24/2025
ms.custom: template-how-to
zone_pivot_groups: acs-programming-languages-javascript-java-swift-csharp
---

# Enable Real Time Text (RTT)


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


>**Note:**
>RTT is an accessibility compliance requirement for voice and video platforms in the EU starting June 30, 2025. For more information, see [Directive 2019/882](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882).

Integrate Real Time Text (RTT) into your calling applications to enhance accessibility and ensure that all participants can communicate effectively during meetings.

RTT allows users who have difficulty speaking to participate actively by typing their messages, which are then broadcast in near real-time to other meeting participants. This feature operates seamlessly alongside existing captions and ensures that typed messages are promptly delivered without disrupting the flow of conversation.

## Real Time Text Feature Overview

Real Time Text (RTT) facilitates communication for users who might have difficulty speaking during calls. By enabling users to type their messages, RTT ensures that everyone in the meeting can stay engaged and informed. Messages are transmitted over Data Channels (ID 24) and are always active, appearing automatically when the first message is sent.

On supported platforms, RTT data can display alongside captions derived from Speech to Text, providing a comprehensive view of all communications during a call.

>**Note:**
>RTT for PSTN isn't available at this time.

## Naming Conventions

Different platforms might use varying terminology for RTT-related properties. The following table summarizes the differences:

| Mobile (Android/iOS) | Windows (C#) |
| --- | --- |
| **Type** | **Kind** |
| **Info** | **Details** |

These aliases are functionally equivalent and are used to maintain consistency across different platforms.

## RealTimeTextInfo/Details Class

The `RealTimeTextInfo` (or `RealTimeTextDetails` on Windows) class encapsulates information about each RTT message. The following table shows key properties:

| Property | Description |
| --- | --- |
| `SequenceId` | Unique identifier for the message sequence. |
| `Text` | The content of the RTT message. |
| `Sender` | Information about the sender of the message. |
| `ResultType`/<br>`Kind` | Indicates whether the message is partial or final. |
| `IsLocal` | Determines if a local user sent the message. |
| `ReceivedTime` | Timestamp when the message was received. |
| `UpdatedTime` | Timestamp when the message was last updated. |

**Applies to: programming-language-javascript**


## Models
| Name | Description |
| --- | --- |
| RealTimeTextFeature | API for RealTimeText |
| RealTimeTextInfo | Data structure received for each RealTimeText event |
| RealTimeTextReceivedEventHandler | Callback definition for handling RealTimeTextReceivedEventType event |

## Get RealTimeText feature

``` typescript
let realTimeTextFeature: SDK.RealTimeTextFeature = call.feature(SDK.Features.RealTimeText);
```

## Subscribe to listeners

### Add a listener for RealTimeText data received
Handle the returned RealTimeTextInfo data object. Ideally, you would have this on handler set once call is connected.

Note: The object contains a resultType prop that indicates whether the data is a partial text or a finalized version of the text. ResultType `Partial` indicates live messages that are subject to change, while `Final` indicates completed messages with no further changes pending.

```typescript
const realTimeTextReceivedHandler: SDK.RealTimeTextReceivedEventHandler = (data: SDK.RealTimeTextInfo) => { 
    /** USER CODE HERE - E.G. RENDER TO DOM 
     *  data.sequenceId
     *  data.sender
     *  data.text
     *  data.resultType
     *  data.receivedTimestamp
     *  data.updatedTimestamp
     *  data.isLocal
    */
    // Example code:
    // Create a dom element, i.e. div, with id "rttArea" before proceeding with the sample code
    let mri: string = '';
    let displayName: string = '';
    switch (data.sender.identifier.kind) {
        case 'communicationUser': { mri = data.sender.identifier.communicationUserId; displayName = data.sender.displayName; break; }
        case 'microsoftTeamsUser': { mri = data.sender.identifier.microsoftTeamsUserId; displayName = data.sender.displayName; break; }
        case 'phoneNumber': { mri = data.sender.identifier.phoneNumber;  displayName = data.sender.displayName; break; }
    }

    const newClassName = `prefix${mri.replace(/:/g, '').replace(/-/g, '').replace(/\+/g, '')}`;
    const rttText = `${(data.receivedTimestamp).toUTCString()} ${displayName ?? mri}: `;

    let foundRTTContainer = this.elements.rttArea.querySelector(`.${newClassName}[isNotFinal='true']`);
    if (!foundRTTContainer) {
        let rttContainer = document.createElement('div');
        rttContainer.setAttribute('isNotFinal', 'true');
        rttContainer.style['borderBottom'] = '1px solid';
        rttContainer.style['whiteSpace'] = 'pre-line';
        rttContainer.textContent = rttText + data.text;
        rttContainer.classList.add(newClassName);

        this.elements.rttArea.appendChild(rttContainer);

        setTimeout(() => {
            this.elements.rttArea.removeChild(rttContainer);
        }, 40000);
    } else {
        if (data.text === '') {
            this.elements.rttArea.removeChild(foundRTTContainer);
        }
        if (data.resultType === 'Final') {
            foundRTTContainer.setAttribute('isNotFinal', 'false');
            if (data.isLocal) {
                let rttTextField = this.elements.rttMessage;
                rttTextField.value = '';
            }
        } else {
            foundRTTContainer.textContent = rttText + data.text;
        }
    }
}; 
realTimeTextFeature.on('realTimeTextReceived', realTimeTextReceivedHandler); 
```

## Send RealTimeText live handler
In order to simulate live messaging, you will need to set up a live handler to send RealTimeText as the user types.

```typescript
let rttTextField = document.getElementById("rttMessage") as HTMLInputElement;
rttTextField.addEventListener('keyup', (event) => {
    await realTimeTextFeature.sendRealTimeText(rttTextField.value);
});
```

### Send Finalized RealTimeText
Once you are certain that the message has been finalized, for example, the user clicks on send message or presses enter, pass `true` to the sendRealTimeText function.
``` typescript
try {
    let rttTextField = document.getElementById("rttMessage") as HTMLInputElement;
    await realTimeTextFeature.sendRealTimeText(rttTextField.value, true);
    rttTextField.value = '';
} catch (e) {
    console.log('ERROR Send RTT failed', e);
}
```

## Unsubscribe to listeners
```typescript
realTimeTextFeature.off('realTimeTextReceived', realTimeTextReceivedHandler); 
```

## RealTimeTextInfo Class

The `RealTimeTextInfo` class provides detailed information about each real-time text message:

- **sender**: Information about who sent the message.
- **sequenceId**: Unique identifier for the message.
- **text**: The content of the message.
- **resultType**: Indicates if the message is partial or finalized.
- **receivedTimestamp**: Timestamp when the message was received.
- **updatedTimestamp**: Timestamp when the message was last updated.
- **isLocal**: Indicates if the message was sent by the local user.

## Other Links

- Get started with RTT in the [UI Library](https://azure.github.io/communication-ui-library/?path=/docs/concepts-real-time-text--docs)



**Applies to: programming-language-java**


## Models

| Name | Description |
| --- | --- |
| `RealTimeTextInfo` | Represents a real-time text message entry, including sender information, message content, sequence ID, and status. |

## Get Real Time Text Feature

To access the Real Time Text feature, retrieve it from the `Call` object:

```java
RealTimeTextCallFeature rttFeature = call.feature(Features.REAL_TIME_TEXT);
```

## Feature Usage

### Sending Real Time Text Messages

Bind a text input field to the `send()` method to transmit messages as the user types:

```java
EditText messageEditText = findViewById(R.id.messageEditText);
messageEditText.addTextChangedListener(new TextWatcher() {
    @Override
    public void afterTextChanged(Editable s) {
        String text = s.toString();
        rttFeature.send(text);
    }
    // Other overridden methods...
});
```

### Receiving Real Time Text Messages

Subscribe to the `OnInfoReceived` event to handle incoming messages:

```java
rttFeature.addOnInfoReceivedListener((eventArgs) -> {
    RealTimeTextInfo info = eventArgs.getInfo();
    
    // Update your message list with the new info
    updateMessageList(info);
    
    // Clear the text input if the message is local and finalized
    if (info.isLocal() && info.getResultType() == RealTimeTextResultType.FINAL) {
        messageEditText.getText().clear();
    }
});
```

## RealTimeTextInfo Class

The `RealTimeTextInfo` class provides detailed information about each real-time text message:

- **Sender**: Information about who sent the message.
- **SequenceId**: Unique identifier for the message.
- **Text**: The content of the message.
- **ResultType**: Indicates if the message is partial or finalized.
- **ReceivedTime**: Timestamp when the message was received.
- **UpdatedTime**: Timestamp when the message was last updated.
- **IsLocal**: Indicates if the message was sent by the local user.



**Applies to: programming-language-swift**


## Models

| Name | Description |
| --- | --- |
| `RealTimeTextInfo` | Represents a real-time text message entry, including sender information, message content, sequence ID, and status. |

## Get Real Time Text Feature

Access the Real Time Text feature from your `Call` object:

```swift
let rttFeature = call.feature(Features.realTimeText)
```

## Feature Usage

### Sending Real Time Text Messages

Bind a text input field to the `send` method to transmit messages as the user types:

```swift
@State var messageText: String = ""

TextField("Type your message", text: $messageText)
    .onChange(of: messageText) { newText in
        rttFeature?.send(newText)
    }
```

### Receiving Real Time Text Messages

Subscribe to the `OnInfoReceived` event to handle incoming messages:

```swift
rttFeature?.addOnInfoReceivedListener { eventArgs in
    if let info = eventArgs.info {
        // Update your message list with the new info
        updateMessageList(info)
        
        // Clear the text input if the message is local and finalized
        if info.isLocal && info.resultType == .final {
            self.messageText = ""
        }
    }
}
```

## RealTimeTextInfo Class

The `RealTimeTextInfo` class provides detailed information about each real-time text message:

- **Sender**: Information about who sent the message.
- **SequenceId**: Unique identifier for the message.
- **Text**: The content of the message.
- **ResultType**: Indicates if the message is partial or finalized.
- **ReceivedTime**: Timestamp when the message was received.
- **UpdatedTime**: Timestamp when the message was last updated.
- **IsLocal**: Indicates if the message was sent by the local user.



**Applies to: programming-language-csharp**


## Models

| Name | Description |
| --- | --- |
| `RealTimeTextDetails` | Represents a real-time text message entry, including sender information, message content, sequence ID, and status. |

## Get Real Time Text Feature

Retrieve the Real Time Text feature from the `Call` object:

```csharp
RealTimeTextCallFeature rttFeature = call.GetRealTimeTextCallFeature();
```

## Feature Usage

### Sending Real Time Text Messages

Connect a text input field to the `Send` method to transmit messages as the user types:

```csharp
TextBox messageTextBox = new TextBox();
messageTextBox.TextChanged += (sender, args) => {
    string text = messageTextBox.Text;
    rttFeature.Send(text);
};
```

### Receiving Real Time Text Messages

Subscribe to the `DetailsReceived` event to handle incoming messages:

```csharp
rttFeature.DetailsReceived += (sender, e) => {
    RealTimeTextDetails details = e.Details;
    
    // Update your message list with the new details
    UpdateMessageList(details);
    
    // Clear the text input if the message is local and finalized
    if (details.IsLocal && details.Kind == RealTimeTextResultKind.Final) {
        messageTextBox.Text = string.Empty;
    }
};
```

## RealTimeTextDetails Class

The `RealTimeTextDetails` class provides comprehensive information about each real-time text message:

- **Sender**: Information about who sent the message.
- **SequenceId**: Unique identifier for the message.
- **Text**: The content of the message.
- **Kind**: Indicates if the message is partial or finalized.
- **ReceivedTime**: Timestamp when the message was received.
- **UpdatedTime**: Timestamp when the message was last updated.
- **IsLocal**: Indicates if the message was sent by the local user.


## Next steps

- Learn more about RTT in our [Real Time Text Conceptual Doc](../../concepts/voice-video-calling/real-time-text.md).
- Learn more with our [Azure Communication Services Calling Documentation](../../concepts/voice-video-calling/calling-sdk-features.md).
- Learn more about [Closed captions](../../concepts/voice-video-calling/closed-captions.md).
