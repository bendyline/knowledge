---
title: Database Object Security
description: Database Object Security (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "database [Master Data Services], object security"
  - "security [Master Data Services], database objects"
---
# Database Object Security (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In the  Master Data Services 
 database, data is stored in multiple database tables and is visible in views. Information that you might have secured in the  Master Data Manager 
 Web application is visible to users with access to the  Master Data Services 
 database.  
  
 Specifically, employee salary information might be contained in an Employee model, or company financial information might be in an Account model. You can deny a user access to these models in the  Master Data Manager 
 user interface, but users with access to the database can view this data.  
  
 You can grant permissions to database objects to make specific data available to users. For more information on granting permissions, see [GRANT Object Permissions &#40;Transact-SQL&#41;](../t-sql/statements/grant-object-permissions-transact-sql.md). For more information about securing  SQL Server 
, see [Securing SQL Server](../relational-databases/security/securing-sql-server.md).  
  
 The following tasks require access to the  Master Data Services 
 database:  
  
-   [Staging Data](#Staging)  
  
-   [Validating Data Against Business Rules](#rules)  
  
-   [Deleting Versions](#Versions)  
  
-   [Immediately Applying Hierarchy Member Permissions](#Hierarchy)  
  
-   [Configuring System Settings](#SysSettings)  
  
##  <a name="Staging"></a> Staging Data  
 In the following table, each securable has "name" as part of the name. This indicates the name of the staging table that is specified when an entity is created. For more information, see [Overview: Importing Data from Tables (Master Data Services)](overview-importing-data-from-tables-master-data-services.md)  
  
| Action | Securables | Permissions |
| --- | --- | --- |
| Create, update, and delete leaf members and their attributes. | stg.name_Leaf | Required: INSERT<br /><br /> Optional: SELECT and UPDATE |
| Load the data from the Leaf staging table into the appropriate MDS database tables. | stg.udp_name_Leaf | EXECUTE |
| Create, update, and delete consolidated members and their attributes. | stg.name_Consolidated | Required: INSERT<br /><br /> Optional: SELECT and UPDATE |
| Load the data from the Consolidated staging table into the appropriate MDS database tables. | stg.udp_name_Consolidated | EXECUTE |
| Move members in an explicit hierarchy. | stg.name_Relationship | Required: INSERT<br /><br /> Optional: SELECT and UPDATE |
| Load the data from the Relationship staging table into the appropriate MDS tables. | stg.udp_name_Relationship | EXECUTE |
| View errors that occurred when data from the staging tables was being inserted into the MDS database tables. | stg.udp_name_Relationship | SELECT |
  
 For more information, see [Overview: Importing Data from Tables (Master Data Services)](overview-importing-data-from-tables-master-data-services.md).  
  
##  <a name="rules"></a> Validating Data Against Business Rules  
  
| Action | Securable | Permissions |
| --- | --- | --- |
| Validate a version of data against business rules | mdm.udpValidateModel | EXECUTE |
  
 For more information, see [Validation Stored Procedure (Master Data Services)](validation-stored-procedure-master-data-services.md).  
  
##  <a name="Versions"></a> Deleting Versions  
  
| Action | Securables | Permissions |
| --- | --- | --- |
| Determine the ID of the version you want to delete | mdm.viw_SYSTEM_SCHEMA_VERSION | SELECT |
| Delete a version of a model | mdm.udpVersionDelete | EXECUTE |
  
 For more information, see [Delete a Version (Master Data Services)](delete-a-version-master-data-services.md).  
  
##  <a name="Hierarchy"></a> Immediately Applying Hierarchy Member Permissions  
  
| Action | Securables | Permissions |
| --- | --- | --- |
| Immediately apply member permissions | mdm.udpSecurityMemberProcessRebuildModel | EXECUTE |
  
 For more information, see [Immediately Apply Member Permissions (Master Data Services)](immediately-apply-member-permissions-master-data-services.md).  
  
##  <a name="SysSettings"></a> Configuring System Settings  
 There are system settings that you can configure to control behavior in  Master Data Services 
. You can adjust these settings in  Master Data Services Configuration Manager 
 or if you have UPDATE access, you can adjust these settings directly in the mdm.tblSystemSetting database table. For more information, see [System Settings (Master Data Services)](system-settings-master-data-services.md).  
  
## Related content

- [Security (Master Data Services)](security-master-data-services.md)
