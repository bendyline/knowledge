---
title: Send WhatsApp template messages using Advanced Messages
titleSuffix: An Azure Communication Services Advanced Messaging article
description: This article describes how to send WhatsApp template messages with Advanced Messaging.
author: Shamkh
manager: camilo.ramirez
services: azure-communication-services
ms.author: shamkh
ms.date: 01/15/2025
ms.topic: how-to
ms.service: azure-communication-services
ms.subservice: advanced-messaging
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python
---

# Send WhatsApp template messages using Advanced Messages


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to send WhatsApp template messages using Advanced Communication Messages SDK.

**Applies to: programming-language-csharp**


## Prerequisites

- [Register WhatsApp Business Account with your Azure Communication Services resource](connect-whatsapp-business-account.md).
- [Create WhatsApp template message](#create-and-manage-whatsapp-template-message).
- Active WhatsApp phone number to receive messages.

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Messages SDK for .NET.

| Class Name | Description |
| --- | --- |
| `NotificationMessagesClient` | Connects to your Azure Communication Services resource. It sends the messages. |
| `MessageTemplate` | Defines which template you use and the content of the template properties for your message. |
| `TemplateNotificationContent` | Defines the "who" and the "what" of the template message you intend to send. |

> **Note:**
> For more information, see the Azure SDK for .NET reference [Azure.Communication.Messages Namespace](https://learn.microsoft.com/dotnet/api/azure.communication.messages).

### Supported WhatsApp template types

| Template type | Description |
| --- | --- |
| Text-based message templates | WhatsApp message templates are specific message formats with or without parameters. |
| Media-based message templates | WhatsApp message templates with media parameters for header components. |
| Interactive message templates | Interactive message templates expand the content you can send recipients, by  including interactive buttons using the components object. Both Call-to-Action and Quick Reply are supported. |
| Location-based message templates | WhatsApp message templates with location parameters in terms Longitude and Latitude for header components. |

## Common configuration

Follow these steps to add the necessary code snippets to the Main function of your `Program.cs` file.
- [Create and manage WhatsApp template message](#create-and-manage-whatsapp-template-message).
- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).

### Create and manage WhatsApp template message

WhatsApp message templates are specific message formats that businesses use to send out notifications or customer care messages to people that opted in to notifications. Messages can include appointment reminders, shipping information, issue resolution, or payment updates. **Before start using Advanced messaging SDK to send templated messages, user needs to create required templates in the WhatsApp Business Platform**.

For more information about WhatsApp requirements for templates, see the WhatsApp Business Platform API references:
- [Create and Manage Templates](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/).
- [View Template Components](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components).
- [Send Template Messages](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview).
- Businesses must also adhere to [opt-in requirements](https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in) before sending messages to WhatsApp users.

  

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


##  Code examples

Follow these steps to add required code snippets to the Main function of your `Program.cs` file.
- [List WhatsApp templates](#list-whatsapp-templates).
- [Send Template message with no parameters](#send-template-message-with-no-parameters).
- [Send Template message with text parameters in the body](#send-template-message-with-text-parameters-in-the-body).
- [Send Template message with media parameter in the header](#send-template-message-with-media-parameter-in-the-header).
- [Send Template message with location in the header](#send-template-message-with-location-in-the-header).
- [Send Template message with quick reply buttons](#send-template-message-with-quick-reply-buttons).
- [Send Template message with call to action buttons with dynamic link](#send-template-message-with-call-to-action-buttons-with-dynamic-link).
- [Send Template message with call to action buttons with static link](#send-template-message-with-call-to-action-buttons-with-static-link).
- [Send Authentication Template message](#send-authentication-template-message).

### List WhatsApp templates

List of templates can be viewed in Azure portal or In WhatsApp Manager or Using SDK. All options are listed as follows:

You can view your templates in the Azure portal by going to your Azure Communication Service resource > **Advanced Messaging** > **Templates**.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the Advanced Messaging > Templates tab.

Select a template to view the details.

The `content` field of the template details can include parameter bindings. The parameter bindings can be denoted as:
- A `format` field with a value such as `IMAGE`.
- Double brackets surrounding a number, such as `{{1}}`. The number, indexed started at 1, indicates the order in which the binding values must be supplied to create the message template.
- Double brackets surrounding a name, such as `{{movie_name}}`. The named parameters allow developers to reference parameters by name instead of position.
  > **Important:**
  > When using named parameters, you must ensure that the name you use when sending the message **exactly matches** the name defined in the template you created in the Meta WhatsApp Manager.

Screenshot that shows template details.

Alternatively, you can view and edit all of your WhatsApp Business Account templates in the [WhatsApp Manager](https://business.facebook.com/wa/manage/home/) > Account tools > [Message templates](https://business.facebook.com/wa/manage/message-templates/).

To list out your templates programmatically, you can fetch all templates for your channel ID as follows:

```csharp
MessageTemplateClient messageTemplateClient = new MessageTemplateClient(connectionString);
Pageable<MessageTemplateItem> templates = messageTemplateClient.GetTemplates(channelRegistrationId);
``````


### Send template message with no parameters

If the template doesn't require parameters, you don't need to supply any values or bindings when creating the `MessageTemplate`.

```csharp
var messageTemplate = new MessageTemplate(templateName, templateLanguage); 
```

#### Example

The `sample_template` takes no parameters.

Screenshot that shows template details for template named sample_template.

Assemble the `MessageTemplate` by referencing the target template name and language.

```csharp
string templateName = "sample_template"; 
string templateLanguage = "en_us"; 

var sampleTemplate = new MessageTemplate(templateName, templateLanguage); 
```

### Send Template message with text parameters in the body

Use `MessageTemplateText` to define parameters in the body denoted with double brackets surrounding a number, such as `{{1}}`. The number, index started at 1, indicates the order in which the binding values must be supplied to create the message template. Including parameters not in the template is invalid.

Template definition with two parameters:
```json
{
  "type": "BODY",
  "text": "Message with two parameters: {{1}} and {{2}}"
}
```

#### Examples

`sample_shipping_confirmation` template:

Screenshot that shows template details for template named sample_shipping_confirmation.

In this sample, the body of the template has one parameter:

```json
{
  "type": "BODY",
  "text": "Your package has been shipped. It will be delivered in {{1}} business days."
},
```

Parameters are defined with the `MessageTemplateValue` values and `MessageTemplateWhatsAppBindings` bindings. Use the values and bindings to assemble the `MessageTemplate`.

```csharp
string templateName = "sample_shipping_confirmation"; 
string templateLanguage = "en_us"; 

var threeDays = new MessageTemplateText("threeDays", "3");

WhatsAppMessageTemplateBindings bindings = new();
bindings.Body.Add(new(threeDays.Name));

MessageTemplate shippingConfirmationTemplate  = new(templateName, templateLanguage);
shippingConfirmationTemplate.Bindings = bindings;
shippingConfirmationTemplate.Values.Add(threeDays);
```

### Send Template message with media parameter in the header

Use `MessageTemplateImage`, `MessageTemplateVideo`, or `MessageTemplateDocument` to define the media parameter in a header.

Template definition with image media parameter in header:

```json
{
  "type": "HEADER",
  "format": "IMAGE"
},
```

The `format` can have different media types supported by WhatsApp. In the .NET SDK, each media type uses a corresponding MessageTemplateValue type.

| Format | MessageTemplateValue Type | File Type |
| --- | --- | --- |
| `IMAGE` | `MessageTemplateImage` | png, jpg |
| `VIDEO` | `MessageTemplateVideo` | mp4 |
| `DOCUMENT` | `MessageTemplateDocument` | pdf |

For more information on supported media types and size limits, see [WhatsApp's documentation for message media](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types). 

Message template assembly for image media:

```csharp
var url = new Uri("< Your media URL >");

var media = new MessageTemplateImage("image", url);
WhatsAppMessageTemplateBindings bindings = new();
bindings.Header.Add(new(media.Name));

var messageTemplate = new MessageTemplate(templateName, templateLanguage);
template.Bindings = bindings;
template.Values.Add(media);
```

#### Examples

`sample_movie_ticket_confirmation` template:

Screenshot that shows template details for template named sample_movie_ticket_confirmation.

In this sample, the header of the template requires an image:

```
{
  "type": "HEADER",
  "format": "IMAGE"
},
```

The body of the template requires four text parameters:

```json
{
  "type": "BODY",
  "text": "Your ticket for *{{1}}*\n*Time* - {{2}}\n*Venue* - {{3}}\n*Seats* - {{4}}"
},
```

Create one `MessageTemplateImage` and four `MessageTemplateText` variables. Then, assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content.

```csharp
string templateName = "sample_movie_ticket_confirmation"; 
string templateLanguage = "en_us"; 
var imageUrl = new Uri("https://aka.ms/acsicon1");

var image = new MessageTemplateImage("image", imageUrl);
var title = new MessageTemplateText("title", "Contoso");
var time = new MessageTemplateText("time", "July 1st, 2023 12:30PM");
var venue = new MessageTemplateText("venue", "Southridge Video");
var seats = new MessageTemplateText("seats", "Seat 1A");

WhatsAppMessageTemplateBindings bindings = new();
bindings.Header.Add(new(image.Name));
bindings.Body.Add(new(title.Name));
bindings.Body.Add(new(time.Name));
bindings.Body.Add(new(venue.Name));
bindings.Body.Add(new(seats.Name));

MessageTemplate movieTicketConfirmationTemplate = new(templateName, templateLanguage);
movieTicketConfirmationTemplate.Values.Add(image);
movieTicketConfirmationTemplate.Values.Add(title);
movieTicketConfirmationTemplate.Values.Add(time);
movieTicketConfirmationTemplate.Values.Add(venue);
movieTicketConfirmationTemplate.Values.Add(seats);
movieTicketConfirmationTemplate.Bindings = bindings;
```

#### More Examples

- VIDEO: [Use sample template sample_happy_hour_announcement](#use-sample-template-sample_happy_hour_announcement)
- DOCUMENT: [Use sample template sample_flight_confirmation](#use-sample-template-sample_flight_confirmation)

### Send template message with location in the header

Use `MessageTemplateLocation` to define the location parameter in a header.

Template definition for header component requiring location as:

```json
{
  "type": "header",
  "parameters": [
    {
      "type": "location",
      "location": {
        "latitude": "<LATITUDE>",
        "longitude": "<LONGITUDE>",
        "name": "<NAME>",
        "address": "<ADDRESS>"
      }
    }
  ]
}
```

The `format` can require different media types. In the .NET SDK, each media type uses a corresponding MessageTemplateValue type.

| Properties | Description | Type |
| --- | --- | --- |
| `ADDRESS` | Address that appears after the `NAME` value, below the generic map at the top of the message. | string |
| `LATITUDE` | Location latitude. | double |
| `LONGITUDE` | Location longitude. | double |
| `LOCATIONNAME` | Text that appears immediately below the generic map at the top of the message. | string |

For more information about location based templates, see [WhatsApp's documentation for message media](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview). 

#### Example

`sample_movie_location` template:

Screenshot that shows template details for template named sample_location_template.

Location based Message template assembly:

```csharp
 var location = new MessageTemplateLocation("location");
 location.LocationName = "Pablo Morales";
 location.Address = "1 Hacker Way, Menlo Park, CA 94025";
 location.Position = new Azure.Core.GeoJson.GeoPosition(longitude: 122.148981, latitude: 37.483307);

 WhatsAppMessageTemplateBindings location_bindings = new();
 location_bindings.Header.Add(new(location.Name));

 var messageTemplateWithLocation = new MessageTemplate(templateNameWithLocation, templateLanguage);
 messageTemplateWithLocation.Values.Add(location);
 messageTemplateWithLocation.Bindings = location_bindings;
```

### Send template message with quick reply buttons

Use `MessageTemplateQuickAction` to define the payload for quick reply buttons and `MessageTemplateQuickAction` objects have the following three attributes. 

| Properties | Description | Type |
| --- | --- | --- |
| Name | The `name` used to look up the value in `MessageTemplateWhatsAppBindings`. | string |
| Text | The optional quick action `text`. | string |
| Payload | The `payload` assigned to a button available in a message reply if the user selects the button. | string |
 
Template definition with quick reply buttons:

```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "QUICK_REPLY",
      "text": "Yes"
    },
    {
      "type": "QUICK_REPLY",
      "text": "No"
    }
  ]
}
```

The order that the buttons appear in the template definition must match the order in which the buttons are defined when creating the bindings with `MessageTemplateWhatsAppBindings`.

For more information about the payload in quick reply responses from the user, see WhatsApp documentation for [Received Callback from a Quick Reply Button](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#received-callback-from-a-quick-reply-button).

#### Example

`sample_issue_resolution` template:

Screenshot that shows template details for template named sample_issue_resolution.

The body of the template requires one text parameter:

```json
{
  "type": "BODY",
  "text": "Hi {{1}}, were we able to solve the issue that you were facing?"
},
```

The template includes two prefilled reply buttons, `Yes` and `No`.

```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "QUICK_REPLY",
      "text": "Yes"
    },
    {
      "type": "QUICK_REPLY",
      "text": "No"
    }
  ]
}
```

Create one `MessageTemplateText` and two `MessageTemplateQuickAction` variables. Then assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content. The order also matters when defining your bindings' buttons.

```csharp
string templateName = "sample_issue_resolution";
string templateLanguage = "en_us";

var name = new MessageTemplateText(name: "name", text: "Kat");
var yes = new MessageTemplateQuickAction(name: "Yes"){ Payload =  "Kat said yes" };
var no = new MessageTemplateQuickAction(name: "No") { Payload = "Kat said no" };

WhatsAppMessageTemplateBindings bindings = new();
bindings.Body.Add(new(name.Name));
bindings.Buttons.Add(new(WhatsAppMessageButtonSubType.QuickReply.ToString(), yes.Name));
bindings.Buttons.Add(new(WhatsAppMessageButtonSubType.QuickReply.ToString(), no.Name));

MessageTemplate issueResolutionTemplate = new(templateName, templateLanguage);
issueResolutionTemplate.Values.Add(name);
issueResolutionTemplate.Values.Add(yes);
issueResolutionTemplate.Values.Add(no);
issueResolutionTemplate.Bindings = bindings;
```

### Send Template message with call to action buttons with dynamic link
Use `MessageTemplateQuickAction` to define the URL suffix for call to action buttons and `MessageTemplateQuickAction` object have the following two attributes.

| Properties | Description | Type |
| --- | --- | --- |
| Name | The `name` is used to look up the value in `MessageTemplateWhatsAppBindings`. | string |
| Text | The  `text` that is appended to the URL. | string |

Template definition buttons:
```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "URL",
      "text": "Take Survey",
      "url": "https://www.example.com/{{1}}"
    }
  ]
}
```

The order that the buttons appear in the template definition must match the order in which the buttons are defined when creating the bindings with `MessageTemplateWhatsAppBindings`.

#### Example

`sample_purchase_feedback` template:

This sample template adds a button with a dynamic URL link to the message. It also uses an image in the header and a text parameter in the body.

Screen capture of the WhatsApp manager Buttons editor Call to action panel that shows the URL Type button you can use to choose between Static and Dynamic.

In this sample, the header of the template requires an image:

```json
{
  "type": "HEADER",
  "format": "IMAGE"
},
```

The body of the template requires one text parameter:

```json
{
  "type": "BODY",
  "text": "Thank you for purchasing {{1}}! We value your feedback and would like to learn more about your experience."
},
```

The template includes a dynamic URL button with one parameter:

```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "URL",
      "text": "Take Survey",
      "url": "https://www.example.com/{{1}}"
    }
  ]
}
```

Create one `MessageTemplateImage`, one `MessageTemplateText`, and one `MessageTemplateQuickAction` variable. Then assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content. The order also matters when defining your bindings' buttons.

```csharp
string templateName = "sample_purchase_feedback";
string templateLanguage = "en_us";
var imageUrl = new Uri("https://aka.ms/acsicon1");

