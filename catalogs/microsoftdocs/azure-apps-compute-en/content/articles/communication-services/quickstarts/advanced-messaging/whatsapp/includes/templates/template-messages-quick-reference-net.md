---
title: Include file
description: Include file
services: azure-communication-services
author: glorialimicrosoft
ms.service: azure-communication-services
ms.subservice: advanced-messaging
ms.date: 02/02/2024
ms.topic: include
ms.custom: include file
ms.author: memontic
---

## Prerequisites

- [Register WhatsApp Business Account with your Azure Communication Services resource](../../connect-whatsapp-business-account.md).
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
