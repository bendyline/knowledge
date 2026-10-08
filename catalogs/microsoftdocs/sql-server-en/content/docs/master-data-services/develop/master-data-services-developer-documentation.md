---
title: Developer Documentation
description: Master Data Services Developer Documentation
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: reference
ms.custom:
  - build-2025
---
# Master Data Services Developer Documentation


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Find information about how to write code to customize the way you and your users interact with  Master Data Services 
. Learn how to:  
  
-   Write a program that accesses the  Master Data Manager 
 web service. The  Master Data Manager 
 web service is a Windows Communication Foundation (WCF) service that developers use to control  Master Data Services 
 features through code.  
  
-   Incorporate  Master Data Services 
 features into existing applications.  
  
-   Write code to perform repetitive or complex actions that are difficult or impossible to do with the  Master Data Manager 
 UI.  
  
-   Create a custom workflow that executes in response to a business rule you specify. A custom workflow calls code that you write, which can take whatever action you require to process the workflow.  
  
## Master Data Manager Web Service  
 The  Master Data Manager 
 web service lets you make programmatic use of the features of  Master Data Services 
 from any computer that can access your  Master Data Manager 
 web site. Before you can start writing code to access the web service, you must generate proxy classes, which are contained in a namespace that you specify. This documentation uses [Microsoft.MasterDataServices](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices) as the proxy namespace. The main proxy class you use to perform web service operations is the [Microsoft.MasterDataServices.ServiceClient](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient) class, which implements the [Microsoft.MasterDataServices.IService](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.IService) interface. From your code, call methods of the [Microsoft.MasterDataServices.ServiceClient](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient) class to access the  Master Data Manager 
 web service. The remainder of the classes in the namespace are used by the web service operations.  
  
### Web Service Content  
 [Create Master Data Manager Web Service Proxy Classes](create-master-data-manager-web-service-proxy-classes.md)  
 Describes how to enable metadata publishing from the  Master Data Manager 
 web site and how to create proxy classes that can be used to programmatically access the web service operations.  
  
 [Categorized Web Service Operations (Master Data Services)](categorized-web-service-operations-master-data-services.md)  
 A categorized list of the web service operations of the [Microsoft.MasterDataServices.ServiceClient](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient) class.  
  
## Custom Workflows  
  Master Data Services 
 uses business rules to create basic workflow solutions. You can automatically update and validate data and have e-mail notifications sent based on conditions you specify. Business rules in  Master Data Services 
 are intended to manage the most common workflow scenarios. If your workflow requires more complex event processing, such as multi-tiered approvals or complex decision trees, you can configure  Master Data Services 
 to send data to a custom assembly that you create. To handle custom workflows, you must configure and start SQL Server MDS Workflow Integration Service on the web application computer, and create an assembly that implements the [MasterDataServices.WorkflowTypeExtender.IWorkflowTypeExtender](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/hh758785\(v=sql.130\)) interface.  
  
### Custom Workflow Content  
 [Create a Custom Workflow (Master Data Services)](create-a-custom-workflow-master-data-services.md)  
 Instructions on how to create a workflow handler assembly, how to configure and start SQL Server MDS Workflow Integration Service, and how to create a business rule in  Master Data Manager 
 that starts a custom workflow.  
  
## Web Server Namespaces  
  Master Data Services 
 installs a set of assemblies on the web server computer. These assemblies contain namespaces that can be used for advanced scenarios that customize the behavior of the web server computer. The following table describes these namespaces.  
  
| Namespace | Description |
| --- | --- |
| [Microsoft.MasterDataServices.Deployment](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/ff487448\(v=sql.130\)) | Contains classes that can be used to create a deployment package from a model and to deploy a package into a  Master Data Services |
 | database. |
| [Microsoft.MasterDataServices.Services](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.Services) | Contains a class that receives and processes web service operations made to the web server computer through the  Master Data Manager |
 | web application. |
| [Microsoft.MasterDataServices.Services.DataContracts](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.Services.DataContracts) | Contains classes that define how data is passed from the client computer through the  Master Data Manager |
 | web application to the web server computer. |
| [Microsoft.MasterDataServices.Services.MessageContracts](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.Services.MessageContracts) | Contains classes that define how requests and responses are passed from the client computer through the  Master Data Manager |
 | web application to the web server computer. |
| [Microsoft.MasterDataServices.Services.ServiceContracts](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.Services.ServiceContracts) | Contains the interface that defines the operations that can be called through the  Master Data Manager |
 | web service. |
