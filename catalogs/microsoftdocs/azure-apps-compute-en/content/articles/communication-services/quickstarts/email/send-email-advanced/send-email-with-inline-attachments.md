---
title: Send email with inline attachments
titleSuffix: An Azure Communication Services article
description: This article describes how to send an email message with inline attachments using Azure Communication Services.
author: natekimball-msft
manager: koagbakp
services: azure-communication-services
ms.author: natekimball
ms.date: 04/07/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: devx-track-dotnet, devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python-azcli-ps
---

# Send email with inline attachments


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to send email with inline attachments using our Email SDKs.

> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


**Applies to: programming-language-azcli**


## Send an email message with inline attachments

Use the Azure CLI communication extension to send Email messages with inline attachments.

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services resource created and ready with a provisioned domain. [Create an Email Communication Resource](../create-email-communication-resource.md).
- An active Azure Communication Services resource connected to an Email Domain and its connection string. [Connect an Email Communication Resource with a Azure Communication Resource](../connect-email-communication-resource.md).
- The latest [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).

### Prerequisite check
- In a terminal or command window, run the `az --version` command to check that Azure CLI and the communication extension are installed.
- To view the domains verified with your Email Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/). Locate your Email Communication Services resource and open the **Provision domains** tab from the left navigation pane.

## Setting up
### Add the extension
Add the Azure Communication Services extension for Azure CLI by using the `az extension` command.

```azurecli-interactive
az extension add --name communication
```

### Sign in to Azure CLI

You need to [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal and providing your credentials.

### Store your connection string in an environment variable 

You can configure the `AZURE_COMMUNICATION_CONNECTION_STRING` environment variable to use Azure CLI keys operations without having to use `--connection_string` to pass in the connection string. To configure an environment variable, open a console window and select your operating system from the below tabs. Replace `<connectionString>` with your actual connection string.

>**Note:** 
> Don't store your connection string as an unencrypted environment variable for production environments. This example is for testing purposes only. For production environments, you should generate new connection strings. We encourage you to encrypt connection strings and change them regularly.

##### [Windows](#tab/windows)

```console
setx AZURE_COMMUNICATION_CONNECTION_STRING "<yourConnectionString>"
```

After you add the environment variable, you may need to restart any running programs that will need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example. 

##### [macOS](#tab/unix)

Edit your **`.zshrc`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<connectionString>"
```

After you add the environment variable, run `source ~/.zshrc` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell in order to access the variable. 

##### [Linux](#tab/linux)

Edit your **`.bash_profile`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<connectionString>"
```

After you add the environment variable, run `source ~/.bash_profile` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell in order to access the variable. 

---

## Send an email message with inline attachment

```azurecli-interactive
az communication email send
	--connection-string "yourConnectionString"
	--sender "<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>"
	--to "<emailalias@emaildomain.com>"
	--subject "Welcome to Azure Communication Services Email"
	--attachment-types "<inlineattachmenttype1>" # MIME type of the content being attached. Example: "png"
	--inline-attachments "<filepath>/<contentid>" # Example: "MicrosoftLogo.png/MSLogo"
	--html "<html><head><title>Welcome to Azure Communication Services Email</title></head><body><h1>This email message is sent from Azure Communication Services Email using Azure CLI.</h1><img src='cid:<contentid>' alt='<alternatetext>'/></body></html>"
```

Make these replacements in the code:

- Replace `<yourConnectionString>` with your connection string.
- Replace `<emailalias@emaildomain.com>` with the email address you would like to send a message to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.
- Replace `<inlineattachmenttype1>` with the actual attachment type of the file.
- Replace `<filepath>/<contentid>` with the file path to your attachment and the cid name or id for your inline attachment.
- Replace `<contentid>` with the CID for your inline attachment, which is referred to in the img src part of the HTML.
- Replace `<alternatetext>` with a descriptive text for the image to help with accessibility.

## Send an email message with attachment and inline attachment

```azurecli-interactive
az communication email send
	--connection-string "yourConnectionString"
	--sender "<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>"
	--to "<emailalias@emaildomain.com>"
	--subject "Welcome to Azure Communication Services Email"
	--attachment-types "<attachmenttype1>" "<inlineattachmenttype1>" # MIME type of the content being attached. Example1: "jpg" "png" & Example2: "png" "png"
	--attachments "<filepath>" # Example: "MSLogo.jpg"
	--inline-attachments "<filepath>/<contentid>" # Example: "MicrosoftLogo.png/MSLogo"
	--html "<html><head><title>Welcome to Azure Communication Services Email</title></head><body><h1>This email message is sent from Azure Communication Services Email using Azure CLI.</h1><img src='cid:<contentid>' alt='<alternatetext>'/></body></html>"
```

Make these replacements in the code:

- Replace `<yourConnectionString>` with your connection string.
- Replace `<emailalias@emaildomain.com>` with the email address you would like to send a message to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.
- Replace `<attachmenttype1>` `<inlineattachmenttype1>` with the actual attachment type of the file.
- Replace `<filepath>` with the file path to your attachment.
- Replace `<filepath>/<contentid>` with the file path to your attachment and the cid name or id for your inline attachment.
- Replace `<contentid>` with the CID for your inline attachment, which is referred to in the img src part of the HTML.
- Replace `<alternatetext>` with a descriptive text for the image to help with accessibility.

## Send an email message with multiple attachments and inline attachments

```azurecli-interactive
az communication email send
	--connection-string "yourConnectionString"
	--sender "<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>"
	--to "<emailalias@emaildomain.com>"
	--subject "Welcome to Azure Communication Services Email"
	--attachment-types "<attachmenttype1>" "<attachmenttype2>" "<inlineattachmenttype1>" "<inlineattachmenttype2>" "<inlineattachmenttype3>" # MIME type of the content being attached. Example: "png" "jpg" "png" "jpg" "bmp"
	--attachments "<filepath1>" "<filepath2>"
	--inline-attachments "<filepath1>/<contentid1>" "<filepath2>/<contentid2>" "<filepath3>/<contentid3>"
	--html "<html><head><title>Welcome to Azure Communication Services Email</title></head><body><h1>This email message is sent from Azure Communication Services Email using Azure CLI.</h1><img src='cid:<contentid1>' alt='<alternatetext>'/><img src='cid:<contentid2>' alt='<alternatetext>'/><img src='cid:<contentid3>' alt='<alternatetext>'/></body></html>"
```

Make these replacements in the code:

- Replace `<yourConnectionString>` with your connection string.
- Replace `<emailalias@emaildomain.com>` with the email address you would like to send a message to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.
- Replace `<attachmenttype1>` `<attachmenttype2>` `<inlineattachmenttype1>` `<inlineattachmenttype2>` `<inlineattachmenttype3>` with the actual attachment types of the file.
- Replace `<filepath1>` `<filepath2>` with the file paths to your attachment.
- Replace `<filepath1>/<contentid1>` `<filepath2>/<contentid2>` `<filepath3>/<contentid3>`  with the file paths to your attachment and the cid name or id for your inline attachment.
- Replace `<contentid1>` `<contentid2>` `<contentid3>` with the CID for your inline attachment, which is referred to in the img src part of the HTML.
- Replace `<alternatetext>` with a descriptive text for the image to help with accessibility.

The previous command also performs a polling on the messageId and returns the status of the email delivery. The status can be one of the following values:



| Status Name | Description |
| --- | --- |
| NotStarted | We're not sending this status from our service at this time. |
| Running | The email send operation is currently in progress and being processed. |
| Succeeded | The email send operation completed without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](../handle-email-events.md). |
| Failed | The email send operation didn't succeed and encountered an error. The email didn't send. The result contains an error object with more details on the reason for failure. |


