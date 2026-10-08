---
title: Introduction to Azure Storage Mover | Microsoft Docs
description: An overview of Azure Storage Mover, a fully managed migration service for your file and folder migrations to Azure Storage.
author: stevenmatthew

ms.service: azure-storage-mover
ms.topic: overview
ms.date: 10/17/2025
ms.author: shaas
---

<!-- 
!########################################################
STATUS: COMPLETE

CONTENT: final

REVIEW Stephen/Fabian: COMPLETE
EDIT PASS: COMPLETE

Document score: 98 (808 words and 1 false positive)

!########################################################
-->

# What is Azure Storage Mover?



[2-Minute demonstration video introducing Azure Storage Mover - click to play!](https://youtu.be/bJL0JsRyP6c)


Azure Storage Mover is a fully managed migration service that enables you to migrate your files and folders from on-premises or AWS S3 buckets to Azure Storage while minimizing downtime for your workload.         



You can use Storage Mover for different migration scenarios such as *lift-and-shift*, and for migrations that you have to repeat regularly. Azure Storage Mover also helps maintain oversight and manage the migration of all your globally distributed file shares from a single storage mover resource. Mover can also be deployed in the Azure Government Cloud. For more information, see [What is Azure Government?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-welcome.md).

## Supported sources and targets

<!-- 
!########################################################

ATTENTION: 
This is an include for several Storage Mover articles.
Handle file and content with care.

!########################################################
-->

The current Azure Storage Mover release supports full-fidelity migrations for specific source-target pair combinations. Always utilize the latest agent version to benefit from these supported sources and destinations:

| Source protocol | Target | Comments |
| --- | --- | --- |
| AWS S3 | Azure blob container | AWS (Amazon Web Services) S3 buckets with Glacier or Glacier Deep Archive storage classes can't be migrated and need to be restored for Mover to migrate them. |
| AWS FSx – SMB (Preview) | Azure Files SMB | Requires private network connectivity to the FSx SMB share and SMB credentials with access to the source share. |
| GCS S3 (Preview) | Azure blob container | Ensure the GCS bucket is accessible through the S3-compatible API before migration. You must restore objects in archival storage classes before migration. |
| Azure blob container | Azure blob container | Blob containers can be in two different subscriptions and storage accounts but must be within the same tenant. Supported containers include those with Flatnamespace (FNS) and Hierarchical Namespace Service (HNS) feature enabled. The migration uses the ADLS Gen2 REST API set. |
| Azure blob container | Azure blob container | Blob containers can be in two different subscriptions and storage accounts but have to be within the same tenant. Containers with Flatnamespace (FNS) and Hierarchical Namespace Service (HNS) feature enabled are supported and the ADLS Gen2 REST API set is used for migration. |
| SMB 2.x and 3.x mount | Azure file share (SMB) | SMB 1.x sources and NFS Azure file shares are currently not supported. |
| SMB 2.x and 3.x mount | Azure blob container | Containers with Flatnamespace (FNS) and Hierarchical Namespace Service (HNS) feature enabled are supported and the ADLS Gen2 REST API set is used for migration. |
| SMB 2.x and 3.x mount (agentless) | Azure file share (SMB) | Requires private connectivity to the source SMB share and SMB credentials stored in Azure Key Vault. |
| SMB 2.x and 3.x mount (agentless) | Azure blob container | Containers with Flatnamespace (FNS) and Hierarchical Namespace Service (HNS) feature enabled are supported and the ADLS Gen2 REST API set is used for migration.<br>Requires private connectivity to the source SMB share and SMB credentials stored in Azure Key Vault. |
| NFS 3 and 4 mount | Azure file share (NFS 4.1) | NFS Azure file shares support NFS v3 and v4 source. |
| NFS 3 and 4 mount | Azure file share (NFS 4.1) | NFS Azure file shares is supported with NFS v3/4 source |



An Azure blob container without the hierarchical namespace service feature doesn’t have a traditional file system. A standard blob container uses "virtual" folders to mimic this functionality. When this approach is used, files in folders on the source get their path prepended to their name and placed in a flat list in the target blob container.

When you migrate data from a source endpoint using the SMB protocol, Storage Mover supports the same level of file fidelity as the underlying Azure file share. Folder structure and metadata values such as file and folder timestamps, ACLs, and file attributes are maintained. During a data migration from an NFS source, the Storage Mover service represents empty folders as an empty blob in the target. The metadata of the source folder is persisted in the custom metadata field of this blob, just as they are with files.

However, migrating data from a source endpoint using the NFS protocol might require "virtual" folders during the migration. Because Azure blob containers without HNS support don’t have a traditional file system, Storage Mover uses these folders to mimic a local file system. When files are found within folders on a source endpoint, Storage Mover prepends their paths to their names and places the file in a flat list within in the target blob container.

## Fully managed migrations

You need only deploy one Storage Mover instance in your subscription to handle migrations from multiple source shares, even if they’re located in different parts of the world. The storage mover resource itself doesn't process your files and folders. Rather, you deploy a migration agent near your source share to send your data directly to the selected targets in Azure.

Azure Storage Mover provides a set of management resources that can be used across every share you intend to migrate. For example, you can express your migration plan and retain oversight about migration progress and results on a per-share basis. To take advantage of this capability, create a migration project for every workload you migrate. Within the project, define the source, target, and migration settings for each source share on which your workload depends. You can remain in full control about when to start the migration of a share, track it's progress, and see its results.

The [resource hierarchy article](resource-hierarchy.md) has more information about individual Storage Mover resources and how best to use them for your migration. You can also get more deployment planning details in the [planning for an Azure Storage Mover deployment](deployment-planning.md) article.

## A hybrid cloud service

<!-- 
!########################################################
STATUS: COMPLETE

CONTENT: final

REVIEW Stephen/Fabian: COMPLETE

Document score: 100 (107 words and 0 issues)

!########################################################
-->

Azure Storage Mover supports both agent-based and agentless migration workloads. For agent-based workloads, a migration agent VM runs in your environment near the source storage. For agentless workloads, no migration agent VM is required.

The cloud service provides migration orchestration and management for both workload types. For agent-based workloads, see the [Storage Mover agent deployment](agent-deploy.md) and [agent registration](agent-register.md) articles.


## Using Azure Storage Mover and Azure Data Box

When you transition on-premises workloads to Azure Storage, reducing downtime and ensuring predictable periods of unavailability is crucial for users and business operations. For the initial bulk migration, you can use [Azure Data Box](https://learn.microsoft.com/azure/databox/) and combine it with Azure Storage Mover for online catch-up.

Using Azure Data Box conserves significant network bandwidth. However, active workloads on your source storage might undergo changes while the Data Box is in transit to an Azure Data Center. The "online catch-up" phase involves updating your cloud storage with these changes before fully cutting over the workload to use the cloud data. This phase typically requires minimal bandwidth since most data already resides in Azure, and only the delta needs to be transferred. Azure Storage Mover excels in this task.

Azure Storage Mover detects differences between your on-premises storage and cloud storage, transferring updates and new files not captured by the Data Box transfer. Additionally, if the only change to a file is limited to its metadata (such as permissions), Azure Storage Mover uploads just the new metadata instead of the entire file content.

Read more details on how to use Azure Storage Mover with Azure Data Box on the [Azure Storage Blog](https://techcommunity.microsoft.com/t5/azure-storage-blog/storage-migration-combine-azure-storage-mover-and-azure-data-box/ba-p/4143354).

## Next steps

The following articles can help you become more familiar with the Storage Mover service.

- [Planning for an Azure Storage Mover deployment](deployment-planning.md)
- [Understanding the Storage Mover resource hierarchy](resource-hierarchy.md)
- [Deploying a Storage Mover agent](agent-deploy.md)
