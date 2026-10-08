---
title: "ODBC API for Date Time"
description: "ODBC API Support for Enhanced Date and Time Features"
author: markingmyname
ms.author: maghan
ms.date: 01/26/2026
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "date/time [ODBC], API support"
---

# ODBC API support for enhanced date and time features


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





Enhanced date and time types (such as `date`, `time`, `datetime2`, and `datetimeoffset`) require the ODBC driver to support richer metadata, extended precision, and more flexible binding semantics.  
The following ODBC and bulk copy APIs are grouped according to how they contribute to discovery, binding, retrieval, descriptor management, and high-volume ingestion of enhanced date and time values.

## Schema & Metadata Discovery (Date/Time Types)

These APIs help applications determine supported date/time types, column metadata, and parameter characteristics.

| Function | Purpose |
| --- | --- |
| [SQLColumns](../native-client-odbc-api/sqlcolumns.md) | Retrieves metadata for columns, including enhanced date/time types |
| [SQLColAttribute](../native-client-odbc-api/sqlcolattribute.md) | Returns column attributes such as type, precision, and scale for date/time fields |
| [SQLDescribeCol](../native-client-odbc-api/sqldescribecol.md) | Provides column descriptions, including date/time type details |
| [SQLDescribeParam](../native-client-odbc-api/sqldescribeparam.md) | Returns parameter metadata, including format and precision for date/time parameters |
| [SQLGetTypeInfo](../native-client-odbc-api/sqlgettypeinfo.md) | Lists supported SQL data types, including enhanced date/time categories |
| [SQLProcedureColumns](../native-client-odbc-api/sqlprocedurecolumns.md) | Retrieves metadata for stored procedure parameters, including those of date/time types |
| [SQLSpecialColumns](../native-client-odbc-api/sqlspecialcolumns.md) | Identifies special columns such as timestamps and versioning fields |

## Binding & Parameter Support for Date/Time Types

These functions bind application variables and parameters to date and time values.

| Function | Purpose |
| --- | --- |
| [SQLBindCol](../native-client-odbc-api/sqlbindcol.md) | Binds application buffers to result columns containing date/time values |
| [SQLBindParameter](../native-client-odbc-api/sqlbindparameter.md) | Binds date/time parameters for prepared or direct statements |
| [SQLPutData](../native-client-odbc-api/sqlputdata.md) | Streams large or variable-length date/time data during execution |

## Fetching & Retrieving Date/Time Values

These APIs retrieve enhanced date/time values from executed statements.

| Function | Purpose |
| --- | --- |
| [SQLFetch](../native-client-odbc-api/sqlfetch.md) | Fetches sequential rows containing date/time values |
| [SQLFetchScroll](../native-client-odbc-api/sqlfetchscroll.md) | Fetches rows using scrollable cursors with date/time columns |
| [SQLGetData](../native-client-odbc-api/sqlgetdata.md) | Retrieves date/time column values in flexible buffer formats |

## Descriptor & Attribute Management for Date/Time Types

Enhanced date/time values require accurate descriptor fields for precision, scale, and storage layout.

| Function | Purpose |
| --- | --- |
| [SQLGetDescField](../native-client-odbc-api/sqlgetdescfield.md) | Retrieves descriptor metadata for date/time fields |
| [SQLGetDescRec](../native-client-odbc-api/sqlgetdescrec.md) | Retrieves a complete descriptor record, including type/precision |
| [SQLSetDescField](../native-client-odbc-api/sqlsetdescfield.md) | Sets descriptor fields to correctly represent date/time values |
| [SQLSetDescRec](../native-client-odbc-api/sqlsetdescrec.md) | Sets a complete descriptor record for buffers that store date/time information |

## Bulk Copy (BCP) Support for Date/Time Types

Bulk copy operations allow high-volume ingestion and extraction of enhanced date/time values.

| Function | Purpose |
| --- | --- |
| [bcp_bind](../native-client-odbc-extensions-bulk-copy-functions/bcp-bind.md) | Binds host variables to bulk copy columns containing enhanced date/time data |
| [bcp_colfmt](../native-client-odbc-extensions-bulk-copy-functions/bcp-colfmt.md) | Defines column formats for date/time values during BCP export/import |
| [bcp_getcolfmt](../native-client-odbc-extensions-bulk-copy-functions/bcp-getcolfmt.md) | Retrieves format information for columns containing date/time types |
| [bcp_gettypename](../native-client-odbc-extensions-bulk-copy-functions/bcp-gettypename.md) | Returns SQL Server type names, including enhanced date/time types |
| [bcp_setcolfmt](../native-client-odbc-extensions-bulk-copy-functions/bcp-setcolfmt.md) | Sets format definitions for bulk operations involving date/time types |

## Related content

- [Date and Time Improvements (ODBC)](date-and-time-improvements-odbc.md)