### Optional parameters

The following optional parameters are available in Azure CLI.

- `--html` can be used instead of `--text` for html email body.

- `--importance` sets the importance type for the email. Known values are: high, normal, and low. Default is normal.

- `--to` sets the list of email recipients.

- `--cc` sets carbon copy email addresses.

- `--bcc` sets blind carbon copy email addresses.

- `--reply-to` sets Reply-To email address.

- `--disable-tracking` indicates whether user engagement tracking should be disabled for this request.

- `--attachments` sets the list of email attachments.

>**Note:** 
> We limit the total size of an email request (which includes both regular and inline attachments) to 10 MB.

- `--attachment-types` sets the list of email attachment types, in the same order of attachments.

- `--inline-attachments` parameter embeds an attachment directly within the email body, instead of as a separate downloadable file. Inline attachments are commonly used for images or media files that should appear inline in the email content.

>**Note:** 
> There needs to be at least one recipient in `--to` or `--cc` or `--bcc`.
 


**Applies to: programming-language-powershell**


Get started with Azure Communication Services by using the Azure PowerShell communication module to send Email messages.

Completing this quick start incurs a small cost of a few USD cents or less in your Azure account.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services resource created and ready with a provisioned domain. [Get started with creating an Email Communication Resource](../create-email-communication-resource.md).
- An active Azure Communication Services resource connected to an Email Domain and its connection string. [Get started by connecting an Email Communication Resource with a Azure Communication Resource](../connect-email-communication-resource.md).
- The latest [Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azps-windows).

### Prerequisite check
- In a windows powershell, run the `Get-Module -ListAvailable -Name Az.Communication` command to check whether the communication module is installed or not.
- To view the domains verified with your Email Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/). Locate your Email Communication Services resource and open the **Provision domains** tab from the left navigation pane.

## Setting up
### Install communication module
Install the Azure Communication Services module for Azure PowerShell by using the `Install-Module -Name Az.Communication` command.

```azurepowershell-interactive
Install-Module -Name Az.Communication
```
After installing Communication module, run the `Get-Command -Module Az.Communication` command to get all the communication modules.

```azurepowershell-interactive
Get-Command -Module Az.Communication
```

## Send an email message with inline attachment

Queues an email message to be sent to one or more recipients with only required fields.

```azurepowershell-interactive
$emailRecipientTo = @(
   @{
        Address = "<emailalias@emaildomain.com>"
        DisplayName = "Email DisplayName"
    },
   @{
        Address = "<emailalias1@emaildomain.com>"
        DisplayName = "Email DisplayName"
    }
)

$fileBytes = [System.IO.File]::ReadAllBytes("<image file path>")

$emailAttachment = @(
    @{
        ContentInBase64 = $fileBytes
        ContentType = "<image/png>"
        Name = "<inline-attachment.png>"
        contentId = "<contentId>"
    }
)

$message = @{
    ContentSubject = "Test Email"
    RecipientTo = @($emailRecipientTo)  # Array of email address objects
    SenderAddress = '<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>'
    Attachment = @($emailAttachment) # Array of attachments
    ContentHtml = "<html><head><title>Enter title</title></head><body><img src='cid:<contentId>' alt='Company Logo'/><h1>This is the first email from ACS - Azure PowerShell</h1></body></html>"
    ContentPlainText = "This is the first email from ACS - Azure PowerShell"
}
```

