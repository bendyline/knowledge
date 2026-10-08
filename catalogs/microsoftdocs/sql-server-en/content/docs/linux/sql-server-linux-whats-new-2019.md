---
title: "What's New for SQL Server 2019 on Linux"
description: In this article, learn about the major features and services available for SQL Server 2019 running on Linux.
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
---

# What's new for SQL Server 2019 on Linux


**Applies to:**
 



 on Linux


This article describes the major features and services available for  SQL Server 2019 (15.x) 
 running on Linux.

In addition to these capabilities in this article, cumulative updates (CUs) are released at regular intervals. These cumulative updates provide many improvements and fixes. For detailed information about the latest CU release, see [SQL Server 2019 build versions](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2019/build-versions). For package downloads and known issues, see [Release information for SQL Server on Linux](sql-server-linux-release-notes.md).

## Red Hat Enterprise Linux 8 support

Red Hat Enterprise Linux (RHEL) 8 is supported in  SQL Server 2019 (15.x) 
 CU 1 and later versions. For more information, see [Quickstart: Install SQL Server and create a database on Red Hat Enterprise Linux](install-upgrade/quickstart-install-red-hat.md?view=sql-server-linux-ver15&preserve-view=true).

## SUSE Linux Enterprise Server 15 support

SUSE Linux Enterprise Server (SLES) 15 is supported in  SQL Server 2019 (15.x) 
 CU 14 and later versions. For more information, see [Quickstart: Install SQL Server and create a database on SUSE Linux Enterprise Server](install-upgrade/quickstart-install-suse.md?view=sql-server-linux-ver15&preserve-view=true).

## Ubuntu 18.04 and 20.04 support

Ubuntu 18.04 is supported in  SQL Server 2019 (15.x) 
 CU 3 and later versions.

Ubuntu 20.04 is supported in  SQL Server 2019 (15.x) 
 CU 10 and later versions.

For more information, see [Quickstart: Install SQL Server and create a database on Ubuntu](install-upgrade/quickstart-install-ubuntu.md?view=sql-server-linux-ver15&preserve-view=true).

## Updates

The following updates are available in  SQL Server 2019 (15.x) 
 on Linux:

| Feature or update | Details |
| --- | --- |
| Replication support | [SQL Server replication on Linux](replication/overview.md) |
| Support for the Microsoft Distributed Transaction Coordinator (MSDTC) | [How to configure the Microsoft Distributed Transaction Coordinator (MSDTC) on Linux](configure/distributed-transactions.md) |
| OpenLDAP support for third-party Active Directory providers | [Tutorial: Use Active Directory authentication with SQL Server on Linux](security/authentication/active-directory-tutorial.md) |
| Machine Learning on Linux | [Install SQL Server 2019 Machine Learning Services (Python and R) on Linux](install-upgrade/setup-machine-learning.md) |
| `tempdb` improvements | By default, a new installation of  SQL Server |
 | on Linux creates multiple `tempdb` data files based on the number of logical cores (with up to eight data files). This setting doesn't apply to in-place minor or major version upgrades. Each `tempdb` file is 8 MB with an auto growth of 64 MB. This behavior is similar to the default  SQL Server |
 | installation on Windows. |
| PolyBase on Linux | [Install PolyBase on Linux](../relational-databases/polybase/polybase-linux-setup.md) for non-Hadoop connectors.<br /><br />[Type mapping with PolyBase](../relational-databases/polybase/polybase-type-mapping.md). |
| Change Data Capture (CDC) support | Change Data Capture (CDC) is supported on Linux for  SQL Server 2019 (15.x) |
| . |
| Microsoft Container Registry | The [Microsoft Container Registry](https://azure.microsoft.com/blog/microsoft-syndicates-container-catalog/) replaces Docker Hub for official Microsoft container images, including  SQL Server |
| . |
| Non-root containers | SQL Server 2019 (15.x) |
 | introduces the ability to create safer containers by starting the  SQL Server |
 | process as a non-root user by default. For more information, see [Build and run SQL Server containers as a non-root user](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-docker-container-security.md#buildnonrootcontainer). |

## Related content

- [Quickstart: Install SQL Server and create a database on Red Hat Enterprise Linux](install-upgrade/quickstart-install-red-hat.md?view=sql-server-linux-ver15&preserve-view=true)
- [Quickstart: Install SQL Server and create a database on SUSE Linux Enterprise Server](install-upgrade/quickstart-install-suse.md?view=sql-server-linux-ver15&preserve-view=true)
- [Quickstart: Install SQL Server and create a database on Ubuntu](install-upgrade/quickstart-install-ubuntu.md?view=sql-server-linux-ver15&preserve-view=true)
- [Quickstart: Run SQL Server Linux container images with Docker](install-upgrade/quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true)
- [Provision a Linux virtual machine running SQL Server in the Azure portal](https://learn.microsoft.com/azure/azure-sql/virtual-machines/linux/sql-vm-create-portal-quickstart?toc=/sql/toc/toc.json)
- [SQL Server on Linux FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-faq.yml)
- [What's new in SQL Server 2019](../sql-server/what-s-new-in-sql-server-2019.md)


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
