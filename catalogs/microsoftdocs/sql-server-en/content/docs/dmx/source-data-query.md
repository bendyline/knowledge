---
title: "&lt;source data query&gt;"
description: "&lt;source data query&gt;"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# &lt;source data query&gt;

**Applies to:**
 

  Analysis Services 



  To train a data mining model and create predictions from a mining model, you have to access data that is external to the  Microsoft 
  SQL Server 
  Analysis Services 
 database. You use the \<source data query> clause in Data Mining Extensions (DMX) to define this external data. The [INSERT INTO (DMX)](insert-into-dmx.md), [SELECT FROM \<model> PREDICTION JOIN (DMX)](select-from-model-prediction-join-dmx.md), and [SELECT FROM NATURAL PREDICTION JOIN](select-from-model-prediction-join-dmx.md) statements all use **\<source data query>**.  
  
## Query types  
 The three most common ways to specify source data are:  
  
 [OPENQUERY (DMX)](source-data-query-openquery.md)  
 This statement queries data that is external to an instance of  Analysis Services 
, by using an existing data source.  
  
 While **OPENQUERY** is similar in function to **OPENROWSET**, **OPENQUERY** has the following benefits:  
  
-   A DMX query is much easier to write with **OPENQUERY**. Instead of creating a new connection string every time that you write a query, you can take advantage of the existing connection string in the data source. The data source object can also control data access for individual users.  
  
-   The administrator has more control over how the data on the server is accessed. For example, the administrator can manage which providers are loaded into the server and which external data can be accessed.  
  
 [OPENROWSET (DMX)](source-data-query-openrowset.md)  
 This statement queries data that is external to an instance of  Analysis Services 
, by using an existing data source.  
  
 [SHAPE (DMX)](source-data-query-shape.md)  
 This statement queries multiple data sources to create a nested table. By using **SHAPE**, you can combine data from multiple sources into a single hierarchical table. This lets you take advantage of the ability of  Analysis Services 
 to nest tables by imbedding a table within a table.  
  
 To specify the source data, you can also use the following options:  
  
-   Any valid DMX statement  
  
-   Any valid Multidimensional Expressions (MDX) statement  
  
-   A table that returns a stored procedure  
  
-   An XML for Analysis (XMLA) rowset  
  
-   A rowset parameter  
  
## Related content

- [DMX Statements - Data Manipulation](dmx-statements-data-manipulation.md)
- [Data Mining Extensions (DMX) Statements](data-mining-extensions-dmx-statements.md)
- [Nested Tables (Analysis Services - Data Mining)](https://learn.microsoft.com/analysis-services/data-mining/nested-tables-analysis-services-data-mining)
