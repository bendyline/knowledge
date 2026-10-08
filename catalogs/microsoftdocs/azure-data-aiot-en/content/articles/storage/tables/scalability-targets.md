---
title: Scalability and performance targets for Table storage
titleSuffix: Azure Storage
description: Learn about scalability and performance targets for Table storage.
services: storage
author: akashdubey-ms

ms.service: azure-table-storage
ms.topic: concept-article
ms.date: 03/09/2020
ms.author: akashdubey
# Customer intent: "As a cloud architect, I want to understand the scalability and performance targets for Table storage, so that I can design applications that efficiently manage large datasets."
---

# Scalability and performance targets for Table storage


This reference details scalability and performance targets for Azure Storage. The scalability and performance targets listed here are high-end targets, but they're achievable. In all cases, the request rate and bandwidth that your storage account achieves depend on the size of objects stored, the access patterns used, and the type of workload your application performs.

Test your service to determine whether its performance meets your requirements. If possible, avoid sudden spikes in the rate of traffic and ensure that traffic is well-distributed across partitions.

When your application reaches the limit of what a partition can handle for your workload, Azure Storage begins to return error code 503 (Server Busy) or error code 500 (Operation Timeout) responses. If 503 errors occur, consider modifying your application to use an exponential backoff policy for retries. The exponential backoff decreases the load on the partition and eases spikes in traffic to that partition.


## Scale targets for Table storage


The following table describes capacity, scalability, and performance targets for Table storage.

| Resource | Target |
| --- | --- |
| Number of tables in an Azure storage account | Limited only by the capacity of the storage account |
| Number of partitions in a table | Limited only by the capacity of the storage account |
| Number of entities in a partition | Limited only by the capacity of the storage account |
| Maximum size of a single table | 500 TiB |
| Maximum size of a single entity, including all property values | 1 MiB |
| Maximum number of properties in a table entity | 255 (including the three system properties, **PartitionKey**, **RowKey**, and **Timestamp**) |
| Maximum total size of an individual property in an entity | Varies by property type. For more information, see **Property Types** in [Understanding the Table Service Data Model](https://learn.microsoft.com/rest/api/storageservices/understanding-the-table-service-data-model). |
| Size of the **PartitionKey** | A string up to 1024 characters in size |
| Size of the **RowKey** | A string up to 1024 characters in size |
| Size of an entity group transaction | A transaction can include at most 100 entities and the payload must be less than 4 MiB in size. An entity group transaction can include an update to an entity only once. |
| Maximum number of stored access policies per table | 5 |
| Maximum request rate per storage account | 20,000 transactions per second, which assumes a 1-KiB entity size |
| Target throughput for a single table partition (1 KiB-entities) | Up to 2,000 entities per second |

## See also

- [Performance and scalability checklist for Table storage](storage-performance-checklist.md)
- [Scalability targets for standard storage accounts](../common/scalability-targets-standard-account.md)
- [Scalability targets for the Azure Storage resource provider](../common/scalability-targets-resource-provider.md)
- [Azure subscription limits and quotas](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md)
