---
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: vanto
ms.date: 01/27/2026
ms.service: sql
ms.subservice: linux
ms.topic: include
ms.custom:
  - linux-related-content
  - build-2025
---
You should run production workloads on supported platforms like [Red Hat Enterprise Linux](https://www.redhat.com/technologies/linux-platforms/enterprise-linux/sql-server), [SUSE Linux Enterprise Server](https://www.suse.com/c/microsoft-sql-server-on-suse-linux-enterprise-server-new-suse-best-practices), and [Ubuntu Pro](https://ubuntu.com/blog/microsoft-sql-server-on-ubuntu), as they receive regular OS security updates, and have support coverage options that you need for enterprise database deployments.

| Platform | File system | Installation guide | Get |
| --- | --- | --- | --- |
| Red Hat Enterprise Linux 8.x Server, or 9.x Server | **XFS** or **ext4** | [Installation guide](../install-upgrade/quickstart-install-red-hat.md) | [Get RHEL 9](https://access.redhat.com/products/red-hat-enterprise-linux/evaluation) |
| SUSE Linux Enterprise Server v15 (SP1 - SP4) | **XFS** or **ext4** | [Installation guide](../install-upgrade/quickstart-install-suse.md) | [Get SLES v15](https://www.suse.com/products/server) |
| Ubuntu 20.04, or 22.04 | **XFS** or **ext4** | [Installation guide](../install-upgrade/quickstart-install-ubuntu.md) | [Get Ubuntu 22.04](https://releases.ubuntu.com/22.04/) |
| Docker Engine 1.8+ on Linux <sup>1</sup> | N/A | [Installation guide](../install-upgrade/quickstart-install-docker.md) | [Get Docker](https://www.docker.com/get-started) |

<sup>1</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).
