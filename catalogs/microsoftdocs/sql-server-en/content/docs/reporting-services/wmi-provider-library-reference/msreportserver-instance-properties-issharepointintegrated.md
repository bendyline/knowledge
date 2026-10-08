---
title: "IsSharePointIntegrated property (WMI MSReportServer_Instance)"
description: "IsSharePointIntegrated property (WMI MSReportServer_Instance)"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "IsSharePointIntegrated property"
---
# MSReportServer_Instance properties - IsSharePointIntegrated
  Specifies whether the report server is in SharePoint integrated mode. Beginning in  SQL Server 2012 (11.x) 
, this property always returns **False** because in SharePoint mode,  Reporting Services 
 instances are SharePoint shared services and aren't controlled by WMI providers.  
  
## Syntax  
  
```vb  
Public Dim IsSharePointIntegrated As Boolean  
```  
  
```csharp  
public Boolean IsSharePointIntegrated;  
```  
  
## Property values  
 A **Boolean** value that indicates whether the report server is in SharePoint integrated mode.  
  
## Requirements  
 **Namespace:**  **root\Microsoft\SqlServer\ReportServer\\<*InstanceName*>\v13** 
  
  
## Related content

- [MSReportServer_Instance members](msreportserver-instance-members.md)
- [MSReportServer_ConfigurationSetting class](msreportserver-configurationsetting-class.md)
