---
title: "GetReportServerUrls method (WMI MSReportServer_Instance)"
description: "GetReportServerUrls method (WMI MSReportServer_Instance)"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "GetReportServerUrls method"
---
# MSReportServer_Instance methods - GetReportServerUrls
  Returns a list of URLs users can use to access the report server and the  web portal 
.  
  
## Syntax  
  
```vb  
Public Sub GetReportServerUrls (ByRef ApplicationName() As String, ByRef URLs()_  
    As String, ByRef Length As Int32, ByRef HRESULT As Int32)  
```  
  
```csharp  
public void GetReportServerUrls(out string[] applicationName,   
    out string[] URLs, out int length, out int HRESULT);  
```  
  
## Parameters  
 *ApplicationName[]*  
 An array that contains the applications that are installed. Values are either **ReportServerWebService** or **ReportServerWebApp**.  
  
 *URLs[]*  
 An array that contains the successfully registered Urls.  
  
 *Length*  
 An integer value that contains the length of the arrays returned.  
  
 *HRESULT*  
 A value that indicates success or an error code.  
  
## Return values  
  
## Remarks  
 Methods exposed by WMI management objects are called through the *InvokeMethod* function. For more information, please see **Executing Methods on Management Objects** in the  Microsoft 
 .NET Framework WMI documentation.  
  
## Requirements  
 **Namespace:**  **root\Microsoft\SqlServer\ReportServer\\<*InstanceName*>\v13** 
  
  
## Related content

- [MSReportServer_ConfigurationSetting members](msreportserver-configurationsetting-members.md)
