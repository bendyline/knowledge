---
title: "@@LANGUAGE (Transact-SQL)"
description: "@@LANGUAGE (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "@@LANGUAGE_TSQL"
  - "@@LANGUAGE"
helpviewer_keywords:
  - "languages [SQL Server], current in use"
  - "@@LANGUAGE function"
  - "current language in use"
  - "names [SQL Server], language in use"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# @@LANGUAGE (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the name of the language currently being used.  
  
 
  
## Syntax  
  
```syntaxsql  
@@LANGUAGE  
```  
  
## Return Types
 **nvarchar**  
  
## Remarks  
 To view information about language settings, including valid official language names, run **sp_helplanguage** without a parameter specified.  
  
## Examples  
 The following example returns the language for the current session.  
  
```sql  
SELECT @@LANGUAGE AS 'Language Name';  
```  
  
  Here's the result set. 
  
  
```  
Language Name                   
------------------------------  
us_english                      
```  
  
## Related content

- [SET LANGUAGE (Transact-SQL)](../statements/set-language-transact-sql.md)
- [sys.sp_helplanguage (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-helplanguage-transact-sql.md)
