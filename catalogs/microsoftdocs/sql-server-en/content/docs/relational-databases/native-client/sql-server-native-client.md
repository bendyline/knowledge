---
title: SQL Server Native Client
description: Learn about the features of SQL Server Native Client (SNAC). SQL Server Native Client refers to ODBC and OLE DB drivers for SQL Server.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest, vanto
ms.date: 09/11/2024
ms.service: sql
ms.subservice: native-client
ms.topic: concept-article
---
# SQL Server Native Client


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





SQL Server Native Client, also known as SNAC or SQLNCLI, refers to the ODBC and OLE DB drivers for SQL Server, prior to  SQL Server 2022 (16.x) 
.

> **Important:**  
> [SQL Server Native Client](sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


> **Note:**  
> For more information and to download the SNAC or ODBC Drivers, see the [SNAC lifecycle explained blog post](https://learn.microsoft.com/archive/blogs/sqlreleaseservices/snac-lifecycle-explained). For more information on ODBC Driver for SQL Server, see [Microsoft ODBC Driver for SQL Server](../../connect/odbc/microsoft-odbc-driver-for-sql-server.md).

Information on the  SQL Server 
 Native Client features released with  SQL Server 2012 (11.x) 
, the last available version of SQL Server native Client:

- [SQL Server Native Client Support for LocalDB](features/sql-server-native-client-support-for-localdb.md)
- [Metadata Discovery](features/metadata-discovery.md)
- [UTF-16 Support in SQL Server Native Client 11.0](features/utf-16-support-in-sql-server-native-client-11-0.md)
- [SQL Server Native Client Support for High Availability, Disaster Recovery](features/sql-server-native-client-support-for-high-availability-disaster-recovery.md)
- [Accessing Diagnostic Information in the Extended Events Log](features/accessing-diagnostic-information-in-the-extended-events-log.md)

ODBC in  SQL Server 
 Native Client supports three features that were added to standard ODBC in the Windows 7 SDK:

- Asynchronous execution on connection-related operations. For more information, see [Asynchronous Execution](../../odbc/reference/develop-app/asynchronous-execution-polling-method.md).

- C data type extensibility. For more information, see [C Data Types in ODBC](../../odbc/reference/develop-app/c-data-types-in-odbc.md).

  To support this feature in  SQL Server 
 Native Client, `SQLGetDescField` can return **SQL_C_SS_TIME2** (for **time** types) or **SQL_C_SS_TIMESTAMPOFFSET** (for **datetimeoffset**) instead of **SQL_C_BINARY**, if your application uses ODBC 3.8. For more information, see [Data Type Support for ODBC Date and Time Improvements](../native-client-odbc-date-time/data-type-support-for-odbc-date-and-time-improvements.md).

- Calling `SQLGetData` with a small buffer multiple times to retrieve a large parameter value. For more information, see [Retrieving Output Parameters Using SQLGetData](../../odbc/reference/develop-app/retrieving-output-parameters-using-sqlgetdata.md).

The following articles describe  SQL Server 
 Native Client behavior changes in  SQL Server 2012 (11.x) 
.

- The value passed to the `pwszName` parameter must be a valid identifier when calling `ICommandWithParameters::SetParameterInfo`. For more information, see [ICommandWithParameters](../native-client-ole-db-interfaces/icommandwithparameters.md).

- `SQLDescribeParam` consistently returns an ODBC specification conforming value. For more information, see [SQLDescribeParam](../native-client-odbc-api/sqldescribeparam.md).

- [ODBC Driver Behavior Change When Handling Character Conversions](features/odbc-driver-behavior-change-when-handling-character-conversions.md)

## Related content

- [Installing SQL Server Native Client](applications/installing-sql-server-native-client.md)
- [SQL Server Native Client Features](features/sql-server-native-client-features.md)
