---
title: "SQL database in Fabric"
description: Learn about SQL database in Microsoft Fabric, based on Azure SQL Database, a developer-friendly operational database.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, sukkaur
ms.date: 10/17/2024
ms.service: fabric
ms.topic: concept-article
ms.custom:
  - ignite-2025
monikerRange: "=azuresqldb-current || =fabric-sqldb"
---
# SQL database in Fabric

**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)

 
](../sql-docs-navigation-guide.md#applies-to)


With [SQL database in Microsoft Fabric](https://learn.microsoft.com/fabric/database/sql/overview), based on [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview?view=azuresqldb-current\&preserve-view=true), you can easily create your operational database in Fabric.

## What is the SQL database in Fabric?

To learn more about SQL Database in Microsoft Fabric, see:

- [Features comparison: Azure SQL Database and SQL database in Fabric](https://learn.microsoft.com/fabric/database/sql/feature-comparison-sql-database-fabric)
- [FAQ for SQL database in Fabric](https://learn.microsoft.com/fabric/database/sql/faq)
- [Microsoft Fabric decision guide: choose a SQL database](https://learn.microsoft.com/fabric/database/sql/decision-guide)

To get started, [create a SQL database in the Fabric portal](https://learn.microsoft.com/fabric/database/sql/create) then [connect to your SQL database in Microsoft Fabric](https://learn.microsoft.com/fabric/database/sql/connect).

## Mirroring with SQL database in Fabric

With [SQL database in Fabric](https://learn.microsoft.com/fabric/database/sql/overview), your data is automatically accessible from other Fabric experiences. Your SQL database in Fabric is mirrored to OneLake and presented in a read-only, queryable format. You can use all the different services in Fabric, including analytics with Spark, executing notebooks, data engineering, Power BI Reports, and more.

SQL database in Fabric uses similar change feed technology as the [Fabric mirrored database feature for Azure SQL Database](fabric-mirrored-databases.md), and shares some system objects. SQL database in Fabric contains a `changefeed` database user, a `changefeed` schema, and several tables within the `changefeed` schema in your source database. Do not alter any of these system-managed objects.

## Related content

- [SQL database in Fabric](https://learn.microsoft.com/fabric/database/sql/overview)
- [What is Microsoft Fabric?](https://learn.microsoft.com/fabric/get-started/microsoft-fabric-overview)