Make these replacements in the code:

- Replace `<yourEndpoint>` with your endpoint.
- Replace `<emailalias@emaildomain.com>` with the email address you would like to send a message to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.
- Replace `<image file path>` with the actual file paths of the attachments you want to send.
- Replace `<image/png>` with the appropriate content types for your attachments.
- Replace `<inline-attachment.png>` with the filenames of your attachments.
- Replace `<contentId>` with the Content-ID for your inline attachment.

Queues an email message to be sent to one or more inline attachments.

```azurepowershell-interactive
$emailRecipientTo = @(
   @{
        Address = "<emailalias@emaildomain.com>"
        DisplayName = "Email DisplayName"
    },
   @{
        Address = "<emailalias1@emaildomain.com>"
        DisplayName = "Email DisplayName"
    }
)

$fileBytes1 = [System.IO.File]::ReadAllBytes("<image file path1>")
$fileBytes2 = [System.IO.File]::ReadAllBytes("<image file path2>")
$fileBytes3 = [System.IO.File]::ReadAllBytes("<image file path3>")

$emailAttachment = @(
    @{
        ContentInBase64 = $fileBytes1
        ContentType = "<image/png>"
        Name = "<inline-attachment1.png>"
        contentId = "<contentId1>"
    },
    @{
        ContentInBase64 = $fileBytes2
        ContentType = "<image/png>"
        Name = "<inline-attachment2.png>"
        contentId = "<contentId2>"
    },
    @{
        ContentInBase64 = $fileBytes3
        ContentType = "<image/png>"
        Name = "<inline-attachment3.png>"
        contentId = "<contentId3>"
    }
)

$message = @{
    ContentSubject = "Test Email"
    RecipientTo = @($emailRecipientTo)  # Array of email address objects
    SenderAddress = '<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>'
    Attachment = @($emailAttachment) # Array of attachments
    ContentHtml = "<html><head><title>Enter title</title></head><body><img src='cid:<contentId1>' alt='Company Logo'/><img src='cid:<contentId2>' alt='Company Logo'/><img src='cid:<contentId3>' alt='Company Logo'/><h1>This is the first email from ACS - Azure PowerShell</h1></body></html>"
    ContentPlainText = "This is the first email from ACS - Azure PowerShell"
}
```

Make these replacements in the code:

- Replace `<yourEndpoint>` with your endpoint.
- Replace `<emailalias@emaildomain.com> and <emailalias1@emaildomain.com>` with the email addresses you would like to send a message to.
- Replace `<image file path1>` `<image file path2>` `<image file path3>` with the actual file paths of the attachments you want to send.
- Replace `<image/png>` with the appropriate content types for your attachments.
- Replace `<inline-attachment1.png>` `<inline-attachment2.png>` `<inline-attachment3.png>` with the filenames of your attachments.
- Replace `<contentId1>` `<contentId2>` `<contentId3>` with the Content-ID for your inline attachment.

### Optional parameters

The following optional parameters are available in Azure PowerShell.

- `ContentHtml` can be used to specify the HTML body of the email.

- `ContentPlainText` used to specify the plain text body of the email.

- `Attachment` sets the list of email attachments and inline attachments. This parameter accepts an array of file paths or attachment objects.

>**Note:** 
> Please note that we limit the total size of an email request (which includes both regular and inline attachments) to 10MB.

- `Header` custom email headers to be passed and sets email importance level (high, normal, or low).

- `RecipientBcc` array of recipients for the BCC field.

- `RecipientCc` array of recipients for the CC field.

- `ReplyTo` array of email addresses where recipients replies will be sent to.

- `UserEngagementTrackingDisabled` indicates whether user engagement tracking should be disabled for this request if the resource-level user engagement tracking setting was already enabled in the control plane.

Also, you can use a list of recipients with `RecipientCc` and `RecipientBcc` similar to `RecipientTo`. There needs to be at least one recipient in `RecipientTo` or `RecipientCc` or `RecipientBcc`.




**Applies to: programming-language-csharp**


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


## Send an email message with inline attachments

We can add an inline attachment by defining one or more `EmailAttachment` objects, defining a unique `ContentId` for each, and adding them to our EmailMessage object. Read the attachment file and encode it using Base64.

```csharp
var jpgFilePath = "./inline-attachment.jpg";
byte[] jpgBytes = File.ReadAllBytes(jpgFilePath);
var jpgBinaryData = new BinaryData(jpgBytes);
var jpgInlineAttachment = new EmailAttachment(
    "inline-attachment.jpg",
    "image/jpeg",
    jpgBinaryData);
jpgInlineAttachment.ContentId = "my-inline-attachment-1";

var pngFilePath = "./inline-attachment.png";
byte[] pngBytes = File.ReadAllBytes(pngFilePath);
var pngBinaryData = new BinaryData(pngBytes);
var pngInlineAttachment = new EmailAttachment(
    "inline-attachment.png",
    "image/png",
    pngBinaryData);
pngInlineAttachment.ContentId = "my-inline-attachment-2";
```

Within the HTML body of the message, we can embed an image by referencing its `ContentId` within the source of an `<img>` tag.

