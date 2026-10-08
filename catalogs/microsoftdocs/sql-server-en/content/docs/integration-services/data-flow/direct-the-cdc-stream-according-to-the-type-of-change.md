---
title: "Direct the CDC Stream According to the Type of Change"
description: "Direct the CDC Stream According to the Type of Change"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
---
# Direct the CDC Stream According to the Type of Change


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory

> **Important:**
> CDC Flow Components, including CDC Control Task, CDC Source and CDC Splitter, are deprecated. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

  To add and configure a CDC splitter Transformation, the package must contain at least one Data Flow task and a CDC source.  
  
 The CDC source added to the package must have a NetCDC processing mode selected. For more information on selecting processing modes, see [CDC Source Editor (Connection Manager Page)](cdc-source.md).  
  
### To direct the CDC stream according to the type of change  
  
1.  In  SQL Server Data Tools 
, open the  SQL Server 2019 Integration Services (SSIS) 
 project that contains the package you want.  
  
2.  In the Solution Explorer, double-click the package to open it.  
  
3.  Click the **Data Flow** tab, and then from the **Toolbox**, drag the CDC splitter to the design surface.  
  
4.  Connect the CDC source that is included in the package to the CDC Splitter.  
  
5.  Connect the CDC splitter to one or more destinations. You can connect up to three different outputs.  
  
6.  Select one of the following outputs:  
  
    -   Delete output: The output where DELETE change rows are directed.  
  
    -   Insert output: The output where INSERT change rows are directed.  
  
    -   Update output: The output where before/after UPDATE change rows and Merge change rows are directed.  
  
7.  Optionally, you can configure the advanced properties using the **Advanced Editor** dialog box.  
  
     The **Advanced Editor** dialog box contains the properties that can be set programmatically.  
  
     To open the **Advanced Editor** dialog box:  
  
    -   In the **Data Flow** screen of your  SQL Server 2019 Integration Services (SSIS) 
 project, right-click the CDC splitter and select **Show Advanced Editor**.  
  
     For more information about using the CDC splitter see CDC Components for Microsoft SQL Server Integration Services.  
  
## Related content

- [CDC Splitter](cdc-splitter.md)
