---
title: "sys.xml_schema_collections (Transact-SQL)"
description: sys.xml_schema_collections (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.xml_schema_collections_TSQL"
  - "sys.xml_schema_collections"
  - "xml_schema_collections"
  - "xml_schema_collections_TSQL"
helpviewer_keywords:
  - "sys.xml_schema_collections catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.xml_schema_collections (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns a row per XML schema collection. An XML schema collection is a named set of XSD definitions. The XML schema collection itself is contained in a relational schema, and it is identified by a schema-scoped  Transact-SQL  name. The following tuples are unique: xml_collection_id, and schema_id and name.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| xml_collection_id | **int** | ID of the XML schema collection. Unique within the database. |
| schema_id | **int** | ID of the relational schema that contains this XML schema collection. |
| principal_id | **int** | ID of the individual owner if different from the schema owner. By default, schema-contained objects are owned by the schema owner. However, an alternate owner may be specified by using the ALTER AUTHORIZATION statement to change ownership.<br /><br /> NULL = No alternate individual owner. |
| name | **sysname** | Name of the XML schema collection. |
| create_date | **datetime** | Date the XML schema collection was created. |
| modify_date | **datetime** | Date the XML schema collection was last altered. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [XML Schemas (XML Type System) Catalog Views (Transact-SQL)](xml-schemas-xml-type-system-catalog-views-transact-sql.md)
- [Querying the SQL Server System Catalog FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-catalog-views/querying-the-sql-server-system-catalog-faq.yml)
