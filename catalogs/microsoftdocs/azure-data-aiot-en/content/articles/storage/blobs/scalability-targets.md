---
title: Blob Storage Scalability and Performance Targets
titleSuffix: Azure Storage
description: Learn Azure Blob Storage scalability and performance targets, understand service limits, and design applications for optimal performance.
author: normesta

ms.service: azure-blob-storage
ms.topic: concept-article
ms.date: 07/24/2026
ms.author: normesta
# Customer intent: As a cloud architect, I want to understand the scalability and performance targets for Blob storage, so that I can ensure my applications are designed to meet the required performance levels as they grow.
---

# Scalability and performance targets for Blob storage


This reference details scalability and performance targets for Azure Storage. The scalability and performance targets listed here are high-end targets, but they're achievable. In all cases, the request rate and bandwidth that your storage account achieves depend on the size of objects stored, the access patterns used, and the type of workload your application performs.

Test your service to determine whether its performance meets your requirements. If possible, avoid sudden spikes in the rate of traffic and ensure that traffic is well-distributed across partitions.

When your application reaches the limit of what a partition can handle for your workload, Azure Storage begins to return error code 503 (Server Busy) or error code 500 (Operation Timeout) responses. If 503 errors occur, consider modifying your application to use an exponential backoff policy for retries. The exponential backoff decreases the load on the partition and eases spikes in traffic to that partition.


For the service-level agreement (SLA) for Azure Storage accounts, see [SLA for Storage Accounts](https://azure.microsoft.com/support/legal/sla/storage/v1_5/).

## Scale targets for Blob storage


| Resource | Target |
| --- | --- |
| Maximum size of single blob container | Same as maximum storage account capacity |
| Maximum number of blocks in a block blob or append blob | 50,000 blocks |
| Maximum size of a block in a block blob | 4,000 MiB |
| Maximum size of a block blob | 50,000 x 4,000 MiB (approximately 190.7 TiB) |
| Maximum size of a block in an append blob | 4 MiB |
| Maximum size of an append blob | 50,000 x 4 MiB (approximately 195 GiB) |
| Maximum size of a page blob | 8 TiB<sup>2</sup> |
| Maximum number of stored access policies per blob container | 5 |
| Target request rate for a single block blob | Up to 3,000 requests per second |
| Target request rate for a single page blob | Up to 500 requests per second |
| Target throughput for a single page blob | Up to 60 MiB per second<sup>2</sup> |
| Target throughput for a single block blob | Up to storage account ingress/egress limits<sup>1</sup> |

<sup>1</sup> Throughput for a single blob depends on several factors. These factors include but aren't limited to concurrency, request size, performance tier, speed of source for uploads, and destination for downloads. To take advantage of the performance enhancements of [high-throughput block blobs](https://azure.microsoft.com/blog/high-throughput-with-azure-blob-storage/), upload larger blobs or blocks. Specifically, call the [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) or [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) operation with a blob or block size that's greater than 256 KiB.

<sup>2</sup> Page blobs aren't yet supported in accounts that have a hierarchical namespace enabled.

The following table describes the maximum block and blob sizes permitted by service version.

| Service version | Maximum block size (via Put Block) | Maximum blob size (via Put Block List) | Maximum blob size via single write operation (via Put Blob) |
| --- | --- | --- | --- |
| Version 2019-12-12 and later | 4,000 MiB | Approximately 190.7 TiB (4,000 MiB x 50,000 blocks) | 5,000 MiB |
| Version 2016-05-31 through version 2019-07-07 | 100 MiB | Approximately 4.75 TiB (100 MiB x 50,000 blocks) | 256 MiB |
| Versions prior to 2016-05-31 | 4 MiB | Approximately 195 GiB (4 MiB x 50,000 blocks) | 64 MiB |


## Hot partitions: detection, monitoring, and mitigation

Azure Blob Storage distributes data and requests across partitions to help scale workloads. A storage account can have available capacity and throughput while workloads that concentrate traffic on a narrow range of partition keys experience partition-level throughput constraints. 

When a single partition receives significantly more traffic than other partitions, it becomes a *hot partition*. The partition key for a blob combines the storage account name, container name, and blob name, so sequential or append-only naming schemes can concentrate traffic on a single partition.

When a partition becomes hot, your application might observe increased latency and receive HTTP 503 (Server Busy) or HTTP 500 (Operation Timeout) responses before the storage account approaches its documented scalability limits.

To mitigate hot partitions:

- Avoid sequential or append-only blob naming schemes that concentrate traffic on a single partition.

- Use an exponential backoff retry strategy when throttling errors occur.

- Increase request rates gradually when you introduce new workloads.

To detect throttling and identify the source of excessive demand, use Azure Monitor metrics and resource logs.

For more information, see [Mitigate hot partitions in Azure Blob Storage](storage-performance-mitigate-hot-partitions.md).

## See also

- [Performance and scalability checklist for Blob storage](storage-performance-checklist.md)
- [Scalability targets for standard storage accounts](../common/scalability-targets-standard-account.md)
- [Scalability targets for premium block blob storage accounts](scalability-targets-premium-block-blobs.md)
- [Scalability targets for the Azure Storage resource provider](../common/scalability-targets-resource-provider.md)
- [Azure subscription limits and quotas](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md)
