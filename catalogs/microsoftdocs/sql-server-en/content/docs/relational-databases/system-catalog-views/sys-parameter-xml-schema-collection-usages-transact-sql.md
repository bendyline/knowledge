---
title: "sys.parameter_xml_schema_collection_usages (Transact-SQL)"
description: sys.parameter_xml_schema_collection_usages (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.parameter_xml_schema_collection_usages"
  - "parameter_xml_schema_collection_usages"
  - "parameter_xml_schema_collection_usages_TSQL"
  - "sys.parameter_xml_schema_collection_usages_TSQL"
helpviewer_keywords:
  - "sys.parameter_xml_schema_collection_usages catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.parameter_xml_schema_collection_usages (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns a row for each parameter that is validated by an XML schema.  
  
 | Column name | Data type | Description |
| --- | --- | --- |
| **object_id** | **int** | The ID of the object to which this parameter belongs. |
| **parameter_id** | **int** | The ID of the parameter.  Is unique within the object. |
| **xml_collection_id** | **int** | The ID of the XML schema collection that contains the validating XML schema namespace of the parameter. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [XML Schemas (XML Type System) Catalog Views (Transact-SQL)](xml-schemas-xml-type-system-catalog-views-transact-sql.md)
