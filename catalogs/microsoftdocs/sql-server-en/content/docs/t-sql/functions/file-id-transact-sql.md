---
title: "FILE_ID (Transact-SQL)"
description: "FILE_ID (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "FILE_ID"
  - "FILE_ID_TSQL"
helpviewer_keywords:
  - "IDs [SQL Server], files"
  - "file IDs [SQL Server]"
  - "FILE_ID function"
  - "names [SQL Server], files"
  - "identification numbers [SQL Server], files"
  - "file names [SQL Server], FILE_ID"
dev_langs:
  - "TSQL"
---
# FILE_ID (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





For the given logical name for a component file of the current database, this function returns the file identification (ID) number.  
  
> **Important:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [FILE_IDEX](file-idex-transact-sql.md) instead.  
  
 
  
## Syntax  
  
```syntaxsql  
FILE_ID ( file_name )  
```  
  
## Arguments
*file_name*  
An expression of type **sysname**, representing the logical name of the file whose file ID value `FILE_ID` will return.  
  
## Return Types  
**smallint**  
  
## Remarks  
*file_name* corresponds to the logical file name displayed in the name column of the sys.master_files or sys.database_files catalog views.  

`FILE_ID` returns `NULL` if *file_name* does not correspond to the logical name of a component file of the current database.
  
In  SQL Server 
, the file identification number assigned to full-text catalogs exceeds 32767. Because the `FILE_ID` function has a **smallint** return type, `FILE_ID` will not support full-text files. Use [FILE_IDEX](file-idex-transact-sql.md) instead.  
  
## Examples  
This example returns the file ID value for the `AdventureWorks2022_Data` file, a component file of the  `AdventureWorks2025`  database.  

```sql  
USE AdventureWorks2022;  
GO  
SELECT FILE_ID('AdventureWorks2022_Data')AS 'File ID';  
GO  
```  
  
  Here's the result set. 
  
  
```  
File ID   
-------   
1  
(1 row(s) affected)  
```  
  
## Related content

- [Deprecated Database Engine features in SQL Server 2025 (17.x)](../../database-engine/deprecated-database-engine-features-in-sql-server-2025.md)
- [FILE_NAME (Transact-SQL)](file-name-transact-sql.md)
- [Metadata functions (Transact-SQL)](metadata-functions-transact-sql.md)
- [sys.database_files (Transact-SQL)](../../relational-databases/system-catalog-views/sys-database-files-transact-sql.md)
- [sys.master_files (Transact-SQL)](../../relational-databases/system-catalog-views/sys-master-files-transact-sql.md)
