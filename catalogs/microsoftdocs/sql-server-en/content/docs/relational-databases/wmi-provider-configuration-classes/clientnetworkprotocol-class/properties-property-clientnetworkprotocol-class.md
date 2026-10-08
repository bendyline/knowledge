---
title: "Properties Property (ClientNetworkProtocol)"
description: "Properties Property (ClientNetworkProtocol Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "Properties property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "Properties Property (ClientNetworkProtocol Class)"
apitype: "MOFDef"
---
# Properties Property (ClientNetworkProtocol Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets the properties associated with the current client network protocol specified by the [Configure Client Protocols](../../../database-engine/configure-windows/configure-client-protocols.md).  
  
## Syntax  
  
```  
  
object.Properties [= value]  
```  
  
## Parts  
 *object*  
 A [ClientNetworkProtocol Class](clientnetworkprotocol-class.md) object that represents the network protocol used by the  SQL Server 
 client.  
  
## Property Value/Return Value  
 An array of [ClientNetworkProtocolProperty Class](../clientnetworkprotocolproperty-class/clientnetworkprotocolproperty-class.md) objects that represent the properties supported by the current client network protocol that is referenced by the **OrderValue** property.  
  
## Remarks  
  
## Related content

- [Configure client protocols](../../../database-engine/configure-windows/configure-client-protocols.md)
