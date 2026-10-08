---
title: ISSCommandWithParameters (Native Client OLE DB provider)
description: "ISSCommandWithParameters (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "ISSCommandWithParameters interface"
apiname: "ISSCommandWithParameters (OLE DB)"
apitype: "COM"
---
# ISSCommandWithParameters (Native Client OLE DB provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  **ISSCommandWithParameters** exposes support for  SQL Server 
 XML and user-defined types (UDT). This is an optional interface that inherits from the core OLE DB interface **ICommandWithParameters**. In addition to the three methods inherited from **ICommandWithParameters**; **GetParameterInfo**, **MapParameterNames**, and **SetParameterInfo**; **ISSCommandWithParameters** provides two new methods that are used to handle server specific data types.  
  
> **Note:**  
>  The **ISSCommandWithParameters** interface can be used when Service Components are used, but the Service Components themselves will not use this interface.  
  
| Method | Description |
| --- | --- |
| [ISSCommandWithParameters::GetParameterProperties (OLE DB)](isscommandwithparameters-getparameterproperties-ole-db.md) | Returns one **SSPARAMPROPS** property set structure in the array for each UDT or XML parameter passed to the command, but none is returned for other types of parameters. |
| [ISSCommandWithParameters::SetParameterProperties (OLE DB)](isscommandwithparameters-setparameterproperties-ole-db.md) | Sets the parameter properties on a per parameter basis by ordinal, or sets bulk parameter properties by specifying an array of **SSPARAMPROPS** structures. |
  
## Related content

- [SQL Server Native Client (OLE DB) Interfaces](sql-server-native-client-ole-db-interfaces.md)
- [Using XML Data Types in SQL Server Native Clients](../native-client/features/using-xml-data-types.md)
- [Using User-Defined Types in SQL Server Native Client](../native-client/features/using-user-defined-types.md)
