---
title: Send text and media WhatsApp messages
titleSuffix: An Azure Communication Services Messages article
description: This article describes how to send text and media WhatsApp messages in Azure Communication Services Messages.
author: Shamkh
manager: camilo.ramirez
services: azure-communication-services
ms.author: shamkh
ms.date: 07/15/2024
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: advanced-messaging
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python
---

# Send text and media WhatsApp messages


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Azure Communication Services enables you to send and receive WhatsApp messages. This article describes how to integrate your app with Azure Communication Advanced Messages SDK to start sending and receiving WhatsApp messages. Completing this article incurs a small cost of a few USD cents or less in your Azure account.

**Applies to: programming-language-csharp**


## Prerequisites

- [WhatsApp Business Account registered with your Azure Communication Services resource](connect-whatsapp-business-account.md).
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

The Messages SDK uses the `NotificationMessagesClient` to send messages. The `NotificationMessagesClient` method authenticates using your connection string acquired from Azure Communication Services resource in the Azure portal. For more information about connection strings, see [access-your-connection-strings-and-service-endpoints](../../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

   

#### [Connection String](#tab/connection-string)

For simplicity, this article uses a connection string to authenticate. In production environments, we recommend using [service principals](../../identity/service-principal.md).

Get the connection string from your Azure Communication Services resource in the Azure portal. On the left, navigate to the `Keys` tab. Copy the `Connection string` field for the primary key. The connection string is in the format `endpoint=https://{your Azure Communication Services resource name}.communication.azure.com/;accesskey={secret key}`.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Connection string' field in the 'Primary key' section.

Set the environment variable `COMMUNICATION_SERVICES_CONNECTION_STRING` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_CONNECTION_STRING "<your connection string>"
```
After you add the environment variable, you might need to restart any running programs that will need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

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
1. To set up your service principle app, follow the instructions at [Creating a Microsoft Entra registered Application](../../identity/service-principal.md?pivots=platform-azcli#creating-a-microsoft-entra-registered-application).

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

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

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

You created the Channel Registration ID GUID during [channel registration](connect-whatsapp-business-account.md). Find it in the portal on the **Channels** tab of your Azure Communication Services resource.

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

For more information about BSUIDs, see [WhatsApp usernames and BSUIDs](../../../concepts/advanced-messaging/whatsapp/whatsapp-username-support-overview.md).

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



**Applies to: programming-language-java**


## Prerequisites

- [WhatsApp Business Account registered with your Azure Communication Services resource](connect-whatsapp-business-account.md).
- Active WhatsApp phone number to receive messages.
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/) version 8 or later.
- [Apache Maven](https://maven.apache.org/download.cgi).

## Set up environment

To set up an environment for sending messages, complete the steps in the following sections.


### Create a new Java application

Open a terminal or command window and navigate to the directory where you want to create your Java application. Run the following command to generate the Java project from the `maven-archetype-quickstart` template.

```console
mvn archetype:generate -DgroupId="com.communication.quickstart" -DartifactId="communication-quickstart" -DarchetypeArtifactId="maven-archetype-quickstart" -DarchetypeVersion="1.4" -DinteractiveMode="false"
```

The `generate` goal creates a directory with the same name as the `artifactId` value. Under this directory, the `src/main/java` directory contains the project source code, the `src/test/java` directory contains the test source, and the `pom.xml` file is the project's Project Object Model (POM).

### Install the package

Open the `pom.xml` file in your text editor. Add the following dependency element to the group of dependencies.

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-messages</artifactId>
</dependency>
```

### Set up the app framework

Open `/src/main/java/com/communication/quickstart/App.java` in a text editor, add import directives, and remove the `System.out.println("Hello world!");` statement:

```java
package com.communication.quickstart;

import com.azure.communication.messages.*;
import com.azure.communication.messages.models.*;

import java.util.ArrayList;
import java.util.List;
public class App
{
    public static void main( String[] args )
    {
        // Quickstart code goes here.
    }
}
```


## Code examples

Follow these steps to add required code snippets to the main function of your `App.java` file.
- [Start sending messages between a business and a WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).
- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).
- [Send a text message to a WhatsApp user](#send-a-text-message-to-a-whatsapp-user)
- [Send an image media message to a WhatsApp user](#send-an-image-media-message-to-a-whatsapp-user)
- [Send a document media message to a WhatsApp user](#send-a-document-media-message-to-a-whatsapp-user)
- [Send an audio media message to a WhatsApp user](#send-an-audio-media-message-to-a-whatsapp-user)
- [Send a video media message to a WhatsApp user](#send-a-video-media-message-to-a-whatsapp-user)


### Start sending messages between a business and a WhatsApp user

Conversations between a WhatsApp Business Account and a WhatsApp user can be initiated in one of two ways:

- The business sends a template message to the WhatsApp user.
- The WhatsApp user sends any message to the business number.

Regardless of how the conversation was started, **a business can only send template messages until the user sends a message to the business.** Only after the user sends a message to the business, the business is allowed to send text or media messages to the user during the active conversation. Once the 24 hour conversation window expires, the conversation must be reinitiated. To learn more about conversations, see the definition at [WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/pricing#conversations).  

### Authenticate the client

There are a few different options available for authenticating a Message client:

#### [Connection String](#tab/connection-string)

To authenticate a client, you instantiate an `NotificationMessagesClient` or `MessageTemplateClient` with your connection string. You can also initialize the client with any custom HTTP client that implements the `com.azure.core.http.HttpClient` interface.

For simplicity, this article uses a connection string to authenticate. In production environments, we recommend using [service principals](../../identity/service-principal.md).

Get the connection string from your Azure Communication Services resource in the Azure portal. On the left, navigate to the `Keys` tab. Copy the `Connection string` field for the `Primary key`. The connection string is in the format `endpoint=https://{your Azure Communication Services resource name}.communication.azure.com/;accesskey={secret key}`.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Connection string' field in the 'Primary key' section.

Set the environment variable `COMMUNICATION_SERVICES_CONNECTION_STRING` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_CONNECTION_STRING "<your connection string>"
```

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

To instantiate a NotificationMessagesClient, add the following code to the `main` method:

```java
// You can get your connection string from your resource in the Azure portal.
String connectionString = System.getenv("COMMUNICATION_SERVICES_CONNECTION_STRING");

NotificationMessagesClient notificationClient = new NotificationMessagesClientBuilder()
    .connectionString(connectionString)
    .buildClient();
```

<a name='azure-active-directory'></a>

#### [Microsoft Entra ID](#tab/aad)

You can also authenticate with Microsoft Entra ID using the [Azure Identity library](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/identity/azure-identity). 

The [`Azure.Identity`](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/identity/azure-identity) package provides various credential types that your application can use to authenticate. You can choose from the various options to authenticate the identity client detailed at [Azure Identity - Credential providers](https://learn.microsoft.com/java/api/overview/azure/identity-readme#credentials) and [Azure Identity - Authenticate the client](https://learn.microsoft.com/java/api/overview/azure/identity-readme#authenticate-the-client). This option walks through one way of using the [`DefaultAzureCredential`](https://learn.microsoft.com/java/api/overview/azure/identity-readme#defaultazurecredential).

The `DefaultAzureCredential` attempts to authenticate via [`several mechanisms`](https://learn.microsoft.com/java/api/overview/azure/identity-readme#defaultazurecredential) and it might be able to find its authentication credentials if you're signed into Visual Studio or Azure CLI. However, this option walks you through setting up with environment variables.   

To create a `DefaultAzureCredential` object:
1. To set up your service principle app, follow the instructions at [Creating a Microsoft Entra registered Application](../../identity/service-principal.md?pivots=platform-azcli#creating-a-microsoft-entra-registered-application).

1. Set the environment variables `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, and `AZURE_TENANT_ID` using the output of your app's creation.    
    Open a console window and enter the following commands:
    ```console
    setx AZURE_CLIENT_ID "<your app's appId>"
    setx AZURE_CLIENT_SECRET "<your app's password>"
    setx AZURE_TENANT_ID "<your app's tenant>"
    ```
    After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

1. To use the [`DefaultAzureCredential`](https://learn.microsoft.com/java/api/overview/azure/identity-readme#defaultazurecredential) provider, or other credential providers provided with the Azure SDK, follow the instruction to include the `azure-identity` package at [Azure Identity - Include the package](https://learn.microsoft.com/java/api/overview/azure/identity-readme#include-the-package).

1. To instantiate a `NotificationMessagesClient`, add the following code to the `Main` method.
    ```java
    String endpoint = "https://<resource name>.communication.azure.com/";
    NotificationMessagesClient notificationClient =  new NotificationMessagesClientBuilder()
        .endpoint(endpoint)
        .credential(new DefaultAzureCredentialBuilder().build())
        .buildClient();
    ```

    A [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/identity/azure-identity#defaultazurecredential) object must be passed to the `ClientBuilder` via the `credential()` method. An endpoint must also be set via the `endpoint()` method.

#### [AzureKeyCredential](#tab/azurekeycredential)

NotificationMessage or MessageTemplate clients can also be created and authenticated using the endpoint and Azure Key Credential acquired from an Azure Communication Resource in the [Azure portal](https://portal.azure.com/).

1. Add the import
   ```java
   import com.azure.core.credential.AzureKeyCredential;
   ``` 
    
1. To instantiate a `NotificationMessagesClient`, add the following code to the `Main` method.

    ```java
    String endpoint = "https://<resource name>.communication.azure.com";
    AzureKeyCredential azureKeyCredential = new AzureKeyCredential("<access key>");
    NotificationMessagesClient notificationClient = new NotificationMessagesClientBuilder()
        .endpoint(endpoint)
        .credential(azureKeyCredential)
        .buildClient();
    ```

---

### Set channel registration ID   

The Channel Registration ID GUID was created during channel registration. You can look it up in the portal on the Channels tab of your Azure Communication Services resource.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Channels' tab. Attention is placed on the copy action of the 'Channel ID' field.

Assign it to a variable called channelRegistrationId.
```java
String channelRegistrationId = "<your channel registration id GUID>";
```

### Set recipient list

You need to supply a real phone number that has a WhatsApp account associated with it, or a business-scoped user ID (BSUID). This WhatsApp account receives the text and media messages sent in this article.
For this article, this phone number can be your personal phone number.   

The recipient phone number can't be the business phone number (Sender ID) associated with the WhatsApp channel registration. The Sender ID appears as the sender of the text and media messages sent to the recipient.

The phone number should include the country code. For more information on phone number formatting, see WhatsApp documentation for [Phone Number Formats](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers#phone-number-formats).

> **Note:**
> Only one phone number or BSUID is currently supported in the recipient list.

Create the recipient list like this:
```java
List<String> recipientList = new ArrayList<>();
recipientList.add("<to WhatsApp phone number or BSUID>");
```

Example using a phone number:
```java
// Example only
List<String> recipientList = new ArrayList<>();
recipientList.add("+14255550199");
```

Example using a BSUID:
```java
// Example only
List<String> recipientList = new ArrayList<>();
recipientList.add("US.13491208655302741918");
```

> **Note:**
> Sending messages to BSUIDs will be available starting in June 2026. Until then, use phone numbers as recipients.

For more information about BSUIDs, see [WhatsApp usernames and BSUIDs](../../../concepts/advanced-messaging/whatsapp/whatsapp-username-support-overview.md).


### Send a text message to a WhatsApp user

Messages SDK allows Contoso to send text WhatsApp messages, which initiated WhatsApp users initiated. To send text messages below details are required:
- [WhatsApp Channel ID](#set-channel-registration-id)
- [Recipient Phone Number in E16 format](#set-recipient-list)
- Message body/text to be sent

In this example, we reply to the WhatsApp user with the text `"Thanks for your feedback.\n From Notification Messaging SDK."`

> **Important:**
> To send a text message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

Assemble and send the text message:

```java
// Assemble text message
TextNotificationContent textContent = new TextNotificationContent(channelRegistrationId, recipientList, "“Thanks for your feedback.\n From Notification Messaging SDK");

// Send text message
SendMessageResult textMessageResult = notificationClient.send(textContent);

// Process result
for (MessageReceipt messageReceipt : textMessageResult.getReceipts()) {
    System.out.println("Message sent to:" + messageReceipt.getTo() + " and message id:" + messageReceipt.getMessageId());
}
```

### Send an image media message to a WhatsApp user

The Messages SDK enables Contoso to send media (image, video, audio, or document) messages to WhatsApp users. To send an embedded media message, you need:
- [WhatsApp Channel ID](#set-channel-registration-id)
- [Recipient Phone Number in E16 format](#set-recipient-list)
- URL of the Image media

> **Important:**
> As of SDK version 1.1.0, `MediaNotificationContent` is being deprecated for images. We encourage you to use `ImageNotificationContent` to send images. Explore other content-specific classes for other media types like `DocumentNotificationContent`, `VideoNotificationContent`, and `AudioNotificationContent`.

> **Important:**
> To send an image message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

Assemble and send the image message:

```java
// Assemble image message
String imageUrl = "https://example.com/image.jpg";
ImageNotificationContent imageContent = new ImageNotificationContent(channelRegistrationId, recipientList, imageUrl);

// Send image message
SendMessageResult imageMessageResult = notificationClient.send(imageContent);

// Process result
for (MessageReceipt messageReceipt : imageMessageResult.getReceipts()) {
    System.out.println("Message sent to:" + messageReceipt.getTo() + " and message id:" + messageReceipt.getMessageId());
}
```

### Send a video media message to a WhatsApp user

The Messages SDK enables Contoso to send media (image, video, audio, or document) messages to WhatsApp users. To send an embedded media message, you need:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- URL of the Video media.

> **Important:**
> To send a video message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

Assemble and send the video message:

```java
// Assemble video message
String videoUrl = "https://example.com/video.mp4";
VideoNotificationContent videoContent = new VideoNotificationContent(channelRegistrationId, recipientList, videoUrl);

// Send video message
SendMessageResult videoMessageResult = notificationClient.send(videoContent);

// Process result
for (MessageReceipt messageReceipt : videoMessageResult.getReceipts()) {
    System.out.println("Message sent to:" + messageReceipt.getTo() + " and message id:" + messageReceipt.getMessageId());
}
```

### Send an audio media message to a WhatsApp user

The Messages SDK enables Contoso to send media (image, video, audio, or document) messages to WhatsApp users. To send an embedded media message, you need:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- URL of the Audio media.

> **Important:**
> To send an audio message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

Assemble and send the audio message:

```java
// Assemble audio message
String audioUrl = "https://example.com/audio.mp3";
AudioNotificationContent audioContent = new AudioNotificationContent(channelRegistrationId, recipientList, audioUrl);

// Send audio message
SendMessageResult audioMessageResult = notificationClient.send(audioContent);

// Process result
for (MessageReceipt messageReceipt : audioMessageResult.getReceipts()) {
    System.out.println("Message sent to:" + messageReceipt.getTo() + " and message id:" + messageReceipt.getMessageId());
}
```

### Send a document media message to a WhatsApp user

The Messages SDK enables Contoso to send media (image, video, audio, or document) messages to WhatsApp users. To send an embedded media message, you need:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- URL of the Document media.

> **Important:**
> To send a document message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

Assemble and send the document message:

```java
// Assemble document message
String docUrl = "https://example.com/document.pdf";
DocumentNotificationContent docContent = new DocumentNotificationContent(channelRegistrationId, recipientList, docUrl);

// Send document message
SendMessageResult docMessageResult = notificationClient.send(docContent);

// Process result
for (MessageReceipt messageReceipt : docMessageResult.getReceipts()) {
    System.out.println("Message sent to:" + messageReceipt.getTo() + " and message id:" + messageReceipt.getMessageId());
}
```

### Run the code

1. Open to the directory that contains the `pom.xml` file and compile the project using the `mvn` command.

   ```console
   mvn compile
   ```

1. Run the app by executing the following `mvn` command.

   ```console
   mvn exec:java -D"exec.mainClass"="com.communication.quickstart.App" -D"exec.cleanupDaemonThreads"="false"
   ```

## Full sample code

Find the finalized on GitHub at [Azure Messages client library for Java](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/communication/azure-communication-messages/src/samples/java/com/azure/communication/messages).



**Applies to: programming-language-javascript**


## Prerequisites

- [WhatsApp Business Account registered with your Azure Communication Services resource](connect-whatsapp-business-account.md).
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

For simplicity, this article uses a connection string to authenticate. In production environments, we recommend using [service principals](../../identity/service-principal.md).

Get the connection string from your Azure Communication Services resource in the Azure portal. On the left, navigate to the `Keys` tab. Copy the `Connection string` field for the `Primary key`. The connection string is in the format `endpoint=https://{your Azure Communication Services resource name}.communication.azure.com/;accesskey={secret key}`.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Connection string' field in the 'Primary key' section.

Set the environment variable `COMMUNICATION_SERVICES_CONNECTION_STRING` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_CONNECTION_STRING "<your connection string>"
```

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).


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
1. To set up your service principle app, follow the instructions at [Creating a Microsoft Entra registered Application](../../identity/service-principal.md?pivots=platform-azcli#creating-a-microsoft-entra-registered-application).

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

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

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

The Channel Registration ID GUID was created during [channel registration](connect-whatsapp-business-account.md). You can look it up in the portal on the Channels tab of your Azure Communication Services resource.

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

For more information about BSUIDs, see [WhatsApp usernames and BSUIDs](../../../concepts/advanced-messaging/whatsapp/whatsapp-username-support-overview.md).

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



**Applies to: programming-language-python**


## Prerequisites

- [WhatsApp Business Account registered with your Azure Communication Services resource](connect-whatsapp-business-account.md).

- Active WhatsApp phone number to receive messages.

- [Python](https://www.python.org/downloads/) 3.7+ for your operating system.

## Setting up


### Create a new Python application

In a terminal or console window, create a new folder for your application and open it.

```console
mkdir messages-quickstart && cd messages-quickstart
```

### Install the package

Use the Azure Communication Messages client library for Python [1.1.0](https://pypi.org/project/azure-communication-messages) or above.

From a console prompt, run the following command:

```console
pip install azure-communication-messages
```

For **InteractiveMessages, Reactions and Stickers**, please use below [Beta](https://pypi.org/project/azure-communication-messages/1.2.0b1/) version:

```console
pip install azure-communication-messages==1.2.0b1
```

### Set up the app framework

Create a new file called `messages-quickstart.py` and add the basic program structure.

```console
type nul > messages-quickstart.py   
```

#### Basic program structure

```python
import os

class MessagesQuickstart(object):
    print("Azure Communication Services - Advanced Messages SDK Quickstart")

if __name__ == '__main__':
    messages = MessagesQuickstart()
```


## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Messages SDK for Python.

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
> For more information, see the Azure SDK for Python reference [messages Package](https://learn.microsoft.com/python/api/azure-communication-messages/azure.communication.messages).

## Common configuration

Follow these steps to add required code snippets to the `messages-quickstart.py` python program.

- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).
- [Start sending messages between a business and a WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

  

### Authenticate the client 

Messages sending uses NotificationMessagesClient. NotificationMessagesClient authenticates using your connection string acquired from Azure Communication Services resource in the Azure portal.F

For more information on connection strings, see [access-your-connection-strings-and-service-endpoints](../../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

#### [Connection String](#tab/connection-string)

Get Azure Communication Resource connection string from Azure portal as given in screenshot. On the left, navigate to the `Keys` tab. Copy the `Connection string` field for the primary key. The connection string is in the format `endpoint=https://{your Azure Communication Services resource name}.communication.azure.com/;accesskey={secret key}`.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Primary Key' field in the 'Keys' section.

Set the environment variable `COMMUNICATION_SERVICES_CONNECTION_STRING` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_CONNECTION_STRING "<your connection string>"
```
After you add the environment variable, you might need to restart any running programs that will need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

```python
    # Get a connection string to our Azure Communication Services resource.
    connection_string = os.getenv("COMMUNICATION_SERVICES_CONNECTION_STRING")
    
    def send_template_message(self):
        from azure.communication.messages import NotificationMessagesClient

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
```

#### [Microsoft Entra ID](#tab/aad)

NotificationMessagesClient is also authenticated using Microsoft Entra ID/TokenCredentials. For more information, see [access-Azure-Communication-Resources-using-TokenCredentials](https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python\&preserve-view=true#environment-variables).

The [`azure.identity`](https://github.com/Azure/azure-sdk-for-python/tree/azure-identity_1.15.0/sdk/identity/azure-identity) package provides various credential types that your application can use to authenticate. You can choose from the various options to authenticate the identity client detailed at [Azure Identity - Credential providers](https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python#credential-classes\&preserve-view=true) and [Azure Identity - Authenticate the client](https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python#authenticate-with-defaultazurecredential\&preserve-view=true). This option walks through one way of using the [`DefaultAzureCredential`](https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python#defaultazurecredential\&preserve-view=true).
 
The `DefaultAzureCredential` attempts to authenticate via [`several mechanisms`](https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python#defaultazurecredential\&preserve-view=true) and it might be able to find its authentication credentials if you're signed into Visual Studio or Azure CLI. However, this option walks you through setting up with environment variables.   

To create a `DefaultAzureCredential` object:
1. To set up your service principle app, follow the instructions at [Creating a Microsoft Entra registered Application](../../identity/service-principal.md?pivots=platform-azcli#creating-a-microsoft-entra-registered-application).

1. Set the environment variables `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, and `AZURE_TENANT_ID` using the output of your app's creation.    
    Open a console window and enter the following commands:
    ```console
    setx COMMUNICATION_SERVICES_ENDPOINT_STRING "<https://<resource name>.communication.azure.com>"
    setx AZURE_CLIENT_ID "<your app's appId>"
    setx AZURE_CLIENT_SECRET "<your app's password>"
    setx AZURE_TENANT_ID "<your app's tenant>"
    ```
    After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

1. To use the [`DefaultAzureCredential`](https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python#defaultazurecredential\&preserve-view=true) provider, or other credential providers provided with the Azure SDK, install the `azure.identity` python package and then instantiate client.
    
```python
    # Get a connection string to our Azure Communication Services resource.
    endpoint_string = os.getenv("COMMUNICATION_SERVICES_ENDPOINT_STRING")
    
    def send_template_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.identity import DefaultAzureCredential

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient(endpoint=self.endpoint_string,
                                                    credential=DefaultAzureCredential())
```

#### [AzureKeyCredential](#tab/azurekeycredential)

You can also authenticate with an AzureKeyCredential.

Get the endpoint and key from your Azure Communication Services resource in the Azure portal. On the left, navigate to the `Keys` tab. Copy the `Endpoint` and the `Key` field for the primary key.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Connection string' field in the 'Primary key' section.

Set the environment variable `COMMUNICATION_SERVICES_KEY` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_ENDPOINT_STRING "<https://<resource name>.communication.azure.com>"
setx COMMUNICATION_SERVICES_KEY "<your key>"
```
After you add the environment variable, you might need to restart any running programs that will need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

To instantiate a `NotificationMessagesClient`, add the following code:

```python
    # Get a connection string to our Azure Communication Services resource.
    endpoint_string = os.getenv("COMMUNICATION_SERVICES_ENDPOINT_STRING")
    key = os.getenv("COMMUNICATION_SERVICES_KEY")

    def send_template_message(self):
        from azure.core.credentials import AzureKeyCredential
        from azure.communication.messages import NotificationMessagesClient

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient(endpoint=self.endpoint_string,
                                                    credential=AzureKeyCredential(self.key))
```
---

### Set channel registration ID   

You created the Channel Registration ID GUID during [channel registration](connect-whatsapp-business-account.md). Find it in the portal on the **Channels** tab of your Azure Communication Services resource.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Channels' tab. Attention is placed on the copy action of the 'Channel ID' field.

Assign it to a variable called channelRegistrationId.
```python
    channelRegistrationId = os.getenv("WHATSAPP_CHANNEL_ID_GUID")
```

### Set recipient list

You need to supply an active phone number associated with a WhatsApp account, or a business-scoped user ID (BSUID). This WhatsApp account receives the template, text, and media messages sent in this article.

For this example, you can use your personal phone number.   

The recipient phone number can't be the business phone number (Sender ID) associated with the WhatsApp channel registration. The Sender ID appears as the sender of the text and media messages sent to the recipient.

The phone number must include the country code. For more information about phone number formatting, see WhatsApp documentation for [Phone Number Formats](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers#phone-number-formats).

> **Note:**
> Only one phone number or BSUID is currently supported in the recipient list.

Set the recipient list like this:
```python
    phone_number = os.getenv("RECIPIENT_WHATSAPP_PHONE_NUMBER")
```

Usage example with a phone number:
```python
    # Example only
    to=[self.phone_number],
```

Usage example with a BSUID:
```python
    # Example only
    to=["US.13491208655302741918"],
```

> **Note:**
> Sending messages to BSUIDs will be available starting in June 2026. Until then, use phone numbers as recipients.

For more information about BSUIDs, see [WhatsApp usernames and BSUIDs](../../../concepts/advanced-messaging/whatsapp/whatsapp-username-support-overview.md).

### Start sending messages between a business and a WhatsApp user

Conversations between a WhatsApp Business Account and a WhatsApp user can be initiated in one of two ways:
- The business sends a template message to the WhatsApp user.
- The WhatsApp user sends any message to the business number.

A business can't initiate an interactive conversation. A business can only send an interactive message after receiving a message from the user. The business can only send interactive messages to the user during the active conversation. Once the 24 hour conversation window expires, only the user can restart the interactive conversation. For more information about conversations, see the definition at [WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/pricing#conversations).

To initiate an interactive conversation from your personal WhatsApp account, send a message to your business number (Sender ID).

A WhatsApp conversation viewed on the web showing a user message sent to the WhatsApp Business Account number.

## Code examples

Follow these steps to add required code snippets to the messages-quickstart.py python program.
- [Send a text message to a WhatsApp user](#send-a-text-message-to-a-whatsapp-user).
- [Send an image media message to a WhatsApp user](#send-an-image-media-message-to-a-whatsapp-user).
- [Send a document media message to a WhatsApp user](#send-a-document-media-message-to-a-whatsapp-user).
- [Send an audio media message to a WhatsApp user](#send-an-audio-media-message-to-a-whatsapp-user).
- [Send a video media message to a WhatsApp user](#send-a-video-media-message-to-a-whatsapp-user).

### Send a text message to a WhatsApp user

The Messages SDK enables Contoso to send text WhatsApp messages, when initiated by a WhatsApp user. To send text messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- Message body/text to be sent.

> **Important:**
> To send a text message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, we reply to the WhatsApp user with the text `"Thanks for your feedback.\n From Notification Messaging SDK."`

```python
    def send_text_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( TextNotificationContent)

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        text_options = TextNotificationContent (
            channel_registration_id=self.channelRegistrationId,
            to= [self.phone_number],
            content="Thanks for your feedback.\n From Notification Messaging SDK",
        )
        
        # calling send() with whatsapp message details
        message_responses = messaging_client.send(text_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Text Message with message id {} was successfully sent to {}."
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")
```

To run `send_text_message()`, update the [main method](#basic-program-structure):

```python
    #Calling send_text_message()
    messages.send_text_message()
```

### Send an image media message to a WhatsApp user

The Messages SDK enables Contoso to send image WhatsApp messages to WhatsApp users. To send image embedded messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- MediaUri of the image.

> **Important:**
> To send a text message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

An example of `media_uri` used when sending a media WhatsApp message.

`input_media_uri: str = "https://aka.ms/acsicon1"`

```python
    def send_image_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( ImageNotificationContent)

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        input_media_uri: str = "https://aka.ms/acsicon1"
        image_message_options = ImageNotificationContent(
            channel_registration_id=self.channelRegistrationId,
            to=[self.phone_number],
            media_uri=input_media_uri
        )

        # calling send() with whatsapp image message
        message_responses = messaging_client.send(image_message_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Image containing Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")
```

To run `send_text_message()`, update the [main method](#basic-program-structure):

```python
    # Calling send_image_message()
    messages.send_image_message()
```

### Send a document media message to a WhatsApp user

The Messages SDK enables Contoso to send document WhatsApp messages to WhatsApp users. To send document embedded messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- MediaUri of the document.

> **Important:**
> To send a document message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

An example of `media_uri` used when sending a media WhatsApp message.

`input_media_uri: str = "##DocumentLinkPlaceholder##"`

```python
    def send_document_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( DocumentNotificationContent)

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        input_media_uri: str = "##DocumentLinkPlaceholder##"
        documents_options = DocumentNotificationContent(
            channel_registration_id=self.channelRegistrationId,
            to=[self.phone_number],
            caption="Hello World via Advanced Messaging SDK.This is document message",
            file_name="Product roadmap timeline.pptx",
            media_uri=input_media_uri,
        )

        # calling send() with whatsapp image message
        message_responses = messaging_client.send(documents_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Document containing Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")
```

To run `send_text_message()`, update the [main method](#basic-program-structure):

```python
    # Calling send_image_message()
    messages.send_image_message()
```

### Send an audio media message to a WhatsApp user

The Messages SDK enables Contoso to send image WhatsApp messages to WhatsApp users. To send audio embedded messages:

- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- MediaUri of the audio.

> **Important:**
> To send an audio message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

An example of `media_uri` used when sending a media WhatsApp message.

`input_media_uri: str = "##AudioLinkPlaceholder##"`

```python
    def send_audio_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( AudioNotificationContent)

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        input_media_uri: str = "##AudioLinkPlaceholder##"
        audio_options = AudioNotificationContent(
            channel_registration_id=self.channelRegistrationId,
            to=[self.phone_number],
            media_uri=input_media_uri,
        )

        # calling send() with whatsapp image message
        message_responses = messaging_client.send(audio_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Audio containing Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")
```

To run `send_text_message()`, update the [main method](#basic-program-structure):

```python
    # Calling send_image_message()
    messages.send_image_message()
```

### Send a video media message to a WhatsApp user

The Messages SDK enables Contoso to send video WhatsApp messages to WhatsApp users. To send video embedded messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- MediaUri of the video.

> **Important:**
> To send a video message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

An example of `media_uri` used when sending a media WhatsApp message.

`input_media_uri: str = "##VideoLinkPlaceholder##"`

```python
    def send_video_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( VideoNotificationContent)

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        input_media_uri: str = "##VideoLinkPlaceholder##"
        video_options = VideoNotificationContent(
            channel_registration_id=self.channelRegistrationId,
            to=[self.phone_number],
            media_uri=input_media_uri,
        )

        # calling send() with whatsapp image message
        message_responses = messaging_client.send(image_message_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Video containing Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")
```

To run `send_text_message()`, update the [main method](#basic-program-structure):

```python
    # Calling send_image_message()
    messages.send_image_message()
```

### Run the code

To run the code, make sure you are on the directory where your `messages-quickstart.py` file is located.

```console
python messages-quickstart.py
```

```output
Azure Communication Services - Advanced Messages Quickstart
WhatsApp Templated Message with message id <<GUID>> was successfully sent to <<ToRecipient>>
WhatsApp Text Message with message id <<GUID>> was successfully sent to <<ToRecipient>>
WhatsApp Image containing Message with message id <<GUID>> was successfully sent to <<ToRecipient>>
```

## Full sample code

> **Note:**
> Replace all placeholder variables in the sample code with your values.

```python
import os

class MessagesQuickstart(object):
    print("Azure Communication Services - Advanced Messages SDK Quickstart using connection string.")
    # Advanced Messages SDK implementations goes in this section.
   
    connection_string = os.getenv("COMMUNICATION_SERVICES_CONNECTION_STRING")
    phone_number = os.getenv("RECIPIENT_PHONE_NUMBER")
    channelRegistrationId = os.getenv("WHATSAPP_CHANNEL_ID")

    def send_template_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( TemplateNotificationContent , MessageTemplate )

        # client creation
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        input_template: MessageTemplate = MessageTemplate(
            name="<<TEMPLATE_NAME>>",
            language="<<LANGUAGE>>")
        template_options = TemplateNotificationContent(
            channel_registration_id=self.channelRegistrationId,
            to=[self.phone_number],
            template=input_template
        )

        # calling send() with WhatsApp template details.
        message_responses = messaging_client.send(template_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Templated Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")

    def send_text_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( TextNotificationContent )

        # client creation
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        text_options = TextNotificationContent (
            channel_registration_id=self.channelRegistrationId,
            to= [self.phone_number],
            content="Hello World via ACS Advanced Messaging SDK.",
        )
        
        # calling send() with WhatsApp message details
        message_responses = messaging_client.send(text_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Text Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")

    def send_image_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( ImageNotificationContent)

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        input_media_uri: str = "https://aka.ms/acsicon1"
        image_message_options = ImageNotificationContent(
            channel_registration_id=self.channelRegistrationId,
            to=[self.phone_number],
            media_uri=input_media_uri
        )

        # calling send() with whatsapp image message
        message_responses = messaging_client.send(image_message_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Image containing Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")
    
    def send_document_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( DocumentNotificationContent)

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        input_media_uri: str = "##DocumentLinkPlaceholder##"
        documents_options = DocumentNotificationContent(
            channel_registration_id=self.channelRegistrationId,
            to=[self.phone_number],
            caption="Hello World via Advanced Messaging SDK.This is document message",
            file_name="Product roadmap timeline.pptx",
            media_uri=input_media_uri,
        )

        # calling send() with whatsapp image message
        message_responses = messaging_client.send(documents_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Document containing Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")

    def send_audio_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( AudioNotificationContent)

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        input_media_uri: str = "##AudioLinkPlaceholder##"
        audio_options = AudioNotificationContent(
            channel_registration_id=self.channelRegistrationId,
            to=[self.phone_number],
            media_uri=input_media_uri,
        )

        # calling send() with whatsapp image message
        message_responses = messaging_client.send(audio_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Audio containing Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")

    def send_video_message(self):
        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import ( VideoNotificationContent)

        # Create NotificationMessagesClient Client
        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)
        input_media_uri: str = "##VideoLinkPlaceholder##"
        video_options = VideoNotificationContent(
            channel_registration_id=self.channelRegistrationId,
            to=[self.phone_number],
            media_uri=input_media_uri,
        )

        # calling send() with whatsapp image message
        message_responses = messaging_client.send(image_message_options)
        response = message_responses.receipts[0]
        
        if (response is not None):
            print("WhatsApp Video containing Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))
        else:
            print("Message failed to send")

if __name__ == '__main__':
    messages = MessagesQuickstart()
    messages.send_template_message()
    messages.send_text_message()
    messages.send_image_message()
    messages.send_document_message()
    messages.send_audio_message()
    messages.send_video_message()
```

### Other samples

You can review and download other sample codes on GitHub for [Python Messages SDK](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/messages-quickstart).



## Next steps

- [Handle Advanced Messaging events](handle-advanced-messaging-events.md)
- [Send WhatsApp template messages](send-template-messages.md)
