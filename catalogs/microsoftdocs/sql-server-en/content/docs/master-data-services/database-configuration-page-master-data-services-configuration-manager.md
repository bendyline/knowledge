---
title: Database Configuration Page
description: Database Configuration Page (Master Data Services Configuration Manager)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
f1_keywords:
  - "sql13.mds.configmanager.dbpg.f1"
---
# Database Configuration Page (Master Data Services Configuration Manager)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Use the **Database Configuration** page to edit system settings of a  Master Data Services 
 database. System settings affect all web applications and web services associated with the selected  Master Data Services 
 database. You must select or create a  Master Data Services 
 database before system settings are enabled and available for configuration.  
  
## Current Database  
 Select an existing  Master Data Services 
 database or create a new database for which to edit system settings. The new database will be selected after it is created.  
  
| Control Name | Description |
| --- | --- |
| **SQL Server instance** | Displays the name of the selected  SQL Server |
 | instance. This is blank until you connect to an instance, and then select or create a  Master Data Services |
 | database. |
| **Master Data Services database** | Displays the name of the selected  Master Data Services |
 | database. This is blank until you connect to an instance, and then select or create a  Master Data Services |
 | database. |
| **Master Data Services database version** | The version of the  Master Data Services |
 | database schema. |
| **Create Database** | Opens the **Create Database** wizard from which you connect to a  SQL Server |
 | instance and create a  Master Data Services |
 | database for that instance. |
| **Select Database** | Opens the **Connect to Database** dialog box from which you connect to a  SQL Server |
 | instance and select a  Master Data Services |
 | database. |
| **Upgrade Database** | Opens a wizard from which you can upgrade a specified  Master Data Services |
 | database. This button is enabled only when the specified database requires upgrade. |
| **Repair Database** | Click this button to ensure the MDS database is installed correctly. This can be useful if you backup and restore an MDS database to a  SQL Server |
 | instance that has never hosted an MDS database. |
  
## System Settings  
 Edit system settings for all the web applications and web services associated with the selected  Master Data Services 
 database.  
  
 These settings are available in  Master Data Services Configuration Manager 
 and are stored in the database in the System Settings table (mdm.tblSystemSetting). For a list of all settings, see [System Settings (Master Data Services)](system-settings-master-data-services.md).  
  
## Related content

- [Master Data Services Installation and Configuration](master-data-services-installation-and-configuration.md)
- [Database Requirements (Master Data Services)](install-windows/database-requirements-master-data-services.md)
