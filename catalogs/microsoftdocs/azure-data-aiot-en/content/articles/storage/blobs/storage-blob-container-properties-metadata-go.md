---
title: Use Go to manage properties and metadata for a blob container
titleSuffix: Azure Storage
description: Learn how to set and retrieve system properties and store custom metadata on blob containers in your Azure Storage account using the Go client library.
services: storage
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.devlang: golang
ms.custom: devx-track-go, devguide-go
# Customer intent: As a Go developer, I want to manage blob container properties and metadata using the Azure Storage client library, so that I can efficiently store and retrieve custom data alongside my blobs.
---

# Manage container properties and metadata with Go


> 
>
> - [.NET](storage-blob-container-properties-metadata.md)
> - [Java](storage-blob-container-properties-metadata-java.md)
> - [JavaScript](storage-blob-container-properties-metadata-javascript.md)
> - [Python](storage-blob-container-properties-metadata-python.md)
> - [Go](storage-blob-container-properties-metadata-go.md)

Blob containers support system properties and user-defined metadata, in addition to the data they contain. This article shows how to manage system properties and user-defined metadata with the [Azure Storage client module for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme).


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

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/client-auth/client_auth.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata-go.md)



#### Authorization

The authorization mechanism must have the necessary permissions to work with container properties or metadata. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Reader** or higher for the *get* operations, and **Storage Blob Data Contributor** or higher for the *set* operations. To learn more, see the authorization guidance for [Get Container Properties (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-container-properties#authorization), [Set Container Metadata (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-container-metadata#authorization), or [Get Container Metadata (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-container-metadata#authorization).

## About properties and metadata

- **System properties**: System properties exist on each Blob Storage resource. Some of them can be read or set, while others are read-only. Behind the scenes, some system properties correspond to certain standard HTTP headers. The Azure Storage client library for Go maintains these properties for you.

- **User-defined metadata**: User-defined metadata consists of one or more name-value pairs that you specify for a Blob storage resource. You can use metadata to store additional values with the resource. Metadata values are for your own purposes only, and don't affect how the resource behaves.

    Metadata name/value pairs are valid HTTP headers and should adhere to all restrictions governing HTTP headers. For more information about metadata naming requirements, see [Metadata names](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#metadata-names).

## Retrieve container properties

To retrieve container properties, call the following method from a container client object:

- [GetProperties](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/container#Client.GetProperties)

The following code example fetches a container's system properties and writes some of the property values to a console window:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/container-properties-metadata/container_properties_metadata.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata-go.md)

## Set and retrieve metadata

You can specify metadata as one or more name-value pairs on a blob or container resource. To set metadata, call the following method from a container client object:

- [SetMetadata](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/container#Client.SetMetadata)

Setting container metadata overwrites all existing metadata associated with the container. It's not possible to modify an individual name-value pair.

The following code example sets metadata on a container:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/container-properties-metadata/container_properties_metadata.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata-go.md)

To retrieve metadata, call the following method from a container client object:

- [GetProperties](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/container#Client.GetProperties)

Metadata is included in the response from `GetProperties`. The following example reads in metadata values and writes them to a console window: 

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/container-properties-metadata/container_properties_metadata.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata-go.md)


> **Note:**
> The code samples in this guide are intended to help you get started with Azure Blob Storage and Go. You should modify error handling and `Context` values to meet the needs of your application.

## Resources

To learn more about setting and retrieving container properties and metadata using the Azure Blob Storage client module for Go, see the following resources.

### Code samples

- View [code samples](https://github.com/Azure-Samples/blob-storage-devguide-go/blob/main/cmd/container-properties-metadata/container_properties_metadata.go) from this article (GitHub)

### REST API operations

The Azure SDK for Go contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Go paradigms. The client library methods for setting and retrieving properties and metadata use the following REST API operations:

- [Get Container Properties](https://learn.microsoft.com/rest/api/storageservices/get-container-properties) (REST API)
- [Set Container Metadata](https://learn.microsoft.com/rest/api/storageservices/set-container-metadata) (REST API)
- [Get Container Metadata](https://learn.microsoft.com/rest/api/storageservices/get-container-metadata) (REST API)

The `get_container_properties` method retrieves container properties and metadata by calling both the [Get Container Properties](https://learn.microsoft.com/rest/api/storageservices/get-container-properties) operation and the [Get Container Metadata](https://learn.microsoft.com/rest/api/storageservices/get-container-metadata) operation.


### Client module resources

- [Client module reference documentation](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme)
- [Client module source code](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)
- [Package (pkg.go.dev)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob)


## Related content

- This article is part of the Blob Storage developer guide for Go. To learn more, see the full list of developer guide articles at [Build your Go app](storage-blob-go-get-started.md#build-your-app).
