---
title: "sys.services (Transact-SQL)"
description: sys.services (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.services"
  - "services"
  - "services_TSQL"
  - "sys.services_TSQL"
helpviewer_keywords:
  - "sys.services catalog view"
dev_langs:
  - "TSQL"
---
# sys.services (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This catalog view contains a row for each service in the database.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **name** | **sysname** | Case-sensitive name of service, unique within the database. Not NULLABLE. |
| **service_id** | **int** | Identifier of the service. Not NULLABLE. |
| **principal_id** | **int** | Identifier for the database principal that owns this service. NULLABLE. |
| **service_queue_id** | **int** | Object id for the queue that this service uses. Not NULLABLE. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).
