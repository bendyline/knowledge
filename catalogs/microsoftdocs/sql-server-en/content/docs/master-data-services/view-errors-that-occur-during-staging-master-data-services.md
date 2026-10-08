---
title: View Errors That Occur During Staging
description: View Errors that Occur During Staging (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "staging process [Master Data Services], viewing errors"
---
# View Errors that Occur During Staging (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, you can view errors that occur during the staging process. In the  Master Data Services 
 database, there are two views that show errors:  
  
-   stg.viw_name_MemberErrorDetails for leaf or consolidated member updates.  
  
-   stg.viw_name_RelationshipErrorDetails for hierarchy relationship updates.  
  
## Prerequisites  
 To perform this procedure:  
  
-   In the  Master Data Services 
 database, you must have SELECT permissions to either the stg.viw_name_MemberErrorDetails or stg.viw_name_RelationshipErrorDetails view.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To view staging errors  
  
1.  Open  SQL Server Management Studio 
 and connect to the  Database Engine 
 instance for your  Master Data Services 
 database.  
  
2.  Open a new query.  
  
3.  Type the following text, replacing name with the name of your staging table, for example, viw_Product_MemberErrorDetails.  
  
     `SELECT * FROM stg.viw_name_MemberErrorDetails`  
  
4.  Execute the query. Error details are displayed in the **ErrorDescription** field.  
  
## Related content

- [Overview: Importing Data from Tables (Master Data Services)](overview-importing-data-from-tables-master-data-services.md)
- [Staging Process Errors (Master Data Services)](staging-process-errors-master-data-services.md)
