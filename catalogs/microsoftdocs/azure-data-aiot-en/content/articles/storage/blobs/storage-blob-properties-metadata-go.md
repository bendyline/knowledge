---
title: Manage properties and metadata for a blob with Go
titleSuffix: Azure Storage
description: Learn how to set and retrieve system properties and store custom metadata on blobs in your Azure Storage account using the Go client library.
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: golang
ms.custom: devx-track-go, devguide-go
# Customer intent: As a developer using the Go client library, I want to manage properties and metadata for blobs, so that I can efficiently handle additional information and control access to my Azure Storage resources.
---

# Manage blob properties and metadata with Go


> 
>
> - [.NET](storage-blob-properties-metadata.md)
> - [Java](storage-blob-properties-metadata-java.md)
> - [JavaScript](storage-blob-properties-metadata-javascript.md)
> - [Python](storage-blob-properties-metadata-python.md)
> - [Go](storage-blob-properties-metadata-go.md)

In addition to the data they contain, blobs support system properties and user-defined metadata. This article shows how to manage system properties and user-defined metadata using the [Azure Storage client module for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme).


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

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/client-auth/client_auth.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-properties-metadata-go.md)



#### Authorization

The authorization mechanism must have the necessary permissions to work with container properties or metadata. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Reader** or higher for the *get* operations, and **Storage Blob Data Contributor** or higher for the *set* operations. To learn more, see the authorization guidance for [Set Blob Properties (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-blob-properties#authorization), [Get Blob Properties (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-blob-properties#authorization), [Set Blob Metadata (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-blob-metadata#authorization), or [Get Blob Metadata (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-blob-metadata#authorization).

## About properties and metadata

- **System properties**: System properties exist on each Blob storage resource. Some of them can be read or set, while others are read-only. Under the covers, some system properties correspond to certain standard HTTP headers. The Azure Storage client library for Go maintains these properties for you.

- **User-defined metadata**: User-defined metadata consists of one or more name-value pairs that you specify for a Blob storage resource. You can use metadata to store additional values with the resource. Metadata values are for your own purposes only, and don't affect how the resource behaves.

    Metadata name/value pairs are valid HTTP headers and should adhere to all restrictions governing HTTP headers. For more information about metadata naming requirements, see [Metadata names](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#metadata-names).

> **Note:**
> Blob index tags also provide the ability to store arbitrary user-defined key/value attributes alongside an Azure Blob storage resource. While similar to metadata, only blob index tags are automatically indexed and made searchable by the native blob service. Metadata cannot be indexed and queried unless you utilize a separate service such as Azure Search.
>
> To learn more about this feature, see [Manage and find data on Azure Blob storage with blob index (preview)](storage-manage-find-blobs.md).

## Set and retrieve properties

To set properties on a blob, call the following method from a blob client object:

- [SetHTTPHeaders](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.SetHTTPHeaders)

Any properties not explicitly set are cleared. To preserve any existing properties, you can first retrieve the blob properties, then use them to populate the headers that aren't being updated.

The following code example sets the `BlobContentType` and `BlobContentLanguage` system properties on a blob, while preserving the existing properties:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/blob-properties-metadata/blob_properties_metadata.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-properties-metadata-go.md)

To retrieve properties on a blob, call  the following method from a blob client object:

- [GetProperties](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.GetProperties)

The following code example gets a blob's system properties and displays some of the values:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/blob-properties-metadata/blob_properties_metadata.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-properties-metadata-go.md)

## Set and retrieve metadata

You can specify metadata as one or more name-value pairs on a blob or container resource. To set metadata, send a map containing name-value pairs using the following method from a blob client object:

- [SetMetadata](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.SetMetadata)

The following code example sets metadata on a blob:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/blob-properties-metadata/blob_properties_metadata.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-properties-metadata-go.md)

To retrieve metadata, call the [GetProperties](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.GetProperties) method from a blob client object, and access the `Metadata` field in the response. The `GetProperties` method retrieves blob properties and metadata by calling both the [Get Blob Properties](https://learn.microsoft.com/rest/api/storageservices/get-blob-properties) operation and the [Get Blob Metadata](https://learn.microsoft.com/rest/api/storageservices/get-blob-metadata) operation.

The following code example reads metadata on a blob and prints each key/value pair: 

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/blob-properties-metadata/blob_properties_metadata.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-properties-metadata-go.md)


> **Note:**
> The code samples in this guide are intended to help you get started with Azure Blob Storage and Go. You should modify error handling and `Context` values to meet the needs of your application.

## Resources

To learn more about how to manage system properties and user-defined metadata using the Azure Blob Storage client module for Go, see the following resources.

### Code samples

- View [code samples](https://github.com/Azure-Samples/blob-storage-devguide-go/blob/main/cmd/blob-properties-metadata/blob_properties_metadata.go) from this article (GitHub)

### REST API operations

The Azure SDK for Go contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Go paradigms. The client library methods for managing system properties and user-defined metadata use the following REST API operations:

- [Set Blob Properties](https://learn.microsoft.com/rest/api/storageservices/set-blob-properties) (REST API)
- [Get Blob Properties](https://learn.microsoft.com/rest/api/storageservices/get-blob-properties) (REST API)
- [Set Blob Metadata](https://learn.microsoft.com/rest/api/storageservices/set-blob-metadata) (REST API)
- [Get Blob Metadata](https://learn.microsoft.com/rest/api/storageservices/get-blob-metadata) (REST API)


### Client module resources

- [Client module reference documentation](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme)
- [Client module source code](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)
- [Package (pkg.go.dev)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob)


## Related content

- This article is part of the Blob Storage developer guide for Go. To learn more, see the full list of developer guide articles at [Build your Go app](storage-blob-go-get-started.md#build-your-app).
