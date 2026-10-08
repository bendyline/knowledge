---
title: Send an SMS message
titleSuffix: Azure Communication Services
description: This article describes how to send an SMS message using Azure Communication Services. See code examples in C#, JavaScript, Java, and Python.
author: sundiraman
manager: chpalm
services: azure-communication-services
ms.author: sundraman
ms.date: 05/25/2022
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: sms
ms.custom: tracking-python, devx-track-js, mode-other, kr2b-contr-experiment, devx-track-extended-java, devx-track-python
zone_pivot_groups: acs-azcli-js-csharp-java-python-logic-apps
---

# Send an SMS message


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> SMS capabilities depend on the phone number you use and the country/region that you're operating within as determined by your Azure billing address. For more information, see [Subscription eligibility](../../concepts/numbers/sub-eligibility-number-capability.md).

<!-- [!INCLUDE [Survey Request](../includes/survey-request.md)] -->

<br/>

>[!VIDEO https://www.youtube.com/embed/YEyxSZqzF4o]

**Applies to: platform-azcli**


Get started with Azure Communication Services by using the Communication module in Azure CLI to send SMS messages.

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- An SMS-enabled telephone number, short code, or alphanumeric sender ID. [Get a phone number](../telephony/get-phone-number.md).
- The latest [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli) version for your operating system.

### Prerequisite check

- In a terminal or command window, run `az --version` to check that Azure CLI is installed. 

## Setting up

### Install the communication module

To install the communication module, run the following command in a terminal or command window.

```azurecli-interactive
az extension add --name communication
```

### Sign in to Azure CLI

You need to [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal and providing your credentials.

### Make sure you're using the correct subscription

If you have multiple subscriptions in your account, make sure that you're using the correct one for this tutorial.

In a terminal or command windows, run the following command to check the current subscription.

```azurecli-interactive
az account show
```

If you need to change subscription, you can do that by running the following command.

```azurecli-interactive
az account set --subscription "<yourSubscriptionId>"
```

You need to replace `<yourSubscriptionId>` with your actual subscription ID, which you can find in the Subscriptions section in Azure portal.

### (Optional) Use Azure CLI sms operations without passing in a connection string

You can configure the `AZURE_COMMUNICATION_CONNECTION_STRING` environment variable to use Azure CLI sms operations without having to use `--connection_string` to pass in the connection string. To configure an environment variable, open a console window and select your operating system from the below tabs. Replace `<yourConnectionString>` with your actual connection string.

#### [Windows](#tab/windows)

Open a console window and enter the following command:

```console
setx AZURE_COMMUNICATION_CONNECTION_STRING "<yourConnectionString>"
```

After you add the environment variable, you may need to restart any running programs that will need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [macOS](#tab/unix)

Edit your **`.zshrc`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<yourConnectionString>"
```

After you add the environment variable, run `source ~/.zshrc` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell in order to access the variable.

#### [Linux](#tab/linux)

Edit your **`.bash_profile`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<yourConnectionString>"
```

After you add the environment variable, run `source ~/.bash_profile` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell in order to access the variable.

---

## Operations

## Send a 1:1 SMS message

To send an SMS message to a single recipient, call the `send` method from the sms module with a single recipient phone number. 

```azurecli-interactive
az communication sms send --sender "<fromPhoneNumber>" --recipient "<toPhoneNumber>" --message "Hello world via SMS for Azure CLI!" --connection-string "<yourConnectionString>"
```

Make these replacements in the code:

- Replace `<fromPhoneNumber>` with an SMS-enabled phone number associated with your Communication Services resource.
- Replace `<toPhoneNumber>` with a phone number that you'd like to send a message to.
- Replace `<yourConnectionString>` with your connection string.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123. The value for `<fromPhoneNumber>` can also be a short code, for example, 23456 or an alphanumeric sender ID, for example, CONTOSO.

## Send a 1:N SMS message

To send an SMS message to a list of recipients, call the `send` method from the sms module with multiple recipient phone numbers. 

```azurecli-interactive
az communication sms send --sender "<fromPhoneNumber>" --recipient "<toPhoneNumber1>" "<toPhoneNumber2>" "<toPhoneNumber3>" --message "Hello world via SMS for Azure CLI!" --connection-string "<yourConnectionString>"
```

Make these replacements in the code:

- Replace `<fromPhoneNumber>` with an SMS-enabled phone number associated with your Communication Services resource.
- Replace `<toPhoneNumberN>` with the N'th phone number that you'd like to send a message to.
- Replace `<yourConnectionString>` with your connection string.

> **Warning:**
> Provide phone numbers in E.164 international standard format, such as +14255550123. The value for `<fromPhoneNumber>` can also be a short code, such as 23456 or an alphanumeric sender ID, such as CONTOSO.

## Send an SMS message with DeliveryReport and Tag

```azurecli-interactive
az communication sms send --sender "<fromPhoneNumber>" --recipient "<toPhoneNumber>" --message "Hello world via SMS for Azure CLI!" --connection-string "<yourConnectionString>" --deliveryReport --tag "<yourCustomTag>"
```

The `deliveryReport` parameter is an optional parameter you can use to configure delivery reporting. Use this function if you want to emit events when SMS messages are delivered. See [Handle SMS Events](handle-sms-events.md) to configure delivery reporting for your SMS messages.

The `tag` parameter is an optional parameter that you can use to apply a tag to the delivery report.

Make these replacements in the code:

- Replace `<fromPhoneNumber>` with an SMS-enabled phone number associated with your Communication Services resource.
- Replace `<toPhoneNumber>` with a phone number that you'd like to send a message to.
- Replace `<yourConnectionString>` with your connection string.
- Replace `<yourCustomTag>` with your custom tag.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123. The value for `<fromPhoneNumber>` can also be a short code, for example, 23456 or an alphanumeric sender ID, for example, CONTOSO.




**Applies to: programming-language-csharp**


Get started with Azure Communication Services by using the Communication Services C# SMS SDK to send SMS messages.

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> See the finalized code at Azure Samples GitHub [Send an SMS message using .NET](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendSMS).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version of [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- An SMS-enabled telephone number, short code, or alphanumeric sender ID. [Get a phone number](../telephony/get-phone-number.md).

### Prerequisite check

- In a terminal or command window, run the `dotnet` command to check that the .NET SDK is installed.
- To view the phone numbers that are associated with your Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/) and locate your Communication Services resource. In the navigation pane on the left, select **Phone numbers**.

## Set up the application environment

To set up an environment for sending messages, take the steps in the following sections.

### Create a new C# application

1. In a console window, such as cmd, PowerShell, or Bash, use the `dotnet new` command to create a new console app with the name `SmsQuickstart`. This command creates a simple "Hello World" C# project with a single source file, **Program.cs**.

   ```console
   dotnet new console -o SmsQuickstart
   ```

1. Change your directory to the newly created app folder and use the `dotnet build` command to compile your application.

   ```console
   cd SmsQuickstart
   dotnet build
   ```

### Install the package

1. While still in the application directory, install the Azure Communication Services SMS SDK for .NET package by using the following command.

   ```console
   dotnet add package Azure.Communication.Sms --version 1.0.0
   ```

1. Add a `using` directive to the top of **Program.cs** to include the `Azure.Communication` namespace.

   ```csharp

   using System;
   using System.Collections.Generic;

   using Azure;
   using Azure.Communication;
   using Azure.Communication.Sms;

   ```

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services SMS SDK for C#.

| Name | Description |
| --- | --- |
| SmsClient | This class is needed for all SMS functionality. You instantiate it with your subscription information, and use it to send SMS messages. |
| SmsSendOptions | This class provides options for configuring delivery reporting. If enable_delivery_report is set to True, an event is emitted when delivery is successful. |
| SmsSendResult | This class contains the result from the SMS service. |

## Authenticate the client

Open **Program.cs** in a text editor and replace the body of the `Main` method with code to initialize an `SmsClient` with your connection string. The following code retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).


```csharp
// This code retrieves your connection string
// from an environment variable.
string connectionString = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING");

SmsClient smsClient = new SmsClient(connectionString);
```

## Send a 1:1 SMS message

To send an SMS message to a single recipient, call the `Send` or `SendAsync` function from the SmsClient. Add this code to the end of the `Main` method in **Program.cs**:

```csharp
SmsSendResult sendResult = smsClient.Send(
    from: "<from-phone-number>",
    to: "<to-phone-number>",
    message: "Hello World via SMS"
);

Console.WriteLine($"Sms id: {sendResult.MessageId}");
```

Make these replacements in the code:

- Replace `<from-phone-number>` with an SMS-enabled phone number associated with your Communication Services resource.
- Replace `<to-phone-number>` with the phone number that you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, such as +14255550123. The value for `<from-phone-number>` can also be a short code, such as 23456 or an alphanumeric sender ID, such as CONTOSO.

## Send a 1:N SMS message with options

To send an SMS message to a list of recipients, call the `Send` or `SendAsync` function from the SmsClient with a list of recipient phone numbers. You can also provide optional parameters to specify whether the delivery report should be enabled and to set custom tags.

```csharp
Response<IReadOnlyList<SmsSendResult>> response = smsClient.Send(
    from: "<from-phone-number>",
    to: new string[] { "<to-phone-number-1>", "<to-phone-number-2>" },
    message: "Weekly Promotion!",
    options: new SmsSendOptions(enableDeliveryReport: true) // OPTIONAL
    {
        Tag = "marketing", // custom tags
    });

IEnumerable<SmsSendResult> results = response.Value;
foreach (SmsSendResult result in results)
{
    Console.WriteLine($"Sms id: {result.MessageId}");
    Console.WriteLine($"Send Result Successful: {result.Successful}");
}
```

Make these replacements in the code:

- Replace `<from-phone-number>` with an SMS-enabled phone number associated with your Communication Services resource.
- Replace `<to-phone-number-1>` and `<to-phone-number-2>` with phone numbers that you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, such as +14255550123. The value for `<from-phone-number>` can also be a short code, such as 23456 or an alphanumeric sender ID, such as CONTOSO.

The `enableDeliveryReport` parameter is an optional parameter that you can use to configure delivery reporting. This functionality is useful when you want to emit events when SMS messages are delivered. See the [Handle SMS Events](handle-sms-events.md) quickstart to configure delivery reporting for your SMS messages.

You can use the `Tag` parameter to apply a tag to the delivery report.

## Send SMS globally with Messaging Connect

> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> Preview APIs and SDKs are provided without a service-level agreement. We recommend that you don't use them for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


If you're using a phone number provisioned via Messaging Connect, you can send SMS messages using the standard Azure Communication Services SDK. The only difference is that you must include the `MessagingConnect` object to specify the partner name and API key.

```csharp
Response<IReadOnlyList<SmsSendResult>> response = smsClient.Send(
    from: "<from-messaging-connect-number>",
    to: new string[] { "<to-phone-number-1>", "<to-phone-number-2>" },
    message: "Weekly Promotion!",
    options: new SmsSendOptions(enableDeliveryReport: true) // OPTIONAL
    {
        Tag = "marketing", // custom tags
        MessagingConnect = new MessagingConnectOptions("<partner-api-key>", "infobip")
    });

IEnumerable<SmsSendResult> results = response.Value;
foreach (SmsSendResult result in results)
{
    Console.WriteLine($"Sms id: {result.MessageId}");
    Console.WriteLine($"Send Result Successful: {result.Successful}");
}
```
Replace these values:

- `<from-messaging-connect-number>`: The phone number acquired through Messaging Connect and linked to your ACS resource.
- `<to-phone-number-1>` and `<to-phone-number-2>`: The recipient phone numbers.
- `<partner-api-key>`: The API key from your Messaging Connect partner (e.g., Infobip).

> **Tip:**
> Want to learn more about global messaging? Check out the [Messaging Connect page](../../concepts/sms/messaging-connect.md)

> **Warning:**
> Phone numbers must follow the E.164 international standard format (for example, +14255550123). The `<rom-messaging-connect-number>` must be a Messaging Connect number or a Dynamic Alpha Sender ID (for example, CONTOSO) already provisioned and synced to your ACS resource.

The `enableDeliveryReport` parameter is an optional parameter that you can use to configure delivery reporting. This functionality is useful when you want to emit events when SMS messages are delivered. See the [Handle SMS Events](handle-sms-events.md) quickstart to configure delivery reporting for your SMS messages. You can use the `Tag` parameter to apply a tag to the delivery report.

## Run the code

Run the application from your application directory with the `dotnet run` command.

```console
dotnet run
```

## Sample code

Download the sample app from Azure Samples GitHub [Send an SMS message using .NET](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendSMS).



**Applies to: programming-language-javascript**


Get started with Azure Communication Services using the Communication Services JavaScript SMS SDK to send SMS messages.

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> See the finalized code Azure Samples GitHub [Send an SMS message using JavaScript](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/send-sms).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Node.js](https://nodejs.org/) Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 are recommended).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- An SMS-enabled telephone number, short code, or alphanumeric sender ID. [Get a phone number](../telephony/get-phone-number.md).

### Prerequisite check

- In a terminal or command window, run `node --version` to check that Node.js is installed.
- To view the phone numbers that are associated with your Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/) and locate your Communication Services resource. In the navigation pane on the left, select **Phone numbers**.

## Set up the application environment

To set up an environment for sending messages, take the steps in the following sections.

### Create a new Node.js application

1. Open your terminal or command window, and then run the following command to create a new directory for your app and navigate to it.

   ```console
   mkdir sms-quickstart && cd sms-quickstart
   ```

1. Run the following command to create a **package.json** file with default settings.

   ```console
   npm init -y
   ```

1. Use a text editor to create a file called **send-sms.js** in the project root directory.

In the following sections, add all the source code for this quickstart to the **send-sms.js** file that you created.

### Install the package

Use the `npm install` command to install the Azure Communication Services SMS SDK for JavaScript.

```console
npm install @azure/communication-sms --save
```

The `--save` option lists the library as a dependency in your **package.json** file.

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services SMS SDK for Node.js.

| Name | Description |
| --- | --- |
| SmsClient | This class is needed for all SMS functionality. You instantiate it with your subscription information, and use it to send SMS messages. |
| SmsSendRequest | This interface is the model for building the SMS request. You use it to configure the to and from phone numbers and the SMS content. |
| SmsSendOptions | This interface provides options for configuring delivery reporting. If `enableDeliveryReport` is set to `true`, an event is emitted when delivery is successful. |
| SmsSendResult | This class contains the result from the SMS service. |

## Authenticate the client

To authenticate a client, you import the **SmsClient** from the SDK and instantiate it with your connection string. You can retrieve the connection string for the resource from an environment variable. For instance, the code in this section retrieves the connection string from the `COMMUNICATION_SERVICES_CONNECTION_STRING` environment variable. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).

