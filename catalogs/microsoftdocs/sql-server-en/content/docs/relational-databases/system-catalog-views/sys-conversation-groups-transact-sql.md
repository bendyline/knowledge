---
title: "sys.conversation_groups (Transact-SQL)"
description: sys.conversation_groups (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "conversation_groups_TSQL"
  - "conversation_groups"
  - "sys.conversation_groups"
  - "sys.conversation_groups_TSQL"
helpviewer_keywords:
  - "sys.conversation_groups catalog view"
dev_langs:
  - "TSQL"
---
# sys.conversation_groups (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This catalog view contains a row for each conversation group.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **conversation_group_id** | **uniqueidentifier** | Identifier for the conversation group. Not NULLABLE. |
| **service_id** | **int** | Identifier of the service for conversations in this group. Not NULLABLE. |
| **is_system** | **bit** | Indicates whether this is a system instance or not. NULLABLE. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).
