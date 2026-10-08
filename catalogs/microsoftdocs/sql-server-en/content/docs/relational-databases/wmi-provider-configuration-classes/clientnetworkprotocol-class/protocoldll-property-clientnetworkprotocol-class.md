---
title: "ProtocolDLL Property (ClientNetworkProtocol)"
description: "ProtocolDLL Property (ClientNetworkProtocol Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "ProtocolDLL property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "ProtocolDLL Property (ClientNetworkProtocol Class)"
apitype: "MOFDef"
---
# ProtocolDLL Property (ClientNetworkProtocol Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets the name of the .dll file required by the network protocol specified by the [Configure Client Protocols](../../../database-engine/configure-windows/configure-client-protocols.md).  
  
## Syntax  
  
```  
  
object.ProtocolDLL [= value]  
```  
  
## Parts  
 *object*  
 A [ClientNetworkProtocol Class](clientnetworkprotocol-class.md) object that represents the network protocol used by the  Microsoft 
  SQL Server 
 client.  
  
## Property Value/Return Value  
 A string value that specifies the protocol .dll file required by the client network protocol.  
  
## Remarks  
  
## Related content

- [Configure client protocols](../../../database-engine/configure-windows/configure-client-protocols.md)
