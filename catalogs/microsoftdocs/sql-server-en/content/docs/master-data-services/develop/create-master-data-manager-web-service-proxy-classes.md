---
title: Create Master Data Manager Web Service Proxy Classes
description: Create Master Data Manager Web Service Proxy Classes
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: reference
ms.custom:
  - build-2025
---
# Create Master Data Manager Web Service Proxy Classes


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  The  Master Data Manager 
 web service lets you make programmatic use of the features of  Master Data Services 
 from any computer that can access your  Master Data Manager 
 web site. Before you can start writing code to access the web service, you must generate proxy classes. The main proxy class you use to perform web service operations is the [Microsoft.MasterDataServices.ServiceClient](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient) class, which implements the [Microsoft.MasterDataServices.IService](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.IService) interface.  
  
## Enable Web Service Metadata Publishing  
 Before you can generate proxy classes, you must enable web service metadata publishing. Follow these steps to do this:  
  
1.  Open the  Master Data Services 
 Web.config file in a text editor. This file is in the WebApplication folder of the  Master Data Services 
 installation path.  
  
2.  Find the **mdsWsHttpBehavior** section under **\<serviceBehaviors>**. For the **\<serviceMetadata>** element, set **httpGetEnabled** to **true**.  
  
    > **Note:**  
    >  If you want to enable Web services over Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), set **httpsGetEnabled** to **true** in the **mdsWsHttpBehavior** section of the web.config file. You also need to change **mdsWsHTTPBinding** so that it is configured for TLS, as well, and comment out the non-TLS section.  
  
3.  Save changes to the file.  
  
4.  Test metadata publishing by browsing to the service URL, for example: `https://yourserver/MDS/service/service.svc`. If metadata publishing is enabled, a page is displayed that begins with   
    "You have created a service."  
  
## Creating Proxy Classes by Using Visual Studio  
 If you have Visual Studio 2010 installed, the simplest way to generate proxy classes is to add a **Service Reference** to your project. The address of the service reference is the URL of the  Master Data Manager 
 web application, appended with /service/service.svc. For example: `https://yourserver/MDS/service/service.svc`. For more information, see [How to: Add, Update, or Remove a Service Reference](https://learn.microsoft.com/previous-versions/bb628652\(v=vs.140\)).  
  
## Creating Proxy Classes by Using Svcutil.exe  
 You must have either  Microsoft 
  Visual Studio 
 or the  Microsoft 
 Windows SDK installed in order to have Svcutil.exe on your computer. If you use  Visual Studio 
, you must use the  Visual Studio 
 command prompt to run the command. For more information, see [ServiceModel Metadata Utility Tool (Svcutil.exe)](https://learn.microsoft.com/dotnet/framework/wcf/servicemodel-metadata-utility-tool-svcutil-exe) and [Generating a WCF Client from Service Metadata](https://learn.microsoft.com/dotnet/framework/wcf/feature-details/generating-a-wcf-client-from-service-metadata).  
  
 To create a set of C# proxy classes by using Svcutil.exe, use a command such as the following:  
  
```  
svcutil.exe https://<server_name:port>/<virtual_path>/Service/Service.svc   
/out:<proxy_name>.cs /messageContract /tcv:Version35   
/noconfig /ct:System.Collections.ObjectModel.Collection`1   
/namespace:*,Microsoft.MasterDataServices  
```  
  
 Where:  
  
-   *servername*:*port* are the computer name and port number of the computer that hosts  Master Data Manager 
.  
  
-   *virtual_path* is the virtual path of  Master Data Manager 
 in Internet Information Services (IIS).  
  
-   *proxy_name* is the name for the generated proxy file.  
  
## Related content

- [Categorized Web Service Operations (Master Data Services)](categorized-web-service-operations-master-data-services.md)
