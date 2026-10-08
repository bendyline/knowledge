---
title: System Databases
description: System Databases
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "01/28/2019"
ms.service: sql
ms.topic: concept-article
helpviewer_keywords:
  - "system databases [SQL Server]"
  - "displaying system database data"
  - "modifying system data"
  - "viewing system database data"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---

# System Databases


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





 SQL Server 
 includes the following system databases.  
  
| System database | Description |
| --- | --- |
| [master Database](master-database.md) | Records all the system-level information for an instance of  SQL Server |
| . |
| [msdb Database](msdb-database.md) | Is used by SQL Server Agent for scheduling alerts and jobs. |
| [model Database](model-database.md) | Is used as the template for all databases created on the instance of  SQL Server |
| . Modifications made to the **model** database, such as database size, collation, recovery model, and other database options, are applied to any databases created afterward. |
| [Resource Database](resource-database.md) | Is a read-only database that contains system objects that are included with  SQL Server |
| . System objects are physically persisted in the **Resource** database, but they logically appear in the **sys** schema of every database. |
| [tempdb Database](tempdb-database.md) | Is a workspace for holding temporary objects or intermediate result sets. |

> **Important:**
> For Azure SQL Database single databases and elastic pools, only master Database and tempdb Database apply. For more information, see [What is an Azure SQL Database server](https://learn.microsoft.com/azure/sql-database/sql-database-servers#what-is-an-azure-sql-database-server). For a discussion of tempdb in the context of Azure SQL Database, see [tempdb Database in Azure SQL Database](tempdb-database.md#tempdb-in-azure-sql). For Azure SQL Managed Instance, all system databases apply. For more information on Managed Instances in Azure SQL Database, see [What is a Managed Instance](https://learn.microsoft.com/azure/sql-database/sql-database-managed-instance)
  
## Modifying System Data  

 SQL Server 
 does not support users directly updating the information in system objects such as system tables, system stored procedures, and catalog views. Instead,  SQL Server 
 provides a complete set of administrative tools that let users fully administer their system and manage all users and objects in a database. These include the following:  
  
- Administration utilities, such as  SQL Server Management Studio 
.  
  
- SQL-SMO API. This lets programmers include complete functionality for administering  SQL Server 
 in their applications.  
  
-  Transact-SQL  scripts and stored procedures. These can use system stored procedures and  Transact-SQL  DDL statements.  
  
These tools shield applications from changes in the system objects. For example,  SQL Server 
 sometimes has to change the system tables in new versions of  SQL Server 
 to support new functionality that is being added in that version. Applications issuing SELECT statements that directly reference system tables are frequently dependent on the old format of the system tables. Sites may not be able to upgrade to a new version of  SQL Server 
 until they have rewritten applications that are selecting from system tables.  SQL Server 
 considers the system stored procedures, DDL, and SQL-SMO published interfaces, and works to maintain the backward compatibility of these interfaces.  
  
 SQL Server 
 does not support triggers defined on the system tables, because they might modify the operation of the system.  
  
> **Note:**  
> System databases cannot reside on UNC share directories.  
  
## Viewing System Database Data  

You should not code  Transact-SQL  statements that directly query the system tables, unless that is the only way to obtain the information that is required by the application. Instead, applications should obtain catalog and system information by using the following:  
  
- System catalog views  
  
- SQL-SMO  
  
- Windows Management Instrumentation (WMI) interface  
  
- Catalog functions, methods, attributes, or properties of the data API used in the application, such as ADO, OLE DB, or ODBC.  
  
-  Transact-SQL  system stored procedures and built-in functions.  
  
## Related Tasks  

- [Back Up and Restore of System Databases (SQL Server)](../backup-restore/back-up-and-restore-of-system-databases-sql-server.md)  
  
- [Hide System Objects in Object Explorer](https://learn.microsoft.com/ssms/object/hide-system-objects-in-object-explorer)  
  
## Related content

- [System catalog views (Transact-SQL)](../system-catalog-views/catalog-views-transact-sql.md)
- [Databases](databases.md)
