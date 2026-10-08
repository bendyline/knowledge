---
title: Authenticate with managed identities for Azure Relay resources 
description: This article describes how to use managed identities to access with Azure Relay resources.
ms.topic: article
ms.date: 01/24/2026
---

# Authenticate a managed identity with Microsoft Entra ID to access Azure Relay resources 
[Managed identities for Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) is a cross-Azure feature that enables you to create a secure identity associated with the deployment under which your application code runs. You can then associate that identity with access-control roles that grant custom permissions for accessing specific Azure resources that your application needs.

With managed identities, the Azure platform manages this runtime identity. You don't need to store and protect access keys in your application code or configuration, either for the identity itself, or for the resources you need to access. A Relay client app running inside an Azure App Service application or in a virtual machine with enabled managed entities for Azure resources support doesn't need to handle SAS rules and keys, or any other access tokens. The client app only needs the endpoint address of the Relay namespace. When the app connects, Relay binds the managed entity's context to the client in an operation that is shown in an example later in this article. Once it's associated with a managed identity, your Relay client can do all authorized operations. Authorization is granted by associating a managed entity with Relay roles.

> **Note:**
> This feature is generally available in all regions including Microsoft Azure operated by 21Vianet. 


## Overview
When a security principal (a user, group, application) attempts to access a Relay entity, the request must be authorized. With Microsoft Entra ID, access to a resource is a two-step process.

