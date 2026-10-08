---
title: "What's New for SQL Server 2017 on Linux"
description: In this article, learn about the major features and services available for SQL Server 2017 running on Linux.
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

# What's new for SQL Server 2017 on Linux


**Applies to:**
 



 on Linux


This article describes the major features and services available for  SQL Server 2017 (14.x) 
 running on Linux.

In addition to the capabilities described in this article, cumulative updates (CUs) are released at regular intervals. These cumulative updates provide many improvements and fixes. For detailed information about the latest CU release, see [SQL Server 2017 build versions](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/build-versions). For package downloads and known issues, see [Release information for SQL Server on Linux](sql-server-linux-release-notes.md).

## Red Hat Enterprise Linux 8 support

Red Hat Enterprise Linux (RHEL) 8 is supported in  SQL Server 2017 (14.x) 
 CU 20 and later versions. For more information, see [Quickstart: Install SQL Server and create a database on Red Hat](install-upgrade/quickstart-install-red-hat.md?view=sql-server-linux-2017&preserve-view=true).

## Ubuntu 18.04 support

Ubuntu 18.04 is supported in  SQL Server 2017 (14.x) 
 CU 20 and later versions. For more information, see [Quickstart: Install SQL Server and create a database on Ubuntu](install-upgrade/quickstart-install-ubuntu.md?view=sql-server-linux-2017&preserve-view=true).

## SQL Server Database Engine

- Enabled the core  SQL Server 
 Database Engine capabilities.
- Support for native Linux paths.
- IPv6 support.
- Support for database files on Network File System (NFS).
- Enabled [Transport Layer Security](security/encrypted-connections.md) (TLS) encryption.
- Enabled [Active Directory authentication](security/authentication/active-directory-tutorial.md).
- [Availability groups functionality](business-continuity/availability-groups/overview.md) for high availability.
- [Full-Text Search](install-upgrade/setup-full-text-search.md) support.

## SQL Server Agent

- Enabled [SQL Server Agent](install-upgrade/setup-sql-agent.md) support for the following tasks:
  - [Transact-SQL jobs](sql-server-linux-run-sql-server-agent-job.md)
  - [Database Mail](sql-server-linux-db-mail-sql-agent.md)
  - [Log shipping](business-continuity/use-log-shipping.md)

## SQL Server Integration Services (SSIS)

- Ability to run SSIS packages on Linux. For more information, see [Configure SQL Server Integration Services on Linux with ssis-conf](migrate/configure-ssis.md).

## Other improvements

- Command-line configuration tool, [mssql-conf](configure/mssql-conf.md).
- Unattended installation support with [environment variables](configure/environment-variables.md).
- Cross-platform [MSSQL extension for Visual Studio Code](../tools/visual-studio-code-extensions/mssql/mssql-run-first-query.md).
- Cross-platform script generator, [mssql-scripter](https://github.com/Microsoft/sql-xplat-cli/blob/dev/doc/usage_guide.md).
- Cross-platform Dynamic Management View (DMV) monitor, [DBFS tool](https://github.com/Microsoft/dbfs).

## Related content

- [Quickstart: Install SQL Server and create a database on Red Hat Enterprise Linux](install-upgrade/quickstart-install-red-hat.md?view=sql-server-linux-2017&preserve-view=true)
- [Quickstart: Install SQL Server and create a database on SUSE Linux Enterprise Server](install-upgrade/quickstart-install-suse.md?view=sql-server-linux-2017&preserve-view=true)
- [Quickstart: Install SQL Server and create a database on Ubuntu](install-upgrade/quickstart-install-ubuntu.md?view=sql-server-linux-2017&preserve-view=true)
- [Quickstart: Run SQL Server Linux container images with Docker](install-upgrade/quickstart-install-docker.md?view=sql-server-linux-2017&preserve-view=true)
- [Provision a Linux virtual machine running SQL Server in the Azure portal](https://learn.microsoft.com/azure/azure-sql/virtual-machines/linux/sql-vm-create-portal-quickstart?toc=/sql/toc/toc.json)
- [SQL Server on Linux FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-faq.yml)
- [What's new in SQL Server 2017](../sql-server/what-s-new-in-sql-server-2017.md)


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
