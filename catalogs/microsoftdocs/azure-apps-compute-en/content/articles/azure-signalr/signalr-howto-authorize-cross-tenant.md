---
title: Configure Cross-Tenant Authorization with Microsoft Entra
description: Learn how to build multitenant applications and configure cross-tenant authorization in Azure SignalR Service.
author: terencefan
ms.author: lianwei
ms.date: 03/12/2023
ms.service: azure-signalr-service
ms.topic: how-to
ms.devlang: csharp
ms.custom: subject-rbac-steps
---

# Configure cross-tenant authorization with Microsoft Entra

For security reasons, your server might host in a tenant independent from your Azure SignalR Service resource. Because managed identity can't be used across tenants, you need to register an application in tenant A and then provision it as an enterprise application in tenant B. This article helps you create an application in tenant A and use it to connect to an Azure SignalR Service resource in tenant B.

## Register a multitenant application in tenant A

The first step is to create a multitenant application. For more information, see [Quickstart: Register an application in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

If you already have a single tenant application, follow the instructions in [Convert a single-tenant app to multitenant on Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/howto-convert-app-to-be-multi-tenant).

There are four account types:

- Accounts in this organizational directory
- Accounts in any organizational directory
- Accounts in any organizational directory and personal Microsoft accounts
- Personal Microsoft accounts

Be sure to select either the second type or the third type when you create the application.

Screenshot that shows an overview of information for a registered application.

Make a note of the application (client) ID and the directory (tenant) ID for use in the following steps.

## Provision the application in tenant B

You can't assign the role to the application registered in other tenants. You have to provision it as an external enterprise application in tenant B. If you need more information, you can learn about the [differences between app registration and enterprise applications](https://learn.microsoft.com/answers/questions/270680/app-registration-vs-enterprise-applications).

In brief, the enterprise application is a service principal and the app registration isn't. The enterprise application inherits certain properties from the application object, such as the application (client) ID.

A default service principal is created in the tenant where the app is registered. For other tenants, you need to provision the app to get an enterprise application service principal. For more information, see [Create an enterprise application from a multitenant application in Microsoft Entra ID](https://learn.microsoft.com/entra/identity/enterprise-apps/create-service-principal-cross-tenant).

Enterprise applications in different tenants have different directory (tenant) IDs, but they share the same application (client) ID.

## Assign roles to the enterprise application

After you have the enterprise application provisioned in your tenant B, you can assign roles to it.


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

## Configure the Azure SignalR Service SDK to use the enterprise application

An application uses three different types of credentials to authenticate itself:

- Certificates
- Client secrets
- Federated identity

We strongly recommend that you use certificates or client secrets to make cross-tenant requests.

### Use certificates or client secrets

- The `tenantId` parameter is the ID of your tenant B.
- The `clientId` parameters in both tenants are equal.
- The `clientSecret` and `clientCert` parameters are configured in tenant A. For more information, see [Add credentials](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app?tabs=certificate%2Cexpose-a-web-api#add-credentials).

If you aren't sure about your tenant ID, see [Find your Microsoft Entra tenant](https://learn.microsoft.com/azure/azure-portal/get-subscription-tenant-id#find-your-microsoft-entra-tenant).

```csharp
services.AddSignalR().AddAzureSignalR(option =>
{
    var credential1 = new ClientSecretCredential("tenantId", "clientId", "clientSecret");
    var credential2 = new ClientCertificateCredential("tenantId", "clientId", "path-to-cert");

    option.Endpoints = new ServiceEndpoint[]
    {
        new ServiceEndpoint(new Uri("https://<resource1>.service.signalr.net"), credential1),
        new ServiceEndpoint(new Uri("https://<resource2>.service.signalr.net"), credential2),
    };
});
```

### Use federated identity

For security reasons, certificates and client secrets might be disabled in your subscription. In this case, you need to either use an external identity provider or try the preview support for managed identity. For more information, see:

- [Configure an app to trust an external identity provider](https://learn.microsoft.com/entra/workload-id/workload-identity-federation-create-trust)
- [Configure an application to trust a managed identity (preview)](https://learn.microsoft.com/entra/workload-id/workload-identity-federation-config-app-trust-managed-identity)

For detailed information and video guidance, see [Microsoft Entra Cross-Tenant Application Federated Identity Credential (FIC)](https://github.com/arsenvlad/entra-cross-tenant-app-fic-managed-identity).

When you use managed identity as an identity provider, the code looks like the following example:

- The `tenantId` parameter is the ID of your tenant B.
- The `clientId` parameters in both tenants are equal.

```csharp
services.AddSignalR().AddAzureSignalR(option =>
{
    var msiCredential = new ManagedIdentityCredential("msiClientId");

    var credential = new ClientAssertionCredential("tenantId", "appClientId", async (ctoken) =>
    {
        // Entra ID US Government: api://AzureADTokenExchangeUSGov
        // Entra ID China operated by 21Vianet: api://AzureADTokenExchangeChina
        var request = new TokenRequestContext([$"api://AzureADTokenExchange/.default"]);
        var response = await msiCredential.GetTokenAsync(request, ctoken).ConfigureAwait(false);
        return response.Token;
    });

    option.Endpoints = [
        new ServiceEndpoint(new Uri(), "https://<resource>.service.signalr.net"), credential);
    ];
});
```

When you use external identity providers, the code looks like the following example:

```csharp
services.AddSignalR().AddAzureSignalR(option =>
{
    var credential = new ClientAssertionCredential("tenantId", "appClientId", async (ctoken) =>
    {
        // Find your own way to get a token from the external identity provider.
        // The audience of the token should be "api://AzureADTokenExchange" because it is the recommended value.
        return "TheTokenYouGetFromYourExternalIdentityProvider";
    });

    option.Endpoints = [
        new ServiceEndpoint(new Uri(), "https://<resource>.service.signalr.net"), credential);
    ];
});
```

Debugging token acquisition with the Azure SignalR Service SDK is a challenge because it depends on the token results. We recommend that you test the token acquisition process locally before you integrate with the Azure SignalR Service SDK.

```csharp
var assertion = new ClientAssertionCredential("tenantId", "appClientId", async (ctoken) =>
{
    // Find your own way to get a token from the external identity provider.
    // The audience of the token should be "api://AzureADTokenExchange" because it is the recommended value.
    return TheTokenYouGetFromYourExternalIdentityProvider;
});

var request = new TokenRequestContext(["https://signalr.azure.com/.default");
var token = await assertion.GetTokenAsync(assertion);
Console.log(token.Token);
```

The key point is to use an inner credential to get a `clientAssertion` parameter from `api://AzureADTokenExchange` or other trusted identity platforms. Then use it to exchange for a token with the `https://signalr.azure.com/.default` audience to access your resource.

Your goal is to get a token with the following claims. Use [jwt.io](https://jwt.io/) to help you decode the token:

- **oid**: The value should be equal to your enterprise application object ID. If you don't know where to get it, see [Retrieve an enterprise object ID](https://learn.microsoft.com/answers/questions/1007608/how-retrieve-enterprise-object-id-from-azure-activ).
- **tid**: The value should be equal to the directory ID of your tenant B. If you aren't sure about your tenant ID, see [Find your Microsoft Entra tenant](https://learn.microsoft.com/azure/azure-portal/get-subscription-tenant-id#find-your-microsoft-entra-tenant).
- **audience**: The audience must be `https://signalr.azure.com/.default` to access Azure SignalR Service resources.

## Related content

- [Microsoft Entra ID for Azure SignalR Service](signalr-concept-authorize-azure-active-directory.md)
- [Authorize requests to Azure SignalR Service resources with Microsoft Entra applications](signalr-howto-authorize-application.md)
- [Authorize requests to Azure SignalR Service resources with managed identities for Azure resources](signalr-howto-authorize-managed-identity.md)
