---
title: Importing Data from Tables
description: Import data from tables and make changes to data after you create a model for your data in Master Data Services.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "staging process [Master Data Services], about staging process"
  - "importing data [Master Data Services]"
  - "staging process [Master Data Services]"
---
# Overview: Importing Data from Tables (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Once you've created a model for your data in  Master Data Services 
, you can start adding data and make changes to data.   You use  Master Data Services 
 staging tables, stored procedures and Master Data Manager .  
  
 For instructions on how to add and modify data, see [Import Data from Tables (Master Data Services)](import-data-from-tables-master-data-services.md).  
  
> **Note:**
>  You can also use the  SQL Server 
  Master Data Services 
  Add-in for Excel 
, to add data to the MDS repository (  Master Data Services 
 database) from Excel. For more information, see [Overview: Importing Data from Excel (MDS Add-in for Excel)](microsoft-excel-add-in/overview-importing-data-from-excel-mds-add-in-for-excel.md).  
  
 When you add and modify data, you can do the following.  
  
-   Load and update members, and update attribute values  
  
-   Deactivate and delete members  
  
-   Move explicit hierarchy members  
  
 Adding and updating data  includes the following main tasks.  
  
1.  Load data into the staging tables in the  Master Data Services 
 database.  
  
2.  Load the data from the staging tables into the appropriate  Master Data Services 
 tables.  
  
     You use staging stored procedures or  Master Data Manager 
 to load the data.  
  
> **Note:**  
>  In  SQL Server 2016 (13.x) 
, support for the  SQL Server 2008 R2 (10.50.x) 
 staging processes is deprecated.  
  
## Deactivating and Deleting Members (MDS)  
 Deactivating means the member can be reactivated. If you reactivate a member, its attributes and its membership in hierarchies and collections are restored. All previous transactions are intact. Deactivation transactions are visible to administrators in the **Version Management** functional area of the Master Data Manager.  
  
 Deleting means purging the member from the system permanently. All transactions for the member, all relationships, and all attributes are permanently deleted.  
  
> **Note:**  
>  You cannot use staging to reactivate members. You must do it manually in the Master Data Manager. For more information, see [Reactivate a Member or Collection (Master Data Services)](reactivate-a-member-or-collection-master-data-services.md).  
>   
>  You cannot use staging to delete or deactivate collections. For more information on manually deactivating collections, see [Delete a Member or Collection (Master Data Services)](delete-a-member-or-collection-master-data-services.md).  
  
## Moving explicit hierarchy members (MDS)  
 When you move the location of members in explicit hierarchies in bulk, you can designate the following.  
  
-   A consolidated member as a parent of a consolidated member.  
  
-   A consolidated member as a parent of a leaf member.  
  
-   A leaf member as a sibling of a leaf or consolidated member.  
  
-   A consolidated member as a sibling of a leaf or consolidated member.  
  
## Staging Tables and Stored Procedures (MDS)  
 The  Master Data Services 
 database includes the following types of staging tables that you can populate with your  data.  
  
-   [Leaf Member Staging Table (Master Data Services)](leaf-member-staging-table-master-data-services.md)  
  
-   [Consolidated Member Staging Table (Master Data Services)](consolidated-member-staging-table-master-data-services.md)  
  
-   [Relationship Staging Table (Master Data Services)](relationship-staging-table-master-data-services.md)  
  
 For each entity in the model, there is a staging table. The table name indicates the corresponding entity, and the entity type such as leaf member. The following image shows the staging tables for the currency, customer, and product entities.  
  
 Staging Tables in MDS database  
  
 The name of the  table is specified when an entity is created and cannot be changed. If the staging table name contains a _1 or other number, another table of that name already existed when the entity was created.  
  
 The  Master Data Services 
 includes the following types of staging stored procedures.  
  
-   stg.udp_\<name>_Leaf  
  
-   stg.udp_\<name>_Consolidated  
  
-   stg.udp_\<name>_Relationship  
  
 For each entity in the model, there are three stored procedures that correspond to the leaf member, consolidated member, and relationship staging tables.  The following image shows the staging stored procedures for the currency, customer, and product entities.  
  
 Staging stored procedures in the MDS database  
  
 For more information on the stored procedures, see [Staging Stored Procedure (Master Data Services)](staging-stored-procedure-master-data-services.md).  
  
## Logging Transactions (MDS)  
 All transactions that occur when data or relationships are imported or updated can be logged. An option in the stored procedure allows this logging. If you initiate the staging process using  Master Data Manager 
, no logging occurs.  
  
 In  Master Data Services Configuration Manager 
, the **Log staging transactions** setting does not apply to this method of staging data.  
  
## Related content

- [Validation (Master Data Services)](validation-master-data-services.md)
- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