To import the client and instantiate it:

1. Create a file named **send-sms.js**.

1. Add the following code to **send-sms.js**.

```javascript
const { SmsClient } = require('@azure/communication-sms');

// This code retrieves your connection string
// from an environment variable.
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];

// Instantiate the SMS client.
const smsClient = new SmsClient(connectionString);
```

## Send a 1:N SMS message

To send an SMS message to a list of recipients, call the `send` function from the SmsClient with a list of recipient phone numbers. If you'd like to send a message to a single recipient, include only one number in the list. Add this code to the end of **send-sms.js**:

```javascript
async function main() {
  const sendResults = await smsClient.send({
    from: "<from-phone-number>",
    to: ["<to-phone-number-1>", "<to-phone-number-2>"],
    message: "Hello World 👋🏻 via SMS"
  });

  // Individual messages can encounter errors during sending.
  // Use the "successful" property to verify the status.
  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }
}

main();
```

Make these replacements in the code:

- Replace `<from-phone-number>` with an SMS-enabled phone number associated with your Communication Services resource.
- Replace `<to-phone-number-1>` and `<to-phone-number-2>` with the phone numbers that you want to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123. The value for `<from-phone-number>` can also be a short code, for example, 23456 or an alphanumeric sender ID, for example, CONTOSO.

