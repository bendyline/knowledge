---
title: "MultiIpConfigurationSupport Property (ServerNetworkProtocol)"
description: "MultiIpConfigurationSupport Property (ServerNetworkProtocol Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "MultiIpConfigurationSupport property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "MultiIpConfigurationSupport Property (ServerNetworkProtocol"
apitype: "MOFDef"
---
# MultiIpConfigurationSupport Property (ServerNetworkProtocol Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets the Boolean property that specifies whether multiple IP addresses are supported by a server network protocol.  
  
## Syntax  
  
```  
  
object.MultiIpConfigurationSupport [= value]  
```  
  
## Parts  
 *object*  
 A [ProtocolName Property (ServerNetworkProtocol Class)](protocolname-property-servernetworkprotocol-class.md) object that represents the network protocol used by the instance of  SQL Server 
.  
  
## Property Value/Return Value  
 A Boolean value that specifies whether multiple IP addresses are supported by the server network protocol: **true** if multiple IP addresses are supported by the server network protocol, or **false** if multiple IP addresses are not supported by the server network protocol.  
  
## Remarks  
  
## Related content

- [Configuring Server Network Protocols and Net-Libraries](https://msdn.microsoft.com/library/ms177485\(v=sql.100\).aspx)
