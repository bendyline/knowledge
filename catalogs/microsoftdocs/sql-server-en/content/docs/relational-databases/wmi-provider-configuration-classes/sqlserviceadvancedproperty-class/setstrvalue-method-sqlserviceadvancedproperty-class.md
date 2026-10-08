---
title: "SetStrValue Method (SqlServiceAdvancedProperty)"
description: "SetStrValue Method (SqlServiceAdvancedProperty Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "SetStrValue method"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "SetStrValue Method (SqlServiceAdvancedProperty Class)"
apitype: "MOFDef"
---
# SetStrValue Method (SqlServiceAdvancedProperty Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Sets the string value of a property.  
  
## Syntax  
  
```  
  
object.SetStrValue(StrValue)  
```  
  
## Parts  
 *object*  
 A [SqlServiceAdvancedProperty Class](sqlserviceadvancedproperty-class.md) object that represents an advanced property.  
  
#### Parameters  
  
| Parameter | Description |
| --- | --- |
| *StrValue* | A string value that specifies the value of the advanced property. |
  
## Property Value/Return Value  
 A uint32 value, which is 0 if the service was successfully modified, 1 if the request is not supported, and any other number to indicate an error.  
  
## Remarks  
 The property value type must be *string* to set the property to a string value.  
  
## Related content

- [Starting and Stopping Services](https://technet.microsoft.com/library/ms174886\(v=sql.105\).aspx)
