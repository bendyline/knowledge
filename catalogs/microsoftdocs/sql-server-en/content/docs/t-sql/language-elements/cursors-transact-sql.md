---
title: "Cursors (Transact-SQL)"
description: "Cursors (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "statements [SQL Server], cursors"
  - "functions [SQL Server], cursors"
  - "cursors [SQL Server], statements"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Cursors (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



   Microsoft 
  SQL Server 
 statements produce a complete result set, but there are times when the results are best processed one row at a time. Opening a cursor on a result set allows processing the result set one row at a time. You can assign a cursor to a variable or parameter with a **cursor** data type.  
  
 Cursor operations are supported on these statements:  
  
 [CLOSE](close-transact-sql.md)  
  
 [CREATE PROCEDURE](../statements/create-procedure-transact-sql.md)  
  
 [DEALLOCATE](deallocate-transact-sql.md)  
  
 [DECLARE CURSOR](declare-cursor-transact-sql.md)  
  
 [DECLARE @local_variable](declare-local-variable-transact-sql.md)  
  
 [DELETE](../statements/delete-transact-sql.md)  
  
 [FETCH](fetch-transact-sql.md)  
  
 [OPEN](open-transact-sql.md)  
  
 [UPDATE](../queries/update-transact-sql.md)  
  
 [SET](../statements/set-statements-transact-sql.md)  
  
 These system functions and system stored procedures also support cursors:  
  
 [@@CURSOR_ROWS](../functions/cursor-rows-transact-sql.md)  
  
 [CURSOR_STATUS](../functions/cursor-status-transact-sql.md)  
  
 [@@FETCH_STATUS](../functions/fetch-status-transact-sql.md)  
  
 [sp_cursor_list](../../relational-databases/system-stored-procedures/sp-cursor-list-transact-sql.md)  
  
 [sp_describe_cursor](../../relational-databases/system-stored-procedures/sp-describe-cursor-transact-sql.md)  
  
 [sp_describe_cursor_columns](../../relational-databases/system-stored-procedures/sp-describe-cursor-columns-transact-sql.md)  
  
 [sp_describe_cursor_tables](../../relational-databases/system-stored-procedures/sp-describe-cursor-tables-transact-sql.md)  
  
## Related content

- [Cursors (SQL Server)](../../relational-databases/cursors.md)
