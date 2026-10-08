---
title: Associate Database and Web Application
description: In SQL Server, you can associate a Master Data Manager web application with a Master Data Services database to specify the database to use for web operations.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Associate a Master Data Services Database and Web Application


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Associate your  Master Data Manager 
 web application with a  Master Data Services 
 database to specify the database to use for web operations.  
  
## Prerequisites  
  
-    Master Data Services Configuration Manager 
 must be installed on the local computer. For more information, see [Install Master Data Services](install-master-data-services.md).  
  
-   A local  Master Data Manager 
 web application must exist. For more information, see [Create a Master Data Manager Web Application (Master Data Services)](create-a-master-data-manager-web-application-master-data-services.md).  
  
-   Either a local or remote  Master Data Services 
 database must exist. For more information, see [Create a Master Data Services Database](create-a-master-data-services-database.md).  
  
### To associate a Master Data Services database and web application  
  
1.  Open  Master Data Services Configuration Manager 
.  
  
2.  In the left pane, click **Web Configuration**.  
  
3.  On the **Web Configuration** page, under **Web application**, from the **Website** list, select the website that contains your  Master Data Manager 
 web application.  
  
4.  In the **Web application** box, select the web application that hosts  Master Data Manager 
.  
  
5.  Under **Associate Application with Database**, click **Select**. The **Connect to Database** dialog box opens.  
  
6.  Specify connection information for the instance of  SQL Server 
 that hosts the  Master Data Services 
 database, and click **Connect**.  
  
7.  From the **Master Data Services database** list, select the database you want to associate the web application with and then click **OK**.  
  
8.  Under **Associate Application with Database**, verify that the instance and database information are correct, and then click **Apply**.  
  
## Related content

- [Installation Tasks for Master Data Services](install-master-data-services.md)
- [Web Configuration Page (Master Data Services Configuration Manager)](../web-configuration-page-master-data-services-configuration-manager.md)
- [Create Master Data Manager Web Service Proxy Classes](../develop/create-master-data-manager-web-service-proxy-classes.md)
- [Administrators (Master Data Services)](../administrators-master-data-services.md)
- [Users and Groups (Master Data Services)](../users-and-groups-master-data-services.md)
