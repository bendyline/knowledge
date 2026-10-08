---
title: Hydrating messageId using EmailClient
titleSuffix: An Azure Communication Services Quickstart
description: This article describes how to hydrate messageId using EmailClient with Azure Communication Services.
author: fanruisun
manager: koagbakp
services: azure-communication-services
ms.author: fanruisun
ms.date: 08/04/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: devx-track-dotnet, devx-track-extended-java
zone_pivot_groups: acs-csharp-java
---

# Hydrating messageId using EmailClient


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to hydrate messageId using EmailClient with our Email SDKs.

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


## Hydrating messageId using EmailClient

You can hydrate a messageId (operationId) using the EmailClient to track and manage email operations more effectively. This process is called "rehydration" and allows you to continue monitoring the status of an email when you don't have the original EmailSendOperation object.

### Create the email client

```csharp
// Create the EmailClient
var connectionString = "<ACS_CONNECTION_STRING>";
var emailClient = new EmailClient(connectionString);
```

### Configure email details

```csharp
var sender = "<SENDER_EMAIL>";
var recipient = "<RECIPIENT_EMAIL>";
var subject = "Send email with manual status polling using operationID";
```

### Create email content

```csharp
var emailContent = new EmailContent(subject)
{
    PlainText = "This is plain text mail send test body \n Best Wishes!!",
    Html = "<html><body><h1>Quick send email test</h1><br/><h4>Communication email as a service mail send app working properly</h4><p>Happy Learning!!</p></body></html>"
};

var emailMessage = new EmailMessage(sender, recipient, emailContent);
```

### Send email and capture operation ID

```csharp
var emailSendOperation = await emailClient.SendAsync(
    wait: WaitUntil.Started,
    message: emailMessage);

// Get the OperationId so that it can be used for rehydrating an EmailSendOperation object
// and use that object to poll for the status of the email send operation.
var operationId = emailSendOperation.Id;
Console.WriteLine($"Email operation id = {operationId}");
```

The `operationId` is the key identifier that allows you to rehydrate the operation later. In real applications, you would typically store this ID for future reference.

### Rehydrate operation ID and poll for completion

```csharp
// Poll for the status of the email send operation using the previous operationId
await PollForEmailSendOperationStatusWithExistingOperationId(emailClient, operationId);

private static async Task PollForEmailSendOperationStatusWithExistingOperationId(EmailClient emailClient, string operationId)
{
    // Rehydrate a new EmailSendOperation object using the given operationId
    // Rehydration refers to the process of creating a new EmailSendOperation object using the operation ID from a previous EmailSendOperation.
    // This is necessary in case you want to continue monitoring the status of the email manually, when you don't have 
    // the original EmailSendOperation object from the initial request.
    EmailSendOperation rehydratedEmailSendOperation = new EmailSendOperation(operationId, emailClient);

    // Call UpdateStatus on the rehydrated email send operation to poll for the status manually.
    try
    {
        while (true)
        {
            await rehydratedEmailSendOperation.UpdateStatusAsync();
            if (rehydratedEmailSendOperation.HasCompleted)
            {
                break;
            }
            await Task.Delay(100);
        }

        if (rehydratedEmailSendOperation.HasValue)
        {
            Console.WriteLine($"Email queued for delivery. Status = {rehydratedEmailSendOperation.Value.Status}");
        }
    }
    catch (RequestFailedException ex)
    {
        Console.WriteLine($"Email send failed with Code = {ex.ErrorCode} and Message = {ex.Message}");
    }
}
```

### Sample code

You can download the sample app demonstrating this action from GitHub Azure Samples [Send Email With Manual Polling Using Operation Id](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/SendEmailAdvanced/SendEmailWithManualPollingUsingOperationId).



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


## Hydrate messageId using EmailClient for Java

Use the Azure Communication Services Email SDK for Java. Add the following dependency to your `pom.xml` file:


### Create an email message

```java
// Create an email message with both plain text and HTML content
EmailMessage message = new EmailMessage()
        .setSenderAddress(senderAddress)
        .setToRecipients(recipientAddress)
        .setSubject("Test email from Java Sample")
        .setBodyPlainText("This is plaintext body of test email.")
        .setBodyHtml("<html><h1>This is the html body of test email.</h1></html>");
```

### Send email and capture operation ID

```java
// STEP 1: Send the email and get the initial poller
// This starts the email send operation and returns a poller to monitor progress
SyncPoller<EmailSendResult, EmailSendResult> poller = client.beginSend(message);

// Poll once to get the initial response and extract the operation ID
PollResponse<EmailSendResult> response = poller.poll();
String operationId = response.getValue().getId();
System.out.printf("Sent email send request from first poller (operation id: %s)\n", operationId);
```

The `operationId` is the key identifier that allows you to rehydrate the poller later. In real applications, you would typically store this ID in a database for future reference.

### Rehydrate the poller using operation ID

```java
// STEP 2: Demonstrate rehydration using the operation ID
// In a real scenario, you might store this operationId in a database
// and retrieve it later to continue monitoring the operation
System.out.print("Started polling from second poller\n");

// REHYDRATION: Create a new poller using the existing operationId
// This is the key concept - you can recreate a poller from just the operationId
SyncPoller<EmailSendResult, EmailSendResult> poller2 = client.beginSend(operationId);
```

### Poll for completion and get results

```java
// Wait for the email operation to complete using the rehydrated poller
PollResponse<EmailSendResult> response2 = poller2.waitForCompletion();

// Display the final result
System.out.printf("Successfully sent the email (operation id: %s)\n", poller2.getFinalResult().getId());
```

### Sample code

You can download the sample app demonstrating this action from GitHub Azure Samples [Send Email Rehydrate Poller for Java](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/send-email-advanced/send-email-rehydrate-poller).


### Email delivery

To troubleshoot issues related to email delivery, you can [get status of the email delivery](../handle-email-events.md) to capture delivery details.

> **Important:**
> The success result returned by polling for the status of the send operation only validates that the email is sent out for delivery. For more information about the status of the delivery on the recipient end, see [how to handle email events](../handle-email-events.md).

### Email throttling

If your application is hanging, it could be due to email sending being throttled. You can [handle email throttling by logging or by implementing a custom policy](throw-exception-when-tier-limit-reached.md).

> **Note:**
> This sandbox is intended to help developers start building the application. You can gradually request to increase the sending volume once the application is ready to go live. Submit a support request to raise your desired sending limit if you require sending a volume of messages exceeding the rate limits.

## Clean up Azure Communication Service resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../../create-communication-resource.md#clean-up-resources).

## Next steps

 - Learn how to [send email to multiple recipients](send-email-to-multiple-recipients.md)
 - Learn more about [sending email with attachments](send-email-with-attachments.md)
 - Familiarize yourself with [email client library](../../../concepts/email/sdk-features.md)
