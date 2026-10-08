---
title: "sys.xml_schema_attributes (Transact-SQL)"
description: sys.xml_schema_attributes (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "xml_schema_attributes_TSQL"
  - "xml_schema_attributes"
  - "sys.xml_schema_attributes_TSQL"
  - "sys.xml_schema_attributes"
helpviewer_keywords:
  - "sys.xml_schema_attributes catalog view"
dev_langs:
  - "TSQL"
---
# sys.xml_schema_attributes (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns a row per XML schema component that is an attribute, **symbol_space** of **A**.  

| Column name | Data type | Description |
| --- | --- | --- |
| **\<inherited columns>** | -- | Inherits from [sys.xml_schema_components](sys-xml-schema-components-transact-sql.md). |
| **is_default_fixed** | **bit** | 1 = The default value is a fixed value. This value cannot be overridden in an XML instance.<br /><br /> 0 = The default value is not a fixed value for the attribute. (default) |
| **must_be_qualified** | **bit** | 1 = The attribute must be explicitly namespace qualified.<br /><br /> 0 = The attribute may be implicitly namespace qualified. (default) |
| **default_value** | **nvarchar**<br /><br /> **(4000)** | Default value of the attribute. Is NULL if a default value is not supplied. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [XML Schemas (XML Type System) Catalog Views (Transact-SQL)](xml-schemas-xml-type-system-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
