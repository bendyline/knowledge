---
title: Include file
description: Include file
services: azure-communication-services
author: memontic
ms.service: azure-communication-services
ms.subservice: advanced-messaging
ms.date: 07/15/2024
ms.topic: include
ms.custom: include file
ms.author: memontic
---

## Prerequisites

- [WhatsApp Business Account registered with your Azure Communication Services resource](../../connect-whatsapp-business-account.md).
- Active WhatsApp phone number to receive messages.
- .NET development environment, such as [Visual Studio](https://visualstudio.microsoft.com/downloads/), [Visual Studio Code](https://code.visualstudio.com/Download), or [.NET CLI](https://dotnet.microsoft.com/download).

## Set up environment


### Create the .NET project

#### [Visual Studio](#tab/visual-studio)

To create your project, follow the tutorial at [Create a .NET console application using Visual Studio](https://learn.microsoft.com/dotnet/core/tutorials/with-visual-studio).

To compile your code, press **Ctrl**+**F7**.

#### [Visual Studio Code](#tab/vs-code)

To create your project, follow the tutorial at [Create a .NET console application using Visual Studio Code](https://learn.microsoft.com/dotnet/core/tutorials/with-visual-studio-code).

Build and run your program by running the following commands in the Visual Studio Code Terminal (**View** > **Terminal**).

```console
dotnet build
dotnet run
```

#### [.NET CLI](#tab/dotnet-cli)

Create your project.

```console
dotnet new console -o AdvancedMessagingQuickstart
```

Navigate to your project directory and build your project.

```console
cd AdvancedMessagingQuickstart
dotnet build
```

---

### Install the package

Install the Azure.Communication.Messages NuGet package to your C# project.

#### [Visual Studio](#tab/visual-studio)
 
1. Open the NuGet Package Manager at `Project` > `Manage NuGet Packages...`.   
2. Search for the package `Azure.Communication.Messages`.   
3. Install the latest release.

#### [Visual Studio Code](#tab/vs-code)

1. Open the Visual Studio Code terminal ( `View` > `Terminal` ).
2. Install the package by running the following command.

```console
dotnet add package Azure.Communication.Messages
```

#### [.NET CLI](#tab/dotnet-cli)

Install the package by running the following command.

```console
dotnet add package Azure.Communication.Messages
```

---

### Set up the app framework

Open the `Program.cs` file in a text editor.   

Replace the contents of your `Program.cs` with the following code:

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Azure;
using Azure.Communication.Messages;

namespace AdvancedMessagingQuickstart
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("Azure Communication Services - Advanced Messages quickstart samples.");

            // Quickstart code goes here
        }
    }
}
```

To use the Advanced Messaging features, add a `using` directive to include the `Azure.Communication.Messages` namespace.

```csharp
using Azure.Communication.Messages;
```


## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Advance Messaging SDK for .NET.

| Class Name | Description |
| --- | --- |
| `NotificationMessagesClient` | Connects to your Azure Communication Services resource. It sends the messages. |
| `MessageTemplate` | Defines which template you use and the content of the template properties for your message. |
| `TemplateNotificationContent` | Defines the "who" and the "what" of the template message you intend to send. |
| `TextNotificationContent` | Defines the "who" and the "what" of the text message you intend to send. |
| `ImageNotificationContent` | Defines the "who" and the "what" of the image media message you intend to send. |
| `DocumentNotificationContent` | Defines the "who" and the "what" of the Document media message you intend to send. |
| `VideoNotificationContent` | Defines the "who" and the "what" of the Video media message you intend to send. |
| `AudioNotificationContent` | Defines the "who" and the "what" of the Audio media message you intend to send. |


> **Note:**
> For more information, see the Azure SDK for .NET reference [Azure.Communication.Messages Namespace](https://learn.microsoft.com/dotnet/api/azure.communication.messages).

## Common configuration

Follow these steps to add required code snippets to the messages-quickstart.py python program.

- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).
- [Start sending messages between a business and a WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

  

### Authenticate the client 

The Messages SDK uses the `NotificationMessagesClient` to send messages. The `NotificationMessagesClient` method authenticates using your connection string acquired from Azure Communication Services resource in the Azure portal. For more information about connection strings, see [access-your-connection-strings-and-service-endpoints](../../../../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

   

#### [Connection String](#tab/connection-string)

For simplicity, this article uses a connection string to authenticate. In production environments, we recommend using [service principals](../../../../identity/service-principal.md).

Get the connection string from your Azure Communication Services resource in the Azure portal. On the left, navigate to the `Keys` tab. Copy the `Connection string` field for the primary key. The connection string is in the format `endpoint=https://{your Azure Communication Services resource name}.communication.azure.com/;accesskey={secret key}`.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Connection string' field in the 'Primary key' section.

