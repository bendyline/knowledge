---
title: "MSReportServer_ConfigurationSetting members"
description: "MSReportServer_ConfigurationSetting members"
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
apiname: "MSReportServer_ConfigurationSetting Members"
apitype: MOFDef
---
# MSReportServer_ConfigurationSetting members
  The *MSReportServer_ConfigurationSetting* class contains the following properties and methods.  
  
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
| [DatabaseQueryTimeout](configurationsetting-property-databasequerytimeout.md) | Specifies the number of seconds that must elapse before the command fails or times out. The report server is timing the process against the report server database, not a data source for the report. |
| [DatabaseServerName](configurationsetting-property-databaseservername.md) | Specifies the name of the server on which the report server database is installed. |
| [InstallationID Property](configurationsetting-property-installationid.md) | Returns a unique identifier for a specific report server instance. |
| [InstanceName](configurationsetting-property-instancename.md) | Specifies the name of a report server instance on a specific computer. |
| [IsInitialized](configurationsetting-property-isinitialized.md) | Indicates whether the report server instance is initialized. Read-only. |
| [IsSharePointIntegrated](configurationsetting-property-issharepointintegrated.md) | Indicates whether the report server is configured for SharePoint integrated mode. |
| [IsWebServiceEnabled](configurationsetting-property-iswebserviceenabled.md) | Indicates whether the Report Server Web service is enabled. Read-only. |
| [IsWindowsServiceEnabled](configurationsetting-property-iswindowsserviceenabled.md) | Indicates whether the Report Server Windows service is enabled. Read-only. |
| [MachineAccountIdentity Property (WMI)](configurationsetting-property-machineaccountidentity.md) | Gets the machine account identity of the computer that the report server is installed on. |
| [PathName](configurationsetting-property-pathname.md) | Specifies the installation path to a report server instance. |
| [SecureConnectionLevel](configurationsetting-property-secureconnectionlevel.md) | Returns the secure connection level specified in the RSReportServer.config file. |
| [SenderEmailAddress](configurationsetting-property-senderemailaddress.md) | Gets the address used to send email from the report server. Read-only. |
| [SendUsingSMTPServer](configurationsetting-property-sendusingsmtpserver.md) | Specifies whether the SendUsing property in the email configuration is set to TRUE. |
| [SMTPServer](configurationsetting-property-smtpserver.md) | Gets the SMTP server property from the RSReportServer.config file. Read-only. |
| [UnattendedExecutionAccount](configurationsetting-property-unattendedexecutionaccount.md) | Specifies the sign in user account that the report server impersonates when running reports unattended. Read-only. |
| [Version](configurationsetting-property-version.md) | Returns the version of the report server. |
| [VirtualDirectoryReportManager Property (WMI MSReportServer_ConfigurationSetting)](configurationsetting-property-virtualdirectoryreportmanager.md) | Returns the virtual directory for the report manager application |
| [VirtualDirectoryReportServer Property (WMI MSReportServer_ConfigurationSetting)](configurationsetting-property-virtualdirectoryreportserver.md) | Returns the Virtual directory for the report server web service application. |
| [WindowsServiceIdentityActual](configurationsetting-property-windowsserviceidentityactual.md) | Returns the identity that the Report Server Windows service is actually running under. Read-only. |
| [WindowsServiceIdentityConfigured](windowsserviceidentityconfigured-property.md) | Returns the identity that the Report Server Windows service was last configured to run under. Read-only. |
  
## Public methods  

