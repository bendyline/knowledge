---
title: "GenerateDatabaseUpgradeScript method (WMI MSReportServer_ConfigurationSetting)"
description: "GenerateDatabaseUpgradeScript method (WMI MSReportServer_ConfigurationSetting)"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: upgrade-and-migration-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "GenerateDatabaseUpgradeScript method"
apilocation: "reportingservices.mof"
apiname: "GenerateDatabaseUpgradeScript (WMI MSReportServer_ConfigurationSetting Class)"
apitype: MOFDef
---
# ConfigurationSetting method - GenerateDatabaseUpgradeScript
  Generates a script that can be used to upgrade the report server database to the  SQL Server 2008 (10.0.x) 
 schema.  
  
## Syntax  
  
```vb  
Public Sub GenerateDatabaseUpgradeScript(DatabaseName as String, _  
    ServerVersion as String, ByRef Script as String, _  
    ByRef HRESULT as Int32)  
```  
  
```csharp  
public void GenerateDatabaseUpgradeScript (string DatabaseName,   
    string ServerVersion, out string Script,   
    out Int32 HRESULT);  
```  
  
## Parameters  
 *Databasename*  
 A string containing the name of the report server database to upgrade.  
  
 *ServerVersion*  
 A string containing the version of the report server.  
  
 *Script*  
 [out] A string containing the generated SQL script.  
  
 *HRESULT*  
 [out] Value indicating whether the call succeeded or failed.  
  
## Return value  
 Returns an *HRESULT* indicating success or failure of the method call. A value of 0 indicates that the method call was successful. A nonzero value indicates that an error occurred.  
  
## Remarks  
 The generated script supports  SQL Server 2000 (8.x) 
,  SQL Server 2005 (9.x) 
, and  SQL Server 2008 (10.0.x) 
.  
  
## Requirements  
 **Namespace:**    **root\Microsoft\SqlServer\ReportServer\\<*InstanceName*>\v13\Admin**  
  
  
## Related content

- [MSReportServer_ConfigurationSetting members](msreportserver-configurationsetting-members.md)
