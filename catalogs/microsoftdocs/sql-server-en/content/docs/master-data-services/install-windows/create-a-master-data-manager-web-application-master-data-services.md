---
title: Create Master Data Manager Web Application
description: The Master Data Manager web application provides an interface for users to work with master data and for administrators to configure and administer MDS.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Create a master data manager web application (Master Data Services)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  The  Master Data Manager 
 web application provides an interface for users to work with master data and for administrators to configure and administer MDS.  
  
 A web application must always be contained by a website. To create a web application, you must either:  
  
-   Use the Default website and then create the web application,  
  
-   Use an existing website and then create the web application, or  
  
-   Create a new website, which automatically creates a web application.  
  
 After you create the web application, you associate it with the  Master Data Services 
 database.  
  
## Prerequisites  
  
-   For information about the requirements for the computer that hosts the web application, see [Web Application Requirements (Master Data Services)](web-application-requirements-master-data-services.md).  
  
## To create a Master Data Manager web application in a new website  
 When you create a new website, the root web application is the  Master Data Manager 
 web application. The web application is also added to a new application pool.  
  
> **Note:**  
>  If you follow this procedure, you cannot specify a virtual path and alias of the  Master Data Manager 
 web application. If you want to specify a virtual path and alias for  Master Data Manager 
, you must create a web application in an existing website that is not already configured as a  Master Data Manager 
 web application.  
  
 Additionally,  Master Data Services Configuration Manager 
 supports creating sites with HTTP bindings only. To add an HTTPS binding, create a new site and application in  Master Data Services Configuration Manager 
 and then see [Secure a Master Data Manager Web Application](secure-a-master-data-manager-web-application.md) for more information.  
  
#### To create a Master Data Manager web application in a new website  
  
1.  Open  Master Data Services Configuration Manager 
.  
  
2.  In the left pane, click **Web Configuration**.  
  
3.  On the **Web Configuration** page, in the Website list, select **Create new website**.  
  
4.  On the **Create Website** dialog box, specify information for a new website. For more information about the user interface (UI) options in the dialog box, see [Create Website Dialog Box &#40;Master Data Services Configuration Manager&#41;](../master-data-services-overview-mds.md).  
  
5.  Click **OK**.  
  
## To create a Master Data Manager web application in an existing website  
 When you create a web application in an existing website, you can choose the virtual path and alias of the web application. The web application is added to a new application pool.  
  
#### To create a Master Data Manager web application in an existing website  
  
1.  Open  Master Data Services Configuration Manager 
.  
  
2.  In the left pane, click **Web Configuration**.  
  
3.  On the **Web Configuration** page, from the **Website** list, select the website in which you want to create the  Master Data Manager 
 web application.  
  
4.  Click **Create Application**.  
  
5.  On the **Create Web Application** dialog box, specify information for a new web application. For more information about the user interface (UI) options in the dialog box, see [Create Web Application Dialog Box &#40;Master Data Services Configuration Manager&#41;](../master-data-services-overview-mds.md).  
  
6.  Click **OK**.  
  
## Related content

- [Installation Tasks for Master Data Services](install-master-data-services.md)
- [Associate a Master Data Services Database and Web Application](associate-a-master-data-services-database-and-web-application.md)
- [Secure a Master Data Manager Web Application](secure-a-master-data-manager-web-application.md)
