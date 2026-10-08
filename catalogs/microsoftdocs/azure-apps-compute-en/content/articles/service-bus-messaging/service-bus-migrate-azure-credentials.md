---
title: Migrate an application to use passwordless connections with Azure Service Bus
titleSuffix: Azure Event Hubs
description: Learn to migrate existing Service Bus applications away from connection strings and use Microsoft Entra ID and Azure Role Based Access Control (RBAC) for enhanced security.
ms.reviewer: randolphwest
ms.date: 07/25/2025
ms.topic: how-to
ms.custom: 
  - sfi-ropc-nochange
  - devx-track-csharp
  - devx-track-azurecli
  - devx-track-azurepowershell
  - passwordless-dotnet
  - passwordless-go
  - passwordless-java
  - passwordless-js
  - passwordless-python
---

# Migrate an application to use passwordless connections with Azure Service Bus

Application requests to Azure Service Bus must be authenticated using either account access keys or passwordless connections. However, you should prioritize passwordless connections in your applications when possible. This tutorial explores how to migrate from traditional authentication methods to more secure, passwordless connections.

## Security risks associated with access keys

The following code example demonstrates how to connect to Azure Service Bus using a connection string that includes an access key. When you create a Service Bus, Azure generates these keys and connection strings automatically. Many developers gravitate towards this solution because it feels familiar to options they worked with in the past. If your application currently uses connection strings, consider migrating to passwordless connections using the steps described in this document.

## [.NET](#tab/dotnet)

```csharp
await using ServiceBusClient client = new("<CONNECTION-STRING>");
```

## [Go](#tab/go)

```go
client, err := azservicebus.NewClientFromConnectionString(
    "<CONNECTION-STRING>",
    nil)

if err != nil {
    // handle error
}
```

## [Java](#tab/java)

**JMS:**

```java
ConnectionFactory factory = new ServiceBusJmsConnectionFactory(
    "<CONNECTION-STRING>",
    new ServiceBusJmsConnectionFactorySettings());
```

**Receiver client:**

```java
ServiceBusReceiverClient receiver = new ServiceBusClientBuilder()
    .connectionString("<CONNECTION-STRING>")
    .receiver()
    .topicName("<TOPIC-NAME>")
    .subscriptionName("<SUBSCRIPTION-NAME>")
    .buildClient();
```

**Sender client:**

```java
ServiceBusSenderClient client = new ServiceBusClientBuilder()
    .connectionString("<CONNECTION-STRING>")
    .sender()
    .queueName("<QUEUE-NAME>")
    .buildClient();
```

## [Node.js](#tab/nodejs)

```nodejs
const client = new ServiceBusClient("<CONNECTION-STRING>");
```

## [Python](#tab/python)

```python
client = ServiceBusClient(
    fully_qualified_namespace = "<CONNECTION-STRING>"
)
```

---

Connection strings should be used with caution. Developers must be diligent to never expose the keys in an unsecure location. Anyone who gains access to the key is able to authenticate. For example, if an account key is accidentally checked into source control, sent through an unsecure email, or viewed by someone who shouldn't have permission, there's risk of a malicious user accessing the application. Instead, consider updating your application to use passwordless connections.

## Migrate to passwordless connections

Many Azure services support passwordless connections through Microsoft Entra ID and Role Based Access control (RBAC). These techniques provide robust security features and can be implemented using `DefaultAzureCredential` from the Azure Identity client libraries.

> **Important:**
> Some languages must implement `DefaultAzureCredential` explicitly in their code, while others utilize `DefaultAzureCredential` internally through underlying plugins or drivers.

`DefaultAzureCredential` supports multiple authentication methods and automatically determines which should be used at runtime. This approach enables your app to use different authentication methods in different environments (local dev vs. production) without implementing environment-specific code.

