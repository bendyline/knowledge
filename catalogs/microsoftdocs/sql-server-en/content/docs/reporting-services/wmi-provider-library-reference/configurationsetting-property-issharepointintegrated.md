---
title: "IsSharePointIntegrated property (WMI)"
description: "ConfigurationSetting property - IsSharePointIntegrated"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "IsSharePointIntegrated property"
---
# ConfigurationSetting property - IsSharePointIntegrated
  Specifies whether the report server is in SharePoint integrated mode. Beginning in  SQL Server 2012 (11.x) 
, this property always returns **False** because in SharePoint mode,  Reporting Services 
 instances are SharePoint shared services and are not controlled by WMI providers.  
  
## Syntax  
  
```vb  
Public Dim IsSharePointIntegrated As Boolean  
```  
  
```csharp  
public Boolean IsSharePointIntegrated;  
```  
  
## Property values  
 A **Boolean** object that indicates whether the report server is in SharePoint integrated mode.  
  
## Example code  
 [MSReportServer_ConfigurationSetting class](msreportserver-configurationsetting-class.md)  
  
## Requirements  
 **Namespace:**    **root\Microsoft\SqlServer\ReportServer\\<*InstanceName*>\v13\Admin**  
  
  
## Related content

- [MSReportServer_ConfigurationSetting members](msreportserver-configurationsetting-members.md)
