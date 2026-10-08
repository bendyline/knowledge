---
title: "sys.column_type_usages (Transact-SQL)"
description: sys.column_type_usages (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "column_type_usages"
  - "sys.column_type_usages_TSQL"
  - "column_type_usages_TSQL"
  - "sys.column_type_usages"
helpviewer_keywords:
  - "sys.column_type_usages catalog view"
dev_langs:
  - "TSQL"
---
# sys.column_type_usages (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each column that is of user-defined type.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **object_id** | **int** | ID of the object to which this column belongs. |
| **column_id** | **int** | ID of the column. Is unique within the object. |
| **user_type_id** | **int** | ID of the user-defined type.<br /><br /> To return the name of the type, join to the [sys.types](sys-types-transact-sql.md) catalog view on this column. |
  
## Permissions  
 Requires membership in the **public** role. For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Scalar Types Catalog Views (Transact-SQL)](scalar-types-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [Querying the SQL Server System Catalog FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-catalog-views/querying-the-sql-server-system-catalog-faq.yml)
