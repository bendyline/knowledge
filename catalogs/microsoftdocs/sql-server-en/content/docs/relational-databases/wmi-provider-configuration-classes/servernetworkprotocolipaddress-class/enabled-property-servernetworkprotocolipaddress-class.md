---
title: "Enabled Property (ServerNetworkProtocolIpAddress)"
description: "Enabled Property (ServerNetworkProtocolIpAddress Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "Enabled property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "Enabled Property (ServerNetworkProtocolIpAddress Class)"
apitype: "MOFDef"
---
# Enabled Property (ServerNetworkProtocolIpAddress Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets the Boolean property that specifies whether an IP address is enabled.  
  
## Syntax  
  
```  
  
object.Enabled [= value]  
```  
  
## Parts  
 *object*  
 A [ServerNetworkProtocolIPAddress Class](servernetworkprotocolipaddress-class.md) object that represents an IP address for the network protocol on the instance of  Microsoft 
  SQL Server 
.  
  
## Property Value/Return Value  
 A Boolean value that specifies whether the IP address is enabled: **true** if the IP address is enabled, or **false** if the IP address is disabled.  
  
## Related content

- [Configuring Server Network Protocols and Net-Libraries](https://msdn.microsoft.com/library/ms177485\(v=sql.100\).aspx)
