---
title: "Quickstart: Send and receive events using .NET"
description: "Azure Event Hubs .NET quickstart — build a C# console app that sends and receives events using the Azure.Messaging.EventHubs library. Get started now."
ms.topic: quickstart
ms.date: 05/04/2026
ms.devlang: csharp
ms.custom:
  - devx-track-csharp
  - mode-api
  - passwordless-dotnet
  - devx-track-dotnet
  - sfi-ropc-nochange
#customer intent: As a .NET developer, I want to learn how to send events to an event hub and receive events from the event hub using C#.
---

# Quickstart: Send events to and receive events from Azure Event Hubs using .NET

Azure Event Hubs is a real-time data streaming platform that can receive and process millions of events per second. If you're building .NET applications that need to ingest or react to high-volume event streams, Event Hubs provides the scalable infrastructure to do it.

In this quickstart, you create a .NET console application that sends events to an event hub and receives them using the **Azure.Messaging.EventHubs** library. By the end, you'll have working code you can adapt for your own event-driven scenarios.

## Prerequisites
If you're new to Azure Event Hubs, see [Event Hubs overview](event-hubs-about.md) before you complete this quickstart.

> **Note:**
> If you're already familiar with the service, you can see .NET samples for Event Hubs in our .NET SDK repository on GitHub: [Event Hubs samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/eventhub/Azure.Messaging.EventHubs/samples), [Event processor samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/eventhub/Azure.Messaging.EventHubs.Processor/samples).

To complete this quickstart, you need:

