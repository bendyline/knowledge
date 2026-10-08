---
title: "Development and Management Tools"
description: "Integration Services (SSIS) Development and Management Tools"
ms.reviewer: 
ms.date: 10/14/2022
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "studio environments [Integration Services]"
  - "tools [Integration Services], Business Intelligence Development Studio"
  - "Business Intelligence Development Studio, Integration Services in"
  - "SQL Server Management Studio [Integration Services]"
  - "SSIS, studio environments"
  - "SQL Server Integration Services, studio environments"
  - "tools [Integration Services], SQL Server Management Studio"
---

# Integration Services (SSIS) Development and Management Tools


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory

 Integration Services 
 includes two studios for working with packages:

-  SQL Server Data Tools (SSDT) 
 for developing the  Integration Services 
 packages that a business solution requires.  SQL Server Data Tools (SSDT) 
 provides the  Integration Services 
 project in which you create packages.

-  SQL Server Management Studio 
 for managing packages in a production environment.

## SQL Server Data Tools

Working in  SQL Server Data Tools (SSDT) 
, you can perform the following tasks:

- Run the  SQL Server 
 Import and Export Wizard to create basic packages that copy data from a source to a destination.

- Create packages that include complex control flow, data flow, event-driven logic, and logging.

- Test and debug packages by using the troubleshooting and monitoring features in  SSIS 
 Designer, and the debugging features in  SQL Server Data Tools (SSDT) 
.

- Create configurations that update the properties of packages and package objects at run time.

- Create a deployment utility that can install packages and their dependencies on other computers.

- Save copies of packages to the  SQL Server 
 `msdb` database, the  SSIS 
 Package Store, and the file system.

For more information about  SQL Server Data Tools (SSDT) 
, see [SQL Server Data Tools](../ssdt/download-sql-server-data-tools-ssdt.md).

## SQL Server Management Studio

 SQL Server Management Studio 
 provides the  Integration Services 
 service that you use to manage packages, monitor running packages, and determine impact and data lineage for  Integration Services 
 and  SQL Server 
 objects.

Working in  SQL Server Management Studio 
, you can perform the following tasks:

- Create folders to organize packages in a way that is meaningful to your organization.

- Run packages that are stored on the local computer by using the Execute Package utility.

- Run the Execute Package utility to generate a command line to use when you run the **dtexec** command prompt utility (dtexec.exe).

- Import and export packages to and from the  SQL Server 
 `msdb` database, the  SSIS 
 Package Store, and the file system.
