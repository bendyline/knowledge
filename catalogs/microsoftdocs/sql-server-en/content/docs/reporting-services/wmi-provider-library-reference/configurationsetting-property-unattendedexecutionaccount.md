---
title: "UnattendedExecutionAccount property (WMI MSReportServer_ConfigurationSetting)"
description: "UnattendedExecutionAccount property (WMI MSReportServer_ConfigurationSetting)"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "UnattendedExecutionAccount property"
apilocation: "reportingservices.mof"
apiname: "UnattendedExecutionAccount"
apitype: MOFDef
---
# ConfigurationSetting property - UnattendedExecutionAccount
  Returns the user account that the report server impersonates when running reports unattended. Read-only.  
  
## Syntax  
  
```vb  
Public Dim UnattendedExecutionAccount As String  
```  
  
```csharp  
public string UnattendedExecutionAccount;  
```  
  
## Property values  
 A **String** object that represents the account name.  
  
## Example code  
 [MSReportServer_ConfigurationSetting class](msreportserver-configurationsetting-class.md)  
  
## Requirements  
 **Namespace:**    **root\Microsoft\SqlServer\ReportServer\\<*InstanceName*>\v13\Admin**  
  
  
## Related content

- [MSReportServer_ConfigurationSetting members](msreportserver-configurationsetting-members.md)
