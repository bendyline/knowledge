---
title: "ODBC"
description: SQL Server supports ODBC, by using the SQL Server Native Client ODBC driver, as a native API for C and C++ applications that communicate with SQL Server.
author: markingmyname
ms.author: maghan
ms.date: "09/10/2026"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLNCLI, ODBC"
  - "SQL Server Native Client ODBC driver, about SQL Server Native Client ODBC driver"
  - "data access [SQL Server Native Client], ODBC"
  - "SQL Server Native Client ODBC driver"
  - "ODBC"
  - "SQL Server Native Client, ODBC"
  - "ODBC, about SQL Server Native Client ODBC driver"
---
# SQL Server Native Client (ODBC)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> [SQL Server Native Client](../sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


  ODBC is a standard definition of an application programming interface (API) used to access data in relational or indexed sequential access method (ISAM) databases.  SQL Server 
 supports ODBC, via the  SQL Server 
 Native Client ODBC driver, as one of the native APIs for writing C and C++ applications that communicate with  SQL Server 
.  
  
  SQL Server 
 programs that are written using the  SQL Server 
 Native Client ODBC driver communicate with  SQL Server 
 through C function calls. The  SQL Server 
-specific versions of the ODBC functions are implemented in the  SQL Server 
 Native Client ODBC driver. The driver passes SQL statements to  SQL Server 
 and returns the results of the statements to the application.  
  
 The  SQL Server 
 Native Client ODBC driver complies with the Microsoft Win32 ODBC 3.51 specification. The driver supports applications written using earlier versions of ODBC in the manner defined in the ODBC 3.51 specification.  
  
## In This Section  
  
-   [Data Source Names and 64-Bit Operating Systems](data-source-names-and-64-bit-operating-systems.md)  
  
-   [Develop C and C++ applications with the ODBC driver](../../../connect/odbc/develop-cpp-applications.md)
  
-   [Communicating with SQL Server (ODBC)](../../native-client-odbc-communication/communicating-with-sql-server-odbc.md)  
  
-   [Executing Queries (ODBC)](../../native-client-odbc-queries/executing-queries-odbc.md)  
  
-   [Processing Results (ODBC)](../../native-client-odbc-results/processing-results-odbc.md)  
  
-   [Using Cursors (ODBC)](../../native-client-odbc-cursors/using-cursors-odbc.md)  
  
-   [Performing Transactions (ODBC)](performing-transactions-in-odbc.md)  
  
-   [Handling Errors and Messages](../../native-client-odbc-error-messages/handling-errors-and-messages.md)  
  
-   [Running Stored Procedures](../../native-client-odbc-stored-procedures/running-stored-procedures.md)  
  
-   [Using Catalog Functions](using-catalog-functions.md)  
  
-   [Performing Bulk Copy Operations (ODBC)](../../native-client-odbc-bulk-copy-operations/performing-bulk-copy-operations-odbc.md)  
  
-   [Managing Text and Image Columns](../../native-client-odbc-text-image-columns/managing-text-and-image-columns.md)  
  
-   [Profiling ODBC Driver Performance](profiling-odbc-driver-performance.md)  
  
-   [Table-Valued Parameters (ODBC)](../../native-client-odbc-table-valued-parameters/table-valued-parameters-odbc.md)  
  
-   [Date and Time Improvements (ODBC)](../../native-client-odbc-date-time/date-and-time-improvements-odbc.md)  
  
-   [Large CLR User-Defined Types (ODBC)](large-clr-user-defined-types-odbc.md)  
  
-   [FILESTREAM Support (ODBC)](filestream-support-odbc.md)  
  
-   [Service Principal Names (SPNs) in Client Connections (ODBC)](service-principal-names-spns-in-client-connections-odbc.md)  
  
-   [Sparse Columns Support (ODBC)](sparse-columns-support-odbc.md)  
  
  
-   [ODBC How-to Topics](../../native-client-odbc-how-to/odbc-how-to-topics.md)  
  
## Related content

- [SQL Server Native Client Programming](../sql-server-native-client-programming.md)
- [Installing SQL Server Native Client](../applications/installing-sql-server-native-client.md)
