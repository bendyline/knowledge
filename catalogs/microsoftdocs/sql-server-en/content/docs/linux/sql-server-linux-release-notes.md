---
title: Release Information for SQL Server on Linux
description: This article contains the release information for all supported versions of SQL Server running on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 09/15/2026
ms.service: sql
ms.subservice: linux
ms.topic: release-notes
ms.custom:
  - linux-related-content
  - ignite-2025
---

# Release information for SQL Server on Linux

The following release information applies to supported versions of SQL Server running on Linux. This article is separated into tabs for each release.

<a id="release-notes"></a>
<a id="release-history"></a>
<a id="latest-releases"></a>

For the latest builds and updates available for supported versions of SQL Server running on Linux, see [KB 5122767](https://support.microsoft.com/help/5122767).

For detailed supportability and known issues, see [SQL Server on Linux: Known issues](sql-server-linux-known-issues.md).

## SQL Server support policy

| Term | Definition |
| --- | --- |
| **Servicing** | Microsoft releases GDR, hotfixes, and security fixes within lifecycle of product for supported distributions. |
| **Support** | Microsoft supports users with problems pertaining to supported distributions. |

### Support policy

 SQL Server 
 is supported on Linux distributions until the earlier of two events: the end of the distribution's support lifecycle, or the end of the  SQL Server 
 support lifecycle.

### Servicing policy

During the Mainstream support phase of  SQL Server 
, we provide Cumulative Updates (CUs) for all Linux distributions that are also within their Mainstream support period. For Linux distributions that move from Mainstream to Extended support and are still recognized as supported platforms,  Microsoft 
 can release CUs and bug fixes at its discretion.

Once  SQL Server 
 moves beyond Mainstream support and into the Extended support phase, we continue to publish security updates and General Distribution Release (GDR) fixes. However, these updates aren't extended to Linux distributions that conclude their support period.


## Supported platforms

### [SQL Server 2025](#tab/sql2025)

You should run production workloads on supported platforms like [Red Hat Enterprise Linux](https://www.redhat.com/technologies/linux-platforms/enterprise-linux/sql-server) and [Ubuntu Pro](https://ubuntu.com/blog/microsoft-sql-server-on-ubuntu), as they receive regular OS security updates, and have support coverage options that you need for enterprise database deployments.

| Platform | File system | Installation guide | Get |
| --- | --- | --- | --- |
| Red Hat Enterprise Linux 10.x Server<br /><br />Red Hat Enterprise Linux 9.x Server | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-red-hat.md) | [Get RHEL 10](https://access.redhat.com/products/red-hat-enterprise-linux/evaluation)<br /><br />[Get RHEL 9](https://access.redhat.com/products/red-hat-enterprise-linux/evaluation) |
| Ubuntu 24.04<br /><br />Ubuntu 22.04 | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-ubuntu.md) | [Get Ubuntu 24.04](https://releases.ubuntu.com/24.04/)<br /><br />[Get Ubuntu 22.04](https://releases.ubuntu.com/22.04/) |
| Docker Engine 1.8+ on Linux <sup>1</sup> | N/A | [Installation guide](install-upgrade/quickstart-install-docker.md) | [Get Docker](https://www.docker.com/get-started) |

<sup>1</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).


### [SQL Server 2022](#tab/sql2022)

You should run production workloads on supported platforms like [Red Hat Enterprise Linux](https://www.redhat.com/technologies/linux-platforms/enterprise-linux/sql-server), [SUSE Linux Enterprise Server](https://www.suse.com/c/microsoft-sql-server-on-suse-linux-enterprise-server-new-suse-best-practices), and [Ubuntu Pro](https://ubuntu.com/blog/microsoft-sql-server-on-ubuntu), as they receive regular OS security updates, and have support coverage options that you need for enterprise database deployments.

| Platform | File system | Installation guide | Get |
| --- | --- | --- | --- |
| Red Hat Enterprise Linux 8.x Server, or 9.x Server | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-red-hat.md) | [Get RHEL 9](https://access.redhat.com/products/red-hat-enterprise-linux/evaluation) |
| SUSE Linux Enterprise Server v15 (SP1 - SP4) | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-suse.md) | [Get SLES v15](https://www.suse.com/products/server) |
| Ubuntu 20.04, or 22.04 | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-ubuntu.md) | [Get Ubuntu 22.04](https://releases.ubuntu.com/22.04/) |
| Docker Engine 1.8+ on Linux <sup>1</sup> | N/A | [Installation guide](install-upgrade/quickstart-install-docker.md) | [Get Docker](https://www.docker.com/get-started) |

<sup>1</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).


### [SQL Server 2019](#tab/sql2019)

You should run production workloads on supported platforms like [Red Hat Enterprise Linux](https://www.redhat.com/technologies/linux-platforms/enterprise-linux/sql-server), [SUSE Linux Enterprise Server](https://www.suse.com/c/microsoft-sql-server-on-suse-linux-enterprise-server-new-suse-best-practices), and [Ubuntu Pro](https://ubuntu.com/blog/microsoft-sql-server-on-ubuntu), as they receive regular OS security updates, and have support coverage options that you need for enterprise database deployments.

| Platform | File system | Installation guide | Get |
| --- | --- | --- | --- |
| Red Hat Enterprise Linux 7.7 - 7.9 Server <sup>1</sup>, or 8.x Server | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-red-hat.md) | [Get RHEL 8](https://access.redhat.com/products/red-hat-enterprise-linux/evaluation) |
| SUSE Linux Enterprise Server v12 (SP3 - SP5) <sup>2</sup>, or v15 | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-suse.md) | [Get SLES v15](https://www.suse.com/products/server) |
| Ubuntu 18.04 <sup>3</sup> or 20.04 | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-ubuntu.md) | [Get Ubuntu 20.04](https://releases.ubuntu.com/20.04/) |
| Docker Engine 1.8+ on Linux <sup>4</sup> | N/A | [Installation guide](install-upgrade/quickstart-install-docker.md) | [Get Docker](https://www.docker.com/get-started) |

<sup>1</sup> At the end of June 2024, RHEL 7.x transitioned from mainstream maintenance to extended lifecycle support (ELS). For more information, see [Red Hat Enterprise Linux Life Cycle](https://access.redhat.com/support/policy/updates/errata/).

<sup>2</sup> At the end of Oct 2024, SLES v12 transitioned from standard general support to long term service pack support (LTSS). For more information, see [Product Support Lifecycle Lifecycle Dates by Product](https://www.suse.com/lifecycle#suse-linux-enterprise-server-12).

<sup>3</sup> At the end of April 2023, Ubuntu 18.04 LTS transitioned from standard maintenance to expanded security maintenance (ESM). For more information, see [Ubuntu 18.04 end of standard support](https://ubuntu.com/blog/18-04-end-of-standard-support).

<sup>4</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).


### [SQL Server 2017](#tab/sql2017)

| Platform | File system | Installation guide |
| --- | --- | --- |
| Red Hat Enterprise Linux 7.7 - 7.9 Server <sup>1</sup>, or 8.x Server | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-red-hat.md) |
| SUSE Linux Enterprise Server v12 SP3 - SP5 <sup>2</sup> | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-suse.md) |
| Ubuntu 18.04 LTS <sup>3</sup> | **XFS** or **ext4** | [Installation guide](install-upgrade/quickstart-install-ubuntu.md) |
| Docker Engine 1.8+ on Linux <sup>4</sup> | N/A | [Installation guide](install-upgrade/quickstart-install-docker.md) |

<sup>1</sup> At the end of June 2024, RHEL 7.x transitioned from mainstream maintenance to extended lifecycle support (ELS). For more information, see [Red Hat Enterprise Linux Life Cycle](https://access.redhat.com/support/policy/updates/errata/).

<sup>2</sup> At the end of Oct 2024, SLES v12 transitioned from standard general support to long term service pack support (LTSS). For more information, see [Product Support Lifecycle Lifecycle Dates by Product](https://www.suse.com/lifecycle#suse-linux-enterprise-server-12).

<sup>3</sup> At the end of April 2023, Ubuntu 18.04 LTS transitioned from standard maintenance to expanded security maintenance (ESM). For more information, see [Ubuntu 18.04 end of standard support](https://ubuntu.com/blog/18-04-end-of-standard-support).

<sup>4</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).


---

## Tools

Most existing client tools that target SQL Server can seamlessly target SQL Server running on Linux. Some tools might have a specific version requirement to work well with Linux. For a full list of SQL Server tools, see [SQL tools overview](../tools/overview-sql-tools.md).

## Release and container tag guidance

### [SQL Server 2025](#tab/sql2025)

- Starting with SQL Server 2025, **SUSE Linux Enterprise Server** (SLES) isn't supported.

  Customers using earlier versions of SQL Server on SLES aren't affected, and there are no changes to your support for existing deployments. For more information about version lifecycle policies, see [SQL Server 2022](https://learn.microsoft.com/lifecycle/products/sql-server-2022), [SQL Server 2019](https://learn.microsoft.com/lifecycle/products/sql-server-2019), and [SQL Server 2017](https://learn.microsoft.com/lifecycle/products/sql-server-2017). To upgrade to SQL Server 2025, [back up your databases and restore them](business-continuity/backup-restore/database-backup-restore.md) to a [supported distribution](#supported-platforms).

- Some GDR releases apply only to Windows. These Windows-only GDRs aren't published for Linux, and don't appear in this article.

- Container tags can vary by release. For a list of available tags, see [RHEL](https://mcr.microsoft.com/product/mssql/rhel/server/tags) and [Ubuntu](https://mcr.microsoft.com/product/mssql/server/tags) in the Microsoft Artifact Registry.

### [SQL Server 2022](#tab/sql2022)

- The **mssql-server-is** package isn't supported on SUSE Linux Enterprise Server (SLES). For more information, see [SQL Server on Linux: Known issues](sql-server-linux-known-issues.md#sql-server-integration-services-ssis).

- Some GDR releases apply only to Windows. These Windows-only GDRs aren't published for Linux, and don't appear in this article.

- Container tags can vary by release. For a list of available tags, see [RHEL](https://mcr.microsoft.com/product/mssql/rhel/server/tags) and [Ubuntu](https://mcr.microsoft.com/product/mssql/server/tags) in the Microsoft Artifact Registry.

### [SQL Server 2019](#tab/sql2019)

- The **mssql-server-is** package isn't supported on SUSE Linux Enterprise Server (SLES). For more information, see [SQL Server on Linux: Known issues](sql-server-linux-known-issues.md#sql-server-integration-services-ssis).

- Some GDR releases apply only to Windows. These Windows-only GDRs aren't published for Linux, and don't appear in this article.

- Container tags can vary by release. For a list of available tags, see [RHEL](https://mcr.microsoft.com/product/mssql/rhel/server/tags) and [Ubuntu](https://mcr.microsoft.com/product/mssql/server/tags) in the Microsoft Artifact Registry.

### [SQL Server 2017](#tab/sql2017)

- As of SQL Server 2017 CU 4, SQL Server Agent is no longer installed as a separate package. It's installed with the Database Engine package and must be enabled for use.

- The **mssql-server-is** package isn't supported on SUSE Linux Enterprise Server (SLES). For more information, see [SQL Server on Linux: Known issues](sql-server-linux-known-issues.md#sql-server-integration-services-ssis).

- Some GDR releases apply only to Windows. These Windows-only GDRs aren't published for Linux, and don't appear in this article.

- Container tags can vary by release. For a list of available tags, see [RHEL](https://mcr.microsoft.com/product/mssql/rhel/server/tags) and [Ubuntu](https://mcr.microsoft.com/product/mssql/server/tags) in the Microsoft Artifact Registry.

---

<a id="cuinstall"></a>

## How to install updates

### [SQL Server 2025](#tab/sql2025)

When you configure the CU repository (`mssql-server-2025`), you get the latest CU of SQL Server packages when you perform new installations. If you require Docker container images, see official images for [Microsoft SQL Server on Linux for Docker Engine](https://hub.docker.com/r/microsoft/mssql-server). For more information about repository configuration, see [Configure repositories for installing and upgrading SQL Server 2025 on Linux](install-upgrade/change-repo-2025.md).

If you update existing SQL Server packages, run the appropriate update command for each package to get the latest CU. For specific update instructions for each package, see the following installation guides:

- [Install SQL Server package](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade)
- [Install SQL Server Full-Text Search on Linux](install-upgrade/setup-full-text-search.md)
- [Install SQL Server Integration Services (SSIS) on Linux](install-upgrade/setup-ssis.md)
- [Install SQL Server 2019 Machine Learning Services (Python and R) on Linux](install-upgrade/setup-machine-learning.md)
- [Install PolyBase on Linux](../relational-databases/polybase/polybase-linux-setup.md)
- [Install SQL Server Agent on Linux](install-upgrade/setup-sql-agent.md)

### [SQL Server 2022](#tab/sql2022)

When you configure the CU repository (`mssql-server-2022`), you get the latest CU of SQL Server packages when you perform new installations. If you require Docker container images, see official images for [Microsoft SQL Server on Linux for Docker Engine](https://hub.docker.com/r/microsoft/mssql-server). For more information about repository configuration, see [Configure repositories for installing and upgrading SQL Server on Linux](install-upgrade/change-repo.md).

If you update existing SQL Server packages, run the appropriate update command for each package to get the latest CU. For specific update instructions for each package, see the following installation guides:

- [Install SQL Server package](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade)
- [Install SQL Server Full-Text Search on Linux](install-upgrade/setup-full-text-search.md)
- [Install SQL Server Integration Services (SSIS) on Linux](install-upgrade/setup-ssis.md)
- [Install SQL Server 2022 Machine Learning Services (Python and R) on Linux](install-upgrade/setup-machine-learning-sql-2022.md)
- [Install PolyBase on Linux](../relational-databases/polybase/polybase-linux-setup.md)
- [Install SQL Server Agent on Linux](install-upgrade/setup-sql-agent.md)

### [SQL Server 2019](#tab/sql2019)

When you configure the CU repository (`mssql-server-2019`), you get the latest CU of SQL Server packages when you perform new installations. If you require Docker container images, see official images for [Microsoft SQL Server on Linux for Docker Engine](https://hub.docker.com/r/microsoft/mssql-server). For more information about repository configuration, see [Configure repositories for installing and upgrading SQL Server on Linux](install-upgrade/change-repo.md).

If you update existing SQL Server packages, run the appropriate update command for each package to get the latest CU. For specific update instructions for each package, see the following installation guides:

- [Install SQL Server package](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade)
- [Install SQL Server Full-Text Search on Linux](install-upgrade/setup-full-text-search.md)
- [Install SQL Server Integration Services (SSIS) on Linux](install-upgrade/setup-ssis.md)
- [Install SQL Server 2019 Machine Learning Services (Python and R) on Linux](install-upgrade/setup-machine-learning.md)
- [Install PolyBase on Linux](../relational-databases/polybase/polybase-linux-setup.md)
- [Install SQL Server Agent on Linux](install-upgrade/setup-sql-agent.md)

### [SQL Server 2017](#tab/sql2017)

When you configure the CU repository (`mssql-server-2017`), you get the latest CU of SQL Server packages when you perform new installations. If you require Docker container images, see official images for [Microsoft SQL Server on Linux for Docker Engine](https://hub.docker.com/r/microsoft/mssql-server). For more information about repository configuration, see [Configure repositories for installing and upgrading SQL Server on Linux](install-upgrade/change-repo.md).

If you update existing SQL Server packages, run the appropriate update command for each package to get the latest CU. For specific update instructions for each package, see the following installation guides:

- [Install SQL Server package](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade)
- [Install SQL Server Full-Text Search on Linux](install-upgrade/setup-full-text-search.md)
- [Install SQL Server Integration Services (SSIS) on Linux](install-upgrade/setup-ssis.md)
- [Install SQL Server Agent on Linux](install-upgrade/setup-sql-agent.md)

---

## Known issues

For more information, see [SQL Server on Linux: Known issues](sql-server-linux-known-issues.md).

## Related content

- [SQL Server on Linux FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-faq.yml)
- [Quickstart: Install SQL Server and create a database on Red Hat Enterprise Linux](install-upgrade/quickstart-install-red-hat.md)
- [Quickstart: Install SQL Server and create a database on SUSE Linux Enterprise Server](install-upgrade/quickstart-install-suse.md)
- [Quickstart: Install SQL Server and create a database on Ubuntu](install-upgrade/quickstart-install-ubuntu.md)
- [Quickstart: Run SQL Server Linux container images with Docker](install-upgrade/quickstart-install-docker.md)
- [Provision a Linux virtual machine running SQL Server in the Azure portal](https://learn.microsoft.com/azure/azure-sql/virtual-machines/linux/sql-vm-create-portal-quickstart)
- [Quickstart: Run SQL Server in the cloud](install-upgrade/quickstart-install-clouds.md)
