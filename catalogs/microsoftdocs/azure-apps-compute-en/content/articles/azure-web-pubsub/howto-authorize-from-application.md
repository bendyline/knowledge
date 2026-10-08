---
title: Authorize an application request by using Microsoft Entra ID
description: This article provides information about authorizing requests to Azure Web PubSub resources with Microsoft Entra applications.
author: terencefan
ms.author: lianwei
ms.date: 08/28/2026
ms.service: azure-web-pubsub
ms.topic: how-to
---

# Authorize requests to Azure Web PubSub resources with Microsoft Entra applications

Azure Web PubSub Service supports Microsoft Entra ID for authorizing requests with [Microsoft Entra applications](https://learn.microsoft.com/entra/identity-platform/app-objects-and-service-principals).


This article explains how to set up your resource and code to authenticate requests to the resource using a Microsoft Entra application.

## Register an application in Microsoft Entra ID

The first step is to [Register an application in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app):

After you register your application, you can find the **Application (client) ID** and **Directory (tenant) ID** values on the application's overview page. These GUIDs can be useful in the following steps.

Screenshot of overview information for a registered application.

## Add credentials

After registering an app, you can add **certificates, client secrets (a string), or federated identity credentials** as credentials to your confidential client app registration. Credentials allow your application to authenticate as itself, requiring no interaction from a user at runtime, and are used by confidential client applications that access a web API.

- [Add a certificate](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app?tabs=certificate#add-credentials)
- [Add a client secret](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app?tabs=client-secret#add-credentials)
- [Add a federated credential](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app?tabs=federated-credential#add-credentials)

## Add role assignments in the Azure portal


This section shows how to assign an Azure role to a service principal or managed identity for a Web PubSub resource.
For detailed steps, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

> **Note:**
> A role can be assigned to any scope, including management group, subscription, resource group, or single resource. To learn more about scope, see [Understand scope for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md).

1. In the [Azure portal](https://portal.azure.com/), go to your Web PubSub resource.

1. Select **Access control (IAM)** in the sidebar.

1. Select **Add** > **Add role assignment**.

   Screenshot that shows the page for access control and selections for adding a role assignment.

1. On the **Role** tab, select a Web PubSub built-in role or custom role that includes the permissions required by your application.

   | Role | Description | Use case |
   | --- | --- | --- |
   | [Web PubSub Service Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#web-pubsub-service-owner) | Full access to data-plane APIs, including read/write REST APIs and Auth APIs. | Most commonly used for building an upstream server that handles negotiation requests and client events. |
   | [Web PubSub Service Reader](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#web-pubsub-service-reader) | Read-only access to data-plane APIs. | Use it when writing a monitoring tool that calls read-only REST APIs. |

   > **Tip:**
   > Follow the principle of least privilege by using a [custom role](https://learn.microsoft.com/azure/role-based-access-control/custom-roles) with only the required [Web PubSub data-plane permissions](https://learn.microsoft.com/azure/role-based-access-control/permissions/web-and-mobile#microsoftsignalrservice). To generate a client access token and use it to connect, the identity requires both `Microsoft.SignalRService/WebPubSub/clientConnection/generateToken/action` and `Microsoft.SignalRService/WebPubSub/clientConnection/write`. No narrower built-in role includes both permissions.

1. Select Next.

1. For Microsoft Entra application.

   1. In the `Assign access` to row, select **User, group, or service principal**.
   1. In the `Members` row, click `select members`, then choose the identity in the pop-up window.

1. For managed identity for Azure resources.

   1. In the `Assign access` to row, select **Managed identity**.
   1. In the `Members` row, click `select members`, then choose the application in the pop-up window.

1. Select Next.

1. Review your assignment, then click **Review + assign** to confirm the role assignment.

> **Important:**
> Newly added role assignments might take up to 30 minutes to propagate.

To learn more about how to assign and manage Azure roles, see these articles:

- [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal)
- [Assign Azure roles using the REST API](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-rest.md)
- [Assign Azure roles using Azure PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-powershell.md)
- [Assign Azure roles using the Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-cli.md)
- [Assign Azure roles using Azure Resource Manager templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-template.md)

## Code samples with Microsoft Entra authorization

To create a `WebPubSubServiceClient` that uses Microsoft Entra authorization in .NET, Java, JavaScript, or Python, see [Use Azure Identity with `WebPubSubServiceClient`](howto-use-azure-identity.md).

## Related content

- [Overview of Microsoft Entra ID for Web PubSub](concept-azure-ad-authorization.md)
- [Use Microsoft Entra ID to authorize a request from a managed identity to Web PubSub resources](howto-authorize-from-managed-identity.md)
- [Disable local authentication](howto-disable-local-auth.md)
