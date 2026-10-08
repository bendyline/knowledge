---
title: "IRowsetFastLoad::Commit (Native Client OLE DB provider)"
description: "IRowsetFastLoad::Commit (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "Commit method"
apiname: "IRowsetFastLoad::Commit (OLE DB)"
apitype: "COM"
---
# IRowsetFastLoad::Commit (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  Marks the end of a batch of inserted rows and writes the rows to the  SQL Server 
 table. For samples, see [Bulk Copy Data Using IRowsetFastLoad (OLE DB)](../native-client-ole-db-how-to/bulk-copy-data-using-irowsetfastload-ole-db.md) and [Send BLOB Data to SQL SERVER Using IROWSETFASTLOAD and ISEQUENTIALSTREAM (OLE DB)](../native-client-ole-db-how-to/send-blob-data-to-sql-server-using-irowsetfastload-and-isequentialstream-ole-db.md).  
  
## Syntax  
  
```  
  
HRESULT Commit(  
      BOOL fDone);  
```  
  
## Arguments  
 *fDone*[in]  
 If FALSE, the rowset maintains validity and can be used by the consumer for additional row insertion. If TRUE, the rowset loses validity and no further insertion can be done by the consumer.  
  
## Return Code Values  
 S_OK  
 The method succeeded and all inserted data has been written to the  SQL Server 
 table.  
  
 E_FAIL  
 A provider-specific error occurred. Retrieve error information for the specific error text from the provider.  
  
 E_UNEXPECTED  
 The method was called on a bulk copy rowset previously invalidated by the **IRowsetFastLoad::Commit** method.  
  
## Remarks  
 A  SQL Server 
 Native Client OLE DB provider bulk copy rowset behaves as a delayed-update mode rowset. As the user inserts row data through the rowset, inserted rows are treated in the same fashion as pending inserts on a rowset supporting **IRowsetUpdate**.  
  
 The consumer must call the **Commit** method on the bulk copy rowset to write inserted rows to the  SQL Server 
 table in the same way as the **IRowsetUpdate::Update** method is used to submit pending rows to an instance of SQL Server.  
  
 If the consumer releases its reference on the bulk copy rowset without calling the **Commit** method, all inserted rows not previously written are lost.  
  
 The consumer can batch inserted rows by calling the **Commit** method with the *fDone* argument set to FALSE. When *fDone*is set to TRUE, the rowset becomes invalid. An invalid bulk copy rowset supports only the **ISupportErrorInfo** interface and **IRowsetFastLoad::Release** method.  
  
## Related content

- [IRowsetFastLoad (Native Client OLE DB Provider)](irowsetfastload-ole-db.md)
