---
title: Azure Service Bus Topics Quickstart With .NET
description: This tutorial shows you how to send messages to Azure Service Bus topics and receive messages from topics subscriptions using the .NET programming language.
#customer intent: As a .NET developer, I want to learn how to send messages to an Azure Service Bus topic so that I can implement messaging in my application.
ms.topic: quickstart
ms.tgt_pltfrm: dotnet
ms.date: 02/13/2026
ms.devlang: csharp
ms.custom: mode-api, passwordless-dotnet, devx-track-dotnet
# Customer intent: I want to learn how to send messages to an Azure Service Bus topic and receive messages from a subscription to the topic. 
---

# Quickstart: Get started with Azure Service Bus topics and subscriptions (.NET)

This quickstart shows how to send messages to a Service Bus topic and receive messages from a subscription to that topic by using the [Azure.Messaging.ServiceBus](https://www.nuget.org/packages/Azure.Messaging.ServiceBus/) .NET library.

In this quickstart, you do the following steps:

1. Create a Service Bus namespace, using the Azure portal.
1. Create a Service Bus topic, using the Azure portal.
1. Create a Service Bus subscription to that topic, using the Azure portal.
1. Write a .NET console application to send a set of messages to the topic.
1. Write a .NET console application to receive those messages from the subscription.

> **Note:**
> This quickstart provides step-by-step instructions to implement a simple scenario of sending a batch of messages to a Service Bus topic and receiving those messages from a subscription of the topic. For more samples on other and advanced scenarios, see [Service Bus .NET samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus/samples). 
> - This quickstart shows you two ways of connecting to Azure Service Bus: **connection string** and **passwordless**. The first option shows you how to use a connection string to connect to a Service Bus namespace. The second option shows you how to use your security principal in Microsoft Entra ID and the role-based access control (RBAC) to connect to a Service Bus namespace. You don't need to worry about having hard-coded connection string in your code or in a configuration file or in secure storage like Azure Key Vault. If you're new to Azure, you might find the connection string option easier to follow. We recommend using the passwordless option in real-world applications and production environments. For more information, see [Authentication and authorization](service-bus-authentication-and-authorization.md).

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




## Create a topic using the Azure portal
1. On the **Service Bus Namespace** page, expand **Entities** on the navigational menu to the left, and select **Topics** on the left menu.
2. Select **+ Topic** on the toolbar. 
4. Enter a **name** for the topic. Leave the other options with their default values.
5. Select **Create**.

    Screenshot that shows the Create topic page in the Azure portal.

## Create a subscription to the topic
1. Select the **topic** that you created in the previous section. 
    
    Screenshot that shows the selection of topic from the list of topics.
2. On the **Service Bus Topic** page, select **+ Subscription** on the toolbar. 

    Screenshot that shows the Add subscription button on the Topic page.
3. On the **Create subscription** page, follow these steps:
    1. Enter **S1** for **name** of the subscription.
    1. Then, select **Create** to create the subscription. 

        Screenshot that shows the Create subscription page.



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

    Screenshot of the button to sign in to Azure using Visual Studio.

1. Sign-in using the Microsoft Entra account you assigned a role to previously.

    Screenshot of the account selection dialog.

### [Connection String](#tab/connection-string)
Launch Visual Studio. If you see the **Get started** window, select the **Continue without code** link in the right pane.

---


## Send messages to the topic
This section shows you how to create a .NET console application to send messages to a Service Bus topic. 

> **Note:**
> This quickstart provides step-by-step instructions to implement a simple scenario of sending a batch of messages to a Service Bus topic and receiving those messages from a subscription of the topic. For more samples on other and advanced scenarios, see [Service Bus .NET samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus/samples).

### Create a console application

1. In Visual Studio, select **File** -> **New** -> **Project** menu. 
1. On the **Create a new project** dialog box, do the following steps: If you don't see this dialog box, select **File** on the menu, select **New**, and then select **Project**.
    1. Select **C#** for the programming language.
    1. Select **Console** for the type of the application.
    1. Select **Console App** from the results list.
    1. Then, select **Next**.

        Screenshot of the Create a new project dialog box with C# and Console selected.
1. Enter **TopicSender** for the project name, **ServiceBusTopicQuickStart** for the solution name, and then select **Next**. 
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

    ```Powershell
    Install-Package Azure.Messaging.ServiceBus
    ```
---


### Add code to send messages to the topic 

1. Replace the contents of Program.cs with the following code. The important steps are outlined in this section, with additional information in the code comments.

    ## [Passwordless](#tab/passwordless)

    1. Creates a [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object using the `DefaultAzureCredential` object. `DefaultAzureCredential` automatically discovers and uses the credentials of your Visual Studio sign-in to authenticate to Azure Service Bus. 
    1. Invokes the [CreateSender](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient.createsender) method on the `ServiceBusClient` object to create a [ServiceBusSender](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender) object for the specific Service Bus topic.     
    1. Creates a [ServiceBusMessageBatch](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusmessagebatch) object by using the [ServiceBusSender.CreateMessageBatchAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender.createmessagebatchasync).
    1. Add messages to the batch using the [ServiceBusMessageBatch.TryAddMessage](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusmessagebatch.tryaddmessage). 
    1. Sends the batch of messages to the Service Bus topic using the [ServiceBusSender.SendMessagesAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender.sendmessagesasync) method.

    > **Important:**
    > Update placeholder values (`<NAMESPACE-NAME>` and `<TOPIC-NAME>`) in the code snippet with names of your Service Bus namespace and topic.
    
    ```csharp
    using System.Threading.Tasks;
    using Azure.Messaging.ServiceBus;
    using Azure.Identity;

    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;

    // the sender used to publish messages to the topic
    ServiceBusSender sender;

    // number of messages to be sent to the topic
    const int numOfMessages = 3;

    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.

    //TODO: Replace the "<NAMESPACE-NAME>" and "<TOPIC-NAME>" placeholders.
    client = new ServiceBusClient(
        "<NAMESPACE-NAME>.servicebus.windows.net",
        new DefaultAzureCredential());
    sender = client.CreateSender("<TOPIC-NAME>");

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
        // Use the producer client to send the batch of messages to the Service Bus topic
        await sender.SendMessagesAsync(messageBatch);
        Console.WriteLine($"A batch of {numOfMessages} messages has been published to the topic.");
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

    ## [Connection String](#tab/connection-string)

    > **Important:**
    > Update placeholder values (`<NAMESPACE-CONNECTION-STRING>` and `<TOPIC-NAME>`) in the code snippet with actual values you noted down earlier.

    1. Creates a [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object using the connection string to the namespace. 
    1. Invokes the [CreateSender](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient.createsender) method on the `ServiceBusClient` object to create a [ServiceBusSender](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender) object for the specific Service Bus topic.     
    1. Creates a [ServiceBusMessageBatch](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusmessagebatch) object by using the [ServiceBusSender.CreateMessageBatchAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender.createmessagebatchasync).
    1. Add messages to the batch using the [ServiceBusMessageBatch.TryAddMessage](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusmessagebatch.tryaddmessage). 
    1. Sends the batch of messages to the Service Bus topic using the [ServiceBusSender.SendMessagesAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebussender.sendmessagesasync) method.
    
    ```csharp
    using System.Threading.Tasks;
    using Azure.Messaging.ServiceBus;

    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;

    // the sender used to publish messages to the topic
    ServiceBusSender sender;

    // number of messages to be sent to the topic
    const int numOfMessages = 3;

    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //TODO: Replace the "<NAMESPACE-CONNECTION-STRING>" and "<TOPIC-NAME>" placeholders.
    client = new ServiceBusClient("<NAMESPACE-CONNECTION-STRING>");
    sender = client.CreateSender("<TOPIC-NAME>");

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
        // Use the producer client to send the batch of messages to the Service Bus topic
        await sender.SendMessagesAsync(messageBatch);
        Console.WriteLine($"A batch of {numOfMessages} messages has been published to the topic.");
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

1. Build the project, and ensure that there are no errors. 
1. Run the program and wait for the confirmation message.
    
    ```bash
    A batch of 3 messages has been published to the topic
    ```

    > **Important:**
    > In most cases, it takes a minute or two for the role assignment to propagate in Azure. In rare cases, it might take up to **eight minutes**. If you receive authentication errors when you first run your code, wait a few moments and try again.
1. In the Azure portal, follow these steps:
    1. Navigate to your Service Bus namespace. 
    1. On the **Overview** page, in the bottom-middle pane, switch to the **Topics** tab, and select the Service Bus topic. In the following example, it's `mytopic`.
    
        Screenshot of selecting a topic.
    1. On the **Service Bus Topic** page, In the **Messages** chart in the bottom **Metrics** section, you can see that there are three incoming messages for the topic. If you don't see the value, wait for a few minutes, and refresh the page to see the updated chart. 

        Screenshot of messages sent to the topic.
    1. Select the subscription in the bottom pane. In the following example, it's **S1**. On the **Service Bus Subscription** page, you see the **Active message count** as **3**. The subscription has received the three messages that you sent to the topic, but no receiver has picked them yet. 
    
        Screenshot of messages received at the subscription.
    
## Receive messages from a subscription

In this section, you create a .NET console application that receives messages from the subscription to the Service Bus topic. 

> **Note:**
> This quickstart provides step-by-step instructions to implement a simple scenario of sending a batch of messages to a Service Bus topic and receiving those messages from a subscription of the topic. For more samples on other and advanced scenarios, see [Service Bus .NET samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus/samples).

### Create a project for the receiver

1. In the Solution Explorer window, right-click the **ServiceBusTopicQuickStart** solution, point to **Add**, and select **New Project**. 
1. Select **Console application**, and select **Next**. 
1. Enter **SubscriptionReceiver** for the **Project name**, and select **Next**. 
1. On the **Additional information** page, select **Create**. 
1. In the **Solution Explorer** window, right-click **SubscriptionReceiver**, and select **Set as a Startup Project**. 

### Add the NuGet packages to the project


### [Passwordless](#tab/passwordless)

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** from the menu.
1. Select **SubscriptionReceiver** for **Default project** drop-down list. 
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

    ```Powershell
    Install-Package Azure.Messaging.ServiceBus
    ```

---

### Add code to receive messages from the subscription

In this section, you add code to retrieve messages from the subscription.

1. Replace the existing contents of `Program.cs` with the following properties and methods:



     ## [Passwordless](#tab/passwordless)

    ```csharp
    using System.Threading.Tasks;
    using Azure.Messaging.ServiceBus;
    using Azure.Identity;

    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;

    // the processor that reads and processes messages from the subscription
    ServiceBusProcessor processor;    

    // handle received messages
    async Task MessageHandler(ProcessMessageEventArgs args)
    {
        string body = args.Message.Body.ToString();
        Console.WriteLine($"Received: {body} from subscription.");

        // complete the message. messages is deleted from the subscription. 
        await args.CompleteMessageAsync(args.Message);
    }

    // handle any errors when receiving messages
    Task ErrorHandler(ProcessErrorEventArgs args)
    {
        Console.WriteLine(args.Exception.ToString());
        return Task.CompletedTask;
    }
    ```


     ## [Connection String](#tab/connection-string)

    > **Important:**
    > Update placeholder values (`<TOPIC-SUBSCRIPTION-NAME>`) in the code snippet with names of the topic and the subscription.

    ```csharp
    using System.Threading.Tasks;
    using Azure.Messaging.ServiceBus;

    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;

    // the processor that reads and processes messages from the subscription
    ServiceBusProcessor processor;    

    // handle received messages
    async Task MessageHandler(ProcessMessageEventArgs args)
    {
        // TODO: Replace the <TOPIC-SUBSCRIPTION-NAME> placeholder
        string body = args.Message.Body.ToString();
        Console.WriteLine($"Received: {body} from subscription: <TOPIC-SUBSCRIPTION-NAME>");

        // complete the message. messages is deleted from the subscription. 
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
1. Append the following code to the end of `Program.cs`.

     ## [Passwordless](#tab/passwordless)

    * Creates a [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object using the `DefaultAzureCredential` object. `DefaultAzureCredential` automatically discovers and uses the credentials of your Visual Studio sign-in to authenticate to Azure Service Bus.
    * Invokes the [CreateProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient.createprocessor) method on the `ServiceBusClient` object to create a [ServiceBusProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor) object for the specified Service Bus topic. 
    * Specifies handlers for the [ProcessMessageAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.processmessageasync) and [ProcessErrorAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.processerrorasync) events of the `ServiceBusProcessor` object. 
    * Starts processing messages by invoking the [StartProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.startprocessingasync) on the `ServiceBusProcessor` object. 
    * When user presses a key to end the processing, invokes the [StopProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.stopprocessingasync) on the `ServiceBusProcessor` object. 
    
    > **Important:**
    > Update placeholder values (`<NAMESPACE-NAME>`, `<TOPIC-NAME>`, `<SUBSCRIPTION-NAME>`) in the code snippet with names of your Service Bus namespace, topic, and subscription.

    For more information, see code comments.

    ```csharp
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // Create the clients that we'll use for sending and processing messages.
    // TODO: Replace the <NAMESPACE-NAME> placeholder
    client = new ServiceBusClient(
        "<NAMESPACE-NAME>.servicebus.windows.net",
        new DefaultAzureCredential());

    // create a processor that we can use to process the messages
    // TODO: Replace the <TOPIC-NAME> and <SUBSCRIPTION-NAME> placeholders
    processor = client.CreateProcessor("<TOPIC-NAME>", "<SUBSCRIPTION-NAME>", new ServiceBusProcessorOptions());

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

    ## [Connection String](#tab/connection-string)

    > **Important:**
    > Update placeholder values (`<NAMESPACE-CONNECTION-STRING>`, `<TOPIC-NAME>`, `<SUBSCRIPTION-NAME>`) in the code snippet with actual values you noted down earlier.

    * Creates a [ServiceBusClient](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient) object using the connection string to the namespace. 
    * Invokes the [CreateProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusclient.createprocessor) method on the `ServiceBusClient` object to create a [ServiceBusProcessor](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor) object for the specified Service Bus topic. 
    * Specifies handlers for the [ProcessMessageAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.processmessageasync) and [ProcessErrorAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.processerrorasync) events of the `ServiceBusProcessor` object. 
    * Starts processing messages by invoking the [StartProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.startprocessingasync) on the `ServiceBusProcessor` object. 
    * When user presses a key to end the processing, invokes the [StopProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus.servicebusprocessor.stopprocessingasync) on the `ServiceBusProcessor` object. 
    
    For more information, see code comments.

    ```csharp
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // Create the clients that we'll use for sending and processing messages.
    // TODO: Replace the <NAMESPACE-CONNECTION-STRING> placeholder
    client = new ServiceBusClient("<NAMESPACE-CONNECTION-STRING>");

    // create a processor that we can use to process the messages
    // TODO: Replace the <TOPIC-NAME> and <SUBSCRIPTION-NAME> placeholders
    processor = client.CreateProcessor("<TOPIC-NAME>", "<SUBSCRIPTION-NAME>", new ServiceBusProcessorOptions());

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

1. Here's what your `Program.cs` should look like:  

    ## [Passwordless](#tab/passwordless)
    
    ```csharp
    using System;
    using System.Threading.Tasks;
    using Azure.Messaging.ServiceBus;
    using Azure.Identity;
    
    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;

    // the processor that reads and processes messages from the subscription
    ServiceBusProcessor processor;

    // handle received messages
    async Task MessageHandler(ProcessMessageEventArgs args)
    {
        string body = args.Message.Body.ToString();
        Console.WriteLine($"Received: {body} from subscription.");

        // complete the message. messages is deleted from the subscription. 
        await args.CompleteMessageAsync(args.Message);
    }

    // handle any errors when receiving messages
    Task ErrorHandler(ProcessErrorEventArgs args)
    {
        Console.WriteLine(args.Exception.ToString());
        return Task.CompletedTask;
    }
    
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // Create the clients that we'll use for sending and processing messages.
    // TODO: Replace the <NAMESPACE-NAME> placeholder
    client = new ServiceBusClient(
        "<NAMESPACE-NAME>.servicebus.windows.net",
        new DefaultAzureCredential());

    // create a processor that we can use to process the messages
    // TODO: Replace the <TOPIC-NAME> and <SUBSCRIPTION-NAME> placeholders
    processor = client.CreateProcessor("<TOPIC-NAME>", "<SUBSCRIPTION-NAME>", new ServiceBusProcessorOptions());

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

    ## [Connection String](#tab/connection-string)

    ```csharp
    using System;
    using System.Threading.Tasks;
    using Azure.Messaging.ServiceBus;
    
    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;

    // the processor that reads and processes messages from the subscription
    ServiceBusProcessor processor;

    // handle received messages
    async Task MessageHandler(ProcessMessageEventArgs args)
    {
        string body = args.Message.Body.ToString();
        Console.WriteLine($"Received: {body} from subscription.");

        // complete the message. messages is deleted from the subscription. 
        await args.CompleteMessageAsync(args.Message);
    }

    // handle any errors when receiving messages
    Task ErrorHandler(ProcessErrorEventArgs args)
    {
        Console.WriteLine(args.Exception.ToString());
        return Task.CompletedTask;
    }
    
    // The Service Bus client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when messages are being published or read
    // regularly.
    //
    // Create the clients that we'll use for sending and processing messages.
    // TODO: Replace the <NAMESPACE-CONNECTION-STRING> placeholder
    client = new ServiceBusClient("<NAMESPACE-CONNECTION-STRING>");

    // create a processor that we can use to process the messages
    // TODO: Replace the <TOPIC-NAME> and <SUBSCRIPTION-NAME> placeholders
    processor = client.CreateProcessor("<TOPIC-NAME>", "<SUBSCRIPTION-NAME>", new ServiceBusProcessorOptions());

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

1. Build the project, and ensure that there are no errors.
1. Run the receiver application. You should see the received messages. Press any key to stop the receiver and the application. 

    ```console
    Wait for a minute and then press any key to end the processing
    Received: Message 1 from subscription: S1
    Received: Message 2 from subscription: S1
    Received: Message 3 from subscription: S1
    
    Stopping the receiver...
    Stopped receiving messages
    ```
1. Check the portal again. 
    - On the **Service Bus Topic** page, in the **Messages** chart, you see three incoming messages and three outgoing messages. If you don't see these numbers, wait for a few minutes, and refresh the page to see the updated chart. 
    
        Screenshot of messages sent and received.
    - On the **Service Bus Subscription** page, you see the **Active message count** as zero. It's because a receiver has received messages from this subscription and completed the messages. 
    
        Screenshot of the active message count at the subscription at the end.
        
## Related content
See the following documentation and samples:

- [Azure Service Bus client library for .NET - Readme](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus)
- [.NET samples for Azure Service Bus on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/servicebus/Azure.Messaging.ServiceBus/samples)
- [.NET API reference](https://learn.microsoft.com/dotnet/api/azure.messaging.servicebus?preserve-view=true)
