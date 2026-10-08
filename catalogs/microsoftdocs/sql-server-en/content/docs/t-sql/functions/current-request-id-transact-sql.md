---
title: "CURRENT_REQUEST_ID (Transact-SQL)"
description: "CURRENT_REQUEST_ID (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "07/24/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "CURRENT_REQUEST_ID_TSQL"
  - "CURRENT_REQUEST_ID"
helpviewer_keywords:
  - "CURRENT_REQUEST_ID"
dev_langs:
  - "TSQL"
---
# CURRENT_REQUEST_ID (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





This function returns the ID of the current request within the current session.
  

  
## Syntax  
  
```syntaxsql
CURRENT_REQUEST_ID()  
```  

## Return types
**smallint**
  
## Remarks  
To find exact information about the current session, use @@SPID. For exact information about the current request, use CURRENT_REQUEST_ID().
  
## Related content

- [@@SPID (Transact-SQL)](spid-transact-sql.md)