1. First, the security principal’s identity is **authenticated**, and an OAuth 2.0 token is returned. The resource name to request a token is `https://relay.azure.net`. If an application is running within an Azure entity such as an Azure VM, a virtual machine scale set, or an Azure Function app, it can use a managed identity to access the resources.
2. Next, the token is passed as part of a request to the Relay service to **authorize** access to the specified resource (hybrid connections, WCF relays). Microsoft Entra authorizes access rights to secured resources through [Azure role-based access control (Azure RBAC)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md). Azure Relay defines a set of Azure built-in roles that encompass common sets of permissions used to access Relay entities. You can also define custom roles for accessing the data. For a list of built-in roles supported by Azure Relay, see [Azure Built-in roles for Azure Relay](#azure-built-in-roles-for-azure-relay). Native applications and web applications that make requests to Relay can also authorize with Microsoft Entra ID.  

## Azure built-in roles for Azure Relay
For Azure Relay, the management of namespaces and all related resources through the Azure portal and the Azure resource management API is already protected using the Azure RBAC model. Azure provides the below Azure built-in roles for authorizing access to a Relay namespace:

| Role | Description |
| --- | --- |
| [Azure Relay Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-relay-owner) | Use this role to grant **full** access to Azure Relay resources. |
| [Azure Relay Listener](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-relay-listener) | Use this role to grant **listen and entity read** access to Azure Relay resources. |
| [Azure Relay Sender](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-relay-sender) | Use this role to grant **send and entity read** access to Azure Relay resources. |

## Resource scope
Before you assign an Azure role to a security principal, determine the scope of access that the security principal should have. Best practices dictate that it's always best to grant only the narrowest possible scope.

The following list describes the levels at which you can scope access to Azure Relay resources, starting with the narrowest scope:

- **Relay entities**: Role assignment applies to a specific Relay entity like a hybrid connection or a WCF relay.
- **Relay namespace**: Role assignment applies to all the Relay entities under the namespace.
- **Resource group**: Role assignment applies to all the Relay resources under the resource group.
- **Subscription**: Role assignment applies to all the Relay resources in all of the resource groups in the subscription.

> **Note:**
> Keep in mind that Azure role assignments may take up to five minutes to propagate. For more information about how built-in roles are defined, see [Understand role definitions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-definitions.md#control-and-data-actions). For information about creating Azure custom roles, see [Azure custom roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/custom-roles.md). 


## Enable managed identity
First, enable managed identity for the Azure resource that needs to access Azure Relay entities (hybrid connections or WCF relays). For an example, if your Relay client application is running on an Azure VM, enable managed identity for the VM by following instructions from the [Configure managed identity for an Azure VM](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm.md) article. Once you've enabled this setting, a new managed service identity is created in your Microsoft Entra ID.

For a list of services that support managed identities, see [Services that support managed identities for Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/services-support-managed-identities.md).

## Assign an Azure Relay role to the managed identity
After you enable the managed identity, assign one of the Azure Relay roles (Azure Relay Owner, Azure Relay Listener, or Azure Relay Sender) to the identity at the appropriate scope. When the Azure role is assigned to a managed identity, the managed identity is granted access to Relay entities at the appropriate scope.

The following section uses a simple application that runs under a managed identity on an Azure VM instance and accesses Relay resources.

## Sample app on VM accessing Relay entities

1. Download the [Hybrid Connections sample console application](https://github.com/Azure/azure-relay/tree/master/samples/hybrid-connections/dotnet/rolebasedaccesscontrol) to your computer from GitHub.
1. [Create an Azure VM](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal). For this sample, use a Windows 10 image. 
1. Enable system-assigned identity or a user-assigned identity for the Azure VM. For instructions, see [Enable identity for a VM](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm.md). 
1. Assign one of the Relay roles to the managed service identity at the desired scope (Relay entity, Relay namespace, resource group, subscription). For detailed steps, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).
1. Build the console app locally on your local computer as per instructions from the [README document](https://github.com/Azure/azure-relay/tree/master/samples/hybrid-connections/dotnet/rolebasedaccesscontrol#rolebasedaccesscontrol-hybrid-connection-sample). 
1. Copy the executable under \<your local path\>\RoleBasedAccessControl\bin\Debug folder to the VM. You can use RDP to connect to your Azure VM. For more information, see [How to connect and sign on to an Azure virtual machine running Windows](https://learn.microsoft.com/azure/virtual-machines/windows/connect-logon).
1. Run RoleBasedAccessControl.exe on the Azure VM as per instructions from the [README document](https://github.com/Azure/azure-relay/tree/master/samples/hybrid-connections/dotnet/rolebasedaccesscontrol#rolebasedaccesscontrol-hybrid-connection-sample). 

    > **Note:**
    > Follow the same steps to run the [console application for WCF Relays](https://github.com/Azure/azure-relay/tree/master/samples/wcf-relay/RoleBasedAccessControl).

#### Highlighted code from the sample
Here's the code from the sample that shows how to use Microsoft Entra authentication to connect to the Azure Relay service.  

1. Create a [TokenProvider](https://learn.microsoft.com/dotnet/api/microsoft.azure.relay.tokenprovider) object by using the `TokenProvider.CreateManagedIdentityTokenProvider` method. 
    
    - If you're using a **system-assigned managed identity:**
        ```csharp
        TokenProvider.CreateManagedIdentityTokenProvider();
        ```
    - If you're using a **user-assigned managed identity**, get the **Client ID** for the user-assigned identity from the **Managed Identity** page in the Azure portal. For instructions, see [List user-assigned managed identities](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/how-manage-user-assigned-managed-identities.md?pivots=identity-mi-methods-azp#list-user-assigned-managed-identities).
        ```csharp
        var managedCredential = new ManagedIdentityCredential(clientId);
        tokenProvider = TokenProvider.CreateManagedIdentityTokenProvider(managedCredential);    
        ```
1. Create a [HybridConnectionListener](https://learn.microsoft.com/dotnet/api/microsoft.azure.relay.hybridconnectionlistener.-ctor#Microsoft_Azure_Relay_HybridConnectionListener__ctor_System_Uri_Microsoft_Azure_Relay_TokenProvider_)  or [HybridConnectionClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.relay.hybridconnectionclient.-ctor#microsoft-azure-relay-hybridconnectionclient-ctor\(system-uri-microsoft-azure-relay-tokenprovider\)) object by passing the hybrid connection URI and the token provider you created in the previous step.

    **Listener:**
    ```csharp
    var listener = new HybridConnectionListener(hybridConnectionUri, tokenProvider);    
    ```
    
    **Sender:**
    ```csharp
    var sender = new HybridConnectionClient(hybridConnectionUri, tokenProvider);    
    ```

## Samples

- Hybrid Connections: [.NET](https://github.com/Azure/azure-relay/tree/master/samples/hybrid-connections/dotnet/rolebasedaccesscontrol), [Java](https://github.com/Azure/azure-relay/tree/master/samples/hybrid-connections/java/role-based-access-control), [JavaScript](https://github.com/Azure/azure-relay/tree/master/samples/hybrid-connections/node/rolebasedaccesscontrol)
- WCF Relay: [.NET](https://github.com/Azure/azure-relay/tree/master/samples/wcf-relay/RoleBasedAccessControl)

## Next steps
To learn more about Azure Relay, see the following articles.
- [What is Relay?](relay-what-is-it.md)
- [Get started with Azure Relay Hybrid connections WebSockets](relay-hybrid-connections-dotnet-get-started.md)
- [Get stated with Azure Relay Hybrid connections HTTP requests](relay-hybrid-connections-http-requests-dotnet-get-started.md)
