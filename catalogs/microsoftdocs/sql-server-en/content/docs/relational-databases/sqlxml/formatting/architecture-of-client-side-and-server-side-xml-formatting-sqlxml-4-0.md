---
title: "Architecture of client and server-side XML (SQLXML)"
description: Learn about the architecture of client-side and server-side XML formatting in SQLXML 4.0.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
helpviewer_keywords:
  - "providers [SQLXML], XML formatting architecture"
  - "SQLOLEDB provider"
  - "client-side XML formatting"
  - "data providers [SQLXML], XML formatting architecture"
  - "SQLNCLI, XML"
  - "server-side XML formatting"
  - "SQL Server Native Client, XML"
  - "SQLXMLOLEDB Provider, XML formatting architecture"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Architecture of Client-side and Server-side XML Formatting (SQLXML 4.0)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  The following illustration shows the architecture of XML formatting on the server side.  
  
 Architecture of XML formatting on the server side.  
  
 In this example, the command that is specified on the client is sent to the server. The server produces an XML document and returns it to the client. In this case, the server has an instance of  Microsoft 
  SQL Server 
. With server-side XML formatting, you can use either the SQLXMLOLEDB provider or the SQLOLEDB provider.  The SQLXMLOLEDB provider uses Sqlxml4.dll, which is included in SQLXML 4.0. When you use the SQLOLEDB provider, by default you get the SQLXML functionality provided by Sqlxmlx.dll, which is included with  Microsoft 
 Windows or in Microsoft Data Access Components (MDAC) 2.6 or later. To use Sqlxml4.dll with SQLOLEDB, you must set the SQLXML Version property to "SQLXML.4.0" on the SQLOLEDB Connection object. In either case, the server produces the XML document and sends it to the client.  
  
> **Note:**  
>  XPath queries and updategrams are parsed on the client. To get the XPath template or updategram functionality in SQLXML 4.0, use Sqlxml4.dll.  
  
 The following illustration shows the architecture of XML formatting on the client side.  
  
 Architecture of XML formatting on the client side.  
  
 In this example, the client uses the SQLXMLOLEDB provider. In the connection string, the Data Provider property must be set to SQLOLEDB. (This is the only value accepted in SQLXML 4.0.) The command that is executed on the client is sent to the server. The rowset that is generated on the server is sent to the client. The formatting of the XML document from the rowset is performed on the client.  
  
 In SQLXML 4.0, either the  SQL Server 
 Native Client (SQLNCLI11) or the SQLOLEDB provider can be used as the data provider. You can potentially access any data source. As long as the query returns a single rowset, the XML transformation can be applied on the client.  
  
> **Important:** 
> [SQL Server Native Client](../../native-client/sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../../native-client/applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).
