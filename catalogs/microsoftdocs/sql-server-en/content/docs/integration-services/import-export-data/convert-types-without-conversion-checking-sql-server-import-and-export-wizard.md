---
title: "Convert Types no Conversion Checking (SQL Server Import-Export Wizard)"
description: "Convert Types without Conversion Checking (SQL Server Import and Export Wizard)"
ms.date: "01/11/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
f1_keywords:
  - "sql13.dts.impexpwizard.nomappingfile.f1"
---
# Convert Types without Conversion Checking (SQL Server Import and Export Wizard)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  After you select the existing tables and views to copy or review the query that you provided, the  SQL Server 
 Import and Export Wizard may show **Convert Types without Conversion Checking**. The wizard shows this page when it can't locate one or more of the data type conversion and mapping files that it needs to map data types between your source and destination. The page includes information that helps you to understand what's missing.
  
 Click **Next** to continue without knowing whether data type conversions will succeed. Otherwise, click **Back** to change your selections, or click **Cancel** to exit the wizard.

## Screen shot of the Convert Types page  
  
The following screen shot shows an example of the **Convert Types without Conversion Checking** page of the Wizard.

Convert types

The problem here is that the wizard can't find a mapping file that maps data types for the destination you selected.

The info on this page doesn't include the name of the missing mapping file. Since the wizard doesn't know whether a file exists for the specified data provider, it can't provide a name for the missing file.

## What's next?  
 After you click **Next** to continue without knowing whether data type conversions will succeed, the next page is **Save and Run Package**. On this page, you specify whether you want to run the copy operation immediately. Depending on your configuration, you may also be able to save the  SQL Server 
  Integration Services 
 package created by the wizard  to customize it and to reuse it later. For more info, see [Save and Run Package](save-and-run-package-sql-server-import-and-export-wizard.md).  

## Related content

- [Data Type Mapping in the SQL Server Import and Export Wizard](data-type-mapping-in-the-sql-server-import-and-export-wizard.md)
