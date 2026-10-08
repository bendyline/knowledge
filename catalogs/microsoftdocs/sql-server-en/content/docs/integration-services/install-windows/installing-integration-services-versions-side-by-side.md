---
title: "Installing Integration Services Versions Side by Side"
description: "Installing Integration Services Versions Side by Side"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: install-set-up-deploy
ms.custom: intro-installation
helpviewer_keywords:
  - "interoperability and coexistence [Integration Services]"
  - "Integration Services, interoperability and coexistence"
---
# Installing Integration Services Versions Side by Side


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  You can install  SQL Server 2019 (15.x) 
 Integration Services (SSIS) side-by-side with earlier versions of SSIS. This topic describes some limitations of side-by-side installations.  
  
## Designing and maintaining packages  
 To design and maintain packages that target SQL Server 2016, SQL Server 2014, or SQL Server 2012, use SQL Server Data Tools (SSDT) for Visual Studio 2015. To get SSDT, see [Download Latest SQL Server Data Tools](../../ssdt/download-sql-server-data-tools-ssdt.md).  
  
 In the property pages for an Integration Services project, on the **General** tab of **Configuration Properties**, select the **TargetServerVersion** property and choose SQL Server 2016, SQL Server 2014, or SQL Server 2012.  
  
| Target version of SQL Server | Development environment for SSIS packages |
| --- | --- |
| 2016 | SQL Server Data Tools for Visual Studio 2015 |
| 2014 | SQL Server Data Tools for Visual Studio 2015<br /><br /> or<br /><br /> SQL Server Data Tools - Business Intelligence for Visual Studio 2013 |
| 2012 | SQL Server Data Tools for Visual Studio 2015<br /><br /> or<br /><br /> SQL Server Data Tools - Business Intelligence for Visual Studio 2012 |
| 2008 | Business Intelligence Development Studio from SQL Server 2008 |
  
 When you add an existing package to an existing project, the package is converted to the format targeted by the project .  
  
## Running packages  
 You can use the  SQL Server 2019 (15.x) 
 version of the **dtexec** utility or of  SQL Server 
 Agent to run Integration Services packages created by earlier versions of the development tools. When these  SQL Server 2019 (15.x) 
 tools load a package that was developed in an earlier version of the development tools, the tool temporarily converts the package in memory to the package format that  SQL Server 2019 Integration Services (SSIS) 
 uses. If the package has issues that prevent a successful conversion, the  SQL Server 2019 (15.x) 
 tool can't run the package until those issues are resolved. For more info, see [Upgrade Integration Services Packages](upgrade-integration-services-packages.md).
