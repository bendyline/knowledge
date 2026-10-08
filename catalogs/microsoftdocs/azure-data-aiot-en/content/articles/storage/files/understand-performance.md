---
title: Understand Azure Files Performance
description: Learn about the factors that can impact Azure file share performance such as IOPS, throughput, bursting, latency, and queue depth.
author: khdownie
ms.service: azure-file-storage
ms.topic: concept-article
ms.date: 10/06/2026
ms.author: kendownie
# Customer intent: "As a cloud storage administrator, I want to understand the factors affecting Azure file share performance, so that I can optimize configurations for IOPS, throughput, and latency to meet application demands."
---

# Understand and optimize Azure file share performance

:heavy_check_mark: **Applies to:** Classic SMB and NFS file shares created with the Microsoft.Storage resource provider

:heavy_check_mark: **Applies to:** File shares created with the Microsoft.FileShares resource provider

Azure Files can satisfy performance requirements for most applications and use cases. This article explains the different factors that affect file share performance and how to optimize the performance of Azure Files for your workload.

## Storage performance glossary

Before reading this article, it's helpful to understand some key terms relating to storage performance:

- **IO operations per second (IOPS)**

  IOPS, or input/output operations per second, measures the number of file system operations per second. In the Azure Files documentation, the term "IO" is interchangeable with the terms "operation" and "transaction."

- **I/O size**

  I/O size, sometimes referred to as block size, is the size of the request that an application uses to perform a single input/output (I/O) operation on storage. Depending on the application, I/O size can range from small sizes such as 4 KiB to larger sizes. I/O size plays a major role in achievable throughput.

- **Throughput**

  Throughput measures the number of bits read from or written to the storage per second, and is measured in mebibytes per second (MiB/s). To calculate throughput, multiply IOPS by I/O size. For example, 10,000 IOPS × 1 MiB I/O size = 10 GiB/s, while 10,000 IOPS × 4 KiB I/O size = 38 MiB/s.

