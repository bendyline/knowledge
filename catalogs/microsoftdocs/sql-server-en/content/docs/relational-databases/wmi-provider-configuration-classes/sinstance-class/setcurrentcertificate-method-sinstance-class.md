---
title: "SetCurrentCertificate Method (SInstance)"
description: "SetCurrentCertificate Method (SInstance Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "SetCurrentCertificate method"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "SetCurrentCertificate Method (SInstance Class)"
apitype: "MOFDef"
---
# SetCurrentCertificate Method (SInstance Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Sets the current security certificate.  
  
## Syntax  
  
```  
  
object.SetCurrentCertificate(SHA)  
```  
  
## Parts  
 *object*  
 An [SInstance Class](sinstance-class.md) object that represents the server setting on an instance of  Microsoft 
  SQL Server 
.  
  
#### Parameters  
  
| Parameter | Description |
| --- | --- |
| *SHA* | A string value that specifies the current security certificate. |
  
## Property Value/Return Value  
 A **uint32** value, which is 0 if the service was successfully modified, 1 if the request is not supported, and any other number to indicate an error.  
  
## Remarks  
  
## Related content

- [Configuring Server Network Protocols and Net-Libraries](https://msdn.microsoft.com/library/ms177485\(v=sql.100\).aspx)
