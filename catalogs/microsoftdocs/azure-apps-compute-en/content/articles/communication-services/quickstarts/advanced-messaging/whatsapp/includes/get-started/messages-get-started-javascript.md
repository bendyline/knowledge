---
title: Include file
description: Include file
services: azure-communication-services
author: arifibrahim4
ms.service: azure-communication-services
ms.subservice: advanced-messaging
ms.date: 02/29/2024
ms.topic: include
ms.custom: include file
ms.author: armohamed
---

## Prerequisites

- [WhatsApp Business Account registered with your Azure Communication Services resource](../../connect-whatsapp-business-account.md).
- Active WhatsApp phone number to receive messages.
- [Node.js](https://nodejs.org/) Active LTS and Maintenance LTS versions (We recommend 8.11.1 and 10.14.1).
- [Node.js](https://nodejs.org/) Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 are recommended)
    - In a terminal or command window, run `node --version` to check that Node.js is installed

## Setting up


### Create a new Node.js application

1. Create a new directory for your app and open it in a terminal or command window.

1. Run the following command.

   ```console
   mkdir advance-messages-quickstart && cd advance-messages-quickstart
   ```

1. Run the following command to create a `package.json` file with default settings.

   ```console
   npm init -y
   ```

1. Use a text editor to create a file called `send-messages.js` in the project root directory.

1. Add the following code snippet to the file `send-messages.js`.

   ```javascript
   async function main() {
       // Quickstart code goes here.
   }

   main().catch((error) => {
       console.error("Encountered an error while sending message: ", error);
       process.exit(1);
   });
   ```

Complete the following section to add your source code for this example to the `send-messages.js` file that you created.

### Install the package

Use the `npm install` command to install the Azure Communication Services Advance Messaging SDK for JavaScript.

```console
npm install @azure-rest/communication-messages --save
```

The `--save` option lists the library as a dependency in your **package.json** file.


## Code examples

Follow these steps to add required code snippets to the main function of your `send-messages.js` file.
- [Start sending messages between a business and a WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).
- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).
- [Send a text message to a WhatsApp user](#send-a-text-message-to-a-whatsapp-user).
- [Send an image media message to a WhatsApp user](#send-an-image-media-message-to-a-whatsapp-user).
- [Send a document media message to a WhatsApp user](#send-a-document-media-message-to-a-whatsapp-user).
- [Send an audio media message to a WhatsApp user](#send-an-audio-media-message-to-a-whatsapp-user).
- [Send a video media message to a WhatsApp user](#send-a-video-media-message-to-a-whatsapp-user).

  

### Start sending messages between a business and a WhatsApp user

Conversations between a WhatsApp Business Account and a WhatsApp user can be initiated in one of two ways:

- The business sends a template message to the WhatsApp user.
- The WhatsApp user sends any message to the business number.

Regardless of how the conversation was started, **a business can only send template messages until the user sends a message to the business.** Only after the user sends a message to the business, the business is allowed to send text or media messages to the user during the active conversation. Once the 24 hour conversation window expires, the conversation must be reinitiated. To learn more about conversations, see the definition at [WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/pricing#conversations).

### Authenticate the client

#### [Connection String](#tab/connection-string)

The following code retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING` using the dotenv package. 

For simplicity, this article uses a connection string to authenticate. In production environments, we recommend using [service principals](../../../../identity/service-principal.md).

Get the connection string from your Azure Communication Services resource in the Azure portal. On the left, navigate to the `Keys` tab. Copy the `Connection string` field for the `Primary key`. The connection string is in the format `endpoint=https://{your Azure Communication Services resource name}.communication.azure.com/;accesskey={secret key}`.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Connection string' field in the 'Primary key' section.

Set the environment variable `COMMUNICATION_SERVICES_CONNECTION_STRING` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_CONNECTION_STRING "<your connection string>"
```

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).


To instantiate a NotificationClient, add the following code to the `Main` method:
```javascript
const NotificationClient = require("@azure-rest/communication-messages").default;

// Set Connection string
const connectionString = process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"];

// Instantiate the client
const client = NotificationClient(connectionString);
```

<a name='azure-active-directory'></a>

#### [Microsoft Entra ID](#tab/aad)

You can also authenticate with Microsoft Entra ID using the [Azure Identity library](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity). 

The [`@Azure/identity`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity) package provides various credential types that your application can use to authenticate. You can choose from the various options to authenticate the identity client detailed at [Azure Identity - Credential providers](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme#credentials) and [Azure Identity - Authenticate the client](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme#authenticate-the-client). This option walks through one way of using the [`DefaultAzureCredential`](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme#defaultazurecredential). 

The `DefaultAzureCredential` attempts to authenticate via [`several mechanisms`](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme#defaultazurecredential) and it might be able to find its authentication credentials if you're signed into Visual Studio or Azure CLI. However, this option walks you through setting up with environment variables.    

To create a `DefaultAzureCredential` object:
1. To set up your service principle app, follow the instructions at [Creating a Microsoft Entra registered Application](../../../../identity/service-principal.md?pivots=platform-azcli#creating-a-microsoft-entra-registered-application).

1. Set the environment variables `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, and `AZURE_TENANT_ID` using the output of your app's creation.    
    Open a console window and enter the following commands:
    ```console
    setx AZURE_CLIENT_ID "<your app's appId>"
    setx AZURE_CLIENT_SECRET "<your app's password>"
    setx AZURE_TENANT_ID "<your app's tenant>"
    ```
    After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

1. To use the [`DefaultAzureCredential`](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme#defaultazurecredential) provider, or other credential providers provided with the Azure SDK, install the `@azure/identity` package.
    ```bash
    npm install @azure/identity
    ```

1. To instantiate a `NotificationClient`, add the following code to the `Main` method.
    ```javascript
    const DefaultAzureCredential = require("@azure/identity").DefaultAzureCredential;
    const NotificationClient = require("@azure-rest/communication-messages").default;
    
    // Configure authentication
    const endpoint = "https://<resource name>.communication.azure.com";
    let credential = new DefaultAzureCredential();
    
    // Instantiate the client
    const client = NotificationClient(endpoint, credential);
    ```

#### [AzureKeyCredential](#tab/azurekeycredential)

You can also authenticate with an AzureKeyCredential.

Get the endpoint and key from your Azure Communication Services resource in the Azure portal. On the left, navigate to the `Keys` tab. Copy the `Endpoint` and the `Key` field for the primary key.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Connection string' field in the 'Primary key' section.

Set the environment variable `COMMUNICATION_SERVICES_KEY` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_KEY "<your key>"
```
After you add the environment variable, you might need to restart any running programs that will need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

To instantiate a `NotificationClient`, add the following code to the `Main` method:
```javascript
const AzureKeyCredential = require("@azure/core-auth").AzureKeyCredential;
const NotificationClient = require("@azure-rest/communication-messages").default;

// Configure authentication
const endpoint = "https://<resource name>.communication.azure.com";
const credential = new AzureKeyCredential("<your key credential>");

// Instantiate the client
const client = NotificationClient(endpoint, credential);
```

---

### Set channel registration ID  

The Channel Registration ID GUID was created during [channel registration](../../connect-whatsapp-business-account.md). You can look it up in the portal on the Channels tab of your Azure Communication Services resource.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Channels' tab. Attention is placed on the copy action of the 'Channel ID' field.

Assign it to a variable called channelRegistrationId.
```javascript
const channelRegistrationId = "<your channel registration id GUID>";
```

### Set recipient list

You need to supply a real phone number that has a WhatsApp account associated with it, or a business-scoped user ID (BSUID). This WhatsApp account receives the template, text, and media messages sent in this article.
For this article, this phone number can be your personal phone number.   

The recipient phone number can't be the business phone number (Sender ID) associated with the WhatsApp channel registration. The Sender ID appears as the sender of the text and media messages sent to the recipient.

The phone number should include the country code. For more information on phone number formatting, see WhatsApp documentation for [Phone Number Formats](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers#phone-number-formats).

> **Note:**
> Only one phone number or BSUID is currently supported in the recipient list.

Create the recipient list like this:
```json
const recipientList = ["<to WhatsApp phone number or BSUID>"];
```

Example using a phone number:
```javascript
// Example only
const recipientList = ["+14255550199"];
```

Example using a BSUID:
```javascript
// Example only
const recipientList = ["US.13491208655302741918"];
```

> **Note:**
> Sending messages to BSUIDs will be available starting in June 2026. Until then, use phone numbers as recipients.

For more information about BSUIDs, see [WhatsApp usernames and BSUIDs](../../../../../concepts/advanced-messaging/whatsapp/whatsapp-username-support-overview.md).

> **Important:**
> To send a message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

### Send a text message to a WhatsApp user

The Messages SDK enables Contoso to send text WhatsApp messages, when initiated by a WhatsApp users. To send text messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- Message body/text to be sent.

In this example, we reply to the WhatsApp user with the text `"Thanks for your feedback.\n From Notification Messaging SDK."`

Assemble and send the text message:
```javascript
// Send text message
const textMessageResult = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
        channelRegistrationId: channelRegistrationId,
        to: recipientList,
        kind: "text",
        content: "Thanks for your feedback.\n From Notification Messaging SDK"
    }
});

// Process result
if (textMessageResult.status === "202") {
    textMessageResult.body.receipts.forEach((receipt) => {
        console.log("Message sent to:"+receipt.to+" with message id:"+receipt.messageId);
    });
} else {
    throw new Error("Failed to send message");
}
```

### Send an image media message to a WhatsApp user

The Messages SDK enables Contoso to send media (image, video, audio, or document) messages to WhatsApp users. To send an embedded media message, you need:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- URL of the Image media.

> **Important:**
> As of SDK version 2.0.0, `MediaNotificationContent` is being deprecated for images. We encourage you to use `ImageNotificationContent` to send images. Explore other content-specific classes for other media types like `DocumentNotificationContent`, `VideoNotificationContent`, and `AudioNotificationContent`.

To send an image message, provide a URL to an image. For example:

```javascript
const url = "https://example.com/image.jpg";
```

Assemble and send the media message:

```javascript
// Send image message
const mediaMessageResult = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
        channelRegistrationId: channelRegistrationId,
        to: recipientList,
        kind: "image",
        mediaUri: url
    }
});

// Process result
if (mediaMessageResult.status === "202") {
    mediaMessageResult.body.receipts.forEach((receipt) => {
        console.log("Message sent to:"+receipt.to+" with message id:"+receipt.messageId);
    });
} else {
    throw new Error("Failed to send message");
}
```

### Send a video media message to a WhatsApp user

The Messages SDK enables Contoso to send media (image, video, audio, or document) messages to WhatsApp users. To send an embedded media message, you need:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- URL of the video.

To send a video message, provide a URL to a video. As an example,
```javascript
const url = "https://example.com/video.mp4";
```

Assemble and send the video message:
```javascript
// Send video message
const mediaMessageResult = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
        channelRegistrationId: channelRegistrationId,
        to: recipientList,
        kind: "video",
        mediaUri: url
    }
});