var image = new MessageTemplateImage(name: "image", uri: imageUrl);
var product = new MessageTemplateText(name: "product", text: "coffee");
var urlSuffix = new MessageTemplateQuickAction(name: "text") { Text = "survey-code" };

WhatsAppMessageTemplateBindings bindings = new();
bindings.Header.Add(new(image.Name));
bindings.Body.Add(new(product.Name));
bindings.Buttons.Add(new(WhatsAppMessageButtonSubType.Url.ToString(), urlSuffix.Name));

MessageTemplate purchaseFeedbackTemplate = new("sample_purchase_feedback", "en_us");
purchaseFeedbackTemplate.Values.Add(image);
purchaseFeedbackTemplate.Values.Add(product);
purchaseFeedbackTemplate.Values.Add(urlSuffix);
purchaseFeedbackTemplate.Bindings = bindings;
```

### Send Template message with call to action buttons with static link

For static links, you don't need to include `MessageTemplateQuickAction` model because the WhatsApp template has a static `CallToAction` link with no input required from the user.

Template definition buttons:
```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "URL",
      "text": "Take Survey",
      "url": "https://www.example.com/{{1}}"
    }
  ]
}
```

#### Example

`purchase_feedback_static` template:

This sample template adds a button with a static URL link to the message. It also uses an image in the header and a text parameter in the body.

Screen capture that shows details for the purchase-feedback-static-template.

In this sample, the header of the template requires an image:

```json
{
  "type": "HEADER",
  "format": "IMAGE"
},
```

The body of the template requires one text parameter:

```json
{
  "type": "BODY",
  "text": "Hello {{1}}, \nHope you are great day!.\n Please click on given link to explore about our program.."
},
```

The template includes a dynamic URL button with one parameter:

```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "URL",
      "text": "Take Survey",
      "url": "https://www.example.com/"
    }
  ]
}
```

Create one `MessageTemplateImage`, one `MessageTemplateText`. Then assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content. The order also matters when defining your bindings' buttons.

```csharp
// Send sample template sample_template
string templateNameWithcta = "purchase_feedback_static";
var bodyParam1 = new MessageTemplateText(name: "customer", text: "Joe");
var image = new MessageTemplateImage("image", new Uri("https://aka.ms/acsicon1"));

WhatsAppMessageTemplateBindings cta_bindings = new();
cta_bindings.Body.Add(new(bodyParam1.Name));
cta_bindings.Header.Add(new(image.Name));

var messageTemplateWithcta = new MessageTemplate(templateNameWithcta, templateLanguage);
messageTemplateWithcta.Values.Add(bodyParam1);
messageTemplateWithcta.Values.Add(image);
messageTemplateWithcta.Bindings = cta_bindings;

TemplateNotificationContent templateContent4 =
    new TemplateNotificationContent(channelRegistrationId, recipientList, messageTemplateWithcta);
Response<SendMessageResult> sendTemplateMessageResult4 =
    notificationMessagesClient.Send(templateContent4);
```

### Send Authentication Template message
This sample template sends authentication template message with one-time password buttons. For more information, see the Facebook Auth Template API article [Sending Authentication Templates](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview/auth-otp-template-messages).

#### Example

`auth_sample_template` template in the Azure portal:

Screen capture that shows details for the authentication-template.

The template json looks like this:

```json
[
  {
    "type": "BODY",
    "text": "*{{1}}* is your verification code.",
    "add_security_recommendation": false,
    "example": {
      "body_text": [
        [
          "123456"
        ]
      ]
    }
  },
  {
    "type": "BUTTONS",
    "buttons": [
      {
        "type": "URL",
        "text": "Copy code",
        "url": "https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp{{1}}",
        "example": [
          "https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp123456"
        ]
      }
    ]
  }
]
```

Create one `MessageTemplateText`, one `MessageTemplateQuickAction` params. Then assemble your list of params values and your `WhatsAppMessageTemplateBindingsButton` by providing the parameters in the order that the parameters appear in the template content. The order also matters when defining your bindings' buttons.

```csharp
  // Send auth sample template message
  string templateNameWithauth = "auth_sample_template";
  string oneTimePassword = "3516517";
  var messageTemplateWithAuth = new MessageTemplate(templateNameWithauth, templateLanguage);
  WhatsAppMessageTemplateBindings auth_bindings = new();
  var bodyParam2 = new MessageTemplateText(name: "code", text: oneTimePassword);
  var uri_to_copy = new MessageTemplateQuickAction("url") { Text = oneTimePassword };

  auth_bindings.Body.Add(new(bodyParam2.Name));
  auth_bindings.Buttons.Add(new WhatsAppMessageTemplateBindingsButton(WhatsAppMessageButtonSubType.Url.ToString(), uri_to_copy.Name));
  messageTemplateWithAuth.Values.Add(bodyParam2);
  messageTemplateWithAuth.Values.Add(uri_to_copy);
  messageTemplateWithAuth.Bindings = auth_bindings;

  TemplateNotificationContent templateContent5 =
      new TemplateNotificationContent(channelRegistrationId, recipientList, messageTemplateWithAuth);
  Response<SendMessageResult> sendTemplateMessageResult5 =
      notificationMessagesClient.Send(templateContent5);
```

## Run the code

Build and run your program.  

To send a text or media message to a WhatsApp user, there must be an active conversation between the WhatsApp Business Account and the WhatsApp user.

If you don't have an active conversation, for the purposes of this example you can add a wait between sending the template message and sending the text message. This added delay gives you enough time to reply to the business on the user's WhatsApp account. For reference, the given example prompts for manual user input before sending the next message. For more information, see the full example at [Sample code](#full-code-example). If successful, you receive three messages on the user's WhatsApp account.

### [.NET CLI](#tab/dotnet-cli)

Build and run your program.
```console
dotnet build
dotnet run
```

### [Visual Studio](#tab/visual-studio)

1. To compile your code, press **Ctrl**+**F7**.
1. To run the program without debugging, press **Ctrl**+**F5**.

### [Visual Studio Code](#tab/vs-code)

Build and run your program using the following commands in the Visual Studio Code Terminal (**View** > **Terminal**).

```console
dotnet build
dotnet run
```
---

## Full code example


```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Azure;
using Azure.Communication.Messages;
using Azure.Communication.Messages.Models.Channels;

