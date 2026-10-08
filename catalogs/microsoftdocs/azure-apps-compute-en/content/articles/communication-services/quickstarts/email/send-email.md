---
title: Send an email using Azure Communication Services
titleSuffix: An Azure Communication Services article
description: This article describes how to send an email message using Azure Communication Services.
author: bashan-git
manager: sphenry
services: azure-communication-services
ms.author: bashan
ms.date: 04/10/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-azcli-js-csharp-java-python-portal-nocode-ps
---

# Send an email using Azure Communication Services


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


<!-- [!INCLUDE [Survey Request](../includes/survey-request.md)] -->

This quickstart describes how to send email using our Email SDKs.

**Applies to: platform-azportal**


Get started with Azure Communication Services using the Communication Services Try Email to send Email messages.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- The latest version [.NET Core client library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- An Azure Email Communication Services Resource created and ready with a provisioned domain [Get started with Creating Email Communication Resource](create-email-communication-resource.md)
- An active Communication Services resource connected with Email Domain. [Connect a verified email domain to send email](connect-email-communication-resource.md).

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

## Send an Email using Try Email

Try Email helps you kick-start sending emails to the desired recipients using Azure Communication Services, and verifying the configuration for your application to send email. It also helps to jump-start your email notification development with the code snippet in your preferred choice of language.

To send a message to a recipient, and to specify the message subject and body:

1. From the overview page of a provisioned Azure Communication Service resource, click **Try Email** on the left navigation panel under Email.

    Screenshot that shows the left navigation panel for Try Email.

2. Select one of the verified domains from drop-down.

   Screenshot that shows the verified domain from drop-down.

3. Compose the email to send.
    - Enter Recipient email address
    - Enter Subject
    - Write the Email Body
          
    Screenshot that shows how to filter and select one of the verified email domains to connect.

4. Click **Send**.

   Screenshot that shows one of the verified email domains is now connected.
   
5. Email sent successfully.
 
    Screenshot that shows successful email send.
   
6. You can also copy the sample *Code Snippet* to send an email for use in your sample project to send notifications.
   - Select Language of your choice
   - Click Insert my Connection
   - Click Copy

     Screenshot that shows code snippet to send email.
        
7. Email Code Snippet is now ready to use in your notification project. 



**Applies to: platform-azcli**


Get started with Azure Communication Services by using the Azure CLI communication extension to send Email messages.

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services resource created and ready with a provisioned domain. [Create an Email Communication Resource](create-email-communication-resource.md).
- An active Azure Communication Services resource connected to an Email Domain and its connection string. [Connect a verified email domain to send email](connect-email-communication-resource.md).
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

You can configure the `AZURE_COMMUNICATION_CONNECTION_STRING` environment variable to use Azure CLI keys operations without having to use `--connection_string` to pass in the connection string. To configure an environment variable, open a console window and select your operating system from the following tabs. Replace `<connectionString>` with your actual connection string.

>**Note:** 
> Don't store your connection string as an unencrypted environment variable for production environments. This method meant for testing purposes only. For production environments, you need to generate new connection strings. We encourage you to encrypt connection strings and change them regularly.

##### [Windows](#tab/windows)

```console
setx AZURE_COMMUNICATION_CONNECTION_STRING "<yourConnectionString>"
```

After you add the environment variable, you may need to restart any running programs that need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example. 

##### [macOS](#tab/unix)

Edit your **`.zshrc`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<connectionString>"
```

After you add the environment variable, run `source ~/.zshrc` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell to access the variable. 

##### [Linux](#tab/linux)

Edit your **`.bash_profile`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<connectionString>"
```

After you add the environment variable, run `source ~/.bash_profile` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell in order to access the variable. 

---

## Send an email message

```azurecli-interactive
az communication email send
	--connection-string "yourConnectionString"
	--sender "<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>"
	--to "<emailalias@emaildomain.com>"
	--subject "Welcome to Azure Communication Services Email" --text "This email message is sent from Azure Communication Services Email using Azure CLI." 
```

Make these replacements in the code:

- Replace `<yourConnectionString>` with your connection string.
- Replace `<emailalias@emaildomain.com>` with the email address you would like to send a message to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.

This command also performs a polling on the `messageId` and returns the status of the email delivery. The status can be one of the following values:



| Status Name | Description |
| --- | --- |
| NotStarted | We're not sending this status from our service at this time. |
| Running | The email send operation is currently in progress and being processed. |
| Succeeded | The email send operation completed without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](handle-email-events.md). |
| Failed | The email send operation didn't succeed and encountered an error. The email didn't send. The result contains an error object with more details on the reason for failure. |


### Optional parameters

The following optional parameters are available in Azure CLI.

- `--html` can be used instead of `--text` for html email body.

- `--importance` sets the importance type for the email. Known values are: high, normal, and low. Default is normal.

- `--to` sets the list of email recipients.

- `--cc` sets carbon copy email addresses.

- `--bcc` sets blind carbon copy email addresses.

- `--reply-to` sets Reply-To email address.

- `--disable-tracking` indicates whether user engagement tracking must be disabled for this request.

- `--attachments` sets the list of email attachments.

- `--attachment-types` sets the list of email attachment types, in the same order of attachments.

You can also use a list of recipients with `--cc` and `--bcc` similar to `--to`. There needs to be at least one recipient in `--to` or `--cc` or `--bcc`.
 



**Applies to: programming-language-csharp**


Get started with Azure Communication Services by using the Communication Services C# Email client library to send Email messages.

> **Tip:**
> Jump-start your email sending experience with Azure Communication Services by skipping straight to the [Basic Email Sending](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendEmail) and [Advanced Email Sending](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendEmailAdvanced) sample code on GitHub.

## Understanding the Email Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Email Client library for C#.


