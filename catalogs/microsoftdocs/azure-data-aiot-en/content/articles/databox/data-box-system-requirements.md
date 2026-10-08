---
title: Microsoft Azure Data Box system requirements| Microsoft Docs
description: Learn about important system requirements for your Azure Data Box and for clients that connect to the Data Box. 
services: databox
author: stevenmatthew

ms.service: azure-data-box
ms.topic: concept-article
ms.date: 03/06/2025
ms.author: shaas
# Customer intent: As a system administrator, I want to review the system requirements for Azure Data Box, so that I can ensure compatibility and optimal performance for deployment and data transfer.
---

# Azure Data Box system requirements 

This article describes important system requirements for your Microsoft Azure Data Box and for clients that connect to the Data Box. We recommend you review the information carefully before you deploy your Data Box and then refer to it when you need to during deployment and operation.

The system requirements include:

* **Software requirements** for hosts that connect to Data Box.<br>
They describe supported operating systems, file transfer protocols, storage accounts, storage types, and browsers for the local web UI.
* **Networking requirements** for the Data Box device.<br>
They describe network connections and ports used for optimal Data Box device operation.


## Software requirements

The software requirements include supported operating systems, file transfer protocols, storage accounts, storage types, and browsers for the local web UI.

### Supported operating systems for clients


Here is a list of the supported operating systems for the data copy operation via the clients connected to your device. 

| **Operating system** | **Versions** | **Notes** |
| --- | --- | --- |
| Windows Server | 2016 RS1 and later<br> 2019 RS5 and later | With earlier editions of these operating systems, you can't use RoboCopy in Backup mode (`robocopy /B`) to copy files that contain Alternate Data Streams (ADS) or use Extended Attributes (EAs) in their Access Control Lists (ACLs). |
| Windows | 7, 8, 10, 11 |  |
| Linux |  |  |



### Supported file transfer protocols for clients


| **Protocol** | **Versions** | **Notes** |
| --- | --- | --- |
| SMB | 3.0 and 2.0 |  |
| NFS | All versions up to and including 4.1 | For NFS shares, copying data into Data Box from an Advanced Interactive Executive (AIX) host using the IBM Database 2 (DB2) Export tool is not supported. |


> **Important:**
> Connection to Data Box shares is not supported via REST for export orders.
>
> You can transport your data to Data Box from on-premises Network File System (NFS) clients by using NFSv4. However, when copying data from Data Box to Azure, Data Box supports REST-based transport only. Azure file shares with NFSv4.1 doesn't support REST for data access or transfer.

### Supported storage accounts

> **Note:**
> Classic storage accounts will not be supported starting **August 1, 2023**.


Here's a list of the supported storage accounts and storage types for a Data Box device. For a complete list of all capabilities for all types of storage accounts, see [Types of storage accounts](../storage/common/storage-account-overview.md#types-of-storage-accounts).

#### Supported storage accounts for imports

For import orders, following table shows the supported storage accounts.

| **Storage account / Supported storage types** | **Block blob** | **Page blob** <sup>1</sup> | **Azure files** | **Supported access tiers** |
| --- | --- | --- | --- | --- |
| Classic Standard | Y | Y | Y |
| General-purpose v1 Standard | Y | Y | Y | Hot, Cool, Cold, Archive |
| General-purpose v1 Premium |  | Y |  |  |
| General-purpose v2 Standard <sup>2</sup> | Y | Y | Y | Hot, Cool, Cold, Archive |
| General-purpose v2 Premium |  | Y |  |  |
| Azure Premium File Storage <sup>3</sup> |  |  | Y |  |
| Blob storage Standard | Y |  |  | Hot, Cool, Cold, Archive |
| Block Blob storage Premium | Y |  |  | Hot, Cool, Cold, Archive |


<sup>1</sup> *Data uploaded to page blobs must be 512 bytes aligned such as VHDs.*

<sup>2</sup> *Azure Data Lake Storage Gen2 is supported for imports but not for exports.*

<sup>3</sup> *For Azure file storage accounts with provisioned v2 billing model, Data Box 120, Data Box 525 and Data Box Disk SKUs support import.*

#### Supported storage accounts for exports

For export orders, following table shows the supported storage accounts.

