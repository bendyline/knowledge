---
title: Authorize requests to Azure SignalR Service resources with Microsoft Entra managed identities
description: This article provides information about authorizing requests to Azure SignalR resources with Managed identities for Azure resources.
author: terencefan
ms.author: lianwei
ms.date: 03/12/2023
ms.service: azure-signalr-service
ms.topic: how-to
ms.devlang: csharp
ms.custom: subject-rbac-steps
---

# Authorize requests to Azure SignalR resources with Managed identities for Azure resources

Azure SignalR Service supports Microsoft Entra ID for authorizing requests from [Managed identities for Azure resources](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview).

This article explains how to set up your resource and code to authorize requests to the resource using a managed identity.

## Configure managed identities

The first step is to configure managed identities on your app or virtual machine.

- [Configure managed identities for App Service and Azure Functions](https://learn.microsoft.com/azure/app-service/overview-managed-identity)
- [Configure managed identities on Azure virtual machines (VMs)](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities)
- [Configure managed identities for Azure resources on a virtual machine scale set](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities-scale-sets)

## Add role assignments in the Azure portal


The following steps describe how to assign a SignalR App Server role to a service principal or a managed identity for an Azure SignalR Service resource. For detailed steps, see [Assign Azure roles by using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

> **Note:**
> You can assign a role to any scope, including management group, subscription, resource group, or single resource. To learn more about scope, see [Understand scope for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md).

1. In the [Azure portal](https://portal.azure.com/), go to your Azure SignalR Service resource.

1. On the left pane, select **Access control (IAM)**.

1. Select **Add** > **Add role assignment**.

   Screenshot that shows the page for access control and selections for adding a role assignment.

1. On the **Role** tab, select **SignalR App Server**. Other Azure SignalR Service built-in roles depend on your scenario.

   | Role | Description | Use case |
   | --- | --- | --- |
   | [SignalR App Server](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#signalr-app-server) | Access to the APIs that create server connections and generate keys. | Most commonly used for an app server with an Azure SignalR resource running in Default mode. |
   | [SignalR Service Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#signalr-service-owner) | Full access to all data-plane APIs, including REST APIs, the APIs that create server connections, and the APIs that generate keys/tokens. | Used for a negotiation server with an Azure SignalR Service resource running in Serverless mode. It requires both REST API permissions and authentication API permissions. |
   | [SignalR REST API Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#signalr-rest-api-owner) | Full access to data-plane REST APIs. | Used for the [Azure SignalR Management SDK](https://learn.microsoft.com/azure/azure-signalr/signalr-howto-use-management-sdk) to manage connections and groups, but it *doesn't* make server connections or handle negotiation requests. |
   | [SignalR REST API Reader](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#signalr-rest-api-reader) | Read-only access to data-plane REST APIs. | Used when you write a monitoring tool that calls read-only REST APIs. |

1. Select **Next**.

1. For Microsoft Entra application:

   1. In the **Assign access to** row, select **User, group, or service principal**.
   1. In the **Members** row, choose **select members**, and then choose the identity in the pop-up window.

1. For managed identity for Azure resources:

   1. In the **Assign access to** row, select **Managed identity**.
   1. In the **Members** row, choose **select members**, and then choose the application in the pop-up window.

1. Select **Next**.

1. Review your assignment, and then select **Review + assign** to confirm the role assignment.

> **Important:**
> Newly added role assignments might take up to 30 minutes to propagate.

To learn more about how to assign and manage Azure roles, see:

- [Assign Azure roles by using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal)
- [Assign Azure roles by using the REST API](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-rest.md)
- [Assign Azure roles by using Azure PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-powershell.md)
- [Assign Azure roles by using the Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-cli.md)
- [Assign Azure roles by using Azure Resource Manager templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-template.md)

## Configure Microsoft.Azure.SignalR app server SDK for C#

[Azure SignalR server SDK for C#](https://github.com/Azure/azure-signalr)

The Azure SignalR server SDK leverages the [Azure.Identity library](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme) to generate tokens for connecting to resources.
Click to explore detailed usages.

### Use system-assigned identity

```C#
services.AddSignalR().AddAzureSignalR(option =>
{
    option.Endpoints = new ServiceEndpoint[]
    {
        new ServiceEndpoint(new Uri("https://<resource-name>.service.signalr.net"), new ManagedIdentityCredential()),
    };
});
```

### Use user-assigned identity

> **Important:**
> Use the client ID, not the object (principal) ID

```C#
services.AddSignalR().AddAzureSignalR(option =>
{
    option.Endpoints = new ServiceEndpoint[]
    {
        var clientId = "<your-user-assigned-identity-client-id>";
        new ServiceEndpoint(new Uri("https://<resource-name>.service.signalr.net"), new ManagedIdentityCredential(clientId)),
    };
});
```

More sample can be found in this [Sample link](https://github.com/Azure/azure-signalr/blob/dev/samples/ChatSample/ChatSample/Startup.cs)

### Use multiple endpoints

Credentials can be different for different endpoints.

In this sample, the Azure SignalR SDK will connect to `resource1` with system-assigned managed identity and connect to `resource2` with user-assigned managed identity.

```csharp
services.AddSignalR().AddAzureSignalR(option =>
{
    option.Endpoints = new ServiceEndpoint[]
    {
        var clientId = "<your-user-assigned-identity-client-id>";
        new ServiceEndpoint(new Uri("https://<resource1>.service.signalr.net"), new ManagedIdentityCredential()),
        new ServiceEndpoint(new Uri("https://<resource2>.service.signalr.net"), new ManagedIdentityCredential(clientId)),
    };
});
```


### Azure SignalR Service bindings in Azure Functions

Azure SignalR Service bindings in Azure Functions use [application settings](../azure-functions/functions-how-to-use-azure-function-app-settings.md) in the portal or [local.settings.json](../azure-functions/functions-develop-local.md#local-settings-file) locally to configure a managed identity to access your Azure SignalR Service resources.

You might need a group of key/value pairs to configure an identity. The keys of all the key/value pairs must start with a *connection name prefix* (which defaults to `AzureSignalRConnectionString`) and a separator. The separator is an underscore (`__`) in the portal and a colon (`:`) locally. You can customize the prefix by using the binding property [`ConnectionStringSetting`](../azure-functions/functions-bindings-signalr-service.md).

#### Use a system-assigned identity

If you configure only the service URI, you use the `DefaultAzureCredential` class. This class is useful when you want to share the same configuration on Azure and local development environments. To learn how it works, see [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme#defaultazurecredential).

In the Azure portal, use the following example to configure `DefaultAzureCredential`. If you don't configure any of [these environment variables](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme#environment-variables), the system-assigned identity is used for authentication.

```bash
<CONNECTION_NAME_PREFIX>__serviceUri=https://<SIGNALR_RESOURCE_NAME>.service.signalr.net
```

Here's a configuration sample of `DefaultAzureCredential` in the *local.settings.json* file. At the local scope, there's no managed identity. Authentication via Visual Studio, the Azure CLI, and Azure PowerShell accounts is attempted in order.

```json
{
  "Values": {
    "<CONNECTION_NAME_PREFIX>:serviceUri": "https://<SIGNALR_RESOURCE_NAME>.service.signalr.net"
  }
}
```

If you want to use a system-assigned identity independently and without the influence of [other environment variables](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme#environment-variables), set the `credential` key with the connection name prefix to `managedidentity`. Here's a sample for application settings:

```bash
<CONNECTION_NAME_PREFIX>__serviceUri = https://<SIGNALR_RESOURCE_NAME>.service.signalr.net
<CONNECTION_NAME_PREFIX>__credential = managedidentity
```

#### Use a user-assigned identity

If you want to use a user-assigned identity, you need to assign `clientId` in addition to `serviceUri` and `credential` keys with the connection name prefix. Here's a sample for application settings:

```bash
<CONNECTION_NAME_PREFIX>__serviceUri = https://<SIGNALR_RESOURCE_NAME>.service.signalr.net
<CONNECTION_NAME_PREFIX>__credential = managedidentity
<CONNECTION_NAME_PREFIX>__clientId = <CLIENT_ID>
```

## Next steps

See the following related articles:

- [Microsoft Entra ID for Azure SignalR Service](signalr-concept-authorize-azure-active-directory.md)
- [Authorize requests to Azure SignalR Service resources with Microsoft Entra applications](signalr-howto-authorize-application.md)
- [How to configure cross tenant authorization with Microsoft Entra](signalr-howto-authorize-cross-tenant.md)
- [How to disable local authentication](howto-disable-local-auth.md)
