---
title: "Data Sources"
description: "Data Sources for  Integration Services 
 packages"
ms.date: "08/27/2016"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "data sources [Integration Services], about data sources"
---
# Data Sources for  Integration Services 
 packages


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


   SQL Server Data Tools (SSDT) 
 includes a design-time object that you can use in  Microsoft 
  Integration Services 
 packages: the data source.  
  
 A data source object is a reference to a connection, and at a minimum, it includes a connection string and a data source identifier. It can also include additional metadata such a description, a name, a user name, and a password.  
  
> **Note:**  
> You can add data sources only to projects that are configured to use the package deployment model. If a project is configured to use the project deployment model, you use connection managers created at the project level to share connections, in place of using data sources.  
>   
>  For more information about the deployment models, see [Deployment of Projects and Packages](../packages/deploy-integration-services-ssis-projects-and-packages.md). For more information about converting a project to the project deployment model, see [Deploy Projects to Integration Services Server](../packages/deploy-integration-services-ssis-projects-and-packages.md).  
  
 The advantages of using data sources in  Integration Services 
 packages include the following:  
  
-   A data source has project scope, which means that a data source created in an  Integration Services 
 project is available to all the packages in the project. A data source can be defined one time and then referenced by connection managers in multiple packages.  
  
-   A data source offers synchronization between the data source object and its package references. If the data source and the packages that reference it reside in the same project, the connection string property of the data source references is automatically updated when the data source changes.  
  
## Reference Data Sources  
 To add a data source object to an  Integration Services 
 project, right-click the **Data Sources** folder in **Solution Explorer** and then click **New Data Source**. The item is added to the **Data Sources** folder. If you want to use data source objects that were created in other projects, you must first add them to the project.  
  
 You use a data source object in a package by adding a connection manager that references the data source object to the package. You can add it to the package before you build the package control flow and data flows, or as a step in constructing the control flow or data flow.  
  
 A data source object represents a simple connection to a data source and provides access to the objects in the data store that it references. For example, a data source object that connects to the  SQL Server 
 AdventureWorks Sample Database includes all 60 tables from the database.  
  
 There is no dependency between a data source and the connection managers that reference it. If a data source is no longer part of the project, the packages continue to be valid, because information about the data source, such as its connection type and connection string, is included in the package definition.
