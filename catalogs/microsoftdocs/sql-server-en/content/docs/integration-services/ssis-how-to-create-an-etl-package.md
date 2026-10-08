---
title: "SSIS How to Create an ETL Package"
description: "SSIS How to Create an ETL Package"
ms.date: 09/17/2024
ms.service: sql
ms.subservice: integration-services
ms.topic: quickstart
ms.custom:
  - intro-quickstart
helpviewer_keywords:
  - "SSIS, tutorials"
  - "packages [Integration Services], tutorials"
  - "Integration Services, tutorials"
  - "SQL Server Integration Services, tutorials"
  - "logs [Integration Services], tutorials"
  - "walkthroughs [Integration Services]"
---
# SSIS How to Create an ETL Package


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory

In this tutorial, you learn how to use  SSIS 
 Designer to create a  Microsoft 
  SQL Server 
  Integration Services 
 package. The package that you create takes data from a flat file, reformats the data, and then inserts the reformatted data into a fact table. In following lessons, the package is expanded to demonstrate looping, package configurations, logging, and error flow.

When you install the sample data for the tutorial, you also install the completed versions of the packages that you create in the lessons. By using the completed packages, you can skip ahead and begin the tutorial at a later lesson if you like. If this tutorial is your first time working with packages or the new development environment, we recommend that you begin with Lesson 1.

## What is SQL Server Integration Services (SSIS)?

 Microsoft 
  SQL Server 
  Integration Services 
 (SSIS) is a platform for building high-performance data integration solutions, including extraction, transformation, and load (ETL) packages for data warehousing. SSIS includes graphical tools and wizards for building and debugging packages; tasks for performing workflow functions such as FTP operations, executing SQL statements, and sending e-mail messages; data sources and destinations for extracting and loading data; transformations for cleaning, aggregating, merging, and copying data; a management database, `SSISDB`, for administering package execution and storage; and application programming interfaces (APIs) for programming the  Integration Services 
 object model.

## What you will learn

The best way to become acquainted with the new tools, controls, and features available in  Microsoft 
  SQL Server 
  Integration Services 
 is to use them. This tutorial walks you through  SSIS 
 Designer to create an ETL package that includes looping, configurations, error flow logic, and logging.

## Prerequisites

This tutorial is intended for users familiar with fundamental database operations, but who have limited exposure to the new features available in  SQL Server 
  Integration Services 
.

To run this tutorial, you must have the following components installed:

-  SQL Server 
 and  Integration Services 
. To install SQL Server and SSIS, see [Install Integration Services](install-windows/install-integration-services.md).

- The  `AdventureWorksDW2025`  sample database. You can download the  `AdventureWorksDW2025`  database from [AdventureWorks sample databases](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) and restore the backup.

- The **sample data** files. The sample data is included with the  SSIS 
 lesson packages. To download the sample data and the lesson packages as a Zip file, see [SQL Server Integration Services Tutorial Files](https://www.microsoft.com/download/details.aspx?id=56827).

  - Most of the files in the Zip file are read-only to prevent unintended changes. To write output to a file or to change it, you might have to turn off the read-only attribute in the file properties.
  - The sample packages assume that the data files are located in the folder `C:\Program Files\Microsoft SQL Server\100\Samples\Integration Services\Tutorial\Creating a Simple ETL Package`. If you unzip the download to another location, you might have to update the file path in multiple places in the sample packages.

## Lessons in This Tutorial

[**Lesson 1: Create a Project and Basic Package with SSIS**](lesson-1-create-a-project-and-basic-package-with-ssis.md)  
In this lesson, you create a simple ETL package that extracts data from a single flat file, transforms the data using lookup transformations and finally loads the result into a fact table destination.

[**Lesson 2: Adding Looping with SSIS**](lesson-2-adding-looping-with-ssis.md)  
In this lesson, you expand the package you created in Lesson 1 to take advantage of new looping features to extract multiple flat files into a single data flow process.

[**Lesson 3: Add Logging with SSIS**](lesson-3-add-logging-with-ssis.md)  
In this lesson, you expand the package you created in Lesson 2 to take advantage of new logging features.

[**Lesson 4: Add Error Flow Redirection with SSIS**](lesson-4-add-error-flow-redirection-with-ssis.md)  
In this lesson, you expand the package you created in lesson 3 to take advantage of new error output configurations.

[**Lesson 5: Add SSIS Package Configurations for the Package Deployment Model**](lesson-5-add-ssis-package-configurations-for-the-package-deployment-model.md)  
In this lesson, you expand the package you created in Lesson 4 to take advantage of new package configuration options.

[**Lesson 6: Using Parameters with the Project Deployment Model in SSIS**](lesson-6-using-parameters-with-the-project-deployment-model-in-ssis.md)  
In this lesson, you expand the package you created in Lesson 5 to take advantage of using new parameters with the project deployment model.

## Related content

- [Lesson 1: Create a project and basic package with SQL Server Integration Services (SSIS)](lesson-1-create-a-project-and-basic-package-with-ssis.md)