namespace SendTemplateMessages
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("Azure Communication Services - Send WhatsApp Template Messages\n");

            string connectionString = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING");

            NotificationMessagesClient notificationMessagesClient = new NotificationMessagesClient(connectionString);

            var channelRegistrationId = new Guid("<Your Channel ID>");
            var recipientList = new List<string> { "<Recipient's WhatsApp Phone Number>" };

            // List out available templates for a channel ID
            MessageTemplateClient messageTemplateClient = new MessageTemplateClient(connectionString);
            Pageable<MessageTemplateItem> templates = messageTemplateClient.GetTemplates(channelRegistrationId);
            foreach (WhatsAppMessageTemplateItem template in templates)
            {
                Console.WriteLine("Name: {0}\tLanguage: {1}\tStatus: {2}\tContent: {3}\n",
                    template.Name, template.Language, template.Status, template.Content);
            }

            // Send Sample Template sample_template
            MessageTemplate sampleTemplate = AssembleSampleTemplate();
            var sampleTemplateContent = new TemplateNotificationContent(channelRegistrationId, recipientList, sampleTemplate);
            var result = await notificationMessagesClient.SendAsync(sampleTemplateContent);
            PrintResponse(result);
           
            // Send sample template sample_shipping_confirmation
            MessageTemplate shippingConfirmationTemplate = AssembleSampleShippingConfirmation();
            var shippingConfirmationTemplateContent = new TemplateNotificationContent(channelRegistrationId, recipientList, shippingConfirmationTemplate);
            result = await notificationMessagesClient.SendAsync(shippingConfirmationTemplateContent);
            PrintResponse(result);

            // Send sample template sample_movie_ticket_confirmation
            MessageTemplate movieTicketConfirmationTemplate = AssembleSampleMovieTicketConfirmation();
            var movieTicketConfirmationTemplateContent = new TemplateNotificationContent(channelRegistrationId, recipientList, movieTicketConfirmationTemplate);
            result = await notificationMessagesClient.SendAsync(movieTicketConfirmationTemplateContent);
            PrintResponse(result);

            // Send sample template sample_happy_hour_announcement
            MessageTemplate happyHourTemplate = AssembleSampleHappyHourAnnouncement();
            var happyHourTemplateContent = new TemplateNotificationContent(channelRegistrationId, recipientList, happyHourTemplate);
            result = await notificationMessagesClient.SendAsync(happyHourTemplateContent);
            PrintResponse(result);

            // Send sample template sample_flight_confirmation
            MessageTemplate flightConfirmationTemplate = AssembleSampleFlightConfirmation();
            var flightConfirmationTemplateContent = new TemplateNotificationContent(channelRegistrationId, recipientList, flightConfirmationTemplate);
            result = await notificationMessagesClient.SendAsync(flightConfirmationTemplateContent);
            PrintResponse(result);

            // Send sample template sample_issue_resolution
            MessageTemplate issueResolutionTemplate = AssembleSampleIssueResolution();
            var issueResolutionTemplateContent = new TemplateNotificationContent(channelRegistrationId, recipientList, issueResolutionTemplate);
            result = await notificationMessagesClient.SendAsync(issueResolutionTemplateContent);
            PrintResponse(result);

            // Send sample template sample_purchase_feedback
            MessageTemplate purchaseFeedbackTemplate = AssembleSamplePurchaseFeedback();
            var purchaseFeedbackTemplateContent = new TemplateNotificationContent(channelRegistrationId, recipientList, purchaseFeedbackTemplate);
            result = await notificationMessagesClient.SendAsync(purchaseFeedbackTemplateContent);
            PrintResponse(result);

            Console.WriteLine("Press any key to exit.");
            Console.ReadKey(true);
        }

        public static MessageTemplate AssembleSampleTemplate()
        {
            string templateName = "sample_template";
            string templateLanguage = "en_us";

            return new MessageTemplate(templateName, templateLanguage);
        }

        public static MessageTemplate AssembleSampleShippingConfirmation()
        {
            string templateName = "sample_shipping_confirmation";
            string templateLanguage = "en_us";

            var threeDays = new MessageTemplateText("threeDays", "3");

            WhatsAppMessageTemplateBindings bindings = new();
            bindings.Body.Add(new(threeDays.Name));

            MessageTemplate shippingConfirmationTemplate = new(templateName, templateLanguage);
            shippingConfirmationTemplate.Bindings = bindings;
            shippingConfirmationTemplate.Values.Add(threeDays);

            return shippingConfirmationTemplate;
        }

        public static MessageTemplate AssembleSampleMovieTicketConfirmation()
        {
            string templateName = "sample_movie_ticket_confirmation"; 
            string templateLanguage = "en_us"; 
            var imageUrl = new Uri("https://aka.ms/acsicon1");

            var image = new MessageTemplateImage("image", imageUrl);
            var title = new MessageTemplateText("title", "Contoso");
            var time = new MessageTemplateText("time", "July 1st, 2023 12:30PM");
            var venue = new MessageTemplateText("venue", "Southridge Video");
            var seats = new MessageTemplateText("seats", "Seat 1A");

            WhatsAppMessageTemplateBindings bindings = new();
            bindings.Header.Add(new(image.Name));
            bindings.Body.Add(new(title.Name));
            bindings.Body.Add(new(time.Name));
            bindings.Body.Add(new(venue.Name));
            bindings.Body.Add(new(seats.Name));

            MessageTemplate movieTicketConfirmationTemplate = new(templateName, templateLanguage);
            movieTicketConfirmationTemplate.Values.Add(image);
            movieTicketConfirmationTemplate.Values.Add(title);
            movieTicketConfirmationTemplate.Values.Add(time);
            movieTicketConfirmationTemplate.Values.Add(venue);
            movieTicketConfirmationTemplate.Values.Add(seats);
            movieTicketConfirmationTemplate.Bindings = bindings;

            return movieTicketConfirmationTemplate;
        }

        public static MessageTemplate AssembleSampleHappyHourAnnouncement()
        {
            string templateName = "sample_happy_hour_announcement";
            string templateLanguage = "en_us";
            var videoUrl = new Uri("< Your .mp4 Video URL >");

            var video = new MessageTemplateVideo("video", videoUrl);
            var venue = new MessageTemplateText("venue", "Fourth Coffee");
            var time = new MessageTemplateText("time", "Today 2-4PM");
            WhatsAppMessageTemplateBindings bindings = new();
            bindings.Header.Add(new(video.Name));
            bindings.Body.Add(new(venue.Name));
            bindings.Body.Add(new(time.Name));

            MessageTemplate happyHourAnnouncementTemplate = new(templateName, templateLanguage);
            happyHourAnnouncementTemplate.Values.Add(venue);
            happyHourAnnouncementTemplate.Values.Add(time);
            happyHourAnnouncementTemplate.Values.Add(video);
            happyHourAnnouncementTemplate.Bindings = bindings;

            return happyHourAnnouncementTemplate;
        }

        public static MessageTemplate AssembleSampleFlightConfirmation()
        {
            string templateName = "sample_flight_confirmation";
            string templateLanguage = "en_us";
            var documentUrl = new Uri("< Your .pdf document URL >");

            var document = new MessageTemplateDocument("document", documentUrl);
            var firstName = new MessageTemplateText("firstName", "Kat");
            var lastName = new MessageTemplateText("lastName", "Larssen");
            var date = new MessageTemplateText("date", "July 1st, 2023");

            WhatsAppMessageTemplateBindings bindings = new();
            bindings.Header.Add(new(document.Name));
            bindings.Body.Add(new(firstName.Name));
            bindings.Body.Add(new(lastName.Name));
            bindings.Body.Add(new(date.Name));

            MessageTemplate flightConfirmationTemplate = new(templateName, templateLanguage);
            flightConfirmationTemplate.Values.Add(document);
            flightConfirmationTemplate.Values.Add(firstName);
            flightConfirmationTemplate.Values.Add(lastName);
            flightConfirmationTemplate.Values.Add(date);
            flightConfirmationTemplate.Bindings = bindings;

            return flightConfirmationTemplate;
        }

        public static MessageTemplate AssembleSampleIssueResolution()
        {
            string templateName = "sample_issue_resolution";
            string templateLanguage = "en_us";

            var name = new MessageTemplateText(name: "name", text: "Kat");
            var yes = new MessageTemplateQuickAction(name: "Yes"){ Payload =  "Kat said yes" };
            var no = new MessageTemplateQuickAction(name: "No") { Payload = "Kat said no" };

            WhatsAppMessageTemplateBindings bindings = new();
            bindings.Body.Add(new(name.Name));
            bindings.Buttons.Add(new(WhatsAppMessageButtonSubType.QuickReply.ToString(), yes.Name));
            bindings.Buttons.Add(new(WhatsAppMessageButtonSubType.QuickReply.ToString(), no.Name));

            MessageTemplate issueResolutionTemplate = new(templateName, templateLanguage);
            issueResolutionTemplate.Values.Add(name);
            issueResolutionTemplate.Values.Add(yes);
            issueResolutionTemplate.Values.Add(no);
            issueResolutionTemplate.Bindings = bindings;

            return issueResolutionTemplate;
        }

        public static MessageTemplate AssembleSamplePurchaseFeedback()
        {
            
            string templateName = "sample_purchase_feedback";
            string templateLanguage = "en_us";
            var imageUrl = new Uri("https://aka.ms/acsicon1");

            var image = new MessageTemplateImage(name: "image", uri: imageUrl);
            var product = new MessageTemplateText(name: "product", text: "coffee");
            var urlSuffix = new MessageTemplateQuickAction(name: "text") { Text = "survey-code"};
            
            WhatsAppMessageTemplateBindings bindings = new();
            bindings.Header.Add(new(image.Name));
            bindings.Body.Add(new(product.Name));
            bindings.Buttons.Add(new(WhatsAppMessageButtonSubType.Url.ToString(), urlSuffix.Name));

            MessageTemplate purchaseFeedbackTemplate = new(templateName, templateLanguage);
            purchaseFeedbackTemplate.Values.Add(image);
            purchaseFeedbackTemplate.Values.Add(product);
            purchaseFeedbackTemplate.Values.Add(urlSuffix);
            purchaseFeedbackTemplate.Bindings = bindings;

            return purchaseFeedbackTemplate;
        }

        public static void PrintResponse(Response<SendMessageResult> response)
        {
            Console.WriteLine($"Response: {response.GetRawResponse().Status} " +
                $"({response.GetRawResponse().ReasonPhrase})");
            Console.WriteLine($"Date: " +
                $"{response.GetRawResponse().Headers.First(header => header.Name == "Date").Value}");
            Console.WriteLine($"ClientRequestId: {response.GetRawResponse().ClientRequestId}");
            Console.WriteLine($"MS-CV: " +
                $"{response.GetRawResponse().Headers.First(header => header.Name == "MS-CV").Value}");
            foreach (var receipts in response.Value.Receipts)
            {
                Console.WriteLine($"MessageId: {receipts.MessageId}");
            }
            Console.WriteLine($"\n");
        }
    }
}
```


## More Examples

These examples use sample templates available to WhatsApp Business Accounts created through the Azure portal embedded signup.


### Use sample template sample_happy_hour_announcement

This sample template uses a video in the header and two text parameters in the body.

Screenshot that shows template details for template named sample_happy_hour_announcement.

The header of the template requires a video:

```
{
  "type": "HEADER",
  "format": "VIDEO"
},
```

The video must be a URL to hosted mp4 video.

For more information about supported media types and size limits, see [WhatsApp's documentation for message media](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types). 

The body of the template requires two text parameters:

```
{
  "type": "BODY",
  "text": "Happy hour is here! 🍺😀🍸\nPlease be merry and enjoy the day. 🎉\nVenue: {{1}}\nTime: {{2}}"
},
```

Create one `MessageTemplateVideo` and two `MessageTemplateText` variables. Then assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content.

```csharp
string templateName = "sample_happy_hour_announcement";
string templateLanguage = "en_us";
var videoUrl = new Uri("< Your .mp4 Video URL >");

