---
title: About Blob (object) storage
titleSuffix: Azure Storage
description: Azure Blob storage stores massive amounts of unstructured object data, such as text or binary data. Blob storage also supports Azure Data Lake Storage for big data analytics.  
services: storage
author: normesta

ms.service: azure-blob-storage
ms.topic: overview
ms.date: 05/18/2026
ms.author: normesta
# Customer intent: "As a data engineer, I want to understand the capabilities of blob storage, so that I can manage and analyze large volumes of unstructured data effectively."
---

# What is Azure Blob storage?


Azure Blob Storage is Microsoft's object storage solution for the cloud. Blob Storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that doesn't adhere to a particular data model or definition, such as text or binary data.

## About Blob Storage

Blob Storage is designed for:

- Serving images or documents directly to a browser.
- Storing files for distributed access.
- Streaming video and audio.
- Writing to log files.
- Storing data for backup and restore, disaster recovery, and archiving.
- Storing data for analysis by an on-premises or Azure-hosted service.

Users or client applications can access objects in Blob Storage via HTTP or HTTPS from anywhere in the world. You can access objects in Blob Storage through the [Azure Storage REST API](https://learn.microsoft.com/rest/api/storageservices/blob-service-rest-api), [Azure PowerShell](https://learn.microsoft.com/powershell/module/az.storage), [Azure CLI](https://learn.microsoft.com/cli/azure/storage), or an Azure Storage client library. Client libraries are available for different languages, including:

- [.NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage)
- [Java](https://learn.microsoft.com/java/api/overview/azure/storage)
- [Node.js](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage)
- [Python](storage-quickstart-blobs-python.md)
- [Go](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/storage/azblob)

Clients can also securely connect to Blob Storage by using SSH File Transfer Protocol (SFTP) and mount Blob Storage containers by using the Network File System (NFS) 3.0 protocol. 

## About Azure Data Lake Storage

Blob Storage supports Azure Data Lake Storage, Microsoft's enterprise big data analytics solution for the cloud. Azure Data Lake Storage offers a hierarchical file system as well as the advantages of Blob Storage, including:

- Low-cost, tiered storage
- High availability
- Strong consistency
- Disaster recovery capabilities

For more information about Data Lake Storage, see [Introduction to Azure Data Lake Storage](data-lake-storage-introduction.md).


## Next steps

- [Introduction to Azure Blob storage](storage-blobs-introduction.md)
- [Introduction to Azure Data Lake Storage](data-lake-storage-introduction.md)