Set the environment variable `COMMUNICATION_SERVICES_CONNECTION_STRING` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_CONNECTION_STRING "<your connection string>"
```
After you add the environment variable, you might need to restart any running programs that will need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

To instantiate a `NotificationMessagesClient`, add the following code to the `Main` method:
```csharp
// Retrieve connection string from environment variable
string connectionString = 
    Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING");

// Instantiate the client
var notificationMessagesClient = new NotificationMessagesClient(connectionString);
```

#### [Microsoft Entra ID](#tab/aad)

You can also authenticate with Microsoft Entra ID using the [Azure Identity library](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/identity/Azure.Identity). 

The [`Azure.Identity`](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/identity/Azure.Identity) package provides various credential types that your application can use to authenticate. You can choose from the various options to authenticate the identity client detailed at [Azure Identity - Credential providers](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme#credentials) and [Azure Identity - Authenticate the client](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme#authenticate-the-client). This option walks through one way of using the [`DefaultAzureCredential`](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme#defaultazurecredential).
 
The `DefaultAzureCredential` attempts to authenticate via [`several mechanisms`](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme#defaultazurecredential) and might obtain its authentication credentials if you're signed into Visual Studio or Azure CLI. However, this option walks you through setting up with environment variables.   

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

1. To use the [`DefaultAzureCredential`](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme#defaultazurecredential) provider, or other credential providers provided with the Azure SDK, install the `Azure.Identity` NuGet package and add the following `using` directive to your *Program.cs* file.
    ```csharp
    using Azure.Identity;
    ```

1. To instantiate a `NotificationMessagesClient`, add the following code to the `Main` method.
    ```csharp
    // Configure authentication
    var endpoint = new Uri("https://<resource name>.communication.azure.com");
    var credential = new DefaultAzureCredential();

    // Instantiate the client
    var notificationMessagesClient = 
        new NotificationMessagesClient(endpoint, credential);
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

To instantiate a `NotificationMessagesClient`, add the following code to the `Main` method:
```csharp
// Retrieve key from environment variable
string key = 
    Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_KEY");

// Configure authentication
var endpoint = new Uri("https://<resource name>.communication.azure.com");
var credential = new AzureKeyCredential(key);

// Instantiate the client
var notificationMessagesClient = 
    new NotificationMessagesClient(endpoint, credential);
```


### Set channel registration ID   

You created the Channel Registration ID GUID during [channel registration](../../connect-whatsapp-business-account.md). Find it in the portal on the **Channels** tab of your Azure Communication Services resource.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Channels' tab. Attention is placed on the copy action of the 'Channel ID' field.

Assign it to a variable called channelRegistrationId.
```csharp
var channelRegistrationId = new Guid("<your channel registration ID GUID>");
```

### Set recipient list

You need to supply an active phone number associated with a WhatsApp account, or a business-scoped user ID (BSUID). This WhatsApp account receives the template, text, and media messages sent in this quickstart.

For this example, you can use your personal phone number.   

The recipient phone number can't be the business phone number (Sender ID) associated with the WhatsApp channel registration. The Sender ID appears as the sender of the text and media messages sent to the recipient.

