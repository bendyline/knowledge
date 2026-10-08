---
title: "Migrate a Reporting Services Installation (Native Mode)"
description: Learn how to migrate a supported version of Reporting Services Installation native mode deployment to a new SQL Server Reporting Services instance.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server
ms.topic: upgrade-and-migration-article
ms.custom:
  - intro-migration
  - updatefrequency5
# customer intent: As an SSRS user, I want to migrate Reporting Services Installation (native mode) to a new SSRS instance so that I can increase the scale and productivity of my work.
---

# Migrate a Reporting Services Installation (Native Mode)

This article provides step-by-step instructions for how to migrate one of the following supported versions of a  Reporting Services 
 native mode deployment to a new SQL Server Reporting Services instance:  
  
**Applies to: \>=sql-server-2017**
-  SQL Server 2016 (13.x) 


-  SQL Server 2014 (12.x)
  
  
-  SQL Server 2012 (11.x) 
  
  
-  SQL Server 2008 R2 (10.50.x) 
  
  
-  SQL Server 2008 (10.0.x) 



Migration is defined as moving application data files to a new SQL Server instance. The following are common reasons you must migrate your installation:  
  
- You have a large-scale deployment or uptime requirements.  
  
- You change the hardware or topology of your installation.  
  
- You encounter an issue that blocks upgrade.

## <a name="bkmk_nativemode_migration_overview"></a> Native mode migration overview

 The migration process for  Reporting Services 
 includes manual and automated steps. The following tasks are part of a report server migration:  
  
- Back up database, application, and configuration files.  
  
- Back up the encryption key.  
  
- Install a new instance of SQL Server. If you use the same hardware, you can install SQL Server side by side with your existing installation if it was one of the supported versions.  
  
    > **Tip:**  
    > A side-by-side installation may require that you install SQL Server as a named instance.
  
- Move the report server database and other application files from your existing installation to your new SQL Server installation.  
  
- Move any custom application files to the new installation.  
  
- Configure the report server.  
  
- Edit **RSReportServer.config** to include any custom settings from your previous installation.  
  
- Optionally, configure custom Access Control Lists (ACLs) for the new  Reporting Services 
 Windows service group.  
  
- Remove unused applications and tools after you confirm that the new instance is fully operational.  
  
There are restrictions on the editions of  SQL Server 
 that host the report server database. Review the following article if you reuse a report server database that was created in a previous installation.  
  
- [Create a report server database, Report Server Configuration Manager](ssrs-report-server-create-a-report-server-database.md)  
  
## <a name="bkmk_fixed_database_name"></a> Fixed database name

You can't rename the report server database. The identity of the database is recorded in report server stored procedures when the database is created. Renaming either the report server primary or temporary databases cause errors when the procedures run, invalidating your report server installation.  
  
If the database name from the existing installation isn't suited for the new installation, you should consider creating a new database that has the name, and then load existing application data by using the techniques in the following list:  
  
- Write a  Visual Basic  script that calls Report Server Web service SOAP methods to copy data between databases. You can use the RS.exe utility to run the script. For more information about this approach, see [Scripting and PowerShell with Reporting Services](../tools/scripting-and-powershell-with-reporting-services.md).  
  
- Write code that calls the Windows Management Instrumentation (WMI) provider to copy data between databases. For more information about this approach, see [Access the Reporting Services WMI Provider](../tools/access-the-reporting-services-wmi-provider.md).  
  
- If you have just a few items, you can republish reports and shared data sources from Report Designer, Model Designer, and Report Builder to the new report server. Recreate the role assignments, subscriptions, shared schedules, report snapshot schedules, custom properties that you set on reports. You can also recreate them on other items, model item security, and properties that you set on the report server. Be prepared to lose report history and report execution log data if you follow these actions.
  
## <a name="bkmk_before_you_start"></a> Before you start

Even when you migrate rather than upgrade the installation, consider running Upgrade Advisor on your existing installation to help identify any issues that could affect migration. This step is especially helpful if you migrate a report server that you didn't install or configure. By running Upgrade Advisor, you can learn about custom settings that might not be supported in a new SQL Server installation.  
  
In addition, you should be aware of several important changes in SQL Server Reporting Services that affect how you migrate your installation:

- The  web portal 
 replaced Report Manager.
  
- For  SQL Server 2008 (10.0.x) 
 and newer versions, IIS is no longer a prerequisite. If you migrate a report server installation to a new computer, you don't need to add the Web server role. In addition, steps for configuring URLs and authentication are different from the previous release, as are techniques and tools for diagnosing and troubleshooting problems.  
  
- Report Server Web service, the  web portal 
, and the Report Server Windows service run under the same account. All three applications read configuration settings from RSReportServer.config file.
  