// Process result
if (mediaMessageResult.status === "202") {
    mediaMessageResult.body.receipts.forEach((receipt) => {
        console.log("Message sent to:"+receipt.to+" with message id:"+receipt.messageId);
    });
} else {
    throw new Error("Failed to send message");
}
```

### Send an audio media message to a WhatsApp user

The Messages SDK enables Contoso to send media (image, video, audio, or document) messages to WhatsApp users. To send an embedded media message, you need:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- URL of the Audio media.

To send an audio message, provide a URL to an audio file. As an example:

```javascript
const url = "https://example.com/audio.mp3";
```

Assemble and send the audio message:
```javascript
// Send audio message
const mediaMessageResult = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
        channelRegistrationId: channelRegistrationId,
        to: recipientList,
        kind: "audio",
        mediaUri: url
    }
});

// Process result
if (mediaMessageResult.status === "202") {
    mediaMessageResult.body.receipts.forEach((receipt) => {
        console.log("Message sent to:"+receipt.to+" with message id:"+receipt.messageId);
    });
} else {
    throw new Error("Failed to send message");
}
```

### Send a document media message to a WhatsApp user

The Messages SDK enables Contoso to send media (image, video, audio, or document) messages to WhatsApp users. To send an embedded media message, you need:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- URL of the  Document media.

To send a document message, provide a URL to a document. As an example,
```javascript
const url = "https://example.com/document.pdf";
```

Assemble and send the document message:
```javascript
// Send document message
const mediaMessageResult = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
        channelRegistrationId: channelRegistrationId,
        to: recipientList,
        kind: "document",
        mediaUri: url
    }
});

// Process result
if (mediaMessageResult.status === "202") {
    mediaMessageResult.body.receipts.forEach((receipt) => {
        console.log("Message sent to:"+receipt.to+" with message id:"+receipt.messageId);
    });
} else {
    throw new Error("Failed to send message");
}
```

### Run the code

Use the node command to run the code you added to the `send-messages.js` file.

```console
node ./send-messages.js
```

## Full sample code

Find the finalized code on GitHub [Messages Services client library samples for JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-messages-rest/samples).