The phone number must include the country code. For more information about phone number formatting, see WhatsApp documentation for [Phone Number Formats](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers#phone-number-formats).

> **Note:**
> Only one phone number or BSUID is currently supported in the recipient list.

Create the recipient list like this:
```csharp
var recipientList = new List<string> { "<to WhatsApp phone number or BSUID>" };
```

Example using a phone number:
```csharp
// Example only
var recipientList = new List<string> { "+14255550199" };
```

Example using a BSUID:
```csharp
// Example only
var recipientList = new List<string> { "US.13491208655302741918" };
```

> **Note:**
> Sending messages to BSUIDs will be available starting in June 2026. Until then, use phone numbers as recipients.

For more information about BSUIDs, see [WhatsApp usernames and BSUIDs](../../../../../concepts/advanced-messaging/whatsapp/whatsapp-username-support-overview.md).

### Start sending messages between a business and a WhatsApp user

Conversations between a WhatsApp Business Account and a WhatsApp user can be initiated in one of two ways:

- The business sends a template message to the WhatsApp user.
- The WhatsApp user sends any message to the business number.

A business can't initiate an interactive conversation. A business can only send an interactive message after receiving a message from the user. The business can only send interactive messages to the user during the active conversation. Once the 24 hour conversation window expires, only the user can restart the interactive conversation. For more information about conversations, see the definition at [WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/pricing#conversations).

To initiate an interactive conversation from your personal WhatsApp account, send a message to your business number (Sender ID).

A WhatsApp conversation viewed on the web showing a user message sent to the WhatsApp Business Account number.

## Code examples

Follow these steps to add required code snippets to the Main function of your `Program.cs` file.
- [Send a text message to a WhatsApp user](#send-a-text-message-to-a-whatsapp-user).
- [Send an image media message to a WhatsApp user](#send-an-image-media-message-to-a-whatsapp-user).
- [Send a document media message to a WhatsApp user](#send-a-document-media-message-to-a-whatsapp-user).
- [Send an audio media message to a WhatsApp user](#send-an-audio-media-message-to-a-whatsapp-user).
- [Send a video media message to a WhatsApp user](#send-a-video-media-message-to-a-whatsapp-user).

> **Important:**
> To send a text or media message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

### Send a text message to a WhatsApp user

The Messages SDK allows Contoso to send WhatsApp text messages, which initiated WhatsApp users initiated. To send a text message, you need:
- [Authenticated NotificationMessagesClient](#authenticate-the-client)
- [WhatsApp channel ID](#set-channel-registration-id)
- [Recipient phone number in E16 format or BSUID](#set-recipient-list)
- Message body/text to be sent

In this example, we reply to the WhatsApp user with the text: `"Thanks for your feedback.\n From Notification Messaging SDK."`

Assemble and send the text message:
```csharp
// Assemble text message
var textContent = 
    new TextNotificationContent(channelRegistrationId, recipientList, "Thanks for your feedback.\n From Notification Messaging SDK");

// Send text message
Response<SendMessageResult> sendTextMessageResult = 
    await notificationMessagesClient.SendAsync(textContent);
```

### Send an image media message to a WhatsApp user

The Messages SDK enables Contoso to send WhatsApp media messages to WhatsApp users. To send an embedded media message, you need:
- [Authenticated NotificationMessagesClient](#authenticate-the-client).
- [WhatsApp channel ID](#set-channel-registration-id).
- [Recipient phone number in E16 format or BSUID](#set-recipient-list).
- URI of the image Media.

> **Important:**
> As of SDK version 1.1.0, `MediaNotificationContent` is being deprecated for images. We encourage you to use `ImageNotificationContent` for sending images. Explore other content-specific classes for other media types like `DocumentNotificationContent`, `VideoNotificationContent`, and `AudioNotificationContent`.

Assemble the image message:

```csharp
var imageLink = new Uri("https://example.com/image.jpg");
var imageNotificationContent = new ImageNotificationContent(channelRegistrationId, recipientList, imageLink)  
{  
    Caption = "Check out this image."  
};
```

Send the image message:

```csharp
var imageResponse = await notificationMessagesClient.SendAsync(imageNotificationContent);
```

### Send a document media message to a WhatsApp user

The Messages SDK enables Contoso to send WhatsApp media messages to WhatsApp users. To send an embedded media message, you need:
- [Authenticated NotificationMessagesClient](#authenticate-the-client).
- [WhatsApp channel ID](#set-channel-registration-id).
- [Recipient phone number in E16 format or BSUID](#set-recipient-list).
- URI of the document Media.

Assemble the document content:

```csharp
var documentLink = new Uri("https://example.com/document.pdf");
var documentNotificationContent = new DocumentNotificationContent(channelRegistrationId, recipientList, documentLink)  
{  
    Caption = "Check out this document.",  
    FileName = "document.pdf"  
};
```

Send the document message:

```csharp
var documentResponse = await notificationMessagesClient.SendAsync(documentNotificationContent);
```

### Send a video media message to a WhatsApp user

The Messages SDK enables Contoso to send WhatsApp media messages to WhatsApp users. To send an embedded media message, you need:
- [Authenticated NotificationMessagesClient](#authenticate-the-client).
- [WhatsApp channel ID](#set-channel-registration-id).
- [Recipient phone number in E16 format or BSUID](#set-recipient-list).
- URI of the video media.

Assemble the video message:

```csharp
var videoLink = new Uri("https://example.com/video.mp4");
var videoNotificationContent = new VideoNotificationContent(channelRegistrationId, recipientList, videoLink)  
{  
    Caption = "Check out this video."  
};
```

Send the video message:

```csharp
var videoResponse = await notificationMessagesClient.SendAsync(videoNotificationContent);
```

### Send an audio media message to a WhatsApp user

The Messages SDK enables Contoso to send WhatsApp media messages to WhatsApp users. To send an embedded media message, you need:
- [Authenticated NotificationMessagesClient](#authenticate-the-client).
- [WhatsApp channel ID](#set-channel-registration-id).
- [Recipient phone number in E16 format or BSUID](#set-recipient-list).
- URI of the audio media.

Assemble the audio message:

```csharp
var audioLink = new Uri("https://example.com/audio.mp3");
var audioNotificationContent = new AudioNotificationContent(channelRegistrationId, recipientList, audioLink);
```

Send the audio message:

```csharp
var audioResponse = await notificationMessagesClient.SendAsync(audioNotificationContent);
```

### Run the code

Build and run your program.  

To send a text or media message to a WhatsApp user, there must be an active conversation between the WhatsApp Business Account and the WhatsApp user.

If you don't have an active conversation, for this example add a wait between sending the template message and sending the text message. This added delay gives you enough time to reply to the business on the user's WhatsApp account. For reference, the full example at [Sample code](#full-sample-code) prompts for manual user input before sending the next message.
  
If successful, you receive three messages on the user's WhatsApp account.

#### [Visual Studio](#tab/visual-studio)

1. To compile your code, press **Ctrl**+**F7**.
1. To run the program without debugging, press **Ctrl**+**F5**.

#### [Visual Studio Code](#tab/vs-code)

Build and run your program using the following commands in the Visual Studio Code Terminal (**View** > **Terminal**).

```console
dotnet build
dotnet run
```

#### [.NET CLI](#tab/dotnet-cli)

Build and run your program.

```console
dotnet build
dotnet run
```

---

## Full sample code


```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Azure.Communication.Messages;

namespace AdvancedMessagingQuickstart
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("Azure Communication Services - Send WhatsApp Messages\n");

            string connectionString = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING");
            NotificationMessagesClient notificationMessagesClient = 
                new NotificationMessagesClient(connectionString);

            var channelRegistrationId = new Guid("<Your Channel ID>");
            var recipientList = new List<string> { "<Recipient's WhatsApp Phone Number>" };

            // Send sample template sample_template
            string templateName = "sample_template";
            string templateLanguage = "en_us";
            MessageTemplate sampleTemplate = new MessageTemplate(templateName, templateLanguage);
            TemplateNotificationContent templateContent = 
                new TemplateNotificationContent(channelRegistrationId, recipientList, sampleTemplate);
            Response<SendMessageResult> sendTemplateMessageResult = 
                await notificationMessagesClient.SendAsync(templateContent);

            PrintResult(sendTemplateMessageResult);
            Console.WriteLine("Template message sent.\nWait until the WhatsApp user responds " +
                "to the template message, then press any key to continue.\n");
            Console.ReadKey();

            // Send a text message
            string messageText = "Thanks for your feedback.";
            TextNotificationContent textContent =
                new TextNotificationContent(channelRegistrationId, recipientList, messageText);
            Response<SendMessageResult> sendTextMessageResult =
                await notificationMessagesClient.SendAsync(textContent);

            PrintResult(sendTextMessageResult);
            Console.WriteLine($"Text message sent to my phoneNumber.\nPress any key to continue.\n");
            Console.ReadKey();

            // Send a media message
            Uri uri = new Uri("https://aka.ms/acsicon1");
            ImageNotificationContent imageContent =
                new ImageNotificationContent(channelRegistrationId, recipientList, uri);
            Response<SendMessageResult> sendMediaMessageResult =
                await notificationMessagesClient.SendAsync(imageContent);

            PrintResult(sendMediaMessageResult);
            Console.WriteLine("Media message sent.\nPress any key to exit.\n");
            Console.ReadKey();
        }

        public static void PrintResult(Response<SendMessageResult> result)
        {
            Console.WriteLine($"Response: {result.GetRawResponse().Status} " +
                $"({result.GetRawResponse().ReasonPhrase})");
            Console.WriteLine($"Date: " +
                $"{result.GetRawResponse().Headers.First(header => header.Name == "Date").Value}");
            Console.WriteLine($"ClientRequestId: {result.GetRawResponse().ClientRequestId}");
            Console.WriteLine($"MS-CV: " +
                $"{result.GetRawResponse().Headers.First(header => header.Name == "MS-CV").Value}");
            foreach (var receipts in result.Value.Receipts)
            {
                Console.WriteLine($"MessageId: {receipts.MessageId}");
            }
            Console.WriteLine($"\n");
        }
    }
}
```