- **Microsoft Azure subscription**. To use Azure services, including Event Hubs, you need a subscription. If you don't have an existing Azure account, you can sign up for a [free trial](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- **Microsoft Visual Studio 2022**. The Azure Event Hubs client library uses new features that were introduced in C# 8.0. You can still use the library with previous C# language versions, but the new syntax isn't available. To use the full syntax, we recommend that you compile with the [.NET Core SDK](https://dotnet.microsoft.com/download) 3.0 or higher and [language version](https://learn.microsoft.com/dotnet/csharp/language-reference/configure-language-version#override-a-default) set to `latest`. If you're using Visual Studio, versions before Visual Studio 2022 aren't compatible with the tools needed to build C# 8.0 projects. Visual Studio 2022, including the free Community edition, can be downloaded [here](https://visualstudio.microsoft.com/vs/).
- **Create an Event Hubs namespace and an event hub**. Use the Azure portal to create an Event Hubs namespace and an event hub in the namespace. Then, get the management credentials that your application needs to communicate with the event hub. To create a namespace and an event hub, see [Quickstart: Create an event hub using Azure portal](event-hubs-create.md).

### Authenticate the app to Azure


This quick start shows you two ways of connecting to Azure Event Hubs: 
- Passwordless (Microsoft Entra authentication)
- Connection string

The first option shows you how to use your security principal in Azure **Microsoft Entra ID and role-based access control (RBAC)** to connect to an Event Hubs namespace. You don't need to worry about having hard-coded connection strings in your code or in a configuration file or in a secure storage like Azure Key Vault. 

The second option shows you how to use a **connection string** to connect to an Event Hubs namespace. If you're new to Azure, you may find the connection string option easier to follow. We recommend using the passwordless option in real-world applications and production environments. For more information, see [Authentication and authorization](../service-bus-messaging/service-bus-authentication-and-authorization.md). You can also read more about passwordless authentication on the [overview page](https://learn.microsoft.com/dotnet/azure/sdk/authentication?tabs=command-line).

## [Passwordless](#tab/passwordless)

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


### Launch Visual Studio and sign-in to Azure

You can authorize access to the service bus namespace using the following steps:

1. Launch Visual Studio. If you see the **Get started** window, select the **Continue without code** link in the right pane.
1. Select the **Sign in** button in the top right of Visual Studio.

    Screenshot showing a button to sign in to Azure using Visual Studio.

1. Sign-in using the Microsoft Entra account you assigned a role to previously.

    Screenshot showing the account selection.


## [Connection String](#tab/connection-string)

## Get the connection string 
Creating a new namespace automatically generates an initial Shared Access Signature (SAS) policy with primary and secondary keys and connection strings that each grant full control over all aspects of the namespace. See [Event Hubs authentication and authorization](../service-bus-messaging/service-bus-authentication-and-authorization.md) for information about how to create rules with more constrained rights for regular senders and receivers. 

A client can use the connection string to connect to the Event Hubs namespace. To copy the primary connection string for your namespace, follow these steps: 

1. On the **Event Hub Namespace** page, select **Shared access policies** on the left menu.
3. On the **Shared access policies** page, select **RootManageSharedAccessKey**.
4. In the **Policy: RootManageSharedAccessKey** window, select the copy button next to **Primary Connection String**, to copy the connection string to your clipboard for later use. Paste this value into Notepad or some other temporary location.
   
    Screenshot shows an SAS policy called RootManageSharedAccessKey, which includes keys and connection strings.

    You can use this page to copy primary key, secondary key, primary connection string, and secondary connection string. 



---


## Send events to the event hub
This section shows you how to create a .NET Core console application to send events to the event hub you created. 

### Create a console application

1. If Visual Studio 2022 is already open, select **File** on the menu, select **New**, and then select **Project**. Otherwise, launch Visual Studio 2022 and select **Create a new project** if you see a popup window. 
1. In the **Create a new project** dialog box, complete the following steps: If you don't see this dialog box, select **File** on the menu, select **New**, and then select **Project**. 
    1. Select **C#** for the programming language.
    1. Select **Console** for the type of the application. 
    1. Select **Console Application** from the results list. 
    1. Select **Next**. 

        Image showing the New Project dialog box
1. Enter **EventHubsSender** for the project name, **EventHubsQuickStart** for the solution name, and then select **Next**. 

    Image showing the page where you enter solution and project names
1. On the **Additional information** page, select **Create**.

### Add the NuGet packages to the project


### [Passwordless (Recommended)](#tab/passwordless)

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** from the menu.
1. Run the following commands to install the **Azure.Messaging.EventHubs** and **Azure.Identity** NuGet packages. Press **ENTER** to run the second command. 

    ```powershell
    Install-Package Azure.Messaging.EventHubs
    Install-Package Azure.Identity
    ```

### [Connection String](#tab/connection-string)

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** from the menu.
1. Run the following command to install the **Azure.Messaging.EventHubs** NuGet package:

    ```powershell
    Install-Package Azure.Messaging.EventHubs
    ```

---


### Write code to send events to the event hub


## [Passwordless (Recommended)](#tab/passwordless)

1. Replace the existing code in the `Program.cs` file with the following sample code. Then, replace `<EVENT_HUB_NAMESPACE>` and `<HUB_NAME>` placeholder values for the `EventHubProducerClient` parameters with the names of your Event Hubs namespace and the event hub. For example: `"spehubns0309.servicebus.windows.net"` and `"spehub"`.

    Here are the important steps from the code:

    1. Creates an [EventHubProducerClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient) object using the namespace and the event hub name. 
    1. Invokes the [CreateBatchAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient.createbatchasync) method on the [EventHubProducerClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient) object to create an [EventDataBatch](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventdatabatch) object.     
    1. Adds events to the batch using the [EventDataBatch.TryAdd](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventdatabatch.tryadd) method. 
    1. Sends the batch of events to the event hub using the [EventHubProducerClient.SendAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient.sendasync) method.



    ```csharp
    using Azure.Identity;
    using Azure.Messaging.EventHubs;
    using Azure.Messaging.EventHubs.Producer;
    using System.Text;
    
    // number of events to be sent to the event hub
    int numOfEvents = 3;
    
    // The Event Hubs client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when events are being published or read regularly.
    // TODO: Replace the <EVENT_HUB_NAMESPACE> and <HUB_NAME> placeholder values
    EventHubProducerClient producerClient = new EventHubProducerClient(
        "<EVENT_HUB_NAMESPACE>.servicebus.windows.net",
        "<HUB_NAME>",
        new DefaultAzureCredential());
    
    // Create a batch of events 
    using EventDataBatch eventBatch = await producerClient.CreateBatchAsync();
    
    for (int i = 1; i <= numOfEvents; i++)
    {
        if (!eventBatch.TryAdd(new EventData(Encoding.UTF8.GetBytes($"Event {i}"))))
        {
            // if it is too large for the batch
            throw new Exception($"Event {i} is too large for the batch and cannot be sent.");
        }
    }
    
    try
    {
        // Use the producer client to send the batch of events to the event hub
        await producerClient.SendAsync(eventBatch);
        Console.WriteLine($"A batch of {numOfEvents} events has been published.");
        Console.ReadLine();
    }
    finally
    {
        await producerClient.DisposeAsync();
    }
    ```

## [Connection String](#tab/connection-string)

1. Replace the existing code in the `Program.cs` file with the following sample code. Then, replace the `<CONNECTION_STRING>` and `<HUB_NAME>` placeholder values for the `EventHubProducerClient` parameters.

    Here are the important steps from the code:

    1. Creates an [EventHubProducerClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient) object using the primary connection string to the namespace and the event hub name. 
    1. Invokes the [CreateBatchAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient.createbatchasync) method on the [EventHubProducerClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient) object to create an [EventDataBatch](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventdatabatch) object.     
    1. Adds events to the batch using the [EventDataBatch.TryAdd](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventdatabatch.tryadd) method. 
    1. Sends the batch of events to the event hub using the [EventHubProducerClient.SendAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.producer.eventhubproducerclient.sendasync) method.
  

    ```csharp
    using Azure.Messaging.EventHubs;
    using Azure.Messaging.EventHubs.Producer;
    using System.Text;
    
    // number of events to be sent to the event hub
    int numOfEvents = 3;
    
    // The Event Hubs client types are safe to cache and use as a singleton for the lifetime
    // of the application, which is best practice when events are being published or read regularly.
    // TODO: Replace the <CONNECTION_STRING> and <HUB_NAME> placeholder values
    EventHubProducerClient producerClient = new EventHubProducerClient(
        "<CONNECTION_STRING>",
        "<HUB_NAME>");
    
    // Create a batch of events 
    using EventDataBatch eventBatch = await producerClient.CreateBatchAsync();
    
    for (int i = 1; i <= numOfEvents; i++)
    {
        if (!eventBatch.TryAdd(new EventData(Encoding.UTF8.GetBytes($"Event {i}"))))
        {
            // if it is too large for the batch
            throw new Exception($"Event {i} is too large for the batch and cannot be sent.");
        }
    }
    
    try
    {
        // Use the producer client to send the batch of events to the event hub
        await producerClient.SendAsync(eventBatch);
        Console.WriteLine($"A batch of {numOfEvents} events has been published.");
        Console.ReadLine();
    }
    finally
    {
        await producerClient.DisposeAsync();
    }
    ```


---

2. Build the project, and ensure that there are no errors.
3. Run the program and wait for the confirmation message. 

    ```csharp
    A batch of 3 events has been published.
    ```
    > **Note:**
    > If you get an error "InvalidIssuer: Token issuer is invalid" when using Microsoft Entra authentication, it might be because the wrong Microsoft Entra Tenant ID is being used. In your code, replace 'new DefaultAzureCredential()' with 'new DefaultAzureCredential(new DefaultAzureCredentialOptions {TenantId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"})' to explicitly specify Microsoft Entra Tenant ID.


    > **Important:**
    > If you're using the Passwordless (Microsoft Entra role-based access control) authentication, select **Tools**, then select **Options**. In the **Options** window, expand **Azure Service Authentication**, and select **Account Selection**. Confirm that you're using the account that was added to the **Azure Event Hubs Data Owner** role on the Event Hubs namespace. 
4. On the **Event Hubs namespace** page in the Azure portal, you see three incoming messages in the **Messages** chart. Refresh the page to update the chart if needed. It might take a few seconds for it to show that the messages are received. 

    Image of the Azure portal page to verify that the event hub received the events

    > **Note:**
    > For the complete source code with more informational comments, see [this file on GitHub](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/eventhub/Azure.Messaging.EventHubs/samples/Sample04_PublishingEvents.md)

## Receive events from the event hub
This section shows how to write a .NET Core console application that receives events from an event hub using an event processor. The event processor simplifies receiving events from event hubs. 

### Create an Azure Storage account and a blob container
In this quickstart, you use Azure Storage as the checkpoint store. Use the following steps to create an Azure Storage account: 

1. [Create an Azure Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-portal)
1. [Create a blob container](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-portal.md#create-a-container)
1. Authenticate to the blob container by using either Microsoft Entra ID (passwordless) authentication or a connection string to the namespace.


Follow these recommendations when you use Azure Blob Storage as a checkpoint store: 

- Use a separate container for each consumer group. You can use the same storage account, but use one container per each group.
- Don't use the storage account for anything else.
- Don't use the container for anything else.
- Create the storage account in the same region as the deployed application. If the application is on-premises, try to choose the closest region possible.

On the **Storage account** page in the Azure portal, in the **Blob service** section, ensure that the following settings are disabled. 

- Hierarchical namespace
- Blob soft delete
- Versioning


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

[Get the connection string for the storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-get-info.md#get-a-connection-string-for-the-storage-account)

Record the connection string and the container name. Use them in the code to receive events from the event hub. 
    

---
### Create a project for the receiver

1. In the Solution Explorer window, right-click the **EventHubQuickStart** solution, point to **Add**, and select **New Project**. 
1. Select **Console application**, and select **Next**. 
1. Enter **EventHubsReceiver** for the **Project name**, and select **Create**. 
1. In the **Solution Explorer** window, right-click **EventHubsReceiver**, and select **Set as a Startup Project**. 

### Add the NuGet packages to the project


### [Passwordless (Recommended)](#tab/passwordless)

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** from the menu.
1. In the **Package Manager Console** window, confirm that **EventHubsReceiver** is selected for the **Default project**. If not, use the drop-down list to select **EventHubsReceiver**.
1. Run the following command to install the **Azure.Messaging.EventHubs** and **Azure.Identity** NuGet packages. Press **ENTER** to run the last command.

    ```powershell
    Install-Package Azure.Messaging.EventHubs
    Install-Package Azure.Messaging.EventHubs.Processor
    Install-Package Azure.Identity
    ```

### [Connection String](#tab/connection-string)

1. Select **Tools** > **NuGet Package Manager** > **Package Manager Console** from the menu.
1. In the **Package Manager Console** window, confirm that **EventHubsReceiver** is selected for the **Default project**. If not, use the drop-down list to select **EventHubsReceiver**.
1. Run the following command to install the **Azure.Messaging.EventHubs** NuGet package:

    ```powershell
    Install-Package Azure.Messaging.EventHubs
    Install-Package Azure.Messaging.EventHubs.Processor
    ```

---
### Update the code

Replace the contents of **Program.cs** with the following code:

## [Passwordless (Recommended)](#tab/passwordless)

1. Replace the existing code in the `Program.cs` file with the following sample code. Then, replace the `<STORAGE_ACCOUNT_NAME>` and `<BLOB_CONTAINER_NAME>` placeholder values for the `BlobContainerClient` URI. Replace the `<EVENT_HUB_NAMESPACE>` and `<HUB_NAME>` placeholder values for the `EventProcessorClient` as well.

    Here are the important steps from the code:
    
    1. Creates an [EventProcessorClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient) object using the Event Hubs namespace and the event hub name. You need to build [BlobContainerClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient) object for the container in the Azure storage you created earlier.
    1. Specifies handlers for the [ProcessEventAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient.processeventasync) and [ProcessErrorAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient.processerrorasync) events of the [EventProcessorClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient) object. 
    1. Starts processing events by invoking the [StartProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient.startprocessingasync) on the [EventProcessorClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient) object. 
    1. Stops processing events after 30 seconds by invoking [StopProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient.stopprocessingasync) on the [EventProcessorClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient) object.
       

    ```csharp
    using Azure.Identity;
    using Azure.Messaging.EventHubs;
    using Azure.Messaging.EventHubs.Consumer;
    using Azure.Messaging.EventHubs.Processor;
    using Azure.Storage.Blobs;
    using System.Text;
    
    // Create a blob container client that the event processor will use
    // TODO: Replace <STORAGE_ACCOUNT_NAME> and <BLOB_CONTAINER_NAME> with actual names
    BlobContainerClient storageClient = new BlobContainerClient(
        new Uri("https://<STORAGE_ACCOUNT_NAME>.blob.core.windows.net/<BLOB_CONTAINER_NAME>"),
        new DefaultAzureCredential());
    
    // Create an event processor client to process events in the event hub
    // TODO: Replace the <EVENT_HUBS_NAMESPACE> and <HUB_NAME> placeholder values
    var processor = new EventProcessorClient(
        storageClient,
        EventHubConsumerClient.DefaultConsumerGroupName,
        "<EVENT_HUB_NAMESPACE>.servicebus.windows.net",
        "<HUB_NAME>",
        new DefaultAzureCredential());
    
    // Register handlers for processing events and handling errors
    processor.ProcessEventAsync += ProcessEventHandler;
    processor.ProcessErrorAsync += ProcessErrorHandler;
    
    // Start the processing
    await processor.StartProcessingAsync();
    
    // Wait for 30 seconds for the events to be processed
    await Task.Delay(TimeSpan.FromSeconds(30));
    
    // Stop the processing
    await processor.StopProcessingAsync();
    
    Task ProcessEventHandler(ProcessEventArgs eventArgs)
    {
        // Write the body of the event to the console window
        Console.WriteLine("\tReceived event: {0}", Encoding.UTF8.GetString(eventArgs.Data.Body.ToArray()));
        Console.ReadLine();
        return Task.CompletedTask;
    }
    
    Task ProcessErrorHandler(ProcessErrorEventArgs eventArgs)
    {
        // Write details about the error to the console window
        Console.WriteLine($"\tPartition '{eventArgs.PartitionId}': an unhandled exception was encountered. This was not expected to happen.");
        Console.WriteLine(eventArgs.Exception.Message);
        Console.ReadLine();
        return Task.CompletedTask;
    }
    ```

## [Connection String](#tab/connection-string)

1. Replace the existing code in the `Program.cs` file with the following sample code. Then, replace the `<AZURE_STORAGE_CONNECTION_STRING>` and `<BLOB_CONTAINER_NAME>` placeholder values for the `BlobContainerClient` URI. Replace the `<EVENT_HUB_NAMESPACE_CONNECTION_STRING>` and `<HUB_NAME>` placeholder values for the `EventProcessorClient` as well.

    Here are the important steps from the code:
    
    1. Creates an [EventProcessorClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient) object using the primary connection string to the namespace and the event hub. You need to build [BlobContainerClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient) object for the container in the Azure storage you created earlier.
    1. Specifies handlers for the [ProcessEventAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient.processeventasync) and [ProcessErrorAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient.processerrorasync) events of the [EventProcessorClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient) object. 
    1. Starts processing events by invoking the [StartProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient.startprocessingasync) on the [EventProcessorClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient) object. 
    1. Stops processing events after 30 seconds by invoking [StopProcessingAsync](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient.stopprocessingasync) on the [EventProcessorClient](https://learn.microsoft.com/dotnet/api/azure.messaging.eventhubs.eventprocessorclient) object.
       
    
    ```csharp
    using Azure.Messaging.EventHubs;
    using Azure.Messaging.EventHubs.Consumer;
    using Azure.Messaging.EventHubs.Processor;
    using Azure.Storage.Blobs;
    using System.Text;
    
    // Create a blob container client that the event processor will use 
    BlobContainerClient storageClient = new BlobContainerClient(
        "<AZURE_STORAGE_CONNECTION_STRING>", "<BLOB_CONTAINER_NAME>");
    
    // Create an event processor client to process events in the event hub
    var processor = new EventProcessorClient(
        storageClient,
        EventHubConsumerClient.DefaultConsumerGroupName,
        "<EVENT_HUBS_NAMESPACE_CONNECTION_STRING>",
        "<HUB_NAME>");
    
    // Register handlers for processing events and handling errors
    processor.ProcessEventAsync += ProcessEventHandler;
    processor.ProcessErrorAsync += ProcessErrorHandler;
    
    // Start the processing
    await processor.StartProcessingAsync();
    
    // Wait for 30 seconds for the events to be processed
    await Task.Delay(TimeSpan.FromSeconds(30));
    
    // Stop the processing
    await processor.StopProcessingAsync();
    
    Task ProcessEventHandler(ProcessEventArgs eventArgs)
    {
        // Write the body of the event to the console window
        Console.WriteLine("\tReceived event: {0}", Encoding.UTF8.GetString(eventArgs.Data.Body.ToArray()));
        return Task.CompletedTask;
    }
    
    Task ProcessErrorHandler(ProcessErrorEventArgs eventArgs)
    {
        // Write details about the error to the console window
        Console.WriteLine($"\tPartition '{eventArgs.PartitionId}': an unhandled exception was encountered. This was not expected to happen.");
        Console.WriteLine(eventArgs.Exception.Message);
        return Task.CompletedTask;
    }
    ```


   
---

2. Build the project, and ensure that there are no errors.

    > **Note:**
    > For the complete source code with more informational comments, see [this file on GitHub](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/eventhub/Azure.Messaging.EventHubs.Processor/samples/Sample01_HelloWorld.md).
3. Run the receiver application. 
4. You see a message that the events are received. Press ENTER after you see a received event message.

    ```bash
    Received event: Event 1
    Received event: Event 2
    Received event: Event 3    
    ```
    These events are the three events you sent to the event hub earlier by running the sender program. 
5. In the Azure portal, you can verify that there are three outgoing messages, which Event Hubs sent to the receiving application. Refresh the page to update the chart. It might take a few seconds for it to show that the messages are received. 

    Image of the Azure portal page to verify that the event hub sent events to the receiving app

## Schema validation for Event Hubs SDK-based applications

You can use Azure Schema Registry to perform schema validation when you stream data with your Event Hubs SDK-based applications. 
Azure Schema Registry of Event Hubs provides a centralized repository for managing schemas, and you can seamlessly connect your new or existing applications with Schema Registry. 

To learn more, see [Validate schemas with Event Hubs SDK](schema-registry-dotnet-send-receive-quickstart.md). 


## Samples and reference
This quickstart provides step-by-step instructions to implement a scenario of sending a batch of events to an event hub and then receiving them. For more samples, select the following links. 

- [Event Hubs samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/eventhub/Azure.Messaging.EventHubs/samples)
- [Event processor samples on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/eventhub/Azure.Messaging.EventHubs.Processor/samples)
- [Azure role-based access control (Azure RBAC) sample](https://github.com/Azure/azure-event-hubs/tree/master/samples/DotNet/Azure.Messaging.EventHubs/ManagedIdentityWebApp)

For complete .NET library reference, see our [SDK documentation](https://learn.microsoft.com/dotnet/api/overview/azure/event-hubs). 

## Clean up resources
Delete the resource group that has the Event Hubs namespace or delete only the namespace if you want to keep the resource group. 

## Related content
See the following tutorial: 

> 
> [Tutorial: Visualize data anomalies in real-time events sent to Azure Event Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/stream-analytics-real-time-fraud-detection.md?toc=%2Fazure%2Fevent-hubs%2FTOC.json)
