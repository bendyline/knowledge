---
title: Authorize access to tables using Active Directory
titleSuffix: Azure Storage
description: Authorize access to Azure tables using Microsoft Entra ID. Assign Azure roles for access rights. Access data with a Microsoft Entra account.
services: storage
author: akashdubey-ms

ms.service: azure-table-storage
ms.topic: concept-article
ms.date: 02/09/2023
ms.author: akashdubey
# Customer intent: "As a cloud administrator, I want to authorize access to Azure table resources using Microsoft Entra ID and Azure RBAC, so that I can manage permissions securely and efficiently for users and applications accessing data."
---

# Authorize access to tables using Microsoft Entra ID

Azure Storage supports using Microsoft Entra ID to authorize requests to table data. With Microsoft Entra ID, you can use Azure role-based access control (Azure RBAC) to grant permissions to a security principal, which may be a user, group, or application service principal. The security principal is authenticated by Microsoft Entra ID to return an OAuth 2.0 token. The token can then be used to authorize a request against the Table service.

Authorizing requests against Azure Storage with Microsoft Entra ID provides superior security and ease of use over Shared Key authorization. Microsoft recommends using Microsoft Entra authorization with your table applications when possible to assure access with minimum required privileges.

Authorization with Microsoft Entra ID is available for all general-purpose in all public regions and national clouds. Only storage accounts created with the Azure Resource Manager deployment model support Microsoft Entra authorization.

<a name='overview-of-azure-ad-for-tables'></a>

## Overview of Microsoft Entra ID for tables

When a security principal (a user, group, or application) attempts to access a table resource, the request must be authorized. With Microsoft Entra ID, access to a resource is a two-step process. First, the security principal's identity is authenticated and an OAuth 2.0 token is returned. Next, the token is passed as part of a request to the Table service and used by the service to authorize access to the specified resource.

The authentication step requires that an application request an OAuth 2.0 access token at runtime. If an application is running from within an Azure entity such as an Azure VM, a virtual machine scale set, or an Azure Functions app, it can use a [managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) to access tables.

The authorization step requires that one or more Azure roles be assigned to the security principal. Azure Storage provides Azure roles that encompass common sets of permissions for table data. The roles that are assigned to a security principal determine the permissions that principal will have. To learn more about assigning Azure roles for table access, see [Assign an Azure role for access to table data](assign-azure-role-data-access.md).


The following table points to additional information for authorizing access to data in various scenarios:

