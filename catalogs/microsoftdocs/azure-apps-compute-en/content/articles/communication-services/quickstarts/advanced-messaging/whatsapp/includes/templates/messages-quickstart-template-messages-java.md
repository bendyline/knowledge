---
title: Include file
description: Include file
services: azure-communication-services
author: arifibrahim4
ms.service: azure-communication-services
ms.subservice: advanced-messaging
ms.date: 12/29/2024
ms.topic: include
ms.custom: include file
ms.author: armohamed
---

## Prerequisites

- [Register WhatsApp Business Account with your Azure Communication Services resource](../../connect-whatsapp-business-account.md).
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

For simplicity, this article uses a connection string to authenticate. In production environments, we recommend using [service principals](../../../../identity/service-principal.md).

Get the connection string from your Azure Communication Services resource in the Azure portal. On the left, navigate to the `Keys` tab. Copy the `Connection string` field for the `Primary key`. The connection string is in the format `endpoint=https://{your Azure Communication Services resource name}.communication.azure.com/;accesskey={secret key}`.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Connection string' field in the 'Primary key' section.

Set the environment variable `COMMUNICATION_SERVICES_CONNECTION_STRING` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_CONNECTION_STRING "<your connection string>"
```

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

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
1. To set up your service principle app, follow the instructions at [Creating a Microsoft Entra registered Application](../../../../identity/service-principal.md?pivots=platform-azcli#creating-a-microsoft-entra-registered-application).

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

For more information about BSUIDs, see [WhatsApp usernames and BSUIDs](../../../../../concepts/advanced-messaging/whatsapp/whatsapp-username-support-overview.md).


## Set up environment
To set up an environment for sending messages, complete the steps in the following sections.

### Prerequisite
- [WhatsApp Business Account registered with your Azure Communication Services resource](../../connect-whatsapp-business-account.md).
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
