---
title: "Date and Time Improvements"
description: "SQL Server Native Client Date and Time Improvements"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
---
# SQL Server Native Client Date and Time Improvements

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


  This topic describes the  SQL Server 
 Native Client support for the date and time data types that were added in  SQL Server 2008 (10.0.x) 
.  
  
 For more information about date/time improvements, see [Date and Time Improvements (OLE DB)](../../native-client-ole-db-date-time/date-and-time-improvements-ole-db.md) and [Date and Time Improvements (ODBC)](../../native-client-odbc-date-time/date-and-time-improvements-odbc.md).  
  
## Usage  
 The following sections describe various ways of using the new date and time types.  
  
### Use Date as a Distinct Data Type  
 Beginning with  SQL Server 2008 (10.0.x) 
, enhanced support for date/time types makes it more efficient to use the SQL_TYPE_DATE ODBC type (SQL_DATE for ODBC 2.0 applications) and the DBTYPE_DBDATE OLE DB type.  
  
### Use Time as a Distinct Data Type  
 OLE DB already has a data type that just contains the time, DBTYPE_DBTIME, which has a precision of 1 second. In ODBC, the equivalent type is SQL_TYPE_TIME (SQL_TIME for ODBC 2.0 applications).  
  
 The new  SQL Server 
 time data type has fractional seconds accurate to 100 nanoseconds. This requires new types in  SQL Server 
 Native Client: DBTYPE_DBTIME2 (OLE DB) and SQL_SS_TIME2 (ODBC). Existing applications written to use times with no fractional seconds can use time(0) columns. The existing OLE DB DBTYPE_TIME and ODBC SQL_TYPE_TIME types and their corresponding structs should work correctly, unless the applications rely on the type returned in metadata.  
  
### Use Time as a Distinct Data Type with Extended Fractional Seconds Precision  
 Some applications, such as process control and manufacturing applications, require the ability to handle time data with a precision of up to 100 nanoseconds. New types for this purpose are DBTYPE_DBTIME2 (OLE DB) and SQL_SS_TIME2 (ODBC).  
  
### Use Datetime with Extended Fractional Seconds Precision  
 OLE DB already defines a type with a precision of up to 1 nanosecond. However, this type is already used by existing  SQL Server 
 applications and such applications have an expectation of only 1/300 of a second precision. The new **datetime2(3)** type is not directly compatible with the existing datetime type. If there is a risk that this will affect application behavior, applications must use a new DBCOLUMN flag to determine the actual server type.  
  
 ODBC also defines a type with a precision of up to 1 nanosecond. However, this type is already used by existing  SQL Server 
 applications and such applications expect only 3 millisecond precision. The new **datetime2(3)** type is not  directly compatible with the existing **datetime** type. **datetime2(3)** has a precision of one millisecond, and **datetime** has a precision of 1/300 of a second. In ODBC, applications can determine which server type is in use with the descriptor field SQL_DESC_TYPE_NAME. Therefore, the existing type SQL_TYPE_TIMESTAMP (SQL_TIMESTAMP for ODBC 2.0 applications) can be used for both types.  
  
### Use Datetime with Extended Fractional Seconds Precision and Timezone  
 Some applications require datetime values with timezone information. This is supported by the new DBTYPE_DBTIMESTAMPOFFSET (OLE DB) and SQL_SS_TIMESTAMPOFFSET (ODBC) types.  
  
### Use Date/Time/Datetime/Datetimeoffset Data with Client-Side Conversions Consistent with Existing Conversions  
 The ODBC standard describes how conversions between existing date, time, and timestamp types work. These are extended in a consistent manner to include conversions between all date and time types introduced in  SQL Server 2008 (10.0.x) 
.  
  
## Related content

- [SQL Server Native Client Features](sql-server-native-client-features.md)
