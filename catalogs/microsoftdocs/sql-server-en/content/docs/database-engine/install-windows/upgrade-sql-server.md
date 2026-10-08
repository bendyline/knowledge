---
title: Upgrade SQL Server
description: This article provides links to resources that contain upgrade information for instances of different versions of SQL Server.
author: rwestMSFT
ms.author: randolphwest
ms.date: 11/18/2025
ms.service: sql
ms.subservice: install
ms.topic: quickstart
ms.custom:
  - intro-quickstart
  - ignite-2025
helpviewer_keywords:
  - "upgrading SQL Server"
monikerRange: ">=sql-server-2017"
---
# Upgrade SQL Server


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


You can upgrade instances of  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
,  SQL Server 2016 (13.x) 
,  SQL Server 2017 (14.x) 
, or  SQL Server 2019 (15.x) 
 directly to  SQL Server 2022 (16.x) 
. For  SQL Server 2008 (10.0.x) 
 and  SQL Server 2008 R2 (10.50.x) 
, you need to either do a side-by-side upgrade, or a migration, to move to  SQL Server 2022 (16.x) 
 as there's no common overlap between a supported mainstream operating system. Before running setup to upgrade, review the following articles about the upgrade process and the release notes.

Check out what's new in each version of the product:

- [SQL Server 2025 release notes](../../sql-server/sql-server-2025-release-notes.md)
- [SQL Server 2022 release notes](../../sql-server/sql-server-2022-release-notes.md)
- [SQL Server 2019 release notes](../../sql-server/sql-server-2019-release-notes.md)
- [SQL Server 2017 release notes](../../sql-server/sql-server-2017-release-notes.md)
- [SQL Server 2016 release notes](../../sql-server/sql-server-2016-release-notes.md)

Support for  SQL Server 2014 (12.x)
 ended on July 9, 2024. For new end of support options, see [End of Support for Windows Server and SQL Server](https://www.microsoft.com/sql-server/end-of-support).

If you're upgrading from an end-of-support version of SQL Server, see the [end of support options](../../sql-server/end-of-support/sql-server-end-of-support-overview.md).

## Upgrade documentation

> **Caution:**  
> If you want to install or upgrade  SQL Server 
 to  SQL Server 2022 (16.x) 
 or a later version, on  Windows Server 2022 
 or greater, make sure there are no restarts pending. You should restart Windows first, and then run the  SQL Server 
 installation or upgrade.


For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](../../sql-server/editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](../../sql-server/editions-and-components-of-sql-server-2017.md)


The following articles help you upgrade components of SQL Server:

- [Upgrade Analysis Services](upgrade-analysis-services.md)
- [Upgrade the Database Engine](upgrade-database-engine.md)
- [Upgrade Data Quality Services](upgrade-data-quality-services.md) <sup>1</sup>
- [Upgrade Integration Services](../../integration-services/install-windows/upgrade-integration-services.md)
- [Upgrade Master Data Services](upgrade-master-data-services.md) <sup>1</sup>
- [Upgrade Power Pivot for SharePoint](upgrade-power-pivot-for-sharepoint.md)
- [Upgrade or patch replicated databases](upgrade-replicated-databases.md)
- [Upgrade and migrate Reporting Services](../../reporting-services/install-windows/upgrade-and-migrate-reporting-services.md) <sup>1</sup>
- [Upgrade SQL Server Management Tools](upgrade-sql-server-management-tools.md)
- [Upgrade SQL Server Using the Installation Wizard (Setup)](upgrade-sql-server-using-the-installation-wizard-setup.md)
- [Upgrade to a different edition of SQL Server (Setup)](upgrade-downgrade-sql-server-edition-setup.md)
- [SQL Server end of support options](../../sql-server/end-of-support/sql-server-end-of-support-overview.md)

<sup>1</sup> DQS, MDS, and Reporting Services upgrades aren't supported on  SQL Server 2025 (17.x) 
.

## Related content

- [Upgrade the Database Engine](upgrade-database-engine.md)
- [Upgrade Analysis Services](upgrade-analysis-services.md)
- [Upgrade and migrate Reporting Services](../../reporting-services/install-windows/upgrade-and-migrate-reporting-services.md)
- [Upgrade Integration Services](../../integration-services/install-windows/upgrade-integration-services.md)
- [Upgrade or patch replicated databases](upgrade-replicated-databases.md)
- [Upgrade Master Data Services](upgrade-master-data-services.md)
- [SQL Server 2008 R2 Best Practices Analyzer](https://www.microsoft.com/download/details.aspx?id=436)
- [Discontinued Database Engine functionality in SQL Server](../discontinued-database-engine-functionality-in-sql-server.md)
- [In-place change of a SQL Server edition (Setup)](upgrade-downgrade-sql-server-edition-setup.md)
