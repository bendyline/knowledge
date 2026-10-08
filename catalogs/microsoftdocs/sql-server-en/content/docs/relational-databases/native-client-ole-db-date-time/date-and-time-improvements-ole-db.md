---
title: "Date and Time Improvements (OLE DB)"
description: "SQL Server Native Client Date and Time Improvements (OLE DB)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.topic: "reference"
helpviewer_keywords:
  - "date/time [OLE DB]"
  - "OLE DB, date/time improvements"
---
# SQL Server Native Client Date and Time Improvements (OLE DB)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





   SQL Server 2008 (10.0.x) 
 introduces new date and time data types. This section describes how these new types are exposed as extensions in  SQL Server 
 Native Client. For an overview of the  SQL Server 
 Native Client support for the new date and time data types, see [Date and Time Improvements](../native-client/features/date-and-time-improvements.md). For a sample, see [Use Enhanced Date and Time Features (OLE DB)](../native-client-ole-db-how-to/use-enhanced-date-and-time-features-ole-db.md).  
  
 For more general information about date and time data types, see [datetime &#40;Transact-SQL&#41;](../../t-sql/data-types/datetime-transact-sql.md).  
  
## In This Section  
 [Data Type Support for OLE DB Date and Time Improvements](data-type-support-for-ole-db-date-and-time-improvements.md)  
 Provides information about OLE DB (  SQL Server 
 Native Client) types that support  SQL Server 
 date and time data types.  
  
 [Metadata (OLE DB)](data-type-support-for-ole-db-date-and-time-improvements.md)  
 Contains information about the DBBINDING structure, **ICommandWithParameters::GetParameterInfo**, **ICommandWithParameters::SetParameterInfo**, **IColumnsRowset::GetColumnsRowset**, and **IColumnsInfo::GetColumnInfo**. Also provides information about updates to OLE DB schema rowsets.  
  
 [Bindings and Conversions (OLE DB)](conversions-ole-db.md)  
 Describes the rules for conversion between server and client for both existing and new date types.  
  
 [Bulk Copy Changes for Enhanced Date and Time Types (OLE DB and ODBC)](../native-client-odbc-date-time/bulk-copy-changes-for-enhanced-date-and-time-types-ole-db-and-odbc.md)  
 Describes date/time enhancements to support bulk copy operations.  
  
 [OLE DB API Support for Date and Time Enhancements](ole-db-api-support-for-date-and-time-enhancements.md)  
 Describes the OLE DB APIs that support enhanced date/time features.  
  
 [Comparability for IRowsetFind](comparability-for-irowsetfind.md)  
 Describes date/time types and **IRowsetFind**.  
  
 [New Date and Time Features with Previous SQL Server Versions (OLE DB)](new-date-and-time-features-with-previous-sql-server-versions-ole-db.md)  
 Describes the expected behavior when a client application that uses enhanced date and time features communicates with an older version of  SQL Server 
, and when a client compiled with an older version of  SQL Server 
 Native Client sends commands to a server that supports enhanced date and time features.  
  
## Related content

- [SQL Server Native Client (OLE DB)](../native-client/ole-db/sql-server-native-client-ole-db.md)