| Name | Description |
| --- | --- |
| EmailAddress | This class contains an email address and an option for a display name. |
| EmailAttachment | This class creates an email attachment by accepting a unique ID, email attachment [MIME type](../../concepts/email/email-attachment-allowed-mime-types.md) string, binary data for content, and an optional content ID to define it as an inline attachment. |
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
| Succeeded | The email send operation completes without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](handle-email-events.md) |
| Failed | The email send operation wasn't successful and encountered an error. The email wasn't sent. The result contains an error object with more details on the reason for failure. |

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version [.NET Core client library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- An Azure Email Communication Services Resource created and ready with a provisioned domain [Create Email Communication Resource](create-email-communication-resource.md).
- An active Communication Services resource connected with Email Domain and a Connection String. [Create and manage Email Communication Service resources](connect-email-communication-resource.md).

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> You can also send an email from our own verified domain. [Add custom verified domains to Email Communication Service](add-azure-managed-domains.md).

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

## Create the email client with authentication

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

There are a few different options available for authenticating an email client:

#### [Connection String](#tab/connection-string)

 Open **Program.cs** in a text editor and replace the body of the `Main` method with code to initialize an `EmailClient` with your connection string. The following code retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).

```csharp
// This code demonstrates how to fetch your connection string
// from an environment variable.
string connectionString = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING");
EmailClient emailClient = new EmailClient(connectionString);
```

#### [Microsoft Entra ID](#tab/aad)

To authenticate using [Microsoft Entra ID](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/identity/Azure.Identity), install the `Azure.Identity` library package for .NET using the `dotnet add package` command.

