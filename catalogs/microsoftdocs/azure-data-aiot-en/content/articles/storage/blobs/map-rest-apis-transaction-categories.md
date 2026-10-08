---
title: Map each REST operation to a price - Azure Blob Storage
description: Find the operation type of each REST operation so that you can identify the price of an operation. 
services: storage
author: normesta
ms.service: azure-blob-storage
ms.topic: concept-article
ms.date: 05/14/2025
ms.author: normesta
ms.custom:
  - subject-cost-optimization
  - build-2025
# Customer intent: "As a cloud cost manager, I want to identify the pricing for each REST operation in Azure Blob Storage, so that I can optimize our storage expenses effectively."
---

# Map each REST operation to a price

This article helps you find the price of each REST operation that clients can run against the Azure Blob Storage service.

Tools such as AzCopy or Azure Storage Explorer send each request to the service as a REST operation. The same is true for a custom application that uses an Azure Storage client library. REST operations aren't billed when authentication fails. After an identity is authenticated, all operations and requests that the identity makes are billed, including the ones that don't succeed.

To find the price of each operation, first determine the operation's _type_. The pricing pages list prices by operation type, not by individual operation. Use the tables in this article as a guide.

## Operation type of each Blob Storage REST operation

The following table maps each Blob Storage REST operation to an operation type.

The price of each type appears in the [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/) page.

