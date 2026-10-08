---
title: "MSReportServer_ConfigurationSetting methods"
description: "MSReportServer_ConfigurationSetting methods"
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
apiname: "MSReportServer_ConfigurationSetting Methods"
apitype: MOFDef
---
# MSReportServer_ConfigurationSetting methods
  The *MSReportServer_ConfigurationSetting* class of the Report Server WMI Provider provides the following public methods.  
  
## Public methods  
  
| Method | Description |
| --- | --- |
| [BackupEncryptionKey](configurationsetting-method-backupencryptionkey.md) | Backs up the encryption key for the instance. The encryption key is stored encrypted with a password. |
| [CreateSSLCertificateBinding method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-createsslcertificatebinding.md) | Creates a TLS/SSL certificate binding. |
| [DeleteEncryptedInformation](configurationsetting-method-deleteencryptedinformation.md) | Deletes the encrypted information from the report server database. |
| [DeleteEncryptionKey](configurationsetting-method-deleteencryptionkey.md) | Deletes the encryption keys from the report server database. |
| [GenerateDatabaseCreationScript](configurationsetting-method-generatedatabasecreationscript.md) | Generates a SQL script that can be used to create the report server database. |
| [GenerateDatabaseRightsScript](configurationsetting-method-generatedatabaserightsscript.md) | Generates a SQL script that can be used to grant a user access to the report server database. |
| [GenerateDatabaseUpgradeScript](configurationsetting-method-generatedatabaseupgradescript.md) | Generates a SQL script that can be used to upgrade a report server database. |
| [GetAdminSiteUrl method (WMI)](configurationsetting-method-getadminsiteurl.md) | Gets the absolute URL to the Central Administration web site. |
| [GetDatabaseVersionDisplayName](configurationsetting-method-getdatabaseversiondisplayname.md) | Gets the display name for a given report server database version string. |
| [InitializeReportServer](configurationsetting-method-initializereportserver.md) | Initializes the specified report server instance. |
| [ListInstalledSharePointVersions method (WMI)](configurationsetting-method-listinstalledsharepointversions.md) | Returns a set of tokens that represent the versions of Microsoft  Windows SharePoint Services |
  | Office SharePoint Server |
| ,  SharePoint Foundation 2010 |
| , or  SharePoint Server 2010 |
 | that are installed on the same computer as the report server. |
| [ListIPAddresses method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-listipaddresses.md) | Lists IP addresses for the computer. |
| [ListReportServersInDatabase](configurationsetting-method-listreportserversindatabase.md) | Returns a list of report server installations that are present in the report server database, regardless of whether those installations have access to secure information. |
| [ListReservedURLs method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-listreservedurls.md) | Lists URLs reserved for all applications on the report server. |
| [ListSSLCertificateBindings method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-listsslcertificatebindings.md) | Lists TLS/SSL certificate bindings that exist in `HTTP.SYS` and those bindings expected from `RSReportServer.config`. |
| [ListSSLCertificates method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-listsslcertificates.md) | Lists installed TLS/SSL certificates on the computer. |
| [ReencryptSecureInformation](configurationsetting-method-reencryptsecureinformation.md) | Generates a new encryption key and re-encrypts all secure information in the report server database using this new key. |
| [RemoveSSLCertificateBindings method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-removesslcertificatebinding.md) | Remove a TLS/SSL certificate binding. |
| [RemoveUnattendedExecutionAccount](configurationsetting-method-removeunattendedexecutionaccount.md) | Deletes the unattended execution account entry from the report server configuration. |
| [RemoveURL method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-removeurl.md) | Removes a URL reserved for the report server. |
| [ReserveURL method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-reserveurl.md) | Adds a URL reservation for a given application. |
| [RestoreEncryptionKey](configurationsetting-method-restoreencryptionkey.md) | Reapplies the specified encryption key to the report server database. |
| [SetDatabaseConnection](configurationsetting-method-setdatabaseconnection.md) | Sets the report server database connection to a particular report server database. |
| [SetDatabaseLogonTimeout](configurationsetting-method-setdatabaselogontimeout.md) | Specifies the default time-out value for report server database sign in attempts. |
| [SetDatabaseQueryTimeout](configurationsetting-method-setdatabasequerytimeout.md) | Specifies the default time-out value for report server database queries. |
| [SetEmailConfiguration](configurationsetting-method-setemailconfiguration.md) | Configures the email delivery extension used by the report server to send email. |
| [SetSecureConnectionLevel](configurationsetting-method-setsecureconnectionlevel.md) | Sets the secure connection level of the report server. |
| [SetServiceState](configurationsetting-method-setservicestate.md) | Turns the Report Server service on and off. |
| [SetUnattendedExecutionAccount](configurationsetting-method-setunattendedexecutionaccount.md) | Specifies the account used to run reports unattended. |
| [SetVirtualDirectory method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-setvirtualdirectory.md) | Sets the virtual directory for an application. |
| [SetWindowsServiceIdentity](configurationsetting-method-setwindowsserviceidentity.md) | Makes the Report Server service run as the specified Windows user, and grants this account sufficient permission to allow the report server to operate. |
  
## Related content

- [MSReportServer_ConfigurationSetting class](msreportserver-configurationsetting-class.md)
