---
title: "sys.fn_helpcollations (Transact-SQL)"
description: "sys.fn_helpcollations (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "08/23/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "fn_helpcollations"
  - "fn_helpcollations_TSQL"
helpviewer_keywords:
  - "sys.fn_helpcollations function"
  - "collations [SQL Server], supported"
  - "fn_helpcollations function"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || =azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# sys.fn_helpcollations (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns a list of all supported collations.  
  
 
  
## Syntax  
  
```
fn_helpcollations ()  
```  
  
## Tables Returned

 **fn_helpcollations** returns the following information.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| Name | **sysname** | Standard collation name |
| Description | **nvarchar(1000)** | Description of the collation |
  
  SQL Server 
 supports Windows collations.  SQL Server 
 also supports a limited number (<80) of collations called  SQL Server 
 collations, that were developed before  SQL Server 
 supported Windows collations.  SQL Server 
 collations are still supported for backward compatibility, but shouldn't be used for new development work. For more information about Windows collations, see [Windows Collation Name &#40;Transact-SQL&#41;](../../t-sql/statements/windows-collation-name-transact-sql.md). For more information about collations, see [Collation and Unicode Support](../collations/collation-and-unicode-support.md).  
  
## Examples

 The following example returns all collation names starting with the letter `L` and that are binary sort collations.

> **Note:**
> Azure Synapse Analytics queries against fn_helpcollations() must be run in the master database.  
  
```sql  
SELECT Name, Description FROM fn_helpcollations()  
WHERE Name like 'L%' AND Description LIKE '% binary sort';  
```  
  
  Here's the result set. 
  
  
 ```
 Name                   Description  
 -------------------    ------------------------------------  
 Lao_100_BIN            Lao-100, binary sort  
 Latin1_General_BIN     Latin1-General, binary sort  
 Latin1_General_100_BIN Latin1-General-100, binary sort  
 Latvian_BIN            Latvian, binary sort  
 Latvian_100_BIN        Latvian-100, binary sort  
 Lithuanian_BIN         Lithuanian, binary sort  
 Lithuanian_100_BIN     Lithuanian-100, binary sort  
  
 (7 row(s) affected)  
 ```
  
## Related content

- [COLLATE (Transact-SQL)](../../t-sql/statements/collations.md)
- [Collation Functions - COLLATIONPROPERTY (Transact-SQL)](../../t-sql/functions/collation-functions-collationproperty-transact-sql.md)
- [Collation and Unicode support](../collations/collation-and-unicode-support.md)
