---
title: Azure Service Bus Queue Quickstart for .NET Apps
description: This quickstart shows you how to send messages to and receive messages from Azure Service Bus queues using the .NET programming language.
#customer intent: As a .NET developer, I want to learn how to send messages to an Azure Service Bus queue so that I can implement message-based communication in my application.
ms.topic: quickstart
ms.tgt_pltfrm: dotnet
ms.date: 02/12/2026
ms.devlang: csharp
ms.custom: mode-api, passwordless-dotnet, devx-track-dotnet
# Customer intent: I want to learn how to send messages to an Azure Service Bus queue and receive messages from it.
---

# Quickstart: Send and receive messages from an Azure Service Bus queue (.NET)

In this quickstart, you do the following steps:

1. Create a Service Bus namespace, using the Azure portal.
1. Create a Service Bus queue, using the Azure portal.
1. Write a .NET console application to send a set of messages to the queue.
1. Write a .NET console application to receive those messages from the queue.

    This quickstart provides step-by-step instructions to implement a simple scenario of sending a batch of messages to a Service Bus queue and then receiving them. For an overview of the .NET client library, see [Azure Service Bus client library for .NET](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/servicebus/Azure.Messaging.ServiceBus/README.md). For more samples, see [Service Bus .NET samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus/samples).

## Prerequisites

If you're new to the service, see [Service Bus overview](service-bus-messaging-overview.md) before you do this quickstart.

- **Azure subscription**. To use Azure services, including Azure Service Bus, you need a subscription. If you don't have an existing Azure account, you can sign up for a [free trial](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- **Visual Studio 2022** or later. The sample application makes use of new features that were introduced in C# 10. You can still use the Service Bus client library with previous C# language versions, but the syntax might vary. To use the latest syntax, we recommend that you install .NET 6.0, or higher and set the language version to `latest`. If you're using Visual Studio, versions before Visual Studio 2022 aren't compatible with the tools needed to build C# 10 projects.


## Create a namespace in the Azure portal

To start using Service Bus messaging entities in Azure, create a namespace with a name that's unique across Azure. A namespace provides a scoping container for Service Bus resources, such as queues and topics, in your application.

