---
title: sysssispackages (Transact-SQL)
description: sysssispackages (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: makromer, maghan
ms.date: 06/10/2016
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
f1_keywords:
  - "sysdtspackages90_TSQL"
  - "sysdtspackages90"
helpviewer_keywords:
  - "sysssispackages system table"
dev_langs:
  - TSQL
---
# sysssispackages (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each package that is saved to  Microsoft 
  SQL Server 
. This table is stored in the **msdb** database.  
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **name** | **sysname** | The unique identifier of the package. |
| **id** | **uniqueidentifier** | The GUID of the package. |
| **description** | **nvarchar** | The optional description of the package. |
| **createdate** | **datetime** | The date the package was created. |
| **folderid** | **uniqueidentifier** | The GUID of the logical folder in which  SQL Server Management Studio |
 | lists the package. |
| **ownersid** | **varbinary** | The unique security identifier of the user who created the package. |
| **packagedata** | **image** | The package. |
| **packageformat** | **int** | The format in which the package is saved:<br /><br /> A value of 2 indicates that the package is saved in the  SQL Server 2005 (9.x) |
  | Integration Services |
 | format.<br /><br /> A value of 3 indicates that the package is saved in format of  SQL Server 2008 (10.0.x) |
  | Integration Services |
 | or later. |
| **packagetype** | **int** | The client that created the package. The possible values are as follows:<br /><br /> 0 (default value)<br /><br /> 1 ( SQL Server |
 | Import and Export Wizard)<br /><br /> 3 ( SQL Server |
 | Replication)<br /><br /> 5 ( SSIS |
 | Designer)<br /><br /> 6 (Maintenance Plan Designer or Wizard).<br /><br /> <br /><br /> Note that the values in this column correspond to the [Microsoft.SqlServer.Dts.Runtime.DTSPackageType](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DTSPackageType) enumeration. |
| **vermajor** | **int** | The latest major version of the package. |
| **verminor** | **int** | The latest minor version of the package. |
| **verbuild** | **int** | The latest build of the package. |
| **vercomments** | **nvarchar** | Comments about the package version. |
| **verid** | **uniqueidentifier** | The GUID of the package version. |
| **isencrypted** | **bit** | A Boolean that indicates whether the package is encrypted. |
| **readrolesid** | **varbinary** | The  SQL Server |
 | role that can load packages. |
| **writerolesid** | **varbinary** | The  SQL Server |
 | role that can save packages. |
  
## Related content

- [Integration Services (SSIS) Packages](../../integration-services/integration-services-ssis-packages.md)
