---
title: "Create a Table for Storing FILESTREAM Data"
description: Learn how to create a table for storing FILESTREAM data in SQL Server. See which columns and attributes to use in the Transact-SQL code.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: filestream
ms.topic: how-to
helpviewer_keywords:
  - "FILESTREAM [SQL Server], table storage"
---
# Create a Table for Storing FILESTREAM Data
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  This topic shows how to create a table for storing FILESTREAM data.  
  
 When the database has a FILESTREAM filegroup, you can create or modify tables to store FILESTREAM data. To specify that a column contains FILESTREAM data, you create a **varbinary(max)** column and add the FILESTREAM attribute.  
  
### To create a table to store FILESTREAM data  
  
1.  In  SQL Server Management Studio 
, click **New Query** to display the Query Editor.  
  
2.  Copy the  Transact-SQL  code from the following example into the Query Editor. This  Transact-SQL  code creates a FILESTREAM-enabled table called Records.  
  
3.  To create the table, click **Execute**.  
  
## Example  
 The following code example shows how to create a table that is named `Records`. The `Id` column is a `ROWGUIDCOL` column and is required to use FILESTREAM data with Win32 APIs. The `SerialNumber` column is a `UNIQUE INTEGER`. The `Chart` column is a `FILESTREAM` column and is used to store the `Chart` in the file system.  
  
> **Note:**  
>  This example refers to the Archive database that is created in [Create a FILESTREAM-Enabled Database](create-a-filestream-enabled-database.md).  
  
 [language="sql" source="codesnippet/tsql/create-a-table-for-stori_1.sql"::: (complete source file; reference: codesnippet/tsql/create-a-table-for-stori_1.sql)](../../../_code/docs/relational-databases/blob/codesnippet/tsql/create-a-table-for-stori_1.sql.md)
  
## Related content

- [CREATE TABLE (Transact-SQL)](../../t-sql/statements/create-table-transact-sql.md)
- [ALTER TABLE (Transact-SQL)](../../t-sql/statements/alter-table-transact-sql.md)