- **Latency**

  Latency is a synonym for delay and is measured in milliseconds (ms). There are two types of latency: end-to-end latency and service latency. For more information, see [Latency](#latency).

- **Queue depth**

  Queue depth is the number of pending I/O requests that a storage resource can handle at any one time. For more information, see [Queue depth](#queue-depth).

## Choosing a media tier based on usage patterns

Azure Files provides two storage media tiers that you can use to balance performance and price: SSD and HDD. You select the media tier for the file share at the storage account level. After you create a storage account in a particular media tier, you can't move to the other media tier without [manually migrating to a new file share](migrate-files-between-shares.md).

When you choose between SSD and HDD file shares, consider the requirements of the expected usage pattern you plan to run on Azure Files. If you need large amounts of IOPS, fast data transfer speeds, or low latency, choose SSD file shares.

The following table summarizes the expected performance targets between SSD and HDD file shares. For details, see [Azure Files scalability and performance targets](storage-files-scale-targets.md).

| **Usage pattern requirements** | **SSD** | **HDD** |
| --- | --- | --- |
| Write latency (single-digit milliseconds) | Yes | Yes |
| Read latency (single-digit milliseconds) | Yes | No |

SSD file shares use a provisioning model that guarantees the following performance profile based on share size. For more information, see the [provisioned v1 model](understanding-billing.md#provisioned-v1-model).

### Performance best practices

Whether you're assessing performance requirements for a new or existing workload, understanding your usage patterns helps you achieve predictable performance.

- **Latency sensitivity:** Workloads that are sensitive to read latency and have high visibility to end users are more suitable for SSD file shares, which can provide single-millisecond latency for both read and write operations (less than 2 ms for small I/O size).

- **IOPS and throughput requirements:** SSD file shares support larger IOPS and throughput limits than HDD file shares. For more information, see [file share scale targets](storage-files-scale-targets.md).

- **Workload duration and frequency:** Short (minutes) and infrequent (hourly) workloads are less likely to reach the upper performance limits of HDD file shares compared to long-running, frequently occurring workloads. On SSD file shares, workload duration helps determine the correct performance profile to use based on the provisioned storage, IOPS, and throughput. A common mistake is running performance tests for only a few minutes, which is often misleading. To get a realistic view of performance, make sure you test at a sufficiently high frequency and duration. On provisioned file shares, a short test can measure credit-based burst IOPS instead of provisioned IOPS. For more information, see [Bursting](#bursting).

- **Workload parallelization:** For workloads that perform operations in parallel, such as through multiple threads, processes, or application instances on the same client, SSD file shares provide a clear advantage over HDD file shares: SMB Multichannel. For more information, see [Improve SMB Azure file share performance](smb-performance.md).

- **API operation distribution**: Metadata heavy workloads, such as workloads that perform read operations against a large number of files, are a better fit for SSD file shares. For more information, see [Metadata or namespace heavy workload](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files-troubleshoot-performance?toc=/azure/storage/files/toc.json#cause-2-metadata-or-namespace-heavy-workload).

- **Zonal placement**: Use [zonal placement](zonal-placement.md) to select the specific availability zone in which your storage account resides. This feature allows you to place your VMs in the same availability zone as your storage, which can reduce latency by up to 30 percent. This feature is currently available only for SSD storage accounts using locally redundant storage (LRS) in [supported regions](zonal-placement.md#region-support).

## Bursting

File shares that use the provisioned v2 or provisioned v1 billing model support credit-based IOPS bursting. Credit-based bursting lets a file share use more IOPS than it has provisioned for a limited time. Credit-based bursting is a feature of the file share. Bursty traffic is a workload pattern with short spikes in IOPS or throughput. Credit-based bursting can absorb short IOPS spikes from bursty traffic.

Credit-based bursting is included in the cost of the provisioned file share and doesn't add charges to your bill. Credit-based bursting applies to IOPS only. It doesn't increase throughput above the provisioned throughput.

Bursting doesn't apply to pay-as-you-go file shares. Classic file shares that burst are still subject to the IOPS limits of the storage account. For more information, see [Classic file share data plane limits](storage-files-scale-targets.md#classic-file-share-data-plane-limits). For information about how bursting affects cost, see [Understand Azure Files billing](understanding-billing.md).

### Provisioned v2 bursting

Credit-based IOPS bursting provides added flexibility around IOPS usage. Use this flexibility as a buffer against unanticipated IO spikes. For established IO patterns, provision for IO peaks.

Burst IOPS credits accumulate whenever traffic for your file share is less than provisioned (baseline) IOPS. Whenever a file share's IOPS usage exceeds the provisioned IOPS and there are available burst IOPS credits, the file share can burst up to the maximum allowed burst IOPS limit. File shares can continue to burst as long as there are credits remaining, based on the number of burst credits accrued. Each IO beyond provisioned IOPS consumes one credit. After all credits are consumed, the share returns to the provisioned IOPS. IOPS against the file share don't have to do anything special to use bursting. Bursting operates on a best effort basis.  

Share credits have three states:

- **Accruing**, when the file share is using less than the provisioned IOPS.
- **Declining**, when the file share is using more than the provisioned IOPS and in the bursting mode.
- **Constant**, when the file share is using exactly the provisioned IOPS and there are either no credits accrued or used.

A new file share starts with the full number of credits in its burst bucket. Burst credits don't accrue if the share IOPS fall below the provisioned limit due to throttling by the server. The following formulas are used to determine the burst IOPS limit and the number of credits possible for a file share:

| Item | SSD formula | HDD formula |
| --- | --- | --- |
| Burst IOPS limit | `MIN(MAX(3 * ProvisionedIOPS, 10000), 102400)` | `MIN(MAX(3 * ProvisionedIOPS, 5000), 50000)` |
| Burst IOPS credits | `(BurstLimit - ProvisionedIOPS) * 3600` | `(BurstLimit - ProvisionedIOPS) * 3600` |

The following table illustrates a few examples of these formulas for various provisioned IOPS amounts:

| Provisioned IOPS | SSD burst IOPS limit | SSD burst credits | HDD burst IOPS limit | HDD burst credits |
| --- | --- | --- | --- | --- |
| 500 | -- | -- | Up to 5,000 | 16,200,000 |
| 1,000 | -- | -- | Up to 5,000 | 14,400,000 |
| 3,000 | Up to 10,000 | 25,200,000 | Up to 9,000 | 21,600,000 |
| 5,000 | Up to 15,000 | 36,000,000 | Up to 15,000 | 36,000,000 |
| 10,000 | Up to 30,000 | 72,000,000 | Up to 30,000 | 72,000,000 |
| 25,000 | Up to 75,000 | 180,000,000 | Up to 50,000 | 90,000,000 |
| 50,000 | Up to 102,400 | 188,640,000 | Up to 50,000 | 0 |
| 75,000 | Up to 102,400 | 98,640,000 | -- | -- |
| 102,400 | Up to 102,400 | 0 | -- | -- |


### Provisioned v1 bursting

The provisioned v1 model supports two types of bursting: credit-based bursting, which is included at no extra cost, and paid bursting, which you can optionally enable to allow IOPS and throughput above the provisioned amount for usage-based charges.

#### Provisioned v1 credit-based bursting

Credit-based IOPS bursting provides added flexibility around IOPS usage. Use this flexibility as a buffer against unanticipated IO spikes. For established IO patterns, provision for IO peaks.

Burst IOPS credits accumulate whenever traffic for your classic file share is less than provisioned (baseline) IOPS. Whenever a classic file share's IOPS usage exceeds the provisioned IOPS and there are available burst IOPS credits, the classic file share can burst up to the maximum allowed burst IOPS limit. Classic file shares can continue to burst as long as there are credits remaining, based on the number of burst credits accrued. Each IO beyond provisioned IOPS consumes one credit. After all credits are consumed, the classic file share returns to the provisioned IOPS. IOPS against the classic file share don't have to do anything special to use bursting. Bursting operates on a best effort basis.  

Share credits have three states:

- **Accruing**, when the classic file share is using less than the provisioned IOPS.
- **Declining**, when the classic file share is using more than the provisioned IOPS and in the bursting mode.
- **Constant**, when the classic file share is using exactly the provisioned IOPS and there are either no credits accrued or used.

A new classic file share starts with the full number of credits in its burst bucket. Burst credits don't accrue if the share IOPS fall below the provisioned limit due to throttling by the server. The following formulas are used to determine the burst IOPS limit and the number of credits possible for a classic file share:

| Item | Formula |
| --- | --- |
| Burst limit | `MIN(MAX(3 * ProvisionedStorageGiB, 10000), 102400)` |
| Burst credits | `(BurstLimit - BaselineIOPS) * 3600` |

The following table illustrates a few examples of these formulas for the provisioned sizes:

| Capacity (GiB) | Baseline IOPS | Burst IOPS | Burst credits | Throughput (MiB/sec) |
| --- | --- | --- | --- | --- |
| 100 | 3,100 | Up to 10,000 | 24,840,000 | 110 |
| 500 | 3,500 | Up to 10,000 | 23,400,000 | 150 |
| 1,024 | 4,024 | Up to 10,000 | 21,513,600 | 203 |
| 5,120 | 8,120 | Up to 15,360 | 26,064,000 | 613 |
| 10,240 | 13,240 | Up to 30,720 | 62,928,000 | 1,125 |
| 33,792 | 36,792 | Up to 102,400 | 227,548,800 | 3,480 |
| 51,200 | 54,200 | Up to 102,400 | 164,880,000 | 5,220 |
| 102,400 | 102,400 | Up to 102,400 | 0 | 10,340 |


#### Provisioned v1 paid bursting

Paid bursting is an advanced feature of the provisioned v1 model designed to support customers who never want to be throttled. Paid bursting adds extra usage-based billing for any amount of IOPS or throughput above the provisioned storage. This feature is distinct from credit-based bursting, which is included for free as part of provisioned storage. While paid bursting can add powerful flexibility to how you provision your classic file share, it can also lead to unexpected billing if used incorrectly.

Like credit-based bursting, paid bursting isn't a replacement for provisioning the correct amount of IOPS and throughput. Rather, it provides further protection against throttling if you run into unexpected demand. If you have a consistent level of IOPS or throughput usage, it's cheaper to provision enough IOPS and throughput (through storage provisioning) to cover demand instead of relying on paid bursting.

Paid bursting is disabled by default, but you can enable it by following the instructions to [change the cost and performance characteristics of a provisioned v1 classic file share](modify-file-share.md?tabs=azure-powershell#provisioned-v1-billing-model) ( PowerShell and CLI only). If you enable paid bursting, monitor IOPS and throughput usage by using the following metrics available through Azure Monitor:

- File Share Provisioned IOPS
- File Share Provisioned Bandwidth MiB/s (throughput)
- Transactions by Max IOPS
- Bandwidth by Max MiB/sec (throughput)
- Burst Credits for IOPS (credit-based bursting)
- Paid Bursting IOS (IOs)
- Paid Bursting Bandwidth


## Latency

When you think about latency, first understand how Azure Files determines latency. The most common measurements are the latency associated with **end-to-end latency** and **service latency** metrics. Using these [transaction metrics](storage-files-monitoring-reference.md#metrics) can help you identify client-side latency and networking problems by showing how much time your application traffic spends in transit to and from the client.

- **End-to-end latency (SuccessE2ELatency)** is the total time it takes for a transaction to perform a complete round trip from the client, across the network, to the Azure Files service, and back to the client.

- **Service latency (SuccessServerLatency)** is the time it takes for a transaction to round-trip only within Azure Files. This measurement doesn't include any client or network latency.

  Diagram comparing client latency and service latency for Azure Files.

The difference between **SuccessE2ELatency** and **SuccessServerLatency** values is the latency likely caused by the network and/or the client.

It's common to confuse client latency with service latency (in this case, Azure Files performance). For example, if the service latency reports low latency and the end-to-end latency reports [very high latency for requests](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files-troubleshoot-performance?toc=/azure/storage/files/toc.json#very-high-latency-for-requests), all the time is spent in transit to and from the client, and not in the Azure Files service.

Furthermore, as the diagram illustrates, the farther you are from the service, the slower the latency experience is, and the more difficult it is to achieve performance scale limits with any cloud service. This condition is especially true when accessing Azure Files from on-premises. While options like Azure ExpressRoute are ideal for on-premises, they still don't match the performance of an application (compute + storage) that's running exclusively in the same Azure region.

> **Tip:**
> Using a VM in Azure to test performance between on-premises and Azure is an effective and practical way to baseline the networking capabilities of the connection to Azure. Undersized or incorrectly routed ExpressRoute circuits or VPN gateways can significantly slow down workloads running on Azure Files.

## Queue depth

Queue depth is the number of outstanding I/O requests that a storage resource can service. As the disks used by storage systems evolved from HDD spindles (IDE, SATA, SAS) to solid-state devices (SSD, NVMe), they also evolved to support higher queue depth. A workload consisting of a single client that serially interacts with a single file within a large dataset is an example of low queue depth. In contrast, a workload that supports parallelism with multiple threads and multiple files can easily achieve high queue depth. Because Azure Files is a distributed file service that spans thousands of Azure cluster nodes and is designed to run workloads at scale, build and test workloads with high queue depth.

You can achieve high queue depth in several different ways. To determine the queue depth for your workload, multiply the number of clients by the number of files by the number of threads (clients × files × threads = queue depth).

The following table illustrates the various combinations you can use to achieve higher queue depth. While you can exceed the optimal queue depth of 64, it's not recommended. You won't see any more performance gains if you do, and you risk increasing latency due to TCP saturation.

| **Clients** | **Files** | **Threads** | **Queue depth** |
| --- | --- | --- | --- |
| 1 | 1 | 1 | 1 |
| 1 | 1 | 2 | 2 |
| 1 | 2 | 2 | 4 |
| 2 | 2 | 2 | 8 |
| 2 | 2 | 4 | 16 |
| 2 | 4 | 4 | 32 |
| 1 | 8 | 8 | 64 |
| 4 | 4 | 2 | 32 |

> **Tip:**
> To achieve upper performance limits, make sure that your workload or benchmarking test is multithreaded with multiple files.

## Single-thread versus multithread applications

Azure Files works best with multithreaded applications. The easiest way to understand the performance impact that multithreading has on a workload is to walk through the scenario by I/O. In the following example, you have a workload that needs to copy 10,000 small files as quickly as possible to or from an Azure file share.

This table breaks down the time needed (in milliseconds) to create a single 16 KiB file on an Azure file share, based on a single-thread application that's writing in 4 KiB block sizes.

| **I/O operation** | **Create** | **4 KiB write** | **4 KiB write** | **4 KiB write** | **4 KiB write** | **Close** | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Thread 1 | 3 ms | 2 ms | 2 ms | 2 ms | 2 ms | 3 ms | **14 ms** |

In this example, it takes approximately 14 ms to create a single 16 KiB file from the six operations. If a single-threaded application wants to move 10,000 files to an Azure file share, that operation translates to 140,000 ms (14 ms × 10,000) or 140 seconds because each file is moved sequentially one at a time. The time to service each request is primarily determined by how close the compute and storage are located to each other, as discussed in the previous section.

By using eight threads instead of one, you can reduce the preceding workload from 140,000 ms (140 seconds) down to 17,500 ms (17.5 seconds). As the following table shows, when you move eight files in parallel instead of one file at a time, you can move the same amount of data in 87.5% less time.

| **I/O operation** | **Create** | **4 KiB write** | **4 KiB write** | **4 KiB write** | **4 KiB write** | **Close** | **Total** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Thread 1 | 3 ms | 2 ms | 2 ms | 2 ms | 2 ms | 3 ms | **14 ms** |
| Thread 2 | 3 ms | 2 ms | 2 ms | 2 ms | 2 ms | 3 ms | **14 ms** |
| Thread 3 | 3 ms | 2 ms | 2 ms | 2 ms | 2 ms | 3 ms | **14 ms** |
| Thread 4 | 3 ms | 2 ms | 2 ms | 2 ms | 2 ms | 3 ms | **14 ms** |
| Thread 5 | 3 ms | 2 ms | 2 ms | 2 ms | 2 ms | 3 ms | **14 ms** |
| Thread 6 | 3 ms | 2 ms | 2 ms | 2 ms | 2 ms | 3 ms | **14 ms** |
| Thread 7 | 3 ms | 2 ms | 2 ms | 2 ms | 2 ms | 3 ms | **14 ms** |
| Thread 8 | 3 ms | 2 ms | 2 ms | 2 ms | 2 ms | 3 ms | **14 ms** |

## See also

- [Troubleshoot Azure file shares performance issues](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files-troubleshoot-performance?toc=/azure/storage/files/toc.json)
- [Monitoring Azure Files](storage-files-monitoring.md)
- [Planning for an Azure Files deployment](storage-files-planning.md)
- [Understanding Azure Files billing](understanding-billing.md)
- [Azure Files pricing](https://azure.microsoft.com/pricing/details/storage/files/)
