---
title: "Supported Version and Edition Upgrades (SQL Server 2022)"
description: The supported version and edition upgrades for SQL Server 2022.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/16/2025
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
# Supported version and edition upgrades (SQL Server 2022)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


This article lists the supported upgrade paths from the following  SQL Server 
 versions, and the supported edition upgrades for  SQL Server 2022 (16.x) 
.

You can upgrade from:

-  SQL Server 2012 (11.x) 
 SP4 or later
-  SQL Server 2014 (12.x)
 SP3 or later
-  SQL Server 2016 (13.x) 
 SP3 or later
-  SQL Server 2017 (14.x) 

-  SQL Server 2019 (15.x) 


For older versions of  SQL Server 
, you can also [Migrate to SQL Server 2022](#migrate-to-sql-server-2022).

## Pre-upgrade checklist

- Before you upgrade from one edition of  SQL Server 2022 (16.x) 
 to another, verify that the functionality you're currently using is supported in the edition to which you're moving. For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md).

- Verify supported hardware and software, including the supported operating system. For more information, see [Hardware and software requirements for SQL Server 2022](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2022.md).

- Before upgrading  SQL Server 
, enable Windows Authentication for  SQL Server 
 Agent and verify the default configuration, that the  SQL Server 
 Agent service account is a member of the  SQL Server 
 sysadmin group.

- Upgrade is blocked if there's a pending restart.

- Upgrade is blocked if the Windows Installer service isn't running.

## Unsupported scenarios

- Cross-version instances of  SQL Server 2022 (16.x) 
 aren't supported. Version numbers of the  Database Engine 
 components must be the same in an instance of  SQL Server 2022 (16.x) 
.

-  SQL Server 2022 (16.x) 
 is only available for 64-bit platforms. Cross-platform upgrade isn't supported. You can't upgrade a 32-bit instance of  SQL Server 
 to native 64-bit using  SQL Server 
 Setup. However, you can back up or detach databases from a 32-bit instance of  SQL Server 
, and then restore or attach them to a new instance of  SQL Server 
 (64-bit), if the databases aren't published in replication. You must re-create any logins and other user objects in `master`, `msdb`, and `model` system databases.

- You can't add new features during the upgrade of your existing instance of  SQL Server 
. After you upgrade an instance of  SQL Server 
 to  SQL Server 2022 (16.x) 
, you can add features by using the  SQL Server 2022 (16.x) 
 Setup. For more information, see [Add Features to an Instance of SQL Server (Setup)](add-features-to-an-instance-of-sql-server-setup.md).

## Upgrades from earlier versions to SQL Server 2022

 SQL Server 2022 (16.x) 
 supports upgrade from the following versions of SQL Server:

-  SQL Server 2012 (11.x) 
 SP4 or later
-  SQL Server 2014 (12.x)
 SP3 or later
-  SQL Server 2016 (13.x) 
 SP3 or later
-  SQL Server 2017 (14.x) 

-  SQL Server 2019 (15.x) 


The following table lists the supported upgrade scenarios from earlier versions of  SQL Server 
 to  SQL Server 2022 (16.x) 
.

| Upgrade from | Supported upgrade path |
| :--- | :--- |
| SQL Server 2012 (11.x) |
 | SP4 Enterprise | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2012 (11.x) |
 | SP4 Developer | SQL Server 2022 (16.x) |
 | Developer<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2012 (11.x) |
 | SP4 Standard | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard |
| SQL Server 2012 (11.x) |
 | SP4 Web | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web |
| SQL Server 2012 (11.x) |
 | SP4 Express | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Express |
| SQL Server 2012 (11.x) |
 | SP4 Business Intelligence | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2012 (11.x) |
 | SP4 Evaluation | SQL Server 2022 (16.x) |
 | Evaluation<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Developer |
| SQL Server 2014 (12.x) |
 | SP3 Enterprise | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2014 (12.x) |
 | SP3 Developer | SQL Server 2022 (16.x) |
 | Developer<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2014 (12.x) |
 | SP3 Standard | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard |
| SQL Server 2014 (12.x) |
 | SP3 Web | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web |
| SQL Server 2014 (12.x) |
 | SP3 Express | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Express<br /><br /> SQL Server 2022 (16.x) |
 | Developer |
