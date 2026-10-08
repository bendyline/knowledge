---
title: Secure a Master Data Manager Web Application
description: In SQL Server, you can secure the Master Data Manager web application with HTTPS. You must be an administrator and MDS must be installed on the web server.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Secure a Master Data Manager Web Application


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  You can secure the  Master Data Manager 
 web application with HTTPS.  
  
> **Note:**  
>  The  Master Data Manager 
 web application can use either HTTP or HTTPS, but not both.  
  
## Prerequisites  
 To perform the procedure:  
  
-   You must be an administrator on the web server where  Master Data Manager 
 is installed.  
  
-   MDS must be installed on the web server, and a web application must exist. For more information, see [Install Master Data Services](install-master-data-services.md) and [Create a Master Data Manager Web Application (Master Data Services)](create-a-master-data-manager-web-application-master-data-services.md).  

- [IIS Extended Protection for Windows authentication](https://learn.microsoft.com/iis/configuration/system.webserver/security/authentication/windowsauthentication/extendedprotection/) should not be enabled. 

- Configure the web server to listen on all available IP addresses. Do not configure the Web server to listen on a specific IP address. 

### To secure the Master Data Manager web application with HTTPS  
  
1.  After you have confirmed that the  Master Data Manager 
 web application is configured correctly with HTTP, create a certificate in IIS. For more information, see [Configuring Server Certificates in IIS 7](https://technet.microsoft.com/library/cc732230\(WS.10\).aspx).  
  
2.  In the **Connections** pane, under **Sites**, click the site that hosts the  Master Data Manager 
 web application.  
  
3.  In the **Actions** pane, click **Bindings**.  
  
4.  Click **Add**.  
  
5.  From the list, select **https**.  
  
6.  Select the TLS/SSL certificate.  
  
7.  Click **OK**.  
  
8.  Optional. To remove HTTP so that users can access the site with HTTPS only, from the list, click the row with **http**. Click **Remove** and on the confirmation dialog box, click **Yes**.  
  
    > **Important:**  
    >  You must change basicHttp and wsHttpBinding configurations after removing HTTP.  
  
9. To close the **Site Bindings** dialog box, click **Close**.  
  
10. Now open the web.config file from *drive*:\Program Files\Microsoft SQL Server\130\Master Data Services\WebApplication.  
  
11. Find the string `<security mode="Message">` and change it to `<security mode="Transport">`.  

12. Change `<serviceMetadata httpGetEnable="true" httpsGetEnabled="false">` to `<serviceMetadata httpGetEnable="false" httpsGetEnabled="true">` to prevent issues that may appear in the Silverlight client.

13. Save and close the file. If you get an error, it could be because you have UAC enabled. Users should now be able to use HTTPS to access the site.  

  
## Related content

- [Create a master data manager web application (Master Data Services)](create-a-master-data-manager-web-application-master-data-services.md)
