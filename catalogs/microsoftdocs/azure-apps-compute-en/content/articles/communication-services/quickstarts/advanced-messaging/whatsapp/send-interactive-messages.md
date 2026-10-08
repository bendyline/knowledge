---
title: Send interactive WhatsApp messages
titleSuffix: An Azure Communication Services Advanced Messages article
description: This article describes how to send WhatsApp interactive messages using Azure Communication Services Advanced Messages SDK.
author: shamkh
manager: camilo.ramirez
services: azure-communication-services
ms.author: shamkh
ms.date: 05/01/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: advanced-messaging
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python
---

# Send interactive WhatsApp messages using Advanced Messages


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Azure Communication Services enables you to send and receive WhatsApp messages. In this quickstart, get started integrating your app with Azure Communication Advanced Messages SDK and start sending/receiving WhatsApp interactive messages. Completing this quickstart incurs a small cost of a few USD cents or less in your Azure account.

**Applies to: programming-language-csharp**


## Prerequisites

- [WhatsApp Business Account registered with your Azure Communication Services resource](connect-whatsapp-business-account.md).
- Active WhatsApp phone number to receive messages.
- .NET development environment, such as [Visual Studio](https://visualstudio.microsoft.com/downloads/), [Visual Studio Code](https://code.visualstudio.com/Download), or [.NET CLI](https://dotnet.microsoft.com/download).

## Set up the environment


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

The following classes and interfaces handle some of the major features of the Azure Communication Services Messages SDK for .NET.

| Class Name | Description |
| --- | --- |
| `NotificationMessagesClient` | Connects to your Azure Communication Services resource. It sends the messages. |
| `InteractiveNotificationContent` | Defines the interactive message business can send to user. |
| `InteractiveMessage` | Defines interactive message content. |
| `WhatsAppListActionBindings` | Defines WhatsApp List interactive message properties binding. |
| `WhatsAppButtonActionBindings` | Defines WhatsApp Button interactive message properties binding. |
| `WhatsAppUrlActionBindings` | Defines WhatsApp Url interactive message properties binding. |
| `TextMessageContent` | Defines the text content for Interactive message body, footer, header. |
| `VideoMessageContent` | Defines the video content for Interactive message header. |
| `DocumentMessageContent` | Defines the document content for Interactive message header. |
| `ImageMessageContent` | Defines the image content for Interactive message header. |
| `ActionGroupContent` | Defines the ActionGroup or ListOptions content for Interactive message. |
| `ButtonSetContent` | Defines the Reply Buttons content for Interactive message. |
| `LinkContent` | Defines the Url or Click-To-Action content for Interactive message. |

## Common configuration

Follow these steps to add required code snippets to your .NET program.

- [Authenticate the client](#authenticate-the-client)
- [Set channel registration ID](#set-channel-registration-id)
- [Set recipient list](#set-recipient-list)

  

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

The Messages SDK supports the following WhatsApp Interactive messages:

- [Send an Interactive List options message to a WhatsApp user](#send-an-interactive-list-options-message-to-a-whatsapp-user).
- [Send an Interactive Reply Button message to a WhatsApp user](#send-an-interactive-reply-button-message-to-a-whatsapp-user).
- [Send an Interactive Click-to-action URL-based message to a WhatsApp user](#send-an-interactive-call-to-action-url-based-message-to-a-whatsapp-user).

### Send an Interactive List options message to a WhatsApp user

The Messages SDK enables Contoso to send interactive WhatsApp messages when initiated by WhatsApp users. To send list messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E.164 format](#set-recipient-list).
- List Message can be created using the given properties:

   | Action type | Description |
   | --- | --- |
   | `ActionGroupContent` | This class defines the title of the group content and array of the group. |
   | `ActionGroup` | This class defines the title of the group and array of the group items. |
   | `ActionGroupItem` | This class defines ID, Title, and description of the group Item. |
   | `WhatsAppListActionBindings` | This class defines the `ActionGroupContent` binding with the interactive message. |

> **Important:**
> To send an interactive message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends an interactive shipping options message to the user:

```csharp
using Azure.Communication.Messages;
using Azure.Communication.Messages.Models;

public async Task SendWhatsAppListMessage()
{
    var actionItemsList1 = new List<ActionGroupItem>
    {
        new ActionGroupItem("priority_express", "Priority Mail Express", "Next Day to 2 Days"),
        new ActionGroupItem("priority_mail", "Priority Mail", "1–3 Days")
    };

    var actionItemsList2 = new List<ActionGroupItem>
    {
        new ActionGroupItem("usps_ground_advantage", "USPS Ground Advantage", "2-5 Days"),
        new ActionGroupItem("media_mail", "Media Mail", "2-8 Days")
    };

    var groups = new List<ActionGroup>
    {
        new ActionGroup("I want it ASAP!", actionItemsList1),
        new ActionGroup("I can wait a bit", actionItemsList2)
    };

    var actionGroupContent = new ActionGroupContent("Shipping Options", groups);

    var interactionMessage = new InteractiveMessage(
        new TextMessageContent("Test Body"),
        new WhatsAppListActionBindings(actionGroupContent)
    );
    interactionMessage.Header = new TextMessageContent("Test Header");
    interactionMessage.Footer  = new TextMessageContent("Test Footer");

    var interactiveMessageContent = new InteractiveNotificationContent(
        channelRegistrationId,
        recipientList,
        interactionMessage
    );

    SendMessageResult response = await notificationMessagesClient.SendAsync(interactiveMessageContent);
    Console.WriteLine($"Message with ID {response.Receipts[0].MessageId} was successfully sent.");
}
```

### Send an interactive reply button message to a WhatsApp user

To send reply button messages:

- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E.164 format](#set-recipient-list).

Create reply button messages using the following properties:

   | Action type | Description |
   | --- | --- |
   | `ButtonSetContent` | This class defines button set content for reply button messages. |
   | `ButtonContent` | This class defines ID and title of the reply buttons. |
   | `WhatsAppButtonActionBindings` | This class defines the `ButtonSetContent` binding with the interactive message. |

```csharp
public async Task SendWhatsAppReplyButtonMessage()
{
    var replyButtonActionList = new List<ButtonContent>
    {
        new ButtonContent("cancel", "Cancel"),
        new ButtonContent("agree", "Agree")
    };

    var buttonSet = new ButtonSetContent(replyButtonActionList);

    var interactionMessage = new InteractiveMessage(
        new TextMessageContent("Test Body"),
        new WhatsAppButtonActionBindings(buttonSet)
    );
    interactionMessage.Header = new TextMessageContent("Test Header");
    interactionMessage.Footer  = new TextMessageContent("Test Footer");

    var interactiveMessageContent = new InteractiveNotificationContent(
        channelRegistrationId,
        recipientList,
        interactionMessage
    );

    SendMessageResult response = await notificationMessagesClient.SendAsync(interactiveMessageContent);
    Console.WriteLine($"Message with ID {response.Receipts[0].MessageId} was successfully sent.");
}
```

### Send an interactive call-to-action URL-based message to a WhatsApp user

To send click-to-action or URL-based messages:

- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E.164 format](#set-recipient-list).
- Call-To-Action Messages can be created using the following properties:

| Action type | Description |
| --- | --- |
| `LinkContent` | This class defines URL or link content for a message. |
| `WhatsAppUrlActionBindings` | This class defines the `LinkContent` binding with the interactive message. |

```csharp
public async Task SendWhatsAppClickToActionMessage()
{
    var urlAction = new LinkContent("Test Url", new Uri("https://example.com/audio.mp3"));

    var interactionMessage = new InteractiveMessage(
        new TextMessageContent("Test Body"),
        new WhatsAppUrlActionBindings(urlAction)
    );
    interactionMessage.Header = new TextMessageContent("Test Header");
    interactionMessage.Footer  = new TextMessageContent("Test Footer");

    var interactiveMessageContent = new InteractiveNotificationContent(
        channelRegistrationId,
        recipientList,
        interactionMessage
    );

    SendMessageResult response = await notificationMessagesClient.SendAsync(interactiveMessageContent);
    Console.WriteLine($"WhatsApp CTA Message with ID {response.Receipts[0].MessageId} was successfully sent.");
}
```

### Run the code

To run the code:

#### [Visual Studio](#tab/visual-studio)
1. Build your solution by pressing **Ctrl+Shift+B**.
2. Run the program by pressing **Ctrl+F5**.

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
using System.Threading.Tasks;
using Azure.Communication.Messages;
using Azure.Communication.Messages.Models;

namespace InteractiveMessagesQuickstart
{
    public class Program
    {
        private static Guid channelRegistrationId = new Guid("<Your Channel ID>");
        private static List<string> recipientList = new List<string> { "<Recipient's WhatsApp Phone Number>" };
        private static NotificationMessagesClient notificationMessagesClient = new NotificationMessagesClient("<Your Connection String>");

        public static async Task Main(string[] args)
        {
            Console.WriteLine("Azure Communication Services - Send WhatsApp Interactive Messages");

            var program = new Program();
            await program.SendWhatsAppListMessage();
            await program.SendWhatsAppReplyButtonMessage();
            await program.SendWhatsAppClickToActionMessage();

            Console.WriteLine("All messages sent. Press any key to exit.");
            Console.ReadKey();
        }

        public async Task SendWhatsAppListMessage()
        {
            var actionItemsList1 = new List<ActionGroupItem>
            {
                new ActionGroupItem("priority_express", "Priority Mail Express", "Next Day to 2 Days"),
                new ActionGroupItem("priority_mail", "Priority Mail", "1–3 Days")
            };

            var actionItemsList2 = new List<ActionGroupItem>
            {
                new ActionGroupItem("usps_ground_advantage", "USPS Ground Advantage", "2-5 Days"),
                new ActionGroupItem("media_mail", "Media Mail", "2-8 Days")
            };

            var groups = new List<ActionGroup>
            {
                new ActionGroup("I want it ASAP!", actionItemsList1),
                new ActionGroup("I can wait a bit", actionItemsList2)
            };

            var actionGroupContent = new ActionGroupContent("Shipping Options", groups);

            var interactionMessage = new InteractiveMessage(
                new TextMessageContent("Test Body"),
                new WhatsAppListActionBindings(actionGroupContent)
            );
            interactionMessage.Header = new TextMessageContent("Test Header");
            interactionMessage.Footer  = new TextMessageContent("Test Footer");

            var interactiveMessageContent = new InteractiveNotificationContent(
                channelRegistrationId,
                recipientList,
                interactionMessage
            );

            SendMessageResult response = await notificationMessagesClient.SendAsync(interactiveMessageContent);
            Console.WriteLine($"Message with ID {response.Receipts[0].MessageId} was successfully sent.");
        }

        public async Task SendWhatsAppReplyButtonMessage()
        {
            var replyButtonActionList = new List<ButtonContent>
            {
                new ButtonContent("cancel", "Cancel"),
                new ButtonContent("agree", "Agree")
            };

            var buttonSet = new ButtonSetContent(replyButtonActionList);

            var interactionMessage = new InteractiveMessage(
                new TextMessageContent("Test Body"),
                new WhatsAppButtonActionBindings(buttonSet)
            );
            interactionMessage.Header = new TextMessageContent("Test Header");
            interactionMessage.Footer  = new TextMessageContent("Test Footer");

            var interactiveMessageContent = new InteractiveNotificationContent(
                channelRegistrationId,
                recipientList,
                interactionMessage
            );

            SendMessageResult response = await notificationMessagesClient.SendAsync(interactiveMessageContent);
            Console.WriteLine($"Message with ID {response.Receipts[0].MessageId} was successfully sent.");
        }

        public async Task SendWhatsAppClickToActionMessage()
        {
            var urlAction = new LinkContent("Test Url", new Uri("https://example.com/audio.mp3"));

            var interactionMessage = new InteractiveMessage(
                new TextMessageContent("Test Body"),
                new WhatsAppUrlActionBindings(urlAction)
            );
            interactionMessage.Header = new TextMessageContent("Test Header");
            interactionMessage.Footer  = new TextMessageContent("Test Footer");

            var interactiveMessageContent = new InteractiveNotificationContent(
                channelRegistrationId,
                recipientList,
                interactionMessage
            );

            SendMessageResult response = await notificationMessagesClient.SendAsync(interactiveMessageContent);
            Console.WriteLine($"WhatsApp CTA Message with ID {response.Receipts[0].MessageId} was successfully sent.");
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



## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Messages SDK.

| Class Name | Description |
| --- | --- |
| `NotificationMessagesClient` | Connects to your Azure Communication Services resource. It sends the messages. |
| `InteractiveNotificationContent` | Defines the interactive message business can send to user. |
| `InteractiveMessage` | Defines interactive message content. |
| `WhatsAppListActionBindings` | Defines WhatsApp List interactive message properties binding. |
| `WhatsAppButtonActionBindings` | Defines WhatsApp Button interactive message properties binding. |
| `WhatsAppUrlActionBindings` | Defines WhatsApp Url interactive message properties binding. |
| `TextMessageContent` | Defines the text content for Interactive message body, footer, header. |
| `VideoMessageContent` | Defines the video content for Interactive message header. |
| `DocumentMessageContent` | Defines the document content for Interactive message header. |
| `ImageMessageContent` | Defines the image content for Interactive message header. |
| `ActionGroupContent` | Defines the ActionGroup or ListOptions content for Interactive message. |
| `ButtonSetContent` | Defines the Reply Buttons content for Interactive message. |
| `LinkContent` | Defines the Url or Click-To-Action content for Interactive message. |

> **Note:**
> For more information, see the Azure SDK for Java reference at [com.azure.communication.messages Package](https://learn.microsoft.com/java/api/com.azure.communication.messages).

## Common configuration

Follow these steps to add required code snippets to the main function of your `App.java` file.

- [Start sending messages between a business and a WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).
- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).


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


## Code examples

Follow these steps to add required code snippets to the main function of your `App.java` file.
- [Send an Interactive List options message to a WhatsApp user](#send-an-interactive-reply-button-message-to-a-whatsapp-user).
- [Send an Interactive Reply Button message to a WhatsApp user](#send-an-interactive-reply-button-message-to-a-whatsapp-user).
- [Send an Interactive Click-to-action Url based message to a WhatsApp user](#send-an-interactive-call-to-action-url-based-message-to-a-whatsapp-user).

### Send an interactive list options message to a WhatsApp user

The Messages SDK enables Contoso to send interactive WhatsApp messages, when initiated by a WhatsApp users. To send interactive messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- Interactive message to be sent.

> **Important:**
> To send an interactive message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends an interactive shipping options message to the user.

```java

// Create Express Shipping options group
List<ActionGroupItem> group1 = new ArrayList<>();
group1.add(new ActionGroupItem("priority_express", "Priority Mail Express", "Delivered on same day!"));
group1.add(new ActionGroupItem("priority_mail", "Priority Mail", "Delivered in 1-2 days"));

// Create Normal Shipping options group
List<ActionGroupItem> group2 = new ArrayList<>();
group2.add(new ActionGroupItem("usps_ground_advantage", "USPS Ground Advantage", "Delivered in 2-5 days"));
group2.add(new ActionGroupItem("normal_mail", "Normal Mail", "Delivered in 5-8 days"));

// Add Shipping options
List<ActionGroup> options = new ArrayList<>();
options.add(new ActionGroup("Express Delivery", group1));
options.add(new ActionGroup("Normal Delivery", group2));
ActionGroupContent actionGroupContent = new ActionGroupContent("Shipping Options", options);

// Build interactive message with body, header (optional), footer (optional)
InteractiveMessage interactiveMessage = new InteractiveMessage(
    new TextMessageContent("Which shipping option do you want?"), new WhatsAppListActionBindings(actionGroupContent));
interactiveMessage.setFooter(new TextMessageContent("Logistic Ltd"));
interactiveMessage.setHeader(new TextMessageContent("Shipping Options"));

InteractiveNotificationContent interactiveMessageContent = new InteractiveNotificationContent("<CHANNEL_ID>", recipients, interactiveMessage);

// Send an interactive message
SendMessageResult textMessageResult = notificationClient.send(interactiveMessageContent);

// Process result
for (MessageReceipt messageReceipt : textMessageResult.getReceipts()) {
    System.out.println("Message sent to:" + messageReceipt.getTo() + " and message id:" + messageReceipt.getMessageId());
}
```

### Send an interactive reply button message to a WhatsApp user

The Messages SDK enables Contoso to send interactive WhatsApp messages, when initiated by a WhatsApp users. To send interactive messages:

- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- Interactive message to be sent.

> **Important:**
> To send an interactive message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends an interactive reply button message to the user.

```java
// Assemble interactive reply button
List<ButtonContent> buttonActions =  new ArrayList<>();
buttonActions.add(new ButtonContent("no",  "No"));
buttonActions.add(new ButtonContent("yes",  "Yes"));
ButtonSetContent buttonSet = new ButtonSetContent(buttonActions);
InteractiveMessage interactiveMessage = new InteractiveMessage(new TextMessageContent("Do you want to proceed?"), new WhatsAppButtonActionBindings(buttonSet));

InteractiveNotificationContent interactiveMessageContent = new InteractiveNotificationContent("<CHANNEL_ID>", recipients, interactiveMessage);

// Send an interactive message
SendMessageResult textMessageResult = notificationClient.send(interactiveMessageContent);

// Process result
for (MessageReceipt messageReceipt : textMessageResult.getReceipts()) {
    System.out.println("Message sent to:" + messageReceipt.getTo() + " and message id:" + messageReceipt.getMessageId());
}
```

### Send an interactive call-to-action URL based message to a WhatsApp user

The Messages SDK enables Contoso to send interactive WhatsApp messages, when initiated by a WhatsApp users. To send interactive messages:

- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- Interactive message to be sent.

> **Important:**
> To send an interactive message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends a click to a link message to the user.

```java
LinkContent urlAction = new LinkContent("Find out more", "https://wallpapercave.com/wp/wp2163723.jpg");
InteractiveMessage interactiveMessage = new InteractiveMessage(
    new TextMessageContent("The best Guardian of Galaxy"), new WhatsAppUrlActionBindings(urlAction));
interactiveMessage.setFooter(new TextMessageContent("Intergalactic New Ltd"));

InteractiveNotificationContent interactiveMessageContent = new InteractiveNotificationContent("<CHANNEL_ID>", recipients, interactiveMessage);

// Send an interactive message
SendMessageResult textMessageResult = notificationClient.send(interactiveMessageContent);

// Process result
for (MessageReceipt messageReceipt : textMessageResult.getReceipts()) {
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

Find the finalized code for this sample on GitHub at [Azure Messages client library for Java](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/communication/azure-communication-messages/src/samples/java/com/azure/communication/messages).



**Applies to: programming-language-javascript**


## Prerequisites
- [WhatsApp Business Account registered with your Azure Communication Services resource](connect-whatsapp-business-account.md).
- Active WhatsApp phone number to receive messages.
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


## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Advance Messaging SDK for JavaScript.

| Class Name | Description |
| --- | --- |
| `NotificationMessagesClient` | Connects to your Azure Communication Services resource. It sends the messages. |
| `InteractiveNotificationContent` | Defines the interactive message business can send to user. |
| `InteractiveMessage` | Defines interactive message content. |
| `WhatsAppListActionBindings` | Defines WhatsApp List interactive message properties binding. |
| `WhatsAppButtonActionBindings` | Defines WhatsApp Button interactive message properties binding. |
| `WhatsAppUrlActionBindings` | Defines WhatsApp Url interactive message properties binding. |
| `TextMessageContent` | Defines the text content for Interactive message body, footer, header. |
| `VideoMessageContent` | Defines the video content for Interactive message header. |
| `DocumentMessageContent` | Defines the document content for Interactive message header. |
| `ImageMessageContent` | Defines the image content for Interactive message header. |
| `ActionGroupContent` | Defines the ActionGroup or ListOptions content for Interactive message. |
| `ButtonSetContent` | Defines the Reply Buttons content for Interactive message. |
| `LinkContent` | Defines the Url or Click-To-Action content for Interactive message. |

> **Note:**
> For more information, see the Azure SDK for JavaScript reference [@azure-rest/communication-messages package](https://learn.microsoft.com/javascript/api/@azure-rest/communication-messages)

## Common configuration

Follow these steps to add required code snippets to your `send-messages.js` file.
- [Start sending messages between a business and a WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).
- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).

  

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

## Code examples

Follow these steps to add required code snippets to your `send-messages.js` file.
- [Send an Interactive List options message to a WhatsApp user](#send-an-interactive-reply-button-message-to-a-whatsapp-user).
- [Send an Interactive Reply Button message to a WhatsApp user](#send-an-interactive-reply-button-message-to-a-whatsapp-user).
- [Send an Interactive Click-to-action Url based message to a WhatsApp user](#send-an-interactive-call-to-action-url-based-message-to-a-whatsapp-user)


### Send an Interactive List options message to a WhatsApp user

The Messages SDK enables Contoso to send interactive WhatsApp messages, when initiated by a WhatsApp users. To send interactive messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- Interactive message to be sent.

> **Important:**
> To send an interactive message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends an interactive shipping options message to the user.

```javascript
/**
 * @summary Send an interactive message
 */

const { AzureKeyCredential } = require("@azure/core-auth");
const NotificationClient = require("@azure-rest/communication-messages").default,
  { isUnexpected } = require("@azure-rest/communication-messages");
// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new AzureKeyCredential(process.env.ACS_ACCESS_KEY || "");
  const endpoint = process.env.ACS_URL || "";
  const client = NotificationClient(endpoint, credential);

  const interactiveMessage = {
    body: {
      kind: "text",
      text: "Which shipping option do you want?",
    },
    action: {
      kind: "whatsAppListAction",
      content: {
        kind: "group",
        title: "Shipping Options",
        groups: [
          {
            title: "Express Delivery",
            items: [
              {
                id: "priority_mail_express",
                title: "Priority Mail Express",
                description: "Delivered on same day!",
              },
              {
                id: "priority_mail",
                title: "Priority Mail",
                description: "Delivered in 1-2 days",
              },
            ],
          },
          {
            title: "Normal Delivery",
            items: [
              {
                id: "usps_ground_advantage",
                title: "USPS Ground Advantage",
                description: "Delivered in 2-5 days",
              },
              {
                id: "usps_mail",
                title: "Normal Mail",
                description: "Delivered in 5-8 days",
              },
            ],
          },
        ],
      },
    },
  };

  console.log("Sending message...");
  const result = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
      channelRegistrationId: process.env.CHANNEL_ID || "",
      to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
      kind: "interactive",
      interactiveMessage: interactiveMessage,
    },
  });

  console.log("Response: " + JSON.stringify(result, null, 2));

  if (isUnexpected(result)) {
    throw new Error("Failed to send message");
  }

  const response = result;
  response.body.receipts.forEach((receipt) => {
    console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
  });
}

main().catch((error) => {
  console.error("Encountered an error while sending message: ", error);
  throw error;
});
```

### Send an Interactive Reply Button message to a WhatsApp user

The Messages SDK enables Contoso to send interactive WhatsApp messages, when initiated by a WhatsApp users. To send interactive messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- Interactive message to be sent.

> **Important:**
> To send an interactive message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends a reply button message to the user.

```javascript
/**
 * @summary Send an interactive message
 */

const { AzureKeyCredential } = require("@azure/core-auth");
const NotificationClient = require("@azure-rest/communication-messages").default,
  { isUnexpected } = require("@azure-rest/communication-messages");
// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new AzureKeyCredential(process.env.ACS_ACCESS_KEY || "");
  const endpoint = process.env.ACS_URL || "";
  const client = NotificationClient(endpoint, credential);

  const interactiveMessage = {
    body: {
      kind: "text",
      text: "Do you want to proceed?",
    },
    action: {
      kind: "whatsAppButtonAction",
      content: {
        kind: "buttonSet",
        buttons: [
          {
            id: "yes",
            title: "Yes",
          },
          {
            id: "no",
            title: "No",
          },
        ],
      },
    },
  };

  console.log("Sending message...");
  const result = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
      channelRegistrationId: process.env.CHANNEL_ID || "",
      to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
      kind: "interactive",
      interactiveMessage: interactiveMessage,
    },
  });

  console.log("Response: " + JSON.stringify(result, null, 2));

  if (isUnexpected(result)) {
    throw new Error("Failed to send message");
  }

  const response = result;
  response.body.receipts.forEach((receipt) => {
    console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
  });
}

main().catch((error) => {
  console.error("Encountered an error while sending message: ", error);
  throw error;
});
```

### Send an Interactive Call-To-Action Url based message to a WhatsApp user

The Messages SDK enables Contoso to send interactive WhatsApp messages, when initiated by a WhatsApp users. To send interactive messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- Interactive message to be sent.

> **Important:**
> To send an interactive message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends a click to a link message to the user.

```javascript
/**
 * @summary Send an interactive message
 */

const { AzureKeyCredential } = require("@azure/core-auth");
const NotificationClient = require("@azure-rest/communication-messages").default,
  { isUnexpected } = require("@azure-rest/communication-messages");
// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new AzureKeyCredential(process.env.ACS_ACCESS_KEY || "");
  const endpoint = process.env.ACS_URL || "";
  const client = NotificationClient(endpoint, credential);

  const interactiveMessage = {
    body: {
      kind: "text",
      text: "The best Guardian of Galaxy",
    },
    action: {
      kind: "whatsAppUrlAction",
      content: {
        kind: "url",
        title: "Rocket is the best!",
        url: "https://wallpapercave.com/wp/wp2163723.jpg",
      },
    },
    footer: {
      kind: "text",
      text: "Intergalactic News Ltd",
    },
  };

  console.log("Sending message...");
  const result = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
      channelRegistrationId: process.env.CHANNEL_ID || "",
      to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
      kind: "interactive",
      interactiveMessage: interactiveMessage,
    },
  });

  console.log("Response: " + JSON.stringify(result, null, 2));

  if (isUnexpected(result)) {
    throw new Error("Failed to send message");
  }

  const response = result;
  response.body.receipts.forEach((receipt) => {
    console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
  });
}

main().catch((error) => {
  console.error("Encountered an error while sending message: ", error);
  throw error;
});
```

## Run the code
Use the node command to run the code you added to the send-messages.js file.

```console
node ./send-messages.js
```

## Full sample code

Find the finalized code for this sample on GitHub at [JavaScript Messages SDK](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-messages-rest/samples).


**Applies to: programming-language-python**


## Prerequisites

- [WhatsApp Business Account registered with your Azure Communication Services resource](connect-whatsapp-business-account.md).
- Active WhatsApp phone number to receive messages.
- [Python](https://www.python.org/downloads/) 3.7+ for your operating system.

## Set up the environment


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
| `InteractiveNotificationContent` | Defines the interactive message business can send to user. |
| `InteractiveMessage` | Defines interactive message content. |
| `WhatsAppListActionBindings` | Defines WhatsApp List interactive message properties binding. |
| `WhatsAppButtonActionBindings` | Defines WhatsApp Button interactive message properties binding. |
| `WhatsAppUrlActionBindings` | Defines WhatsApp Url interactive message properties binding. |
| `TextMessageContent` | Defines the text content for Interactive message body, footer, header. |
| `VideoMessageContent` | Defines the video content for Interactive message header. |
| `DocumentMessageContent` | Defines the document content for Interactive message header. |
| `ImageMessageContent` | Defines the image content for Interactive message header. |
| `ActionGroupContent` | Defines the ActionGroup or ListOptions content for Interactive message. |
| `ButtonSetContent` | Defines the Reply Buttons content for Interactive message. |
| `LinkContent` | Defines the Url or Click-To-Action content for Interactive message. |

> **Note:**
> For more information, see the Azure SDK for Python reference [messages Package](https://learn.microsoft.com/python/api/azure-communication-messages/azure.communication.messages).

## Common configuration

Follow these steps to add required code snippets to the messages-quickstart.py python program.

- [Authenticate the client](#authenticate-the-client)
- [Set channel registration ID](#set-channel-registration-id)
- [Set recipient list](#set-recipient-list)

  

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

The Messages SDK supports the following WhatsApp Interactive messages:

- [Send an Interactive List options message to a WhatsApp user](#send-an-interactive-list-options-message-to-a-whatsapp-user).
- [Send an Interactive Reply Button message to a WhatsApp user](#send-an-interactive-reply-button-message-to-a-whatsapp-user).
- [Send an Interactive Click-to-action Url based message to a WhatsApp user](#send-an-interactive-call-to-action-url-based-message-to-a-whatsapp-user).

### Send an Interactive List options message to a WhatsApp user

The Messages SDK enables Contoso to send interactive WhatsApp messages, when initiated by a WhatsApp users. To send text messages:
- [WhatsApp Channel ID](#set-channel-registration-id).
- [Recipient Phone Number in E16 format](#set-recipient-list).
- List Message can be created using the given properties:

   | Action type | Description |
   | --- | --- |
   | `ActionGroupContent` | This class defines title of the group content and array of the group. |
   | `ActionGroup` | This class defines title of the group and array of the group Items. |
   | `ActionGroupItem` | This class defines ID, Title, and description of the group Item. |
   | `WhatsAppListActionBindings` | This class defines the `ActionGroupContent` binding with the interactive message. |

> **Important:**
> To send a text message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends an interactive shipping options message to the user.

```python
    def send_whatsapplist_message(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (
            ActionGroupContent,
            ActionGroup,
            ActionGroupItem,
            InteractiveMessage,
            TextMessageContent,
            WhatsAppListActionBindings,
            InteractiveNotificationContent,
        )

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        action_items_list1 = [
            ActionGroupItem(id="priority_express", title="Priority Mail Express", description="Next Day to 2 Days"),
            ActionGroupItem(id="priority_mail", title="Priority Mail", description="1–3 Days"),
        ]
        action_items_list2 = [
            ActionGroupItem(id="usps_ground_advantage", title="USPS Ground Advantage", description="2-5 Days"),
            ActionGroupItem(id="media_mail", title="Media Mail", description="2-8 Days"),
        ]
        groups = [
            ActionGroup(title="I want it ASAP!", items_property=action_items_list1),
            ActionGroup(title="I can wait a bit", items_property=action_items_list2),
        ]

        action_group_content = ActionGroupContent(title="Shipping Options", groups=groups)

        interactionMessage = InteractiveMessage(
            body=TextMessageContent(text="Test Body"),
            footer=TextMessageContent(text="Test Footer"),
            header=TextMessageContent(text="Test Header"),
            action=WhatsAppListActionBindings(content=action_group_content),
        )
        interactiveMessageContent = InteractiveNotificationContent(
            channel_registration_id=self.channel_id,
            to=[self.phone_number],
            interactive_message=interactionMessage,
        )

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(interactiveMessageContent)
        response = message_responses.receipts[0]
        print("Message with message id {} was successful sent to {}".format(response.message_id, response.to))

```

To run send_text_message(), update the [main method](#basic-program-structure):

```python
    #Calling send_whatsapplist_message()
    messages.send_whatsapplist_message()
```

Screenshot that shows WhatsApp List interactive message from Business to User.

### Send an Interactive Reply Button message to a WhatsApp user

The Messages SDK enables Contoso to send image WhatsApp messages to WhatsApp users. To send image embedded messages:
- [WhatsApp Channel ID](#set-channel-registration-id)
- [Recipient Phone Number in E16 format](#set-recipient-list)
- Reply Button Messages can be created using given properties:

   | Action type | Description |
   | --- | --- |
   | `ButtonSetContent` | This class defines button set content for reply button messages. |
   | `ButtonContent` | This class defines ID and title of the reply buttons. |
   | `WhatsAppButtonActionBindings` | This class defines the `ButtonSetContent` binding with the interactive message. |

> **Important:**
> To send a text message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends a reply button message to the user.

```python
    def send_whatsappreplybutton_message(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (
            ButtonSetContent,
            ButtonContent,
            InteractiveMessage,
            TextMessageContent,
            WhatsAppButtonActionBindings,
            InteractiveNotificationContent,
        )

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        reply_button_action_list = [
            ButtonContent(title="Cancel", id="cancel"),
            ButtonContent(title="Agree", id="agree"),
        ]
        button_set = ButtonSetContent(buttons=reply_button_action_list)
        interactionMessage = InteractiveMessage(
            body=TextMessageContent(text="Test Body"),
            footer=TextMessageContent(text="Test Footer"),
            header=TextMessageContent(text="Test Header"),
            action=WhatsAppButtonActionBindings(content=button_set),
        )
        interactiveMessageContent = InteractiveNotificationContent(
            channel_registration_id=self.channel_id,
            to=[self.phone_number],
            interactive_message=interactionMessage,
        )

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(interactiveMessageContent)
        response = message_responses.receipts[0]
        print("Message with message id {} was successful sent to {}".format(response.message_id, response.to))
```

To run `send_whatsappreplybutton_message()`, update the [main method](#basic-program-structure):

```python
    # Calling send_imagesend_whatsappreplybutton_message_message()
    messages.send_whatsappreplybutton_message()
```

Screenshot that shows WhatsApp Reply Button interactive message from Business to User.

### Send an Interactive Call-To-Action Url based message to a WhatsApp user

The Messages SDK enables Contoso to send image WhatsApp messages to WhatsApp users. To send image embedded messages:
- [WhatsApp Channel ID](#set-channel-registration-id)
- [Recipient Phone Number in E16 format](#set-recipient-list)
- Call-To-Action or Link content can be created using given properties:

| Action type | Description |
| --- | --- |
| `LinkContent` | This class defines url or link content for message. |
| `WhatsAppUrlActionBindings` | This class defines the `LinkContent` binding with the interactive message. |

> **Important:**
> To send a document message to a WhatsApp user, the WhatsApp user must first send a message to the WhatsApp Business Account. For more information, see [Start sending messages between business and WhatsApp user](#start-sending-messages-between-a-business-and-a-whatsapp-user).

In this example, the business sends a click to a link message to the user.

```python
    def send_whatapp_click_to_action_message(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (
            LinkContent,
            InteractiveMessage,
            TextMessageContent,
            WhatsAppUrlActionBindings,
            InteractiveNotificationContent,
        )

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        urlAction = LinkContent(
            title="Test Url",
            url="https://example.com/audio.mp3",
        )
        interactionMessage = InteractiveMessage(
            body=TextMessageContent(text="Test Body"),
            footer=TextMessageContent(text="Test Footer"),
            header=TextMessageContent(text="Test Header"),
            action=WhatsAppUrlActionBindings(content=urlAction),
        )
        interactiveMessageContent = InteractiveNotificationContent(
            channel_registration_id=self.channel_id,
            to=[self.phone_number],
            interactive_message=interactionMessage,
        )

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(interactiveMessageContent)
        response = message_responses.receipts[0]
        print("WhatsApp CTA containing Message with message ID {} was successfully sent to {}".format(response.message_id, response.to))
```

To run `send_whatapp_click_to_action_message()`, update the [main method](#basic-program-structure):

```python
    # Calling send_whatapp_click_to_action_message()
    messages.send_whatapp_click_to_action_message()
```

Screenshot that shows WhatsApp Click-to-action interactive message from Business to User.

### Run the code

To run the code, open the directory where your `messages-quickstart.py` file is located.

```console
python interactive-messages-quickstart.py
```

```output
Azure Communication Services - Advanced Messages Quickstart
WhatsApp List Message with message ID <<GUID>> was successfully sent to <<ToRecipient>>
WhatsApp Button Message with message ID <<GUID>> was successfully sent to <<ToRecipient>>
WhatsApp CTA containing Message with message ID <<GUID>> was successfully sent to <<ToRecipient>>
```

## Full sample code

> **Note:**
> Replace all placeholder variables in the code with your values.

```python
import os

class MessagesQuickstart(object):
    print("Azure Communication Services - Advanced Messages SDK Quickstart using connection string.")
    # Advanced Messages SDK implementations goes in this section.
   
    connection_string = os.getenv("COMMUNICATION_SERVICES_CONNECTION_STRING")
    phone_number = os.getenv("RECIPIENT_PHONE_NUMBER")
    channelRegistrationId = os.getenv("WHATSAPP_CHANNEL_ID")

    def send_whatsapplist_message(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (
            ActionGroupContent,
            ActionGroup,
            ActionGroupItem,
            InteractiveMessage,
            TextMessageContent,
            WhatsAppListActionBindings,
            InteractiveNotificationContent,
        )

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        action_items_list1 = [
            ActionGroupItem(id="priority_express", title="Priority Mail Express", description="Next Day to 2 Days"),
            ActionGroupItem(id="priority_mail", title="Priority Mail", description="1–3 Days"),
        ]
        action_items_list2 = [
            ActionGroupItem(id="usps_ground_advantage", title="USPS Ground Advantage", description="2-5 Days"),
            ActionGroupItem(id="media_mail", title="Media Mail", description="2-8 Days"),
        ]
        groups = [
            ActionGroup(title="I want it ASAP!", items_property=action_items_list1),
            ActionGroup(title="I can wait a bit", items_property=action_items_list2),
        ]

        action_group_content = ActionGroupContent(title="Shipping Options", groups=groups)

        interactionMessage = InteractiveMessage(
            body=TextMessageContent(text="Test Body"),
            footer=TextMessageContent(text="Test Footer"),
            header=TextMessageContent(text="Test Header"),
            action=WhatsAppListActionBindings(content=action_group_content),
        )
        interactiveMessageContent = InteractiveNotificationContent(
            channel_registration_id=self.channel_id,
            to=[self.phone_number],
            interactive_message=interactionMessage,
        )

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(interactiveMessageContent)
        response = message_responses.receipts[0]
        print("WhatsApp List Message with message id {} was successful sent to {}".format(response.message_id, response.to))

    def send_whatsappreplybutton_message(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (
            ButtonSetContent,
            ButtonContent,
            InteractiveMessage,
            TextMessageContent,
            WhatsAppButtonActionBindings,
            InteractiveNotificationContent,
        )

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        reply_button_action_list = [
            ButtonContent(title="Cancel", id="cancel"),
            ButtonContent(title="Agree", id="agree"),
        ]
        button_set = ButtonSetContent(buttons=reply_button_action_list)
        interactionMessage = InteractiveMessage(
            body=TextMessageContent(text="Test Body"),
            footer=TextMessageContent(text="Test Footer"),
            header=TextMessageContent(text="Test Header"),
            action=WhatsAppButtonActionBindings(content=button_set),
        )
        interactiveMessageContent = InteractiveNotificationContent(
            channel_registration_id=self.channel_id,
            to=[self.phone_number],
            interactive_message=interactionMessage,
        )

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(interactiveMessageContent)
        response = message_responses.receipts[0]
        print("WhatsApp Button Message with message id {} was successful sent to {}".format(response.message_id, response.to))

    def send_whatapp_click_to_action_message(self):

            from azure.communication.messages import NotificationMessagesClient
            from azure.communication.messages.models import (
                LinkContent,
                InteractiveMessage,
                TextMessageContent,
                WhatsAppUrlActionBindings,
                InteractiveNotificationContent,
            )

            messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

            urlAction = LinkContent(
                title="Test Url",
                url="https://example.com/audio.mp3",
            )
            interactionMessage = InteractiveMessage(
                body=TextMessageContent(text="Test Body"),
                footer=TextMessageContent(text="Test Footer"),
                header=TextMessageContent(text="Test Header"),
                action=WhatsAppUrlActionBindings(content=urlAction),
            )
            interactiveMessageContent = InteractiveNotificationContent(
                channel_registration_id=self.channel_id,
                to=[self.phone_number],
                interactive_message=interactionMessage,
            )

            # calling send() with whatsapp message details
            message_responses = messaging_client.send(interactiveMessageContent)
            response = message_responses.receipts[0]
            print("WhatsApp CTA containing Message with message id {} was successful sent to {}".format(response.message_id, response.to))


if __name__ == '__main__':
    messages = MessagesQuickstart()
    messages.send_whatsapplist_message()
    messages.send_whatsappreplybutton_message()
    messages.send_whatapp_click_to_action_message()
```

### Other samples

You can review and download other sample codes from GitHub [Python Messages SDK](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/messages-quickstart).



## Next steps

For more information, see:

- [Handle Advanced Messaging events](handle-advanced-messaging-events.md).
- [Send WhatsApp template messages](send-template-messages.md).
- [Send WhatsApp media messages](get-started.md).
