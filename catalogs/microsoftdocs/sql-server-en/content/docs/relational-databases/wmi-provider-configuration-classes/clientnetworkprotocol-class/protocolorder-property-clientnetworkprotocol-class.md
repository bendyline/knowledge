---
title: "ProtocolOrder Property (ClientNetworkProtocol)"
description: "ProtocolOrder Property (ClientNetworkProtocol Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "ProtocolOrder property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "ProtocolOrder Property (ClientNetworkProtocol Class)"
apitype: "MOFDef"
---
# ProtocolOrder Property (ClientNetworkProtocol Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets the order number of the currently referenced client network protocol as specified by the [SetOrderValue Method (ClientNetworkProtocol Class)](setordervalue-method-clientnetworkprotocol-class.md) method.  
  
## Syntax  
  
```  
  
object.ProtocolOrder [= value]  
```  
  
## Parts  
 *object*  
 A [ClientNetworkProtocol Class](clientnetworkprotocol-class.md) object that represents the network protocol used by the  Microsoft 
  SQL Server 
 client.  
  
## Property Value/Return Value  
 A **uint32** value that specifies the order number of the currently referenced client network protocol as set by the **OrderValue** method. If the client network protocol is disabled, this value will be zero.  
  
## Remarks  
  
## Related content

- [Configure client protocols](../../../database-engine/configure-windows/configure-client-protocols.md)
