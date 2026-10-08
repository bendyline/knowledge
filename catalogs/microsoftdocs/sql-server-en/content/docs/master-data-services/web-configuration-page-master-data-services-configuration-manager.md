---
title: Web Configuration Page
description: Web Configuration Page (Master Data Services Configuration Manager)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
f1_keywords:
  - "sql13.mds.configmanager.webconfigpg.f1"
---
# Web Configuration Page (Master Data Services Configuration Manager)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Use the **Web Configuration** page to configure a website and web application. You can also enable Data Quality Services.  
  
## Configure the Web Application  
  
| Control Name | Description |
| --- | --- |
| **Website** | Either create a new website, select the default website, or select another available site (if listed). This list displays the websites that are defined in Internet Information Services (IIS) on the local computer. When you create a new website, a new web application is automatically created. When you select the default or another existing site, you must create an application manually. |
| **Web application** | Select a  Master Data Manager |
 | web application for configuration. This box shows the  Master Data Manager |
 | web applications in the selected website only.<br /><br /> If nothing is displayed, click **Create** to create a website. |
| **Create** | Opens the **Create Web Application** dialog box from which you create a  Master Data Manager |
 | web application in the selected site. This button is enabled only when the selected site has no root web application configured as the  Master Data Manager |
 | web application. |
  
## Associate Application with Database  
  
| Control Name | Description |
| --- | --- |
| **Select** | Opens the **Connect to Server** dialog box from which you connect to a  SQL Server |
 | instance and select a  Master Data Services |
 | database to associate with the selected  Master Data Manager |
 | web application. |
| **SQL Server instance** | Displays the name of the selected  SQL Server |
 | instance that hosts the  Master Data Services |
 | database. This is blank until you connect to a  SQL Server |
 | instance and select a database. |
| **Database** | Displays the name of the  Master Data Services |
 | database that is associated with the selected  Master Data Manager |
 | web application. This is blank until you connect to a  SQL Server |
 | instance and select a database. |
  
## Enable DQS Integration  
  
| Control Name | Description |
| --- | --- |
| **Enable integration with Data Quality Services** | Select this option to enable the Data Quality functionality available in the  Master Data Services |
  | Add-in for Excel |
| . For more information, see [Enable Data Quality Services Integration with Master Data Services](install-windows/enable-data-quality-services-integration-with-master-data-services.md). |
  
## Related content

- [Master Data Services Installation and Configuration](master-data-services-installation-and-configuration.md)
- [Web application requirements (Master Data Services)](install-windows/web-application-requirements-master-data-services.md)
- [Create a master data manager web application (Master Data Services)](install-windows/create-a-master-data-manager-web-application-master-data-services.md)
