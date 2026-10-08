---
title: "ExitCode Property (SqlService)"
description: "ExitCode Property (SqlService Class)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "ExitCode property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "ExitCode Property (SqlService Class)"
apitype: "MOFDef"
---
# ExitCode Property (SqlService Class)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Gets or sets the  Microsoft 
 Win32 error code that defines problems encountered when starting and stopping the service.  
  
## Syntax  
  
```  
  
object.ExitCode [= value]  
```  
  
## Parts  
 *object*  
 A [SqlService Class](sqlservice-class.md) object that represents the service.  
  
## Property Value/Return Value  
 A **uint32** value that specifies the exit code.  
  
## Remarks  
 This property is set to ERROR_SERVICE_SPECIFIC_ERROR (1066) when the error is unique to the service represented by this class. The service sets this value to NO_ERROR when running, and again upon normal termination.  
  
## Related content

- [Starting and Stopping Services](https://technet.microsoft.com/library/ms174886\(v=sql.105\).aspx)