| Method | Description |
| --- | --- |
| [BackupEncryptionKey](configurationsetting-method-backupencryptionkey.md) | Backs up the encryption key for the instance. The encryption key is stored encrypted with a password. |
| [CreateSSLCertificateBinding Method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-createsslcertificatebinding.md) | Creates a TLS/SSL Certificate binding. |
| [DeleteEncryptedInformation](configurationsetting-method-deleteencryptedinformation.md) | Deletes the encrypted information from the report server database. |
| [DeleteEncryptionKey](configurationsetting-method-deleteencryptionkey.md) | Deletes the encryption keys from the report server database. |
| [GenerateDatabaseCreationScript](configurationsetting-method-generatedatabasecreationscript.md) | Generates a SQL script that can be used to create the report server database. |
| [GenerateDatabaseRightsScript](configurationsetting-method-generatedatabaserightsscript.md) | Generates a SQL script that can be used to grant a user permission to access the report server database. |
| [GenerateDatabaseUpgradeScript](configurationsetting-method-generatedatabaseupgradescript.md) | Generates a SQL script that can be used to upgrade a report server database. |
| [GetAdminSiteUrl Method (WMI)](configurationsetting-method-getadminsiteurl.md) | Gets the absolute URL to the Central Administration Web site. |
| [GetDatabaseVersionDisplayName](configurationsetting-method-getdatabaseversiondisplayname.md) | Gets the display name for a given report server database version string. |
| [InitializeReportServer](configurationsetting-method-initializereportserver.md) | Initializes the specified report server instance. |
| [ListInstalledSharePointVersions Method (WMI)](configurationsetting-method-listinstalledsharepointversions.md) | Returns a set of tokens that represent the versions of  Windows SharePoint Services |
  | Office SharePoint Server |
| ,  SharePoint Foundation 2010 |
| , or  SharePoint Server 2010 |
 | that are installed on the same computer as the report server. |
| [ListIPAddresses Method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-listipaddresses.md) | Lists IP addresses for the computer. |
| [ListReportServersInDatabase](configurationsetting-method-listreportserversindatabase.md) | Returns a list of report server installations that are present in the report server database, regardless of whether those installations have access to secure information. |
| [ListReservedURLs Method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-listreservedurls.md) | Lists URLs reserved for all applications on the report server. |
| [ListSSLCertificateBindings Method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-listsslcertificatebindings.md) | Lists TLS/SSL certificate bindings that exist in `HTTP.SYS` and those bindings expected from `rsreportserver.config`. |
| [ListSSLCertificates Method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-listsslcertificates.md) | Lists installed TLS/SSL certificates on the computer. |
| [ReencryptSecureInformation](configurationsetting-method-reencryptsecureinformation.md) | Generates a new encryption key and re-encrypts all secure information in the report server database using this new key. |
| [RemoveSSLCertificateBindings Method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-removesslcertificatebinding.md) | Remove a TLS/SSL certificate binding. |
| [RemoveUnattendedExecutionAccount](configurationsetting-method-removeunattendedexecutionaccount.md) | Deletes the unattended execution account entry from the report server configuration. |
| [RemoveURL Method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-removeurl.md) | Removes a URL reserved for the report server. |
| [ReserveURL Method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-reserveurl.md) | Adds a URL reservation for a given application. |
| [RestoreEncryptionKey](configurationsetting-method-restoreencryptionkey.md) | Reapplies the specified encryption key to the report server database. |
| [SetDatabaseConnection](configurationsetting-method-setdatabaseconnection.md) | Sets the report server database connection to a particular report server database. |
| [SetDatabaseLogonTimeout](configurationsetting-method-setdatabaselogontimeout.md) | Specifies the default time-out value for report server database sign in attempts. |
| [SetDatabaseQueryTimeout](configurationsetting-method-setdatabasequerytimeout.md) | Specifies the default time-out value for report server database connections. |
| [SetEmailConfiguration](configurationsetting-method-setemailconfiguration.md) | Configures the email delivery extension used by the report server to send email. |
| [SetSecureConnectionLevel](configurationsetting-method-setsecureconnectionlevel.md) | Sets the secure connection level of the report server. |
| [SetServiceState](configurationsetting-method-setservicestate.md) | Turns the Report Server Windows and Web services on and off. |
| [SetUnattendedExecutionAccount](configurationsetting-method-setunattendedexecutionaccount.md) | Specifies the account used to run reports unattended. |
| [SetVirtualDirectory Method (WMI MSReportServer_ConfigurationSetting)](configurationsetting-method-setvirtualdirectory.md) | Sets the virtual directory for an application. |
| [SetWindowsServiceIdentity](configurationsetting-method-setwindowsserviceidentity.md) | Makes the Report Server Windows service run as the specified Windows user, and grants this account sufficient permission to allow the report server to operate. |
  
## Related content

- [MSReportServer_ConfigurationSetting class](msreportserver-configurationsetting-class.md)
