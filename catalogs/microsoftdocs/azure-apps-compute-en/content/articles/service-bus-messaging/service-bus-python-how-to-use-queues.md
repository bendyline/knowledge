---
title: Get Started with Azure Service Bus Queues (Python)
description: This quickstart shows you how to send messages to and receive messages from Azure Service Bus queues using the Python programming language.
author: spelluru
ms.author: spelluru
ms.date: 06/11/2025
ms.topic: quickstart
ms.devlang: python
ms.custom:
  - devx-track-python
  - mode-api
  - passwordless-python
  - sfi-ropc-nochange
#customer intent: As a developer, I want to learn how to send and receive messages with Azure Service Bus queues by using the Python programming language.
---

# Quickstart: Send messages to and receive messages from Azure Service Bus queues (Python)
> 
> - [C#](service-bus-dotnet-get-started-with-queues.md)
> - [Java](service-bus-java-how-to-use-queues.md)
> - [JavaScript](service-bus-nodejs-how-to-use-queues.md)
> - [Python](service-bus-python-how-to-use-queues.md)

This article provides step-by-step instructions for a simple scenario of sending messages to a Service Bus queue and receiving them. You can find prebuilt JavaScript and TypeScript samples for Azure Service Bus in the [Azure SDK for Python repository on GitHub](https://github.com/azure/azure-sdk-for-python/tree/main/sdk/servicebus/azure-servicebus/samples). 

In this quickstart, you:

 - Create a Service Bus namespace, using the Azure portal.
 - Create a Service Bus queue, using the Azure portal.
 - Write Python code to use the [azure-servicebus](https://pypi.org/project/azure-servicebus/) package to:

   - Send a set of messages to the queue.
   - Receive those messages from the queue.

If you're new to the service, see [Service Bus overview](service-bus-messaging-overview.md) before you begin.

## Prerequisites

- An Azure subscription. To complete this quickstart, you need an Azure account. You can activate your [Monthly Azure credits for Visual Studio subscribers](https://azure.microsoft.com/pricing/member-offers/credit-for-visual-studio-subscribers/?WT.mc_id=A85619ABF) or sign-up for a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Python 3.8](https://www.python.org/downloads/) or higher.

### [Passwordless (Recommended)](#tab/passwordless)

To use this quickstart with your own Azure account:

- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli), which provides the passwordless authentication to your developer machine.
- Sign in with your Azure account at the terminal or command prompt with `az login`. 
- Use the same account when you add the appropriate data role to your resource.
- Run the code in the same terminal or command prompt.
- Note the **queue** name for your Service Bus namespace. You need that in the code.  

### [Connection string](#tab/connection-string)

Note the following values, which you use in the code:

- Service Bus namespace **connection string** 
- Service Bus namespace **queue** you created

---

This quickstart works with samples that you can copy and run using Python. For instructions on how to create a Python application, see [Quickstart: Deploy a Python web app to Azure App Service](../app-service/quickstart-python.md). For more information about installing packages used in this quickstart, see [How to install Azure library packages for Python](https://learn.microsoft.com/azure/developer/python/sdk/azure-sdk-install).


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


## Use pip to install packages

### [Passwordless (Recommended)](#tab/passwordless)

1. To install the required Python packages for this Service Bus quickstart, open a Command Prompt window that has Python in its path.
1. Change the directory to the folder where you want to have your samples.
1. Install the following packages: 

    ```shell
    pip install azure-servicebus
    pip install azure-identity
    pip install aiohttp
    ```

### [Connection string](#tab/connection-string)

1. To install the required Python packages for this Service Bus quickstart, open a Command Prompt window that has Python in its path.
1. Change the directory to the folder where you want to have your samples.
1. Install the following package: 

    ```bash
    pip install azure-servicebus
    ```

---

## Send messages to a queue

The following sample code shows you how to send a message to a queue. Open a text editor, such as [Visual Studio Code](https://code.visualstudio.com/), create a file *send.py*, and add the following code into it.

### [Passwordless (Recommended)](#tab/passwordless)

1. Add import statements.

    ```python
    import asyncio
    from azure.servicebus.aio import ServiceBusClient
    from azure.servicebus import ServiceBusMessage
    from azure.identity.aio import DefaultAzureCredential
    ```
1. Add constants and define a credential.

    ```python
    FULLY_QUALIFIED_NAMESPACE = "FULLY_QUALIFIED_NAMESPACE"
    QUEUE_NAME = "QUEUE_NAME"

    credential = DefaultAzureCredential()
    ```

    > **Important:**
    > - Replace `FULLY_QUALIFIED_NAMESPACE` with the fully qualified namespace for your Service Bus namespace.
    > - Replace `QUEUE_NAME` with the name of the queue. 

1. Add a method to send a single message.

    ```python
    async def send_single_message(sender):
        # Create a Service Bus message and send it to the queue
        message = ServiceBusMessage("Single Message")
        await sender.send_messages(message)
        print("Sent a single message")
    ```

    The sender is an object that acts as a client for the queue you created. You create it later and send as an argument to this function.

1. Add a method to send a list of messages.

    ```python
    async def send_a_list_of_messages(sender):
        # Create a list of messages and send it to the queue
        messages = [ServiceBusMessage("Message in list") for _ in range(5)]
        await sender.send_messages(messages)
        print("Sent a list of 5 messages")
    ```

1. Add a method to send a batch of messages.

    ```python
    async def send_batch_message(sender):
        # Create a batch of messages
        async with sender:
            batch_message = await sender.create_message_batch()
            for _ in range(10):
                try:
                    # Add a message to the batch
                    batch_message.add_message(ServiceBusMessage("Message inside a ServiceBusMessageBatch"))
                except ValueError:
                    # ServiceBusMessageBatch object reaches max_size.
                    # New ServiceBusMessageBatch object can be created here to send more data.
                    break
            # Send the batch of messages to the queue
            await sender.send_messages(batch_message)
        print("Sent a batch of 10 messages")
    ```

1. Create a Service Bus client and then a queue sender object to send messages.

    ```python
    async def run():
        # create a Service Bus client using the credential
        async with ServiceBusClient(
            fully_qualified_namespace=FULLY_QUALIFIED_NAMESPACE,
            credential=credential,
            logging_enable=True) as servicebus_client:
            # get a Queue Sender object to send messages to the queue
            sender = servicebus_client.get_queue_sender(queue_name=QUEUE_NAME)
            async with sender:
                # send one message
                await send_single_message(sender)
                # send a list of messages
                await send_a_list_of_messages(sender)
                # send a batch of messages
                await send_batch_message(sender)
    
            # Close credential when no longer needed.
            await credential.close()
    ```

1. Call the `run` method and print a message.

    ```python
    asyncio.run(run())
    print("Done sending messages")
    print("-----------------------")
    ```

### [Connection string](#tab/connection-string)

1. Add import statements.

    ```python
    import asyncio
    from azure.servicebus.aio import ServiceBusClient
    from azure.servicebus import ServiceBusMessage
    ```

1. Add constants. 

    ```python
    NAMESPACE_CONNECTION_STR = "NAMESPACE_CONNECTION_STR"
    QUEUE_NAME = "QUEUE_NAME"
    ```

    > **Important:**
    > - Replace `NAMESPACE_CONNECTION_STR` with the connection string for your Service Bus namespace.
    > - Replace `QUEUE_NAME` with the name of the queue. 

1. Add a method to send a single message.

    ```python
    async def send_single_message(sender):
        # Create a Service Bus message and send it to the queue
        message = ServiceBusMessage("Single Message")
        await sender.send_messages(message)
        print("Sent a single message")
    ```

    The sender is an object that acts as a client for the queue you created. You create it later and send as an argument to this function.

1. Add a method to send a list of messages.

    ```python
    async def send_a_list_of_messages(sender):
        # Create a list of messages and send it to the queue
        messages = [ServiceBusMessage("Message in list") for _ in range(5)]
        await sender.send_messages(messages)
        print("Sent a list of 5 messages")
    ```

1. Add a method to send a batch of messages.

    ```python
    async def send_batch_message(sender):
        # Create a batch of messages
        async with sender:
            batch_message = await sender.create_message_batch()
            for _ in range(10):
                try:
                    # Add a message to the batch
                    batch_message.add_message(ServiceBusMessage("Message inside a ServiceBusMessageBatch"))
                except ValueError:
                    # ServiceBusMessageBatch object reaches max_size.
                    # New ServiceBusMessageBatch object can be created here to send more data.
                    break
            # Send the batch of messages to the queue
            await sender.send_messages(batch_message)
        print("Sent a batch of 10 messages")
    ```

1. Create a Service Bus client and then a queue sender object to send messages.

    ```python
    async def run():
        # create a Service Bus client using the connection string
        async with ServiceBusClient.from_connection_string(
            conn_str=NAMESPACE_CONNECTION_STR,
            logging_enable=True) as servicebus_client:
            # Get a Queue Sender object to send messages to the queue
            sender = servicebus_client.get_queue_sender(queue_name=QUEUE_NAME)
            async with sender:
                # Send one message
                await send_single_message(sender)
                # Send a list of messages
                await send_a_list_of_messages(sender)
                # Send a batch of messages
                await send_batch_message(sender)
    ```

1. Call the `run` method and print a message.

    ```python
    asyncio.run(run())
    print("Done sending messages")
    print("-----------------------")
    ```

---

## Receive messages from a queue

The following sample code shows you how to receive messages from a queue. The code shown receives new messages until it doesn't receive any new messages for 5 (`max_wait_time`) seconds.

Open a text editor, such as [Visual Studio Code](https://code.visualstudio.com/), create a file *recv.py*, and add the following code to it.

### [Passwordless (Recommended)](#tab/passwordless)

1. Similar to the *send.py* sample, add `import` statements. Replace the constants with your own values and define a credential.

    ```python
    import asyncio
    
    from azure.servicebus.aio import ServiceBusClient
    from azure.identity.aio import DefaultAzureCredential
    
    FULLY_QUALIFIED_NAMESPACE = "FULLY_QUALIFIED_NAMESPACE"
    QUEUE_NAME = "QUEUE_NAME"
    
    credential = DefaultAzureCredential()
    ```

1. Create a Service Bus client and then a queue receiver object to receive messages.

    ```python
    async def run():
        # create a Service Bus client using the connection string
        async with ServiceBusClient(
            fully_qualified_namespace=FULLY_QUALIFIED_NAMESPACE,
            credential=credential,
            logging_enable=True) as servicebus_client:
    
            async with servicebus_client:
                # get the Queue Receiver object for the queue
                receiver = servicebus_client.get_queue_receiver(queue_name=QUEUE_NAME)
                async with receiver:
                    received_msgs = await receiver.receive_messages(max_wait_time=5, max_message_count=20)
                    for msg in received_msgs:
                        print("Received: " + str(msg))
                        # complete the message so that the message is removed from the queue
                        await receiver.complete_message(msg)
    
            # Close credential when no longer needed.
            await credential.close()
    ```

1. Call the `run` method.

    ```python
    asyncio.run(run())
    ```

### [Connection string](#tab/connection-string)

1. Similar to the *send.py* sample, add `import` statements and define constants that use your own values.

    ```python
    import asyncio
    from azure.servicebus.aio import ServiceBusClient

    NAMESPACE_CONNECTION_STR = "NAMESPACE_CONNECTION_STR"
    QUEUE_NAME = "QUEUE_NAME"
    ```

1. Create a Service Bus client and then a queue receiver object to receive messages.

    ```python
    async def run():
        # create a Service Bus client using the connection string
        async with ServiceBusClient.from_connection_string(
            conn_str=NAMESPACE_CONNECTION_STR,
            logging_enable=True) as servicebus_client:
    
            async with servicebus_client:
                # get the Queue Receiver object for the queue
                receiver = servicebus_client.get_queue_receiver(queue_name=QUEUE_NAME)
                async with receiver:
                    received_msgs = await receiver.receive_messages(max_wait_time=5, max_message_count=20)
                    for msg in received_msgs:
                        print("Received: " + str(msg))
                        # complete the message so that the message is removed from the queue
                        await receiver.complete_message(msg)
    ```

1. Call the `run` method.

    ```python
    asyncio.run(run())
    ```

---

## Run the app

Open a command prompt that has Python in its path, and then run the code to send and receive messages from the queue.

```shell
python send.py; python recv.py
```

You should see the following output: 

```console
Sent a single message
Sent a list of 5 messages
Sent a batch of 10 messages
Done sending messages
-----------------------
Received: Single Message
Received: Message in list
Received: Message in list
Received: Message in list
Received: Message in list
Received: Message in list
Received: Message inside a ServiceBusMessageBatch
Received: Message inside a ServiceBusMessageBatch
Received: Message inside a ServiceBusMessageBatch
Received: Message inside a ServiceBusMessageBatch
Received: Message inside a ServiceBusMessageBatch
Received: Message inside a ServiceBusMessageBatch
Received: Message inside a ServiceBusMessageBatch
Received: Message inside a ServiceBusMessageBatch
Received: Message inside a ServiceBusMessageBatch
Received: Message inside a ServiceBusMessageBatch
```

In the Azure portal, navigate to your Service Bus namespace. On the **Overview** page, verify that the **incoming** and **outgoing** message counts are 16. If you don't see the counts, wait few minutes, then refresh the page. 

Incoming and outgoing message count

Select the queue on this **Overview** page to navigate to the **Service Bus Queue** page. You can also see the **incoming** and **outgoing** message count on this page. You also see other information such as the **current size** of the queue and **active message count**. 

Queue details

## Related content

See the following documentation and samples: 

- [Azure Service Bus client library for Python](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/servicebus/azure-servicebus)
- [Samples](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/servicebus/azure-servicebus/samples)

    - The **sync_samples** folder has samples that show you how to interact with Service Bus in a synchronous manner. 
    - The **async_samples** folder has samples that show you how to interact with Service Bus in an asynchronous manner. In this quick start, you used this method. 

- [azure-servicebus reference documentation](https://learn.microsoft.com/python/api/azure-servicebus/azure.servicebus?preserve-view=true)
