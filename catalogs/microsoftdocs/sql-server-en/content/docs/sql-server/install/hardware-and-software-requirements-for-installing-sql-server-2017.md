---
title: "SQL Server 2017: Hardware and Software Requirements"
description: A list of hardware, software, and operating system requirements for installing and running SQL Server 2017.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/20/2026
ms.service: sql
ms.subservice: release-landing
ms.topic: checklist
helpviewer_keywords:
  - "Setup [SQL Server], software"
  - "software [SQL Server]"
  - "installing SQL Server, software"
  - "operating systems [SQL Server], SQL Server requirements"
  - "Setup [SQL Server], cross-language support"
  - "operating systems [SQL Server], cross-language support"
  - "network connections [SQL Server], requirements"
  - "disk space [SQL Server], SQL Server installations"
  - "drive space [SQL Server], SQL Server installations"
  - "WOW [SQL Server]"
  - "Setup [SQL Server], hardware"
  - "dependencies [SQL Server], SQL Server installations"
  - "cluster hardware requirements [SQL Server]"
  - "endpoints [SQL Server], SQL Server installations"
  - "Internet [SQL Server], SQL Server installations"
  - "hardware [SQL Server]"
  - "Windows on Windows [SQL Server]"
  - "installing SQL Server, hardware"
  - "Setup Configuration Checker"
  - "SCC [SQL Server]"
  - "operating systems [SQL Server]"
  - "space [SQL Server], SQL Server installations"
  - "system configuration checker"
  - "installing SQL Server, cross-language support"
  - "Internet [SQL Server]"
  - "space [SQL Server]"
  - "extended system support [SQL Server]"
  - "64-bit edition [SQL Server]"
  - "failover clustering [SQL Server]"
  - "failover clustering [SQL Server], hardware requirements"
  - "32-bit edition [SQL Server]"
  - "locales [SQL Server], SQL Server installations"
  - "cross-language support"
  - "disk space [SQL Server]"
  - "drive space [SQL Server]"
  - "localized SQL Server versions"
---

# Hardware and software requirements for SQL Server 2017


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 on Windows


This article lists the minimum hardware and software requirements to install and run  SQL Server 2016 (13.x) 
 and  SQL Server 2017 (14.x) 
 on the Windows operating system.

For hardware and software requirements for other versions of  SQL Server 
, see:

