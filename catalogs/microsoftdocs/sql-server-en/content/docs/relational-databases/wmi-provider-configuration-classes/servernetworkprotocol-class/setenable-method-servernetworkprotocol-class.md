---
title: "SetEnable Method (ServerNetworkProtocol)"
description: "SetEnable Method (ServerNetworkProtocol Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "SetEnable method"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "SetEnable Method (ServerNetworkProtocol Class)"
apitype: "MOFDef"
---
# SetEnable Method (ServerNetworkProtocol Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Enables the server network protocol.  
  
## Syntax  
  
```  
  
object.SetEnable()  
```  
  
## Parts  
 *object*  
 A [ServerNetworkProtocol Class](servernetworkprotocol-class.md) object that represents the network protocol used by the instance of  Microsoft 
  SQL Server 
.  
  
## Property Value/Return Value  
 A **uint32** value, which is 0 if the service was successfully modified, 1 if the request is not supported, and any other number to indicate an error.  
  
## Remarks  
  
## Related content

- [Configuring Server Network Protocols and Net-Libraries](https://msdn.microsoft.com/library/ms177485\(v=sql.100\).aspx)
