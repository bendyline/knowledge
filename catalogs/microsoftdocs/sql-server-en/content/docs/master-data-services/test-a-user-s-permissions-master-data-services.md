---
title: "Test a User's Permissions"
description: "Test a User's Permissions (Master Data Services)"
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Test a User's Permissions (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, you can create a test user and log into the web application to test permissions.When a user attempts to access the  Master Data Manager 
 URL, the user's credentials are authenticated. In Internet Explorer, security settings control whether this occurs automatically or if the user must enter a user name and password. To change these settings, complete the following steps:  
  
### To test a user's security  
  
1.  In Internet Explorer 7 and later, click **Tools**, **Internet Options**, and then click the **Security** tab.  
  
2.  Click **Local Intranet** and then the **Custom Level** button.  
  
3.  In the **User Authentication** section, choose **Prompt for user name and password**.  
  
4.  The next time you open the browser window, you will be prompted for a user name and password.  
  
## Related content

- [Security (Master Data Services)](security-master-data-services.md)
