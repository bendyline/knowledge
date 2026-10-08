---
title: Delete and restore a blob container with Go
titleSuffix: Azure Storage
description: Learn how to delete and restore a blob container in your Azure Storage account using the Go client library.
services: storage
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.devlang: golang
ms.custom: devx-track-go, devguide-go
# Customer intent: As a developer, I want to delete and restore blob containers using the Go client library, so that I can efficiently manage storage resources in my Azure account.
---

# Delete and restore a blob container with Go


> 
>
> - [.NET](storage-blob-container-delete.md)
> - [Java](storage-blob-container-delete-java.md)
> - [JavaScript](storage-blob-container-delete-javascript.md)
> - [Python](storage-blob-container-delete-python.md)
> - [Go](storage-blob-container-delete-go.md)

This article shows how to delete containers with the [Azure Storage client module for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme). If you've enabled [container soft delete](soft-delete-container-overview.md), you can restore deleted containers.


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

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/client-auth/client_auth.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-go.md)



#### Authorization

The authorization mechanism must have the necessary permissions to delete or restore a container. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Delete Container (REST API)](https://learn.microsoft.com/rest/api/storageservices/delete-container#authorization) and [Restore Container (REST API)](https://learn.microsoft.com/rest/api/storageservices/restore-container#authorization).

## Delete a container

To delete a container, call the following method:

- [DeleteContainer](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.DeleteContainer)

After you delete a container, you can't create a container with the same name for *at least* 30 seconds. Attempting to create a container with the same name fails with HTTP error code `409 (Conflict)`. Any other operations on the container or the blobs it contains fail with HTTP error code `404 (Not Found)`.

The following example shows how to delete a specified container:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/delete-container/delete_container.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-go.md)

## Restore a deleted container

When container soft delete is enabled for a storage account, a deleted container and its contents can be recovered within a specified retention period. To learn more about container soft delete, see [Enable and manage soft delete for containers](soft-delete-container-enable.md). You can restore a soft-deleted container by calling the following method from the embedded [ServiceClient](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.ServiceClient) for the client object:

- [RestoreContainer](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/service#Client.RestoreContainer)

The following example lists containers, including soft-deleted containers, and iterates over the list to restore the specified soft-deleted container:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/delete-container/delete_container.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-go.md)


> **Note:**
> The code samples in this guide are intended to help you get started with Azure Blob Storage and Go. You should modify error handling and `Context` values to meet the needs of your application.

## Resources

To learn more about deleting a container using the Azure Blob Storage client module for Go, see the following resources.

### Code samples

- View [code samples](https://github.com/Azure-Samples/blob-storage-devguide-go/blob/main/cmd/delete-container/delete_container.go) from this article (GitHub)

### REST API operations

The Azure SDK for Go contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Go paradigms. The client library methods for deleting or restoring a container use the following REST API operations:

- [Delete Container](https://learn.microsoft.com/rest/api/storageservices/delete-container) (REST API)
- [Restore Container](https://learn.microsoft.com/rest/api/storageservices/restore-container) (REST API)


### Client module resources

- [Client module reference documentation](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme)
- [Client module source code](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)
- [Package (pkg.go.dev)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob)

### See also

- [Soft delete for containers](soft-delete-container-overview.md)
- [Enable and manage soft delete for containers](soft-delete-container-enable.md)


## Related content

- This article is part of the Blob Storage developer guide for Go. To learn more, see the full list of developer guide articles at [Build your Go app](storage-blob-go-get-started.md#build-your-app).
