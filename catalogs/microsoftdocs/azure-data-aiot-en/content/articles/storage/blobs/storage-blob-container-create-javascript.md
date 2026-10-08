---
title: Create a blob container with JavaScript or TypeScript
titleSuffix: Azure Storage 
description: Learn how to create a blob container in your Azure Storage account using the JavaScript client library.
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 10/28/2024
ms.author: shaas
ms.devlang: javascript
ms.custom: devx-track-js, devguide-js, devx-track-ts, devguide-ts
# Customer intent: As a developer, I want to create a blob container using JavaScript or TypeScript, so that I can organize and manage my blobs in Azure Storage efficiently.
---

# Create a blob container with JavaScript or TypeScript


> 
>
> - [.NET](storage-blob-container-create.md)
> - [Java](storage-blob-container-create-java.md)
> - [JavaScript](storage-blob-container-create-javascript.md)
> - [Python](storage-blob-container-create-python.md)
> - [Go](storage-blob-container-create-go.md)

Blobs in Azure Storage are organized into containers. Before you can upload a blob, you must first create a container. This article shows how to create containers with the [Azure Storage client library for JavaScript](https://www.npmjs.com/package/@azure/storage-blob).

## Prerequisites

- The examples in this article assume you already have a project set up to work with the Azure Blob Storage client library for JavaScript. To learn about setting up your project, including package installation, importing modules, and creating an authorized client object to work with data resources, see [Get started with Azure Blob Storage and JavaScript](storage-blob-javascript-get-started.md).
- The [authorization mechanism](../common/authorize-data-access.md) must have permissions to create a blob container. To learn more, see the authorization guidance for the following REST API operation:
    - [Create Container](https://learn.microsoft.com/rest/api/storageservices/create-container#authorization)


## About container naming

A container name must be a valid DNS name, as it forms part of the unique URI used to address the container or its blobs. Follow these rules when naming a container:

- Container names can be between 3 and 63 characters long.
- Container names must start with a letter or number, and can contain only lowercase letters, numbers, and the dash (-) character.
- Consecutive dash characters aren't permitted in container names.

The URI for a container resource is formatted as follows:

`https://my-account-name.blob.core.windows.net/my-container-name`

## Create a container

To create a container, call the following method from the [BlobServiceClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient) class:

- [BlobServiceClient.createContainer](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient#@azure-storage-blob-blobserviceclient-createcontainer)

You can also create a container using either of the following methods from the [ContainerClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient) class:

- [ContainerClient.create](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient?#@azure-storage-blob-containerclient-create)
- [ContainerClient.createIfNotExists](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient#@azure-storage-blob-containerclient-createifnotexists)

Containers are created immediately beneath the storage account. It's not possible to nest one container beneath another. An exception is thrown if a container with the same name already exists. 

The following example creates a container asynchronously from a `BlobServiceClient` object:

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/create-container.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-create-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/container-create.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-create-javascript.md)

---

## Create the root container

A root container serves as a default container for your storage account. Each storage account can have one root container, which must be named *$root*. The root container must be explicitly created or deleted.

You can reference a blob stored in the root container without including the root container name. The root container enables you to reference a blob at the top level of the storage account hierarchy. For example, you can reference a blob in the root container as follows:

`https://accountname.blob.core.windows.net/default.html`

To create the root container, call any create method and specify the container name as *$root*.

## Resources

To learn more about creating a container using the Azure Blob Storage client library for JavaScript, see the following resources.

### Code samples

- View [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/create-container.js) and [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/container-create.ts) code samples from this article (GitHub)

### REST API operations

The Azure SDK for JavaScript contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar JavaScript paradigms. The client library methods for creating a container use the following REST API operation:

- [Create Container](https://learn.microsoft.com/rest/api/storageservices/create-container) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/javascript/api/@azure/storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob)


## Related content

- This article is part of the Blob Storage developer guide for JavaScript/TypeScript. To learn more, see the full list of developer guide articles at [Build your JavaScript/TypeScript app](storage-blob-javascript-get-started.md#build-your-app).
