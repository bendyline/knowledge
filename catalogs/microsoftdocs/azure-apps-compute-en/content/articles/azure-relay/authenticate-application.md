---
title: Authenticate from an application - Azure Relay 
description: This article provides information about authenticating an application with Microsoft Entra ID to access Azure Relay resources. 
ms.topic: article
ms.date: 01/24/2026
---

# Authenticate and authorize an application with Microsoft Entra ID to access Azure Relay entities 
Azure Relay supports using Microsoft Entra ID to authorize requests to Azure Relay entities (Hybrid Connections, WCF Relays). With Microsoft Entra ID, you can use Azure role-based access control (Azure RBAC) to grant permissions to a security principal, which may be a user, group, or application service principal. To learn more about roles and role assignments, see [Understanding the different roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md).   

> **Note:**
> This feature is generally available in all regions except Microsoft Azure operated by 21Vianet.



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


## Authenticate from an app
A key advantage of using Microsoft Entra ID with Azure Relay is that your credentials no longer need to be stored in your code. Instead, you can request an OAuth 2.0 access token from Microsoft identity platform. Microsoft Entra authenticates the security principal (a user, a group, or service principal) running the application. If authentication succeeds, Microsoft Entra ID returns the access token to the application, and the application can then use the access token to authorize requests to Azure Relay.

Following sections shows you how to configure your console application for authentication with Microsoft identity platform 2.0. For more information, see [Microsoft identity platform (v2.0) overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/v2-overview.md).

For an overview of the OAuth 2.0 code grant flow, see [Authorize access to Microsoft Entra web applications using the OAuth 2.0 code grant flow](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/v2-oauth2-auth-code-flow.md).

<a name='register-your-application-with-an-azure-ad-tenant'></a>

### Register your application with a Microsoft Entra tenant
The first step in using Microsoft Entra ID to authorize Azure Relay entities is registering your client application with a Microsoft Entra tenant from the Azure portal. When you register your client application, you supply information about the application to AD. Microsoft Entra ID then provides a client ID (also called an application ID) that you can use to associate your application with Microsoft Entra runtime. 

For step-by-step instructions to register your application with Microsoft Entra ID, see [Quickstart: Register an application with Microsoft Entra ID](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/quickstart-register-app.md#register-an-application).

> **Important:**
> Make note of the **Directory (tenant) ID** and the **Application (client) ID**. You will need these values to run the sample application.

### Create a client secret   
The application needs a client secret to prove its identity when requesting a token. In the same article linked earlier, see the [Add a client secret](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/quickstart-register-app.md#add-a-client-secret) section to create a client secret. 

> **Important:**
> Make note of the **Client Secret**. You will need it to run the sample application.

## Assign Azure roles using the Azure portal
Assign one of the Azure Relay roles to the application's service principal at the desired scope (Relay entity, namespace, resource group, subscription). For detailed steps, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

## Run the sample

1. Download the console application sample from [GitHub](https://github.com/Azure/azure-relay/tree/master/samples/hybrid-connections/dotnet/rolebasedaccesscontrol).
1. Run the application locally on your computer per the instructions from the [README article](https://github.com/Azure/azure-relay/tree/master/samples/hybrid-connections/dotnet/rolebasedaccesscontrol#rolebasedaccesscontrol-hybrid-connection-sample).

    > **Note:**
    > Follow the same steps to run the [sample console application for WCF Relay](https://github.com/Azure/azure-relay/tree/master/samples/wcf-relay/RoleBasedAccessControl). 

#### Highlighted code from the sample
Here's the code from the sample that shows how to use Microsoft Entra authentication to connect to the Azure Relay service.  

1. Create a [TokenProvider](https://learn.microsoft.com/dotnet/api/microsoft.azure.relay.tokenprovider) object by using the `TokenProvider.CreateAzureActiveDirectoryTokenProvider` method. 

    If you haven't already created an app registration, see the [Register your application with Microsoft Entra ID](#register-your-application-with-an-azure-ad-tenant) section to create it, and then create a client secret as mentioned in the [Create a client secret](#create-a-client-secret) section.

    If you want to use an existing app registration, follow these instructions to get **Application (client) ID** and **Directory (tenant) ID**. 

    1. Sign in to the [Azure portal](https://portal.azure.com).
    1. Search for and select **Microsoft Entra ID** using the search bar at the top.
    1. On the **Microsoft Entra ID** page, select **App registrations** in the **Manage** section on the left menu. 
    1. Select your app registration. 
    1. On the page for your app registration, you see the values for **Application (client) ID** and **Directory (tenant) ID**. 
    
    To get the **client secret**, follow these steps:
    1. On the page your app registration, select **Certificates & secrets** on the left menu. 
    1. Use the copy button in the **Value** column for the secret in the **Client secrets** section. 

    
    ```csharp
    static TokenProvider GetAadTokenProvider(string clientId, string tenantId, string clientSecret)
    {
        return TokenProvider.CreateAzureActiveDirectoryTokenProvider(
            async (audience, authority, state) =>
            {
                IConfidentialClientApplication app = ConfidentialClientApplicationBuilder.Create(clientId)
                    .WithAuthority(authority)
                    .WithClientSecret(clientSecret)
                    .Build();

                var authResult = await app.AcquireTokenForClient(new [] { $"{audience}/.default" }).ExecuteAsync();
                return authResult.AccessToken;
            },
            $"https://login.microsoftonline.com/{tenantId}");
    }
    ```
1. Create a [HybridConnectionListener](https://learn.microsoft.com/dotnet/api/microsoft.azure.relay.hybridconnectionlistener.-ctor#Microsoft_Azure_Relay_HybridConnectionListener__ctor_System_Uri_Microsoft_Azure_Relay_TokenProvider_) or [HybridConnectionClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.relay.hybridconnectionclient.-ctor#microsoft-azure-relay-hybridconnectionclient-ctor\(system-uri-microsoft-azure-relay-tokenprovider\)) object by passing the hybrid connection URI and the token provider you created in the previous step.

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
- To learn more about Azure RBAC, see [What is Azure role-based access control (Azure RBAC)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md)?
- To learn how to assign and manage Azure role assignments with Azure PowerShell, Azure CLI, or the REST API, see these articles:
    - [Add or remove Azure role assignments using Azure PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-powershell.md)  
    - [Add or remove Azure role assignments using Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-cli.md)
    - [Add or remove Azure role assignments using the REST API](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-rest.md)
    - [Add or remove Azure role assignments using Azure Resource Manager Templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-template.md)

To learn more about Azure Relay, see the following articles.
- [What is Relay?](relay-what-is-it.md)
- [Get started with Azure Relay Hybrid connections WebSockets](relay-hybrid-connections-dotnet-get-started.md)
- [Get stated with Azure Relay Hybrid connections HTTP requests](relay-hybrid-connections-http-requests-dotnet-get-started.md)
