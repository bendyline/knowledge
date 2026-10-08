---
title: "OPENQUERY (DMX)"
description: "&lt;source data query&gt; - OPENQUERY"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# &lt;source data query&gt; - OPENQUERY

**Applies to:**
 

  Analysis Services 



  Replaces the source data query with a query to an existing data source. The INSERT, SELECT FROM PREDICTION JOIN, and SELECT FROM NATURAL PREDICTION JOIN statements support **OPENQUERY**.  
  
## Syntax  
  
```  
  
OPENQUERY(<named datasource>, <query syntax>)  
```  
  
## Arguments  
 *named datasource*  
 A data source that exists on the  Microsoft 
  SQL Server 
  Analysis Services 
 database.  
  
 *query syntax*  
 A query syntax that returns a rowset.  
  
## Remarks  
 **OPENQUERY** provides a more secure way to access external data by supporting data source permissions. Because the connection string is stored in the data source, administrators can use the properties of the data source to manage access to the data. For more information about data sources, see [Supported Data Sources (SSAS - Multidimensional)](https://learn.microsoft.com/analysis-services/multidimensional-models/supported-data-sources-ssas-multidimensional).  
  
 You can get a list of the data sources that are available on a server by querying the **MDSCHEMA_INPUT_DATASOURCES** schema rowset. For more information about using **MDSCHEMA_INPUT_DATASOURCES**, see [MDSCHEMA_INPUT_DATASOURCES Rowset](https://learn.microsoft.com/previous-versions/sql/sql-server-2012/ms126243\(v=sql.110\)).  
  
 You can also return a list of data sources in the current Analysis Services database by using the following DMX query:  
  
 `SELECT * FROM $system.MDSCHEMA_INPUT_DATASOURCES`  
  
## Examples  
 The following example uses the MyDS data source already defined in the  Analysis Services 
 database to create a connection to the  `AdventureWorksDW2025`  database and query the **vTargetMail** view.  
  
```  
OPENQUERY (MyDS,'SELECT TOP 1000 * FROM vTargetMail')  
```  
  
## Related content

- [&lt;source data query&gt;](source-data-query.md)
- [DMX Statements - Data Manipulation](dmx-statements-data-manipulation.md)
- [Data Mining Extensions (DMX) Statements](data-mining-extensions-dmx-statements.md)
