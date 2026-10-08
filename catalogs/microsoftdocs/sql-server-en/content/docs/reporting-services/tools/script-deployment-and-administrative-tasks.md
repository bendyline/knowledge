---
title: "Script deployment and administrative tasks"
description: Learn about the tools, technologies and strategies for automating routine installation, deployment, and administrative tasks for a report server.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: tools
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "scripts [Reporting Services]"
  - "moving reports"
  - "report servers [Reporting Services], duplicating settings"
  - "deploying [Reporting Services], scripts"
  - "copying report server settings"
  - "administrative tasks [Reporting Services]"
  - "duplicating report server environment"
  - "migrating reports [Reporting Services]"
  - "scripts [Reporting Services], deployments"
  - "transferring reports"
  - "reports [Reporting Services], migrating"
---

# Script deployment and administrative tasks

   Reporting Services 
 supports the use of scripts to automate routine installation, deployment, and administrative tasks. Deploying a report server is a multi-step process. You must use several tools and processes to configure a deployment; there's no single program or approach that can be used to automate all the tasks.  
  
 Not every step should be automated. In some cases, performing a step manually or through a graphical tool is the simplest and most effective approach. For example, if you want to deploy a large number of reports and models, it's better to copy the report server databases rather than write code that recreates report server environment.  
  
 Some steps require custom code. For example, configuring the URLs for the Web service and Report Manager can be automated, but only if you write custom code that makes calls into the Report Server Windows Management Instrumentation (WMI) provider. If you don't want to write code, you must use the  Reporting Services 
 Configuration tool to perform the step.  
  
 To run script that configures a report server, you must be a local administrator on the computer that you're configuring. For more information, see [Configure a report server for remote administration](../report-server/configure-a-report-server-for-remote-administration.md).  
  
 This article describes recommended approaches for automating specific steps. Several programs and programmatic interfaces are mentioned; descriptions of each one are provided later in this article.  
  
## Deployment tasks and how to automate them  
 The following table summarizes the installation and configuration tasks that are necessary for deploying a report server. You can use the table to match a specific task to an approach that allows you to automate or perform the task unattended.  
  
