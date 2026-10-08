---
title: "MinDbCompatibilityLevel (geometry Data Type)"
description: "MinDbCompatibilityLevel (geometry Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "08/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
helpviewer_keywords:
  - "MinDbCompatibilityLevel method (geometry)"
dev_langs:
  - "TSQL"
---
# MinDbCompatibilityLevel (geometry Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns the minimum database compatibility level that recognizes the **geometry** data type instance.
  
## Syntax  
  
```  
  
.MinDbCompatibilityLevel ( )  
```  
  
## Return Types
  SQL Server 
 return type: **int**  
  
 CLR return type: **int**  
  
## Remarks  
 Use `MinDbCompatibilityLevel()` to test a spatial object for compatibility before changing the compatibility level on a database.  
  
## Examples  
  
### A. Testing CircularString type for compatibility with compatibility level 110  
 The following example tests a `CircularString` instance for compatibility with an earlier version of  SQL Server 
:  
  
```sql
 DECLARE @g geometry = 'CIRCULARSTRING(3 4, 8 9, 5 6)'; 
 IF @g.MinDbCompatibilityLevel() <= 110 
 BEGIN 
 SELECT @g.ToString(); 
 END
 ```  
  
### B. Testing LineString type for compatibility with compatibility level 100  
 The following example tests a `LineString` instance for compatibility with  SQL Server 2008 (10.0.x) 
:  
  
```sql
 DECLARE @g geometry = 'LINESTRING(3 4, 8 9, 5 6)'; 
 IF @g.MinDbCompatibilityLevel() <= 100 
 BEGIN 
 SELECT @g.ToString(); 
 END
``` 
  
## Related content

- [ALTER DATABASE (Transact-SQL) compatibility level](../statements/alter-database-transact-sql-compatibility-level.md)
