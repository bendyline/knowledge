---
title: "SQL Server 2017 Release Notes"
description: This article describes limitations and issues with SQL Server 2017 and provides links to related information.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 03/06/2025
ms.service: sql
ms.subservice: release-landing
ms.topic: release-notes
monikerRange: ">=sql-server-2017"
---
# SQL Server 2017 release notes


**Applies to:**
 



 and later versions


This article describes limitations and issues with SQL Server 2017. For related information, see:

- [What's new in SQL Server 2017](what-s-new-in-sql-server-2017.md)
- [Release information for SQL Server on Linux](../linux/sql-server-linux-release-notes.md)
- [SQL Server 2017 build versions](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/build-versions) for information about the latest cumulative update (CU) release

## Try SQL Server





> **Note:**  
>  SQL Server 2022 (16.x) 
 is available. For more information, see [What's new in SQL Server 2022](what-s-new-in-sql-server-2022.md).

## Azure Connect Pack for SQL Server 2017 (March 2025)

Adds support for the [link feature](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-feature-overview) for Azure SQL Managed Instance, which enables database replication from SQL Server to [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview).

For more information, see [Azure Connect Pack for SQL Server 2017](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/azureconnect).

## General availability release (October 2017)

### Database Engine

- **Issue and customer impact:** After upgrade, the existing FILESTREAM network share might be no longer available.

- **Workaround:** First, restart the computer and check if the FILESTREAM network share is available. If the share is still not available, complete the following steps:

  1. In SQL Server Configuration Manager, right-click the SQL Server instance, and select **Properties**.
  1. In the **FILESTREAM** tab clear **Enable FILESTREAM for file I/O streaming access**, then select **Apply**.
  1. Check **Enable FILESTREAM for file I/O streaming access** again with the original share name and select **Apply**.

### Master Data Services (MDS)

- **Issue and customer impact:**

  On the user permissions page, when granting permission to the root level in the entity tree view, you see the following error:
`"The model permission can't be saved. The object guid isn't valid"`

- **Workaround:**

  - Grant permission on the sub nodes in the tree view instead of the root level.

### Analysis Services

- **Issue and customer impact:** Data connectors for the following sources aren't yet available for tabular models at the 1400 compatibility level.

  - Amazon Redshift
  - IBM Netezza
  - Impala

- **Workaround:** None.

- **Issue and customer impact:** Direct Query models at the 1400 compatibility level with perspectives can fail on querying or discovering metadata.

- **Workaround:** Remove perspectives and redeploy.

### Tools

- **Issue and customer impact:** Running *DReplay* fails with the following message:

  ```output
  Error DReplay Unexpected error occurred!
  ```

- **Workaround:** None.

## More information

- [SQL Server Reporting Services release notes](../reporting-services/release-notes-reporting-services.md).
- [Known Issues for Machine Learning Services](../machine-learning/troubleshooting/known-issues-for-sql-server-machine-learning-services.md)
- [SQL Server Update Center - links and information for all supported versions](https://learn.microsoft.com/troubleshoot/sql/releases/download-and-install-latest-updates?bc=%2fsql%2fbreadcrumb%2ftoc.json\&toc=%2fsql%2ftoc.json)


##  Get help

- [Ideas for SQL: Have suggestions for improving SQL Server?](https://feedback.azure.com/forums/908035-sql-server)
- [Microsoft Q & A (SQL Server)](https://learn.microsoft.com/answers/products/sql-server)
- [DBA Stack Exchange (tag sql-server): Ask SQL Server questions](https://dba.stackexchange.com/questions/tagged/sql-server)
- [Stack Overflow (tag sql-server): Answers to SQL development questions](https://stackoverflow.com/questions/tagged/sql-server)
- [Microsoft SQL Server License Terms and Information](https://www.microsoft.com/licensing/product-licensing/sql-server)
- [Support options for business users](https://support.microsoft.com/support-for-business)
- [Additional SQL Server help and feedback](sql-server-get-help.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](sql-server-docs-contribute.md).
