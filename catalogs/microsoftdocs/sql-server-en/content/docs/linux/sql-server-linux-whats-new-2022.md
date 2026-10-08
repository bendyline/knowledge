---
title: "What's New for SQL Server 2022 on Linux"
description: In this article, learn about the major features and services available for SQL Server 2022 running on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: whats-new
ms.update-cycle: 1825-days
ms.custom:
  - intro-whats-new
  - linux-related-content
  - build-2025
---

# What's new for SQL Server 2022 on Linux


**Applies to:**
 


 on Linux


This article describes the major features and services available for  SQL Server 2022 (16.x) 
 running on Linux.

In addition to the capabilities described in this article, cumulative updates (CUs) are released at regular intervals. These cumulative updates provide many improvements and fixes. For detailed information about the latest CU release, see [SQL Server 2022 build versions](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2022/build-versions). For package downloads and known issues, see [Release information for SQL Server on Linux](sql-server-linux-release-notes.md).

## Custom password policy support

 SQL Server 2022 (16.x) 
 Cumulative Update (CU) 23 provides support for configuring a custom password policy. This feature was backported from  SQL Server 2025 (17.x) 
.

For more information, see [Set custom password policy for SQL logins in SQL Server on Linux](security/authentication/custom-password-policy.md).

## Red Hat Enterprise Linux 9 support

Red Hat Enterprise Linux (RHEL) 9 is supported in  SQL Server 2022 (16.x) 
 CU 10 and later versions. For more information, see [Quickstart: Install SQL Server and create a database on Red Hat Enterprise Linux](install-upgrade/quickstart-install-red-hat.md?view=sql-server-linux-ver16&preserve-view=true).

## SUSE Linux Enterprise Server 15 SP4 support

SUSE Linux Enterprise Server (SLES) 15 is supported in  SQL Server 2022 (16.x) 
 CU 4 and later versions. For more information, see [Quickstart: Install SQL Server and create a database on SUSE Linux Enterprise Server](install-upgrade/quickstart-install-suse.md?view=sql-server-linux-ver16&preserve-view=true).

## Ubuntu 22.04 support

Ubuntu 22.04 is supported in  SQL Server 2022 (16.x) 
 CU 10 and later versions. For more information, see [Quickstart: Install SQL Server and create a database on Ubuntu](install-upgrade/quickstart-install-ubuntu.md?view=sql-server-linux-ver16&preserve-view=true).

## Updates

The following updates are available in  SQL Server 2022 (16.x) 
 on Linux:

| New feature or update | Details |
| --- | --- |
| Microsoft Entra Managed Identity | The Microsoft Entra managed identity for SQL Server on Azure Virtual Machines isn't supported on Linux. For more information, see [Improvement: Microsoft Entra managed identity support for backup and restore database operations and for EKM with AKV in SQL Server on Azure VMs](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2022/microsoft-entra-managed-identity-support-for-backup-restore-database-ekm-akv). |

## Related content

- [Quickstart: Install SQL Server and create a database on Red Hat Enterprise Linux](install-upgrade/quickstart-install-red-hat.md?view=sql-server-linux-ver16&preserve-view=true)
- [Quickstart: Install SQL Server and create a database on SUSE Linux Enterprise Server](install-upgrade/quickstart-install-suse.md?view=sql-server-linux-ver16&preserve-view=true)
- [Quickstart: Install SQL Server and create a database on Ubuntu](install-upgrade/quickstart-install-ubuntu.md?view=sql-server-linux-ver16&preserve-view=true)
- [Quickstart: Run SQL Server Linux container images with Docker](install-upgrade/quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true)
- [Provision a Linux virtual machine running SQL Server in the Azure portal](https://learn.microsoft.com/azure/azure-sql/virtual-machines/linux/sql-vm-create-portal-quickstart?toc=/sql/toc/toc.json)
- [SQL Server on Linux FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-faq.yml)
- [What's new in SQL Server 2022](../sql-server/what-s-new-in-sql-server-2022.md)


##  Get help

- [Ideas for SQL: Have suggestions for improving SQL Server?](https://feedback.azure.com/forums/908035-sql-server)
- [Microsoft Q & A (SQL Server)](https://learn.microsoft.com/answers/products/sql-server)
- [DBA Stack Exchange (tag sql-server): Ask SQL Server questions](https://dba.stackexchange.com/questions/tagged/sql-server)
- [Stack Overflow (tag sql-server): Answers to SQL development questions](https://stackoverflow.com/questions/tagged/sql-server)
- [Microsoft SQL Server License Terms and Information](https://www.microsoft.com/licensing/product-licensing/sql-server)
- [Support options for business users](https://support.microsoft.com/support-for-business)
- [Additional SQL Server help and feedback](../sql-server/sql-server-get-help.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../sql-server/sql-server-docs-contribute.md).
