---
title: "sys.service_message_types (Transact-SQL)"
description: sys.service_message_types (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.service_message_types"
  - "service_message_types"
  - "sys.service_message_types_TSQL"
  - "service_message_types_TSQL"
helpviewer_keywords:
  - "sys.service_message_types catalog view"
dev_langs:
  - "TSQL"
---
# sys.service_message_types (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This catalog view contains a row per message type registered in the service broker.
  
| Column name | Data type | Description |
| --- | --- | --- |
| **name** | **sysname** | Name of message type, unique within the database. Not NULLABLE. |
| **message_type_id** | **int** | Identifier of the message type, unique within the database. Not NULLABLE. |
| **principal_id** | **int** | Identifier for the database principal that owns this message type. NULLABLE. |
| **validation** | **char(2)** | Validation done by Broker prior to sending messages of this type. Not NULLABLE. One of:<br /><br /> N = None<br /><br /> X = XML<br /><br /> E = Empty |
| **validation_desc** | **nvarchar(60)** | Description of the validation done by Broker prior to sending messages of this type. NULLABLE. One of:<br /><br /> NONE<br /><br /> XML<br /><br /> EMPTY |
| **xml_collection_id** | **int** | For validation that uses an XML schema, the identifier for the schema collection used.<br /><br /> Otherwise, NULL. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).