var video = new MessageTemplateVideo("video", videoUrl);
var venue = new MessageTemplateText("venue", "Fourth Coffee");
var time = new MessageTemplateText("time", "Today 2-4PM");
WhatsAppMessageTemplateBindings bindings = new();
bindings.Header.Add(new(video.Name));
bindings.Body.Add(new(venue.Name));
bindings.Body.Add(new(time.Name));

MessageTemplate happyHourAnnouncementTemplate = new(templateName, templateLanguage);
happyHourAnnouncementTemplate.Values.Add(venue);
happyHourAnnouncementTemplate.Values.Add(time);
happyHourAnnouncementTemplate.Values.Add(video);
happyHourAnnouncementTemplate.Bindings = bindings;
```

### Use sample template sample_flight_confirmation

This sample template uses a document in the header and three text parameters in the body.

Screenshot that shows template details for template named sample_flight_confirmation.

The header of the template requires a document:

```
{
  "type": "HEADER",
  "format": "DOCUMENT"
},
```

The document must be a URL to hosted PDF document.

For more information about supported media types and size limits, see [WhatsApp's documentation for message media](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types). 

The body of the template requires three text parameters:

```
{
  "type": "BODY",
  "text": "This is your flight confirmation for {{1}}-{{2}} on {{3}}."
},
```

Create one `MessageTemplateDocument` and three `MessageTemplateText` variables. Then assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content.

```csharp
string templateName = "sample_flight_confirmation";
string templateLanguage = "en_us";
var documentUrl = new Uri("< Your .pdf document URL >");

var document = new MessageTemplateDocument("document", documentUrl);
var firstName = new MessageTemplateText("firstName", "Kat");
var lastName = new MessageTemplateText("lastName", "Larssen");
var date = new MessageTemplateText("date", "July 1st, 2023");

WhatsAppMessageTemplateBindings bindings = new();
bindings.Header.Add(new(document.Name));
bindings.Body.Add(new(firstName.Name));
bindings.Body.Add(new(lastName.Name));
bindings.Body.Add(new(date.Name));

MessageTemplate flightConfirmationTemplate = new(templateName, templateLanguage);
flightConfirmationTemplate.Values.Add(document);
flightConfirmationTemplate.Values.Add(firstName);
flightConfirmationTemplate.Values.Add(lastName);
flightConfirmationTemplate.Values.Add(date);
flightConfirmationTemplate.Bindings = bindings;
```




**Applies to: programming-language-java**


## Prerequisites

- [Register WhatsApp Business Account with your Azure Communication Services resource](connect-whatsapp-business-account.md).
- [Create WhatsApp template message](#create-and-manage-whatsapp-template-message).
- Active WhatsApp phone number to receive messages.

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Messages SDK for Java.

| Class Name | Description |
| --- | --- |
| `NotificationMessagesClient` | Connects to your Azure Communication Services resource. It sends the messages. |
| `MessageTemplate` | Defines which template you use and the content of the template properties for your message. |
| `TemplateNotificationContent` | Defines the "who" and the "what" of the template message you intend to send. |

> **Note:**
> For more information, see the Azure SDK for Java reference at [com.azure.communication.messages Package](https://learn.microsoft.com/java/api/com.azure.communication.messages).

### Supported WhatsApp template types

| Template type | Description |
| --- | --- |
| Text-based message templates | WhatsApp message templates are specific message formats with or without parameters. |
| Media-based message templates | WhatsApp message templates with media parameters for header components. |
| Interactive message templates | Interactive message templates expand the content you can send recipients, by  including interactive buttons using the components object. Both Call-to-Action and Quick Reply are supported. |
| Location-based message templates | WhatsApp message templates with location parameters in terms Longitude and Latitude for header components. |

## Common configuration

Follow these steps to add the necessary code snippets to the main function of your `App.java` file.
- [Create and manage WhatsApp template message](#create-and-manage-whatsapp-template-message).
- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).

### Create and manage WhatsApp template message

WhatsApp message templates are specific message formats that businesses use to send out notifications or customer care messages to people that opted in to notifications. Messages can include appointment reminders, shipping information, issue resolution, or payment updates. **Before start using Advanced messaging SDK to send templated messages, user needs to create required templates in the WhatsApp Business Platform**.

For more information about WhatsApp requirements for templates, see the WhatsApp Business Platform API references:
- [Create and Manage Templates](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/).
- [View Template Components](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components).
- [Send Template Messages](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview).
- [Adhere to opt-in requirements](https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in) before sending messages to WhatsApp users.


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


## Set up environment
To set up an environment for sending messages, complete the steps in the following sections.

### Prerequisite
- [WhatsApp Business Account registered with your Azure Communication Services resource](connect-whatsapp-business-account.md).
- Active WhatsApp phone number to receive messages.
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/) version 8 or later.
- [Apache Maven](https://maven.apache.org/download.cgi).


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
- [List WhatsApp templates in the Azure portal](#list-whatsapp-templates-in-the-azure-portal).
- [Send template message with text parameters in the body](#send-template-message-with-text-parameters-in-the-body).
- [Send template message with media parameter in the header](#send-template-message-with-media-parameter-in-the-header).
- [Send template message with quick reply buttons](#send-template-message-with-quick-reply-buttons).
- [Send Template message with call to action buttons and dynamic link](#send-template-message-with-call-to-action-buttons-and-dynamic-link).

### List WhatsApp templates in the Azure portal

To view your templates in the Azure portal, go to your Azure Communication Services resource > **Advanced Messaging** > **Templates**.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the advanced messaging templates tab.

Selecting a template to view the template details.

The **Content** field of the template details can include parameter bindings. The parameter bindings can be denoted as:
- A `"format"` field with a value such as `IMAGE`.
- Double brackets surrounding a number, such as `{{1}}`. The number, index started at 1, indicates the order in which the binding values must be supplied to create the message template.
- Double brackets surrounding a name, such as `{{movie_name}}`. The named parameters allow developers to reference parameters by name instead of position.
  > **Important:**
  > When using named parameters, you must ensure that the name you use when sending the message **exactly matches** the name defined in the template you created in the Meta WhatsApp Manager.

Screenshot that shows template details.

Alternatively, you can view and edit all of your WhatsApp Business Account templates in the [WhatsApp Manager](https://business.facebook.com/wa/manage/home/) > Account tools > [Message templates](https://business.facebook.com/wa/manage/message-templates/). 

To list out your templates programmatically, you can fetch all templates for your channel ID using the following code:

```java
public static void getMessageTemplateWithConnectionString() {
    MessageTemplateClient templateClient =
        new MessageTemplateClientBuilder()
            .connectionString(connectionString)
            .buildClient();

    PagedIterable<MessageTemplateItem> response = templateClient.listTemplates(channelRegistrationId);

    response.stream().forEach(t -> {
        WhatsAppMessageTemplateItem template = (WhatsAppMessageTemplateItem) t ;
        System.out.println("===============================");
        System.out.println("Template Name :: "+template.getName());
        System.out.println("Template Language :: "+template.getLanguage());
        System.out.println("Template Status :: "+template.getStatus());
        System.out.println("Template Content :: "+template.getContent());
        System.out.println("===============================");
    });
    }
```

### Send template message with text parameters in the body

If the template takes no parameters, you don't need to supply any values or bindings when creating the `MessageTemplate`.

```java
 /*
    * This sample shows how to send template message with below details
    * Name: sample_shipping_confirmation, Language: en_US
    *  [
          {
            "type": "BODY",
            "text": "Your package has been shipped. It will be delivered in {{1}} business days."
          },
          {
            "type": "FOOTER",
            "text": "This message is from an unverified business."
          }
        ]
* */
private static void sendTemplateMessage() {

    //Update Template Name and language according your template associate to your channel.
    MessageTemplate template = new MessageTemplate("sample_shipping_confirmation", "en_US");

    //Update template parameter type and value
    List<MessageTemplateValue> messageTemplateValues = new ArrayList<>();
    messageTemplateValues.add(new MessageTemplateText("Days", "5"));
    template.setValues(messageTemplateValues);

    //Update template parameter binding
    List<WhatsAppMessageTemplateBindingsComponent> components = new ArrayList<>();
    components.add(new WhatsAppMessageTemplateBindingsComponent("Days"));
    MessageTemplateBindings bindings =new WhatsAppMessageTemplateBindings()
        .setBody(components);
    template.setBindings(bindings);

    NotificationMessagesClient client = createClientWithTokenCredential();
    SendMessageResult result = client.send(
        new TemplateNotificationContent(CHANNEL_ID, recipients, template));

    result.getReceipts().forEach(r -> System.out.println("Message sent to:"+r.getTo() + " and message id:"+ r.getMessageId()));
    }
