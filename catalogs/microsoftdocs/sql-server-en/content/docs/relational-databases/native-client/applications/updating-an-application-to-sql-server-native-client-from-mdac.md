---
title: "Update from MDAC"
description: Upgrade from Windows Data Access Components to SQL Server Native Client, which exposes new features of SQL Server 2005 with backward compatibility.
author: markingmyname
ms.author: maghan
ms.date: 03/24/2026
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "MDAC [SQL Server]"
  - "SQLNCLI, vs. MDAC"
  - "SQL Server Native Client, vs. MDAC"
  - "data access [SQL Server Native Client], vs. MDAC"
  - "SQL Server Native Client, updating applications"
---
# Updating an Application to SQL Server Native Client from MDAC

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


  There are a number of differences between  SQL Server 
 Native Client and Microsoft Data Access Components (MDAC; starting with Windows Vista, the data access components are now called Windows Data Access Components, or Windows DAC). Although both provide native data access to  SQL Server 
 databases,  SQL Server 
 Native Client has been specifically designed to expose the new features of  SQL Server 2005 (9.x) 
, while at the same time maintaining backward compatibility with earlier versions.  
  
 The information in this article helps update your MDAC (or Windows DAC) application to be current with the version of  SQL Server 
 Native Client that was included in  SQL Server 2005 (9.x) 
. To help you make this application be current with the version of  SQL Server 
 Native Client that shipped in  SQL Server 
, see [Updating an Application from SQL Server 2005 Native Client](updating-an-application-from-sql-server-2005-native-client.md).  

 > **Note:**  
 >  SQL Server 
 Native Client has been removed from  SQL Server 2022 (16.x) 
.
  
 In addition, although MDAC contains components for using OLE DB, ODBC, and ActiveX Data Objects (ADO),  SQL Server 
 Native Client only implements OLE DB and ODBC (although ADO can access the functionality of  SQL Server 
 Native Client).  
  
  SQL Server 
 Native Client and MDAC differ in the other following areas:  
  
-   Users who use ADO to access a  SQL Server 
 Native Client provider may find less filtering functionality than when they accessed a SQL OLE DB provider.  
  
-   If an ADO application uses  SQL Server 
 Native Client and attempts to update a computed column, an error will be reported. With MDAC the update was accepted but ignored.  
  
-    SQL Server 
 Native Client is a single self-contained dynamic link library (DLL) file. The publicly exposed interfaces have been kept to a minimum, both to ease distribution, as well as to limit security exposure.  
  
-   Only OLE DB and ODBC interfaces are supported.  
  
-   The  SQL Server 
 Native Client OLE DB provider and ODBC driver names are different from those used with MDAC.  
  
-   User-accessible functionality supplied by MDAC components is available when using  SQL Server 
 Native Client. This includes, but isn't limited to, the following: connection pooling, ADO support, and client cursor support. When any of these features are used,  SQL Server 
 Native Client supplies only database connectivity. MDAC provides functionality such as tracing, management controls, and performance counters.  
  
-   Applications can use OLE DB core services with  SQL Server 
 Native Client, but if using the OLE DB cursor engine, they should use the data type compatibility option to avoid any potential problems that might arise because the cursor engine has no knowledge of the new  SQL Server 2005 (9.x) 
 data types.  
  
-    SQL Server 
 Native Client supports access to previous  SQL Server 
 databases.  
  
-    SQL Server 
 Native Client doesn't contain XML integration.  SQL Server 
 Native Client supports SELECT ... FOR XML queries, but doesn't support any other XML functionality. However,  SQL Server 
 Native Client does support the **xml** data type introduced in  SQL Server 2005 (9.x) 
.  
  
-    SQL Server 
 Native Client supports configuring client-side network libraries using only connection string attributes. If you need more complete network library configuration, you must use  SQL Server 
 Configuration Manager.  
  
-    SQL Server 
 Native Client isn't compatible with odbcbcp.dll. Applications that use both ODBC and **bcp** APIs must be rebuilt to link with sqlncli11.lib to use  SQL Server 
 Native Client.  
  
-    SQL Server 
 Native Client isn't supported from the Microsoft OLE DB provider for ODBC (MSDASQL). If you're using the MDAC SQLODBC driver with MSDASQL or MDAC SQLODBC driver with ADO, use OLE DB in  SQL Server 
 Native Client.  
  
-   MDAC connection strings allow a Boolean value (**true**) for the **Trusted_Connection** keyword. A  SQL Server 
 Native Client connection string must use **yes** or **no**.  
  
-   Minor changes have occurred to warnings and errors. Warnings and errors returned by the server now retain the same severity when passed to  SQL Server 
 Native Client. You should ensure you have thoroughly tested your application if you depend on trapping particular warnings and errors.  
  
-    SQL Server 
 Native Client has stricter error checking than MDAC, which means that some applications that don't conform strictly to the ODBC and OLE DB specifications might behave differently. For example, the SQLOLEDB provider didn't enforce the rule that parameter names must start with '\@' for result parameters, but the  SQL Server 
 Native Client OLE DB provider does.  
  
