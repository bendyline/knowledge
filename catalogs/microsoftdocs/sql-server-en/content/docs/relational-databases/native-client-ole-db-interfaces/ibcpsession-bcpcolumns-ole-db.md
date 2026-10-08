---
title: "IBCPSession::BCPColumns (Native Client OLE DB provider)"
description: "IBCPSession::BCPColumns (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "BCPColumns method"
apiname: "IBCPSession::BCPColumns (OLE DB)"
apitype: "COM"
---
# IBCPSession::BCPColumns (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  Sets the number of fields that are to be bound to the columns in a  SQL Server 
 table.  
  
## Syntax  
  
```  
  
HRESULT BCPColumns(   
      DBCOUNTITEM nColumns);  
```  
  
## Remarks  
 Internally it calls [IBCPSession::BCPColFmt](ibcpsession-bcpcolfmt-ole-db.md) to set the default values for field data. These default values are obtained from the SQL Server column information that the provider internally retrieves when the table name is specified through [IBCPSession::BCPInit](ibcpsession-bcpinit-ole-db.md).  
  
> **Note:**  
>  This method can be called only after **BCPInit** has been called with a valid file name.  
  
 You should call this method only if you intend to use a user-file format that differs from the default. For more information about a description of the default user-file format, see the **BCPInit** method.  
  
 After calling the **BCPColumns** method, you must call the **BCPColFmt** method for each column in the user file to completely define a custom file format.  
  
## Arguments  
 *nColumns*[in]  
 The total number of fields in the user file. Even if you are preparing to bulk copy data from the user file to a SQL Server table and do not intend to copy all fields in the user file, you must still set the *nColumns* argument to the total number of user-file fields. The skipped fields can then be specified through **BCPColFmt**.  
  
## Return Code Values  
 S_OK  
 The method succeeded.  
  
 E_FAIL  
 A provider-specific error occurred; for detailed information, use the [ISQLServerErrorInfo](isqlservererrorinfo-geterrorinfo-ole-db.md) interface.  
  
 E_UNEXPECTED  
 The call to the method was unexpected. For example, the **BCPInit** method was not called before calling this method. Also occurs when this method is called more than once for a bulk copy operation.  
  
 E_OUTOFMEMORY  
 Out-of-memory error.  
  
## Related content

- [IBCPSession (Native Client OLE DB Provider)](ibcpsession-ole-db.md)
- [Performing Bulk Copy Operations in SQL Server Native Client](../native-client/features/performing-bulk-copy-operations.md)
