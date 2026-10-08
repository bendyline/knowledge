---
title: Azure Data Box limits | Microsoft Docs
description: Describes system limits and recommended sizes for the Microsoft Azure Data Box components and connections.
services: databox
author: stevenmatthew

ms.service: azure-data-box
ms.topic: concept-article
ms.date: 01/25/2022
ms.author: shaas
zone_pivot_groups: data-box-sku
# Customer intent: As a data engineer, I want to understand the limits of Azure Data Box systems and connections, so that I can effectively plan for data import and export operations without exceeding capacity or running into compatibility issues.
---

# Azure Data Box limits

Consider these limits as you deploy and operate your Microsoft Azure Data Box. The following table describes these limits for the Data Box.

## Data Box service limits


 - If you use multiple storage accounts with the Data Box service, all the storage accounts should belong to the same Azure region.
 - We recommend that you use no more than three storage accounts. Using more storage accounts could potentially affect the performance.



## Data Box limits

**Applies to: dbx-ng**

- Data Box 120 can store a maximum of 500 million files and Data Box 525 can store a maximum of 1 billion files for both import and export.
- Data Box supports a maximum of 512 containers or shares in the cloud. The top-level directories within the user share become containers or Azure file shares in the cloud. 
- Data Box usage capacity might be less than stated 120 TiB /525 TiB because of ReFS metadata space consumption. 
- Data Box supports a maximum of 100 client connections at a time on a Network File System (NFS) share.


**Applies to: dbx**

- Data Box can store a maximum of 500 million files for both import and export.
- Data Box supports a maximum of 512 containers or shares in the cloud. The top-level directories within the user share become containers or Azure file shares in the cloud. 
- Data Box usage capacity might be less than 80 TiB because of ReFS metadata space consumption.
- Data Box supports a maximum of 10 client connections at a time on a Network File System (NFS) share.


## Azure storage limits



This section describes the limits for Azure Storage service, and the required naming conventions for Azure Files, Azure block blobs, and Azure page blobs, as applicable to the Data Box service. Review the storage limits carefully and follow all the recommendations.

For the latest information on Azure storage service limits and best practices for naming shares, containers, and files, go to:

