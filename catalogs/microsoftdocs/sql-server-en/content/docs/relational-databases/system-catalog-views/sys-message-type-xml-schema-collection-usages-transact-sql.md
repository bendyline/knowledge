---
title: "sys.message_type_xml_schema_collection_usages (Transact-SQL)"
description: sys.message_type_xml_schema_collection_usages (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "message_type_xml_schema_collection_usages_TSQL"
  - "sys.message_type_xml_schema_collection_usages_TSQL"
  - "sys.message_type_xml_schema_collection_usages"
  - "message_type_xml_schema_collection_usages"
helpviewer_keywords:
  - "sys.message_type_xml_schema_collection_usages catalog view"
dev_langs:
  - "TSQL"
---
# sys.message_type_xml_schema_collection_usages (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This catalog view returns a row for each service message type that is validated by an XML schema collection.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **message_type_id** | **int** | The ID of the service message type. Not NULLABLE. |
| **xml_collection_id** | **int** | The ID of the collection containing the validating XML schema namespace. Not NULLABLE. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).
