---
title: "Open Integration Services (SSIS) projects in Data Quality Client"
description: Learn how to open a SQL Server Integration Services (SSIS) project using the Data Quality Client for SQL Server Data Quality Services.
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Open Integration Services Projects in Data Quality Client


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


  The DQS Cleansing component in Integration Services enables you to run a cleansing project in batch mode. However, at times you might want to review the cleansing results in an Integration Services package similar to how you can review the cleansing results in the **Manage and View Results** tab of a cleansing activity in a data quality project in DQS. DQS enables you to open Integration Services projects in  Data Quality Client 
 just like any other data quality project from the **Open project** screen, and have an interactive cleansing experience of the cleansing results in an Integration Services project.  

<a id="BeforeYouBegin"></a>

##  <a name="LimitationsRestrictions"></a> Limitations and Restrictions  
  
-   Only completed Integration Services projects are available in the **Open project** screen in  Data Quality Client 
. Failed or running projects are not available in the **Open project** screen.  
  
-   Integration Services projects open at the interactive cleansing stage (**Manage View and Results** tab) in  Data Quality Client 
. You cannot go to the **Cleanse** or **Map** tabs. You can only go to the **Export** tab by clicking **Next**.  
  
-   You cannot delete a locked Integration Services project from  Data Quality Client 
. You must first unlock it to delete.  
  
<a id="Prerequisites"></a>

## Prerequisites

You must have successfully completed running an Integration Services project containing a package with a DQS Cleansing component to see and open it in  Data Quality Client 
.  
  
<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

You must have the dqs_kb_editor or dqs_kb_operator role on the DQS_MAIN database to open an Integration Services project.  
  
##  <a name="Open"></a> Open an Integration Services Project  
  
1.   Start Data Quality Client. For information about doing so, see 
 [Run the Data Quality Client Application](run-the-data-quality-client-application.md).  
  
2.  In the  Data Quality Client 
 home screen, click **Open Data Quality Project**. The **Open project** screen appears.  
  
3.  In the **Open project** screen, you can identify an Integration Services project in either of the following ways:  
  
    1.  **Project Name**: Integration Services projects are listed using the following naming terminology: "Package.DQS Cleansing_*\<DATE>\<TIME>*_{GUID}." Every time you successfully run the same package in  SQL Server Data Tools (SSDT) 
, a new project is listed in the **Open project** screen.  
  
    2.  **Project Type**: Integration Services projects have **SSIS** as the project type in the **Open project** screen.  
  
     Select a project, and click **Next**.  
  
4.  The Integration Services project opens at the interactive cleansing stage (**Manage View and Results** tab). You can perform an interactive cleansing on the data in the Integration Services project. For detailed information about the **Manage and View Results** tab, see [Interactive Cleansing Stage](cleanse-data-using-dqs-internal-knowledge.md#Interactive) in [Cleanse Data Using DQS (Internal) Knowledge](cleanse-data-using-dqs-internal-knowledge.md).  
  
5.  Click **Next** to go to the **Export** tab where you can export the processed data to any of the following: a new table in the SQL Server database, a .csv file, or an Excel file. For detailed information about the **Export** tab, see [Export Stage](cleanse-data-using-dqs-internal-knowledge.md#Export) in [Cleanse Data Using DQS (Internal) Knowledge](cleanse-data-using-dqs-internal-knowledge.md)  
  
6.  After exporting the data, click **Finish** to close the Integration Services project.  

  
## Related content

- [DQS Cleansing Transformation](../integration-services/data-flow/transformations/dqs-cleansing-transformation.md)
- [Integration Services (SSIS) Projects and Solutions](../integration-services/integration-services-ssis-projects-and-solutions.md)
