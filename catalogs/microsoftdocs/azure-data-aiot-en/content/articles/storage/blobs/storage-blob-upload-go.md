---
title: Upload a blob with Go
titleSuffix: Azure Storage
description: Learn how to upload a blob to your Azure Storage account using the Go client library.
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 03/25/2025
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: golang
ms.custom: devx-track-go, devguide-go
# Customer intent: As a developer using Go, I want to upload blobs to Azure Storage so that I can efficiently manage and store data from various sources in my applications.
---

# Upload a block blob with Go


> 
>
> - [.NET](storage-blob-upload.md)
> - [Java](storage-blob-upload-java.md)
> - [JavaScript](storage-blob-upload-javascript.md)
> - [Python](storage-blob-upload-python.md)
> - [Go](storage-blob-upload-go.md)

This article shows how to upload a blob using the [Azure Storage client module for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme). You can upload data to a block blob from a file path, a stream, a binary object, or a text string. You can also upload blobs with index tags.


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

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/client-auth/client_auth.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-go.md)



#### Authorization

The authorization mechanism must have the necessary permissions to upload a blob. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Put Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-blob#authorization) and [Put Block (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-block#authorization).

## Upload data to a block blob

To upload a blob, call any of the following methods from the client object:

- [Upload](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blockblob#Client.Upload)
- [UploadBuffer](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.UploadBuffer)
- [UploadFile](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.UploadFile)
- [UploadStream](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.UploadStream)

To perform the upload, the client library might use either [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) or a series of [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) calls followed by [`Put Block List`](https://learn.microsoft.com/rest/api/storageservices/put-block-list). This behavior depends on the overall size of the object and how the data transfer options are set.

> **Note:**
> The Azure Storage client libraries don't support concurrent writes to the same blob. If your app requires multiple processes writing to the same blob, you should implement a strategy for concurrency control to provide a predictable experience. To learn more about concurrency strategies, see [Manage concurrency in Blob Storage](concurrency-manage.md).

## Upload a block blob from a local file path

The following example uploads a local file to a block blob:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/upload-blob/upload_blob.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-go.md)

## Upload a block blob from a stream

The following example creates a `Reader` instance and reads from a string as if it were a stream of bytes. The stream is then uploaded to a block blob:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/upload-blob/upload_blob.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-go.md)

## Upload binary data to a block blob

The following example uploads binary data to a block blob:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/upload-blob/upload_blob.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-go.md)

## Upload a block blob with index tags

The following example uploads a block blob with index tags:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/upload-blob/upload_blob.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-go.md)

## Upload a block blob with configuration options

You can define client library configuration options when uploading a blob. These options can be tuned to improve performance, enhance reliability, and optimize costs. The following code examples show how to define configuration options for an upload operation.

### Specify data transfer options for upload

You can set configuration options when uploading a blob to optimize performance. The following configuration options are available for upload operations:

- `BlockSize`: The size of each block when uploading a block blob. The default value is 4 MB.
- `Concurrency`: The maximum number of parallel connections to use during upload. The default value is 5.

These configuration options are available when uploading using the following methods:

- [UploadBuffer](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.UploadBuffer)
- [UploadStream](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.UploadStream)
- [UploadFile](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.UploadFile)

The [Upload](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blockblob#Client.Upload) method doesn't support these options, and uploads data in a single request.

For more information on transfer size limits for Blob Storage, see [Scale targets for Blob storage](scalability-targets.md#scale-targets-for-blob-storage).

The following code example shows how to specify data transfer options using the [UploadFileOptions](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blockblob#UploadFileOptions). The values provided in this sample aren't intended to be a recommendation. To properly tune these values, you need to consider the specific needs of your app.

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/upload-blob/upload_blob.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-go.md)

To learn more about tuning data transfer options, see [Performance tuning for uploads and downloads with Go](storage-blobs-tune-upload-download-go.md).


> **Note:**
> The code samples in this guide are intended to help you get started with Azure Blob Storage and Go. You should modify error handling and `Context` values to meet the needs of your application.

## Resources

To learn more about uploading blobs using the Azure Blob Storage client module for Go, see the following resources.

### Code samples

- View [code samples](https://github.com/Azure-Samples/blob-storage-devguide-go/blob/main/cmd/upload-blob/upload_blob.go) from this article (GitHub)

### REST API operations

The Azure SDK for Go contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Go paradigms. The client library methods for uploading blobs use the following REST API operations:

- [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) (REST API)
- [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) (REST API)


### Client module resources

- [Client module reference documentation](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme)
- [Client module source code](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)
- [Package (pkg.go.dev)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob)

### See also

- [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md)
- [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md)


## Related content

- This article is part of the Blob Storage developer guide for Go. To learn more, see the full list of developer guide articles at [Build your Go app](storage-blob-go-get-started.md#build-your-app).
