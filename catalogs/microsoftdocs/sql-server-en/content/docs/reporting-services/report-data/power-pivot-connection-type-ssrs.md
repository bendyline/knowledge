---
title: "Power Pivot Connection Type"
description: Use the information in this article about the Power Pivot connection type to learn how to build a data source.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-data
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Power Pivot Connection Type (SSRS)
  You can use SQL Server Analysis Services data processing extension to retrieve data from a  Power Pivot 
 workbook that is published in a SharePoint  Power Pivot 
 Gallery.  
  
 Use the information in this topic to build a data source. For step-by-step instructions, see [Add and Verify a Data Connection (Report Builder and SSRS)](add-and-verify-a-data-connection-report-builder-and-ssrs.md).  
  
## Prerequisites  
 The  Power Pivot 
 data source must be published in a  Power Pivot 
 Gallery on a SharePoint site.  
  
 To support connections from Report Builder to a  Power Pivot 
 workbook, you must have SQL Server 2008 R2 ADOMD.NET on your workstation computer. This client library is installed with  Power Pivot 
 for Excel, but if you are using a computer that does not have this application, you must download and install ADOMD.NET from the [SQL Server 2008 R2 Feature Pack](https://www.microsoft.com/download/details.aspx?id=44272).  
  
## Data Source Type  
 Use report data source type **Microsoft SQL Server Analysis Services**.  
  
## Connection String  
 The connection string is the URL to  Power Pivot 
 workbook published on SharePoint in the  Power Pivot 
 Gallery or other library, for example, `https://contoso-srv/subsite/PowerPivotLibrary/ContosoSales.xlsx`.  
  
## Credentials  
 Specify the credentials that you need to access the  Power Pivot 
 workbook and SharePoint site, for example, Windows Authentication (Integrated Security). For more information, see [Create data connection strings - Report Builder & SSRS](data-connections-data-sources-and-connection-strings-report-builder-and-ssrs.md) or [Specify Credential and Connection Information for Report Data Sources](specify-credential-and-connection-information-for-report-data-sources.md).  
  
## Queries  
 After you connect to the  Power Pivot 
 data source, use the MDX graphical query to build a query by browsing and selecting from the underlying data structures. After you build a query, run the query to see sample data in the results pane.  
  
 The query designer analyzes the query to determine the dataset fields. You can also manually edit the dataset field collection in the **Report Data** pane. For more information, see [Add, Edit, Refresh Fields in the Report Data Pane (Report Builder and SSRS)](add-edit-refresh-fields-in-the-report-data-pane-report-builder-and-ssrs.md).  
  
## Filters  
 In the Filters pane, specify dimensions and members to filter out or to include in the query results.  
  
## Parameters  
 In the Filters pane, select the **Parameters** option for a filter to automatically create a report parameter with available values that correspond to the filter selections.  
  
## Remarks  
 If you open Report Builder from the  Power Pivot 
 workbook in a  Power Pivot 
 Gallery, the PivotTables, PivotCharts, slicers, and other layout and analytical features from the  Power Pivot 
 workbook are not re-created in the report. Instead, the blank report includes a preconfigured data source that points to the data in the  Power Pivot 
 workbook. Designing reports based on a  Power Pivot 
 workbook can be labor-intensive and time-consuming depending on the number of slicers, filters, and tables or charts that you want to re-create in the report. A better approach is to envision the presentation of the data that you want in a report independently from the  Power Pivot 
 design.  
  
 The data in a  Power Pivot 
 workbook is highly compressed; data retrieved from the  Power Pivot 
 workbook for a report is not compressed. Use the query designer to specify filters and parameters to limit the data to just what is needed in the report.  
  
 Unlike connecting to an Analysis Services cube, a  Power Pivot 
 model has no hierarchies. To provide similar functionality to related slicers in the workbook, you must create cascading parameters in the report. For more information, see [Add Cascading Parameters to a Report (Report Builder and SSRS)](../report-design/add-cascading-parameters-to-a-report-report-builder-and-ssrs.md).  
  
 In some cases, you might need to adjust expressions to accommodate the underlying data values from the  Power Pivot 
 model. You might need to modify expressions to convert data to the right data type or to add or remove an aggregate function. For example, to convert data type from String to Integer, use `=CInt`. Always verify that the report displays the expected values from the data in the  Power Pivot 
 model before you publish the report.  
  
 Preview images of a report in a  Power Pivot 
 Gallery are generated only if the following conditions are met:  
  
-   The report and the  Power Pivot 
 workbook that provides the data must be stored together in the same  Power Pivot 
 Gallery.  
  
-   The report contains only  Power Pivot 
 data from a  Power Pivot 
 data source.  
  
## Related content

- [Analysis Services MDX Query Designer User Interface (Report Builder)](https://learn.microsoft.com/previous-versions/sql/)
- [Expressions in a paginated report (Report Builder)](../report-design/expressions-report-builder-and-ssrs.md)
