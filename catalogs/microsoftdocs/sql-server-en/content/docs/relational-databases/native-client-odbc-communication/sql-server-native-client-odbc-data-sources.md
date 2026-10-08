---
title: "ODBC Data Sources"
description: "SQL Server Native Client ODBC Data Sources"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "ODBC data sources, about data sources"
  - "ODBC data sources, names"
  - "data sources [SQL Server Native Client]"
  - "names [ODBC]"
  - "ODBC applications, data sources"
  - "SQL Server Native Client ODBC driver, data sources"
  - "ODBC data sources"
---
# SQL Server Native Client ODBC Data Sources

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  A  SQL Server 
 data source name (DSN) identifies an ODBC data source containing all of the information that an ODBC application needs to connect to a  SQL Server 
 database on a specific server. There are two ways you can define an ODBC data source name:  
  
-   On a client computer, open Administrative Tools in Control Panel, and double-click **Data Sources (ODBC)**. This will open the ODBC Data Source Administrator, which you can use to create a DSN.  
  
-   In an ODBC application, call [SQLConfigDataSource](../native-client-odbc-api/sqlconfigdatasource.md).  
  
 A  SQL Server 
 data source contains:  
  
-   The name of the data source.  
  
-   Any information needed to connect to a specific instance of  SQL Server 
.  
  
-   The default database to use on a specific instance of  SQL Server 
 (optional).  
  
-   Settings such as which ANSI options to use, whether to log performance statistics, and so on (optional).  
  
 An ODBC application is not required to connect through a data source. However, the application must provide the same connectivity information to an ODBC connect function that the driver would otherwise find in a DSN.  
  
## Related content

- [Communicating with SQL Server (ODBC)](communicating-with-sql-server-odbc.md)
