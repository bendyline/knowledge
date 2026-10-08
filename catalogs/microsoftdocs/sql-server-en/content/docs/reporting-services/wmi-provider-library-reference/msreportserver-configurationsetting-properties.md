---
title: "MSReportServer_ConfigurationSetting properties"
description: "MSReportServer_ConfigurationSetting properties"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: wmi-provider-library-reference
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "WMI provider [Reporting Services], MSReportServer_ConfigurationSetting class"
  - "MSReportServer_ConfigurationSetting class"
apilocation: "reportingservices.mof"
apiname: "MSReportServer_ConfigurationSetting Properties"
apitype: MOFDef
---
# MSReportServer_ConfigurationSetting properties
  The *MSReportServer_ConfigurationSetting* class represents the installation and runtime parameters of a report server instance. These settings are stored in the `RSReportServer.config` configuration file.  
  
## Public properties  
  
| Property | Description |
| --- | --- |
| [ConnectionPoolSize](configurationsetting-property-connectionpoolsize.md) | Returns the connection pool size used by the report server to communicate with the  SQL Server |
  | Database Engine |
 | instance that hosts the report server database. Read-only. |
| [DatabaseLogonAccount](configurationsetting-property-databaselogonaccount.md) | Specifies the sign in account used by the report server to connect to the  SQL Server |
  | Database Engine |
 | instance that hosts the report server database. Read-only. |
| [DatabaseLogonTimeout](configurationsetting-property-databaselogontimeout.md) | Specifies the number of seconds to wait before an attempt to sign in to the report server database fails. Read-only. |
| [DatabaseLogonType](configurationsetting-property-databaselogontype.md) | Specifies whether the report server uses a Windows service account, a Windows user account, or a  SQL Server |
 | sign in to access the report server database. Read-only. |
| [DatabaseName](configurationsetting-property-databasename.md) | Specifies the name of the  SQL Server |
 | instance that hosts the report server database. |
| [DatabaseQueryTimeout](configurationsetting-property-databasequerytimeout.md) | Specifies the number of seconds that must elapse before the command fails or times out. The report server is timing the process against the SQL Server catalog, not a data source for the report. |
| [DatabaseServerName](configurationsetting-property-databaseservername.md) | Specifies the name of the server on which the report server database is installed. |
| [InstallationID Property](configurationsetting-property-installationid.md) | Returns a unique identifier for a specific report server instance. |
| [InstanceName](configurationsetting-property-instancename.md) | Specifies the name of a report server instance on a specific computer. |
| [IsInitialized](configurationsetting-property-isinitialized.md) | Indicates whether the report server instance is initialized.  Read-only. |
| [IsSharePointIntegrated](configurationsetting-property-issharepointintegrated.md) | Indicates whether the report server is configured for SharePoint integrated mode. |
| [IsWebServiceEnabled](configurationsetting-property-iswebserviceenabled.md) | Indicates whether the Report Server Web service is enabled. Read-only. |
| [IsWindowsServiceEnabled](configurationsetting-property-iswindowsserviceenabled.md) | Indicates whether the Report Server Windows service is enabled. Read-only. |
| [MachineAccountIdentity Property (WMI)](configurationsetting-property-machineaccountidentity.md) | Gets the machine account identity of the computer that the report server is installed on. |
| [PathName](configurationsetting-property-pathname.md) | Specifies the installation path to a report server instance. |
| [SecureConnectionLevel](configurationsetting-property-secureconnectionlevel.md) | Returns the secure connection level specified in the RSReportServer.config file. |
| [SenderEmailAddress](configurationsetting-property-senderemailaddress.md) | Gets the address used to send email from the report server. Read-only. |
| [SendUsingSMTPServer](configurationsetting-property-sendusingsmtpserver.md) | Specifies whether the *SendUsing* property in the email configuration is set to **TRUE**. |
| [SMTPServer](configurationsetting-property-smtpserver.md) | Gets the *SMTPServer* property from the `RSReportServer.config` file. Read-only. |
| [UnattendedExecutionAccount](configurationsetting-property-unattendedexecutionaccount.md) | Specifies the sign in user account that the report server impersonates when running reports unattended. Read-only. |
| [Version](configurationsetting-property-version.md) | Returns the version of the report server. |
| [VirtualDirectoryReportManager Property (WMI MSReportServer_ConfigurationSetting)](configurationsetting-property-virtualdirectoryreportmanager.md) | Returns the virtual directory for the report manager application. |
| [VirtualDirectoryReportServer Property (WMI MSReportServer_ConfigurationSetting)](configurationsetting-property-virtualdirectoryreportserver.md) | Returns the Virtual directory for the report server web service application. |
| [WindowsServiceIdentityActual](configurationsetting-property-windowsserviceidentityactual.md) | Returns the identity that the Report Server Windows service is actually running under. Read-only. |
| [WindowsServiceIdentityConfigured](windowsserviceidentityconfigured-property.md) | Returns the identity that the Report Server Windows service was last configured to run under. Read-only. |
  
## Related content

- [MSReportServer_ConfigurationSetting members](msreportserver-configurationsetting-members.md)