## Send a 1:N SMS message with options

You can also provide an options object to specify whether the delivery report should be enabled and to set custom tags.

```javascript

async function main() {
  const sendResults = await smsClient.send({
    from: "<from-phone-number>",
    to: ["<to-phone-number-1>", "<to-phone-number-2>"],
    message: "Weekly Promotion!"
  }, {
    // Optional parameters
    enableDeliveryReport: true,
    tag: "marketing"
  });

  // Individual messages can encounter errors during sending.
  // Use the "successful" property to verify the status.
  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }
}

main();
```

Make these replacements in the code:

- Replace `<from-phone-number>` with an SMS-enabled phone number associated with your Communication Services resource.
- Replace `<to-phone-number-1>` and `<to-phone-number-2>` with phone numbers that you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123. The value for `<from-phone-number>` can also be a short code, for example, 23456 or an alphanumeric sender ID, for example, CONTOSO.

The `enableDeliveryReport` parameter is an optional parameter that you can use to configure delivery reporting. This functionality is useful when you want to emit events when SMS messages are delivered. See the [Handle SMS Events](handle-sms-events.md) quickstart to configure delivery reporting for your SMS messages.
The `tag` parameter is optional. You can use it to apply a tag to the delivery report.

## Send SMS globally with Messaging Connect

> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> Preview APIs and SDKs are provided without a service-level agreement. We recommend that you don't use them for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


If you're using a phone number provisioned via Messaging Connect, you can send SMS messages using the standard Azure Communication Services JavaScript SDK. The only difference is that you must include the `messagingConnect` object to specify the partner name and API key.

```javascript
async function main() {
  const sendResults = await smsClient.send({
    from: "<from-messaging-connect-number>",
    to: ["<to-phone-number-1>", "<to-phone-number-2>"],
    message: "Weekly Promotion!"
  }, {
    // Optional parameters
    enableDeliveryReport: true,
    tag: "marketing", // custom tag
    messagingConnect: {
      apiKey: "<partner-api-key>",
      partner: "infobip"
    }
  });

  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success:", sendResult);
    } else {
      console.error("Failed to send message:", sendResult);
    }
  }
}

main();
``` 
Replace these values:

- `<from-messaging-connect-number>`: The phone number acquired through Messaging Connect and linked to your ACS resource.
- `<to-phone-number-1>` and `<to-phone-number-2>`: The recipient phone numbers.
- `<partner-api-key>`: The API key from your Messaging Connect partner (for example, Infobip).

> **Tip:**
> Want to learn more about global messaging? Check out the [Messaging Connect page](../../concepts/sms/messaging-connect.md)

