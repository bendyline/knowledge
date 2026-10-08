---
title: "NumberOfFlags Property (ClientNetworkProtocol)"
description: "NumberOfFlags Property (ClientNetworkProtocol Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "NumberOfFlags property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "NumberOfFlags Property (ClientNetworkProtocol Class)"
apitype: "MOFDef"
---
# NumberOfFlags Property (ClientNetworkProtocol Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets the number of flag options required by the client network protocol specified by the [SetOrderValue Method (ClientNetworkProtocol Class)](setordervalue-method-clientnetworkprotocol-class.md).  
  
## Syntax  
  
```  
  
object.NumberofFlags [= value]  
```  
  
## Parts  
 *object*  
 A [ClientNetworkProtocol Class](clientnetworkprotocol-class.md) object that represents the network protocol used by the  SQL Server 
 client.  
  
## Property Value/Return Value  
 A **Uint32** value that specifies the number of flag options required by the client network protocol referenced by the **OrderValue** property.  
  
## Remarks  
  
## Related content

- [Configure client protocols](../../../database-engine/configure-windows/configure-client-protocols.md)
