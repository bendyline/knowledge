---
title: Notifications
description: Notifications (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "notifications [Master Data Services]"
  - "notifications [Master Data Services], about notifications"
  - "e-mail [Master Data Services]"
  - "e-mail [Master Data Services], about e-mail notifications"
---
# Notifications (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


   Master Data Services 
 can be configured to send an email notification when business rule validation fails, the status of a model version changes, or the status of a changeset changes.  
  
## How Notifications Are Sent  
 You configure notifications in  Master Data Services Configuration Manager 
. Notifications send email messages by using Database Mail on the instance of  SQL Server 
  Database Engine 
 that hosts the  Master Data Services 
 database. For more information about Database Mail, see [Database Mail Configuration Objects](../relational-databases/database-mail/database-mail-configuration-objects.md) in  SQL Server 
 Books Online.  
  
## When Notifications Are Sent  
 After notifications are configured, automated email notifications can be sent in the following instances.  
  
| Instance | Description |
| --- | --- |
| Data fails business rule validation | Individual business rules must be configured to send email when an attribute value fails business rule validation. The notification contains the following information.<br /><br /> Model<br /><br /> Version<br /><br /> Entity<br /><br /> Member Code<br /><br /> Failed business rule<br /><br /> Link to the member for which the attribute value fails the business rule<br /><br /> Notification issued time<br /><br /> For more information, see [Configure Business Rules to Send Notifications (Master Data Services)](configure-business-rules-to-send-notifications-master-data-services.md). |
| Model version status changes | Each time a model version's status changes, users that are model administrators receive notifications automatically. The notification contains the following information.<br /><br /> Model<br /><br /> Version<br /><br /> Prior and new status of the version<br /><br /> Notification issued time<br /><br /> For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md). |
| Changeset status changes | Each time a changeset status changes for an entity that requires approval, entity administrators and/or change set owners receive notifications automatically. The notification contains the following information.<br /><br /> Model<br /><br /> Version<br /><br /> Changeset Name<br /><br /> Prior Status<br /><br /> New Status<br /><br /> Link to apply the changeset in order to view and modify the pending changes.<br /><br /> For more information, see [Changesets (Master Data Services)](changesets-master-data-services.md) |
  
## System Settings  
 There are settings in  Master Data Services Configuration Manager 
 that affect notifications. You can adjust these settings in  Master Data Services Configuration Manager 
 or directly in the System Settings table in the  Master Data Services 
 database. For more information, see [System Settings (Master Data Services)](system-settings-master-data-services.md).  
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Configure  Master Data Services |
 | to send email notifications. | [Configure Email Notifications (Master Data Services)](configure-email-notifications-master-data-services.md) |
| Configure  Master Data Manager |
 | to send notifications when attribute values change. | [Configure Business Rules to Send Notifications (Master Data Services)](configure-business-rules-to-send-notifications-master-data-services.md) |
  
## Related content

- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
- [Versions (Master Data Services)](versions-master-data-services.md)
