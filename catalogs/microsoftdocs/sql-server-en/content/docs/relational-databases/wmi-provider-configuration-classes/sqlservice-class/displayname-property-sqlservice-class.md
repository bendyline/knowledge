---
title: "DisplayName Property (SqlService)"
description: "DisplayName Property (SqlService Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "DisplayName property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "DisplayName Property (SqlService Class)"
apitype: "MOFDef"
---
# DisplayName Property (SqlService Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets the display name of the service.  
  
## Syntax  
  
```  
  
object.DisplayName [= value]  
```  
  
## Parts  
 *object*  
 A [SqlService Class](sqlservice-class.md) object that represents the service.  
  
## Property Value/Return Value  
 A string value that specifies the display name of the service.  
  
## Remarks  
 This string has a maximum length of 256 characters. The name is case-preserved in the  SQL Server 
 Configuration Manager. However, display name comparisons are always case-insensitive.  
  
## Example  
  
```  
mysqlservice.DisplayName = "Atdisk"  
```  
  
## Related content

- [Starting and Stopping Services](https://technet.microsoft.com/library/ms174886\(v=sql.105\).aspx)