```

### Send template message with media parameter in the header

Use `MessageTemplateImage`, `MessageTemplateVideo`, or `MessageTemplateDocument` to define the media parameter in a header.

Template definition with image media parameter in the header:

```json
{
  "type": "HEADER",
  "format": "VIDEO"
},
```

The `"format"` can be on of four different media types supported by WhatsApp. In the .NET SDK, each media type uses a corresponding `MessageTemplateValue` type.

| Format | MessageTemplateValue Type | File Type |
| --- | --- | --- |
| IMAGE | `MessageTemplateImage` | png, jpg |
| VIDEO | `MessageTemplateVideo` | mp4 |
| DOCUMENT | `MessageTemplateDocument` | pdf |

For more information about supported media types and size limits, see [WhatsApp's documentation for message media](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types). 


#### Example

`sample_happy_hour_announcement` template:

Screenshot that shows template details for template named sample_happy_hour_announcement.

Here, the header of the template requires a video:

```
{
  "type": "HEADER",
  "format": "VIDEO"
},
```

The video must be a URL to a hosted mp4 video.

For more information about supported media types and size limits, see [WhatsApp's documentation for message media](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types). 

The body of the template requires two text parameters:

```
{
  "type": "BODY",
  "text": "Happy hour is here! 🍺😀🍸\nPlease be merry and enjoy the day. 🎉\nVenue: {{1}}\nTime: {{2}}"
},
```

Create one `MessageTemplateVideo` and four `MessageTemplateText` variables. Then, assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content.

```java
 /*
    * This sample shows how to send template message with below details
    * Name: sample_happy_hour_announcement, Language: en_US
    *  [
          {
            "type": "HEADER",
            "format": "VIDEO"
          },
          {
            "type": "BODY",
            "text": "Happy hour is here! 🍺😀🍸\nPlease be merry and enjoy the day. 🎉\nVenue: {{1}}\nTime: {{2}}"
          },
          {
            "type": "FOOTER",
            "text": "This message is from an unverified business."
          }
        ]
* */
private static void sendTemplateMessageWithVideo() {

    //Update Template Name and language according your template associate to your channel.
    MessageTemplate template = new MessageTemplate("sample_happy_hour_announcement", "en_US");

    //Add template parameter type with value in a list
    List<MessageTemplateValue> messageTemplateValues = new ArrayList<>();
    messageTemplateValues.add(new MessageTemplateVideo("HeaderVideo", "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"));
    messageTemplateValues.add(new MessageTemplateText("VenueInfoInBody", "Starbucks"));
    messageTemplateValues.add(new MessageTemplateText("TimeInfoInBody", "Today 2-4PM"));

    // Add parameter binding for template header in a list
    List<WhatsAppMessageTemplateBindingsComponent> templateHeaderBindings = new ArrayList<>();
    templateHeaderBindings.add(new WhatsAppMessageTemplateBindingsComponent("HeaderVideo"));

    // Add parameter binding for template body in a list
    List<WhatsAppMessageTemplateBindingsComponent> templateBodyBindings = new ArrayList<>();
    templateBodyBindings.add(new WhatsAppMessageTemplateBindingsComponent("VenueInfoInBody"));
    templateBodyBindings.add(new WhatsAppMessageTemplateBindingsComponent("TimeInfoInBody"));

    MessageTemplateBindings templateBindings = new WhatsAppMessageTemplateBindings()
        .setHeaderProperty(templateHeaderBindings) // Set the parameter binding for template header
        .setBody(templateBodyBindings); // Set the parameter binding for template body

    template
        .setBindings(templateBindings)
        .setValues(messageTemplateValues);

    NotificationMessagesClient client = createClientWithConnectionString();
    SendMessageResult result = client.send(
        new TemplateNotificationContent(CHANNEL_ID, recipients, template));

    result.getReceipts().forEach(r -> System.out.println("Message sent to:"+r.getTo() + " and message id:"+ r.getMessageId()));
}
```

### Send template message with quick reply buttons

Use `MessageTemplateQuickAction` to define the payload for quick reply buttons and `MessageTemplateQuickAction` objects have the following three attributes. 

| Properties | Description | Type |
| --- | --- | --- |
| Name | The `name` used to look up the value in `MessageTemplateWhatsAppBindings`. | string |
| Text | The option quick action `text`. | string |
| Payload | The `payload` assigned to a button available in a message reply if the user selects the button. | string |
 
Template definition with quick reply buttons:
```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "QUICK_REPLY",
      "text": "Yes"
    },
    {
      "type": "QUICK_REPLY",
      "text": "No"
    }
  ]
}
```

The order that the buttons appear in the template definition must match the order in which the buttons are defined when creating the bindings with `MessageTemplateWhatsAppBindings`.

For more information about the payload in quick reply responses from the user, see WhatsApp's documentation for [Received Callback from a Quick Reply Button](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#received-callback-from-a-quick-reply-button).

#### Example

`sample_issue_resolution` template:

Screenshot that shows template details for template named sample_issue_resolution.

The body of the template requires one text parameter:

```java
/*
    * This sample shows how to send template message with below details
    * Name: sample_issue_resolution, Language: en_US
    *  [
          {
            "type": "BODY",
            "text": "Hi {{1}}, were we able to solve the issue that you were facing?"
          },
          {
            "type": "FOOTER",
            "text": "This message is from an unverified business."
          },
          {
            "type": "BUTTONS",
            "buttons": [
              {
                "type": "QUICK_REPLY",
                "text": "Yes"
              },
              {
                "type": "QUICK_REPLY",
                "text": "No"
              }
            ]
          }
        ]
* */
private static void sendTextTemplateMessageWithQuickReply() {

    //Add template parameter type with value in a list
    List<MessageTemplateValue> messageTemplateValues = new ArrayList<>();
    messageTemplateValues.add(new MessageTemplateText("Name", "Arif"));
    messageTemplateValues.add(new MessageTemplateQuickAction("Yes").setPayload("Yes"));
    messageTemplateValues.add(new MessageTemplateQuickAction("No").setPayload("No"));

    // Add parameter binding for template body in a list
    List<WhatsAppMessageTemplateBindingsComponent> templateBodyBindings = new ArrayList<>();
    templateBodyBindings.add(new WhatsAppMessageTemplateBindingsComponent("Name"));

    // Add parameter binding for template buttons in a list
    List<WhatsAppMessageTemplateBindingsButton> templateButtonBindings = new ArrayList<>();
    templateButtonBindings.add( new WhatsAppMessageTemplateBindingsButton(WhatsAppMessageButtonSubType.QUICK_REPLY, "Yes"));
    templateButtonBindings.add( new WhatsAppMessageTemplateBindingsButton(WhatsAppMessageButtonSubType.QUICK_REPLY, "No"));

    MessageTemplateBindings templateBindings = new WhatsAppMessageTemplateBindings()
        .setBody(templateBodyBindings) // Set the parameter binding for template body
        .setButtons(templateButtonBindings); // Set the parameter binding for template buttons

    MessageTemplate messageTemplate = new MessageTemplate("sample_issue_resolution", "en_US")
        .setBindings(templateBindings)
        .setValues(messageTemplateValues);

    NotificationMessagesClient client = createClientWithConnectionString();
    SendMessageResult result = client.send(
        new TemplateNotificationContent(CHANNEL_ID, recipients, messageTemplate));

    result.getReceipts().forEach(r -> System.out.println("Message sent to:"+r.getTo() + " and message id:"+ r.getMessageId()));
}
```

### Send Template message with call to action buttons and dynamic link

Use `MessageTemplateQuickAction` to define the URL suffix for call to action buttons and `MessageTemplateQuickAction` object have the following two attributes.

| Properties | Description | Type |
| --- | --- | --- |
| Name | The `name` used to look up the value in `MessageTemplateWhatsAppBindings`. | string |
| Text | The  `text` appended to the URL. | string |

Template definition buttons:

```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "URL",
      "text": "Take Survey",
      "url": "https://www.example.com/{{1}}"
    }
  ]
}
```

The order that the buttons appear in the template definition must match the order in which the buttons are defined when creating the bindings with `MessageTemplateWhatsAppBindings`.

#### Example

`sample_purchase_feedback` template:

This sample template adds a button with a dynamic URL link to the message. It also uses an image in the header and a text parameter in the body.

Screenshot that shows editing URL Type in the WhatsApp manager.

In this sample, the header of the template requires an image:

```json
{
  "type": "HEADER",
  "format": "IMAGE"
},
```

The body of the template requires one text parameter:

```json
{
  "type": "BODY",
  "text": "Thank you for purchasing {{1}}! We value your feedback and would like to learn more about your experience."
},
```

The template includes a dynamic URL button with one parameter:

```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "URL",
      "text": "Take Survey",
      "url": "https://www.example.com/{{1}}"
    }
  ]
}
```

Create one `MessageTemplateImage`, one `MessageTemplateText`, and one `MessageTemplateQuickAction` variable. Then, assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content. The order also matters when defining your bindings' buttons.

```java
/*
* This sample shows how to send template message with below details
* Name: sample_purchase_feedback, Language: en_US
*  [
        {
        "type": "HEADER",
        "format": "IMAGE"
        },
        {
        "type": "BODY",
        "text": "Thank you for purchasing {{1}}! We value your feedback and would like to learn more about your experience."
        },
        {
        "type": "FOOTER",
        "text": "This message is from an unverified business."
        },
        {
        "type": "BUTTONS",
        "buttons": [
            {
            "type": "URL",
            "text": "Take Survey",
            "url": "https://www.example.com/"
            }
        ]
        }
    ]
* */
private static void sendTemplateMessageWithImage() {

    //Update Template Name and language according your template associate to your channel.
    MessageTemplate template = new MessageTemplate("sample_purchase_feedback", "en_US");

    //Add template parameter type with value in a list
    List<MessageTemplateValue> messageTemplateValues = new ArrayList<>();
    messageTemplateValues.add(new MessageTemplateImage("HeaderImage", "https://upload.wikimedia.org/wikipedia/commons/3/30/Building92microsoft.jpg"));
    messageTemplateValues.add(new MessageTemplateText("ProductInfoInBody", "Microsoft Office"));

    // Add parameter binding for template header in a list
    List<WhatsAppMessageTemplateBindingsComponent> templateHeaderBindings = new ArrayList<>();
    templateHeaderBindings.add(new WhatsAppMessageTemplateBindingsComponent("HeaderImage"));

    // Add parameter binding for template body in a list
    List<WhatsAppMessageTemplateBindingsComponent> templateBodyBindings = new ArrayList<>();
    templateBodyBindings.add(new WhatsAppMessageTemplateBindingsComponent("ProductInfoInBody"));

    MessageTemplateBindings templateBindings = new WhatsAppMessageTemplateBindings()
        .setHeaderProperty(templateHeaderBindings) // Set the parameter binding for template header
        .setBody(templateBodyBindings); // Set the parameter binding for template body

    template
        .setBindings(templateBindings)
        .setValues(messageTemplateValues);

    NotificationMessagesClient client = createClientWithConnectionString();
    SendMessageResult result = client.send(
        new TemplateNotificationContent(CHANNEL_ID, recipients, template));

    result.getReceipts().forEach(r -> System.out.println("Message sent to:"+r.getTo() + " and message id:"+ r.getMessageId()));
}
```

## Run the code

1. Open the directory that contains the `pom.xml` file and compile the project by using the `mvn` command.

   ```console
   mvn compile
   ```

1. Run the app by executing the following `mvn` command.

   ```console
   mvn exec:java -D"exec.mainClass"="com.communication.quickstart.App" -D"exec.cleanupDaemonThreads"="false"
   ```

## Full sample code

Find the finalized code for this quickstart on [GitHub](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/communication/azure-communication-messages/src/samples/java/com/azure/communication/messages).



**Applies to: programming-language-javascript**


## Prerequisites

- [Register WhatsApp Business Account with your Azure Communication Services resource](connect-whatsapp-business-account.md).
- [Create WhatsApp template message](#create-and-manage-whatsapp-template-message).
- Active WhatsApp phone number to receive messages.
- [Node.js](https://nodejs.org/) Active LTS and Maintenance LTS versions (We recommend 8.11.1 and 10.14.1).
- [Node.js](https://nodejs.org/) Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 are recommended)
  - In a terminal or command window, run `node --version` to check that Node.js is installed

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Messages SDK for JavaScript.

| Class Name | Description |
| --- | --- |
| `NotificationMessagesClient` | Connects to your Azure Communication Services resource. It sends the messages. |
| `MessageTemplate` | Defines which template you use and the content of the template properties for your message. |
| `TemplateNotificationContent` | Defines the "who" and the "what" of the template message you intend to send. |

> **Note:**
> For more information, see the Azure SDK for JavaScript reference [@Azure-rest/communication-messages package](https://learn.microsoft.com/javascript/api/@azure-rest/communication-messages)

### Supported WhatsApp template types

| Template type | Description |
| --- | --- |
| Text-based message templates | WhatsApp message templates are specific message formats with or without parameters. |
| Media-based message templates | WhatsApp message templates with media parameters for header components. |
| Interactive message templates | Interactive message templates expand the content you can send recipients, by  including interactive buttons using the components object. Both Call-to-Action and Quick Reply are supported. |
| Location-based message templates | WhatsApp message templates with location parameters in terms Longitude and Latitude for header components. |

## Common configuration

Follow these steps to add the necessary code snippets to the main function of your `send-messages.js` file.
- [Create and manage WhatsApp template message](#create-and-manage-whatsapp-template-message).
- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).

### Create and manage WhatsApp template message

WhatsApp message templates are specific message formats that businesses use to send out notifications or customer care messages to people that opted in to notifications. Messages can include appointment reminders, shipping information, issue resolution, or payment updates. **Before start using Advanced messaging SDK to send templated messages, user needs to create required templates in the WhatsApp Business Platform**.

For more information about WhatsApp requirements for templates, see the WhatsApp Business Platform API references:
- [Create and Manage Templates](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/).
- [View Template Components](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components).
- [Send Template Messages](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview).
- Businesses must also adhere to [opt-in requirements](https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in) before sending messages to WhatsApp users.

  

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

## Setting up
To set up an environment for sending messages, complete the steps in the following sections.


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
- [List WhatsApp templates in the Azure portal](#list-whatsapp-templates-in-the-azure-portal).
- [Send template message with text parameters in the body](#send-template-message-with-text-parameters-in-the-body).

### List WhatsApp templates in the Azure portal

To view your templates in the Azure portal, go to your Azure Communication Services resource > **Advanced Messaging** > **Templates**.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the advanced messaging templates tab.

Selecting a template to view the template details.

The **Content** field of the template details can include parameter bindings. The parameter bindings can be denoted as:
- A `"format"` field with a value such as `IMAGE`.
- Double brackets surrounding a number, such as `{{1}}`. The number, index started at 1, indicates the order in which the binding values must be supplied to create the message template.
- Double brackets surrounding a name, such as `{{movie_name}}`. The named parameters allow developers to reference parameters by name instead of position.
  > **Important:**
  > When using named parameters, you must ensure that the name you use when sending the message **exactly matches** the name defined in the template you created in the Meta WhatsApp Manager.

Screenshot that shows template details.

Alternatively, you can view and edit all of your WhatsApp Business Account templates in the [WhatsApp Manager](https://business.facebook.com/wa/manage/home/) > Account tools > [Message templates](https://business.facebook.com/wa/manage/message-templates/). 

To list out your templates programmatically, you can fetch all templates for your channel ID using the following code:

```javascript
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get Template list for a channel
 */

