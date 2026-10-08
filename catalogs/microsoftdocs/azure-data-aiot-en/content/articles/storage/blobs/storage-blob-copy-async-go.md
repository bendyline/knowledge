---
title: Copy a blob with asynchronous scheduling using Go
titleSuffix: Azure Storage
description: Learn how to copy a blob with asynchronous scheduling in Azure Storage by using the Go client module.
author: stevenmatthew

ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: golang
ms.custom: devx-track-go, devguide-go
# Customer intent: "As a developer using Go, I want to implement asynchronous blob copying in Azure Storage, so that I can efficiently manage and transfer data between storage accounts or external sources without blocking my application."
---

# Copy a blob with asynchronous scheduling using Go


> 
>
> - [.NET](storage-blob-copy-async-dotnet.md)
> - [Java](storage-blob-copy-async-java.md)
> - [JavaScript](storage-blob-copy-async-javascript.md)
> - [Python](storage-blob-copy-async-python.md)
> - [Go](storage-blob-copy-async-go.md)

This article shows how to copy a blob with asynchronous scheduling using the [Azure Storage client module for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme). You can copy a blob from a source within the same storage account, from a source in a different storage account, or from any accessible object retrieved via HTTP GET request on a given URL. You can also abort a pending copy operation.

The methods covered in this article use the [Copy Blob](https://learn.microsoft.com/rest/api/storageservices/copy-blob) REST API operation and can be used when you want to perform a copy with asynchronous scheduling. For most copy scenarios where you want to move data into a storage account and have a URL for the source object, see [Copy a blob from a source object URL with Go](storage-blob-copy-url-go.md).


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

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/client-auth/client_auth.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-async-go.md)



#### Authorization

The authorization mechanism must have the necessary permissions to perform a copy operation, or to abort a pending copy. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Copy Blob](https://learn.microsoft.com/rest/api/storageservices/copy-blob#authorization) or [Abort Copy Blob](https://learn.microsoft.com/rest/api/storageservices/abort-copy-blob#authorization).

## About copying blobs with asynchronous scheduling

The `Copy Blob` operation can finish asynchronously and is performed on a best-effort basis, which means that the operation isn't guaranteed to start immediately or complete within a specified time frame. The copy operation is scheduled in the background and performed as the server has available resources. The operation can complete synchronously if the copy occurs within the same storage account. 

A `Copy Blob` operation can perform any of the following actions:

- Copy a source blob to a destination blob with a different name. The destination blob can be an existing blob of the same blob type (block, append, or page), or it can be a new blob created by the copy operation.
- Copy a source blob to a destination blob with the same name, which replaces the destination blob. This type of copy operation removes any uncommitted blocks and overwrites the destination blob's metadata.
- Copy a source file in the Azure File service to a destination blob. The destination blob can be an existing block blob, or can be a new block blob created by the copy operation. Copying from files to page blobs or append blobs isn't supported.
- Copy a snapshot over its base blob. By promoting a snapshot to the position of the base blob, you can restore an earlier version of a blob.
- Copy a snapshot to a destination blob with a different name. The resulting destination blob is a writeable blob and not a snapshot.

The source blob for a copy operation can be one of the following types: block blob, append blob, page blob, blob snapshot, or blob version. The copy operation always copies the entire source blob or file. Copying a range of bytes or set of blocks isn't supported.

If the destination blob already exists, it must be of the same blob type as the source blob, and the existing destination blob is overwritten. The destination blob can't be modified while a copy operation is in progress, and a destination blob can only have one outstanding copy operation.

To learn more about the `Copy Blob` operation, including information about properties, index tags, metadata, and billing, see [Copy Blob remarks](https://learn.microsoft.com/rest/api/storageservices/copy-blob#remarks).

## Copy a blob with asynchronous scheduling

This section gives an overview of methods provided by the Azure Storage client module for Go to perform a copy operation with asynchronous scheduling.

The following methods wrap the [Copy Blob](https://learn.microsoft.com/rest/api/storageservices/copy-blob) REST API operation, and begin an asynchronous copy of data from the source blob:

- [StartCopyFromURL](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.StartCopyFromURL)

## Copy a blob from a source within Azure

If you're copying a blob within the same storage account, the operation can complete synchronously. Access to the source blob can be authorized via Microsoft Entra ID (recommended), a shared access signature (SAS), or an account key. For an alternative synchronous copy operation, see [Copy a blob from a source object URL with Go](storage-blob-copy-url-go.md).

If the copy source is a blob in a different storage account, the operation can complete asynchronously. The source blob must either be public or authorized via SAS token. The SAS token needs to include the **Read ('r')** permission. To learn more about SAS tokens, see [Delegate access with shared access signatures](../common/storage-sas-overview.md).

The following example shows a scenario for copying a source blob from a different storage account with asynchronous scheduling. In this example, we create a source blob URL with an appended user delegation SAS token. The example assumes you provide your own SAS. The example also shows how to lease the source blob during the copy operation to prevent changes to the blob from a different client. The `Copy Blob` operation saves the `ETag` value of the source blob when the copy operation starts. If the `ETag` value is changed before the copy operation finishes, the operation fails. We also set the access tier for the destination blob to `Cool` using the [StartCopyFromURLOptions](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#StartCopyFromURLOptions) struct.

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-blob-async/copy_blob_async.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-async-go.md)

The following example shows sample usage:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-blob-async/copy_blob_async.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-async-go.md)

> **Note:**
> User delegation SAS tokens offer greater security, as they're signed with Microsoft Entra credentials instead of an account key. To create a user delegation SAS token, the Microsoft Entra security principal needs appropriate permissions. For authorization requirements, see [Get User Delegation Key](https://learn.microsoft.com/rest/api/storageservices/get-user-delegation-key#authorization).

## Copy a blob from a source outside of Azure

You can perform a copy operation on any source object that can be retrieved via HTTP GET request on a given URL, including accessible objects outside of Azure. The following example shows a scenario for copying a blob from an accessible source object URL:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-blob-async/copy_blob_async.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-async-go.md)

The following example shows sample usage:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-blob-async/copy_blob_async.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-async-go.md)

