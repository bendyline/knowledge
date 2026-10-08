---
title: "Supported ODBC API Functions"
description: "Supported ODBC API Functions"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
helpviewer_keywords:
  - "ODBC, API functions"
  - "ODBC SQL grammar, API functions mapped to driver (table) [ODBC]"
---
# Supported ODBC API Functions
The purpose of leveling is to inform the application what features are available to it from the driver. The Microsoft ODBC Desktop Database Drivers support all Core and Level 1 functions.  
  
 For more information about conformance levels for functions and grammar, see [Conformance Levels](../reference/develop-app/conformance-levels.md) in the *ODBC Programmer's Reference*.  
  
 Support of ODBC API functions can be dependent on the driver used. The following table summarizes the support for functions. The leftmost column provides a link to the general reference page for each function. These reference pages are listed alphabetically in the [ODBC API Reference](../reference/syntax/odbc-api-reference.md) section, under [ODBC Programmer's Reference](../reference/odbc-programmer-s-reference.md). The columns to the right provide links to driver-specific notes about each supported function. These driver-specific topics are listed in the "Other Programming Details" section for each driver. Alternatively, if the same remarks about a function apply to all the ODBC Desktop Database Drivers, the rightmost column provides a link to a topic that summarizes the Desktop Database Drivers' support for that function. These topics are listed at the end of the current section ("Supported ODBC API Functions").  
  
| ODBC Function | Access Driver-specific notes | dBASE Driver-specific notes | Paradox Driver-specific notes | Text File Driver-specific notes | Excel Driver-specific notes | Notes relevant to all drivers |
| --- | --- | --- | --- | --- | --- | --- |
| [SQLBindParameter](../reference/syntax/sqlbindparameter-function.md) |  |  |  |  | [Excel](sqlbindparameter-excel-driver.md) |  |
| [SQLColAttributes](../reference/syntax/sqlcolattributes-function.md) | [Access](sqlcolattributes-access-driver.md) | [dBASE](sqlcolattributes-dbase-driver.md) | [Paradox](sqlcolattributes-paradox-driver.md) | [Text File](sqlcolattributes-text-file-driver.md) | [Excel](sqlcolattributes-excel-driver.md) |  |
| [SQLColumns](../reference/syntax/sqlcolattributes-function.md) | [Access](sqlcolattributes-access-driver.md) | [dBASE](sqlcolattributes-dbase-driver.md) | [Paradox](sqlcolattributes-paradox-driver.md) | [Text File](sqlcolattributes-text-file-driver.md) | [Excel](sqlcolattributes-excel-driver.md) |  |
| [SQLConfigDataSource](../reference/syntax/sqlconfigdatasource-function.md) | [Access](sqlconfigdatasource-access-driver.md) | [dBASE](sqlconfigdatasource-dbase-driver.md) | [Paradox](sqlconfigdatasource-paradox-driver.md) | [Text File](sqlconfigdatasource-text-file-driver.md) | [Excel](odbc-jet-sqlconfigdatasource-excel-driver.md) |  |
| [SQLDriverConnect](../reference/syntax/sqldriverconnect-function.md) | [Access](sqldriverconnect-access-driver.md) | [dBASE](sqldriverconnect-dbase-driver.md) | [Paradox](sqldriverconnect-paradox-driver.md) | [Text File](sqldriverconnect-text-file-driver.md) | [Excel](sqldriverconnect-excel-driver.md) |  |
| [SQLGetCursorName](../reference/syntax/sqlgetcursorname-function.md) |  |  |  |  |  | [All drivers](sqlgetcursorname-desktop-database-drivers.md) |
| [SQLGetData](../reference/syntax/sqlgetdata-function.md) |  |  |  |  |  | [All drivers](sqlgetdata-desktop-database-drivers.md) |
| [SQLGetInfo](../reference/syntax/sqlgetinfo-function.md) | [Access](sqlgetinfo-access-driver.md) | [dBASE](sqlgetinfo-dbase-driver.md) | [Paradox](sqlgetinfo-paradox-driver.md) | [Text File](sqlgetinfo-text-file-driver.md) | [Excel](sqlgetinfo-excel-driver.md) |
| [SQLGetStmtOption](../reference/syntax/sqlgetstmtoption-function.md) |  |  |  |  |  | [All drivers](sqlgetstmtoption-desktop-database-drivers.md) |
| [SQLGetTypeInfo](../reference/syntax/sqlgettypeinfo-function.md) | [Access](sqlgettypeinfo-access-driver.md) | [dBASE](sqlgettypeinfo-dbase-driver.md) | [Paradox](sqlgettypeinfo-paradox-driver.md) | [Text File](sqlgettypeinfo-text-file-driver.md) | [Excel](sqlgettypeinfo-excel-driver.md) |  |
| [SQLMoreResults](../reference/syntax/sqlmoreresults-function.md) |  |  |  |  |  | [All drivers](sqlmoreresults-desktop-database-drivers.md) |
| [SQLPrepare](../reference/syntax/sqlprepare-function.md) |  |  |  |  |  | [All drivers](sqlprepare-desktop-database-drivers.md) |
| [SQLProcedureColumns](../reference/syntax/sqlprocedurecolumns-function.md) | [Access](sqlprocedurecolumns-access-driver.md) |  |  |  |  |  |
| [SQLProcedures](../reference/syntax/sqlprocedures-function.md) |  |  |  |  |  | [All drivers](sqlprocedures-desktop-database-drivers.md) |
| [SQLSetConnectOption](../reference/syntax/sqlsetconnectoption-function.md) | [Access](sqlsetconnectoption-access-driver.md) | [dBASE](sqlsetconnectoption-dbase-driver.md) | [Paradox](sqlsetconnectoption-paradox-driver.md) | [Text File](sqlsetconnectoption-text-file-driver.md) | [Excel](sqlsetconnectoption-excel-driver.md) |  |
| [SQLSetCursorName](../reference/syntax/sqlsetcursorname-function.md) |  |  |  |  |  | [All drivers](sqlsetcursorname-desktop-database-drivers.md) |
| [SQLSetPos](../reference/syntax/sqlsetpos-function.md) |  |  |  |  |  | [All drivers](sqlsetpos-desktop-database-drivers.md) |
| [SQLSetScrollOptions](../reference/syntax/sqlsetscrolloptions-function.md) |  |  |  |  |  | [All drivers](sqlsetscrolloptions-desktop-database-drivers.md) |
| [SQLSetStmtOption](../reference/syntax/sqlsetstmtoption-function.md) |  |  |  |  |  | [All drivers](sqlsetstmtoption-desktop-database-drivers.md) |
| [SQLSpecialColumns](../reference/syntax/sqlspecialcolumns-function.md) |  |  |  |  |  | [All drivers](sqlspecialcolumns-desktop-database-drivers.md) |
| [SQLStatistics](../reference/syntax/sqlstatistics-function.md) | [Access](sqlstatistics-access-driver.md) | [dBASE](sqlstatistics-dbase-driver.md) | [Paradox](sqlstatistics-paradox-driver.md) | [Text File](sqlstatistics-text-file-driver.md) | [Excel](sqlstatistics-excel-driver.md) |  |
| [SQLTables](../reference/syntax/sqltables-function.md) | [Access](sqltables-access-driver.md) | [dBASE](sqltables-dbase-driver.md) | [Paradox](sqltables-paradox-driver.md) | [Text File](sqltables-text-file-driver.md) | [Excel](sqltables-excel-driver.md) |
| [SQLTransact](../reference/syntax/sqltransact-function.md) | [Access](sqltransact-access-driver.md) | [dBASE](sqltransact-dbase-driver.md) | [Paradox](sqltransact-paradox-driver.md) | [Text File](sqltransact-text-file-driver.md) | [Excel](sqltransact-excel-driver.md) |  |
  
 The following topics provide remarks about ODBC functions. These remarks apply to all ODBC Desktop Database Drivers.  
  
-   [SQLGetData (Desktop Database Drivers)](sqlgetdata-desktop-database-drivers.md)  
  
-   [SQLGetStmtOption(Desktop Database Drivers)](sqlgetstmtoption-desktop-database-drivers.md)  
  
-   [SQLMoreResults (Desktop Database Drivers)](sqlmoreresults-desktop-database-drivers.md)  
  
-   [SQLPrepare (Desktop Database Drivers)](sqlprepare-desktop-database-drivers.md)  
  
-   [SQLProcedures (Desktop Database Drivers)](sqlprocedures-desktop-database-drivers.md)  
  
-   [SQLSetCursorName (Desktop Database Drivers)](sqlsetcursorname-desktop-database-drivers.md)  
  
-   [SQLSetPos (Desktop Database Drivers)](sqlsetpos-desktop-database-drivers.md)  
  
-   [SQLSetScrollOptions (Desktop Database Drivers)](sqlsetscrolloptions-desktop-database-drivers.md)  
  
-   [SQLSetStmtOption (Desktop Database Drivers)](sqlsetstmtoption-desktop-database-drivers.md)  
  
-   [SQLSpecialColumns (Desktop Database Drivers)](sqlspecialcolumns-desktop-database-drivers.md)
