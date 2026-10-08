---
title: "Integration Services (SSIS) Server and Catalog"
description: "Integration Services (SSIS) Server and Catalog"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "packages [Integration Services], managing"
  - "managing packages [Integration Services]"
---
# Integration Services (SSIS) Server and Catalog


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  After you design and test packages in  SQL Server Data Tools 
, you can deploy the projects that contain the packages to the  Integration Services 
 server.  
  
 The  Integration Services 
 server is an instance of the  SQL Server Database Engine 
 that hosts the **SSISDB** database. The database stores the following objects: packages, projects, parameters, permissions, server properties, and operational history.  
  
 The **SSISDB** database exposes the object information in public views that you can query. The database also provides stored procedures that you can call to manage the objects.  
  
 Before you can deploy the projects to the  Integration Services 
 server, you need to create the **SSISDB** catalog.  
  
 For an overview of the SSISDB catalog functionality, see [SSIS Catalog](ssis-catalog.md).  
  
## High Availability  
 Like other user databases, the **SSISDB** database supports database mirroring and replication. For more information about mirroring and replication, see [Database Mirroring &#40;SQL Server&#41;](../../database-engine/database-mirroring/database-mirroring-sql-server.md).  
  
 You can also provide high-availability of SSISDB and its contents by making use of SSIS and Always On Availability Groups. For more information, see [Always On for SSIS Catalog (SSISDB](ssis-catalog.md#always-on-for-ssis-catalog-ssisdb). Also see this blog post by Matt Masson, [SSIS with Always On](https://techcommunity.microsoft.com/t5/sql-server-integration-services/ssis-with-alwayson/ba-p/388091), at blogs.msdn.com.  
  
##  <a name="ssms"></a> Integration Services Server in SQL Server Management Studio  
 When you connect to an instance of the  SQL Server Database Engine 
 that hosts the **SSISDB** database, you see the following objects in Object Explorer:  
  
-   **SSISDB Database**  
  
     The **SSISDB** database appears under the **Databases** node in Object Explore. You can query the views and call the stored procedures that manage the  Integration Services 
 server and the objects that are stored on the server.  
  
-   **Integration Services Catalogs**  
  
     Under the **Integration Services Catalogs** node there are folders for  Integration Services 
 projects and environments.  
  
## Related Tasks  
  
-   [View the List of Packages on the Integration Services Server](view-the-list-of-packages-on-the-integration-services-server.md)  
  
-   [Deploy Integration Services (SSIS) Projects and Packages](../packages/deploy-integration-services-ssis-projects-and-packages.md)  
  
-   [Run Integration Services (SSIS) Packages](../packages/run-integration-services-ssis-packages.md)  
  
## Related content

- [SSIS with Always On](https://techcommunity.microsoft.com/t5/sql-server-integration-services/ssis-with-alwayson/ba-p/388091)