## Check the status of a copy operation

To check the status of an asynchronous `Copy Blob` operation, you can poll the [GetProperties](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob#Client.GetProperties) method and check the copy status.

The following code example shows how to check the status of a copy operation:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-blob-async/copy_blob_async.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-async-go.md)

## Abort a copy operation

Aborting a pending `Copy Blob` operation results in a destination blob of zero length. However, the metadata for the destination blob has the new values copied from the source blob or set explicitly during the copy operation. To keep the original metadata from before the copy, make a snapshot of the destination blob before calling one of the copy methods.

To abort a pending copy operation, call the following operation:

- [AbortCopyFromURL](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blockblob#Client.AbortCopyFromURL)

This method wraps the [Abort Copy Blob](https://learn.microsoft.com/rest/api/storageservices/abort-copy-blob) REST API operation, which cancels a pending `Copy Blob` operation. The following code example shows how to abort a pending `Copy Blob` operation:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/copy-blob-async/copy_blob_async.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-async-go.md)

## Resources

To learn more about copying blobs with asynchronous scheduling using the Azure Blob Storage client module for Go, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/blob-storage-devguide-go/blob/main/cmd/copy-blob-async/copy_blob_async.go)

### REST API operations

The Azure SDK for Go contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Go paradigms. The methods covered in this article use the following REST API operations:

- [Copy Blob](https://learn.microsoft.com/rest/api/storageservices/copy-blob) (REST API)
- [Abort Copy Blob](https://learn.microsoft.com/rest/api/storageservices/abort-copy-blob) (REST API)


### Client module resources

- [Client module reference documentation](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme)
- [Client module source code](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)
- [Package (pkg.go.dev)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob)


## Related content

- This article is part of the Blob Storage developer guide for Go. To learn more, see the full list of developer guide articles at [Build your Go app](storage-blob-go-get-started.md#build-your-app).
