---
title: "Update from SQL Server 2005"
description: "Updating an Application from SQL Server 2005 Native Client"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client, updating applications"
---
# Updating an Application from SQL Server 2005 Native Client

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
 (versions 2012 through 2019), see this [Support Lifecycle exception](support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


  This topic discusses the breaking changes in  SQL Server 
 Native Client since  SQL Server 
 Native Client in  SQL Server 2005 (9.x) 
.  
  
 When you upgrade from Microsoft Data Access Components (MDAC) to  SQL Server 
 Native Client, you might also see some behavior differences. For more information, see [Updating an Application to SQL Server Native Client from MDAC](updating-an-application-to-sql-server-native-client-from-mdac.md).  
  
  SQL Server 
 Native Client 9.0 shipped with  SQL Server 2005 (9.x) 
.  SQL Server 
 Native Client 10.0 shipped with  SQL Server 2008 (10.0.x) 
.   SQL Server 
 Native Client 10.5 shipped with  SQL Server 2008 R2 (10.50.x) 
.  SQL Server 
 Native Client 11.0 shipped with  SQL Server 2012 (11.x) 
 and  SQL Server 2014 (12.x)
.  
  
|Changed behavior in SQL Server Native Client Since  SQL Server 2005 (9.x) 
|Description|  
|------------------------------------------------------------------------------------|-----------------|  
|OLE DB pads only to the defined scale.|For conversions where converted data is sent to the server,  SQL Server 
 Native Client (beginning in  SQL Server 2008 (10.0.x) 
) pads trailing zeros in data only up to the maximum length of **datetime** values. SQL Server Native Client 9.0 padded to 9 digits.|  
|Validate DBTYPE_DBTIMESTAMP for ICommandWithParameter::SetParameterInfo.| SQL Server 
 Native Client (beginning in  SQL Server 2008 (10.0.x) 
) implements the OLE DB requirement for *bScale* in ICommandWithParameter::SetParameterInfo to be set to the fractional seconds' precision for DBTYPE_DBTIMESTAMP.|  
|The **sp_columns** stored procedure now returns **"NO"** instead of **"NO "** for the IS_NULLABLE column.|Beginning in  SQL Server 
 Native Client 10.0 ( SQL Server 2008 (10.0.x) 
), **sp_columns** stored procedure now returns **"NO"** instead of **"NO "** for an IS_NULLABLE column.|  
|SQLSetDescRec, SQLBindParameter, and SQLBindCol now perform consistency checking.|Prior to  SQL Server 
 Native Client 10.0, setting SQL_DESC_DATA_PTR did not cause a consistency check for any descriptor type in SQLSetDescRec, SQLBindParameter, or SQLBindCol.|  
|SQLCopyDesc now does descriptor consistency checking.|Prior to  SQL Server 
 Native Client 10.0, SQLCopyDesc did not do a consistency check when the SQL_DESC_DATA_PTR field was set on a particular record.|  
|SQLGetDescRec no longer does a descriptor consistency check.|Prior to  SQL Server 
 Native Client 10.0, SQLGetDescRec performed a descriptor consistency check when the SQL_DESC_DATA_PTR field was set. This was not required by the ODBC specification and in  SQL Server 
 Native Client 10.0 ( SQL Server 2008 (10.0.x) 
) and later versions, this consistency check is no longer performed.|  
|Different error returned when date is out of range.|For the **datetime** type, a different error number will be returned by  SQL Server 
 Native Client (beginning in  SQL Server 2008 (10.0.x) 
) for an out-of-range date than was returned in earlier versions.<br /><br /> Specifically,  SQL Server 
 Native Client 9.0 returned 22007 for all out of range year values in string conversions to **datetime**, and  SQL Server 
 Native Client beginning with version 10.0 ( SQL Server 2008 (10.0.x) 
) returns 22008 when the date is within the range supported by **datetime2** but outside the range supported by **datetime** or **smalldatetime**.|  
|**datetime** value truncates fractional seconds and not round if rounding will change the day.|Prior to  SQL Server 
 Native Client 10.0, the client behavior for **datetime** values sent to the server is to round them to nearest 1/300th of a second. Beginning in  SQL Server 
 Native Client 10.0, this scenario causes a truncation of fractional seconds if rounding changes the day.|  
|Possible truncation of seconds for **datetime** value.|An application built with  SQL Server 2008 (10.0.x) 
 Native Client (or later) that connects to a  SQL Server 
 2005 server will truncate seconds and fractional seconds for time portion of data sent to the server if you bind to a datetime column with a type identifier of DBTYPE_DBTIMESTAMP (OLE DB) or SQL_TIMESTAMP (ODBC) and a scale of 0.<br /><br /> For example:<br /><br /> Input data: 1994-08-21 21:21:36.000<br /><br /> Inserted data: 1994-08-21 21:21:00.000|  
|OLE DB data conversion from DBTYPE_DBTIME to DBTYPE_DATE no longer can cause the day to change.|Prior to  SQL Server 
 Native Client 10.0, if the time part of a DBTYPE_DATE was within a half second of midnight, OLE DB conversion code caused the day to change. Beginning in  SQL Server 
 Native Client 10.0, the day will not change (fractional seconds are truncated and not rounded).|  
|IBCPSession::BCColFmt conversion changes.|Beginning in  SQL Server 
 Native Client 10.0, when you use IBCPSession::BCOColFmt to convert SQLDATETIME or SQLDATETIME to a string type, a fractional value is exported. For example, when converting type SQLDATETIME to type SQLNVARCHARMAX, earlier versions of  SQL Server 
 Native Client returned<br /><br /> 1989-02-01 00:00:00.  SQL Server 
 Native Client 10.0 and later versions return 1989-02-01 00:00:00.0000000.|  
|Size of data sent must match length specified in SQL_LEN_DATA_AT_EXEC.|When using SQL_LEN_DATA_AT_EXEC, the size of the data must match the length that you specified with SQL_LEN_DATA_AT_EXEC. You can use SQL_DATA_AT_EXEC but there are potential performance benefits to using SQL_LEN_DATA_AT_EXEC.|  
|Custom applications that use the BCP API can now see a warning.|The BCP API will generate a warning message if data length is greater than the specified length for a field for all types. Previously, this warning was only given for character types, but will not be issued for all types.|  
|Inserting an empty string into a **sql_variant** bound as a date/time type generates an error.|In  SQL Server 
 Native Client 9.0, inserting an empty string into a **sql_variant** bound as a date/time type did not generate an error.  SQL Server 
 Native Client 10.0 (and later) correctly generates an error in this situation.|  
|Stricter SQL_C_TYPE _TIMESTAMP and DBTYPE_DBTIMESTAMP parameter validation.|Prior to  SQL Server 2008 (10.0.x) 
 Native Client, **datetime** values were rounded to fit the scale of **datetime** and **smalldatetime** columns by  SQL Server 
.  SQL Server 2008 (10.0.x) 
 Native Client (and later) applies the stricter validation rules that are defined in the ODBC core specification for fractional seconds. If a parameter value cannot be converted to the SQL type by using the scale specified or implied by the client binding without truncation of trailing digits, an error is returned.|  
| SQL Server 
 might return different results when a trigger runs.|Changes introduced in  SQL Server 2008 (10.0.x) 
 might cause an application to have different results returned from a statement that caused a trigger to run when **NOCOUNT OFF** was in effect. In this situation, your application might generate an error. To resolve this error, set **NOCOUNT ON** in the trigger or call SQLMoreResults to advance to the next result.|  
  
## Related content

- [SQL Server Native Client Programming](../sql-server-native-client-programming.md)
