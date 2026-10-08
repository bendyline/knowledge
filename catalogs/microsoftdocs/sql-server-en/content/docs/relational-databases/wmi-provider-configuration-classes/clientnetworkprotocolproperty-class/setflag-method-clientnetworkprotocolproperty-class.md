---
title: "SetFlag Method (ClientNetworkProtocolProperty)"
description: "SetFlag Method (ClientNetworkProtocolProperty Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "SetFlag method"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "SetFlag Method (ClientNetworkProtocolProperty Class)"
apitype: "MOFDef"
---
# SetFlag Method (ClientNetworkProtocolProperty Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Sets the flag of the current property referenced by the [PropertyIdx Property (ClientNetworkProtocolProperty Class)](propertyidx-property-clientnetworkprotocolproperty-class.md) value.  
  
## Syntax  
  
```  
  
object.SetFlag(BoolValue) [=]  
```  
  
## Parts  
 *object*  
 A [ClientNetworkProtocolProperty Class](clientnetworkprotocolproperty-class.md) object that represents an attribute of the network protocol used by the  Microsoft 
  SQL Server 
 client.  
  
#### Parameters  
  
| Parameter | Description |
| --- | --- |
| *BoolValue* | A Boolean value that specifies the new value of the flag. |
  
## Property Value/Return Value  
 A **uint32** value, which is 0 if the service was successfully modified, 1 if the request is not supported, and any other number to indicate an error.  
  
## Remarks  
  
## Related content

- [Configure client protocols](../../../database-engine/configure-windows/configure-client-protocols.md)
