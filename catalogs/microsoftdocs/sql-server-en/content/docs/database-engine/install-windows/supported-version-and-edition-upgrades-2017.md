---
title: "Supported Version and Edition Upgrades (SQL Server 2017)"
description: The supported version and edition upgrades for SQL Server 2017.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: install
ms.topic: upgrade-and-migration-article
helpviewer_keywords:
  - "components [SQL Server], adding to existing installations"
  - "versions [SQL Server], upgrading"
  - "upgrading SQL Server, upgrades supported"
  - "cross-language support"
monikerRange: ">=sql-server-2017"
---
# Supported version and edition upgrades (SQL Server 2017)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


You can upgrade from  SQL Server 2008 (10.0.x) 
,  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
, and  SQL Server 2016 (13.x) 
. This article lists the supported upgrade paths from these  SQL Server 
 versions, and the supported edition upgrades for  SQL Server 2017 (14.x) 
.

## Pre upgrade checklist

Before upgrading from one edition of  SQL Server 2017 (14.x) 
 to another, verify that the functionality you're currently using is supported in the edition to which you're moving.

Before upgrading  SQL Server 
, enable Windows Authentication for  SQL Server 
 Agent and verify the default configuration: that the  SQL Server 
 Agent service account is a member of the  SQL Server 
 **sysadmin** group.

To upgrade to  SQL Server 2017 (14.x) 
, you must be running a supported operating system. For more information, see [Hardware and software requirements for SQL Server 2017](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2017.md).

Upgrade is blocked if there's a pending restart.

Upgrade is blocked if the Windows Installer service isn't running.

## Unsupported Scenarios

- Cross-version instances of  SQL Server 2017 (14.x) 
 aren't supported. Version numbers of the  Database Engine 
 components must be the same in an instance of  SQL Server 2017 (14.x) 
.

-  SQL Server 2017 (14.x) 
 is only available for 64-bit platforms. Cross-platform upgrade isn't supported. You can't upgrade a 32-bit instance of  SQL Server 
 to native 64-bit using  SQL Server 
 Setup. However, you can back up or detach databases from a 32-bit instance of  SQL Server 
, and then restore or attach them to a new instance of  SQL Server 
 (64-bit) if the databases aren't published in replication. You must re-create any logins and other user objects in `master`, `msdb`, and `model` system databases.

- You can't add new features during the upgrade of your existing instance of  SQL Server 
. After you upgrade an instance of  SQL Server 
 to  SQL Server 2017 (14.x) 
, you can add features by using the  SQL Server 2017 (14.x) 
 Setup. For more information, see [Add Features to an Instance of SQL Server (Setup)](add-features-to-an-instance-of-sql-server-setup.md).

- Failover Clusters aren't supported in WOW mode.

## Upgrades from Earlier Versions to SQL Server 2017 (14.x)

 SQL Server 2017 (14.x) 
 supports upgrade from the following versions of SQL Server:

- SQL Server 2008 SP4 or later
- SQL Server 2008 R2 SP3 or later
- SQL Server 2012 SP2 or later
- SQL Server 2014 or later
- SQL Server 2016 or later