| SQL Server 2014 (12.x) |
 | SP3 Business Intelligence | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2014 (12.x) |
 | SP3 Evaluation | SQL Server 2022 (16.x) |
 | Evaluation<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Developer |
| SQL Server 2016 (13.x) |
 | SP3 Enterprise | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2016 (13.x) |
 | SP3 Developer | SQL Server 2022 (16.x) |
 | Developer<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2016 (13.x) |
 | SP3 Standard | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard |
| SQL Server 2016 (13.x) |
 | SP3 Web | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web |
| SQL Server 2016 (13.x) |
 | SP3 Express | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Express<br /><br /> SQL Server 2022 (16.x) |
 | Developer |
| SQL Server 2016 (13.x) |
 | SP3 Business Intelligence | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2016 (13.x) |
 | SP3 Evaluation | SQL Server 2022 (16.x) |
 | Evaluation<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Developer |
| SQL Server 2017 (14.x) |
 | Enterprise | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2017 (14.x) |
 | Developer | SQL Server 2022 (16.x) |
 | Developer<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2017 (14.x) |
 | Standard | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard |
| SQL Server 2017 (14.x) |
 | Web | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web |
| SQL Server 2017 (14.x) |
 | Express | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Express<br /><br /> SQL Server 2022 (16.x) |
 | Developer |
| SQL Server 2017 (14.x) |
 | Business Intelligence | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2017 (14.x) |
 | Evaluation | SQL Server 2022 (16.x) |
 | Evaluation<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Developer |
| SQL Server 2019 (15.x) |
 | Enterprise | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2019 (15.x) |
 | Developer | SQL Server 2022 (16.x) |
 | Developer<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2019 (15.x) |
 | Standard | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard |
| SQL Server 2019 (15.x) |
 | Web | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web |
| SQL Server 2019 (15.x) |
 | Express | SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Express<br /><br /> SQL Server 2022 (16.x) |
 | Developer |
| SQL Server 2019 (15.x) |
 | Business Intelligence | SQL Server 2022 (16.x) |
 | Enterprise<br /> |
| SQL Server 2019 (15.x) |
 | Evaluation | SQL Server 2022 (16.x) |
 | Evaluation<br /><br /> SQL Server 2022 (16.x) |
 | Enterprise<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Developer |
| SQL Server 2022 (16.x) |
 | release candidate <sup>1</sup> | SQL Server 2022 (16.x) |
 | Enterprise |
| SQL Server 2022 (16.x) |
 | Developer | SQL Server 2022 (16.x) |
 | Enterprise |

<sup>1</sup> Microsoft support to upgrade from release candidate software is specifically for customers who participated in the Early Adopter Program.

## Migrate to SQL Server 2022

You can migrate databases from older versions of  SQL Server 
 to  SQL Server 2022 (16.x) 
, as long as the source database compatibility level is `90` or higher. Databases with a compatibility level of `90` (for example, on  SQL Server 2005 (9.x) 
), are automatically upgraded to a compatibility level of `100` when migrated to  SQL Server 2022 (16.x) 
. If the compatibility level on the source database is `100` or higher, it's unchanged on  SQL Server 2022 (16.x) 
.

For information, see [Upgrade SQL Server to the latest version](../../sql-server/migrate/guides/sql-server-to-sql-server-upgrade-guide.md).

The following tips and tools can help you plan and implement your migration.

