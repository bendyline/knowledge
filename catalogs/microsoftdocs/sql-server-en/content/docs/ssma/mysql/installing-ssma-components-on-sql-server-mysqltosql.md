---
title: "Install SSMA components on SQL Server (MySQLToSQL)"
description: Install components on the server that runs SQL Server to support MySQL database conversion with SSMA, including the SSMA extension pack and MySQL providers.
author: nilabjaball
ms.author: niball
ms.reviewer: randolphwest
ms.date: 07/22/2024
ms.service: sql
ms.subservice: ssma
ms.topic: install-set-up-deploy
ms.collection:
  - sql-migration-content
ms.custom:
  - intro-installation
helpviewer_keywords:
  - "SSMA extension pack, Installation"
---

# Install SSMA components on SQL Server (MySQLToSQL)

In addition to installing SQL Server Migration Assistant (SSMA), you must also install components on the computer that is running  SQL Server 
. These components include the SSMA extension pack, which supports data migration, and MySQL providers to enable server-to-server connectivity.

## SSMA for MySQL extension pack

The SSMA extension pack adds a database, `sysdb`, to the specified instance of  SQL Server 
. This database contains the tables and stored procedures that are required to migrate data.

Also, when you migrate data to  SQL Server 
, SSMA creates  SQL Server 
 Agent jobs, when server side data migration engine is used for migrating the data.

### Prerequisites

Before you install the SSMA for MySQL server components on  SQL Server 
, make sure that the computer meets the following requirements:

- Windows 11 or later versions, or Windows Server 2022 or later versions.
- The  .NET Framework 
 version 4.7.2 or a later version. [Download .NET Framework](https://dotnet.microsoft.com/download/dotnet-framework).
- The MySQL Client Provider, and connectivity to the MySQL database that you want to migrate. You can install providers from the MySQL product media or MySQL Web site.
- The  SQL Server 
 Browser service must be running during installation. This is used to populate a list of the instances of  SQL Server 
 in the Setup wizard. You can disable the  SQL Server 
 Browser service after installation.

  > **Note:**  
  > If the  SQL Server 
 Browser service is running, but you still don't see a list of instances in Setup, you must unblock UDP port 1434. You can use Windows Firewall to temporarily unblock the port, or you can temporarily disable Windows Firewall. You might also have to temporarily disable antivirus software. Make sure to enable firewalls and antivirus software after installation.

### Install the extension pack



You can install the extension pack any time before you migrate data to  SQL Server 
.

> **Important:**  
> To install the extension pack, you must be a member of the **sysadmin** server role on the instance of  SQL Server 
.

To install the extension pack:

1. Copy SSMA for **SSMAforMySQLExtensionPack_*n*.msi**, where *n* is the build number, to the computer that is running  SQL Server 
.

1. Double-click **SSMAforMySQLExtensionPack_*n*.msi**.

1. On the **Welcome** dialog box, select **Next**.

1. On the **End-User License Agreement** dialog box, read the license agreement. If you agree, select the **I accept the agreement** option, and then select **Next**.

1. On the **Choose Setup Type** dialog box, select **Typical**.

1. On the **Ready to Install** dialog box, select **Install**.

1. On the **Completed the First Step of Installation** dialog box, select **Next**.

   A new dialog box appears, in which you select the instance of  SQL Server 
 for the Extension Pack installation.

1. Select the instance of  SQL Server 
 where you are migrating MySQL schemas, and then select **Next**.

   The default instance has the same name as the computer. Named instances are followed by a backslash and the instance name.

1. On the connection page, select the authentication method and then select **Next**.

   Windows Authentication uses your Windows credentials to try to sign in the instance of  SQL Server 
. If you select Server Authentication, you must enter a  SQL Server 
 login name and password.

1. Next step requires you to set the password for a master key that will be used to encrypt any sensitive data stored in the extension pack database during server-side data migration. Provide a strong password and select **Next**.

1. On the next dialog box, select **Install Utilities Database *n* and Install Extension Pack libraries**, where *n* is the version number, and then select **Next**.

   The `sysdb` database is created with the tables and stored procedures required for data migration (using server-side data migration engine) are created in this database.

1. To install the utilities to another instance of  SQL Server 
, select **Yes**, and then select **Next**. Or, to exit the wizard, select **No**.

## Related content

- [Install SSMA for MySQL client](installing-ssma-for-mysql-client-mysqltosql.md)
- [Migrating MySQL Databases to SQL Server - Azure SQL Database](migrating-mysql-databases-to-sql-server-azure-sql-db-mysqltosql.md)
