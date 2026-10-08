---
title: "VERSION (Transact-SQL)"
description: "Version - Transact-SQL Metadata functions"
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest"
---
# Version - Transact-SQL Metadata functions

**Applies to:**
 


 


 Returns the version of  Azure Synapse Analytics  running on the appliance.  
  

  
## Syntax  
  
```syntaxsql
-- Azure Synapse Analytics
VERSION ( )  
```  
  
## Arguments  
  
## General Remarks  
A table name must be specified in a [FROM](../queries/from-transact-sql.md) clause for this function to return results. A result row will be returned for each row in the result set for the query; use [TOP (Transact-SQL)](../queries/top-transact-sql.md) to limit the number of returned rows.  
  
## Examples  
The following example returns the version number.  
  
```sql
SELECT VERSION();  
```  
  
## Related content

- [SESSION_ID (Transact-SQL)](session-id-transact-sql.md)
- [DB_NAME (Transact-SQL)](db-name-transact-sql.md)
