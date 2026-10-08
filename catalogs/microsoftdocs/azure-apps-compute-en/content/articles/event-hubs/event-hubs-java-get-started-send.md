---
title: Send and Receive Events With Java in Azure Event Hubs
description: Learn how to create a Java application to send and receive events in Azure Event Hubs. Follow this step-by-step guide to get started.
ms.topic: quickstart
ms.date: 12/04/2025
ms.devlang: java
ms.custom:
  - devx-track-java
  - mode-api
  - passwordless-java
  - devx-track-extended-java
  - build-2025
  - sfi-ropc-nochange
---

# Quickstart: Send events to or receive events from Azure Event Hubs

In this Quickstart, you learn how to send events to and receive events from an Azure event hub using the **azure-messaging-eventhubs** Java package.

> **Tip:**
> If you're working with Azure Event Hubs resources in a Spring application, we recommend that you consider [Spring Cloud Azure](https://learn.microsoft.com/azure/developer/java/spring-framework/) as an alternative. Spring Cloud Azure is an open-source project that provides seamless Spring integration with Azure services. To learn more about Spring Cloud Azure, and to see an example using Event Hubs, see [Spring Cloud Stream with Azure Event Hubs](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-cloud-stream-binder-java-app-azure-event-hub).

## Prerequisites

If you're new to Azure Event Hubs, see [Event Hubs overview](event-hubs-about.md) before you do this quickstart.

To complete this quickstart, you need the following prerequisites:

