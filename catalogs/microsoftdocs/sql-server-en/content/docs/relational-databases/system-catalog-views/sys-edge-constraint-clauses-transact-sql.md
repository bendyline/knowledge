---
title: "sys.edge_constraint_clauses (Transact-SQL)"
description: sys.edge_constraint_clauses (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "09/17/2018"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.edge_constraint_clauses"
  - "edge_constraint_clauses"
  - "SQL Graph"
  - "edge_constraints_TSQL"
helpviewer_keywords:
  - "sys.edge_constraint_clauses catalog view"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017||>=sql-server-linux-2017||=azuresqldb-mi-current"
---
# sys.edge_constraint_clauses (Transact-SQL)

**Applies to:**
 






Contains one row per clause of an edge constraint.
  
| Column name | Data type | Description |
| --- | --- | --- |
| **object_id** | **int** | object_id of the edge constraint. |
| **from_object_id** | **int** | object_id of the FROM node table. |
| **to_object_id** | **int** | object_id of the TO node table. |
| **clause_number** | **int** | Internally generated integer index of the clause. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [Querying the SQL Server System Catalog FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-catalog-views/querying-the-sql-server-system-catalog-faq.yml)
