---
title: Configure Business Rules to Send Notifications
description: Configure Business Rules to Send Notifications (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "business rules [Master Data Services], configuring notifications"
  - "e-mail [Master Data Services], configuring business rules"
  - "notifications [Master Data Services], configuring business rules"
---
# Configure Business Rules to Send Notifications (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, configure business rules to send notifications when you want to notify users about attribute value changes.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** and **User and Group Permissions** functional areas. If you do not have permission to the **User and Group Permissions** functional area, you cannot view the list of users and groups to send notifications to.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   A business rule that uses a validation action must already exist. For more information, see [Create and Publish a Business Rule (Master Data Services)](create-and-publish-a-business-rule-master-data-services.md).  
  
-   The user or group that receives the notification must have at least **Read-only** permission to the attribute that fails validation. Users or groups that are explicitly or implicitly denied permission to the attribute will receive the email but will not be able to access the attribute in  Master Data Manager 
.  
  
-   If mail is sent to a group, only members of the group that have accessed  Master Data Manager 
 will get the email.  
  
### To configure business rules to send notifications  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  From the menu bar, point to **Manage** and click **Business Rules**.  
  
3.  On the **Business Rules** page, from the **Model** list, select a model.  
  
4.  From the **Entity** dropdown list, select an entity.  
  
5.  From the **Member Types** dropdown list, select a type of member.  
  
6.  In the grid, select the row for the business rule you want to edit and click **Edit**.  
  
7.  Select the **Send Notifications** check-box and from the dropdown list select a user or group to send the email notification to.  
  
8.  Click **Save**.  
  
9. Click **Publish All**.  
  
10. On the confirmation dialog box, click **OK**. The value in the **Business Rule State** column changed to **Active** and the **Notification** column shows the selected user or group to send notification to.  
  
## Related content

- [Notifications (Master Data Services)](notifications-master-data-services.md)
- [Configure Email Notifications (Master Data Services)](configure-email-notifications-master-data-services.md)
- [Validate Specific Members against Business Rules (Master Data Services)](validate-specific-members-against-business-rules-master-data-services.md)
- [Validate a Version against Business Rules (Master Data Services)](validate-a-version-against-business-rules-master-data-services.md)