const MessageTemplateClient = require("@azure-rest/communication-messages").default,
  { isUnexpected } = require("@azure-rest/communication-messages");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const connectionString = process.env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING || "";
  const client = MessageTemplateClient(connectionString);
  console.log("Fetch Templates...");
  const response = await client
    .path("/messages/channels/{channelId}/templates", process.env.CHANNEl_ID || "")
    .get({
      queryParameters: { maxPageSize: 2 },
    });

  if (isUnexpected(response)) {
    throw new Error("Failed to get template for the channel.");
  }

  // The paginate helper creates a paged async iterator using metadata from the first page.
  const items = paginate(client, response);

  // We get an PageableAsyncIterator so we need to do `for await`.
  for await (const item of items) {
    console.log(JSON.stringify(item, null, 2));
  }
}

main().catch((error) => {
  console.error("Encountered an error while sending message: ", error);
  throw error;
});
```

### Send template message with text parameters in the body

`sample_shipping_confirmation` template:

Screenshot that shows template details for template named sample_shipping_confirmation.

In this sample, the body of the template has one parameter:

```json
{
  "type": "BODY",
  "text": "Your package has been shipped. It will be delivered in {{1}} business days."
},
```

Parameters are defined with the `values` values and `bindings` bindings. Use the values and bindings to assemble the `template` object.

```javascript
 /*
    * This sample shows how to send template message with below details
    * Name: sample_shipping_confirmation, Language: en_US
    *  [
          {
            "type": "BODY",
            "text": "Your package has been shipped. It will be delivered in {{1}} business days."
          },
          {
            "type": "FOOTER",
            "text": "This message is from an unverified business."
          }
        ]
* */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Use AAD token credentials when sending a whatsapp template message.
 */

const { isNode } = require("@azure/core-util");
const { ClientSecretCredential, DefaultAzureCredential } = require("@azure/identity");
const NotificationClient = require("@azure-rest/communication-messages").default,
  { isUnexpected } = require("@azure-rest/communication-messages");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set this environment variable or edit the following values
  const endpoint = process.env.ACS_URL || "";

  // Azure AD Credential information is required to run this sample:
  if (
    !process.env.AZURE_TENANT_ID ||
    !process.env.AZURE_CLIENT_ID ||
    !process.env.AZURE_CLIENT_SECRET
  ) {
    console.error(
      "Azure AD authentication information not provided, but it is required to run this sample. Exiting.",
    );
    return;
  }

  // get credentials
  const credential = isNode
    ? new DefaultAzureCredential()
    : new ClientSecretCredential(
        process.env.AZURE_TENANT_ID,
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
      );

  const client = NotificationClient(endpoint, credential);

  const DaysTemplateValue = {
    kind: "text",
    name: "Days",
    text: "5",
  };

  const templateBindings = {
    kind: "whatsApp",
    body: [
      {
        refValue: "Days",
      },
    ],
  };

  const template = {
    name: "sample_shipping_confirmation",
    language: "en_US",
    bindings: templateBindings,
    values: [DaysTemplateValue],
  };

  const result = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
      channelRegistrationId: process.env.CHANNEL_ID || "",
      to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
      kind: "template",
      template: template,
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

module.exports = { main };
```

## Run the code
Use the node command to run the code you added to the send-messages.js file.

```console
node ./send-messages.js
```

## Full sample code

Find the finalized code for this sample on [GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-messages-rest/samples).


**Applies to: programming-language-python**


## Prerequisites

- [Register WhatsApp Business Account with your Azure Communication Services resource](connect-whatsapp-business-account.md).
- [Create WhatsApp template message](#create-and-manage-whatsapp-template-message).
- Active WhatsApp phone number to receive messages.

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Messages SDK for Python.

| Class Name | Description |
| --- | --- |
| `NotificationMessagesClient` | Connects to your Azure Communication Services resource. It sends the messages. |
| `MessageTemplate` | Defines which template you use and the content of the template properties for your message. |
| `TemplateNotificationContent` | Defines the "who" and the "what" of the template message you intend to send. |

> **Note:**
> For more information, seer the Azure SDK for Python reference [messages Package](https://learn.microsoft.com/python/api/azure-communication-messages/azure.communication.messages).

### Supported WhatsApp template types

| Template type | Description |
| --- | --- |
| Text-based message templates | WhatsApp message templates are specific message formats with or without parameters. |
| Media-based message templates | WhatsApp message templates with media parameters for header components. |
| Interactive message templates | Interactive message templates expand the content you can send recipients, by  including interactive buttons using the components object. Both Call-to-Action and Quick Reply are supported. |
| Location-based message templates | WhatsApp message templates with location parameters in terms Longitude and Latitude for header components. |

## Common configuration

Follow these steps to add the necessary code snippets to the `messages-quickstart.py` python program.
- [Create and manage WhatsApp template message](#create-and-manage-whatsapp-template-message).
- [Authenticate the client](#authenticate-the-client).
- [Set channel registration ID](#set-channel-registration-id).
- [Set recipient list](#set-recipient-list).

### Create and manage WhatsApp template message

WhatsApp message templates are specific message formats that businesses use to send out notifications or customer care messages to people that opted in to notifications. Messages can include appointment reminders, shipping information, issue resolution, or payment updates. **Before start using Advanced messaging SDK to send templated messages, user needs to create required templates in the WhatsApp Business Platform**.

For more information about WhatsApp requirements for templates, see the WhatsApp Business Platform API references:
- [Create and Manage Templates](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/).
- [View Template Components](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components).
- [Send Template Messages](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview).
- Businesses must also adhere to [opt-in requirements](https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in) before sending messages to WhatsApp users.

  

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

## Set up environment


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


### Basic program structure

```python
import os

class MessagesQuickstart(object):
    print("Azure Communication Services - Advanced Messages SDK Quickstart")

if __name__ == '__main__':
    messages = MessagesQuickstart()
