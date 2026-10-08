---
title: "Connecting to SQL Server (AccessToSQL)"
description: Learn how to connect to a target instance of SQL Database to migrate Access databases. SSMA obtains metadata about databases in SQL Database.
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
  - "authentication"
  - "instance of SQL Server"
  - "metadata, refreshing"
  - "ports"
  - "refreshing metadata"
  - "spaces in database names"
  - "special characters"
  - "SQL Server"
  - "SQL Server, connecting"
  - "SQL Server, connecting to"
  - "SQL Server, reconnecting"
---

# Connect to SQL Server (AccessToSQL)

You can use SQL Server Migration Assistant (SSMA) to migrate Access databases to  SQL Server 
. When you connect to the target instance of the  SQL Server 
 instance, SSMA obtains and displays database metadata in **SQL Server Metadata Explorer**. SSMA stores information about which instance of  SQL Server 
 that you're connected to, but it doesn't store passwords.

Your connection to  SQL Server 
 stays active until you close the project. When you reopen the project, you must reconnect to  SQL Server 
 if you want an active connection to the server. You can work offline until you load database objects into  SQL Server 
 and migrate data.

Metadata about the instance of  SQL Server 
 isn't automatically synchronized. Instead, to update the metadata in **SQL Server Metadata Explorer**, you must manually update the  SQL Server 
 metadata. For more information, see the "Synchronizing SQL Server Metadata" section later in this article.

## Required SQL Server permissions

The account that you use to connect to  SQL Server 
 requires different permissions depending on the actions that the account performs:

- To convert Access objects to  Transact-SQL  syntax, to update metadata from  SQL Server 
, or to save converted syntax to scripts, the account must have permission to sign in to the instance of  SQL Server 
.

- To load database objects into  SQL Server 
, the account must be a member of the **db_ddladmin** database role.

- To migrate data to  SQL Server 
, the account must be a member of the **db_owner** database role.

## Establish a SQL Server connection

Before you convert Access database objects to  SQL Server 
 syntax, you must connect to the instance of  SQL Server 
 where you want to migrate the Access databases.

When you define the connection properties, you also specify the database where you want to migrate objects and data. You can customize this mapping at the Access database level after you connect to  SQL Server 
. For more information, see [Map source and target databases](mapping-source-and-target-databases-accesstosql.md).

> **Important:**  
> Before you connect to  SQL Server 
, make sure that the instance of  SQL Server 
 is running and can accept connections.

To connect to  SQL Server 
:

1. On the **File** menu, select **Connect to SQL Server**.
   If you previously connected to  SQL Server 
, the command name is **Reconnect to SQL Server**.

1. In the **Server name** box, enter or select the name of the instance of  SQL Server 
.
   - If you're connecting to the default instance on the local computer, enter `localhost` or a dot (`.`).
   - If you're connecting to the default instance on another computer, enter the name of the computer.
   - If you're connecting to a named instance, enter the computer name, a backslash, and the instance name. For example: `MyServer\MyInstance`.
   - To connect to an active user instance of  SQL Server Express 
, connect by using named pipes protocol and specifying the pipe name, such as `\\.\pipe\sql\query`. For more information, see the  SQL Server Express 
 documentation.

1. If you configure your instance of  SQL Server 
 to accept connections on a non-default port, enter the port number in the **Server port** box. For the default instance of  SQL Server 
, the default port number is 1433. For named instances, SSMA tries to obtain the port number from the  SQL Server 
 Browser Service.

1. In the **Database** box, enter the name of the target database for object and data migration.
   This option isn't available when reconnecting to  SQL Server 
.
   The target database name can't contain spaces or special characters. For example, you can migrate Access databases to a  SQL Server 
 database named `abc`. But you can't migrate Access databases to a  SQL Server 
 database named `a b-c`.
   You can customize this mapping per database after you connect. For more information, see [Map source and target databases](mapping-source-and-target-databases-accesstosql.md).

1. In the **Authentication** dropdown list, select the authentication type to use for the connection. To use the current Windows account, select **Windows Authentication**. To use a  SQL Server 
 login, select **SQL Server Authentication**, and then provide a user name and password.

1. For a secure connection, you can use a combination of two checkboxes: **Encrypt Connection** and **TrustServerCertificate**. **TrustServerCertificate** checkbox is visible only when the **Encrypt Connection** checkbox is checked. When **Encrypt Connection** is checked (true) and **TrustServerCertificate** is unchecked (false), SSMA validates the  SQL Server 
 SSL/TLS certificate. Validating the server certificate is a part of the SSL/TLS handshake, which ensures that the server is the correct server to connect to. A valid certificate must be installed on both the client and the server.

1. Select **Connect**.

> **Important:**  
> While you might connect to a higher version of  SQL Server 
, compared to the version chosen when you created the migration project, conversion of the database objects is determined by the target version of the project and not the version of the  SQL Server 
 you're connected to.

## Synchronize SQL Server metadata

If  SQL Server 
 schemas change after you connect, you can synchronize the metadata with the server.

To synchronize SQL Server metadata, **SQL Server Metadata Explorer**, right-click **Databases**, and then select **Synchronize with Database**.

## Reconnect to SQL Server

Your connection to  SQL Server 
 stays active until you close the project. When you reopen the project, you must reconnect to  SQL Server 
 if you want an active connection to the server. You can work offline until you load database objects into  SQL Server 
 and migrate data.

The procedure for reconnecting to  SQL Server 
 is the same as the procedure for establishing a connection.

## Related content

- [Migrate Access databases to SQL Server and Azure SQL](migrating-access-databases-to-sql-server-azure-sql-db-accesstosql.md)
- [Map source and target databases](mapping-source-and-target-databases-accesstosql.md)
- [Convert Access database objects](converting-access-database-objects-accesstosql.md)