```csharp
var emailContent = new EmailContent("Welcome to Azure Communication Services Email")
{
    PlainText ="This email message is sent from Azure Communication Services Email using the .NET SDK.",
    Html = "<html><h1>HTML body inline images:</h1><img src=\"cid:my-inline-attachment-1\" /><img src=\"cid:my-inline-attachment-2\" /></html>"
};

var emailMessage = new EmailMessage(
    senderAddress: "donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net"
    recipientAddress: "emailalias@contoso.com"
    content: emailContent);

emailMessage.Attachments.Add(jpgInlineAttachment);
emailMessage.Attachments.Add(pngInlineAttachment);

try
{
    EmailSendOperation emailSendOperation = emailClient.Send(WaitUntil.Completed, emailMessage);
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

> **Note:**
> You can combine regular attachments with inline attachments. Defining a `ContentId` treats an attachment as inline, while an attachment without a `ContentId` is treated as a regular attachment.

### Allowed MIME types

Although most modern clients support inline attachments, the rendering behavior of an inline attachment is largely dependent on the recipient's email client. For this reason, we recommend using more common image formats inline whenever possible, such as `.png`, `.jpg`, or `.gif`. For more information on acceptable MIME types for email attachments, see the [Supported MIME types](../../../concepts/email/email-attachment-allowed-mime-types.md) documentation.

### Sample code

You can download the sample app demonstrating this action from  GitHub Azure Samples [Send email inline attachments using .NET](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendEmailAdvanced/SendEmailWithInlineAttachments).



**Applies to: programming-language-javascript**


Get started with Azure Communication Services by using the Communication Services JS Email client library to send Email messages.

Completing this quick start incurs a small cost of a few USD cents or less in your Azure account.

> **Tip:**
> Jump-start your email sending experience with Azure Communication Services by skipping straight to the [Basic Email Sending](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/send-email) and [Advanced Email Sending](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/send-email-advanced) sample code on GitHub.

## Understanding the email object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Email Client library for JavaScript.

| Name | Description |
| --- | --- |
| EmailAddress | This class contains an email address and an option for a display name. |
| EmailAttachment | This class creates an email attachment by accepting a unique ID, email attachment [MIME type](../../../concepts/email/email-attachment-allowed-mime-types.md) string, binary data for content, and an optional content ID to define it as an inline attachment. |
| EmailClient | This class is needed for all email functionality. You instantiate it with your connection string and use it to send email messages. |
| EmailClientOptions | This class can be added to the EmailClient instantiation to target a specific API version. |
| EmailContent | This class contains the subject and the body of the email message. You have to specify at least one of PlainText or Html content. |
| EmailCustomHeader | This class allows for the addition of a name and value pair for a custom header. Email importance can also be specified through these headers using the header name 'x-priority' or 'x-msmail-priority'. |
| EmailMessage | This class combines the sender, content, and recipients. Custom headers, attachments, and reply-to email addresses can optionally be added, as well. |
| EmailRecipients | This class holds lists of EmailAddress objects for recipients of the email message, including optional lists for CC & BCC recipients. |
| EmailSendResult | This class holds the results of the email send operation. It has an operation ID, operation status and error object (when applicable). |
| EmailSendStatus | This class represents the set of statuses of an email send operation. |

EmailSendResult returns the following status on the email operation performed.

| Status Name | Description |
| --- | --- |
| isStarted | Returns true if the email send operation is currently in progress and being processed. |
| isCompleted | Returns true if the email send operation has completed without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](../handle-email-events.md) |
| result | Property that exists if the email send operation has concluded. |
| error | Property that exists if the email send operation wasn't successful and encountered an error. The email wasn't sent. The result contains an error object with more details on the reason for failure. |

## Prerequisites

- [Node.js (~14)](https://nodejs.org/download/release/v14.19.1/).
- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services resource created and ready with a provisioned domain. [Get started with creating an Email Communication Resource](../create-email-communication-resource.md).
- An active Azure Communication Services resource connected to an Email Domain and its connection string. [Get started by connecting an Email Communication Resource with a Azure Communication Resource](../../create-communication-resource.md).

Completing this quick start incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> We can also send an email from our own verified domain. [Add custom verified domains to Email Communication Service](../add-azure-managed-domains.md).

### Prerequisite check

- In a terminal or command window, run `node --version` to check that Node.js is installed.
- To view the domains verified with your Email Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/), locate your Email Communication Services resource and open the **Provision domains** tab from the left navigation pane.

## Set up the application environment

### Create a new Node.js Application
First, open your terminal or command window, create a new directory for your app, and navigate to it.

```console
mkdir email-quickstart && cd email-quickstart
```

Run `npm init -y` to create a **package.json** file with default settings.

```console
npm init -y
```

Use a text editor to create a file called **send-email.js** in the project root directory. Change the "main" property in **package.json** to "send-email.js". The following section demonstrates how to add the source code for this quickstart to the newly created file.

### Install the package
Use the `npm install` command to install the Azure Communication Services Email client library for JavaScript.

```console
npm install @azure/communication-email --save
```

The `--save` option lists the library as a dependency in your **package.json** file.

## Creating the email client with authentication

There are a few different options available for authenticating an email client:

#### [Connection String](#tab/connection-string)

Import the **EmailClient** from the client library and instantiate it with your connection string.

The following code retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING` using the dotenv package. Use the `npm install` command to install the dotenv package. Learn how to [manage your resource's connection string](../../create-communication-resource.md#store-your-connection-string).

```console
npm install dotenv
```

Add the following code to **send-email.js**:

```javascript
const { EmailClient } = require("@azure/communication-email");
require("dotenv").config();

// This code demonstrates how to fetch your connection string
// from an environment variable.
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];
const emailClient = new EmailClient(connectionString);
```

<a name='azure-active-directory'></a>

#### [Microsoft Entra ID](#tab/aad)

You can also authenticate with Microsoft Entra ID using the [Azure Identity library](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity). To use the [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential) provider in the following snippet, or other credential providers provided with the Azure SDK, install the [`@azure/identity`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity) package:

```bash
npm install @azure/identity
```

The [`@azure/identity`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity) package provides various credential types that your application can use to authenticate. The README for `@azure/identity` provides more details and samples to get you started.
`AZURE_CLIENT_SECRET`, `AZURE_CLIENT_ID` and `AZURE_TENANT_ID` environment variables are needed to create a `DefaultAzureCredential` object.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { EmailClient } from "@azure/communication-email";

const endpoint = "https://<resource-name>.communication.azure.com";
let credential = new DefaultAzureCredential();

const emailClient = new EmailClient(endpoint, credential);
```

#### [AzureKeyCredential](#tab/azurekeycredential)

Email clients can also be authenticated using an [AzureKeyCredential](https://learn.microsoft.com/python/api/azure-core/azure.core.credentials.azurekeycredential). Both the `key` and the `endpoint` can be founded on the "Keys" pane under "Settings" in your Communication Services Resource.

```javascript
const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");
const { AzureKeyCredential } = require("@azure/core-auth");
require("dotenv").config();

var key = new AzureKeyCredential("<your-key-credential>");
var endpoint = "<your-endpoint-uri>";

const emailClient = new EmailClient(endpoint, key);
```

---

For simplicity, this quickstart uses connection strings, but in production environments, we recommend using [service principals](../../identity/service-principal.md).


## Send an email message with inline attachments

We can add an inline attachment by defining one or more attachment objects. Make sure to include a unique `contentId` for each, and add them to our message. Read the attachment file and encode it using Base64.

```javascript
const jpgFilePath = "./inline-attachment.jpg";
const pngFilePath = "./inline-attachment.png";

const inlineAttachments = [
    {
        name: path.basename(jpgFilePath),
        contentId: "my-inline-attachment-1"
        contentType: "image/jpeg",
        contentInBase64: readFileSync(jpgFilePath, "base64"),
    },
    {
        name: path.basename(pngFilePath),
        contentId: "my-inline-attachment-2"
        contentType: "image/png",
        contentInBase64: readFileSync(pngFilePath, "base64"),
    }
];
```

Within the HTML body of the message, embed an image by referencing its `contentId` within the source of an `<img>` tag.

```javascript
const message = {
  sender: "<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>",
  content: {
    subject: "Welcome to Azure Communication Services Email",
    plainText: "This email message is sent from Azure Communication Services Email using the JavaScript SDK.",
    html: "<html><h1>HTML body inline images:</h1><img src=\"cid:my-inline-attachment-1\" /><img src=\"cid:my-inline-attachment-2\" /></html>"
  },
  recipients: {
    to: [
      {
        address: "<emailalias@contoso.com>",
        displayName: "Customer Name",
      }
    ]
  },
  attachments: inlineAttachments
};

const poller = await emailClient.beginSend(message);
const response = await poller.pollUntilDone();
```

> **Note:**
> You can combine regular attachments with inline attachments. Define a `contentId` to treat an attachment as inline. An attachment without a `contentId` is treated as a regular attachment.

### Allowed MIME types

Although most modern clients support inline attachments, the rendering behavior of an inline attachment is largely dependent on the recipient's email client. For this reason, we recommend using more common image formats inline whenever possible, such as `.png`, `.jpg`, or `.gif`. For more information on acceptable MIME types for email attachments, see the [Supported MIME types](../../../concepts/email/email-attachment-allowed-mime-types.md) documentation.

### Sample code

You can download the sample app demonstrating this action from GitHub Azure Samples [Send email inline attachments using JavaScript](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/send-email-advanced/send-email-inline-attachments)



**Applies to: programming-language-java**


Get started with Azure Communication Services by using the Communication Services Java Email SDK to send Email messages.

Completing this quick start incurs a small cost of a few USD cents or less in your Azure account.

> **Tip:**
> Jump-start your email sending experience with Azure Communication Services by skipping straight to the [Basic Email Sending](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/send-email) and [Advanced Email Sending](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/send-email-advanced) sample code on GitHub.

## Understanding the email object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Email SDK for Python.

| Name | Description |
| --- | --- |
| EmailAddress | This class contains an email address and an option for a display name. |
| EmailAttachment | This interface creates an email attachment by accepting a unique ID, email attachment [MIME type](../../../concepts/email/email-attachment-allowed-mime-types.md) string, a string of content bytes, and an optional content ID to define it as an inline attachment. |
| EmailClient | This class is needed for all email functionality. You instantiate it with your connection string and use it to send email messages. |
| EmailMessage | This class combines the sender, content, and recipients. Custom headers, attachments, and reply-to email addresses can optionally be added, as well. |
| EmailSendResult | This class holds the results of the email send operation. It has an operation ID, operation status and error object (when applicable). |
| EmailSendStatus | This class represents the set of statuses of an email send operation. |

EmailSendResult returns the following status on the email operation performed.

| Status Name | Description |
| --- | --- |
| NOT_STARTED | We're not sending this status from our service at this time. |
| IN_PROGRESS | The email send operation is currently in progress and being processed. |
| SUCCESSFULLY_COMPLETED | The email send operation has completed without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](../handle-email-events.md) |
| FAILED | The email send operation wasn't successful and encountered an error. The email wasn't sent. The result contains an error object with more details on the reason for failure. |

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Java Development Kit (JDK)](https://www.microsoft.com/openjdk) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).
- A deployed Communication Services resource and connection string. For details, see [Create a Communication Services resource](../../create-communication-resource.md).
- Create an [Azure Email Communication Services resource](../create-email-communication-resource.md) to start sending emails.
- A setup managed identity for a development environment, [see Authorize access with managed identity](../../identity/service-principal.md?pivot="programming-language-java").

Completing this quickstart incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> We can also send an email from our own verified domain [Add custom verified domains to Email Communication Service](../add-custom-verified-domains.md).

### Prerequisite check
- In a terminal or command window, run `mvn -v` to check that Maven is installed.
- To view the domains verified with your Email Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/). Locate your Email Communication Services resource and open the **Provision domains** tab from the left navigation pane.

## Set up the application environment

To set up an environment for sending emails, take the steps in the following sections.

### Create a new Java application
Open your terminal or command window and navigate to the directory where you would like to create your Java application. Run the following command to generate the Java project from the maven-archetype-quickstart template.

```console
mvn archetype:generate -DarchetypeArtifactId="maven-archetype-quickstart" -DarchetypeGroupId="org.apache.maven.archetypes" -DarchetypeVersion="1.4" -DgroupId="com.communication.quickstart" -DartifactId="communication-quickstart"
```

The `generate` goal creates a directory with the same name as the `artifactId` value. Under this directory, the **src/main/java** directory contains the project source code, the **src/test/java directory** contains the test source, and the **pom.xml** file is the project's Project Object Model (POM).

### Install the package

Open the **pom.xml** file in your text editor. Add the following dependency element to the group of dependencies.

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-email</artifactId>
    <version>1.0.0-beta.2</version>
</dependency>
```

### Set up the app framework

Open **/src/main/java/com/communication/quickstart/App.java** in a text editor, add import directives, and remove the `System.out.println("Hello world!");` statement:

```java
package com.communication.quickstart;

import com.azure.communication.email.models.*;
import com.azure.communication.email.*;
import com.azure.core.util.polling.PollResponse;
import com.azure.core.util.polling.SyncPoller;

public class App
{
    public static void main( String[] args )
    {
        // Quickstart code goes here.
    }
}
```

## Creating the email client with authentication

There are a few different options available for authenticating an email client:

#### [Connection String](#tab/connection-string)

To authenticate a client, you instantiate an `EmailClient` with your connection string. Learn how to [manage your resource's connection string](../../create-communication-resource.md#store-your-connection-string). You can also initialize the client with any custom HTTP client that implements the `com.azure.core.http.HttpClient` interface.

To instantiate a client, add the following code to the `main` method:

```java
// You can get your connection string from your resource in the Azure portal.
String connectionString = "endpoint=https://<resource-name>.communication.azure.com/;accesskey=<access-key>";

EmailClient emailClient = new EmailClientBuilder()
    .connectionString(connectionString)
    .buildClient();
```

<a name='azure-active-directory'></a>

#### [Microsoft Entra ID](#tab/aad)

A [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/identity/azure-identity#defaultazurecredential) object must be passed to the `EmailClientBuilder` via the `credential()` method. An endpoint must also be set via the `endpoint()` method.

The `AZURE_CLIENT_SECRET`, `AZURE_CLIENT_ID`, and `AZURE_TENANT_ID` environment variables are needed to create a `DefaultAzureCredential` object.

```java
// You can find your endpoint and access key from your resource in the Azure portal
String endpoint = "https://<resource-name>.communication.azure.com/";
EmailClient emailClient = new EmailClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

#### [AzureKeyCredential](#tab/azurekeycredential)

Email clients can also be created and authenticated using the endpoint and Azure Key Credential acquired from an Azure Communication Resource in the [Azure portal](https://portal.azure.com/).

```java
String endpoint = "https://<resource-name>.communication.azure.com";
AzureKeyCredential azureKeyCredential = new AzureKeyCredential("<access-key>");
EmailClient emailClient = new EmailClientBuilder()
    .endpoint(endpoint)
    .credential(azureKeyCredential)
    .buildClient();
```

---

For simplicity, this quickstart uses connection strings, but in production environments, we recommend using [service principals](../../identity/service-principal.md).


## Send an email message with inline attachments

Add an inline attachment by defining one or more EmailAttachment objects, defining a unique `ContentId` for each, and adding them to our EmailMessage object. Read the attachment file and encode it using Base64.

```java
byte[] jpgContent = Files.readAllBytes(new File("./inline-attachment.jpg").toPath());
byte[] jpgEncodedContent = Base64.getEncoder().encodeToString(jpgContent).getBytes();
EmailAttachment jpgInlineAttachment = new EmailAttachment(
    "inline-attachment.jpg",
    "image/jpeg",
    BinaryData.fromBytes(jpgEncodedContent)
).setContentId("my-inline-attachment-1");

byte[] pngContent = Files.readAllBytes(new File("./inline-attachment.png").toPath());
byte[] pngEncodedContent = Base64.getEncoder().encodeToString(pngContent).getBytes();
EmailAttachment pngInlineAttachment = new EmailAttachment(
    "inline-attachment.png",
    "image/png",
    BinaryData.fromBytes(pngEncodedContent)
).setContentId("my-inline-attachment-2");
```

Within the HTML body of the message, we can then embed an image by referencing its `ContentId` within the source of an `<img>` tag.

```java
EmailMessage message = new EmailMessage()
    .setSenderAddress(senderAddress)
    .setToRecipients(recipientAddress)
    .setSubject("Welcome to Azure Communication Services Email")
    .setBodyPlainText("This email message is sent from Azure Communication Services Email using the Java SDK.");
    .setBodyHtml("<html><h1>HTML body inline images:</h1><img src=\"cid:my-inline-attachment-1\" /><img src=\"cid:my-inline-attachment-2\" /></html>")
    .setAttachments(jpgInlineAttachmentContent, pngInlineAttachmentContent);

SyncPoller<EmailSendResult, EmailSendResult> poller = emailClient.beginSend(message, null);
PollResponse<EmailSendResult> response = poller.waitForCompletion();

System.out.println("Operation Id: " + response.getValue().getId());
```

> **Note:**
> You can combine regular attachments with inline attachments. Defining a `ContentId` treats an attachment as inline. An attachment without a `ContentId` is treated as a regular attachment.

### Allowed MIME types

Although most modern clients support inline attachments, the rendering behavior of an inline attachment is largely dependent on the recipient's email client. For this reason, we recommend using more common image formats inline whenever possible, such as `.png`, `.jpg`, or `.gif`. For more information on acceptable MIME types for email attachments, see the [Supported MIME types](../../../concepts/email/email-attachment-allowed-mime-types.md) documentation.

### Sample code

You can download the sample app demonstrating this action from GitHub Azure Samples [Send email inline attachments using Java](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/send-email-advanced/send-email-inline-attachments)



**Applies to: programming-language-python**


Get started with Azure Communication Services by using the Communication Services Python Email SDK to send Email messages.

Completing this quick start incurs a small cost of a few USD cents or less in your Azure account.

> **Tip:**
> Jump-start your email sending experience with Azure Communication Services by skipping straight to the [Basic Email Sending](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/send-email) and [Advanced Email Sending](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/send-email-advanced) sample code on GitHub.

## Understanding the email object model

The following JSON message template & response object demonstrate some of the major features of the Azure Communication Services Email SDK for Python.

```python
message = {
    "content": {
        "subject": "str",  # Subject of the email message. Required.
        "html": "str",  # Optional. Html version of the email message.
        "plainText": "str"  # Optional. Plain text version of the email
            message.
    },
    "recipients": {
        "to": [
            {
                "address": "str",  # Email address. Required.
                "displayName": "str"  # Optional. Email display name.
            }
        ],
        "bcc": [
            {
                "address": "str",  # Email address. Required.
                "displayName": "str"  # Optional. Email display name.
            }
        ],
        "cc": [
            {
                "address": "str",  # Email address. Required.
                "displayName": "str"  # Optional. Email display name.
            }
        ]
    },
    "senderAddress": "str",  # Sender email address from a verified domain. Required.
    "attachments": [
        {
            "name": "str"  # Name of the attachment. Required.
            "contentType": "str",  # MIME type of the content being attached. Required.
            "contentInBase64": "str",  # Base64 encoded contents of the attachment. Required.
            "contentId": "str" # Unique identifier (CID) to reference an inline attachment. Optional
        }
    ],
    "userEngagementTrackingDisabled": bool,  # Optional. Indicates whether user engagement tracking should be disabled for this request if the resource-level user engagement tracking setting was already enabled in the control plane.
    "headers": {
        "str": "str"  # Optional. Custom email headers to be passed.
    },
    "replyTo": [
        {
            "address": "str",  # Email address. Required.
            "displayName": "str"  # Optional. Email display name.
        }
    ]
}

response = {
    "id": "str",  # The unique id of the operation. Uses a UUID. Required.
    "status": "str",  # Status of operation. Required. Known values are:
        "NotStarted", "Running", "Succeeded", and "Failed".
    "error": {
        "additionalInfo": [
            {
                "info": {},  # Optional. The additional info.
                "type": "str"  # Optional. The additional info type.
            }
        ],
        "code": "str",  # Optional. The error code.
        "details": [
            ...
        ],
        "message": "str",  # Optional. The error message.
        "target": "str"  # Optional. The error target.
    }
}
```

The `response.status` values are explained further in the following table.

| Status Name | Description |
| --- | --- |
| InProgress | The email send operation is currently in progress and being processed. |
| Succeeded | The email send operation has completed without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](../handle-email-events.md) |
| Failed | The email send operation wasn't successful and encountered an error. The email wasn't sent. The result contains an error object with more details on the reason for failure. |

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python](https://www.python.org/downloads/) 3.7+.
- An Azure Email Communication Services resource created and ready with a provisioned domain. [Get started with creating an Email Communication Resource](../create-email-communication-resource.md).
- An active Azure Communication Services resource connected to an Email Domain and its connection string. [Get started by connecting an Email Communication Resource with a Azure Communication Resource](../connect-email-communication-resource.md).

Completing this quick start incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> We can also send an email from our own verified domain. [Add custom verified domains to Email Communication Service](../add-azure-managed-domains.md).

### Prerequisite check
- In a terminal or command window, run the `python --version` command to check that Python is installed.
- To view the domains verified with your Email Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/). Locate your Email Communication Services resource and open the **Provision domains** tab from the left navigation pane.

## Set up the application environment

To set up an environment for sending emails, take the steps in the following sections.

### Create a new Python application

1. Open your terminal or command window. Then use the following command to create a virtual environment and activate it. This command creates a new directory for your app.

    ```console
    python -m venv email-quickstart
    ```

1. Navigate to the root directory of the virtual environment and activate it using the following commands.

    ```console
    cd email-quickstart
    .\Scripts\activate
    ```

1. Use a text editor to create a file called **send-email.py** in the project root directory and add the structure for the program, including basic exception handling.

   ```python
   import os
   from azure.communication.email import EmailClient

   try:
       # Quickstart code goes here.
   except Exception as ex:
       print('Exception:')
       print(ex)
   ```

In the following sections, you add all the source code for this quickstart to the **send-email.py** file that you created.

### Install the package

While still in the application directory, install the Azure Communication Services Email SDK for Python package by using the following command.

```console
pip install azure-communication-email
```
## Creating the email client with authentication

There are a few different options available for authenticating an email client:

#### [Connection String](#tab/connection-string)

Instantiate an **EmailClient** with your connection string. Learn how to [manage your resource's connection string](../../create-communication-resource.md#store-your-connection-string).

```python
# Create the EmailClient object that you use to send Email messages.
email_client = EmailClient.from_connection_string(<connection_string>)
```

<a name='azure-active-directory'></a>

#### [Microsoft Entra ID](#tab/aad)

You can also use Active Directory authentication using [DefaultAzureCredential](../../../concepts/authentication.md).

```python
from azure.communication.email import EmailClient
from azure.identity import DefaultAzureCredential

# To use Azure Active Directory Authentication (DefaultAzureCredential) make sure to have AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET as env variables.
endpoint = "https://<resource-name>.communication.azure.com"
email_client = EmailClient(endpoint, DefaultAzureCredential())
```

#### [AzureKeyCredential](#tab/azurekeycredential)

Email clients can also be authenticated using an [AzureKeyCredential](https://learn.microsoft.com/python/api/azure-core/azure.core.credentials.azurekeycredential). Both the `key` and the `endpoint` can be founded on the "Keys" pane under "Settings" in your Communication Services Resource.

```python
from azure.communication.email import EmailClient
from azure.core.credentials import AzureKeyCredential

key = AzureKeyCredential("<your-key-credential>");
endpoint = "<your-endpoint-uri>";

email_client = EmailClient(endpoint, key);
```

---

For simplicity, this quickstart uses connection strings, but in production environments, we recommend using [service principals](../../identity/service-principal.md).


## Send an email message with inline attachments

We can add an inline attachment by defining one or more `attachments`, making sure to include a unique `contentId` for each, and adding them to our message. Read the attachment file and encode it using Base64. Decode the bytes as a string and pass it into the `attachment` object.

```python
import base64

with open("./inline-attachment.jpg", "rb") as file:
    jpg_file_bytes_b64 = base64.b64encode(file.read())

with open("./inline-attachment.png", "rb") as file:
    png_file_bytes_b64 = base64.b64encode(file.read())

inlineAttachments = [
    {
        "name": "inline-attachment.jpg",
        "contentId": "my-inline-attachment-1",
        "contentType": "image/jpeg",
        "contentInBase64": jpg_file_bytes_b64.decode()
    },
    {
        "name": "inline-attachment.png",
        "contentId": "my-inline-attachment-2",
        "contentType": "image/png",
        "contentInBase64": png_file_bytes_b64.decode()
    }
]
```

Within the HTML body of the message, we can then embed an image by referencing its `contentId` within the source of an `<img>` tag.

```python
message = {
    "content": {
        "subject": "Welcome to Azure Communication Services Email",
        "plainText": "This email message is sent from Azure Communication Services Email using the Python SDK.",
        "html": "<html><h1>HTML body inline images:</h1><img src=\"cid:my-inline-attachment-1\" /><img src=\"cid:my-inline-attachment-2\" /></html>"
    },
    "recipients": {
        "to": [
            {
                "address": "<emailalias@contoso.com>",
                "displayName": "Customer Name"
            }
        ]
    },
    "senderAddress": "<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>",
    "attachments": inlineAttachments
}

poller = email_client.begin_send(message)
result = poller.result()
```

> **Note:**
> Regular attachments can be combined with inline attachments, as well. Defining a `contentId` will treat an attachment as inline, while an attachment without a `contentId` will be treated as a regular attachment.

### Allowed MIME types

Although most modern clients support inline attachments, the rendering behavior of an inline attachment is largely dependent on the recipient's email client. For this reason, it is suggested to use more common image formats inline whenever possible, such as .png, .jpg, or .gif. For more information on acceptable MIME types for email attachments, see the [allowed MIME types](../../../concepts/email/email-attachment-allowed-mime-types.md) documentation.

### Sample code

You can download the sample app demonstrating this action from [GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/send-email-advanced/send-email-inline-attachments)





## Troubleshooting

### Email Delivery

To troubleshoot issues related to email delivery, you can [get status of the email delivery](../handle-email-events.md) to capture delivery details.

> **Important:**
> The success result returned by polling for the status of the send operation only validates the fact that the email is sent out for delivery. For more information about the status of the delivery on the recipient end, see [how to handle email events](../handle-email-events.md).

### Email Throttling

If  your application is hanging, it could be due to email throttling. You can [handle email throttling by logging or by implementing a custom policy](throw-exception-when-tier-limit-reached.md).

> **Note:**
> This sandbox is intended to help developers start building the application. You can gradually request to increase the sending volume once the application is ready to go live. Submit a support request to raise your desired sending limit if you need to send more messages than the rate limits.

## Clean up Azure Communication Service resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../../create-communication-resource.md#clean-up-resources).

## Next steps

 - Learn how to [manually poll for email status](manually-poll-for-email-status.md)
 - Learn more about [sending email to multiple recipients](send-email-to-multiple-recipients.md)
 - Familiarize yourself with [email client library](../../../concepts/email/sdk-features.md)