The order and locations in which `DefaultAzureCredential` searches for credentials can be found in the [Azure Identity library overview](https://learn.microsoft.com/dotnet/api/overview/azure/Identity-readme#defaultazurecredential) and varies between languages. For example, when working locally with .NET, `DefaultAzureCredential` will generally authenticate using the account the developer used to sign-in to Visual Studio, Azure CLI, or Azure PowerShell. When the app is deployed to Azure, `DefaultAzureCredential` will automatically discover and use the [managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) of the associated hosting service, such as Azure App Service. No code changes are required for this transition.

> **Note:**
> A managed identity provides a security identity to represent an app or service. The identity is managed by the Azure platform and does not require you to provision or rotate any secrets. You can read more about managed identities in the [overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) documentation.

The following code example demonstrates how to connect to Service Bus using passwordless connections. The next section describes how to migrate to this setup for a specific service in more detail.

A .NET application can pass an instance of `DefaultAzureCredential` into the constructor of a service client class. `DefaultAzureCredential` will automatically discover the credentials that are available in that environment.

```csharp
client = new ServiceBusClient(
    "<NAMESPACE-NAME>.servicebus.windows.net",
    new DefaultAzureCredential());
```


## Steps to migrate an app to use passwordless authentication

The following steps explain how to migrate an existing application to use passwordless connections instead of a key-based solution. You first configure a local development environment, and then apply those concepts to an Azure app hosting environment. These same migration steps should apply whether you're using access keys directly, or through connection strings.

### Configure roles and users for local development authentication


When developing locally, make sure that the user account that is accessing Service Bus has the correct permissions. In this example you'll use the **Azure Service Bus Data Owner** role to send and receive data, though more granular roles are also available. To assign yourself this role, you'll need to be assigned the **User Access Administrator** role, or another role that includes the **Microsoft.Authorization/roleAssignments/write** action. You can assign Azure RBAC roles to a user using the Azure portal, Azure CLI, or Azure PowerShell. You can learn more about the available scopes for role assignments on the [scope overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md) page.

In this scenario, you'll assign permissions to your user account scoped to a specific Service Bus namespace, to follow the [Principle of Least Privilege](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/secure-least-privileged-access.md). This practice gives users only the minimum permissions needed and creates more secure production environments.

The following example will assign the **Azure Service Bus Data Owner** role to your user account, which allows you to send and receive data.

> **Important:**
> In most cases it will take a minute or two for the role assignment to propagate in Azure, but in rare cases it may take up to eight minutes. If you receive authentication errors when you first run your code, wait a few moments and try again.

### [Azure portal](#tab/roles-azure-portal)

1. In the Azure portal, locate your Service Bus namespace using the main search bar or left navigation.

2. On the Service Bus overview page, select **Access control (IAM)** from the left-hand menu.

3. On the **Access control (IAM)** page, select the **Role assignments** tab.

4. Select **+ Add** from the top menu and then **Add role assignment** from the resulting drop-down menu.

    A screenshot showing how to assign a role.

5. Use the search box to filter the results to the desired role. For this example, search for *Azure Service Bus Data Owner* and select the matching result and then choose **Next**.

6. Under **Assign access to**, select **User, group, or service principal**, and then choose **+ Select members**.

7. In the dialog, search for your Microsoft Entra username (usually your *user@domain* email address) and then choose **Select** at the bottom of the dialog.

8. Select **Review + assign** to go to the final page, and then **Review + assign** again to complete the process.

### [Azure CLI](#tab/roles-azure-cli)

To assign a role at the resource level using the Azure CLI, you first must retrieve the resource ID using the `az servicebus namespace show` command. You can filter the output properties using the `--query` parameter.

```azurecli
az servicebus namespace show --resource-group '<your-resource-group-name>' --name '<your-service-bus-namespace>' --query id
```

Copy the output `ID` from the preceding command. You can then assign roles using the [az role](https://learn.microsoft.com/cli/azure/role) command of the Azure CLI.

```azurecli
az role assignment create --assignee "<user@domain>" \
    --role "Azure Service Bus Data Owner" \
    --scope "<your-resource-id>"
```

### [PowerShell](#tab/roles-powershell)

To assign a role at the resource level using Azure PowerShell, you first must retrieve the resource ID using the `Get-AzResource` command.

```azurepowershell
Get-AzResource -ResourceGroupName "<yourResourceGroupname>" -Name "<yourServiceBusName>"
```

Copy the `ID` value from the preceding command output. You can then assign roles using the [New-AzRoleAssignment](https://learn.microsoft.com/powershell/module/az.resources/new-azroleassignment) command in PowerShell.

```azurepowershell
New-AzRoleAssignment -SignInName <user@domain> `
    -RoleDefinitionName "Azure Service Bus Data Owner" `
    -Scope <yourServiceBusId>
```

---


### Sign-in and migrate the app code to use passwordless connections

For local development, make sure you're authenticated with the same Microsoft Entra account you assigned the role to for the Service Bus namespace. You can authenticate via the Azure CLI, Visual Studio, Azure PowerShell, or other tools such as IntelliJ.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/passwordless/default-azure-credential-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/service-bus-migrate-azure-credentials.md)

Next, update your code to use passwordless connections.

## [.NET](#tab/dotnet)

1. To use `DefaultAzureCredential` in a .NET application, install the `Azure.Identity` package:

   ```dotnetcli
   dotnet add package Azure.Identity
   ```

1. At the top of your file, add the following code:

   ```csharp
   using Azure.Identity;
   ```

1. Identify the code that creates a `ServiceBusClient` object to connect to Azure Service Bus. Update your code to match the following example:

   ```csharp
    var serviceBusNamespace = $"{namespace}.servicebus.windows.net";
    ServiceBusClient client = new(
        serviceBusNamespace,
        new DefaultAzureCredential());
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

1. Identify the locations in your code that create a `Client` instance to connect to Azure Service Bus. Update your code to match the following example:

    ```go
    credential, err := azidentity.NewDefaultAzureCredential(nil)

    if err != nil {
        // handle error
    }

    serviceBusNamespace := fmt.Sprintf(
        "%s.servicebus.windows.net",
        namespace)
    client, err := azservicebus.NewClient(serviceBusNamespace, credential, nil)

    if err != nil {
        // handle error
    }
    ```

## [Java](#tab/java)

1. To use `DefaultAzureCredential`:
    - In a JMS application, add at least version 1.0.0 of the `azure-servicebus-jms` package to your application:

        ```xml
        <dependency>
            <groupId>com.microsoft.azure</groupId>
            <artifactId>azure-servicebus-jms</artifactId>
            <version>1.0.0</version>
        </dependency>
        ```

    - In a Java application, install the `azure-identity` package via one of the following approaches:
        - [Include the BOM file](https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable\&preserve-view=true#include-the-bom-file).
        - [Include a direct dependency](https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable\&preserve-view=true#include-direct-dependency).
    
1. At the top of your file, add the following code:

    ```java
    import com.azure.identity.DefaultAzureCredentialBuilder;
    ```

1. Update the code that connects to Azure Service Bus:
    - In a JMS application, identify the code that creates a `ServiceBusJmsConnectionFactory` object to connect to Azure Service Bus. Update your code to match the following example:

       ```java
        DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
            .build();
        String serviceBusNamespace = 
            namespace + ".servicebus.windows.net";
    
        ConnectionFactory factory = new ServiceBusJmsConnectionFactory(
            credential,
            serviceBusNamespace,
            new ServiceBusJmsConnectionFactorySettings());
       ```

    - In a Java application, identify the code that creates a Service Bus sender or receiver client object to connect to Azure Service Bus. Update your code to match one of the following examples:

        **Receiver client:**
        
        ```java
        DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
            .build();
        String serviceBusNamespace = 
            namespace + ".servicebus.windows.net";
    
        ServiceBusReceiverClient receiver = new ServiceBusClientBuilder()
            .credential(serviceBusNamespace, credential)
            .receiver()
            .topicName("<TOPIC-NAME>")
            .subscriptionName("<SUBSCRIPTION-NAME>")
            .buildClient();
        ```
    
        **Sender client:**
    
        ```java
        DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
            .build();
        String serviceBusNamespace = 
            namespace + ".servicebus.windows.net";
    
        ServiceBusSenderClient client = new ServiceBusClientBuilder()
            .credential(serviceBusNamespace, credential)
            .sender()
            .queueName("<QUEUE-NAME>")
            .buildClient();
        ```

## [Node.js](#tab/nodejs)

1. To use `DefaultAzureCredential` in a Node.js application, install the `@azure/identity` package:

    ```bash
    npm install --save @azure/identity
    ```

1. At the top of your file, add the following code:

    ```nodejs
    const { DefaultAzureCredential } = require("@azure/identity");
    ```

1. Identify the code that creates a `ServiceBusClient` object to connect to Azure Service Bus. Update your code to match the following example:

    ```nodejs
    const credential = new DefaultAzureCredential();
    const serviceBusNamespace = `${namespace}.servicebus.windows.net`;    

    const client = new ServiceBusClient(
      serviceBusNamespace,
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

1. Identify the code that creates a `ServiceBusClient` object to connect to Azure Service Bus. Update your code to match the following example:

    ```python
    credential = DefaultAzureCredential()
    service_bus_namespace = "%s.servicebus.windows.net" % namespace

    client = ServiceBusClient(
        fully_qualified_namespace = service_bus_namespace,
        credential = credential
    )
    ```

---

#### Run the app locally

After making these code changes, run your application locally. The new configuration should pick up your local credentials, such as the Azure CLI, Visual Studio, or IntelliJ. The roles you assigned to your local dev user in Azure allows your app to connect to the Azure service locally.

### Configure the Azure hosting environment

Once your application is configured to use passwordless connections and runs locally, the same code can authenticate to Azure services when deployed to Azure. For example, an application deployed to an Azure App Service instance that has a managed identity enabled can connect to Azure Service Bus.

#### Create the managed identity using the Azure portal

The following steps demonstrate how to create a system-assigned managed identity for various web hosting services. The managed identity can securely connect to other Azure Services using the app configurations you set up previously.

### [Service Connector](#tab/service-connector)

Some app hosting environments support Service Connector, which helps you connect Azure compute services to other backing services. Service Connector automatically configures network settings and connection information.  You can learn more about Service Connector and which scenarios are supported on the [overview page](../service-connector/overview.md).

The following compute services are currently supported:

* Azure App Service
* Azure Spring Cloud
* Azure Container Apps (preview)

For this migration guide you'll use App Service, but the steps are similar on Azure Spring Apps and Azure Container Apps.

> **Note:**
> Azure Spring Apps currently only supports Service Connector using connection strings.
1. On the main overview page of your App Service, select **Service Connector** from the left navigation.

1. Select **+ Create** from the top menu and the **Create connection** panel will open.  Enter the following values:

   * **Service type**: Choose **Service bus**.
   * **Subscription**: Select the subscription you would like to use.
   * **Connection Name**: Enter a name for your connection, such as *connector_appservice_servicebus*.
   * **Client type**: Leave the default value selected or choose the specific client you'd like to use.

   Select **Next: Authentication**.

1. Make sure **System assigned managed identity (Recommended)** is selected, and then choose **Next: Networking**.
1. Leave the default values selected, and then choose **Next: Review + Create**.
1. After Azure validates your settings, select **Create**.

The Service Connector will automatically create a system-assigned managed identity for the app service. The connector will also assign the managed identity a **Azure Service Bus Data Owner** role for the service bus you selected.

### [Azure App Service](#tab/app-service)

1. On the main overview page of your Azure App Service instance, select **Identity** from the left navigation.

1. Under the **System assigned** tab, make sure to set the **Status** field to **on**. A system assigned identity is managed by Azure internally and handles administrative tasks for you. The details and IDs of the identity are never exposed in your code.

   Screenshot showing how to create a system assigned managed identity.

### [Azure Spring Apps](#tab/spring-apps)

1. On the main overview page of your Azure Spring Apps instance, select **Identity** from the left navigation.

1. Under the **System assigned** tab, make sure to set the **Status** field to **on**. A system assigned identity is managed by Azure internally and handles administrative tasks for you. The details and IDs of the identity are never exposed in your code.

   Screenshot showing how to enable managed identity for Azure Spring Apps.

### [Azure Container Apps](#tab/container-apps)

1. On the main overview page of your Azure Container Apps instance, select **Identity** from the left navigation.

1. Under the **System assigned** tab, make sure to set the **Status** field to **on**. A system assigned identity is managed by Azure internally and handles administrative tasks for you. The details and IDs of the identity are never exposed in your code.

   Screenshot showing how to enable managed identity for Azure Container Apps.

### [Azure Virtual Machines](#tab/virtual-machines)

1. On the main overview page of your virtual machine, select **Identity** from the left navigation.

1. Under the **System assigned** tab, make sure to set the **Status** field to **on**. A system assigned identity is managed by Azure internally and handles administrative tasks for you. The details and IDs of the identity are never exposed in your code.

   Screenshot showing how to enable managed identity for virtual machines.

---

Alternatively, you can also enable managed identity on an Azure hosting environment using the Azure CLI.

### [Service Connector](#tab/service-connector-identity)

You can use Service Connector to create a connection between an Azure compute hosting environment and a target service using the Azure CLI. The CLI automatically handles creating a managed identity and assigns the proper role, as explained in the [portal instructions](#create-the-managed-identity-using-the-azure-portal).

If you're using an Azure App Service, use the `az webapp connection` command:

```azurecli
az webapp connection create servicebus \
    --resource-group <resource-group-name> \
    --name <webapp-name> \
    --target-resource-group <target-resource-group-name> \
    --namespace <target-service-bus-namespace> \
    --system-identity
```

If you're using Azure Spring Apps, use the `az spring connection` command:

```azurecli
az spring connection create servicebus \
    --resource-group <resource-group-name> \
    --service <service-instance-name> \
    --app <app-name> \
    --deployment <deployment-name> \
    --target-resource-group <target-resource-group> \
    --namespace <target-service-bus-namespace> \
    --system-identity
```

If you're using Azure Container Apps, use the `az containerapp connection` command:

```azurecli
az containerapp connection create servicebus \
    --resource-group <resource-group-name> \
    --name <webapp-name> \
    --target-resource-group <target-resource-group-name> \
    --namespace <target-service-bus-namespace> \
    --system-identity
```

### [Azure App Service](#tab/app-service-identity)

You can assign a managed identity to an Azure App Service instance with the [az webapp identity assign](https://learn.microsoft.com/cli/azure/webapp/identity) command.

```azurecli
az webapp identity assign \
    --resource-group <resource-group-name> \
    --name <webapp-name>
```

### [Azure Spring Apps](#tab/spring-apps-identity)

You can assign a managed identity to an Azure Spring Apps instance with the [az spring app identity assign](https://learn.microsoft.com/cli/azure/spring/app/identity) command.

```azurecli
az spring app identity assign \
    --resource-group <resource-group-name> \
    --name <app-name> \
    --service <service-name>
```

### [Azure Container Apps](#tab/container-apps-identity)

You can assign a managed identity to an Azure Container Apps instance with the [az container app identity assign](https://learn.microsoft.com/cli/azure/containerapp/identity) command.

```azurecli
az containerapp identity assign \
    --resource-group <resource-group-name> \
    --name <app-name>
```

### [Azure Virtual Machines](#tab/virtual-machines-identity)

You can assign a managed identity to a virtual machine with the [az vm identity assign](https://learn.microsoft.com/cli/azure/vm/identity) command.

```azurecli
az vm identity assign \
    --resource-group <resource-group-name> \
    --name <virtual-machine-name>
```

### [Azure Kubernetes Service](#tab/aks-identity)

You can assign a managed identity to an Azure Kubernetes Service (AKS) instance with the [az aks update](https://learn.microsoft.com/cli/azure/aks) command.

```azurecli
az aks update \
    --resource-group <resource-group-name> \
    --name <virtual-machine-name> \
    --enable-managed-identity
```

---

#### Assign roles to the managed identity

Next, you need to grant permissions to the managed identity you created to access your Service Bus. Assign a role to the managed identity, just like you did with your local development user.

### [Service Connector](#tab/assign-role-service-connector)

If you connected your services using the Service Connector you don't need to complete this step. The necessary configurations were handled for you:

* If you selected a managed identity while creating the connection, a system-assigned managed identity was created for your app and assigned the **Azure Service Bus Data Owner** role on the Service Bus.

* If you selected connection string, the connection string was added as an app environment variable.

### [Azure portal](#tab/assign-role-azure-portal)

1. Navigate to your Service Bus overview page and select **Access Control (IAM)** from the left navigation.

1. Choose **Add role assignment**.

   Screenshot showing how to add a role to a managed identity.

1. In the **Role** search box, search for *Azure Service Bus Data Owner*, which is a common role used to manage data operations for blobs. You can assign whatever role is appropriate for your use case. Select the *Azure Service Bus Data Owner* from the list and choose **Next**.

1. On the **Add role assignment** screen, for the **Assign access to** option, select **Managed identity**. Then choose **+Select members**.

1. In the flyout, search for the managed identity you created by entering the name of your app service. Select the system assigned identity, and then choose **Select** to close the flyout menu.

   Screenshot showing how to select the assigned managed identity.

1. Select **Next** a couple times until you're able to select **Review + assign** to finish the role assignment.

### [Azure CLI](#tab/assign-role-azure-cli)

To assign a role at the resource level using the Azure CLI, you first must retrieve the resource ID using the `az servicebus show` command. You can filter the output properties using the `--query` parameter.

```azurecli
az servicebus show \
    --resource-group '<your-resource-group-name>' \
    --name '<your-service-bus-namespace>' \
    --query id
```

Copy the output ID from the preceding command. You can then assign roles using the `az role` command of the Azure CLI.

```azurecli
az role assignment create \
    --assignee "<your-username>" \
    --role "Azure Service Bus Data Owner" \
    --scope "<your-resource-id>"
```

---

#### Test the app

After making these code changes, browse to your hosted application in the browser. Your app should be able to connect to the Service Bus successfully. Keep in mind that it may take several minutes for the role assignments to propagate through your Azure environment. Your application is now configured to run both locally and in a production environment without the developers having to manage secrets in the application itself.

## Next steps

In this tutorial, you learned how to migrate an application to passwordless connections.
