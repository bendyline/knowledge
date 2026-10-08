---
title: Use blob index tags to manage and find data with Go
titleSuffix: Azure Storage
description: Learn how to categorize, manage, and query for blob objects by using the Go client module.  
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: golang
ms.custom: devx-track-go, devguide-go
# Customer intent: As a Go developer, I want to utilize blob index tags in Azure Storage, so that I can efficiently categorize, manage, and query blob objects to streamline data management processes.
---

# Use blob index tags to manage and find data with Go


> 
>
> - [.NET](storage-blob-tags.md)
> - [Java](storage-blob-tags-java.md)
> - [JavaScript](storage-blob-tags-javascript.md)
> - [Python](storage-blob-tags-python.md)
> - [Go](storage-blob-tags-go.md)

This article shows how to use blob index tags to manage and find data using the [Azure Storage client module for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme).


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

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/client-auth/client_auth.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-go.md)



#### Authorization

The authorization mechanism must have the necessary permissions to work with blob index tags. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Owner** or higher. To learn more, see the authorization guidance for [Get Blob Tags](https://learn.microsoft.com/rest/api/storageservices/get-blob-tags#authorization), [Set Blob Tags](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags#authorization), or [Find Blobs by Tags](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags#authorization).


## About blob index tags

Blob index tags categorize data in your storage account using key-value tag attributes. These tags are automatically indexed and exposed as a searchable multi-dimensional index to easily find data. This article shows you how to set, get, and find data using blob index tags.

Blob index tags aren't supported for storage accounts with hierarchical namespace enabled. To learn more about the blob index tag feature along with known issues and limitations, see [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md).

## Set tags


You can set index tags if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/write](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to access the blob's tags (`t` permission)
- Account key

For more information, see [Setting blob index tags](storage-manage-find-blobs.md#setting-blob-index-tags).

You can set tags by using the following method:

- [SetTags](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.SetTags)

The tags specified in this method replace any existing tags. If existing values must be preserved, they must be downloaded and included in the call to this method. The following example shows how to set tags:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/blob-index-tags/blob_index_tags.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-go.md)

You can remove all tags by calling `SetTags` with no tags, as shown in the following example:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/blob-index-tags/blob_index_tags.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-go.md)

## Get tags


You can get index tags if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/read](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to access the blob's tags (`t` permission)
- Account key

For more information, see [Getting and listing blob index tags](storage-manage-find-blobs.md#getting-and-listing-blob-index-tags).

You can get tags by using the following method: 

- [GetTags](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.GetTags)

The following example shows how to retrieve and iterate over the blob's tags:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/blob-index-tags/blob_index_tags.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-go.md)

## Filter and find data with blob index tags


You can use index tags to find and filter data if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/filter/action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to filter blobs by tags (`f` permission)
- Account key

For more information, see [Finding data using blob index tags](storage-manage-find-blobs.md#finding-data-using-blob-index-tags).

> **Note:**
> You can't use index tags to retrieve previous versions. Tags for previous versions aren't passed to the blob index engine. For more information, see [Conditions and known issues](storage-manage-find-blobs.md#conditions-and-known-issues).

You can filter blob data based on index tags by using the following method: 

- [FilterBlobs](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob@v1.3.2/container#Client.FilterBlobs)

The following example finds and lists all blobs tagged as an image:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/blob-index-tags/blob_index_tags.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-go.md)


> **Note:**
> The code samples in this guide are intended to help you get started with Azure Blob Storage and Go. You should modify error handling and `Context` values to meet the needs of your application.

## Resources

To learn more about how to use index tags to manage and find data using the Azure Blob Storage client library for Go, see the following resources.

### Code samples

- View [code samples](https://github.com/Azure-Samples/blob-storage-devguide-go/blob/main/cmd/blob-index-tags/blob_index_tags.go) from this article (GitHub)

### REST API operations

The Azure SDK for Go contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Go paradigms. The client library methods for managing and using blob index tags use the following REST API operations:

- [Get Blob Tags](https://learn.microsoft.com/rest/api/storageservices/get-blob-tags) (REST API)
- [Set Blob Tags](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags) (REST API)
- [Find Blobs by Tags](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) (REST API)


### Client module resources

- [Client module reference documentation](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme)
- [Client module source code](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)
- [Package (pkg.go.dev)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob)

### See also

- [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md)
- [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md)


## Related content

- This article is part of the Blob Storage developer guide for Go. To learn more, see the full list of developer guide articles at [Build your Go app](storage-blob-go-get-started.md#build-your-app).