- [SQL Server 2025](hardware-and-software-requirements-for-installing-sql-server-2025.md)
- [SQL Server 2022](hardware-and-software-requirements-for-installing-sql-server-2022.md)
- [SQL Server 2019](hardware-and-software-requirements-for-installing-sql-server-2019.md)
- [SQL Server on Linux](../../linux/install-upgrade/setup.md#system-requirements)

<a id="pmosr"></a>

## Hardware requirements

The following memory and processor requirements apply to all editions of  SQL Server 
:

| Component | Requirement |
| --- | --- |
| **Storage** | SQL Server |
 | requires a minimum of 6 GB of available hard drive space.<br /><br />Drive space requirements vary with the  SQL Server |
 | components you install. For more information, see [Drive space requirements](#drive-space-requirements) later in this article. For information on supported storage types for data files, see [Storage types for data files](#storage-types-for-data-files).<br /><br />Installing SQL Server on computers with the NTFS or ReFS file formats is recommended. While the FAT32 file system is supported, it's less secure than NTFS or ReFS.<br /><br />Read-only, mapped, or compressed drives are blocked during installation. |
| **Drive** | A DVD drive, as appropriate, is required for installation from disk. |
| **Monitor** | SQL Server |
 | requires Super-VGA (800x600) or higher resolution monitor. |
| **Internet** | Internet functionality requires Internet access (fees can apply). |
| **Memory** <sup>1</sup> |  |
| Minimum memory | - Express editions: 512 MB<br /><br />- All other editions: 1 GB |
| Recommended&nbsp;memory | - Express editions: 1 GB<br /><br />- All other editions: At least 4 GB, and should be increased as database size increases to ensure optimal performance. |
| **Processor** |  |
| Processor type | x64 processor. All Intel and AMD x86-64 CPUs with [up to 64 cores per NUMA node](../compute-capacity-limits-by-edition-of-sql-server.md#numa-64). |
| Minimum speed | 1.4 GHz |
| Recommended speed | 2.0 GHz or faster |

<sup>1</sup> The minimum memory required for installing the  Data Quality Server 
 component in  Data Quality Services 
 (DQS) is 2 GB of RAM, which is different from the  SQL Server 
 minimum memory requirement. For information about installing DQS, see [Install Data Quality Services](../../data-quality-services/install-windows/install-data-quality-services.md).

> **Note:**  
> Installation of  SQL Server 
 is supported on x64 processors only. Installation on x86 processors is no longer supported.

<a id="hwswr"></a>

## Software requirements

The following table lists the minimum software requirements for running SQL Server. It also lists recommended configuration options for [optimal performance](https://learn.microsoft.com/troubleshoot/sql/database-engine/performance/recommended-updates-configuration-workloads).

The following requirements apply to all installations:

| Component | Requirement |
| --- | --- |
| Operating&nbsp;system | - Windows 8 or greater<br />- Windows Server 2012 or greater |
| .NET Framework | SQL Server |
 | requires  .NET Framework |
 | 4.6 for the Database Engine, Master Data Services, or Replication. SQL Server setup automatically installs  .NET Framework |
| . See [.NET Framework installation](#net-framework-installation). |
| Network software | Supported operating systems for  SQL Server |
 | have built-in network software. Named and default instances of a stand-alone installation support the following network protocols: Shared memory, Named Pipes, TCP/IP, and VIA<sup>1</sup>. |

<sup>1</sup> VIA protocol isn't supported on failover clusters. Clients or applications running on the same node of the failover cluster as the SQL Server instance can use Shared Memory protocol to connect to SQL Server by using its local pipe address. However, this type of connection isn't cluster-aware and fails after an instance failover. It's therefore not recommended and should only be used in specific scenarios.

> **Important:**  
> The VIA protocol is deprecated. This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  For more information about network protocols and libraries, see [Network protocols and network libraries](network-protocols-and-network-libraries.md).

 SQL Server 
 Setup installs the following software components required by the product:

-  SQL Server 
 Native Client
-  SQL Server 
 Setup support files

> **Important:**  
> The PolyBase feature has additional hardware and software requirements. For more information, see [PolyBase overview](../../relational-databases/polybase/overview.md).

### .NET Framework installation

You can manually install  .NET Framework 
 from [Microsoft .NET Framework 4.6 (Web Installer) for Windows](https://support.microsoft.com/help/3045560).

For more information, recommendations, and guidance about  .NET Framework 
 4.6, see [.NET Framework Deployment Guide for Developers](https://learn.microsoft.com/dotnet/framework/deployment/deployment-guide-for-developers).

 Windows 8.1 
 and  Windows Server 2012 R2 
 require [KB2919355](https://support.microsoft.com/help/2919355) before installing  .NET Framework 
 4.6.

> **Note:**  
> Support for .NET Framework 4.5.2, 4.6, and 4.6.1 ended on April 26, 2022.

 SQL Server 2016 (13.x) 
 and  SQL Server 2017 (14.x) 
 require .NET Framework 4.6 for Database Engine, Master Data Services, or Replication (SQL Server setup automatically installs .NET Framework).

You can upgrade to .NET 4.8 Framework or directly install .NET 4.8 Framework. All frameworks with major version 4.x do an in-place upgrade, and they are backward compatible.

For more information, check [Download .NET Framework 4.8 \| Free official downloads (microsoft.com)](https://dotnet.microsoft.com/download/dotnet-framework/net48).

## Operating system support for SQL Server 2017

The following table shows which editions of  SQL Server 2017 (14.x) 
 are compatible with which versions of Windows. You can also use the support lifecycle information to see if your version of Windows is supported.

|  SQL Server 
 | edition: | Enterprise | Developer | Standard | Web | Express |
| --- | --- | --- | --- | --- | --- |
| **Windows Server 2022** ([Support lifecycle](https://learn.microsoft.com/lifecycle/products/windows-server-2022)) |  |  |  |  |  |
| Windows Server 2022 Datacenter | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2022 Datacenter: Azure Edition | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2022 Standard | Yes | Yes | Yes | Yes | Yes |
| **Windows Server 2019** ([Support lifecycle](https://learn.microsoft.com/lifecycle/products/windows-server-2019)) |  |  |  |  |  |
| Windows Server 2019 Datacenter | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2019 Standard | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2019 Essentials | Yes | Yes | Yes | Yes | Yes |
| **Windows Server 2016** ([Support lifecycle](https://learn.microsoft.com/lifecycle/products/windows-server-2016)) |  |  |  |  |  |
| Windows Server 2016 Datacenter | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2016 Standard | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2016 Essentials | Yes | Yes | Yes | Yes | Yes |
| **Windows Server 2012 R2** ([Support lifecycle](https://learn.microsoft.com/lifecycle/products/windows-server-2012-r2)) |  |  |  |  |  |
| Windows Server 2012 R2 Datacenter | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2012 R2 Standard | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2012 R2 Essentials | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2012 R2 Foundation | Yes | Yes | Yes | Yes | Yes |
| **Windows Server 2012** ([Support lifecycle](https://learn.microsoft.com/lifecycle/products/windows-server-2012)) |  |  |  |  |  |
| Windows Server 2012 Datacenter | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2012 Standard | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2012 Essentials | Yes | Yes | Yes | Yes | Yes |
| Windows Server 2012 Foundation | Yes | Yes | Yes | Yes | Yes |
| Windows 11 IoT Enterprise | No | Yes | Yes | No | Yes |
| Windows 11 Enterprise | No | Yes | Yes | No | Yes |
| Windows 11 Professional | No | Yes | Yes | No | Yes |
| Windows 11 Home | No | Yes | Yes | No | Yes |
| Windows 10 IoT Enterprise | No | Yes | Yes | No | Yes |
| Windows 10 Enterprise | No | Yes | Yes | No | Yes |
| Windows 10 Professional | No | Yes | Yes | No | Yes |
| Windows 10 Home | No | Yes | Yes | No | Yes |
| Windows 8.1 Enterprise | No | Yes | Yes | No | Yes |
| Windows 8.1 Pro | No | Yes | Yes | No | Yes |
| Windows 8.1 Enterprise | No | Yes | Yes | No | Yes |
| Windows 8 Pro | No | Yes | Yes | No | Yes |
| Windows 8 | No | Yes | Yes | No | Yes |

### Server Core support for SQL Server 2017

The following editions of Windows Server Core support installing  SQL Server 2017 (14.x) 
:

- Windows Server 2022 Datacenter
- Windows Server 2022 Datacenter: Azure edition
- Windows Server 2022 Standard
- Windows Server 2019 Datacenter
- Windows Server 2019 Standard
- Windows Server 2016 Datacenter
- Windows Server 2016 Standard
- Windows Server 2012 R2 Datacenter
- Windows Server 2012 R2 Standard
- Windows Server 2012 Datacenter
- Windows Server 2012 Standard

For more information about installing  SQL Server 
 on Server Core, see [Install SQL Server on Server Core](../../database-engine/install-windows/install-sql-server-on-server-core.md).

> **Note:**  
> You can't install SQL Server on a Windows OS when case sensitivity is enabled. For more information, see [SQL Server isn't supported on a Windows operating system on which case sensitivity is enabled](https://learn.microsoft.com/troubleshoot/sql/install/sql-server-not-supported-in-windows-os-where-case-sensitivity-enabled).

### WOW64 support

WOW64 (Windows 32-bit on Windows 64-bit) is a feature of 64-bit editions of Windows that enables 32-bit applications to run natively in 32-bit mode. Applications function in 32-bit mode, even though the underlying operating system is a 64-bit operating system. WOW64 isn't supported for  SQL Server 
 installations. However, Management Tools are supported in WOW64.

### Features supported on 32-bit client operating systems

Windows client operating systems, for example Windows 10 and Windows 8.1, are available as 32-bit or 64-bit architectures. All SQL Server features are supported on 64-bit client operating systems. On supported 32-bit client operating systems Microsoft supports the following features:

- Data Quality Client
- Client Tools Connectivity
- Integration Services
- Client Tools Backward Compatibility
- Client Tools SDK
- Documentation Components
- Distributed Replay Components
- Distributed Replay Controller
- Distributed Replay Client
- SQL Client Connectivity SDK

 Windows Server 2008 R2 
 and later server operating systems aren't available as 32-bit architectures. All supported server operating systems are only available as 64-bit. All features are supported on 64-bit server operating systems.

<a id="CrossLanguageSupport"></a>

## Cross-language support

For more information about cross-language support and considerations for installing  SQL Server 
 in localized languages, see [Local language versions in SQL Server](local-language-versions-in-sql-server.md).

<a id="HardDiskSpace"></a>

## Drive space requirements

During installation of  SQL Server 
, Windows Installer creates temporary files on the system drive. Before you run Setup to install or upgrade  SQL Server 
, verify that you have at least 6 GB of available drive space on the system drive for these files. This requirement applies even if you install  SQL Server 
 components to a non-default drive.

Actual hard drive space requirements depend on your system configuration and the features that you decide to install. The following table provides drive space requirements for  SQL Server 
 components.

| Feature | Drive space requirement |
| --- | ---: |
| Database Engine |
 | and data files, Replication, Full-Text Search, and Data Quality Services | 1,480 MB |
| Database Engine |
 | (as preceding row) with R Services (In-Database) | 2,744 MB |
| Database Engine |
 | (as preceding row) with PolyBase Query Service for External Data | 4,194 MB |
| Analysis Services |
 | and data files | 698 MB |
| Reporting Services |
 | 967 MB |
| Microsoft R Server |
 | (Standalone) | 280 MB |
| Reporting Services |
 - SharePoint | 1,203 MB |
|  Reporting Services 
 Add-in for SharePoint Products | 325 MB |
|  Data Quality Client 
 | 121 MB |
| Client Tools Connectivity | 328 MB |
|  Integration Services 
 | 306 MB |
| Client Components (other than  SQL Server 
 Books Online components and Integration Services tools) | 445 MB |
|  Master Data Services 
 | 280 MB |
|  SQL Server 
 Books Online Components to view and manage help content <sup>1</sup> | 27 MB |
| All features | 8,030 MB |

<sup>1</sup> The drive space requirement for downloaded Books Online content is 200 MB.

<a id="StorageTypes"></a>

## Storage types for data files

The supported storage types for data files are:

- **Local disk**

  -  SQL Server 
 currently supports disk drives that have standard native sector sizes of 512 bytes and 4 KB. For more information about support for larger sector sizes and manufacturer implementations, see the section "4-KB disk sector sizes" in the white paper *SQLIOBasicsCh2.doc*. You can download the whitepaper from the [Download](https://learn.microsoft.com/previous-versions/sql/sql-server-2005/administrator/cc917726\(v=technet.10\)#download) section of the [SQL Server I/O Basics, Chapter 2](https://learn.microsoft.com/previous-versions/sql/sql-server-2005/administrator/cc917726\(v=technet.10\)) article.

    If you use advanced format disks that are physically formatted with 4,096 bytes, but expose a logical sector size of 512 bytes, see [SQL Server - New drives use 4K sector size](https://techcommunity.microsoft.com/blog/sqlserversupport/sql-server---new-drives-use-4k-sector-size/316277).

    Hard drives with sector sizes larger than 4 KB might cause errors when you attempt to store  SQL Server 
 data files on them. For more information about hard drive sector-size support in  SQL Server 
, see [Troubleshoot SQL Server errors related to system disk sector size greater than 4 KB](https://learn.microsoft.com/troubleshoot/sql/database-engine/database-file-operations/troubleshoot-os-4kb-disk-sector-size). Currently, the `ForcedPhysicalSectorSizeInBytes` registry key is required to successfully install SQL Server on some newer storage devices with system disk sector size greater than 4 KB.

  -  SQL Server 
 failover cluster installation supports Local Disk only for installing the `tempdb` files. Ensure that the path specified for the `tempdb` data and log files is valid on all the cluster nodes. During failover, if the `tempdb` directories aren't available on the failover target node, the  SQL Server 
 resource fails to come online.

- **Shared storage**

- **[Storage Spaces Direct (S2D)](https://learn.microsoft.com/windows-server/storage/storage-spaces/storage-spaces-direct-overview)**

- **SMB file share**

  - SMB storage isn't supported for  Analysis Services 
 data files for either standalone or clustered installations. Use direct attached storage, a storage area network, or S2D instead.

  - SMB storage can be hosted by a Windows File Server or a third-party SMB storage device. If you use Windows File Server, the version should be 2008 or later. For more information about installing  SQL Server 
 using SMB file share as a storage option, see [Install SQL Server with SMB fileshare storage](../../database-engine/install-windows/install-sql-server-with-smb-fileshare-as-a-storage-option.md).

<a id="DC_support"></a>

## Install SQL Server on a domain controller

For security reasons, don't install  SQL Server 
 on a domain controller.  SQL Server 
 Setup doesn't block installation on a computer that is a domain controller, but the following limitations apply:

- You can't run  SQL Server 
 services on a domain controller under a local service account.

- After you install  SQL Server 
 on a computer, you can't change the computer from a domain member to a domain controller. You must uninstall  SQL Server 
 before you change the host computer to a domain controller.

- After you install  SQL Server 
 on a computer, you can't change the computer from a domain controller to a domain member. You must uninstall  SQL Server 
 before you change the host computer to a domain member.

-  SQL Server 
 failover cluster instances aren't supported where cluster nodes are domain controllers.

-  SQL Server 
 isn't supported on a read-only domain controller.  SQL Server 
 Setup can't create security groups or  SQL Server 
 service accounts on a read-only domain controller. In this scenario, Setup fails.

  > **Note:**  
  > This restriction also applies to installations on domain member nodes.

- A  SQL Server 
 failover cluster instance isn't supported in an environment where only a read-only domain controller is accessible.

  > **Note:**  
  > This restriction also applies to installations on domain member nodes.

## Installation media

Get relevant installation media from the following locations:

- [SQL Server 2017 evaluation center](https://www.microsoft.com/evalcenter/evaluate-sql-server-2017-rtm)
- [Most recent cumulative updates](https://learn.microsoft.com/troubleshoot/sql/releases/download-and-install-latest-updates?bc=%2fsql%2fbreadcrumb%2ftoc.json\&toc=%2fsql%2ftoc.json)

Alternatively, you can deploy [SQL Server on an Azure virtual machine in the Azure portal](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-vm-create-portal-quickstart). Because of the overhead of virtualization, virtual machines can be slower than running natively.

## Related content

- [Plan a SQL Server installation](planning-a-sql-server-installation.md)
- [Security considerations for a SQL Server installation](security-considerations-for-a-sql-server-installation.md)