> **Warning:**
> Phone numbers must follow the E.164 international standard format (for example, +14255550123). The `<from-messaging-connect-number>` must be a Messaging Connect number or a Dynamic Alpha Sender ID (for example, CONTOSO) already provisioned and synced to your ACS resource.

The `enableDeliveryReport` parameter allows you to configure delivery reporting. The `tag` parameter is optional and lets you apply a custom tag to the delivery report. To configure SMS delivery reporting, see the [Handle SMS Events](handle-sms-events.md) quickstart.


## Run the code

Use the `node` command to run the code that you added to the **send-sms.js** file.

```console

node ./send-sms.js

```



**Applies to: programming-language-python**


Get started with Azure Communication Services by using the Communication Services Python SMS SDK to send SMS messages.

Completing this quickstart incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> For the finalized code for this article, see GitHub Azure Samples [Manage phone numbers using Python](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/send-sms-quickstart).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python](https://www.python.org/downloads/) 3.7+.
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- An SMS-enabled telephone number, short code, or alphanumeric sender ID. [Get a phone number](../telephony/get-phone-number.md).

### Prerequisite check

- In a terminal or command window, run the `python --version` command to check that Python is installed.
- To view the phone numbers that are associated with your Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/) and locate your Communication Services resource. In the navigation pane on the left, select **Phone numbers**.

## Set up the application environment

To set up an environment for sending messages, complete the following sections.

### Create a new Python application

1. Open your terminal or command window. Use the following command to create a new directory for your app and navigate to it.

   ```console
   mkdir sms-quickstart && cd sms-quickstart
   ```

1. Use a text editor to create a file called **send-sms.py** in the project root directory and add the structure for the program, including basic exception handling.

   ```python
   import os
   from azure.communication.sms import SmsClient

   try:
       # Quickstart code goes here.
   except Exception as ex:
       print('Exception:')
       print(ex)
   ```

In the following sections, add all the source code for this quickstart to the **send-sms.py** file that you created.

### Install the package

While still in the application directory, install the Azure Communication Services SMS SDK for Python package by using the following command.

```console
pip install azure-communication-sms
```

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services SMS SDK for Python.

| Name | Description |
| --- | --- |
| SmsClient | This class is needed for all SMS functionality. Instantiate it with your subscription information, and use it to send SMS messages. |
| SmsSendResult | This class contains the result from the SMS service. |

## Authenticate the client

Instantiate an **SmsClient** with your connection string. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).

```python
# Create the SmsClient object that you use to send SMS messages.
sms_client = SmsClient.from_connection_string(<connection_string>)
```
For simplicity, this quickstart uses connection strings, but in production environments, we recommend using [service principals](../identity/service-principal.md).

## Send a 1:1 SMS message

To send an SMS message to a single recipient, call the `send` method from the **SmsClient** with a single recipient phone number. You can also provide optional parameters to specify whether the delivery report should be enabled and to set custom tags. Add this code to the end of the `try` block in **send-sms.py**:

```python

# Call send() with SMS values.
sms_responses = sms_client.send(
    from_="<from-phone-number>",
    to="<to-phone-number>",
    message="Hello World via SMS",
    enable_delivery_report=True, # optional property
    tag="custom-tag") # optional property

```

Make these replacements in the code:

- Replace `<from-phone-number>` with an SMS-enabled phone number associated with your communication service.
- Replace `<to-phone-number>` with the phone number that you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123. The value for `<from-phone-number>` can also be a short code, for example, 23456 or an alphanumeric sender ID, for example, CONTOSO.

## Send a 1:N SMS message

To send an SMS message to a list of recipients, call the `send` method from the **SmsClient** with a list of recipient phone numbers. You can also provide optional parameters to specify whether the delivery report should be enabled and to set custom tags. Add this code to the end of the `try` block in **send-sms.py**:

```python

# Call send() with SMS values.
sms_responses = sms_client.send(
    from_="<from-phone-number>",
    to=["<to-phone-number-1>", "<to-phone-number-2>"],
    message="Hello World via SMS",
    enable_delivery_report=True, # optional property
    tag="custom-tag") # optional property

```

