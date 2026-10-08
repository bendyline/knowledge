---
title: "Plan for report design and report deployment"
description: Learn how to plan a report authoring and report server environment that work together using Reporting Services.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: reporting-services
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Plan for report design and report deployment
 SQL Server 
  Reporting Services 
 provides several approaches for authoring and deploying paginated reports. Learn how to plan a report authoring and report server environment that work together.

This article is an overview of report definition support by  Reporting Services 
 components. A report definition is an XML file that is written in the Report Definition Language (RDL) or the Report Definition Language for Clients (RDLC). Each report definition conforms to a specific schema version that is listed at the beginning of the file.  
  
 RDL files are authored in Report Designer in  SQL Server Data Tools - Business Intelligence 
 projects, and in Report Builder. RDLC files are authored by using the ReportViewer controls that are included in  Visual Studio 
.
  
##  <a name="bkmk_rdl_schema_versions"></a> RDL schema versions  
 The following table lists each available schema version and the abbreviation that is used throughout the rest of this article:  
  
| Abbreviation | Schema version |
| --- | --- |
| 2016 RDL | `https://schemas.microsoft.com/sqlserver/reporting/2016/01/reportdefinition` |
| 2010 RDL | `https://schemas.microsoft.com/sqlserver/reporting/2010/01/reportdefinition` |
| 2008 RDL | `https://schemas.microsoft.com/sqlserver/reporting/2008/01/reportdefinition` |
| 2005 RDL<br /><br /> 2005 RDLC | `https://schemas.microsoft.com/sqlserver/reporting/2005/01/reportdefinition` |
| 2000 RDL | `https://schemas.microsoft.com/sqlserver/reporting/2003/10/reportdefinition` |
  
 For more information on RDL and RDL schemas, see the following resources:  

