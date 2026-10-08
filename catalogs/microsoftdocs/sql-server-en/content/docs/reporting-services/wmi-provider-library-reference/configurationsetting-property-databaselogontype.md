---
title: "DatabaseLogonType property (WMI MSReportServer_ConfigurationSetting)"
description: "DatabaseLogonType property (WMI MSReportServer_ConfigurationSetting)"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "DatabaseLogonType property"
apilocation: "reportingservices.mof"
apiname: "DatabaseLogonType"
apitype: MOFDef
---
# ConfigurationSetting property - DatabaseLogonType
  Read-only. Specifies whether the report server uses:
  - A  Microsoft 
 Windows service account
  - A Windows user account
  - A  SQL Server 
 sign in to access the report server database.  
  
## Syntax  
  
```vb  
Public Dim DatabaseLogonType As Integer  
```  
  
```csharp  
public int DatabaseLogonType;  
```  
  
## Property values  
 An **integer** object that represents the sign in type.  
  
## Example code  
 [MSReportServer_ConfigurationSetting class](msreportserver-configurationsetting-class.md)  
  
## Remarks  
 Values are:  
  
-   0 for Windows sign in  
  
-   1 for  SQL Server 
 sign in  
  
-   2 to sign in as a service  
  
 If you specify 0 (Windows), you must set the value in the [DatabaseLogonAccount](configurationsetting-property-databaselogonaccount.md) property to a corresponding a valid Windows user account.  
  
 If you specify **1** (SQL Server), make sure the value of the [DatabaseLogonAccount](configurationsetting-property-databaselogonaccount.md) corresponds to a valid  SQL Server 
 sign in.  
  
 If you specify **2** (Windows service), the report server uses an  ASP.NET 
 account and the Windows service account to access the report server database. The *DatabaseLogonAccount* property is ignored.  
  
## Requirements  
 **Namespace:**    **root\Microsoft\SqlServer\ReportServer\\<*InstanceName*>\v13\Admin**  
  
  
## Related content

- [MSReportServer_ConfigurationSetting members](msreportserver-configurationsetting-members.md)
