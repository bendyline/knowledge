---
title: List blob containers with Go
titleSuffix: Azure Storage
description: Learn how to list blob containers in your Azure Storage account using the Go client library.
services: storage
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.devlang: golang
ms.custom: devx-track-go, devguide-go
# Customer intent: "As a Go developer, I want to list blob containers in my Azure Storage account, so that I can efficiently manage and retrieve container information based on specific criteria and options."
---

# List blob containers with Go


> 
>
> - [.NET](storage-blob-containers-list.md)
> - [Java](storage-blob-containers-list-java.md)
> - [JavaScript](storage-blob-containers-list-javascript.md)
> - [Python](storage-blob-containers-list-python.md)
> - [Go](storage-blob-containers-list-go.md)

When you list the containers in an Azure Storage account from your code, you can specify several options to manage how results are returned from Azure Storage. This article shows how to list containers using the [Azure Storage client module for Go](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme).


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

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/client-auth/client_auth.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-containers-list-go.md)



#### Authorization

The authorization mechanism must have the necessary permissions to list blob containers. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [List Containers (REST API)](https://learn.microsoft.com/rest/api/storageservices/list-containers2#authorization).

## About container listing options

When listing containers from your code, you can specify options to manage how results are returned from Azure Storage. You can specify the number of results to return in each set of results, and then retrieve the subsequent sets. You can also filter the results by a prefix, and return container metadata with the results. These options are described in the following sections.

To list containers in a storage account, call the following method:

- [NewListContainersPager](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#Client.NewListContainersPager)

This method returns a [Pager](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/azcore/runtime#Pager), which allows your app to process one page of results at a time. Containers are ordered lexicographically by name.

You can specify options for listing containers by using the [ListContainersOptions](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#ListContainersOptions) struct. This struct includes fields for managing the number of results, filtering by prefix, and including container information using [ListContainersInclude](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/service#ListContainersInclude).

### Manage how many results are returned

By default, a listing operation returns up to 5,000 results at a time. To return a smaller set of results, provide a nonzero value for the `MaxResults` field in the [ListContainersOptions](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#ListContainersOptions) struct.

### Filter results with a prefix

To filter the list of containers, specify a string or character for the `Prefix` field in [ListContainersOptions](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#ListContainersOptions). The prefix string can include one or more characters. Azure Storage then returns only the containers whose names start with that prefix.

### Include container metadata

To include container metadata with the results, set the `Metadata` field to `true` as part of [ListContainersInclude](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/service#ListContainersInclude). Azure Storage includes metadata with each container returned, so you don't need to fetch the container metadata separately.

### Include deleted containers

To include soft-deleted containers with the results, set the `Deleted` field to `true` as part of [ListContainersInclude](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/service#ListContainersInclude).

## Code examples

The following example lists all containers and metadata:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/list-containers/list_containers.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-containers-list-go.md)

The following example lists only containers that begin with the specified prefix:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/list-containers/list_containers.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-containers-list-go.md)

You can also specify a limit for the number of results per page. This example passes in a value for `MaxResults` and paginates the results:

[Code reference unavailable in this source snapshot: ~/blob-devguide-go/cmd/list-containers/list_containers.go](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-containers-list-go.md)


> **Note:**
> The code samples in this guide are intended to help you get started with Azure Blob Storage and Go. You should modify error handling and `Context` values to meet the needs of your application.

## Resources

To learn more about listing containers using the Azure Blob Storage client module for Go, see the following resources.

### Code samples

- View [code samples](https://github.com/Azure-Samples/blob-storage-devguide-go/blob/main/cmd/list-containers/list_containers.go) from this article (GitHub)

### REST API operations

The Azure SDK for Go contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Go paradigms. The client library methods for listing containers use the following REST API operation:

- [List Containers](https://learn.microsoft.com/rest/api/storageservices/list-containers2) (REST API)


### Client module resources

- [Client module reference documentation](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob#section-readme)
- [Client module source code](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)
- [Package (pkg.go.dev)](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/storage/azblob)

## See also

- [Enumerating Blob Resources](https://learn.microsoft.com/rest/api/storageservices/enumerating-blob-resources)


## Related content

- This article is part of the Blob Storage developer guide for Go. To learn more, see the full list of developer guide articles at [Build your Go app](storage-blob-go-get-started.md#build-your-app).
