---
title: "Deployment and version support in SQL Server Data Tools (SSDT)"
description: Learn about the supported versions for authoring and publishing reports in SQL Server Data Tools. Also, discover how to set project configuration and deployment properties.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: tools
ms.topic: concept-article
ms.custom:
  - intro-deployment
  - updatefrequency5
---
# Deployment and version support in SQL Server Data Tools (SSDT)
   SQL Server Data Tools 
 supports the following scenarios:  
  
-   Open report definitions (*.rdl) and report server projects (\*.rptproj).  
  
-   Build report definitions.  
  
-   Preview reports in Report Designer.  
  
-   Deploy reports to report servers.  
  
##  <a name="bkmk_ConfigurationandDeploymentProperties"></a> Configuration and deployment properties  
  SQL Server Data Tools (SSDT) 
 supports project configurations. A project configuration consists of a set of properties that specify locations and behaviors. You use these properties when a project is built either as a step in previewing or deploying reports. To learn more about project configurations, see the Visual Studio documentation.  
  
 Use project configurations to control the upgrade of report definitions to schema versions compatible with target report servers. The properties controlled by project configurations include the target report server, the folder where the build process temporarily stores report definitions for preview and deployment, and error levels.  
  
 Reports are built before they're rendered as previews in Report Designer or deployed to the report server.  
  
 You set the configuration properties in the  SQL Server Data Tools (SSDT) 
 **Project Property** dialog box.  
  
 The build and deployment properties include:  
  
-   OutputPath is a build property that identifies the path of folders to store the report definition used in build verification, deployment, and preview of reports.  
  
-   ErrorLevel is a build property that identifies the severity of the build issues that are reported as errors. Issues with severity levels less than or equal to the value of ErrorLevel are reported as errors; otherwise, the issues are reported as warnings. For more information, see The "Report Validation and Error Levels" section in [Design reports with Report Designer (SSRS)](design-reporting-services-paginated-reports-with-report-designer-ssrs.md).  
  
-   TargetServerVersion is a deployment property that identifies the expected version of  SQL Server 
  Reporting Services 
 that is installed on the target report server specified in the TargetServerURL property.  
  
 When you specify the earlier version of  SQL Server 
  Reporting Services 
 in the **Project Property** dialog box, the reports aren't reverted automatically to the earlier version. As such, a Report Server project can contain reports from the two different versions of  SQL Server 
. When the Report Server project is deployed, all reports in the project are converted to the version specified in TargetServerVersion.  
  
 You can add more than one project configuration to a project; each one is used for a different scenario, such as deploying to different versions of report servers. For more information, see [Set deployment properties (Reporting Services)](set-deployment-properties-reporting-services.md) and [Project property pages dialog box](project-property-pages-dialog-box.md).  
  
##  <a name="bkmk_SupportedVersions"></a> Supported versions  
  
> **Note:**  
>   SQL Server Data Tools (SSDT) 
, the 32-bit development environment for Report Server projects, is not designed to run on Itanium-based computers and is not installed on Itanium-based servers. However, support for  SQL Server Data Tools 
 is available for x64-based computers.  
  
 The following table describes the supported versions for authoring and publishing reports in  SQL Server Data Tools (SSDT) 
.  
  
> **Note:**  
>  The schema has not changed since  SQL Server 2008 (10.0.x) 
.  
  
| Project or File type | Version | Author Reports | Publish Reports | Notes |
| --- | --- | --- | --- | --- |
| Report Server Project<br /><br /> or<br /><br /> Report Server Wizard Project |
 | SQL Server 2016 (13.x) |
 | Reporting Services or later (SSRS) |
| 2016 RDL schema |
 | SQL Server 2016 (13.x) |
 | Reporting Services or later (SSRS) |
|  |
| Report Server Project<br /><br /> or<br /><br /> Report Server Wizard Project | SQL Server 2014 (12.x) |
| 2014 RDL schema | SQL Server 2014 (12.x) |
  | Reporting Services |
|  |
| Report Server Project<br /><br /> or<br /><br /> Report Server Wizard Project | SQL Server 2012 (11.x) |
| 2012 RDL schema | SQL Server 2012 (11.x) |
  | Reporting Services |
|  |
| Report Server Project<br /><br /> or<br /><br /> Report Server Wizard Project | SQL Server 2008 R2 (10.50.x) |
| 2008 R2 RDL schema | SQL Server 2008 R2 (10.50.x) |
  | Reporting Services |
|  |
| Report Server Project<br /><br /> or<br /><br /> Report Server Wizard Project | SQL Server 2008 (10.0.x) |
| 2008 RDL schema | SQL Server 2008 (10.0.x) |
  | Reporting Services |
 | report server only | Upgrades 2003 RDL and 2005 RDL to the 2008 RDL schema locally. |
  
 For more information about opening reports in a previous version of the report definition schema, see [Upgrade Reports](../install-windows/upgrade-reports.md). For more information about specific report definition schemas, see [Report Definition Language Specification](https://learn.microsoft.com/openspecs/sql_server_protocols/ms-rdl/53287204-7cd0-4bc9-a5cd-d42a5925dca1).  
  
## Related content

- [Publishing Data Sources and Reports](../reports/publishing-data-sources-and-reports.md)
