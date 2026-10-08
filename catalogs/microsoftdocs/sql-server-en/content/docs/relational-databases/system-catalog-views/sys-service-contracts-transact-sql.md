---
title: "sys.service_contracts (Transact-SQL)"
description: sys.service_contracts (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "service_contracts_TSQL"
  - "sys.service_contracts_TSQL"
  - "sys.service_contracts"
  - "service_contracts"
helpviewer_keywords:
  - "sys.service_contracts catalog view"
dev_langs:
  - "TSQL"
---
# sys.service_contracts (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This catalog view contains a row for each contract in the database.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **name** | **sysname** | Name of the contract, unique within the database. Not NULLABLE. |
| **service_contract_id** | **int** | Identifier of the contract. Not NULLABLE. |
| **principal_id** | **int** | Identifier for the database principal that owns this contract. NULLABLE. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).
