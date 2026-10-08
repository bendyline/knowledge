---
title: "Add Data from External Data Sources"
description: Learn about adding data to reports from external data sources and how reports work with data access technologies.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-data
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---

# Add Data from External Data Sources (SSRS)
  To retrieve data from an external data source, you use a data connection. Data connection information is usually provided by the owner of the external data source, who is responsible for granting permissions and specifying which types of credentials to use. Data connection information is saved as a report data source. The data source type specifies which data extension to use to retrieve the data.  
  
 For more information about data source types, see [In This Section](#InThisSection).  
  
##  <a name="DataAccess"></a> Understanding Data Access Technology  
 To retrieve data for a report dataset requires multiple layers of data access software. The following list provides a simple description of how reports work with data access technologies:  
  
-   **Application and user interface** The Report Builder application that you use to create a data source, add a reference to a shared data source, add a shared dataset, or add a report part that includes the data sources and datasets that it depends on..  

    > **Note:**
> Report parts are deprecated for all releases of SQL Server Reporting Services starting with SQL Server Reporting Services 2019 and all releases of Power BI Report Server starting with Power BI Report Server September 2022.


-   **Report definition elements** Data sources and datasets are part of the report definition. After a report is published to a report server, shared data sources and shared datasets are managed independently from the report definition.  
  
    -   **Data source and Shared data source** Part of a report definition that includes the information about the type of data processing extension, the connection information, and the authentication.  
  
    -   **Dataset and field collection** Part of a report definition that includes the query, the field collection, and the field data types.  
  
-   **Reporting Services data extensions** Built-in data extensions that are installed with Report Builder. A data extension provides functionality that handles authentication, server aggregates, and multi-value parameters.  
  
-   **Data provider** The software that manages the connection and retrieval of data from the external data source. The data provider defines the connection string syntax. Most data extensions are built on top of a data provider layer.  
  
-   **External data source** Where to retrieve report data from, for example, a database, a file, a cube, or a Web service.  
  
> **Note:**  
>  When you are not connected to a report server, you can choose from data extensions that are installed with Report Builder. You access the data as a single user using credentials from your computer. When you are connected to a report server, you can choose from data extensions that are installed on the report server. You access the data as one of multiple users who run the report and you are using credentials on the report server. For more information, see [Specify Credential and Connection Information for Report Data Sources](specify-credential-and-connection-information-for-report-data-sources.md).  
  
##  <a name="ReportData"></a> Understanding Report Data  
 In its simplest form, a report displays data from a report dataset in a data region on the report page, that is, in a single table, chart, matrix, or other type of report data region. The data in a report dataset comes from the first result set that is returned from a single query command that runs from read-only access to an external data source. Each data region expands as needed to display all the data from the dataset.  
  
 Data in a dataset are essentially tabular. Columns are the fields from the dataset query. Rows are from the rows in the result set. You can use the following generalized types of data in a report:  
  
-   Rectangular data. Data from a result set that has the same number of columns in every row.  
  
-   Hierarchical data is supported as a flattened rowset.  
  
    -   Ragged hierarchies, where there is a different number of columns for each row of data, is not supported. For some data extensions, this has some implications.  
  
    -   Data extensions that work with multidimensional data sources use XML for Analysis protocol and retrieve data as a flattened row set and not as a cell set.  
  
    -   The XML data extension automatically flattens XML data to use it in a report. If the first instance of an XML element does not include all attributes or subelements, the data might not be available as report data.  
  
-   Recursive data is supported. A result set that contains a recursive data hierarchy includes all the information about the hierarchy structure in a rectangular result set. For example, the report-to structure in a company can be represented by a table that includes two columns: an employee and a manager. Each manager also is an employee with a manager. The top manager usually contains a null or some other identifier that indicates that this employee has no manager.  
  
  
##  <a name="DataTypes"></a> Working with Data Types  
 When you create a dataset, the data types of the fields are mapped to a subset of common language runtime (CLR) data types from the  .NET Framework 
. Data types that cannot be clearly mapped are returned as strings. For more information about working with field data types, see [Dataset Fields Collection (Report Builder and SSRS)](dataset-fields-collection-report-builder-and-ssrs.md). When you create a parameter, the data type must be a supported report definition data type. For more information about mapping data types from the data provider to a report parameter, see [Data Types in Expressions (Report Builder and SSRS)](../report-design/data-types-in-expressions-report-builder-and-ssrs.md).  
  
  
##  <a name="HowTo"></a> How-To Topics  
 This section contains step-by-step instructions for working with data connections, data sources, and datasets.  
  
 [Add and Verify a Data Connection (Report Builder and SSRS)](add-and-verify-a-data-connection-report-builder-and-ssrs.md)  
  
 [Create a Shared Dataset or Embedded Dataset (Report Builder and SSRS)](create-a-shared-dataset-or-embedded-dataset-report-builder-and-ssrs.md)  
  
 [Add a Filter to a Dataset (Report Builder and SSRS)](add-a-filter-to-a-dataset-report-builder-and-ssrs.md)  
  
  
##  <a name="InThisSection"></a> In This Section  
 The following topics provide information about each built-in data extension.  
  
| Topic | Data Source Type |
| --- | --- |
| [SQL Server Connection Type (SSRS)](sql-server-connection-type-ssrs.md) | Microsoft |
  | SQL Server |
|  |
| [Analysis Services Connection Type for MDX (SSRS)](analysis-services-connection-type-for-mdx-ssrs.md) | Microsoft |
  | SQL Server |
  | Analysis Services |
|  |
| [Power Pivot Connection Type (SSRS)](power-pivot-connection-type-ssrs.md) | Microsoft |
  | SQL Server |
  | Analysis Services |
|  |
| [SharePoint List Connection Type (SSRS)](sharepoint-list-connection-type-ssrs.md) | Microsoft |
 | SharePoint List |
| [Azure SQL Connection Type (SSRS)](sql-azure-connection-type-ssrs.md) | Microsoft |
  | SQL Database |
|  |
| [SAP NetWeaver BI Connection Type (SSRS)](sap-netweaver-bi-connection-type-ssrs.md) | SAP NetWeaver BI |
| [Hyperion Essbase Connection Type (SSRS)](hyperion-essbase-connection-type-ssrs.md) | Hyperion Essbase |
| [OLE DB Connection Type (SSRS)](ole-db-connection-type-ssrs.md) | OLE DB |
| [ODBC Connection Type (SSRS)](odbc-connection-type-ssrs.md) | ODBC |
| [XML Connection Type (SSRS)](xml-connection-type-ssrs.md) | XML |
  
## Related content

- [Report Datasets (SSRS)](report-datasets-ssrs.md)
- [Create data connection strings in Report Builder](data-connections-data-sources-and-connection-strings-report-builder-and-ssrs.md)
- [Report Embedded Datasets and Shared Datasets (Report Builder and SSRS)](report-embedded-datasets-and-shared-datasets-report-builder-and-ssrs.md)
- [Dataset Fields Collection (Report Builder and SSRS)](dataset-fields-collection-report-builder-and-ssrs.md)
- [Data Sources Supported by Reporting Services (SSRS)](data-sources-supported-by-reporting-services-ssrs.md)
- [Data processing extensions overview](../extensions/data-processing/data-processing-extensions-overview.md)
- [Query Design Tools (SSRS)](query-design-tools-ssrs.md)