| **Storage account / Supported storage types** | **Block blob** | **Page blob*** | **Azure files** | **Supported access tiers** |
| --- | --- | --- | --- | --- |
| Classic Standard | Y | Y | Y |  |
| General-purpose v1 Standard | Y | Y | Y | Hot, Cool |
| General-purpose v1 Premium |  | Y |  |  |
| General-purpose v2 Standard | Y | Y | Y | Hot, Cool |
| General-purpose v2 Premium |  | Y |  |  |
| Azure Premium File Storage <sup>3</sup> |  |  | Y |  |
| Blob storage Standard | Y |  |  | Hot, Cool |
| Block Blob storage Premium | Y |  |  | Hot, Cool |
| Page Blob storage Premium |  | Y |  |  |

<sup>3</sup> *For Azure file storage accounts with Provisioned v2 billing model, Data Box 120 and 525 devices support Export.*

#### Caveats for storage accounts

- For General-purpose accounts:
  - For import orders, Data Box doesn't support Queue, Table, and Disk storage types.
  - For export orders, Data Box doesn't support Queue, Table, Disk, and Azure Data Lake Gen2 storage types.
- Data Box doesn't support append blobs for Blob Storage and Block Blob Storage accounts.
- Data uploaded to page blobs must be 512 bytes aligned such as VHDs.
- For exports:
  - A maximum of 120 or 525 TB can be exported when using Data Box 120 and Data Box 525, respectively. 
  - A maximum of 80 TB can be exported when using Data Box.
  - File history and blob snapshots aren't exported.
  - Archive blobs aren't supported for export. Rehydrate the blobs in archive tier before exporting. For more information, see [Rehydrate an archived blob to an online tier](../storage/blobs/archive-rehydrate-overview.md).
  - Data Box only supports block blobs with Azure Data Lake Gen2 Storage accounts. Page blobs aren't allowed and shouldn't be uploaded over REST.  If page blobs are uploaded over REST, these blobs would fail when data is uploaded to Azure.


### Supported storage types


Here is a list of the supported storage types for the Data Box device.

| **File format** | **Notes** |
| --- | --- |
| Azure block blob |  |
| Azure page blob | The data should be 512 bytes aligned. |
| Azure Files |  |



### Supported web browsers


Here is a list of web browsers supported for the local web UI.

| **Browser** | **Versions** | **Additional requirements/notes** |
| --- | --- | --- |
| Google Chrome | Latest version | Tested with Chrome |
| Microsoft Edge | Latest version |  |
| Firefox | Latest version | Tested with Firefox |
| Internet Explorer | Latest version | If you cannot sign in, check if cookies and JavaScript are enabled. To enable the UI access, add the device IP to **Privacy Actions** so that the device can access cookies. |



## Networking requirements

Your datacenter needs to have high-speed network. We strongly recommend you have at least one 10-GbE connection. If a 10-GbE connection isn't available, you can use a 1-GbE data link to copy data, but the copy speeds are affected.

### Port requirements

The following table lists the ports that need to be opened in your firewall to allow for Server Message Block (SMB) or  Network File System (NFS) traffic. In this table, *In* (*inbound*) refers to the direction from which incoming client requests access to your device. *Out* (or *outbound*) refers to the direction in which your Data Box device sends data externally, beyond the deployment. For example, data might be outbound to the Internet.


| Port no. | In or out | Port scope | Required | Notes |
| --- | --- | --- | --- | --- |
| TCP 80 (HTTP) | In | LAN | Yes | This port is used to connect to Data Box Blob storage REST APIs over HTTP. If not connecting to REST APIs, this automatically redirects to local web UI over 8443. |
| TCP 443 (HTTPS) | In | LAN | Yes | This port is used to connect to Data Box Blob storage REST APIs over HTTPS. If not connecting to REST APIs, this automatically redirects to local web UI over 8443. |
| TCP 8443 (HTTPS-Alt) | In | LAN | Yes | This is an alternative port for HTTPS and is used when connecting to local web UI for device management. |
| TCP 445 (SMB) | Out/In | LAN | In some cases<br>See notes | This port is required only if you're connecting via SMB. |
| TCP 2049 (NFS) | Out/In | LAN | In some cases<br>See notes | This port is required only if you're connecting via NFS. |
| TCP 111 (NFS) | Out/In | LAN | In some cases<br>See notes | This port is used for rpcbind/port mapping and required only if you're connecting via NFS. |




## Next steps

* [Deploy your Azure Data Box](data-box-deploy-ordered.md)