| Task | Approach |
| --- | --- |
| Install  Reporting Services |
| . | You can run setup from the command line to perform an unattended installation.<br /><br /> You can use Setup to both install and configure a report server, but only if you specify the default configuration option and your system meets all the requirements for this installation type. If you can't install the default configuration, you must perform a files-only installation. |
| Configure the service account. | The service account is initially configured through Setup. To automate changes to the service account as a post-Setup task, you must write custom code that makes calls into the Report Server WMI provider. There are no command-prompt utilities or script templates for configuring the service account programmatically.<br /><br /> If coding requirements prevent you from automating this step, you can easily configure the account manually by running the  Reporting Services |
 | Configuration tool. For more information, see [Configure a service account &#40;Report Server Configuration Manager&#41;](../install-windows/configure-the-report-server-service-account-ssrs-configuration-manager.md). |
| Configure the Report Server Web service and Report Manager URLs. | You must write custom code that makes calls into the Report Server WMI provider. There are no command line utilities or script templates for configuring the URLs.<br /><br /> If you want to avoid writing code, you can configure the URLs manually by running the  Reporting Services |
 | Configuration tool. For more information, see [Configure a URL  (Report Server Configuration Manager)](../install-windows/configure-a-url-ssrs-configuration-manager.md). |
| Create the report server database. | You must write custom code that makes calls into the Report Server WMI provider. There are no command-prompt utilities or script templates for creating the report server databases and RSExecRole.<br /><br /> If you want to avoid writing code, you can create the database manually by running the  Reporting Services |
 | Configuration tool. For more information, see [Create a native mode report server database  (Report Server Configuration Manager)](../install-windows/ssrs-report-server-create-a-native-mode-report-server-database.md). |
| Configure the report server database connection. | If you're changing the connection string, account or password, or the authentication type, run the **rsconfig** utility to configure the connection. For more information, see [Configure a report server database connection  (Report Server Configuration Manager)](../install-windows/configure-a-report-server-database-connection-ssrs-configuration-manager.md) and [rsconfig Utility (SSRS)](rsconfig-utility-ssrs.md).<br /><br /> You can't use rsconfig.exe to create or upgrade the database. The database and RSExecRole must already exist. |
| Configure a scale-out deployment. | Choose from the following approaches to automate scale-out deployment:<br /><br /> -   Run the rskeymgmt.exe utility to join report server instances to an existing installation. For more information, see [Add and remove encryption keys for scale-out deployment (Report Server Configuration Manager)](../install-windows/add-and-remove-encryption-keys-for-scale-out-deployment.md).<br />-   Write custom code that runs against the Report Server WMI provider. |
| Backup encryption keys. | Choose from the following approaches to automate encryption key backup:<br /><br /> -   Run the rskeymgmt.exe utility to back up the keys. For more information, see [Back up and restore Reporting Services encryption keys](../install-windows/ssrs-encryption-keys-back-up-and-restore-encryption-keys.md).<br />-   Write custom code that runs against the Report Server WMI provider. |
| Configure Report Server E-mail. | Write custom code that runs against the  Reporting Services |
 | WMI provider. The provider supports a subset of the e-mail configuration settings.<br /><br /> Although the RSReportServer.config file includes all the settings, don't use the file in an automated manner. Specifically, don't use a batch file to copy the file to another report server. Each configuration file includes values that are specific to the current instance. Those values aren't valid on other report server instances.<br /><br /> For more information about the settings, see [E-mail settings - Reporting Services native mode (Configuration Manager)](../install-windows/e-mail-settings-reporting-services-native-mode-configuration-manager.md). |
| Configure the unattended execution account. | Choose from the following approaches to automate unattended processing account configuration:<br /><br /> -   Run the rsconfig.exe utility to configure the account. For more information, see [Configure the unattended execution account (Report Server Configuration Manager)](../install-windows/configure-the-unattended-execution-account-ssrs-configuration-manager.md).<br />-   Write custom code that makes calls into the Report Server WMI provider. |
| Deploy existing content on another report server, including the folder hierarchy, role assignments, reports, subscriptions, schedules, data sources, and resources. | The best way to re-create an existing report server environment is to copy the report server database to a new report server instance.<br /><br /> An alternative approach is to write custom code that recreates existing report server content programmatically. However, subscriptions, report snapshots, and report history can't be recreated programmatically.<br /><br /> Some deployments can benefit by using both techniques together. For example, restore a report server database, and then run custom code that modifies the report server database for a specific installation.<br /><br /> For a detailed example, see [Sample Reporting Services rs.exe script to copy content between report servers](sample-reporting-services-rs-exe-script-to-copy-content-between-report-servers.md).<br /><br /> For more information about relocating a report server database, see [Move the report server databases to another computer (SSRS native mode)](../report-server/moving-the-report-server-databases-to-another-computer-ssrs-native-mode.md). For more information about creating report server environment programmatically, see the section "Use scripts to migrate report server content and folders" in this article. |
  
## Tools and technologies for automating server deployment  
 The following list summarizes the programs and interfaces that can be used to automate deployment and maintenance tasks:  
  
-   The Setup program can be run in unattended mode to install and sometimes configure report server components. You must use the Files-Only installation option to have Setup configure a report server instance.  
  
-   The  Reporting Services 
 WMI provider and  Reporting Services 
 command line utilities can be used for local and remote server configuration.  
  
     The  Reporting Services 
 WMI provider exposes classes, properties, and methods that allow you to configure all aspects of a  Reporting Services 
 installation. Those aspects include specifying the service account and configuring URLs. They might also include creating and configuring the report server database or configuring a report server for e-mail delivery. You must write custom code or script to use the WMI provider. For more information, see [Access the Reporting Services WMI Provider](access-the-reporting-services-wmi-provider.md).  
  
     An alternative to writing code is to use the command line utilities (rsconfig.exe and rskeymgmt.exe). You can write batch files that run the utilities. You can use the utilities to automate some but not all configuration tasks.  
  
-   The report server script host tool (`rs.exe`) can run custom  Microsoft 
  Visual Basic  code that you might write to re-create or move existing content from one report server to another. With this approach, you write script in  Visual Basic , save it as an .rss file, and use `rs.exe` to run the script on the target report server. The script you write can call the SOAP interface to the Report Server web service. Deployment scripts are written using this approach because it allows you to re-create a report server folder namespace and content, and re-create role-based security.  
  
-   The SQL Server 2012 release introduced PowerShell cmdlets for SharePoint integrated mode. You can use PowerShell to configure and administer the SharePoint integration.  For more information, see [PowerShell cmdlets for Reporting Services SharePoint mode](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/reporting-services/report-server-sharepoint/powershell-cmdlets-for-reporting-services-sharepoint-mode.md).  
  
## Use Scripts to Migrate Report Server Content and Folders  
 You can write scripts that duplicate a report server environment on another report server instance. Deployment scripts are written in  Visual Basic  and then processed using the report server script host utility.  
  
 For a detailed example, see [Sample Reporting Services rs.exe script to copy content between report servers](sample-reporting-services-rs-exe-script-to-copy-content-between-report-servers.md).  
  
 Use scripts to copy folders, shared data sources, resources, reports, role assignments, and settings from one server to another. You write a script for one report server instance, and then run it on another server to re-create the report server namespace. If you have multiple report servers in your  Reporting Services 
 deployment, you can run the script on each server individually to configure all servers in the same way.  
  
 The following list describes the steps for migrating reports from one server to another.  
  
1.  Set your script variable to the URL of the source report server.  
  
2.  Use the [ReportService2010.ReportingService2010.GetItemDefinition%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetItemDefinition%252A) and [ReportService2010.ReportingService2010.GetProperties%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetProperties%252A) methods to retrieve the report definition and the properties of the report.  
  
3.  Set the URL to point to the destination server.  
  
4.  Use [ReportService2010.ReportingService2010.CreateCatalogItem%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.CreateCatalogItem%252A) method, passing the properties returned from [ReportService2010.ReportingService2010.GetProperties%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetProperties%252A) and the report definition returned by [ReportService2010.ReportingService2010.GetItemDefinition%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetItemDefinition%252A).  
  
 By using a combination of get and create methods, you can perform similar steps to migrate settings, folders, shared data sources, and resources. For more information about the methods available to you, see [Technical reference (SSRS)](../technical-reference-ssrs.md).  
  
> **Note:**  
>  Scripts run under the  Microsoft 
 Windows credentials of the user running the script unless credentials are explicitly set.  
  
 For more information about how to format and run a script file, see [Script with the rs.exe utility and the web service](script-with-the-rs-exe-utility-and-the-web-service.md).  
  
## Using Scripts to Set Server Properties  
 You can write scripts that set system properties on the report server. The following  Visual Basic  .NET script shows one way to set properties. This example disables the RSClientPrint ActiveX control, but you can replace **EnableClientPrinting** and **False** with any valid property name and value. To view a complete list of server properties, see [Report server system properties](../report-server-web-service/net-framework/reporting-services-properties-report-server-system-properties.md).  
  
 To use the script, save it to a file that has an .rss extension, and then use the `rs.exe` command prompt utility to run the file on the report server. The script isn't compiled, so it isn't necessary to have an installation of  Visual Basic . This example assumes that you have permissions on the local computer that hosts the report server. If you're not logged on under an account that has permissions, you must specify account information through other command line arguments. For more information, see [RS.exe utility (SSRS)](rs-exe-utility-ssrs.md).  
  
> **Tip:**  
>  For a detailed example, see [Sample Reporting Services rs.exe script to copy content between report servers](sample-reporting-services-rs-exe-script-to-copy-content-between-report-servers.md).  
  
```  
Public Sub Main()  
        Dim props(0) As [Property]  
        Dim setProp As New [Property]  
        setProp.Name = "EnableClientPrinting"  
        setProp.Value = "False"   
        props(0) = setProp  
        Try  
            rs.SetSystemProperties(props)  
        Catch ex As System.Web.Services.Protocols.SoapException  
            Console.Write(ex.Detail.InnerXml)  
        Catch e as Exception  
            Console.Write(e.Message)  
        End Try  
End Sub  
```

## Related content

- [ConfigurationSetting method - GenerateDatabaseCreationScript](../wmi-provider-library-reference/configurationsetting-method-generatedatabasecreationscript.md)
- [ConfigurationSetting method - GenerateDatabaseRightsScript](../wmi-provider-library-reference/configurationsetting-method-generatedatabaserightsscript.md)
- [ConfigurationSetting method - GenerateDatabaseUpgradeScript](../wmi-provider-library-reference/configurationsetting-method-generatedatabaseupgradescript.md)
- [Install, configure, or uninstall SQL Server on Windows from the command prompt](../../database-engine/install-windows/install-sql-server-from-the-command-prompt.md)
- [Install a Reporting Services 2016 native mode report server](../install-windows/install-reporting-services-native-mode-report-server.md)
- [Reporting Services report server (native mode)](../report-server/reporting-services-report-server-native-mode.md)
- [Report Server command prompt utilities (SSRS)](report-server-command-prompt-utilities-ssrs.md)
- [Browser support for Reporting Services and Power View](../browser-support-for-reporting-services-and-power-view.md)
- [SQL Server Reporting Services tools](reporting-services-tools.md)
- [Try asking the Reporting Services forum](https://go.microsoft.com/fwlink/?LinkId=620231)
