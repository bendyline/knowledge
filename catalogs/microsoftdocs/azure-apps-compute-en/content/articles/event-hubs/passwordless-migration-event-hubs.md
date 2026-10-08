---
title: Migrate applications to use passwordless authentication with Azure Event Hubs
titleSuffix: Azure Event Hubs
description: Learn to migrate existing applications away from Shared Key authorization with the account key to instead use Microsoft Entra ID and Azure role-based access control (RBAC) for enhanced security with Azure Event Hubs.
ms.date: 06/12/2023
ms.topic: how-to
ms.custom:
  - devx-track-csharp
  - passwordless-java
  - passwordless-js
  - passwordless-python
  - passwordless-dotnet
  - passwordless-go
  - devx-track-azurecli
  - devx-track-azurepowershell
  - sfi-image-nochange
---

# Migrate an application to use passwordless connections with Azure Event Hubs


Application requests to Azure services must be authenticated using configurations such as account access keys or passwordless connections. However, you should prioritize passwordless connections in your applications when possible. Traditional authentication methods that use passwords or secret keys create security risks and complications. Visit the [passwordless connections for Azure services](https://learn.microsoft.com/azure/developer/intro/passwordless-overview) hub to learn more about the advantages of moving to passwordless connections.

The following tutorial explains how to migrate an existing application to connect using passwordless connections. These same migration steps should apply whether you're using access keys, connection strings, or another secrets-based approach.

## Configure your local development environment

Passwordless connections can be configured to work for both local and Azure-hosted environments. In this section, you apply configurations to allow individual users to authenticate to Azure Event Hubs for local development.

### Assign user roles


When developing locally, make sure that the user account that is accessing Azure Event Hubs has the correct permissions. You'll need the **Azure Event Hubs Data Receiver** and **Azure Event Hubs Data Sender** roles to read and write message data. To assign yourself this role, you'll need to be assigned the **User Access Administrator** role, or another role that includes the **Microsoft.Authorization/roleAssignments/write** action. You can assign Azure RBAC roles to a user using the Azure portal, Azure CLI, or Azure PowerShell. Learn more about the available scopes for role assignments on the [scope overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md) page.

The following example assigns the **Azure Event Hubs Data Sender** and **Azure Event Hubs Data Receiver** roles to your user account. These role grants read and write access to event hub messages.

### [Azure portal](#tab/roles-azure-portal)

1. In the Azure portal, locate your event hub using the main search bar or left navigation.

2. On the event hub overview page, select **Access control (IAM)** from the left-hand menu.

3. On the **Access control (IAM)** page, select the **Role assignments** tab.

4. Select **+ Add** from the top menu and then **Add role assignment** from the resulting drop-down menu.

    A screenshot showing how to assign a role.

5. Use the search box to filter the results to the desired role. For this example, search for *Azure Event Hubs Data Sender* and select the matching result and then choose **Next**.

6. Under **Assign access to**, select **User, group, or service principal**, and then choose **+ Select members**.

7. In the dialog, search for your Microsoft Entra username (usually your *user@domain* email address) and then choose **Select** at the bottom of the dialog.

8. Select **Review + assign** to go to the final page, and then **Review + assign** again to complete the process.

9. Repeat these steps for the **Azure Event Hubs Data Receiver** role to allow the account to send and receive messages.

### [Azure CLI](#tab/roles-azure-cli)

To assign a role at the resource level using the Azure CLI, you first must retrieve the resource ID using the `az eventhubs eventhub show` command. You can filter the output properties using the `--query` parameter.

```azurecli
az eventhubs eventhub show \
    --resource-group '<your-resource-group-name>' \
    --namespace-name '<your-event-hubs-namespace>' \
    --name '<your-event-hub-name>' \
    --query id
```

Copy the output `Id` from the preceding command. You can then assign roles using the [az role](https://learn.microsoft.com/cli/azure/role) command of the Azure CLI.

```azurecli
az role assignment create --assignee "<user@domain>" \
    --role "Azure Event Hubs Data Receiver" \
    --scope "<your-resource-id>"

az role assignment create --assignee "<user@domain>" \
    --role "Azure Event Hubs Data Sender" \
    --scope "<your-resource-id>"
```

### [PowerShell](#tab/roles-powershell)

To assign a role at the resource level using Azure PowerShell, you first must retrieve the resource ID using the `Get-AzResource` command.

```azurepowershell
Get-AzResource -ResourceGroupName "<yourResourceGroupname>" -Name "<yourEventHubsNamespace>"
```

Copy the `Id` value from the preceding command output. You can then assign roles using the [New-AzRoleAssignment](https://learn.microsoft.com/powershell/module/az.resources/new-azroleassignment) command in PowerShell.

```azurepowershell
New-AzRoleAssignment -SignInName <user@domain> `
    -RoleDefinitionName "Azure Event Hubs Data Receiver" `
    -Scope <yourEventHubsId>

New-AzRoleAssignment -SignInName <user@domain> `
    -RoleDefinitionName "Azure Event Hubs Data Sender" `
    -Scope <yourEventHubsId>
```

---

> **Important:**
> In most cases, it will take a minute or two for the role assignment to propagate in Azure, but in rare cases it may take up to eight minutes. If you receive authentication errors when you first run your code, wait a few moments and try again.


### Sign-in to Azure locally

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/passwordless/default-azure-credential-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/passwordless-migration-event-hubs.md)

### Update the application code to use passwordless connections

The Azure Identity client library, for each of the following ecosystems, provides a `DefaultAzureCredential` class that handles passwordless authentication to Azure:

- [.NET](https://learn.microsoft.com/dotnet/api/overview/azure/Identity-readme?view=azure-dotnet\&preserve-view=true#defaultazurecredential)
- [C++](https://github.com/Azure/azure-sdk-for-cpp/blob/main/sdk/identity/azure-identity/README.md#defaultazurecredential)
- [Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/azidentity#readme-defaultazurecredential)
- [Java](https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable\&preserve-view=true#defaultazurecredential)
- [Node.js](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest\&preserve-view=true#defaultazurecredential)
- [Python](https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python\&preserve-view=true#defaultazurecredential)

`DefaultAzureCredential` supports multiple authentication methods. The method to use is determined at runtime. This approach enables your app to use different authentication methods in different environments (local vs. production) without implementing environment-specific code. See the preceding links for the order and locations in which `DefaultAzureCredential` looks for credentials.

## [.NET](#tab/dotnet)

1. To use `DefaultAzureCredential` in a .NET application, install the `Azure.Identity` package:

   ```dotnetcli
   dotnet add package Azure.Identity
   ```

1. At the top of your file, add the following code:

   ```csharp
   using Azure.Identity;
   ```

1. Identify the locations in your code that create an `EventHubProducerClient` or `EventProcessorClient` object to connect to Azure Event Hubs. Update your code to match the following example:

    ```csharp
    DefaultAzureCredential credential = new();
    var eventHubNamespace = $"https://{namespace}.servicebus.windows.net";

    // Event Hubs producer
    EventHubProducerClient producerClient = new(
        eventHubNamespace,
        eventHubName,
        credential);

    // Event Hubs processor
    EventProcessorClient processorClient = new(
        storageClient,
        EventHubConsumerClient.DefaultConsumerGroupName,
        eventHubNamespace,
        eventHubName,
        credential);
    ```

## [Go](#tab/go)

1. To use `DefaultAzureCredential` in a Go application, install the `azidentity` module:

    ```bash
    go get -u github.com/Azure/azure-sdk-for-go/sdk/azidentity
    ```

1. At the top of your file, add the following code:

    ```go
    import (
        "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
    )
    ```

1. Identify the locations in your code that create a `ProducerClient` or `ConsumerClient` instance to connect to Azure Event Hubs. Update your code to match the following example:

    ```go
    credential, err := azidentity.NewDefaultAzureCredential(nil)
    eventHubNamespace := fmt.Sprintf(
        "https://%s.servicebus.windows.net",
        namespace)

    if err != nil {
        // handle error
    }

    // Event Hubs producer
    producerClient, err = azeventhubs.NewProducerClient(
        eventHubNamespace,
        eventHubName,
        credential,
        nil)

    if err != nil {
        // handle error
    }

    // Event Hubs processor
    processorClient, err = azeventhubs.NewConsumerClient(
        eventHubNamespace,
        eventHubName,
        azeventhubs.DefaultConsumerGroup,
        credential,
        nil)

    if err != nil {
        // handle error
    }
    ```

## [Java](#tab/java)

1. To use `DefaultAzureCredential` in a Java application, install the `azure-identity` package via one of the following approaches:
    1. [Include the BOM file](https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable\&preserve-view=true#include-the-bom-file).
    1. [Include a direct dependency](https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable\&preserve-view=true#include-direct-dependency).

1. At the top of your file, add the following code:

    ```java
    import com.azure.identity.DefaultAzureCredentialBuilder;
    ```

1. Identify the locations in your code that create an `EventHubProducerClient` or `EventProcessorClient` object to connect to Azure Event Hubs. Update your code to match the following example:

    ```java
    DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
        .build();
    String eventHubNamespace = "https://" + namespace + ".servicebus.windows.net";

    // Event Hubs producer
    EventHubProducerClient producerClient = new EventHubClientBuilder()
        .credential(eventHubNamespace, eventHubName, credential)
        .buildProducerClient();

    // Event Hubs processor
    EventProcessorClient processorClient = new EventProcessorClientBuilder()
        .consumerGroup(consumerGroupName)
        .credential(eventHubNamespace, eventHubName, credential)
        .checkpointStore(new SampleCheckpointStore())
        .processEvent(eventContext -> {
            System.out.println(
                "Partition ID = " +
                eventContext.getPartitionContext().getPartitionId() +
                " and sequence number of event = " +
                eventContext.getEventData().getSequenceNumber());
        })
        .processError(errorContext -> {
            System.out.println(
                "Error occurred while processing events " +
                errorContext.getThrowable().getMessage());
        })
        .buildEventProcessorClient();
    ```

## [Node.js](#tab/nodejs)

1. To use `DefaultAzureCredential` in a Node.js application, install the `@azure/identity` package:

    ```bash
    npm install --save @azure/identity
    ```

1. At the top of your file, add the following code:

    ```nodejs
    import { DefaultAzureCredential } from "@azure/identity";
    ```

1. Identify the locations in your code that create an `EventHubProducerClient` or `EventHubConsumerClient` object to connect to Azure Event Hubs. Update your code to match the following example:

    ```nodejs
    const credential = new DefaultAzureCredential();
    const eventHubNamespace = `https://${namespace}.servicebus.windows.net`;

    // Event Hubs producer    
    const producerClient = new EventHubProducerClient(
        eventHubNamespace,
        eventHubName,
        credential);

    // Event Hubs processor
    const processorClient = new EventHubConsumerClient(
        consumerGroupName,
        eventHubNamespace,
        eventHubName,
        credential
    );
    ```

## [Python](#tab/python)

1. To use `DefaultAzureCredential` in a Python application, install the `azure-identity` package:
    
    ```bash
    pip install azure-identity
    ```

1. At the top of your file, add the following code:

    ```python
    from azure.identity import DefaultAzureCredential
    ```

1. Identify the locations in your code that create an `EventHubProducerClient` or `EventHubConsumerClient` object to connect to Azure Event Hubs. Update your code to match the following example:

    ```python
    credential = DefaultAzureCredential()
    event_hub_namespace = "https://%s.servicebus.windows.net" % namespace

    # Event Hubs producer
    producer_client = EventHubProducerClient(
        fully_qualified_namespace = event_hub_namespace,
        eventhub_name = event_hub_name,
        credential = credential
    )

    # Event Hubs processor
    processor_client = EventHubConsumerClient(
        fully_qualified_namespace = event_hub_namespace,
        eventhub_name = event_hub_name,
        consumer_group = "$Default",
        checkpoint_store = checkpoint_store,
        credential = credential
    )
    ```

---

4. Make sure to update the event hubs namespace in the URI of your `EventHubProducerClient` or `EventProcessorClient` objects. You can find the namespace name on the overview page of the Azure portal.

    Screenshot showing how to find the namespace name.

### Run the app locally

After making these code changes, run your application locally. The new configuration should pick up your local credentials, such as the Azure CLI, Visual Studio, or IntelliJ. The roles you assigned to your user in Azure allows your app to connect to the Azure service locally.

## Configure the Azure hosting environment

Once your application is configured to use passwordless connections and runs locally, the same code can authenticate to Azure services after it's deployed to Azure. The sections that follow explain how to configure a deployed application to connect to Azure Event Hubs using a [managed identity](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview). Managed identities provide an automatically managed identity in Microsoft Entra ID for applications to use when connecting to resources that support Microsoft Entra authentication. Learn more about managed identities:

* [Passwordless Overview](https://learn.microsoft.com/azure/developer/intro/passwordless-overview)
* [Managed identity best practices](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/managed-identity-best-practice-recommendations)

### Create the managed identity

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/passwordless/migration-guide/create-user-assigned-managed-identity.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/passwordless-migration-event-hubs.md)

#### Associate the managed identity with your web app

You need to configure your web app to use the managed identity you created. Assign the identity to your app using either the Azure portal or the Azure CLI.

# [Azure portal](#tab/azure-portal-associate)

Complete the following steps in the Azure portal to associate an identity with your app. These same steps apply to the following Azure services:

* Azure Spring Apps
* Azure Container Apps
* Azure virtual machines
* Azure Kubernetes Service

1. Navigate to the overview page of your web app.
1. Select **Identity** from the left navigation.
1. On the **Identity** page, switch to the **User assigned** tab.
1. Select **+ Add** to open the **Add user assigned managed identity** flyout.
1. Select the subscription you used previously to create the identity.
1. Search for the **MigrationIdentity** by name and select it from the search results.
1. Select **Add** to associate the identity with your app.

   Screenshot showing how to create a user assigned identity.

# [Azure CLI](#tab/azure-cli-associate)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/passwordless/migration-guide/associate-managed-identity-cli.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/passwordless-migration-event-hubs.md)

# [Service Connector](#tab/service-connector-associate)


You can use Service Connector to create a connection between an Azure compute hosting environment and a target service using the Azure CLI. The Service Connector CLI commands automatically assign the proper role to your identity. You can learn more about Service Connector and which scenarios are supported on the [overview page](../service-connector/overview.md).

1. Retrieve the client ID of the managed identity you created using the `az identity show` command. Copy the value for later use.

    ```azurecli
    az identity show \
        --name MigrationIdentity \
        --resource-group <your-resource-group> \
        --query clientId
    ```

1. Use the appropriate CLI command to establish the service connection:

    # [Azure App Service](#tab/app-service-connector)
    
    If you're using an Azure App Service, use the [az webapp connection](https://learn.microsoft.com/cli/azure/webapp/connection/create) command:
    
    ```azurecli
    az webapp connection create eventhub \
        --resource-group <resource-group-name> \
        --name <webapp-name> \
        --target-resource-group <target-resource-group-name> \
        --account <target-event-hub-namespace> \
        --user-identity "client-id=<your-identity-client-id>" "subs-id=<your-subscription-id>"
    ```
    
    # [Azure Spring Apps](#tab/spring-connector)
    
    If you're using Azure Spring Apps, use the [az spring connection](https://learn.microsoft.com/cli/azure/spring/connection/create) command:
    
    ```azurecli
    az spring connection create eventhub \
        --resource-group <resource-group-name> \
        --service <service-instance-name> \
        --app <app-name> \
        --deployment <deployment-name> \
        --target-resource-group <target-resource-group> \
        --account <target-event-hub-namespace> \
        --user-identity "client-id=<your-identity-client-id>" "subs-id=<your-subscription-id>"
    ```
    
    # [Azure Container Apps](#tab/container-apps-connector)
    
    If you're using Azure Container Apps, use the [az containerapp connection](https://learn.microsoft.com/cli/azure/containerapp/connection) command:
    
    ```azurecli
    az containerapp connection create eventhub \
        --resource-group <resource-group-name> \
        --name <containerapp-name> \
        --target-resource-group <target-resource-group> \
        --account <target-event-hub-namespace> \
        --user-identity "client-id=<your-identity-client-id>" "subs-id=<your-subscription-id>"
    ```

    ---


---

### Assign roles to the managed identity

Next, you need to grant permissions to the managed identity you created to access your event hub. Grant permissions by assigning a role to the managed identity, just like you did with your local development user.

### [Azure portal](#tab/assign-role-azure-portal)

1. Navigate to your event hub overview page and select **Access Control (IAM)** from the left navigation.

1. Choose **Add role assignment**

    Screenshot showing how to add a role to a managed identity.

1. In the **Role** search box, search for *Azure Event Hubs Data Sender*, which is a common role used to manage data operations for queues. You can assign whatever role is appropriate for your use case. Select the *Azure Event Hubs Data Sender* from the list and choose **Next**.

1. On the **Add role assignment** screen, for the **Assign access to** option, select **Managed identity**. Then choose **+Select members**.

1. In the flyout, search for the managed identity you created by name and select it from the results. Choose **Select** to close the flyout menu.

    Screenshot showing how to select the assigned managed identity.

1. Select **Next** a couple times until you're able to select **Review + assign** to finish the role assignment.

1. Repeat these steps for the **Azure Event Hub Data Receiver** role.

### [Azure CLI](#tab/assign-role-azure-cli)

To assign a role at the resource level using the Azure CLI, you first must retrieve the resource ID using the [`az eventhubs eventhub show`](https://learn.microsoft.com/cli/azure/eventhubs/eventhub) show command. You can filter the output properties using the `--query` parameter.

```azurecli
az eventhubs eventhub show \
    --resource-group '<your-resource-group-name>' \
    --namespace-name '<your-event-hubs-namespace>' \
    --name '<your-event-hub-name>' \
    --query id
```

Copy the output ID from the preceding command. You can then assign roles using the [az role assignment](https://learn.microsoft.com/cli/azure/role/assignment) command of the Azure CLI.

```azurecli
az role assignment create --assignee "<user@domain>" \
    --role "Azure Event Hubs Data Receiver" \
    --scope "<your-resource-id>"

az role assignment create --assignee "<user@domain>" \
    --role "Azure Event Hubs Data Sender" \
    --scope "<your-resource-id>"
```

### [Service Connector](#tab/assign-role-service-connector)

If you connected your services using Service Connector you don't need to complete this step. The necessary role configurations were handled for you when you ran the Service Connector CLI commands.

---

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/passwordless/migration-guide/passwordless-user-assigned-managed-identity.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/passwordless-migration-event-hubs.md)

### Test the app

After deploying the updated code, browse to your hosted application in the browser. Your app should be able to connect to the event hub successfully. Keep in mind that it can take several minutes for the role assignments to propagate through your Azure environment. Your application is now configured to run both locally and in a production environment without the developers having to manage secrets in the application itself.

## Next steps

In this tutorial, you learned how to migrate an application to passwordless connections.

You can read the following resources to explore the concepts discussed in this article in more depth:

* [Passwordless connections for Azure services](https://learn.microsoft.com/azure/developer/intro/passwordless-overview)
* To learn more about .NET, see [Get started with .NET in 10 minutes](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/intro).
