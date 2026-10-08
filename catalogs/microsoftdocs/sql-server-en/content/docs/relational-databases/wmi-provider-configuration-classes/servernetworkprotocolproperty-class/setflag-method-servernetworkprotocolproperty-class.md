---
title: "SetFlag Method (ServerNetworkProtocolProperty)"
description: "SetFlag Method (ServerNetworkProtocolProperty Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "SetFlag method"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "SetFlag Method (ServerNetworkProtocolProperty Class)"
apitype: "MOFDef"
---
# SetFlag Method (ServerNetworkProtocolProperty Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Sets the flag of the referenced property.  
  
## Syntax  
  
```  
  
object.SetFlag(BoolValue)  
```  
  
## Parts  
 *object*  
 A [ServerNetworkProtocolProperty Class](servernetworkprotocolproperty-class.md) object that represents an attribute of the network protocol on the instance of  Microsoft 
  SQL Server 
.  
  
#### Parameters  
  
| Parameter | Description |
| --- | --- |
| *BoolValue* | A Boolean value that specifies the new value of the flag. |
  
## Property Value/Return Value  
 A **uint32** value, which is 0 if the service was successfully modified, 1 if the request is not supported, and any other number to indicate an error.  
  
## Remarks  
  
## Related content

- [Configuring Server Network Protocols and Net-Libraries](https://msdn.microsoft.com/library/ms177485\(v=sql.100\).aspx)
