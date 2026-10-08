---
title: "SQL Server Parallel Data Warehouse Connection Type"
description: Use the information in this article about the SQL Server Parallel Data Warehouse connection type to learn how to build a data source.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-data
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---

# SQL Server Parallel Data Warehouse Connection Type (SSRS)

   Azure Synapse Analytics  uses SQL Server databases for distributed processing and data storage.  
  
 The appliance partitions large database tables across multiple physical nodes, with each node running its own instance of SQL Server. When a report connects to  Azure Synapse Analytics  to retrieve report data, it connects to the control node, which manages query processing, in the  Azure Synapse Analytics  appliance. After the connection is made, there are no differences between working with an instance of  SQL Server 
 that is and is not within a  Azure Synapse Analytics  environment.  
  
 To include data from  Azure Synapse Analytics  in your report, you must have a dataset that is based on a report data source of type  Microsoft 
  SQL Server 
 Parallel Data Warehouse. This built-in data source type is based on the  Microsoft 
  SQL Server 
 Parallel Data Warehouse data extension. Use this data source type to connect to and retrieve data from  Azure Synapse Analytics .  
  
 This data extension supports multivalued parameters, server aggregates, and credentials managed separately from the connection string.  
   
  
 Use the information in this topic to build a data source. For step-by-step instructions, see [Add and Verify a Data Connection (Report Builder and SSRS)](add-and-verify-a-data-connection-report-builder-and-ssrs.md).  
  
##  <a name="Connection"></a> Connection String  
 When you connect to  Azure Synapse Analytics , you are connecting to a database object within a  Azure Synapse Analytics  appliance. You specify the database object to use in the query designer. If you do not specify a database in the connection string, you connect to the default database that the administrator assigned to you. Contact your database administrator for connection information and for the credentials to use to connect to the data source. The following connection string example specifies the sample database, **CustomerSales**, in the  Azure Synapse Analytics  appliance:  
  
```  
HOST=<IP address>; database= CustomerSales; port=<port>  
```  
  
 In addition, you use the **Data Sources Properties** dialog box to provide credentials such as user name and password, The `User Id` and `Password` options are automatically appended to the connection string, you do not need to type them as part of the connection string. The user interface also provides options to specify the IP address of the control node in the  Azure Synapse Analytics  appliance and the port number. By default, the port is 17000. The port is configurable by an administrator and your connection string might use a different port number.  
  
 For more information about connection string examples, see [Create data connection strings - Report Builder & SSRS](data-connections-data-sources-and-connection-strings-report-builder-and-ssrs.md).  
  
##  <a name="Credentials"></a> Credentials  
  Azure Synapse Analytics  provides its own security technology to implement and store user names and passwords. You cannot use Windows Authentication. If you attempt to connect to  Azure Synapse Analytics  using Windows Authentication an error occurs.  
  
 Credentials must be sufficient to access the database. Depending on your query, you might need other permissions, such as sufficient permissions to access tables and views. The owner of the external data source must configure credentials that are sufficient to provide read-only access to the database objects that you need.  
  
 From a report authoring client, the following options are available to specify credentials:  
  
-   Use a stored user name and password. To negotiate the double hop that occurs when the database that contains the report data is different than the report server, select options to use credentials as Windows credentials. You can also chose to impersonate the authenticated user after connecting to the data source.  
  
-   No credentials are required. To use this option, you must have the unattended execution account configured on the report server. For more information, see [Configure the Unattended Execution Account (Report Server Configuration Manager)](../install-windows/configure-the-unattended-execution-account-ssrs-configuration-manager.md). 
  
 For more information, see [Create data connection strings - Report Builder & SSRS](data-connections-data-sources-and-connection-strings-report-builder-and-ssrs.md) or [Specify Credential and Connection Information for Report Data Sources](specify-credential-and-connection-information-for-report-data-sources.md).  
  
  
##  <a name="Query"></a> Queries  
 A query specifies which data to retrieve for a report dataset.  
  
 The columns in the result set for a query populate the field collection for a dataset. If the query returns multiple result sets, the report processes only the first result set that a query retrieves. By default, if you create a new query or open an existing query that can be represented in the graphical query designer, the relational query designer is available. You can specify a query in the following ways:  
  
-   Build a query interactively. Use the relational query designer that displays a hierarchical view of tables, views, and other database items, organized by database schema. Select columns from tables or views. Limit the number of rows of data to retrieve by specifying filter criteria, grouping, and aggregates. Customize the filter when the report runs by setting the parameter option.  
  
-   Type or paste a query. Use the text-based query designer to enter  SQL 
 text directly, to paste query text from another source, to enter complex queries that cannot be built by using the relational query designer, or to enter query-based expressions.  
  
