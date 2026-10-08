---
title: "Data source properties (Native Client OLE DB provider)"
description: "SQL Server Native Client Data Source Properties (OLE DB)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client OLE DB provider, data source properties"
  - "properties [OLE DB]"
  - "data source properties [OLE DB]"
  - "OLE DB data source properties [SQL Server Native Client]"
---
#  SQL Server Native Client Data Source Properties (OLE DB)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  The  SQL Server 
 Native Client OLE DB provider implements data source properties as follows.  
  
| Property ID | Description |
| --- | --- |
| DBPROP_CURRENTCATALOG | R/W: Read/write Default: None<br /><br /> Description: The value of DBPROP_CURRENTCATALOG reports the current database for a  SQL Server |
 | Native Client OLE DB provider session. Setting the property value has the identical effect as setting the current database by using the  Transact-SQL  USE *database* statement.<br /><br /> Beginning with  SQL Server 2005 (9.x) |
| , if you call [sp_defaultdb](../system-stored-procedures/sp-defaultdb-transact-sql.md) and specify the database name in lower case, even if the database was originally created with a mixed case name, DBPROP_CURRENTCATALOG will return the name in lower case. With previous versions of  SQL Server |
| , DBPROP_CURRENTCATALOG will return the expected mixed case. |
| DBPROP_MULTIPLECONNECTIONS | R/W: Read/write Default: VARIANT_FALSE<br /><br /> Description: If the connection is running a command that does not produce a rowset or produces a rowset that is not a server cursor and you execute another command, a new connection will be created to execute the new command if DBPROP_MULTIPLECONNECTIONS is VARIANT_TRUE.<br /><br /> The  SQL Server |
 | Native Client OLE DB provider will not create another connection if DBPROP_MULTIPLECONNECTION is VARIANT_FALSE or if a transaction is active on the connection. The  SQL Server |
 | Native Client OLE DB provider returns DB_E_OBJECTOPEN if DBPROP_MULTIPLECONNECTIONS is VARIANT_FALSE and returns E_FAIL if there is an active transaction. Transactions and locking are managed by  SQL Server |
 | on a per connection basis. If a second connection is generated, the commands on the separate connections do not share locks. To ensure that one command does not block another, hold locks on rows requested by the other command. This also holds true when creating multiple sessions.<br /><br /> Each session has a separate connection. |
  
 In the provider-specific property set DBPROPSET_SQLSERVERDATASOURCE, the  SQL Server 
 Native Client OLE DB provider defines the following additional data source properties.  
  
| Property ID | Description |
| --- | --- |
| SSPROP_ENABLEFASTLOAD | R/W: Read/write Default: VARIANT_FALSE<br /><br /> Description: To enable bulk copy from memory, SSPROP_ENABLEFASTLOAD property should be set to VARIANT_TRUE. With this property set on the data source, the newly created session allows consumer access to the [IRowsetFastLoad](../native-client-ole-db-interfaces/irowsetfastload-ole-db.md) interface.<br /><br /> If the property is set to VARIANT_TRUE, **IRowsetFastLoad** interface is available through **IOpenRowset::OpenRowset** by requesting the **IID_IRowsetFastLoad** interface or by setting **SSPROP_IRowsetFastLoad** to VARIANT_TRUE. |
| SSPROP_ENABLEBULKCOPY | R/W: Read/write Default: VARIANT_FALSE<br /><br /> Description: To enable bulk copy from files, SSPROP_ENABLEBULKCOPY property should be set to VARIANT_TRUE. With this property set on the data source, consumer access to the IBCPSession interface is available under the same level as Sessions.<br /><br /> SSPROP_IRowsetFastLoad must also be set to VARIANT_TRUE. |
  
## Related content

- [SQL Server Native Client Data Source Objects (OLE DB)](data-source-objects-ole-db.md)
