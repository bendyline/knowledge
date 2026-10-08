---
title: -- (Comment) (Transact-SQL)
description: "-- (Comment) (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "07/25/2019"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "--_TSQL"
  - "Comment"
  - "--"
helpviewer_keywords:
  - "nonexecuting text strings [SQL Server]"
  - "remarks [SQL Server]"
  - "-- (comment character)"
  - "comments [SQL Server]"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---

# -- (Comment) (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Indicates user-provided text. Comments can be inserted on a separate line, nested at the end of a  Transact-SQL  command line, or within a  Transact-SQL  statement. The server does not evaluate the comment.  
  

  
## Syntax  
  
```syntaxsql
-- text_of_comment  
```  
  
## Arguments
 *text_of_comment*  
 Is the character string that contains the text of the comment.  
  
## Remarks  
Use two hyphens (**--**) for single-line or nested comments. Comments inserted with **--** are terminated by a new line, which is specified with a carriage return character (U+000A), line feed character (U+000D), or a combination of the two. There is no maximum length for comments. The following table lists the keyboard shortcuts that you can use to comment or uncomment text.
  
| Action | Standard |
| --- | --- |
| Make the selected text a comment | CTRL+K, CTRL+C |
| Uncomment the selected text | CTRL+K, CTRL+U |
  
 For more information about keyboard shortcuts, see [SQL Server Management Studio Keyboard Shortcuts](https://learn.microsoft.com/ssms/sql-server-management-studio-keyboard-shortcuts).  
  
 For multiline comments, see [Slash Star (Block Comment) (Transact-SQL)](slash-star-comment-transact-sql.md).  
  
## Examples  
 The following example uses the -- commenting characters.  
  
```sql  
-- Choose the AdventureWorks2022 database.  
USE AdventureWorks2022;  
GO  
-- Choose all columns and all rows from the Address table.  
SELECT *  
FROM Person.Address  
ORDER BY PostalCode ASC; -- We do not have to specify ASC because   
-- that is the default.  
GO  
```  
  
## Related content

- [Control-of-Flow](control-of-flow.md)