-   Import an existing query from a file or report. Use the **Import** query button from either query designer to browse to a .sql file or .rdl file and import a query.  
  
 For more information, see [Relational Query Designer User Interface (Report Builder)](relational-query-designer-user-interface-report-builder.md) and [Text-based Query Designer User Interface (Report Builder)](text-based-query-designer-user-interface-report-builder.md).  
  
 The text-based query designer supports the [Text](#QueryText) mode in which you type  SQL 
 commands that select data from the data source.  
  
-   [Text](#QueryText)  
  
 You use  SQL 
 with  Azure Synapse Analytics  and  Transact-SQL  with SQL Server. The two dialects of the SQL language are very similar. Queries written for the  SQL Server 
 data source connection type can typically be used for the Analytics Platform System (PDW) data source connection type.  
  
 A query that retrieves report data from a large database, including a data warehouse such as  Azure Synapse Analytics , might generate a result set that has a very large number of rows unless you aggregate and summarize data to reduce the number of rows that the query returns. You can write queries that include aggregates and grouping by using either the graphical or text-based query designer.  
  
  SQL 
 support the clause, keyword, and aggregates that the query designer provides to summarize data.  
  
 The graphical query designer used by  Azure Synapse Analytics  provides built-in support for grouping and aggregates to help you write queries that retrieve only summary data. The  SQL 
 language features are: the GROUP BY clause, DISTINCT keyword, and aggregates such as SUM and COUNT. The text-based query designer provides full support for the  SQL 
 language, including grouping and aggregates.  
  
 For more information about  Transact-SQL , see [Transact-SQL Reference &#40;Database Engine&#41;](../../t-sql/language-reference.md).  
  
###  <a name="QueryText"></a> Using Query Type Text  
 In the text-based query designer, you type  SQL 
 commands to define the data in a dataset. The queries that you use to retrieve data from  Azure Synapse Analytics  are the same as ones you use to retrieve data from instances of  SQL Server 
 that are not running within a  Azure Synapse Analytics  application. For example, the following  SQL 
 query selects the names of all employees who are marketing assistants:  
  
```  
SELECT  
  HumanResources.Employee.BusinessEntityID  
  ,HumanResources.Employee.JobTitle  
  ,Person.Person.FirstName  
  ,Person.Person.LastName  
FROM  
  Person.Person  
  INNER JOIN HumanResources.Employee  
    ON Person.Person.BusinessEntityID = HumanResources.Employee.BusinessEntityID  
WHERE HumanResources.Employee.JobTitle = 'Marketing Assistant'   
```  
  
 Click the **Run** button (**!**) on the toolbar to run the query and display a result set.  
  
 To parameterize this query, add a query parameter. For example, change the WHERE clause to the following:  
  
 `WHERE HumanResources.Employee.JobTitle = (@JobTitle)`  
  
 When you run the query, report parameters that correspond to query parameters are automatically created. For more information, see [Query Parameters](#Parameters) later in this topic.  
  
  
##  <a name="Parameters"></a> Parameters  
 When query text contains query variables or stored procedures that have input parameters, the corresponding query parameters for the dataset and report parameters for the report are automatically generated. The query text must not include the DECLARE statement for each query variable.  
  
 For example, the following SQL query creates a report parameter named **EmpID**:  
  
```  
SELECT FirstName, LastName FROM HumanResources.Employee E INNER JOIN  
       Person.Contact C ON  E.ContactID=C.ContactID   
WHERE EmployeeID = (@EmpID)  
```  
  
 By default, each report parameter has data type Text and an automatically created dataset to provide a dropdown list of available values. After the report parameters are created, you might have to change default values. For more information, see [Report Parameters (Report Builder and Report Designer)](../report-design/report-parameters-report-builder-and-report-designer.md).  
  
  
##  <a name="Remarks"></a> Remarks  
  
###### Platform and Version Information  
 For more information about platform and version support, see [Data Sources Supported by Reporting Services (SSRS)](data-sources-supported-by-reporting-services-ssrs.md).  
  
  
##  <a name="HowTo"></a> How-To Topics  
 This section contains step-by-step instructions for working with data connections, data sources, and datasets.  
  
 [Add and Verify a Data Connection (Report Builder and SSRS)](add-and-verify-a-data-connection-report-builder-and-ssrs.md)  
  
 [Create a Shared Dataset or Embedded Dataset (Report Builder and SSRS)](create-a-shared-dataset-or-embedded-dataset-report-builder-and-ssrs.md)  
  
 [Add a Filter to a Dataset (Report Builder and SSRS)](add-a-filter-to-a-dataset-report-builder-and-ssrs.md)  
  
  
## Related content

- [Report Datasets (SSRS)](report-datasets-ssrs.md)
- [Create data connection strings in Report Builder](data-connections-data-sources-and-connection-strings-report-builder-and-ssrs.md)
- [Report Embedded Datasets and Shared Datasets (Report Builder and SSRS)](report-embedded-datasets-and-shared-datasets-report-builder-and-ssrs.md)
- [Dataset Fields Collection (Report Builder and SSRS)](dataset-fields-collection-report-builder-and-ssrs.md)
- [Data Sources Supported by Reporting Services (SSRS)](data-sources-supported-by-reporting-services-ssrs.md)
- [Paginated report parameters in Report Builder](../report-design/report-parameters-report-builder-and-report-designer.md)
- [Filter, group, and sort data in Report Builder paginated reports](../report-design/filter-group-and-sort-data-report-builder-and-ssrs.md)
- [Expressions in a paginated report (Report Builder)](../report-design/expressions-report-builder-and-ssrs.md)
- [Try asking the Reporting Services forum](https://go.microsoft.com/fwlink/?LinkId=620231)
