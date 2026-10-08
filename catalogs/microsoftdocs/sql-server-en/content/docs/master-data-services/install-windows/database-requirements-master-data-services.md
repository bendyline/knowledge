---
title: Database Requirements
description: Use Master Data Services Configuration Manager to create and configure the Master Data Services database, which stores all master data.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: checklist
ms.custom:
  - build-2025
---
# Database Requirements (Master Data Services)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


All master data is stored in a  Master Data Services 
 database. The computer that hosts this database must run an instance of  SQL Server 
  Database Engine 
.

Use  Master Data Services Configuration Manager 
 to create and configure the  Master Data Services 
 database on either a local or a remote computer. If you move the database from one environment to another, you can maintain the information in a new environment by associating the  Master Data Services 
 web service and  Master Data Manager 
 to the database in its new location.

> **Note:**  
> Any computer on which you install components of  Master Data Services 
 must be licensed. For more information, refer to the End User License Agreement (EULA).

## Requirements

Before you create a  Master Data Services 
 database, ensure the following requirements are met.

### SQL Server Edition

The  Master Data Services 
 database can be hosted on the following editions of  SQL Server 
:

### SQL Server Edition

The  Master Data Services 
 database can be hosted on the following editions of  SQL Server 
:

-  SQL Server 2022 (16.x) 
 Enterprise (64-bit) x64
-  SQL Server 2022 (16.x) 
 Developer (64-bit) x64
-  SQL Server 2019 (15.x) 
 Enterprise (64-bit) x64
-  SQL Server 2019 (15.x) 
 Developer (64-bit) x64
-  SQL Server 2016 (13.x) 
 Enterprise (64-bit) x64
-  SQL Server 2016 (13.x) 
 Developer (64-bit) x64
-  SQL Server 2014 (12.x)
 Business Intelligence (64-bit) x64
-  SQL Server 2014 (12.x)
 Enterprise (64-bit) x64
-  SQL Server 2014 (12.x)
 Developer (64-bit) x64
-  SQL Server 2012 (11.x) 
 Business Intelligence (64-bit) x64
-  SQL Server 2012 (11.x) 
 Enterprise (64-bit) x64 - Upgrade from  SQL Server 2008 R2 (10.50.x) 
 Enterprise only
-  SQL Server 2012 (11.x) 
 Developer (64-bit) x64
- Microsoft SQL Server 2008 R2 Enterprise (64-bit) x64
- Microsoft SQL Server 2008 R2 Developer (64-bit) x64

For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](../../sql-server/editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](../../sql-server/editions-and-components-of-sql-server-2017.md)


### Operating System

For information about the supported Windows operating systems and other requirements for  SQL Server 
  Database Engine 
, see [Hardware and software requirements for SQL Server 2016](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2016.md).

### Accounts and Permissions

| Type | Description |
| --- | --- |
| User account | In  Master Data Services Configuration Manager |
| , you can use a Windows account or a  SQL Server |
 | account to connect to the  Database Engine |
 | instance of  SQL Server |
 | to host the  Master Data Services |
 | database. The user account must belong to the **sysadmin** server role on the instance of  SQL Server |
  | Database Engine |
| . For more information about the **sysadmin** role, see [Server-level roles](../../relational-databases/security/authentication-access/server-level-roles.md). |
| Master Data Manager |
 | administrator account | When you create a  Master Data Services |
 | database, you must specify a domain user account to be the  Master Data Services |
 | system administrator. For all  Master Data Manager |
 | web applications associated with this database, this user can update all models and all data in all functional areas. For more information, see [Administrators (Master Data Services)](../administrators-master-data-services.md). |

### Database Backup

As a best practice, back up the full database daily at a time of low activity and back up transaction logs more frequently depending on the needs of your environment. For more information about database backups, see [Backup overview (SQL Server)](../../relational-databases/backup-restore/backup-overview-sql-server.md).

## Related content

- [Installation Tasks for Master Data Services](install-master-data-services.md)
- [Create a Master Data Services Database](create-a-master-data-services-database.md)
- [Master Data Services Database](../master-data-services-database.md)
- [Master Data Services Overview (MDS)](../master-data-services-overview-mds.md)
- [Create Database Wizard (Master Data Services Configuration Manager)](../create-database-wizard-master-data-services-configuration-manager.md)
