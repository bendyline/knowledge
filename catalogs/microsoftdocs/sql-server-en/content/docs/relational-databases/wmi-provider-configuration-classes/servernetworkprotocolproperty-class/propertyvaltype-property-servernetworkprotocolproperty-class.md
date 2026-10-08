---
title: "PropertyValType Property (ServerNetworkProtocolProperty)"
description: "PropertyValType Property (ServerNetworkProtocolProperty Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "PropertyValType property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "PropertyValType Property (ServerNetworkProtocolProperty"
apitype: "MOFDef"
---
# PropertyValType Property (ServerNetworkProtocolProperty Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets the data type of the value stored in the referenced property.  
  
## Syntax  
  
```  
  
object.PropertyValType [= value]  
```  
  
## Parts  
 *object*  
 A [ServerNetworkProtocolProperty Class](servernetworkprotocolproperty-class.md) object that represents an attribute of the network protocol on the instance of  Microsoft 
  SQL Server 
.  
  
## Property Value/Return Value  
 A **uint32** value that specifies the data type of the property value. It returns 0 for a string value and 1 for a numerical type.  
  
## Remarks  
  
## Related content

- [Configuring Server Network Protocols and Net-Libraries](https://msdn.microsoft.com/library/ms177485\(v=sql.100\).aspx)
