---
title: "sys.numbered_procedures (Transact-SQL)"
description: sys.numbered_procedures (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.numbered_procedures_TSQL"
  - "numbered_procedures"
  - "sys.numbered_procedures"
  - "numbered_procedures_TSQL"
helpviewer_keywords:
  - "sys.numbered_procedures catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric"
---
# sys.numbered_procedures (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Contains a row for each SQL Server stored procedure that was created as a numbered procedure. This does not show a row for the base (number = 1) stored procedure. Entries for the base stored procedures can be found in views such as **sys.objects** and **sys.procedures**.  
  
> **Important:**  
>  Numbered procedures are deprecated. Use of numbered procedures is discouraged. A DEPRECATION_ANNOUNCEMENT event is fired when a query that uses this catalog view is compiled.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **object_id** | **int** | ID of the object of the stored procedure. |
| **procedure_number** | **smallint** | Number of this procedure within the object, 2 or greater. |
| **definition** | **nvarchar(max)** | The SQL Server text that defines this procedure.<br /><br /> NULL = encrypted. |
  
> **Note:**  
>  XML and CLR parameters are not supported for numbered procedures.  
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
