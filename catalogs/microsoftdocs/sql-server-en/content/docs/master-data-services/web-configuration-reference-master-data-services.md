---
title: Web Configuration Reference
description: Web Configuration Reference (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
  - sfi-ropc-nochange
helpviewer_keywords:
  - "web configuration file [Master Data Services]"
---
# Web Configuration Reference (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


   Master Data Services 
 uses a Web.config file to contain the configuration settings that enable Internet Information Services (IIS) to host the  Master Data Manager 
 Web application and the Web service. This Web.config file is located in the WebApplication folder of the  Master Data Services 
 installation path. For more information about the path and permissions, see [Folder and File Permissions (Master Data Services)](folder-and-file-permissions-master-data-services.md).  
  
## Web.Config Elements  
 The Web.config file contains a custom  Master Data Services 
 element, **\<masterDataServices>**, in addition to standard IIS, .NET Framework, ASP.NET, and Windows Communication Foundation (WCF) configuration elements. The following table describes the elements included in the Web.config file.  
  
| Configuration Element | Description |
| --- | --- |
| **masterDataServices** | Custom element. Connects the  Master Data Services |
 | Web service to a  Master Data Services |
 | database. |
| **connectionStrings** | ASP.NET element. For more information, see [connectionStrings Element (ASP.NET Settings Schema)](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bf7sd233\(v=vs.100\)) in the MSDN Library. |
| **system.web** | ASP.NET element. For more information, see [system.web Element (ASP.NET Settings Schema)](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/dayb112d\(v=vs.100\)) in the MSDN Library. |
| **startup** | .NET Framework element. For more information, see [\<startup> Element](https://learn.microsoft.com/dotnet/framework/configure-apps/file-schema/startup/startup-element) in the MSDN Library. |
| **runtime** | .NET Framework element. For more information, see [\<runtime> Element](https://learn.microsoft.com/dotnet/framework/configure-apps/file-schema/runtime/runtime-element) in the MSDN Library. |
| **system.codedom** | .NET Framework element. For more information, see [\<system.codedom> Element](https://learn.microsoft.com/dotnet/framework/configure-apps/file-schema/compiler/system-codedom-element) in the MSDN Library. |
| **system.web.extensions** | ASP.NET element. For more information, see [system.web.extensions Element (ASP.NET Settings Schema)](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb546044\(v=vs.100\)) in the MSDN Library. |
| **system.webServer** | Section group that contains IIS elements. For more information, see [system.webServer Section Group \[IIS 7 Settings Schema\]](https://learn.microsoft.com/previous-versions/iis/settings-schema/ms689429\(v=vs.90\)) in the MSDN Library. |
| **system.serviceModel** | WCF element. For more information, see [\<system.serviceModel>](https://learn.microsoft.com/dotnet/framework/configure-apps/file-schema/wcf/system-servicemodel) in the MSDN Library. |
| **system.diagnostics** | .NET Framework element. For more information, see [\<system.diagnostics> Element](https://learn.microsoft.com/dotnet/framework/configure-apps/file-schema/trace-debug/system-diagnostics-element) in the MSDN Library. |
| **appSettings** | ASP.NET element. For more information, see [appSettings Element (General Settings Schema)](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms228154\(v=vs.100\)) in the MSDN Library. |
  
## masterDataServices Element  
 The **\<masterDataServices>** element is a custom element that is used to connect a  Master Data Services 
 Web service to a  Master Data Services 
 database.  
  
### Syntax  
  
```  
<masterDataServices>  
   <instance virtualPath="path" siteName="name" connectionName="name" serviceName="name" />  
</masterDataServices>  
```  
  
### Elements and Attributes  
  
| Item | Description |
| --- | --- |
| **instance** | Child element. Contains attributes that specify information for the Web service and database connection string. |
| **virtualPath** | Attribute. Specifies the virtual path of the  Master Data Manager |
 | Web application and service. This corresponds to the **path** attribute of the **\<application>** element under the **\<site>** element in the IIS ApplicationHost.config file. |
| **siteName** | Attribute. Specifies the name of the site that hosts the  Master Data Manager |
 | Web application and service. This corresponds to the **name** attribute of the **\<site>** element under **\<sites>** in the IIS ApplicationHost.config file. |
| **connectionName** | Attribute. Specifies the name of the connection to use. This corresponds to the **name** attribute of the **\<add>** element under the **\<connectionStrings>** element in Web.config. |
| **serviceName** | Attribute. Specifies the name of the Web service. This corresponds to the **name** attribute of the **\<service>** element under the **\<services>** element in Web.config. |
  
### Example  
 The following example demonstrates a service named MDS1 on the Contoso site and /MDS path using a connection string specified by MDSDB.  
  
```  
<masterDataServices>  
   <instance virtualPath="/MDS" siteName="Contoso" connectionName="MDSDB" serviceName="MDS1" />  
</masterDataServices>  
```
