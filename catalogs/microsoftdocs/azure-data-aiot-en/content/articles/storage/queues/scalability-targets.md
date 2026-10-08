---
title: Scalability and performance targets for Queue Storage
titleSuffix: Azure Storage
description: Learn about scalability and performance targets for Queue Storage.
author: akashdubey-ms
services: storage
ms.author: akashdubey
ms.date: 12/18/2019
ms.topic: concept-article
ms.service: azure-queue-storage
# Customer intent: "As a software architect, I want to understand the scalability and performance targets for Queue Storage, so that I can design applications that effectively manage data and optimize resource usage."
---

# Scalability and performance targets for Queue Storage


This reference details scalability and performance targets for Azure Storage. The scalability and performance targets listed here are high-end targets, but they're achievable. In all cases, the request rate and bandwidth that your storage account achieves depend on the size of objects stored, the access patterns used, and the type of workload your application performs.

Test your service to determine whether its performance meets your requirements. If possible, avoid sudden spikes in the rate of traffic and ensure that traffic is well-distributed across partitions.

When your application reaches the limit of what a partition can handle for your workload, Azure Storage begins to return error code 503 (Server Busy) or error code 500 (Operation Timeout) responses. If 503 errors occur, consider modifying your application to use an exponential backoff policy for retries. The exponential backoff decreases the load on the partition and eases spikes in traffic to that partition.


## Scale targets for Queue Storage


| Resource | Target |
| --- | --- |
| Maximum size of a single queue | 500 TiB |
| Maximum size of a message in a queue | 64 KiB |
| Maximum number of stored access policies per queue | 5 |
| Maximum request rate per storage account | 20,000 messages per second, which assumes a 1-KiB message size |
| Target throughput for a single queue (1-KiB messages) | Up to 2,000 messages per second |


## See also

- [Performance and scalability checklist for Queue Storage](storage-performance-checklist.md)
- [Scalability targets for standard storage accounts](../common/scalability-targets-standard-account.md)
- [Scalability targets for the Azure Storage resource provider](../common/scalability-targets-resource-provider.md)
- [Azure subscription limits and quotas](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md)
