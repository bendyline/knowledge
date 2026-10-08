---
title: "SQL Server Utilities Statements - GO"
description: "SQL Server Utilities Statements - GO"
author: rwestMSFT
ms.author: randolphwest
ms.date: "07/27/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "GO"
  - "GO_TSQL"
helpviewer_keywords:
  - "batches [SQL Server], ending"
  - "ending batches [SQL Server]"
  - "GO command"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# SQL Server Utilities Statements - GO

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



   SQL Server 
 provides commands that are not  Transact-SQL  statements, but are recognized by the **sqlcmd** and **osql** utilities and  SQL Server Management Studio 
 Code Editor. These commands can be used to facilitate the readability and execution of batches and scripts.  
  
  GO signals the end of a batch of  Transact-SQL  statements to the  SQL Server 
 utilities.  
  
 
  
## Syntax  
  
```syntaxsql  
GO [count]  
```  
  
## Arguments
 *count*  
 Is a positive integer. The batch preceding GO will execute the specified number of times.  
  
## Remarks  
 GO is not a  Transact-SQL  statement; it is a command recognized by the **sqlcmd** and **osql** utilities and  SQL Server Management Studio 
 Code editor.  
  
  SQL Server 
 utilities interpret GO as a signal that they should send the current batch of  Transact-SQL  statements to an instance of  SQL Server 
. The current batch of statements is composed of all statements entered since the last GO, or since the start of the ad hoc session or script if this is the first GO.  
  
 A  Transact-SQL  statement cannot occupy the same line as a GO command. However, the line can contain comments.  
  
 Users must follow the rules for batches. For example, any execution of a stored procedure after the first statement in a batch must include the EXECUTE keyword. The scope of local (user-defined) variables is limited to a batch, and cannot be referenced after a GO command.  
  
```sql  
USE AdventureWorks2022;  
GO  
DECLARE @MyMsg VARCHAR(50)  
SELECT @MyMsg = 'Hello, World.'  
GO -- @MyMsg is not valid after this GO ends the batch.  
  
-- Yields an error because @MyMsg not declared in this batch.  
PRINT @MyMsg  
GO  
  
SELECT @@VERSION;  
-- Yields an error: Must be EXEC sp_who if not first statement in   
-- batch.  
sp_who  
GO  
```  
  
  SQL Server 
 applications can send multiple  Transact-SQL  statements to an instance of  SQL Server 
 for execution as a batch. The statements in the batch are then compiled into a single execution plan. Programmers executing ad hoc statements in the  SQL Server 
 utilities, or building scripts of  Transact-SQL  statements to run through the  SQL Server 
 utilities, use GO to signal the end of a batch.  
  
 Applications based on the ODBC or OLE DB APIs receive a syntax error if they try to execute a GO command. The  SQL Server 
 utilities never send a GO command to the server.  
  
 Do not use a semicolon as a statement terminator after GO.
 
```sql
-- Yields an error because ; is not permitted after GO  
SELECT @@VERSION;  
GO;  
```

 In the Microsoft Fabric portal SQL query editor, each SQL statement runs as an independent session. Session context does not persist across SQL statements. For more information, see [SQL query editor](https://learn.microsoft.com/fabric/data-warehouse/sql-query-editor#limitations).
  
## Permissions  
 GO is a utility command that requires no permissions. It can be executed by any user.    
  
## Examples  
 The following example creates two batches. The first batch contains only a `USE AdventureWorks2022` statement to set the database context. The remaining statements use a local variable. Therefore, all local variable declarations must be grouped in a single batch. This is done by not having a `GO` command until after the last statement that references the variable.  
  
```sql  
USE AdventureWorks2022;  
GO  
DECLARE @NmbrPeople INT  
SELECT @NmbrPeople = COUNT(*)  
FROM Person.Person;  
PRINT 'The number of people as of ' +  
      CAST(GETDATE() AS CHAR(20)) + ' is ' +  
      CAST(@NmbrPeople AS CHAR(10));  
GO  
```  
  
 The following example executes the statements in the batch twice.  
  
```sql  
SELECT DB_NAME();  
SELECT USER_NAME();  
GO 2  
```
