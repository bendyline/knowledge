---
title: "GetAdminSiteUrl method (WMI)"
description: "ConfigurationSetting method - GetAdminSiteUrl"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "GetAdminSiteUrl method"
---
# ConfigurationSetting method - GetAdminSiteUrl
  Gets the absolute URL for the Central Administration Web site for the Microsoft  Windows SharePoint Services 
,  Office SharePoint Server  
,  SharePoint Foundation 2010 
, or  SharePoint Server 2010 
 farm that the report server is integrated with.  
  
## Syntax  
  
```vb  
Public Sub GetAdminSiteUrl(ByRef AdminSiteUrl as String, _  
ByRef HRESULT as Int32)  
```  
  
```csharp  
public void GetAdminSiteUrl(out string AdminSiteUrl, out Int32 HRESULT);  
```  
  
## Parameters  
 *AdminSiteUrl*  
 [out] A string that contains the absolute URL for the Central Administration Web site for the SharePoint farm that the report server is integrated with.  
  
 *HRESULT*  
 [out] Value indicating whether the call succeeded or failed.  
  
## Return value  
 Returns an *HRESULT* indicating success or failure of the method call. A value of 0 indicates that the method call was successful. A nonzero value indicates that an error occurred.  
  
## Requirements  
 **Namespace:**    **root\Microsoft\SqlServer\ReportServer\\<*InstanceName*>\v13\Admin**  
  
  
## Related content

- [MSReportServer_ConfigurationSetting methods](msreportserver-configurationsetting-methods.md)
