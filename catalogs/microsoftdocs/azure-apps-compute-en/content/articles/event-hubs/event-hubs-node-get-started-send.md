---
title: 'Quickstart: Send or receive events using JavaScript'
description: This article provides a walkthrough for creating JavaScript applications that send or receive events to and from Azure Event Hubs.
ms.topic: quickstart
ms.date: 06/16/2025
ms.devlang: javascript
ms.custom:
  - devx-track-js
  - mode-api
  - passwordless-js
  - sfi-ropc-nochange
#customer intent: As a JavaScript developer, I want to learn how to send events to an event hub and receive events from the event hub using C#. 
---

# Quickstart: Send events to or receive events from event hubs by using JavaScript

In this Quickstart, you learn how to send events to and receive events from an event hub using the **@azure/event-hubs** npm package.

If you're new to Azure Event Hubs, see [Event Hubs overview](event-hubs-about.md) before you begin.

## Prerequisites

- Microsoft Azure subscription. To use Azure services, including Azure Event Hubs, you need a subscription. If you don't have an Azure account, sign up for a [free trial](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Node.js LTS. Download the latest [long-term support (LTS) version](https://nodejs.org).
- Visual Studio Code (recommended) or any other integrated development environment (IDE).
- Create an Event Hubs namespace and an event hub. Use the [Azure portal](https://portal.azure.com) to create a namespace of type Event Hubs Get the management credentials that your application needs to communicate with the event hub. For more information, see [Create an event hub using Azure portal](event-hubs-create.md).

### Install npm packages to send events

To install the [Node Package Manager (npm) package for Event Hubs](https://www.npmjs.com/package/@azure/event-hubs), open a Command Prompt window that has `npm` in its path. Change the directory to the folder where you want to keep your samples.

### [Passwordless (Recommended)](#tab/passwordless)

Run these commands:

```shell
npm install @azure/event-hubs
npm install @azure/identity
```

### [Connection String](#tab/connection-string)

Run this command:

```shell
npm install @azure/event-hubs
```

---

### Authenticate the app to Azure


This quickstart shows you two ways of connecting to Azure Event Hubs:

- *Passwordless*. Use your security principal in Microsoft Entra ID and role-based access control (RBAC) to connect to an Event Hubs namespace. You don't need to worry about having hard-coded connection strings in your code, in a configuration file, or in secure storage like Azure Key Vault.
- *Connection string*. Use a connection string to connect to an Event Hubs namespace. If you're new to Azure, you might find the connection string option easier to follow.

We recommend using the passwordless option in real-world applications and production environments. For more information, see [Service Bus authentication and authorization](../service-bus-messaging/service-bus-authentication-and-authorization.md) and [Passwordless connections for Azure services](https://learn.microsoft.com/azure/developer/intro/passwordless-overview).

## [Passwordless (Recommended)](#tab/passwordless)

<a name='assign-roles-to-your-azure-ad-user'></a>

### Assign roles to your Microsoft Entra user


When you develop locally, make sure that the user account that connects to Azure Event Hubs has the correct permissions. You need the [Azure Event Hubs Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-event-hubs-data-owner) role to send and receive messages. To assign yourself this role, you need the User Access Administrator role, or another role that includes the `Microsoft.Authorization/roleAssignments/write` action. You can assign Azure RBAC roles to a user using the Azure portal, Azure CLI, or Azure PowerShell. For more information, see [Understand scope for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md) page.

The following example assigns the `Azure Event Hubs Data Owner` role to your user account, which provides full access to Azure Event Hubs resources. In a real scenario, follow the [Principle of Least Privilege](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/secure-least-privileged-access.md) to give users only the minimum permissions needed for a more secure production environment.

### Azure built-in roles for Azure Event Hubs

For Azure Event Hubs, the management of namespaces and all related resources through the Azure portal and the Azure resource management API is already protected using the Azure RBAC model. Azure provides the following built-in roles for authorizing access to an Event Hubs namespace:

- [Azure Event Hubs Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-event-hubs-data-owner): Enables data access to Event Hubs namespace and its entities (queues, topics, subscriptions, and filters).
- [Azure Event Hubs Data Sender](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-event-hubs-data-sender): Use this role to give the sender access to Event Hubs namespace and its entities.
- [Azure Event Hubs Data Receiver](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-event-hubs-data-receiver): Use this role to give the receiver access to Event Hubs namespace and its entities.

If you want to create a custom role, see [Rights required for Event Hubs operations](../service-bus-messaging/service-bus-sas.md#rights-required-for-service-bus-operations).

> **Important:**
> In most cases, it takes a minute or two for the role assignment to propagate in Azure. In rare cases, it might take up to eight minutes. If you receive authentication errors when you first run your code, wait a few moments and try again.

### [Azure portal](#tab/roles-azure-portal)

1. In the Azure portal, locate your Event Hubs namespace using the main search bar or left navigation.

1. On the overview page, select **Access control (IAM)** from the left-hand menu.	

1. On the **Access control (IAM)** page, select the **Role assignments** tab.

1. Select **+ Add** from the top menu. Then select **Add role assignment**.

    Screenshot showing how to assign a role.

1. Use the search box to filter the results to the desired role. For this example, search for `Azure Event Hubs Data Owner` and select the matching result. Then choose **Next**.

1. Under **Assign access to**, select **User, group, or service principal**. Then choose **+ Select members**.

1. In the dialog, search for your Microsoft Entra username (usually your *user@domain* email address). Choose **Select** at the bottom of the dialog. 

1. Select **Review + assign** to go to the final page. Select **Review + assign** again to complete the process.

### [Azure CLI](#tab/roles-azure-cli)

To assign a role at the resource level using the Azure CLI, first get the resource ID using the `az eventhubs namespace show` command. You can filter the output properties using the `--query` parameter. 

```azurecli
az eventhubs namespace show -g '<your-event-hub-resource-group>' -n '<your-event-hub-name>' --query id
```

Copy the output `Id` from the preceding command. You can then assign roles using the [az role](https://learn.microsoft.com/cli/azure/role) command.

```azurecli
az role assignment create --assignee "<user@domain>" \
--role "Azure Event Hubs Data Owner" \
--scope "<your-resource-id>"
```

### [PowerShell](#tab/roles-powershell)

To assign a role at the resource level using Azure PowerShell, first get the resource ID using the `Get-AzResource` command.

```azurepowershell
Get-AzResource -ResourceGroupName "<your-event-hub-resource-group>" -Name "<your-event-hub-name>"
```

Copy the `Id` value from the preceding command output. You can then assign roles using the [New-AzRoleAssignment](https://learn.microsoft.com/powershell/module/az.resources/new-azroleassignment) command.

```azurepowershell
New-AzRoleAssignment -SignInName <user@domain> `
-RoleDefinitionName "Azure Event Hubs Data Owner" `
-Scope <yourResourceId>
```

---


## [Connection String](#tab/connection-string)

## Get the connection string 

Creating a new namespace automatically generates an initial Shared Access Signature (SAS) policy with primary and secondary keys and connection strings that each grant full control over all aspects of the namespace. For information about how to create rules with more constrained rights for regular senders and receivers, see [Event Hubs authentication and authorization](../service-bus-messaging/service-bus-authentication-and-authorization.md).

A client can use the connection string to connect to the Event Hubs namespace. To copy the primary connection string for your namespace, follow these steps: 

1. On the **Event Hub Namespace** page, select **Shared access policies** on the left menu.
1. On the **Shared access policies** page, select **RootManageSharedAccessKey**.
1. In the **Policy: RootManageSharedAccessKey** window, select the copy button next to **Primary Connection String**, to copy the connection string to your clipboard for later use. Paste this value into Notepad or some other temporary location.
   
   Screenshot shows an SAS policy called RootManageSharedAccessKey, which includes keys and connection strings.

   You can use this page to copy primary key, secondary key, primary connection string, and secondary connection string. 

---


## Send events

In this section, you create a JavaScript application that sends events to an event hub.

1. Open a text editor, such as [Visual Studio Code](https://code.visualstudio.com).
1. Create a file called *send.js*. Paste the following code into it:

   ## [Passwordless (Recommended)](#tab/passwordless)

    In the code, use real values to replace the following placeholders:

    - `EVENT HUBS NAMESPACE NAME`
    - `EVENT HUB NAME`

    ```javascript
    const { EventHubProducerClient } = require("@azure/event-hubs");
    const { DefaultAzureCredential } = require("@azure/identity");
    
    // Event hubs 
    const eventHubsResourceName = "EVENT HUBS NAMESPACE NAME";
    const fullyQualifiedNamespace = `${eventHubsResourceName}.servicebus.windows.net`; 
    const eventHubName = "EVENT HUB NAME";
    
    // Azure Identity - passwordless authentication
    const credential = new DefaultAzureCredential();
    
    async function main() {
    
      // Create a producer client to send messages to the event hub.
      const producer = new EventHubProducerClient(fullyQualifiedNamespace, eventHubName, credential);
    
      // Prepare a batch of three events.
      const batch = await producer.createBatch();
      const events = [
        { body: "passwordless First event" },
        { body: "passwordless Second event" },
        { body: "passwordless Third event" },
      ];
      
      for (const event of events) {
        if (!batch.tryAdd(event)) {
          throw new Error("Event is too large for the batch.");
        }
      }
    
      // Send the batch to the event hub.
      await producer.sendBatch(batch);
    
      // Close the producer client.
      await producer.close();
    
      console.log("A batch of three events have been sent to the event hub");
    }
    
    main().catch((err) => {
      console.log("Error occurred: ", err);
    });
    ```

   ## [Connection String](#tab/connection-string)

    In the code, use real values to replace the following placeholders:

    - `EVENT HUB NAME`
    - `EVENT HUBS NAMESPACE CONNECTION STRING`

    ```javascript
    const { EventHubProducerClient } = require("@azure/event-hubs");

    const connectionString = "EVENT HUBS NAMESPACE CONNECTION STRING";
    const eventHubName = "EVENT HUB NAME";

    async function main() {

      // Create a producer client to send messages to the event hub.
      const producer = new EventHubProducerClient(connectionString, eventHubName);

      // Prepare a batch of three events.
      const batch = await producer.createBatch();
      const events = [
        { body: "First event" },
        { body: "Second event" },
        { body: "Third event" },
      ];
      
      for (const event of events) {
        if (!batch.tryAdd(event)) {
          throw new Error("Event is too large for the batch.");
        }
      }

      // Send the batch to the event hub.
      await producer.sendBatch(batch);

      // Close the producer client.
      await producer.close();

      console.log("A batch of three events have been sent to the event hub");
    }

    main().catch((err) => {
      console.log("Error occurred: ", err);
    });
    ```

    ---

1. To run the application, use this command:

   ```bash
   node send.js
   ```

   The command sends a batch of three events to your event hub.

   If you're using the passwordless (Microsoft Entra ID Role-based access control (RBAC)) authentication, you might need sign into Azure using the account that you added to the Azure Event Hubs Data Owner role. Use the `az login` command.
 
1. In the Azure portal, verify that the event hub received the messages. To update the chart, refresh the page. It might take a few seconds for it to show that the messages are received.

   Screenshot shows the Overview page where you can verify that the event hub received the message.


   > **Note:**
   > For more information and the complete source code, see [GitHub sendEvents.js page](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/javascript/sendEvents.js).
    
## Receive events

In this section, you receive events from an event hub by using an Azure Blob storage checkpoint store in a JavaScript application. It performs metadata checkpoints on received messages at regular intervals in an Azure Storage blob. This approach makes it easy to continue receiving messages later from where you left off.


Follow these recommendations when you use Azure Blob Storage as a checkpoint store: 

- Use a separate container for each consumer group. You can use the same storage account, but use one container per each group.
- Don't use the storage account for anything else.
- Don't use the container for anything else.
- Create the storage account in the same region as the deployed application. If the application is on-premises, try to choose the closest region possible.

On the **Storage account** page in the Azure portal, in the **Blob service** section, ensure that the following settings are disabled. 

- Hierarchical namespace
- Blob soft delete
- Versioning


### Create an Azure storage account and a blob container

To create an Azure storage account with a blob container:

1. [Create an Azure storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-portal)  
1. [Create a blob container in the storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-portal.md#create-a-container)  
1. Authenticate to the blob container
    
## [Passwordless (Recommended)](#tab/passwordless)


When you develop locally, make sure that the user account that accesses blob data has the correct permissions. You need **Storage Blob Data Contributor** to read and write blob data. To assign yourself this role, you need to be assigned the **User Access Administrator** role, or another role that includes the **Microsoft.Authorization/roleAssignments/write** action. You can assign Azure RBAC roles to a user using the Azure portal, Azure CLI, or Azure PowerShell. For more information, see [Understand scope for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md).

In this scenario, you assign permissions to your user account, scoped to the storage account, to follow the [Principle of Least Privilege](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/secure-least-privileged-access.md). This practice gives users only the minimum permissions needed and creates more secure production environments.

The following example assigns the **Storage Blob Data Contributor** role to your user account, which provides both read and write access to blob data in your storage account.

> **Important:**
> In most cases, it takes a minute or two for the role assignment to propagate in Azure. In rare cases, it might take up to eight minutes. If you receive authentication errors when you first run your code, wait a few moments and try again.

### [Azure portal](#tab/roles-azure-portal)

1. In the Azure portal, locate your storage account using the main search bar or left navigation.

1. On the storage account page, select **Access control (IAM)** from the left-hand menu.

1. On the **Access control (IAM)** page, select the **Role assignments** tab.

1. Select **+ Add** from the top menu. Then select **Add role assignment**.

    Screenshot showing how to assign a storage account role.

1. Use the search box to filter the results to the desired role. For this example, search for *Storage Blob Data Contributor*. Select the matching result and then choose **Next**.

1. Under **Assign access to**, select **User, group, or service principal**, and then choose **+ Select members**.

1. In the dialog, search for your Microsoft Entra username (usually your *user@domain* email address) and then choose **Select** at the bottom of the dialog.

1. Select **Review + assign** to go to the final page. Select **Review + assign** again to complete the process.

### [Azure CLI](#tab/roles-azure-cli)

To assign a role at the resource level using the Azure CLI, first get the resource ID using the `az storage account show` command. You can filter the output properties using the `--query` parameter.

```azurecli
az storage account show --resource-group '<your-resource-group-name>' --name '<your-storage-account-name>' --query id
```

Copy the output `Id` from the preceding command. You can then assign roles using the [az role](https://learn.microsoft.com/cli/azure/role) command.

```azurecli
az role assignment create --assignee "<user@domain>" \
    --role "Storage Blob Data Contributor" \
    --scope "<your-resource-id>"
```

### [PowerShell](#tab/roles-powershell)

To assign a role at the resource level using Azure PowerShell, first get the resource ID using the `Get-AzResource` command.

```azurepowershell
Get-AzResource -ResourceGroupName "<yourResourceGroupname>" -Name "<yourStorageAccountName>"
```

Copy the `Id` value from the preceding command output. You can then assign roles using the [New-AzRoleAssignment](https://learn.microsoft.com/powershell/module/az.resources/new-azroleassignment) command.

```azurepowershell
New-AzRoleAssignment -SignInName <user@domain> `
    -RoleDefinitionName "Storage Blob Data Contributor" `
    -Scope <yourStorageAccountId>
```

---

    
## [Connection String](#tab/connection-string)

Get the connection string to the storage account. See [Configure Azure Storage connection strings](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-configure-connection-string.md).

Note the connection string and the container name. You use them in the code to receive events. 

---

### Install the npm packages to receive events

For the receiving side, you need to install two more packages. In this quickstart, you use Azure Blob storage to persist checkpoints so that the program doesn't read the events that it already read. It performs metadata checkpoints on received messages at regular intervals in a blob. This approach makes it easy to continue receiving messages later from where you left off.

### [Passwordless (Recommended)](#tab/passwordless)

Run these commands:

```shell
npm install @azure/storage-blob
npm install @azure/eventhubs-checkpointstore-blob
npm install @azure/identity
```

### [Connection String](#tab/connection-string)

Run these commands:

```shell
npm install @azure/storage-blob
npm install @azure/eventhubs-checkpointstore-blob
```

---

### Write code to receive events

1. Open a text editor, such as [Visual Studio Code](https://code.visualstudio.com).
1. Create a file called *receive.js*. Paste the following code into it:

    ### [Passwordless (Recommended)](#tab/passwordless)

    In the code, use real values to replace the following placeholders:

    - `EVENT HUBS NAMESPACE NAME`
    - `EVENT HUB NAME`
    - `STORAGE ACCOUNT NAME`
    - `STORAGE CONTAINER NAME`

    ```javascript
    const { DefaultAzureCredential } = require("@azure/identity");
    const { EventHubConsumerClient, earliestEventPosition  } = require("@azure/event-hubs");
    const { ContainerClient } = require("@azure/storage-blob");    
    const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");
    
    // Event hubs 
    const eventHubsResourceName = "EVENT HUBS NAMESPACE NAME";
    const fullyQualifiedNamespace = `${eventHubsResourceName}.servicebus.windows.net`; 
    const eventHubName = "EVENT HUB NAME";
    const consumerGroup = "$Default"; // name of the default consumer group
    
    // Azure Storage 
    const storageAccountName = "STORAGE ACCOUNT NAME";
    const storageContainerName = "STORAGE CONTAINER NAME";
    const baseUrl = `https://${storageAccountName}.blob.core.windows.net`;
    
    // Azure Identity - passwordless authentication
    const credential = new DefaultAzureCredential();
    
    async function main() {
    
      // Create a blob container client and a blob checkpoint store using the client.
      const containerClient = new ContainerClient(
        `${baseUrl}/${storageContainerName}`,
        credential
      );  
      const checkpointStore = new BlobCheckpointStore(containerClient);
    
      // Create a consumer client for the event hub by specifying the checkpoint store.
      const consumerClient = new EventHubConsumerClient(consumerGroup, fullyQualifiedNamespace, eventHubName, credential, checkpointStore);
    
      // Subscribe to the events, and specify handlers for processing the events and errors.
      const subscription = consumerClient.subscribe({
          processEvents: async (events, context) => {
            if (events.length === 0) {
              console.log(`No events received within wait time. Waiting for next interval`);
              return;
            }
    
            for (const event of events) {
              console.log(`Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`);
            }
            // Update the checkpoint.
            await context.updateCheckpoint(events[events.length - 1]);
          },
    
          processError: async (err, context) => {
            console.log(`Error : ${err}`);
          }
        },
        { startPosition: earliestEventPosition }
      );
    
      // After 30 seconds, stop processing.
      await new Promise((resolve) => {
        setTimeout(async () => {
          await subscription.close();
          await consumerClient.close();
          resolve();
        }, 30000);
      });
    }
    
    main().catch((err) => {
      console.log("Error occurred: ", err);
    });
    ```

    ### [Connection String](#tab/connection-string)

    In the code, use real values to replace the following placeholders:

    - `EVENT HUBS NAMESPACE CONNECTION STRING`
    - `EVENT HUB NAME`
    - `STORAGE CONNECTION STRING`
    - `STORAGE CONTAINER NAME`

    ```javascript
    const { EventHubConsumerClient, earliestEventPosition  } = require("@azure/event-hubs");
    const { ContainerClient } = require("@azure/storage-blob");    
    const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");
    
    const connectionString = "EVENT HUBS NAMESPACE CONNECTION STRING";    
    const eventHubName = "EVENT HUB NAME";
    const consumerGroup = "$Default"; // name of the default consumer group
    const storageConnectionString = "STORAGE CONNECTION STRING";
    const containerName = "STORAGE CONTAINER NAME";
    
    async function main() {
      // Create a blob container client and a blob checkpoint store using the client.
      const containerClient = new ContainerClient(storageConnectionString, containerName);
      const checkpointStore = new BlobCheckpointStore(containerClient);
    
      // Create a consumer client for the event hub by specifying the checkpoint store.
      const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName, checkpointStore);
    
      // Subscribe to the events, and specify handlers for processing the events and errors.
      const subscription = consumerClient.subscribe({
          processEvents: async (events, context) => {
            if (events.length === 0) {
              console.log(`No events received within wait time. Waiting for next interval`);
              return;
            }
    
            for (const event of events) {
              console.log(`Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`);
            }
            // Update the checkpoint.
            await context.updateCheckpoint(events[events.length - 1]);
          },
    
          processError: async (err, context) => {
            console.log(`Error : ${err}`);
          }
        },
        { startPosition: earliestEventPosition }
      );
    
      // After 30 seconds, stop processing.
      await new Promise((resolve) => {
        setTimeout(async () => {
          await subscription.close();
          await consumerClient.close();
          resolve();
        }, 30000);
      });
    }
    
    main().catch((err) => {
      console.log("Error occurred: ", err);
    });
    ```

    ---

1. To run this code, use the command `node receive.js`. The window display messages about received events.

    ```bash
    C:\Self Study\Event Hubs\JavaScript>node receive.js
    Received event: 'First event' from partition: '0' and consumer group: '$Default'
    Received event: 'Second event' from partition: '0' and consumer group: '$Default'
    Received event: 'Third event' from partition: '0' and consumer group: '$Default'
    ```

    > **Note:**
    > For the complete source code, including informational comments, see [receiveEventsUsingCheckpointStore.js](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/eventhubs-checkpointstore-blob/samples/v1/javascript/receiveEventsUsingCheckpointStore.js).

    The receiver program receives events from all the partitions of the default consumer group in the event hub.

## Clean up resources

Delete the resource group that has the Event Hubs namespace or delete only the namespace if you want to keep the resource group. 

## Related content

- [JavaScript samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/samples/v5/javascript)
- [TypeScript samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/samples/v5/typescript)
