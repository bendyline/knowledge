---
title: "Compare shared and embedded  data sources - Report Builder & Reporting Services"
description: "Compare shared and embedded data sources - Report Builder & Reporting Services (SSRS)"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-data
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Compare shared and embedded data sources - Report Builder & Reporting Services (SSRS)

  **Applies to:**
 
 Reporting Services and later versions
 
 
You can connect to data with either a shared or an embedded data source. A *shared data source* is defined independent of any report. You can use it in multiple reports on a report server or SharePoint site. An *embedded data source* is defined in a report. You can only use it in that report. 

 Shared data sources are useful when you have data sources that you use often. We recommend that you create and use shared data sources as much as possible. They make reports and report access easier to manage, and help to keep reports and the data sources they access more secure. If you need a shared data source, you may need to ask your system administrator to create one for you.  
  
 An embedded data source, also known as a *report-specific data source*, is a data connection that's saved in the report definition. Embedded data source connection information can be used only by the report in which it's embedded. To define and manage embedded data sources, use the **Data Source Properties** dialog box.  
  
 The difference between embedded and shared data sources is in how they are created, stored, and managed.  
  
-   In Report Designer, create embedded or shared data sources as part of a  SQL Server Data Tools (SSDT) 
 project. You can control whether to use them locally for preview or to deploy them as part of the project to a report server or SharePoint site. You can use custom data extensions that have been installed on your computer and on the report server or SharePoint site where you deploy your reports.  
  
     System administrators can install and configure additional data processing extensions and .NET Framework data providers. For more information, see [Data Processing Extensions and .NET Framework Data Providers (SSRS)](data-processing-extensions-and-net-framework-data-providers-ssrs.md).  
  
     Developers can use the [Microsoft.ReportingServices.DataProcessing](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing) API to create data processing extensions to support additional types of data sources.  
  
-   In Report Builder
, browse to a report server or SharePoint site and select shared data sources or create embedded data sources in the report. You can't create a shared data source in Report Builder
. You can't use custom data extensions in Report Builder
.  

## Summary of differences
  
 The following table summarizes the differences between embedded and shared data sources.  
  
| Description | Embedded<br /><br /> Data Source | Shared<br /><br /> Data Source |
| --- | --- | --- |
| Data connection is embedded in the report definition. | Available |  |
| Pointer to the data connection on the report server is embedded in the report definition. |  | Available |
| Managed on the report server | Available | Available |
| Required for shared datasets |  | Available |
| Required for components |  | Available |

## Related content

- [Create, Modify, and Delete Shared Data Sources (SSRS)](create-modify-and-delete-shared-data-sources-ssrs.md)
- [Create and Modify Embedded Data Sources](create-and-modify-embedded-data-sources.md)
- [Set deployment properties (Reporting Services)](../tools/set-deployment-properties-reporting-services.md)
- [Credentials and connections for report data sources](specify-credential-and-connection-information-for-report-data-sources.md)
- [Try asking the Reporting Services forum](https://go.microsoft.com/fwlink/?LinkId=620231)