- **Migration tools.** Migration is supported through the [SQL Server migration component in SQL Server Management Studio](https://learn.microsoft.com/ssms/migrate-sql-server-component).

- **Backup and restore.** A backup taken on  SQL Server 2008 (10.0.x) 
 and later, can be restored to  SQL Server 2022 (16.x) 
 without changing its compatibility level, as long as the database backup has a compatibility level of `100` or higher.

  Databases with a compatibility level of `90`, including backups taken on  SQL Server 2005 (9.x) 
, are automatically upgraded to a compatibility level of `100` when restored to  SQL Server 2022 (16.x) 
.

- **Log shipping.** Log shipping is supported if the primary is running  SQL Server 2008 (10.0.x) 
 SP3 or later, or  SQL Server 2008 R2 (10.50.x) 
 SP2 or later, and the secondary is running  SQL Server 2022 (16.x) 
.

   > **Warning:**  
   > If an automatic or manual failover happens and the  SQL Server 2022 (16.x) 
 instance becomes primary,  SQL Server 2008 (10.0.x) 
 or  SQL Server 2008 R2 (10.50.x) 
 instance becomes secondary and can't receive changes from primary.

- Bulk load: Tables can be bulk copied from  SQL Server 2008 (10.0.x) 
 or  SQL Server 2008 R2 (10.50.x) 
 to  SQL Server 2022 (16.x) 
.

## SQL Server 2022 edition upgrade

The following table lists the supported edition upgrade scenarios in  SQL Server 2022 (16.x) 
.

For step-by-step instructions on how to perform an edition upgrade, see [Upgrade to a different edition of SQL Server (Setup)](upgrade-downgrade-sql-server-edition-setup.md).

| Upgrade from | Upgrade to |
| --- | --- |
| SQL Server 2022 (16.x) |
 | Enterprise (Server+CAL and Core) <sup>2</sup> | SQL Server 2022 (16.x) |
 | Enterprise |
| SQL Server 2022 (16.x) |
 | Evaluation Enterprise <sup>2</sup> | SQL Server 2022 (16.x) |
 | Enterprise (Server+CAL or Core License)<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Developer<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br />Upgrading from Evaluation (a free edition) to any of the paid editions is supported for stand-alone installations, but isn't supported for clustered installations. This limitation doesn't apply to stand-alone instances installed on a Windows Server failover cluster participating in an availability group. |
| SQL Server 2022 (16.x) |
 | Standard <sup>2</sup> | SQL Server 2022 (16.x) |
 | Enterprise (Server+CAL or Core License) |
| SQL Server 2022 (16.x) |
 | Developer <sup>2</sup> | SQL Server 2022 (16.x) |
 | Enterprise (Server+CAL or Core License)<br /><br /> SQL Server 2022 (16.x) |
 | Web<br /><br /> SQL Server 2022 (16.x) |
 | Standard |
| SQL Server 2022 (16.x) |
 | Web | SQL Server 2022 (16.x) |
 | Enterprise (Server+CAL or Core License)<br /><br /> SQL Server 2022 (16.x) |
 | Standard |
| SQL Server 2022 (16.x) |
 | Express <sup>1</sup> | SQL Server 2022 (16.x) |
 | Enterprise (Server+CAL or Core License)<br /><br /> SQL Server 2022 (16.x) |
 | Developer<br /><br /> SQL Server 2022 (16.x) |
 | Standard<br /><br /> SQL Server 2022 (16.x) |
 | Web |

Additionally you can also perform an edition upgrade between  SQL Server 2022 (16.x) 
 Enterprise (Server+CAL license) and  SQL Server 2022 (16.x) 
 Enterprise (Core License):

| Edition upgrade from | Edition upgrade to |
| --- | --- |
| SQL Server 2022 (16.x) |
 | Enterprise (Server+CAL License) <sup>2</sup> | SQL Server 2022 (16.x) |
 | Enterprise (Core License) |
| SQL Server 2022 (16.x) |
 | Enterprise (Core License) | SQL Server 2022 (16.x) |
 | Enterprise (Server+CAL License) |

<sup>1</sup> Also applies to  SQL Server 2022 (16.x) 
 Express with Tools and  SQL Server 2022 (16.x) 
 Express with Advanced Services.

<sup>2</sup> Changing the edition of a clustered instance of  SQL Server 2022 (16.x) 
 is limited. The following scenarios aren't supported for  SQL Server 2022 (16.x) 
 failover clusters:

-  SQL Server 2022 (16.x) 
 Enterprise to  SQL Server 2022 (16.x) 
 Developer, Standard, or Evaluation.
-  SQL Server 2022 (16.x) 
 Developer to  SQL Server 2022 (16.x) 
 Standard or Evaluation.
-  SQL Server 2022 (16.x) 
 Standard to  SQL Server 2022 (16.x) 
 Evaluation.
-  SQL Server 2022 (16.x) 
 Evaluation to  SQL Server 2022 (16.x) 
 Standard.

## Related content

- [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md)
- [Hardware and software requirements for SQL Server 2022](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2022.md)
- [Upgrade SQL Server](upgrade-sql-server.md)
- [Upgrade the Database Engine](upgrade-database-engine.md)
- [In-place change of a SQL Server edition (Setup)](upgrade-downgrade-sql-server-edition-setup.md)