Make these replacements in the code:

- Replace `<from-phone-number>` with an SMS-enabled phone number associated with your communication service.
- Replace `<to-phone-number-1>` and `<to-phone-number-2>` with phone numbers that you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, such as +14255550123. The value for `<from-phone-number>` can also be a short code, such as 23456 or an alphanumeric sender ID, such as CONTOSO.

## Optional parameters

The `enable_delivery_report` parameter is an optional parameter you can use to configure delivery reporting. Use this function if you want to emit events when SMS messages are delivered. See [Handle SMS Events](handle-sms-events.md) to configure delivery reporting for your SMS messages.

The `tag` parameter is an optional parameter that you can use to apply a tag to the delivery report.

## Run the code

Run the application from your application directory with the `python` command.

```console
python send-sms.py
```

The complete Python script should look something like the following code:

```python

import os
from azure.communication.sms import SmsClient

try:
    # Create the SmsClient object that you use to send SMS messages.
    sms_client = SmsClient.from_connection_string("<connection string>")
    # Call send() with SMS values.
    sms_responses = sms_client.send(
       from_="<from-phone-number>",
       to="<to-phone-number>",
       message="Hello World via SMS",
       enable_delivery_report=True, # optional property
       tag="custom-tag") # optional property

except Exception as ex:
    print('Exception:')
    print(ex)
```



**Applies to: programming-language-java**


Get started with Azure Communication Services by using the Communication Services Java SMS SDK to send SMS messages.

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> See the finalized code Azure Samples GitHub [Send an SMS message using Java](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/send-sms-quickstart).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/) version 8 or later.
- [Apache Maven](https://maven.apache.org/download.cgi).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- An SMS-enabled telephone number, short code, or alphanumeric sender ID. [Get a phone number](../telephony/get-phone-number.md).

### Prerequisite check

- In a terminal or command window, run `mvn -v` to check that Maven is installed.
- To view the phone numbers that are associated with your Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/) and locate your Communication Services resource. In the navigation pane on the left, select **Phone numbers**.

## Set up the application environment

To set up an environment for sending messages, complete the following sections.

### Create a new Java application

Open a terminal or command window and navigate to the directory where you want to create your Java application. To generate the Java project from the maven-archetype-quickstart template, run the following command.

- **Command Prompt**

```console
mvn archetype:generate -DgroupId=com.communication.quickstart -DartifactId=communication-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

- **PowerShell**

```PowerShell
mvn archetype:generate "-DgroupId=com.communication.quickstart" "-DartifactId=communication-quickstart" "-DarchetypeArtifactId=maven-archetype-quickstart" "-DarchetypeVersion=1.4" "-DinteractiveMode=false"
```

The `generate` goal creates a directory with the same name as the `artifactId` value. Under this directory, the **src/main/java** directory contains the project source code, the **src/test/java directory** contains the test source, and the **pom.xml** file is the project's Project Object Model (POM).

### Install the package

Open the **pom.xml** file in your text editor. Add the following dependency element to the group of dependencies.

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-sms</artifactId>
    <version>1.0.1</version>
</dependency>
```

### Set up the app framework

Open **/src/main/java/com/communication/quickstart/App.java** in a text editor, add import directives, and remove the `System.out.println("Hello world!");` statement:

```java
package com.communication.quickstart;

import com.azure.communication.sms.models.*;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.communication.sms.*;
import com.azure.core.util.Context;
import java.util.Arrays;

public class App
{
    public static void main( String[] args )
    {
        // Quickstart code goes here.
    }
}
```

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services SMS SDK for Java.

| Name | Description |
| --- | --- |
| SmsClientBuilder | This class creates the SmsClient. You provide it with an endpoint, a credential, and an HTTP client. |
| SmsClient | This class is needed for all SMS functionality. You use it to send SMS messages. |
| SmsSendOptions | This class provides options to add custom tags and configure delivery reporting. If deliveryReportEnabled is set to true, an event is emitted when delivery is successful. |
| SmsSendResult | This class contains the result from the SMS service. |

## Authenticate the client

To authenticate a client, you instantiate an `SmsClient` with your connection string. For the credential, use the `Key` from the Azure portal. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string). You can also initialize the client with any custom HTTP client that implements the `com.azure.core.http.HttpClient` interface.

To instantiate a client, add the following code to the `main` method:

```java
// You can get your endpoint and access key from your resource in the Azure portal.
String endpoint = "https://<resource-name>.communication.azure.com/";
AzureKeyCredential azureKeyCredential = new AzureKeyCredential("<access-key-credential>");

SmsClient smsClient = new SmsClientBuilder()
                .endpoint(endpoint)
                .credential(azureKeyCredential)
                .buildClient();
```

