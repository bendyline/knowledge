---
title: Implementing Assemblies
description: Learn how to work with assemblies hosted on SQL Server, including how to create/modify assemblies, drop or enable/disable assemblies, and manage versions.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/27/2024
ms.service: sql
ms.subservice: clr
ms.topic: "reference"
helpviewer_keywords:
  - "assemblies [CLR integration], implementing"
---
# Implement assemblies


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article provides information about the following areas to help you implement and work with assemblies in the database:

- Creating assemblies
- Modifying assemblies
- Dropping, disabling, and enabling assemblies
- Managing assembly versions

## Create assemblies

Assemblies are created in  SQL Server 
 by using the  Transact-SQL  `CREATE ASSEMBLY` statement, or in the  SQL Server Management Studio 
 by using the Assembly Assisted Editor. Additionally, deploying a SQL Server Project in  Visual Studio 
 registers an assembly in the database that was specified for the project. For more information, see [Deploy CLR database objects](deploying-clr-database-objects.md).

- With Transact-SQL: [CREATE ASSEMBLY (Transact-SQL)](../../t-sql/statements/create-assembly-transact-sql.md)
- With SQL Server Management Studio: [Assembly properties](assemblies-properties.md)

## Modify assemblies

Assemblies are modified in  SQL Server 
 by using the  Transact-SQL  `ALTER ASSEMBLY` statement or in  SQL Server Management Studio 
 by using the Assembly Assisted Editor.

- With Transact-SQL: [ALTER ASSEMBLY (Transact-SQL)](../../t-sql/statements/alter-assembly-transact-sql.md)
- With SQL Server Management Studio: [Assembly properties](assemblies-properties.md)

You can modify an assembly when you want to perform the following actions:

- Change the implementation of the assembly by uploading a newer version of the binaries of the assembly. For more information, see [Manage assembly versions](#manage-assembly-versions) later in this article.

- Change the permission set of the assembly. For more information, see [Design assemblies](assemblies-designing.md).

- Change the visibility of the assembly. Visible assemblies are available for referencing in  SQL Server 
. Nonvisible assemblies aren't available, even if they're uploaded in the database. By default, assemblies uploaded to an instance of  SQL Server 
 are visible.

- Add or drop a debug or source file associated with the assembly.

## Drop, disable, and enable assemblies

Assemblies are dropped by using the  Transact-SQL  `DROP ASSEMBLY` statement or  SQL Server Management Studio 
.

- With Transact-SQL: [DROP ASSEMBLY (Transact-SQL)](../../t-sql/statements/drop-assembly-transact-sql.md)
- With SQL Server Management Studio: [Delete Objects](https://learn.microsoft.com/ssms/object/delete-objects)

By default, all assemblies that are created in  SQL Server 
 are disabled from executing. You can use the `clr enabled` option of the `sp_configure` system stored procedure, to disable or enable the execution of all assemblies that are uploaded in  SQL Server 
. Disabling assembly execution prevents common language runtime (CLR) functions, stored procedures, triggers, aggregates, and user-defined types from executing, and stops any that are currently executing. Disabling assembly execution doesn't disable the ability to create, alter, or drop assemblies. For more information, see [Server configuration: clr enabled](../../database-engine/configure-windows/clr-enabled-server-configuration-option.md).

For more information, see [sp_configure](../system-stored-procedures/sp-configure-transact-sql.md).

## Manage assembly versions

When an assembly is uploaded to an instance  SQL Server 
, the assembly is stored and managed within the database system catalogs. Any changes made to the definition of the assembly in the  .NET Framework 
 should be propagated to the assembly that is stored in the database catalog.

When you have to modify an assembly, you must issue an `ALTER ASSEMBLY` statement to update the assembly in the database. This statement updates the assembly to the latest copy of  .NET Framework 
 modules holding its implementation.

The `WITH UNCHECKED DATA` clause of the `ALTER ASSEMBLY` statement instructs  SQL Server 
 to refresh even those assemblies upon which persisted data in the database is dependent. Specifically, you must specify `WITH UNCHECKED DATA` if any of the following exist:

- Persisted computed columns that reference methods in the assembly, either directly, or indirectly, through  Transact-SQL  functions or methods.

- Columns of a CLR user-defined type that depend on the assembly, and the type implements a `UserDefined` (non-`Native`) serialization format.

> **Caution:**  
> If `WITH UNCHECKED DATA` isn't specified,  SQL Server 
 tries to prevent `ALTER ASSEMBLY` from executing if the new assembly version affects existing data in tables, indexes, or other persistent sites. However,  SQL Server 
 doesn't guarantee that computed columns, indexes, indexed views, or expressions will be consistent with the underlying routines and types when the CLR assembly is updated. Be careful when you execute `ALTER ASSEMBLY` to make sure that there's no mismatch between the result of an expression and a value that is based on that expression stored in the assembly.

Only members of the **db_owner** and **db_ddlowner** fixed database role can execute run `ALTER ASSEMBLY` by using the `WITH UNCHECKED DATA` clause.

 SQL Server 
 posts a message to the Windows Application event log that the assembly was modified with unchecked data in the tables.  SQL Server 
 then marks any tables that contain data dependent on the assembly as having unchecked data. The `has_unchecked_assembly_data` column of the `sys.tables` catalog view contains the value `1` for tables that contain unchecked data, and `0` for tables without unchecked data.

To resolve the integrity of unchecked data, run `DBCC CHECKDB WITH EXTENDED_LOGICAL_CHECKS` against each table that has unchecked data. If `DBCC CHECKDB WITH EXTENDED_LOGICAL_CHECKS` fails, you must either delete the table rows that aren't valid or modify the assembly code to address problems, and then issue more `ALTER ASSEMBLY` statements.

`ALTER ASSEMBLY` changes the assembly version. The culture and public key token of the assembly remain the same.  SQL Server 
 doesn't allow registering different versions of an assembly with the same name, culture, and public key.

### Interactions with computer-wide policy for version binding

If references to assemblies stored in  SQL Server 
 are redirected to specific versions by using publisher policy or computer-wide administrator policy, you must do either of the following actions:

- Make sure the new version to which this redirection is made is in the database.

- Modify any statements to the external policy files of the computer or publisher policy to make sure that they reference the specific version that is in the database.

Otherwise, an attempt to load a new assembly version to the instance of  SQL Server 
 fails.

For more information, see [ALTER ASSEMBLY](../../t-sql/statements/alter-assembly-transact-sql.md).

## Related content

- [Assemblies (Database Engine)](assemblies-database-engine.md)
- [Get information about assemblies](assemblies-getting-information.md)
