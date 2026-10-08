---
title: Send and Receive Events from Azure Event Hubs Using Python  
description: Quickly learn how to send and receive events from Azure Event Hubs using Python. This guide provides step-by-step instructions for beginners.  
ms.topic: quickstart
ms.date: 08/25/2026
ms.devlang: python
ai-usage: ai-assisted
ms.custom:
  - mode-api
  - passwordless-python
  - devx-track-python
  - build-2025
  - sfi-ropc-nochange
---

# Quickstart: Send events to or receive events from event hubs by using Python

In this quickstart, you learn how to send events to and receive events from an event hub using the **azure-eventhub** Python package.

## Prerequisites
If you're new to Azure Event Hubs, see [Event Hubs overview](event-hubs-about.md) before you do this quickstart. 

To complete this quickstart, ensure you have the following prerequisites:  
- **Microsoft Azure subscription**: Sign up for a [free trial](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) if you don't have one.  
- **Python 3.9 or later**: Ensure pip is installed and updated.  
- **Visual Studio Code (recommended)**: Or use any other IDE of your choice.  
- **Event Hubs namespace and event hub**: Follow [this guide](event-hubs-create.md) to create them in the [Azure portal](https://portal.azure.com).  

### Install the packages to send events

To install the Python packages for Event Hubs, open a command prompt that has Python in its path. Change the directory to the folder where you want to keep your samples.

## [Passwordless (Recommended)](#tab/passwordless)

```shell
pip install azure-eventhub
pip install azure-identity
pip install aiohttp
```

## [Connection String](#tab/connection-string)

```shell
pip install azure-eventhub
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

In this section, create a Python script to send events to the event hub that you created earlier.

1. Open your favorite Python editor, such as [Visual Studio Code](https://code.visualstudio.com/).
1. Create a script called *send.py*. This script sends a batch of events to the event hub that you created earlier.
1. Paste the following code into *send.py*:

    ## [Passwordless (Recommended)](#tab/passwordless)

    In the code, use real values to replace the following placeholders:

    * `EVENT_HUB_FULLY_QUALIFIED_NAMESPACE` - You see the fully qualified name on the **Overview** page of the namespace. It should be in the format: `<NAMESPACENAME>.servicebus.windows.net`.
    * `EVENT_HUB_NAME` - Name of the event hub. 

    ```python
    import asyncio
    
    from azure.eventhub import EventData
    from azure.eventhub.aio import EventHubProducerClient
    from azure.identity.aio import DefaultAzureCredential
    
    EVENT_HUB_FULLY_QUALIFIED_NAMESPACE = "EVENT_HUB_FULLY_QUALIFIED_NAMESPACE"
    EVENT_HUB_NAME = "EVENT_HUB_NAME"
    
    credential = DefaultAzureCredential()
    
    async def run():
        # Create a producer client to send messages to the event hub.
        # Specify a credential that has correct role assigned to access
        # event hubs namespace and the event hub name.
        producer = EventHubProducerClient(
            fully_qualified_namespace=EVENT_HUB_FULLY_QUALIFIED_NAMESPACE,
            eventhub_name=EVENT_HUB_NAME,
            credential=credential,
        )
        print("Producer client created successfully.") 
        async with producer:
            # Create a batch.
            event_data_batch = await producer.create_batch()
    
            # Add events to the batch.
            event_data_batch.add(EventData("First event "))
            event_data_batch.add(EventData("Second event"))
            event_data_batch.add(EventData("Third event"))
    
            # Send the batch of events to the event hub.
            await producer.send_batch(event_data_batch)
    
            # Close credential when no longer needed.
            await credential.close()
    
    asyncio.run(run())
    ```

    ## [Connection String](#tab/connection-string)

    In the code, use real values to replace the following placeholders:

    * `EVENT_HUB_CONNECTION_STR`
    * `EVENT_HUB_NAME`

    > **Note:**
    > Ensure that **EVENT_HUB_NAME** is the name of the event hub and not the Event Hubs namespace. If this value is incorrect, you receive the error code: `CBS Token authentication failed.`.

    ```python
    import asyncio
    
    from azure.eventhub import EventData
    from azure.eventhub.aio import EventHubProducerClient
    
    EVENT_HUB_CONNECTION_STR = "EVENT_HUB_CONNECTION_STR"
    EVENT_HUB_NAME = "EVENT_HUB_NAME"
    
    async def run():
        # Create a producer client to send messages to the event hub.
        # Specify a connection string to your event hubs namespace and
        # the event hub name.
        producer = EventHubProducerClient.from_connection_string(
            conn_str=EVENT_HUB_CONNECTION_STR, eventhub_name=EVENT_HUB_NAME
        )
        async with producer:
            # Create a batch.
            event_data_batch = await producer.create_batch()
    
            # Add events to the batch.
            event_data_batch.add(EventData("First event "))
            event_data_batch.add(EventData("Second event"))
            event_data_batch.add(EventData("Third event"))
    
            # Send the batch of events to the event hub.
            await producer.send_batch(event_data_batch)
    
    asyncio.run(run())    
    ```
    ---
    > **Note:**
    > For examples of other options for sending events to an event hub asynchronously using a connection string, see the [GitHub send_async.py page](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/eventhub/azure-eventhub/samples/async_samples/send_async.py). The patterns shown there also apply to sending events passwordless.
    

## Receive events

This quickstart uses Azure Blob storage as a checkpoint store. The checkpoint store persists checkpoints (that is, the last read positions).  


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
Create an Azure storage account and a blob container in it by following these steps:

1. [Create an Azure Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-portal)
1. [Create a blob container](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-portal.md#create-a-container).
1. Authenticate to the blob container.

Be sure to record the connection string and container name for later use in the receive code.

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

Follow the instructions in [Get the connection string to the storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-configure-connection-string.md) to get the connection string to the storage account. Use the connection string in the script (`BLOB_STORAGE_CONNECTION_STRING`). You need the connection string and the name of the blob container you created. 


---

### Install the packages to receive events

For the receiving side, you need to install one or more packages. In this quickstart, you use Azure Blob storage to persist checkpoints so that the program doesn't read the events that it already read. It performs metadata checkpoints on received messages at regular intervals in a blob. This approach makes it easy to continue receiving messages later from where you left off.

## [Passwordless (Recommended)](#tab/passwordless)

```shell
pip install azure-eventhub-checkpointstoreblob-aio
pip install azure-identity
```

## [Connection String](#tab/connection-string)

```shell
pip install azure-eventhub-checkpointstoreblob-aio
```

---

### Create a Python script to receive events

In this section, you create a Python script to receive events from your event hub:

1. Open your favorite Python editor, such as [Visual Studio Code](https://code.visualstudio.com/).
1. Create a script called *recv.py*.
1. Paste the following code into *recv.py*:

    ## [Passwordless (Recommended)](#tab/passwordless)

    In the code, use real values to replace the following placeholders:

    * `BLOB_STORAGE_ACCOUNT_URL` - Use the format: `https://<YOURSTORAGEACCOUNTNAME>.blob.core.windows.net/`
    * `BLOB_CONTAINER_NAME` - Name of the blob container in the Azure storage account.
    * `EVENT_HUB_FULLY_QUALIFIED_NAMESPACE`  - View the fully qualified name on the **Overview** page of the namespace. Use the format: `<NAMESPACENAME>.servicebus.windows.net`.
    * `EVENT_HUB_NAME` - Name of the event hub.

    ```python
    import asyncio
    
    from azure.eventhub.aio import EventHubConsumerClient
    from azure.eventhub.extensions.checkpointstoreblobaio import (
        BlobCheckpointStore,
    )
    from azure.identity.aio import DefaultAzureCredential
    
    BLOB_STORAGE_ACCOUNT_URL = "BLOB_STORAGE_ACCOUNT_URL"
    BLOB_CONTAINER_NAME = "BLOB_CONTAINER_NAME"
    EVENT_HUB_FULLY_QUALIFIED_NAMESPACE = "EVENT_HUB_FULLY_QUALIFIED_NAMESPACE"
    EVENT_HUB_NAME = "EVENT_HUB_NAME"
    
    credential = DefaultAzureCredential()
    
    async def on_event(partition_context, event):
        # Print the event data.
        print(
            'Received the event: "{}" from the partition with ID: "{}"'.format(
                event.body_as_str(encoding="UTF-8"), partition_context.partition_id
            )
        )
    
        # Update the checkpoint so that the program doesn't read the events
        # that it has already read when you run it next time.
        await partition_context.update_checkpoint(event)
    
    
    async def main():
        # Create an Azure blob checkpoint store to store the checkpoints.
        checkpoint_store = BlobCheckpointStore(
            blob_account_url=BLOB_STORAGE_ACCOUNT_URL,
            container_name=BLOB_CONTAINER_NAME,
            credential=credential,
        )
    
        # Create a consumer client for the event hub.
        client = EventHubConsumerClient(
            fully_qualified_namespace=EVENT_HUB_FULLY_QUALIFIED_NAMESPACE,
            eventhub_name=EVENT_HUB_NAME,
            consumer_group="$Default",
            checkpoint_store=checkpoint_store,
            credential=credential,
        )
        async with client:
            # Call the receive method. Read from the beginning of the partition
            # (starting_position: "-1")
            await client.receive(on_event=on_event, starting_position="-1")
    
        # Close credential when no longer needed.
        await credential.close()
    
    if __name__ == "__main__":
        # Run the main method.
        asyncio.run(main())
    ```

    ## [Connection String](#tab/connection-string)

    In the code, use real values to replace the following placeholders:

    * `BLOB_STORAGE_CONNECTION_STRING` - Connection string to the Blob Storage account that you noted earlier. 
    * `BLOB_CONTAINER_NAME` - Name of the blob container you created in the blob storage.
    * `EVENT_HUB_CONNECTION_STR` - Connection string to the Event Hubs namespace you noted earlier.
    * `EVENT_HUB_NAME` - Name of the event hub. 

    ```python
    import asyncio
    
    from azure.eventhub.aio import EventHubConsumerClient
    from azure.eventhub.extensions.checkpointstoreblobaio import (
        BlobCheckpointStore,
    )

    BLOB_STORAGE_CONNECTION_STRING = "BLOB_STORAGE_CONNECTION_STRING"
    BLOB_CONTAINER_NAME = "BLOB_CONTAINER_NAME"
    EVENT_HUB_CONNECTION_STR = "EVENT_HUB_CONNECTION_STR"
    EVENT_HUB_NAME = "EVENT_HUB_NAME"

    async def on_event(partition_context, event):
        # Print the event data.
        print(
            'Received the event: "{}" from the partition with ID: "{}"'.format(
                event.body_as_str(encoding="UTF-8"), partition_context.partition_id
            )
        )
    
        # Update the checkpoint so that the program doesn't read the events
        # that it has already read when you run it next time.
        await partition_context.update_checkpoint(event)
    
    async def main():
        # Create an Azure blob checkpoint store to store the checkpoints.
        checkpoint_store = BlobCheckpointStore.from_connection_string(
            BLOB_STORAGE_CONNECTION_STRING, BLOB_CONTAINER_NAME
        )
    
        # Create a consumer client for the event hub.
        client = EventHubConsumerClient.from_connection_string(
            EVENT_HUB_CONNECTION_STR,
            consumer_group="$Default",
            eventhub_name=EVENT_HUB_NAME,
            checkpoint_store=checkpoint_store,
        )
        async with client:
            # Call the receive method. Read from the beginning of the
            # partition (starting_position: "-1")
            await client.receive(on_event=on_event, starting_position="-1")
    
    if __name__ == "__main__":
        asyncio.run(main())
    ```

    ---

    > **Note:**
    > For examples of other options for receiving events from an event hub asynchronously using a connection string, see the [GitHub recv_with_checkpoint_store_async.py page](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/eventhub/azure-eventhub/samples/async_samples/recv_with_checkpoint_store_async.py). The patterns shown there also apply to receiving events passwordless.


### Run the receiver app

1. Launch a command prompt. 
1. Run the following command and sign in by using an account that you added to the **Azure Event Hubs Data Owner** role on the Event Hubs namespace and **Storage Blob Data Contributor** role on the Azure storage account.

    ```azurecli    
    az login
    ```    
1. Switch to the folder that has the recv.py file, and run the following command:

    ```bash
    python recv.py
    ```
    
### Run the sender app

1. Launch a command prompt. 
1. Run the following command and sign in by using an account that you added to the **Azure Event Hubs Data Owner** role on the Event Hubs namespace and **Storage Blob Data Contributor** role on the Azure storage account.

    ```azurecli    
    az login
    ```    
1. Switch to the folder that has the `send.py` file, and then run this command:

    ```bash
    python send.py
    ```

The receiver window should display the messages that were sent to the event hub. 

### Troubleshooting

If you don't see events in the receiver window or the code reports an error, try the following troubleshooting tips:

* If you don't see results from `recv.py`, run `send.py` several times.

* If you see errors about "coroutine" when using the passwordless code (with credentials), ensure you're using importing from `azure.identity.aio`.

* If you see "Unclosed client session" with passwordless code (with credentials), ensure you close the credential when finished. For more information, see [Async credentials](https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python\&preserve-view=true#async-credentials).

* If you see authorization errors with `recv.py` when accessing storage, ensure you followed the steps in [Create an Azure storage account and a blob container](#create-an-azure-storage-account-and-a-blob-container) and assigned the **Storage Blob Data Contributor** role to the service principal.

* If you receive events with different partition IDs, this result is expected. Partitions are a data organization mechanism that relates to the downstream parallelism required in consuming applications. The number of partitions in an event hub directly relates to the number of concurrent readers you expect to have. For more information, see [Learn more about partitions](event-hubs-features.md#partitions).

## Clean up resources

If you no longer need the resources you created for this quickstart, delete the resource group that contains the Event Hubs namespace and the storage account. In the [Azure portal](https://portal.azure.com), select the resource group, and then select **Delete resource group**.

## Related content

In this quickstart, you sent and received events asynchronously. Continue with these resources:

- To learn how to send and receive events synchronously, see the [GitHub sync_samples page](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/eventhub/azure-eventhub/samples/sync_samples).
- Explore more examples and advanced scenarios in the [Azure Event Hubs client library for Python samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/eventhub/azure-eventhub/samples).