-    SQL Server 
 Native Client behaves differently from MDAC in regards to failed connections. For example, MDAC returns cached property values for a connection that has failed, whereas  SQL Server 
 Native Client reports an error to the calling application.  
  
-    SQL Server 
 Native Client doesn't generate Visual Studio Analyzer events, but instead generates Windows tracing events.  
  
-    SQL Server 
 Native Client can't be used with perfmon. Perfmon is a Windows tool that can only be used with DSNs that use the MDAC SQLODBC driver included with Windows.  
  
-   When  SQL Server 
 Native Client is connected to  SQL Server 2005 (9.x) 
 and later versions, server error 16947 is returned as a SQL_ERROR. This error occurs when a positioned update or delete fails to update or delete a row. With MDAC when connecting to any version of  SQL Server 
, server error 16947 is returned as a warning (SQL_SUCCESS_WITH_INFO).  
  
-    SQL Server 
 Native Client implements the **IDBDataSourceAdmin** interface, which is an optional OLE DB interface that wasn't previously implemented, but only the **CreateDataSource** method of this optional interface is implemented. This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  
-   The  SQL Server 
 Native Client OLE DB provider returns synonyms in the TABLES and TABLE_INFO schema rowsets, with TABLE_TYPE set to SYNONYM.  
  
-   Return values of data type **varchar(max)**, **nvarchar(max)**, **varbinary(max)**, **xml**, **udt**, or other large object types can't be returned to client versions earlier than  SQL Server 2005 (9.x) 
. If you want to use these types as return values, you must use  SQL Server 
 Native Client.  
  
-   MDAC allows the following statements to be executed at the start of manual and implicit transactions, but  SQL Server 
 Native Client doesn't. They must be executed in autocommit mode.  
  
    -   All full-text operations (index and catalog DDL)  
  
    -   All database operations (create database, alter database, drop database)  
  
    -   Reconfigure  
  
    -   Shutdown  
  
    -   Kill  
  
    -   Backup  
  
-   When MDAC applications connect to  SQL Server 
, the data types introduced in  SQL Server 2005 (9.x) 
 will appear as  SQL Server 2000 (8.x) 
-compatible data types as shown in the following table.  
  
    | SQL Server 2005 type | SQL Server 2000 type |
    | --- | --- |
    | **varchar(max)** | **text** |
    | **nvarchar(max)** | **ntext** |
    | **varbinary(max)** | **image** |
    | **udt** | **varbinary** |
    | **xml** | **ntext** |
  
     This type mapping affects the values returned for column metadata. For example, a **text** column has a maximum size of 2,147,483,647, but  SQL Server 
 Native Client ODBC reports the maximum size of **varchar(max)** columns as SQL_SS_LENGTH_UNLIMITED, and  SQL Server 
 Native Client OLE DB reports the maximum size of **varchar(max)** columns as 2,147,483,647 or -1, depending on platform.  
  
-    SQL Server 
 Native Client allows ambiguity in connection strings (for example, some keywords might be specified more than once, and conflicting keywords might be allowed with resolution based on position or precedence) for reasons of backward compatibility. Future releases of  SQL Server 
 Native Client might not allow ambiguity in connection strings. It's good practice when modifying applications to use  SQL Server 
 Native Client to eliminate any dependency on connection string ambiguity.  
  
-   If you use an ODBC or OLE DB call to start transactions, there's a difference in behavior between  SQL Server 
 Native Client and MDAC; transactions will begin immediately with  SQL Server 
 Native Client, but transactions will begin after the first database access using MDAC. This can affect the behavior of stored procedures and batches because  SQL Server 
 requires \@\@TRANCOUNT to be the same after a batch or stored procedure finishes execution as it was when the batch or stored procedure started.  
  
-   With  SQL Server 
 Native Client, ITransactionLocal::BeginTransaction will cause a transaction to be started immediately. With MDAC the transaction start was delayed until the application executed a statement which required a transaction in implicit transaction mode. For more information, see [SET IMPLICIT_TRANSACTIONS &#40;Transact-SQL&#41;](../../../t-sql/statements/set-implicit-transactions-transact-sql.md).  
  
-   You might encounter errors when using  SQL Server 
 Native Client driver with System.Data.Odbc to access a  SQL Server 
 server computer that exposes new,  SQL Server 
-specific data types or features. System.Data.Odbc provides a generic ODBC implementation and subsequently doesn't expose vendor specific functionality or extensions. (The  SQL Server 
 Native Client driver is updated to natively support the latest  SQL Server 
 features.) To work around this issue, you can either revert to MDAC, or migrate to `Microsoft.Data.SqlClient` (recommended) or `System.Data.SqlClient`.  
  
 Both  SQL Server 
 Native Client and MDAC support read committed transaction isolation using row versioning, but only  SQL Server 
 Native Client supports snapshot transaction isolation. (In programming terms, read committed transaction isolation using row versioning is the same as read-committed transaction.).  
  
## Related content

- [Building Applications with SQL Server Native Client](building-applications-with-sql-server-native-client.md)
