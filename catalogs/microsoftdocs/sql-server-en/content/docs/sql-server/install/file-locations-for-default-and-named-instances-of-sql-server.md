---
title: File Locations for SQL Server Instances
description: A SQL Server instance has its own program and data files. It can share common files with other instances of SQL Server. This article includes file locations.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: mathoma
ms.date: 04/07/2025
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
---

# File locations for default and named instances of SQL Server


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 on Windows


This article describes the file locations for installed components of SQL Server.

## Overview

An installation of  SQL Server 
 consists of one or more separate instances. An instance, whether default or named, has its own set of program and data files, as well as a set of common files shared between all instances of  SQL Server 
 on the computer.

For an instance of  SQL Server 
 that includes the  Database Engine 
,  Analysis Services 
, and  Reporting Services 
, each component has a full set of data and executable files, and common files shared by all components.

To isolate install locations for each component, unique instance IDs are generated for each component within a given instance of  SQL Server 
.

## Limitations

Program files and data files can't be installed on a removable disk drive, can't be installed on a file system that uses compression, can't be installed to a directory where system files are located, and can't be installed on shared drives on a failover cluster instance.

You might need to configure scanning software, such as antivirus and antispyware applications, to exclude SQL Server folders and file types. Review this support article for more information: [Configure antivirus software to work with SQL Server](https://learn.microsoft.com/troubleshoot/sql/database-engine/security/antivirus-and-sql-server).

System databases (`master`, `model`, `msdb`, and `tempdb`), and  Database Engine 
 user databases can be installed with Server Message Block (SMB) file server as a storage option. This applies to both  SQL Server 
 stand-alone and  SQL Server 
 failover cluster installations (FCI). For more information, see [Install SQL Server with SMB fileshare storage](../../database-engine/install-windows/install-sql-server-with-smb-fileshare-as-a-storage-option.md).

Don't delete any of the following directories or their contents: `Binn`, `Data`, `Ftdata`, `HTML`, or `1033`. You can delete other directories, if necessary. However, you might not be able to retrieve any lost functionality or data without uninstalling and then reinstalling  SQL Server 
. Don't delete or modify any of the `.htm` files in the HTML directory. They are required for  SQL Server 
 tools to function properly.

<a id="shared-files-for-all-instances-of-"></a>

## Shared files for all instances of SQL Server

Common files used by all instances on a single computer are installed in the folder \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\
. \<*drive*> is the drive letter where components are installed. The default is usually drive C. *nnn* identifies the version.

The following table describes versions for the paths. \{nn} is the version value used in the instance ID, and registry path.

| Version | *nnn* | {nn} |
| --- | --- | --- |
| SQL Server 2025 (17.x) |
 | 170 | 17 |
| SQL Server 2022 (16.x) |
 | 160 | 16 |
| SQL Server 2019 (15.x) |
 | 150 | 15 |
| SQL Server 2017 (14.x) |
 | 140 | 14 |
| SQL Server 2016 (13.x) |
 | 130 | 13 |
| SQL Server 2014 (12.x) |
 | 120 | 12 |
| SQL Server 2012 (11.x) |
 | 110 | 11 |

## File locations and registry mapping

During  SQL Server 
 Setup, an instance ID is generated for each server component. The server components in this  SQL Server 
 release are the  Database Engine 
,  Analysis Services 
, and  Reporting Services 
.

The default instance ID is constructed by using the following format:

- MSSQL for the  Database Engine 
, followed by the major version number, followed by an underscore and the minor version when applicable, and a period, followed by the instance name.

- MSAS for  Analysis Services 
, followed by the major version number, followed by an underscore and the minor version when applicable, and a period, followed by the instance name.

- MSRS for  Reporting Services 
, followed by the major version number, followed by an underscore and the minor version when applicable, and a period, followed by the instance name.

Examples of default instance IDs in this release of  SQL Server 
 are as follows:

- MSSQL\{nn}.MSSQLSERVER for a default instance of  SQL Server 
.

- MSAS\{nn}.MSSQLSERVER for a default instance of  SQL Server 
 Analysis Services.

- MSSQL\{nn}.MyInstance for a named instance of  SQL Server 
 named "MyInstance."

The directory structure for a  SQL Server 
 named instance that includes the  Database Engine 
 and  Analysis Services 
, named "MyInstance", and installed to the default directories would be as follows:

- C:\Program Files\Microsoft SQL Server\MSSQL\{nn}.MyInstance\

- C:\Program Files\Microsoft SQL Server\MSAS\{nn}.MyInstance\

You can specify any value for the instance ID, but avoid special characters and reserved keywords.

You can specify a non-default instance ID during  SQL Server 
 Setup. Instead of \\{Program Files}\\ Microsoft 
  SQL Server 
, a \<custom path>\\ Microsoft 
  SQL Server 
 is used if the user chooses to change the default installation directory. Instance IDs that begin with an underscore (_) or that contain the number sign (#) or the dollar sign ($) aren't supported.

> **Note:**  
>  Integration Services 
 and client components aren't instance aware and, therefore aren't assigned an instance ID. By default, non-instance-aware components are installed to a single directory: \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\
. Changing the installation path for one shared component also changes it for the other shared components. Subsequent installations install non-instance-aware components to the same directory as the original installation.

 SQL Server 
  Analysis Services 
 is the only  SQL Server 
 component that supports instance renaming after installation. If an instance of  Analysis Services 
 is renamed, the instance ID will not change. After instance renaming is complete, directories and registry keys will continue to use the instance ID created during installation.

The registry hive is created under HKLM\Software\\ Microsoft 
\\ Microsoft 
  SQL Server 
\\<*Instance_ID*> for instance-aware components. For example,

- HKLM\Software\\ Microsoft 
\\ Microsoft 
  SQL Server 
\MSSQL\{nn}.MyInstance

- HKLM\Software\\ Microsoft 
\\ Microsoft 
  SQL Server 
\MSAS\{nn}.MyInstance

- HKLM\Software\\ Microsoft 
\\ Microsoft 
  SQL Server 
\MSRS\{nn}.MyInstance

The registry also maintains a mapping of instance ID to instance name. Instance ID to instance name mapping is maintained as follows:

- [HKEY_LOCAL_MACHINE\Software\\ Microsoft 
\\ Microsoft 
  SQL Server 
\Instance Names\SQL] "\<InstanceName>"="MSSQL\{nn}"

- [HKEY_LOCAL_MACHINE\Software\\ Microsoft 
\\ Microsoft 
  SQL Server 
\Instance Names\OLAP] "\<InstanceName>"="MSAS\{nn}"

- [HKEY_LOCAL_MACHINE\Software\\ Microsoft 
\\ Microsoft 
  SQL Server 
\Instance Names\RS] "\<InstanceName>"="MSRS\{nn}"

<a id="specifying-file-paths"></a>

## Specify file paths

During Setup, you can change the installation path for the following features:

The installation path is displayed in Setup only for features with a user-configurable destination folder:

| Component | Default path | Configurable or fixed path |
| --- | --- | --- |
| Database Engine |
 | server components | \Program Files\\ Microsoft |
  | SQL Server |
| \MSSQL\{nn}.\<InstanceID>\ | Configurable |
| Database Engine |
 | data files | \Program Files\\ Microsoft |
  | SQL Server |
| \MSSQL\{nn}.\<InstanceID>\ | Configurable |
| Analysis Services |
 | server | \Program Files\\ Microsoft |
  | SQL Server |
| \MSAS\{nn}.\<InstanceID>\ | Configurable |
| Analysis Services |
 | data files | \Program Files\\ Microsoft |
  | SQL Server |
| \MSAS\{nn}.\<InstanceID>\ | Configurable |
| Reporting Services |
 | report server | \Program Files\\ Microsoft |
  | SQL Server |
| \MSRS\{nn}.\<InstanceID>\Reporting Services\ReportServer\Bin\ | Configurable |
| Reporting Services |
 | report manager | \Program Files\\ Microsoft |
  | SQL Server |
| \MSRS\{nn}.\<InstanceID>\Reporting Services\ReportManager\ | Fixed path |
| Integration Services |
 | \<Install Directory>\nnn\DTS\\ <sup>1</sup> | Configurable |
| Client components (except `bcp.exe` and `sqlcmd.exe`) | \<Install Directory>\nnn\Tools\\ <sup>1</sup> | Configurable |
| Client components (`bcp.exe` and `sqlcmd.exe`) | \<Install Directory>\Client SDK\ODBC\nnn\Tools\Binn | Fixed path |
| Replication and server-side COM objects | \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\ |
| COM\\ <sup>2</sup> | Fixed path |
| Integration Services |
 | component DLLs for the Data Transformation Run-time engine, the Data Transformation Pipeline engine, and the **dtexec** command prompt utility | \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\ |
| DTS\Binn | Fixed path |
| DLLs that provide managed connection support for  Integration Services |
 | \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\ |
| DTS\Connections | Fixed path |
| DLLs for each type of enumerator that  Integration Services |
 | supports | \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\ |
| DTS\ForEachEnumerators | Fixed path |
| SQL Server |
 | Browser Service, WMI providers | \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\ |
| Shared\\ | Fixed path |
| Components that are shared between all instances of  SQL Server |
 | \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\ |
| Shared\\ | Fixed path |

> **Warning:**  
> Ensure that the \Program Files\\ Microsoft 
  SQL Server 
\ folder is protected with limited permissions.

The default drive for file locations is *systemdrive*, normally drive C. Installation paths for child features are determined by the installation path of the parent feature.

<sup>1</sup> A single installation path is shared between  Integration Services 
 and client components. Changing the installation path for one component also changes it for other components. Subsequent installations install components to the same location as the original installation.

<sup>2</sup> This directory is used by all instances of  SQL Server 
 on a computer. If you apply an update to any of the instances on the computer, any changes to files in this folder will affect all instances on the computer. When you add features to an existing installation, you can't change the location of a previously installed feature, nor can you specify the location for a new feature. You must either install additional features to the directories already established by Setup, or uninstall and reinstall the product.

> **Note:**  
> For clustered configurations, you must select a local drive that is available on every node of the cluster.

When you specify an installation path during Setup for the server components or data files, the Setup program uses the instance ID in addition to the specified location for program and data files. Setup doesn't use the instance ID for tools and other shared files. Setup also doesn't use any instance ID for the  Analysis Services 
 program and data files, although it does use the instance ID for the  Analysis Services 
 repository.

If you set an installation path for the  Database Engine 
 feature,  SQL Server 
 Setup uses that path as the root directory for all instance-specific folders for that installation, including SQL Data Files. In this case, if you set the root to "C:\Program Files\\ Microsoft 
  SQL Server 
\MSSQL\{nn}.\<InstanceName>\MSSQL\\", instance-specific directories are added to the end of that path.

Customers who choose to use the USESYSDB upgrade functionality in the  SQL Server 
 Installation Wizard (Setup UI mode) can easily lead themselves into a situation where the product gets installed into a recursive folder structure. For example, \<*SQLProgramFiles*>\MSSQL14\MSSQL\MSSQL10_50\MSSQL\Data\\. Instead, to use the USESYSDB feature, set an installation path for the SQL Data Files feature instead of the  Database Engine 
 feature.

> **Note:**  
> Data files are always expected to be found in a child directory named Data. For example, specify C:\Program Files\\ Microsoft 
  SQL Server 
\MSSQL\{nn}.\<InstanceName>\ to specify the root path to the data directory of the system databases during upgrade when data files are found under C:\Program Files\\ Microsoft 
  SQL Server 
\MSSQL\{nn}.\<InstanceName>\MSSQL\Data.

## Related content

- [SQL Server installation guide](../../database-engine/install-windows/install-sql-server.md)