You can also provide the entire connection string by using the `connectionString` function instead of providing the endpoint and access key.
```java
// You can get your connection string from your resource in the Azure portal.
String connectionString = "endpoint=https://<resource-name>.communication.azure.com/;accesskey=<access-key>";

SmsClient smsClient = new SmsClientBuilder()
            .connectionString(connectionString)
            .buildClient();
```

## Send a 1:1 SMS message

To send an SMS message to a single recipient, call the `send` method from the SmsClient with a single recipient phone number. You can also provide optional parameters to specify whether the delivery report should be enabled and to set custom tags.

```java
SmsSendResult sendResult = smsClient.send(
                "<from-phone-number>",
                "<to-phone-number>",
                "Weekly Promotion");

System.out.println("Message Id: " + sendResult.getMessageId());
System.out.println("Recipient Number: " + sendResult.getTo());
System.out.println("Send Result Successful:" + sendResult.isSuccessful());
```

Make these replacements in the code:

- Replace `<from-phone-number>` with an SMS-enabled phone number associated with your Communication Services resource.
- Replace `<to-phone-number>` with a phone number that you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, such as +14255550123. The value for `<from-phone-number>` can also be a short code, such as 23456 or an alphanumeric sender ID, such as CONTOSO.

## Send a 1:N SMS message with options

To send an SMS message to a list of recipients, call the `send` method with a list of recipient phone numbers. You can also provide optional parameters to specify whether the delivery report should be enabled and to set custom tags.

```java
SmsSendOptions options = new SmsSendOptions();
options.setDeliveryReportEnabled(true);
options.setTag("Marketing");

Iterable<SmsSendResult> sendResults = smsClient.sendWithResponse(
    "<from-phone-number>",
    Arrays.asList("<to-phone-number1>", "<to-phone-number2>"),
    "Weekly Promotion",
    options /* Optional */,
    Context.NONE).getValue();

for (SmsSendResult result : sendResults) {
    System.out.println("Message Id: " + result.getMessageId());
    System.out.println("Recipient Number: " + result.getTo());
    System.out.println("Send Result Successful:" + result.isSuccessful());
}
```

Make these replacements in the code:

- Replace `<from-phone-number>` with an SMS-enabled phone number associated with your Communication Services resource
- Replace `<to-phone-number-1>` and `<to-phone-number-2>` with phone numbers that you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123. The value for `<from-phone-number>` can also be a short code, for example, 23456 or an alphanumeric sender ID, for example, CONTOSO.

The `setDeliveryReportEnabled` method is used to configure delivery reporting. This functionality is useful when you want to emit events when SMS messages are delivered. See the [Handle SMS Events](handle-sms-events.md) quickstart to configure delivery reporting for your SMS messages.

To apply a tag to the delivery report, use the `setTag` method.

## Run the code

1. Navigate to the directory that contains the **pom.xml** file and compile the project using the `mvn` command.

   ```console

   mvn compile

   ```

1. Build the package.

   ```console

   mvn package

   ```

1. Run the following `mvn` command to execute the app.

   - **Command Prompt**

   ```console

   mvn exec:java -Dexec.mainClass="com.communication.quickstart.App" -Dexec.cleanupDaemonThreads=false

   ```
   
   - **PowerShell**
   
   ```PowerShell
   mvn exec:java "-Dexec.mainClass=com.communication.quickstart.App" "-Dexec.cleanupDaemonThreads=false"
   ```



**Applies to: programming-language-power-platform**


Use the [Azure Communication Services SMS](../../overview.md) connector and [Azure Logic Apps](../../../logic-apps/logic-apps-overview.md) to create automated workflows that can send SMS messages.

