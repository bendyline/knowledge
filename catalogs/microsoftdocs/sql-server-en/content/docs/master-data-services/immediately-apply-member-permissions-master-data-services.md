---
title: Immediately Apply Member Permissions
description: Explains how to apply member permissions immediately for Master Data Services
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "members [Master Data Services], applying permissions immediately"
  - "permissions [Master Data Services], applying member permissions immediately"
---
# Immediately apply member permissions (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, instead of waiting for member security to be applied at regular intervals, you can apply member permissions immediately.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to execute the mdm.udpSecurityMemberProcessRebuildModel stored procedure in the  Master Data Services 
 database. For more information, see [Database Object Security (Master Data Services)](database-object-security-master-data-services.md).  
  
### To immediately apply hierarchy member permissions  
  
1.  Open  SQL Server Management Studio 
 and connect to the  Database Engine 
 instance for your  Master Data Services 
 database.  
  
2.  Create a new query.  
  
3.  Type the following text, replacing *database* with the name of your database and *Model_Name* with the name of the model.  
  
    ```  
    USE [database];  
    GO  
  
    DECLARE @Model_ID INT;  
    SELECT @Model_ID = ID FROM mdm.tblModel WHERE [Name] = N'Model_Name';  
    EXEC [mdm].[udpSecurityMemberProcessRebuildModel] @Model_ID=@Model_ID, @ProcessNow=1;  
    GO  
    ```  
  
4.  Run the query.  
  
## Related content

- [Assign Hierarchy Member Permissions (Master Data Services)](assign-hierarchy-member-permissions-master-data-services.md)
- [Hierarchy Member Permissions (Master Data Services)](hierarchy-member-permissions-master-data-services.md)
