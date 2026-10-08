---
title: "Map Oracle Schemas to SQL Server Schemas (OracleToSQL)"
description: Learn how to either accept the default settings or customize SSMA for Oracle mappings between Oracle schemas and SQL Server.
author: nilabjaball
ms.author: niball
ms.reviewer: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: ssma
ms.topic: how-to
ms.collection:
  - sql-migration-content
f1_keywords:
  - "ssma.oracle.schemamappingpanel.f1"
---

# Map Oracle schemas to SQL Server schemas (OracleToSQL)

In Oracle, each database has one or more schemas. By default, Microsoft SQL Server Migration Assistant (SSMA) for Oracle migrates all objects in an Oracle schema to a  SQL Server 
 database named for the schema. However, you can customize the mapping between Oracle schemas and  SQL Server 
 databases.

## Oracle and SQL Server schemas

An Oracle database contains schemas. An instance of  SQL Server 
 contains multiple databases, each of which can have multiple schemas.

The Oracle concept of a schema maps to the  SQL Server 
 concept of a database and one of its schemas. For example, Oracle might have a schema named **HR**. An instance of  SQL Server 
 might have a database named **SampleDatabase**, and within that database, there might be multiple schemas. By default, the Oracle schema **HR** is mapped to the  SQL Server 
 database and schema **SampleDatabase.HR**. The SSMA definition of a schema is the  SQL Server 
 combination of a database and a schema.

You can modify the mapping between Oracle and  SQL Server 
 schemas.

## Modify the target database and schema

In SSMA, you can map an Oracle schema to any available  SQL Server 
 schema.

## Modify the database and schema

1. In Oracle Metadata Explorer, select **Schemas**.

1. On the right pane, select the **Schema Mapping** tab. You see a list of all Oracle schemas, followed by a target value. This target is denoted in a two-part notation (`database.schema`) in  SQL Server 
 where your objects and data are migrated.

1. Select the row that contains the mapping that you want to change, and then select **Modify**.

1. In the **Choose Target Schema** dialog, you can either browse for an available target database and schema, or enter the database and schema name in the textbox in a two-part notation (`database.schema`), and then select **OK**. The target changes on the **Schema Mapping** tab.

> **Note:**  
> The **Schema Mapping** tab is also available when you select an individual database, the **Schemas** folder, or individual schemas. The list in the **Schema Mapping** tab is customized for the selected object.

## Modes of mapping to SQL Server

You can map a source database to any target database. By default, a source database is mapped to a target  SQL Server 
 database that you connected to by using SSMA. If the target database being mapped doesn't exist on  SQL Server 
, you're prompted with a message "The Database and/or schema doesn't exist in target  SQL Server 
 metadata. It would be created during synchronization. Do you wish to continue?" Select **Yes**. Similarly, you can map a schema to a nonexisting schema under target  SQL Server 
 database, which is created during synchronization.

## Revert to the default database and schema

If you customize the mapping between an Oracle schema and a  SQL Server 
 schema, you can revert the mapping back to the default values.

To revert to the default database and schema, under the **Schema Mapping** tab, select any row and choose **Reset to Default**.

## Related content

- [Assess Oracle schemas for conversion](assessing-oracle-schemas-for-conversion-oracletosql.md)
- [Convert Oracle schemas](converting-oracle-schemas-oracletosql.md)
