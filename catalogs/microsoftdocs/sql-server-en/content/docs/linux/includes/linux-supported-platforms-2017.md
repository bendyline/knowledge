---
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: vanto
ms.date: 05/02/2025
ms.service: sql
ms.subservice: linux
ms.topic: include
ms.custom:
  - linux-related-content
  - build-2025
---
| Platform | File system | Installation guide |
| --- | --- | --- |
| Red Hat Enterprise Linux 7.7 - 7.9 Server <sup>1</sup>, or 8.x Server | **XFS** or **ext4** | [Installation guide](../install-upgrade/quickstart-install-red-hat.md) |
| SUSE Linux Enterprise Server v12 SP3 - SP5 <sup>2</sup> | **XFS** or **ext4** | [Installation guide](../install-upgrade/quickstart-install-suse.md) |
| Ubuntu 18.04 LTS <sup>3</sup> | **XFS** or **ext4** | [Installation guide](../install-upgrade/quickstart-install-ubuntu.md) |
| Docker Engine 1.8+ on Linux <sup>4</sup> | N/A | [Installation guide](../install-upgrade/quickstart-install-docker.md) |

<sup>1</sup> At the end of June 2024, RHEL 7.x transitioned from mainstream maintenance to extended lifecycle support (ELS). For more information, see [Red Hat Enterprise Linux Life Cycle](https://access.redhat.com/support/policy/updates/errata/).

<sup>2</sup> At the end of Oct 2024, SLES v12 transitioned from standard general support to long term service pack support (LTSS). For more information, see [Product Support Lifecycle Lifecycle Dates by Product](https://www.suse.com/lifecycle#suse-linux-enterprise-server-12).

<sup>3</sup> At the end of April 2023, Ubuntu 18.04 LTS transitioned from standard maintenance to expanded security maintenance (ESM). For more information, see [Ubuntu 18.04 end of standard support](https://ubuntu.com/blog/18-04-end-of-standard-support).

<sup>4</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).
