---
title: "Enable or Disable Profiling Notifications in DQS"
description: "Enable or Disable Profiling Notifications in DQS"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: how-to
helpviewer_keywords:
  - "enable notifications"
  - "notifications,enable"
  - "notifications,disable"
ms.custom:
  - build-2025
---
# Enable or Disable Profiling Notifications in DQS


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


  This topic describes how to enable or disable profiling notifications in  Data Quality Services 
 (DQS). By default, profiling notifications are enabled in DQS. Profiling notifications tell you important facts about the data source and the effectiveness of the current activity performed on the data. For more information, see [Data Profiling and Notifications in DQS](data-profiling-and-notifications-in-dqs.md).  
  
<a id="BeforeYouBegin"></a>
<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

You must have the dqs_administrator role on the DQS_MAIN database to enable notifications.  
  
##  <a name="Enable"></a> Enable or Disable Profiling Notifications  
  
1.   Start Data Quality Client. For information about doing so, see 
 [Run the Data Quality Client Application](run-the-data-quality-client-application.md).  
  
2.  In the  Data Quality Client 
 home screen, click **Configuration**.  
  
3.  Next, click the **General Settings** tab.  
  
4.  Clear or select the **Enable Notifications** check box to disable or enable profiling notifications for various activities in DQS.  
  
5.  Click **Close**.
