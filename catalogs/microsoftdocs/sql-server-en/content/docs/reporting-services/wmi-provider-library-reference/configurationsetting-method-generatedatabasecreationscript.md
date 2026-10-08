---
title: "ConfigurationSetting method - GenerateDatabaseCreationScript"
description: "ConfigurationSetting method - GenerateDatabaseCreationScript"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "GenerateDatabaseCreationScript method"
apilocation: "reportingservices.mof"
apiname: "GenerateDatabaseCreationScript (WMI MSReportServer_ConfigurationSetting Class)"
apitype: MOFDef
---
# ConfigurationSetting method - GenerateDatabaseCreationScript
  Generates a SQL script that can be used to create a report server database.  
  
## Syntax  
  
```vb  
Public Sub GenerateDatabaseCreationScript(ByVal DatabaseName As String, _  
    ByVal Lcid As Int32, ByVal IsSharePointMode As Boolean, ByRef Script As String, _  
    ByRef HRESULT As Int32)  
```  
  
```csharp  
public void GenerateDatabaseCreationScript(string DatabaseName, Int32 Lcid,   
    Boolean IsSharePointMode, out string Script, out Int32 HRESULT);  
```  
  
## Parameters  
 *Databasename*  
 A string containing the name of the report server database to create.  
  
 *Lcid*  
 Value used for localization of role names.  
  
 *IsSharePointMode*  
 Indicates whether to create database in native mode or SharePoint mode.  
  
> **Important:**  
>  Beginning in  SQL Server 2012 (11.x) 
, *IsSharePointMode*=**True** is not supported because in SharePoint mode,  Reporting Services 
 is a SharePoint shared service and is not controlled by the WMI provider. You should always set this parameter to **False**.  
  
 *Script*  
 [out] A string containing the generated SQL script.  
  
 *HRESULT*  
 [out] Value indicating whether the call succeeded or failed.  
  
## Return value  
 Returns an *HRESULT* indicating success or failure of the method call. A value of 0 indicates that the method call was successful. A nonzero value indicates that an error occurred.  
  
## Remarks  
 This method generates a SQL script that creates report server databases for the version of the report server currently connected to.  
  
 The value supplied in the *DatabaseName* parameter must conform to  SQL Server 
 database naming conventions.  
  
 The method doesn't check the existence of the database when generating the script.  
  
 This method doesn't check for the existence of the report server database when generating the script.  
  
 The generated script supports  SQL Server 2000 (8.x) 
,  SQL Server 
 2005, and  SQL Server 2008 (10.0.x) 
.  
  
## Requirements  
 **Namespace:**    **root\Microsoft\SqlServer\ReportServer\\<*InstanceName*>\v13\Admin**  
  
  
## Related content

- [MSReportServer_ConfigurationSetting members](msreportserver-configurationsetting-members.md)
