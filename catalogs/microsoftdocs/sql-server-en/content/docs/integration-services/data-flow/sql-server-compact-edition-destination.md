---
title: "SQL Server Compact Edition Destination"
description: "SQL Server Compact Edition Destination"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
f1_keywords:
  - "sql13.dts.designer.sqlservercompactdest.f1"
helpviewer_keywords:
  - "destinations [Integration Services], SQL Server Compact"
  - "SQL Server Compact, destination"
  - "inserting data"
---
# SQL Server Compact Edition Destination


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The  SQL Server 
 Compact destination writes data to  SQL Server 
 Compact databases.  
  
> **Note:**  
>  On a 64-bit computer, you must run packages that connect to  SQL Server 
 Compact data sources in 32-bit mode. The  SQL Server 
 Compact provider that  Integration Services 
 uses to connect to  SQL Server 
 Compact data sources is available only in a 32-bit version.  SQL Server Compact destination  is not supported from VS2022. Details refer to [Microsoft SQL Server Compact Lifecycle](https://learn.microsoft.com/lifecycle/products/microsoft-sql-server-compact-40).
  
 You configure the  SQL Server 
 Compact destination by specifying the name of the table into which the  SQL Server 
 Compact destination inserts the data. The custom property TableName of the  SQL Server 
 Compact destination contains the table name.  
  
 This destination uses an  SQL Server 
 Compact connection manager to connect to a data source, and the connection manager specifies the OLE DB provider to use. For more information, see [SQL Server Compact Edition Connection Manager](../connection-manager/sql-server-compact-edition-connection-manager.md).  
  
 The  SQL Server 
 Compact destination includes the TableName custom property, which can be updated by a property expression when the package is loaded. For more information, see [Integration Services (SSIS) Expressions](../expressions/integration-services-ssis-expressions.md), [Use Property Expressions in Packages](../expressions/use-property-expressions-in-packages.md), and [SQL Server Compact Edition Destination Custom Properties](sql-server-compact-edition-destination-custom-properties.md).  
  
 The  SQL Server 
 Compact destination has one input and does not support an error output.  
  
## Configuration of the SQL Server Compact Edition Destination  
 You can set properties through  SSIS 
 Designer or programmatically.  
  
 The **Advanced Editor** dialog box reflects the properties that can be set programmatically. For more information about the properties that you can set in the **Advanced Editor** dialog box or programmatically, click one of the following topics:  
  
-   [Common Properties](set-the-properties-of-a-data-flow-component.md)  
  
-   [SQL Server Destination Custom Properties](sql-server-destination-custom-properties.md)  
  
## Related Tasks  
 For more information about how to set properties of this component, see [Set the Properties of a Data Flow Component](set-the-properties-of-a-data-flow-component.md).  
  
## Related content

- [Data Flow](data-flow.md)
