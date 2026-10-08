---
title: "sys.service_queue_usages (Transact-SQL)"
description: sys.service_queue_usages (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.service_queue_usages"
  - "sys.service_queue_usages_TSQL"
  - "service_queue_usages"
  - "service_queue_usages_TSQL"
helpviewer_keywords:
  - "sys.service_queue_usages catalog view"
dev_langs:
  - "TSQL"
---
# sys.service_queue_usages (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This catalog view returns a row for each reference between service and service queue. A service can only be associated with one queue. A queue can be associated with multiple services.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **service_id** | **int** | Identifier of the service. Unique within the database. Not NULLABLE. |
| **service_queue_id** | **int** | Identifier of the service queue used by the service. Not NULLABLE. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [sys.services (Transact-SQL)](sys-services-transact-sql.md)
