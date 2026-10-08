---
title: "sys.partition_schemes (Transact-SQL)"
description: sys.partition_schemes (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "partition_schemes_TSQL"
  - "partition_schemes"
  - "sys.partition_schemes_TSQL"
  - "sys.partition_schemes"
helpviewer_keywords:
  - "sys.partition_schemes catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric"
---
# sys.partition_schemes (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Contains a row for each Data Space that is a partition scheme, with **type** = PS.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **\<inherited columns>** |  | Inherits columns from [sys.data_spaces (Transact-SQL)](sys-data-spaces-transact-sql.md). |
| **function_id** | **int** | ID of partition function used in the scheme. |
  
 For a list of columns that this view inherits, see [sys.data_spaces (Transact-SQL)](sys-data-spaces-transact-sql.md)  
  
## Permissions  
 Requires membership in the **public** role. For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [Querying the SQL Server System Catalog FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-catalog-views/querying-the-sql-server-system-catalog-faq.yml)