-   [Microsoft SQL Server XML schemas](https://go.microsoft.com/fwlink/?LinkId=31850)  
  
-   [Report Definition Language file format](https://learn.microsoft.com/openspecs/sql_server_protocols/ms-rdl/53287204-7cd0-4bc9-a5cd-d42a5925dca1)  
  
-   [Report Definition Language (SSRS)](reports/report-definition-language-ssrs.md)  
  
 For more information about ReportViewer controls, see [ReportViewer controls (Visual Studio)](https://learn.microsoft.com/previous-versions/ms251671\(v=vs.140\)).  
  
##  <a name="bkmk_report_server_rdl_schema_support"></a> Report server and RDL schema support  
 A report definition file can be deployed to a 
 SQL Server 2016 (13.x) 
 Reporting Services or later (SSRS)
 report server in the following ways:  
  
-   **Report Designer:** Deploy a report from Report Designer in  SQL Server Data Tools - Business Intelligence 
.  
  
-   **Report Builder:** Save a report to the report server from Report Builder.  
  
-   **Web Portal:** Upload a report to a native mode report server from the  web portal 
.  

-   **Programmatically:** Programmatically publish a report by using the SOAP API interfaces to a report server. For more information, see [Report Server Web Service](report-server-web-service/report-server-web-service.md).  
  
 The following table lists the supported rdl schema version by version of the report server.  
  
| Report server version | RDL schema version |
| --- | --- |
| SQL Server 2016 | 2016 RDL<br /><br />2010 RDL<br /><br /> 2008 RDL<br /><br /> 2005 RDL<br /><br /> 2000 RDL |
| SQL Server 2014 (12.x) |
| <br /><br /> Or<br /><br />  SQL Server 2012 (11.x) |
| <br /><br /> Or<br /><br />  SQL Server 2008 R2 (10.50.x) |
| 2010 RDL<br /><br /> 2008 RDL<br /><br /> 2005 RDL<br /><br /> 2000 RDL |
| SQL Server 2008 (10.0.x) |
| 2008 RDL<br /><br /> 2005 RDL<br /><br /> 2000 RDL |
  
 When you upload a report definition to the report server or upgrade a report server that contains existing reports, the report server preserves the report definition in the original format. **On first use**, the report server upgrades the report in the report server database to a binary format that is preserved for subsequent views. The report definition (.rdl) itself isn't upgraded.  
  
 You can extract from the report server a read-only copy of the report definition file (.rdl). On a native mode report server, browse to the  web portal 
, select the report and choose **Download**. 

 To upgrade the report definition, you must open the report in a report authoring environment, such as SQL Server Data Tools or Report Builder, and then save it.  
  
 For more information about report upgrades and the schema versions that are supported, see [Upgrade reports (SSRS)](install-windows/upgrade-reports.md).  
  
##  <a name="bkmk_report_authoring_and_deployment"></a> Report authoring and deployment support  
 Report authoring environments are Report Designer in  SQL Server Data Tools - Business Intelligence 
 projects, and Report Builder. Report authoring environments provide various support for reports like:

- Upgrade
- Design
- Report preview in local mode
- Report preview on the report server
- Deployment.  
  
 The following table summarizes support for authoring and deploying report definitions for different schema versions:  
  
| Authoring environment | RDL version Authored | Deploy RDL version | Deploy to report server versions |
| --- | --- | --- | --- |
| SQL Server 2016 Report Builder | Authors 2016 RDL<br /><br /> Will upgrade older RDL versions to 2016 RDL | 2016 RDL | SQL Server 2016 |
| Report Designer in SQL Server 2016 Data Tools - Business Intelligence for Microsoft Visual Studio 2015 | Authors 2016 RDL<br /><br /> Will upgrade older RDL versions to 2016 RDL | 2016 RDL | SQL Server 2016 |
| Report Designer in SQL Server 2014 Data Tools - Business Intelligence for Microsoft Visual Studio 2012<br /><br /> Or<br /><br /> Report Designer in SQL Server 2012 Data Tools - Business Intelligence for Microsoft Visual Studio 2012<br /><br /> Or<br /><br /> Report Designer in  SQL Server 2012 (11.x) |
 | Data Tools, included in  SQL Server 2012 (11.x) |
| . | Authors 2010 RDL<br /><br /> Will upgrade older RDL versions to 2010 RDL | 2010 RDL | SQL Server 2014 (12.x) |
| <br /><br />  SQL Server 2012 (11.x) |
| <br /><br />  SQL Server 2008 R2 (10.50.x) |
|  |
| Report Designer in  SQL Server 2008 R2 (10.50.x) |
 | Business Intelligence Development Studio | Authors 2010 RDL<br /><br /> Will upgrade older RDL versions to 2010 RDL | 2010 RDL | SQL Server 2008 R2 (10.50.x) |
|  |
| Report Designer in  SQL Server 2008 (10.0.x) |
 | Business Intelligence Development Studio | Authors 2008 RDL<br /><br /> Will upgrade older RDL versions to 2008 RDL | 2008 RDL | SQL Server 2008 (10.0.x) |
|  |
  
 For more information on SQL Server Data Tools (SSDT), see the following resources:  
  
-   [Deployment and version support in SQL Server Data Tools (SSRS)](tools/deployment-and-version-support-in-sql-server-data-tools-ssrs.md)  
  
-   [Download SQL Server Data Tools (SSDT) for Visual Studio](../ssdt/download-sql-server-data-tools-ssdt.md).  
  
##  <a name="bkmk_reportviewer"></a> ReportViewer controls  
 A  Visual Studio 
 ReportViewer control can display an .rdlc report in local preview mode or in remote mode, the control can display an .rdl file hosted on a  Reporting Services 
 report server. The following table provides the list of RDL versions supported by the ReportViewer controls for local processing (.rdlc). Server side RDL support is summarized in the section [Report server and RDL schema support](#bkmk_report_server_rdl_schema_support).  
  
| ReportViewer control in product | Version of RDL for local preview |
| --- | --- |
| Visual Studio |
 | 2015 <br/><br/>Or<br/><br/> Visual Studio |
 | 2013<br /><br /> Or<br /><br />  Visual Studio |
 | 2012<br /><br /> Or<br /><br />  Visual Studio |
 | 2010 | 2008 RDL |
| Visual Studio 2005 |
| <br /><br /> Or<br /><br />  Visual Studio 2008 |
| 2005 RDL |
  
 For more information, see the following resources:  
  
-   [Converting RDLC files to RDL files](https://learn.microsoft.com/previous-versions/ms252109\(v=vs.140\))  
  
-   [ReportViewer controls (Visual Studio)](https://learn.microsoft.com/previous-versions/ms251671\(v=vs.140\))  
  
-   [Adding and configuring the ReportViewer controls](https://learn.microsoft.com/previous-versions/ms252104\(v=vs.140\))  
  
## Related content

- [Reports, Report Parts, and Report Definitions (Report Builder and SSRS)](report-design/reports-report-parts-and-report-definitions-report-builder-and-ssrs.md)
- [SQL Server Reporting Services tools](tools/reporting-services-tools.md)
- [Report Definition Language (SSRS)](reports/report-definition-language-ssrs.md)