To create a namespace:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select the flyout menu from the top left and go to the [**All services** page](https://portal.azure.com/#allservices/category/All).
1. On the left navigation bar, select **Integration**.
1. Scroll down to **Messaging services**, hover your mouse over **Service Bus**, and then select **Create**. 
    
   Screenshot showing selection of Create a resource, Integration, and then Service Bus in the menu.

1. In the **Basics** tab of the **Create namespace** page, follow these steps:

   1. For **Subscription**, choose an Azure subscription in which to create the namespace.
   1. For **Resource group**, choose an existing resource group, or create a new one.      
   1. Enter a **Namespace name** that meets the following naming conventions:

      - The name must be unique across Azure. The system immediately checks to see if the name is available. 
      - The name length is at least 6 and at most 50 characters.
      - The name can contain only letters, numbers, and hyphens `-`.
      - The name must start with a letter and end with a letter or number.
      - The name doesn't end with `-sb` or `-mgmt`.

   1. For **Location**, choose the region to host your namespace.
   1. For **Pricing tier**, select the pricing tier (Basic, Standard, or Premium) for the namespace. For this quickstart, select **Standard**. 
    
      If you select the **Premium** tier, you can enable **geo-replication** for the namespace. The geo-replication feature ensures that the metadata and data of a namespace are continuously replicated from a primary region to one or more secondary regions.
    
      > **Important:**
      > If you want to use [topics and subscriptions](service-bus-queues-topics-subscriptions.md#topics-and-subscriptions), choose either Standard or Premium. The Basic pricing tier doesn't support topics and subscriptions. 

      If you selected the **Premium** pricing tier, specify the number of **messaging units**. The premium tier provides resource isolation at the CPU and memory level so that each workload runs in isolation. This resource container is called as a *messaging unit*. A premium namespace has at least one messaging unit. You can select 1, 2, 4, 8, or 16 messaging units for each Service Bus Premium namespace. For more information, see [Service Bus premium messaging tier](service-bus-premium-messaging.md).

   1. Select **Review + create** at the bottom of the page. 
   
      Screenshot showing the Create a namespace page.

   1. On the **Review + create** page, review the settings, and select **Create**. 

1. After the deployment of the resource is successful, select **Go to resource** on the deployment page. 

   Screenshot showing the deployment succeeded page with the Go to resource link.

1. You see the home page for your service bus namespace. 

   Screenshot showing the home page of the Service Bus namespace created.




## Create a queue in the Azure portal

1. On the **Service Bus Namespace** page, expand **Entities** on the navigational menu to the left, and select **Queues**.
1. On the **Queues** page, on the toolbar, select **+ Queue**.
1. Enter a name for the queue. Leave the other values with their defaults.
1. Select **Create**.
 
   Screenshot that shows the Create queue page.



> **Important:**
> If you're new to Azure, you might find the **Connection String** option easier to follow. Select the **Connection String** tab to see instructions on using a connection string in this quickstart. We recommend that you use the **Passwordless** option in real-world applications and production environments. 


## Authenticate the app to Azure

This article shows you two ways of connecting to Azure Service Bus: **passwordless** and **connection string**. 

The first option shows you how to use your security principal in Microsoft Entra ID and role-based access control (RBAC) to connect to a Service Bus namespace. You don't need to worry about having a hard-coded connection string in your code, in a configuration file, or in a secure storage like Azure Key Vault. 

The second option shows you how to use a connection string to connect to a Service Bus namespace. If you're new to Azure, you might find the connection string option easier to follow. We recommend using the passwordless option in real-world applications and production environments. For more information, see [Service Bus authentication and authorization](service-bus-authentication-and-authorization.md). To read more about passwordless authentication, see [Authenticate .NET apps](https://learn.microsoft.com/dotnet/azure/sdk/authentication?tabs=command-line).

## [Passwordless (Recommended)](#tab/passwordless)

<a name='assign-roles-to-your-azure-ad-user'></a>

### Assign roles to your Microsoft Entra user


When you develop locally, make sure that the user account that connects to Azure Service Bus has the correct permissions. You need the [Azure Service Bus Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-service-bus-data-owner) role in order to send and receive messages. To assign yourself this role, you need the User Access Administrator role, or another role that includes the `Microsoft.Authorization/roleAssignments/write` action.

You can assign Azure RBAC roles to a user using the Azure portal, Azure CLI, or Azure PowerShell. To learn more the available scopes for role assignments, see [Understand scope for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md).

The following example assigns the `Azure Service Bus Data Owner` role to your user account, which provides full access to Azure Service Bus resources. In a real scenario, follow the [principle of least privilege](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/secure-least-privileged-access.md) to give users only the minimum permissions needed for a more secure production environment.

### Azure built-in roles for Azure Service Bus

For Azure Service Bus, the management of namespaces and all related resources through the Azure portal and the Azure resource management API is already protected using the Azure RBAC model. Azure provides the following Azure built-in roles for authorizing access to a Service Bus namespace:

- [Azure Service Bus Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-service-bus-data-owner): Enables data access to Service Bus namespace and its entities, including queues, topics, subscriptions, and filters. A member of this role can send and receive messages from queues or topics/subscriptions. 
- [Azure Service Bus Data Sender](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-service-bus-data-sender): Use this role to give the `send` access to Service Bus namespace and its entities.
- [Azure Service Bus Data Receiver](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-service-bus-data-receiver): Use this role to give the `receive` access to Service Bus namespace and its entities.

If you want to create a custom role, see [Rights required for Service Bus operations](service-bus-sas.md#rights-required-for-service-bus-operations).

<a name='add-azure-ad-user-to-azure-service-bus-owner-role'></a>

### Add Microsoft Entra user to Azure Service Bus Owner role

Add your Microsoft Entra user name to the **Azure Service Bus Data Owner** role at the Service Bus namespace level. This configuration allows an app that runs in the context of your user account to send messages to a queue or a topic. It can receive messages from a queue or a topic's subscription. 

> **Important:**
> In most cases, it takes a minute or two for the role assignment to propagate in Azure. In rare cases, it might take up to **eight minutes**. If you receive authentication errors when you first run your code, wait a few moments and try again.

1. If you don't have the Service Bus Namespace page open in the Azure portal, locate your Service Bus namespace using the main search bar or left navigation.
1. On the **Overview** page, select **Access control (IAM)** from the left-hand menu.	
1. On the **Access control (IAM)** page, select the **Role assignments** tab.
1. Select **+ Add** from the top menu and then **Add role assignment**.

   A screenshot showing how to assign a role.

1. Use the search box to filter the results to the desired role. For this example, search for `Azure Service Bus Data Owner` and select the matching result. Then choose **Next**.
1. Under **Assign access to**, select **User, group, or service principal**, and then choose **+ Select members**.
1. In the dialog, search for your Microsoft Entra username (usually your *user@domain* email address) and then choose **Select** at the bottom of the dialog. 
1. Select **Review + assign** to go to the final page, and then **Review + assign** again to complete the process.


## [Connection String](#tab/connection-string)

## Get the connection string

Creating a new namespace automatically generates an initial Shared Access Signature (SAS) policy with primary and secondary keys. It creates primary and secondary connection strings that each grant full control over all aspects of the namespace. For more information about how to create rules with more constrained rights for regular senders and receivers, see [Service Bus authentication and authorization](service-bus-authentication-and-authorization.md).

A client can use the connection string to connect to the Service Bus namespace. To copy the primary connection string for your namespace, follow these steps: 

1. On the **Service Bus Namespace** page, in the left menu, expand **Settings**, then select **Shared access policies**.
1. On the **Shared access policies** page, select **RootManageSharedAccessKey**.
1. In the **Policy: RootManageSharedAccessKey** window, select the copy button next to **Primary Connection String**, to copy the connection string to your clipboard for later use. Paste this value into Notepad or some other temporary location.

   Screenshot shows an SAS policy called RootManageSharedAccessKey, which includes keys and connection strings.

   You can use this page to copy primary key, secondary key, primary connection string, and secondary connection string. 

---


## Launch Visual Studio

### [Passwordless](#tab/passwordless)

You can authorize access to the service bus namespace using the following steps:

1. Launch Visual Studio. If you see the **Get started** window, select the **Continue without code** link in the right pane.
1. Select the **Sign in** button in the top right of Visual Studio.

    Screenshot of the Sign in button in Visual Studio.

1. Sign-in using the Microsoft Entra account you assigned a role to previously.

    Screenshot of the account selection dialog.

### [Connection String](#tab/connection-string)
Launch Visual Studio. If you see the **Get started** window, select the **Continue without code** link in the right pane.

---

## Send messages to the queue

This section shows you how to create a .NET console application to send messages to a Service Bus queue.

> **Note:**
> This quick start provides step-by-step instructions to implement a simple scenario of sending a batch of messages to a Service Bus queue and then receiving them. For more samples on other and advanced scenarios, see [Service Bus .NET samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus/samples).

### Create a console application

1. In Visual Studio, select **File** -> **New** -> **Project** menu. 
1. On the **Create a new project** dialog box, do the following steps: If you don't see this dialog box, select **File** on the menu, select **New**, and then select **Project**.
    1. Select **C#** for the programming language.
    1. Select **Console** for the type of the application.
    1. Select **Console App** from the results list.
    1. Then, select **Next**.

        Screenshot of the Create a new project dialog box with C# and Console selected.
1. Enter **QueueSender** for the project name, **ServiceBusQueueQuickStart** for the solution name, and then select **Next**.

    Screenshot of the solution and project names in the Configure your new project dialog box.
1. On the **Additional information** page, select **Create** to create the solution and the project.

### Add the NuGet packages to the project

### [Passwordless](#tab/passwordless)

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** from the menu.
1. Run the following command to install the **Azure.Messaging.ServiceBus** NuGet package.

    ```powershell
    Install-Package Azure.Messaging.ServiceBus
    ```
1. Run the following command to install the **Azure.Identity** NuGet package.

    ```powershell
    Install-Package Azure.Identity
    ```

### [Connection String](#tab/connection-string)

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** from the menu.
1. Run the following command to install the **Azure.Messaging.ServiceBus** NuGet package:

    ```powershell
    Install-Package Azure.Messaging.ServiceBus
    ```

---


## Add code to send messages to the queue

1. Replace the contents of `Program.cs` with the following code. The important steps are outlined in the following section, with additional information in the code comments.

    ### [Passwordless](#tab/passwordless)

    * Creates a [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object using the `DefaultAzureCredential` object. `DefaultAzureCredential` automatically discovers and uses the credentials of your Visual Studio sign-in to authenticate to Azure Service Bus.
    * Invokes the [CreateSender](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient.createsender) method on the [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object to create a [ServiceBusSender](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender) object for the specific Service Bus queue.
    * Creates a [ServiceBusMessageBatch](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusmessagebatch) object by using the [ServiceBusSender.CreateMessageBatchAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender.createmessagebatchasync) method.
    * Add messages to the batch using the [ServiceBusMessageBatch.TryAddMessage](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusmessagebatch.tryaddmessage).
    * Sends the batch of messages to the Service Bus queue using the [ServiceBusSender.SendMessagesAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender.sendmessagesasync) method.

    > **Important:**
    > Update placeholder values (`<NAMESPACE-NAME>` and `<QUEUE-NAME>`) in the code snippet with names of your Service Bus namespace and queue.



    ```csharp
    using Azure.Messaging.ServiceBus;
    using Azure.Identity;
    
    // name of your Service Bus queue
    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;
    
    // the sender used to publish messages to the queue
    ServiceBusSender sender;
    
    // number of messages to be sent to the queue
    const int numOfMessages = 3;
    
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // Set the transport type to AmqpWebSockets so that the ServiceBusClient uses the port 443. 
    // If you use the default AmqpTcp, ensure that ports 5671 and 5672 are open.
    var clientOptions = new ServiceBusClientOptions
    { 
        TransportType = ServiceBusTransportType.AmqpWebSockets
    };
    //TODO: Replace the "<NAMESPACE-NAME>" and "<QUEUE-NAME>" placeholders.
    client = new ServiceBusClient(
        "<NAMESPACE-NAME>.servicebus.windows.net",
        new DefaultAzureCredential(),
        clientOptions);
    sender = client.CreateSender("<QUEUE-NAME>");
    
    // create a batch 
    using ServiceBusMessageBatch messageBatch = await sender.CreateMessageBatchAsync();
    
    for (int i = 1; i <= numOfMessages; i++)
    {
        // try adding a message to the batch
        if (!messageBatch.TryAddMessage(new ServiceBusMessage($"Message {i}")))
        {
            // if it is too large for the batch
            throw new Exception($"The message {i} is too large to fit in the batch.");
        }
    }
    
    try
    {
        // Use the producer client to send the batch of messages to the Service Bus queue
        await sender.SendMessagesAsync(messageBatch);
        Console.WriteLine($"A batch of {numOfMessages} messages has been published to the queue.");
    }
    finally
    {
        // Calling DisposeAsync on client types is required to ensure that network
        // resources and other unmanaged objects are properly cleaned up.
        await sender.DisposeAsync();
        await client.DisposeAsync();
    }
    
    Console.WriteLine("Press any key to end the application");
    Console.ReadKey();
    ```

    ### [Connection string](#tab/connection-string)

    * Creates a [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object using the connection string.
    * Invokes the [CreateSender](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient.createsender) method on the [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object to create a [ServiceBusSender](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender) object for the specific Service Bus queue.
    * Creates a [ServiceBusMessageBatch](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusmessagebatch) object by using the [ServiceBusSender.CreateMessageBatchAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender.createmessagebatchasync) method.
    * Add messages to the batch using the [ServiceBusMessageBatch.TryAddMessage](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusmessagebatch.tryaddmessage).
    * Sends the batch of messages to the Service Bus queue using the [ServiceBusSender.SendMessagesAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender.sendmessagesasync) method.

    > **Important:**
    > Update placeholder values (`<NAMESPACE-CONNECTION-STRING>` and `<QUEUE-NAME>`) in the code snippet with names of your Service Bus namespace and queue.


    ```csharp
    using Azure.Messaging.ServiceBus;

    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;
    
    // the sender used to publish messages to the queue
    ServiceBusSender sender;
    
    // number of messages to be sent to the queue
    const int numOfMessages = 3;
    
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // set the transport type to AmqpWebSockets so that the ServiceBusClient uses the port 443. 
    // If you use the default AmqpTcp, you will need to make sure that the ports 5671 and 5672 are open
    
    // TODO: Replace the <NAMESPACE-CONNECTION-STRING> and <QUEUE-NAME> placeholders
    var clientOptions = new ServiceBusClientOptions()
    { 
        TransportType = ServiceBusTransportType.AmqpWebSockets
    };
    client = new ServiceBusClient("<NAMESPACE-CONNECTION-STRING>", clientOptions);
    sender = client.CreateSender("<QUEUE-NAME>");
    
    // create a batch 
    using ServiceBusMessageBatch messageBatch = await sender.CreateMessageBatchAsync();
    
    for (int i = 1; i <= numOfMessages; i++)
    {
        // try adding a message to the batch
        if (!messageBatch.TryAddMessage(new ServiceBusMessage($"Message {i}")))
        {
            // if it is too large for the batch
            throw new Exception($"The message {i} is too large to fit in the batch.");
        }
    }
    
    try
    {
        // Use the producer client to send the batch of messages to the Service Bus queue
        await sender.SendMessagesAsync(messageBatch);
        Console.WriteLine($"A batch of {numOfMessages} messages has been published to the queue.");
    }
    finally
    {
        // Calling DisposeAsync on client types is required to ensure that network
        // resources and other unmanaged objects are properly cleaned up.
        await sender.DisposeAsync();
        await client.DisposeAsync();
    }
    
    Console.WriteLine("Press any key to end the application");
    Console.ReadKey();
    ```

    ---

6. Build the project, and ensure that there are no errors.
7. Run the program and wait for the confirmation message.

    ```bash
    A batch of 3 messages has been published to the queue
    ```

    > **Important:**
    > In most cases, it takes a minute or two for the role assignment to propagate in Azure. In rare cases, it might take up to **eight minutes**. If you receive authentication errors when you first run your code, wait a few moments and try again.
8. In the Azure portal, follow these steps:
    1. Navigate to your Service Bus namespace.
    1. On the **Overview** page, select the queue in the bottom-middle pane.

        Screenshot of the Service Bus Namespace page in the Azure portal with the queue selected.

    1. Notice the values in the **Settings** section.

        Screenshot of the number of messages received and the size of the queue.

    Notice the following values:
    - The **Active** message count value for the queue is now **3**. Each time you run this sender app without retrieving the messages, this value increases by 3.
    - The **current size** of the queue increments each time the app adds messages to the queue.
    - In the **Messages** chart in the bottom **Metrics** section, you can see that there are three incoming messages for the queue.

## Receive messages from the queue

In this section, you create a .NET console application that receives messages from the queue.

> **Note:**
> This quickstart provides step-by-step instructions to implement a scenario of sending a batch of messages to a Service Bus queue and then receiving them. For more samples on other and advanced scenarios, see [Service Bus .NET samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus/samples).

### Create a project for the receiver

1. In the Solution Explorer window, right-click the **ServiceBusQueueQuickStart** solution, point to **Add**, and select **New Project**.
1. Select **Console application**, and select **Next**.
1. Enter **QueueReceiver** for the **Project name**, and select **Create**.
1. In the **Solution Explorer** window, right-click **QueueReceiver**, and select **Set as a Startup Project**.

### Add the NuGet packages to the project

### [Passwordless](#tab/passwordless)

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** from the menu.
1. Select **QueueReceiver** for **Default project**. 

    Screenshot of QueueReceiver project selected in the Package Manager Console.
1. Run the following command to install the **Azure.Messaging.ServiceBus** NuGet package.

    ```powershell
    Install-Package Azure.Messaging.ServiceBus
    ```
1. Run the following command to install the **Azure.Identity** NuGet package.

    ```powershell
    Install-Package Azure.Identity
    ```

### [Connection String](#tab/connection-string)

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** from the menu.
1. Run the following command to install the **Azure.Messaging.ServiceBus** NuGet package:

    ```powershell
    Install-Package Azure.Messaging.ServiceBus
    ```

    Screenshot of QueueReceiver project selected in the Package Manager Console.


---


### Add the code to receive messages from the queue

In this section, you add code to retrieve messages from the queue.

1. Within the `Program` class, add the following code:

    ### [Passwordless](#tab/passwordless)

    ```csharp
    using System.Threading.Tasks;
    using Azure.Identity;
    using Azure.Messaging.ServiceBus;
    
    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;
    
    // the processor that reads and processes messages from the queue
    ServiceBusProcessor processor;
    ```

    ### [Connection string](#tab/connection-string)
    
    ```csharp
    using System.Threading.Tasks;
    using Azure.Messaging.ServiceBus;
    
    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;
    
    // the processor that reads and processes messages from the queue
    ServiceBusProcessor processor;
    ```

    ---

1. Append the following methods to the end of the `Program` class.

    ```csharp
    // handle received messages
    async Task MessageHandler(ProcessMessageEventArgs args)
    {
        string body = args.Message.Body.ToString();
        Console.WriteLine($"Received: {body}");

        // complete the message. message is deleted from the queue. 
        await args.CompleteMessageAsync(args.Message);
    }

    // handle any errors when receiving messages
    Task ErrorHandler(ProcessErrorEventArgs args)
    {
        Console.WriteLine(args.Exception.ToString());
        return Task.CompletedTask;
    }
    ```

1. Append the following code to the end of the `Program` class. The important steps are outlined in the following section, with additional information in the code comments.
    
    ### [Passwordless](#tab/passwordless)

    * Creates a [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object using the `DefaultAzureCredential` object. `DefaultAzureCredential` automatically discovers and uses the credentials of your Visual Studio sign in to authenticate to Azure Service Bus.
    * Invokes the [CreateProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient.createprocessor) method on the `ServiceBusClient` object to create a [ServiceBusProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor) object for the specified Service Bus queue.
    * Specifies handlers for the [ProcessMessageAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.processmessageasync) and [ProcessErrorAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.processerrorasync) events of the [ServiceBusProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor) object.
    * Starts processing messages by invoking the [StartProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.startprocessingasync) on the `ServiceBusProcessor` object.
    * When user presses a key to end the processing, invokes the [StopProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.stopprocessingasync) on the `ServiceBusProcessor` object.

    > **Important:**
    > Update placeholder values (`<NAMESPACE-NAME>` and `<QUEUE-NAME>`) in the code snippet with names of your Service Bus namespace and queue.
    
    ```csharp
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // Set the transport type to AmqpWebSockets so that the ServiceBusClient uses port 443. 
    // If you use the default AmqpTcp, make sure that ports 5671 and 5672 are open.

    // TODO: Replace the <NAMESPACE-NAME> placeholder
    var clientOptions = new ServiceBusClientOptions()
    {
        TransportType = ServiceBusTransportType.AmqpWebSockets
    };
    client = new ServiceBusClient(
        "<NAMESPACE-NAME>.servicebus.windows.net",
        new DefaultAzureCredential(),
        clientOptions);

    // create a processor that we can use to process the messages
    // TODO: Replace the <QUEUE-NAME> placeholder
    processor = client.CreateProcessor("<QUEUE-NAME>", new ServiceBusProcessorOptions());

    try
    {
        // add handler to process messages
        processor.ProcessMessageAsync += MessageHandler;

        // add handler to process any errors
        processor.ProcessErrorAsync += ErrorHandler;

        // start processing 
        await processor.StartProcessingAsync();

        Console.WriteLine("Wait for a minute and then press any key to end the processing");
        Console.ReadKey();

        // stop processing 
        Console.WriteLine("\nStopping the receiver...");
        await processor.StopProcessingAsync();
        Console.WriteLine("Stopped receiving messages");
    }
    finally
    {
        // Calling DisposeAsync on client types is required to ensure that network
        // resources and other unmanaged objects are properly cleaned up.
        await processor.DisposeAsync();
        await client.DisposeAsync();
    }
    ```

    ### [Connection string](#tab/connection-string)

    * Creates a [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object using the connection string.
    * Invokes the [CreateProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient.createprocessor) method on the [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object to create a [ServiceBusProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor) object for the specified Service Bus queue.
    * Specifies handlers for the [ProcessMessageAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.processmessageasync) and [ProcessErrorAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.processerrorasync) events of the [ServiceBusProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor) object.
    * Starts processing messages by invoking the [StartProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.startprocessingasync) on the [ServiceBusProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor) object.
    * When user presses a key to end the processing, invokes the [StopProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.stopprocessingasync) on the [ServiceBusProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor) object.
    
    ```csharp
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // Set the transport type to AmqpWebSockets so that the ServiceBusClient uses port 443. 
    // If you use the default AmqpTcp, make sure that ports 5671 and 5672 are open.

    // TODO: Replace the <NAMESPACE-CONNECTION-STRING> and <QUEUE-NAME> placeholders
    var clientOptions = new ServiceBusClientOptions()
    {
        TransportType = ServiceBusTransportType.AmqpWebSockets
    };
    client = new ServiceBusClient("<NAMESPACE-CONNECTION-STRING>", clientOptions);

    // create a processor that we can use to process the messages
    // TODO: Replace the <QUEUE-NAME> placeholder
    processor = client.CreateProcessor("<QUEUE-NAME>", new ServiceBusProcessorOptions());

    try
    {
        // add handler to process messages
        processor.ProcessMessageAsync += MessageHandler;

        // add handler to process any errors
        processor.ProcessErrorAsync += ErrorHandler;

        // start processing 
        await processor.StartProcessingAsync();

        Console.WriteLine("Wait for a minute and then press any key to end the processing");
        Console.ReadKey();

        // stop processing 
        Console.WriteLine("\nStopping the receiver...");
        await processor.StopProcessingAsync();
        Console.WriteLine("Stopped receiving messages");
    }
    finally
    {
        // Calling DisposeAsync on client types is required to ensure that network
        // resources and other unmanaged objects are properly cleaned up.
        await processor.DisposeAsync();
        await client.DisposeAsync();
    }
    ```

    ---

1. The completed `Program` class should match the following code:
    
    ### [Passwordless](#tab/passwordless)
    
    ```csharp
    using System.Threading.Tasks;
    using Azure.Messaging.ServiceBus;
    using Azure.Identity;
    
    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;
    
    // the processor that reads and processes messages from the queue
    ServiceBusProcessor processor;
    
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // Set the transport type to AmqpWebSockets so that the ServiceBusClient uses port 443.
    // If you use the default AmqpTcp, make sure that ports 5671 and 5672 are open.

    // TODO: Replace the <NAMESPACE-NAME> and <QUEUE-NAME> placeholders
    var clientOptions = new ServiceBusClientOptions() 
    {
        TransportType = ServiceBusTransportType.AmqpWebSockets
    };
    client = new ServiceBusClient("<NAMESPACE-NAME>.servicebus.windows.net", 
        new DefaultAzureCredential(), clientOptions);
    
    // create a processor that we can use to process the messages
    // TODO: Replace the <QUEUE-NAME> placeholder
    processor = client.CreateProcessor("<QUEUE-NAME>", new ServiceBusProcessorOptions());
    
    try
    {
        // add handler to process messages
        processor.ProcessMessageAsync += MessageHandler;
    
        // add handler to process any errors
        processor.ProcessErrorAsync += ErrorHandler;
    
        // start processing 
        await processor.StartProcessingAsync();
    
        Console.WriteLine("Wait for a minute and then press any key to end the processing");
        Console.ReadKey();
    
        // stop processing 
        Console.WriteLine("\nStopping the receiver...");
        await processor.StopProcessingAsync();
        Console.WriteLine("Stopped receiving messages");
    }
    finally
    {
        // Calling DisposeAsync on client types is required to ensure that network
        // resources and other unmanaged objects are properly cleaned up.
        await processor.DisposeAsync();
        await client.DisposeAsync();
    }
    
    // handle received messages
    async Task MessageHandler(ProcessMessageEventArgs args)
    {
        string body = args.Message.Body.ToString();
        Console.WriteLine($"Received: {body}");
    
        // complete the message. message is deleted from the queue. 
        await args.CompleteMessageAsync(args.Message);
    }
    
    // handle any errors when receiving messages
    Task ErrorHandler(ProcessErrorEventArgs args)
    {
        Console.WriteLine(args.Exception.ToString());
        return Task.CompletedTask;
    }
    ```

    ### [Connection string](#tab/connection-string)
    
    ```csharp
    using Azure.Messaging.ServiceBus;
    using System;
    using System.Threading.Tasks;
    
    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;
    
    // the processor that reads and processes messages from the queue
    ServiceBusProcessor processor;
    
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // Set the transport type to AmqpWebSockets so that the ServiceBusClient uses port 443. 
    // If you use the default AmqpTcp, make sure that ports 5671 and 5672 are open.
    
    // TODO: Replace the <NAMESPACE-CONNECTION-STRING> and <QUEUE-NAME> placeholders
    var clientOptions = new ServiceBusClientOptions()
    {
        TransportType = ServiceBusTransportType.AmqpWebSockets
    };
    client = new ServiceBusClient("<NAMESPACE-CONNECTION-STRING>", clientOptions);
            
    // create a processor that we can use to process the messages
    // TODO: Replace the <QUEUE-NAME> placeholder
    processor = client.CreateProcessor("<QUEUE-NAME>", new ServiceBusProcessorOptions());
    
    try
    {
        // add handler to process messages
        processor.ProcessMessageAsync += MessageHandler;
    
        // add handler to process any errors
        processor.ProcessErrorAsync += ErrorHandler;
    
        // start processing 
        await processor.StartProcessingAsync();
    
        Console.WriteLine("Wait for a minute and then press any key to end the processing");
        Console.ReadKey();
    
        // stop processing 
        Console.WriteLine("\nStopping the receiver...");
        await processor.StopProcessingAsync();
        Console.WriteLine("Stopped receiving messages");
    }
    finally
    {
        // Calling DisposeAsync on client types is required to ensure that network
        // resources and other unmanaged objects are properly cleaned up.
        await processor.DisposeAsync();
        await client.DisposeAsync();
    }
    
    // handle received messages
    async Task MessageHandler(ProcessMessageEventArgs args)
    {
        string body = args.Message.Body.ToString();
        Console.WriteLine($"Received: {body}");
    
        // complete the message. message is deleted from the queue. 
        await args.CompleteMessageAsync(args.Message);
    }
    
    // handle any errors when receiving messages
    Task ErrorHandler(ProcessErrorEventArgs args)
    {
        Console.WriteLine(args.Exception.ToString());
        return Task.CompletedTask;
    }
    ```

    ---

1. Build the project, and ensure that there are no errors.
1. Run the receiver application. You should see the received messages. Press any key to stop the receiver and the application.

    ```console
    Wait for a minute and then press any key to end the processing
    Received: Message 1
    Received: Message 2
    Received: Message 3
    
    Stopping the receiver...
    Stopped receiving messages
    ```

1. Check the portal again. Wait for a few minutes and refresh the page if you don't see `0` for **Active** messages.

    - The **Active** message count and **Current size** values are now **0**.
    - In the **Messages** chart in the bottom **Metrics** section, you can see that there are three incoming messages and three outgoing messages for the queue.

        Screenshot of active messages and size after receive.

## Additional information

See the following documentation and samples:

- [Azure Service Bus client library for .NET - Readme](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus)
- [Samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus/samples)
- [.NET API reference](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus)
- [Abstract away infrastructure concerns with higher-level frameworks like NServiceBus](build-message-driven-apps-nservicebus.md)

## Clean up resources

Navigate to your Service Bus namespace in the Azure portal, and select **Delete** on the Azure portal to delete the namespace and the queue in it.

## Related content
See [Get started with Azure Service Bus topics and subscriptions (.NET)](service-bus-dotnet-how-to-use-topics-subscriptions.md).
