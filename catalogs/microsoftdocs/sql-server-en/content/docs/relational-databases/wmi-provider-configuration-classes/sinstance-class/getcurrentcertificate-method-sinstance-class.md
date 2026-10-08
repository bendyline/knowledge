---
title: "GetCurrentCertificate Method (SInstance)"
description: "GetCurrentCertificate Method (SInstance Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "GetCurrentCertificate method"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "GetCurrentCertificate Method (SInstance Class)"
apitype: "MOFDef"
---
# GetCurrentCertificate Method (SInstance Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets the current security certificate.  
  
## Syntax  
  
```  
  
object.GetCurrentCertificate(SHA)  
```  
  
## Parts  
 *object*  
 An [SInstance Class](sinstance-class.md) object that represents the server settings on an instance of  SQL Server 
.  
  
#### Parameters  
  
| Parameter | Description |
| --- | --- |
| *SHA* | A string object value (output parameter) that specifies the current security certificate after the method completes. |
  
## Property Value/Return Value  
 A **uint32** value, which is 0 if the service was successfully modified, 1 if the request is not supported, and any other number to indicate an error.  
  
## Remarks  
  
## Related content

- [Configuring Server Network Protocols and Net-Libraries](https://msdn.microsoft.com/library/ms177485\(v=sql.100\).aspx)
