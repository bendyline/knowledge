---
title: "RemoveCertificate Method (ServerSettings)"
description: "RemoveCertificate Method (ServerSettings Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "RemoveCertificate method"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "RemoveCertificate Method (ServerSettings Class)"
apitype: "MOFDef"
---
# RemoveCertificate Method (ServerSettings Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Removes the current security certificate from the instance of  SQL Server 
.  
  
## Syntax  
  
```  
  
object.RemoveCertificate()  
```  
  
## Parts  
 *object*  
 A [ServerSettings Class](serversettings-class.md) object that represents the server settings on an instance of  SQL Server 
.  
  
## Property Value/Return Value  
 A **uint32** value, which is 0 if the service was successfully modified, 1 if the request is not supported, and any other number to indicate an error.  
  
## Remarks  
  
## Related content

- [Configuring Server Network Protocols and Net-Libraries](https://msdn.microsoft.com/library/ms177485\(v=sql.100\).aspx)
