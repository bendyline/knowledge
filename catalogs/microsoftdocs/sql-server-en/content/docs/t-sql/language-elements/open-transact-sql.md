---
title: "OPEN (Transact-SQL)"
description: "OPEN (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "OPEN_TSQL"
  - "OPEN"
helpviewer_keywords:
  - "opening cursors"
  - "cursors [SQL Server], opening"
  - "populating cursors [SQL Server]"
  - "OPEN statement"
  - "Transact-SQL cursors, opening"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# OPEN (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Opens a  Transact-SQL  server cursor and populates the cursor by executing the  Transact-SQL  statement specified on the DECLARE CURSOR or SET *cursor_variable* statement.  
  
 
  
## Syntax  
  
```syntaxsql
OPEN { { [ GLOBAL ] cursor_name } | cursor_variable_name }  
```  
  
## Arguments
 GLOBAL  
 Specifies that *cursor_name* refers to a global cursor.  
  
 *cursor_name*  
 Is the name of a declared cursor. If both a global and a local cursor exist with *cursor_name* as their name, *cursor_name* refers to the global cursor if GLOBAL is specified; otherwise, *cursor_name* refers to the local cursor.  
  
 *cursor_variable_name*  
 Is the name of a cursor variable that references a cursor.  
  
## Remarks  
 If the cursor is declared with the INSENSITIVE or STATIC option, OPEN creates a temporary table to hold the result set. OPEN fails when the size of any row in the result set exceeds the maximum row size for  SQL Server 
 tables. If the cursor is declared with the KEYSET option, OPEN creates a temporary table to hold the keyset. The temporary tables are stored in tempdb.  
  
 After a cursor has been opened, use the @@CURSOR_ROWS function to receive the number of qualifying rows in the last opened cursor.  
  
> **Note:**  
>   SQL Server 
 does not support generating keyset-driven or static  Transact-SQL  cursors asynchronously.  Transact-SQL  cursor operations such as OPEN or FETCH are batched, so there is no need for the asynchronous generation of  Transact-SQL  cursors.  SQL Server 
 continues to support asynchronous keyset-driven or static application programming interface (API) server cursors where low latency OPEN is a concern, due to client round trips for each cursor operation.  
  
## Examples  
 The following example opens a cursor and fetches all the rows.  
  
```sql  
DECLARE Employee_Cursor CURSOR FOR  
SELECT LastName, FirstName  
FROM AdventureWorks2022.HumanResources.vEmployee  
WHERE LastName like 'B%';  
  
OPEN Employee_Cursor;  
  
FETCH NEXT FROM Employee_Cursor;  
WHILE @@FETCH_STATUS = 0  
BEGIN  
    FETCH NEXT FROM Employee_Cursor  
END;  
  
CLOSE Employee_Cursor;  
DEALLOCATE Employee_Cursor;  
```  
  
## Related content

- [CLOSE (Transact-SQL)](close-transact-sql.md)
- [@@CURSOR_ROWS (Transact-SQL)](../functions/cursor-rows-transact-sql.md)
- [DEALLOCATE (Transact-SQL)](deallocate-transact-sql.md)
- [DECLARE CURSOR (Transact-SQL)](declare-cursor-transact-sql.md)
- [FETCH (Transact-SQL)](fetch-transact-sql.md)