```console
dotnet add package Azure.Identity
```
Open **Program.cs** in a text editor and replace the body of the `Main` method with code to initialize an `EmailClient` using [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/identity/Azure.Identity#defaultazurecredential). The Azure Identity SDK reads values from three environment variables at runtime to authenticate the application. Learn how to [create a Microsoft Entra ID Registered Application and set the environment variables](../identity/service-principal.md?pivots=platform-azcli).

```csharp
// This code demonstrates how to authenticate to your Communication Service resource using
// DefaultAzureCredential and the environment variables AZURE_CLIENT_ID, AZURE_TENANT_ID,
// and AZURE_CLIENT_SECRET.
string resourceEndpoint = "<ACS_RESOURCE_ENDPOINT>";
EmailClient emailClient = new EmailClient(new Uri(resourceEndpoint), new DefaultAzureCredential());
```

#### [AzureKeyCredential](#tab/azurekeycredential)

You can also authenticate email clients using an [AzureKeyCredential](https://learn.microsoft.com/python/api/azure-core/azure.core.credentials.azurekeycredential). Both the `key` and the `endpoint` can be found on the **Keys** panel under **Settings** in your Communication Services Resource.

```csharp
var key = new AzureKeyCredential("<your-key-credential>");
var endpoint = new Uri("<your-endpoint-uri>");

var emailClient = new EmailClient(endpoint, key);
```

---

> **Note:**
> We don't recommend using the manual polling (Send Email with asynchronous status polling) to send email.

#### [Send Email with asynchronous status polling](#tab/send-email-and-get-status-async)


## Basic email sending 

### Construct your email message

To send an email message, you need to:
- Define the email subject and body.
- Define your Sender Address. Construct your email message with your Sender information you get your MailFrom address from your verified domain. 
- Define the Recipient Address.
- Call the SendAsync method. Add this code to the end of `Main` method in **Program.cs**:

Replace with your domain details and modify the content, recipient details as required
```csharp

//Replace with your domain and modify the content, recipient details as required

var subject = "Welcome to Azure Communication Service Email APIs.";
var htmlContent = "<html><body><h1>Quick send email test</h1><br/><h4>This email message is sent from Azure Communication Service Email.</h4><p>This mail was sent using .NET SDK!!</p></body></html>";
var sender = "donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net";
var recipient = "emailalias@contoso.com";

```
### Send and get the email send status

When you call SendAsync with Azure.WaitUntil.Started, your method returns back after starting the operation. The method returns EmailSendOperation object. You can call UpdateStatusAsync method to refresh the email operation status. 

The returned EmailSendOperation object contains an EmailSendStatus object that contains: 
- Current status of the Email Send operation.
- An error object with failure details if the current status is in a failed state.

```csharp

/// Send the email message with WaitUntil.Started
EmailSendOperation emailSendOperation = await emailClient.SendAsync(
    Azure.WaitUntil.Started,
    sender,
    recipient,
    subject,
    htmlContent);

/// Call UpdateStatus on the email send operation to poll for the status
/// manually.
try
{
    while (true)
    {
        await emailSendOperation.UpdateStatusAsync();
        if (emailSendOperation.HasCompleted)
        {
            break;
        }
        await Task.Delay(100);
    }

    if (emailSendOperation.HasValue)
    {
        Console.WriteLine($"Email queued for delivery. Status = {emailSendOperation.Value.Status}");
    }
}
catch (RequestFailedException ex)
{
    Console.WriteLine($"Email send failed with Code = {ex.ErrorCode} and Message = {ex.Message}");
}

/// Get the OperationId so that it can be used for tracking the message for troubleshooting
string operationId = emailSendOperation.Id;
Console.WriteLine($"Email operation id = {operationId}");
```

Run the application from your application directory with the `dotnet run` command.

```console
dotnet run
```

### Sample code

You can download the sample app from [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendEmailAdvanced/SendEmailWithManualPollingForStatus)


#### [Send Email with synchronous status polling](#tab/send-smail-and-get-status-sync)

## Basic email sending

### Construct your email message

To send an email message, you need to:
- Define the email subject and body.
- Define your Sender Address. Construct your email message with your Sender information you get your MailFrom address from your verified domain.
- Define the Recipient Address.
- Call the SendAsync method. Add this code to the end of `Main` method in `Program.cs`:

Replace with your domain details and modify the content, recipient details as required:

```csharp

//Replace with your domain and modify the content, recipient details as required

var subject = "Welcome to Azure Communication Service Email APIs.";
var htmlContent = "<html><body><h1>Quick send email test</h1><br/><h4>This email message is sent from Azure Communication Service Email.</h4><p>This mail was sent using .NET SDK!!</p></body></html>";
var sender = "donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net";
var recipient = "emailalias@contoso.com";

```
### Send and get the email send status

To send an email message, you need to:
- Call `SendAsync` method that sends the email request as an asynchronous operation. Call with `Azure.WaitUntil.Completed` if your method needs to wait to return until the long-running operation completes on the service. Call with `Azure.WaitUntil.Started` if your method needs to return after starting the operation.
- The `SendAsync` method returns `EmailSendOperation` that returns **Succeeded** `EmailSendStatus` if email is out for delivery and throws an exception otherwise. Add this code to the end of `Main` method in `Program.cs`:

```csharp
try
{
    Console.WriteLine("Sending email...");
    EmailSendOperation emailSendOperation = await emailClient.SendAsync(
        Azure.WaitUntil.Completed,
        sender,
        recipient,
        subject,
        htmlContent);
    EmailSendResult statusMonitor = emailSendOperation.Value;

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

### Get email delivery status

The `EmailSendOperation` only returns email operation status. To get the actual email delivery status, you can subscribe to `EmailDeliveryReportReceived` event that is generated when the email delivery completes. The event returns the following delivery state:

- Delivered
- Failed
- Quarantined

See [Handle Email Events](handle-email-events.md) for details.

You can also subscribe to Email Operational logs that provide information related to delivery metrics for messages sent from the Email service.

- Email Send Mail operational logs - provides detailed information related to the Email service send mail requests.
- Email Status Update operational logs - provides message and recipient level delivery status updates related to the Email service send mail requests.

Access logs for [Email Communication Service](../../concepts/analytics/logs/email-logs.md).

### Run the code

Run the application from your application directory using the `dotnet run` command.

```console
dotnet run
```

### Sample code

You can download the sample app from GitHub Azure Samples [Send Email for .NET](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendEmail)

---



**Applies to: programming-language-javascript**


Get started with Azure Communication Services using the Communication Services JavaScript Email client library to send Email messages.

> **Tip:**
> Jump-start your email sending experience with Azure Communication Services using the [Basic Email Sending](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/send-email) and [Advanced Email Sending](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/send-email-advanced) sample code on GitHub.

## Understand the email object model

The following classes and interfaces handle some features of the Azure Communication Services Email Client library for JavaScript.

| Name | Description |
| --- | --- |
| EmailAddress | This class contains an email address and an option for a display name. |
| EmailAttachment | This class creates an email attachment by accepting a unique ID, email attachment [MIME type](../../concepts/email/email-attachment-allowed-mime-types.md) string, binary data for content, and an optional Content ID to define it as an inline attachment. |
| EmailClient | This class is needed for all email functionality. You instantiate it with your connection string and use it to send email messages. |
| EmailClientOptions | This class can be added to the EmailClient instantiation to target a specific API version. |
| EmailContent | This class contains the subject and the body of the email message. You have to specify at least one of PlainText or Html content. |
| EmailCustomHeader | This class allows for the addition of a name and value pair for a custom header. Email importance can also be specified through these headers using the header name `x-priority` or `x-msmail-priority`. |
| EmailMessage | This class combines the sender, content, and recipients. Custom headers, attachments, and reply-to email addresses can optionally be added, as well. |
| EmailRecipients | This class holds lists of EmailAddress objects for recipients of the email message, including optional lists for CC & BCC recipients. |
| EmailSendResult | This class holds the results of the email send operation. It has an operation ID, operation status, and error object (when applicable). |
| EmailSendStatus | This class represents the set of statuses of an email send operation. |

EmailSendResult returns the following status on the email operation performed.

| Status Name | Description |
| --- | --- |
| isStarted | Returns true if the email send operation is currently in progress and being processed. |
| isCompleted | Returns true if the email send operation completed without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](handle-email-events.md) |
| result | Property that exists if the email send operation concludes. |
| error | Property that exists if the email send operation wasn't successful and encountered an error. The email wasn't sent. The result contains an error object with more details on the reason for failure. |

## Prerequisites

- [Node.js (~14)](https://nodejs.org/download/release/v14.19.1/).
- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services resource created and ready with a provisioned domain. [Create an Email Communication Resource](create-email-communication-resource.md).
- An active Azure Communication Services resource connected to an Email Domain and its connection string. [Create and manage Email Communication Service resources](../create-communication-resource.md).

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> You can also send an email from our own verified domain. [Add custom verified domains to Email Communication Service](add-azure-managed-domains.md).

### Prerequisite check

- In a terminal or command window, run `node --version` to check that Node.js is installed.
- To view the domains verified with your Email Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/), locate your Email Communication Services resource and open the **Provision domains** tab from the left navigation pane.

## Set up the application environment

### Create a new Node.js Application

First, open your terminal or command window. Then create a new directory for your app, and navigate to it.

```console
mkdir email-quickstart && cd email-quickstart
```

Run `npm init -y` to create a `package.json` file with default settings.

```console
npm init -y
```

Use a text editor to create a file called `send-email.js` in the project root directory. Change the `main` property in `package.json` to `send-email.js`. The following section demonstrates how to add the source code for this article to the newly created file.

### Install the package

Use the `npm install` command to install the Azure Communication Services Email client library for JavaScript.

```console
npm install @azure/communication-email --save
```

The `--save` option lists the library as a dependency in your `package.json` file.

## Create the email client with authentication

There are a few different options available for authenticating an email client:

#### [Connection String](#tab/connection-string)

Import the `EmailClient` from the client library and instantiate it with your connection string.

Use the following code to retrieve the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING` via the dotenv package. Use the `npm install` command to install the dotenv package. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).

```console
npm install dotenv
```

Add the following code to `send-email.js`:

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

You need the `AZURE_CLIENT_SECRET`, `AZURE_CLIENT_ID`, and `AZURE_TENANT_ID` environment variables to create a `DefaultAzureCredential` object.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { EmailClient } from "@azure/communication-email";

const endpoint = "https://<resource-name>.communication.azure.com";
let credential = new DefaultAzureCredential();

const emailClient = new EmailClient(endpoint, credential);
```

#### [AzureKeyCredential](#tab/azurekeycredential)

You can also authenticate email clients using an [AzureKeyCredential](https://learn.microsoft.com/python/api/azure-core/azure.core.credentials.azurekeycredential). Both the `key` and the `endpoint` can be found on the **Keys** panel under **Settings** in your Communication Services Resource.

```javascript
const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");
const { AzureKeyCredential } = require("@azure/core-auth");
require("dotenv").config();

var key = new AzureKeyCredential("<your-key-credential>");
var endpoint = "<your-endpoint-uri>";

const emailClient = new EmailClient(endpoint, key);
```

---

For simplicity, this article uses connection strings, but in production environments, we recommend using [service principals](../identity/service-principal.md).

## Basic email sending

### Send an email message

To send an email message, call the `beginSend` function from the `EmailClient`. This method returns a poller that checks on the status of the operation and retrieves the result once finished.
> **Note:**
> In `@azure/communication-email` version 3.1.0 and later, the `isStarted` property was removed from `poller.getOperationState()`. The sample code uses the `status` field instead to validate that the poller starts successfully.


```javascript

async function main() {
  const POLLER_WAIT_TIME = 10
  try {
    const message = {
      senderAddress: "<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>",
      content: {
        subject: "Welcome to Azure Communication Services Email",
        plainText: "This email message is sent from Azure Communication Services Email using the JavaScript SDK.",
      },
      recipients: {
        to: [
          {
            address: "<emailalias@emaildomain.com>",
            displayName: "Customer Name",
          },
        ],
      },
    };

    const poller = await emailClient.beginSend(message);

    if (poller.getOperationState().status !== "running") {
      throw "Poller failed to start.";
    }

    let timeElapsed = 0;
    while(!poller.isDone()) {
      poller.poll();
      console.log("Email send polling in progress");

      await new Promise(resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
      timeElapsed += 10;

      if(timeElapsed > 18 * POLLER_WAIT_TIME) {
        throw "Polling timed out.";
      }
    }

    if(poller.getResult().status === KnownEmailSendStatus.Succeeded) {
      console.log(`Successfully sent the email (operation id: ${poller.getResult().id})`);
    }
    else {
      throw poller.getResult().error;
    }
  } catch (e) {
    console.log(e);
  }
}

main();
```

Make these replacements in the code:

- Replace `<emailalias@emaildomain.com>` with the email address you would like to send a message to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.

### Run the code

Use the node command to run the code you added to the `send-email.js` file.

```console
node ./send-email.js
```

### Sample code

You can download the sample app from GitHub Azure Samples [Send Email for JavaScript](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/send-email).



**Applies to: programming-language-java**


Get started with Azure Communication Services by using the Communication Services Java Email SDK to send Email messages.

> **Tip:**
> Jump-start your email sending experience with Azure Communication Services by using the [Basic Email Sending](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/send-email) and [Advanced Email Sending](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/send-email-advanced) sample code on GitHub.

## Understand the email object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Email SDK for Java.

| Name | Description |
| --- | --- |
| EmailAddress | This class contains an email address and an option for a display name. |
| EmailAttachment | This interface creates an email attachment by accepting a unique ID, email attachment [MIME type](../../concepts/email/email-attachment-allowed-mime-types.md) string, a string of content bytes, and an optional content ID to define it as an inline attachment. |
| EmailClient | This class is needed for all email functionality. You instantiate it with your connection string and use it to send email messages. |
| EmailMessage | This class combines the sender, content, and recipients. Custom headers, attachments, and reply-to email addresses can optionally be added, as well. |
| EmailSendResult | This class holds the results of the email send operation. It has an operation ID, operation status, and error object (when applicable). |
| EmailSendStatus | This class represents the set of statuses of an email send operation. |

EmailSendResult returns the following status on the email operation performed.

| Status Name | Description |
| --- | --- |
| NOT_STARTED | We're not sending this status from our service at this time. |
| IN_PROGRESS | The email send operation is currently in progress and being processed. |
| SUCCESSFULLY_COMPLETED | The email send operation completed without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](handle-email-events.md) |
| FAILED | The email send operation wasn't successful and encountered an error. The email wasn't sent. The result contains an error object with more details on the reason for failure. |

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Java Development Kit (JDK)](https://www.microsoft.com/openjdk) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).
- A deployed Communication Services resource and connection string. For details, see [Create a Communication Services resource](../create-communication-resource.md).
- To start sending emails, create an [Azure Email Communication Services resource](create-email-communication-resource.md).
- A setup managed identity for a development environment, [see Authorize access with managed identity](../identity/service-principal.md?pivot="programming-language-java").

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> You can also send an email from our own verified domain [Create and manage Email Communication Service resources](add-custom-verified-domains.md).

### Prerequisite check
- In a terminal or command window, run `mvn -v` to check that Maven is installed.
- To view the domains verified with your Email Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/). Locate your Email Communication Services resource and open the **Provision domains** tab from the left navigation panel.

## Set up the application environment

To set up an environment for sending emails, take the steps in the following sections.

### Create a new Java application

Open your terminal or command window and navigate to the directory where you would like to create your Java application. Run the following command to generate the Java project from the maven-archetype-quickstart template.

```console
mvn archetype:generate -DarchetypeArtifactId="maven-archetype-quickstart" -DarchetypeGroupId="org.apache.maven.archetypes" -DarchetypeVersion="1.4" -DgroupId="com.communication.quickstart" -DartifactId="communication-quickstart"
```

The `generate` goal creates a directory with the same name as the `artifactId` value. Under this directory, the **src/main/java** directory contains the project source code, the **src/test/java directory** contains the test source, and the **pom.xml** file is the project's Project Object Model (POM).

### Install the package

Open the `pom.xml` file in your text editor. Add the following dependency element to the group of dependencies.

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
import com.azure.core.util.polling.*;

public class App
{
    public static void main( String[] args )
    {
        // Quickstart code goes here.
    }
}
```

## Creating the email client with authentication

There are a few different options available for authenticating an email client.

#### [Connection String](#tab/connection-string)

To authenticate a client, you instantiate an `EmailClient` with your connection string. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string). You can also initialize the client with any custom HTTP client that implements the `com.azure.core.http.HttpClient` interface.

To instantiate a synchronous client, add the following code to the `main` method:

```java
// You can get your connection string from your resource in the Azure portal.
String connectionString = "endpoint=https://<resource-name>.communication.azure.com/;accesskey=<access-key>";

EmailClient emailClient = new EmailClientBuilder()
    .connectionString(connectionString)
    .buildClient();
```

To instantiate an asynchronous client, add the following code to the `main` method:

```java
// You can get your connection string from your resource in the Azure portal.
String connectionString = "endpoint=https://<resource-name>.communication.azure.com/;accesskey=<access-key>";

EmailAsyncClient emailAsyncClient = new EmailClientBuilder()
    .connectionString(connectionString)
    .buildAsyncClient();
```

<a name='azure-active-directory'></a>

#### [Microsoft Entra ID](#tab/aad)

A [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/identity/azure-identity#defaultazurecredential) object must be passed to the `EmailClientBuilder` via the `credential()` method. An endpoint must also be set via the `endpoint()` method.

The `AZURE_CLIENT_SECRET`, `AZURE_CLIENT_ID`, and `AZURE_TENANT_ID` environment variables are needed to create a `DefaultAzureCredential` object.

To instantiate a synchronous client, add the following code to the `main` method:

```java
// You can find your endpoint and access key from your resource in the Azure portal
String endpoint = "https://<resource-name>.communication.azure.com/";
EmailClient emailClient = new EmailClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

To instantiate an asynchronous client, add the following code to the `main` method:

```java
// You can find your endpoint and access key from your resource in the Azure portal
String endpoint = "https://<resource-name>.communication.azure.com/";
EmailAsyncClient emailAsyncClient = new EmailClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildAsyncClient();
```

#### [AzureKeyCredential](#tab/azurekeycredential)

You can also create and authenticate email clients using the endpoint and Azure Key Credential acquired from an Azure Communication Resource in the [Azure portal](https://portal.azure.com/).

To instantiate a synchronous client, add the following code to the `main` method:

```java
String endpoint = "https://<resource-name>.communication.azure.com";
AzureKeyCredential azureKeyCredential = new AzureKeyCredential("<access-key>");
EmailClient emailClient = new EmailClientBuilder()
    .endpoint(endpoint)
    .credential(azureKeyCredential)
    .buildClient();
```

To instantiate an asynchronous client, add the following code to the `main` method:

```java
String endpoint = "https://<resource-name>.communication.azure.com";
AzureKeyCredential azureKeyCredential = new AzureKeyCredential("<access-key>");
EmailClient emailClient = new EmailClientBuilder()
    .endpoint(endpoint)
    .credential(azureKeyCredential)
    .buildClient();
```

---

For simplicity, this article uses connection strings, but in production environments, we recommend using [service principals](../identity/service-principal.md).

## Basic email sending

You can compose an email message using the `EmailMessage` object in the SDK.

```java
EmailMessage message = new EmailMessage()
    .setSenderAddress("<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>")
    .setToRecipients("<emailalias@emaildomain.com>")
    .setSubject("Welcome to Azure Communication Services Email")
    .setBodyPlainText("This email message is sent from Azure Communication Services Email using the Java SDK.");
```

Make these replacements in the code:
- Replace `<emailalias@emaildomain.com>` with the email address you would like to send a message to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.

To send the email message, call the `beginSend` function from the `EmailClient`.

## [Async Client](#tab/async-client)

Calling `beginSend` on the async client returns a `PollerFlux` object to which you can subscribe. The callbacks defined in the subscribe method are triggered once the email sending operation is complete. **Note that the initial request to send an email will not be sent until a subscriber is set up.**

```java
Duration MAIN_THREAD_WAIT_TIME = Duration.ofSeconds(30);

// ExecutorService to run the polling in a separate thread
ExecutorService executorService = Executors.newSingleThreadExecutor();

PollerFlux<EmailSendResult, EmailSendResult> poller = emailAsyncClient.beginSend(emailMessage);

executorService.submit(() -> {
    // The initial request is sent out as soon as we subscribe the to PollerFlux object
    poller.subscribe(
        response -> {
            if (response.getStatus() == LongRunningOperationStatus.SUCCESSFULLY_COMPLETED) {
                System.out.printf("Successfully sent the email (operation id: %s)\n", response.getValue().getId());
            }
            else {
                // The operation ID can be retrieved as soon as the first response is received from the PollerFlux.
                System.out.println("Email send status: " + response.getStatus() + ", operation id: " + response.getValue().getId());
            }
        },
        error -> {
            System.out.println("Error occurred while sending email: " + error.getMessage());
        }
    );
});

// In a real application, you might have a mechanism to keep the main thread alive.
// For this sample we will keep the main thread alive for 30 seconds to make sure the child thread has time to receive the SUCCESSFULLY_COMPLETED status.
try {
    Thread.sleep(MAIN_THREAD_WAIT_TIME.toMillis());
} catch (InterruptedException e) {
    e.printStackTrace();
}

executorService.shutdown();
System.out.println("Main thread ends.");
```

## [Sync Client](#tab/sync-client)

Calling `beginSend` on the sync client returns a `SyncPoller` object, which can be used to check on the status of the operation and retrieve the result once it finishes. The initial request to send an email starts as soon as the `beginSend` method is called. **Sending an email is a long running operation. Its important to note that the `getFinalResult()` method on the poller is a blocking operation until a terminal state (`SUCCESSFULLY_COMPLETED` or `FAILED`) is reached.** We recommend that you do manual polling at an interval that's appropriate for your application needs as demonstrated in the following sample.

```java
try
{
    SyncPoller<EmailSendResult, EmailSendResult> poller = emailClient.beginSend(message, null); // This will send out the initial request to send an email

    PollResponse<EmailSendResult> pollResponse = null;

    Duration timeElapsed = Duration.ofSeconds(0);
    Duration POLLER_WAIT_TIME = Duration.ofSeconds(10);

    // Polling is done manually to avoid blocking the application in case of an error
    while (pollResponse == null
            || pollResponse.getStatus() == LongRunningOperationStatus.NOT_STARTED
            || pollResponse.getStatus() == LongRunningOperationStatus.IN_PROGRESS)
    {
        pollResponse = poller.poll();
        // The operation ID can be retrieved as soon as .poll() is called on the poller
        System.out.println("Email send poller status: " + pollResponse.getStatus() + ", operation id: " + pollResponse.getValue().getId());

        Thread.sleep(POLLER_WAIT_TIME.toMillis());
        timeElapsed = timeElapsed.plus(POLLER_WAIT_TIME);

        if (timeElapsed.compareTo(POLLER_WAIT_TIME.multipliedBy(18)) >= 0)
        {
            throw new RuntimeException("Polling timed out.");
        }
    }

    if (poller.getFinalResult().getStatus() == EmailSendStatus.SUCCEEDED)
    {
        System.out.printf("Successfully sent the email (operation id: %s)", poller.getFinalResult().getId());
    }
    else
    {
        throw new RuntimeException(poller.getFinalResult().getError().getMessage());
    }
}
catch (Exception exception)
{
    System.out.println(exception.getMessage());
}
```

---

### Run the code

1. Navigate to the directory that contains the `pom.xml` file and compile the project using the `mvn` command.

   ```console
   mvn compile
   ```

1. Build the package.

   ```console
   mvn package
   ```

1. Run the following `mvn` command to start the app.

   ```console
   mvn exec:java -D"exec.mainClass"="com.communication.quickstart.App" -D"exec.cleanupDaemonThreads"="false"
   ```

### Sample code

You can download the sample app from GitHub Azure Samples [Send Email for Java](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/send-email)



**Applies to: programming-language-python**


Get started with Azure Communication Services by using the Communication Services Python Email SDK to send Email messages.

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
            "contentInBase64": "str",  # Base64 encoded contents of the attachment. Required.
            "contentType": "str",  # MIME type of the content being attached. Required.
            "name": "str"  # Name of the attachment. Required.
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
| Succeeded | The email send operation completed without error and the email is out for delivery. Any detailed status about the email delivery beyond this stage can be obtained either through Azure Monitor or through Azure Event Grid. [Learn how to subscribe to email events](handle-email-events.md) |
| Failed | The email send operation wasn't successful and encountered an error. The email wasn't sent. The result contains an error object with more details on the reason for failure. |

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python](https://www.python.org/downloads/) 3.7+.
- An Azure Email Communication Services resource created and ready with a provisioned domain. [Create an Email Communication Resource](create-email-communication-resource.md).
- An active Azure Communication Services resource connected to an Email Domain and its connection string. [Connect a verified email domain to send email](connect-email-communication-resource.md).

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

> **Note:**
> We can also send an email from our own verified domain. [Add custom verified domains to Email Communication Service](add-azure-managed-domains.md).

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

Instantiate an **EmailClient** with your connection string. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).

```python
# Create the EmailClient object that you use to send Email messages.
email_client = EmailClient.from_connection_string(<connection_string>)
```

<a name='azure-active-directory'></a>

#### [Microsoft Entra ID](#tab/aad)

You can also use Active Directory authentication using [DefaultAzureCredential](../../concepts/authentication.md).

```python
from azure.communication.email import EmailClient
from azure.identity import DefaultAzureCredential

# To use Azure Active Directory Authentication (DefaultAzureCredential) make sure to have AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET as env variables.
endpoint = "https://<resource-name>.communication.azure.com"
email_client = EmailClient(endpoint, DefaultAzureCredential())
```

#### [AzureKeyCredential](#tab/azurekeycredential)

Email clients can also be authenticated using an [AzureKeyCredential](https://learn.microsoft.com/python/api/azure-core/azure.core.credentials.azurekeycredential). Both the `key` and the `endpoint` can be founded on the **Keys** panel under **Settings** in your Communication Services Resource.

```python
from azure.communication.email import EmailClient
from azure.core.credentials import AzureKeyCredential

key = AzureKeyCredential("<your-key-credential>");
endpoint = "<your-endpoint-uri>";

email_client = EmailClient(endpoint, key);
```

---

For simplicity, this article uses connection strings, but in production environments, we recommend using [service principals](../identity/service-principal.md).

## Basic email sending 

### Send an email message

To send an email message, you need to:
- Construct the message with the following values:
   - `senderAddress`: A valid sender email address, found in the MailFrom field in the overview pane of the domain linked to your Email Communication Services Resource.
   - `recipients`: An object with a list of email recipients, and optionally, lists of CC & BCC email recipients. 
   - `content`: An object containing the subject, and optionally the plaintext or HTML content, of an email message.
- Call the `begin_send` method, which returns the result of the operation. 

```python
message = {
    "content": {
        "subject": "This is the subject",
        "plainText": "This is the body",
        "html": "<html><h1>This is the body</h1></html>"
    },
    "recipients": {
        "to": [
            {
                "address": "<emailalias@emaildomain.com>",
                "displayName": "Customer Name"
            }
        ]
    },
    "senderAddress": "<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>"
}

poller = email_client.begin_send(message)
print("Result: " + poller.result())

```

Make these replacements in the code:

- Replace `<emailalias@emaildomain.com>` with the email address you would like to send a message to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.

### Get the status of the email delivery

We can poll for the status of the email delivery by setting a loop on the operation status object returned from the EmailClient `begin_send` method:

```python
POLLER_WAIT_TIME = 10

try:
    email_client = EmailClient.from_connection_string(connection_string)

    poller = email_client.begin_send(message);

    time_elapsed = 0
    while not poller.done():
        print("Email send poller status: " + poller.status())

        poller.wait(POLLER_WAIT_TIME)
        time_elapsed += POLLER_WAIT_TIME

        if time_elapsed > 18 * POLLER_WAIT_TIME:
            raise RuntimeError("Polling timed out.")

    if poller.result()["status"] == "Succeeded":
        print(f"Successfully sent the email (operation id: {poller.result()['id']})")
    else:
        raise RuntimeError(str(poller.result()["error"]))

except Exception as ex:
    print(ex)
```

### Run the code

Run the application from your application directory with the `python` command.

```console
python send-email.py
```

### Sample code

You can download the sample app from GitHub Azure Samples [Send email for Python](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/send-email)



**Applies to: platform-nocode**


## Prerequisites

- An Azure account with an active subscription, or [create an Azure account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An active Azure Communication Services resource, or [create a Communication Services resource](../create-communication-resource.md).

- An active Azure Logic Apps resource (logic app) and workflow, or create a new logic app resource and workflow with the trigger that you want to use. Currently, the Azure Communication Services Email connector provides only actions, so your logic app workflow requires a trigger, at minimum. You can create either a [Consumption](../../../logic-apps/quickstart-create-example-consumption-workflow.md) or [Standard](../../../logic-apps/create-single-tenant-workflows-azure-portal.md) logic app resource.

- An Azure Communication Services Email resource with a [configured domain](create-email-communication-resource.md) or [custom domain](add-custom-verified-domains.md).

- An Azure Communication Services resource [connected with an Azure Email domain](connect-email-communication-resource.md).

## Send email

To add a new step to your workflow by using the Azure Communication Services Email connector, follow these steps:

1. In the designer, open your logic app workflow.

   **Consumption**
   
   1. Under the step where you want to add the new action, select **New step**. Alternatively, to add the new action between steps, move your pointer over the arrow between those steps, select the plus sign (+), and select **Add an action**.

   1. Under the **Choose an operation** search box, select **Premium**. In the search box, enter **Azure Communication Email**.

   1. From the actions list, select **Send email**.

      Screenshot that shows the Azure Communication Services Email connector Send email action.

   **Standard**
   
   1. Under the step where you want to add the new action, select the plus sign (**+**). Alternatively, to add the new action between steps, move your pointer over the arrow between those steps, select the plus sign (+), and select **Add an action**.

   1. Under the **Add an action** search box, select **Premium** in the runtime dropdown. In the search box, enter **Azure Communication Email**.

   1. From the actions list, select **Send email**.

1. Provide a name for the connection.

1. Enter the connection string for your Azure Communications Service resource. To find this string, follow these steps:

   1. In the [Azure portal](https://portal.azure.com/), open your Azure Communication Service resource.

   1. On the resource menu, under **Settings**, select **Keys**, and copy the connection string.

      Screenshot that shows the Azure Communication Services Connection String.
 
1. When you're done, select **Create**.

1. In the **From** field, use the email address that you configured in the [prerequisites](#prerequisites). Enter the values for the **To Email**, **Subject**, and **Body** fields, for example:
 
   Screenshot that shows the Azure Communication Services Email connector Send email action input.

1. Save your workflow. On the designer toolbar, select **Save**.

## Test your workflow

Based on whether you have a Consumption or Standard workflow, manually start your workflow:

* **Consumption**: On the designer toolbar, select **Run Trigger** > **Run**.
* **Standard**: On the workflow menu, select **Overview**. On the toolbar, select **Run Trigger** > **Run**.

The workflow creates a user, issues an access token for that user, then removes and deletes the user. You can check the outputs of these actions after the workflow runs successfully.

You should get an email at the specified address. Also, you can use the **Get email message status** action to check the status of emails send through the **Send email** action. For more actions, review the [Azure Communication Services Email connector reference documentation](https://learn.microsoft.com/connectors/acsemail/).

## Clean up workflow resources

To clean up your logic app resource, workflow, and related resources, review [how to clean up Consumption logic app resources](../../../logic-apps/manage-logic-apps-with-azure-portal.md?tabs=consumption#delete-logic-apps) or [how to clean up Standard logic app resources](../../../logic-apps/manage-logic-apps-with-azure-portal.md?tabs=standard#delete-logic-apps).



**Applies to: platform-powershell**


Get started with Azure Communication Services using the Azure PowerShell communication module to send Email messages.

Completing this article incurs a small cost of a few USD cents or less in your Azure account.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services resource created and ready with a provisioned domain. [Create an Email Communication Resource](create-email-communication-resource.md).
- An active Azure Communication Services resource connected to an Email Domain and its connection string. [Connect a verified email domain to send email](connect-email-communication-resource.md).
- The latest [Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azps-windows).

### Prerequisite check
- In a windows PowerShell, run the `Get-Module -ListAvailable -Name Az.Communication` command to check whether the communication module is installed.
- To view the domains verified with your Email Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/). Locate your Email Communication Services resource and open the **Provision domains** tab from the left navigation panel.

## Set up

### Install communication module

Install the Azure Communication Services module for Azure PowerShell using the `Install-Module -Name Az.Communication` command.

```azurepowershell-interactive
Install-Module -Name Az.Communication
```

After installing Communication module, run the `Get-Command -Module Az.Communication` command to get all the communication modules.

```azurepowershell-interactive
Get-Command -Module Az.Communication
```

## Send an email message

Queue an email message to be sent to one or more recipients with only required fields.

```azurepowershell-interactive
$emailRecipientTo = @(
   @{
        Address = "<emailalias@emaildomain.com>"
        DisplayName = "Email DisplayName"
    }
)

$message = @{
    ContentSubject = "Test Email"
    RecipientTo = @($emailRecipientTo)  # Array of email address objects
    SenderAddress = '<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>'   
    ContentPlainText = "This is the first email from ACS - Azure PowerShell"    
}

Send-AzEmailServicedataEmail -Message $Message -endpoint "<yourEndpoint>"
```

Make these replacements in the code:

- Replace `<yourEndpoint>` with your endpoint.
- Replace `<emailalias@emaildomain.com>` with the email address you would like to send a message to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.

Queue an email message to be sent to one or more recipients with all the fields.

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

$fileBytes1 = [System.IO.File]::ReadAllBytes("<file path>")

$fileBytes2 = [System.IO.File]::ReadAllBytes("<image file path>")

$emailAttachment = @(
    @{
        ContentInBase64 = $fileBytes1
        ContentType = "<text/plain>"
        Name = "<test.txt>"
    },
    @{
        ContentInBase64 = $fileBytes2
        ContentType = "<image/png>"
        Name = "<inline-attachment.png>"
        contentId = "<inline-attachment>"
    }
)

$headers = @{
    "Key1" = "Value1"
    "Key2" = "Value2"
    "Importance" = "high"
}

$emailRecipientBcc = @(
   @{
        Address = "<emailbccalias@emaildomain.com>"
        DisplayName = "Email DisplayName"
    }
)

$emailRecipientCc = @(
   @{
        Address = "<emailccalias@emaildomain.com>"
        DisplayName = "Email DisplayName"
    }
)

$emailRecipientReplyTo = @(
   @{
        Address = "<emailreplytoalias@emaildomain.com>"
        DisplayName = "Email DisplayName"
    }
)

$message = @{
    ContentSubject = "Test Email"
    RecipientTo = @($emailRecipientTo)  # Array of email address objects
    SenderAddress = '<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>'
    Attachment = @($emailAttachment) # Array of attachments
    ContentHtml = "<html><head><title>Enter title</title></head><body><img src='cid:inline-attachment' alt='Company Logo'/><h1>This is the first email from ACS - Azure PowerShell</h1></body></html>"
    ContentPlainText = "This is the first email from ACS - Azure PowerShell"
    Header = $headers  # Importance = high/medium/low or X-Priority = 2/3/4  
    RecipientBcc = @($emailRecipientBcc) # Array of email address objects
    RecipientCc = @($emailRecipientCc) # Array of email address objects
    ReplyTo = @($emailRecipientReplyTo) # Array of email address objects
    UserEngagementTrackingDisabled = $true
}

Send-AzEmailServicedataEmail -Message $Message -endpoint "<yourEndpoint>"
```

Make these replacements in the code:

- Replace `<yourEndpoint>` with your endpoint.
- Replace `<emailalias@emaildomain.com> and <emailalias1@emaildomain.com>` with the email addresses you would like to send a message to.
- Replace `<file path> and <image file path>` with the actual file paths of the attachments you want to send.
- Replace `<text/plain> and <image/png>` with the appropriate content types for your attachments.
- Replace `<test.txt> and <inline-attachment.png>` with the filenames of your attachments.
- Replace `<inline-attachment>` with the Content-ID for your inline attachment.
- Replace `<emailbccalias@emaildomain.com>` with the email address you want to send the message to as BCC.
- Replace `<emailccalias@emaildomain.com>` with the email address you want to send the message to as CC.
- Replace `<emailreplytoalias@emaildomain.com>` with the email address you want replies to be sent to.
- Replace `<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>` with the MailFrom address of your verified domain.

### Optional parameters

The following optional parameters are available in Azure PowerShell.

- `ContentHtml` can be used to specify the HTML body of the email.

- `ContentPlainText` used to specify the plain text body of the email.

- `Attachment` sets the list of email attachments. This parameter accepts an array of file paths or attachment objects. We limit the total size of an email request, including both regular and inline attachments, to 10 MB.

- `Header` custom email headers to be passed and sets email importance level (high, normal, or low).

- `RecipientBcc` array of recipients for the BCC field.

- `RecipientCc` array of recipients for the CC field.

- `ReplyTo` array of email addresses where recipients replies are sent.

- `UserEngagementTrackingDisabled` indicates whether user engagement tracking needs to be disabled for this request if the resource-level user engagement tracking setting was already enabled in the control plane.

You can also use a list of recipients with `RecipientCc` and `RecipientBcc` similar to `RecipientTo`. There needs to be at least one recipient in `RecipientTo` or `RecipientCc` or `RecipientBcc`.



## Troubleshooting

### Email delivery

To troubleshoot issues related to email delivery, you can [get status of the email delivery](handle-email-events.md) to capture delivery details.

> **Important:**
> The success result returned by polling for the status of the send operation only validates the fact that the email successfully sent out for delivery. For more information about the status of the delivery on the recipient end, see [how to handle email events](handle-email-events.md).

### Email throttling

If your application is hanging, it could be due to email sending being throttled. You can [handle tier limits through logging or by implementing a custom policy](send-email-advanced/throw-exception-when-tier-limit-reached.md).

> **Note:**
> This sandbox is intended to help developers start building the application. You can gradually request to increase the sending volume once the application is ready to go live. Submit a support request to raise your desired sending limit if you require sending a volume of messages exceeding the rate limits.

## Clean up Azure Communication Service resources

To clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other associated resources. Learn more about [cleaning up resources](../create-communication-resource.md#clean-up-resources).

## Next steps

This article describes how to send emails using Azure Communication Services. You can also:

 - Learn about [Email concepts](../../concepts/email/email-overview.md).
 - Familiarize yourself with [email client library](../../concepts/email/sdk-features.md).
 - Learn more about [how to send a chat message](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/chat/logic-app.md) from Power Automate using Azure Communication Services.
 - Learn more about access tokens check-in [Create and Manage Azure Communication Services users and access tokens](../identity/access-tokens.md).