| Language | .NET | Java | JavaScript | Python | Go |
|---|---|---|---|---|
| Overview of auth with Microsoft Entra ID | [How to authenticate .NET applications with Azure services](https://learn.microsoft.com/dotnet/azure/sdk/authentication) | [Azure authentication with Java and Azure Identity](https://learn.microsoft.com/azure/developer/java/sdk/identity) | [Authenticate JavaScript apps to Azure using the Azure SDK](https://learn.microsoft.com/azure/developer/javascript/sdk/authentication/overview) | [Authenticate Python apps to Azure using the Azure SDK](https://learn.microsoft.com/azure/developer/python/sdk/authentication-overview) | |
| Auth using developer service principals | [Authenticate .NET apps to Azure services during local development using service principals](https://learn.microsoft.com/dotnet/azure/sdk/authentication-local-development-service-principal) | [Azure authentication with service principal](https://learn.microsoft.com/azure/developer/java/sdk/identity-service-principal-auth) | [Auth JS apps to Azure services with service principal](https://learn.microsoft.com/azure/developer/javascript/sdk/authentication/local-development-environment-service-principal) | [Authenticate Python apps to Azure services during local development using service principals](https://learn.microsoft.com/azure/developer/python/sdk/authentication-local-development-service-principal) | [Azure SDK for Go authentication with a service principal](https://learn.microsoft.com/azure/developer/go/azure-sdk-authentication-service-principal) |
| Auth using developer or user accounts | [Authenticate .NET apps to Azure services during local development using developer accounts](https://learn.microsoft.com/dotnet/azure/sdk/authentication-local-development-dev-accounts) | [Azure authentication with user credentials](https://learn.microsoft.com/azure/developer/java/sdk/identity-user-auth)  | [Auth JS apps to Azure services with dev accounts](https://learn.microsoft.com/azure/developer/javascript/sdk/authentication/local-development-environment-developer-account) | [Authenticate Python apps to Azure services during local development using developer accounts](https://learn.microsoft.com/azure/developer/python/sdk/authentication-local-development-dev-accounts) | [Azure authentication with the Azure SDK for Go](https://learn.microsoft.com/azure/developer/go/azure-sdk-authentication) |
| Auth from Azure-hosted apps | [Authenticating Azure-hosted apps to Azure resources with the Azure SDK for .NET](https://learn.microsoft.com/dotnet/azure/sdk/authentication-azure-hosted-apps) | [Authenticate Azure-hosted Java applications](https://learn.microsoft.com/azure/developer/java/sdk/identity-azure-hosted-auth) | [Authenticating Azure-hosted JavaScript apps to Azure resources with the Azure SDK for JavaScript](https://learn.microsoft.com/azure/developer/javascript/sdk/authentication/azure-hosted-apps) | [Authenticating Azure-hosted apps to Azure resources with the Azure SDK for Python](https://learn.microsoft.com/azure/developer/python/sdk/authentication-azure-hosted-apps) | [Authentication with the Azure SDK for Go using a managed identity](https://learn.microsoft.com/azure/developer/go/azure-sdk-authentication-managed-identity) |
| Auth from on-premises apps | [Authenticate to Azure resources from .NET apps hosted on-premises](https://learn.microsoft.com/dotnet/azure/sdk/authentication-on-premises-apps) |  | [Authenticate on-premises JavaScript apps to Azure resources](https://learn.microsoft.com/azure/developer/javascript/sdk/authentication/on-premises-apps) | [Authenticate to Azure resources from Python apps hosted on-premises](https://learn.microsoft.com/azure/developer/python/sdk/authentication-on-premises-apps) | |
| Identity client library overview | [Azure Identity client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme) | [Azure Identity client library for Java](https://learn.microsoft.com/java/api/overview/azure/identity-readme) | [Azure Identity client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme) | [Azure Identity client library for Python](https://learn.microsoft.com/python/api/overview/azure/identity-readme) | [Azure Identity client library for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/azidentity) |


## Assign Azure roles for access rights

Microsoft Entra authorizes access rights to secured resources through [Azure role-based access control (Azure RBAC)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md). Azure Storage defines a set of Azure built-in roles that encompass common sets of permissions used to access table data. You can also define custom roles for access to table data.

When an Azure role is assigned to a Microsoft Entra security principal, Azure grants access to those resources for that security principal. A Microsoft Entra security principal may be a user, a group, an application service principal, or a [managed identity for Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md).

### Resource scope

Before you assign an Azure RBAC role to a security principal, determine the scope of access that the security principal should have. Best practices dictate that it's always best to grant only the narrowest possible scope. Azure RBAC roles defined at a broader scope are inherited by the resources beneath them.

You can scope access to Azure table resources at the following levels, beginning with the narrowest scope:

- **An individual table.** At this scope, a role assignment applies to the specified table.
- **The storage account.** At this scope, a role assignment applies to all tables in the account.
- **The resource group.** At this scope, a role assignment applies to all of the tables in all of the storage accounts in the resource group.
- **The subscription.** At this scope, a role assignment applies to all of the tables in all of the storage accounts in all of the resource groups in the subscription.
- **A management group.** At this scope, a role assignment applies to all of the tables in all of the storage accounts in all of the resource groups in all of the subscriptions in the management group.

For more information about scope for Azure RBAC role assignments, see [Understand scope for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md).

### Azure built-in roles for tables

Azure RBAC provides built-in roles for authorizing access to table data using Microsoft Entra ID and OAuth. Built-in roles that provide permissions to tables in Azure Storage include:

- [Storage Table Data Contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-table-data-contributor): Use to grant read/write/delete permissions to Table storage resources.
- [Storage Table Data Reader](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-table-data-reader): Use to grant read-only permissions to Table storage resources.

To learn how to assign an Azure built-in role to a security principal, see [Assign an Azure role for access to table data](assign-azure-role-data-access.md). To learn how to list Azure RBAC roles and their permissions, see [List Azure role definitions](https://learn.microsoft.com/azure/role-based-access-control/role-definitions-list).

For more information about how built-in roles are defined for Azure Storage, see [Understand role definitions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-definitions.md#control-and-data-actions). For information about creating Azure custom roles, see [Azure custom roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/custom-roles.md).

Only roles explicitly defined for data access permit a security principal to access table data. Built-in roles such as **Owner**, **Contributor**, and **Storage Account Contributor** permit a security principal to manage a storage account, but do not provide access to the table data within that account via Microsoft Entra ID. However, if a role includes **Microsoft.Storage/storageAccounts/listKeys/action**, then a user to whom that role is assigned can access data in the storage account via Shared Key authorization with the account access keys.

For detailed information about Azure built-in roles for Azure Storage for both the data services and the management service, see the **Storage** section in [Azure built-in roles for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage). Additionally, for information about the different types of roles that provide permissions in Azure, see [Azure roles, Microsoft Entra roles, and classic subscription administrator roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/rbac-and-directory-admin-roles.md).

> **Important:**
> Azure role assignments may take up to 30 minutes to propagate.

### Access permissions for data operations

For details on the permissions required to call specific Table service operations, see [Permissions for calling data operations](https://learn.microsoft.com/rest/api/storageservices/authorize-with-azure-active-directory#permissions-for-calling-data-operations).

## Next steps

- [Authorize access to data in Azure Storage](../common/authorize-data-access.md)
- [Assign an Azure role for access to table data](assign-azure-role-data-access.md)
