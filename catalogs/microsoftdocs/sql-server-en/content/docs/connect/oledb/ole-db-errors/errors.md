---
title: "OLE DB Errors"
description: "Learn about how errors are returned in the OLE DB Driver for SQL Server and how you can get information about them."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "05/06/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "OLE DB Driver for SQL Server, errors"
  - "OLE/COM errors"
  - "errors [OLE DB]"
  - "OLE DB error handling, about error handling"
  - "OLE DB error handling"
---
# Errors

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  OLE/COM objects report errors through the HRESULT return code of object member functions. An OLE/COM HRESULT is a bit-packed structure. OLE provides macros that dereference structure members.  
  
 OLE/COM specifies the **IErrorInfo** interface. The interface exposes methods such as **GetDescription**. This allows clients to extract error details from OLE/COM servers. OLE DB extends **IErrorInfo** to support the return of multiple error information packets on a single-member function execution.  
  
  SQL Server 
 can return multiple errors. An application can retrieve server errors one at a time by calling [IMultipleResults::GetResult](https://learn.microsoft.com/previous-versions/windows/desktop/ms721289\(v=vs.85\)) combined with ISQLErrorInfo and IErrorRecords.  
  
 The OLE DB Driver for SQL Server exposes the OLE DB record-enhanced **IErrorInfo**, the custom **ISQLErrorInfo**, and the provider-specific [ISQLServerErrorInfo](../ole-db-interfaces/isqlservererrorinfo-geterrorinfo-ole-db.md) error object interfaces.  
  
 For information about tracing errors, see [Data Access Tracing](https://learn.microsoft.com/previous-versions/sql/sql-server-2008/cc765421\(v=sql.100\)). For information about enhancements to error tracing added in  SQL Server 2012 (11.x) 
, see [Accessing Diagnostic Information in the Extended Events Log](../features/accessing-diagnostic-information-in-the-extended-events-log.md).  
  
## In This Section  
  
-   [Return Codes](return-codes.md)  
  
-   [Information in Error Interfaces](information-in-error-interfaces.md)  
  
-   [SQL Server Error Detail](sql-server-error-detail.md)  
  
-   [Retrieving Error Information](retrieving-error-information.md)  
  
-   [SQL Server Message Results](sql-server-message-results.md)  
  
## Related content

- [OLE DB Driver for SQL Server Programming](../ole-db/oledb-driver-for-sql-server-programming.md)
