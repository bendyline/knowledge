---
title: Authorize operations for data access
titleSuffix: Azure Storage
description: Learn about the different ways to authorize access to data in Azure Storage. Azure Storage supports authorization with Microsoft Entra ID, Shared Key authorization, or shared access signatures (SAS), and also supports anonymous access to blobs.
services: storage
author: normesta
ms.author: normesta

ms.service: azure-storage
ms.topic: concept-article
ms.date: 01/24/2025
ms.reviewer: nachakra
ms.subservice: storage-common-concepts
# Customer intent: As a cloud solution architect, I want to understand the various authorization methods for Azure Storage data access, so that I can implement the most secure and effective access controls for my organization's storage accounts.
---

# Authorize access to data in Azure Storage

Each time you access data in your storage account, your client application makes a request over HTTP/HTTPS to Azure Storage. By default, every resource in Azure Storage is secured, and every request to a secure resource must be authorized. Authorization ensures that the client application has the appropriate permissions to access a particular resource in your storage account.


> **Important:**
> For optimal security, Microsoft recommends using Microsoft Entra ID with managed identities to authorize requests against blob, queue, and table data, whenever possible. Authorization with Microsoft Entra ID and managed identities provides superior security and ease of use over Shared Key authorization. To learn more about managed identities, see [What are managed identities for Azure resources](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview). For an example of how to enable and use a managed identity for a .NET application, see [Authenticating Azure-hosted apps to Azure resources with .NET](https://learn.microsoft.com/dotnet/azure/sdk/authentication/azure-hosted-apps).
>
> For resources hosted outside of Azure, such as on-premises applications, you can use managed identities through Azure Arc. For example, apps running on Azure Arc-enabled servers can use managed identities to connect to Azure services. To learn more, see [Authenticate against Azure resources with Azure Arc-enabled servers](https://learn.microsoft.com/azure/azure-arc/servers/managed-identity-authentication).
>
> For scenarios where shared access signatures (SAS) are used, Microsoft recommends using a user delegation SAS. A user delegation SAS is secured with Microsoft Entra credentials instead of the account key. To learn about shared access signatures, see [Grant limited access to data with shared access signatures](storage-sas-overview.md). For an example of how to create and use a user delegation SAS with .NET, see [Create a user delegation SAS for a blob with .NET](https://learn.microsoft.com/azure/storage/blobs/storage-blob-user-delegation-sas-create-dotnet).


## Authorization for data operations

The following section describes authorization support and recommendations for each Azure Storage service.

### [Blobs](#tab/blobs)

The following table provides information about supported authorization options for blobs:

| Authorization option | Guidance | Recommendation |
| --- | --- | --- |
| Microsoft Entra ID | [Authorize access to Azure Storage data with Microsoft Entra ID](../blobs/authorize-access-azure-active-directory.md) | Microsoft recommends using Microsoft Entra ID with managed identities to authorize requests to blob resources. |
| Shared Key (storage account key) | [Authorize with Shared Key](https://learn.microsoft.com/rest/api/storageservices/authorize-with-shared-key/) | Microsoft recommends that you [disallow Shared Key authorization](shared-key-authorization-prevent.md) for your storage accounts. |
| Shared access signature (SAS) | [Using shared access signatures (SAS)](storage-sas-overview.md) | When SAS authorization is necessary, Microsoft recommends using user delegation SAS for limited delegated access to blob resources. SAS authorization is supported for Blob Storage and Data Lake Storage, and can be used for calls to `blob` endpoints and `dfs` endpoints. |
| Anonymous read access | [Overview: Remediating anonymous read access for blob data](../blobs/anonymous-read-access-overview.md) | Microsoft recommends that you disable anonymous access for all of your storage accounts. |
| Storage Local Users | Supported for SFTP only. To learn more, see [Authorize access to Blob Storage for an SFTP client](../blobs/secure-file-transfer-protocol-support-how-to.md) | See guidance for options. |
| Microsoft Purview protection policies | Supported for Azure Blob Storage and Azure Data Lake Storage. To learn more, see [Authoring and publishing protection policies for Azure sources (Preview)](https://learn.microsoft.com/purview/how-to-create-protection-policy-azure-sources). | See guidance for options. |

### [Files (SMB)](#tab/files-smb)

The following table provides information about supported authorization options for Azure Files (SMB):

| Authorization option | Guidance | Recommendation |
| --- | --- | --- |
| Microsoft Entra ID | Supported with [Microsoft Entra Domain Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-identity-auth-active-directory-domain-service-enable.md) for cloud-only, or [Microsoft Entra Kerberos](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-identity-auth-azure-active-directory-enable.md) for hybrid identities. | See guidance for options. |
| Shared Key (storage account key) | [Authorize with Shared Key](https://learn.microsoft.com/rest/api/storageservices/authorize-with-shared-key/) | Microsoft recommends that you [disallow Shared Key authorization](shared-key-authorization-prevent.md) for your storage accounts. |
| On-premises Active Directory Domain Services | Supported, and credentials must be synced to Microsoft Entra ID. To learn more, see [Overview of Azure Files identity-based authentication options for SMB access](../files/storage-files-active-directory-overview.md) | See guidance for options. |

### [Files (REST)](#tab/files-rest)

The following table provides information about supported authorization options for Azure Files (REST):

| Authorization option | Guidance | Recommendation |
| --- | --- | --- |
| Microsoft Entra ID | [Authorize access to Azure Storage data with Microsoft Entra ID](../blobs/authorize-access-azure-active-directory.md) | Microsoft recommends using Microsoft Entra ID with managed identities to authorize requests to Azure Files resources. |
| Shared Key (storage account key) | [Authorize with Shared Key](https://learn.microsoft.com/rest/api/storageservices/authorize-with-shared-key/) | Microsoft recommends that you [disallow Shared Key authorization](shared-key-authorization-prevent.md) for your storage accounts. |
| Shared access signature (SAS) | User delegation SAS isn't supported for Azure Files. To learn more, see [Using shared access signatures (SAS)](storage-sas-overview.md). | Microsoft doesn't recommend using SAS tokens secured by the account key. |

### [Queues](#tab/queues)

The following table provides information about supported authorization options for queues:

| Authorization option | Guidance | Recommendation |
| --- | --- | --- |
| Microsoft Entra ID | [Authorize access to Azure Storage data with Microsoft Entra ID](../queues/authorize-access-azure-active-directory.md) | Microsoft recommends using Microsoft Entra ID with managed identities to authorize requests to queue resources. |
| Shared Key (storage account key) | [Authorize with Shared Key](https://learn.microsoft.com/rest/api/storageservices/authorize-with-shared-key/) | Microsoft recommends that you [disallow Shared Key authorization](shared-key-authorization-prevent.md) for your storage accounts. |
| Shared access signature (SAS) | User delegation SAS isn't supported for Queue Storage. To learn more, see [Using shared access signatures (SAS)](storage-sas-overview.md). | Microsoft doesn't recommend using SAS tokens secured by the account key. |

### [Tables](#tab/tables)

The following table provides information about supported authorization options for tables:

| Authorization option | Guidance | Recommendation |
| --- | --- | --- |
| Microsoft Entra ID | [Authorize access to Azure Storage data with Microsoft Entra ID](../tables/authorize-access-azure-active-directory.md) | Microsoft recommends using Microsoft Entra ID with managed identities to authorize requests to table resources. |
| Shared Key (storage account key) | [Authorize with Shared Key](https://learn.microsoft.com/rest/api/storageservices/authorize-with-shared-key/) | Microsoft recommends that you [disallow Shared Key authorization](shared-key-authorization-prevent.md) for your storage accounts. |
| Shared access signature (SAS) | User delegation SAS isn't supported for Table Storage. To learn more, see [Using shared access signatures (SAS)](storage-sas-overview.md). | Microsoft doesn't recommend using SAS tokens secured by the account key. |

---

The following section briefly describes the authorization options for Azure Storage:

- **Shared Key authorization**: Applies to blobs, files, queues, and tables. A client using Shared Key passes a header with every request that is signed using the storage account access key. For more information, see [Authorize with Shared Key](https://learn.microsoft.com/rest/api/storageservices/authorize-with-shared-key/).

    The storage account access key should be used with caution. Anyone who has the access key is able to authorize requests against the storage account, and effectively has access to all the data. Microsoft recommends that you disallow Shared Key authorization for your storage account. When Shared Key authorization is disallowed, clients must use Microsoft Entra ID or a user delegation SAS to authorize requests for data in that storage account. For more information, see [Prevent Shared Key authorization for an Azure Storage account](shared-key-authorization-prevent.md).

- **Shared access signatures** for blobs, files, queues, and tables. Shared access signatures (SAS) provide limited delegated access to resources in a storage account via a signed URL. The signed URL specifies the permissions granted to the resource and the interval over which the signature is valid. A service SAS or account SAS is signed with the account key, while the user delegation SAS is signed with Microsoft Entra credentials and applies to blobs only. For more information, see [Using shared access signatures (SAS)](storage-sas-overview.md).

- **Microsoft Entra integration**: Applies to blob, queue, and table resources. Microsoft recommends using Microsoft Entra credentials with managed identities to authorize requests to data when possible for optimal security and ease of use. For more information about Microsoft Entra integration, see the articles for [blob](../blobs/authorize-access-azure-active-directory.md), [queue](../queues/authorize-access-azure-active-directory.md), or [table](../tables/authorize-access-azure-active-directory.md) resources.

    You can use Azure role-based access control (Azure RBAC) to manage a security principal's permissions to blob, queue, and table resources in a storage account. You can also use Azure attribute-based access control (ABAC) to add conditions to Azure role assignments for blob resources. 

    For more information about RBAC, see [What is Azure role-based access control (Azure RBAC)?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md).

    For more information about ABAC, see [What is Azure attribute-based access control (Azure ABAC)?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/conditions-overview.md). To learn about the status of ABAC features, see [Status of ABAC condition features in Azure Storage](../blobs/storage-auth-abac.md#status-of-condition-features-in-azure-storage).

- **Microsoft Entra Domain Services authentication**: Applies to Azure Files. Azure Files supports identity-based authorization over Server Message Block (SMB) through Microsoft Entra Domain Services. You can use Azure RBAC for granular control over a client's access to Azure Files resources in a storage account. For more information about Azure Files authentication using domain services, see [Overview of Azure Files identity-based authentication options for SMB access](../files/storage-files-active-directory-overview.md).

- **On-premises Active Directory Domain Services (AD DS, or on-premises AD DS) authentication**: Applies to Azure Files. Azure Files supports identity-based authorization over SMB through AD DS. Your AD DS environment can be hosted in on-premises machines or in Azure VMs. SMB access to Files is supported using AD DS credentials from domain joined machines, either on-premises or in Azure. You can use a combination of Azure RBAC for share level access control and NTFS DACLs for directory/file level permission enforcement. For more information about Azure Files authentication using domain services, see the [overview](../files/storage-files-active-directory-overview.md).

- **Anonymous read access**: Applies to blob resources. This option isn't recommended. When anonymous access is configured, clients can read blob data without authorization. We recommend that you disable anonymous access for all of your storage accounts. For more information, see [Overview: Remediating anonymous read access for blob data](../blobs/anonymous-read-access-overview.md).

- **Storage Local Users**: Applies to blobs with SFTP or files with SMB. Storage Local Users support container level permissions for authorization. See [Connect to Azure Blob Storage by using the SSH File Transfer Protocol (SFTP)](../blobs/secure-file-transfer-protocol-support-how-to.md) for more information on how Storage Local Users can be used with SFTP.

- **Microsoft Purview Information Protection integration**: Applies to Azure Blob Storage and Azure Data Lake Storage. Microsoft Purview Information Protection offers protection policies to protect sensitive data across [Azure Blob Storage](https://learn.microsoft.com/purview/register-scan-azure-blob-storage-source) and [Azure Data Lake Storage](https://learn.microsoft.com/purview/register-scan-adls-gen2). Purview offers the ability to publish labels based on the sensitivity of the content. You can create protection policies on top of these sensitivity labels to allow or deny access to certain users, enabling more secure and granular access to confidential files. This feature helps to not only minimize the risk of unauthorized access and potential data leaks, but also enhances the overall security posture of the organization. To learn more, see [Authoring and publishing protection policies for Azure sources (Preview)](https://learn.microsoft.com/purview/how-to-create-protection-policy-azure-sources).


## Protect your access keys

Storage account access keys provide full access to the storage account data and the ability to generate SAS tokens. Always be careful to protect your access keys. Use Azure Key Vault to manage and rotate your keys securely. Access to the shared key grants a user full access to a storage account’s data. Access to shared keys should be carefully limited and monitored. Use user delegation SAS tokens with limited scope of access in scenarios where Microsoft Entra ID based authorization can't be used. Avoid hard-coding access keys or saving them anywhere in plain text that is accessible to others. Rotate your keys if you believe they might have been compromised.

> **Important:**
> To prevent users from accessing data in your storage account with Shared Key, you can disallow Shared Key authorization for the storage account. Granular access to data with least privileges necessary is recommended as a security best practice. Microsoft Entra ID based authorization using managed identities should be used for scenarios that support OAuth. Kerberos should be used for Azure Files over SMB. For Azure Files over REST, SAS tokens can be used. Shared key access should be disabled if not required to prevent its inadvertent use. For more information, see [Prevent Shared Key authorization for an Azure Storage account](shared-key-authorization-prevent.md).
>
> To protect an Azure Storage account with Microsoft Entra Conditional Access policies, you must disallow Shared Key authorization for the storage account.
> 
> If you have disabled shared key access and you are seeing Shared Key authorization reported in the diagnostic logs, this indicates that trusted access is being used to access storage. For more details, see [Trusted access for resources registered in your Microsoft Entra tenant](storage-network-security-trusted-azure-services.md#trusted-access-for-resources-registered-in-your-microsoft-entra-tenant).


## Next steps

- Authorize access with Microsoft Entra ID to either [blob](../blobs/authorize-access-azure-active-directory.md), [queue](../queues/authorize-access-azure-active-directory.md), or [table](../tables/authorize-access-azure-active-directory.md) resources.
- [Authorize with Shared Key](https://learn.microsoft.com/rest/api/storageservices/authorize-with-shared-key/)
- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](storage-sas-overview.md)
