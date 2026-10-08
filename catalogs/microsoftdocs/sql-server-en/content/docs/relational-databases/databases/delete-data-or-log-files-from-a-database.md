---
title: "Delete Data or Log Files from a Database"
description: Learn how to delete data or log files in SQL Server by using SQL Server Management Studio or Transact-SQL.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: how-to
helpviewer_keywords:
  - "logs [SQL Server], files"
  - "deleting files"
  - "removing files"
  - "removing data"
  - "data deletions [SQL Server]"
  - "file deletion [SQL Server]"
  - "deleting data"
---
# Delete Data or Log Files from a Database
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  This topic describes how to delete data or log files in  SQL Server 
 by using  SQL Server Management Studio 
 or  Transact-SQL .  

<a id="BeforeYouBegin"></a>

##  <a name="Prerequisites"></a> Prerequisites
  
-   A file must be empty before it can be deleted. For more information, see [Shrink a File](shrink-a-file.md).  

<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

Requires ALTER permission on the database.  
  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
  
#### To delete data or log files from a database  
  
1.  In **Object Explorer**, connect to an instance of the  SQL Server Database Engine 
 and then expand that instance.  
  
2.  Expand **Databases**, right-click the database from which to delete the file, and then click **Properties**.  
  
3.  Select the **Files** page.  
  
4.  In the **Database files** grid, select the file to delete and then click **Remove**.  
  
5.  Click **OK**.  

##  <a name="TsqlProcedure"></a> Using Transact-SQL  
  
#### To delete data or log files from a database  
  
1.  Connect to the  Database Engine 
.  
  
2.  From the Standard bar, click **New Query**.  
  
3.  Copy and paste the following example into the query window and click **Execute**. This example removes the file `test1dat4`.  
  
 [language="sql" source="codesnippet/tsql/delete-data-or-log-files_1.sql"::: (complete source file; reference: codesnippet/tsql/delete-data-or-log-files_1.sql)](../../../_code/docs/relational-databases/databases/codesnippet/tsql/delete-data-or-log-files_1.sql.md)
  
 For more examples, see [ALTER DATABASE File and Filegroup Options &#40;Transact-SQL&#41;](../../t-sql/statements/alter-database-transact-sql-file-and-filegroup-options.md).  
  
## Related content

- [Shrink a database](shrink-a-database.md)
- [Add Data or Log Files to a Database](add-data-or-log-files-to-a-database.md)
