---
title: Installation Tasks
description: This article provides an overview of installation of Master Data Services, including installation and pre-installation and post-installation tasks.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
  - build-2025
---
# Installation Tasks for Master Data Services


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  This article provides an overview of the installation tasks, with links to instructions. For a walkthrough of installing and configuring Master Data Services, see [Master Data Services Installation and Configuration](../master-data-services-installation-and-configuration.md) 
  
-   [Pre-Installation Tasks](#preinstall): Verify system requirements before you install  Master Data Services 
.  
  
-   [Installation Operations](#install): Install  Master Data Services 
 by using  SQL Server 
 Setup or the command prompt.  
  
-   [Post-Installation Tasks](#postinstall): Open  Master Data Services Configuration Manager 
 to complete post-installation operations. Create and configure the  Master Data Services 
 database,  Master Data Manager 
 web application, and web services, and deploy a sample model.  
  
##  <a name="preinstall"></a> Pre-Installation Tasks  
  
| Action | Details | Related Topics |
| --- | --- | --- |
| Verify installation requirements | The computer where you run  SQL Server |
 | Setup must meet minimum requirements for:<br /><br />  SQL Server |
 | Setup.<br /><br /> The  Master Data Manager |
 | web application and web services.<br /><br /> The  Master Data Services |
 | database, if you host the database on the same computer as the web application.<br /><br /> <br /><br /> You can separate the web server computer and database server computer by running Setup on only the web server computer and creating the  Master Data Services |
 | database on a remote computer that runs a supported version and edition of  SQL Server |
| . | [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md)<br /><br /> [Hardware and software requirements for SQL Server 2017](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/install/hardware-and-software-requirements-for-installing-sql-server.md)<br /><br /> [Web Application Requirements (Master Data Services)](web-application-requirements-master-data-services.md)<br /><br /> [Database Requirements (Master Data Services)](database-requirements-master-data-services.md) |
| Configure the required roles, role services, and features | Before you run Setup, configure the computer with the required Windows roles, role services, and features.<br /><br /> Note: Although you can perform this step later in the workflow, it is helpful to configure this prior to running Setup so that you can perform web configuration tasks immediately following the installation. | [Web Application Requirements (Master Data Services)](web-application-requirements-master-data-services.md) |
| Review language support considerations | Determine the language that you want to install and run  Master Data Services |
 | in. | [Multi-Lingual and Global Deployments (Master Data Services)](multi-lingual-and-global-deployments-master-data-services.md) |
  
##  <a name="install"></a> Installation Operations  
  
| Action | Details | Related Topics |
| --- | --- | --- |
| Run  SQL Server |
 | Setup | On the computer that will host the  Master Data Manager |
 | web application and  Master Data Services |
 | web services, use  SQL Server |
 | Setup or a command prompt to install  Master Data Services |
| . When you use  SQL Server |
 | Setup,  Master Data Services |
 | is available on the **Feature Selection** page under **Shared Features**. When you use a command prompt,  Master Data Services |
 | is available as a feature parameter. Note that the command-line setup process installs  Master Data Services |
| , but does not configure it. You must configure it using the Master Data Services Configuration Manager.<br /><br /> The installation process:<br /><br /> Installs  Master Data Services |
 | folders and files at the location you specify for shared features, and assigns permissions to these objects.<br /><br /> Registers  Master Data Services |
 | assemblies in the Global Assembly Cache (GAC).<br /><br /> Installs  Master Data Services Configuration Manager |
| . | [Install SQL Server 2016 from the Installation Wizard &#40;Setup&#41;](../../database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup.md)<br /><br /> [Folder and File Permissions (Master Data Services)](../folder-and-file-permissions-master-data-services.md) |
  
##  <a name="postinstall"></a> Post-Installation Tasks  
  
| Action | Details | Related Topics |
| --- | --- | --- |
| Open  Master Data Services Configuration Manager |
 | to complete post-installation operations | After Setup completes, open  Master Data Services Configuration Manager |
| .  Master Data Services Configuration Manager |
 | performs the following post-installation operations on the local computer:<br /><br /> Creates a Windows group, **MDS_ServiceAccounts**, to contain  Master Data Services |
 | service accounts for application pools.<br /><br /> Under the  Master Data Services |
 | installation path, creates the MDSTempDir folder and assigns permissions for **MDS_ServiceAccounts**. This folder is where temporary compilation files are compiled for the  Master Data Manager |
 | web application.<br /><br /> In the  Master Data Services |
 | Web.config file, configures the **tempDirectory** attribute of the **\<compilation>** element with the path to the MDSTempDir folder. | [Folder and File Permissions (Master Data Services)](../folder-and-file-permissions-master-data-services.md)<br /><br /> [Web Configuration Reference (Master Data Services)](../web-configuration-reference-master-data-services.md) |
| Create a  Master Data Services |
 | database | Use  Master Data Services Configuration Manager |
 | to create a  Master Data Services |
 | database for your master data. | [Create a Master Data Services Database](create-a-master-data-services-database.md) |
| Create a  Master Data Manager |
 | web application | Use  Master Data Services Configuration Manager |
 | to create and configure a web application to host  Master Data Manager |
| . | [Create a Master Data Manager Web Application (Master Data Services)](create-a-master-data-manager-web-application-master-data-services.md) |
| Associate a  Master Data Services |
 | database with a web application | Use  Master Data Services Configuration Manager |
 | to associate your  Master Data Manager |
 | web application with your  Master Data Services |
 | database. | [Associate a Master Data Services Database and Web Application](associate-a-master-data-services-database-and-web-application.md) |
| Configure Internet Explorer Enhanced Security | When you install  Master Data Services |
 | on a Windows Server 2012 computer, you might have to configure Internet Explorer Enhanced Security to allow scripting for the  Master Data Manager |
 | application site. Otherwise, browsing to the  Master Data Manager |
 | application site on the server computer will fail. | [Internet Explorer: Enhanced Security Configuration](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/dd883248\(v=ws.10\)) |
| Install the  Master Data Services |
  | Add-in for Excel |
| Users who will work with master data can install the  Add-in for Excel |
| . | [SQL Server 2016 Master Data Services Add-in For Excel](https://go.microsoft.com/fwlink/?LinkID=398159) |
| Enable Data Quality Services (DQS) integration | For users of the  Master Data Services |
  | Add-in for Excel |
| , enable integration with the DQS feature, which can be used to match similar data. | [Enable Data Quality Services Integration with Master Data Services](enable-data-quality-services-integration-with-master-data-services.md) |
| Deploy a sample model | Sample model packages are installed with Master Data Services, and can be deployed using MDSModelDeploy.exe. | [Deploying MDS Samples in SQL Server](../sql-server-samples-model-deployment-packages-mds.md) |
  
 If you encounter issues during the installation process or initial configuration, see [Troubleshooting Installation and Configuration Issues](../master-data-services-installation-and-configuration.md).  
  
 If you no longer need  Master Data Services 
 on a computer, you can uninstall  Master Data Services 
 and determine whether to remove items that are not affected by the uninstall process. For more information, see [Uninstall and Remove Master Data Services](../../sql-server/install/uninstall-and-remove-master-data-services.md).  
  
## Related content

- [SQL Server installation guide](../../database-engine/install-windows/install-sql-server.md)