| Logged operation | REST API | Premium block blob | Standard general purpose v2 | Standard general purpose v1 |
| --- | --- | --- | --- | --- |
| AbortCopyBlob | [Abort Copy Blob](https://learn.microsoft.com/rest/api/storageservices/abort-copy-blob) | Other | Other | Write |
| SealBlob | [Append Blob Seal](https://learn.microsoft.com/rest/api/storageservices/append-blob-seal) | Write | Write | Write |
| AppendBlockThroughCopy | [Append Block from URL](https://learn.microsoft.com/rest/api/storageservices/append-block-from-url) | Write | Write | Write |
| AppendBlock | [Append Block](https://learn.microsoft.com/rest/api/storageservices/append-block) | Write | Write | Write |
| CopyBlobFromURL | [Copy Blob from URL](https://learn.microsoft.com/rest/api/storageservices/copy-blob-from-url) | Write | Write | Write |
| CopyBlob | [Copy Blob](https://learn.microsoft.com/rest/api/storageservices/copy-blob) | Write<sup>2</sup> | Write<sup>2</sup> | Write<sup>2</sup> |
| CreateContainer | [Create Container](https://learn.microsoft.com/rest/api/storageservices/create-container) | List and create container | List and create container | List and create container |
| DeleteBlob | [Delete Blob](https://learn.microsoft.com/rest/api/storageservices/delete-blob) | Free | Free | Other |
| DeleteContainer | [Delete Container](https://learn.microsoft.com/rest/api/storageservices/delete-container) | Free | Free | Other |
| SetContainerServiceMetadata | [Delete Immutability Policy](https://learn.microsoft.com/rest/api/storageservices/delete-blob-immutability-policy) | Other | Other | Other |
| FindBlobsByTags | [Find Blobs by Tags in Container](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags-container) | List and create container | List and create container | List and create container |
| FindBlobsByTags | [Find Blobs by Tags](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) | List and create container | List and create container | List and create container |
| GetAccountInformation | [Get Account Information](https://learn.microsoft.com/rest/api/storageservices/get-account-information) | Other | Other | Read |
| GetBlobMetadata | [Get Blob Metadata](https://learn.microsoft.com/rest/api/storageservices/get-blob-metadata) | Other | Other | Read |
| GetBlobProperties | [Get Blob Properties](https://learn.microsoft.com/rest/api/storageservices/get-blob-properties) | Other | Other | Read |
| GetBlobServiceProperties | [Get Blob Service Properties](https://learn.microsoft.com/rest/api/storageservices/get-blob-service-properties) | Other | Other | Read |
| GetBlobServiceStats | [Get Blob Service Stats](https://learn.microsoft.com/rest/api/storageservices/get-blob-service-stats) | Other | Other | Read |
| GetBlobTags | [Get Blob Tags](https://learn.microsoft.com/rest/api/storageservices/get-blob-tags) | Other | Other | Read |
| GetBlob | [Get Blob](https://learn.microsoft.com/rest/api/storageservices/get-blob) | Read | Read | Read |
| GetBlockList | [Get Block List](https://learn.microsoft.com/rest/api/storageservices/get-block-list) | Other | Other | Read |
| GetContainerACL | [Get Container ACL](https://learn.microsoft.com/rest/api/storageservices/get-container-acl) | Other | Other | Read |
| GetContainerMetadata | [Get Container Metadata](https://learn.microsoft.com/rest/api/storageservices/get-container-metadata) | Other | Other | Read |
| GetContainerProperties | [Get Container Properties](https://learn.microsoft.com/rest/api/storageservices/get-container-properties) | Other | Other | Read |
| GetUserDelegationKey | [Get User Delegation Key](https://learn.microsoft.com/rest/api/storageservices/get-user-delegation-key) | Other | Other | Read |
| IncrementalCopyBlob | [Incremental Copy Blob](https://learn.microsoft.com/rest/api/storageservices/incremental-copy-blob) | Other | Other | Write |
| AcquireBlobLease | [Lease Blob](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) | Other | Other | Read |
| ReleaseBlobLease | [Lease Blob](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) | Other | Other | Read |
| RenewBlobLease | [Lease Blob](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) | Other | Other | Read |
| BreakBlobLease | [Lease Blob](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) | Other | Other | Write |
| ChangeBlobLease | [Lease Blob](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) | Other | Other | Write |
| AcquireContainerLease | [Lease Container](https://learn.microsoft.com/rest/api/storageservices/lease-container) | Other | Other | Read |
| ReleaseContainerLease | [Lease Container](https://learn.microsoft.com/rest/api/storageservices/lease-container) | Other | Other | Read |
| RenewContainerLease | [Lease Container](https://learn.microsoft.com/rest/api/storageservices/lease-container) | Other | Other | Read |
| BreakContainerLease | [Lease Container](https://learn.microsoft.com/rest/api/storageservices/lease-container) | Other | Other | Write |
| ChangeContainerLease | [Lease Container](https://learn.microsoft.com/rest/api/storageservices/lease-container) | Other | Other | Write |
| ListBlobs | [List Blobs](https://learn.microsoft.com/rest/api/storageservices/list-blobs) | List and create container | List and create container | List and create container |
| ListContainers | [List Containers](https://learn.microsoft.com/rest/api/storageservices/list-containers2) | List and create container | List and create container | List and create container |
| BlobPreflightRequest | [Preflight Blob Request](https://learn.microsoft.com/rest/api/storageservices/preflight-blob-request) | Other | Other | Read |
| PutBlobFromURL | [Put Blob from URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) | Write | Write | Write |
| PutBlob | [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) | Write | Write | Write |
| PutBlockFromURL | [Put Block from URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) | Write | Write | Write |
| PutBlockList | [Put Block List](https://learn.microsoft.com/rest/api/storageservices/put-block-list) | Write | Write | Write |
| PutBlock | [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) | Write | Write | Write |
| QueryBlobContents | [Query Blob Contents](https://learn.microsoft.com/rest/api/storageservices/query-blob-contents) | Read<sup>1</sup> | Read<sup>1</sup> | N/A |
| RestoreContainer | [Restore Container](https://learn.microsoft.com/rest/api/storageservices/restore-container) | List and create container | List and create container | List and create container |
| SetBlobExpiry | [Set Blob Expiry](https://learn.microsoft.com/rest/api/storageservices/set-blob-expiry) | Other | Other | Write |
| SetBlobMetadata | [Set Blob Metadata](https://learn.microsoft.com/rest/api/storageservices/set-blob-metadata) | Other | Other | Write |
| SetBlobProperties | [Set Blob Properties](https://learn.microsoft.com/rest/api/storageservices/set-blob-properties) | Other | Other | Write |
| SetBlobServiceProperties | [Set Blob Service Properties](https://learn.microsoft.com/rest/api/storageservices/set-blob-service-properties) | Other | Other | Write |
| SetBlobTags | [Set Blob Tags](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags) | Other | Other | Write |
| SetBlobTier | [Set Blob Tier](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier) (tier down) | Write | Write | N/A |
| SetBlobTier | [Set Blob Tier](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier) (tier up) | Read | Read | N/A |
| SetBlobTier | [Blob Batch](https://learn.microsoft.com/rest/api/storageservices/blob-batch) (Set Blob Tier) | Other | Other | N/A |
| SetContainerACL | [Set Container ACL](https://learn.microsoft.com/rest/api/storageservices/set-container-acl) | Other | Other | Write |
| SetContainerMetadata | [Set Container Metadata](https://learn.microsoft.com/rest/api/storageservices/set-container-metadata) | Other | Other | Write |
| SetContainerServiceMetadata | [Set Immutability Policy](https://learn.microsoft.com/rest/api/storageservices/set-blob-immutability-policy) | Other | Other | Other |
| SetContainerServiceMetadata | [Set Legal Hold](https://learn.microsoft.com/rest/api/storageservices/set-blob-legal-hold) | Other | Other | Other |
| SnapshotBlob | [Snapshot Blob](https://learn.microsoft.com/rest/api/storageservices/snapshot-blob) | Other | Other | Read |
| UndeleteBlob | [Undelete Blob](https://learn.microsoft.com/rest/api/storageservices/undelete-blob) | Write | Write | Write |

<sup>1</sup>    In addition to a read charge, charges are incurred for the **Query Acceleration - Data Scanned**, and **Query Acceleration - Data Returned** transaction categories that appear on the [Azure Data Lake Storage pricing](https://azure.microsoft.com/pricing/details/storage/data-lake/) page.

<sup>2</sup> When the source object is in a different account, the source account incurs one transaction for each read request to the source object.

## Operation type of each Data Lake Storage REST operation

The following table maps each Data Lake Storage REST operation to an operation type. 

The price of each type appears in the [Azure Data Lake Storage pricing](https://azure.microsoft.com/pricing/details/storage/data-lake/) page.

| Logged operation | REST API | Premium block blob | Standard general purpose v2 |
| --- | --- | --- | --- |
| CreateFilesystem | [Filesystem  Create](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/filesystem/create) | Write | Write |
| DeleteFilesystem | [Filesystem  Delete](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/filesystem/delete) | Free | Free |
| GetFilesystemProperties | [Filesystem  Get Properties](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/filesystem/getproperties) | Other | Other |
| ListFilesystems | [Filesystem  List](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/filesystem/list) | Iterative Read | Iterative Read |
| SetFilesystemProperties | [Filesystem  Set Properties](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/filesystem/setproperties) | Write | Write |
| CreatePathDir | [Path  Create](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/create) | Write | Write |
| CreatePathFile | [Path  Create](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/create) | Write | Write |
| RenamePathDir | [Path  Create](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/create) | Iterative Write | Iterative Write |
| RenamePathFile | [Path  Create](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/create) | Iterative Write | Iterative Write |
| DeleteDirectory | [Path  Delete](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/delete) | Free | Free |
| DeleteFile | [Path  Delete](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/delete) | Free | Free |
| GetFileProperties | [Path  Get Properties](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/getproperties) | Read | Read |
| GetPathAccessControl | [Path  Get Properties](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/getproperties) | Read | Read |
| GetPathStatus | [Path  Get Properties](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/getproperties) | Read | Read |
| LeaseFile | [Path  Lease](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/lease) | Other | Other |
| ListFilesystemDir | [Path  List](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/list) | Iterative Read | Iterative Read |
| ListFilesystemFile | [Path  List](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/list) | Iterative Read | Iterative Read |
| ReadFile | [Path  Read](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/read) | Read | Read |
| AppendFile | [Path  Update](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/update) | Write | Write |
| FlushFile | [Path  Update](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/update) | Write | Write |
| SetFileProperties | [Path  Update](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/update) | Write | Write |
| SetPathAccessControl | [Path  Update](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/update) | Write | Write |
| SetPathAccessControlRecursive | [Path  Update](https://learn.microsoft.com/rest/api/storageservices/datalakestoragegen2/path/update) | Iterative Write | Iterative Write |

## See also

- [Plan and manage costs for Azure Blob Storage](../common/storage-plan-manage-costs.md)
