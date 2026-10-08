---
title: Install SSMA Components on SQL Server (OracleToSQL)
description: Learn how to install the SSMA extension pack and Oracle providers on the computer that runs SQL Server to support Oracle database conversion.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: subasak, niball
ms.date: 06/03/2026
ms.service: sql
ms.subservice: ssma
ms.topic: install-set-up-deploy
ms.collection:
  - sql-migration-content
ms.custom:
  - intro-installation
helpviewer_keywords:
  - "Installing the extension pack"
  - "SQL Server Database Objects"
ai-usage: ai-assisted
---

# Install SSMA components on SQL Server (OracleToSQL)

In addition to installing SQL Server Migration Assistant (SSMA), you must also install components on the computer that runs  SQL Server 
. These components include the SSMA extension pack, which supports data migration, and Oracle providers to enable server-to-server connectivity.

## SSMA for Oracle extension pack

The SSMA extension pack deploys extended stored procedures, and adds the `sysdb` database to the specified instance of  SQL Server 
. Extended stored procedures provide functionality required to emulate features and behavior of Oracle, while the `sysdb` database contains the tables and stored procedures required to migrate the data.

> **Note:**  
> Extended stored procedures are deprecated in  SQL Server 
, and will be removed in a future version. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. Create [Common language runtime (CLR) procedures](../../relational-databases/clr-integration/common-language-runtime-integration-overview.md) instead.

Also, when you migrate data to  SQL Server 
, SSMA creates  SQL Server 
 Agent jobs when the server-side data migration engine is used for migrating the data.

## Prerequisites

Before you install the SSMA for Oracle server components on  SQL Server 
, make sure that the system meets the following requirements:

- Windows 11 and later versions, or Windows Server 2022 and later versions.

- The  .NET Framework 
 version 4.7.2 or a later version. [Download .NET Framework](https://dotnet.microsoft.com/download/dotnet-framework).

- A  SQL Server 
 instance is installed.

- The OLE DB provider for Oracle (if using OLE DB), and connectivity to the Oracle database that you want to migrate. You can install providers from the Oracle product media or Oracle Web site.

  > **Important:**  
  > The SSMA extension pack extended stored procedures aren't compatible with [UTF-8 server collations](../../relational-databases/collations/collation-and-unicode-support.md#utf8) (for example, `Latin1_General_100_CI_AI_SC_UTF8`). The SSMA-generated functions declare output parameters as **varchar(max)**, which the internal ODBC driver maps to legacy LOB types. On servers that use a UTF-8 collation, the `master` database also uses UTF-8, which causes the loopback call from the extended stored procedures to fail. With ODBC Driver 17, this failure produces silently incorrect results. With ODBC Driver 18, you receive the error: `Cannot convert to text/ntext or collate to 'Latin1_General_100_CI_AI_SC_UTF8'`. If your server uses a UTF-8 collation, don't rely on the SSMA extension pack extended stored procedures.

- The  SQL Server 
 Browser service must be running during installation. The service populates a list of the instances of  SQL Server 
 in the Setup wizard. You can disable the  SQL Server 
 Browser service after installation.

  If the  SQL Server 
 Browser service is running, but you still don't see a list of instances in Setup, you must unblock UDP port 1434. You can use Windows Firewall to temporarily unblock the port, or you can temporarily disable Windows Firewall. You might also have to temporarily disable antivirus software. Make sure to enable firewalls and antivirus software after installation.

## Install the extension pack

You can install the extension pack at any time before you migrate data to  SQL Server 
.

> **Important:**  
> To install the extension pack, you must be a member of the **sysadmin** fixed server role on the instance of  SQL Server 
.

To install the extension pack:

1. Copy `SSMAforOracleExtensionPack_<n>.msi` (where `<n>` is the build number) to the computer running  SQL Server 
.
1. Double-click the MSI to run it.
1. On the **Welcome** page, select **Next**.
1. On the **End-User License Agreement** page, read the license agreement. If you agree, select **I accept the agreement**, and then select **Next**.
1. On the **Choose Setup Type** page, select **Typical**.
1. On the **Ready to Install** page, select **Install**.
1. On the **Completed the First Step of Installation** page, select **Next**.

   A new dialog box appears. Select the extension pack type.

1. Select the desired installation type, and then select **Next**.

   > **Important:**  
   > Use the remote option only when installing the extension pack on  SQL Server 
 running on Linux or when targeting Azure SQL Managed Instance. Always install the extension pack locally for  SQL Server 
 installations running on Windows.  Azure SQL Database 
 and Azure Synapse Analytics don't support the extension pack.

   If you install the extension pack on a local  SQL Server 
 instance, you can choose a local instance of  SQL Server 
 to which you migrate Oracle schemas. Choose an instance in the dropdown list, and then select **Next**.

   The default instance has the same name as the computer. Named instances are followed by a backslash and the instance name.

1. On the connection page, select the authentication method and then select **Next**.

   Windows Authentication uses your Windows credentials to try to sign in to the instance of  SQL Server 
. If you select Server Authentication, you must enter a  SQL Server 
 login name and password.

1. The next step requires you to set the password for a master key that encrypts any sensitive data stored in the extension pack database during server-side data migration. Provide a strong password and select **Next**.

1. On the next page, select **Install Utilities Database *n* and Install Extension Pack libraries**, where *n* is the version number, and then select **Next**.

   The `sysdb` database is created with the tables, and stored procedures required for data migration are created in this database (using the server-side data migration engine).

1. When installation is complete, a prompt appears asking if you want to install Utilities Database on another instance of  SQL Server 
. Select **Yes**, and then select **Next**. To exit the wizard, select **No** and then select **Exit**.

1. In  SQL Server Management Studio 
 or by using the **`sqlcmd`** utility, run the following script to enable CLR:

   ```sql
   EXECUTE sp_configure 'clr enabled', 1;
   GO

   RECONFIGURE;
   GO
   ```

   If CLR isn't enabled, you receive the following error when SSMA connects to  SQL Server 
:

   ```output
   SSMA could not retrieve the extension pack assembly version information. Reinstall the extension pack on the database server.
   ```

## SQL Server database objects

After you install the extension pack, the `ssma_oracle.bcp_migration_packages` table appears in the `sysdb` database.

Every time you migrate data to  SQL Server 
, SSMA creates a  SQL Server 
 Agent job. These jobs are named `ssma_oracle data migration package {GUID}`, and you can see them in the  SQL Server 
 Agent node of  SQL Server Management Studio 
 in the Jobs folder.

The following extended stored procedures are added to the `master` database:

- `xp_ora2ms_exec2`
- `xp_ora2ms_exec2_ex`
- `xp_ora2ms_versioninfo2`

## Related content

- [Install SSMA for Oracle client](installing-ssma-for-oracle-client-oracletosql.md)
- [Migrate Oracle Databases to SQL Server](migrating-oracle-databases-to-sql-server-oracletosql.md)
- [Collation and Unicode support](../../relational-databases/collations/collation-and-unicode-support.md)
