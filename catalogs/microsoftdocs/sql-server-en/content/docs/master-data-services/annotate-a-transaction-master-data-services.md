---
title: Annotate a Transaction
description: Annotate a Transaction (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "annotations [Master Data Services], for transactions"
---
# Annotate a Transaction (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, annotate a transaction when you want to provide supporting details about the transaction for historical purposes.  
  
> **Note:**  
>  You cannot delete annotations.  
  
## Prerequisites  
  
-   To annotate transactions that you created, you must have permission to access the **Explorer** functional area, and have a minimum of **Update** permission to the model object you want to annotate.  
  
-   To annotate transactions for all users, you must have permission to access the **Version Management** functional area and be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To annotate a transaction in Explorer  
  
1.  On the  Master Data Manager 
 home page, from the **Model** list, select a model.  
  
2.  From the **Version** list, select a version.  
  
3.  Click **Explorer**.  
  
4.  From the menu bar, point to **Entities** and click the entity that contains the member with a transaction you want to annotate.  
  
5.  In the grid, click the row of the member.  
  
6.  Click **View Transactions**.  
  
7.  In the **View Transactions** dialog box, click the transaction you want to annotate.  
  
8.  In the box at the bottom of the dialog box, type your annotation.  
  
9. Click **Add Annotation**. The annotation is displayed in the **Annotations** pane.  
  
### To annotate a transaction in Version Management (administrators only)  
  
1.  On the  Master Data Manager 
 home page, click **Version Management**.  
  
2.  On the menu bar, click **Transactions**.  
  
3.  In the **Transactions** pane, click the row in the grid for the transaction you want to annotate.  
  
4.  In the **Transaction Annotations** pane, in the **Annotation** box, type your annotation.  
  
5.  Click **OK**.  
  
## Related content

- [Annotations (Master Data Services)](annotations-master-data-services.md)
- [Transactions (Master Data Services)](transactions-master-data-services.md)
