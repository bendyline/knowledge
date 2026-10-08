---
title: API support for date and time enhancements (Native Client OLE DB provider)
description: "OLE DB API Support for Date and Time Enhancements (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/06/2017"
ms.service: sql
ms.topic: "reference"
---
# OLE DB API Support for Date and Time Enhancements (Native Client OLE DB provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The following OLE DB APIs support enhanced date/time features.  
  
| Function | Description |
| --- | --- |
| IAccessor::CreateAccessor | A flag is added in the DBBINDING structure to enable applications to discriminate between **datetime**, **datetime2**, and **smalldatetime** values. For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| IBCPSession::BCPColFmt | For more information, see [Bulk Copy Changes for Enhanced Date and Time Types (OLE DB and ODBC)](../native-client-odbc-date-time/bulk-copy-changes-for-enhanced-date-and-time-types-ole-db-and-odbc.md). |
| ICommandWithParameters::GetParameterInfo | For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| ICommandWithParameters::SetParameterinfo | For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| IColumnsRowset::GetColumnsRowset | For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| IColumnsInfo::GetColumnInfo | For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| IDBSchemaRowset::GetRowset | For details of the affected schema rowsets, see [Date and Time and Schema Rowsets](metadata-date-and-time-and-schema-rowsets.md). |
| IRowsetFastLoad | This interface supports the new date/time types, but there is no change to its interface. |
| ITableDefinition::CreateTable | For more information, see [Data Type Support for OLE DB Date and Time Improvements](data-type-support-for-ole-db-date-and-time-improvements.md). |
  
## Related content

- [SQL Server Native Client Date and Time Improvements (OLE DB)](date-and-time-improvements-ole-db.md)
