---
title: Use the email object model to send the email payload using Azure Communication Service
titleSuffix: An Azure Communication Services Quickstart
description: Learn how to use the email object model to send the email payload using Azure Communication Services.
author: natekimball-msft
manager: koagbakp
services: azure-communication-services
ms.author: natekimball
ms.date: 04/07/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: devx-track-dotnet
---

# Use the email object model to send the email payload


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to use the email object model to send the email payload using our Email SDKs.


Get started with Azure Communication Services by using the Communication Services .NET Email client library to send Email messages.

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

> **Tip:**
> Jump-start your email sending experience with Azure Communication Services using GitHub Azure Samples [Basic Email Sending](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendEmail) and [Advanced Email Sending](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendEmailAdvanced).

## Understand the Email Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Email Client library for C#.


| Name | Description |
| --- | --- |
| EmailAddress | This class contains an email address and an option for a display name. |
| EmailAttachment | This class creates an email attachment by accepting a unique ID, email attachment [MIME type](../../../concepts/email/email-attachment-allowed-mime-types.md) string, binary data for content, and an optional content ID to define it as an inline attachment. |
| EmailClient | This class is needed for all email functionality. You instantiate it with your connection string and use it to send email messages. |
| EmailClientOptions | This class can be added to the EmailClient instantiation to target a specific API version. |
| EmailContent | This class contains the subject and the body of the email message. You have to specify at least one of PlainText or Html content |
| EmailCustomHeader | This class allows for the addition of a name and value pair for a custom header. Email importance can also be specified through these headers using the header name 'x-priority' or 'x-msmail-priority' |
| EmailMessage | This class combines the sender, content, and recipients. Custom headers, attachments, and reply-to email addresses can optionally be added, as well. |
| EmailRecipients | This class holds lists of EmailAddress objects for recipients of the email message, including optional lists for CC & BCC recipients. |
| EmailSendOperation | This class represents the asynchronous email send operation and is returned from email send API call. |
| EmailSendResult | This class holds the results of the email send operation. It has an operation ID, operation status, and error object (when applicable). |


EmailSendResult returns the following status on the email operation performed.


| Status | Description |
| --- | --- |
| NotStarted | We're not sending this status from our service at this time. |
| Running | The email send operation is currently in progress and being processed. |
| Succeeded | The email send operation completed without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](../handle-email-events.md) |
| Failed | The email send operation wasn't successful and encountered an error. The email wasn't sent. The result contains an error object with more details on the reason for failure. |

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version [.NET Core client library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- An Azure Email Communication Services Resource created and ready with a provisioned domain [Get started with Creating Email Communication Resource](../create-email-communication-resource.md)
- An active Communication Services resource connected with Email Domain and a Connection String. [Get started by Connecting Email Resource with a Communication Resource](../connect-email-communication-resource.md)

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> We can also send an email from our own verified domain. [Add custom verified domains to Email Communication Service](../add-azure-managed-domains.md).

### Prerequisite check

- In a terminal or command window, run the `dotnet` command to check that the .NET client library is installed.
- To view the subdomains associated with your Email Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/), locate your Email Communication Services resource and open the **Provision domains** tab from the left navigation pane.

### Create a new C# application

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `EmailQuickstart`. This command creates a simple "Hello World" C# project with a single source file: **Program.cs**.

```console
dotnet new console -o EmailQuickstart
```

Change your directory to the newly created app folder and use the `dotnet build` command to compile your application.

```console
cd EmailQuickstart
dotnet build
```

### Install the package

While still in the application directory, install the Azure Communication Services Email client library for .NET package by using the `dotnet add package` command.

```console
dotnet add package Azure.Communication.Email
```

## Creating the email client with authentication

Open **Program.cs** and replace the existing code with the following to add `using` directives for including the `Azure.Communication.Email` namespace and a starting point for running for your program.

```csharp

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using Azure;
using Azure.Communication.Email;

namespace SendEmail
{
  internal class Program
  {
    static async Task Main(string[] args)
    {

    }
  }
}
```

You have a few options available for authenticating an email client:

