---
title: "ListInstalledSharePointVersions method (WMI)"
description: "ConfigurationSetting method - ListInstalledSharePointVersions"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "ListInstalledSharePointVersions method"
---
# ConfigurationSetting method - ListInstalledSharePointVersions
  Returns a set of tokens that represent the versions of Microsoft  Windows SharePoint Services 
,  Office SharePoint Server  
,  SharePoint Foundation 2010 
, or  SharePoint Server 2010 
. The tokens indicate installations on the same computer as the report server.  
  
## Syntax  
  
```vb  
Public Sub ListInstalledSharePointVersions(ByRef VersionTokens() _  
    As String, ByRef Length As Int32, ByRef HRESULT As Int32)  
```  
  
```csharp  
public void ListReportServersInDatabase (out string[] VersionTokens,   
    out Int32 Length, out Int32 HRESULT);  
```  
  
## Parameters  
 *VersionTokens[]*  
 [out] An array that contains the tokens that represent the version of a SharePoint product or technology that is compatible with the installed report server.  
  
 *Length*  
 [out] The length of the version tokens array.  
  
 *HRESULT*  
 [out] Value indicating whether the call succeeded or failed.  
  
## Return value  
 Returns an *HRESULT* indicating success or failure of the method call. A value of 0 indicates that the method call was successful. A nonzero value indicates that an error occurred.  
  
## Remarks  
 Each token that is returned represents a version of  Windows SharePoint Services 
 or  SharePoint Foundation 2010 
 that is compatible with the currently installed report server. If a particular version of SharePoint is compatible with previous SharePoint versions, tokens for each compatible SharePoint version are returned.  
  
 The following table shows the SharePoint tokens that are returned.  
  
| **Version Tokens** | **Description** |
| --- | --- |
| WSS_V2_Compatible | A  Windows SharePoint Services |
| ,  Windows SharePoint Services |
| ,  Office SharePoint Server |
| ,  SharePoint Foundation 2010 |
| , or  SharePoint Server 2010 |
 | installation is installed that is compatible with  Windows SharePoint Services |
 | 2.0. |
| WSS_V3_Compatible | A  Windows SharePoint Services |
| ,  Windows SharePoint Services |
| ,  Office SharePoint Server |
| ,  SharePoint Foundation 2010 |
| , or  SharePoint Server 2010 |
 | installation is installed that is compatible with  Windows SharePoint Services |
 | 3.0. |
| WSS_V4_Compatible | A  SharePoint Foundation 2010 |
 | or  SharePoint Server 2010 |
 | installation is installed that is compatible with Office 14. |
  
## Requirements  
 **Namespace:**    **root\Microsoft\SqlServer\ReportServer\\<*InstanceName*>\v13\Admin**  
  
  
## Related content

- [MSReportServer_ConfigurationSetting members](msreportserver-configurationsetting-members.md)
