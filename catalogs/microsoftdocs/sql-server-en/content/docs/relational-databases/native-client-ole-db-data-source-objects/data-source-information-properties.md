---
title: "Data source information properties (Native Client OLE DB provider)"
description: "Data source information properties (Native Client OLE DB provider)"
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
  - "information properties [OLE DB]"
  - "OLE DB data source properties [SQL Server Native Client]"
---
#  SQL Server Native Client Data Source Information Properties

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  In the provider-specific property set DBPROPSET_SQLSERVERDATASOURCEINFO, the  SQL Server 
 Native Client OLE DB provider defines the following data source information properties.  
  
| Property ID | Description |
| --- | --- |
| SSPROP_COLUMNLEVELCOLLATION | Type: VT_BOOL<br /><br /> R/W: Read<br /><br /> Default: VARIANT_TRUE<br /><br /> Description: Used to determine if column collation is supported.<br /><br /> VARIANT_TRUE: Column level collation is supported.<br /><br /> VARIANT_FALSE: Column level collation is not supported. |
| SSPROP_UNICODELCID | Type: VT_I4 R/W: Read<br /><br /> Description: Unicode locale ID.<br /><br /> This is the locale used for Unicode data sorting. |
| SSPROP_UNICODECOMPARISONSTYLE | Type: VT_I4 R/W: Read<br /><br /> Description: Unicode comparison style.<br /><br /> The sorting options used for Unicode data sorting. |
  
 In the provider-specific property set DBPROPSET_SQLSERVERSTREAM, the  SQL Server 
 Native Client OLE DB provider defines the following additional property.  
  
| Property ID | Description |
| --- | --- |
| SSPROP_STREAM_XMLROOT | Type: VT_BSTR R/W: Read/Write<br /><br /> Description: The result of a FOR XML query may not be a well-formed document. When this property is specified, the result of a 'select ... for XML' query is wrapped in the root tag provided by this property to return a well formed XML document. If the query is executed in the browser it may cause the browser to display parser errors when loading the result. To avoid the error, SQL ISAPI supports the keyword ROOT. This keyword maps to SSPROP_STREAM_XMLROOT property. |
  
## Related content

- [SQL Server Native Client Data Source Objects (OLE DB)](data-source-objects-ole-db.md)
