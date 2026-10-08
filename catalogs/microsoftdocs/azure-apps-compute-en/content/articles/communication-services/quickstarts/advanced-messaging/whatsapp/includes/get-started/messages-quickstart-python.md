
## Prerequisites

- [WhatsApp Business Account registered with your Azure Communication Services resource](../../connect-whatsapp-business-account.md).

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

For more information on connection strings, see [access-your-connection-strings-and-service-endpoints](../../../../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

#### [Connection String](#tab/connection-string)

Get Azure Communication Resource connection string from Azure portal as given in screenshot. On the left, navigate to the `Keys` tab. Copy the `Connection string` field for the primary key. The connection string is in the format `endpoint=https://{your Azure Communication Services resource name}.communication.azure.com/;accesskey={secret key}`.

Screenshot that shows an Azure Communication Services resource in the Azure portal, viewing the 'Primary Key' field in the 'Keys' section.

Set the environment variable `COMMUNICATION_SERVICES_CONNECTION_STRING` to the value of your connection string.   
Open a console window and enter the following command:
```console
setx COMMUNICATION_SERVICES_CONNECTION_STRING "<your connection string>"
```
After you add the environment variable, you might need to restart any running programs that will need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

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
1. To set up your service principle app, follow the instructions at [Creating a Microsoft Entra registered Application](../../../../identity/service-principal.md?pivots=platform-azcli#creating-a-microsoft-entra-registered-application).

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

For more information on how to set an environment variable for your system, follow the steps at [Store your connection string in an environment variable](../../../../create-communication-resource.md#store-your-connection-string-in-an-environment-variable).

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

You created the Channel Registration ID GUID during [channel registration](../../connect-whatsapp-business-account.md). Find it in the portal on the **Channels** tab of your Azure Communication Services resource.

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

For more information about BSUIDs, see [WhatsApp usernames and BSUIDs](../../../../../concepts/advanced-messaging/whatsapp/whatsapp-username-support-overview.md).

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


## Original source metadata

```text
---
title: Include file
description: Include file
services: azure-communication-services
author: shamkh
manager: camilo.ramirez
ms.service: azure-communication-services
ms.subservice: azure-communication-services
ms.subservice: advanced-messaging
ms.date: 02/20/2024
ms.topic: include
ms.author: shamkh
ms.custom:
  - Include file
  - sfi-ropc-nochange
---
```
