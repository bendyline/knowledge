---
title: SQL Server Reporting Services Features Supported by Editions
description: Learn about SQL Server Reporting Services (SSRS) features supported by the different editions of SQL Server.
ms.date: 11/10/2025
ms.service: reporting-services
ms.subservice: reporting-services
ms.topic: concept-article
ms.custom:
  - updatefrequency5
# customer intent: As an SSRS user, I want to understand the features supported by different editions of SQL Server so that I can use all of those available to me.
---
# SQL Server Reporting Services features supported by editions

  **Applies to:**
 
 Reporting Services and later versions
 

This article explains the SQL Server Reporting Services (SSRS) features supported by the different editions of SQL Server. SQL Server Evaluation edition is available for a 180-day trial period. To install a SQL Server, see [Plan a SQL Server installation](../sql-server/install/planning-a-sql-server-installation.md).

> **Note:**  
> Starting in  SQL Server 2025 (17.x) 
, on-premises reporting services is consolidated under **[Power BI Report Server](https://learn.microsoft.com/power-bi/report-server/get-started)**. For more information, see **[Reporting Services consolidation FAQ](reporting-services-consolidation-faq.md)**.

<a id="SSRS"></a>

## SQL Server Reporting Services

For features supported by the Evaluation and Developer editions, see the SQL Server Enterprise edition column in the following table.

| Feature name | Enterprise | Standard | Web | Express with Advanced Services | Developer |
| --- | --- | --- | --- | --- | --- |
| Power BI reports <sup>4</sup> | Yes <sup>5</sup> | Yes <sup>5</sup> |  |  | Yes |
| Mobile reports and analytics | Yes |  |  |  | Yes |
| Supported catalog database  SQL Server |
 | edition | Standard or higher | Standard or higher | Web | Express | Standard or higher |
| Supported data source  SQL Server |
 | edition | All  SQL Server |
 | editions | All  SQL Server |
 | editions | Web | Express | All  SQL Server |
 | editions |
| Report server | Yes | Yes | Yes | Yes | Yes |
| Report designer | Yes | Yes | Yes | Yes | Yes |
| Report designer web portal | Yes | Yes | Yes | Yes | Yes |
| Role-based security | Yes | Yes | Yes | Yes | Yes |
| Export to Excel, PowerPoint, Word, PDF, and images | Yes | Yes | Yes | Yes | Yes |
| Enhanced gauges and charting | Yes | Yes | Yes | Yes | Yes |
| Pin report items to  Power BI |
 | dashboards | Yes | Yes | Yes | Yes | Yes |
| Custom authentication | Yes | Yes | Yes |  | Yes |
| Report as data feeds | Yes | Yes | Yes | Yes | Yes |
| Model support | Yes | Yes | Yes |  | Yes |
| Create custom roles for role-based security | Yes | Yes |  |  | Yes |
| Model item security | Yes | Yes |  |  | Yes |
| Infinite click through | Yes | Yes |  |  | Yes |
| Shared-component library | Yes | Yes |  |  | Yes |
| Email and file share subscriptions and scheduling | Yes | Yes |  |  | Yes |
| Report history, execution snapshots, and caching | Yes | Yes |  |  | Yes |
| SharePoint integration <sup>2</sup> | Yes | Yes |  |  | Yes |
| Remote and non-SQL data source support <sup>1</sup> | Yes | Yes |  |  | Yes |
| Data source, delivery, and rendering and RDCE extensibility | Yes | Yes |  |  | Yes |
| Custom branding | Yes |  |  |  | Yes |
| Data-driven report subscription | Yes |  |  |  | Yes |
| Scale-out deployment (web farms) | Yes |  |  |  | Yes |
| Alerting <sup>2</sup> (SSRS 2016) | Yes |  |  |  | Yes |
| Power view <sup>2</sup> (SSRS 2016) | Yes |  |  |  | Yes |
| Comments <sup>3</sup> | Yes | Yes | Yes | Yes | Yes |

<sup>1</sup> For more information on supported data sources in SQL Server Reporting Services (SSRS), see [Data Sources Supported by Reporting Services (SSRS)](report-data/data-sources-supported-by-reporting-services-ssrs.md).

<sup>2</sup> Requires SQL Server 2016 Reporting Services in SharePoint mode. For more information, see [Install Reporting Services 2016 in SharePoint mode](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/reporting-services/install-windows/install-reporting-services-sharepoint-mode.md). In SQL Server 2017 Reporting Services and following versions, integration with SharePoint is no longer available. Power View support is no longer available after SQL Server 2017.

<sup>3</sup> Only in Power BI Report Server and SQL Server 2017 Reporting Services and later.

<sup>4</sup> Only in Power BI Report Server.

<sup>5</sup> Power BI Report Server is available for customers running  SQL Server 2025 (17.x) 
 Enterprise and Standard editions. For  SQL Server 2022 (16.x) 
 and earlier versions of  SQL Server 
 Enterprise edition, Power BI Report Server use rights apply only to Enterprise edition core licenses with active SA. This right expires upon expiration of your SA coverage. For more information about PBIRS licensing, see [What is Power BI Report Server?](https://learn.microsoft.com/power-bi/report-server/)

> **Note:**  
> SQL Server Express with Tools and SQL Server Express don't support SQL Server Reporting Services.

## Edition requirements for the report server database

When you create a report server database, not all editions of  SQL Server 
 can be used to host the database. The following table shows you which editions of the  Database Engine 
 you can use for specific editions of SQL Server  Reporting Services 
.

| For this edition of  SQL Server 
 | Reporting Services or Power BI Report Server, | Use this edition of the Database Engine instance to host the database. |
| --- | --- |
| Power BI Premium (for Power BI Report Server) | Enterprise or Standard editions (local or remote) |
| Enterprise (including Enterprise Software Assurance) | Enterprise or Standard editions (local or remote) |
| Standard | Enterprise or Standard editions (local or remote) |
| Web | Web edition (local only) |
| Express with Advanced Services | Express with Advanced Services (local only) |
| Evaluation | Evaluation |
| Developer | Developer |

<a id="BIC"></a>

## Business intelligence clients

The following software client applications are available on the Microsoft Download Center. They help you create business intelligence documents that run on a  SQL Server 
 instance. When you host these documents in a server environment, use an edition of  SQL Server 
 that supports that document type. The following table identifies which  SQL Server 
 edition contains the server features required to host the documents created in these client applications.

| Tool name | Enterprise | Standard | Web | Express with Advanced Services | Developer |
| --- | --- | --- | --- | --- | --- |
| Power BI Desktop optimized for Power BI Report Server, `.pbix` | Yes, with Software Assurance |  |  |  | Yes |
| Report Builder |
| , `.rdl` and `.rds` | Yes | Yes | Yes | Yes | Yes |
| SQL Server Mobile Report Publisher |
| , `.rsmobile` | Yes |  |  |  | Yes |
| Power BI apps for mobile devices (iOS, Windows, and Android), `.rsmobile` | Yes |  |  |  | Yes |

> **Note:**  
>
> - The preceding table identifies the  SQL Server 
 editions that are required to enable these client tools. However, these tools can access data hosted on any edition of  SQL Server 
.
> - SQL Server Mobile Report Publisher
 is the single point for creation of mobile reports. Connect to an SSRS server to access data sources and create reports. Then publish them to the SSRS server for others in the organization to access, either on the server or on mobile devices. You can also use SQL Server Mobile Report Publisher
 stand alone with local data sources. However, SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019.
> - Whether you use 
 SQL Server 2016 (13.x) 
 Reporting Services or later (SSRS)
 on-premises,  Power BI 
 in the cloud, or both as your report delivery solution, you only need one mobile app to access dashboards and mobile reports on mobile devices. The  Power BI 
 apps are available for download from the Windows, iOS, or Android app stores.

## Related content

- [Editions and supported features of SQL Server 2016](https://learn.microsoft.com/previous-versions/sql/sql-server/editions-and-components-of-sql-server-2016)
- [Release notes for SQL Server Reporting Services (SSRS) 2017 and later](release-notes-reporting-services.md)
- [What's new in SQL Server Reporting Services (SSRS)](what-s-new-in-sql-server-reporting-services-ssrs.md)
- [SQL Server Reporting Services forum](https://learn.microsoft.com/answers/search.html?c=\&f=\&includeChildren=\&q=ssrs+OR+reporting+services\&redirect=search%2fsearch\&sort=relevance\&type=question+OR+idea+OR+kbentry+OR+answer+OR+topic+OR+user)
