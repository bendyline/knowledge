---
title: "Communicating with SQL Server (ODBC)"
description: Learn how an ODBC application communicates with an instance of SQL Server by using connections and connection resources.
author: markingmyname
ms.author: maghan
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client ODBC driver, communicating with SQL Server"
  - "ODBC applications, communicating with SQL Server"
  - "ODBC, communicating with SQL Server"
---
# Communicating with SQL Server (ODBC)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  For an ODBC application to communicate with an instance of  Microsoft 
  SQL Server 
, it must allocate environment and connection handles and connect to the data source. After a connection is established, the application can send queries to the server and process any result sets. When the application has finished using the data source, it disconnects from the data source and frees the connection handle. When the application has freed all its connection handles, it frees the environment handle.  
  
 An application can connect to any number of data sources. The application can use a combination of drivers and data sources, the same driver and a combination of data sources, or even the same driver and multiple connections to the same data source.  
  
 You can download  SQL Server 
 Native Client ODBC samples from the [SQL Server Downloads](../../connect/odbc/download-odbc-driver-for-sql-server.md).  
  
## In This Section  
  
-   [Allocating an Environment Handle](allocating-an-environment-handle.md)  
  
-   [Allocating a Connection Handle](allocating-a-connection-handle.md)  
  
-   [SQL Server Native Client ODBC Data Sources](sql-server-native-client-odbc-data-sources.md)  
  
-   [Connecting to a Data Source (ODBC)](connecting-to-a-data-source-odbc.md)  
  
-   [Disconnecting from a Data Source](disconnecting-from-a-data-source.md)  
  
## Related content

- [SQL Server Native Client (ODBC)](../native-client/odbc/sql-server-native-client-odbc.md)
- [SQLSetEnvAttr](../native-client-odbc-api/sqlsetenvattr.md)
