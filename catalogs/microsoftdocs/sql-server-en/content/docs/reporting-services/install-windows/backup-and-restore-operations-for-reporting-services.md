---
title: "Backup and restore operations for Reporting Services"
description: "Backup and Restore Operations for Reporting Services"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---

# Backup and restore operations for Reporting Services

  This article provides an overview of all data files used in a  Reporting Services 
 installation and describes when and how you should back up the files. Developing a backup and restore plan for the report server database files is the most important part of a recovery strategy. However, a more complete recovery strategy would include backups of the encryption keys, custom assemblies or extensions, configuration files, and source files for reports.  
  
 ****Applies to:**
**   Reporting Services 
 Native Mode |  Reporting Services 
 SharePoint Mode  

> **Note:**
> Reporting Services integration with SharePoint is no longer available after SQL Server 2016.
  
 Backup and restore operations are often used to move all or part of a  Reporting Services 
 installation:  
  
-   If you're moving just the report server databases, you can use backup and restore or attach and detach to relocate the databases on a different  SQL Server 
 instance. For more information, see [Move the report server databases to another computer (SSRS Native mode)](../report-server/moving-the-report-server-databases-to-another-computer-ssrs-native-mode.md).  
  
-   Moving a  Reporting Services 
 installation to a new computer is called a migration. When you migrate an installation, you run Setup to install a new report server instance and then copy instance data to the new computer. For more information about migrating a  Reporting Services 
 installation, see the following articles:  
  
    - [Upgrade and migrate Reporting Services](upgrade-and-migrate-reporting-services.md)  
    - [Migrate a Reporting Services installation (Native mode)](migrate-a-reporting-services-installation-native-mode.md)  

## Back up the report server databases  
 Because a report server is a stateless server, all application data is stored in the **reportserver** and **reportservertempdb** databases that run on an  SQL Server Database Engine 
 instance. You can back up the **reportserver** and **reportservertempdb** databases using one of the supported methods for backing up  SQL Server 
 databases. Here are some recommendations specific to the report server databases:  
  
-   Use the full recovery model to back up the **reportserver** database.  
  
-   Use the simple recovery model to back up the **reportservertempdb** database.  
  
-   You can use different backup schedules for each database. The only reason to back up the **reportservertempdb** is to avoid having to recreate it if there's a hardware failure. If you experience hardware failure, it isn't necessary to recover the data in **reportservertempdb**, but you do need the table structure. If you lose **reportservertempdb**, the only way to get it back is to recreate the report server database. If you recreate the **reportservertempdb**, it's important that it has the same name as the primary report server database.  
  
 For more information about backup and recovery of  SQL Server 
 relational databases, see [Back up and restore of SQL Server databases](../../relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases.md).  

## Back up the encryption keys  
 You should back up the encryption keys when you configure a  Reporting Services 
 installation for the first time. You should also back up the keys anytime you change the identity of the service accounts or rename the computer. For more information, see [Back up and restore Reporting Services encryption keys](ssrs-encryption-keys-back-up-and-restore-encryption-keys.md). 

## Back up the configuration files  
  Reporting Services 
 uses configuration files to store application settings. You should back up the files when you first configure the server and after you deploy any custom extensions. Files to back up include:  
  
-   Rsreportserver.config  
  
-   Rssvrpolicy.config  
  
-   ReportingServicesService.exe.config  
  
-   Web.config for the Report Server   ASP.NET 
 application
  
-   Machine.config for  ASP.NET 
  
  
## Back up data files  
 Back up the files that you create and maintain in Report Designer. These include report definition (.rdl) files, shared data source (.rds) files, data view (.dv) files, data source (.ds) files, report server project (.rptproj) files, and report solution (.sln) files.  
  
 Remember to back up any script files (.rss) that you created for administration or deployment tasks.  
  
 Verify that you have a backup copy of any custom extensions and custom assemblies you're using.  

## Related content

- [Report server database (SSRS native mode)](../report-server/report-server-database-ssrs-native-mode.md)
- [Reporting Services configuration files](../report-server/reporting-services-configuration-files.md)
- [rskeymgmt utility (SSRS)](../tools/rskeymgmt-utility-ssrs.md)
- [Copy Databases with Backup and Restore](../../relational-databases/databases/copy-databases-with-backup-and-restore.md)
- [Administer a report server database (SSRS native mode)](../report-server/administer-a-report-server-database-ssrs-native-mode.md)
- [Configure and Manage Encryption Keys (Report Server Configuration Manager)](ssrs-encryption-keys-manage-encryption-keys.md)
- [Try asking the Reporting Services forum](https://go.microsoft.com/fwlink/?LinkId=620231)
