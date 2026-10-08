---
title: "Files-only installation (Reporting Services)"
description: "Files-Only Installation (Reporting Services)"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server
ms.topic: install-set-up-deploy
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "files-only installation [Reporting Services]"
  - "installation options [Reporting Services]"
---
# Files-only installation (Reporting Services)

  **Applies to:**
 

  *Files-only installation* refers to a  Reporting Services 
 installation where Setup creates the folder structure for  Reporting Services 
 program files, copies the files to disk, registers the Report Server service on the local computer, configures the service account, grants files permissions to the service account, and registers the  Reporting Services 
 WMI provider.  
  
 A files-only installation includes the following  Reporting Services 
 features: Report Server service (which hosts the Report Server Web service and background processing application), Report Builder, the  Reporting Services 
 Configuration tool, and the  Reporting Services 
 command line utilities (rsconfig.exe, rskeymgmt.exe and rs.exe). It doesn't apply to shared features such as  SQL Server 
  Management Studio
 or  SQL Server Data Tools (SSDT) 
, which must be specified as separate items if you want to install them.  
  
 In contrast with other installation modes, a report server that is installed in files-only mode isn't operational when Setup is finished. Extra configuration is required to bring the report server online by using the [Reporting Services Configuration Manager (Native Mode)](reporting-services-configuration-manager-native-mode.md).  
  
## When to select files-only installation mode  

 A files-only installation must be performed when:  
  
- You want to connect the report server to a remote report server database.  
  
- You want to install the report server as a named instance.  
  
- You have deployment requirements that include using custom settings or functionality, and you want full control over when and how the server is configured.  
  
- Installing a  SQL Server 
 failover cluster that includes  Reporting Services 
.  
  
## How to perform a files-only installation  

 Files-only installation is the default for  Reporting Services 
.  
  
 You can specify a files-only installation through the command line or in the Installation wizard. The following articles provide step-by-step instructions:  
  
- [Install SQL Server from the installation wizard &#40;setup&#41;](../../database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup.md).  
  
- [Install SQL Server from the Command Prompt](../../database-engine/install-windows/install-sql-server-from-the-command-prompt.md).  
  
### Example command line script  

 For clarity, the example includes ```/RSINSTALLMODE="FilesOnlyMode"```. However, because files-only mode is the default, you can omit this argument and still get a files-only mode installation.  
  
```  
setup /q /ACTION=install /FEATURES=RS /InstanceName=MSSQLSERVER /RSSVCACCOUNT="NT AUTHORITY\NETWORK SERVICE" /RSINSTALLMODE="FilesOnlyMode"  
```  
  
### Installation wizard  

 When you select  Reporting Services 
 in the Feature Selection page, Setup provides a  Reporting Services 
 Configuration page that enables you to specify the installation mode. To specify a files-only installation, select **Install but do not configure the report server** on the  Reporting Services 
 Configuration page.  
  
## Related content

- [Verify a Reporting Services Installation](verify-a-reporting-services-installation.md)
- [Configure the Report Server Service Account (Report Server Configuration Manager)](configure-the-report-server-service-account-ssrs-configuration-manager.md)
- [Configure report server URLs (Report Server Configuration Manager)](configure-report-server-urls-ssrs-configuration-manager.md)
- [Configure a report server database connection (Report Server Configuration Manager)](configure-a-report-server-database-connection-ssrs-configuration-manager.md)
- [Install a Reporting Services 2016 native mode report server](install-reporting-services-native-mode-report-server.md)
- [SQL Server Reporting Services tools](../tools/reporting-services-tools.md)
