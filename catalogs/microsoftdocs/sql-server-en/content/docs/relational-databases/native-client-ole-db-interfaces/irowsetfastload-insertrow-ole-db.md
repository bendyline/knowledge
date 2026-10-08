---
title: "IRowsetFastLoad::InsertRow (Native Client OLE DB provider)"
description: "IRowsetFastLoad::InsertRow (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "InsertRow method"
apiname: "IRowsetFastLoad::InsertRow (OLE DB)"
apitype: "COM"
---
# IRowsetFastLoad::InsertRow (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  Adds a row to the bulk copy rowset. For samples, see [Bulk Copy Data Using IRowsetFastLoad (OLE DB)](../native-client-ole-db-how-to/bulk-copy-data-using-irowsetfastload-ole-db.md) and [Send BLOB Data to SQL SERVER Using IROWSETFASTLOAD and ISEQUENTIALSTREAM (OLE DB)](../native-client-ole-db-how-to/send-blob-data-to-sql-server-using-irowsetfastload-and-isequentialstream-ole-db.md).  
  
## Syntax  
  
```  
  
HRESULT InsertRow(  
      HACCESSOR hAccessor,  
      void* pData);  
```  
  
## Arguments  
 *hAccessor*[in]  
 The handle of the accessor defining the row data for bulk copy. The accessor referenced is a row accessor, binding consumer-owned memory containing data values.  
  
 *pData*[in]  
 A pointer to the consumer-owned memory containing data values. For more information, see [DBBINDING Structures](https://learn.microsoft.com/previous-versions/windows/desktop/ms716845\(v=vs.85\)).  
  
## Return Code Values  
 S_OK  
 The method succeeded. Any bound status values for all columns have value DBSTATUS_S_OK or DBSTATUS_S_NULL.  
  
 E_FAIL  
 An error occurred. Error information is available from the rowset's error interfaces.  
  
 E_INVALIDARG  
 The *pData* argument was set to a NULL pointer.  
  
 E_OUTOFMEMORY  
 SQLNCLI11 was unable to allocate sufficient memory to complete the request.  
  
 E_UNEXPECTED  
 The method was called on a bulk copy rowset previously invalidated by the [IRowsetFastLoad::Commit](irowsetfastload-commit-ole-db.md) method.  
  
 DB_E_BADACCESSORHANDLE  
 The *hAccessor* argument provided by the consumer was invalid.  
  
 DB_E_BADACCESSORTYPE  
 The specified accessor was not a row accessor or did not specify consumer-owned memory.  
  
## Remarks  
 An error converting consumer data to the  SQL Server 
 data type for a column causes an E_FAIL return from the  SQL Server 
 Native Client OLE DB provider. Data can be transmitted to  SQL Server 
 on any **InsertRow** method or only on **Commit** method. The consumer application can call the **InsertRow** method many times with erroneous data before it receives notice that a data type conversion error exists. Because the **Commit** method ensures that all data is correctly specified by the consumer, the consumer can use the **Commit** method appropriately to validate data as necessary.  
  
 The  SQL Server 
 Native Client OLE DB provider bulk copy rowsets are write-only. The  SQL Server 
 Native Client OLE DB provider exposes no methods allowing consumer query of the rowset. To terminate processing, the consumer can release its reference on the [IRowsetFastLoad](irowsetfastload-ole-db.md) interface without calling the **Commit** method. There are no facilities for accessing a consumer-inserted row in the rowset and changing its values, or removing it individually from the rowset.  
  
 Bulk copied rows are formatted on the server for  SQL Server 
. The row format is affected by any options that may have been set for the connection or session such as ANSI_PADDING. This option is set on by default for any connection made through the  SQL Server 
 Native Client OLE DB provider.  
  
## Related content

- [IRowsetFastLoad (Native Client OLE DB Provider)](irowsetfastload-ole-db.md)
