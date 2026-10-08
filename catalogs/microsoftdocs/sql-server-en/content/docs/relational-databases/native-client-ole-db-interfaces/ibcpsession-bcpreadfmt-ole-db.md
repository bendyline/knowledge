---
title: "IBCPSession::BCPReadFmt (Native Client OLE DB provider)"
description: "IBCPSession::BCPReadFmt (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "BCPReadFmt method"
apiname: "IBCPSession::BCPReadFmt (OLE DB)"
apitype: "COM"
---
# IBCPSession::BCPReadFmt (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  Reads format information for each column from the format file.  
  
## Syntax  
  
```  
  
HRESULT BCPReadFmt(   
      const wchar_t *pwszFormatFile);  
```  
  
## Remarks  
 The **BCPReadFmt** method is used for reading data from a format file that specifies the format of data in the data file. This method is capable of detecting the correct version of the format file. It can automatically detect whether the format file is in xml or old style text format and behaves accordingly. The format file versions supported by the  SQL Server 
 Native Client OLE DB provider BCP are version 6.0 or newer.  
  
 After the **BCPReadFmt** method reads the format values, it makes the appropriate calls to the [IBCPSession::BCPColumns](ibcpsession-bcpcolumns-ole-db.md) and [IBCPSession::BCPColFmt](ibcpsession-bcpcolfmt-ole-db.md) methods. There is no need for the user to parse a format file and make these calls.  
  
 To save a format file, call the [IBCPSession::BCPWriteFmt](ibcpsession-bcpwritefmt-ole-db.md) method. Calls to the **BCPReadFmt** method can reference saved formats. Alternatively, the bulk-copy utility (**bcp**) can save user-defined data formats in files that can be referenced by the **BCPReadFmt** method.  
  
 The **BCP_OPTION_DELAYREADFMT** value of the *eOption* parameter of [IBCPSession::BCPControl](ibcpsession-bcpcontrol-ole-db.md) modifies the behavior of IBCPSession::BCPReadFmt.  
  
## Arguments  
 *pwszFormatFile*[in]  
 The path and file name of the file containing the format values for the data file.  
  
## Return Code Values  
 S_OK  
 The method succeeded.  
  
 E_FAIL  
 A provider-specific error occurred, for detailed information use the [ISQLServerErrorInfo](isqlservererrorinfo-geterrorinfo-ole-db.md) interface.  
  
 E_OUTOFMEMORY  
 Out of memory error.  
  
 E_UNEXPECTED  
 The call to the method was unexpected. For example, the [IBCPSession::BCPInit](ibcpsession-bcpinit-ole-db.md) method was not called before calling this method.  
  
## Related content

- [IBCPSession (Native Client OLE DB Provider)](ibcpsession-ole-db.md)
- [Performing Bulk Copy Operations in SQL Server Native Client](../native-client/features/performing-bulk-copy-operations.md)
