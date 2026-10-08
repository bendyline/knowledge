---
title: Configure Email Notifications
description: Configure Email Notifications (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "e-mail [Master Data Services], configuring"
  - "notifications [Master Data Services], configuring notifications"
---
# Configure Email Notifications (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Configure notification emails when you want  Master Data Services 
 to send email messages automatically.  
  
### To configure notifications  
  
1.  In  Master Data Services Configuration Manager 
, on the **Database** page, select your  Master Data Services 
 database.  
  
2.  In the **System Settings** section, click **Create Profile**.  
  
3.  Complete all required fields. For more information, see [Create Database Mail Profile and Account Dialog Box &#40;Master Data Services Configuration Manager&#41;](master-data-services-overview-mds.md).  
  
4.  Click **OK**.  
  
    > **Note:**  
    >  After you configure notifications, you cannot use  Master Data Services Configuration Manager 
 to make changes. You must make changes directly in the  Master Data Services 
 database. For more information, see [Database Mail Configuration Objects](../relational-databases/database-mail/database-mail-configuration-objects.md).  
  
## Related content

- [Notifications (Master Data Services)](notifications-master-data-services.md)
- [Configure Business Rules to Send Notifications (Master Data Services)](configure-business-rules-to-send-notifications-master-data-services.md)
- [System Settings (Master Data Services)](system-settings-master-data-services.md)