#### [Connection String](#tab/connection-string)

 Open **Program.cs** in a text editor and replace the body of the `Main` method with code to initialize an `EmailClient` with your connection string. The following code retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. Learn how to [manage your resource's connection string](../../create-communication-resource.md#store-your-connection-string).

```csharp
// This code demonstrates how to fetch your connection string
// from an environment variable.
string connectionString = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING");
EmailClient emailClient = new EmailClient(connectionString);
```

#### [Microsoft Entra ID](#tab/aad)

To authenticate using [Microsoft Entra ID](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/identity/Azure.Identity), install the `Azure.Identity` library package for .NET by using the `dotnet add package` command.

```console
dotnet add package Azure.Identity
```

Open **Program.cs** in a text editor and replace the body of the `Main` method with code to initialize an `EmailClient` using [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/identity/Azure.Identity#defaultazurecredential). The Azure Identity SDK reads values from three environment variables at runtime to authenticate the application. Learn how to [create a Microsoft Entra ID Registered Application and set the environment variables](../../identity/service-principal.md?pivots=platform-azcli).

```csharp
// This code demonstrates how to authenticate to your Communication Service resource using
// DefaultAzureCredential and the environment variables AZURE_CLIENT_ID, AZURE_TENANT_ID,
// and AZURE_CLIENT_SECRET.
string resourceEndpoint = "<ACS_RESOURCE_ENDPOINT>";
EmailClient emailClient = new EmailClient(new Uri(resourceEndpoint), new DefaultAzureCredential());
```

#### [AzureKeyCredential](#tab/azurekeycredential)

You can also authenticate email clients using an [AzureKeyCredential](https://learn.microsoft.com/python/api/azure-core/azure.core.credentials.azurekeycredential). Both the `key` and the `endpoint` can be found on the `Keys` panel under `Settings` in your Communication Services Resource.

```csharp
var key = new AzureKeyCredential("<your-key-credential>");
var endpoint = new Uri("<your-endpoint-uri>");

var emailClient = new EmailClient(endpoint, key);
```

---


### Send an email message using the object model to construct the email payload

- Construct the email subject and body using EmailContent. 
- Add Recipients. 
- Set email importance through custom headers.
- Construct your email message using your sender email address, defined in the MailFrom list of the domain linked in your Communication Services Resource.
- Include your EmailContent and EmailRecipients, optionally adding attachments.

```csharp
var subject = "Welcome to Azure Communication Service Email APIs.";
var emailContent = new EmailContent(subject)
{
    PlainText = "This email message is sent from Azure Communication Service Email using .NET SDK.",
    Html = "<html><body><h1>Quick send email test</h1><br/><h4>This email message is sent from Azure Communication Service Email using .NET SDK.</h4></body></html>"
};
 
List<EmailAddress> emailAddresses = new List<EmailAddress> 
{ 
    new EmailAddress("emailalias@contoso.com", "Friendly Display Name")
};

EmailRecipients emailRecipients = new EmailRecipients(emailAddresses);

var emailMessage = new EmailMessage(sender, emailRecipients, emailContent)
{
    // Header name is "x-priority" or "x-msmail-priority"
    // Header value is a number from 1 to 5. 1 or 2 = High, 3 = Normal, 4 or 5 = Low
    // Not all email clients recognize this header directly (outlook client does recognize)
    Headers =
    {
        // Set Email Importance to High
        { "x-priority", "1" },
        { "", "" }
    }
};

try
{
    Console.WriteLine("Sending email to multiple recipients...");
    EmailSendOperation emailSendOperation = emailClient.Send(
        WaitUntil.Completed,
        emailMessage);

    Console.WriteLine($"Email Sent. Status = {emailSendOperation.Value.Status}");
    
    /// Get the OperationId so that it can be used for tracking the message for troubleshooting
    string operationId = emailSendOperation.Id;
    Console.WriteLine($"Email operation id = {operationId}");
}
catch (RequestFailedException ex)
{
    /// OperationID is contained in the exception message and can be used for troubleshooting purposes
    Console.WriteLine($"Email send operation failed with error code: {ex.ErrorCode}, message: {ex.Message}");
}

```


## Troubleshooting

### Email Delivery

To troubleshoot issues related to email delivery, you can [get status of the email delivery](../handle-email-events.md) to capture delivery details.

> **Important:**
> The success result returned by polling for the status of the send operation only validates that the email is sent out for delivery. For more information about the status of the delivery on the recipient end, see [how to handle email events](../handle-email-events.md).

### Email Throttling

If your application is hanging, it could be due to email sending being throttled. You can [handle email throttling by logging or by implementing a custom policy](throw-exception-when-tier-limit-reached.md).

> **Note:**
> This sandbox is intended to help developers start building the application. You can gradually request to increase the sending volume once the application is ready to go live. Submit a support request to raise your desired sending limit if you need to send more messages than the rate limits.

## Clean up Azure Communication Service resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../../create-communication-resource.md#clean-up-resources).

## Next steps

 - Learn how to [send email to multiple recipients](send-email-to-multiple-recipients.md)
 - Learn more about [sending email with attachments](send-email-with-attachments.md)
 - Familiarize yourself with [email client library](../../../concepts/email/sdk-features.md)