```

##  Code examples

Follow these steps to add the necessary code snippets to the `messages-quickstart.py` python program.
- [List WhatsApp templates in Azure portal](#list-whatsapp-templates-in-azure-portal).
- [Send Template message with no parameters](#send-template-message-with-no-parameters).
- [Send Template message with text parameters in the body](#send-template-message-with-text-parameters-in-the-body).
- [Send Template message with media parameter in the header](#send-template-message-with-media-parameter-in-the-header).
- [Send Template message with location in the header](#send-template-message-with-location-in-the-header).
- [Send Template message with quick reply buttons](#send-template-message-with-quick-reply-buttons).
- [Send Template message with call to action buttons with dynamic link](#send-template-message-with-call-to-action-buttons-with-dynamic-link).

### List WhatsApp templates in Azure portal

You can view your templates in the Azure portal by going to your Azure Communication Service resource > **Advanced Messaging** > **Templates**.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Templates' tab.

Select a template to view the template details. 
 
The `content` field of the template details can include parameter bindings. The parameter bindings can be denoted as:
- A `format` field with a value such as `IMAGE`.
- Double brackets surrounding a number, such as `{{1}}`. The number, index started at 1, indicates the order in which the binding values must be supplied to create the message template.
- Double brackets surrounding a name, such as `{{movie_name}}`. The named parameters allow developers to reference parameters by name instead of position.
  > **Important:**
  > When using named parameters, you must ensure that the name you use when sending the message **exactly matches** the name defined in the template you created in the Meta WhatsApp Manager.

Screenshot that shows template details.

Alternatively, you can view and edit all of your WhatsApp Business Account's templates in the [WhatsApp Manager](https://business.facebook.com/wa/manage/home/) > Account tools > [Message templates](https://business.facebook.com/wa/manage/message-templates/). 

To list out your templates programmatically, you can fetch all templates for your channel ID as follows:

```python
def get_templates_list(self):

    from azure.communication.messages import MessageTemplateClient
    message_template_client = MessageTemplateClient.from_connection_string(self.connection_string)
    # calling send() with whatsapp message details
    template_list = message_template_client.list_templates(self.channel_id)
    count_templates = len(list(template_list))
    print("Successfully retrieved {} templates from channel_id {}.".format(count_templates, self.channel_id))
```


### Send template message with no parameters

If the template doesn't require parameters, you don't need to supply the values or bindings when creating the `MessageTemplate`.

#### Example

The `sample_template` doesn't have parameters.

Screenshot that shows template details for template named sample_template.

Assemble the `MessageTemplate` by referencing the target template name and language.

```python
input_template: MessageTemplate = MessageTemplate(name="gathering_invitation", language="ca")  # Name of the WhatsApp Template
```

### Send template message with text parameters in the body

Use `MessageTemplateText` to define parameters in the body denoted with double brackets surrounding a number, such as `{{1}}`. The number, index started at 1, indicates the order in which the binding values must be supplied to create the message template. Attempting to include parameters not in the template is invalid.

Template definition with two parameters:

```json
{
  "type": "BODY",
  "text": "Message with two parameters: {{1}} and {{2}}"
}
```

#### Examples

`sample_shipping_confirmation` template:

Screenshot that shows template details for template named sample_shipping_confirmation.

In this sample, the body of the template has one parameter:

```json
{
  "type": "BODY",
  "text": "Your package has been shipped. It will be delivered in {{1}} business days."
},
```

Define parameters using the `MessageTemplateValue` values and `MessageTemplateWhatsAppBindings` bindings. Use the values and bindings to assemble the `MessageTemplate`.

```python
# Setting template options
templateName = "sample_shipping_confirmation"
templateLanguage = "en_us" 
shippingConfirmationTemplate: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
threeDays = MessageTemplateText(name="threeDays", text="3")
bindings = WhatsAppMessageTemplateBindings(body=[WhatsAppMessageTemplateBindingsComponent(ref_value=threeDays.name)])
shippingConfirmationTemplate.bindings = bindings
shippingConfirmationTemplate.template_values=[threeDays]
template_options = TemplateNotificationContent(
    channel_registration_id=self.channel_id, to=[self.phone_number], template=shippingConfirmationTemplate
)
```

### Send template message with media parameter in the header

Use `MessageTemplateImage`, `MessageTemplateVideo`, or `MessageTemplateDocument` to define the media parameter in a header.

Template definition with image media parameter in header:

```json
{
  "type": "HEADER",
  "format": "IMAGE"
},
```

The `format` can have different media types supported by WhatsApp. In the .NET SDK, each media type uses a corresponding `MessageTemplateValue` type.

| Format | MessageTemplateValue Type | File Type |
| --- | --- | --- |
| IMAGE | `MessageTemplateImage` | png, jpg |
| VIDEO | `MessageTemplateVideo` | mp4 |
| DOCUMENT | `MessageTemplateDocument` | pdf |

For more information about supported media types and size limits, see [WhatsApp's documentation for message media](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types). 


#### Examples

`sample_movie_ticket_confirmation` template:

Screenshot that shows template details for template named sample_movie_ticket_confirmation.

In this sample, the header of the template requires an image:

```
{
  "type": "HEADER",
  "format": "IMAGE"
},
```

The body of the template requires four text parameters:

```json
{
  "type": "BODY",
  "text": "Your ticket for *{{1}}*\n*Time* - {{2}}\n*Venue* - {{3}}\n*Seats* - {{4}}"
},
```

Create one `MessageTemplateImage` and four `MessageTemplateText` variables. Then assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content.

```python
 # Setting template options
templateName = "sample_movie_ticket_confirmation"
templateLanguage = "en_us" 
imageUrl = "https://aka.ms/acsicon1"
sample_movie_ticket_confirmation: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
image = MessageTemplateImage(name="image", url=imageUrl)
title = MessageTemplateText(name="title", text="Contoso")
time = MessageTemplateText(name="time", text="July 1st, 2023 12:30PM")
venue = MessageTemplateText(name="venue", text="Southridge Video")
seats = MessageTemplateText(name="seats", text="Seat 1A")

bindings = WhatsAppMessageTemplateBindings(header=[WhatsAppMessageTemplateBindingsComponent(ref_value=image.name)],
                                            body=[WhatsAppMessageTemplateBindingsComponent(ref_value=title.name),
                                                    WhatsAppMessageTemplateBindingsComponent(ref_value=time.name),
                                                    WhatsAppMessageTemplateBindingsComponent(ref_value=venue.name),
                                                    WhatsAppMessageTemplateBindingsComponent(ref_value=seats.name)])
sample_movie_ticket_confirmation.bindings = bindings
sample_movie_ticket_confirmation.template_values=[image,title,time,venue,seats]
template_options = TemplateNotificationContent(
    channel_registration_id=self.channel_id, to=[self.phone_number], template=sample_movie_ticket_confirmation)
```

### Send template message with quick reply buttons

Use `MessageTemplateQuickAction` to define the payload for quick reply buttons and `MessageTemplateQuickAction` objects have the following three attributes. 

| Properties | Description | Type |
| --- | --- | --- |
| Name | The `name` to look up the value in `MessageTemplateWhatsAppBindings`. | string |
| Text | The option quick action `text`. | string |
| Payload | The `payload` assigned to a button available in a message reply if the user selects the button. | string |
 
Template definition with quick reply buttons:

```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "QUICK_REPLY",
      "text": "Yes"
    },
    {
      "type": "QUICK_REPLY",
      "text": "No"
    }
  ]
}
```

The order that the buttons appear in the template definition must match the order in which the buttons are defined when creating the bindings with `MessageTemplateWhatsAppBindings`.

For more information about the payload in quick reply responses from the user, see WhatsApp's documentation for [Received Callback from a Quick Reply Button](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#received-callback-from-a-quick-reply-button).

#### Example

`sample_issue_resolution` template:

Screenshot that shows template details for template named sample_issue_resolution.

The body of the template requires one text parameter:

```json
{
  "type": "BODY",
  "text": "Hi {{1}}, were we able to solve the issue that you were facing?"
},
```

The template includes two prefilled reply buttons, `Yes` and `No`.

```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "QUICK_REPLY",
      "text": "Yes"
    },
    {
      "type": "QUICK_REPLY",
      "text": "No"
    }
  ]
}
```

Create one `MessageTemplateText` and two `MessageTemplateQuickAction` variables. Then assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content. The order also matters when defining your bindings` buttons.

```python
# Setting template options
templateName = "sample_issue_resolution"
templateLanguage = "en_us" 
shippingConfirmationTemplate: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
name = MessageTemplateText(name="first", text="Joe")
yes = MessageTemplateQuickAction(name="Yes", payload="Joe said yes")
no = MessageTemplateQuickAction(name="No", payload = "Joe said no")
bindings = WhatsAppMessageTemplateBindings(body=[WhatsAppMessageTemplateBindingsComponent(ref_value=name.name)])
bindings.buttons = [WhatsAppMessageTemplateBindingsButton(sub_type=WhatsAppMessageButtonSubType.QUICK_REPLY, ref_value=yes.name),
                    WhatsAppMessageTemplateBindingsButton(sub_type=WhatsAppMessageButtonSubType.QUICK_REPLY, ref_value=no.name)]
shippingConfirmationTemplate.bindings = bindings
shippingConfirmationTemplate.template_values=[name,yes,no]
template_options = TemplateNotificationContent(
    channel_registration_id=self.channel_id, to=[self.phone_number], template=shippingConfirmationTemplate
)
```

### Send template message with location in the header

Use `MessageTemplateLocation` to define the location parameter in a header.

Template definition for header component requiring location as:

```json
{
  "type": "header",
  "parameters": [
    {
      "type": "location",
      "location": {
        "latitude": "<LATITUDE>",
        "longitude": "<LONGITUDE>",
        "name": "<NAME>",
        "address": "<ADDRESS>"
      }
    }
  ]
}
```

The `format` can require different media types. In the .NET SDK, each media type uses a corresponding `MessageTemplateValue` type.

| Properties | Description | Type |
| --- | --- | --- |
| `ADDRESS` | Address that appears after the `NAME` value, below the generic map at the top of the message. | string |
| `LATITUDE` | Location latitude. | double |
| `LONGITUDE` | Location longitude. | double |
| `LOCATIONNAME` | Text that appears immediately below the generic map at the top of the message. | string |