This article describes how to automatically send text messages in response to a trigger event, which is the first step in a logic app workflow. A trigger event can be an incoming email message, a recurrence schedule, an [Azure Event Grid](../../../event-grid/overview.md) resource event, or any other [trigger supported by Azure Logic Apps](https://learn.microsoft.com/connectors/connector-reference/connector-reference-logicapps-connectors).

Screenshot that shows the Azure portal open to the Logic App Designer. Azure portal shows an example logic app that uses the Send SMS action for the Azure Communication Services connector.

Although this article focuses on using the connector to respond to a trigger, you can also use the connector to respond to other actions, which are the steps that follow the trigger in a workflow. If you're new to Logic Apps, see [What is Azure Logic Apps](../../../logic-apps/logic-apps-overview.md) before you get started.

> **Note:**
> Completing this article incurs a small cost of a few USD cents or less in your Azure account.

## Prerequisites

- An Azure account with an active subscription, or [create an Azure account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An active Azure Communication Services resource, or [create a Communication Services resource](../create-communication-resource.md).

- An active Logic Apps resource (logic app), or [create a blank logic app but with the trigger that you want to use](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/quickstart-create-first-logic-app-workflow.md). Currently, the Azure Communication Services SMS connector provides only actions, so your logic app requires a trigger, at minimum.

  This quickstart uses the **When a new email arrives** trigger, which is available with the [Office 365 Outlook connector](https://learn.microsoft.com/connectors/office365/).

- An SMS-enabled telephone number, short code, or alphanumeric sender ID. [Get a phone number](../telephony/get-phone-number.md).

> **Important:**
> SMS and PSTN capabilities depend on the phone number you use and the country/region that you're operating within as determined by your Azure billing address. For more information, visit the [Subscription eligibility](../../concepts/numbers/sub-eligibility-number-capability.md) documentation.


## Add an SMS action

To add the **Send SMS** action as a new step in your workflow by using the Azure Communication Services SMS connector, follow these steps in the [Azure portal](https://portal.azure.com) with your logic app workflow open in the Logic App Designer:

1. On the designer, under the step where you want to add the new action, select **New step**. Alternatively, to add the new action between steps, move your pointer over the arrow between those steps, select the plus sign (**+**), and select **Add an action**.

1. In the **Choose an operation** search box, enter `Azure Communication Services`. From the actions list, select **Send SMS**.

   Screenshot that shows the Logic App Designer and the Azure Communication Services connector with the Send SMS action selected.

1. Now create a connection to your Communication Services resource.
    1. Within the same subscription:

       1. Provide a name for the connection.

       1. Select your Azure Communication Services resource.

       1. Select **Create**.

       Screenshot that shows the Send SMS action configuration with sample information.

    1. Using the connection string from your Communication Services resource:
        
        1. Provide a name for the connection.
        
        1. Select ConnectionString Authentication from the dropdown options.
        
        1. Enter the connection string of your Communication Services resource.
        
        1. Select **Create**.
        
        Screenshot that shows the Connection String Authentication configuration.
        
    1. Using Service Principal ([Refer Services Principal Creation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/service-principal-from-cli.md)):
        1. Provide a name for the connection.
        
        1. Select Service principal (Microsoft Entra application) Authentication from the dropdown options.
        
        1. Enter the Tenant ID, Client ID & Client Secret of your Service Principal.
        
        1. Enter the Communication Services Endpoint URL value of your Communication Services resource.
        
        1. Select **Create**.
        
        Screenshot that shows the Service Principal Authentication configuration.

1. In the **Send SMS** action, provide the following information: 

   * The source and destination phone numbers. For testing purposes, you can use your own phone number as the destination phone number.

   * The message content that you want to send, for example, "Hello from Logic Apps!".

   Here's a **Send SMS** action with example information:

   Screenshot that shows the Send SMS action with sample information.

1. When you're done, on the designer toolbar, select **Save**.

Next, run your workflow for testing.

## Test your workflow

To manually start your workflow, on the designer toolbar, select **Run**. Or, you can wait for the trigger to fire. In both cases, the workflow should send an SMS message to your specified destination phone number. For more information, review [how to run your workflow](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/quickstart-create-first-logic-app-workflow.md#run-workflow).

## Clean up workflow resources

To clean up your logic app workflow and related resources, review [how to clean up Logic Apps resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/quickstart-create-first-logic-app-workflow.md#clean-up-resources).



## Troubleshooting

To troubleshoot issues related to SMS delivery, you can [enable delivery reporting with Event Grid](handle-sms-events.md) to capture delivery details.

## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../create-communication-resource.md#clean-up-resources).

## Toll-free verification

To use a new toll-free number for sending SMS messages, you must complete a toll-free verification process. For guidance on how to complete the verification of your toll-free number, see the [Quickstart for submitting a toll-free verification](apply-for-toll-free-verification.md). Only fully verified toll-free numbers are authorized to send out SMS traffic. Any SMS traffic from unverified toll-free numbers directed to US and CA phone numbers are blocked.

## Next steps

This article described how to send SMS messages using Azure Communication Services.

> 
> [Receive and reply to SMS](receive-sms.md)

> 
> [Enable SMS analytics](../../concepts/analytics/insights/sms-insights.md)

> 
> [Phone number types](../../concepts/telephony/plan-solution.md)

> 
> [Look up operator information for a phone number](../telephony/number-lookup.md)
