---
title: Delete and restore a blob with Go
titleSuffix: Azure Storage
description: Learn how to delete and restore a blob in your Azure Storage account using the Go client library.
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 08/12/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: golang
ms.custom: devx-track-go, devguide-go
# Customer intent: "As a developer using the Go client library, I want to delete and restore blobs in Azure Storage, so that I can manage my data effectively and recover from accidental deletions."
---

# Delete and restore a blob with Go


> 
>
> - [.NET](storage-blob-delete.md)
> - [Java](storage-blob-delete-java.md)
> - [JavaScript](storage-blob-delete-javascript.md)
> - [Python](storage-blob-delete-python.md)
> - [Go](storage-blob-delete-go.md)

This article shows how to delete blobs using the [Azure Storage client module for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme), and how to restore [soft-deleted](soft-delete-blob-overview.md) blobs during the retention period.


## Prerequisites

- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure storage account - [create a storage account](../common/storage-account-create.md)
- [Go 1.18+](https://go.dev/dl/)

## Set up your environment


If you don't have an existing project, this section shows how to set up a project to work with the Azure Blob Storage client module for Go. The steps include module installation, adding `import` paths, and creating an authorized client object. For details, see [Get started with Azure Blob Storage and Go](storage-blob-go-get-started.md).

#### Install modules

Install the [azblob](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/) module using the following command:

```console
go get github.com/Azure/azure-sdk-for-go/sdk/storage/azblob
```
To authenticate with Microsoft Entra ID (recommended), install the [`azidentity`](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/azidentity) module using the following command:

```console
go get github.com/Azure/azure-sdk-for-go/sdk/azidentity
```

#### Add import paths

In your code file, add the following import paths:

```go
import (
    "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
)
```

These import paths represent the minimum needed to get started. Some code examples in this article might require additional import paths. For specific details and example usage, see [Code samples](#code-samples).

#### Create a client object

To connect an app to Blob Storage, create a client object using [azblob.NewClient](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#NewClient). The following example shows how to create a client object using `DefaultAzureCredential` for authorization:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/client-auth/client_auth.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete-go.md)



#### Authorization

The authorization mechanism must have the necessary permissions to delete a blob, or to restore a soft-deleted blob. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Delete Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/delete-blob#authorization) and [Undelete Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/undelete-blob#authorization).

## Delete a blob


> **Note:**
> When blob soft delete is enabled for a storage account, you can't perform a permanent deletion using client library methods. Using the methods in this article, a soft-deleted blob, blob version, or snapshot remains available until the retention period expires, at which time it's permanently deleted. To learn more about the underlying REST API operation, see [Delete Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/delete-blob).

To delete a blob, call the following method:

- [DeleteBlob](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.DeleteBlob)

The following example deletes a blob:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/delete_blob/delete_blob.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete-go.md)

If the blob has any associated snapshots, you must delete all of its snapshots to delete the blob. The following example deletes a blob and its snapshots:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/delete_blob/delete_blob.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete-go.md)

To delete *only* the snapshots and not the blob itself, you can pass the value `DeleteSnapshotsOptionTypeOnly` to the `DeleteSnapshots` parameter.

## Restore a deleted blob

Blob soft delete protects an individual blob and its versions, snapshots, and metadata from accidental deletes or overwrites by maintaining the deleted data in the system for a specified period of time. During the retention period, you can restore the blob to its state at deletion. After the retention period expires, the blob is permanently deleted. For more information about blob soft delete, see [Soft delete for blobs](soft-delete-blob-overview.md).

You can use the Azure Storage client libraries to restore a soft-deleted blob or snapshot.

How you restore a soft-deleted blob depends on whether or not your storage account has blob versioning enabled. For more information on blob versioning, see [Blob versioning](versioning-overview.md). See one of the following sections, depending on your scenario:

- [Blob versioning is not enabled](#restore-soft-deleted-objects-when-versioning-is-disabled)
- [Blob versioning is enabled](#restore-soft-deleted-objects-when-versioning-is-enabled)

#### Restore soft-deleted objects when versioning is disabled

To restore deleted blobs when versioning is disabled, call the following method:

- [UndeleteBlob](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.Undelete)

This method restores the content and metadata of a soft-deleted blob and any associated soft-deleted snapshots. Calling this method for a blob that hasn't been deleted has no effect.

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/delete_blob/delete_blob.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete-go.md)

#### Restore soft-deleted objects when versioning is enabled

If a storage account is configured to enable blob versioning, deleting a blob causes the current version of the blob to become the previous version. To restore a soft-deleted blob when versioning is enabled, copy a previous version over the base blob. You can use the following method:

- [StartCopyFromURL](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.StartCopyFromURL)

The following code example identifies a version of a deleted blob, and restores that version by copying it to the base blob:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/delete_blob/delete_blob.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete-go.md)


> **Note:**
> The code samples in this guide are intended to help you get started with Azure Blob Storage and Go. You should modify error handling and `Context` values to meet the needs of your application.

## Resources

To learn more about how to delete blobs and restore deleted blobs using the Azure Blob Storage client module for Go, see the following resources.

### Code samples

- View [code samples](https://github.com/Azure-Samples/blob-storage-devguide-go/blob/main/cmd/delete_blob/delete_blob.go) from this article (GitHub)

### REST API operations

The Azure SDK for Go contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Go paradigms. The client library methods for deleting blobs and restoring deleted blobs use the following REST API operations:

- [Delete Blob](https://learn.microsoft.com/rest/api/storageservices/delete-blob) (REST API)
- [Undelete Blob](https://learn.microsoft.com/rest/api/storageservices/undelete-blob) (REST API)


### Client module resources

- [Client module reference documentation](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme)
- [Client module source code](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)
- [Package (pkg.go.dev)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob)

### See also

- [Soft delete for blobs](soft-delete-blob-overview.md)
- [Blob versioning](versioning-overview.md)


## Related content

- This article is part of the Blob Storage developer guide for Go. To learn more, see the full list of developer guide articles at [Build your Go app](storage-blob-go-get-started.md#build-your-app).
