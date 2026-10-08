---
title: "MSSQLSERVER_50000"
description: An error from an attempt was made to install or update SQL Server Native Client. See an explanation of the error and possible resolutions.
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "50000 [SQL Server Native Client setup error]"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Error MSSQLSERVER_50000 in SQL Server Native Client 

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





    
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Product Version | 11.0 |
| Event ID | 50000 |
| Event Source | SETUP |
| Component | SQL Server |
 | Native Client |
| Symbolic Name |  |
| Message Text | A network error occurred while attempting to read from the file '%.*ls'. |
  
## Explanation  
 An attempt was made to install (or update)  SQL Server 
 Native Client on a computer where  SQL Server 
 Native Client is already installed, and where the existing installation was from an MSI file that was renamed from sqlncli.msi.  
  
## User Action  
 To resolve this error, uninstall the existing version of  SQL Server 
 Native Client. To prevent this error, do not install  SQL Server 
 Native Client from an MSI file that is not named sqlncli.msi.  
  
## Internal-Only
