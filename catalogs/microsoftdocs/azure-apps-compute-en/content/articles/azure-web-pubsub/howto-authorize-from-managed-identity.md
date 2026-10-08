---
title: Authorize a managed identity request
description: This article provides information about authorizing requests to Azure Web PubSub resources with Managed identities for Azure resources.
author: terencefan
ms.author: lianwei
ms.date: 08/28/2026
ms.service: azure-web-pubsub
ms.topic: how-to
---

# Authorize requests to Azure Web PubSub resources with Managed identities for Azure resources

Azure Web PubSub Service supports Microsoft Entra ID for authorizing requests from [Managed identities for Azure resources](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview).

This article explains how to set up your resource and code to authorize requests to the resource using a managed identity.

## Configure managed identities

The first step is to configure managed identities on your app or virtual machine.

- [Configure managed identities for App Service and Azure Functions](https://learn.microsoft.com/azure/app-service/overview-managed-identity)
- [Configure managed identities on Azure virtual machines (VMs)](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities)
- [Configure managed identities for Azure resources on a virtual machine scale set](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities-scale-sets)

## Add a role assignment in the Azure portal


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
- [Authorize request to Web PubSub resources with Microsoft Entra ID from Azure applications](howto-authorize-from-application.md)
- [Disable local authentication](howto-disable-local-auth.md)
