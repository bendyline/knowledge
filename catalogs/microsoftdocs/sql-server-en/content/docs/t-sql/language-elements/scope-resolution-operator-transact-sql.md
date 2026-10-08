---
title: ":: (Scope Resolution) (Transact-SQL)"
description: ":: (Scope Resolution) (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
dev_langs:
  - "TSQL"
---

# :: (Scope Resolution) (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  The scope resolution operator **::** provides access to static members of a compound data type. A compound data type is one that contains multiple simple data types and methods. Compound data types include the built-in CLR types and custom SQLCLR User-Defined Types (UDTs).  
  
## Examples  
 The following example shows how to use the scope resolution operator to access the `GetRoot()` member of the `hierarchyid` type.  
  
```sql  
DECLARE @hid hierarchyid;  
SELECT @hid = hierarchyid::GetRoot();  
PRINT @hid.ToString();  
```  
  
  Here's the result set. 
  
  
 `/`  
  
## Related content

- [Operators (Transact-SQL)](operators-transact-sql.md)
