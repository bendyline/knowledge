---
title: API support for date and time enhancements (OLE DB driver)
description: Learn about the OLE DB APIs that support enhanced date/time features, including function names and descriptions.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "06/14/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: "reference"
ms.custom:
  - ignite-2025
---
# OLE DB API Support for Date and Time Enhancements

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  The following OLE DB APIs support enhanced date/time features.  
  
| Function | Description |
| --- | --- |
| IAccessor::CreateAccessor | A flag is added in the DBBINDING structure to enable applications to discriminate between **datetime**, **datetime2**, and **smalldatetime** values. For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| IBCPSession::BCPColFmt | For more information, see [Bulk Copy Changes for Enhanced Date and Time Types (OLE DB)](bulk-copy-changes-for-enhanced-date-and-time-types-ole-db.md). |
| ICommandWithParameters::GetParameterInfo | For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| ICommandWithParameters::SetParameterinfo | For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| IColumnsRowset::GetColumnsRowset | For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| IColumnsInfo::GetColumnInfo | For more information, see [Parameter and Rowset Metadata](metadata-parameter-and-rowset.md). |
| IDBSchemaRowset::GetRowset | For details of the affected schema rowsets, see [Date and Time and Schema Rowsets](metadata-date-and-time-and-schema-rowsets.md). |
| IRowsetFastLoad | This interface supports the new date/time types, but there is no change to its interface. |
| ITableDefinition::CreateTable | For more information, see [Data Type Support for OLE DB Date and Time Improvements](data-type-support-for-ole-db-date-and-time-improvements.md). |
  
## Related content

- [Date and Time Improvements in OLE DB](date-and-time-improvements-ole-db.md)
