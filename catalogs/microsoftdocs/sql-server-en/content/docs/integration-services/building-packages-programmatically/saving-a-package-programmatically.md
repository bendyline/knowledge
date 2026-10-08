---
title: "Saving a Package Programmatically"
description: "Saving a Package Programmatically"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "programmatically saving a package"
  - "saving a package programmatically"
---
# Saving a Package Programmatically


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  After building a new package programmatically, or modifying an existing one, you usually want to save your changes.  
  
 All of the methods used in this topic to save packages require a reference to the **Microsoft.SqlServer.ManagedDTS** assembly. After you add the reference in a new project, import the [Microsoft.SqlServer.Dts.Runtime](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime) namespace with a **using** or **Imports** statement.  
  
## Saving a Package Programmatically  
 To save a package programmatically, call one of the following methods of the  Integration Services 
 [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) class:  
  
| Storage Location | Method to Call |
| --- | --- |
| File | [Microsoft.SqlServer.Dts.Runtime.Application.SaveToXml%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.SaveToXml%252A) |
| SSIS Package Store | [Microsoft.SqlServer.Dts.Runtime.Application.SaveToDtsServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.SaveToDtsServer%252A) |
| SQL Server |
| [Microsoft.SqlServer.Dts.Runtime.Application.SaveToSqlServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.SaveToSqlServer%252A)<br /><br /> or<br /><br /> [Microsoft.SqlServer.Dts.Runtime.Application.SaveToSqlServerAs%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.SaveToSqlServerAs%252A) |
  
> **Important:**  
>  The methods of the [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) class for working with the SSIS Package Store only support "." or the server name for the local server. You cannot use "(local)" or "localhost".  
  
## Related content

- [Save Packages](../save-packages.md)
