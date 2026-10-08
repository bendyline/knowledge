---
title: Scalability targets for the Azure Storage resource provider
description: Scalability and performance targets for operations against the Azure Storage resource provider. The resource provider implements Azure Resource Manager for Azure Storage.
services: storage
author: normesta

ms.service: azure-storage
ms.topic: concept-article
ms.date: 12/18/2019
ms.author: normesta
ms.subservice: storage-common-concepts
ms.custom: devx-track-arm-template
# Customer intent: As a cloud architect, I want to understand the scalability and performance targets for the Azure Storage resource provider, so that I can ensure my architecture meets the required service levels and effectively support resource management.
---

# Scalability and performance targets for the Azure Storage resource provider


This reference details scalability and performance targets for Azure Storage. The scalability and performance targets listed here are high-end targets, but they're achievable. In all cases, the request rate and bandwidth that your storage account achieves depend on the size of objects stored, the access patterns used, and the type of workload your application performs.

Test your service to determine whether its performance meets your requirements. If possible, avoid sudden spikes in the rate of traffic and ensure that traffic is well-distributed across partitions.

When your application reaches the limit of what a partition can handle for your workload, Azure Storage begins to return error code 503 (Server Busy) or error code 500 (Operation Timeout) responses. If 503 errors occur, consider modifying your application to use an exponential backoff policy for retries. The exponential backoff decreases the load on the partition and eases spikes in traffic to that partition.


The service-level agreement (SLA) for Azure Storage accounts is available at [SLA for Storage Accounts](https://azure.microsoft.com/support/legal/sla/storage/v1_5/).

## Scale targets for the resource provider


The following limits apply only when you perform management operations by using Azure Resource Manager with Azure Storage and the Storage Resource Provider. The limits apply per subscription per region of the resource in the request.

| Resource | Limit |
| --- | --- |
| Storage account management operations (read) | 800 per 5 minutes |
| Storage account management operations (write) | 10 per second / 1200 per hour |
| Storage account management operations (list) | 100 per 5 minutes |


## See also

- [Scalability and performance targets for standard storage accounts](scalability-targets-standard-account.md)
- [Azure subscription limits and quotas](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md)