> **Note:**  
> To upgrade databases on  SQL Server 2005 (9.x) 
 see [Support for 2005](#SupportFor2005).

The following table lists the supported upgrade scenarios from earlier versions of  SQL Server 
 to  SQL Server 2017 (14.x) 
.

| Upgrade from | Supported upgrade path |
| :--- | :--- |
| SQL Server 2008 (10.0.x) |
 | SP4 Enterprise | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2008 (10.0.x) |
 | SP4 Developer | SQL Server 2017 (14.x) |
 | Developer |
| SQL Server 2008 (10.0.x) |
 | SP4 Standard | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2008 (10.0.x) |
 | SP4 Small Business | SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2008 (10.0.x) |
 | SP4 Web | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web |
| SQL Server 2008 (10.0.x) |
 | SP4 Workgroup | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2008 (10.0.x) |
 | SP4 Express | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Express |
| SQL Server 2008 R2 (10.50.x) |
 | SP3 Datacenter | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2008 R2 (10.50.x) |
 | SP3 Enterprise | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2008 R2 (10.50.x) |
 | SP3 Developer | SQL Server 2017 (14.x) |
 | Developer |
| SQL Server 2008 R2 (10.50.x) |
 | SP3 Small Business | SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2008 R2 (10.50.x) |
 | SP3 Standard | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2008 R2 (10.50.x) |
 | SP3 Web | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web |
| SQL Server 2008 R2 (10.50.x) |
 | SP3 Workgroup | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2008 R2 (10.50.x) |
 | SP3 Express | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Express |
| SQL Server 2012 (11.x) |
 | SP2 Enterprise | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2012 (11.x) |
 | SP2 Developer | SQL Server 2017 (14.x) |
 | Developer<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2012 (11.x) |
 | SP2 Standard | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2012 (11.x) |
 | SP1 Web | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web |
| SQL Server 2012 (11.x) |
 | SP2 Express | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Express |
| SQL Server 2012 (11.x) |
 | SP2 Business Intelligence | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2012 (11.x) |
 | SP2 Evaluation | SQL Server 2017 (14.x) |
 | Evaluation<br /><br /> SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Developer |
| SQL Server 2014 (12.x) |
 | Enterprise | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2014 (12.x) |
 | Developer | SQL Server 2017 (14.x) |
 | Developer<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2014 (12.x) |
 | Standard | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2014 (12.x) |
 | Web | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web |
| SQL Server 2014 (12.x) |
 | Express | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Express<br /><br /> SQL Server 2017 (14.x) |
 | Developer |
| SQL Server 2014 (12.x) |
 | Business Intelligence | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2014 (12.x) |
 | Evaluation | SQL Server 2017 (14.x) |
 | Evaluation<br /><br /> SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Developer |
| SQL Server 2016 (13.x) |
 | Enterprise | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2016 (13.x) |
 | Developer | SQL Server 2017 (14.x) |
 | Developer<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2016 (13.x) |
 | Standard | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2016 (13.x) |
 | Web | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web |
| SQL Server 2016 (13.x) |
 | Express | SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Express<br /><br /> SQL Server 2017 (14.x) |
 | Developer |
| SQL Server 2016 (13.x) |
 | Business Intelligence | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2016 (13.x) |
 | Evaluation | SQL Server 2017 (14.x) |
 | Evaluation<br /><br /> SQL Server 2017 (14.x) |
 | Enterprise<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Developer |
| SQL Server 2017 (14.x) |
 | release candidate <sup>1</sup> | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2017 (14.x) |
 | Developer | SQL Server 2017 (14.x) |
 | Enterprise |

<sup>1</sup> Microsoft support to upgrade from release candidate software is specifically for customers who participated in the Technology Adoption Program (TAP).

<a id="SupportFor2005"></a>

### SQL Server 2017 support for SQL Server 2005

This section discusses  SQL Server 2017 (14.x) 
 support for  SQL Server 2005 (9.x) 
. In  SQL Server 2017 (14.x) 
, you can:

- Attach a  SQL Server 2005 (9.x) 
 database (mdf/ldf files) to  SQL Server 2017 (14.x) 
 instance of database engine.

- Restore a  SQL Server 2005 (9.x) 
 database to  SQL Server 2017 (14.x) 
 instance of database engine from a backup.

- Back up a  SQL Server 2005 Analysis Services (SSAS) 
 cube and restore it on  SQL Server 2017 (14.x) 
.

When a  SQL Server 2005 (9.x) 
 database is upgraded to  SQL Server 2017 (14.x) 
, the database compatibility level is changed from 90 to 100. (In  SQL Server 2017 (14.x) 
, valid values for the database compatibility level are 100, 110, 120, 130, and 140.) [ALTER DATABASE (Transact-SQL) compatibility level](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md) discusses how the compatibility level change could affect  SQL Server 
 applications.

Any scenarios not specified in the previous list aren't supported, including but not limited to:

- Installing  SQL Server 2005 (9.x) 
 and  SQL Server 2017 (14.x) 
 on same computer (side by side).

- Using a  SQL Server 2005 (9.x) 
 instance as a member of the replication topology that involves a  SQL Server 2017 (14.x) 
 instance.

- Configuring database mirroring between  SQL Server 2017 (14.x) 
 and  SQL Server 2005 (9.x) 
 instances.

- Backing up the transaction log with log shipping between  SQL Server 2017 (14.x) 
 and  SQL Server 2005 (9.x) 
 instances.

- Configuring linked servers between  SQL Server 2017 (14.x) 
 and  SQL Server 2005 (9.x) 
 instances.

- Managing a  SQL Server 2005 (9.x) 
 instance from a  SQL Server 2017 (14.x) 
 Management Studio.

- Attaching a  SQL Server 2005 Analysis Services (SSAS) 
 cube in  SQL Server 2017 (14.x) 
 Management Studio.

- Connecting to  SQL Server 2005 Integration Services (SSIS) 
 from  SQL Server 2017 (14.x) 
 Management Studio.

- Managing a  SQL Server 2005 Integration Services (SSIS) 
 service from  SQL Server 2017 (14.x) 
 Management Studio.

- Support for  SQL Server 2005 (9.x) 
 third party custom Integration Services components, such as execute and upgrade.

## SQL Server 2017 edition upgrade

The following table lists the supported edition upgrade scenarios in  SQL Server 2017 (14.x) 
.

For step-by-step instructions on how to perform an edition upgrade, see [Upgrade to a different edition of SQL Server (Setup)](upgrade-downgrade-sql-server-edition-setup.md).

| Upgrade from | Upgrade to |
| --- | --- |
| SQL Server 2017 (14.x) |
 | Enterprise (Server+CAL and Core) <sup>2</sup> | SQL Server 2017 (14.x) |
 | Enterprise |
| SQL Server 2017 (14.x) |
 | Evaluation Enterprise <sup>2</sup> | SQL Server 2017 (14.x) |
 | Enterprise (Server+CAL or Core License)<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Developer<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br />Upgrading from Evaluation (a free edition) to any of the paid editions is supported for stand-alone installations, but isn't supported for clustered installations. This limitation doesn't apply to stand-alone instances installed on a Windows Server failover cluster participating in an availability group. |
| SQL Server 2017 (14.x) |
 | Standard <sup>2</sup> | SQL Server 2017 (14.x) |
 | Enterprise (Server+CAL or Core License) |
| SQL Server 2017 (14.x) |
 | Developer <sup>2</sup> | SQL Server 2017 (14.x) |
 | Enterprise (Server+CAL or Core License)<br /><br /> SQL Server 2017 (14.x) |
 | Web<br /><br /> SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2017 (14.x) |
 | Web | SQL Server 2017 (14.x) |
 | Enterprise (Server+CAL or Core License)<br /><br /> SQL Server 2017 (14.x) |
 | Standard |
| SQL Server 2017 (14.x) |
 | Express <sup>1</sup> | SQL Server 2017 (14.x) |
 | Enterprise (Server+CAL or Core License)<br /><br /> SQL Server 2017 (14.x) |
 | Developer<br /><br /> SQL Server 2017 (14.x) |
 | Standard<br /><br /> SQL Server 2017 (14.x) |
 | Web |

<sup>1</sup> Also applies to  SQL Server 2017 (14.x) 
 Express with Tools and  SQL Server 2017 (14.x) 
 Express with Advanced Services.

<sup>2</sup> Changing the edition of a  SQL Server 2017 (14.x) 
 failover cluster is limited. The following scenarios aren't supported for  SQL Server 2017 (14.x) 
 failover clusters:

Additionally you can also perform an edition upgrade between  SQL Server 2017 (14.x) 
 Enterprise (Server+CAL license) and  SQL Server 2017 (14.x) 
 Enterprise (Core License):

| Edition upgrade from | Edition upgrade to |
| --- | --- |
| SQL Server 2017 (14.x) |
 | Enterprise (Server+CAL License) <sup>1</sup> | SQL Server 2017 (14.x) |
 | Enterprise (Core License) |
| SQL Server 2017 (14.x) |
 | Enterprise (Core License) | SQL Server 2017 (14.x) |
 | Enterprise (Server+CAL License) |

<sup>1</sup> Changing the edition of a  SQL Server 2017 (14.x) 
 failover cluster is limited. The following scenarios aren't supported for  SQL Server 2017 (14.x) 
 failover clusters:

-  SQL Server 2017 (14.x) 
 Enterprise to  SQL Server 2017 (14.x) 
 Developer, Standard, or Evaluation.
-  SQL Server 2017 (14.x) 
 Developer to  SQL Server 2017 (14.x) 
 Standard or Evaluation.
-  SQL Server 2017 (14.x) 
 Standard to  SQL Server 2017 (14.x) 
 Evaluation.
-  SQL Server 2017 (14.x) 
 Evaluation to  SQL Server 2017 (14.x) 
 Standard.

## Related content

- [Editions and supported features of SQL Server 2017](../../sql-server/editions-and-components-of-sql-server-2017.md)
- [Hardware and software requirements for SQL Server 2017](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2017.md)
- [Upgrade SQL Server](upgrade-sql-server.md)