- The  web portal 
 and SQL Server Management Studio are designed to remove overlapping features. Each tool supports a distinct set of tasks.
  
- ISAPI filters aren't supported in  SQL Server 2008 (10.0.x) 
  Reporting Services 
 and later versions. If you use ISAPI filters, you must redesign your reporting solution before migration.  
  
- IP address restrictions aren't supported in  SQL Server 2008 (10.0.x) 
  Reporting Services 
 and later versions. If you use IP address restrictions, you must redesign your reporting solution prior to migration or use a technology such as a firewall, router, or Network Address Translation (NAT) to configure addresses that are restricted from accessing the report server.  
  
- Client Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), certificates aren't supported in  SQL Server 2008 (10.0.x) 
  Reporting Services 
 and later versions. If you use client TLS certificates, you must redesign your reporting solution before migration.  
  
- If you use an authentication type other than Windows-Integrated authentication, you must update the `<AuthenticationTypes>` element in the **RSReportServer.config** file with a supported authentication type. The supported authentication types are NTLM, Kerberos, Negotiate, and Basic. Anonymous, .NET Passport, and Digest authentication aren't supported in  SQL Server 2008 (10.0.x) 
  Reporting Services 
 and later versions.  
  
- If you use custom cascading style sheets in your reporting environment, they can't be migrated. Manually move them following migration.
  