- **Microsoft Azure subscription**. To use Azure services, including Azure Event Hubs, you need a subscription. If you don't have an existing Azure account, you can sign up for a [free trial](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) or use your MSDN subscriber benefits when you [create an account](https://azure.microsoft.com).
- A Java development environment. This quickstart uses [Eclipse](https://www.eclipse.org/). Java Development Kit (JDK) with version 8 or above is required.
- **Create an Event Hubs namespace and an event hub**. The first step is to use the [Azure portal](https://portal.azure.com) to create a namespace of type Event Hubs, and obtain the management credentials your application needs to communicate with the event hub. To create a namespace and an event hub, follow the procedure in [this article](event-hubs-create.md). Then, get the **connection string for the Event Hubs namespace** by following instructions from the article: [Get connection string](event-hubs-get-connection-string.md#azure-portal). You use the connection string later in this quickstart.

## Send events

This section shows you how to create a Java application to send events an event hub.

### Add reference to Azure Event Hubs library

First, create a new **Maven** project for a console/shell application in your favorite Java development environment. Update the `pom.xml` file as follows. The Java client library for Event Hubs is available in the [Maven Central Repository](https://central.sonatype.com/artifact/com.azure/azure-messaging-eventhubs). 

### [Passwordless (Recommended)](#tab/passwordless)

```xml
		<dependency>
		    <groupId>com.azure</groupId>
		    <artifactId>azure-messaging-eventhubs</artifactId>
		    <version>5.20.2</version>
		</dependency>
		<dependency>
		    <groupId>com.azure</groupId>
		    <artifactId>azure-identity</artifactId>
		    <version>1.16.1</version>
		    <scope>compile</scope>
		</dependency>
```

### [Connection String](#tab/connection-string)

```xml
		<dependency>
		    <groupId>com.azure</groupId>
		    <artifactId>azure-messaging-eventhubs</artifactId>
		    <version>5.20.2</version>
		</dependency>
```

---

> **Note:**
> Update the version to the latest version published to the Maven repository.

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


### Write code to send messages to the event hub

## [Passwordless (Recommended)](#tab/passwordless)
Add a class named `Sender`, and add the following code to the class:

> **Important:**
> - Update `<NAMESPACE NAME>` with the name of your Event Hubs namespace.
> - Update `<EVENT HUB NAME>` with the name of your event hub. 

```java
package ehubquickstart;

import com.azure.messaging.eventhubs.*;
import java.util.Arrays;
import java.util.List;

import com.azure.identity.*;

public class SenderAAD {

    // replace <NAMESPACE NAME> with the name of your Event Hubs namespace.
    // Example: private static final String namespaceName = "contosons.servicebus.windows.net";
    private static final String namespaceName = "<NAMESPACE NAME>.servicebus.windows.net";

    // Replace <EVENT HUB NAME> with the name of your event hub. 
    // Example: private static final String eventHubName = "ordersehub";
    private static final String eventHubName = "<EVENT HUB NAME>";

    public static void main(String[] args) {
        publishEvents();
    }
    /**
     * Code sample for publishing events.
     * @throws IllegalArgumentException if the EventData is bigger than the max batch size.
     */
    public static void publishEvents() {
        // create a token using the default Azure credential        
        DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
                .authorityHost(AzureAuthorityHosts.AZURE_PUBLIC_CLOUD)
                .build();

        // create a producer client        
        EventHubProducerClient producer = new EventHubClientBuilder()        
            .fullyQualifiedNamespace(namespaceName)
            .eventHubName(eventHubName)
            .credential(credential)
            .buildProducerClient();

        // sample events in an array
        List<EventData> allEvents = Arrays.asList(new EventData("Foo"), new EventData("Bar"));

        // create a batch
        EventDataBatch eventDataBatch = producer.createBatch();

        for (EventData eventData : allEvents) {
            // try to add the event from the array to the batch
            if (!eventDataBatch.tryAdd(eventData)) {
                // if the batch is full, send it and then create a new batch
                producer.send(eventDataBatch);
                eventDataBatch = producer.createBatch();

                // Try to add that event that couldn't fit before.
                if (!eventDataBatch.tryAdd(eventData)) {
                    throw new IllegalArgumentException("Event is too large for an empty batch. Max size: "
                        + eventDataBatch.getMaxSizeInBytes());
                }
            }
        }
        // send the last batch of remaining events
        if (eventDataBatch.getCount() > 0) {
            producer.send(eventDataBatch);
        }
        producer.close();
    }   
}
```

## [Connection String](#tab/connection-string)
Add a class named `Sender`, and add the following code to the class:

> **Important:**
> Update `<Event Hubs namespace connection string>` with the connection string to your Event Hubs namespace. Update `<Event hub name>` with the name of your event hub in the namespace.

```java
import com.azure.messaging.eventhubs.*;
import java.util.Arrays;
import java.util.List;

public class Sender {
    private static final String connectionString = "<Event Hubs namespace connection string>";
    private static final String eventHubName = "<Event hub name>";

    public static void main(String[] args) {
        publishEvents();
    }
}
```

### Add code to publish events to the event hub

Add a method named `publishEvents` to the `Sender` class:

```java
    /**
     * Code sample for publishing events.
     * @throws IllegalArgumentException if the EventData is bigger than the max batch size.
     */
    public static void publishEvents() {
        // create a producer client
        EventHubProducerClient producer = new EventHubClientBuilder()
            .connectionString(connectionString, eventHubName)
            .buildProducerClient();

        // sample events in an array
        List<EventData> allEvents = Arrays.asList(new EventData("Foo"), new EventData("Bar"));

        // create a batch
        EventDataBatch eventDataBatch = producer.createBatch();

        for (EventData eventData : allEvents) {
            // try to add the event from the array to the batch
            if (!eventDataBatch.tryAdd(eventData)) {
                // if the batch is full, send it and then create a new batch
                producer.send(eventDataBatch);
                eventDataBatch = producer.createBatch();

                // Try to add that event that couldn't fit before.
                if (!eventDataBatch.tryAdd(eventData)) {
                    throw new IllegalArgumentException("Event is too large for an empty batch. Max size: "
                        + eventDataBatch.getMaxSizeInBytes());
                }
            }
        }
        // send the last batch of remaining events
        if (eventDataBatch.getCount() > 0) {
            producer.send(eventDataBatch);
        }
        producer.close();
    }
```
---

Build the program, and ensure that there are no errors. You'll run this program after you run the receiver program.

## Receive events

The code in this tutorial is based on the [EventProcessorClient sample on GitHub](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/eventhubs/azure-messaging-eventhubs-checkpointstore-blob/src/samples/java/com/azure/messaging/eventhubs/checkpointstore/blob/EventProcessorBlobCheckpointStoreSample.java), which you can examine to see the full working application.


Follow these recommendations when you use Azure Blob Storage as a checkpoint store: 

- Use a separate container for each consumer group. You can use the same storage account, but use one container per each group.
- Don't use the storage account for anything else.
- Don't use the container for anything else.
- Create the storage account in the same region as the deployed application. If the application is on-premises, try to choose the closest region possible.

On the **Storage account** page in the Azure portal, in the **Blob service** section, ensure that the following settings are disabled. 

- Hierarchical namespace
- Blob soft delete
- Versioning


### Create an Azure Storage and a blob container

In this quickstart, you use Azure Storage (specifically, Blob Storage) as the checkpoint store. Checkpointing is a process by which an event processor marks or commits the position of the last successfully processed event within a partition. Marking a checkpoint is typically done within the function that processes the events. To learn more about checkpointing, see [Event processor](event-processor-balance-partition-load.md).

Follow these steps to create an Azure Storage account.

1. [Create an Azure Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-portal)
2. [Create a blob container](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-portal.md#create-a-container)
3. Authenticate to the blob container
    
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

[Get the connection string to the storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-configure-connection-string.md).

Note down the **connection string** and the **container name**. You use them in the receive code. 

---
### Add Event Hubs libraries to your Java project

## [Passwordless (Recommended)](#tab/passwordless)

Add the following dependencies in the pom.xml file.

- [azure-messaging-eventhubs](https://central.sonatype.com/artifact/com.azure/azure-messaging-eventhubs)
- [azure-messaging-eventhubs-checkpointstore-blob](https://central.sonatype.com/artifact/com.azure/azure-messaging-eventhubs-checkpointstore-blob)
- [azure-identity](https://central.sonatype.com/artifact/com.azure/azure-identity)

```xml
	<dependencies>
		<dependency>
		    <groupId>com.azure</groupId>
		    <artifactId>azure-messaging-eventhubs</artifactId>
		    <version>5.20.2</version>
		</dependency>
		<dependency>
		    <groupId>com.azure</groupId>
		    <artifactId>azure-messaging-eventhubs-checkpointstore-blob</artifactId>
		    <version>1.20.6</version>
		</dependency>
		<dependency>
		    <groupId>com.azure</groupId>
		    <artifactId>azure-identity</artifactId>
		    <version>1.16.1</version>
		    <scope>compile</scope>
		</dependency>	
	</dependencies>
```


### [Connection String](#tab/connection-string)

Add the following dependencies in the pom.xml file.

- [azure-messaging-eventhubs](https://central.sonatype.com/artifact/com.azure/azure-messaging-eventhubs)
- [azure-messaging-eventhubs-checkpointstore-blob](https://central.sonatype.com/artifact/com.azure/azure-messaging-eventhubs-checkpointstore-blob)

```xml
	<dependencies>
		<dependency>
		    <groupId>com.azure</groupId>
		    <artifactId>azure-messaging-eventhubs</artifactId>
		    <version>5.20.2</version>
		</dependency>
		<dependency>
		    <groupId>com.azure</groupId>
		    <artifactId>azure-messaging-eventhubs-checkpointstore-blob</artifactId>
		    <version>1.20.6</version>
		</dependency>
	</dependencies>
```
---


## [Passwordless (Recommended)](#tab/passwordless)

1. Add the following `import` statements at the top of the Java file.

    ```java
    import com.azure.messaging.eventhubs.*;
    import com.azure.messaging.eventhubs.checkpointstore.blob.BlobCheckpointStore;
    import com.azure.messaging.eventhubs.models.*;
    import com.azure.storage.blob.*;
    import java.util.function.Consumer;
    
    import com.azure.identity.*;
    ```
2. Create a class named `Receiver`, and add the following string variables to the class. Replace the placeholders with the correct values.

    > **Important:**
    > Replace the placeholders with the correct values.
    > - `<NAMESPACE NAME>` with the name of your Event Hubs namespace.
    > - `<EVENT HUB NAME>` with the name of your event hub in the namespace.

    ```java
    private static final String namespaceName = "<NAMESPACE NAME>.servicebus.windows.net";
    private static final String eventHubName = "<EVENT HUB NAME>";
    ```
3. Add the following `main` method to the class.

    > **Important:**
    > Replace the placeholders with the correct values.
    > - `<STORAGE ACCOUNT NAME>` with the name of your Azure Storage account.
    > - `<CONTAINER NAME>` with the name of the blob container in the storage account

    ```java
    // create a token using the default Azure credential
    DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
            .authorityHost(AzureAuthorityHosts.AZURE_PUBLIC_CLOUD)
            .build();

    // Create a blob container client that you use later to build an event processor client to receive and process events
    BlobContainerAsyncClient blobContainerAsyncClient = new BlobContainerClientBuilder()
            .credential(credential)
            .endpoint("https://<STORAGE ACCOUNT NAME>.blob.core.windows.net")
            .containerName("<CONTAINER NAME>")
            .buildAsyncClient();
    
    // Create an event processor client to receive and process events and errors.
    EventProcessorClient eventProcessorClient = new EventProcessorClientBuilder()
        .fullyQualifiedNamespace(namespaceName)
        .eventHubName(eventHubName)
        .consumerGroup(EventHubClientBuilder.DEFAULT_CONSUMER_GROUP_NAME)
        .processEvent(PARTITION_PROCESSOR)
        .processError(ERROR_HANDLER)
        .checkpointStore(new BlobCheckpointStore(blobContainerAsyncClient))            
        .credential(credential)
        .buildEventProcessorClient();

    System.out.println("Starting event processor");
    eventProcessorClient.start();

    System.out.println("Press enter to stop.");
    System.in.read();

    System.out.println("Stopping event processor");
    eventProcessorClient.stop();
    System.out.println("Event processor stopped.");

    System.out.println("Exiting process");  
    ```

## [Connection String](#tab/connection-string)

1. Add the following **import** statements at the top of the Java file.

    ```java
    import com.azure.messaging.eventhubs.*;
    import com.azure.messaging.eventhubs.checkpointstore.blob.BlobCheckpointStore;
    import com.azure.messaging.eventhubs.models.*;
    import com.azure.storage.blob.*;
    import java.util.function.Consumer;
    ```
2. Create a class named `Receiver`, and add the following string variables to the class. Replace the placeholders with the correct values.

    > **Important:**
    > Replace the placeholders with the correct values.
    > - `<Event Hubs namespace connection string>` with the connection string to your Event Hubs namespace. Update
    > - `<Event hub name>` with the name of your event hub in the namespace.
    > - `<Storage connection string>` with the connection string to your Azure storage account.
    > - `<Storage container name>` with the name of your container in your Azure Blob storage.

    ```java
    private static final String connectionString = "<Event Hubs namespace connection string>";
    private static final String eventHubName = "<Event hub name>";
    private static final String storageConnectionString = "<Storage connection string>";
    private static final String storageContainerName = "<Storage container name>";
    ```
3. Add the following `main` method to the class.

    ```java
    public static void main(String[] args) throws Exception {
        // Create a blob container client that you use later to build an event processor client to receive and process events
        BlobContainerAsyncClient blobContainerAsyncClient = new BlobContainerClientBuilder()
            .connectionString(storageConnectionString)
            .containerName(storageContainerName)
            .buildAsyncClient();

        // Create a builder object that you will use later to build an event processor client to receive and process events and errors.
        EventProcessorClientBuilder eventProcessorClientBuilder = new EventProcessorClientBuilder()
            .connectionString(connectionString, eventHubName)
            .consumerGroup(EventHubClientBuilder.DEFAULT_CONSUMER_GROUP_NAME)
            .processEvent(PARTITION_PROCESSOR)
            .processError(ERROR_HANDLER)
            .checkpointStore(new BlobCheckpointStore(blobContainerAsyncClient));

        // Use the builder object to create an event processor client
        EventProcessorClient eventProcessorClient = eventProcessorClientBuilder.buildEventProcessorClient();

        System.out.println("Starting event processor");
        eventProcessorClient.start();

        System.out.println("Press enter to stop.");
        System.in.read();

        System.out.println("Stopping event processor");
        eventProcessorClient.stop();
        System.out.println("Event processor stopped.");

        System.out.println("Exiting process");
    }
    ```
---

4. Add the two helper methods (`PARTITION_PROCESSOR` and `ERROR_HANDLER`) that process events and errors to the `Receiver` class.

    ```java
    public static final Consumer<EventContext> PARTITION_PROCESSOR = eventContext -> {
        PartitionContext partitionContext = eventContext.getPartitionContext();
        EventData eventData = eventContext.getEventData();

        System.out.printf("Processing event from partition %s with sequence number %d with body: %s%n",
            partitionContext.getPartitionId(), eventData.getSequenceNumber(), eventData.getBodyAsString());

        // Every 10 events received, it will update the checkpoint stored in Azure Blob Storage.
        if (eventData.getSequenceNumber() % 10 == 0) {
            eventContext.updateCheckpoint();
        }
    };

    public static final Consumer<ErrorContext> ERROR_HANDLER = errorContext -> {
        System.out.printf("Error occurred in partition processor for partition %s, %s.%n",
            errorContext.getPartitionContext().getPartitionId(),
            errorContext.getThrowable());
    };
    ```

5. Build the program, and ensure that there are no errors.

## Run the applications

1. Run the **Receiver** application first.
1. Then, run the **Sender** application.
1. In the **Receiver** application window, confirm that you see the events that were published by the Sender application.

    ```cmd
    Starting event processor
    Press enter to stop.
    Processing event from partition 0 with sequence number 331 with body: Foo
    Processing event from partition 0 with sequence number 332 with body: Bar
    ```
    
1. Press **ENTER** in the receiver application window to stop the application.

    ```cmd
    Starting event processor
    Press enter to stop.
    Processing event from partition 0 with sequence number 331 with body: Foo
    Processing event from partition 0 with sequence number 332 with body: Bar

    Stopping event processor
    Event processor stopped.
    Exiting process
    ```

## Related content

See the following samples on GitHub:

- [azure-messaging-eventhubs samples](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/eventhubs/azure-messaging-eventhubs/src/samples/java/com/azure/messaging/eventhubs)
- [azure-messaging-eventhubs-checkpointstore-blob samples](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/eventhubs/azure-messaging-eventhubs-checkpointstore-blob/src/samples/java/com/azure/messaging/eventhubs/checkpointstore/blob).
