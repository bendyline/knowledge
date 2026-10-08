---
title: Reverse a Transaction
description: Reverse a Transaction (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "transactions [Master Data Services], reversing"
---
# Reverse a Transaction (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, administrators can reverse a transaction when an action needs to be undone. Examples of transactions are attribute value changes, hierarchy moves, or member deletions. This topic only applies to transactions of entities with transaction log type "Attribute". Go to entity explorer page to view the transaction history of the entities with transaction log type "Member".  
  
## Prerequisites  
  
-   You must have permission to access the **Version Management** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To reverse a transaction  
  
1.  On the  Master Data Manager 
 home page, click **Version Management**.  
  
2.  On the menu bar, click **Transactions**.  
  
3.  On the **Transactions** page, from the **Model** list, select a model.  
  
4.  From the **Version** list, select a version.  
  
5.  Click the row in the grid for the transaction you want to reverse.  
  
6.  Click **Reverse Transaction**.  
  
7.  In the confirmation dialog box, click **OK**. Another transaction is added to the grid to record the reversed transaction.  
  
## Related content

- [Transactions (Master Data Services)](transactions-master-data-services.md)
- [Reactivate a Member or Collection (Master Data Services)](reactivate-a-member-or-collection-master-data-services.md)
- [Rollback Member Revision History (Master Data Services)](rollback-member-revision-history-master-data-services.md)