For more information about changes in SQL Server Reporting Services, see the Upgrade Advisor documentation and [What's new in SQL Server Reporting Services (SSRS)](../what-s-new-in-sql-server-reporting-services-ssrs.md).  

## <a name="bkmk_backup"></a> Backup files and data

 Before you install a new instance of  Reporting Services 
, be sure to back up all of the files in your current installation.  
  
1. Back up the encryption key for the report server database. This step is critical to migration success. Further on in the migration process, you must restore it for the report server to regain access to encrypted data. To back up the key, use the Report Server Configuration Manager.  
  
1. Back up the report server database by using any of the supported methods for backing up a  SQL Server 
 database. For more information, see the instructions on how to back up the report server database in [Moving report server databases to another computer (SSRS native mode)](../report-server/moving-the-report-server-databases-to-another-computer-ssrs-native-mode.md).  
  
1. Back up the report server configuration files. Files to back up include:  
  
    1. Rsreportserver.config  
  
    1. Rswebapplication.config  
  
    1. Rssrvpolicy.config  
  
    1. Rsmgrpolicy.config  
  
    1. Reportingservicesservice.exe.config  
  
    1. Web.config for the Report Server  ASP.NET 
 application.  
  
    1. Machine.config for  ASP.NET 
 if you modified it for report server operations.  

## <a name="bkmk_install_ssrs"></a> Install SQL Server Reporting Services

Install a new report server instance in files-only mode so that you can configure it to use nondefault values. For command-line installation, use the **FilesOnly** argument. In the Installation Wizard, select the **Install but do not configure option**.  
  
Select one of the following links to view instructions on how to install a new instance of  Reporting Services 
:  
  
- [Install Reporting Services 2016 native mode report server](install-reporting-services-native-mode-report-server.md) 
  
- [Install and configure SQL Server on Windows from the command prompt](../../database-engine/install-windows/install-sql-server-from-the-command-prompt.md)  

- [Install and configure SQL Server Reporting Services](install-reporting-services.md)

## <a name="bkmk_move_database"></a> Move the report server database

The report server database contains published reports, models, shared data sources, schedules, resources, subscriptions, and folders. It also contains system and item properties, and permissions for accessing report server content.  
  
If your migration includes a different  Database Engine 
 instance, you must move the report server database to the new  Database Engine 
 instance. If you use the same  Database Engine 
 instance, skip to section [Move Custom Assemblies or Extensions](#bkmk_move_custom).  
  
To move the report server database, follow these steps:
  
1. Choose the  Database Engine 
 instance to use. SQL Server Reporting Services requires that you use one of the following versions to host the report server database:  
  
    **Applies to: \=sql-server-2017**
    -  SQL Server 2016 (13.x) 


    -  SQL Server 2014 (12.x)
  
  
    -  SQL Server 2012 (11.x) 
  
  
    -  SQL Server 2008 R2 (10.50.x) 
  
  
    -  SQL Server 2008 (10.0.x) 



1. Start  SQL Server Management Studio 
 and connect to the  Database Engine 
.  
  
1. Create the **RSExecRole** in the system databases if the  Database Engine 
 has never hosted a report server database. For more information, see [Create the RSExecRole](../security/create-the-rsexecrole.md).  
  
1. Follow the instructions in [Moving the Report Server Databases to Another Computer (SSRS Native Mode)](../report-server/moving-the-report-server-databases-to-another-computer-ssrs-native-mode.md).  
  
Remember that both the report server database and the temporary database are interdependent and must be moved together. Don't copy the databases; copying doesn't transfer all of the security settings to the new installation. Don't move SQL Server Agent jobs for scheduled report server operations. The report server recreates these jobs automatically.  

## <a name="bkmk_move_custom"></a> Move custom assemblies or extensions

If your installation includes custom report items, assemblies, or extensions, you must redeploy the custom components. If you don't use custom components, skip to section [Configure the Report Server](#bkmk_configure_reportserver).  
  
 To redeploy the custom components, follow these steps:  
  
1. Determine whether the assemblies are supported or need recompilation:

    - Custom security extensions must be rewritten by using the [IAuthenticationExtension2](https://learn.microsoft.com/dotnet/api/microsoft.reportingservices.interfaces.iauthenticationextension2) interface.
  
    - Custom rendering extensions for  SQL Server 2008 (10.0.x) 
  Reporting Services 
 must be rewritten by using the Rendering Object Model (ROM).  
  
    - HTML 3.2 and HTML OWC renderers aren't supported in  SQL Server 2008 (10.0.x) 
  Reporting Services 
 and later versions.  
  
    - Other custom assemblies shouldn't require recompilation.  
  
1. Move the assemblies to the new report server \bin folder. In SQL Server, the report server binaries are located in the following location for the default report server instance:  
  
     `\Program files\Microsoft SQL Server\MSRS13.MSSQLSERVER\Reporting Services\ReportServer\bin`  
  
1. Modify the configuration files to add entries for your custom component. The entries vary depending on the kind of assembly you use. For instructions on where to place files and add configuration entries, see the following:  
  
    1. [Deploying a custom assembly](../custom-assemblies/deploying-a-custom-assembly.md)  
  
    1. [How to deploy a custom report item](../custom-report-items/how-to-deploy-a-custom-report-item.md)  
  
    1. [Deploy a data processing extension](../extensions/data-processing/deploying-a-data-processing-extension.md)  
  
    1. [Deploy a delivery extension](../extensions/delivery-extension/deploying-a-delivery-extension.md)  
  
    1. [Deploy a rendering extension](../extensions/rendering-extension/deploying-a-rendering-extension.md)  
  
    1. [Implement a security extension](../extensions/security-extension/implementing-a-security-extension.md)  

## <a name="bkmk_configure_reportserver"></a> Configure the Report Server

Configure URLs for the Report Server Web service and web portal, and configure the connection to the report server database.  
  
If you migrate a scale-out deployment, take all of the report server nodes offline and migrate each server one at a time. After the first report server is migrated and successfully connects to the report server database, the report server database version is automatically upgraded to the SQL Server database version.  
  
> **Important:**
> If any of the report servers in the scale-out deployment are online and have not been migrated, they might encounter an *rsInvalidReportServerDatabase* exception because they use an older schema when connected to the upgraded.  

If the migrated report server is configured as the shared database for a scale-out deployment, you need to delete any of the old encryption keys from the **Keys** table in the **ReportServer** database, before configuring the report server service. If the keys aren't removed, the migrated report server tries to initialize in scale-out deployment mode. For more information, see [Add and remove encryption keys for scale-out deployment](add-and-remove-encryption-keys-for-scale-out-deployment.md) and [Configure and Manage Encryption Keys (Report Server Configuration Manager)](ssrs-encryption-keys-manage-encryption-keys.md).  

The scale-out keys can't be deleted by using the  Reporting Services 
 Configuration Manager. The old keys must be deleted from the **Keys** table in the **ReportServer** database using SQL Server Management Studio. Delete all rows in the Keys table. This action clears the table and prepares it for restoring the Symmetric key only, as documented in the following steps.  

Before deleting the keys, you should back up the Symmetric Encryption key. You can use the  Reporting Services 
 Configuration Manager to back up the key. Open the Configuration Manager open, select the Encryption Keys tab, and then select **Backup**. You can also script WMI commands to back up the encryption key. For more information on WMI, see [ConfigurationSetting method - BackupEncryptionKey](../wmi-provider-library-reference/configurationsetting-method-backupencryptionkey.md).  
  
1. Start the Report Server Configuration Manager and connect to the  Reporting Services 
 instance you installed. For more information, see [What is Report Server Configuration Manager (Native mode)?](reporting-services-configuration-manager-native-mode.md).  
  
1. Configure URLs for the report server and the web portal. For more information, see [Create a Native Mode Report Server Database (Report Server Configuration Manager)](configure-a-url-ssrs-configuration-manager.md).  
  
1. Configure the report server database, selecting the existing report server database from your previous installation. After successful configuration, the report server service restarts, and once a connection is made to the report server database, the database automatically upgrades to SQL Server Reporting Services. For more information about how to run the Change Database Wizard that you use to create or select a report server database, see [Create a Native Mode Report Server Database (Report Server Configuration Manager)](ssrs-report-server-create-a-native-mode-report-server-database.md).  
  
1. Restore the encryption keys. This step is necessary for enabling reversible encryption on preexisting connection strings and credentials that are already in the report server database. For more information, see [Back up and restore SQL Server Reporting Services (SSRS) encryption keys](ssrs-encryption-keys-back-up-and-restore-encryption-keys.md).  
  
1. If you installed report server on a new computer and you use Windows Firewall, be sure that the TCP port on which the report server listens is open. By default, this port is 80. For more information, see [Configure a firewall for report server access](../report-server/configure-a-firewall-for-report-server-access.md).  
  
1. If you want to administer your native mode report server locally, you need to configure the operating system to allow local administration with the web portal. For more information, see [Configure a native mode report server for local administration (SSRS)](../report-server/configure-a-native-mode-report-server-for-local-administration-ssrs.md).  

## <a name="bkmk_copy_custom_config"></a> Copy custom configuration settings to the RSReportServer.config file

If you modified the RSReportServer.config file or RSWebApplication.config file in the previous installation, you should make the same modifications in the new RSReportServer.config file. The following list summarizes possible modifications for the previous configuration file. The list also provides links to additional information about how to configure the same settings in SQL Server 2016.  
  
| Customization | Information |
| --- | --- |
| Report Server E-mail delivery with custom settings | [Email settings in Reporting Services native mode (Report Server Configuration Manager)](e-mail-settings-reporting-services-native-mode-configuration-manager.md). |
| Device information settings | [Customize rendering extension parameters in RSReportServer.Config](../customize-rendering-extension-parameters-in-rsreportserver-config.md) |

## <a name="bkmk_windowsservice_group"></a> Windows Service group and security ACLs

 In 
 SQL Server 2016 (13.x) 
 Reporting Services or later (SSRS)
, there's one service group, the  Reporting Services 
 Windows Service group, which is used to create security ACLs for all the registry keys, files, and folders that are installed with SQL Server Reporting Services. This Windows group name appears in the format SQLServerReportServerUser$\<*computer_name*>$\<*instance_name*>.  

## <a name="bkmk_verify"></a> Verify your deployment

1. Test the report server and  web portal 
 virtual directories by opening a browser and entering the URL address. For more information, see [Verify a Reporting Services Installation](verify-a-reporting-services-installation.md).  
  
1. Test reports, and verify they contain the data you expect. Review data source information to see whether the data source connection information is still specified. The report server uses the report object model when processing and rendering reports, but it doesn't replace  SQL Server 2008 (10.0.x) 
,  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
, or  SQL Server 2014 (12.x)
 constructs with new report definition language elements. To learn more about how existing reports run on a new version of your report server, see [Upgrade Reports (SSRS)](upgrade-reports.md).  

## <a name="bkmk_remove_unused"></a> Remove unused programs and files

After you successfully migrate your report server to a new instance, you should perform the following steps to remove programs and files that are no longer necessary.  
  
1. Uninstall the previous version of  Reporting Services 
 if you no longer need it. This step doesn't delete the following items, but you can manually remove them if you no longer need them:  
  
    - The previous Report Server database  
  
    - RsExec role  
  
    - Report Server service accounts  
  
    - Application pool for the Report Server Web service  
  
    - Virtual directories for Report Manager and the report server  
  
    - Report server log files  
  
1. Remove IIS if you no longer need it on this computer.

## Related content

- [Migrate a Reporting Services Installation (SharePoint Mode)](https://learn.microsoft.com/previous-versions/sql/reporting-services/install-windows/migrate-a-reporting-services-installation-sharepoint-mode)
- [Report server database (SSRS native mode)](../report-server/report-server-database-ssrs-native-mode.md)
- [Upgrade and migrate Reporting Services](upgrade-and-migrate-reporting-services.md)
- [Reporting Services backward compatibility](../reporting-services-backward-compatibility.md)
- [What is the Report Server configuration manager (native mode)?](reporting-services-configuration-manager-native-mode.md)
- [Try asking the Reporting Services forum](https://learn.microsoft.com/answers/search.html?c=\&f=\&includeChildren=\&q=ssrs+OR+reporting+services\&redirect=search%2fsearch\&sort=relevance\&type=question+OR+idea+OR+kbentry+OR+answer+OR+topic+OR+user)
