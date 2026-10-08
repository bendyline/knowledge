---
title: "Connecting to Azure SQL (AccessToSQL)"
description: Learn how to connect to a target instance of Azure SQL Database to migrate Access databases. SSMA obtains metadata about databases in Azure SQL Database.
author: nilabjaball
ms.author: niball
ms.reviewer: randolphwest
ms.date: 12/30/2025
ms.service: sql
ms.subservice: ssma
ms.topic: how-to
ms.collection:
  - sql-migration-content
helpviewer_keywords:
  - "instance of Azure SQL"
  - "metadata, refreshing"
  - "refreshing metadata"
  - "Azure SQL"
  - "Azure SQL, connecting"
  - "Azure SQL, connecting to"
  - "Azure SQL, reconnecting"
  - "Azure SQL, synchronizing metadata"
---
# Connect to Azure SQL (AccessToSQL)

To migrate Access databases to  Azure SQL Database 
, you must connect to the target instance of  Azure SQL Database 
. When you connect, SQL Server Migration Assistant (SSMA) obtains metadata about all the databases in the instance of  Azure SQL Database 
 and displays database metadata in the **Azure SQL Database Metadata Explorer**. SSMA stores information about which instance of  Azure SQL Database 
 you're connected to, but doesn't store passwords.

Your connection to  Azure SQL Database 
 stays active until you close the project. When you reopen the project, you must reconnect to  Azure SQL Database 
 if you want an active connection to the server. You can work offline until you load database objects into  Azure SQL Database 
 and migrate data.

Metadata about the instance of  Azure SQL Database 
 isn't automatically synchronized. Instead, to update the metadata in **Azure SQL Database Metadata Explorer**, you must manually update the  Azure SQL Database 
 metadata. For more information, see the [Synchronize Azure SQL Database metadata](#synchronize-azure-sql-database-metadata) section in this article.

## Required Azure SQL Database permissions

The account that is used to connect to  Azure SQL Database 
 requires different permissions depending on the actions that the account performs:

- To convert Access objects to  Transact-SQL  syntax, to update metadata from  Azure SQL Database 
, or to save converted syntax to scripts, the account must have permission to sign in to the instance of  Azure SQL Database 
.

- To load database objects into  Azure SQL Database 
, the account must be a member of the **db_ddladmin** database role.

- To migrate data to  Azure SQL Database 
, the account must be a member of the **db_owner** database role.

## Establish an Azure SQL Database connection

Before you convert Access database objects to  Azure SQL Database 
 syntax, you must establish a connection to the instance of  Azure SQL Database 
 where you want to migrate the Access database or databases.

When you define the connection properties, you also specify the database where objects and data are migrated. You can customize this mapping at the Access schema level after you connect to  Azure SQL Database 
. For more information, see [Map source and target databases](mapping-source-and-target-databases-accesstosql.md).

> **Important:**  
> Before you try to connect to  Azure SQL Database 
, make sure that your IP address is allowed through the  Azure SQL Database 
 firewall.

To connect to  Azure SQL Database 
:

1. On the **File** menu, select **Connect to Azure SQL** (this option is enabled after the creation of a project).

   If you previously connected to  Azure SQL Database 
, the command name is **Reconnect to Azure SQL**.

1. In the connection dialog box, enter or select the server name of  Azure SQL Database 
.

1. Enter, select, or **Browse** the Database name.

1. Enter or select **Username**.

1. Enter the **Password**.

1. SSMA recommends encrypted connection to  Azure SQL Database 
.

1. Select **Connect**.

If there are no databases in the  Azure SQL Database 
, you can create the first database using **Create Azure Database** option that appears on the select of **Browse** button.

## Synchronize Azure SQL Database metadata

Metadata about databases in  Azure SQL Database 
 isn't automatically updated. The metadata in **Azure SQL Database Metadata Explorer** is a snapshot of the metadata when you first connected to  Azure SQL Database 
, or the last time that you manually updated metadata. You can manually update metadata for all databases, or for any single database or database object. To synchronize metadata:

1. Make sure that you're connected to  Azure SQL Database 
.

1. In **Azure SQL Database Metadata Explorer**, select the check box next to the database or database schema that you want to update.
   For example, to update the metadata for all databases, select the box next to **Databases**.

1. Right-click **Databases**, or the individual database or database schema, and then select **Synchronize with Database**.

## Refresh Azure SQL Database metadata

If  Azure SQL Database 
 schemas change after you connect, you can refresh metadata from the server.

To refresh  Azure SQL Database 
 metadata:

- In **Azure SQL Database Metadata Explorer**, right-click **Databases**, and then select **Refresh from Database**.

## Reconnect to Azure SQL Database

Your connection to  Azure SQL Database 
 stays active until you close the project. When you reopen the project, you must reconnect to  Azure SQL Database 
 if you want an active connection to the server. You can work offline until you load database objects into  Azure SQL Database 
 and migrate data.

The procedure for reconnecting to  Azure SQL Database 
 is the same as the procedure for establishing a connection.

## Related content

- [Migrate Access databases to SQL Server and Azure SQL](migrating-access-databases-to-sql-server-azure-sql-db-accesstosql.md)
- [Map source and target databases](mapping-source-and-target-databases-accesstosql.md)
- [Set conversion and migration options](setting-conversion-and-migration-options-accesstosql.md)
- [Map source and target data types](mapping-source-and-target-data-types-accesstosql.md)
- [Convert Access database objects](converting-access-database-objects-accesstosql.md)
