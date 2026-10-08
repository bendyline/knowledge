---
title: "include file"
description: "include file"
services: storage
author: diberry
ms.service: azure-storage
ms.topic: include
ms.date: 06/16/2025
ms.author: diberry
ms.custom:
  - include file
  - sfi-image-nochange
---

This quickstart shows you two ways of connecting to Azure Event Hubs:

- *Passwordless*. Use your security principal in Microsoft Entra ID and role-based access control (RBAC) to connect to an Event Hubs namespace. You don't need to worry about having hard-coded connection strings in your code, in a configuration file, or in secure storage like Azure Key Vault.
- *Connection string*. Use a connection string to connect to an Event Hubs namespace. If you're new to Azure, you might find the connection string option easier to follow.

We recommend using the passwordless option in real-world applications and production environments. For more information, see [Service Bus authentication and authorization](../../../articles/service-bus-messaging/service-bus-authentication-and-authorization.md) and [Passwordless connections for Azure services](https://learn.microsoft.com/azure/developer/intro/passwordless-overview).

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

If you want to create a custom role, see [Rights required for Event Hubs operations](../../../articles/service-bus-messaging/service-bus-sas.md#rights-required-for-service-bus-operations).

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

Creating a new namespace automatically generates an initial Shared Access Signature (SAS) policy with primary and secondary keys and connection strings that each grant full control over all aspects of the namespace. For information about how to create rules with more constrained rights for regular senders and receivers, see [Event Hubs authentication and authorization](../../../articles/service-bus-messaging/service-bus-authentication-and-authorization.md).

A client can use the connection string to connect to the Event Hubs namespace. To copy the primary connection string for your namespace, follow these steps: 

1. On the **Event Hub Namespace** page, select **Shared access policies** on the left menu.
1. On the **Shared access policies** page, select **RootManageSharedAccessKey**.
1. In the **Policy: RootManageSharedAccessKey** window, select the copy button next to **Primary Connection String**, to copy the connection string to your clipboard for later use. Paste this value into Notepad or some other temporary location.
   
   Screenshot shows an SAS policy called RootManageSharedAccessKey, which includes keys and connection strings.

   You can use this page to copy primary key, secondary key, primary connection string, and secondary connection string. 

---
