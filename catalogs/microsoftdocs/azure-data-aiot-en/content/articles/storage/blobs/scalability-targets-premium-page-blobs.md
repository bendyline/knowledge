---
title: Scalability targets for premium page blob storage accounts
titleSuffix: Azure Storage
description: A premium performance page blob storage account is optimized for read/write operations. This type of storage account backs an unmanaged disk for an Azure virtual machine.
author: normesta

ms.service: azure-blob-storage
ms.topic: concept-article
ms.date: 09/24/2021
ms.author: normesta
# Customer intent: As a cloud architect, I want to understand the scalability targets of premium page blob storage accounts, so that I can design efficient Azure virtual machine solutions that meet my application’s performance requirements.
---

# Scalability and performance targets for premium page blob storage accounts


This reference details scalability and performance targets for Azure Storage. The scalability and performance targets listed here are high-end targets, but they're achievable. In all cases, the request rate and bandwidth that your storage account achieves depend on the size of objects stored, the access patterns used, and the type of workload your application performs.

Test your service to determine whether its performance meets your requirements. If possible, avoid sudden spikes in the rate of traffic and ensure that traffic is well-distributed across partitions.

When your application reaches the limit of what a partition can handle for your workload, Azure Storage begins to return error code 503 (Server Busy) or error code 500 (Operation Timeout) responses. If 503 errors occur, consider modifying your application to use an exponential backoff policy for retries. The exponential backoff decreases the load on the partition and eases spikes in traffic to that partition.


The service-level agreement (SLA) for Azure Storage accounts is available at [SLA for Storage Accounts](https://azure.microsoft.com/support/legal/sla/storage/v1_5/).

## Scale targets for premium page blob accounts

A premium-performance page blob storage account is optimized for read/write operations. This type of storage account backs an unmanaged disk for an Azure virtual machine.

> **Note:**
> Microsoft recommends using managed disks with Azure virtual machines (VMs) if possible. For more information about managed disks, see [Azure Disk Storage overview for VMs](https://learn.microsoft.com/azure/virtual-machines/managed-disks-overview).

Premium page blob storage accounts have the following scalability targets:

| Total account capacity | Total bandwidth for a locally redundant storage account |
| --- | --- |
| Disk capacity: 4 TB (individual disk)/ 35 TB (cumulative total of all disks) <br>Snapshot capacity: 10 TB<sup>3</sup> | Up to 50 gigabits per second for inbound<sup>1</sup> + outbound<sup>2</sup> |

<sup>1</sup> All data (requests) that are sent to a storage account

<sup>2</sup> All data (responses) that are received from a storage account

<sup>3</sup> The total number of snapshots an individual page blob can have is 100.

A premium page blob account is a general-purpose account configured for premium performance. General-purpose v2 storage accounts are recommended.

If you are using premium page blob storage accounts for unmanaged disks and your application exceeds the scalability targets of a single storage account, then Microsoft recommends migrating to managed disks. For more information about managed disks, see [Azure Disk Storage overview for VMs](https://learn.microsoft.com/azure/virtual-machines/managed-disks-overview).

If you cannot migrate to managed disks, then build your application to use multiple storage accounts and partition your data across those storage accounts. For example, if you want to attach 51-TB disks across multiple VMs, spread them across two storage accounts. 35 TB is the limit for a single premium storage account. Make sure that a single premium performance storage account never has more than 35 TB of provisioned disks.

## See also

- [Scalability and performance targets for standard storage accounts](../common/scalability-targets-standard-account.md)
- [Scalability targets for premium block blob storage accounts](scalability-targets-premium-block-blobs.md)
- [Azure subscription limits and quotas](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md)
