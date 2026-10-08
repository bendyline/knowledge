---
title: Copy a blob from a source object URL with Go
titleSuffix: Azure Storage
description: Learn how to copy a blob from a source object URL in Azure Storage by using the Go client library.
author: stevenmatthew

ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: golang
ms.custom: devx-track-go, devguide-go
# Customer intent: "As a Go developer, I want to copy a blob from a source object URL in Azure Storage, so that I can efficiently move data between different storage locations or from external sources."
---

# Copy a blob from a source object URL with Go


> 
>
> - [.NET](storage-blob-copy-url-dotnet.md)
> - [Java](storage-blob-copy-url-java.md)
> - [JavaScript](storage-blob-copy-url-javascript.md)
> - [Python](storage-blob-copy-url-python.md)
> - [Go](storage-blob-copy-url-go.md)

This article shows how to copy a blob from a source object URL using the [Azure Storage client module for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme). You can copy a blob from a source within the same storage account, from a source in a different storage account, or from any accessible object retrieved via HTTP GET request on a given URL.

The client library methods covered in this article use the [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) and [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) REST API operations. These methods are preferred for copy scenarios where you want to move data into a storage account and have a URL for the source object. For copy operations where you want asynchronous scheduling, see [Copy a blob with asynchronous scheduling using Go](storage-blob-copy-async-go.md).


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

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/client-auth/client_auth.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-go.md)



#### Authorization

The authorization mechanism must have the necessary permissions to perform a copy operation. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url#authorization) or [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url#authorization).

## About copying blobs from a source object URL

The `Put Blob From URL` operation creates a new block blob where the contents of the blob are read from a given URL. The operation completes synchronously.

The source can be any object retrievable via a standard HTTP GET request on the given URL. This includes block blobs, append blobs, page blobs, blob snapshots, blob versions, or any accessible object inside or outside Azure.

When the source object is a block blob, all committed blob content is copied. The content of the destination blob is identical to the content of the source, but the list of committed blocks isn't preserved and uncommitted blocks aren't copied.

The destination is always a block blob, either an existing block blob, or a new block blob created by the operation. The contents of an existing blob are overwritten with the contents of the new blob.

The `Put Blob From URL` operation always copies the entire source blob. Copying a range of bytes or set of blocks isn't supported. To perform partial updates to a block blob’s contents by using a source URL, use the [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) API along with [`Put Block List`](https://learn.microsoft.com/rest/api/storageservices/put-block-list).

To learn more about the `Put Blob From URL` operation, including blob size limitations and billing considerations, see [Put Blob From URL remarks](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url#remarks).

## Copy a blob from a source object URL

This section gives an overview of methods provided by the Azure Storage client library for Go to perform a copy operation from a source object URL.

The following method wraps the [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) REST API operation, and creates a new block blob where the contents of the blob are read from a given URL:

- [UploadBlobFromURL](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blockblob#Client.UploadBlobFromURL)

This method is preferred for scenarios where you want to move data into a storage account and have a URL for the source object.

For large objects, you might choose to work with individual blocks. The following method wraps the [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) REST API operation. This method creates a new block to be committed as part of a blob where the contents are read from a source URL:

- [StageBlockFromURL](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blockblob#Client.StageBlockFromURL)

## Copy a blob from a source within Azure

If you're copying a blob from a source within Azure, access to the source blob can be authorized via Microsoft Entra ID (recommended), a shared access signature (SAS), or an account key.

The following code example shows a scenario for copying a source blob within Azure. In this example, we also set the access tier for the destination blob to `Cool` using the [UploadBlobFromURLOptions](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blockblob#UploadBlobFromURLOptions) struct.

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-put-from-url/copy_put_from_url.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-go.md)

The following example shows sample usage:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-put-from-url/copy_put_from_url.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-go.md)

## Copy a blob from a source outside of Azure

You can perform a copy operation on any source object that can be retrieved via HTTP GET request on a given URL, including accessible objects outside of Azure. The following code example shows a scenario for copying a blob from an accessible source object URL.

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-put-from-url/copy_put_from_url.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-go.md)

The following example shows sample usage:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-put-from-url/copy_put_from_url.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-go.md)

## Resources

To learn more about copying blobs using the Azure Blob Storage client library for Go, see the following resources.

### Code samples

- View [code samples](https://github.com/Azure-Samples/blob-storage-devguide-go/blob/main/cmd/copy-put-from-url/copy_put_from_url.go) from this article (GitHub)

### REST API operations

The Azure SDK for Go contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Go paradigms. The client library methods covered in this article use the following REST API operations:

- [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) (REST API)
- [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) (REST API)


### Client module resources

- [Client module reference documentation](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme)
- [Client module source code](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)
- [Package (pkg.go.dev)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob)


## Related content

- This article is part of the Blob Storage developer guide for Go. To learn more, see the full list of developer guide articles at [Build your Go app](storage-blob-go-get-started.md#build-your-app).
