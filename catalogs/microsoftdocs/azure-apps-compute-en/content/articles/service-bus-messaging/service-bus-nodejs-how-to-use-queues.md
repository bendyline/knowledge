---
title: 'Quickstart: Get started with Azure Service Bus queues (JavaScript)'
description: This tutorial shows you how to send messages to and receive messages from Azure Service Bus queues using the JavaScript programming language.
author: spelluru
ms.author: spelluru
ms.date: 06/13/2025
ms.topic: quickstart
ms.devlang: javascript
ms.custom:
  - devx-track-js
  - mode-api
  - sfi-ropc-nochange
#customer intent: As a developer, I want to learn how to send and receive messages with Azure Service Bus queues by using the Python programming language.
---

# Quickstart: Send messages to and receive messages from Azure Service Bus queues (JavaScript)
> 
> - [C#](service-bus-dotnet-get-started-with-queues.md)
> - [Java](service-bus-java-how-to-use-queues.md)
> - [JavaScript](service-bus-nodejs-how-to-use-queues.md)
> - [Python](service-bus-python-how-to-use-queues.md)

This quickstart provides step-by-step instructions for a simple scenario of sending messages to a Service Bus queue and receiving them. In this quickstart, you complete the following tasks:

- Create a Service Bus namespace, using the Azure portal.
- Create a Service Bus queue, using the Azure portal.
- Write a JavaScript application to use the [@azure/service-bus](https://www.npmjs.com/package/@azure/service-bus) package to:
 
  - Send a set of messages to the queue.
  - Receive those messages from the queue.

You can find prebuilt JavaScript and TypeScript samples for Azure Service Bus in the [Azure SDK for JavaScript repository on GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicebus/service-bus/samples/v7).

If you're new to the service, see [Service Bus overview](service-bus-messaging-overview.md) before you begin.

## Prerequisites

- An Azure subscription. To complete this quickstart, you need an Azure account. You can activate your [Monthly Azure credits for Visual Studio subscribers](https://azure.microsoft.com/pricing/member-offers/credit-for-visual-studio-subscribers/?WT.mc_id=A85619ABF) or sign-up for a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Node.js LTS](https://nodejs.org/en/download/package-manager/)

### [Passwordless](#tab/passwordless)

To use this quickstart with your own Azure account:

- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli), which provides the passwordless authentication to your developer machine.
- Sign in with your Azure account at a command prompt with `az login`.
- Use the same account when you add the appropriate data role to your resource.
- Run the code in the same Command Prompt window.
- Make a note of your **queue** name for your Service Bus namespace. You need that in the code.

### [Connection string](#tab/connection-string)

Make a note of the following values to use in the code:

- Service Bus namespace **connection string**
- Service Bus namespace **queue** you created

---

> **Note:**
> This tutorial works with samples that you can copy and run using [Nodejs](https://nodejs.org/). For instructions on how to create a Node.js application, see [Create and deploy a Node.js application to an Azure Website](../app-service/quickstart-nodejs.md), or [Node.js cloud service using Windows PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-services/cloud-services-nodejs-develop-deploy-app.md).


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



## Use Node Package Manager (NPM) to install the package

### [Passwordless](#tab/passwordless)

1. To install the required npm packages for Service Bus, open a Command Prompt window that has `npm` in its path and change the directory to the folder where you want to have your samples.

1. Install the following packages:

   ```bash
   npm install @azure/service-bus @azure/identity
   ```

### [Connection string](#tab/connection-string)

1. To install the required npm packages for Service Bus, open a Command Prompt window that has `npm` in its path and change the directory to the folder where you want to have your samples.

1. Install the following package:

   ```bash
   npm install @azure/service-bus
   ```

---

## Send messages to a queue

The following sample code shows you how to send a message to a queue.

### [Passwordless](#tab/passwordless)

Sign in with the Azure CLI command `az login` for your local machine to provide the passwordless authentication required in this code.

1. Open a text editor, such as [Visual Studio Code](https://code.visualstudio.com/).
1. Create a file called `send.js` and paste the following code into it. This code sends the names of scientists as messages to your queue.

    > **Important:**
    > The passwordless credential is provided by using the [**DefaultAzureCredential**](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential).

    ```javascript
    const { ServiceBusClient } = require("@azure/service-bus");
    const { DefaultAzureCredential } = require("@azure/identity");

    // Replace `<SERVICE-BUS-NAMESPACE>` with your namespace
    const fullyQualifiedNamespace = "<SERVICE-BUS-NAMESPACE>.servicebus.windows.net";

    // Passwordless credential
    const credential = new DefaultAzureCredential();

    // name of the queue
    const queueName = "<QUEUE NAME>"

    const messages = [
        { body: "Albert Einstein" },
        { body: "Werner Heisenberg" },
        { body: "Marie Curie" },
        { body: "Steven Hawking" },
        { body: "Isaac Newton" },
        { body: "Niels Bohr" },
        { body: "Michael Faraday" },
        { body: "Galileo Galilei" },
        { body: "Johannes Kepler" },
        { body: "Nikolaus Kopernikus" }
        ];

    async function main() {
        // create a Service Bus client using the passwordless authentication to the Service Bus namespace
        const sbClient = new ServiceBusClient(fullyQualifiedNamespace, credential);

        // createSender() can also be used to create a sender for a topic.
        const sender = sbClient.createSender(queueName);

        try {
            // Tries to send all messages in a single batch.
            // Will fail if the messages cannot fit in a batch.
            // await sender.sendMessages(messages);

            // create a batch object
            let batch = await sender.createMessageBatch();
            for (let i = 0; i < messages.length; i++) {
                // for each message in the array

                // try to add the message to the batch
                if (!batch.tryAddMessage(messages[i])) {
                    // if it fails to add the message to the current batch
                    // send the current batch as it is full
                    await sender.sendMessages(batch);

                    // then, create a new batch
                    batch = await sender.createMessageBatch();

                    // now, add the message failed to be added to the previous batch to this batch
                    if (!batch.tryAddMessage(messages[i])) {
                        // if it still can't be added to the batch, the message is probably too big to fit in a batch
                        throw new Error("Message too big to fit in a batch");
                    }
                }
            }

            // Send the last created batch of messages to the queue
            await sender.sendMessages(batch);

            console.log(`Sent a batch of messages to the queue: ${queueName}`);

            // Close the sender
            await sender.close();
        } finally {
            await sbClient.close();
        }
    }

    // call the main function
    main().catch((err) => {
        console.log("Error occurred: ", err);
        process.exit(1);
        });
    ```

1. Replace `<SERVICE-BUS-NAMESPACE>` with your Service Bus namespace.
1. Replace `<QUEUE NAME>` with the name of the queue.
1. To run the code in this file, use this command at a command prompt:

   ```console
   node send.js
   ```

   You should see the following output.

   ```console
   Sent a batch of messages to the queue: myqueue
   ```

### [Connection string](#tab/connection-string)

1. Open a text editor, such as [Visual Studio Code](https://code.visualstudio.com/).
1. Create a file called `send.js` and paste the following code into it. This code sends the names of scientists as messages to your queue.

    ```javascript
    const { ServiceBusClient } = require("@azure/service-bus");

    // connection string to your Service Bus namespace
    const connectionString = "<CONNECTION STRING TO SERVICE BUS NAMESPACE>"

    // name of the queue
    const queueName = "<QUEUE NAME>"

    const messages = [
        { body: "Albert Einstein" },
        { body: "Werner Heisenberg" },
        { body: "Marie Curie" },
        { body: "Steven Hawking" },
        { body: "Isaac Newton" },
        { body: "Niels Bohr" },
        { body: "Michael Faraday" },
        { body: "Galileo Galilei" },
        { body: "Johannes Kepler" },
        { body: "Nikolaus Kopernikus" }
     ];

    async function main() {
        // create a Service Bus client using the connection string to the Service Bus namespace
        const sbClient = new ServiceBusClient(connectionString);

        // createSender() can also be used to create a sender for a topic.
        const sender = sbClient.createSender(queueName);

        try {
            // Tries to send all messages in a single batch.
            // Will fail if the messages cannot fit in a batch.
            // await sender.sendMessages(messages);

            // create a batch object
            let batch = await sender.createMessageBatch();
            for (let i = 0; i < messages.length; i++) {
                // for each message in the array

                // try to add the message to the batch
                if (!batch.tryAddMessage(messages[i])) {
                    // if it fails to add the message to the current batch
                    // send the current batch as it is full
                    await sender.sendMessages(batch);

                    // then, create a new batch
                    batch = await sender.createMessageBatch();

                    // now, add the message failed to be added to the previous batch to this batch
                    if (!batch.tryAddMessage(messages[i])) {
                        // if it still can't be added to the batch, the message is probably too big to fit in a batch
                        throw new Error("Message too big to fit in a batch");
                    }
                }
            }

            // Send the last created batch of messages to the queue
            await sender.sendMessages(batch);

            console.log(`Sent a batch of messages to the queue: ${queueName}`);

            // Close the sender
            await sender.close();
        } finally {
            await sbClient.close();
        }
    }

    // call the main function
    main().catch((err) => {
        console.log("Error occurred: ", err);
        process.exit(1);
     });
    ```
1. Replace `<CONNECTION STRING TO SERVICE BUS NAMESPACE>` with the connection string to your Service Bus namespace.
1. Replace `<QUEUE NAME>` with the name of the queue.
1. To run the code in this file, use this command at a command prompt:

   ```console
   node send.js
   ```
   You should see the following output.

   ```console
   Sent a batch of messages to the queue: myqueue
   ```

---

## Receive messages from a queue

### [Passwordless](#tab/passwordless)

Sign in with the Azure CLI command `az login` for your local machine to provide the passwordless authentication required in this code.

1. Open a text editor, such as [Visual Studio Code](https://code.visualstudio.com/).
1. Create a file called `receive.js` and paste the following code into it.

    ```javascript
    const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");
    const { DefaultAzureCredential } = require("@azure/identity");

    // Replace `<SERVICE-BUS-NAMESPACE>` with your namespace
    const fullyQualifiedNamespace = "<SERVICE-BUS-NAMESPACE>.servicebus.windows.net";

    // Passwordless credential
    const credential = new DefaultAzureCredential();

    // name of the queue
    const queueName = "<QUEUE NAME>"

     async function main() {
        // create a Service Bus client using the passwordless authentication to the Service Bus namespace
        const sbClient = new ServiceBusClient(fullyQualifiedNamespace, credential);

        // createReceiver() can also be used to create a receiver for a subscription.
        const receiver = sbClient.createReceiver(queueName);

        // function to handle messages
        const myMessageHandler = async (messageReceived) => {
            console.log(`Received message: ${messageReceived.body}`);
        };

        // function to handle any errors
        const myErrorHandler = async (error) => {
            console.log(error);
        };

        // subscribe and specify the message and error handlers
        receiver.subscribe({
            processMessage: myMessageHandler,
            processError: myErrorHandler
        });

        // Waiting long enough before closing the sender to send messages
        await delay(20000);

        await receiver.close();
        await sbClient.close();
    }
    // call the main function
    main().catch((err) => {
        console.log("Error occurred: ", err);
        process.exit(1);
     });
    ```

1. Replace `<SERVICE-BUS-NAMESPACE>` with your Service Bus namespace.
1. Replace `<QUEUE NAME>` with the name of the queue.
1. To run the code in this file, use this command at a command prompt:

   ```console
   node receive.js
   ```

### [Connection string](#tab/connection-string)

1. Open your favorite editor, such as [Visual Studio Code](https://code.visualstudio.com/).
1. Create a file called `receive.js` and paste the following code into it.

    ```javascript
    const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");

    // connection string to your Service Bus namespace
    const connectionString = "<CONNECTION STRING TO SERVICE BUS NAMESPACE>"

    // name of the queue
    const queueName = "<QUEUE NAME>"

     async function main() {
        // create a Service Bus client using the connection string to the Service Bus namespace
        const sbClient = new ServiceBusClient(connectionString);

        // createReceiver() can also be used to create a receiver for a subscription.
        const receiver = sbClient.createReceiver(queueName);

        // function to handle messages
        const myMessageHandler = async (messageReceived) => {
            console.log(`Received message: ${messageReceived.body}`);
        };

        // function to handle any errors
        const myErrorHandler = async (error) => {
            console.log(error);
        };

        // subscribe and specify the message and error handlers
        receiver.subscribe({
            processMessage: myMessageHandler,
            processError: myErrorHandler
        });

        // Waiting long enough before closing the sender to send messages
        await delay(20000);

        await receiver.close();
        await sbClient.close();
    }
    // call the main function
    main().catch((err) => {
        console.log("Error occurred: ", err);
        process.exit(1);
     });
    ```

1. Replace `<CONNECTION STRING TO SERVICE BUS NAMESPACE>` with the connection string to your Service Bus namespace.
1. Replace `<QUEUE NAME>` with the name of the queue.
1. To run the code in this file, use this command at a command prompt:

   ```console
   node receive.js
   ```

---

You should see the following output.

```console
Received message: Albert Einstein
Received message: Werner Heisenberg
Received message: Marie Curie
Received message: Steven Hawking
Received message: Isaac Newton
Received message: Niels Bohr
Received message: Michael Faraday
Received message: Galileo Galilei
Received message: Johannes Kepler
Received message: Nikolaus Kopernikus
```

On the **Overview** page for the Service Bus namespace in the Azure portal, you can see **incoming** and **outgoing** message count. You might need to wait for a minute or so and then refresh the page to see the latest values.

Screenshot shows iIncoming and outgoing message count.

Select the queue on this **Overview** page to navigate to the **Service Bus Queue** page. You see the **incoming** and **outgoing** message count on this page too. You also see other information such as the **current size** of the queue, **maximum size**, **active message count**, and so on.

Screenshot shows Queue detail information.

## Troubleshooting

If you receive one of the following errors when you run the **passwordless** version of the JavaScript code, sign in by using the Azure CLI command, `az login`. The [appropriate role](service-bus-nodejs-how-to-use-queues.md?tabs=passwordless#azure-built-in-roles-for-azure-service-bus) is applied to your Azure user account:

- 'Send' claims are required to perform this operation
- 'Receive' claims are required to perform this operation

## Clean up resources

Navigate to your Service Bus namespace in the Azure portal, and select **Delete** on the Azure portal to delete the namespace and the queue in it.

## Related content

See the following documentation and samples:

- [Azure Service Bus client library for JavaScript](https://www.npmjs.com/package/@azure/service-bus)
- [JavaScript samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/v7/javascript)
- [TypeScript samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/v7/typescript)
- [API reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/service-bus)
