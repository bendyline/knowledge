---
title: SQL Writer Service
description: The SQL Writer service provides added backup and restore functionality in SQL Server through the Volume Shadow Copy Service framework.
author: rwestMSFT
ms.author: randolphwest
ms.date: 11/18/2025
ms.service: sql
ms.subservice: configuration
ms.topic: concept-article
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "VDI [SQL Server]"
  - "restoring [SQL Server], SQL Writer service"
  - "backups [SQL Server], while SQL Server running"
  - "Volume Shadow Copy Service"
  - "volume backups while running [SQL Server]"
  - "Virtual Backup Device Interface [SQL Server]"
  - "SQL Writer service"
  - "services [SQL Server], SQL Writer"
  - "MSDE Writer"
  - "VSS"
---
# SQL Writer service


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


The SQL Writer service provides added functionality for backup and restore of  SQL Server 
 through the Volume Shadow Copy Service framework.

The SQL Writer service is installed automatically. It must be running when the Volume Shadow Copy Service (VSS) application requests a backup or restore. To configure the service, use the Windows Services applet. The SQL Writer service installs on all Windows operating systems.

## Purpose

The  Database Engine 
 locks and has exclusive access to the database files. When the SQL Writer service isn't running, backup programs running in Windows don't have access to the data files, and backups must be performed using native  SQL Server 
 backup. Use the SQL Writer service to permit Windows backup programs to copy  SQL Server 
 database files while  SQL Server 
 is running and is maintaining exclusive locks on those files.

## Volume Shadow Copy Service

The VSS is a set of COM APIs that implements a framework to allow volume backups to be performed while applications continue to write to those volumes. The VSS helps coordination between user applications that write data to disk (writers) and applications that back up that data (requestors).

The VSS captures and copies stable images for backup on running systems, particularly servers, without unduly degrading the performance and stability of the services they provide. For more information on the VSS, see your Windows documentation.

> **Note:**  
> When using VSS to backup a virtual machine that is hosting a Basic availability group, if the virtual machine is currently hosting databases that are in a secondary state, starting with  SQL Server 2016 (13.x) 
 SP2 CU2 and  SQL Server 2017 (14.x) 
 CU9 those databases *will not* be backed up with the virtual machine. This is because Basic availability groups don't support backing up databases on the secondary replica. Prior to these versions of  SQL Server 
, the backup would fail with an error.

## Virtual Backup Device Interface (VDI)

 SQL Server 
 provides an API called Virtual Backup Device Interface (VDI) that enables independent software vendors to integrate  SQL Server 
 into their backup and restore products. These APIs are engineered to provide maximum reliability and performance, and support the full range of  SQL Server 
 backup and restore functionality, including the full range of hot and snapshot backup capabilities. If a third-party vendor application requests a snapshot (VSS) backup, the SQL Writer service calls into the VDI API functions to perform the actual backups. The VDI API is independent of VSS and is frequently used in software solutions that don't employ VSS APIs.

## Permissions

The SQL Writer service must run under the **Local System** account. The SQL Writer service uses the **NT Service\SQLWriter** login to connect to  SQL Server 
. Using the **NT Service\SQLWriter** login allows the SQL Writer process to run at a lower privilege level in an account designated as **no login**, which limits vulnerability. If the SQL Writer service is disabled, then any utility that relies on VSS snapshots can break, and might risk taking backups of databases that aren't consistent. Examples include System Center Data Protection Manager, as well as some other third-party products.

If  SQL Server 
, the system it runs on, and the host system (in the case of a virtual machine) don't need anything besides  Transact-SQL  backup, then the SQL Writer service can be safely disabled and the login removed. The SQL Writer service might be invoked by a system or volume level backup, whether the backup is directly snapshot-based or not. Some system backup products use VSS to avoid being blocked by open or locked files. The SQL Writer service needs **sysadmin** permissions in  SQL Server 
 because in the course of its activities it briefly freezes all I/O for the instance of  SQL Server 
.

## Features

SQL Writer supports:

- Full database backup and restore including full-text catalogs
- Differential backup and restore
- Restore with move
- Database rename
- Copy-only backup
- Autorecovery of database snapshot

SQL Writer doesn't support:

- Log backups
- File and filegroup backup
- Page restore

## Service upgrade and maintenance

The SQL Writer service is a separate service from the  SQL Server Database Engine 
 and is shared across different versions and instances of  SQL Server 
 on the same server. The SQL Writer service file ships as part of the  SQL Server 
 installation package and is marked with the same version number as the  SQL Server 
 engine it ships with.

When a new instance of  SQL Server 
 is installed on a server or an existing instance is upgraded, if the version number of the instance being installed or upgraded is higher than the version number of the SQL Writer service that is currently on the server, that file is replaced with the one from the installation package.

If the SQL Writer service was updated by a Service Pack or Cumulative Update and newer version of  SQL Server 
 is being installed, you can replace a newer version of the SQL Writer service with an older one, as long as the installation has a higher major version number. For example, the SQL Writer service was updated in  SQL Server 2016 (13.x) 
 SP2 CU2. If that instance is upgraded to  SQL Server 2017 (14.x) 
 RTM, the updated SQL Writer service is replaced with an older version. In this case, you would need to apply the latest CU to the new instance in order to get the newer version of the SQL Writer service.

## SQL Server 2025 and TDS 8.0 support

 SQL Server 2025 (17.x) 
 introduces [TDS 8.0](../../relational-databases/security/networking/tds-8.md) support for SQL VSS Writer.

### Encryption settings

SQL VSS Writer in  SQL Server 2025 (17.x) 
 uses the following encryption settings:

- **Default encryption**: `Encrypt=Mandatory` with `TrustServerCertificate=No`, requiring a valid server certificate for TLS handshake.
- **Self-signed certificates**: For environments using self-signed certificates, `TrustServerCertificate` can be set to `Yes`.
- **Strict encryption**: To enforce TLS 1.3 and TDS 8.0, configure `Encrypt=Strict`. When configured with strict encryption, VSS Writer enforces full certificate validation and requires `TrustServerCertificate=False`.

When using `Encrypt=Strict`, VSS Writer always verifies the server certificate and ignores the `TrustServerCertificate` setting, ensuring enhanced security for backup operations.

## Related content

- [SQL Server Services](../../tools/configuration-manager/sql-server-services.md)
- [SQL Server Browser service (Database Engine and SSAS)](sql-server-browser-service-database-engine-and-ssas.md)
- [Start, stop, pause, resume, and restart SQL Server services](start-stop-pause-resume-restart-sql-server-services.md)