- [Naming and referencing containers](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata)
- [Naming and referencing shares](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-shares--directories--files--and-metadata)
- [Block blobs and page blob conventions](https://learn.microsoft.com/rest/api/storageservices/understanding-block-blobs--append-blobs--and-page-blobs)

> **Important:**
> If there are any files or directories that exceed the Azure Storage service limits, or don't conform to Azure Files/Blob naming conventions, then these files or directories aren't ingested into the Azure Storage via the Data Box service.


## Data copy and upload caveats

### For import order

Data Box caveats for an import order include:


- Containers, shares, and folders:
  - Don't copy files directly to any of the precreated shares. You need to create a folder under the share and then copy files to that folder.
  - A folder under the *StorageAccount_BlockBlob* and *StorageAccount_PageBlob* is a container. For instance, containers are created as *StorageAccount_BlockBlob/container* and *StorageAccount_PageBlob/container*.
  - Each folder created directly under *StorageAccount_AzFile* is translated into an Azure File Share.
  - Azure Blob Storage doesn't support directories. If you create a folder under the *StorageAccount_BlockBlob* folder, then virtual folders are created in the blob name. For Azure Files, the actual directory structure is maintained.
- Merging folder contents:
  - Every file written into *StorageAccount_BlockBlob* and *StorageAccount_PageBlob* shares is uploaded as a block blob and page blob respectively.
  - If a folder has the same name as an existing container, the folder's contents are merged with the container's contents. Files or blobs that aren't already in the cloud are added to the container. If a file or blob has the same name as a file or blob that's already in the container, the existing file or blob is overwritten.
  - An upload to a blob in the Archive tier will fail if the container has an existing archived blob with the same name. While a blob is in the Archive tier, it can't be read or modified. If you need to overwrite a blob, make sure the blob isn't set to archive. For more information, see [Archive access tier](../storage/blobs/access-tiers-overview.md#archive-access-tier).
  - Any empty directory hierarchy (without any files) created under *StorageAccount_BlockBlob* and *StorageAccount_PageBlob* folders isn't uploaded.
- Importing data into NFS Azure file shares isn't supported by Azure Data Box. Copying data from Data Box into an existing NFS Azure file share with an identical name as your source folder creates a conflict. To resolve this conflict, Data Box renames the source share to `databox-<GUID>` and uploads it to the target storage account as an SMB Azure file share. 
- If you use both the SMB and NFS protocols for data copies, we recommend that you:
  - Use different storage accounts for SMB and NFS.
  - Don't copy the same data to the same end destination in Azure using both SMB and NFS. In these cases, the final outcome can't be determined.
  - Although copying via both SMB and NFS in parallel can work, we don't recommend doing that as it's prone to human error. Wait until your SMB data copy is complete before you start an NFS data copy.
- Upload management:
  - If there are any errors when uploading data to Azure, an error log is created in the target storage account. The path to this error log is available when the upload is complete, and you can review the log to take corrective action. Don't delete data from the source without verifying the uploaded data.
  - File metadata and NTFS permissions can be preserved when the data is uploaded to Azure Files using guidance in [Preserving file ACLs, attributes, and timestamps with Azure Data Box](data-box-file-acls-preservation.md).
  - The hierarchy of the files is maintained while uploading to the cloud for both blobs and Azure Files. For example, you copied a file at this path: `<container folder>\A\B\C.txt`. This file is uploaded to the same path in cloud.
  - 
If the **CreateTime** or **LastWriteTime** field for a file exceeds the allowable size during an upload, “Fri, 31 Dec 9999 23:59:59” replaces the original date in the Azure file property. The file upload succeeds, and no error is raised.


  


### For export order

Data Box caveats for an export order include:

- Data Box is a Windows-based device and doesn’t support case-sensitive file names. For example, you might have two different files in Azure with names that just differ in casing. Don't use Data Box to export such files as the files are overwritten on the device.
- If you have duplicate tags in input files or tags referring to the same data, the Data Box export might skip or overwrite the files. The number of files and size of data that the Azure portal displays might differ from the actual size of data on the device. 
- Data Box exports data to Windows-based system over the Server Message Block (SMB) protocol and is limited by SMB limitations for files and folders. Files and folders with unsupported names aren't exported.
- There's a 1:1 mapping from prefix to container.
- Maximum filename size is 1,024 characters. Filenames that exceed this length aren't exported. 
- Duplicate prefixes in the *xml* file (uploaded during order creation) are exported. Duplicate prefixes aren't ignored.
- Page blobs and container names are case-sensitive. If the casing is mismatched, the blob and/or container won't be found.
- Data Box currently does not support a scenario in which the customer's data is actively changing during export.
 

## Azure storage account size limits


Here are the limits on the size of the data that's copied into a storage account. Make sure the data you upload conforms to these limits. For the most up-to-date information on these limits, see [Scalability and performance targets for Blob storage](../storage/blobs/scalability-targets.md) and [Azure Files scalability and performance targets](../storage/files/storage-files-scale-targets.md). 

| Size of data copied into Azure storage account | Default limit |
| --- | --- |
| Block blob and page blob | Maximum limit is the same as the [Storage limit defined for Azure Subscription](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md#azure-storage-limits) and it includes data from all the sources including Data Box. |
| Azure Files | Data Box supports Azure premium file shares, which allow a total of 100 TiB for all shares in the storage account. Maximum usable capacity is slightly less because of the space that copy logs and audit logs use. A minimum 100 GiB each is reserved for the copy log and audit log. For more information, see [Audit logs for Azure Data Box, Azure Data Box Heavy](data-box-audit-logs.md). All folders under *StorageAccount_AzFile* must follow this limit. For more information, see [Create an Azure file share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md). |


## Azure object size limits


Here are the sizes of the Azure objects that can be written. Make sure that all the files that are uploaded conform to these limits.

| Azure object type | Default limit |
| --- | --- |
| Block blob | 14 TiB |
| Page blob | 4 TiB <br> Every file uploaded in page blob format must be 512 bytes aligned (an integral multiple), else the upload fails. <br> VHD and VHDX are 512 bytes aligned. |
| Azure Files | 4 TiB |
| Managed disks | 4 TiB <br> For more information on size and limits, see: <li>[Scalability targets of Standard SSDs](https://learn.microsoft.com/azure/virtual-machines/disks-types#standard-ssds)</li><li>[Scalability targets of Premium SSDs](https://learn.microsoft.com/azure/virtual-machines/disks-types#standard-hdds)</li><li>[Scalability targets of Standard HDDs](https://learn.microsoft.com/azure/virtual-machines/disks-types#premium-ssds)</li><li>[Pricing and billing of managed disks](https://learn.microsoft.com/azure/virtual-machines/disks-types#billing)</li> |



## Azure block blob, page blob, and file naming conventions


| Entity | Conventions |
| --- | --- |
| Container names for block blob and page blob | Must be a valid DNS name that is 3 to 63 characters long. <br>  Must start with a letter or number. <br> Can contain only lowercase letters, numbers, and the hyphen (-). <br> Every hyphen (-) must be immediately preceded and followed by a letter or number. <br> Consecutive hyphens aren't permitted in names. |
| Share names for Azure files | Same as above |
| Directory and file names for Azure files | <li> Case-preserving, case-insensitive and must not exceed 255 characters in length. </li><li> Cannot end with the forward slash (/). </li><li>If provided, it will be automatically removed. </li><li> Following characters aren't allowed: <code>" \\ / : \| < > * ?</code></li><li> Reserved URL characters must be properly escaped. </li><li> Illegal URL path characters aren't allowed. Code points like \\uE000 aren't valid Unicode characters. Some ASCII or Unicode characters, like control characters (0x00 to 0x1F, \\u0081, etc.), are also not allowed. For rules governing Unicode strings in HTTP/1.1 see RFC 2616, Section 2.2: Basic Rules and RFC 3987. </li><li> Following file names aren't allowed: LPT1, LPT2, LPT3, LPT4, LPT5, LPT6, LPT7, LPT8, LPT9, COM1, COM2, COM3, COM4, COM5, COM6, COM7, COM8, COM9, PRN, AUX, NUL, CON, CLOCK$, dot character (.), and two dot characters (..).</li> |
| Blob names for block blob and page blob | </li><li>Blob names are case-sensitive and can contain any combination of characters. </li><li>A blob name must be between 1 to 1,024 characters long. </li><li>Reserved URL characters must be properly escaped. </li><li>The number of path segments comprising the blob name cannot exceed 254. A path segment is the string between consecutive delimiter characters (for example, the forward slash '/') that correspond to the name of a virtual directory.</li> |
