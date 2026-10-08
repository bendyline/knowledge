---
title: "Upgrade SQL Server Management Tools"
description: This article describes support for upgrading SQL Server Management Tools and management components, such as SQL Server Agent.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: install
ms.topic: upgrade-and-migration-article
helpviewer_keywords:
  - "management tools, upgrading"
monikerRange: ">=sql-server-2017"
---
# Upgrade SQL Server Management Tools


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


 SQL Server 
 supports upgrade from  SQL Server 2008 (10.0.x) 
 and later versions. This article documents support and behavior for upgrading  SQL Server 
 Management Tools and management components such as  SQL Server 
 Agent, Database Mail, Maintenance Plans, XPStar, and XPWeb.

For local installations, you must run  SQL Server 
 Setup as an administrator. If you run  SQL Server 
 Setup from a remote share, you must use a domain account that has read and execute permissions on the remote share.

## Known upgrade issues

- Consider the following issues before you upgrade to  SQL Server 
:

- All TSX servers should be upgraded before the MSX server is upgraded. For more information about MSX/TSX in  SQL Server 
, see [Automated Administration Across an Enterprise](https://learn.microsoft.com/ssms/agent/automated-administration-across-an-enterprise).

- All components in an instance of  SQL Server 
 must be upgraded at the same time. Version numbers of the  Database Engine 
,  Analysis Services 
, and  Reporting Services 
 components must be the same in an instance of  SQL Server 
.

- You can add components to an existing installation of  SQL Server 
 at the time that you upgrade to  SQL Server 
. For more information, see [Upgrade SQL Server Using the Installation Wizard (Setup)](upgrade-sql-server-using-the-installation-wizard-setup.md).

-  SQL Server 
 Client Tools, such as  SQL Server Management Studio 
,  SQL Server Profiler 
, the  Database Engine 
 Tuning Advisor, sqlcmd, and osql aren't upgraded to  SQL Server 
. Instead, Client Tools run side-by-side with tools from previous  SQL Server 
 versions.  SQL Server 
 supports importing settings from earlier versions of  SQL Server 
 Client Tools.

- Authentication from  SQL Server 
 Agent to  SQL Server 
 is updated from  SQL Server 
 Authentication to Windows Authentication during upgrade.  SQL Server 
 Authentication isn't supported in  SQL Server 
.

- Data for jobs and alerts are preserved during upgrade to  SQL Server 
.

- If SQLMail is being used in the instance to be upgraded, associated XPs are supported and enabled after the upgrade. Otherwise, they're off.

- Database Mail is upgraded with the  Database Engine 
 component of  SQL Server 
. By default, Database Mail is off after upgrade. Any schema updates should be reconciled with an update script after upgrade.

## Related content

- [Supported version and edition upgrades (SQL Server 2022)](supported-version-and-edition-upgrades-2022.md)
- [Backward Compatibility](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/cc280407\(v=sql.130\))
- [Upgrade SQL Server Using the Installation Wizard (Setup)](upgrade-sql-server-using-the-installation-wizard-setup.md)
