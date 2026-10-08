---
title: Master Data Services Database
description: The Master Data Services database contains all of the information for the Master Data Services system and is central to a Master Data Services deployment.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "database [Master Data Services], about the database"
  - "database [Master Data Services]"
---
# Master Data Services Database


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  The database contains all of the information for the  Master Data Services 
 system. It is central to a  Master Data Services 
 deployment. The  Master Data Services 
 database:  
  
-   Stores the settings, database objects, and data required by the  Master Data Services 
 system.  
  
-   Contains staging tables that are used to process data from source systems.  
  
-   Provides a schema and database objects to store master data from source systems.  
  
-   Supports versioning functionality, including business rule validation and e-mail notifications.  
  
-   Provides views for subscribing systems that need to retrieve data from the database.  
  
## In This Section  
  
-   [Leaf Member Staging Table (Master Data Services)](leaf-member-staging-table-master-data-services.md)  
  
-   [Consolidated Member Staging Table (Master Data Services)](consolidated-member-staging-table-master-data-services.md)  
  
-   [Relationship Staging Table (Master Data Services)](relationship-staging-table-master-data-services.md)  
  
-   [Staging Process Errors (Master Data Services)](staging-process-errors-master-data-services.md)  
  
## Related content

- [Create a Master Data Services Database](install-windows/create-a-master-data-services-database.md)
- [Database Object Security (Master Data Services)](database-object-security-master-data-services.md)
- [Database Logins, Users, and Roles (Master Data Services)](database-logins-users-and-roles-master-data-services.md)
