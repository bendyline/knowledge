---
title: "sys.service_contract_usages (Transact-SQL)"
description: sys.service_contract_usages (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "service_contract_usages"
  - "sys.service_contract_usages"
  - "sys.service_contract_usages_TSQL"
  - "service_contract_usages_TSQL"
helpviewer_keywords:
  - "sys.service_contract_usages catalog view"
dev_langs:
  - "TSQL"
---
# sys.service_contract_usages (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This catalog view contains a row per (service, contract) pair.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **service_id** | **int** | Identifier of the service using the contract. Not NULLABLE. |
| **service_contract_id** | **int** | Identifier of the contract used by the service. Not NULLABLE. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).