For more information about location based templates, see [WhatsApp's documentation for message media](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview). 

#### Example

`sample_movie_location` template:

Screenshot that shows template details for template named sample_location_template.

Location based message template assembly:

```python
 # Setting template options
        templateName = "sample_movie_location"
        templateLanguage = "en_us" 
        sample_movie_location: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
        name = MessageTemplateText(name="first", text="Joe")
        location = MessageTemplateLocation(name="location", location_name="Pablo Morales",
                                            address="1 Hacker Way, Menlo Park, CA 94025",
                                            latitude=37.483307,longitude=122.148981)
        bindings = WhatsAppMessageTemplateBindings(body=[WhatsAppMessageTemplateBindingsComponent(ref_value=name.name)],
                                                    header=[WhatsAppMessageTemplateBindingsComponent(ref_value=location.name)])
        sample_movie_location.bindings = bindings
        sample_movie_location.template_values=[name,location]
        template_options = TemplateNotificationContent(
            channel_registration_id=self.channel_id, to=[self.phone_number], template=sample_movie_location)
```

### Send template message with call to action buttons with dynamic link

Use `MessageTemplateQuickAction` to define the URL suffix for call to action buttons and `MessageTemplateQuickAction` object have the following two attributes.

| Properties | Description | Type |
| --- | --- | --- |
| Name | The `name` used to look up the value in `MessageTemplateWhatsAppBindings`. | string |
| Text | The `text` appended to the URL. | string |

Template definition buttons:
```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "URL",
      "text": "Take Survey",
      "url": "https://www.example.com/{{1}}"
    }
  ]
}
```

The order that the buttons appear in the template definition must match the order in which the buttons are defined when creating the bindings with `MessageTemplateWhatsAppBindings`.

#### Example

`sample_purchase_feedback` template:

This sample template adds a button with a dynamic URL link to the message. It also uses an image in the header and a text parameter in the body. Create call to action button templates with `Dynamic` URL type for `View website` action type.

Screenshot that shows editing URL Type in the WhatsApp manager.

In this sample, the header of the template requires an image:

```json
{
  "type": "HEADER",
  "format": "IMAGE"
},
```

The body of the template requires one text parameter:

```json
{
  "type": "BODY",
  "text": "Thank you for purchasing {{1}}! We value your feedback and would like to learn more about your experience."
},
```

The template includes a dynamic URL button with one parameter:

```json
{
  "type": "BUTTONS",
  "buttons": [
    {
      "type": "URL",
      "text": "Take Survey",
      "url": "https://www.example.com/{{1}}"
    }
  ]
}
```

Create one `MessageTemplateImage`, one `MessageTemplateText`, and one `MessageTemplateQuickAction` variable. Then assemble your list of `MessageTemplateValue` and your `MessageTemplateWhatsAppBindings` by providing the parameters in the order that the parameters appear in the template content. The order also matters when defining your bindings' buttons.

```python
# Setting template options
        templateName = "sample_purchase_feedback"
        templateLanguage = "en_us"
        imageUrl = "https://aka.ms/acsicon1" 
        sample_purchase_feedback: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
        name = MessageTemplateText(name="first", text="Joe")
        image = MessageTemplateImage(name="image", url=imageUrl)
        uri_to_click = MessageTemplateQuickAction(name="url", text="questions")

        bindings = WhatsAppMessageTemplateBindings(body=[WhatsAppMessageTemplateBindingsComponent(ref_value=name.name)],
                                                    header=[WhatsAppMessageTemplateBindingsComponent(ref_value=image.name)],
                                                    buttons=[WhatsAppMessageTemplateBindingsButton(sub_type=WhatsAppMessageButtonSubType.URL,
                                                    ref_value=uri_to_click.name)])
        sample_purchase_feedback.bindings = bindings
        sample_purchase_feedback.template_values=[name, image, uri_to_click]
        template_options = TemplateNotificationContent(
            channel_registration_id=self.channel_id, to=[self.phone_number], template=sample_purchase_feedback)
```

## Full example

```python
import os
import sys

sys.path.append("..")

class SendWhatsAppTemplateMessageSample(object):

    connection_string = os.getenv("COMMUNICATION_SAMPLES_CONNECTION_STRING")
    phone_number = os.getenv("RECIPIENT_PHONE_NUMBER")
    channel_id = os.getenv("WHATSAPP_CHANNEL_ID")

    def send_template_message_without_parameters(self):
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

    def send_template_message_with_parameters(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (TemplateNotificationContent, MessageTemplate,
        MessageTemplateText, WhatsAppMessageTemplateBindings, WhatsAppMessageTemplateBindingsComponent)

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        # Setting template options
        templateName = "sample_shipping_confirmation"
        templateLanguage = "en_us" 
        shippingConfirmationTemplate: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
        threeDays = MessageTemplateText(name="threeDays", text="3")
        bindings = WhatsAppMessageTemplateBindings(body=[WhatsAppMessageTemplateBindingsComponent(ref_value=threeDays.name)])
        shippingConfirmationTemplate.bindings = bindings
        shippingConfirmationTemplate.template_values=[threeDays]
        template_options = TemplateNotificationContent(
            channel_registration_id=self.channel_id, to=[self.phone_number], template=shippingConfirmationTemplate
        )

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(template_options)
        response = message_responses.receipts[0]
        print("WhatsApp text parameters Templated Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))

    def send_template_message_with_media(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (TemplateNotificationContent, MessageTemplate,
        MessageTemplateText, WhatsAppMessageTemplateBindings, WhatsAppMessageTemplateBindingsComponent,
        MessageTemplateImage)

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        # Setting template options
        templateName = "sample_movie_ticket_confirmation"
        templateLanguage = "en_us" 
        imageUrl = "https://aka.ms/acsicon1"
        sample_movie_ticket_confirmation: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
        image = MessageTemplateImage(name="image", url=imageUrl)
        title = MessageTemplateText(name="title", text="Contoso")
        time = MessageTemplateText(name="time", text="July 1st, 2023 12:30PM")
        venue = MessageTemplateText(name="venue", text="Southridge Video")
        seats = MessageTemplateText(name="seats", text="Seat 1A")

        bindings = WhatsAppMessageTemplateBindings(header=[WhatsAppMessageTemplateBindingsComponent(ref_value=image.name)],
                                                   body=[WhatsAppMessageTemplateBindingsComponent(ref_value=title.name),
                                                         WhatsAppMessageTemplateBindingsComponent(ref_value=time.name),
                                                         WhatsAppMessageTemplateBindingsComponent(ref_value=venue.name),
                                                         WhatsAppMessageTemplateBindingsComponent(ref_value=seats.name)])

        sample_movie_ticket_confirmation.bindings = bindings
        sample_movie_ticket_confirmation.template_values=[image,title,time,venue,seats]
        template_options = TemplateNotificationContent(
            channel_registration_id=self.channel_id, to=[self.phone_number], template=sample_movie_ticket_confirmation)

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(template_options)
        response = message_responses.receipts[0]
        print("WhatsApp media parameters in templated message header with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))

    def send_template_message_with_buttons(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (TemplateNotificationContent, MessageTemplate,
        MessageTemplateText, WhatsAppMessageTemplateBindings, WhatsAppMessageTemplateBindingsComponent,
        MessageTemplateQuickAction, WhatsAppMessageTemplateBindingsButton, WhatsAppMessageButtonSubType)

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        # Setting template options
        templateName = "sample_issue_resolution"
        templateLanguage = "en_us" 
        shippingConfirmationTemplate: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
        name = MessageTemplateText(name="first", text="Joe")
        yes = MessageTemplateQuickAction(name="Yes", payload="Joe said yes")
        no = MessageTemplateQuickAction(name="No", payload = "Joe said no")
        bindings = WhatsAppMessageTemplateBindings(body=[WhatsAppMessageTemplateBindingsComponent(ref_value=name.name)])
        bindings.buttons = [WhatsAppMessageTemplateBindingsButton(sub_type=WhatsAppMessageButtonSubType.QUICK_REPLY, ref_value=yes.name),
                            WhatsAppMessageTemplateBindingsButton(sub_type=WhatsAppMessageButtonSubType.QUICK_REPLY, ref_value=no.name)]
        shippingConfirmationTemplate.bindings = bindings
        shippingConfirmationTemplate.template_values=[name,yes,no]
        template_options = TemplateNotificationContent(
            channel_registration_id=self.channel_id, to=[self.phone_number], template=shippingConfirmationTemplate
        )

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(template_options)
        response = message_responses.receipts[0]
        print("WhatsApp Quick Button Templated Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))

    def send_template_message_with_location(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (TemplateNotificationContent, MessageTemplate,
        MessageTemplateText, WhatsAppMessageTemplateBindings, WhatsAppMessageTemplateBindingsComponent,
        MessageTemplateLocation)

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        # Setting template options
        templateName = "sample_movie_location"
        templateLanguage = "en_us" 
        sample_movie_location: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
        name = MessageTemplateText(name="first", text="Joe")
        location = MessageTemplateLocation(name="location", location_name="Pablo Morales",
                                            address="1 Hacker Way, Menlo Park, CA 94025",
                                            latitude=37.483307,longitude=122.148981)
        bindings = WhatsAppMessageTemplateBindings(body=[WhatsAppMessageTemplateBindingsComponent(ref_value=name.name)],
                                                    header=[WhatsAppMessageTemplateBindingsComponent(ref_value=location.name)])
        sample_movie_location.bindings = bindings
        sample_movie_location.template_values=[name,location]
        template_options = TemplateNotificationContent(
            channel_registration_id=self.channel_id, to=[self.phone_number], template=sample_movie_location)

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(template_options)
        response = message_responses.receipts[0]
        print("WhatsApp Location Templated Message with message id {} was successfully sent to {}"
            .format(response.message_id, response.to))

    def send_template_message_with_call_to_action(self):

        from azure.communication.messages import NotificationMessagesClient
        from azure.communication.messages.models import (TemplateNotificationContent, MessageTemplate,
        MessageTemplateText, WhatsAppMessageTemplateBindings, WhatsAppMessageTemplateBindingsComponent,
        MessageTemplateQuickAction, MessageTemplateImage, WhatsAppMessageTemplateBindingsButton,
        WhatsAppMessageButtonSubType)

        messaging_client = NotificationMessagesClient.from_connection_string(self.connection_string)

        # Setting template options
        templateName = "sample_purchase_feedback"
        templateLanguage = "en_us"
        imageUrl = "https://aka.ms/acsicon1" 
        sample_purchase_feedback: MessageTemplate = MessageTemplate(name=templateName, language=templateLanguage )
        name = MessageTemplateText(name="first", text="Joe")
        image = MessageTemplateImage(name="image", url=imageUrl)
        uri_to_click = MessageTemplateQuickAction(name="url", text="questions")

        bindings = WhatsAppMessageTemplateBindings(body=[WhatsAppMessageTemplateBindingsComponent(ref_value=name.name)],
                                                    header=[WhatsAppMessageTemplateBindingsComponent(ref_value=image.name)],
                                                    buttons=[WhatsAppMessageTemplateBindingsButton(sub_type=WhatsAppMessageButtonSubType.URL,
                                                                                                    ref_value=uri_to_click.name)])
        sample_purchase_feedback.bindings = bindings
        sample_purchase_feedback.template_values=[name, image, uri_to_click]
        template_options = TemplateNotificationContent(
            channel_registration_id=self.channel_id, to=[self.phone_number], template=sample_purchase_feedback)

        # calling send() with whatsapp message details
        message_responses = messaging_client.send(template_options)
        response = message_responses.receipts[0]
        print("WhatsApp Call To Action Templated Message with message id {} was successfully sent to {}"
        .format(response.message_id, response.to))

if __name__ == "__main__":
    sample = SendWhatsAppTemplateMessageSample()
    sample.send_template_message_without_parameters()
    sample.send_template_message_with_parameters()
    sample.send_template_message_with_buttons()
    sample.send_template_message_with_location()
    sample.send_template_message_with_call_to_action()
```

## Run the code

To run the code, make sure you are on the directory where your `messages-quickstart.py` file is.

```console
python messages-quickstart.py
```

```output
Azure Communication Services - Advanced Messages Quickstart
WhatsApp Templated Message with message id <<GUID>> was successfully sent to <<ToRecipient>>
```



## Next steps

-   [Do more with Advanced Messages SDK](get-started.md)
