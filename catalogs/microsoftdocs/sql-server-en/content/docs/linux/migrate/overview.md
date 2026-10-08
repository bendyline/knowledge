---
title: Migrate Databases to SQL Server on Linux
description: This article describes the different options for migrating databases and data to SQL Server on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/03/2025
ms.service: sql
ms.subservice: linux
ms.topic: upgrade-and-migration-article
ms.custom:
  - intro-migration
  - linux-related-content
---
# Migrate databases and structured data to SQL Server on Linux


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


You can migrate your databases and data to  SQL Server 
 running on Linux. The method you choose to use depends on the source data and your specific scenario. The following sections provide best practices for various migration scenarios.

> **Important:**  
>  SQL Server 
 cross-platform availability groups, which include heterogeneous replicas with complete high-availability and disaster recovery support, is available with DH2i DxEnterprise. For more information, see [SQL Server Availability Groups with Mixed Operating Systems](https://support.dh2i.com/docs/guides/dxenterprise/sql_server/mssql-ag-mixed-os-qsg).

## Migrate from SQL Server on Windows

If you want to migrate  SQL Server 
 databases on Windows to  SQL Server 
 on Linux, the recommended technique is to use  SQL Server 
 backup and restore.

1. Create a backup of the database on the Windows machine.
1. Transfer the backup file to the target  SQL Server 
 Linux machine.
1. Restore the backup on the Linux machine.

For a tutorial on migrating a database with backup and restore, see the following article:

- [Migrate a SQL Server database from Windows to Linux using backup and restore](restore-database.md).

It's also possible to export your database to a BACPAC file (a compressed file that contains your database schema and data). If you have a BACPAC file, you can transfer this file to your Linux machine, and then import it to  SQL Server 
. For more information, see the following articles:

- [Export and import a database on Linux with SSMS or SqlPackage.exe on Windows](sql-server-management-studio.md)

## Migrate from other database servers

You can migrate databases on other database systems to  SQL Server 
 on Linux. This includes Microsoft Access, DB2, MySQL, Oracle, and Sybase databases. In this scenario, use the SQL Server Migration Assistant (SSMA) to automate the migration to  SQL Server 
 on Linux. For more information, see [Automate database migration to Linux with the SQL Server Migration Assistant (SSMA)](sql-server-migration-assistant.md).

## Migrate structured data

There are also techniques for importing raw data. You might have structured data files that were exported from other databases or data sources. In this case, you can use the **`bcp`** utility to bulk insert the data. Or you can run [SQL Server Integration Services (SSIS) on Windows to import the data into a  SQL Server 
 database on Linux. SSIS enables you to run more complex transformations on the data during the import.

## Related content

- [Bulk copy data with bcp to SQL Server on Linux](bulk-copy.md)
- [Extract, transform, and load data on Linux with SSIS](ssis.md)
